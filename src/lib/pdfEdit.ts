/**
 * PDF editing operations that draw on pages, change page boxes, or change security and metadata.
 * Pure functions on bytes (no DOM), so they can be tested in Node.
 *
 * Everything here ADDS content on top of pages or changes properties. None of it edits the existing
 * text of a PDF, and the tools that use it say so.
 */
import {
  EncryptedPDFError,
  PDFDict,
  PDFDocument,
  PDFInvalidObject,
  PDFName,
  PDFRef,
  PDFStream,
  StandardFonts,
  degrees,
  rgb,
  type PDFFont,
  type PDFPage,
} from '@cantoo/pdf-lib';
import { PdfError, loadPdf } from './pdfOps';

// ---------- Geometry: draw in "visible" space, whatever the page rotation is ----------

type Rotation = 0 | 90 | 180 | 270;

export interface VisibleBox {
  /** Origin of the page's visible (crop) box in page space. */
  x: number;
  y: number;
  /** Size of the box in page space (before the page /Rotate is applied). */
  w: number;
  h: number;
  rotation: Rotation;
  /** Size as the reader sees it (width and height swap for 90° and 270°). */
  visibleWidth: number;
  visibleHeight: number;
}

export function visibleBox(page: PDFPage): VisibleBox {
  const box = page.getCropBox();
  const rotation = ((((Math.round(page.getRotation().angle / 90) * 90) % 360) + 360) % 360) as Rotation;
  const swap = rotation === 90 || rotation === 270;
  return {
    x: box.x,
    y: box.y,
    w: box.width,
    h: box.height,
    rotation,
    visibleWidth: swap ? box.height : box.width,
    visibleHeight: swap ? box.width : box.height,
  };
}

/** Maps a point given in visible space (origin bottom-left of what the reader sees) to page space. */
export function visibleToPage(vb: VisibleBox, vx: number, vy: number): { x: number; y: number } {
  switch (vb.rotation) {
    case 90:
      return { x: vb.x + vb.w - vy, y: vb.y + vx };
    case 180:
      return { x: vb.x + vb.w - vx, y: vb.y + vb.h - vy };
    case 270:
      return { x: vb.x + vy, y: vb.y + vb.h - vx };
    default:
      return { x: vb.x + vx, y: vb.y + vy };
  }
}

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Rotates the vector (x, y) by `deg` degrees counter-clockwise. */
function rotateVec(x: number, y: number, deg: number) {
  const c = Math.cos(rad(deg));
  const s = Math.sin(rad(deg));
  return { x: x * c - y * s, y: x * s + y * c };
}

