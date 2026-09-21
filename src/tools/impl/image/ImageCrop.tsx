import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ColorField, NumberField, RangeField, SelectField } from '@/components/tool/Fields';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { ResetButton, ResultFiles, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { outputName } from '@/lib/format';
import { useFileQueue, useObjectUrl, useTask } from '@/lib/hooks';
import { processImage } from '@/lib/image';
import { FORMAT_OPTIONS, FORMATS, sameFormatAs, type FormatKey } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const RATIOS = [
  { value: 'free', label: 'Free' },
  { value: '1', label: '1:1 (square)' },
  { value: '1.3333', label: '4:3' },
  { value: '0.75', label: '3:4' },
  { value: '1.5', label: '3:2' },
  { value: '1.7778', label: '16:9' },
  { value: '0.5625', label: '9:16' },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const MIN = 8;

function fitRect(rect: Rect, ratio: number | null, W: number, H: number): Rect {
  if (!ratio) return rect;
  let w = Math.min(rect.w, W);
  let h = w / ratio;
  if (h > H) {
    h = H;
    w = h * ratio;
  }
  return { x: clamp(rect.x, 0, W - w), y: clamp(rect.y, 0, H - h), w, h };
}

const ImageCrop: ToolImplementation = () => {
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: 1 }, false);
  const file = queue.items[0]?.file ?? null;
  const url = useObjectUrl(file);
  const imgRef = useRef<HTMLImageElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [ratioKey, setRatioKey] = useState('free');
  const [scale, setScale] = useState(1);
  const [format, setFormat] = useState<FormatKey | 'same'>('same');
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState('#ffffff');
  const [loadError, setLoadError] = useState<string | null>(null);
  const task = useTask<{ name: string; blob: Blob; note: string }>();
  const drag = useRef<{ mode: 'move' | 'resize'; px: number; py: number; start: Rect } | null>(null);

  const ratio = ratioKey === 'free' ? null : Number(ratioKey);

  useEffect(() => {
    setNatural(null);
    setLoadError(null);
    task.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (img && img.naturalWidth) setScale(img.clientWidth / img.naturalWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const onLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const W = img.naturalWidth;
    const H = img.naturalHeight;
    setNatural({ w: W, h: H });
    setRatioKey('free');
    setRect({ x: Math.round(W * 0.1), y: Math.round(H * 0.1), w: Math.round(W * 0.8), h: Math.round(H * 0.8) });
    measure();
  };

  const applyRatio = (key: string) => {
    setRatioKey(key);
    if (!natural || key === 'free') return;
    const r = Number(key);
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    let w = rect.w;
    let h = w / r;
    if (h > natural.h) {
      h = natural.h;
      w = h * r;
    }
    setRect({ x: clamp(cx - w / 2, 0, natural.w - w), y: clamp(cy - h / 2, 0, natural.h - h), w, h });
  };

  const onPointerDown = (mode: 'move' | 'resize') => (e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { mode, px: e.clientX, py: e.clientY, start: rect };
  };

  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || !natural) return;
    const dx = (e.clientX - d.px) / scale;
    const dy = (e.clientY - d.py) / scale;
    if (d.mode === 'move') {
      setRect({ ...d.start, x: clamp(d.start.x + dx, 0, natural.w - d.start.w), y: clamp(d.start.y + dy, 0, natural.h - d.start.h) });
    } else {
      let w = clamp(d.start.w + dx, MIN, natural.w - d.start.x);
      let h = ratio ? w / ratio : clamp(d.start.h + dy, MIN, natural.h - d.start.y);
      if (ratio && d.start.y + h > natural.h) {
        h = natural.h - d.start.y;
        w = h * ratio;
      }
      setRect({ ...d.start, w, h });
    }
  };

  const endDrag = () => {
    drag.current = null;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!natural) return;
    const step = e.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    setRect((r) => ({ ...r, x: clamp(r.x + m[0], 0, natural.w - r.w), y: clamp(r.y + m[1], 0, natural.h - r.h) }));
  };

  const setField = (key: keyof Rect, raw: number | '') => {
    if (!natural || raw === '') return;
    let next = { ...rect, [key]: raw };
    if (key === 'w') next.w = clamp(raw, MIN, natural.w);
    if (key === 'h') next.h = clamp(raw, MIN, natural.h);
    if (ratio && key === 'w') next.h = next.w / ratio;
    if (ratio && key === 'h') next.w = next.h * ratio;
    next = fitRect(next, ratio, natural.w, natural.h);
    next.x = clamp(next.x, 0, natural.w - next.w);
    next.y = clamp(next.y, 0, natural.h - next.h);
    setRect(next);
  };

  const crop = () =>
    task.run(async () => {
      if (!file || !natural) throw new Error('Add an image first.');
      const key = format === 'same' ? sameFormatAs(file) : format;
      const fmt = FORMATS[key];
      const c = { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.max(1, Math.round(rect.w)), height: Math.max(1, Math.round(rect.h)) };
      const result = await processImage(file, { mime: fmt.mime, quality: quality / 100, background, crop: c });
      return { name: outputName(file.name, fmt.ext, '-cropped'), blob: result.blob, note: `${result.width} × ${result.height} px` };
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  const running = task.state.status === 'running';

  return (
    <div className="stack">
      {!file && (
        <UploadDropzone extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} onFiles={queue.add} />
      )}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {file && url && (
        <>
          {loadError && <ErrorMessage>{loadError}</ErrorMessage>}
          <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
            <div className="crop-stage">
              <img
                ref={imgRef}
                src={url}
                alt={`Preview of ${file.name} with crop area`}
                onLoad={onLoad}
                onError={() => setLoadError('This file could not be read as an image. It may be corrupted or in an unsupported format.')}
                draggable={false}
              />
              {natural && (
                <div
                  className="crop-box"
                  role="group"
                  tabIndex={0}
                  aria-label={`Crop area: ${Math.round(rect.w)} by ${Math.round(rect.h)} pixels at ${Math.round(rect.x)}, ${Math.round(rect.y)}. Use arrow keys to move.`}
                  style={{ left: rect.x * scale, top: rect.y * scale, width: rect.w * scale, height: rect.h * scale }}
                  onPointerDown={onPointerDown('move')}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onKeyDown={onKeyDown}
                >
                  <span className="crop-handle" onPointerDown={onPointerDown('resize')} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} aria-hidden="true" />
                </div>
              )}
            </div>
          </div>

          {natural && (
            <>
              <p className="hint">
                Original: {natural.w} × {natural.h} px. Drag the box to move it, drag the corner to resize, or type exact values.
              </p>
              <div className="options-grid">
                <SelectField label="Aspect ratio" value={ratioKey} options={RATIOS} onChange={applyRatio} />
                <NumberField label="X (px)" value={Math.round(rect.x)} min={0} max={natural.w} onChange={(v) => setField('x', v)} />
                <NumberField label="Y (px)" value={Math.round(rect.y)} min={0} max={natural.h} onChange={(v) => setField('y', v)} />
                <NumberField label="Width (px)" value={Math.round(rect.w)} min={MIN} max={natural.w} onChange={(v) => setField('w', v)} />
                <NumberField label="Height (px)" value={Math.round(rect.h)} min={MIN} max={natural.h} onChange={(v) => setField('h', v)} />
                <SelectField label="Output format" value={format} onChange={setFormat} options={[{ value: 'same', label: 'Same as original' }, ...FORMAT_OPTIONS]} />
                <RangeField label="Quality (JPG/WebP)" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
                <ColorField label="Background (JPG)" value={background} onChange={setBackground} />
              </div>
              <div className="toolbar">
                <button type="button" className="btn btn-primary btn-lg" onClick={crop} disabled={running}>
                  <Icon name="crop" size={18} />
                  Crop image
                </button>
                <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
                  Choose another image
                </button>
              </div>
            </>
          )}
        </>
      )}
      {running && <ProcessingState label="Cropping…" />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel>
          <ResultFiles files={[task.state.result]} zipName="cropped.zip" />
          <ResetButton onClick={reset} />
        </ResultPanel>
      )}
    </div>
  );
};

export default ImageCrop;
