import { useEffect, useState } from 'react';
import { tr } from '@/i18n/translate';

export interface PdfPreview {
  /** A small picture (data address) of the first page, or null while loading or when it could not be drawn. */
  thumb: string | null;
  /** Number of pages, or null when unknown. */
  pages: number | null;
  /** True when the file is protected with a password. */
  locked: boolean;
  /** True once the preview has finished, successfully or not. */
  ready: boolean;
}

/** Files above this size get no thumbnail, so a list of big files cannot use up the browser's memory. */
const MAX_THUMB_BYTES = 60 * 1024 * 1024;
const THUMB_WIDTH = 220;
const CONCURRENCY = 2;
/** A file that takes longer than this gives up its place, so one slow file cannot hold up the rest of the list. */
const JOB_TIMEOUT_MS = 20_000;

let running = 0;
const waiting: (() => void)[] = [];

/** Previews are drawn two at a time, so a list of 80 PDFs stays responsive. */
async function slot<T>(job: () => Promise<T>): Promise<T> {
  if (running >= CONCURRENCY) await new Promise<void>((resolve) => waiting.push(resolve));
  running++;
  try {
    return await job();
  } finally {
    running--;
    waiting.shift()?.();
  }
}

type Built = { thumb: string | null; pages: number | null; locked: boolean };
const EMPTY: Built = { thumb: null, pages: null, locked: false };

async function build(file: File): Promise<Built> {
  if (file.size > MAX_THUMB_BYTES) return EMPTY;
  const { openPdf, destroyPdf, renderThumbnail } = await import('./pdfjs');
  let doc;
  try {
    doc = await openPdf(new Uint8Array(await file.arrayBuffer()));
  } catch (err) {
    return { ...EMPTY, locked: (err as Error).message === tr('err.pdf.passwordProtected') };
  }
  try {
    const pages = doc.numPages;
    const canvas = document.createElement('canvas');
    await renderThumbnail(doc, 1, canvas, THUMB_WIDTH);
    const thumb = canvas.toDataURL('image/jpeg', 0.82);
    canvas.width = 0;
    canvas.height = 0;
    return { thumb, pages, locked: false };
  } catch {
    return { ...EMPTY, pages: doc.numPages };
  } finally {
    await destroyPdf(doc);
  }
}

const withTimeout = (job: Promise<Built>): Promise<Built> =>
  Promise.race([job, new Promise<Built>((resolve) => setTimeout(() => resolve(EMPTY), JOB_TIMEOUT_MS))]);

/** The first-page picture and page count of a PDF, prepared in the background. */
export function usePdfPreview(file: File, enabled = true): PdfPreview {
  const [state, setState] = useState<PdfPreview>({ thumb: null, pages: null, locked: false, ready: false });
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setState({ thumb: null, pages: null, locked: false, ready: false });
    slot(() => withTimeout(build(file)))
      .then((res) => {
        if (!cancelled) setState({ ...res, ready: true });
      })
      .catch(() => {
        if (!cancelled) setState({ ...EMPTY, ready: true });
      });
    return () => {
      cancelled = true;
    };
  }, [file, enabled]);
  return state;
}
