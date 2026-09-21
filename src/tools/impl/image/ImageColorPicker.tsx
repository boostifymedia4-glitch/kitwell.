import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { CopyButton, CopyRow } from '@/components/tool/CopyButton';
import { ErrorMessage, RejectionList } from '@/components/tool/Feedback';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { rgbToHex, rgbToHsl, type Rgb } from '@/lib/dev';
import { useFileQueue, useObjectUrl } from '@/lib/hooks';
import type { ToolImplementation } from '../../types';

const MAX_CANVAS = 4096;

interface EyeDropperCtor {
  new (): { open: () => Promise<{ sRGBHex: string }> };
}

/** Approximate dominant colours: bucket pixels to 4 bits per channel, then pick frequent, distinct buckets. */
function extractPalette(data: Uint8ClampedArray, count = 8): Rgb[] {
  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
  const stride = Math.max(1, Math.floor(data.length / 4 / 40000)) * 4;
  for (let i = 0; i < data.length; i += stride) {
    if (data[i + 3] < 128) continue;
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const b = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    b.n++;
    b.r += data[i];
    b.g += data[i + 1];
    b.b += data[i + 2];
    buckets.set(key, b);
  }
  const sorted = [...buckets.values()].sort((a, b) => b.n - a.n).map((b) => ({ r: Math.round(b.r / b.n), g: Math.round(b.g / b.n), b: Math.round(b.b / b.n) }));
  const picked: Rgb[] = [];
  for (const c of sorted) {
    if (picked.every((p) => Math.hypot(p.r - c.r, p.g - c.g, p.b - c.b) > 48)) picked.push(c);
    if (picked.length >= count) break;
  }
  return picked;
}

const ImageColorPicker: ToolImplementation = () => {
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: 1 }, false);
  const file = queue.items[0]?.file ?? null;
  const url = useObjectUrl(file);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState<Rgb | null>(null);
  const [palette, setPalette] = useState<Rgb[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sample = useCallback((x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    setColor({ r, g, b });
  }, []);

  useEffect(() => {
    setSize(null);
    setColor(null);
    setPalette([]);
    setError(null);
    if (!url) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const k = Math.min(1, MAX_CANVAS / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * k));
      const h = Math.max(1, Math.round(img.naturalHeight * k));
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d', { willReadFrequently: true });
      if (!canvas || !ctx) return;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      setSize({ w, h });
      const start = { x: Math.floor(w / 2), y: Math.floor(h / 2) };
      setPos(start);
      const [r, g, b] = ctx.getImageData(start.x, start.y, 1, 1).data;
      setColor({ r, g, b });
      setPalette(extractPalette(ctx.getImageData(0, 0, w, h).data));
    };
    img.onerror = () => !cancelled && setError('This file could not be read as an image. It may be corrupted or in an unsupported format.');
    img.src = url;
    return () => {
      cancelled = true;
    };
  }, [url]);

  const pick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = Math.min(canvas.width - 1, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width)));
    const y = Math.min(canvas.height - 1, Math.max(0, Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height)));
    setPos({ x, y });
    sample(x, y);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (!size) return;
    const step = e.shiftKey ? 10 : 1;
    const d: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = d[e.key];
    if (!m) return;
    e.preventDefault();
    const x = Math.min(size.w - 1, Math.max(0, pos.x + m[0]));
    const y = Math.min(size.h - 1, Math.max(0, pos.y + m[1]));
    setPos({ x, y });
    sample(x, y);
  };

  const EyeDropper = (typeof window !== 'undefined' ? (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper : undefined);
  const pickFromScreen = async () => {
    if (!EyeDropper) return;
    try {
      const { sRGBHex } = await new EyeDropper().open();
      const n = parseInt(sRGBHex.slice(1), 16);
      setColor({ r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 });
    } catch {
      /* user cancelled */
    }
  };

  const hex = color ? rgbToHex(color) : '';
  const hsl = color ? rgbToHsl(color) : null;

  return (
    <div className="stack">
      {!file && <UploadDropzone extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} onFiles={queue.add} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="two-col" hidden={!file}>
        <div className="stack-sm">
          <div className="preview-box">
            <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0, maxWidth: '100%' }}>
            <canvas
              ref={canvasRef}
              tabIndex={0}
              role="img"
              aria-label="Image to sample. Click a point, or use the arrow keys to move the sampling point."
              style={{ cursor: 'crosshair', maxWidth: '100%', height: 'auto', touchAction: 'none' }}
              onClick={pick}
              onKeyDown={onKeyDown}
            />
            {size && (
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                  width: 18,
                  height: 18,
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 1.5px #000',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  left: `calc(${(pos.x / size.w) * 100}% )`,
                  top: `calc(${(pos.y / size.h) * 100}% )`,
                }}
              />
            )}
            </div>
          </div>
          <p className="hint">Click the image or focus it and use the arrow keys (hold Shift for bigger steps).</p>
        </div>
        <div className="stack">
          {color && hsl && (
            <>
              <div className="swatch" style={{ background: hex }} role="img" aria-label={`Selected colour ${hex}`} />
              <CopyRow label="HEX" value={hex.toUpperCase()} />
              <CopyRow label="RGB" value={`rgb(${color.r}, ${color.g}, ${color.b})`} />
              <CopyRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </>
          )}
          {EyeDropper && (
            <button type="button" className="btn btn-secondary" onClick={pickFromScreen}>
              <Icon name="pipette" size={16} />
              Pick from anywhere on screen
            </button>
          )}
        </div>
      </div>
      {palette.length > 0 && (
        <div className="stack-sm">
          <span className="label">Dominant colours</span>
          <div className="palette">
            {palette.map((c) => {
              const h = rgbToHex(c);
              return (
                <button key={h} type="button" style={{ background: h }} title={h.toUpperCase()} aria-label={`Use ${h.toUpperCase()}`} onClick={() => setColor(c)} />
              );
            })}
          </div>
          <div className="toolbar">
            <CopyButton text={palette.map((c) => rgbToHex(c).toUpperCase()).join(', ')} label="Copy palette (HEX)" />
          </div>
        </div>
      )}
      {file && (
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={queue.clear}>
            Choose another image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageColorPicker;
