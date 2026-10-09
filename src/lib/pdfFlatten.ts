/**
 * Page-to-image PDF rebuilding, used by "strong" compression and by redaction.
 * Every page that goes through here becomes a picture: text, links and form fields on it are gone.
 */
import { PDFDocument } from '@cantoo/pdf-lib';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { MAX_RENDER_PIXELS } from './pdfjs';
import { PdfError } from './pdfOps';

export interface RenderedPage {
  jpeg: Uint8Array;
  /** Page size in PDF points, as the reader sees it (rotation applied). */
  widthPt: number;
  heightPt: number;
}

/** Renders one page at `dpi`, optionally painting black boxes (fractions of the page, origin top-left) before encoding. */
export async function renderPageAsJpeg(
  doc: PDFDocumentProxy,
  pageNumber: number,
  dpi: number,
  quality: number,
  blackBoxes: { x: number; y: number; w: number; h: number }[] = [],
): Promise<RenderedPage> {
  const page = await doc.getPage(pageNumber);
  try {
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: dpi / 72 });
    if (viewport.width * viewport.height > MAX_RENDER_PIXELS) throw new PdfError('A page is too large to process at this quality. Choose a lower quality setting.');
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new PdfError('Your browser could not create a drawing surface for this page.');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    ctx.fillStyle = '#000000';
    for (const b of blackBoxes) {
      // Round outwards so no sliver of the original shows at the edges.
      const x = Math.floor(b.x * canvas.width);
      const y = Math.floor(b.y * canvas.height);
      ctx.fillRect(x, y, Math.ceil((b.x + b.w) * canvas.width) - x, Math.ceil((b.y + b.h) * canvas.height) - y);
    }
    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new PdfError('The browser could not encode a page image.'))), 'image/jpeg', quality),
    );
    canvas.width = canvas.height = 0; // release the pixel memory right away
    return { jpeg: new Uint8Array(await blob.arrayBuffer()), widthPt: base.width, heightPt: base.height };
  } finally {
    page.cleanup();
  }
}

/** Builds a PDF whose pages are the given page pictures, in order. */
export async function pdfFromPageImages(pages: RenderedPage[]): Promise<Uint8Array> {
  const out = await PDFDocument.create();
  for (const p of pages) {
    const image = await out.embedJpg(p.jpeg);
    const page = out.addPage([p.widthPt, p.heightPt]);
    page.drawImage(image, { x: 0, y: 0, width: p.widthPt, height: p.heightPt });
  }
  return out.save({ useObjectStreams: true });
}
