import { PDFDocument, PDFRawStream, StandardFonts, decodePDFRawStream } from '@cantoo/pdf-lib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { describe, expect, it } from 'vitest';
import { PdfError } from '../src/lib/pdfOps';
import { buildMatchers, clampBox, countBoxes, findTextBoxes, redactPdf, type PageRenderer, type PositionedText } from '../src/lib/pdfRedact';

const TINY_JPEG = Uint8Array.from(
  atob('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA='),
  (c) => c.charCodeAt(0),
);

const SECRET = 'TOPSECRET-4111111111111111';

async function samplePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle('Confidential plan');
  doc.setAuthor('Jane Doe');
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const p1 = doc.addPage([400, 600]);
  p1.drawText(`Account: ${SECRET}`, { x: 50, y: 500, size: 16, font });
  p1.drawText('Other visible line', { x: 50, y: 460, size: 16, font });
  const p2 = doc.addPage([300, 200]);
  p2.drawText('Public page two', { x: 20, y: 100, size: 14, font });
  const p3 = doc.addPage([400, 600]);
  p3.drawText(`Third page also mentions ${SECRET}`, { x: 20, y: 100, size: 12, font });
  return doc.save();
}

const renderer: PageRenderer = async (n) => ({ jpeg: TINY_JPEG, widthPt: n === 2 ? 300 : 400, heightPt: n === 2 ? 200 : 600 });

async function pageText(bytes: Uint8Array, n: number) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise;
  const content = await (await doc.getPage(n)).getTextContent();
  return content.items.map((i) => ('str' in i ? i.str : '')).join(' ');
}

/** Every byte of text the file could still hold: raw file plus every stream, decompressed. */
async function everythingIn(bytes: Uint8Array): Promise<string> {
  let all = new TextDecoder('latin1').decode(bytes);
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    if (obj instanceof PDFRawStream) {
      try {
        all += new TextDecoder('latin1').decode(decodePDFRawStream(obj).decode());
      } catch {
        /* binary image data */
      }
    }
  }
  return all;
}

/** pdf-lib stores drawn text as hex strings, so look for the plain text and for its hex form. */
const contains = (haystack: string, text: string) => {
  const hex = [...text].map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  return haystack.includes(text) || haystack.toLowerCase().includes(hex);
};

describe('redactPdf', () => {
  it('removes the text of redacted pages from the file and keeps the others', async () => {
    const src = await samplePdf();
    expect(await pageText(src, 1)).toContain(SECRET);
    const out = await redactPdf(src, { 1: [{ x: 0.1, y: 0.1, w: 0.8, h: 0.1 }] }, renderer, { keepProperties: false });
    expect(await pageText(out, 1)).toBe(''); // a picture now: nothing selectable
    expect(await pageText(out, 2)).toContain('Public page two');
    expect(await pageText(out, 3)).toContain(SECRET); // untouched page is copied as is
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBe(3);
    expect(doc.getPage(0).getSize()).toEqual({ width: 400, height: 600 });
    expect(doc.getPage(1).getSize()).toEqual({ width: 300, height: 200 });
  });

  it('leaves no trace of the secret anywhere in the file when every page that contains it is redacted', async () => {
    const src = await samplePdf();
    const out = await redactPdf(src, { 1: [{ x: 0, y: 0, w: 1, h: 1 }], 3: [{ x: 0, y: 0, w: 1, h: 1 }] }, renderer, { keepProperties: false });
    // Positive control: the same search finds the secret (and the public text) in the source file...
    const before = await everythingIn(src);
    expect(contains(before, 'TOPSECRET-4111111111111111')).toBe(true);
    expect(contains(before, 'Account')).toBe(true);
    expect(contains(before, 'Public page two')).toBe(true);
    // ...but not in the output, where only the untouched page keeps its text.
    const everything = await everythingIn(out);
    expect(contains(everything, 'TOPSECRET')).toBe(false);
    expect(contains(everything, '4111111111111111')).toBe(false);
    expect(contains(everything, 'Account')).toBe(false);
    expect(contains(everything, 'Third page also mentions')).toBe(false);
    expect(contains(everything, 'Public page two')).toBe(true);
    expect(await pageText(out, 2)).toContain('Public page two');
  });

  it('drops document properties unless asked to keep them', async () => {
    const src = await samplePdf();
    const plan = { 1: [{ x: 0, y: 0, w: 0.5, h: 0.5 }] };
    const dropped = await PDFDocument.load(await redactPdf(src, plan, renderer, { keepProperties: false }));
    expect(dropped.getTitle()).toBeUndefined();
    expect(dropped.getAuthor()).toBeUndefined();
    const kept = await PDFDocument.load(await redactPdf(src, plan, renderer, { keepProperties: true }));
    expect(kept.getTitle()).toBe('Confidential plan');
    expect(kept.getAuthor()).toBe('Jane Doe');
  });

  it('passes only valid, clamped boxes to the renderer and reports progress', async () => {
    const seen: unknown[] = [];
    const spy: PageRenderer = async (n, boxes) => {
      seen.push([n, boxes]);
      return renderer(n, boxes);
    };
    const progress: number[] = [];
    await redactPdf(await samplePdf(), { 2: [{ x: 0.9, y: 0.9, w: 0.5, h: 0.5 }, { x: 0.5, y: 0.5, w: 0, h: 0 }] }, spy, { keepProperties: false, onProgress: (d) => progress.push(d) });
    expect(seen).toHaveLength(1);
    const [, boxes] = seen[0] as [number, { x: number; y: number; w: number; h: number }[]];
    expect(boxes).toHaveLength(1);
    expect(boxes[0].x + boxes[0].w).toBeLessThanOrEqual(1.0000001);
    expect(progress.at(-1)).toBe(3);
  });

  it('rejects empty plans and pages that do not exist', async () => {
    const src = await samplePdf();
    await expect(redactPdf(src, {}, renderer, { keepProperties: false })).rejects.toBeInstanceOf(PdfError);
    await expect(redactPdf(src, { 9: [{ x: 0, y: 0, w: 1, h: 1 }] }, renderer, { keepProperties: false })).rejects.toThrow(/Page 9/);
  });
});

