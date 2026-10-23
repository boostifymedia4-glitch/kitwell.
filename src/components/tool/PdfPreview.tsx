import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n';
import { Icon } from '../Icon';

const PREVIEW_PX = 560;

/** Characters a file name cannot contain on common systems. */
// eslint-disable-next-line no-control-regex
const UNSAFE = /[\\/:*?"<>|\u0000-\u001f]/g;

/** The editable part of a PDF file name (without ".pdf"). */
export const stemOf = (name: string) => name.replace(/\.pdf$/i, '');

/** A safe file name for a download: unsafe characters removed, ".pdf" added, falls back to `fallback` when empty. */
export function pdfFileName(stem: string, fallback: string) {
  const clean = stem.replace(UNSAFE, '').replace(/^[\s.]+|[\s.]+$/g, '').slice(0, 120);
  return `${clean || stemOf(fallback)}.pdf`;
}

/** First pages of a produced PDF, rendered in the page, so the result can be checked before it is downloaded. */
export function PdfPreview({ blob }: { blob: Blob }) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [failed, setFailed] = useState(false);
  const docRef = useRef<import('pdfjs-dist').PDFDocumentProxy | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setReady(false);
    setPage(1);
    (async () => {
      const { openPdf, destroyPdf } = await import('@/lib/pdfjs');
      const doc = await openPdf(new Uint8Array(await blob.arrayBuffer()));
      if (cancelled) return destroyPdf(doc);
      docRef.current = doc;
      setPages(doc.numPages);
      setReady(true);
    })().catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      const doc = docRef.current;
      docRef.current = null;
      if (doc) void import('@/lib/pdfjs').then((m) => m.destroyPdf(doc));
    };
  }, [blob]);

  useEffect(() => {
    const doc = docRef.current;
    const canvas = canvasRef.current;
    if (!ready || !doc || !canvas) return;
    let cancelled = false;
    import('@/lib/pdfjs')
      .then((m) => m.renderPageToWidth(doc, page, PREVIEW_PX, canvas))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [ready, page]);

  if (failed) return <p className="hint">{t('ui.previewFailed')}</p>;
  return (
    <div className="pdf-preview stack-sm">
      <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-3)', textAlign: 'center' }}>
        <canvas ref={canvasRef} role="img" aria-label={t('ui.previewAlt', { page })} style={{ maxWidth: '100%', height: 'auto', background: '#fff', boxShadow: 'var(--shadow-xs)' }} />
      </div>
      {pages > 1 && (
        <div className="row" style={{ gap: 8, justifyContent: 'center', alignItems: 'center' }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} aria-label={t('ui.previewPrev')}>
            <Icon name="arrow-left" size={14} />
          </button>
          <span className="hint">{t('ui.previewPage', { page, total: pages })}</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page >= pages} aria-label={t('ui.previewNext')}>
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
