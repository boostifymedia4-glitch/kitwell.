import { describe, expect, it } from 'vitest';
import { PDFDocument, StandardFonts } from '@cantoo/pdf-lib';
import { rebuildXref, repairPdf, RepairError } from '../src/lib/pdfRepair';
import { pdfPagesSafe } from './helpers/pdfTestUtils';

async function samplePdf(pages = 5): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= pages; i++) {
    const page = doc.addPage([300, 200]);
    page.drawText(`Page number ${i} of the sample`, { x: 20, y: 100, size: 14, font });
  }
  return doc.save({ useObjectStreams: false });
}
const latin1 = (b: Uint8Array) => new TextDecoder('latin1').decode(b);
const enc = (s: string) => new TextEncoder().encode(s);
const cat = (...parts: Uint8Array[]) => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
};
const verify = async (bytes: Uint8Array) => (await pdfPagesSafe(bytes)).readable;
const pdfPages = pdfPagesSafe;

describe('repair PDF', () => {
  it('does not claim to repair a healthy file', async () => {
    const out = await repairPdf(await samplePdf(), verify);
    expect(out.status).toBe('clean');
    expect(out.pages).toBe(5);
    expect(out.actions[0]).toMatch(/without problems/);
  });

  it('rebuilds a file whose cross-reference table and trailer are gone', async () => {
    const good = await samplePdf();
    const cut = latin1(good).lastIndexOf('xref\n0 ');
    const broken = good.subarray(0, cut);
    const out = await repairPdf(broken, verify);
    expect(out.status).toBe('repaired');
    expect(out.pages).toBe(5);
    const { texts } = await pdfPages(out.bytes);
    expect(texts[0]).toContain('Page number 1');
    expect(texts[4]).toContain('Page number 5');
  });

  it('fixes a wrong startxref offset and junk in front of the header', async () => {
    const good = await samplePdf();
    // Change the number after "startxref" without touching the binary parts of the file.
    const at = latin1(good).lastIndexOf('startxref\n') + 'startxref\n'.length;
    const wrong = cat(good.subarray(0, at), enc('99\n%%EOF\n'));
    const junk = cat(enc('GARBAGE BYTES\r\n\r\n'.repeat(20)), good);
    for (const input of [wrong, junk]) {
      const out = await repairPdf(input, verify);
      expect(out.pages).toBe(5);
      expect((await pdfPages(out.bytes)).texts[2]).toContain('Page number 3');
    }
  });

  it('keeps the pages that survive when a file is cut off, and says how many were lost', async () => {
    const good = await samplePdf(8);
    const broken = good.subarray(0, Math.floor(good.length * 0.62));
    const out = await repairPdf(broken, verify);
    expect(out.status).toBe('repaired');
    expect(out.pages).toBeGreaterThan(0);
    expect(out.pages).toBeLessThan(8);
    const { texts } = await pdfPages(out.bytes);
    expect(texts[0]).toMatch(/Page number \d/);
  });

  it('refuses files that are not PDFs, are encrypted, or are beyond repair', async () => {
    await expect(repairPdf(enc('hello world, definitely not a pdf'))).rejects.toThrow(/not a PDF/);
    await expect(repairPdf(enc('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n/Encrypt 5 0 R\n'))).rejects.toThrow(/password-protected/);
    await expect(repairPdf(enc('%PDF-1.4\nnothing useful follows, only text'))).rejects.toThrow(RepairError);
    await expect(repairPdf(enc('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n'))).rejects.toThrow(/No pages/);
  });

  it('appends a well-formed cross-reference table', async () => {
    const good = await samplePdf(2);
    const rebuilt = rebuildXref(good.subarray(0, latin1(good).lastIndexOf('xref\n0 ')), false);
    const text = latin1(rebuilt.bytes);
    expect(text).toMatch(/xref\n0 \d+\n0000000000 65535 f \n/);
    expect(text).toMatch(/trailer\n<< \/Size \d+ \/Root \d+ 0 R/);
    expect(text.trimEnd().endsWith('%%EOF')).toBe(true);
    expect(rebuilt.objects).toBeGreaterThan(4);
  });
});
