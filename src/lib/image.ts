import { processOnCurrentThread, type ImagePlan, type ImageResult } from './imageProcessor';

export type { ImagePlan, ImageResult, OutputMime } from './imageProcessor';
export { decode } from './imageProcessor';

interface Pending {
  resolve: (r: ImageResult) => void;
  reject: (e: Error) => void;
}

const WORKER_FAILED = '__worker_failed__';
let worker: Worker | null = null;
let workerBroken = false;
let nextId = 1;
const pending = new Map<number, Pending>();

function getWorker(): Worker | null {
  if (workerBroken || typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') return null;
  if (worker) return worker;
  try {
    worker = new Worker(new URL('./image.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<{ id: number; ok: boolean; result?: ImageResult; error?: string }>) => {
      const p = pending.get(e.data.id);
      if (!p) return;
      pending.delete(e.data.id);
      if (e.data.ok && e.data.result) p.resolve(e.data.result);
      else p.reject(new Error(e.data.error ?? 'Processing failed.'));
    };
    worker.onerror = () => {
      // The worker failed to load or crashed: use the main thread for the rest of the session.
      workerBroken = true;
      worker = null;
      for (const p of pending.values()) p.reject(new Error(WORKER_FAILED));
      pending.clear();
    };
    return worker;
  } catch {
    workerBroken = true;
    return null;
  }
}

/** Runs the image pipeline in a Web Worker when available so large images do not freeze the page. */
export async function processImage(file: Blob, plan: ImagePlan): Promise<ImageResult> {
  const w = getWorker();
  if (w) {
    try {
      return await new Promise<ImageResult>((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        w.postMessage({ id, file, plan });
      });
    } catch (err) {
      if (!(err instanceof Error) || err.message !== WORKER_FAILED) throw err;
    }
  }
  return processOnCurrentThread(file, plan);
}

export const OUTPUT_EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
