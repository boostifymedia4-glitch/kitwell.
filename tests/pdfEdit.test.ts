import { PDFDocument, PDFName, StandardFonts, degrees, EncryptedPDFError } from '@cantoo/pdf-lib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { describe, expect, it } from 'vitest';
import {
  addPageNumbers, addWatermark, cropPdf, editMetadata, formatPageNumber, protectPdf, unlockPdf, visibleBox, visibleToPage,
  type PageNumberOptions,
} from '../src/lib/pdfEdit';
import { PdfError, loadPdf, readMetadata } from '../src/lib/pdfOps';
import { extractPdfText, itemsToText } from '../src/lib/pdfText';

// 1x1 transparent PNG
const PNG_1X1 = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
  (c) => c.charCodeAt(0),
);

async function makePdf(pages: number, opts: { rotate?: number; size?: [number, number]; text?: boolean } = {}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < pages; i++) {
    const page = doc.addPage(opts.size ?? [400, 600]);
    if (opts.text !== false) {
      page.drawText(`Hello page ${i + 1}`, { x: 50, y: 500, size: 18, font });
      page.drawText(`Second line ${i + 1}`, { x: 50, y: 470, size: 18, font });
    }
    if (opts.rotate) page.setRotation(degrees(opts.rotate));
  }
  return doc.save();
}

/** Opens a PDF with PDF.js (Node build) and returns the page's text items with positions in on-screen coordinates (origin top-left). */
async function textItems(bytes: Uint8Array, pageNo = 1, password?: string) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), password, useSystemFonts: true }).promise;
  const page = await doc.getPage(pageNo);
  const viewport = page.getViewport({ scale: 1 });
  const content = await page.getTextContent();
  const items = content.items
    .filter((i): i is Extract<typeof i, { str: string }> => 'str' in i && i.str.trim() !== '')
    .map((i) => {
      const t = pdfjs.Util.transform(viewport.transform, i.transform);
      return { str: i.str, x: t[4], y: t[5], width: i.width };
    });
  return { items, width: viewport.width, height: viewport.height };
}

const baseNumbers: PageNumberOptions = { position: 'bottom-center', format: 'n', startAt: 1, fromPage: 1, size: 12, margin: 30, color: '#000000' };

describe('geometry', () => {
  it('maps visible corners to page space for every rotation', async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([200, 300]);
    const corners = (r: number) => {
      page.setRotation(degrees(r));
      const vb = visibleBox(page);
      return [visibleToPage(vb, 0, 0), visibleToPage(vb, vb.visibleWidth, vb.visibleHeight)];
    };
    expect(corners(0)).toEqual([{ x: 0, y: 0 }, { x: 200, y: 300 }]);
    expect(corners(90)).toEqual([{ x: 200, y: 0 }, { x: 0, y: 300 }]);
    expect(corners(180)).toEqual([{ x: 200, y: 300 }, { x: 0, y: 0 }]);
    expect(corners(270)).toEqual([{ x: 0, y: 300 }, { x: 200, y: 0 }]);
  });
});

