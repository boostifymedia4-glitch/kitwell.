/**
 * Pixel maths for the Photo Editor. Everything works on plain RGBA buffers, so it is testable in Node and
 * does not depend on canvas filters (which Safari does not support). Geometry (rotate, flip, crop, text)
 * is done with canvas drawing in the tool itself.
 */

export interface Pixels {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export interface Adjustments {
  /** -100..100 */
  brightness: number;
  /** -100..100 */
  contrast: number;
  /** -100..100 (-100 = black and white) */
  saturation: number;
  /** -180..180 degrees */
  hue: number;
  /** -100 (cooler) .. 100 (warmer) */
  temperature: number;
  /** 0..100 */
  sharpen: number;
  /** 0..20 pixels at the original size of a 1000 px wide picture */
  blur: number;
  /** 0..100 */
  vignette: number;
}

export const NEUTRAL: Adjustments = { brightness: 0, contrast: 0, saturation: 0, hue: 0, temperature: 0, sharpen: 0, blur: 0, vignette: 0 };

export type FilterId = 'none' | 'grayscale' | 'sepia' | 'vintage' | 'cool' | 'warm' | 'dramatic' | 'fade' | 'invert';

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'none', label: 'Original' },
  { id: 'grayscale', label: 'Black & white' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'cool', label: 'Cool' },
  { id: 'warm', label: 'Warm' },
  { id: 'dramatic', label: 'Dramatic' },
  { id: 'fade', label: 'Faded' },
  { id: 'invert', label: 'Negative' },
];

export const isNeutral = (a: Adjustments, filter: FilterId) => filter === 'none' && (Object.keys(NEUTRAL) as (keyof Adjustments)[]).every((k) => a[k] === NEUTRAL[k]);

const clamp255 = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

/** Size of the picture after rotating by `degrees` (a small straightening angle), scaled up so no empty corners show. */
export function straightenScale(width: number, height: number, degrees: number): number {
  const t = (Math.abs(degrees) * Math.PI) / 180;
  if (t === 0) return 1;
  const longSide = Math.max(width / height, height / width);
  return Math.cos(t) + Math.sin(t) * longSide;
}

/** Quarter turns (0-3, clockwise) change width and height places. */
export function turnedSize(width: number, height: number, quarterTurns: number): { width: number; height: number } {
  return quarterTurns % 2 === 0 ? { width, height } : { width: height, height: width };
}

function hueMatrix(deg: number): number[] {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  // Standard luminance-preserving hue rotation.
  return [
    0.213 + c * 0.787 - s * 0.213, 0.715 - c * 0.715 - s * 0.715, 0.072 - c * 0.072 + s * 0.928,
    0.213 - c * 0.213 + s * 0.143, 0.715 + c * 0.285 + s * 0.14, 0.072 - c * 0.072 - s * 0.283,
    0.213 - c * 0.213 - s * 0.787, 0.715 - c * 0.715 + s * 0.715, 0.072 + c * 0.928 + s * 0.072,
  ];
}

/** Per-pixel colour work: filter first, then the sliders on top of it. */
function colourPass(px: Pixels, adj: Adjustments, filter: FilterId) {
  const d = px.data;
  const brightness = adj.brightness * 2.55;
  const c = adj.contrast * 2.55;
  const contrast = adj.contrast === 0 ? 1 : (259 * (c + 255)) / (255 * (259 - c));
  const saturation = 1 + adj.saturation / 100;
  const hue = adj.hue === 0 ? null : hueMatrix(adj.hue);
  const warm = adj.temperature * 0.45;
  const skip = filter === 'none' && brightness === 0 && contrast === 1 && saturation === 1 && !hue && warm === 0;
  if (skip) return;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];
    switch (filter) {
      case 'grayscale': {
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        r = g = b = y;
        break;
      }
      case 'sepia': {
        const nr = 0.393 * r + 0.769 * g + 0.189 * b;
        const ng = 0.349 * r + 0.686 * g + 0.168 * b;
        const nb = 0.272 * r + 0.534 * g + 0.131 * b;
        r = nr;
        g = ng;
        b = nb;
        break;
      }
      case 'vintage': {
        const nr = 0.393 * r + 0.769 * g + 0.189 * b;
        const ng = 0.349 * r + 0.686 * g + 0.168 * b;
        const nb = 0.272 * r + 0.534 * g + 0.131 * b;
        r = r * 0.45 + nr * 0.55 + 12;
        g = g * 0.45 + ng * 0.55 + 6;
        b = b * 0.45 + nb * 0.55;
        r = r * 0.9 + 18;
        g = g * 0.9 + 18;
        b = b * 0.9 + 22;
        break;
      }
      case 'cool':
        r -= 10;
        b += 14;
        break;
      case 'warm':
        r += 14;
        b -= 12;
        break;
      case 'dramatic': {
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        r = y + (r - y) * 0.75;
        g = y + (g - y) * 0.75;
        b = y + (b - y) * 0.75;
        r = (r - 128) * 1.3 + 128 - 10;
        g = (g - 128) * 1.3 + 128 - 10;
        b = (b - 128) * 1.3 + 128 - 10;
        break;
      }
      case 'fade':
        r = r * 0.82 + 38;
        g = g * 0.82 + 38;
        b = b * 0.82 + 42;
        break;
      case 'invert':
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
        break;
      default:
        break;
    }
    if (hue) {
      const nr = hue[0] * r + hue[1] * g + hue[2] * b;
      const ng = hue[3] * r + hue[4] * g + hue[5] * b;
      const nb = hue[6] * r + hue[7] * g + hue[8] * b;
      r = nr;
      g = ng;
      b = nb;
    }
    if (saturation !== 1) {
      const y = 0.299 * r + 0.587 * g + 0.114 * b;
      r = y + (r - y) * saturation;
      g = y + (g - y) * saturation;
      b = y + (b - y) * saturation;
    }
    if (warm !== 0) {
      r += warm;
      b -= warm;
    }
    if (brightness !== 0) {
      r += brightness;
      g += brightness;
      b += brightness;
    }
    if (contrast !== 1) {
      r = (r - 128) * contrast + 128;
      g = (g - 128) * contrast + 128;
      b = (b - 128) * contrast + 128;
    }
    d[i] = clamp255(r);
    d[i + 1] = clamp255(g);
    d[i + 2] = clamp255(b);
  }
}