describe('box helpers', () => {
  it('clamps boxes to the page and drops empty ones', () => {
    expect(clampBox({ x: -0.1, y: 0.2, w: 0.5, h: 0.2 })).toEqual({ x: 0, y: 0.2, w: 0.4, h: 0.2 });
    expect(clampBox({ x: 0.9, y: 0.9, w: 0.5, h: 0.5 })!.w).toBeCloseTo(0.1);
    expect(clampBox({ x: 0.5, y: 0.5, w: 0, h: 0.1 })).toBeNull();
    expect(countBoxes({ 1: [{ x: 0, y: 0, w: 1, h: 1 }], 4: [{ x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 0, w: 1, h: 1 }] })).toBe(3);
  });
});

describe('findTextBoxes', () => {
  // Page 400x600, standard viewport transform (flip y).
  const vt = [1, 0, 0, -1, 0, 600];
  const item: PositionedText = { str: 'Call +92 300 1234567 or mail jane@example.com now', transform: [16, 0, 0, 16, 50, 500], width: 400, height: 16 };

  it('finds terms case-insensitively and places the box over the matched part of the line', () => {
    const [m] = findTextBoxes([item], vt, 400, 600, buildMatchers({ terms: ['MAIL'], emails: false, phones: false, longNumbers: false }));
    expect(m.text).toBe('mail');
    // starts after "Call +92 300 1234567 or " = 24 of 49 chars of a 400pt wide item
    expect(m.box.x * 400).toBeCloseTo(50 + (24 / item.str.length) * 400 - 1.5, 0);
    // vertical: baseline at y=500 -> top of text 484 in view space is 600-516
    expect(m.box.y * 600).toBeLessThan(600 - 500);
    expect((m.box.y + m.box.h) * 600).toBeGreaterThan(600 - 500);
  });

  it('finds emails, phone numbers and long numbers', () => {
    const find = (spec: Partial<Parameters<typeof buildMatchers>[0]>) =>
      findTextBoxes([item], vt, 400, 600, buildMatchers({ terms: [], emails: false, phones: false, longNumbers: false, ...spec })).map((m) => m.text);
    expect(find({ emails: true })).toEqual(['jane@example.com']);
    expect(find({ phones: true })).toEqual(['+92 300 1234567']);
    expect(find({ longNumbers: true })).toEqual([]);
    expect(findTextBoxes([{ ...item, str: 'ID 123456789012 ok' }], vt, 400, 600, buildMatchers({ terms: [], emails: false, phones: false, longNumbers: true })).map((m) => m.text)).toEqual(['123456789012']);
  });

  it('escapes regular-expression characters in typed terms and ignores blanks', () => {
    expect(buildMatchers({ terms: ['  ', ''], emails: false, phones: false, longNumbers: false })).toEqual([]);
    const hits = findTextBoxes([{ ...item, str: 'price (a+b)*2 = 10' }], vt, 400, 600, buildMatchers({ terms: ['(a+b)*2'], emails: false, phones: false, longNumbers: false }));
    expect(hits.map((h) => h.text)).toEqual(['(a+b)*2']);
  });

  it('keeps boxes inside the page', () => {
    const edge: PositionedText = { str: 'secret', transform: [10, 0, 0, 10, 396, 2], width: 60, height: 10 };
    const [m] = findTextBoxes([edge], vt, 400, 600, buildMatchers({ terms: ['secret'], emails: false, phones: false, longNumbers: false }));
    expect(m.box.x + m.box.w).toBeLessThanOrEqual(1.0000001);
    expect(m.box.y + m.box.h).toBeLessThanOrEqual(1.0000001);
    expect(m.box.x).toBeGreaterThanOrEqual(0);
  });
});
