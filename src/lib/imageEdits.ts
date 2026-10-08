/**
 * Image edits that run on the main thread with canvas: watermark, enlarge, SVG conversion.
 * The pixel-level region effects (blur, pixelate, fill) and all size/position maths are pure,
 * so they can be tested in Node without a canvas.
 */
import {
  MAX_PIXELS, MAX_SIDE, canvasToBlob, decode, makeCanvas, type Canvas2D, type Ctx2D, type ImageResult, type OutputMime,
} from './imageProcessor';

export class ImageEditError extends Error {}

function ctxOf(canvas: Canvas2D): Ctx2D {
  const ctx = canvas.getContext('2d') as Ctx2D | null;
  if (!ctx) throw new ImageEditError('Could not create a drawing surface. The image may be too large for this device.');
  return ctx;
}

function assertSize(w: number, h: number) {
  if (w > MAX_SIDE || h > MAX_SIDE || w * h > MAX_PIXELS) {
    throw new ImageEditError(`The result would be ${w} × ${h} px, which is larger than this browser tool can safely create (max ${MAX_SIDE.toLocaleString('en-US')} px per side).`);
  }
}

// ---------- Watermark ----------

export type MarkPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

/** Top-left corner of a box of size (w, h) placed at `position` inside a canvas, `margin` px from the edges. */
export function anchorBox(position: MarkPosition, canvasW: number, canvasH: number, w: number, h: number, margin: number) {
  const x = position.endsWith('left') ? margin : position.endsWith('right') ? canvasW - w - margin : (canvasW - w) / 2;
  const y = position.startsWith('top') ? margin : position.startsWith('bottom') ? canvasH - h - margin : (canvasH - h) / 2;
  return { x, y };
}

export interface WatermarkSpec {
  mark: { kind: 'text'; text: string; color: string; bold: boolean; sizePct: number } | { kind: 'image'; bitmap: ImageBitmap; sizePct: number };
  opacity: number;
  position: MarkPosition;
  layout: 'single' | 'tile';
  /** Degrees clockwise; used for tiled marks and for single marks. */
  angle: number;
}

/** Draws the watermark on a canvas that already holds the picture. `sizePct` is relative to the image width. */
export function drawWatermark(ctx: Ctx2D, w: number, h: number, spec: WatermarkSpec) {
  const margin = Math.round(Math.min(w, h) * 0.03);
  let markW: number;
  let markH: number;
  let paint: () => void;
  if (spec.mark.kind === 'text') {
    const { text, color, bold, sizePct } = spec.mark;
    const px = Math.max(8, Math.round((w * sizePct) / 100));
    ctx.font = `${bold ? '700 ' : ''}${px}px system-ui, "Segoe UI", Roboto, "Noto Sans", sans-serif`;
    ctx.textBaseline = 'alphabetic';
    markW = ctx.measureText(text).width;
    markH = px;
    ctx.fillStyle = color;
    paint = () => ctx.fillText(text, 0, markH * 0.8);
  } else {
    const { bitmap, sizePct } = spec.mark;
    markW = Math.max(8, (w * sizePct) / 100);
    markH = (bitmap.height / bitmap.width) * markW;
    paint = () => ctx.drawImage(bitmap, 0, 0, markW, markH);
  }
  ctx.save();
  ctx.globalAlpha = spec.opacity;
  const place = (x: number, y: number) => {
    ctx.save();
    ctx.translate(x + markW / 2, y + markH / 2);
    ctx.rotate((spec.angle * Math.PI) / 180);
    ctx.translate(-markW / 2, -markH / 2);
    paint();
    ctx.restore();
  };
  if (spec.layout === 'single') {
    const at = anchorBox(spec.position, w, h, markW, markH, margin);
    place(at.x, at.y);
  } else {
    const stepX = markW * 1.5 + margin;
    const stepY = markH * 3;
    const cols = Math.ceil(w / stepX) + 2;
    const rows = Math.ceil(h / stepY) + 2;
    if (cols * rows > 600) throw new ImageEditError('The watermark is too small to tile. Use a larger size or a single mark.');
    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) place(c * stepX + (r % 2 === 0 ? 0 : stepX / 2), r * stepY);
    }
  }
  ctx.restore();
}

