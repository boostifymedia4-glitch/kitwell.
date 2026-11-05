import { PDFDocument } from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';
import { MB, validateFiles } from '../src/lib/files';
import { mergePdfFiles } from '../src/lib/pdfOps';

/** A PDF with `pages` pages. Every page is one point wider than the previous one overall, so the order of a merge can be read from the page sizes. */
async function numberedPdf(firstWidth: number, pages: number): Promise<File> {
  const doc = await PDFDocument.create();
  for (let p = 0; p < pages; p++) doc.addPage([firstWidth + p, 200]);
  const bytes = await doc.save();
  return new File([bytes.buffer as ArrayBuffer], `file-${firstWidth}.pdf`, { type: 'application/pdf' });
}

describe('merging many PDFs', () => {
  it('merges 80 files in the given order', async () => {
    const files: File[] = [];
    const expected: number[] = [];
    let width = 100;
    for (let i = 0; i < 80; i++) {
      const pages = (i % 3) + 1;
      files.push(await numberedPdf(width, pages));
      for (let p = 0; p < pages; p++) expected.push(width + p);
      width += pages;
    }
    const progress: number[] = [];
    const { bytes, pages } = await mergePdfFiles(files, (done) => progress.push(done));
    expect(pages).toBe(expected.length);
    const merged = await PDFDocument.load(bytes);
    expect(merged.getPageCount()).toBe(expected.length);
    expect(merged.getPages().map((p) => Math.round(p.getWidth()))).toEqual(expected);
    expect(progress[0]).toBe(0);
    expect(progress.at(-1)).toBe(80);
  }, 60_000);

  it('follows a changed order', async () => {
    const a = await numberedPdf(100, 2);
    const b = await numberedPdf(300, 1);
    const c = await numberedPdf(500, 3);
    const { bytes } = await mergePdfFiles([c, a, b]);
    const widths = (await PDFDocument.load(bytes)).getPages().map((p) => Math.round(p.getWidth()));
    expect(widths).toEqual([500, 501, 502, 100, 101, 300]);
  });

  it('names the file that cannot be read', async () => {
    const good = await numberedPdf(100, 1);
    const broken = new File(['this is not a pdf'], 'broken-report.pdf', { type: 'application/pdf' });
    await expect(mergePdfFiles([good, broken])).rejects.toThrow(/broken-report\.pdf/);
  });

  it('needs at least two files', async () => {
    await expect(mergePdfFiles([await numberedPdf(100, 1)])).rejects.toThrow();
  });
});

describe('file list limits', () => {
  const pdf = (name: string, bytes: number) => new File([new Uint8Array(bytes)], name, { type: 'application/pdf' });
  const rules = { extensions: ['pdf'], maxBytes: 100 * MB, maxFiles: 80, maxTotalBytes: 10 * MB };

  it('rejects the 81st file and files that are not PDFs', () => {
    const files = Array.from({ length: 81 }, (_, i) => pdf(`f${i}.pdf`, 10));
    const { accepted, rejected } = validateFiles(files, { ...rules, maxTotalBytes: undefined });
    expect(accepted).toHaveLength(80);
    expect(rejected).toHaveLength(1);
    expect(validateFiles([new File(['x'], 'notes.txt')], rules).rejected[0].reason).toMatch(/Unsupported/);
  });

  it('stops adding files when the combined size would pass the total limit', () => {
    const files = [pdf('a.pdf', 6 * MB), pdf('b.pdf', 3 * MB), pdf('c.pdf', 2 * MB)];
    const { accepted, rejected } = validateFiles(files, rules);
    expect(accepted.map((f) => f.name)).toEqual(['a.pdf', 'b.pdf']);
    expect(rejected).toHaveLength(1);
    expect(rejected[0].name).toBe('c.pdf');
    // files that are already in the list count towards the total
    expect(validateFiles([pdf('d.pdf', 2 * MB)], rules, 2, 9 * MB).rejected).toHaveLength(1);
  });
});