export function hexToRgb(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new PdfError('Choose a valid colour.');
  const n = parseInt(m[1], 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const LATIN_ONLY =
  'Only Latin letters, digits and common symbols can be used here, because PDF’s built-in fonts do not include other alphabets.';

/** Embeds a standard font and checks that every character can be drawn with it. */
async function textFont(doc: PDFDocument, text: string, bold: boolean): Promise<PDFFont> {
  const font = await doc.embedFont(bold ? StandardFonts.HelveticaBold : StandardFonts.Helvetica);
  // The library silently "encodes" unsupported characters as garbage, so check the font's real character set.
  const supported = new Set(font.getCharacterSet());
  for (const ch of text) {
    if (!supported.has(ch.codePointAt(0) as number)) throw new PdfError(LATIN_ONLY);
  }
  return font;
}

/** Zero-based page indexes -> validated, de-duplicated and sorted. Defaults to every page. */
function pageSet(doc: PDFDocument, pages?: number[]): Set<number> {
  const total = doc.getPageCount();
  if (!pages) return new Set(Array.from({ length: total }, (_, i) => i));
  if (pages.length === 0 || pages.some((p) => p < 0 || p >= total)) throw new PdfError('Choose valid pages.');
  return new Set(pages);
}

// ---------- Page numbers ----------

export type NumberPosition = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
export type NumberFormat = 'n' | 'page-n' | 'n-of-total' | 'page-n-of-total';

export interface PageNumberOptions {
  position: NumberPosition;
  format: NumberFormat;
  /** The number shown on the first numbered page. */
  startAt: number;
  /** First page (1-based) that receives a number. */
  fromPage: number;
  /** Last page (1-based) that receives a number. Defaults to the last page. */
  toPage?: number;
  size: number;
  /** Distance from the page edge, in points. */
  margin: number;
  color: string;
}

export function formatPageNumber(format: NumberFormat, n: number, total: number): string {
  switch (format) {
    case 'page-n':
      return `Page ${n}`;
    case 'n-of-total':
      return `${n} of ${total}`;
    case 'page-n-of-total':
      return `Page ${n} of ${total}`;
    default:
      return String(n);
  }
}

export async function addPageNumbers(bytes: Uint8Array, opts: PageNumberOptions): Promise<Uint8Array> {
  const doc = await loadPdf(bytes);
  const count = doc.getPageCount();
  const to = opts.toPage ?? count;
  if (!Number.isInteger(opts.fromPage) || opts.fromPage < 1 || opts.fromPage > count) {
    throw new PdfError(`The first page to number must be between 1 and ${count}.`);
  }
  if (!Number.isInteger(to) || to < opts.fromPage || to > count) {
    throw new PdfError(`The last page to number must be between ${opts.fromPage} and ${count}.`);
  }
  if (!Number.isInteger(opts.startAt) || opts.startAt < 0 || opts.startAt > 99999) throw new PdfError('Start numbering at a whole number from 0 to 99,999.');
  if (!(opts.size >= 6 && opts.size <= 72)) throw new PdfError('Font size must be between 6 and 72.');
  if (!(opts.margin >= 0 && opts.margin <= 200)) throw new PdfError('Margin must be between 0 and 200.');

  const color = hexToRgb(opts.color);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const numbered = to - opts.fromPage + 1;
  const lastNumber = opts.startAt + numbered - 1;

  doc.getPages().forEach((page, i) => {
    const pageNo = i + 1;
    if (pageNo < opts.fromPage || pageNo > to) return;
    const text = formatPageNumber(opts.format, opts.startAt + (pageNo - opts.fromPage), lastNumber);
    const vb = visibleBox(page);
    const tw = font.widthOfTextAtSize(text, opts.size);
    const [vertical, horizontal] = opts.position.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right'];
    const vx = horizontal === 'left' ? opts.margin : horizontal === 'right' ? vb.visibleWidth - opts.margin - tw : (vb.visibleWidth - tw) / 2;
    const vy = vertical === 'bottom' ? opts.margin : vb.visibleHeight - opts.margin - opts.size * 0.75;
    const at = visibleToPage(vb, vx, vy);
    page.drawText(text, { x: at.x, y: at.y, size: opts.size, font, color, rotate: degrees(vb.rotation) });
  });
  return doc.save();
}

// ---------- Watermark ----------

export interface TextMark {
  kind: 'text';
  text: string;
  size: number;
  bold: boolean;
  color: string;
}
export interface ImageMark {
  kind: 'image';
  bytes: Uint8Array;
  type: 'png' | 'jpg';
  /** Width of the mark as a fraction of the visible page width. */
  scale: number;
}
export interface WatermarkOptions {
  mark: TextMark | ImageMark;
  opacity: number;
  /** Counter-clockwise angle in degrees, as the reader sees it. */
  angle: number;
  layout: 'center' | 'tile';
  /** Zero-based pages. Defaults to all pages. */
  pages?: number[];
}

const MAX_MARKS_PER_PAGE = 300;

export async function addWatermark(bytes: Uint8Array, opts: WatermarkOptions): Promise<Uint8Array> {
  if (!(opts.opacity >= 0.05 && opts.opacity <= 1)) throw new PdfError('Opacity must be between 5% and 100%.');
  if (!(opts.angle >= -180 && opts.angle <= 180)) throw new PdfError('Angle must be between -180 and 180 degrees.');
  const doc = await loadPdf(bytes);
  const pages = pageSet(doc, opts.pages);

  let drawMark: (page: PDFPage, vb: VisibleBox, cx: number, cy: number) => void;
  let markW: number;
  let markH: number;

  if (opts.mark.kind === 'text') {
    const { text, size, bold, color } = opts.mark;
    if (!text.trim()) throw new PdfError('Enter the watermark text.');
    if (text.length > 100) throw new PdfError('Watermark text can be at most 100 characters.');
    if (!(size >= 6 && size <= 300)) throw new PdfError('Font size must be between 6 and 300.');
    const font = await textFont(doc, text, bold);
    const fill = hexToRgb(color);
    markW = font.widthOfTextAtSize(text, size);
    markH = size * 0.72;
    drawMark = (page, vb, cx, cy) => {
      const off = rotateVec(markW / 2, markH / 2, opts.angle);
      const at = visibleToPage(vb, cx - off.x, cy - off.y);
      page.drawText(text, { x: at.x, y: at.y, size, font, color: fill, opacity: opts.opacity, rotate: degrees(opts.angle + vb.rotation) });
    };
  } else {
    const { bytes: img, type, scale } = opts.mark;
    if (!(scale >= 0.05 && scale <= 1)) throw new PdfError('Image size must be between 5% and 100% of the page width.');
    let embedded;
    try {
      embedded = type === 'png' ? await doc.embedPng(img) : await doc.embedJpg(img);
    } catch {
      throw new PdfError('The watermark image could not be read. Use a valid PNG or JPG file.');
    }
    // Page widths differ, so the mark is sized per page below.
    markW = embedded.width;
    markH = embedded.height;
    drawMark = (page, vb, cx, cy) => {
      const w = vb.visibleWidth * scale;
      const h = (embedded.height / embedded.width) * w;
      const off = rotateVec(w / 2, h / 2, opts.angle);
      const at = visibleToPage(vb, cx - off.x, cy - off.y);
      page.drawImage(embedded, { x: at.x, y: at.y, width: w, height: h, opacity: opts.opacity, rotate: degrees(opts.angle + vb.rotation) });
    };
  }

  doc.getPages().forEach((page, i) => {
    if (!pages.has(i)) return;
    const vb = visibleBox(page);
    if (opts.layout === 'center') {
      drawMark(page, vb, vb.visibleWidth / 2, vb.visibleHeight / 2);
      return;
    }
    // Tiled: a staggered grid of marks covering the visible page.
    const w = opts.mark.kind === 'image' ? vb.visibleWidth * opts.mark.scale : markW;
    const h = opts.mark.kind === 'image' ? (markH / markW) * w : markH;
    const stepX = w * 1.6 + 20;
    const stepY = Math.max(h * 3, 60);
    const cols = Math.ceil(vb.visibleWidth / stepX) + 2;
    const rows = Math.ceil(vb.visibleHeight / stepY) + 2;
    if (cols * rows > MAX_MARKS_PER_PAGE) throw new PdfError('The watermark is too small to tile. Use a larger size or the centred layout.');
    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const cx = c * stepX + (r % 2 === 0 ? 0 : stepX / 2) + stepX / 2;
        const cy = r * stepY + stepY / 2;
        if (cx < -stepX || cx > vb.visibleWidth + stepX || cy < -stepY || cy > vb.visibleHeight + stepY) continue;
        drawMark(page, vb, cx, cy);
      }
    }
  });
  return doc.save();
}

