import { useCallback, useRef, useState } from 'react';
import { validateFiles, type FileRules } from './files';
import { errorMessage } from './format';
import type { Rejection } from './hooks';
import { loadPdf } from './pdfOps';

export const PDF_RULES: FileRules = { extensions: ['pdf'], maxBytes: 100 * 1024 * 1024, maxFiles: 1 };

/** Loads and validates a single PDF chosen by the user. */
export function usePdfFile() {
  const [state, setState] = useState<
    | { status: 'empty' }
    | { status: 'loading'; name: string }
    | { status: 'ready'; file: File; bytes: Uint8Array; pageCount: number }
    | { status: 'error'; message: string }
  >({ status: 'empty' });
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const token = useRef(0);

  const load = useCallback(async (files: File[]) => {
    const { accepted, rejected } = validateFiles(files.slice(0, 1), PDF_RULES);
    const extra = files.slice(1).map((f) => ({ name: f.name, reason: 'Only one PDF can be used at a time.' }));
    setRejections([...rejected, ...extra]);
    if (accepted.length === 0) return;
    const file = accepted[0];
    const mine = ++token.current;
    setState({ status: 'loading', name: file.name });
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await loadPdf(bytes);
      if (mine === token.current) setState({ status: 'ready', file, bytes, pageCount: doc.getPageCount() });
    } catch (err) {
      if (mine === token.current) setState({ status: 'error', message: errorMessage(err) });
    }
  }, []);

  const reset = useCallback(() => {
    token.current++;
    setState({ status: 'empty' });
    setRejections([]);
  }, []);

  return { state, load, reset, rejections };
}
