import { runRegex, type RegexRun } from './dev';

const TIMEOUT_MS = 1500;
let worker: Worker | null = null;
let nextId = 1;

function spawn(): Worker {
  return new Worker(new URL('./regexWorker.ts', import.meta.url), { type: 'module' });
}

export class RegexTimeoutError extends Error {
  constructor() {
    super('This pattern took too long to run and was stopped. It may cause catastrophic backtracking (for example nested repetition like (a+)+).');
  }
}

/**
 * Runs the regex in a Web Worker with a time limit, so a pathological pattern cannot freeze the page.
 * A new request cancels any request still in flight.
 */
export function runRegexSafe(pattern: string, flags: string, text: string, replacement?: string): Promise<RegexRun> {
  if (typeof Worker === 'undefined') return Promise.resolve(runRegex(pattern, flags, text, replacement));
  worker?.terminate();
  const w = (worker = spawn());
  const id = nextId++;
  return new Promise<RegexRun>((resolve, reject) => {
    const timer = setTimeout(() => {
      w.terminate();
      if (worker === w) worker = null;
      reject(new RegexTimeoutError());
    }, TIMEOUT_MS);
    w.onmessage = (e: MessageEvent<{ id: number; result: RegexRun }>) => {
      if (e.data.id !== id) return;
      clearTimeout(timer);
      resolve(e.data.result);
    };
    w.onerror = () => {
      clearTimeout(timer);
      // Worker failed to start: fall back to the main thread.
      resolve(runRegex(pattern, flags, text, replacement));
    };
    w.postMessage({ id, pattern, flags, text, replacement });
  });
}

export function disposeRegexWorker() {
  worker?.terminate();
  worker = null;
}
