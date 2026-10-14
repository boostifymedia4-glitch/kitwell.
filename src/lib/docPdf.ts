/**
 * A small document layout engine that turns a list of blocks (headings, paragraphs, lists, tables, images, code)
 * into a real, selectable-text PDF. It is the shared back end of HTML to PDF, Word to PDF and Excel to PDF: those
 * tools read their input format into blocks and this module lays them out.
 *
 * It is deliberately modest. It wraps text, paginates, repeats table header rows and scales images, but it does
 * not reproduce page-exact layouts, CSS, columns, floats, headers or footers of the source document.
 */
import { PDFDocument, rgb, type PDFImage, type PDFPage, type RGB } from '@cantoo/pdf-lib';
import { PdfFonts, type FontLoader } from './pdfFont';

export interface Run {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  /** Link target. The text is drawn as a link (blue and underlined) but no clickable area is created. */
  href?: string;
}
/** A run whose text is exactly this value is a forced line break. */
export const LINE_BREAK: Run = { text: '\n' };

export type Align = 'left' | 'center' | 'right' | 'justify';
export interface Cell {
  runs: Run[];
  align?: Align;
  header?: boolean;
  colSpan?: number;
}
export interface ListItem {
  runs: Run[];
  level: number;
  /** Shown instead of the bullet, e.g. "3." for ordered lists. */
  marker?: string;
}
export type Block =
  | { type: 'heading'; level: number; runs: Run[]; align?: Align }
  | { type: 'paragraph'; runs: Run[]; align?: Align; indent?: number; quote?: boolean }
  | { type: 'list'; items: ListItem[] }
  | { type: 'table'; rows: Cell[][]; fontSize?: number }
  | { type: 'image'; bytes: Uint8Array; kind: 'jpg' | 'png' }
  | { type: 'code'; text: string }
  | { type: 'rule' }
  | { type: 'pagebreak' };

export interface BuildOptions {
  pageSize?: 'a4' | 'letter';
  landscape?: boolean;
  /** Margin in points. */
  margin?: number;
  /** Body text size in points. */
  baseSize?: number;
  title?: string;
  loader?: FontLoader;
}

export interface BuildResult {
  bytes: Uint8Array;
  pages: number;
  /** Characters that the embedded fonts do not cover (drawn as "?"). */
  unsupported: string[];
  /** Images that could not be embedded (unsupported type or damaged). */
  skippedImages: number;
  /** Tables or cells that had to be cut to fit a page. */
  truncated: number;
}

const PAGE_SIZES = { a4: [595.28, 841.89], letter: [612, 792] } as const;
const TEXT: RGB = rgb(0.1, 0.1, 0.12);
const LINK: RGB = rgb(0.05, 0.3, 0.7);
const MUTED: RGB = rgb(0.42, 0.45, 0.5);
const HEADING_SIZES = [1.9, 1.55, 1.3, 1.15, 1.05, 1];
const LINE_HEIGHT = 1.36;

interface Atom {
  text: string;
  w: number;
  sw: number;
  space: boolean;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  size: number;
  color: RGB;
}
type Token = Atom | 'br';
interface Line {
  atoms: Atom[];
  width: number;
  hard: boolean;
}

/** Text of all blocks, used to decide which font scripts to embed. */
export function blocksText(blocks: Block[]): string {
  const parts: string[] = [];
  const addRuns = (rs: Run[]) => rs.forEach((r) => parts.push(r.text));
  for (const block of blocks) {
    if (block.type === 'heading' || block.type === 'paragraph') addRuns(block.runs);
    else if (block.type === 'list')
      block.items.forEach((item) => {
        addRuns(item.runs);
        parts.push(item.marker ?? '');
      });
    else if (block.type === 'table') block.rows.forEach((row) => row.forEach((cell) => addRuns(cell.runs)));
    else if (block.type === 'code') parts.push(block.text);
  }
  return parts.join(' ');
}

