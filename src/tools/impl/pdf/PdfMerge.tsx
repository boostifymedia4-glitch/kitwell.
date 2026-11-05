import { useEffect, useState } from 'react';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { FileList } from '@/components/tool/FileList';
import { PdfOutput, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { MB } from '@/lib/files';
import { formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { mergePdfFiles } from '@/lib/pdfOps';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 100 * MB;
/** One merge can take up to 80 files, as long as together they stay below the total limit. */
const MAX_FILES = 80;
const MAX_TOTAL_BYTES = 300 * MB;

const PdfMerge: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: ['pdf'], maxBytes: MAX_BYTES, maxFiles: MAX_FILES, maxTotalBytes: MAX_TOTAL_BYTES }, true);
  const task = useTask<{ blob: Blob; pages: number }>();
  const { reset: resetTask } = task;
  const [outName, setOutName] = useState('merged');

  useEffect(() => {
    resetTask();
  }, [queue.items, resetTask]);

  const running = task.state.status === 'running';

  const merge = () =>
    task.run(async (report) => {
      const { bytes, pages } = await mergePdfFiles(
        queue.items.map((i) => i.file),
        (done, total) => report(done, total, t('pdfMerge.merging')),
      );
      return { blob: new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), pages };
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
        title={queue.items.length ? t('pdfMerge.addMore') : t('pdfMerge.drop')}
        onFiles={queue.add}
      />
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      <FileList items={queue.items} kind="pdf" onRemove={queue.remove} onMove={queue.move} onClear={reset} disabled={running} />
      {queue.items.length === 1 && <p className="hint">{t('pdfMerge.needMore')}</p>}
      {queue.items.length > 0 && (
        <>
          <div className="field">
            <label className="label" htmlFor="merge-output-name">
              {t('pdfMerge.outputName')}
            </label>
            <div className="row" style={{ gap: 8, alignItems: 'center' }}>
              <input
                id="merge-output-name"
                className="input"
                value={outName}
                onChange={(e) => setOutName(e.target.value)}
                maxLength={120}
                spellCheck={false}
                disabled={running}
                style={{ flex: 1, minWidth: 0, maxWidth: 360 }}
              />
              <span className="muted">.pdf</span>
            </div>
          </div>
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={merge} disabled={running || queue.items.length < 2}>
              <Icon name="merge" size={18} />
              {t('pdfMerge.merge', { count: queue.items.length })}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('pdfMerge.processing')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title={t('pdfMerge.ready')}>
          <p className="muted">{t('pdfMerge.resultInfo', { pages: task.state.result.pages, size: formatBytes(task.state.result.blob.size) })}</p>
          <PdfOutput blob={task.state.result.blob} name={`${outName.trim() || 'merged'}.pdf`}>
            <ResetButton onClick={reset} />
          </PdfOutput>
        </ResultPanel>
      )}
    </div>
  );
};

export default PdfMerge;
