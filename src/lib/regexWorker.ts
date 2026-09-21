import { runRegex, type RegexRun } from './dev';

interface Req {
  id: number;
  pattern: string;
  flags: string;
  text: string;
  replacement?: string;
}

self.onmessage = (e: MessageEvent<Req>) => {
  const { id, pattern, flags, text, replacement } = e.data;
  self.postMessage({ id, result: runRegex(pattern, flags, text, replacement) satisfies RegexRun });
};
