import { useEffect, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Field } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { ResetButton } from '@/components/tool/Results';
import { OutputBox, Stats } from '@/components/tool/TextIO';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage } from '@/lib/format';
import { PdfError, parsePageList } from '@/lib/pdfOps';
import { destroyPdf, openPdf } from '@/lib/pdfjs';
import { extractPdfText, type ExtractResult } from '@/lib/pdfText';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const PdfExtractText: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool<ExtractResult>();
  const [pages, setPages] = useState('');
  const [markers, setMarkers] = useState(true);

  // A page range typed for one PDF makes no sense for the next one.
  const current = pdf.state.status === 'ready' ? pdf.state.file : null;
  useEffect(() => setPages(''), [current]);

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async (report) => {
            let list = Array.from({ length: ready.pageCount }, (_, i) => i + 1);
            if (pages.trim()) {
              try {
                list = parsePageList(pages, ready.pageCount).map((i) => i + 1);
              } catch (e) {
                throw new PdfError(errorMessage(e));
              }
            }
            const doc = await openPdf(ready.bytes);
            try {
              return await extractPdfText(doc, list, { pageMarkers: markers, onProgress: (d, total) => report(d, total, t('pdfExtractText.progress')) });
            } finally {
              await destroyPdf(doc);
            }
          });

        const result = task.state.status === 'done' ? task.state.result : null;
        return (
          <>
            <div className="options-grid">
              <Field label={t('pdfExtractText.pages')} hint={t('pdfExtractText.pagesHint', { count: ready.pageCount })}>
                {(id) => <input id={id} className="input mono" value={pages} placeholder={t('pdfExtractText.allPages')} onChange={(e) => setPages(e.target.value)} />}
              </Field>
              <CheckField label={t('pdfExtractText.markers')} checked={markers} onChange={setMarkers} />
            </div>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="file-text" size={18} />
                {t('pdfExtractText.extract')}
              </button>
            </div>
            {running && <ProcessingState label={t('pdfExtractText.reading')} progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {result && (
              <div className="stack">
                {result.pagesWithText === 0 ? (
                  <Notice tone="warn">
                    {t('pdfExtractText.noText')}
                  </Notice>
                ) : (
                  <Stats items={[{ label: t('pdfExtractText.pagesWithText'), value: result.pagesWithText }, { label: t('pdfExtractText.characters'), value: result.characters }]} />
                )}
                {result.text && <OutputBox label={t('pdfExtractText.output')} value={result.text} rows={14} prose filename={`${baseName(ready.file.name)}.txt`} />}
                <div className="toolbar">
                  <ResetButton onClick={reset} />
                </div>
              </div>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfExtractText;
