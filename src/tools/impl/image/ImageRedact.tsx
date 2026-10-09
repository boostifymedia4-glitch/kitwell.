import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { useI18n } from '@/i18n';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { RangeField, SelectField } from '@/components/tool/Fields';
import { ResetButton, ResultFiles, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { clamp } from '@/lib/cropRect';
import { outputName } from '@/lib/format';
import { useFileQueue, useObjectUrl, useTask } from '@/lib/hooks';
import { redactImage, type Region, type RegionEffect } from '@/lib/imageEdits';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const MIN_DRAW = 6;

const ImageRedact: ToolImplementation = () => {
  const { t } = useI18n();
  const EFFECTS: { value: RegionEffect; label: string }[] = [
    { value: 'blur', label: t('imageRedact.effect.blur') },
    { value: 'pixelate', label: t('imageRedact.effect.pixelate') },
    { value: 'cover', label: t('imageRedact.effect.cover') },
  ];
  const fieldLabelKeys = { x: 'imageRedact.fieldLabel.x', y: 'imageRedact.fieldLabel.y', w: 'imageRedact.fieldLabel.w', h: 'imageRedact.fieldLabel.h' } as const;
  const fieldNames = { x: t('imageRedact.field.x'), y: t('imageRedact.field.y'), w: t('imageRedact.field.w'), h: t('imageRedact.field.h') };
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: 1 }, false);
  const file = queue.items[0]?.file ?? null;
  const url = useObjectUrl(file);
  const imgRef = useRef<HTMLImageElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [draft, setDraftState] = useState<Region | null>(null);
  // The box being drawn is also kept in a ref so that releasing the pointer never reads a stale render.
  const draftRef = useRef<Region | null>(null);
  const setDraft = (r: Region | null) => {
    draftRef.current = r;
    setDraftState(r);
  };
  const [effect, setEffect] = useState<RegionEffect>('blur');
  const [strength, setStrength] = useState(60);
  const [loadError, setLoadError] = useState<string | null>(null);
  const task = useTask<{ name: string; blob: Blob; note: string }>();
  const { reset: resetTask } = task;
  const resultUrl = useObjectUrl(task.state.status === 'done' ? task.state.result.blob : null);
  const running = task.state.status === 'running';

  useEffect(() => {
    setNatural(null);
    setRegions([]);
    setDraft(null);
    setLoadError(null);
    resetTask();
  }, [file, resetTask]);

  // A finished result no longer matches once the areas or the effect change.
  useEffect(() => {
    resetTask();
  }, [regions, effect, strength, resetTask]);

  const toImage = (e: PointerEvent) => {
    const box = layerRef.current!.getBoundingClientRect();
    return {
      x: clamp(((e.clientX - box.left) / box.width) * natural!.w, 0, natural!.w),
      y: clamp(((e.clientY - box.top) / box.height) * natural!.h, 0, natural!.h),
    };
  };
  const between = (a: { x: number; y: number }, b: { x: number; y: number }): Region => ({
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    w: Math.abs(a.x - b.x),
    h: Math.abs(a.y - b.y),
  });

  const down = (e: PointerEvent) => {
    if (!natural || running) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = toImage(e);
    setDraft({ ...start.current, w: 0, h: 0 });
  };
  const move = (e: PointerEvent) => {
    if (start.current && natural) setDraft(between(start.current, toImage(e)));
  };
  const up = () => {
    const drawn = draftRef.current;
    if (drawn && drawn.w >= MIN_DRAW && drawn.h >= MIN_DRAW) setRegions((r) => [...r, drawn]);
    start.current = null;
    setDraft(null);
  };

  const addCentred = () => {
    if (!natural) return;
    const w = Math.round(natural.w * 0.3);
    const h = Math.round(natural.h * 0.3);
    setRegions((r) => [...r, { x: Math.round((natural.w - w) / 2), y: Math.round((natural.h - h) / 2), w, h }]);
  };
  const edit = (i: number, key: keyof Region, raw: string) => {
    if (!natural || raw === '') return;
    const v = Number(raw);
    if (!Number.isFinite(v)) return;
    setRegions((list) =>
      list.map((r, idx) => {
        if (idx !== i) return r;
        const next = { ...r, [key]: Math.round(v) };
        next.w = clamp(next.w, 1, natural.w);
        next.h = clamp(next.h, 1, natural.h);
        next.x = clamp(next.x, 0, natural.w - next.w);
        next.y = clamp(next.y, 0, natural.h - next.h);
        return next;
      }),
    );
  };

  const apply = () =>
    task.run(async () => {
      if (!file) throw new Error(t('imageRedact.err.noImage'));
      const fmt = FORMATS[sameFormatAs(file)];
      const result = await redactImage(file, regions, effect, strength, { mime: fmt.mime, quality: 0.92, background: '#ffffff' });
      return { name: outputName(file.name, fmt.ext, '-hidden'), blob: result.blob, note: `${result.width} × ${result.height} px` };
    });

  const reset = () => {
    queue.clear();
    resetTask();
  };

  const box = (r: Region, key: string, label: string, dashed = false) =>
    natural && (
      <div
        key={key}
        className="region-box"
        data-draft={dashed || undefined}
        style={{ left: `${(r.x / natural.w) * 100}%`, top: `${(r.y / natural.h) * 100}%`, width: `${(r.w / natural.w) * 100}%`, height: `${(r.h / natural.h) * 100}%` }}
      >
        <span>{label}</span>
      </div>
    );

  return (
    <div className="stack">
      {!file && <UploadDropzone extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} onFiles={queue.add} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {file && url && (
        <>
          {loadError && <ErrorMessage>{loadError}</ErrorMessage>}
          <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
            <div className="region-stage">
              <img
                ref={imgRef}
                src={url}
                alt={t('imageRedact.imageAlt', { name: file.name })}
                draggable={false}
                onLoad={() => imgRef.current && setNatural({ w: imgRef.current.naturalWidth, h: imgRef.current.naturalHeight })}
                onError={() => setLoadError(t('imageRedact.err.unreadable'))}
              />
              {natural && (
                <div ref={layerRef} className="region-layer" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-hidden="true">
                  {regions.map((r, i) => box(r, `r${i}`, String(i + 1)))}
                  {draft && box(draft, 'draft', '', true)}
                </div>
              )}
            </div>
          </div>

          {natural && (
            <>
              <p className="hint">
                {t('imageRedact.original', { width: natural.w, height: natural.h })}
              </p>
              <div className="options-grid">
                <SelectField label={t('imageRedact.effect')} value={effect} onChange={setEffect} options={EFFECTS} />
                {effect !== 'cover' && <RangeField label={t('imageRedact.strength')} value={strength} min={10} max={100} onChange={setStrength} format={(v) => `${v}%`} />}
              </div>
              {effect !== 'cover' && (
                <Notice tone="warn">{t('imageRedact.warn')}</Notice>
              )}

              <div className="stack-sm">
                <div className="row row-between">
                  <span className="label">{t('imageRedact.areas', { count: regions.length })}</span>
                  <div className="toolbar">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={addCentred} disabled={running}>
                      <Icon name="plus" size={14} /> {t('imageRedact.addBox')}
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRegions([])} disabled={running || regions.length === 0}>
                      {t('imageRedact.clearAll')}
                    </button>
                  </div>
                </div>
                {regions.length === 0 && <p className="hint">{t('imageRedact.noAreas')}</p>}
                <ul className="region-list">
                  {regions.map((r, i) => (
                    <li key={i} className="region-row">
                      <strong>#{i + 1}</strong>
                      {(['x', 'y', 'w', 'h'] as const).map((k) => (
                        <label key={k} className="mini-field">
                          <span>{fieldNames[k]}</span>
                          <input className="input" type="number" inputMode="numeric" min={0} aria-label={t(fieldLabelKeys[k], { number: i + 1 })} value={Math.round(r[k])} onChange={(e) => edit(i, k, e.target.value)} />
                        </label>
                      ))}
                      <button type="button" className="icon-btn" aria-label={t('imageRedact.removeBox', { number: i + 1 })} onClick={() => setRegions((list) => list.filter((_, idx) => idx !== i))}>
                        <Icon name="trash" size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="toolbar">
                <button type="button" className="btn btn-primary btn-lg" onClick={apply} disabled={running || regions.length === 0}>
                  <Icon name="eye-off" size={18} />
                  {t('imageRedact.apply')}
                </button>
                <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
                  {t('imageRedact.chooseAnother')}
                </button>
              </div>
            </>
          )}
        </>
      )}
      {running && <ProcessingState label={t('imageRedact.applying')} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel>
          {resultUrl && (
            <div className="preview-box">
              <img src={resultUrl} alt={t('imageRedact.resultAlt')} />
            </div>
          )}
          <ResultFiles files={[task.state.result]} zipName="hidden.zip" />
          <ResetButton onClick={reset} />
        </ResultPanel>
      )}
    </div>
  );
};

export default ImageRedact;
