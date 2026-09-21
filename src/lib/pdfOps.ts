/**
 * Pure PDF operations built on pdf-lib. No DOM access, so they run in tests and could move to a worker.
 * pdf-lib can copy, reorder, rotate and embed pages. It cannot edit existing text or render pages.
 */
import { EncryptedPDFError, PDFDocument, degrees, PageSizes } from 'pdf-lib';

export class PdfError extends Error {}

const ENCRYPTED_MESSAGE =
  'This PDF is password-protected. Remove the password in the app that created it, then try again.';
const INVALID_MESSAGE = 'This file could not be read as a PDF. It may be corrupted or not a PDF at all.';

function looksLikePdf(bytes: Uint8Array): boolean {
  // The header may be preceded by a little junk; the spec allows it within the first 1024 bytes.
  const head = new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(bytes.length, 1024)));
  return head.includes('%PDF-');
}

export async function loadPdf(bytes: Uint8Array, opts: { ignoreEncryption?: boolean } = {}): Promise<PDFDocument> {
  if (!looksLikePdf(bytes)) throw new PdfError(INVALID_MESSAGE);
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(bytes, { ignoreEncryption: opts.ignoreEncryption ?? false, updateMetadata: false });
    // pdf-lib is lenient and will "load" some garbage as an empty document; treat that as corruption.
    if (doc.getPageCount() < 1) throw new Error('no pages');
  } catch (err) {
    if (err instanceof EncryptedPDFError) throw new PdfError(ENCRYPTED_MESSAGE);
    throw new PdfError(INVALID_MESSAGE);
  }
  return doc;
}

export async function pageCountOf(bytes: Uint8Array): Promise<number> {
  return (await loadPdf(bytes)).getPageCount();
}

export async function mergePdfs(
  files: Uint8Array[],
  opts: { names?: string[]; onProgress?: (done: number, total: number) => void } = {},
): Promise<Uint8Array> {
  if (files.length < 2) throw new PdfError('Add at least two PDF files to merge.');
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    opts.onProgress?.(i, files.length);
    let src: PDFDocument;
    try {
      src = await loadPdf(files[i]);
    } catch (err) {
      throw new PdfError(`${opts.names?.[i] ?? `File ${i + 1}`}: ${(err as Error).message}`);
    }
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  opts.onProgress?.(files.length, files.length);
  return out.save();
}

export interface PageSpec {
  /** Zero-based index in the source document. */
  index: number;
  /** Extra clockwise rotation in degrees (multiple of 90). */
  rotate?: number;
}

/** Build a new PDF from a list of pages of `bytes`, in the given order, with optional rotation. */
export async function buildFromPages(bytes: Uint8Array, specs: PageSpec[]): Promise<Uint8Array> {
  if (specs.length === 0) throw new PdfError('Select at least one page.');
  const src = await loadPdf(bytes);
  const total = src.getPageCount();
  if (specs.some((s) => s.index < 0 || s.index >= total)) throw new PdfError('A selected page does not exist in this PDF.');
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, specs.map((s) => s.index));
  copied.forEach((page, i) => {
    const extra = specs[i].rotate ?? 0;
    if (extra) page.setRotation(degrees((((page.getRotation().angle + extra) % 360) + 360) % 360));
    out.addPage(page);
  });
  return out.save();
}

/** Split one PDF into several, parsing the source only once. Each group is a list of zero-based pages. */
export async function splitPdf(
  bytes: Uint8Array,
  groups: number[][],
  onProgress?: (done: number, total: number) => void,
): Promise<Uint8Array[]> {
  const src = await loadPdf(bytes);
  const outputs: Uint8Array[] = [];
  for (let g = 0; g < groups.length; g++) {
    onProgress?.(g, groups.length);
    const out = await PDFDocument.create();
    const pages = await out.copyPages(src, groups[g]);
    pages.forEach((p) => out.addPage(p));
    outputs.push(await out.save());
    // Let the browser breathe between large outputs.
    await new Promise((r) => setTimeout(r, 0));
  }
  onProgress?.(groups.length, groups.length);
  return outputs;
}

/**
 * Parse "1-3, 5, 8-" style lists into zero-based page indexes, preserving order and removing duplicates.
 * `-` at the end of a range means "to the last page".
 */
