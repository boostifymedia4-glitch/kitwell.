import { useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfOutput, ResetButton, ResultPanel } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, formatBytes } from '@/lib/format';
import { browserJpegEncoder } from '@/lib/jpegRecompress';
import { LEVELS, compressPdfImages, savedPercent, type CompressLevel, type CompressReport } from '@/lib/pdfCompress';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

interface Result {
  blob: Blob;
  originalSize: number;
  /** True when no smaller file could be made and the original is returned unchanged. */
  kept: boolean;
  report: CompressReport;
}

const PdfCompress: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool<Result>();
  const [level, setLevel] = useState<CompressLevel>('recommended');

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async (report) => {
            const { bytes, report: stats } = await compressPdfImages(ready.bytes, level, browserJpegEncoder, (done, total) => report(done, total, t('pdfCompress.progress.images', { done, total })));
            const smaller = bytes.length < ready.bytes.length;
            return { blob: smaller ? new Blob([bytes as BlobPart], { type: 'application/pdf' }) : new Blob([ready.bytes as BlobPart], { type: 'application/pdf' }), originalSize: ready.bytes.length, kept: !smaller, report: stats };
          });

        const done = task.state.status === 'done' ? task.state.result : null;
        const saved = done && !done.kept ? savedPercent(done.originalSize, done.blob.size) : 0;
        const name = done?.kept ? ready.file.name : `${baseName(ready.file.name)}-compressed.pdf`;

        return (
          <>
            <Notice>{t('pdfCompress.notice.images')}</Notice>
            <Segmented label={t('pdfCompress.strength')} value={level} onChange={setLevel} options={(Object.keys(LEVELS) as CompressLevel[]).map((k) => ({ value: k, label: t(`pdfCompress.level.${k}.label`) }))} />
            <p className="hint">{t('pdfCompress.hint.images', { summary: t(`pdfCompress.level.${level}.summary`), maxSide: LEVELS[level].maxSide, quality: Math.round(LEVELS[level].quality * 100) })}</p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="file-archive" size={18} />
                {t('pdfCompress.compress')}
              </button>
            </div>
            {running && <ProcessingState label={t('pdfCompress.compressing')} progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {done && (
              <ResultPanel title={done.kept ? t('pdfCompress.result.notSmaller') : t('pdfCompress.result.smaller')}>
                <p>
                  <strong>{formatBytes(done.originalSize)}</strong>
                  {done.kept ? '' : <> → <strong>{formatBytes(done.blob.size)}</strong> {t('pdfCompress.result.percentSmaller', { percent: saved })}</>}
                </p>
                <p className="muted">
                  {done.report.imagesFound === 0
                    ? t('pdfCompress.result.noImages')
                    : t('pdfCompress.result.recompressed', { recompressed: done.report.imagesRecompressed, found: done.report.imagesFound })}
                  {done.report.imagesSkipped > 0 ? ` ${t('pdfCompress.result.skipped', { count: done.report.imagesSkipped })}` : ''}
                </p>
                {done.kept && <Notice tone="warn">{t('pdfCompress.result.alreadyOptimised')}</Notice>}
                <PdfOutput blob={done.blob} name={name} label={(n) => (done.kept ? t('pdfCompress.downloadOriginal', { name: n }) : t('pdfCompress.download', { name: n }))}>
                  <ResetButton onClick={reset} />
                </PdfOutput>
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfCompress;
