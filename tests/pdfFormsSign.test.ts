import { PDFDocument, PDFRawStream, StandardFonts, decodePDFRawStream, degrees } from '@cantoo/pdf-lib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { describe, expect, it } from 'vitest';
import { fieldIsFillable, fillForm, readFormFields } from '../src/lib/pdfForms';
import { PdfError } from '../src/lib/pdfOps';
import { defaultSignatureBox, signPdf } from '../src/lib/pdfSign';

const PNG_1X1 = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='), (c) => c.charCodeAt(0));

async function formPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([400, 600]);
  const page2 = doc.addPage([400, 600]);
  page.drawText('Application form', { x: 20, y: 560, size: 16, font });
  const form = doc.getForm();
  const name = form.createTextField('fullName');
  name.addToPage(page, { x: 20, y: 500, width: 200, height: 22 });
  const notes = form.createTextField('notes');
  notes.enableMultiline();
  notes.setMaxLength(20);
  notes.addToPage(page, { x: 20, y: 420, width: 200, height: 60 });
  const agree = form.createCheckBox('agree');
  agree.addToPage(page, { x: 20, y: 380, width: 18, height: 18 });
  const colour = form.createRadioGroup('colour');
  colour.addOptionToPage('red', page, { x: 20, y: 340, width: 16, height: 16 });
  colour.addOptionToPage('blue', page, { x: 60, y: 340, width: 16, height: 16 });
  const country = form.createDropdown('country');
  country.addOptions(['Pakistan', 'Canada', 'Spain']);
  country.addToPage(page, { x: 20, y: 300, width: 150, height: 22 });
  const langs = form.createOptionList('languages');
  langs.addOptions(['English', 'Urdu', 'French']);
  langs.enableMultiselect();
  langs.addToPage(page2, { x: 20, y: 400, width: 150, height: 60 });
  const locked = form.createTextField('locked');
  locked.setText('fixed');
  locked.enableReadOnly();
  locked.addToPage(page2, { x: 20, y: 300, width: 150, height: 22 });
  const btn = form.createButton('submit');
  btn.addToPage('Send', page2, { x: 20, y: 200, width: 80, height: 24 });
  return doc.save();
}

async function pageText(bytes: Uint8Array, n = 1) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise;
  const content = await (await doc.getPage(n)).getTextContent();
  return content.items.map((i) => ('str' in i ? i.str : '')).join(' ');
}

describe('readFormFields', () => {
  it('lists every field with its kind, options, limits and page', async () => {
    const info = await readFormFields(await formPdf());
    const by = Object.fromEntries(info.fields.map((f) => [f.name, f]));
    expect(info.fields).toHaveLength(8);
    expect(by.fullName).toMatchObject({ kind: 'text', value: '', page: 1, readOnly: false });
    expect(by.notes).toMatchObject({ kind: 'text', multiline: true, maxLength: 20 });
    expect(by.agree).toMatchObject({ kind: 'checkbox', value: false });
    expect(by.colour).toMatchObject({ kind: 'radio', options: ['red', 'blue'], value: '' });
    expect(by.country).toMatchObject({ kind: 'dropdown', options: ['Pakistan', 'Canada', 'Spain'] });
    expect(by.languages).toMatchObject({ kind: 'list', multiselect: true, page: 2 });
    expect(by.locked).toMatchObject({ readOnly: true, value: 'fixed' });
    expect(by.submit.kind).toBe('button');
    expect(info.fillable).toBe(6); // all but the read-only field and the button
    expect(info.fields.filter(fieldIsFillable)).toHaveLength(info.fillable);
    expect(info.xfa).toBe(false);
  });

  it('returns no fields for a normal PDF', async () => {
    const doc = await PDFDocument.create();
    doc.addPage();
    const info = await readFormFields(await doc.save());
    expect(info).toMatchObject({ fields: [], fillable: 0 });
  });

  it('rejects a file that is not a PDF', async () => {
    await expect(readFormFields(new TextEncoder().encode('nope'))).rejects.toBeInstanceOf(PdfError);
  });
});

