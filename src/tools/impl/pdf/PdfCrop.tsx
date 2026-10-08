import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { CropSelector } from '@/components/tool/CropSelector';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { Field, NumberField, Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { areaToMargins, initialRect, marginsToArea, type Margins, type Rect } from '@/lib/cropRect';
import { baseName, errorMessage } from '@/lib/format';
import { cropPdf } from '@/lib/pdfEdit';
import { PdfError, parsePageList } from '@/lib/pdfOps';
import { destroyPdf, openPdf, renderPageToCanvas } from '@/lib/pdfjs';
import { useTask } from '@/lib/hooks';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const PREVIEW_PX = 760;

/** Page preview with a crop box. The crop area is kept as fractions of the page so it survives switching pages. */
function Cropper({ bytes, name, pageCount, onReset }: { bytes: Uint8Array; name: string; pageCount: number; onReset: () => void }) {
  const task = useTask<Blob>();
  const running = task.state.status === 'running';
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState<number | ''>(1);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [area, setArea] = useState<Rect>(() => initialRect(1, 1));
  const [scope, setScope] = useState<'all' | 'some'>('all');
  const [pages, setPages] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let opened: PDFDocumentProxy | null = null;
    openPdf(bytes)
      .then((d) => {
        if (cancelled) return destroyPdf(d);
        opened = d;
        setDoc(d);
      })
      .catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
      if (opened) void destroyPdf(opened);
    };
  }, [bytes]);

  const shown = Math.min(pageCount, Math.max(1, Number(previewPage) || 1));
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;
    let cancelled = false;
    (async () => {
      const page = await doc.getPage(shown);
      const base = page.getViewport({ scale: 1 });
      page.cleanup();
      await renderPageToCanvas(doc, shown, PREVIEW_PX / base.width, canvas);
      if (!cancelled) setSize({ w: canvas.width, h: canvas.height });
    })().catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [doc, shown]);

  const px: Rect | null = size ? { x: area.x * size.w, y: area.y * size.h, w: area.w * size.w, h: area.h * size.h } : null;
  const margins = areaToMargins(area);
  const setMargin = (key: keyof Margins, value: number | '') => {
    if (value === '') return;
    const next = marginsToArea({ ...margins, [key]: value });
    if (next) setArea(next);
  };

  const run = () =>
    task.run(async () => {
      let list: number[] | undefined;
      if (scope === 'some') {
        try {
          list = parsePageList(pages, pageCount);
        } catch (e) {
          throw new PdfError(errorMessage(e));
        }
      }
      const out = await cropPdf(bytes, { x: area.x, y: area.y, width: area.w, height: area.h }, list);
      return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
    });

  if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;

  return (
    <div className="stack">
      <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
        <CropSelector width={size?.w ?? 1} height={size?.h ?? 1} rect={px ?? { x: 0, y: 0, w: 0, h: 0 }} ratio={null} label="Crop area" hidden={!size}
          onChange={(r) => size && setArea({ x: r.x / size.w, y: r.y / size.h, w: r.w / size.w, h: r.h / size.h })}>
          <canvas ref={canvasRef} role="img" aria-label={`Preview of page ${shown} with the crop area`} />
        </CropSelector>
      </div>
      {!size && <ProcessingState label="Rendering preview…" />}
      <p className="hint">Drag the box to move it, drag the corner to resize it, or type the margins below. The part outside the box is hidden in the result.</p>
      <div className="options-grid">
        <NumberField label={`Preview page (1–${pageCount})`} value={previewPage} min={1} max={pageCount} onChange={setPreviewPage} />
        <NumberField label="Left margin (%)" value={margins.left} min={0} max={98} step={0.5} onChange={(v) => setMargin('left', v)} />
        <NumberField label="Top margin (%)" value={margins.top} min={0} max={98} step={0.5} onChange={(v) => setMargin('top', v)} />
        <NumberField label="Right margin (%)" value={margins.right} min={0} max={98} step={0.5} onChange={(v) => setMargin('right', v)} />
        <NumberField label="Bottom margin (%)" value={margins.bottom} min={0} max={98} step={0.5} onChange={(v) => setMargin('bottom', v)} />
      </div>
      <div className="options-grid">
        <Segmented
          label="Apply to"
          value={scope}
          onChange={setScope}
          options={[
            { value: 'all', label: 'All pages' },
            { value: 'some', label: 'Selected pages' },
          ]}
        />
        {scope === 'some' && (
          <Field label="Pages" hint="For example 1-3, 5">
            {(id) => <input id={id} className="input mono" value={pages} placeholder={`1-${pageCount}`} onChange={(e) => setPages(e.target.value)} />}
          </Field>
        )}
      </div>
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running || !size || (scope === 'some' && !pages.trim())}>
          <Icon name="crop" size={18} />
          Crop PDF
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setArea(initialRect(1, 1))} disabled={running}>
          Reset crop box
        </button>
      </div>
      {running && <ProcessingState label="Cropping…" />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <PdfResult blob={task.state.result} name={`${baseName(name)}-cropped.pdf`} onReset={onReset} note="Content outside the crop is hidden, not deleted." />
      )}
    </div>
  );
}

const PdfCrop: ToolImplementation = () => {
  const { pdf } = usePdfTool();
  return (
    <PdfSource pdf={pdf}>
      {(ready) => (
        <Cropper key={`${ready.file.name}-${ready.file.size}-${ready.file.lastModified}`} bytes={ready.bytes} name={ready.file.name} pageCount={ready.pageCount} onReset={pdf.reset} />
      )}
    </PdfSource>
  );
};

export default PdfCrop;
