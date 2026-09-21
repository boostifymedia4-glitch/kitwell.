import { useCallback, useEffect, useRef, useState } from 'react';
import { validateFiles, type FileRules } from './files';
import { errorMessage } from './format';

let idCounter = 0;
export const nextId = () => `f${++idCounter}`;

export function useObjectUrl(blob: Blob | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!blob) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);
  return url;
}

export interface QueueItem {
  id: string;
  file: File;
}

export interface Rejection {
  name: string;
  reason: string;
}

/** Manages a validated list of user-selected files. */
export function useFileQueue(rules: FileRules, multiple: boolean) {
  const [items, setItemsState] = useState<QueueItem[]>([]);
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const itemsRef = useRef<QueueItem[]>([]);
  const rulesRef = useRef(rules);
  rulesRef.current = rules;

  const setItems = useCallback((next: QueueItem[]) => {
    itemsRef.current = next;
    setItemsState(next);
  }, []);

  const add = useCallback(
    (files: File[]) => {
      const base = multiple ? itemsRef.current : [];
      const { accepted, rejected } = validateFiles(multiple ? files : files.slice(0, 1), rulesRef.current, base.length);
      const extra = multiple ? [] : files.slice(1).map((f) => ({ name: f.name, reason: 'Only one file can be used at a time.' }));
      setRejections([...rejected, ...extra]);
      if (accepted.length > 0) setItems([...base, ...accepted.map((file) => ({ id: nextId(), file }))]);
    },
    [multiple, setItems],
  );
  const remove = useCallback((id: string) => setItems(itemsRef.current.filter((i) => i.id !== id)), [setItems]);
  const clear = useCallback(() => {
    setItems([]);
    setRejections([]);
  }, [setItems]);
  const move = useCallback(
    (from: number, to: number) => {
      const p = itemsRef.current;
      if (to < 0 || to >= p.length || from === to) return;
      const next = p.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      setItems(next);
    },
    [setItems],
  );
  const dismissRejections = useCallback(() => setRejections([]), []);
  return { items, add, remove, clear, move, rejections, dismissRejections };
}

export interface Progress {
  done: number;
  total: number;
  label?: string;
}

type TaskState<T> =
  | { status: 'idle' }
  | { status: 'running'; progress: Progress | null }
  | { status: 'done'; result: T }
  | { status: 'error'; error: string };

/**
 * Wraps an async job so the UI can never get stuck: every path ends in `done` or `error`,
 * and updates after unmount are ignored.
 */
export function useTask<T>() {
  const [state, setState] = useState<TaskState<T>>({ status: 'idle' });
  const mounted = useRef(true);
  const runId = useRef(0);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback(async (job: (report: (done: number, total: number, label?: string) => void) => Promise<T>) => {
    const id = ++runId.current;
    const live = () => mounted.current && runId.current === id;
    setState({ status: 'running', progress: null });
    try {
      const result = await job((done, total, label) => {
        if (live()) setState({ status: 'running', progress: { done, total, label } });
      });
      if (live()) setState({ status: 'done', result });
    } catch (err) {
      if (live()) setState({ status: 'error', error: errorMessage(err) });
    }
  }, []);

  const reset = useCallback(() => {
    runId.current++;
    setState({ status: 'idle' });
  }, []);

  return { state, run, reset, progress: state.status === 'running' ? state.progress : null };
}
