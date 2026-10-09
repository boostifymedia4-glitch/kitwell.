import { useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, formatBytes } from '@/lib/format';
import { browserJpegEncoder } from '@/lib/jpegRecompress';
import { LEVELS, compressPdfImages, savedPercent, type CompressLevel, type CompressReport } from '@/lib/pdfCompress';
import { pdfFromPageImages, renderPageAsJpeg, type RenderedPage } from '@/lib/pdfFlatten';
import { PdfError } from '@/lib/pdfOps';
import { destroyPdf, openPdf } from '@/lib/pdfjs';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

type Mode = 'images' | 'flatten';

interface Result {
  blob: Blob;
  originalSize: number;
  mode: Mode;
  report?: CompressReport;
  pages?: number;
}

const MAX_FLATTEN_PAGES = 300;

const PdfCompress: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool<Result>();
  const [mode, setMode] = useState<Mode>('images');
  const [level, setLevel] = useState<CompressLevel>('recommended');

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async (report) => {
            if (mode === 'images') {
              const { bytes, report: stats } = await compressPdfImages(ready.bytes, level, browserJpegEncoder, (done, total) => report(done, total, t('pdfCompress.progress.images', { done, total })));
              return { blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), originalSize: ready.bytes.length, mode, report: stats };
            }
            if (ready.pageCount > MAX_FLATTEN_PAGES) throw new PdfError(t('pdfCompress.err.tooManyPages', { max: MAX_FLATTEN_PAGES }));
            const doc = await openPdf(ready.bytes);
            try {
              const settings = LEVELS[level];
              const pages: RenderedPage[] = [];
              for (let n = 1; n <= ready.pageCount; n++) {
                report(n - 1, ready.pageCount, t('pdfCompress.progress.page', { n, total: ready.pageCount }));
                pages.push(await renderPageAsJpeg(doc, n, settings.dpi, settings.quality));
                await new Promise((r) => setTimeout(r, 0));
              }
              report(ready.pageCount, ready.pageCount, t('pdfCompress.progress.build'));
              const bytes = await pdfFromPageImages(pages);
              return { blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), originalSize: ready.bytes.length, mode, pages: ready.pageCount };
            } finally {
              await destroyPdf(doc);
            }
          });

        const done = task.state.status === 'done' ? task.state.result : null;
        const saved = done ? savedPercent(done.originalSize, done.blob.size) : 0;
        const name = `${baseName(ready.file.name)}-compressed.pdf`;

        return (
          <>
            <Segmented
              label={t('pdfCompress.mode')}
              value={mode}
              onChange={setMode}
              options={[
                { value: 'images', label: t('pdfCompress.mode.images') },
                { value: 'flatten', label: t('pdfCompress.mode.flatten') },
              ]}
            />
            {mode === 'images' ? (
              <Notice>{t('pdfCompress.notice.images')}</Notice>
            ) : (
              <Notice tone="warn">
                <strong>{t('pdfCompress.notice.flattenTitle')}</strong> {t('pdfCompress.notice.flatten')}
              </Notice>
            )}
            <Segmented label={t('pdfCompress.strength')} value={level} onChange={setLevel} options={(Object.keys(LEVELS) as CompressLevel[]).map((k) => ({ value: k, label: t(`pdfCompress.level.${k}.label`) }))} />
            <p className="hint">
              {mode === 'flatten'
                ? t('pdfCompress.hint.flatten', { summary: t(`pdfCompress.level.${level}.summary`), dpi: LEVELS[level].dpi })
                : t('pdfCompress.hint.images', { summary: t(`pdfCompress.level.${level}.summary`), maxSide: LEVELS[level].maxSide, quality: Math.round(LEVELS[level].quality * 100) })}
            </p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="file-archive" size={18} />
                {t('pdfCompress.compress')}
              </button>
            </div>
            {running && <ProcessingState label={t('pdfCompress.compressing')} progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {done && (
              <ResultPanel title={saved > 0 ? t('pdfCompress.result.smaller') : t('pdfCompress.result.notSmaller')}>
                <p>
                  <strong>{formatBytes(done.originalSize)}</strong> → <strong>{formatBytes(done.blob.size)}</strong>
                  {' '}
                  {saved > 0 ? t('pdfCompress.result.percentSmaller', { percent: saved }) : saved < 0 ? t('pdfCompress.result.percentLarger', { percent: Math.abs(saved) }) : t('pdfCompress.result.noChange')}
                </p>
                {done.report && (
                  <p className="muted">
                    {done.report.imagesFound === 0
                      ? t('pdfCompress.result.noImages')
                      : t('pdfCompress.result.recompressed', { recompressed: done.report.imagesRecompressed, found: done.report.imagesFound })}
                    {done.report.imagesSkipped > 0 ? ` ${t('pdfCompress.result.skipped', { count: done.report.imagesSkipped })}` : ''}
                  </p>
                )}
                {done.mode === 'flatten' && <p className="muted">{t('pdfCompress.result.flattened', { count: done.pages ?? 0 })}</p>}
                {saved <= 0 && (
                  <Notice tone="warn">
                    {done.mode === 'images'
                      ? t('pdfCompress.result.alreadyOptimised')
                      : t('pdfCompress.result.pictureLarger')}
                  </Notice>
                )}
                <div className="toolbar">
                  <DownloadButton blob={done.blob} name={name} label={saved > 0 ? t('pdfCompress.download', { name }) : t('pdfCompress.downloadAnyway')} variant={saved > 0 ? 'primary' : 'secondary'} />
                  <ResetButton onClick={reset} />
                </div>
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfCompress;
