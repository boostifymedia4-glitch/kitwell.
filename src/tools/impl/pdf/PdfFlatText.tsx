import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { NumberField } from '@/components/tool/Fields';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { addTextToPdf, type TextItem } from '@/lib/pdfAddText';
import { destroyPdf, openPdf, renderPageToWidth } from '@/lib/pdfjs';
import { useI18n } from '@/i18n';

const PREVIEW_PX = 760;

interface Item extends TextItem {
  id: number;
}

/** For PDFs without form fields: click the page to place a line of text, type it, and save a copy with the text written on. */
export function PdfFlatText({ bytes, name, pageCount, onReset }: { bytes: Uint8Array; name: string; pageCount: number; onReset: () => void }) {
  const { t } = useI18n();
  const task = useTask<Blob>();
  const running = task.state.status === 'running';
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [page, setPage] = useState<number | ''>(1);
  const [size, setSize] = useState<{ w: number; h: number; pt: number } | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [fontSize, setFontSize] = useState<number | ''>(12);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextId = useRef(1);
  const lastAdded = useRef<number | null>(null);

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

  const shown = Math.min(pageCount, Math.max(1, Number(page) || 1));
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;
    let cancelled = false;
    (async () => {
      const p = await doc.getPage(shown);
      const pt = p.getViewport({ scale: 1 }).width;
      const s = await renderPageToWidth(doc, shown, PREVIEW_PX, canvas);
      if (!cancelled) setSize({ ...s, pt });
    })().catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [doc, shown]);

  useEffect(() => {
    if (lastAdded.current === null) return;
    document.getElementById(`flat-text-${lastAdded.current}`)?.focus();
    lastAdded.current = null;
  }, [items.length]);

  const place = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    lastAdded.current = id;
    setItems((cur) => [...cur, { id, page: shown, x: (e.clientX - box.left) / box.width, y: (e.clientY - box.top) / box.height, size: Number(fontSize) || 12, text: '' }]);
  };
  const update = (id: number, patch: Partial<Item>) => setItems((cur) => cur.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const filled = items.filter((it) => it.text.trim());

  const run = () =>
    task.run(async () => {
      const out = await addTextToPdf(bytes, filled);
      return new Blob([out as BlobPart], { type: 'application/pdf' });
    });

  if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;

  return (
    <div className="stack">
      <p className="hint">{t('pdfFillForm.flat.intro')}</p>
      <div className="options-grid">
        <NumberField label={t('pdfFillForm.flat.page', { max: pageCount })} value={page} min={1} max={pageCount} onChange={setPage} />
        <NumberField label={t('pdfFillForm.flat.size')} value={fontSize} min={6} max={72} onChange={setFontSize} />
      </div>
      <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
        <div style={{ position: 'relative', width: size?.w, maxWidth: '100%', margin: '0 auto', cursor: 'text', containerType: 'inline-size' }} onClick={place} role="presentation">
          <canvas ref={canvasRef} role="img" aria-label={t('pdfFillForm.flat.preview', { page: shown })} style={{ display: 'block', width: '100%', height: 'auto' }} />
          {size &&
            items
              .filter((it) => it.page === shown)
              .map((it) => (
                <span
                  key={it.id}
                  style={{
                    position: 'absolute',
                    left: `${it.x * 100}%`,
                    top: `${it.y * 100}%`,
                    fontSize: `calc(${it.size / size.pt} * 100cqw)`,
                    lineHeight: 1,
                    color: '#000',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    background: 'rgba(255,235,59,.35)',
                    outline: '1px dashed #888',
                    whiteSpace: 'pre',
                    pointerEvents: 'none',
                    minWidth: 12,
                    minHeight: 12,
                  }}
                >
                  {it.text}
                </span>
              ))}
        </div>
      </div>
      {!size && <ProcessingState label={t('pdfFillForm.flat.rendering')} />}
      {items.length > 0 && (
        <div className="stack-sm">
          {items.map((it) => (
            <div key={it.id} className="row" style={{ gap: 8, alignItems: 'center' }}>
              <span className="hint">{t('pdfFillForm.flat.itemPage', { page: it.page })}</span>
              <input id={`flat-text-${it.id}`} className="input" value={it.text} aria-label={t('pdfFillForm.flat.text')} placeholder={t('pdfFillForm.flat.placeholder')} onChange={(e) => update(it.id, { text: e.target.value })} />
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setItems((cur) => cur.filter((x) => x.id !== it.id))}>
                {t('pdfFillForm.flat.remove')}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running || filled.length === 0}>
          <Icon name="text-cursor" size={18} />
          {t('pdfFillForm.flat.save')}
        </button>
      </div>
      {running && <ProcessingState label={t('pdfFillForm.filling')} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && <PdfResult blob={task.state.result} name={`${baseName(name)}-filled.pdf`} onReset={onReset} note={t('pdfFillForm.flat.note')} />}
    </div>
  );
}
