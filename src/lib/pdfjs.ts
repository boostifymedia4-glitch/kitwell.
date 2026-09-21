/**
 * Lazy PDF.js loader. Nothing here is imported by the homepage or by tools that do not render PDFs.
 */
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { PdfError } from './pdfOps';

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
      throw new PdfError('This PDF is password-protected. Remove the password in the app that created it, then try again.');
    }
    throw new PdfError('This file could not be read as a PDF. It may be corrupted or not a PDF at all.');
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
      throw new PdfError('This page is too large to render at the chosen resolution. Try a lower DPI.');
    }
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvas, viewport }).promise;
  } finally {
    page.cleanup();
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('The browser could not encode this page as an image.'))),
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
