import { useEffect, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { SelectField, Segmented } from '@/components/tool/Fields';
import { FileList } from '@/components/tool/FileList';
import { PdfOutput, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { baseName, formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import type { PdfAAnalysis, PdfAResult } from '@/lib/pdfA';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 100 * 1024 * 1024;
type Mode = 'keep' | 'flatten';
type Outcome = { kind: 'done'; blob: Blob; result: PdfAResult } | { kind: 'blocked'; analysis: PdfAAnalysis };

const PdfToPdfA: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: ['pdf'], maxBytes: MAX_BYTES, maxFiles: 1 }, false);
  const task = useTask<Outcome>();
  const { reset: resetTask } = task;
  const [mode, setMode] = useState<Mode>('keep');
  const [dpi, setDpi] = useState('200');
  const item = queue.items[0];
  useEffect(() => {
    resetTask();
  }, [item, resetTask]);
  const running = task.state.status === 'running';

  const run = (chosen: Mode) =>
    task.run(async (report): Promise<Outcome> => {
      if (!item) throw new Error(t('err.files.empty'));
      report(0, 1, t('convert.reading', { name: item.file.name }));
      const lib = await import('@/lib/pdfA');
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      const fallbackTitle = baseName(item.file.name);
      if (chosen === 'keep') {
        report(0, 1, t('pdfa.converting'));
        try {
          const { result } = await lib.convertKeepingContent(bytes, fallbackTitle);
          return { kind: 'done', blob: new Blob([result.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), result };
        } catch (err) {
          if (err instanceof lib.PdfABlocked) return { kind: 'blocked', analysis: err.analysis };
          throw err;
        }
      }
      const { openPdf, destroyPdf } = await import('@/lib/pdfjs');
      const { renderPageAsJpeg } = await import('@/lib/pdfFlatten');
      const doc = await openPdf(bytes);
      try {
        if (doc.numPages > lib.MAX_FLATTEN_PAGES) throw new Error(t('err.pdfa.tooManyPages', { max: lib.MAX_FLATTEN_PAGES }));
        const pages = [];
        for (let i = 1; i <= doc.numPages; i++) {
          report(i - 1, doc.numPages, t('pdfa.rendering', { number: i, total: doc.numPages }));
          pages.push(await renderPageAsJpeg(doc, i, Number(dpi), 0.9));
        }
        report(doc.numPages, doc.numPages, t('pdfa.converting'));
        const original = await lib.readOriginalInfo(bytes);
        const result = await lib.buildFlattenedPdfA(pages, { ...original, fallbackTitle });
        result.actions.unshift(t('pdfa.fix.flatten', { pages: pages.length, dpi }));
        return { kind: 'done', blob: new Blob([result.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), result };
      } finally {
        await destroyPdf(doc);
      }
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  const outcome = task.state.status === 'done' ? task.state.result : null;
  return (
    <div className="stack">
      {!item && <UploadDropzone extensions={['pdf']} maxBytes={MAX_BYTES} onFiles={queue.add} title={t('pdfa.drop')} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {item && (
        <>
          <FileList items={queue.items} kind="pdf" onRemove={queue.remove} disabled={running} />
          <p className="hint">{t('pdfa.hint')}</p>
          <Segmented
            label={t('pdfa.mode')}
            value={mode}
            options={[
              { value: 'keep', label: t('pdfa.mode.keep') },
              { value: 'flatten', label: t('pdfa.mode.flatten') },
            ]}
            onChange={setMode}
          />
          <p className="hint">{t(mode === 'keep' ? 'pdfa.modeHint.keep' : 'pdfa.modeHint.flatten')}</p>
          {mode === 'flatten' && (
            <SelectField
              label={t('pdfa.dpi')}
              value={dpi}
              options={['150', '200', '300'].map((v) => ({ value: v, label: t('pdfa.dpiOption', { dpi: v }) }))}
              onChange={setDpi}
            />
          )}
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => run(mode)} disabled={running} aria-busy={running}>
              <Icon name="check" size={18} />
              {t('pdfa.convert')}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('pdfa.converting')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {outcome?.kind === 'blocked' && (
        <ResultPanel title={t('pdfa.blockedTitle')}>
          <p>{t('pdfa.blockedIntro')}</p>
          <ul style={{ paddingInlineStart: 18 }}>
            {outcome.analysis.blockers.map((b, i) => (
              <li key={i}>{t(b.key, b.params)}</li>
            ))}
          </ul>
          <Notice tone="info">{t('pdfa.blockedHint')}</Notice>
          <div className="toolbar">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setMode('flatten');
                run('flatten');
              }}
            >
              {t('pdfa.useFlatten')}
            </button>
            <ResetButton onClick={reset} />
          </div>
        </ResultPanel>
      )}
      {outcome?.kind === 'done' && item && (
        <ResultPanel title={t('pdfa.readyTitle')}>
          <p className="muted">{t('convert.summary', { pages: outcome.result.pages, size: formatBytes(outcome.blob.size) })}</p>
          <div>
            <strong>{t('pdfa.changes')}</strong>
            <ul style={{ paddingInlineStart: 18, marginTop: 4 }}>
              {outcome.result.actions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
          <Notice tone="success">{t('pdfa.selfcheck')}</Notice>
          <Notice tone="warn">{t('pdfa.notValidated')}</Notice>
          <PdfOutput blob={outcome.blob} name={`${baseName(item.file.name)}-pdfa.pdf`}>
<ResetButton onClick={reset} />
</PdfOutput>
        </ResultPanel>
      )}
    </div>
  );
};

export default PdfToPdfA;
