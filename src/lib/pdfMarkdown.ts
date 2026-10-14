/**
 * PDF to Markdown: rebuilds headings, paragraphs and lists from the positioned text that PDF.js reads.
 *
 * It only sees text that really is text in the PDF. Scanned pages (pictures of text) give nothing. Headings are
 * recognised by a larger font size than the body text, lists by bullet and number markers, paragraphs by line
 * spacing. Tables, columns, footnotes, bold and italic, links, images and equations are not reconstructed.
 */
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

export interface PositionedItem {
  str: string;
  /** PDF.js text matrix: [a, b, c, d, x, y]. */
  transform: number[];
  width: number;
  height: number;
  hasEOL?: boolean;
}
export interface PageText {
  items: PositionedItem[];
  /** Page height in points (to find headers and footers). */
  height: number;
}

export interface MarkdownResult {
  markdown: string;
  pages: number;
  pagesWithText: number;
  headings: number;
  listItems: number;
  /** Lines removed because they repeat on most pages (running headers, footers and page numbers). */
  removedRepeated: number;
}

export interface MarkdownOptions {
  removeRepeated: boolean;
  pageSeparators: boolean;
}

interface Line {
  text: string;
  y: number;
  x: number;
  size: number;
  page: number;
  /** Position on the page from the top, 0 to 1. */
  rel: number;
  /** Right edge of the text collected so far. */
  end: number;
}

const BULLET = /^([•·▪◦‣⁃●○■□*–—-])\s+/;
const NUMBERED = /^(\d{1,3}|[a-z])[.)]\s+/i;

function buildLines(items: PositionedItem[], page: number, pageHeight: number): Line[] {
  const lines: Line[] = [];
  let cur: Line | null = null;
  for (const it of items) {
    if (!it.str && !it.hasEOL) continue;
    const size = Math.abs(it.transform[3]) || it.height || 10;
    const x = it.transform[4];
    const y = it.transform[5];
    if (cur && Math.abs(y - cur.y) <= Math.max(1.5, size * 0.45) && x >= cur.x - 1) {
      // A visible gap between two items with no space character between them is a word space.
      const needsSpace = Boolean(it.str) && !/\s$/.test(cur.text) && !/^\s/.test(it.str) && x - cur.end > size * 0.15;
      cur.text += (needsSpace ? ' ' : '') + it.str;
      cur.size = Math.max(cur.size, size);
      cur.end = x + it.width;
    } else {
      if (cur) lines.push(cur);
      cur = { text: it.str, y, x, size, page, rel: pageHeight ? 1 - y / pageHeight : 0, end: x + it.width };
    }
  }
  if (cur) lines.push(cur);
  return lines
    .map((l) => ({ ...l, text: l.text.replace(/\s+/g, ' ').trim() }))
    .filter((l) => l.text);
}

