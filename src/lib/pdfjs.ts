/**
 * Lazy PDF.js loader. Nothing here is imported by the homepage or by tools that do not render PDFs.
 */
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { PdfError } from './pdfOps';
import { tr } from '@/i18n/translate';

let loader: Promise<typeof import('pdfjs-dist')> | null = null;

async function loadPdfjs() {
  loader ??= (async () => {
    const [pdfjs, worker] = await Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]);
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    return pdfjs;
  })();
  return loader;
}

export async function openPdf(bytes: Uint8Array): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfjs();
  try {
    // PDF.js takes ownership of the buffer, so hand it a copy.
    return await pdfjs.getDocument({ data: bytes.slice() }).promise;
  } catch (err) {
    if (err instanceof pdfjs.PasswordException) {
      throw new PdfError(tr('err.pdf.passwordProtected'));
    }
    throw new PdfError(tr('err.pdf.unreadable'));
  }
}

/** Frees the worker and memory held by an opened document. */
export async function destroyPdf(doc: PDFDocumentProxy): Promise<void> {
  try {
    await doc.loadingTask.destroy();
  } catch {
    /* already destroyed */
  }
}

export const MAX_RENDER_PIXELS = 50_000_000;

/**
 * True when a picture on the page is about as large as the page itself, which is how a scanned page is built. A page can be a
 * scan and still carry a little real text (a page number or a stamp), so the amount of text alone cannot tell scans apart.
 */
export async function pageIsMostlyPicture(doc: PDFDocumentProxy, pageNumber: number): Promise<boolean> {
  const pdfjs = await loadPdfjs();
  const page = await doc.getPage(pageNumber);
  try {
    const [x0, y0, x1, y1] = page.view;
    const pagePoints = Math.abs((x1 - x0) * (y1 - y0));
    if (!(pagePoints > 0)) return false;
    const list = await page.getOperatorList();
    const { OPS } = pdfjs;
    for (let i = 0; i < list.fnArray.length; i++) {
      const fn = list.fnArray[i];
      const args = list.argsArray[i] as unknown[] | undefined;
      if (!args) continue;
      let w = 0;
      let h = 0;
      if (fn === OPS.paintImageXObject) {
        w = Number(args[1]);
        h = Number(args[2]);
      } else if (fn === OPS.paintInlineImageXObject || fn === OPS.paintImageMaskXObject) {
        const img = args[0] as { width?: number; height?: number } | undefined;
        w = Number(img?.width);
        h = Number(img?.height);
      }
      if (w > 0 && h > 0 && w * h >= pagePoints * 0.9) return true;
    }
    return false;
  } finally {
    page.cleanup();
  }
}

export async function renderPageToCanvas(
  doc: PDFDocumentProxy,
  pageNumber: number,
  scale: number,
  canvas: HTMLCanvasElement,
): Promise<void> {
  const page = await doc.getPage(pageNumber);
  try {
    const viewport = page.getViewport({ scale });
    if (viewport.width * viewport.height > MAX_RENDER_PIXELS) {
      throw new PdfError(tr('err.pdf.renderTooLarge'));
    }
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvas, viewport }).promise;
  } finally {
    page.cleanup();
  }
}

/** Renders a page so that its canvas is `targetWidth` pixels wide. Returns the canvas size. */
export async function renderPageToWidth(doc: PDFDocumentProxy, pageNumber: number, targetWidth: number, canvas: HTMLCanvasElement): Promise<{ w: number; h: number }> {
  const page = await doc.getPage(pageNumber);
  try {
    // The size is read and the page rendered in one go: cleaning a page up before rendering it can stall PDF.js.
    const viewport = page.getViewport({ scale: targetWidth / page.getViewport({ scale: 1 }).width });
    if (viewport.width * viewport.height > MAX_RENDER_PIXELS) throw new PdfError(tr('err.pdf.previewTooLarge'));
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvas, viewport }).promise;
    return { w: canvas.width, h: canvas.height };
  } finally {
    page.cleanup();
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error(tr('err.pdf.encodePage')))),
      mime,
      quality,
    );
  });
}

// Thumbnails are rendered one at a time so a 300-page document does not stall the browser.
let queue: Promise<unknown> = Promise.resolve();

export function renderThumbnail(doc: PDFDocumentProxy, pageNumber: number, canvas: HTMLCanvasElement, targetWidth: number): Promise<void> {
  const job = queue.then(async () => {
    const page = await doc.getPage(pageNumber);
    try {
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (targetWidth / base.width) * dpr });
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      await page.render({ canvas, viewport }).promise;
    } finally {
      page.cleanup();
    }
  });
  queue = job.catch(() => undefined);
  return job;
}
