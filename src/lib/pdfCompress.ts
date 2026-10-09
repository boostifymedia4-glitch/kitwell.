/**
 * PDF compression that keeps text selectable: embedded JPEG images are decoded, optionally scaled down and
 * re-encoded at a lower quality, and the file is rewritten with compact object streams. Text, vector
 * graphics, fonts and links are left untouched.
 *
 * The JPEG re-encoder is passed in (the browser one lives in ./jpegRecompress.ts) so this module is pure and
 * testable in Node. Only JPEG images are recompressed; other image types and non-image content are kept as is.
 */
import { PDFArray, PDFBool, PDFDict, PDFName, PDFNumber, PDFRawStream, PDFRef, type PDFDocument } from '@cantoo/pdf-lib';
import { loadPdf } from './pdfOps';

export type CompressLevel = 'light' | 'recommended' | 'strong';

export interface LevelSettings {
  label: string;
  /** JPEG quality 0-1 used when re-encoding images. */
  quality: number;
  /** Longest side, in pixels, that embedded images are scaled down to. */
  maxSide: number;
  /** Resolution used by the "flatten pages" mode. */
  dpi: number;
  summary: string;
}

export const LEVELS: Record<CompressLevel, LevelSettings> = {
  light: { label: 'Light', quality: 0.8, maxSide: 2600, dpi: 150, summary: 'Best quality, smaller savings' },
  recommended: { label: 'Recommended', quality: 0.65, maxSide: 1800, dpi: 120, summary: 'Good balance of size and quality' },
  strong: { label: 'Strong', quality: 0.45, maxSide: 1200, dpi: 90, summary: 'Smallest file, visible quality loss' },
};

export interface EncodedJpeg {
  bytes: Uint8Array;
  width: number;
  height: number;
}

export type JpegEncoder = (jpeg: Uint8Array, opts: { quality: number; maxSide: number }) => Promise<EncodedJpeg | null>;

export interface CompressReport {
  /** JPEG images found that could be considered. */
  imagesFound: number;
  imagesRecompressed: number;
  /** Image streams skipped because of their format (CMYK, grayscale, masks, non-JPEG...). */
  imagesSkipped: number;
  originalSize: number;
  newSize: number;
}

const name = (n: string) => PDFName.of(n);

/** Returns the filter name when an image has exactly one filter. */
function singleFilter(dict: PDFDict): string | null {
  const f = dict.lookup(name('Filter'));
  if (f instanceof PDFName) return f.decodeText();
  if (f instanceof PDFArray && f.size() === 1) {
    const only = f.lookup(0);
    if (only instanceof PDFName) return only.decodeText();
  }
  return null;
}

/** True for colour spaces where a re-encoded sRGB JPEG is an acceptable replacement. */
function isRgb(dict: PDFDict): boolean {
  const cs = dict.lookup(name('ColorSpace'));
  if (cs instanceof PDFName) return cs.decodeText() === 'DeviceRGB';
  if (cs instanceof PDFArray && cs.size() >= 1) {
    const head = cs.lookup(0);
    if (!(head instanceof PDFName)) return false;
    const kind = head.decodeText();
    if (kind === 'CalRGB') return true;
    if (kind === 'ICCBased') {
      const profile = cs.lookup(1);
      const n = profile && 'dict' in profile ? (profile as { dict: PDFDict }).dict.lookup(name('N')) : undefined;
      return n instanceof PDFNumber && n.asNumber() === 3;
    }
  }
  return false;
}

function isRecompressible(dict: PDFDict): boolean {
  if (dict.lookup(name('Subtype')) !== name('Image')) return false;
  if (singleFilter(dict) !== 'DCTDecode') return false;
  const mask = dict.lookup(name('ImageMask'));
  if (mask instanceof PDFBool && mask.asBoolean()) return false;
  if (dict.has(name('Decode')) || dict.has(name('Mask'))) return false;
  const bpc = dict.lookup(name('BitsPerComponent'));
  if (bpc instanceof PDFNumber && bpc.asNumber() !== 8) return false;
  return isRgb(dict);
}

/** A re-encoded image replaces the original only when it is meaningfully smaller. */
const MIN_GAIN = 0.9;

export async function compressPdfImages(
  bytes: Uint8Array,
  level: CompressLevel,
  encode: JpegEncoder,
  onProgress?: (done: number, total: number) => void,
): Promise<{ bytes: Uint8Array; report: CompressReport }> {
  const settings = LEVELS[level];
  const doc: PDFDocument = await loadPdf(bytes);
  const context = doc.context;
  const images: [PDFRef, PDFRawStream][] = [];
  let skipped = 0;
  for (const [ref, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream) || obj.dict.lookup(name('Subtype')) !== name('Image')) continue;
    if (isRecompressible(obj.dict)) images.push([ref, obj]);
    else skipped++;
  }

  let recompressed = 0;
  for (let i = 0; i < images.length; i++) {
    onProgress?.(i, images.length);
    const [ref, stream] = images[i];
    const original = stream.getContents();
    let encoded: EncodedJpeg | null;
    try {
      encoded = await encode(original, { quality: settings.quality, maxSide: settings.maxSide });
    } catch {
      encoded = null;
    }
    if (!encoded || encoded.bytes.length >= original.length * MIN_GAIN) continue;
    const dict = stream.dict;
    dict.set(name('Width'), PDFNumber.of(encoded.width));
    dict.set(name('Height'), PDFNumber.of(encoded.height));
    dict.set(name('ColorSpace'), name('DeviceRGB'));
    dict.set(name('BitsPerComponent'), PDFNumber.of(8));
    dict.set(name('Filter'), name('DCTDecode'));
    dict.delete(name('DecodeParms'));
    dict.set(name('Length'), PDFNumber.of(encoded.bytes.length));
    context.assign(ref, PDFRawStream.of(dict, encoded.bytes));
    recompressed++;
  }
  onProgress?.(images.length, images.length);

  const out = await doc.save({ useObjectStreams: true });
  return {
    bytes: out,
    report: {
      imagesFound: images.length,
      imagesRecompressed: recompressed,
      imagesSkipped: skipped,
      originalSize: bytes.length,
      newSize: out.length,
    },
  };
}

export function savedPercent(original: number, now: number): number {
  return original > 0 ? Math.round(((original - now) / original) * 1000) / 10 : 0;
}
