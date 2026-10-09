import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { ErrorMessage } from '@/components/tool/Feedback';
import { PdfSource } from '@/components/tool/PdfSource';
import { Icon } from '@/components/Icon';
import { errorMessage } from '@/lib/format';
import { destroyPdf, openPdf } from '@/lib/pdfjs';
import { usePdfFile } from '@/lib/usePdfFile';
import { tr, useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

function Viewer({ bytes, pageCount }: { bytes: Uint8Array; pageCount: number }) {
  const { t } = useI18n();
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [zoom, setZoom] = useState(1);
  const [rendering, setRendering] = useState(true);
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
      .catch((e) => !cancelled && setError(errorMessage(e)));
    return () => {
      cancelled = true;
      if (opened) void destroyPdf(opened);
    };
  }, [bytes]);

  useEffect(() => {
    if (!doc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    let cancelled = false;
    let task: RenderTask | null = null;
    setRendering(true);
    (async () => {
      const p = await doc.getPage(page);
      try {
        // 96/72 approximates CSS pixels for a 100% view; DPR keeps text crisp on high-density screens.
        const cssScale = (96 / 72) * zoom;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cssViewport = p.getViewport({ scale: cssScale });
        const viewport = p.getViewport({ scale: cssScale * dpr });
        if (viewport.width * viewport.height > 60_000_000) throw new Error(tr('pdfViewer.err.zoom'));
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = `${Math.ceil(cssViewport.width)}px`;
        canvas.style.height = `${Math.ceil(cssViewport.height)}px`;
        task = p.render({ canvas, viewport });
        await task.promise;
        if (!cancelled) setRendering(false);
      } finally {
        p.cleanup();
      }
    })().catch((e) => {
      // Cancelling an in-flight render (fast page/zoom changes) is expected, not an error.
      if (!cancelled && !(e && e.name === 'RenderingCancelledException')) setError(errorMessage(e));
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, page, zoom]);

  const go = (n: number) => {
    const next = Math.min(pageCount, Math.max(1, n));
    setPage(next);
    setPageInput(String(next));
  };

  const onKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    if (e.key === 'PageDown' || e.key === 'ArrowRight') go(page + 1);
    else if (e.key === 'PageUp' || e.key === 'ArrowLeft') go(page - 1);
    else if (e.key === 'Home') go(1);
    else if (e.key === 'End') go(pageCount);
    else return;
    e.preventDefault();
  };

  const zoomIdx = ZOOMS.indexOf(zoom);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="stack" onKeyDown={onKey}>
      <div className="toolbar" role="toolbar" aria-label={t('pdfViewer.controls')}>
        <button type="button" className="icon-btn" aria-label={t('pdfViewer.previous')} disabled={page <= 1} onClick={() => go(page - 1)}>
          <Icon name="arrow-left" size={18} />
        </button>
        <label className="row" style={{ gap: 6 }}>
          <span className="visually-hidden">{t('pdfViewer.pageNumber')}</span>
          <input
            className="input"
            style={{ width: 64, textAlign: 'center', minHeight: 34 }}
            inputMode="numeric"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ''))}
            onBlur={() => go(Number(pageInput) || page)}
            onKeyDown={(e) => e.key === 'Enter' && go(Number(pageInput) || page)}
          />
          <span className="muted">{t('pdfViewer.of', { total: pageCount })}</span>
        </label>
        <button type="button" className="icon-btn" aria-label={t('pdfViewer.next')} disabled={page >= pageCount} onClick={() => go(page + 1)}>
          <Icon name="arrow-right" size={18} />
        </button>
        <span className="spacer" />
        <button type="button" className="icon-btn" aria-label={t('pdfViewer.zoomOut')} disabled={zoomIdx <= 0} onClick={() => setZoom(ZOOMS[Math.max(0, zoomIdx - 1)])}>
          <Icon name="zoom-out" size={18} />
        </button>
        <span className="muted" style={{ minWidth: 48, textAlign: 'center' }} aria-live="polite">
          {Math.round(zoom * 100)}%
        </span>
        <button type="button" className="icon-btn" aria-label={t('pdfViewer.zoomIn')} disabled={zoomIdx >= ZOOMS.length - 1} onClick={() => setZoom(ZOOMS[Math.min(ZOOMS.length - 1, zoomIdx + 1)])}>
          <Icon name="zoom-in" size={18} />
        </button>
      </div>
      <div className="viewer" tabIndex={0} aria-label={t('pdfViewer.viewer', { page, total: pageCount })} style={{ opacity: rendering ? 0.6 : 1, transition: 'opacity 120ms' }}>
        <canvas ref={canvasRef} role="img" aria-label={t('pdfViewer.canvas', { page })} />
      </div>
    </div>
  );
}

const PdfViewer: ToolImplementation = () => {
  const pdf = usePdfFile();
  return <PdfSource pdf={pdf}>{(ready) => <Viewer key={`${ready.file.name}-${ready.file.size}`} bytes={ready.bytes} pageCount={ready.pageCount} />}</PdfSource>;
};

export default PdfViewer;