// ---------- Crop ----------

/** A crop area as fractions (0-1) of the visible page, measured from the top-left like the on-screen preview. */
export interface CropFractions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function cropPdf(bytes: Uint8Array, area: CropFractions, pages?: number[]): Promise<Uint8Array> {
  const { x, y, width, height } = area;
  if (![x, y, width, height].every(Number.isFinite) || x < 0 || y < 0 || width < 0.02 || height < 0.02 || x + width > 1.0001 || y + height > 1.0001) {
    throw new PdfError('Choose a crop area inside the page.');
  }
  const doc = await loadPdf(bytes);
  const targets = pageSet(doc, pages);
  doc.getPages().forEach((page, i) => {
    if (!targets.has(i)) return;
    const vb = visibleBox(page);
    // Visible-space rectangle, origin bottom-left.
    const left = x * vb.visibleWidth;
    const right = (x + width) * vb.visibleWidth;
    const top = (1 - y) * vb.visibleHeight;
    const bottom = (1 - y - height) * vb.visibleHeight;
    const a = visibleToPage(vb, left, bottom);
    const b = visibleToPage(vb, right, top);
    const bx = Math.min(a.x, b.x);
    const by = Math.min(a.y, b.y);
    const bw = Math.abs(b.x - a.x);
    const bh = Math.abs(b.y - a.y);
    if (bw < 10 || bh < 10) throw new PdfError('The crop area is too small on page ' + (i + 1) + '.');
    page.setCropBox(bx, by, bw, bh);
  });
  return doc.save();
}

