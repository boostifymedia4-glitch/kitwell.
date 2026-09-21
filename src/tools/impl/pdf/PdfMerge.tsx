import { useEffect } from 'react';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { FileList } from '@/components/tool/FileList';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { MB } from '@/lib/files';
import { formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { mergePdfs } from '@/lib/pdfOps';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 100 * MB;
const MAX_FILES = 20;

const PdfMerge: ToolImplementation = () => {
  const queue = useFileQueue({ extensions: ['pdf'], maxBytes: MAX_BYTES, maxFiles: MAX_FILES }, true);
  const task = useTask<{ blob: Blob; pages: number }>();
  const { reset: resetTask } = task;

  useEffect(() => {
    resetTask();
  }, [queue.items, resetTask]);

  const running = task.state.status === 'running';

  const merge = () =>
    task.run(async (report) => {
      const buffers: Uint8Array[] = [];
      for (const item of queue.items) buffers.push(new Uint8Array(await item.file.arrayBuffer()));
      const bytes = await mergePdfs(buffers, {
        names: queue.items.map((i) => i.file.name),
        onProgress: (done, total) => report(done, total, 'Merging'),
      });
      return { blob: new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), pages: 0 };
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  return (
    <div className="stack">
      <UploadDropzone
        extensions={['pdf']}
        multiple
        maxBytes={MAX_BYTES}
        maxFiles={MAX_FILES}
        disabled={running}
        compact={queue.items.length > 0}
        title={queue.items.length ? 'Add more PDFs' : 'Drop PDFs here or click to choose'}
        onFiles={queue.add}
      />
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      <FileList items={queue.items} kind="pdf" onRemove={queue.remove} onMove={queue.move} disabled={running} />
      {queue.items.length === 1 && <p className="hint">Add at least one more PDF to merge.</p>}
      {queue.items.length > 0 && (
        <div className="toolbar">
          <button type="button" className="btn btn-primary btn-lg" onClick={merge} disabled={running || queue.items.length < 2}>
            <Icon name="merge" size={18} />
            Merge {queue.items.length} PDFs
          </button>
          <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
            Clear all
          </button>
        </div>
      )}
      {running && <ProcessingState label="Merging PDFs…" progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title="Your merged PDF is ready">
          <p className="muted">{formatBytes(task.state.result.blob.size)}</p>
          <div className="toolbar">
            <DownloadButton blob={task.state.result.blob} name="merged.pdf" label="Download merged.pdf" />
            <ResetButton onClick={reset} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
};

export default PdfMerge;
