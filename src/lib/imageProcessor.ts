/**
 * Image pipeline shared by the Web Worker and the main-thread fallback:
 * decode -> crop -> resize -> flip/rotate -> encode.
 */
export type OutputMime = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImagePlan {
  mime: OutputMime;
  /** 0-1, ignored for PNG. */
  quality: number;
  /** Fill colour for formats without alpha (JPEG). */
  background: string;
  crop?: { x: number; y: number; width: number; height: number };
  /** Target size of the (cropped) image before rotation. Aspect ratio is the caller's responsibility. */
  width?: number;
  height?: number;
  /** Scale factor applied to the (cropped) source size, e.g. 0.5. */
  scale?: number;
  /** Fit inside this box preserving aspect ratio (may upscale). Either side may be omitted. */
  fit?: { width?: number; height?: number };
  /** Downscale (never upscale) so the longest side is at most this many pixels. */
  maxDimension?: number;
  /** Degrees clockwise. */
  rotate?: number;
  flipH?: boolean;
  flipV?: boolean;
}

export interface ImageResult {
  blob: Blob;
  width: number;
  height: number;
}

export const MAX_SIDE = 16_000;
export const MAX_PIXELS = 100_000_000;

export type Canvas2D = OffscreenCanvas | HTMLCanvasElement;
export type Ctx2D = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

export function makeCanvas(w: number, h: number): Canvas2D {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export async function canvasToBlob(canvas: Canvas2D, mime: OutputMime, quality: number): Promise<Blob> {
  const q = mime === 'image/png' ? undefined : quality;
  const blob =
    'convertToBlob' in canvas
      ? await canvas.convertToBlob({ type: mime, quality: q })
      : await new Promise<Blob | null>((res) => canvas.toBlob(res, mime, q));
  if (!blob) throw new Error('The browser could not encode this image.');
  if (blob.type !== mime) {
    const wanted = mime.split('/')[1].toUpperCase();
    throw new Error(
      `Your browser cannot save ${wanted} images. Try a different output format or a current version of Chrome, Edge or Firefox.`,
    );
  }
  return blob;
}

export async function decode(source: Blob): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(source);
  } catch {
    throw new Error('This file could not be read as an image. It may be corrupted or in an unsupported format.');
  }
}

export function computeSize(plan: ImagePlan, srcW: number, srcH: number): { w: number; h: number } {
  let w = plan.width ?? srcW;
  let h = plan.height ?? srcH;
  if (plan.scale) {
    w = srcW * plan.scale;
    h = srcH * plan.scale;
  }
  if (plan.fit) {
    const k = Math.min(plan.fit.width ? plan.fit.width / srcW : Infinity, plan.fit.height ? plan.fit.height / srcH : Infinity);
    if (Number.isFinite(k)) {
      w = srcW * k;
      h = srcH * k;
    }
  }
  if (plan.maxDimension && Math.max(w, h) > plan.maxDimension) {
    const k = plan.maxDimension / Math.max(w, h);
    w *= k;
    h *= k;
  }
  return { w: Math.max(1, Math.round(w)), h: Math.max(1, Math.round(h)) };
}

export async function runPipeline(bitmap: ImageBitmap, plan: ImagePlan): Promise<ImageResult> {
  const crop = plan.crop ?? { x: 0, y: 0, width: bitmap.width, height: bitmap.height };
  const { w, h } = computeSize(plan, Math.round(crop.width), Math.round(crop.height));
  const angle = ((plan.rotate ?? 0) * Math.PI) / 180;
  const cos = Math.abs(Math.cos(angle));
  const sin = Math.abs(Math.sin(angle));
  const cw = Math.max(1, Math.round(Math.round((w * cos + h * sin) * 1000) / 1000));
  const ch = Math.max(1, Math.round(Math.round((w * sin + h * cos) * 1000) / 1000));

  if (cw > MAX_SIDE || ch > MAX_SIDE || cw * ch > MAX_PIXELS) {
    throw new Error(
      `The result would be ${cw} × ${ch} px, which is larger than this browser tool can safely create (max ${MAX_SIDE.toLocaleString('en-US')} px per side).`,
    );
  }

  const canvas = makeCanvas(cw, ch);
  const ctx = canvas.getContext('2d') as Ctx2D | null;
  if (!ctx) throw new Error('Could not create a drawing surface. The image may be too large for this device.');
  if (plan.mime === 'image/jpeg') {
    ctx.fillStyle = plan.background;
    ctx.fillRect(0, 0, cw, ch);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate(angle);
  ctx.scale(plan.flipH ? -1 : 1, plan.flipV ? -1 : 1);
  ctx.drawImage(bitmap, crop.x, crop.y, crop.width, crop.height, -w / 2, -h / 2, w, h);

  const blob = await canvasToBlob(canvas, plan.mime, plan.quality);
  return { blob, width: cw, height: ch };
}

export async function processOnCurrentThread(file: Blob, plan: ImagePlan): Promise<ImageResult> {
  const bitmap = await decode(file);
  try {
    return await runPipeline(bitmap, plan);
  } finally {
    bitmap.close();
  }
}
