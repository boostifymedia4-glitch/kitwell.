import { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber, PDFString, StandardFonts } from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';
import { buildPdf, type Block } from '../src/lib/docPdf';
import { srgbIccProfile } from '../src/lib/iccProfile';
import { PDFA_PROFILES, PdfABlocked, analyzeForPdfA, buildFlattenedPdfA, buildXmp, checkPdfA, convertKeepingContent, type PdfAProfile } from '../src/lib/pdfA';
import { nodeFontLoader, pdfPages } from './helpers/pdfTestUtils';

const blocks: Block[] = [
  { type: 'heading', level: 1, runs: [{ text: 'Annual report' }] },
  { type: 'paragraph', runs: [{ text: 'This archive copy keeps its selectable text and embedded fonts.' }] },
];

/** A PDF with embedded fonts, plus things PDF/A forbids: JavaScript, a hidden annotation, a custom Info key, NeedAppearances. */
async function problematicPdf(): Promise<Uint8Array> {
  const built = await buildPdf(blocks, { loader: nodeFontLoader, title: 'Annual report' });
  const doc = await PDFDocument.load(built.bytes);
  const ctx = doc.context;
  doc.catalog.set(PDFName.of('OpenAction'), ctx.obj({ S: 'JavaScript', JS: PDFString.of('app.alert(1)') }));
  doc.catalog.set(PDFName.of('Names'), ctx.obj({ JavaScript: ctx.obj({ Names: [] }) }));
  doc.catalog.set(PDFName.of('AcroForm'), ctx.obj({ Fields: [], NeedAppearances: true }));
  const link = ctx.obj({ Type: 'Annot', Subtype: 'Link', Rect: [10, 10, 100, 40], F: 2, A: { S: 'Launch', F: PDFString.of('calc.exe') } });
  doc.getPage(0).node.set(PDFName.of('Annots'), ctx.obj([ctx.register(link)]));
  const info = ctx.lookup(ctx.trailerInfo.Info) as PDFDict;
  info.set(PDFName.of('CustomKey'), PDFString.of('x'));
  return doc.save();
}

