/**
 * Comparing two PDFs: a word-level text comparison per page, and a pixel comparison of rendered pages.
 * Pure functions (the page rendering happens in the tool UI), so they can be tested in Node.
 */
import { diffWords } from 'diff';

export interface CompareOptions {
  ignoreCase: boolean;
  /** Treat any run of spaces, tabs and line breaks as a single space. */
  ignoreWhitespace: boolean;
}

export type PartType = 'same' | 'added' | 'removed';
export interface DiffPart {
  type: PartType;
  text: string;
}

export type PageStatus = 'same' | 'changed' | 'added' | 'removed';

export interface PageTextDiff {
  /** 1-based page number in the longer document. */
  page: number;
  status: PageStatus;
  addedWords: number;
  removedWords: number;
  parts: DiffPart[];
  /** True when the page has no selectable text on one side (for example a scan). */
  noText: boolean;
}

export interface CompareTotals {
  pagesA: number;
  pagesB: number;
  changedPages: number;
  addedPages: number;
  removedPages: number;
  identicalPages: number;
  addedWords: number;
  removedWords: number;
}

export const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

function normalise(text: string, opts: CompareOptions): string {
  let t = text.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
  if (opts.ignoreWhitespace) t = t.replace(/\s+/g, ' ').trim();
  if (opts.ignoreCase) t = t.toLowerCase();
  return t;
}

/** Compares page texts of document A (original) and document B (revised), page by page. */
export function compareDocuments(a: string[], b: string[], opts: CompareOptions): { pages: PageTextDiff[]; totals: CompareTotals } {
  const pages: PageTextDiff[] = [];
  const totals: CompareTotals = { pagesA: a.length, pagesB: b.length, changedPages: 0, addedPages: 0, removedPages: 0, identicalPages: 0, addedWords: 0, removedWords: 0 };
  const count = Math.max(a.length, b.length);
  for (let i = 0; i < count; i++) {
    const textA = i < a.length ? normalise(a[i], opts) : null;
    const textB = i < b.length ? normalise(b[i], opts) : null;
    if (textA === null || textB === null) {
      const only = (textA ?? textB) as string;
      const added = textA === null;
      const words = countWords(only);
      pages.push({ page: i + 1, status: added ? 'added' : 'removed', addedWords: added ? words : 0, removedWords: added ? 0 : words, parts: [{ type: added ? 'added' : 'removed', text: only }], noText: !only.trim() });
      if (added) {
        totals.addedPages++;
        totals.addedWords += words;
      } else {
        totals.removedPages++;
        totals.removedWords += words;
      }
      continue;
    }
    const changes = diffWords(textA, textB);
    const parts: DiffPart[] = changes.map((c) => ({ type: c.added ? 'added' : c.removed ? 'removed' : 'same', text: c.value }));
    const addedWords = parts.filter((p) => p.type === 'added').reduce((n, p) => n + countWords(p.text), 0);
    const removedWords = parts.filter((p) => p.type === 'removed').reduce((n, p) => n + countWords(p.text), 0);
    const changed = addedWords > 0 || removedWords > 0;
    pages.push({ page: i + 1, status: changed ? 'changed' : 'same', addedWords, removedWords, parts, noText: !textA.trim() && !textB.trim() });
    if (changed) totals.changedPages++;
    else totals.identicalPages++;
    totals.addedWords += addedWords;
    totals.removedWords += removedWords;
  }
  return { pages, totals };
}

export type DisplayPart = DiffPart | { type: 'gap'; text: string };

/** Shortens long unchanged runs to a few words of context on each side so the changes stand out. */
export function withContext(parts: DiffPart[], contextWords = 8): DisplayPart[] {
  const out: DisplayPart[] = [];
  parts.forEach((p, i) => {
    if (p.type !== 'same') {
      out.push(p);
      return;
    }
    const words = p.text.split(/(\s+)/); // keep separators so spacing survives
    const tokens = words.filter((w) => w.trim());
    if (tokens.length <= contextWords * 2 + 2) {
      out.push(p);
      return;
    }
    const first = i === 0;
    const last = i === parts.length - 1;
    const head = first ? '' : takeWords(p.text, contextWords, 'start');
    const tail = last ? '' : takeWords(p.text, contextWords, 'end');
    if (head) out.push({ type: 'same', text: head });
    out.push({ type: 'gap', text: ' … ' });
    if (tail) out.push({ type: 'same', text: tail });
  });
  return out;
}

function takeWords(text: string, n: number, from: 'start' | 'end'): string {
  const tokens = text.trim().split(/\s+/);
  return from === 'start' ? tokens.slice(0, n).join(' ') + ' ' : ' ' + tokens.slice(-n).join(' ');
}

/** A plain-text report of every change, for download. */
export function textReport(nameA: string, nameB: string, result: { pages: PageTextDiff[]; totals: CompareTotals }): string {
  const t = result.totals;
  const lines = [
    `Comparison of "${nameA}" (original, ${t.pagesA} pages) and "${nameB}" (revised, ${t.pagesB} pages)`,
    `Pages changed: ${t.changedPages} · identical: ${t.identicalPages} · only in revised: ${t.addedPages} · only in original: ${t.removedPages}`,
    `Words added: ${t.addedWords} · words removed: ${t.removedWords}`,
    '',
  ];
  for (const p of result.pages) {
    if (p.status === 'same') continue;
    lines.push(`--- Page ${p.page}: ${p.status === 'added' ? 'only in the revised file' : p.status === 'removed' ? 'only in the original file' : `${p.addedWords} words added, ${p.removedWords} removed`} ---`);
    for (const part of withContext(p.parts, 6)) {
      if (part.type === 'added') lines.push(`  + ${part.text.trim()}`);
      else if (part.type === 'removed') lines.push(`  - ${part.text.trim()}`);
    }
    lines.push('');
  }
  if (t.changedPages + t.addedPages + t.removedPages === 0) lines.push('No differences in the text were found.');
  return lines.join('\n');
}

// ---------- Visual comparison ----------

export interface PixelDiff {
  changedPixels: number;
  totalPixels: number;
  /** Share of pixels that differ, 0-100. */
  percent: number;
  /** RGBA image: the revised page faded, with changed pixels in red. */
  overlay: Uint8ClampedArray;
}

/** Compares two same-size RGBA images. A pixel counts as changed when any colour channel differs by more than `threshold`. */
export function pixelDiff(a: Uint8ClampedArray, b: Uint8ClampedArray, width: number, height: number, threshold = 48): PixelDiff {
  if (a.length !== b.length || a.length !== width * height * 4) throw new Error('Both images must have the same size.');
  const overlay = new Uint8ClampedArray(a.length);
  let changed = 0;
  for (let i = 0; i < a.length; i += 4) {
    const diff = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
    if (diff > threshold) {
      changed++;
      overlay[i] = 235;
      overlay[i + 1] = 40;
      overlay[i + 2] = 60;
      overlay[i + 3] = 255;
    } else {
      // Faded copy of the revised page for context.
      overlay[i] = 255 - (255 - b[i]) * 0.35;
      overlay[i + 1] = 255 - (255 - b[i + 1]) * 0.35;
      overlay[i + 2] = 255 - (255 - b[i + 2]) * 0.35;
      overlay[i + 3] = 255;
    }
  }
  const total = width * height;
  return { changedPixels: changed, totalPixels: total, percent: total ? Math.round((changed / total) * 10000) / 100 : 0, overlay };
}