export async function buildPdf(blocks: Block[], options: BuildOptions = {}): Promise<BuildResult> {
  const doc = await PDFDocument.create();
  const fonts = await PdfFonts.create(doc, blocksText(blocks) + ' ?•', options.loader);
  const [w0, h0] = PAGE_SIZES[options.pageSize ?? 'a4'];
  const [pageW, pageH] = options.landscape ? [h0, w0] : [w0, h0];
  const margin = options.margin ?? 56;
  const base = options.baseSize ?? 11;
  const contentW = pageW - margin * 2;
  let page: PDFPage = doc.addPage([pageW, pageH]);
  let y = margin; // distance from the top edge to the next free line
  let skippedImages = 0;
  let truncated = 0;

  const newPage = () => {
    page = doc.addPage([pageW, pageH]);
    y = margin;
  };
  const ensure = (height: number) => {
    if (y + height > pageH - margin && y > margin) newPage();
  };
  const space = (pts: number) => {
    y += pts;
  };

  // ---------- text layout ----------
  const tokens = (runs: Run[], size: number, forceBold: boolean, color: RGB): Token[] => {
    const out: Token[] = [];
    let pending = false;
    for (const run of runs) {
      if (run.text === '\n') {
        out.push('br');
        pending = false;
        continue;
      }
      const bold = forceBold || Boolean(run.bold);
      const runColor = run.href ? LINK : color;
      for (const m of run.text.matchAll(/(\s+)|(\S+)/g)) {
        if (m[1]) {
          pending = true;
          continue;
        }
        const text = m[2];
        out.push({
          text,
          w: fonts.measure(text, size, bold),
          sw: fonts.measure(' ', size, bold),
          space: pending && out.length > 0 && out[out.length - 1] !== 'br',
          bold,
          italic: Boolean(run.italic),
          underline: Boolean(run.underline || run.href),
          size,
          color: runColor,
        });
        pending = false;
      }
    }
    return out;
  };

  const breakLines = (toks: Token[], maxW: number): Line[] => {
    const lines: Line[] = [];
    let cur: Line = { atoms: [], width: 0, hard: false };
    const flush = (hard: boolean) => {
      cur.hard = hard;
      lines.push(cur);
      cur = { atoms: [], width: 0, hard: false };
    };
    for (const t of toks) {
      if (t === 'br') {
        flush(true);
        continue;
      }
      let atom = t;
      let first = true;
      // Split words that are wider than the line into pieces that fit.
      while (atom.w > maxW) {
        let n = atom.text.length;
        while (n > 1 && fonts.measure(atom.text.slice(0, n), atom.size, atom.bold) > maxW) n--;
        if (cur.atoms.length) flush(false);
        const head = { ...atom, text: atom.text.slice(0, n), w: fonts.measure(atom.text.slice(0, n), atom.size, atom.bold), space: false };
        cur.atoms.push(head);
        cur.width = head.w;
        flush(false);
        const rest = atom.text.slice(n);
        atom = { ...atom, text: rest, w: fonts.measure(rest, atom.size, atom.bold), space: false };
        first = false;
        if (!rest) break;
      }
      if (!atom.text) continue;
      if (cur.atoms.length && cur.width + (atom.space ? atom.sw : 0) + atom.w > maxW) flush(false);
      cur.width += (cur.atoms.length && atom.space ? atom.sw : 0) + atom.w;
      cur.atoms.push(first ? atom : { ...atom, space: false });
    }
    if (cur.atoms.length || lines.length === 0) flush(true);
    return lines;
  };

  const lineSize = (l: Line, fallback: number) => l.atoms.reduce((m, a) => Math.max(m, a.size), 0) || fallback;
  const lineHeight = (lines: Line[], size: number) => lines.reduce((h, l) => h + lineSize(l, size) * LINE_HEIGHT, 0);

  /** Draws laid-out lines starting at the given top offset, left edge and width; returns the height used. */
  const drawLines = (lines: Line[], top: number, left: number, width: number, align: Align, fallbackSize: number): number => {
    let used = 0;
    lines.forEach((line, idx) => {
      const size = lineSize(line, fallbackSize);
      const baseline = pageH - (top + used + size * 1.03);
      const gaps = line.atoms.filter((a, i) => i > 0 && a.space).length;
      let x = left;
      let extra = 0;
      if (align === 'center') x = left + (width - line.width) / 2;
      else if (align === 'right') x = left + width - line.width;
      else if (align === 'justify' && !line.hard && idx < lines.length - 1 && gaps > 0) extra = (width - line.width) / gaps;
      line.atoms.forEach((a, i) => {
        if (i > 0 && a.space) x += a.sw + extra;
        const drawn = fonts.draw(page, a.text, x, baseline, { size: a.size, bold: a.bold, italic: a.italic, color: a.color });
        if (a.underline) page.drawLine({ start: { x, y: baseline - 1.5 }, end: { x: x + drawn, y: baseline - 1.5 }, thickness: 0.6, color: a.color });
        x += drawn;
      });
      used += size * LINE_HEIGHT;
    });
    return used;
  };

  /** Lays out runs as a paragraph, splitting it across pages when needed. */
  const paragraph = (runs: Run[], size: number, opts: { bold?: boolean; align?: Align; indent?: number; gap?: number; quote?: boolean; marker?: string }) => {
    const indent = (opts.indent ?? 0) + (opts.quote ? 14 : 0);
    const markerW = opts.marker ? fonts.measure(opts.marker + ' ', size, false) : 0;
    const left = margin + indent;
    const width = contentW - indent - markerW;
    const lines = breakLines(tokens(runs, size, Boolean(opts.bold), TEXT), width);
    if (lines.length === 1 && lines[0].atoms.length === 0) return;
    // Keep the start of a paragraph together with its first two lines.
    ensure(Math.min(lineHeight(lines, size), lineSize(lines[0], size) * LINE_HEIGHT * 2));
    let i = 0;
    let first = true;
    while (i < lines.length) {
      const room = pageH - margin - y;
      let take = 0;
      let h = 0;
      while (i + take < lines.length) {
        const lh = lineSize(lines[i + take], size) * LINE_HEIGHT;
        if (h + lh > room && take > 0) break;
        h += lh;
        take++;
      }
      const slice = lines.slice(i, i + take);
      if (first && opts.marker) fonts.draw(page, opts.marker, left, pageH - (y + size * 1.03), { size, color: MUTED });
      if (opts.quote) page.drawRectangle({ x: margin + indent - 10, y: pageH - (y + h), width: 2.5, height: h, color: rgb(0.8, 0.82, 0.86) });
      drawLines(slice, y, left + markerW, width, opts.align ?? 'left', size);
      y += h;
      i += take;
      first = false;
      if (i < lines.length) newPage();
    }
    space(opts.gap ?? size * 0.55);
  };

  // ---------- blocks ----------
  const embedded = new Map<Uint8Array, PDFImage | null>();
  const imageBlock = async (b: Extract<Block, { type: 'image' }>) => {
    let img = embedded.get(b.bytes);
    if (img === undefined) {
      try {
        img = b.kind === 'png' ? await doc.embedPng(b.bytes) : await doc.embedJpg(b.bytes);
      } catch {
        img = null;
      }
      embedded.set(b.bytes, img);
    }
    if (!img) {
      skippedImages++;
      return;
    }
    const maxH = pageH - margin * 2;
    const scale = Math.min(1, contentW / img.width, maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ensure(h);
    page.drawImage(img, { x: margin, y: pageH - (y + h), width: w, height: h });
    space(h + base * 0.6);
  };

  const tableBlock = (b: Extract<Block, { type: 'table' }>) => {
    const size = b.fontSize ?? Math.max(7, base - 1.5);
    const pad = 3.5;
    const cols = Math.max(1, ...b.rows.map((r) => r.reduce((n, c) => n + (c.colSpan ?? 1), 0)));
    // Natural (single line) width and narrowest (longest word) width of every column.
    const pref = new Array<number>(cols).fill(0);
    const min = new Array<number>(cols).fill(0);
    for (const row of b.rows) {
      let c = 0;
      for (const cell of row) {
        const span = cell.colSpan ?? 1;
        if (span === 1) {
          const toks = tokens(cell.runs, size, Boolean(cell.header), TEXT).filter((t): t is Atom => t !== 'br');
          const total = toks.reduce((s, a, i) => s + a.w + (i > 0 && a.space ? a.sw : 0), 0);
          pref[c] = Math.max(pref[c], total + pad * 2);
          min[c] = Math.max(min[c], toks.reduce((m, a) => Math.max(m, a.w), 0) * 0.5 + pad * 2);
        }
        c += span;
      }
    }
    const widths = pref.map((p) => Math.max(p, 24));
    const sumPref = widths.reduce((a, v) => a + v, 0);
    if (sumPref > contentW) {
      const mins = min.map((m) => Math.max(m, 18));
      const sumMin = mins.reduce((a, v) => a + v, 0);
      if (sumMin >= contentW) widths.forEach((_, i) => (widths[i] = (mins[i] / sumMin) * contentW));
      else {
        const share = (contentW - sumMin) / (sumPref - sumMin);
        widths.forEach((p, i) => (widths[i] = mins[i] + (p - mins[i]) * share));
      }
    } else if (cols <= 4) {
      const grow = (contentW - sumPref) / cols;
      widths.forEach((_, i) => (widths[i] += grow));
    }

    const layoutRow = (row: Cell[]) => {
      let c = 0;
      return row.map((cell) => {
        const span = cell.colSpan ?? 1;
        const w = widths.slice(c, c + span).reduce((a, v) => a + v, 0);
        const x = widths.slice(0, c).reduce((a, v) => a + v, 0);
        c += span;
        const lines = breakLines(tokens(cell.runs, size, Boolean(cell.header), TEXT), Math.max(8, w - pad * 2));
        return { cell, w, x, lines };
      });
    };
    type Laid = ReturnType<typeof layoutRow>;
    const rowH = (laid: Laid) => Math.max(size * LINE_HEIGHT + pad * 2, ...laid.map((l) => lineHeight(l.lines, size) + pad * 2));
    const drawRow = (laid: Laid, h: number) => {
      for (const { cell, w, x, lines } of laid) {
        if (cell.header) page.drawRectangle({ x: margin + x, y: pageH - (y + h), width: w, height: h, color: rgb(0.93, 0.95, 0.96) });
        page.drawRectangle({ x: margin + x, y: pageH - (y + h), width: w, height: h, borderColor: rgb(0.72, 0.75, 0.78), borderWidth: 0.5 });
        drawLines(lines, y + pad, margin + x + pad, w - pad * 2, cell.align ?? 'left', size);
      }
    };

    const header = b.rows[0]?.every((c) => c.header) ? layoutRow(b.rows[0]) : null;
    const body = b.rows.slice(header ? 1 : 0);
    const maxRow = pageH - margin * 2;
    const headerH = header ? rowH(header) : 0;
    // Start the table only when the header and its first row fit on the page.
    const firstBodyH = body.length ? Math.min(rowH(layoutRow(body[0])), maxRow / 2) : 0;
    ensure(headerH + firstBodyH);
    if (header) {
      drawRow(header, headerH);
      y += headerH;
    }
    for (const row of body) {
      const laid = layoutRow(row);
      let h = rowH(laid);
      if (h > maxRow - headerH) {
        // A single row taller than a page: keep what fits and say so.
        const keep = Math.max(1, Math.floor((maxRow - headerH - pad * 2) / (size * LINE_HEIGHT)));
        laid.forEach((l) => (l.lines = l.lines.slice(0, keep)));
        h = rowH(laid);
        truncated++;
      }
      if (y + h > pageH - margin) {
        newPage();
        if (header) {
          drawRow(header, headerH);
          y += headerH;
        }
      }
      drawRow(laid, h);
      y += h;
    }
    space(base * 0.8);
  };

  for (const b of blocks) {
    switch (b.type) {
      case 'heading': {
        const size = base * HEADING_SIZES[Math.min(5, Math.max(0, b.level - 1))];
        ensure(size * LINE_HEIGHT * 3);
        space(size * 0.35);
        paragraph(b.runs, size, { bold: true, align: b.align, gap: size * 0.4 });
        break;
      }
      case 'paragraph':
        paragraph(b.runs, base, { align: b.align, indent: b.indent, quote: b.quote });
        break;
      case 'list':
        b.items.forEach((item, i) => {
          paragraph(item.runs, base, { indent: 14 + item.level * 18, marker: item.marker ?? '•', gap: i === b.items.length - 1 ? base * 0.7 : base * 0.2 });
        });
        break;
      case 'table':
        tableBlock(b);
        break;
      case 'image':
        await imageBlock(b);
        break;
      case 'code': {
        const size = base - 1.5;
        const lines = b.text.replace(/\t/g, '    ').split('\n');
        const lh = size * LINE_HEIGHT;
        let i = 0;
        while (i < lines.length) {
          ensure(lh * 2 + 8);
          const room = pageH - margin - y - 8;
          const take = Math.max(1, Math.min(lines.length - i, Math.floor(room / lh)));
          const chunk = lines.slice(i, i + take);
          const h = chunk.length * lh + 8;
          page.drawRectangle({ x: margin, y: pageH - (y + h), width: contentW, height: h, color: rgb(0.95, 0.96, 0.97) });
          chunk.forEach((ln, k) => {
            // Leading spaces keep the indentation; the line is cut at the box edge.
            let text = ln;
            while (text && fonts.measure(text, size) > contentW - 12) text = text.slice(0, -1);
            fonts.draw(page, text, margin + 6, pageH - (y + 4 + k * lh + size * 1.03), { size, color: TEXT });
          });
          y += h;
          i += take;
          if (i < lines.length) newPage();
        }
        space(base * 0.7);
        break;
      }
      case 'rule':
        ensure(10);
        page.drawLine({ start: { x: margin, y: pageH - (y + 4) }, end: { x: pageW - margin, y: pageH - (y + 4) }, thickness: 0.6, color: rgb(0.75, 0.77, 0.8) });
        space(12);
        break;
      case 'pagebreak':
        if (y > margin) newPage();
        break;
    }
  }

  if (options.title) doc.setTitle(options.title);
  doc.setProducer('Kitwell');
  doc.setCreator('Kitwell');
  const bytes = await doc.save();
  return { bytes, pages: doc.getPageCount(), unsupported: [...fonts.unsupported], skippedImages, truncated };
}