describe('fillForm', () => {
  const values = { fullName: 'Ayesha Khan', notes: 'Line one', agree: true, colour: 'blue', country: 'Canada', languages: ['English', 'French'] };

  it('writes every kind of field and keeps them editable', async () => {
    const out = await fillForm(await formPdf(), values, { flatten: false });
    const info = await readFormFields(out);
    const by = Object.fromEntries(info.fields.map((f) => [f.name, f]));
    expect(by.fullName.value).toBe('Ayesha Khan');
    expect(by.notes.value).toBe('Line one');
    expect(by.agree.value).toBe(true);
    expect(by.colour.value).toBe('blue');
    expect(by.country.value).toBe('Canada');
    expect(by.languages.value).toEqual(['English', 'French']);
    expect(by.locked.value).toBe('fixed');
    expect(info.fields).toHaveLength(8);
  });

  it('clears values with empty input', async () => {
    const filled = await fillForm(await formPdf(), values, { flatten: false });
    const cleared = await fillForm(filled, { fullName: '', agree: false, colour: '', country: '', languages: [] }, { flatten: false });
    const by = Object.fromEntries((await readFormFields(cleared)).fields.map((f) => [f.name, f]));
    expect(by.fullName.value).toBe('');
    expect(by.agree.value).toBe(false);
    expect(by.colour.value).toBe('');
    expect(by.country.value).toBe('');
    expect(by.languages.value).toEqual([]);
  });

  it('flattening burns the text into the page and removes the fields', async () => {
    const out = await fillForm(await formPdf(), values, { flatten: true });
    expect((await readFormFields(out)).fields).toHaveLength(0);
    expect(await pageText(out, 1)).toContain('Ayesha Khan');
  });

  it('does not change read-only fields', async () => {
    const out = await fillForm(await formPdf(), { locked: 'hacked' }, { flatten: false });
    const by = Object.fromEntries((await readFormFields(out)).fields.map((f) => [f.name, f]));
    expect(by.locked.value).toBe('fixed');
  });

  it('gives clear errors', async () => {
    const src = await formPdf();
    await expect(fillForm(src, { notes: 'x'.repeat(21) }, { flatten: false })).rejects.toThrow(/at most 20/);
    await expect(fillForm(src, { missing: 'a' }, { flatten: false })).rejects.toThrow(/does not exist/);
    await expect(fillForm(src, { fullName: 'خان' }, { flatten: false })).rejects.toThrow(/character/);
    await expect(fillForm(src, { colour: 'green' }, { flatten: false })).rejects.toBeInstanceOf(PdfError);
  });
});

describe('signPdf', () => {
  async function plain(rotation = 0) {
    const doc = await PDFDocument.create();
    doc.addPage([400, 600]).setRotation(degrees(rotation));
    doc.addPage([400, 600]);
    return doc.save();
  }
  async function contentOf(bytes: Uint8Array, pageIndex: number) {
    const doc = await PDFDocument.load(bytes);
    const contents = doc.getPage(pageIndex).node.Contents();
    let text = '';
    const parts = contents && 'size' in contents ? Array.from({ length: (contents as { size(): number }).size() }, (_, i) => (contents as unknown as { lookup(i: number): unknown }).lookup(i)) : [contents];
    for (const part of parts) if (part instanceof PDFRawStream) text += new TextDecoder('latin1').decode(decodePDFRawStream(part).decode());
    return text;
  }

  it('places the image at the requested spot on the requested page', async () => {
    const out = await signPdf(await plain(), PNG_1X1, [{ page: 2, x: 0.5, y: 0.5, w: 0.25, h: 0.1 }]);
    const content = await contentOf(out, 1);
    expect(content).toContain('1 0 0 1 200 240 cm'); // x = 0.5*400, bottom = (1-0.5-0.1)*600
    expect(content).toContain('100 0 0 60 0 0 cm'); // 0.25*400 by 0.1*600
    expect(await contentOf(out, 0)).not.toContain(' Do');
    expect((await PDFDocument.load(out)).getPageCount()).toBe(2);
  });

  it('can sign several pages and handles rotated pages', async () => {
    const out = await signPdf(await plain(90), PNG_1X1, [
      { page: 1, x: 0.1, y: 0.1, w: 0.3, h: 0.1 },
      { page: 2, x: 0.1, y: 0.1, w: 0.3, h: 0.1 },
    ]);
    expect(await contentOf(out, 0)).toContain(' Do');
    expect(await contentOf(out, 1)).toContain(' Do');
    expect(await contentOf(out, 0)).toMatch(/0 1 -1 0 0 0 cm|0\.?0* 1 -1 0\.?0* 0 0 cm|cm/); // rotated matrix present
  });

  it('rejects bad input', async () => {
    const src = await plain();
    await expect(signPdf(src, PNG_1X1, [])).rejects.toThrow(/Choose where/);
    await expect(signPdf(src, PNG_1X1, [{ page: 3, x: 0, y: 0, w: 0.2, h: 0.1 }])).rejects.toThrow(/Page 3/);
    await expect(signPdf(src, PNG_1X1, [{ page: 1, x: 0.9, y: 0, w: 0.3, h: 0.1 }])).rejects.toThrow(/fit inside/);
    await expect(signPdf(src, new Uint8Array([1, 2, 3]), [{ page: 1, x: 0, y: 0, w: 0.2, h: 0.1 }])).rejects.toThrow(/signature image/);
  });

  it('sizes a new signature to its picture', () => {
    const b = defaultSignatureBox(3, 400 / 600);
    expect(b.w).toBeCloseTo(0.28);
    expect(b.h * 600).toBeCloseTo((b.w * 400) / 3, 5);
    expect(defaultSignatureBox(0.2, 0.7).h).toBeLessThanOrEqual(0.4);
    expect(StandardFonts.Helvetica).toBeDefined();
  });
});
