/** Animated GIF creation (using the small, MIT-licensed gifenc encoder) plus helpers that are testable without a browser. */
import { GIFEncoder, applyPalette, quantize } from 'gifenc';
import { tr } from '@/i18n/translate';

export const MAX_GIF_FRAMES = 100;
export const MIN_DELAY_MS = 20;
export const MAX_DELAY_MS = 60_000;
export const MAX_GIF_PIXELS = 160_000_000; // width x height x frames

export class GifError extends Error {}

export interface GifFrame {
  /** RGBA pixels, width x height x 4. */
  rgba: Uint8ClampedArray;
  delayMs: number;
}

export interface GifOptions {
  width: number;
  height: number;
  /** Times the animation plays: 0 = forever, 1 = once, n = n times. */
  plays: number;
  /** Palette size per frame: 256, 128, 64, 32 or 16. */
  colors: number;
  /** Keep fully transparent pixels transparent (otherwise frames are flattened before they reach the encoder). */
  transparent: boolean;
}

/** Frames produced one at a time, so a long GIF never needs every frame in memory at once. */
export interface LazyFrames {
  count: number;
  get(index: number): Promise<GifFrame>;
}

export const clampDelay = (ms: number) => Math.min(MAX_DELAY_MS, Math.max(MIN_DELAY_MS, Math.round(ms)));

export async function encodeGif(source: GifFrame[] | LazyFrames, opts: GifOptions, onProgress?: (done: number, total: number) => void): Promise<Uint8Array> {
  const frames: LazyFrames = Array.isArray(source) ? { count: source.length, get: async (i) => source[i] } : source;
  if (frames.count === 0) throw new GifError(tr('err.gif.noImages'));
  if (frames.count > MAX_GIF_FRAMES) throw new GifError(tr('err.gif.tooManyFrames', { max: MAX_GIF_FRAMES }));
  if (!(Number.isInteger(opts.width) && Number.isInteger(opts.height) && opts.width >= 1 && opts.height >= 1)) throw new GifError(tr('err.gif.sizeNotInteger'));
  if (opts.width > 65_535 || opts.height > 65_535) throw new GifError(tr('err.gif.tooLarge'));
  if (opts.width * opts.height * frames.count > MAX_GIF_PIXELS) throw new GifError(tr('err.gif.tooLargeToBuild'));
  if (![256, 128, 64, 32, 16].includes(opts.colors)) throw new GifError(tr('err.gif.colours'));
  const expected = opts.width * opts.height * 4;
  const gif = GIFEncoder();
  const repeat = opts.plays <= 0 ? 0 : opts.plays === 1 ? -1 : opts.plays - 1;
  for (let i = 0; i < frames.count; i++) {
    onProgress?.(i, frames.count);
    const { rgba, delayMs } = await frames.get(i);
    if (rgba.length !== expected) throw new GifError(tr('err.gif.frameMismatch'));
    if (opts.transparent) {
      const palette = quantize(rgba, opts.colors, { format: 'rgba4444', oneBitAlpha: true });
      const index = applyPalette(rgba, palette, 'rgba4444');
      const transparentIndex = palette.findIndex((c) => c.length > 3 && c[3] === 0);
      gif.writeFrame(index, opts.width, opts.height, { palette, delay: clampDelay(delayMs), repeat, transparent: transparentIndex >= 0, transparentIndex: Math.max(0, transparentIndex) });
    } else {
      const palette = quantize(rgba, opts.colors);
      const index = applyPalette(rgba, palette);
      gif.writeFrame(index, opts.width, opts.height, { palette, delay: clampDelay(delayMs), repeat });
    }
    // Let the page breathe between frames so the progress bar can move.
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  gif.finish();
  onProgress?.(frames.count, frames.count);
  return gif.bytes();
}

// ---------- Geometry ----------

export type FitMode = 'contain' | 'cover' | 'stretch';

export interface FitRects {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

/** How to draw a source picture into an output frame: letterboxed, cropped to fill, or stretched. */
export function fitRects(srcW: number, srcH: number, dstW: number, dstH: number, mode: FitMode): FitRects {
  if (mode === 'stretch') return { sx: 0, sy: 0, sw: srcW, sh: srcH, dx: 0, dy: 0, dw: dstW, dh: dstH };
  const scale = mode === 'contain' ? Math.min(dstW / srcW, dstH / srcH) : Math.max(dstW / srcW, dstH / srcH);
  const dw = srcW * scale;
  const dh = srcH * scale;
  if (mode === 'contain') return { sx: 0, sy: 0, sw: srcW, sh: srcH, dx: (dstW - dw) / 2, dy: (dstH - dh) / 2, dw, dh };
  // cover: crop the source so that it fills the frame exactly
  const sw = dstW / scale;
  const sh = dstH / scale;
  return { sx: (srcW - sw) / 2, sy: (srcH - sh) / 2, sw, sh, dx: 0, dy: 0, dw: dstW, dh: dstH };
}

// ---------- Reading a GIF back (used to verify results) ----------

export interface GifInfo {
  version: 'GIF87a' | 'GIF89a';
  width: number;
  height: number;
  frames: number;
  delaysMs: number[];
  /** NETSCAPE loop count: 0 = forever, undefined = not looping (plays once). */
  loopCount: number | undefined;
  hasTransparency: boolean;
}

/** Walks the GIF blocks and returns its structure. Throws GifError when the data is not a valid GIF. */
export function parseGif(bytes: Uint8Array): GifInfo {
  const text = (a: number, b: number) => String.fromCharCode(...bytes.subarray(a, b));
  const header = text(0, 6);
  if (header !== 'GIF87a' && header !== 'GIF89a') throw new GifError(tr('err.gif.notGif'));
  const u16 = (i: number) => bytes[i] | (bytes[i + 1] << 8);
  const info: GifInfo = { version: header, width: u16(6), height: u16(8), frames: 0, delaysMs: [], loopCount: undefined, hasTransparency: false };
  let p = 13;
  if (bytes[10] & 0x80) p += 3 * (1 << ((bytes[10] & 7) + 1));
  const skipSubBlocks = () => {
    while (p < bytes.length && bytes[p] !== 0) p += bytes[p] + 1;
    p++;
  };
  let pendingDelay = 0;
  while (p < bytes.length) {
    const block = bytes[p++];
    if (block === 0x3b) return info; // trailer
    if (block === 0x21) {
      const label = bytes[p++];
      if (label === 0xf9) {
        pendingDelay = u16(p + 2) * 10;
        if (bytes[p + 1] & 1) info.hasTransparency = true;
      } else if (label === 0xff && text(p + 1, p + 12) === 'NETSCAPE2.0') {
        info.loopCount = u16(p + 14);
      }
      skipSubBlocks();
    } else if (block === 0x2c) {
      const packed = bytes[p + 8];
      p += 9;
      if (packed & 0x80) p += 3 * (1 << ((packed & 7) + 1));
      p++; // LZW minimum code size
      skipSubBlocks();
      info.frames++;
      info.delaysMs.push(pendingDelay);
      pendingDelay = 0;
    } else throw new GifError(tr('err.gif.damaged'));
  }
  throw new GifError(tr('err.gif.incomplete'));
}
