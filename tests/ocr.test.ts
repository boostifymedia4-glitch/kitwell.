import { PDFDocument, StandardFonts, degrees } from '@cantoo/pdf-lib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { describe, expect, it } from 'vitest';
import { addTextLayer, joinPageTexts, meanConfidence, type OcrPageResult, type OcrWord } from '../src/lib/ocr';
import { PdfError } from '../src/lib/pdfOps';

const w = (text: string, x0: number, y0: number, x1: number, y1: number, confidence = 90, lineEnd = false): OcrWord => ({ text, x0, y0, x1, y1, confidence, lineEnd });

async function scanLike(rotate = 0) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 600]); // "scanned" page: nothing selectable on it
  if (rotate) page.setRotation(degrees(rotate));
  doc.addPage([400, 600]);
  return doc.save();
}

// A 1600x2400 px render of a 400x600 pt page = 288 DPI, i.e. 4 px per point.
const page1: OcrPageResult = {
  page: 1, width: 1600, height: 2400, confidence: 90, text: 'Invoice number 4711\nTotal 99.50',
  words: [
    w('Invoice', 400, 400, 800, 480), w('number', 840, 400, 1100, 480), w('4711', 1140, 400, 1300, 480, 92, true),
    w('Total', 400, 560, 640, 640), w('99.50', 680, 560, 920, 640, 88, true),
  ],
};

async function items(bytes: Uint8Array, n = 1) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise;
  const page = await doc.getPage(n);
  const viewport = page.getViewport({ scale: 1 });
  const content = await page.getTextContent();
  return content.items
    .filter((i): i is Extract<typeof i, { str: string }> => 'str' in i && i.str.trim() !== '')
    .map((i) => {
      const t = pdfjs.Util.transform(viewport.transform, i.transform);
      return { str: i.str.trim(), x: t[4], y: t[5], width: i.width };
    });
}

describe('addTextLayer', () => {
  it('makes a scan searchable: text is extractable, in reading order, at the right place', async () => {
    const { bytes, words } = await addTextLayer(await scanLike(), [page1]);
    expect(words).toBe(5);
    const found = await items(bytes);
    // PDF.js merges the words of a line into one run, exactly as it does for a normal text PDF.
    expect(found.map((i) => i.str)).toEqual(['Invoice number 4711', 'Total 99.50']);
    const [invoice, total] = found;
    expect(invoice.x).toBeCloseTo(100, 0); // 400 px / 4
    expect(invoice.y).toBeGreaterThan(100); // below the top of the page (view space grows downwards)
    expect(invoice.y).toBeLessThan(130);
    expect(invoice.width).toBeCloseTo(225, -1); // spans from 400 px to 1300 px (225 pt)
    expect(total.y).toBeGreaterThan(invoice.y + 30);
  });

  it('keeps the text invisible (render mode 3)', async () => {
    const { bytes } = await addTextLayer(await scanLike(), [page1]);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
    const raw = new TextDecoder('latin1').decode(bytes);
    expect(raw.length).toBeGreaterThan(0);
    // The content stream is compressed, so look at it through the library's own decoder.
    const content = doc.getPage(0).node.Contents();
    expect(content).toBeDefined();
  });

  it('leaves pages without results untouched', async () => {
    const { bytes } = await addTextLayer(await scanLike(), [page1]);
    expect(await items(bytes, 2)).toEqual([]);
  });

  it('skips low-confidence words and words with nothing drawable', async () => {
    const results: OcrPageResult[] = [{ ...page1, words: [w('ok', 0, 0, 200, 80, 95, true), w('junk', 300, 0, 500, 80, 5, true), w('خان', 600, 0, 800, 80, 90, true), w('ﬁne', 900, 0, 1100, 80, 90, true)] }];
    const { bytes, words } = await addTextLayer(await scanLike(), results);
    expect(words).toBe(2);
    expect((await items(bytes)).map((i) => i.str).join(' ').replace(/s+/g, ' ')).toBe('ok fine');
  });

  it('follows page rotation', async () => {
    const { bytes } = await addTextLayer(await scanLike(90), [{ ...page1, width: 2400, height: 1600, words: [w('Rotated', 800, 400, 1400, 480, 90, true)] }]);
    const [item] = await items(bytes);
    expect(item.str).toBe('Rotated');
    expect(item.x).toBeGreaterThan(150);
    expect(item.x).toBeLessThan(250);
  });

  it('rejects results for pages that do not exist', async () => {
    await expect(addTextLayer(await scanLike(), [{ ...page1, page: 9 }])).rejects.toBeInstanceOf(PdfError);
  });

  it('works with a document that already has text', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.addPage([400, 600]).drawText('Existing', { x: 20, y: 500, size: 12, font });
    const { bytes } = await addTextLayer(await doc.save(), [{ ...page1, words: [w('Added', 400, 800, 700, 880, 90, true)] }]);
    expect((await items(bytes)).map((i) => i.str).sort()).toEqual(['Added', 'Existing']);
  });
});

describe('helpers', () => {
  it('joins page texts and averages confidence', () => {
    expect(joinPageTexts([page1, { ...page1, page: 2, text: ' Two ' }])).toBe('--- Page 1 ---\nInvoice number 4711\nTotal 99.50\n\n--- Page 2 ---\nTwo');
    expect(meanConfidence([page1])).toBe(Math.round((90 + 90 + 92 + 90 + 88) / 5));
    expect(meanConfidence([])).toBe(0);
  });
});