// ---------- Protect / unlock ----------

export interface ProtectOptions {
  userPassword: string;
  allowPrinting: boolean;
  allowCopying: boolean;
  allowModifying: boolean;
}

const PRINTABLE_ASCII = /^[\x20-\x7e]+$/;

function randomPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const buf = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(buf, (b) => chars[b % chars.length]).join('');
}

export async function protectPdf(bytes: Uint8Array, opts: ProtectOptions): Promise<Uint8Array> {
  const pw = opts.userPassword;
  if (!pw) throw new PdfError('Enter a password.');
  if (pw.length > 127) throw new PdfError('The password can be at most 127 characters.');
  if (!PRINTABLE_ASCII.test(pw)) throw new PdfError('Use only standard letters, digits and symbols in the password so every PDF reader can open the file.');

  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (err) {
    if (err instanceof EncryptedPDFError) throw new PdfError('This PDF is already password-protected. Unlock it first with the Unlock PDF tool.');
    throw new PdfError('This file could not be read as a PDF. It may be corrupted or not a PDF at all.');
  }
  if (doc.isEncrypted) throw new PdfError('This PDF is already protected. Unlock it first with the Unlock PDF tool.');
  if (doc.getPageCount() < 1) throw new PdfError('This file could not be read as a PDF. It may be corrupted or not a PDF at all.');

  doc.encrypt({
    userPassword: pw,
    // The owner password only exists to satisfy the PDF format. It is random and never stored.
    ownerPassword: randomPassword(),
    permissions: {
      printing: opts.allowPrinting ? 'highResolution' : false,
      copying: opts.allowCopying,
      modifying: opts.allowModifying,
      annotating: opts.allowModifying,
      fillingForms: opts.allowModifying,
      documentAssembly: opts.allowModifying,
      contentAccessibility: true,
    },
  });
  return doc.save();
}

/**
 * Removes every trace of the encryption handler. After a password-protected PDF is opened and saved,
 * the library keeps leftovers in the file: the old trailer (as raw text), the /Encrypt dictionary, and
 * the original object streams whose contents it has already unpacked.
 */
function scrubEncryption(doc: PDFDocument) {
  const ctx = doc.context;
  ctx.trailerInfo.Encrypt = undefined;
  const encrypt = PDFName.of('Encrypt');
  const type = PDFName.of('Type');
  const isHandler = (d: PDFDict) => d.get(PDFName.of('Filter')) === PDFName.of('Standard') && d.has(PDFName.of('O')) && d.has(PDFName.of('U'));
  const latin1 = new TextDecoder('latin1');
  const doomed = [];
  for (const [ref, obj] of ctx.enumerateIndirectObjects()) {
    if (obj instanceof PDFInvalidObject) {
      const raw = new Uint8Array(obj.sizeInBytes());
      obj.copyBytesInto(raw, 0);
      if (latin1.decode(raw).includes('/Encrypt')) doomed.push(ref);
      continue;
    }
    const dict = obj instanceof PDFDict ? obj : obj instanceof PDFStream ? obj.dict : undefined;
    if (!dict) continue;
    const kind = dict.get(type);
    const unpackedContainer = obj instanceof PDFStream && (kind === PDFName.of('ObjStm') || kind === PDFName.of('XRef'));
    if (dict.has(encrypt) || isHandler(dict) || unpackedContainer) doomed.push(ref);
  }
  for (const ref of doomed) ctx.delete(ref);
}

// A PDF that loads without a password is not protected.
async function finishNotProtected(doc: PDFDocument): Promise<UnlockResult> {
  if (doc.getPageCount() < 1) throw new PdfError('This file could not be read as a PDF. It may be corrupted or not a PDF at all.');
  return { status: 'not-protected' };
}

export type UnlockResult =
  | { status: 'unlocked'; bytes: Uint8Array }
  | { status: 'needs-password' }
  | { status: 'not-protected' };

/**
 * Removes password protection from a PDF the user has the password for, or removes owner restrictions
 * (printing, copying) from a PDF that opens without a password. It never guesses or cracks passwords.
 */