export async function watermarkImage(file: Blob, spec: WatermarkSpec, out: { mime: OutputMime; quality: number; background: string }): Promise<ImageResult> {
  const bitmap = await decode(file);
  try {
    assertSize(bitmap.width, bitmap.height);
    const canvas = makeCanvas(bitmap.width, bitmap.height);
    const ctx = ctxOf(canvas);
    if (out.mime === 'image/jpeg') {
      ctx.fillStyle = out.background;
      ctx.fillRect(0, 0, bitmap.width, bitmap.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    drawWatermark(ctx, bitmap.width, bitmap.height, spec);
    return { blob: await canvasToBlob(canvas, out.mime, out.quality), width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}

// ---------- Enlarge ----------

export type EnlargeSpec = { mode: 'factor'; factor: number } | { mode: 'width'; width: number };

export function enlargedSize(srcW: number, srcH: number, spec: EnlargeSpec) {
  const k = spec.mode === 'factor' ? spec.factor : spec.width / srcW;
  return { w: Math.max(1, Math.round(srcW * k)), h: Math.max(1, Math.round(srcH * k)) };
}

type PicaInstance = import('pica').Pica;
type PicaConstructor = new (options?: import('pica').PicaOptions) => PicaInstance;
let picaInstance: PicaInstance | null = null;

/** Smooth, sharp enlargement with Lanczos resampling. This adds no new detail; it is not AI upscaling. */
export async function enlargeImage(file: Blob, spec: EnlargeSpec, out: { mime: OutputMime; quality: number; background: string; sharpen: boolean }): Promise<ImageResult> {
  const bitmap = await decode(file);
  try {
    const { w, h } = enlargedSize(bitmap.width, bitmap.height, spec);
    if (w <= bitmap.width && h <= bitmap.height) throw new ImageEditError('Choose a size larger than the original. Use the Image Resizer to make images smaller.');
    assertSize(w, h);
    const source = document.createElement('canvas');
    source.width = bitmap.width;
    source.height = bitmap.height;
    source.getContext('2d')?.drawImage(bitmap, 0, 0);
    const target = document.createElement('canvas');
    target.width = w;
    target.height = h;
    if (out.mime === 'image/jpeg') {
      const c = ctxOf(target);
      c.fillStyle = out.background;
      c.fillRect(0, 0, w, h);
    }
    if (!picaInstance) {
      const mod = (await import('pica')) as unknown as { default?: PicaConstructor } & PicaConstructor;
      const Pica = mod.default ?? mod;
      // No WASM: it would need a looser Content-Security-Policy, and the JS path is fast enough.
      picaInstance = new Pica({ features: ['js', 'ww'] });
    }
    await picaInstance.resize(source, target, {
      quality: 3,
      ...(out.sharpen ? { unsharpAmount: 80, unsharpRadius: 0.6, unsharpThreshold: 2 } : {}),
    });
    return { blob: await canvasToBlob(target, out.mime, out.quality), width: w, height: h };
  } finally {
    bitmap.close();
  }
}

// ---------- Blur / pixelate / cover regions (pure pixel maths) ----------

export interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}
export type RegionEffect = 'blur' | 'pixelate' | 'cover';
export interface Pixels {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/** Clamps a region to the image and rounds it to whole pixels. Returns null if nothing is left. */
export function clampRegion(r: Region, width: number, height: number): Region | null {
  const x0 = Math.max(0, Math.floor(r.x));
  const y0 = Math.max(0, Math.floor(r.y));
  const x1 = Math.min(width, Math.ceil(r.x + r.w));
  const y1 = Math.min(height, Math.ceil(r.y + r.h));
  return x1 - x0 >= 1 && y1 - y0 >= 1 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
}

function pixelate(p: Pixels, r: Region, block: number) {
  for (let by = r.y; by < r.y + r.h; by += block) {
    for (let bx = r.x; bx < r.x + r.w; bx += block) {
      const x1 = Math.min(bx + block, r.x + r.w);
      const y1 = Math.min(by + block, r.y + r.h);
      let sr = 0, sg = 0, sb = 0, sa = 0, n = 0;
      for (let y = by; y < y1; y++) {
        for (let x = bx; x < x1; x++) {
          const i = (y * p.width + x) * 4;
          sr += p.data[i]; sg += p.data[i + 1]; sb += p.data[i + 2]; sa += p.data[i + 3]; n++;
        }
      }
      for (let y = by; y < y1; y++) {
        for (let x = bx; x < x1; x++) {
          const i = (y * p.width + x) * 4;
          p.data[i] = sr / n; p.data[i + 1] = sg / n; p.data[i + 2] = sb / n; p.data[i + 3] = sa / n;
        }
      }
    }
  }
}

/** Three passes of a separable box blur, reading only pixels inside the region so nothing leaks in from outside. */
function boxBlur(p: Pixels, r: Region, radius: number) {
  const { w, h } = r;
  const buf = new Float32Array(w * h * 4);
  const tmp = new Float32Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const s = ((r.y + y) * p.width + (r.x + x)) * 4;
      const d = (y * w + x) * 4;
      buf[d] = p.data[s]; buf[d + 1] = p.data[s + 1]; buf[d + 2] = p.data[s + 2]; buf[d + 3] = p.data[s + 3];
    }
  }
  const pass = (src: Float32Array, dst: Float32Array, horizontal: boolean) => {
    const len = horizontal ? w : h;
    const lines = horizontal ? h : w;
    const window = radius * 2 + 1;
    for (let line = 0; line < lines; line++) {
      const at = (k: number) => (horizontal ? (line * w + Math.min(len - 1, Math.max(0, k))) : (Math.min(len - 1, Math.max(0, k)) * w + line)) * 4;
      for (let c = 0; c < 4; c++) {
        let sum = 0;
        for (let k = -radius; k <= radius; k++) sum += src[at(k) + c];
        for (let k = 0; k < len; k++) {
          const out = (horizontal ? line * w + k : k * w + line) * 4 + c;
          dst[out] = sum / window;
          sum += src[at(k + radius + 1) + c] - src[at(k - radius) + c];
        }
      }
    }
  };
  for (let i = 0; i < 3; i++) {
    pass(buf, tmp, true);
    pass(tmp, buf, false);
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const d = ((r.y + y) * p.width + (r.x + x)) * 4;
      const s = (y * w + x) * 4;
      p.data[d] = buf[s]; p.data[d + 1] = buf[s + 1]; p.data[d + 2] = buf[s + 2]; p.data[d + 3] = buf[s + 3];
    }
  }
}

/**
 * Applies an effect to each region, in place. `strength` is 1-100 and is relative to the smaller side of
 * each region, so a face-sized box and a large box both get an effect of the same visual strength.
 */
export function applyRegions(p: Pixels, regions: Region[], effect: RegionEffect, strength: number) {
  for (const raw of regions) {
    const r = clampRegion(raw, p.width, p.height);
    if (!r) continue;
    const side = Math.min(r.w, r.h);
    if (effect === 'cover') {
      for (let y = r.y; y < r.y + r.h; y++) {
        for (let x = r.x; x < r.x + r.w; x++) {
          const i = (y * p.width + x) * 4;
          p.data[i] = 0; p.data[i + 1] = 0; p.data[i + 2] = 0; p.data[i + 3] = 255;
        }
      }
    } else if (effect === 'pixelate') pixelate(p, r, Math.max(2, Math.round((side * strength) / 100 * 0.25)));
    else boxBlur(p, r, Math.max(2, Math.round((side * strength) / 100 * 0.2)));
  }
}

export async function redactImage(file: Blob, regions: Region[], effect: RegionEffect, strength: number, out: { mime: OutputMime; quality: number; background: string }): Promise<ImageResult> {
  const bitmap = await decode(file);
  try {
    assertSize(bitmap.width, bitmap.height);
    const canvas = makeCanvas(bitmap.width, bitmap.height);
    const ctx = ctxOf(canvas);
    if (out.mime === 'image/jpeg') {
      ctx.fillStyle = out.background;
      ctx.fillRect(0, 0, bitmap.width, bitmap.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    const image = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
    applyRegions(image, regions, effect, strength);
    ctx.putImageData(image, 0, 0);
    return { blob: await canvasToBlob(canvas, out.mime, out.quality), width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}

// ---------- SVG ----------

/** Reads the intended size from the root <svg> tag: width/height in px or unitless, else the viewBox. */
export function svgIntrinsicSize(svg: string): { width: number; height: number } | null {
  const tag = /<svg\b[^>]*>/i.exec(svg)?.[0];
  if (!tag) return null;
  const attr = (name: string) => new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i').exec(tag)?.[1];
  const len = (v?: string) => {
    const m = v ? /^\s*([\d.]+)\s*(px)?\s*$/i.exec(v) : null;
    return m ? Number(m[1]) : null;
  };
  const w = len(attr('width'));
  const h = len(attr('height'));
  if (w && h) return { width: w, height: h };
  const vb = attr('viewBox')?.trim().split(/[\s,]+/).map(Number);
  if (vb && vb.length === 4 && vb[2] > 0 && vb[3] > 0) {
    if (w) return { width: w, height: (w * vb[3]) / vb[2] };
    if (h) return { width: (h * vb[2]) / vb[3], height: h };
    return { width: vb[2], height: vb[3] };
  }
  return null;
}

export type SvgSize = { mode: 'scale'; scale: number } | { mode: 'width'; width: number };

/** Draws an SVG file to a bitmap. The SVG is shown through an <img>, so scripts inside it never run. */
export async function rasterizeSvg(file: Blob, size: SvgSize, out: { mime: OutputMime; quality: number; background: string }): Promise<ImageResult> {
  let text = await file.text();
  if (!/<svg\b/i.test(text)) throw new ImageEditError('This file does not look like an SVG image.');
  if (!/<svg\b[^>]*\sxmlns\s*=/i.test(text)) text = text.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  const base = svgIntrinsicSize(text) ?? { width: 300, height: 150 };
  const k = size.mode === 'scale' ? size.scale : size.width / base.width;
  const w = Math.max(1, Math.round(base.width * k));
  const h = Math.max(1, Math.round(base.height * k));
  assertSize(w, h);

  const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }));
  try {
    const img = new Image();
    img.src = url;
    try {
      await img.decode();
    } catch {
      throw new ImageEditError('This SVG could not be drawn. It may be invalid or use features browsers do not support.');
    }
    const canvas = makeCanvas(w, h);
    const ctx = ctxOf(canvas);
    if (out.mime === 'image/jpeg') {
      ctx.fillStyle = out.background;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.drawImage(img, 0, 0, w, h);
    return { blob: await canvasToBlob(canvas, out.mime, out.quality), width: w, height: h };
  } finally {
    URL.revokeObjectURL(url);
  }
}
