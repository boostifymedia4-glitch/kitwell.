import { useEffect, type ReactNode } from 'react';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { FileList } from '@/components/tool/FileList';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import type { Note } from '@/lib/convertNotes';
import { baseName, formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';

export interface Converted {
  bytes: Uint8Array;
  pages: number;
  notes: Note[];
}

interface Props {
  /** Shown in the drop area, e.g. "Word (DOCX)". */
  format: string;
  /** Accepted file extension without the dot. */
  extension: string;
  extensions?: string[];
  maxBytes: number;
  /** Options shown once a file is chosen. */
  options?: ReactNode;
  /** Does the work. Called with the chosen file's bytes. */
  convert: (bytes: Uint8Array, name: string, report: (done: number, total: number, label?: string) => void) => Promise<Converted>;
  /** Changes whenever an option changes, so that an old result is cleared. */
  optionsKey?: string;
}

/**
 * One document in, one PDF out: drop area, file summary, options, progress, result with download and a list of what
 * the conversion could not keep. Used by Word, Excel and PowerPoint to PDF.
 */
export function OfficeConverter({ format, extension, extensions, maxBytes, options, convert, optionsKey = '' }: Props) {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: extensions ?? [extension], maxBytes, maxFiles: 1 }, false);
  const task = useTask<{ blob: Blob; pages: number; notes: Note[] }>();
  const { reset: resetTask } = task;
  const item = queue.items[0];
  useEffect(() => {
    resetTask();
  }, [item, optionsKey, resetTask]);
  const running = task.state.status === 'running';

  const run = () =>
    task.run(async (report) => {
      if (!item) throw new Error(t('err.files.empty'));
      report(0, 1, t('convert.reading', { name: item.file.name }));
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      const out = await convert(bytes, item.file.name, report);
      return { blob: new Blob([out.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), pages: out.pages, notes: out.notes };
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  return (
    <div className="stack">
      {!item && <UploadDropzone extensions={extensions ?? [extension]} maxBytes={maxBytes} onFiles={queue.add} title={t('convert.drop', { format })} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {item && (
        <>
          <FileList items={queue.items} kind="pdf" onRemove={queue.remove} disabled={running} />
          {options}
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running} aria-busy={running}>
              <Icon name="file-text" size={18} />
              {t('convert.run')}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('convert.running')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && item && (
        <ResultPanel title={t('convert.ready')}>
          <p className="muted">{t('convert.summary', { pages: t('ui.pages', { count: task.state.result.pages }), size: formatBytes(task.state.result.blob.size) })}</p>
          {task.state.result.notes.length > 0 && (
            <Notice tone="warn">
              <strong>{t('convert.notes')}</strong>
              <ul style={{ paddingInlineStart: 18, marginTop: 4 }}>
                {task.state.result.notes.map((n) => (
                  <li key={n.key}>{t(n.key, n.vars)}</li>
                ))}
              </ul>
            </Notice>
          )}
          <div className="toolbar">
            <DownloadButton blob={task.state.result.blob} name={`${baseName(item.file.name)}.pdf`} />
            <ResetButton onClick={reset} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
}