describe('page numbers', () => {
  it('formats the four label styles', () => {
    expect(formatPageNumber('n', 3, 9)).toBe('3');
    expect(formatPageNumber('page-n', 3, 9)).toBe('Page 3');
    expect(formatPageNumber('n-of-total', 3, 9)).toBe('3 of 9');
    expect(formatPageNumber('page-n-of-total', 3, 9)).toBe('Page 3 of 9');
  });

  it('numbers every page with the chosen format', async () => {
    const out = await addPageNumbers(await makePdf(3), { ...baseNumbers, format: 'page-n-of-total' });
    for (let p = 1; p <= 3; p++) {
      const { items } = await textItems(out, p);
      expect(items.map((i) => i.str)).toContain(`Page ${p} of 3`);
    }
  });

  it('respects the page range and start number', async () => {
    const out = await addPageNumbers(await makePdf(4), { ...baseNumbers, fromPage: 2, toPage: 3, startAt: 10, format: 'n-of-total' });
    const labels = async (p: number) => (await textItems(out, p)).items.map((i) => i.str);
    expect(await labels(1)).not.toContain('10 of 11');
    expect(await labels(2)).toContain('10 of 11');
    expect(await labels(3)).toContain('11 of 11');
    expect((await labels(4)).some((s) => /^\d+( of \d+)?$/.test(s))).toBe(false);
  });

  it('places the number in the right spot on rotated pages', async () => {
    for (const rotate of [0, 90, 180, 270]) {
      const out = await addPageNumbers(await makePdf(1, { rotate, text: false }), baseNumbers);
      const { items, width, height } = await textItems(out);
      const n = items.find((i) => i.str === '1')!;
      expect(n, `rotation ${rotate}`).toBeDefined();
      // Bottom centre of what the reader sees, 30pt up from the edge.
      expect(Math.abs(n.x + n.width / 2 - width / 2), `x @${rotate}`).toBeLessThan(2);
      expect(Math.abs(n.y - (height - 30)), `y @${rotate}`).toBeLessThan(2);
    }
  });

  it('supports every corner', async () => {
    const out = await addPageNumbers(await makePdf(1, { text: false }), { ...baseNumbers, position: 'top-right', margin: 20 });
    const { items, width } = await textItems(out);
    const n = items[0];
    expect(n.x + n.width).toBeCloseTo(width - 20, 0);
    expect(n.y).toBeLessThan(60);
  });

  it('rejects invalid options', async () => {
    const pdf = await makePdf(2);
    await expect(addPageNumbers(pdf, { ...baseNumbers, fromPage: 3 })).rejects.toThrow(/between 1 and 2/);
    await expect(addPageNumbers(pdf, { ...baseNumbers, fromPage: 2, toPage: 1 })).rejects.toThrow(/last page/);
    await expect(addPageNumbers(pdf, { ...baseNumbers, size: 2 })).rejects.toThrow(/Font size/);
    await expect(addPageNumbers(pdf, { ...baseNumbers, color: 'red' })).rejects.toThrow(/valid colour/);
    await expect(addPageNumbers(new TextEncoder().encode('nope'), baseNumbers)).rejects.toThrow(PdfError);
  });
});

describe('watermark', () => {
  const text = { kind: 'text' as const, text: 'CONFIDENTIAL', size: 40, bold: true, color: '#ff0000' };

  it('draws centred text at the requested angle', async () => {
    const out = await addWatermark(await makePdf(1, { text: false }), { mark: text, opacity: 0.4, angle: 0, layout: 'center' });
    const { items, width, height } = await textItems(out);
    const m = items.find((i) => i.str === 'CONFIDENTIAL')!;
    expect(m).toBeDefined();
    expect(Math.abs(m.x + m.width / 2 - width / 2)).toBeLessThan(2);
    expect(Math.abs(m.y - height / 2)).toBeLessThan(20); // baseline is just below the centre line
  });

  it('keeps the centre on rotated pages', async () => {
    for (const rotate of [90, 180, 270]) {
      const out = await addWatermark(await makePdf(1, { rotate, text: false }), { mark: text, opacity: 0.4, angle: 0, layout: 'center' });
      const { items, width, height } = await textItems(out);
      const m = items.find((i) => i.str === 'CONFIDENTIAL')!;
      expect(Math.abs(m.x + m.width / 2 - width / 2), `x @${rotate}`).toBeLessThan(3);
      expect(Math.abs(m.y - height / 2), `y @${rotate}`).toBeLessThan(22);
    }
  });

  it('only marks the selected pages', async () => {
    const out = await addWatermark(await makePdf(3, { text: false }), { mark: text, opacity: 0.5, angle: 45, layout: 'center', pages: [1] });
    expect((await textItems(out, 1)).items).toHaveLength(0);
    expect((await textItems(out, 2)).items.map((i) => i.str)).toContain('CONFIDENTIAL');
    expect((await textItems(out, 3)).items).toHaveLength(0);
  });

  it('tiles the mark many times', async () => {
    const out = await addWatermark(await makePdf(1, { text: false }), { mark: { ...text, size: 20 }, opacity: 0.3, angle: 30, layout: 'tile' });
    expect((await textItems(out)).items.length).toBeGreaterThan(8);
  });

  it('adds an image watermark', async () => {
    const before = await makePdf(1, { text: false });
    const out = await addWatermark(before, { mark: { kind: 'image', bytes: PNG_1X1, type: 'png', scale: 0.3 }, opacity: 0.5, angle: 0, layout: 'center' });
    expect(out.length).toBeGreaterThan(before.length);
    expect((await loadPdf(out)).getPageCount()).toBe(1);
  });

  it('refuses characters the built-in fonts cannot draw, and bad input', async () => {
    const pdf = await makePdf(1);
    await expect(addWatermark(pdf, { mark: { ...text, text: 'مسودہ' }, opacity: 0.5, angle: 0, layout: 'center' })).rejects.toThrow(/Latin/);
    await expect(addWatermark(pdf, { mark: { ...text, text: '  ' }, opacity: 0.5, angle: 0, layout: 'center' })).rejects.toThrow(/Enter the watermark text/);
    await expect(addWatermark(pdf, { mark: text, opacity: 0, angle: 0, layout: 'center' })).rejects.toThrow(/Opacity/);
    await expect(addWatermark(pdf, { mark: text, opacity: 0.5, angle: 0, layout: 'center', pages: [9] })).rejects.toThrow(/valid pages/);
    await expect(addWatermark(pdf, { mark: { kind: 'image', bytes: new Uint8Array([1, 2, 3]), type: 'png', scale: 0.3 }, opacity: 0.5, angle: 0, layout: 'center' })).rejects.toThrow(/could not be read/);
    await expect(addWatermark(pdf, { mark: { ...text, size: 4 }, opacity: 0.5, angle: 0, layout: 'tile' })).rejects.toThrow(/Font size/);
  });
});