const escapeInline = (s: string) => s.replace(/\\/g, '\\\\').replace(/([*_`|])/g, '\\$1').replace(/<(?=[a-z/!])/gi, '\\<');
const escapeStart = (s: string) => s.replace(/^(#{1,6}\s|>\s?|\+\s|=+\s*$|-{3,}\s*$|\d+[.)]\s)/, '\\$1');

/** Pure conversion of positioned page text; `pdfToMarkdown` feeds it from a PDF. */
export function pagesToMarkdown(pages: PageText[], options: MarkdownOptions): MarkdownResult {
  const perPage = pages.map((p, i) => buildLines(p.items, i, p.height));
  const result: MarkdownResult = { markdown: '', pages: pages.length, pagesWithText: perPage.filter((l) => l.length).length, headings: 0, listItems: 0, removedRepeated: 0 };

  // Running headers, footers and page numbers: the same text (digits ignored) near the top or bottom of most pages.
  let removed = new Set<Line>();
  if (options.removeRepeated && pages.length >= 3) {
    const seen = new Map<string, Set<number>>();
    const key = (l: Line) => `${l.rel < 0.5 ? 'top' : 'bottom'}|${l.text.replace(/\d+/g, '#').toLowerCase()}`;
    for (const lines of perPage) for (const l of lines) if (l.rel < 0.1 || l.rel > 0.9) (seen.get(key(l)) ?? seen.set(key(l), new Set()).get(key(l)))!.add(l.page);
    const threshold = Math.max(2, Math.ceil(pages.length * 0.6));
    removed = new Set(perPage.flat().filter((l) => (l.rel < 0.1 || l.rel > 0.9) && (seen.get(key(l))?.size ?? 0) >= threshold));
    result.removedRepeated = removed.size;
  }
  const kept = perPage.map((lines) => lines.filter((l) => !removed.has(l)));

  // Body size: the font size that carries most of the text.
  const weight = new Map<number, number>();
  for (const l of kept.flat()) {
    const s = Math.round(l.size * 2) / 2;
    weight.set(s, (weight.get(s) ?? 0) + l.text.length);
  }
  const body = [...weight.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 10;
  const headingSizes = [...weight.keys()].filter((s) => s >= body * 1.18).sort((a, b) => b - a);
  const levelOf = (size: number) => {
    const s = Math.round(size * 2) / 2;
    const i = headingSizes.findIndex((h) => Math.abs(h - s) < 0.01);
    return i < 0 ? 0 : Math.min(i + 1, 4);
  };
  const minX = Math.min(...kept.flat().map((l) => l.x), Infinity);

  const out: string[] = [];
  const flushPara = (para: string[]) => {
    if (!para.length) return;
    let text = '';
    for (const line of para) {
      if (!text) text = line;
      else if (/[a-zа-яёіїєа-яà-ÿ]-$/i.test(text) && /^[a-zа-яёіїєà-ÿ]/.test(line)) text = text.slice(0, -1) + line;
      else text += ' ' + line;
    }
    out.push(escapeStart(escapeInline(text)));
    para.length = 0;
  };

  kept.forEach((lines, pageIndex) => {
    if (pageIndex > 0 && options.pageSeparators && lines.length) out.push('---');
    let para: string[] = [];
    let prev: Line | null = null;
    let list = false;
    for (const l of lines) {
      const level = levelOf(l.size);
      const gap = prev ? prev.y - l.y : 0;
      const newBlock = !prev || gap > l.size * 1.65 || gap < 0 || Math.abs(prev.size - l.size) > 0.75;
      if (level && l.text.length <= 140) {
        flushPara(para);
        para = [];
        // A heading split over two lines of the same size stays one heading.
        const last = out[out.length - 1];
        if (prev && levelOf(prev.size) === level && !newBlock && last?.startsWith('#')) out[out.length - 1] = `${last} ${escapeInline(l.text)}`;
        else {
          out.push(`${'#'.repeat(level)} ${escapeInline(l.text)}`);
          result.headings++;
        }
        list = false;
      } else {
        const bullet = BULLET.exec(l.text);
        const number = NUMBERED.exec(l.text);
        if (bullet || number) {
          flushPara(para);
          para = [];
          const body2 = l.text.slice((bullet ?? number)![0].length);
          out.push(`${bullet ? '-' : number![1].replace(/[a-z]/i, '1')}${bullet ? '' : '.'} ${escapeInline(body2)}`);
          result.listItems++;
          list = true;
        } else if (list && !newBlock && l.x > minX + 4 && out.length) {
          // Continuation of the previous list item.
          out[out.length - 1] += ' ' + escapeInline(l.text);
        } else {
          if (newBlock) flushPara(para);
          if (newBlock) para = [];
          para.push(l.text);
          list = false;
        }
      }
      prev = l;
    }
    flushPara(para);
  });

  // Blank line between blocks; the items of one list stay together.
  const isItem = (block: string) => /^(-|\d+\.) /.test(block);
  let md = '';
  out.forEach((block, i) => {
    if (i > 0) md += isItem(block) && isItem(out[i - 1]) ? '\n' : '\n\n';
    md += block;
  });
  result.markdown = md.trim();


  if (result.markdown) result.markdown += '\n';
  return result;
}

/** Reads every page of an opened PDF and converts it. */
export async function pdfToMarkdown(doc: PDFDocumentProxy, options: MarkdownOptions, onProgress?: (done: number, total: number) => void): Promise<MarkdownResult> {
  const pages: PageText[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const view = page.view;
    pages.push({
      height: view[3] - view[1],
      items: content.items
        .filter((it): it is TextItem => 'str' in it)
        .map((it) => ({ str: it.str, transform: it.transform as number[], width: it.width, height: it.height, hasEOL: it.hasEOL })),
    });
    page.cleanup();
    onProgress?.(i, doc.numPages);
  }
  return pagesToMarkdown(pages, options);
}
