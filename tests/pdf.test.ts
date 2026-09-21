import { PDFDocument, degrees } from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import {
  buildFromPages, everyNGroups, imagesToPdf, loadPdf, mergePdfs, parsePageList, parseSplitGroups, PdfError, readMetadata,
} from '../src/lib/pdfOps';

async function makePdf(pages: number, title?: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([200 + i * 10, 300]);
  if (title) doc.setTitle(title);
  return doc.save();
}

// 1x1 PNG and a minimal JPEG (valid header + tiny image) generated offline.
const PNG_1X1 = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='),
  (c) => c.charCodeAt(0),
);

describe('page list parsing', () => {
  it('parses ranges, singles and open ranges', () => {
    expect(parsePageList('1-3, 5', 10)).toEqual([0, 1, 2, 4]);
    expect(parsePageList('8-', 10)).toEqual([7, 8, 9]);
    expect(parsePageList('2,2,1', 5)).toEqual([1, 0]);
  });
  it('rejects bad input with clear messages', () => {
    expect(() => parsePageList('', 5)).toThrow(PdfError);
    expect(() => parsePageList('0', 5)).toThrow(/outside/);
    expect(() => parsePageList('6', 5)).toThrow(/outside/);
    expect(() => parsePageList('3-1', 5)).toThrow(/backwards/);
    expect(() => parsePageList('a', 5)).toThrow(/not a valid/);
  });
  it('parses split groups', () => {
    expect(parseSplitGroups('1-2, 3, 4+6', 6)).toEqual([[0, 1], [2], [3, 5]]);
  });
  it('makes every-N groups', () => {
    expect(everyNGroups(5, 2)).toEqual([[0, 1], [2, 3], [4]]);
  });
});

describe('PDF operations', () => {
  it('merges documents', async () => {
    const merged = await mergePdfs([await makePdf(2), await makePdf(3)]);
    expect((await loadPdf(merged)).getPageCount()).toBe(5);
  });
  it('requires two files to merge', async () => {
    await expect(mergePdfs([await makePdf(1)])).rejects.toThrow(/at least two/);
  });
  it('extracts and reorders pages', async () => {
    const src = await makePdf(3);
    const out = await loadPdf(await buildFromPages(src, [{ index: 2 }, { index: 0 }]));
    expect(out.getPageCount()).toBe(2);
    expect(out.getPage(0).getWidth()).toBe(220); // page 3 was 220pt wide
    expect(out.getPage(1).getWidth()).toBe(200);
  });
  it('rotates pages relative to the existing rotation', async () => {
    const doc = await PDFDocument.create();
    doc.addPage().setRotation(degrees(90));
    doc.addPage();
    const out = await loadPdf(await buildFromPages(await doc.save(), [{ index: 0, rotate: 90 }, { index: 1, rotate: -90 }]));
    expect(out.getPage(0).getRotation().angle).toBe(180);
    expect(out.getPage(1).getRotation().angle).toBe(270);
  });
  it('rejects out-of-range pages and empty selections', async () => {
    const src = await makePdf(1);
    await expect(buildFromPages(src, [{ index: 4 }])).rejects.toThrow(/does not exist/);
    await expect(buildFromPages(src, [])).rejects.toThrow(/at least one/);
  });
  it('rejects non-PDF and corrupted data', async () => {
    await expect(loadPdf(new TextEncoder().encode('hello'))).rejects.toThrow(/not a PDF/);
    await expect(loadPdf(new TextEncoder().encode('%PDF-1.4 garbage'))).rejects.toThrow(PdfError);
  });
  it('reads metadata', async () => {
    const meta = await readMetadata(await makePdf(2, 'My Title'));
    expect(meta.title).toBe('My Title');
    expect(meta.pageCount).toBe(2);
    expect(meta.pageSizes).toHaveLength(2);
    expect(meta.version).toMatch(/^\d\.\d$/);
  });
});

describe('images to PDF', () => {
  it('creates a page per image with fit sizing', async () => {
    const out = await loadPdf(await imagesToPdf([{ bytes: PNG_1X1, kind: 'png' }, { bytes: PNG_1X1, kind: 'png' }], { pageSize: 'fit', orientation: 'auto', margin: 10 }));
    expect(out.getPageCount()).toBe(2);
    expect(out.getPage(0).getWidth()).toBeCloseTo(0.75 + 20, 2);
  });
  it('uses A4 pages', async () => {
    const out = await loadPdf(await imagesToPdf([{ bytes: PNG_1X1, kind: 'png' }], { pageSize: 'a4', orientation: 'auto', margin: 0 }));
    expect(Math.round(out.getPage(0).getWidth())).toBe(595);
  });
  it('rejects corrupted images', async () => {
    await expect(imagesToPdf([{ bytes: new Uint8Array([1, 2, 3]), kind: 'jpg' }], { pageSize: 'fit', orientation: 'auto', margin: 0 })).rejects.toThrow(/could not be embedded/);
  });
});
