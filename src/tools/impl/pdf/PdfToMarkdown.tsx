import { useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { ResetButton } from '@/components/tool/Results';
import { OutputBox, Stats } from '@/components/tool/TextIO';
import { Icon } from '@/components/Icon';
import { baseName } from '@/lib/format';
import { destroyPdf, openPdf } from '@/lib/pdfjs';
import { pdfToMarkdown, type MarkdownResult } from '@/lib/pdfMarkdown';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const PdfToMarkdown: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool<MarkdownResult>();
  const [removeRepeated, setRemoveRepeated] = useState(true);
  const [separators, setSeparators] = useState(false);

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async (report) => {
            const doc = await openPdf(ready.bytes);
            try {
              return await pdfToMarkdown(doc, { removeRepeated, pageSeparators: separators }, (d, total) => report(d, total, t('pdfToMarkdown.reading')));
            } finally {
              await destroyPdf(doc);
            }
          });
        const result = task.state.status === 'done' ? task.state.result : null;
        return (
          <>
            <div className="options-grid">
              <CheckField label={t('pdfToMarkdown.removeRepeated')} checked={removeRepeated} onChange={setRemoveRepeated} />
              <CheckField label={t('pdfToMarkdown.separators')} checked={separators} onChange={setSeparators} />
            </div>
            <p className="hint">{t('pdfToMarkdown.hint')}</p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running} aria-busy={running}>
                <Icon name="file-text" size={18} />
                {t('pdfToMarkdown.convert')}
              </button>
            </div>
            {running && <ProcessingState label={t('pdfToMarkdown.reading')} progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {result && (
              <div className="stack">
                {result.markdown === '' ? (
                  <Notice tone="warn">{t('pdfToMarkdown.noText')}</Notice>
                ) : (
                  <>
                    <Stats
                      items={[
                        { label: t('pdfExtractText.pagesWithText'), value: result.pagesWithText },
                        { label: t('pdfToMarkdown.headings'), value: result.headings },
                        { label: t('pdfToMarkdown.listItems'), value: result.listItems },
                        ...(result.removedRepeated ? [{ label: t('pdfToMarkdown.removed'), value: result.removedRepeated }] : []),
                      ]}
                    />
                    <OutputBox label={t('pdfToMarkdown.output')} value={result.markdown} rows={16} filename={`${baseName(ready.file.name)}.md`} mime="text/markdown" />
                  </>
                )}
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

export default PdfToMarkdown;
