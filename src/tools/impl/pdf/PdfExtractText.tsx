import { useState } from 'react';
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
import type { ToolImplementation } from '../../types';

const PdfExtractText: ToolImplementation = () => {
  const { pdf, task, reset, running } = usePdfTool<ExtractResult>();
  const [pages, setPages] = useState('');
  const [markers, setMarkers] = useState(true);

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
              return await extractPdfText(doc, list, { pageMarkers: markers, onProgress: (d, t) => report(d, t, 'Reading text') });
            } finally {
              await destroyPdf(doc);
            }
          });

        const result = task.state.status === 'done' ? task.state.result : null;
        return (
          <>
            <div className="options-grid">
              <Field label="Pages (optional)" hint={`Empty means all ${ready.pageCount} pages. Or enter e.g. 1-3, 5.`}>
                {(id) => <input id={id} className="input mono" value={pages} placeholder="All pages" onChange={(e) => setPages(e.target.value)} />}
              </Field>
              <CheckField label="Mark where each page starts" checked={markers} onChange={setMarkers} />
            </div>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="file-text" size={18} />
                Extract text
              </button>
            </div>
            {running && <ProcessingState label="Reading text…" progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {result && (
              <div className="stack">
                {result.pagesWithText === 0 ? (
                  <Notice tone="warn">
                    No selectable text was found. This PDF is probably a scan (a picture of text). Reading it would need OCR, which this tool does not do.
                  </Notice>
                ) : (
                  <Stats items={[{ label: 'Pages with text', value: result.pagesWithText }, { label: 'Characters', value: result.characters }]} />
                )}
                {result.text && <OutputBox label="Extracted text" value={result.text} rows={14} prose filename={`${baseName(ready.file.name)}.txt`} />}
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
