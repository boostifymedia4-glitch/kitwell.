/**
 * Reads an HTML document into the blocks used by the PDF layout engine (src/lib/docPdf.ts).
 *
 * The HTML is parsed with DOMParser into an inert document: scripts do not run, nothing is loaded and nothing is
 * inserted into the visible page. Only images embedded in the HTML itself (data: URLs) are used; pictures that
 * point at other addresses are never fetched and are only counted, so the conversion cannot reach out to a web
 * server. CSS is not applied beyond a few inline hints (alignment, bold, italic, underline, page breaks).
 */
import type { Align, Block, Cell, ListItem, Run } from './docPdf';
import { LINE_BREAK } from './docPdf';

export interface HtmlRead {
  title: string;
  blocks: Block[];
  /** Images that point to other addresses and were not loaded. */
  externalImages: number;
  /** Embedded images in formats the PDF writer cannot use (anything but JPEG and PNG). */
  unsupportedImages: number;
  /** Elements that have no PDF equivalent here (script output, frames, canvas, SVG, video, forms...). */
  skippedElements: number;
}

interface Ctx {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  href?: string;
  code: boolean;
}

const SKIP = new Set(['script', 'style', 'head', 'noscript', 'template', 'title', 'meta', 'link', 'option', 'datalist']);
const UNSUPPORTED = new Set(['iframe', 'object', 'embed', 'svg', 'canvas', 'video', 'audio', 'select', 'button', 'input', 'textarea', 'map']);
const BLOCK_CONTAINERS = new Set(['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'figure', 'form', 'fieldset', 'details', 'address', 'body', 'html', 'center', 'hgroup', 'summary', 'figcaption', 'dd', 'dt', 'dl', 'li']);
const INLINE_BOLD = new Set(['b', 'strong', 'th']);
const INLINE_ITALIC = new Set(['i', 'em', 'cite', 'dfn', 'var']);

const style = (el: Element) => (el.getAttribute('style') ?? '').toLowerCase();

function alignOf(el: Element): Align | undefined {
  const m = /text-align\s*:\s*(left|right|center|justify)/.exec(style(el));
  const a = (m?.[1] ?? el.getAttribute('align') ?? '').toLowerCase();
  return a === 'left' || a === 'right' || a === 'center' || a === 'justify' ? a : undefined;
}

const pageBreakBefore = (el: Element) => /(page-)?break-before\s*:\s*(always|page)/.test(style(el));

function decodeDataImage(src: string): { bytes: Uint8Array; kind: 'jpg' | 'png' } | 'unsupported' | null {
  const m = /^data:([^;,]*)(;[^,]*)?,(.*)$/s.exec(src.trim());
  if (!m) return null;
  const mime = m[1].toLowerCase();
  if (!/;base64/i.test(m[2] ?? '')) return mime === 'image/svg+xml' ? 'unsupported' : null;
  let binary: string;
  try {
    binary = atob(m[3].replace(/\s+/g, ''));
  } catch {
    return null;
  }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return { bytes, kind: 'jpg' };
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { bytes, kind: 'png' };
  return 'unsupported';
}

export function htmlToBlocks(doc: Document): HtmlRead {
  const read: HtmlRead = { title: (doc.title ?? '').trim(), blocks: [], externalImages: 0, unsupportedImages: 0, skippedElements: 0 };

  const ctxFor = (el: Element, ctx: Ctx): Ctx => {
    const tag = el.tagName.toLowerCase();
    const st = style(el);
    return {
      bold: ctx.bold || INLINE_BOLD.has(tag) || /font-weight\s*:\s*(bold|[6-9]00)/.test(st),
      italic: ctx.italic || INLINE_ITALIC.has(tag) || /font-style\s*:\s*italic/.test(st),
      underline: ctx.underline || tag === 'u' || tag === 'ins' || /text-decoration[^;]*underline/.test(st),
      href: tag === 'a' && el.getAttribute('href') ? (el.getAttribute('href') as string) : ctx.href,
      code: ctx.code || tag === 'code' || tag === 'kbd' || tag === 'samp' || tag === 'tt',
    };
  };

  /** Appends the inline content of `node` (text and inline elements) to `runs`. Block children are flattened. */
  const collectInline = (node: Node, ctx: Ctx, runs: Run[]) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) {
        const text = child.textContent ?? '';
        if (text) runs.push({ text, bold: ctx.bold, italic: ctx.italic, underline: ctx.underline, href: ctx.href, code: ctx.code });
      } else if (child.nodeType === 1) {
        const el = child as Element;
        const tag = el.tagName.toLowerCase();
        if (SKIP.has(tag)) continue;
        if (tag === 'br') runs.push(LINE_BREAK);
        else if (tag === 'img') countImage(el);
        else if (UNSUPPORTED.has(tag)) read.skippedElements++;
        else {
          collectInline(el, ctxFor(el, ctx), runs);
          // Block-level children inside inline content (e.g. a table cell with paragraphs) become line breaks.
          if (/^(p|div|li|tr|h[1-6]|blockquote|pre|ul|ol)$/.test(tag)) runs.push(LINE_BREAK);
        }
      }
    }
  };

  const countImage = (el: Element) => {
    const src = el.getAttribute('src') ?? '';
    if (src.startsWith('data:')) {
      const img = decodeDataImage(src);
      if (img === 'unsupported' || img === null) read.unsupportedImages++;
    } else if (src) read.externalImages++;
  };

  const hasContent = (runs: Run[]) => runs.some((r) => r.text.trim() !== '' && r !== LINE_BREAK);
  const trimBreaks = (runs: Run[]): Run[] => {
    let a = 0;
    let b = runs.length;
    while (a < b && runs[a] === LINE_BREAK) a++;
    while (b > a && runs[b - 1] === LINE_BREAK) b--;
    return runs.slice(a, b);
  };

  const flushInline = (runs: Run[], blocks: Block[], align?: Align) => {
    const trimmed = trimBreaks(runs);
    if (hasContent(trimmed)) blocks.push({ type: 'paragraph', runs: trimmed, align });
    runs.length = 0;
  };

  const imageBlock = (el: Element, blocks: Block[]) => {
    const src = el.getAttribute('src') ?? '';
    if (!src.startsWith('data:')) {
      if (src) read.externalImages++;
      return;
    }
    const img = decodeDataImage(src);
    if (img && img !== 'unsupported') blocks.push({ type: 'image', bytes: img.bytes, kind: img.kind });
    else read.unsupportedImages++;
  };

  const listItems = (list: Element, level: number, out: ListItem[], ctx: Ctx) => {
    const ordered = list.tagName.toLowerCase() === 'ol';
    let n = Number(list.getAttribute('start') ?? 1);
    if (!Number.isFinite(n)) n = 1;
    for (const li of Array.from(list.children)) {
      if (li.tagName.toLowerCase() !== 'li') continue;
      const runs: Run[] = [];
      const nested: Element[] = [];
      for (const child of Array.from(li.childNodes)) {
        if (child.nodeType === 1 && /^(ul|ol)$/.test((child as Element).tagName.toLowerCase())) nested.push(child as Element);
        else if (child.nodeType === 1) {
          const el = child as Element;
          const tag = el.tagName.toLowerCase();
          if (SKIP.has(tag)) continue;
          if (UNSUPPORTED.has(tag)) read.skippedElements++;
          else if (tag === 'img') countImage(el);
          else {
            collectInline(el, ctxFor(el, ctx), runs);
            if (/^(p|div)$/.test(tag)) runs.push(LINE_BREAK);
          }
        } else if (child.nodeType === 3 && child.textContent) runs.push({ text: child.textContent, bold: ctx.bold, italic: ctx.italic, underline: ctx.underline, href: ctx.href, code: ctx.code });
      }
      const trimmed = trimBreaks(runs);
      out.push({ runs: trimmed.length ? trimmed : [{ text: ' ' }], level, marker: ordered ? `${n}.` : level % 2 === 0 ? '•' : '–' });
      n++;
      for (const sub of nested) listItems(sub, level + 1, out, ctx);
    }
  };

  const tableBlock = (table: Element): Block | null => {
    const rows: Cell[][] = [];
    const ctx: Ctx = { bold: false, italic: false, underline: false, code: false };
    for (const tr of Array.from(table.querySelectorAll('tr'))) {
      // Skip rows that belong to a nested table.
      if (tr.closest('table') !== table) continue;
      const cells: Cell[] = [];
      for (const td of Array.from(tr.children)) {
        const tag = td.tagName.toLowerCase();
        if (tag !== 'td' && tag !== 'th') continue;
        const runs: Run[] = [];
        collectInline(td, ctxFor(td, ctx), runs);
        const span = Number(td.getAttribute('colspan') ?? 1);
        cells.push({ runs: trimBreaks(runs), header: tag === 'th', align: alignOf(td), colSpan: Number.isFinite(span) && span > 1 ? Math.min(span, 50) : 1 });
      }
      if (cells.length) rows.push(cells);
    }
    return rows.length ? { type: 'table', rows } : null;
  };

  const walk = (parent: Element, blocks: Block[], ctx: Ctx) => {
    const pending: Run[] = [];
    let pendingAlign: Align | undefined;
    const flush = () => {
      flushInline(pending, blocks, pendingAlign);
      pendingAlign = undefined;
    };
    for (const child of Array.from(parent.childNodes)) {
      if (child.nodeType === 3) {
        const text = child.textContent ?? '';
        if (text) pending.push({ text, bold: ctx.bold, italic: ctx.italic, underline: ctx.underline, href: ctx.href, code: ctx.code });
        continue;
      }
      if (child.nodeType !== 1) continue;
      const el = child as Element;
      const tag = el.tagName.toLowerCase();
      if (SKIP.has(tag)) continue;
      if (UNSUPPORTED.has(tag)) {
        read.skippedElements++;
        continue;
      }
      if (pageBreakBefore(el)) {
        flush();
        blocks.push({ type: 'pagebreak' });
      }
      const next = ctxFor(el, ctx);
      if (/^h[1-6]$/.test(tag)) {
        flush();
        const runs: Run[] = [];
        collectInline(el, next, runs);
        if (hasContent(runs)) blocks.push({ type: 'heading', level: Number(tag[1]), runs: trimBreaks(runs), align: alignOf(el) });
      } else if (tag === 'p') {
        flush();
        const runs: Run[] = [];
        collectInline(el, next, runs);
        flushInline(runs, blocks, alignOf(el));
      } else if (tag === 'ul' || tag === 'ol') {
        flush();
        const items: ListItem[] = [];
        listItems(el, 0, items, next);
        if (items.length) blocks.push({ type: 'list', items });
      } else if (tag === 'table') {
        flush();
        const t = tableBlock(el);
        if (t) blocks.push(t);
      } else if (tag === 'pre') {
        flush();
        const text = (el.textContent ?? '').replace(/^\n/, '').replace(/\s+$/, '');
        if (text.trim()) blocks.push({ type: 'code', text });
      } else if (tag === 'blockquote') {
        flush();
        const inner: Block[] = [];
        walk(el, inner, next);
        for (const b of inner) blocks.push(b.type === 'paragraph' ? { ...b, quote: true } : b);
      } else if (tag === 'hr') {
        flush();
        blocks.push({ type: 'rule' });
      } else if (tag === 'img') {
        flush();
        imageBlock(el, blocks);
      } else if (tag === 'br') {
        pending.push(LINE_BREAK);
      } else if (tag === 'dt') {
        flush();
        const runs: Run[] = [];
        collectInline(el, { ...next, bold: true }, runs);
        flushInline(runs, blocks);
      } else if (BLOCK_CONTAINERS.has(tag)) {
        flush();
        walk(el, blocks, next);
        if (tag === 'dd') {
          // Definitions are indented under their term.
          for (let i = blocks.length - 1; i >= 0 && blocks[i].type === 'paragraph'; i--) (blocks[i] as { indent?: number }).indent ??= 18;
        }
      } else {
        // Inline element (span, a, b, em, ...): its text joins the surrounding paragraph.
        const runs: Run[] = [];
        collectInline(el, next, runs);
        pending.push(...runs);
        pendingAlign ??= alignOf(el);
      }
    }
    flush();
  };

  const root = doc.body ?? doc.documentElement;
  if (root) walk(root, read.blocks, { bold: false, italic: false, underline: false, code: false });
  if (!read.title) {
    const h1 = read.blocks.find((b) => b.type === 'heading');
    if (h1 && h1.type === 'heading') read.title = h1.runs.map((r) => r.text).join('').trim().slice(0, 120);
  }
  return read;
}

/** Parses an HTML string into an inert document. */
export function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html');
}