describe('crop', () => {
  it('sets the crop box from fractions of the visible page', async () => {
    const out = await cropPdf(await makePdf(2), { x: 0.1, y: 0.2, width: 0.5, height: 0.5 });
    const doc = await loadPdf(out);
    for (const page of doc.getPages()) {
      const b = page.getCropBox();
      expect([b.x, b.y, b.width, b.height].map((n) => Math.round(n))).toEqual([40, 180, 200, 300]);
    }
  });

  it('only crops the chosen pages', async () => {
    const out = await cropPdf(await makePdf(3), { x: 0, y: 0, width: 0.5, height: 0.5 }, [2]);
    const doc = await loadPdf(out);
    expect(doc.getPage(0).getCropBox().width).toBe(400);
    expect(doc.getPage(2).getCropBox().width).toBe(200);
  });

  it('crops what the reader sees on rotated pages', async () => {
    // Take the left half of the visible page.
    for (const rotate of [90, 180, 270]) {
      const out = await cropPdf(await makePdf(1, { rotate }), { x: 0, y: 0, width: 0.5, height: 1 });
      const { width, height } = await textItems(out);
      const original = await textItems(await makePdf(1, { rotate }));
      expect(Math.round(width), `w @${rotate}`).toBe(Math.round(original.width / 2));
      expect(Math.round(height), `h @${rotate}`).toBe(Math.round(original.height));
    }
  });

  it('rejects areas outside the page or too small', async () => {
    const pdf = await makePdf(1);
    await expect(cropPdf(pdf, { x: 0.8, y: 0, width: 0.5, height: 1 })).rejects.toThrow(/inside the page/);
    await expect(cropPdf(pdf, { x: 0, y: 0, width: 0.001, height: 1 })).rejects.toThrow(/inside the page/);
    await expect(cropPdf(pdf, { x: NaN, y: 0, width: 0.5, height: 0.5 })).rejects.toThrow(/inside the page/);
  });
});

