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
  { value: '150', label: 'Fast (150 DPI)' },
  { value: '200', label: 'Recommended (200 DPI)' },
  { value: '300', label: 'Best for small print (300 DPI)' },
] as const;

const MAX_PAGES = 100;
/** Pages with at least this many characters of real text are treated as already searchable. */
const HAS_TEXT = 20;

const PdfOcr: ToolImplementation = () => {
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
            if (list.length > MAX_PAGES) throw new PdfError(`OCR handles up to ${MAX_PAGES} pages at a time. Choose a page range or split the PDF first.`);

            const doc = await openPdf(ready.bytes);
            let engine: OcrEngine | null = null;
            const canvas = document.createElement('canvas');
            try {
              report(0, list.length, 'Starting the OCR engine…');
              engine = await createOcrEngine((status, progress) => {
                if (/loading|initializ/i.test(status)) report(0, list.length, `Preparing the OCR engine… ${Math.round(progress * 100)}%`);
              });
              const results: OcrPageResult[] = [];
              let skipped = 0;
              for (let i = 0; i < list.length; i++) {
                if (token.cancelled) throw new PdfError('OCR was cancelled.');
                const n = list[i];
                report(i, list.length, `Recognising page ${n} (${i + 1} of ${list.length})`);
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
              if (results.length === 0) throw new PdfError('Every selected page already has selectable text, so there was nothing to recognise. Turn off “Skip pages that already have selectable text” to run OCR anyway.');
              report(list.length, list.length, 'Adding the text layer…');
              const layered = await addTextLayer(ready.bytes, results);
              if (layered.words === 0) throw new PdfError('No text could be recognised. The scan may be too blurry, too small, or not in English.');
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
              <strong>English only.</strong> Text in other languages and handwriting will not be recognised reliably. The OCR engine runs inside your browser; nothing is uploaded.
            </Notice>
            <div className="options-grid">
              <SelectField label="Language" value="eng" onChange={() => undefined} options={OCR_LANGUAGES.map((l) => ({ value: l.code, label: l.label }))} hint="More languages may be added later." />
              <SelectField label="Quality" value={dpi} onChange={setDpi} options={[...DPI_OPTIONS]} hint="Higher DPI reads smaller print but is slower." />
              <Field label="Pages (optional)" hint={`Empty means all ${ready.pageCount} pages. Or enter e.g. 1-3, 5.`}>
                {(id) => <input id={id} className="input mono" value={pages} placeholder="All pages" disabled={running} onChange={(e) => setPages(e.target.value)} />}
              </Field>
            </div>
            <CheckField label="Skip pages that already have selectable text" checked={skipText} onChange={setSkipText} disabled={running} />
            <p className="hint">OCR takes several seconds per page. The first run loads the engine (about 3 MB from this site).</p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="scan-text" size={18} />
                Recognise text
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
                  Cancel
                </button>
              )}
            </div>
            {running && <ProcessingState label="Recognising text…" progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {done && (
              <ResultPanel title="Your searchable PDF is ready">
                <Stats
                  items={[
                    { label: 'Pages recognised', value: done.pages },
                    { label: 'Pages skipped', value: done.skipped },
                    { label: 'Words found', value: done.words },
                    { label: 'Average confidence', value: `${done.confidence}%` },
                  ]}
                />
                <p className="muted">
                  {formatBytes(done.pdf.size)} · The pages look exactly as before; an invisible text layer makes them searchable and copyable. Check important numbers against the original.
                </p>
                <div className="toolbar">
                  <DownloadButton blob={done.pdf} name={`${baseName(ready.file.name)}-ocr.pdf`} label="Download searchable PDF" />
                  <ResetButton onClick={reset} />
                </div>
                <OutputBox label="Recognised text" value={done.text} rows={10} filename={`${baseName(ready.file.name)}-ocr.txt`} />
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfOcr;
