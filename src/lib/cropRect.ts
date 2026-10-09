import { tr } from '@/i18n/translate';
/** Pure rectangle maths for crop tools. Units are whatever the caller uses (image pixels, preview pixels...). */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const MIN_CROP = 8;

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** A box covering the middle 80% of the area, a sensible starting crop. */
export function initialRect(W: number, H: number): Rect {
  return { x: Math.round(W * 0.1), y: Math.round(H * 0.1), w: Math.round(W * 0.8), h: Math.round(H * 0.8) };
}

/** Shrinks and shifts a rectangle so it keeps the aspect ratio and stays inside W × H. */
export function fitToRatio(rect: Rect, ratio: number | null, W: number, H: number): Rect {
  if (!ratio) return rect;
  let w = Math.min(rect.w, W);
  let h = w / ratio;
  if (h > H) {
    h = H;
    w = h * ratio;
  }
  return { x: clamp(rect.x, 0, W - w), y: clamp(rect.y, 0, H - h), w, h };
}

/** Switches to an aspect ratio, keeping the box centred where it was. */
export function applyRatio(rect: Rect, ratio: number, W: number, H: number): Rect {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  let w = rect.w;
  let h = w / ratio;
  if (h > H) {
    h = H;
    w = h * ratio;
  }
  return { x: clamp(cx - w / 2, 0, W - w), y: clamp(cy - h / 2, 0, H - h), w, h };
}

/** Applies a typed value for x, y, width or height, honouring a locked ratio and the image bounds. */
export function setRectField(rect: Rect, key: keyof Rect, value: number, ratio: number | null, W: number, H: number, min = MIN_CROP): Rect {
  let next = { ...rect, [key]: value };
  if (key === 'w') next.w = clamp(value, min, W);
  if (key === 'h') next.h = clamp(value, min, H);
  if (ratio && key === 'w') next.h = next.w / ratio;
  if (ratio && key === 'h') next.w = next.h * ratio;
  next = fitToRatio(next, ratio, W, H);
  next.x = clamp(next.x, 0, W - next.w);
  next.y = clamp(next.y, 0, H - next.h);
  return next;
}

export function moveRect(rect: Rect, dx: number, dy: number, W: number, H: number): Rect {
  return { ...rect, x: clamp(rect.x + dx, 0, W - rect.w), y: clamp(rect.y + dy, 0, H - rect.h) };
}

/** Drags the bottom-right corner by (dx, dy) from `start`. With a locked ratio the height follows the width. */
export function resizeRect(start: Rect, dx: number, dy: number, ratio: number | null, W: number, H: number, min = MIN_CROP): Rect {
  let w = clamp(start.w + dx, min, W - start.x);
  let h = ratio ? w / ratio : clamp(start.h + dy, min, H - start.y);
  if (ratio && start.y + h > H) {
    h = H - start.y;
    w = h * ratio;
  }
  return { ...start, w, h };
}

/** Page margins as percentages (0-100) measured inwards from each edge. */
export interface Margins {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** Converts a crop area (fractions 0-1 of the page) to margin percentages. */
export function areaToMargins(a: Rect): Margins {
  const pct = (v: number) => Math.round(v * 1000) / 10;
  return { left: pct(a.x), top: pct(a.y), right: pct(1 - a.x - a.w), bottom: pct(1 - a.y - a.h) };
}

/** Converts margin percentages back to a crop area (fractions). Returns null if less than 2% would remain in either direction. */
export function marginsToArea(m: Margins): Rect | null {
  const x = m.left / 100;
  const y = m.top / 100;
  const w = 1 - x - m.right / 100;
  const h = 1 - y - m.bottom / 100;
  return [x, y, w, h].every(Number.isFinite) && x >= 0 && y >= 0 && w >= 0.02 && h >= 0.02 ? { x, y, w, h } : null;
}

/** Shapes offered by the crop tools. The value is width / height as a number, or "free". */
export const CROP_RATIOS = [
  { value: 'free', label: '' },
  { value: '1', label: '' },
  { value: '1.3333', label: '4:3' },
  { value: '0.75', label: '3:4' },
  { value: '1.5', label: '3:2' },
  { value: '1.7778', label: '16:9' },
  { value: '0.5625', label: '9:16' },
];

/** The ratios with their names in the current language ("Free" and "1:1 (square)" are words; the rest are numbers). */
export function cropRatioOptions(): { value: string; label: string }[] {
  return CROP_RATIOS.map((o) => ({ value: o.value, label: o.value === 'free' ? tr('ui.ratio.free') : o.value === '1' ? tr('ui.ratio.square') : o.label }));
}
