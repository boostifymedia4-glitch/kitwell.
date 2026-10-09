import { useEffect, useMemo, useRef, useState } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { CropSelector } from '@/components/tool/CropSelector';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { CheckField, ColorField, Field, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { CROP_RATIOS, applyRatio, initialRect, type Rect } from '@/lib/cropRect';
import { baseName, formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { canvasToBlob, type OutputMime } from '@/lib/imageProcessor';
import { ADJUST_CONTROLS, FILTERS, NEUTRAL, applyEdits, isNeutral, straightenScale, turnedSize, type Adjustments, type FilterId } from '@/lib/photoEdit';
import type { ToolImplementation } from '../../types';

type Tab = 'adjust' | 'filters' | 'transform' | 'crop' | 'text';
type TextPlace = 'top-left' | 'top-center' | 'top-right' | 'middle-center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface Edit {
  adjustments: Adjustments;
  filter: FilterId;
  turns: number;
  flipH: boolean;
  flipV: boolean;
  straighten: number;
  /** Crop area as fractions of the rotated picture, or null for no crop. */
  crop: { x: number; y: number; w: number; h: number } | null;
  text: string;
  textSize: number;
  textColour: string;
  textBold: boolean;
  textOutline: boolean;
  textPlace: TextPlace;
}

const INITIAL: Edit = {
  adjustments: NEUTRAL,
  filter: 'none',
  turns: 0,
  flipH: false,
  flipV: false,
  straighten: 0,
  crop: null,
  text: '',
  textSize: 8,
  textColour: '#ffffff',
  textBold: true,
  textOutline: true,
  textPlace: 'bottom-center',
};

const PREVIEW_SIDE = 900;
const MAX_PIXELS = 50_000_000;

const FORMATS: { value: 'png' | 'jpeg' | 'webp'; label: string; mime: OutputMime; ext: string }[] = [
  { value: 'png', label: 'PNG (lossless)', mime: 'image/png', ext: 'png' },
  { value: 'jpeg', label: 'JPG', mime: 'image/jpeg', ext: 'jpg' },
  { value: 'webp', label: 'WebP', mime: 'image/webp', ext: 'webp' },
];

const PLACES: { value: TextPlace; label: string }[] = [
  { value: 'top-left', label: 'Top left' },
  { value: 'top-center', label: 'Top centre' },
  { value: 'top-right', label: 'Top right' },
  { value: 'middle-center', label: 'Middle' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'bottom-center', label: 'Bottom centre' },
  { value: 'bottom-right', label: 'Bottom right' },
];

/** Draws the rotated, flipped and straightened picture. Output size is the (turned) size scaled by `scale`. */
function drawGeometry(bitmap: ImageBitmap, edit: Edit, scale: number): HTMLCanvasElement {
  const turned = turnedSize(bitmap.width, bitmap.height, edit.turns % 4);
  const w = Math.max(1, Math.round(turned.width * scale));
  const h = Math.max(1, Math.round(turned.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Your browser could not create a drawing surface.');
  ctx.imageSmoothingQuality = 'high';
  ctx.translate(w / 2, h / 2);
  ctx.rotate((((edit.turns % 4) * 90 + edit.straighten) * Math.PI) / 180);
  const zoom = edit.straighten === 0 ? 1 : straightenScale(turned.width, turned.height, edit.straighten);
  ctx.scale((edit.flipH ? -1 : 1) * zoom, (edit.flipV ? -1 : 1) * zoom);
  ctx.drawImage(bitmap, (-bitmap.width * scale) / 2, (-bitmap.height * scale) / 2, bitmap.width * scale, bitmap.height * scale);
  return canvas;
}

/** Runs the whole edit. `scale` is 1 for the exported picture and smaller for previews. */
function renderEdit(bitmap: ImageBitmap, edit: Edit, scale: number, applyCrop: boolean): HTMLCanvasElement {
  const geo = drawGeometry(bitmap, edit, scale);
  let canvas = geo;
  if (applyCrop && edit.crop) {
    const sx = Math.round(edit.crop.x * geo.width);
    const sy = Math.round(edit.crop.y * geo.height);
    const sw = Math.max(1, Math.min(geo.width - sx, Math.round(edit.crop.w * geo.width)));
    const sh = Math.max(1, Math.min(geo.height - sy, Math.round(edit.crop.h * geo.height)));
    canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    canvas.getContext('2d', { willReadFrequently: true })?.drawImage(geo, sx, sy, sw, sh, 0, 0, sw, sh);
  }
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Your browser could not create a drawing surface.');
  if (!isNeutral(edit.adjustments, edit.filter)) {
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    applyEdits(image, edit.adjustments, edit.filter, scale);
    ctx.putImageData(image, 0, 0);
  }
  const text = edit.text.trim();
  if (text) {
    const size = Math.max(8, (edit.textSize / 100) * canvas.height);
    ctx.font = `${edit.textBold ? '700 ' : ''}${size}px system-ui, "Segoe UI", Arial, sans-serif`;
    ctx.textBaseline = 'middle';
    const [v, hAlign] = edit.textPlace.split('-') as ['top' | 'middle' | 'bottom', 'left' | 'center' | 'right'];
    ctx.textAlign = hAlign;
    const margin = size * 0.6;
    const x = hAlign === 'left' ? margin : hAlign === 'right' ? canvas.width - margin : canvas.width / 2;
    const y = v === 'top' ? margin + size / 2 : v === 'bottom' ? canvas.height - margin - size / 2 : canvas.height / 2;
    if (edit.textOutline) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(2, size * 0.14);
      ctx.strokeStyle = edit.textColour.toLowerCase() === '#000000' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)';
      ctx.strokeText(text, x, y, canvas.width - margin * 2);
    }
    ctx.fillStyle = edit.textColour;
    ctx.fillText(text, x, y, canvas.width - margin * 2);
  }
  return canvas;
}

function FilterThumbs({ bitmap, current, onPick }: { bitmap: ImageBitmap; current: FilterId; onPick: (f: FilterId) => void }) {
  const thumbs = useMemo(() => {
    const scale = 96 / Math.max(bitmap.width, bitmap.height);
    const base = document.createElement('canvas');
    base.width = Math.max(1, Math.round(bitmap.width * scale));
    base.height = Math.max(1, Math.round(bitmap.height * scale));
    const bctx = base.getContext('2d', { willReadFrequently: true });
    if (!bctx) return [];
    bctx.drawImage(bitmap, 0, 0, base.width, base.height);
    const source = bctx.getImageData(0, 0, base.width, base.height);
    return FILTERS.map((f) => {
      const c = document.createElement('canvas');
      c.width = base.width;
      c.height = base.height;
      const image = new ImageData(new Uint8ClampedArray(source.data), base.width, base.height);
      applyEdits(image, NEUTRAL, f.id);
      c.getContext('2d')?.putImageData(image, 0, 0);
      return { ...f, url: c.toDataURL('image/jpeg', 0.8) };
    });
  }, [bitmap]);
  return (
    <div className="filter-grid" role="radiogroup" aria-label="Filters">
      {thumbs.map((f) => (
        <button key={f.id} type="button" role="radio" aria-checked={current === f.id} className="filter-tile" data-active={current === f.id || undefined} onClick={() => onPick(f.id)}>
          <img src={f.url} alt="" />
          <span>{f.label}</span>
        </button>
      ))}
    </div>
  );
}

const PhotoEditor: ToolImplementation = () => {
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: 1 }, false);
  const file = queue.items[0]?.file ?? null;
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [edit, setEdit] = useState<Edit>(INITIAL);
  const [tab, setTab] = useState<Tab>('adjust');
  const [ratioId, setRatioId] = useState('free');
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(92);
  const [previewSize, setPreviewSize] = useState<{ w: number; h: number } | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const task = useTask<{ blob: Blob; width: number; height: number; name: string }>();
  const running = task.state.status === 'running';
  const { reset: resetTask } = task;

  useEffect(() => {
    setBitmap(null);
    setLoadError(null);
    setEdit(INITIAL);
    setTab('adjust');
    setRatioId('free');
    resetTask();
    if (!file) return;
    let cancelled = false;
    createImageBitmap(file)
      .then((b) => {
        if (cancelled) return b.close();
        if (b.width * b.height > MAX_PIXELS) {
          b.close();
          setLoadError('This picture is too large for the editor (over 50 megapixels). Make it smaller with the Image Resizer first.');
          return;
        }
        setBitmap(b);
      })
      .catch(() => !cancelled && setLoadError('This file could not be read as an image. It may be corrupted or in an unsupported format.'));
    return () => {
      cancelled = true;
    };
  }, [file, resetTask]);
  useEffect(() => () => bitmap?.close(), [bitmap]);

  // Any edit makes an earlier export out of date.
  useEffect(() => resetTask(), [edit, format, quality, resetTask]);

  // Live preview, drawn a moment after the last change.
  const cropping = tab === 'crop';
  useEffect(() => {
    const canvas = previewRef.current;
    if (!bitmap || !canvas) return;
    const timer = window.setTimeout(() => {
      const turned = turnedSize(bitmap.width, bitmap.height, edit.turns % 4);
      const scale = Math.min(1, PREVIEW_SIDE / Math.max(turned.width, turned.height));
      const out = renderEdit(bitmap, edit, scale, !cropping);
      canvas.width = out.width;
      canvas.height = out.height;
      canvas.getContext('2d')?.drawImage(out, 0, 0);
      setPreviewSize({ w: out.width, h: out.height });
    }, 25);
    return () => window.clearTimeout(timer);
  }, [bitmap, edit, cropping]);

  const patch = (p: Partial<Edit>) => setEdit((e) => ({ ...e, ...p }));
  const adjust = (key: keyof Adjustments, value: number) => setEdit((e) => ({ ...e, adjustments: { ...e.adjustments, [key]: value } }));
  const ratio = ratioId === 'free' ? null : Number(ratioId);

  // Crop box in preview pixels (only shown on the Crop tab, where the whole rotated picture is displayed).
  const cropPx: Rect | null = previewSize && edit.crop ? { x: edit.crop.x * previewSize.w, y: edit.crop.y * previewSize.h, w: edit.crop.w * previewSize.w, h: edit.crop.h * previewSize.h } : null;
  /** Puts a new crop box (80% of the picture, in the given shape) on the picture. */
  const startCrop = (shape: number | null) => {
    if (!previewSize) return;
    const r = initialRect(previewSize.w, previewSize.h);
    const fitted = shape ? applyRatio(r, shape, previewSize.w, previewSize.h) : r;
    patch({ crop: { x: fitted.x / previewSize.w, y: fitted.y / previewSize.h, w: fitted.w / previewSize.w, h: fitted.h / previewSize.h } });
  };
  const chooseTab = (next: Tab) => {
    setTab(next);
    // Opening the Crop tab for the first time shows a crop box to adjust.
    if (next === 'crop' && !edit.crop) startCrop(ratio);
  };

  const exportPicture = () =>
    task.run(async () => {
      if (!bitmap || !file) throw new Error('Add a photo first.');
      const fmt = FORMATS.find((f) => f.value === format)!;
      const canvas = renderEdit(bitmap, edit, 1, true);
      let source: HTMLCanvasElement = canvas;
      if (fmt.mime === 'image/jpeg') {
        // JPG has no transparency: put the picture on white.
        source = document.createElement('canvas');
        source.width = canvas.width;
        source.height = canvas.height;
        const c = source.getContext('2d');
        if (c) {
          c.fillStyle = '#ffffff';
          c.fillRect(0, 0, source.width, source.height);
          c.drawImage(canvas, 0, 0);
        }
      }
      const blob = await canvasToBlob(source, fmt.mime, quality / 100);
      return { blob, width: canvas.width, height: canvas.height, name: `${baseName(file.name)}-edited.${fmt.ext}` };
    });

  const done = task.state.status === 'done' ? task.state.result : null;
  const changed = JSON.stringify(edit) !== JSON.stringify(INITIAL);

  return (
    <div className="stack">
      {!file && <UploadDropzone extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} onFiles={queue.add} title="Drop a photo here or click to choose" />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {loadError && <ErrorMessage>{loadError}</ErrorMessage>}
      {file && !bitmap && !loadError && <ProcessingState label="Opening your photo…" />}
      {file && bitmap && (
        <>
          <div className="row row-between">
            <span className="file-name" title={file.name}>
              {file.name} · {bitmap.width} × {bitmap.height} px
            </span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={queue.clear} disabled={running}>
              Choose another photo
            </button>
          </div>
          <div className="editor-layout">
            <div className="editor-stage" style={{ background: 'var(--bg-sunken)' }}>
              <CropSelector
                width={previewSize?.w ?? 1}
                height={previewSize?.h ?? 1}
                rect={cropPx ?? { x: 0, y: 0, w: 0, h: 0 }}
                ratio={ratio}
                label="Crop area"
                hidden={!cropping || !cropPx}
                onChange={(r) => previewSize && patch({ crop: { x: r.x / previewSize.w, y: r.y / previewSize.h, w: r.w / previewSize.w, h: r.h / previewSize.h } })}
              >
                <canvas ref={previewRef} role="img" aria-label="Preview of your edited photo" />
              </CropSelector>
            </div>

            <div className="editor-panel stack">
              <Segmented
                label="Tools"
                value={tab}
                onChange={chooseTab}
                options={[
                  { value: 'adjust', label: 'Adjust' },
                  { value: 'filters', label: 'Filters' },
                  { value: 'transform', label: 'Rotate' },
                  { value: 'crop', label: 'Crop' },
                  { value: 'text', label: 'Text' },
                ]}
              />

              {tab === 'adjust' && (
                <div className="stack-sm">
                  {ADJUST_CONTROLS.map((c) => (
                    <RangeField key={c.key} label={c.label} value={edit.adjustments[c.key]} min={c.min} max={c.max} onChange={(v) => adjust(c.key, v)} format={(v) => `${v}${c.unit ?? ''}`} />
                  ))}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => patch({ adjustments: NEUTRAL })} disabled={isNeutral(edit.adjustments, 'none')}>
                    Reset adjustments
                  </button>
                </div>
              )}

              {tab === 'filters' && <FilterThumbs bitmap={bitmap} current={edit.filter} onPick={(f) => patch({ filter: f })} />}

              {tab === 'transform' && (
                <div className="stack-sm">
                  <div className="toolbar">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => patch({ turns: (edit.turns + 3) % 4, crop: null })}>
                      <Icon name="rotate-ccw" size={14} /> Rotate left
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => patch({ turns: (edit.turns + 1) % 4, crop: null })}>
                      <Icon name="rotate" size={14} /> Rotate right
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => patch({ flipH: !edit.flipH })} aria-pressed={edit.flipH}>
                      <Icon name="flip" size={14} /> Flip horizontally
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => patch({ flipV: !edit.flipV })} aria-pressed={edit.flipV}>
                      <Icon name="arrow-down-up" size={14} /> Flip vertically
                    </button>
                  </div>
                  <RangeField label="Straighten" value={edit.straighten} min={-45} max={45} step={0.5} onChange={(v) => patch({ straighten: v, crop: null })} format={(v) => `${v}°`} />
                  <p className="hint">Straightening zooms in slightly so no empty corners show.</p>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => patch({ turns: 0, flipH: false, flipV: false, straighten: 0, crop: null })}>
                    Reset rotation
                  </button>
                </div>
              )}

              {tab === 'crop' && (
                <div className="stack-sm">
                  <SelectField
                    label="Shape"
                    value={ratioId}
                    onChange={(id) => {
                      setRatioId(id);
                      startCrop(id === 'free' ? null : Number(id));
                    }}
                    options={CROP_RATIOS}
                  />
                  <p className="hint">Drag the box to move it and the corner dot to resize. Switch tabs to see the cropped result.</p>
                  <div className="toolbar">
                    {edit.crop ? (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => patch({ crop: null })}>
                        Remove crop
                      </button>
                    ) : (
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => startCrop(ratio)}>
                        Add a crop box
                      </button>
                    )}
                  </div>
                </div>
              )}

              {tab === 'text' && (
                <div className="stack-sm">
                  <Field label="Text on the photo" hint="Leave empty for no text.">
                    {(id) => <input id={id} className="input" value={edit.text} maxLength={120} onChange={(e) => patch({ text: e.target.value })} />}
                  </Field>
                  <RangeField label="Size" value={edit.textSize} min={2} max={30} onChange={(v) => patch({ textSize: v })} format={(v) => `${v}% of height`} />
                  <SelectField label="Position" value={edit.textPlace} onChange={(v) => patch({ textPlace: v })} options={PLACES} />
                  <div className="row" style={{ gap: 20, alignItems: 'center' }}>
                    <ColorField label="Colour" value={edit.textColour} onChange={(v) => patch({ textColour: v })} />
                    <CheckField label="Bold" checked={edit.textBold} onChange={(v) => patch({ textBold: v })} />
                    <CheckField label="Outline" checked={edit.textOutline} onChange={(v) => patch({ textOutline: v })} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="options-grid">
            <SelectField label="Save as" value={format} onChange={setFormat} options={FORMATS.map((f) => ({ value: f.value, label: f.label }))} />
            {format !== 'png' && <RangeField label="Quality" value={quality} min={40} max={100} onChange={setQuality} format={(v) => `${v}%`} />}
          </div>
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={exportPicture} disabled={running}>
              <Icon name="download" size={18} />
              Create edited photo
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => { setEdit(INITIAL); setRatioId('free'); }} disabled={running || !changed}>
              Reset all edits
            </button>
          </div>
          {running && <ProcessingState label="Creating your photo…" />}
          {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
          {done && (
            <ResultPanel title="Your edited photo is ready">
              <p className="muted">
                {done.width} × {done.height} px · {formatBytes(done.blob.size)}
              </p>
              {!changed && <Notice>No edits were made, so this is a copy of your photo in the chosen format.</Notice>}
              <div className="toolbar">
                <DownloadButton blob={done.blob} name={done.name} label={`Download ${done.name}`} />
                <ResetButton onClick={queue.clear} label="Edit another photo" />
              </div>
            </ResultPanel>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoEditor;
