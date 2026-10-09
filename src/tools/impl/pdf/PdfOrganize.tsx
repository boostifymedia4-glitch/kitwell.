import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { Field } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { DownloadButton, ResultPanel } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { baseName, errorMessage, formatBytes } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { buildFromPages, parsePageList, type PageSpec } from '@/lib/pdfOps';
import { destroyPdf, openPdf, renderThumbnail } from '@/lib/pdfjs';
import { usePdfFile } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

type Mode = 'rotate' | 'extract' | 'reorder' | 'remove';

interface PageState {
  id: number; // zero-based index in the source PDF
  rotate: number;
  selected: boolean;
  removed: boolean;
}

const THUMB_WIDTH = 160;

function PageThumb({ doc, id, rotate }: { doc: PDFDocumentProxy; id: number; rotate: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [aspect, setAspect] = useState(0.75);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const holder = holderRef.current;
    const canvas = canvasRef.current;
    if (!holder || !canvas) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        renderThumbnail(doc, id + 1, canvas, THUMB_WIDTH)
          .then(() => {
            if (cancelled) return;
            setAspect(canvas.width / canvas.height);
            setReady(true);
          })
          .catch(() => !cancelled && setFailed(true));
      },
      { rootMargin: '300px' },
    );
    observer.observe(holder);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [doc, id]);

  const turned = rotate % 180 !== 0;
  const k = turned ? Math.min(1, aspect) : 1;
  return (
    <div className="page-thumb" ref={holderRef}>
      {failed && <Icon name="alert" size={22} />}
      {!failed && !ready && <span className="spinner" aria-hidden="true" style={{ position: 'absolute' }} />}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ transform: `rotate(${rotate}deg) scale(${k})`, display: failed ? 'none' : undefined, width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

function Organizer({ bytes, pageCount, name, mode }: { bytes: Uint8Array; pageCount: number; name: string; mode: Mode }) {
  const { t } = useI18n();
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [docError, setDocError] = useState<string | null>(null);
  const [pages, setPages] = useState<PageState[]>(() =>
    Array.from({ length: pageCount }, (_, i) => ({ id: i, rotate: 0, selected: false, removed: false })),
  );
  const [rangeText, setRangeText] = useState('');
  const [rangeError, setRangeError] = useState<string | null>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const task = useTask<Blob>();
  const running = task.state.status === 'running';

  useEffect(() => {
    let cancelled = false;
    let opened: PDFDocumentProxy | null = null;
    openPdf(bytes)
      .then((d) => {
        if (cancelled) return destroyPdf(d);
        opened = d;
        setDoc(d);
      })
      .catch((e) => !cancelled && setDocError(errorMessage(e)));
    return () => {
      cancelled = true;
      if (opened) void destroyPdf(opened);
    };
  }, [bytes]);

  const update = (i: number, patch: Partial<PageState>) => {
    task.reset();
    setPages((p) => p.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  };
  const rotateBy = (i: number, deg: number) => update(i, { rotate: (((pages[i].rotate + deg) % 360) + 360) % 360 });
  const rotateAll = (deg: number) => {
    task.reset();
    setPages((p) => p.map((x) => ({ ...x, rotate: (((x.rotate + deg) % 360) + 360) % 360 })));
  };
  const resetRotation = () => {
    task.reset();
    setPages((p) => p.map((x) => ({ ...x, rotate: 0 })));
  };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= pages.length || from === to) return;
    task.reset();
    setPages((p) => {
      const next = p.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };
  const selectAll = (value: boolean) => {
    task.reset();
    setPages((p) => p.map((x) => ({ ...x, selected: value })));
  };
  const applyRange = () => {
    try {
      const idx = new Set(parsePageList(rangeText, pageCount));
      task.reset();
      setPages((p) => p.map((x) => ({ ...x, selected: idx.has(x.id) })));
      setRangeError(null);
    } catch (e) {
      setRangeError(errorMessage(e));
    }
  };

  const keptSpecs = (): PageSpec[] => {
    if (mode === 'rotate') return pages.map((p) => ({ index: p.id, rotate: p.rotate }));
    if (mode === 'extract') return pages.filter((p) => p.selected).map((p) => ({ index: p.id }));
    if (mode === 'remove') return pages.filter((p) => !p.selected).map((p) => ({ index: p.id }));
    return pages.filter((p) => !p.removed).map((p) => ({ index: p.id, rotate: p.rotate }));
  };

  const suffix = { rotate: 'rotated', extract: 'extracted', reorder: 'reordered', remove: 'pages-removed' }[mode];
  const save = () =>
    task.run(async () => {
      const out = await buildFromPages(bytes, keptSpecs());
      return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
    });

  const selectedCount = pages.filter((p) => p.selected).length;
  const keptCount = pages.filter((p) => !p.removed).length;
  // Selecting pages (to keep or to delete) needs at least one page, and removing must leave at least one behind.
  const selecting = mode === 'extract' || mode === 'remove';
  const canSave = mode === 'extract' ? selectedCount > 0 : mode === 'remove' ? selectedCount > 0 && selectedCount < pageCount : mode === 'reorder' ? keptCount > 0 : true;
  const actionLabel =
    mode === 'rotate'
      ? t('pdfOrganize.save.rotate')
      : mode === 'extract'
        ? t('pdfOrganize.save.extract', { count: selectedCount })
        : mode === 'remove'
          ? t('pdfOrganize.save.remove', { count: selectedCount })
          : t('pdfOrganize.save.reorder', { count: keptCount });

  if (docError) return <ErrorMessage>{docError}</ErrorMessage>;

  return (
    <div className="stack">
      {mode === 'rotate' && (
        <div className="toolbar">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => rotateAll(-90)}>
            <Icon name="rotate-ccw" size={14} /> {t('pdfOrganize.rotateAllLeft')}
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => rotateAll(90)}>
            <Icon name="rotate" size={14} /> {t('pdfOrganize.rotateAllRight')}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={resetRotation}>
            {t('pdfOrganize.resetRotation')}
          </button>
        </div>
      )}
      {selecting && (
        <div className="stack-sm">
          <div className="row" style={{ alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 240px' }}>
              <Field label={t('pdfOrganize.range')} hint={t('pdfOrganize.range.hint')}>
                {(id) => (
                  <input
                    id={id}
                    className="input mono"
                    value={rangeText}
                    aria-invalid={Boolean(rangeError)}
                    placeholder={`1-3, ${pageCount}`}
                    onChange={(e) => setRangeText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyRange()}
                  />
                )}
              </Field>
            </div>
            <button type="button" className="btn btn-secondary" onClick={applyRange}>
              {t('pdfOrganize.applyRange')}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => selectAll(true)}>
              {t('pdfOrganize.selectAll')}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => selectAll(false)}>
              {t('pdfOrganize.clear')}
            </button>
          </div>
          {rangeError && <ErrorMessage>{rangeError}</ErrorMessage>}
          <p className="hint">
            {mode === 'remove'
              ? selectedCount >= pageCount
                ? t('pdfOrganize.cannotRemoveAll')
                : t('pdfOrganize.selectedForRemoval', { count: selectedCount })
              : t('pdfOrganize.selected', { count: selectedCount })}
          </p>
        </div>
      )}
      {mode === 'reorder' && <p className="hint">{t('pdfOrganize.reorderHint')}</p>}

      <ul className="page-grid" aria-label={t('pdfOrganize.pagesList')}>
        {pages.map((p, i) => (
          <li
            key={p.id}
            className="page-card"
            data-selected={selecting && p.selected}
            data-dragover={dragOver === i && dragFrom !== i}
            draggable={mode === 'reorder' && !running}
            style={p.removed ? { opacity: 0.4 } : undefined}
            onDragStart={() => setDragFrom(i)}
            onDragOver={(e) => {
              if (dragFrom === null) return;
              e.preventDefault();
              setDragOver(i);
            }}
            onDragEnd={() => {
              setDragFrom(null);
              setDragOver(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragFrom !== null) move(dragFrom, i);
              setDragFrom(null);
              setDragOver(null);
            }}
          >
            {doc ? <PageThumb doc={doc} id={p.id} rotate={p.rotate} /> : <div className="page-thumb"><span className="spinner" aria-hidden="true" /></div>}
            <div className="page-label">
              <span>{t('pdfOrganize.page', { n: p.id + 1 })}</span>
              {mode === 'reorder' && <span>#{i + 1}</span>}
              {mode === 'rotate' && p.rotate !== 0 && <span>{p.rotate}°</span>}
            </div>
            <div className="page-actions">
              {mode === 'rotate' && (
                <>
                  <button type="button" className="icon-btn" aria-label={t('pdfOrganize.rotatePageLeft', { n: p.id + 1 })} onClick={() => rotateBy(i, -90)}>
                    <Icon name="rotate-ccw" size={16} />
                  </button>
                  <button type="button" className="icon-btn" aria-label={t('pdfOrganize.rotatePageRight', { n: p.id + 1 })} onClick={() => rotateBy(i, 90)}>
                    <Icon name="rotate" size={16} />
                  </button>
                </>
              )}
              {selecting && (
                <label className="check" style={{ padding: 4 }}>
                  <input type="checkbox" checked={p.selected} onChange={(e) => update(i, { selected: e.target.checked })} />
                  {mode === 'remove' ? t('pdfOrganize.checkRemove') : t('pdfOrganize.checkSelect')}
                  <span className="visually-hidden"> {t('pdfOrganize.checkPage', { n: p.id + 1 })}</span>
                </label>
              )}
              {mode === 'reorder' && (
                <>
                  <button type="button" className="icon-btn" aria-label={t('pdfOrganize.moveEarlier', { n: p.id + 1 })} disabled={i === 0} onClick={() => move(i, i - 1)}>
                    <Icon name="arrow-left" size={16} />
                  </button>
                  <button type="button" className="icon-btn" aria-label={p.removed ? t('pdfOrganize.restorePage', { n: p.id + 1 }) : t('pdfOrganize.removePage', { n: p.id + 1 })} onClick={() => update(i, { removed: !p.removed })}>
                    <Icon name={p.removed ? 'rotate-ccw' : 'trash'} size={16} />
                  </button>
                  <button type="button" className="icon-btn" aria-label={t('pdfOrganize.moveLater', { n: p.id + 1 })} disabled={i === pages.length - 1} onClick={() => move(i, i + 1)}>
                    <Icon name="arrow-right" size={16} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={save} disabled={running || !canSave}>
          <Icon name="download" size={18} />
          {actionLabel}
        </button>
      </div>
      {running && <ProcessingState label={t('pdfOrganize.building')} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title={t('pdfOrganize.ready')}>
          <p className="muted">{formatBytes(task.state.result.size)}</p>
          <div className="toolbar">
            <DownloadButton blob={task.state.result} name={`${baseName(name)}-${suffix}.pdf`} label={t('pdfOrganize.download', { name: `${baseName(name)}-${suffix}.pdf` })} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
}

const PdfOrganize: ToolImplementation = ({ tool }) => {
  const mode = (tool.config?.mode ?? 'reorder') as Mode;
  const pdf = usePdfFile();
  return (
    <PdfSource pdf={pdf}>
      {(ready) => (
        <Organizer key={`${ready.file.name}-${ready.file.size}-${ready.file.lastModified}`} bytes={ready.bytes} pageCount={ready.pageCount} name={ready.file.name} mode={mode} />
      )}
    </PdfSource>
  );
};

export default PdfOrganize;