describe('protect and unlock', () => {
  const opts = { userPassword: 'open-123', allowPrinting: true, allowCopying: false, allowModifying: false };

  it('produces a file that needs the password, in PDF.js and in pdf-lib', async () => {
    const out = await protectPdf(await makePdf(2), opts);
    await expect(PDFDocument.load(out)).rejects.toBeInstanceOf(EncryptedPDFError);
    await expect(textItems(out, 1)).rejects.toMatchObject({ name: 'PasswordException' });
    await expect(textItems(out, 1, 'wrong')).rejects.toMatchObject({ name: 'PasswordException' });
    expect((await textItems(out, 1, 'open-123')).items.map((i) => i.str).join(' ')).toContain('Hello page 1');
  });

  it('refuses empty, non-ASCII, over-long or already protected input', async () => {
    const pdf = await makePdf(1);
    await expect(protectPdf(pdf, { ...opts, userPassword: '' })).rejects.toThrow(/Enter a password/);
    await expect(protectPdf(pdf, { ...opts, userPassword: 'pässword' })).rejects.toThrow(/standard letters/);
    await expect(protectPdf(pdf, { ...opts, userPassword: 'a'.repeat(128) })).rejects.toThrow(/127/);
    const protectedPdf = await protectPdf(pdf, opts);
    await expect(protectPdf(protectedPdf, opts)).rejects.toThrow(/already password-protected/);
    await expect(protectPdf(new TextEncoder().encode('nope'), opts)).rejects.toThrow(/could not be read/);
  });

  it('asks for a password, rejects a wrong one, and unlocks with the right one', async () => {
    const protectedPdf = await protectPdf(await makePdf(2), opts);
    expect(await unlockPdf(protectedPdf)).toEqual({ status: 'needs-password' });
    await expect(unlockPdf(protectedPdf, 'wrong')).rejects.toThrow(/not correct/);

    const res = await unlockPdf(protectedPdf, 'open-123');
    if (res.status !== 'unlocked') throw new Error('expected unlocked');
    // Opens in both libraries without any password and keeps its content.
    expect((await PDFDocument.load(res.bytes)).getPageCount()).toBe(2);
    expect((await textItems(res.bytes, 2)).items.map((i) => i.str).join(' ')).toContain('Hello page 2');
    // No trace of the encryption handler is left in the file.
    const raw = Buffer.from(res.bytes).toString('latin1');
    expect(raw).not.toContain('/Encrypt');
    expect(raw).not.toContain('/Standard');
  });

  it.each(['AES-256', 'AES-128', 'RC4-128'] as const)('unlocks files encrypted with %s', async (algorithm) => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.addPage().drawText('cipher test', { x: 20, y: 20, font });
    doc.encrypt({ userPassword: 'pw-1', ownerPassword: 'own-1', algorithm, allowWeakCryptography: true });
    const encrypted = await doc.save();
    expect(await unlockPdf(encrypted)).toEqual({ status: 'needs-password' });
    const res = await unlockPdf(encrypted, 'pw-1');
    if (res.status !== 'unlocked') throw new Error('expected unlocked');
    expect((await textItems(res.bytes)).items.map((i) => i.str)).toContain('cipher test');
  });

  it('reports PDFs that are not protected', async () => {
    expect(await unlockPdf(await makePdf(1))).toEqual({ status: 'not-protected' });
    await expect(unlockPdf(new TextEncoder().encode('nope'))).rejects.toThrow(PdfError);
  });

  it('removes owner restrictions from a PDF that opens without a password', async () => {
    const doc = await PDFDocument.create();
    doc.addPage().drawText('restricted', { x: 20, y: 20 });
    doc.encrypt({ userPassword: '', ownerPassword: 'owner-secret', permissions: { printing: false, copying: false, modifying: false } });
    const restricted = await doc.save();
    const res = await unlockPdf(restricted);
    if (res.status !== 'unlocked') throw new Error(`expected unlocked, got ${res.status}`);
    expect(Buffer.from(res.bytes).toString('latin1')).not.toContain('/Encrypt');
    expect((await textItems(res.bytes)).items.map((i) => i.str)).toContain('restricted');
  });
});

