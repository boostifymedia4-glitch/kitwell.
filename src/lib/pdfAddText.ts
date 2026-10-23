/** Writes typed text onto the pages of a PDF that has no form fields. Pure function on bytes. */
import { StandardFonts } from '@cantoo/pdf-lib';
import { PdfError, loadPdf } from './pdfOps';
import { tr } from '@/i18n/translate';

export interface TextItem {
  /** One-based page number. */
  page: number;
  /** Left and top of the text as fractions (0-1) of the page width and height. */
  x: number;
  y: number;
  /** Font size in PDF points. */
  size: number;
  text: string;
}

export async function addTextToPdf(bytes: Uint8Array, items: TextItem[]): Promise<Uint8Array> {
  const doc = await loadPdf(bytes);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  // The library silently turns unsupported characters into garbage, so check against the font's real character set.
  const supported = new Set(font.getCharacterSet());
  const pages = doc.getPages();
  for (const item of items) {
    if (!item.text.trim()) continue;
    if (![...item.text].every((ch) => supported.has(ch.codePointAt(0) as number))) throw new PdfError(tr('err.pdf.formChar'));
    const page = pages[item.page - 1];
    if (!page) continue;
    const { width, height } = page.getSize();
    page.drawText(item.text, { x: item.x * width, y: height - item.y * height - item.size, size: item.size, font });
  }
  return doc.save();
}
