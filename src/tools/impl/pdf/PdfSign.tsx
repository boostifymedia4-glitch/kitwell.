import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { CropSelector } from '@/components/tool/CropSelector';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { Field, NumberField, Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { SignatureMaker, type SignatureImage } from '@/components/tool/SignatureMaker';
import { Icon } from '@/components/Icon';
import type { Rect } from '@/lib/cropRect';
import { baseName, errorMessage } from '@/lib/format';
import { useObjectUrl, useTask } from '@/lib/hooks';
import { PdfError, parsePageList } from '@/lib/pdfOps';
import { defaultSignatureBox, signPdf, type SignaturePlacement } from '@/lib/pdfSign';
import { destroyPdf, openPdf, renderPageToWidth } from '@/lib/pdfjs';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const PREVIEW_PX = 760;

type Scope = 'this' | 'all' | 'first' | 'last' | 'custom';

/** Page preview with the signature picture on a draggable, resizable box. Position is kept as fractions of the page. */
function Placer({ bytes, name, pageCount, sig, onChangeSignature, onReset }: { bytes: Uint8Array; name: string; pageCount: number; sig: SignatureImage; onChangeSignature: () => void; onReset: () => void }) {
  const task = useTask<Blob>();
  const running = task.state.status === 'running';
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState<number | ''>(1);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [area, setArea] = useState<Rect | null>(null);
  const [scope, setScope] = useState<Scope>('this');
  const [pages, setPages] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sigUrl = useObjectUrl(sig.blob);

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
    renderPageToWidth(doc, shown, PREVIEW_PX, canvas)
      .then((s) => !cancelled && setSize(s))
      .catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [doc, shown]);

  // A new signature starts near the bottom right of the page; changing the preview page keeps the position.
  useEffect(() => setArea(null), [sig]);
  useEffect(() => {
    if (!size || area) return;
    const box = defaultSignatureBox(sig.aspect, size.w / size.h);
    setArea({ x: Math.max(0, 0.95 - box.w), y: Math.max(0, 0.9 - box.h), w: box.w, h: box.h });
  }, [sig, size, area]);

  const px: Rect | null = size && area ? { x: area.x * size.w, y: area.y * size.h, w: area.w * size.w, h: area.h * size.h } : null;

  const run = () =>
    task.run(async () => {
      if (!area || !doc) throw new PdfError('Wait for the page preview to appear first.');
      let targets: number[];
      if (scope === 'this') targets = [shown];
      else if (scope === 'first') targets = [1];
      else if (scope === 'last') targets = [pageCount];
      else if (scope === 'all') targets = Array.from({ length: pageCount }, (_, i) => i + 1);
      else {
        try {
          targets = parsePageList(pages, pageCount).map((i) => i + 1); // zero-based -> page numbers
        } catch (e) {
          throw new PdfError(errorMessage(e));
        }
      }
      // The signature keeps its width and shape on every page, even when pages have different sizes.
      const placements: SignaturePlacement[] = [];
      for (const page of targets) {
        const p = await doc.getPage(page);
        const vp = p.getViewport({ scale: 1 });
        p.cleanup();
        const h = (area.w * vp.width) / sig.aspect / vp.height;
        placements.push({ page, x: area.x, y: Math.min(area.y, Math.max(0, 1 - h)), w: area.w, h });
      }
      const out = await signPdf(bytes, sig.bytes, placements);
      return new Blob([out as BlobPart], { type: 'application/pdf' });
    });

  if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;

  return (
    <div className="stack">
      <div className="row row-between">
        <span className="label">Your signature</span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onChangeSignature} disabled={running}>
          Change signature
        </button>
      </div>
      <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
        <CropSelector
          width={size?.w ?? 1}
          height={size?.h ?? 1}
          rect={px ?? { x: 0, y: 0, w: 0, h: 0 }}
          ratio={sig.aspect}
          label="Signature position"
          hidden={!size || !px}
          shade={false}
          boxContent={sigUrl ? <img src={sigUrl} alt="" /> : null}
          onChange={(r) => size && setArea({ x: r.x / size.w, y: r.y / size.h, w: r.w / size.w, h: r.h / size.h })}
        >
          <canvas ref={canvasRef} role="img" aria-label={`Preview of page ${shown}`} />
        </CropSelector>
      </div>
      {!size && <ProcessingState label="Rendering preview…" />}
      <p className="hint">Drag the signature to move it, or drag the corner dot to resize it. Arrow keys also move it.</p>
      <div className="options-grid">
        <NumberField label={`Preview page (1–${pageCount})`} value={previewPage} min={1} max={pageCount} onChange={setPreviewPage} />
        <Segmented
          label="Sign"
          value={scope}
          onChange={setScope}
          options={[
            { value: 'this', label: 'This page' },
            { value: 'all', label: 'All pages' },
            { value: 'first', label: 'First page' },
            { value: 'last', label: 'Last page' },
            { value: 'custom', label: 'Choose pages' },
          ]}
        />
        {scope === 'custom' && (
          <Field label="Pages" hint="For example 1-3, 5">
            {(id) => <input id={id} className="input mono" value={pages} placeholder={`1-${pageCount}`} onChange={(e) => setPages(e.target.value)} />}
          </Field>
        )}
      </div>
      <Notice tone="warn">
        <strong>Visual signature only.</strong> This places a picture of your signature on the page. It is not a cryptographic digital signature: it has no certificate and cannot prove who signed or detect later changes.
      </Notice>
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running || !size || !area || (scope === 'custom' && !pages.trim())}>
          <Icon name="signature" size={18} />
          Sign PDF
        </button>
      </div>
      {running && <ProcessingState label="Signing…" />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && <PdfResult blob={task.state.result} name={`${baseName(name)}-signed.pdf`} onReset={onReset} note="Visual signature, not a digital certificate." />}
    </div>
  );
}

const PdfSign: ToolImplementation = () => {
  const { pdf } = usePdfTool();
  const [sig, setSig] = useState<SignatureImage | null>(null);
  return (
    <PdfSource pdf={pdf}>
      {(ready) =>
        sig ? (
          <Placer
            key={`${ready.file.name}-${ready.file.size}-${ready.file.lastModified}`}
            bytes={ready.bytes}
            name={ready.file.name}
            pageCount={ready.pageCount}
            sig={sig}
            onChangeSignature={() => setSig(null)}
            onReset={() => {
              setSig(null);
              pdf.reset();
            }}
          />
        ) : (
          <SignatureMaker onReady={setSig} />
        )
      }
    </PdfSource>
  );
};

export default PdfSign;
