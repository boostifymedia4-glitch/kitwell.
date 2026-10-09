/**
 * Turning OCR results into a searchable PDF: the original pages stay exactly as they are and an invisible
 * text layer (render mode 3, the same technique scanners use) is placed over each recognised word.
 * Pure functions on bytes; the recognition itself runs in ./ocrEngine.ts.
 */
import { PDFNumber, PDFOperator, StandardFonts, TextRenderingMode, beginText, endText, setFontAndSize, setTextMatrix, setTextRenderingMode, showText, type PDFFont } from '@cantoo/pdf-lib';
import { visibleBox, visibleToPage } from './pdfEdit';
import { PdfError, loadPdf } from './pdfOps';

export interface OcrWord {
  text: string;
  /** Pixel box in the rendered page image, origin top-left. */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** 0-100. */
  confidence: number;
  /** True when this word is the last one on its text line. */
  lineEnd: boolean;
}

export interface OcrPageResult {
  /** 1-based page number. */
  page: number;
  /** Size in pixels of the image that was recognised. */
  width: number;
  height: number;
  words: OcrWord[];
  text: string;
  /** Mean confidence, 0-100. */
  confidence: number;
}

/** Words the engine is quite unsure about are skipped in the invisible layer to avoid junk when searching. */
export const MIN_WORD_CONFIDENCE = 20;

/** Turns a recognised word into something the standard font can encode (ligatures are expanded, unknown symbols dropped). */
export function drawableText(text: string, font: PDFFont): string {
  const supported = new Set(font.getCharacterSet());
  return [...text.normalize('NFKD')].filter((ch) => supported.has(ch.codePointAt(0) as number)).join('');
}

export async function addTextLayer(bytes: Uint8Array, results: OcrPageResult[]): Promise<{ bytes: Uint8Array; words: number }> {
  const doc = await loadPdf(bytes);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  let placed = 0;
  for (const result of results) {
    const page = pages[result.page - 1];
    if (!page) throw new PdfError(`Page ${result.page} does not exist in this document.`);
    if (!(result.width > 0 && result.height > 0)) continue;
    const vb = visibleBox(page);
    const sx = vb.visibleWidth / result.width;
    const sy = vb.visibleHeight / result.height;
    const theta = (vb.rotation * Math.PI) / 180;
    const cos = Math.round(Math.cos(theta) * 1e6) / 1e6;
    const sin = Math.round(Math.sin(theta) * 1e6) / 1e6;
    const key = page.node.newFontDictionary(font.name, font.ref);
    const ops = [];
    for (const word of result.words) {
      if (word.confidence < MIN_WORD_CONFIDENCE) continue;
      const text = drawableText(word.text, font);
      if (!text.trim()) continue;
      const boxW = (word.x1 - word.x0) * sx;
      const boxH = (word.y1 - word.y0) * sy;
      if (!(boxW > 0 && boxH > 0)) continue;
      const size = Math.max(1, Math.min(boxH * 0.9, 200));
      const natural = font.widthOfTextAtSize(text, size);
      if (!(natural > 0)) continue;
      const scale = Math.max(10, Math.min(500, (boxW / natural) * 100)); // horizontal scaling so the word spans its box
      // Baseline sits a little above the bottom of the box (room for descenders).
      const base = visibleToPage(vb, word.x0 * sx, vb.visibleHeight - word.y1 * sy + boxH * 0.2);
      ops.push(
        beginText(),
        setTextRenderingMode(TextRenderingMode.Invisible),
        setFontAndSize(key, size),
        PDFOperator.of('Tz' as never, [PDFNumber.of(scale)]),
        setTextMatrix(cos, sin, -sin, cos, base.x, base.y),
        showText(font.encodeText(word.lineEnd ? text : `${text} `)),
        endText(),
      );
      placed++;
    }
    if (ops.length) page.pushOperators(...ops);
  }
  return { bytes: await doc.save({ useObjectStreams: true }), words: placed };
}

/** Joins the page texts into one document with page markers, for the plain-text download. */
export function joinPageTexts(results: OcrPageResult[]): string {
  return results.map((r) => `--- Page ${r.page} ---\n${r.text.trim()}`).join('\n\n');
}

export const meanConfidence = (results: OcrPageResult[]): number => {
  const words = results.flatMap((r) => r.words);
  return words.length ? Math.round(words.reduce((s, w) => s + w.confidence, 0) / words.length) : 0;
};