describe('PDF/A preparation', () => {
  it('builds a valid ICC sRGB profile', () => {
    const icc = srgbIccProfile();
    const v = new DataView(icc.buffer);
    expect(v.getUint32(0)).toBe(icc.length);
    expect(new TextDecoder().decode(icc.slice(36, 40))).toBe('acsp');
    expect(new TextDecoder().decode(icc.slice(16, 20))).toBe('RGB ');
    expect(new TextDecoder().decode(icc.slice(20, 24))).toBe('XYZ ');
    expect(v.getUint32(8) >>> 24).toBe(2);
    const count = v.getUint32(128);
    expect(count).toBe(9);
    for (let i = 0; i < count; i++) {
      const offset = v.getUint32(132 + i * 12 + 4);
      const size = v.getUint32(132 + i * 12 + 8);
      expect(offset + size).toBeLessThanOrEqual(icc.length);
    }
  });

  it('writes XMP that identifies PDF/A-2b and escapes text', () => {
    const xmp = buildXmp({ title: 'A & B <c>', created: new Date('2026-01-02T03:04:05Z'), modified: new Date('2026-02-03T04:05:06Z') });
    expect(xmp).toContain('<pdfaid:part>2</pdfaid:part>');
    expect(xmp).toContain('<pdfaid:conformance>B</pdfaid:conformance>');
    expect(xmp).toContain('A &amp; B &lt;c&gt;');
    expect(xmp).toContain('<xmp:CreateDate>2026-01-02T03:04:05Z</xmp:CreateDate>');
    expect(xmp.startsWith('<?xpacket begin=')).toBe(true);
    expect(xmp.trimEnd().endsWith('<?xpacket end="w"?>')).toBe(true);
  });

  it('keeps text and fonts, removes what PDF/A forbids and passes its own check', async () => {
    const input = await problematicPdf();
    expect((await checkPdfA(input)).length).toBeGreaterThan(3); // the source is clearly not PDF/A
    const { result } = await convertKeepingContent(input);
    expect(result.mode).toBe('keep');
    expect(result.pages).toBe(1);
    expect(await checkPdfA(result.bytes)).toEqual([]);
    const { texts } = await pdfPages(result.bytes);
    expect(texts[0]).toContain('Annual report');
    expect(texts[0]).toContain('selectable text');
    const raw = new TextDecoder('latin1').decode(result.bytes);
    expect(raw).not.toContain('/JavaScript');
    expect(raw).not.toContain('Launch');
    expect(raw).not.toContain('CustomKey');
    expect(raw).not.toContain('NeedAppearances');
    expect(raw).toContain('GTS_PDFA1');
    const out = await PDFDocument.load(result.bytes, { updateMetadata: false });
    expect(out.context.trailerInfo.ID).toBeDefined();
    expect(out.getTitle()).toBe('Annual report');
    expect(out.getProducer()).toBe('Kitwell');
    const annots = out.getPage(0).node.get(PDFName.of('Annots')) as PDFArray;
    const annot = out.context.lookup(annots.get(0)) as PDFDict;
    const flags = (annot.get(PDFName.of('F')) as PDFNumber).asNumber();
    expect(flags & 4).toBe(4);
    expect(flags & (1 | 2 | 32)).toBe(0);
    expect(result.actions.length).toBeGreaterThanOrEqual(5);
  });

  it('refuses honestly when fonts are not embedded instead of faking PDF/A', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.addPage().drawText('Hello', { font, size: 12, x: 50, y: 700 });
    const bytes = await doc.save();
    expect(analyzeForPdfA(await PDFDocument.load(bytes)).blockers.map((b) => b.key)).toContain('pdfa.block.fonts');
    let blocked: PdfABlocked | undefined;
    try {
      await convertKeepingContent(bytes);
    } catch (err) {
      blocked = err as PdfABlocked;
    }
    expect(blocked).toBeInstanceOf(PdfABlocked);
    const fonts = blocked!.analysis.blockers.find((b) => b.key === 'pdfa.block.fonts');
    expect(String(fonts?.params?.names)).toContain('Helvetica');
  });

  it('builds an image-only PDF/A from rendered pages and passes its own check', async () => {
    const jpeg = Uint8Array.from(
      atob('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q=='),
      (c) => c.charCodeAt(0),
    );
    const result = await buildFlattenedPdfA([{ jpeg, widthPt: 595, heightPt: 842 }, { jpeg, widthPt: 842, heightPt: 595 }], { title: 'Scanned', fallbackTitle: 'x' });
    expect(result.mode).toBe('flatten');
    expect(result.pages).toBe(2);
    expect(await checkPdfA(result.bytes)).toEqual([]);
    const { count, sizes } = await pdfPages(result.bytes);
    expect(count).toBe(2);
    expect(sizes).toEqual([[595, 842], [842, 595]]);
    const doc = await PDFDocument.load(result.bytes);
    expect(doc.getTitle()).toBe('Scanned');
  });

  it.each(PDFA_PROFILES)('writes PDF/A-%s identification, header and passes its own check', async (profile: PdfAProfile) => {
    const { result } = await convertKeepingContent(await problematicPdf(), undefined, profile);
    expect(await checkPdfA(result.bytes, profile)).toEqual([]);
    const head = new TextDecoder('latin1').decode(result.bytes.subarray(0, 8));
    expect(head).toBe(profile.startsWith('1') ? '%PDF-1.4' : profile === '4' ? '%PDF-2.0' : '%PDF-1.7');
    const raw = new TextDecoder('latin1').decode(result.bytes);
    expect(raw).toContain(`<pdfaid:part>${profile[0]}</pdfaid:part>`);
    if (profile === '4') {
      expect(raw).toContain('<pdfaid:rev>2020</pdfaid:rev>');
      expect(raw).not.toContain('/Producer');
    } else {
      expect(raw).toContain(`<pdfaid:conformance>${profile[1].toUpperCase()}</pdfaid:conformance>`);
    }
    // a file prepared for one version is not accepted as another
    expect((await checkPdfA(result.bytes, profile === '2b' ? '3b' : '2b')).length).toBeGreaterThan(0);
  });

  it('PDF/A-1b refuses transparency instead of faking it', async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    page.drawText('x', { font, opacity: 0.5 });
    const analysis = analyzeForPdfA(await PDFDocument.load(await doc.save()), '1b');
    expect(analysis.blockers.map((b) => b.key)).toContain('pdfa.block.transparency');
    expect(analyzeForPdfA(await PDFDocument.load(await doc.save()), '2b').blockers.map((b) => b.key)).not.toContain('pdfa.block.transparency');
  });

  it('the self-check reports a plain PDF as not PDF/A', async () => {
    const doc = await PDFDocument.create();
    doc.addPage();
    const problems = await checkPdfA(await doc.save());
    expect(problems).toEqual(expect.arrayContaining(['XMP metadata is missing', 'the output intent is missing', 'the file identifier is missing']));
  });
});