describe('metadata editing', () => {
  const blank = { title: '', author: '', subject: '', keywords: '', creator: '', producer: '' };

  it('sets, changes and clears individual fields', async () => {
    const set = await editMetadata(await makePdf(1), { ...blank, title: 'My Report', author: 'Ali', keywords: 'finance, q3, draft', subject: 'Quarterly' });
    const m1 = await readMetadata(set);
    expect([m1.title, m1.author, m1.keywords, m1.subject]).toEqual(['My Report', 'Ali', 'finance, q3, draft', 'Quarterly']);

    const changed = await editMetadata(set, { ...blank, title: 'Final Report', author: '', keywords: 'finance, q3, draft', subject: 'Quarterly' });
    const m2 = await readMetadata(changed);
    expect(m2.title).toBe('Final Report');
    expect(m2.author).toBeUndefined();
    expect(m2.keywords).toBe('finance, q3, draft');
  });

  it('handles non-Latin text', async () => {
    const out = await editMetadata(await makePdf(1), { ...blank, title: 'رپورٹ ۲۰۲۶', author: 'علی' });
    const m = await readMetadata(out);
    expect(m.title).toBe('رپورٹ ۲۰۲۶');
    expect(m.author).toBe('علی');
  });

  it('removes all metadata including an embedded XMP copy', async () => {
    const doc = await PDFDocument.create();
    doc.addPage();
    doc.setTitle('Secret');
    doc.setAuthor('Someone');
    doc.catalog.set(PDFName.of('Metadata'), doc.context.register(doc.context.stream('<x:xmpmeta>Secret</x:xmpmeta>', { Type: 'Metadata', Subtype: 'XML' })));
    const out = await editMetadata(await doc.save(), { ...blank }, { clearAll: true });
    const m = await readMetadata(out);
    expect([m.title, m.author, m.created, m.modified]).toEqual([undefined, undefined, undefined, undefined]);
    expect((await loadPdf(out)).catalog.has(PDFName.of('Metadata'))).toBe(false);
    expect(Buffer.from(out).toString('latin1')).not.toContain('Secret');
  });

  it('leaves the file alone when nothing changed', async () => {
    const base = await editMetadata(await makePdf(1), { ...blank, title: 'Same' });
    const before = await readMetadata(base);
    const again = await editMetadata(base, { ...blank, title: 'Same' });
    expect((await readMetadata(again)).modified?.getTime()).toBe(before.modified?.getTime());
  });
});

describe('text extraction', () => {
  it('rebuilds lines from text items', () => {
    const items = [
      { str: 'Hello', transform: [1, 0, 0, 1, 10, 100], width: 30, height: 12 },
      { str: 'world', transform: [1, 0, 0, 1, 45, 100], width: 30, height: 12 },
      { str: 'Next line', transform: [1, 0, 0, 1, 10, 80], width: 50, height: 12 },
      { str: 'Ends here', transform: [1, 0, 0, 1, 10, 60], width: 50, height: 12, hasEOL: true },
      { str: 'Last', transform: [1, 0, 0, 1, 10, 40], width: 20, height: 12 },
    ];
    expect(itemsToText(items)).toBe('Hello world\nNext line\nEnds here\nLast');
  });

  it('does not add spaces inside words or double newlines', () => {
    expect(itemsToText([{ str: 'Pdf', transform: [1, 0, 0, 1, 0, 0], width: 20, height: 12 }, { str: 'Lib', transform: [1, 0, 0, 1, 20, 0], width: 15, height: 12, hasEOL: true }])).toBe('PdfLib');
    expect(itemsToText([])).toBe('');
  });

  it('extracts text page by page from a real PDF', async () => {
    const bytes = await makePdf(3);
    const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise;
    const all = await extractPdfText(doc as never, [1, 2, 3], { pageMarkers: true });
    expect(all.pagesWithText).toBe(3);
    expect(all.text).toContain('--- Page 1 ---\nHello page 1\nSecond line 1');
    expect(all.text).toContain('--- Page 3 ---');
    const some = await extractPdfText(doc as never, [2], { pageMarkers: false });
    expect(some.text).toBe('Hello page 2\nSecond line 2');
  });

  it('reports pages with no selectable text', async () => {
    const bytes = await makePdf(2, { text: false });
    const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
    const res = await extractPdfText(doc as never, [1, 2], { pageMarkers: false });
    expect(res.pagesWithText).toBe(0);
    expect(res.characters).toBe(0);
    expect(res.text).toBe('');
  });
});
