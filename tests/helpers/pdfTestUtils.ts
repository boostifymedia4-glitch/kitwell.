import { readFileSync } from 'node:fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { FontLoader } from '../../src/lib/pdfFont';

/** Reads the bundled Noto Sans files straight from node_modules (the browser build fetches them instead). */
export const nodeFontLoader: FontLoader = async (id) => new Uint8Array(readFileSync(`node_modules/@fontsource/noto-sans/files/noto-sans-${id}-normal.woff`));

/** Extracts the text of every page of a PDF with PDF.js, so tests check what a reader would really see. */
export async function pdfPages(bytes: Uint8Array): Promise<{ count: number; texts: string[]; sizes: [number, number][] }> {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise;
  const texts: string[] = [];
  const sizes: [number, number][] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    texts.push(content.items.map((it) => ('str' in it ? it.str + (it.hasEOL ? ' ' : '') : '')).join('').replace(/\s+/g, ' ').trim());
    const v = page.getViewport({ scale: 1 });
    sizes.push([Math.round(v.width), Math.round(v.height)]);
  }
  await doc.loadingTask.destroy();
  return { count: doc.numPages, texts, sizes };
}

/** Like pdfPages, but a page that PDF.js cannot read gives an empty text instead of failing the whole read. */
export async function pdfPagesSafe(bytes: Uint8Array): Promise<{ count: number; texts: string[]; readable: number }> {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise;
  const texts: string[] = [];
  let readable = 0;
  for (let i = 1; i <= doc.numPages; i++) {
    try {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      texts.push(content.items.map((it) => ('str' in it ? it.str + (it.hasEOL ? ' ' : '') : '')).join('').replace(/\s+/g, ' ').trim());
      readable++;
    } catch {
      texts.push('');
    }
  }
  const count = doc.numPages;
  await doc.loadingTask.destroy();
  return { count, texts, readable };
}