export function parsePageList(input: string, pageCount: number): number[] {
  const text = input.trim();
  if (!text) throw new PdfError('Enter the pages you want, for example 1-3, 5.');
  const seen = new Set<number>();
  const result: number[] = [];
  for (const part of text.split(',')) {
    const token = part.trim();
    if (!token) continue;
    const m = /^(\d+)\s*(?:-\s*(\d*))?$/.exec(token);
    if (!m) throw new PdfError(`"${token}" is not a valid page or range.`);
    const start = Number(m[1]);
    const hasDash = token.includes('-');
    const end = hasDash ? (m[2] ? Number(m[2]) : pageCount) : start;
    if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
      throw new PdfError(`"${token}" is outside this document, which has ${pageCount} page${pageCount === 1 ? '' : 's'}.`);
    }
    if (end < start) throw new PdfError(`"${token}" is backwards. Write ranges from low to high, like ${end}-${start}.`);
    for (let p = start; p <= end; p++) {
      if (!seen.has(p)) {
        seen.add(p);
        result.push(p - 1);
      }
    }
  }
  if (result.length === 0) throw new PdfError('Enter the pages you want, for example 1-3, 5.');
  return result;
}

/** Parse "1-3, 4-6, 7+9" into separate output files. `+` joins pieces into a single file. */
export function parseSplitGroups(input: string, pageCount: number): number[][] {
  const text = input.trim();
  if (!text) throw new PdfError('Enter the ranges for each output file, for example 1-3, 4-6.');
  const groups = text
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)
    .map((g) => parsePageList(g.replace(/\+/g, ','), pageCount));
  if (groups.length === 0) throw new PdfError('Enter the ranges for each output file, for example 1-3, 4-6.');
  return groups;
}

export function everyNGroups(pageCount: number, n: number): number[][] {
  const size = Math.max(1, Math.floor(n));
  const groups: number[][] = [];
  for (let start = 0; start < pageCount; start += size) {
    groups.push(Array.from({ length: Math.min(size, pageCount - start) }, (_, i) => start + i));
  }
  return groups;
}

export interface ImageInput {
  bytes: Uint8Array;
  kind: 'jpg' | 'png';
}

export interface ImagesToPdfOptions {
  pageSize: 'fit' | 'a4' | 'letter';
  orientation: 'auto' | 'portrait' | 'landscape';
  /** Margin in points. */
  margin: number;
}

const PX_TO_PT = 0.75;

export async function imagesToPdf(images: ImageInput[], opts: ImagesToPdfOptions): Promise<Uint8Array> {
  if (images.length === 0) throw new PdfError('Add at least one image.');
  const doc = await PDFDocument.create();
  for (const img of images) {
    let embedded;
    try {
      embedded = img.kind === 'jpg' ? await doc.embedJpg(img.bytes) : await doc.embedPng(img.bytes);
    } catch {
      throw new PdfError('One of the images could not be embedded. It may be corrupted or use an unsupported variant.');
    }
    const iw = embedded.width * PX_TO_PT;
    const ih = embedded.height * PX_TO_PT;
    const m = opts.margin;

    if (opts.pageSize === 'fit') {
      const page = doc.addPage([iw + 2 * m, ih + 2 * m]);
      page.drawImage(embedded, { x: m, y: m, width: iw, height: ih });
      continue;
    }

    const [bw, bh] = opts.pageSize === 'a4' ? PageSizes.A4 : PageSizes.Letter;
    const landscape = opts.orientation === 'auto' ? iw > ih : opts.orientation === 'landscape';
    const [pw, ph] = landscape ? [bh, bw] : [bw, bh];
    const page = doc.addPage([pw, ph]);
    const scale = Math.min((pw - 2 * m) / iw, (ph - 2 * m) / ih, 1e6);
    const w = iw * scale;
    const h = ih * scale;
    page.drawImage(embedded, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
  }
  return doc.save();
}

export interface PdfMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  created?: Date;
  modified?: Date;
  pageCount: number;
  version?: string;
  pageSizes: { width: number; height: number; count: number }[];
  fileSize: number;
}

export async function readMetadata(bytes: Uint8Array): Promise<PdfMetadata> {
  const doc = await loadPdf(bytes);
  const sizes = new Map<string, { width: number; height: number; count: number }>();
  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    const key = `${width.toFixed(1)}x${height.toFixed(1)}`;
    const entry = sizes.get(key);
    if (entry) entry.count++;
    else sizes.set(key, { width, height, count: 1 });
  }
  const header = /%PDF-(\d\.\d)/.exec(new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(bytes.length, 1024))));
  return {
    title: doc.getTitle() || undefined,
    author: doc.getAuthor() || undefined,
    subject: doc.getSubject() || undefined,
    keywords: doc.getKeywords() || undefined,
    creator: doc.getCreator() || undefined,
    producer: doc.getProducer() || undefined,
    created: doc.getCreationDate() ?? undefined,
    modified: doc.getModificationDate() ?? undefined,
    pageCount: doc.getPageCount(),
    version: header?.[1],
    pageSizes: [...sizes.values()],
    fileSize: bytes.length,
  };
}
