import { useRef, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Field, SelectField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { OutputBox, Stats } from '@/components/tool/TextIO';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage, formatBytes } from '@/lib/format';
import { addTextLayer, joinPageTexts, meanConfidence, type OcrPageResult } from '@/lib/ocr';
import { OCR_LANGUAGES, createOcrEngine, type OcrEngine } from '@/lib/ocrEngine';
import { PdfError, parsePageList } from '@/lib/pdfOps';
import { destroyPdf, openPdf, renderPageToCanvas } from '@/lib/pdfjs';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

interface Result {
  pdf: Blob;
  text: string;
  pages: number;
  skipped: number;
  words: number;
  confidence: number;
}

const DPI_OPTIONS = [
  { value: '150', label: 'pdfOcr.quality.fast' },
  { value: '200', label: 'pdfOcr.quality.recommended' },
  { value: '300', label: 'pdfOcr.quality.best' },
] as const;

const MAX_PAGES = 100;
/** Pages with at least this many characters of real text are treated as already searchable. */
const HAS_TEXT = 20;

const PdfOcr: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool<Result>();
  const [dpi, setDpi] = useState<'150' | '200' | '300'>('200');
  const [pages, setPages] = useState('');
  const [skipText, setSkipText] = useState(true);
  // Each run gets its own token, so cancelling one run can never be undone by starting the next.
  const current = useRef<{ cancelled: boolean } | null>(null);

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () => {
          const token = { cancelled: false };
          current.current = token;
          void task.run(async (report) => {
            let list = Array.from({ length: ready.pageCount }, (_, i) => i + 1);
            if (pages.trim()) {
              try {
                list = parsePageList(pages, ready.pageCount).map((i) => i + 1); // zero-based -> page numbers
              } catch (e) {
                throw new PdfError(errorMessage(e));
              }
            }
            if (list.length > MAX_PAGES) throw new PdfError(t('pdfOcr.err.tooManyPages', { max: MAX_PAGES }));

            const doc = await openPdf(ready.bytes);
            let engine: OcrEngine | null = null;
            const canvas = document.createElement('canvas');
            try {
              report(0, list.length, t('pdfOcr.progress.starting'));
              engine = await createOcrEngine((status, progress) => {
                if (/loading|initializ/i.test(status)) report(0, list.length, t('pdfOcr.progress.preparing', { percent: Math.round(progress * 100) }));
              });
              const results: OcrPageResult[] = [];
              let skipped = 0;
              for (let i = 0; i < list.length; i++) {
                if (token.cancelled) throw new PdfError(t('pdfOcr.err.cancelled'));
                const n = list[i];
                report(i, list.length, t('pdfOcr.progress.page', { page: n, index: i + 1, total: list.length }));
                if (skipText) {
                  const page = await doc.getPage(n);
                  try {
                    const content = await page.getTextContent();
                    const chars = content.items.reduce((sum, item) => sum + ('str' in item ? item.str.trim().length : 0), 0);
                    if (chars >= HAS_TEXT) {
                      skipped++;
                      continue;
                    }
                  } finally {
                    page.cleanup();
                  }
                }
                await renderPageToCanvas(doc, n, Number(dpi) / 72, canvas);
                const found = await engine.recognize(canvas);
                results.push({ page: n, width: canvas.width, height: canvas.height, words: found.words, text: found.text, confidence: found.confidence });
              }
              if (results.length === 0) throw new PdfError(t('pdfOcr.err.nothingToDo'));
              report(list.length, list.length, t('pdfOcr.progress.layer'));
              const layered = await addTextLayer(ready.bytes, results);
              if (layered.words === 0) throw new PdfError(t('pdfOcr.err.noText'));
              return {
                pdf: new Blob([layered.bytes as BlobPart], { type: 'application/pdf' }),
                text: joinPageTexts(results),
                pages: results.length,
                skipped,
                words: layered.words,
                confidence: meanConfidence(results),
              };
            } finally {
              canvas.width = canvas.height = 0;
              await engine?.terminate();
              await destroyPdf(doc);
            }
          });
        };

        const done = task.state.status === 'done' ? task.state.result : null;
        return (
          <>
            <Notice>
              <strong>{t('pdfOcr.englishOnlyTitle')}</strong> {t('pdfOcr.englishOnly')}
            </Notice>
            <div className="options-grid">
              <SelectField label={t('pdfOcr.language')} value="eng" onChange={() => undefined} options={OCR_LANGUAGES.map((l) => ({ value: l.code, label: t(`pdfOcr.lang.${l.code}`) }))} hint={t('pdfOcr.languageHint')} />
              <SelectField label={t('pdfOcr.quality')} value={dpi} onChange={setDpi} options={DPI_OPTIONS.map((o) => ({ value: o.value, label: t(o.label) }))} hint={t('pdfOcr.qualityHint')} />
              <Field label={t('pdfOcr.pages')} hint={t('pdfOcr.pagesHint', { count: ready.pageCount })}>
                {(id) => <input id={id} className="input mono" value={pages} placeholder={t('pdfOcr.allPages')} disabled={running} onChange={(e) => setPages(e.target.value)} />}
              </Field>
            </div>
            <CheckField label={t('pdfOcr.skipText')} checked={skipText} onChange={setSkipText} disabled={running} />
            <p className="hint">{t('pdfOcr.hint')}</p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="scan-text" size={18} />
                {t('pdfOcr.recognise')}
              </button>
              {running && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    if (current.current) current.current.cancelled = true;
                    task.reset();
                  }}
                >
                  {t('pdfOcr.cancel')}
                </button>
              )}
            </div>
            {running && <ProcessingState label={t('pdfOcr.recognising')} progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {done && (
              <ResultPanel title={t('pdfOcr.ready')}>
                <Stats
                  items={[
                    { label: t('pdfOcr.stat.recognised'), value: done.pages },
                    { label: t('pdfOcr.stat.skipped'), value: done.skipped },
                    { label: t('pdfOcr.stat.words'), value: done.words },
                    { label: t('pdfOcr.stat.confidence'), value: `${done.confidence}%` },
                  ]}
                />
                <p className="muted">
                  {formatBytes(done.pdf.size)} · {t('pdfOcr.resultNote')}
                </p>
                <div className="toolbar">
                  <DownloadButton blob={done.pdf} name={`${baseName(ready.file.name)}-ocr.pdf`} label={t('pdfOcr.download')} />
                  <ResetButton onClick={reset} />
                </div>
                <OutputBox label={t('pdfOcr.output')} value={done.text} rows={10} filename={`${baseName(ready.file.name)}-ocr.txt`} />
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfOcr;
