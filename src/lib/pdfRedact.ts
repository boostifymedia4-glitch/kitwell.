/**
 * Redaction that really removes content.
 *
 * Drawing a black rectangle on a PDF leaves the text underneath selectable and searchable. Here, every page
 * that has redaction boxes is rebuilt as a picture with the boxes painted in, so the original text, fonts and
 * annotations of that page do not exist in the output at all. Pages without boxes are copied unchanged.
 */
import { PDFDocument } from '@cantoo/pdf-lib';
import { PdfError, loadPdf } from './pdfOps';
import type { RenderedPage } from './pdfFlatten';
import { tr } from '@/i18n/translate';

/** A box as fractions (0-1) of the visible page, origin top-left, like the on-screen preview. */
export interface RedactBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Boxes per 1-based page number. */
export type RedactPlan = Record<number, RedactBox[]>;

export type PageRenderer = (pageNumber: number, boxes: RedactBox[]) => Promise<RenderedPage>;

export interface RedactOptions {
  /** Copy title, author, subject and keywords into the result. Off by default because they can leak information. */
  keepProperties: boolean;
  onProgress?: (done: number, total: number) => void;
}

export const clampBox = (b: RedactBox): RedactBox | null => {
  const x = Math.max(0, Math.min(1, b.x));
  const y = Math.max(0, Math.min(1, b.y));
  const w = Math.min(1 - x, b.w - (x - b.x));
  const h = Math.min(1 - y, b.h - (y - b.y));
  return w > 0.002 && h > 0.002 ? { x, y, w, h } : null;
};

export function countBoxes(plan: RedactPlan): number {
  return Object.values(plan).reduce((n, boxes) => n + boxes.length, 0);
}

export async function redactPdf(bytes: Uint8Array, plan: RedactPlan, render: PageRenderer, opts: RedactOptions): Promise<Uint8Array> {
  if (countBoxes(plan) === 0) throw new PdfError(tr('err.pdf.redactNothing'));
  const source = await loadPdf(bytes);
  const total = source.getPageCount();
  for (const key of Object.keys(plan)) {
    const n = Number(key);
    if (!Number.isInteger(n) || n < 1 || n > total) throw new PdfError(tr('err.pdf.pageMissing', { page: key }));
  }
  const out = await PDFDocument.create();
  out.setProducer('Kitwell');
  out.setCreator('Kitwell');
  if (opts.keepProperties) {
    const title = source.getTitle();
    const author = source.getAuthor();
    const subject = source.getSubject();
    const keywords = source.getKeywords();
    if (title) out.setTitle(title);
    if (author) out.setAuthor(author);
    if (subject) out.setSubject(subject);
    if (keywords) out.setKeywords([keywords]);
  }
  for (let i = 1; i <= total; i++) {
    opts.onProgress?.(i - 1, total);
    const boxes = (plan[i] ?? []).map(clampBox).filter((b): b is RedactBox => b !== null);
    if (boxes.length === 0) {
      const [copied] = await out.copyPages(source, [i - 1]);
      out.addPage(copied);
      continue;
    }
    const picture = await render(i, boxes);
    const image = await out.embedJpg(picture.jpeg);
    const page = out.addPage([picture.widthPt, picture.heightPt]);
    page.drawImage(image, { x: 0, y: 0, width: picture.widthPt, height: picture.heightPt });
  }
  opts.onProgress?.(total, total);
  return out.save({ useObjectStreams: true });
}

// ---------- Finding text to redact ----------

/** The parts of a PDF.js text item needed to place a box over it. */
export interface PositionedText {
  str: string;
  /** [a, b, c, d, e, f] text matrix in page space. */
  transform: number[];
  width: number;
  height: number;
}

export interface TextMatch {
  box: RedactBox;
  text: string;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export interface MatchSpec {
  terms: string[];
  emails: boolean;
  phones: boolean;
  longNumbers: boolean;
}

export const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
export const PHONE = /\+?\d[\d\s().-]{7,}\d/g;
export const LONG_NUMBER = /\b\d{9,}\b/g;

export function buildMatchers(spec: MatchSpec): RegExp[] {
  const out: RegExp[] = [];
  for (const t of spec.terms.map((s) => s.trim()).filter(Boolean)) out.push(new RegExp(escapeRegExp(t), 'gi'));
  if (spec.emails) out.push(new RegExp(EMAIL.source, 'gi'));
  if (spec.phones) out.push(new RegExp(PHONE.source, 'g'));
  if (spec.longNumbers) out.push(new RegExp(LONG_NUMBER.source, 'g'));
  return out;
}

/** Slack added around a match, in points, so antialiased edges and descenders are covered. */
const PAD = 1.5;

/**
 * Finds matches inside single text items and returns boxes over them. Because a PDF stores text as separate
 * runs, a phrase that is split across two runs is not found; the tool tells people to check the result.
 */
export function findTextBoxes(
  items: PositionedText[],
  viewportTransform: number[],
  viewWidth: number,
  viewHeight: number,
  matchers: RegExp[],
): TextMatch[] {
  const out: TextMatch[] = [];
  const [va, vb, vc, vd, ve, vf] = viewportTransform;
  const toView = (x: number, y: number) => ({ x: va * x + vc * y + ve, y: vb * x + vd * y + vf });
  for (const item of items) {
    if (!item.str || item.width <= 0 || !item.transform) continue;
    const [a, b, c, d, e, f] = item.transform;
    const lenDir = Math.hypot(a, b) || 1;
    const lenUp = Math.hypot(c, d) || 1;
    const dir = { x: a / lenDir, y: b / lenDir };
    const up = { x: c / lenUp, y: d / lenUp };
    const height = item.height || lenUp;
    for (const re of matchers) {
      re.lastIndex = 0;
      for (let m = re.exec(item.str); m; m = re.exec(item.str)) {
        if (m[0].length === 0) {
          re.lastIndex++;
          continue;
        }
        const t0 = m.index / item.str.length;
        const t1 = (m.index + m[0].length) / item.str.length;
        const corners = [
          [t0, -0.25],
          [t1, -0.25],
          [t1, 1.0],
          [t0, 1.0],
        ].map(([t, k]) => toView(e + dir.x * item.width * t + up.x * height * k, f + dir.y * item.width * t + up.y * height * k));
        const xs = corners.map((p) => p.x);
        const ys = corners.map((p) => p.y);
        const x0 = Math.max(0, Math.min(...xs) - PAD);
        const y0 = Math.max(0, Math.min(...ys) - PAD);
        const x1 = Math.min(viewWidth, Math.max(...xs) + PAD);
        const y1 = Math.min(viewHeight, Math.max(...ys) + PAD);
        if (x1 > x0 && y1 > y0) out.push({ text: m[0], box: { x: x0 / viewWidth, y: y0 / viewHeight, w: (x1 - x0) / viewWidth, h: (y1 - y0) / viewHeight } });
      }
    }
  }
  return out;
}