export async function unlockPdf(bytes: Uint8Array, password?: string): Promise<UnlockResult> {
  const head = new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(bytes.length, 1024)));
  if (!head.includes('%PDF-')) throw new PdfError('This file could not be read as a PDF. It may be corrupted or not a PDF at all.');

  // After a successful password load the library clears its own encryption flags, so "was it protected?"
  // is decided here: a plain load either succeeds (not protected) or throws EncryptedPDFError.
  let doc: PDFDocument;
  try {
    return await finishNotProtected(await PDFDocument.load(bytes, { updateMetadata: false }));
  } catch (err) {
    if (!(err instanceof EncryptedPDFError)) {
      if (err instanceof PdfError) throw err;
      throw new PdfError('This file could not be read as a PDF. It may be corrupted or not a PDF at all.');
    }
  }
  const tryLoad = async (pw: string) => {
    try {
      return await PDFDocument.load(bytes, { password: pw, updateMetadata: false });
    } catch (inner) {
      if (inner instanceof Error && /password/i.test(inner.message)) return null;
      throw new PdfError('This PDF could not be unlocked. It may use an unsupported kind of protection.');
    }
  };
  // PDFs that only restrict printing or copying open with an empty password.
  const withEmpty = await tryLoad('');
  if (withEmpty) doc = withEmpty;
  else {
    if (!password) return { status: 'needs-password' };
    const withPassword = await tryLoad(password);
    if (!withPassword) throw new PdfError('That password is not correct.');
    doc = withPassword;
  }
  if (doc.getPageCount() < 1) throw new PdfError('This PDF could not be unlocked. It may be damaged.');
  scrubEncryption(doc);
  return { status: 'unlocked', bytes: await doc.save({ useObjectStreams: false }) };
}

// ---------- Metadata ----------

export interface EditableMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
}

export function readEditableMetadata(doc: PDFDocument): EditableMetadata {
  return {
    title: doc.getTitle() ?? '',
    author: doc.getAuthor() ?? '',
    subject: doc.getSubject() ?? '',
    keywords: doc.getKeywords() ?? '',
    creator: doc.getCreator() ?? '',
    producer: doc.getProducer() ?? '',
  };
}

const INFO_KEYS = ['Title', 'Author', 'Subject', 'Keywords', 'Creator', 'Producer', 'CreationDate', 'ModDate', 'Trapped'];

/** Deletes the catalog's XMP metadata stream, including the stream object itself so its text cannot survive in the file. */
function dropXmp(doc: PDFDocument) {
  const key = PDFName.of('Metadata');
  const ref = doc.catalog.get(key);
  doc.catalog.delete(key);
  if (ref instanceof PDFRef) doc.context.delete(ref);
}

function removeInfoKeys(doc: PDFDocument, keys: string[]) {
  const info = doc.context.lookup(doc.context.trailerInfo.Info);
  if (info instanceof PDFDict) for (const k of keys) info.delete(PDFName.of(k));
}

export async function editMetadata(
  bytes: Uint8Array,
  values: EditableMetadata,
  opts: { clearAll?: boolean; touchModified?: boolean } = {},
): Promise<Uint8Array> {
  const doc = await loadPdf(bytes);
  if (opts.clearAll) {
    removeInfoKeys(doc, INFO_KEYS);
    dropXmp(doc);
    return doc.save();
  }
  const before = readEditableMetadata(doc);
  const fields: [keyof EditableMetadata, string][] = [
    ['title', 'Title'],
    ['author', 'Author'],
    ['subject', 'Subject'],
    ['keywords', 'Keywords'],
    ['creator', 'Creator'],
    ['producer', 'Producer'],
  ];
  let changed = false;
  for (const [field, key] of fields) {
    const next = values[field].trim();
    if (next === before[field]) continue;
    changed = true;
    if (!next) removeInfoKeys(doc, [key]);
    else if (field === 'title') doc.setTitle(next);
    else if (field === 'author') doc.setAuthor(next);
    else if (field === 'subject') doc.setSubject(next);
    else if (field === 'keywords') doc.setKeywords([next]);
    else if (field === 'creator') doc.setCreator(next);
    else doc.setProducer(next);
  }
  if (changed) {
    // An embedded XMP copy would contradict the edited values in some readers, so it is dropped.
    dropXmp(doc);
    if (opts.touchModified !== false) doc.setModificationDate(new Date());
  }
  return doc.save();
}
