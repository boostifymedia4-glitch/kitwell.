import { PDFArray, PDFDocument, PDFName, PDFNumber, PDFRawStream, StandardFonts } from '@cantoo/pdf-lib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { describe, expect, it } from 'vitest';
import { LEVELS, compressPdfImages, savedPercent, type JpegEncoder } from '../src/lib/pdfCompress';
import { PdfError } from '../src/lib/pdfOps';

// Smallest valid (grayscale) JPEG; pdf-lib reads its size and colour space from the header.
const TINY_JPEG = Uint8Array.from(
  atob('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA='),
  (c) => c.charCodeAt(0),
);

/** A PDF with some text and one embedded JPEG whose stream is padded so that a "re-encode" has room to shrink it. */
async function pdfWithJpeg(opts: { colorSpace?: string | 'icc3' | 'icc4'; filterArray?: boolean; decode?: boolean; pad?: number } = {}) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([300, 300]);
  page.drawText('Keep this text selectable', { x: 20, y: 250, size: 14, font });
  const img = await doc.embedJpg(TINY_JPEG);
  page.drawImage(img, { x: 20, y: 20, width: 100, height: 100 });
  await doc.flush(); // images are embedded lazily
  const stream = doc.context.lookup(img.ref) as PDFRawStream;
  const padded = new Uint8Array(TINY_JPEG.length + (opts.pad ?? 4000));
  padded.set(TINY_JPEG);
  doc.context.assign(img.ref, PDFRawStream.of(stream.dict, padded));
  const dict = (doc.context.lookup(img.ref) as PDFRawStream).dict;
  dict.set(PDFName.of('Length'), PDFNumber.of(padded.length));
  const cs = opts.colorSpace ?? 'DeviceRGB';
  if (cs === 'icc3' || cs === 'icc4') {
    const profile = doc.context.stream(new Uint8Array(8), { N: cs === 'icc3' ? 3 : 4 });
    dict.set(PDFName.of('ColorSpace'), doc.context.obj([PDFName.of('ICCBased'), doc.context.register(profile)]));
  } else dict.set(PDFName.of('ColorSpace'), PDFName.of(cs));
  if (opts.filterArray) dict.set(PDFName.of('Filter'), doc.context.obj([PDFName.of('DCTDecode')]));
  if (opts.decode) dict.set(PDFName.of('Decode'), doc.context.obj([1, 0, 1, 0, 1, 0]));
  return { bytes: await doc.save(), original: padded.length };
}

const shrink: JpegEncoder = async (jpeg, { maxSide }) => ({ bytes: jpeg.slice(0, 200), width: Math.min(maxSide, 50), height: 50 });

async function firstImage(bytes: Uint8Array) {
  const doc = await PDFDocument.load(bytes);
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    if (obj instanceof PDFRawStream && obj.dict.lookup(PDFName.of('Subtype')) === PDFName.of('Image')) return obj;
  }
  throw new Error('no image');
}

describe('LEVELS', () => {
  it('get stronger from light to strong', () => {
    expect(LEVELS.light.quality).toBeGreaterThan(LEVELS.recommended.quality);
    expect(LEVELS.recommended.quality).toBeGreaterThan(LEVELS.strong.quality);
    expect(LEVELS.light.maxSide).toBeGreaterThan(LEVELS.strong.maxSide);
  });
  it('computes saved percentage', () => {
    expect(savedPercent(1000, 400)).toBe(60);
    expect(savedPercent(1000, 1200)).toBe(-20);
    expect(savedPercent(0, 0)).toBe(0);
  });
});

describe('compressPdfImages', () => {
  it('replaces a large RGB JPEG with the re-encoded one and keeps the text', async () => {
    const { bytes, original } = await pdfWithJpeg();
    const { bytes: out, report } = await compressPdfImages(bytes, 'recommended', shrink);
    expect(report).toMatchObject({ imagesFound: 1, imagesRecompressed: 1, imagesSkipped: 0 });
    expect(out.length).toBeLessThan(original);
    const img = await firstImage(out);
    expect(img.getContents().length).toBe(200);
    expect(img.dict.lookup(PDFName.of('Width'))).toEqual(PDFNumber.of(50));
    expect(img.dict.lookup(PDFName.of('ColorSpace'))).toBe(PDFName.of('DeviceRGB'));
    // the text is still real text
    const doc = await pdfjs.getDocument({ data: new Uint8Array(out), useSystemFonts: true }).promise;
    const content = await (await doc.getPage(1)).getTextContent();
    expect(content.items.map((i) => ('str' in i ? i.str : '')).join('')).toContain('Keep this text selectable');
  });

  it('passes the level settings to the encoder', async () => {
    const { bytes } = await pdfWithJpeg();
    const seen: { quality: number; maxSide: number }[] = [];
    for (const level of ['light', 'strong'] as const) {
      await compressPdfImages(bytes, level, async (_jpeg, o) => {
        seen.push(o);
        return null;
      });
    }
    expect(seen).toEqual([
      { quality: LEVELS.light.quality, maxSide: LEVELS.light.maxSide },
      { quality: LEVELS.strong.quality, maxSide: LEVELS.strong.maxSide },
    ]);
  });

  it('keeps the original image when re-encoding does not help or fails', async () => {
    const { bytes } = await pdfWithJpeg();
    const bigger: JpegEncoder = async (j) => ({ bytes: new Uint8Array(j.length + 10), width: 1, height: 1 });
    expect((await compressPdfImages(bytes, 'strong', bigger)).report.imagesRecompressed).toBe(0);
    const failing: JpegEncoder = async () => {
      throw new Error('decode failed');
    };
    expect((await compressPdfImages(bytes, 'strong', failing)).report.imagesRecompressed).toBe(0);
    expect((await compressPdfImages(bytes, 'strong', async () => null)).report.imagesRecompressed).toBe(0);
  });

  it('skips images it should not touch (CMYK, grayscale, decode arrays) and counts them', async () => {
    for (const opts of [{ colorSpace: 'DeviceCMYK' }, { colorSpace: 'DeviceGray' }, { colorSpace: 'icc4' }, { decode: true }]) {
      const { bytes } = await pdfWithJpeg(opts);
      const { report } = await compressPdfImages(bytes, 'strong', shrink);
      expect(report, JSON.stringify(opts)).toMatchObject({ imagesFound: 0, imagesRecompressed: 0, imagesSkipped: 1 });
    }
  });

  it('accepts ICC-based RGB and a one-element filter array', async () => {
    for (const opts of [{ colorSpace: 'icc3' }, { filterArray: true }]) {
      const { bytes } = await pdfWithJpeg(opts);
      expect((await compressPdfImages(bytes, 'strong', shrink)).report.imagesRecompressed, JSON.stringify(opts)).toBe(1);
    }
  });

  it('works on a PDF without images and reports progress', async () => {
    const doc = await PDFDocument.create();
    doc.addPage();
    const calls: number[] = [];
    const { report } = await compressPdfImages(await doc.save(), 'light', shrink, (d) => calls.push(d));
    expect(report).toMatchObject({ imagesFound: 0, imagesRecompressed: 0 });
    expect(calls.length).toBeGreaterThan(0);
  });

  it('rejects data that is not a PDF', async () => {
    await expect(compressPdfImages(new TextEncoder().encode('not a pdf'), 'light', shrink)).rejects.toBeInstanceOf(PdfError);
  });
});

describe('type sanity', () => {
  it('PDFArray is available for filter arrays', () => {
    expect(PDFArray).toBeDefined();
  });
});
