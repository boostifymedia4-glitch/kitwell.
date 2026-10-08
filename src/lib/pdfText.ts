/**
 * Text extraction from PDFs that contain real (selectable) text, built on PDF.js.
 * Scanned PDFs are pictures of text and return nothing here; they need OCR.
 */
import type { PDFDocumentProxy } from 'pdfjs-dist';

/** The subset of a PDF.js text item that matters for rebuilding lines. */
export interface TextItemLike {
  str: string;
  hasEOL?: boolean;
  /** PDF.js text matrix: [a, b, c, d, x, y]. */
  transform?: number[];
  width?: number;
  height?: number;
}

/** Rebuilds readable text from PDF.js items: new lines when the baseline moves or the item ends a line, spaces across gaps. */
export function itemsToText(items: TextItemLike[]): string {
  let out = '';
  let lastY: number | null = null;
  let lastEnd: number | null = null;
  for (const item of items) {
    if (typeof item.str !== 'string') continue;
    const x = item.transform?.[4];
    const y = item.transform?.[5];
    const h = item.height || Math.abs(item.transform?.[3] ?? 0) || 10;

    if (lastY !== null && y !== undefined && Math.abs(y - lastY) > h * 0.5 && !out.endsWith('\n')) {
      out += '\n';
    } else if (lastEnd !== null && x !== undefined && x - lastEnd > h * 0.25 && out && !/\s$/.test(out) && !/^\s/.test(item.str)) {
      // A visible gap with no space character between the two runs.
      out += ' ';
    }
    out += item.str;
    if (y !== undefined) lastY = y;
    lastEnd = x !== undefined ? x + (item.width ?? 0) : null;
    if (item.hasEOL && !out.endsWith('\n')) {
      out += '\n';
      lastEnd = null;
    }
  }
  return out
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/g, ''))
    .join('\n')
    .trim();
}

export interface ExtractResult {
  text: string;
  pagesWithText: number;
  characters: number;
}

/** Extracts text from the given 1-based pages. */
export async function extractPdfText(
  doc: PDFDocumentProxy,
  pages: number[],
  opts: { pageMarkers: boolean; onProgress?: (done: number, total: number) => void },
): Promise<ExtractResult> {
  const parts: string[] = [];
  let pagesWithText = 0;
  let characters = 0;
  for (let i = 0; i < pages.length; i++) {
    opts.onProgress?.(i, pages.length);
    const page = await doc.getPage(pages[i]);
    try {
      const content = await page.getTextContent();
      const text = itemsToText(content.items as TextItemLike[]);
      if (text) {
        pagesWithText++;
        characters += text.length;
      }
      parts.push(opts.pageMarkers ? `--- Page ${pages[i]} ---\n${text}` : text);
    } finally {
      page.cleanup();
    }
  }
  opts.onProgress?.(pages.length, pages.length);
  return { text: parts.join('\n\n').trim(), pagesWithText, characters };
}