/** Box blur (three passes approximate a Gaussian). Alpha is blurred too, so soft edges stay soft. */
export function blurPixels(px: Pixels, radius: number) {
  const r = Math.round(radius);
  if (r < 1) return;
  const { width: w, height: h, data } = px;
  const tmp = new Float32Array(data.length);
  const src = new Float32Array(data);
  const pass = (from: Float32Array, to: Float32Array, horizontal: boolean) => {
    const len = horizontal ? w : h;
    const lines = horizontal ? h : w;
    const stride = horizontal ? 4 : w * 4;
    const lineStride = horizontal ? w * 4 : 4;
    const win = r * 2 + 1;
    for (let line = 0; line < lines; line++) {
      const base = line * lineStride;
      for (let ch = 0; ch < 4; ch++) {
        let sum = 0;
        for (let k = -r; k <= r; k++) sum += from[base + Math.min(len - 1, Math.max(0, k)) * stride + ch];
        for (let x = 0; x < len; x++) {
          to[base + x * stride + ch] = sum / win;
          const add = Math.min(len - 1, x + r + 1);
          const sub = Math.max(0, x - r);
          sum += from[base + add * stride + ch] - from[base + sub * stride + ch];
        }
      }
    }
  };
  for (let i = 0; i < 3; i++) {
    pass(src, tmp, true);
    pass(tmp, src, false);
  }
  for (let i = 0; i < data.length; i++) data[i] = src[i];
}

/** Unsharp mask: adds back the difference between the picture and a slightly blurred copy. */
export function sharpenPixels(px: Pixels, amount: number, radius = 1) {
  if (amount <= 0) return;
  const blurred: Pixels = { width: px.width, height: px.height, data: new Uint8ClampedArray(px.data) };
  blurPixels(blurred, radius);
  const k = (amount / 100) * 1.6;
  const d = px.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = clamp255(d[i] + (d[i] - blurred.data[i]) * k);
    d[i + 1] = clamp255(d[i + 1] + (d[i + 1] - blurred.data[i + 1]) * k);
    d[i + 2] = clamp255(d[i + 2] + (d[i + 2] - blurred.data[i + 2]) * k);
  }
}

/** Darkens the corners; `amount` 0-100. The centre is untouched. */
export function vignettePixels(px: Pixels, amount: number) {
  if (amount <= 0) return;
  const { width: w, height: h, data } = px;
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;
  const maxD = Math.hypot(cx, cy) || 1;
  const strength = amount / 100;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dist = Math.hypot(x - cx, y - cy) / maxD; // 0 centre .. 1 corner
      const fall = Math.max(0, (dist - 0.35) / 0.65);
      const f = 1 - strength * fall * fall * 0.85;
      const i = (y * w + x) * 4;
      data[i] *= f;
      data[i + 1] *= f;
      data[i + 2] *= f;
    }
  }
}

/**
 * Applies the filter and every adjustment, in place. `previewScale` (preview size / full size) keeps blur
 * and sharpen looking the same at preview size as in the exported picture.
 */
export function applyEdits(px: Pixels, adj: Adjustments, filter: FilterId, previewScale = 1) {
  colourPass(px, adj, filter);
  if (adj.blur > 0) blurPixels(px, adj.blur * previewScale);
  if (adj.sharpen > 0) sharpenPixels(px, adj.sharpen, Math.max(0.6, 1.2 * previewScale));
  if (adj.vignette > 0) vignettePixels(px, adj.vignette);
}

export const ADJUST_CONTROLS: { key: keyof Adjustments; label: string; min: number; max: number; unit?: string }[] = [
  { key: 'brightness', label: 'Brightness', min: -100, max: 100 },
  { key: 'contrast', label: 'Contrast', min: -100, max: 100 },
  { key: 'saturation', label: 'Saturation', min: -100, max: 100 },
  { key: 'hue', label: 'Hue shift', min: -180, max: 180, unit: '°' },
  { key: 'temperature', label: 'Warmth', min: -100, max: 100 },
  { key: 'sharpen', label: 'Sharpen', min: 0, max: 100 },
  { key: 'blur', label: 'Blur', min: 0, max: 20 },
  { key: 'vignette', label: 'Vignette', min: 0, max: 100 },
];
