import { useEffect } from 'react';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { FileList } from '@/components/tool/FileList';
import { PdfOutput, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { baseName, formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import type { RepairResult } from '@/lib/pdfRepair';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 100 * 1024 * 1024;

/** Counts the pages PDF.js can open in the repaired file: an independent check that the result is really usable. */
async function readablePages(bytes: Uint8Array): Promise<number> {
  const { openPdf, destroyPdf } = await import('@/lib/pdfjs');
  let doc;
  try {
    doc = await openPdf(bytes);
  } catch {
    return 0;
  }
  try {
    let ok = 0;
    for (let i = 1; i <= doc.numPages; i++) {
      try {
        await doc.getPage(i);
        ok++;
      } catch {
        /* a page that cannot be opened is not counted */
      }
    }
    return ok;
  } finally {
    await destroyPdf(doc);
  }
}

const RepairPdf: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: ['pdf'], maxBytes: MAX_BYTES, maxFiles: 1 }, false);
  const task = useTask<{ blob: Blob; result: RepairResult }>();
  const { reset: resetTask } = task;
  const item = queue.items[0];
  useEffect(() => {
    resetTask();
  }, [item, resetTask]);
  const running = task.state.status === 'running';

  const run = () =>
    task.run(async (report) => {
      if (!item) throw new Error(t('err.files.empty'));
      report(0, 1, t('convert.reading', { name: item.file.name }));
      const { repairPdf } = await import('@/lib/pdfRepair');
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      report(0, 1, t('repairPdf.repairing'));
      const result = await repairPdf(bytes, readablePages);
      return { blob: new Blob([result.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), result };
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  const done = task.state.status === 'done' ? task.state.result : null;
  return (
    <div className="stack">
      {!item && <UploadDropzone extensions={['pdf']} maxBytes={MAX_BYTES} onFiles={queue.add} title={t('repairPdf.drop')} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {item && (
        <>
          <FileList items={queue.items} kind="pdf" onRemove={queue.remove} disabled={running} />
          <p className="hint">{t('repairPdf.hint')}</p>
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running} aria-busy={running}>
              <Icon name="rotate-ccw" size={18} />
              {t('repairPdf.repair')}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('repairPdf.repairing')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {done && item && (
        <ResultPanel title={done.result.status === 'clean' ? t('repairPdf.cleanTitle') : t('repairPdf.readyTitle')}>
          {done.result.status === 'clean' && <Notice tone="info">{t('repairPdf.cleanText')}</Notice>}
          <p className="muted">
            {t('repairPdf.pages')}: {done.result.pages} · {formatBytes(done.blob.size)}
          </p>
          <div>
            <strong>{t('repairPdf.done')}</strong>
            <ul style={{ paddingInlineStart: 18, marginTop: 4 }}>
              {done.result.actions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
          <PdfOutput blob={done.blob} name={`${baseName(item.file.name)}-repaired.pdf`}>
<ResetButton onClick={reset} />
</PdfOutput>
        </ResultPanel>
      )}
    </div>
  );
};

export default RepairPdf;
