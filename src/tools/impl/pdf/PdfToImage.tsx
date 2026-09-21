import { useState } from 'react';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { Field, RangeField, SelectField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { ResetButton, ResultFiles, ResultPanel, type ResultFile } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { parsePageList } from '@/lib/pdfOps';
import { canvasToBlob, destroyPdf, openPdf, renderPageToCanvas } from '@/lib/pdfjs';
import { usePdfFile } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const MAX_PAGES = 300;

const PdfToImage: ToolImplementation = ({ tool }) => {
  const asJpeg = tool.config?.format === 'jpeg';
  const ext = asJpeg ? 'jpg' : 'png';
  const pdf = usePdfFile();
  const task = useTask<ResultFile[]>();
  const [dpi, setDpi] = useState('150');
  const [pages, setPages] = useState('');
  const [quality, setQuality] = useState(90);
  const running = task.state.status === 'running';

  const reset = () => {
    pdf.reset();
    task.reset();
    setPages('');
  };

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const convert = () =>
          task.run(async (report) => {
            const indexes = pages.trim() ? parsePageList(pages, ready.pageCount) : Array.from({ length: ready.pageCount }, (_, i) => i);
            if (indexes.length > MAX_PAGES) throw new Error(`Please convert at most ${MAX_PAGES} pages at a time. Use the page range field.`);
            const doc = await openPdf(ready.bytes);
            const canvas = document.createElement('canvas');
            const base = baseName(ready.file.name);
            const pad = String(ready.pageCount).length;
            const out: ResultFile[] = [];
            try {
              for (let i = 0; i < indexes.length; i++) {
                const n = indexes[i] + 1;
                report(i, indexes.length, `Rendering page ${n}`);
                await renderPageToCanvas(doc, n, Number(dpi) / 72, canvas);
                const blob = await canvasToBlob(canvas, asJpeg ? 'image/jpeg' : 'image/png', asJpeg ? quality / 100 : undefined);
                out.push({ name: `${base}-page-${String(n).padStart(pad, '0')}.${ext}`, blob, note: `${canvas.width} × ${canvas.height} px` });
              }
            } finally {
              canvas.width = canvas.height = 0;
              await destroyPdf(doc);
            }
            report(indexes.length, indexes.length);
            return out;
          });

        return (
          <>
            <div className="options-grid">
              <SelectField
                label="Resolution"
                value={dpi}
                onChange={setDpi}
                options={[
                  { value: '72', label: '72 DPI (small, screen)' },
                  { value: '150', label: '150 DPI (recommended)' },
                  { value: '200', label: '200 DPI' },
                  { value: '300', label: '300 DPI (print)' },
                ]}
              />
              <Field label="Pages (optional)" hint={`Leave empty for all ${ready.pageCount} pages, or enter e.g. 1-3, 5.`}>
                {(id) => <input id={id} className="input mono" value={pages} placeholder="All pages" onChange={(e) => setPages(e.target.value)} />}
              </Field>
              {asJpeg && <RangeField label="JPG quality" value={quality} min={40} max={100} onChange={setQuality} format={(v) => `${v}%`} />}
            </div>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={convert} disabled={running}>
                <Icon name="file-image" size={18} />
                Convert to {ext.toUpperCase()}
              </button>
            </div>
            {running && (
              <>
                <ProcessingState label="Rendering pages…" progress={task.progress} />
                <p className="hint">Keep this tab open and visible until it finishes; browsers slow down background tabs.</p>
              </>
            )}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && (
              <ResultPanel title={`Created ${task.state.result.length} ${task.state.result.length === 1 ? 'image' : 'images'}`}>
                <ResultFiles files={task.state.result} zipName={`${baseName(ready.file.name)}-${ext}.zip`} />
                <ResetButton onClick={reset} />
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfToImage;
