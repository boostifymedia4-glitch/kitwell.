import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MB } from '@/lib/files';
import { errorMessage } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { Icon } from '../Icon';
import { ErrorMessage, ProcessingState, RejectionList } from './Feedback';
import { FileList, type ItemStatus } from './FileList';
import { ResetButton, ResultFiles, ResultPanel, type ResultFile } from './Results';
import { UploadDropzone } from './UploadDropzone';

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'avif'];
export const MAX_IMAGE_BYTES = 25 * MB;
export const MAX_IMAGES = 20;

interface Props {
  extensions?: string[];
  actionLabel: string;
  /** Option controls; state is owned by the calling tool. */
  options?: ReactNode;
  disabled?: boolean;
  zipName: string;
  /** Processes one file. Throw an Error with a user-readable message on failure. */
  process: (file: File, index: number) => Promise<ResultFile>;
}

/**
 * Shared batch workflow for image tools: pick files -> choose options -> process one by one ->
 * download individually or as ZIP. Per-file failures never block the rest of the batch.
 */
export function BatchImageTool({ extensions = IMAGE_EXTENSIONS, actionLabel, options, disabled, zipName, process }: Props) {
  const queue = useFileQueue({ extensions, maxBytes: MAX_IMAGE_BYTES, maxFiles: MAX_IMAGES }, true);
  const task = useTask<ResultFile[]>();
  const [statuses, setStatuses] = useState<Record<string, { status: ItemStatus; message?: string }>>({});
  const processRef = useRef(process);
  processRef.current = process;
  const { reset: resetTask } = task;

  // Results are stale once the file list changes.
  useEffect(() => {
    resetTask();
    setStatuses({});
  }, [queue.items, resetTask]);

  const running = task.state.status === 'running';

  const start = () =>
    task.run(async (report) => {
      const out: ResultFile[] = [];
      const items = queue.items;
      const next: Record<string, { status: ItemStatus; message?: string }> = {};
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        report(i, items.length, `Processing ${item.file.name}`);
        setStatuses((s) => ({ ...s, [item.id]: { status: 'processing' } }));
        try {
          out.push(await processRef.current(item.file, i));
          next[item.id] = { status: 'done' };
        } catch (err) {
          next[item.id] = { status: 'error', message: errorMessage(err) };
        }
        setStatuses((s) => ({ ...s, [item.id]: next[item.id] }));
        // Yield so the browser can paint progress between large images.
        await new Promise((r) => setTimeout(r, 0));
      }
      report(items.length, items.length);
      if (out.length === 0) {
        const first = Object.values(next).find((n) => n.message)?.message;
        throw new Error(first ?? 'None of the files could be processed.');
      }
      return out;
    });

  const reset = () => {
    queue.clear();
    task.reset();
    setStatuses({});
  };

  const listItems = queue.items.map((i) => ({ ...i, status: statuses[i.id]?.status, message: statuses[i.id]?.message }));
  const failed = listItems.filter((i) => i.status === 'error').length;

  return (
    <div className="stack">
      <UploadDropzone
        extensions={extensions}
        multiple
        maxBytes={MAX_IMAGE_BYTES}
        maxFiles={MAX_IMAGES}
        disabled={running}
        compact={queue.items.length > 0}
        title={queue.items.length ? 'Add more images' : undefined}
        onFiles={queue.add}
      />
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      <FileList items={listItems} kind="image" onRemove={queue.remove} onMove={queue.move} disabled={running} />

      {queue.items.length > 0 && (
        <>
          {options && <div className="options-grid">{options}</div>}
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={start} disabled={running || disabled}>
              <Icon name="zap" size={18} />
              {actionLabel}
            </button>
            <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
              Clear all
            </button>
          </div>
        </>
      )}

      {task.state.status === 'running' && <ProcessingState progress={task.state.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title={failed ? `Done · ${failed} file${failed === 1 ? '' : 's'} failed` : 'Done'}>
          <ResultFiles files={task.state.result} zipName={zipName} />
          <ResetButton onClick={reset} />
        </ResultPanel>
      )}
    </div>
  );
}
