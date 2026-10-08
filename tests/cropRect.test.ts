import { describe, expect, it } from 'vitest';
import { applyRatio, areaToMargins, fitToRatio, initialRect, marginsToArea, moveRect, resizeRect, setRectField } from '../src/lib/cropRect';

const W = 1000;
const H = 800;
const r = (x: number, y: number, w: number, h: number) => ({ x, y, w, h });

describe('crop rectangle maths', () => {
  it('starts with the middle 80%', () => {
    expect(initialRect(1000, 500)).toEqual(r(100, 50, 800, 400));
  });

  it('keeps a box inside the image when moving', () => {
    expect(moveRect(r(100, 100, 200, 200), 50, -20, W, H)).toEqual(r(150, 80, 200, 200));
    expect(moveRect(r(100, 100, 200, 200), -500, 900, W, H)).toEqual(r(0, 600, 200, 200));
    expect(moveRect(r(0, 0, W, H), 10, 10, W, H)).toEqual(r(0, 0, W, H));
  });

  it('resizes from the corner, free or ratio-locked, without leaving the image', () => {
    expect(resizeRect(r(100, 100, 200, 100), 50, 30, null, W, H)).toEqual(r(100, 100, 250, 130));
    expect(resizeRect(r(100, 100, 200, 100), 50, 999, 2, W, H)).toEqual(r(100, 100, 250, 125)); // height follows width
    expect(resizeRect(r(900, 700, 50, 50), 500, 500, null, W, H)).toEqual(r(900, 700, 100, 100)); // clamped to the edge
    expect(resizeRect(r(100, 100, 200, 100), -999, -999, null, W, H, 8)).toEqual(r(100, 100, 8, 8)); // minimum size
    const tall = resizeRect(r(100, 700, 50, 50), 800, 0, 1, W, H); // ratio would overflow the bottom
    expect(tall.y + tall.h).toBeLessThanOrEqual(H);
    expect(tall.w / tall.h).toBeCloseTo(1, 5);
  });

  it('switches ratio around the same centre', () => {
    const next = applyRatio(r(100, 100, 400, 400), 2, W, H);
    expect(next.w / next.h).toBeCloseTo(2, 5);
    expect(next.x + next.w / 2).toBeCloseTo(300, 5);
    expect(next.y + next.h / 2).toBeCloseTo(300, 5);
    const wide = applyRatio(r(0, 0, 1000, 800), 3, W, H); // too wide for the height: shrink to fit
    expect(wide.h).toBeLessThanOrEqual(H);
    expect(wide.w / wide.h).toBeCloseTo(3, 5);
  });

  it('fits a box to a ratio, or leaves it for a free crop', () => {
    expect(fitToRatio(r(10, 10, 300, 100), null, W, H)).toEqual(r(10, 10, 300, 100));
    const fit = fitToRatio(r(900, 700, 300, 300), 1, W, H);
    expect(fit.x + fit.w).toBeLessThanOrEqual(W);
    expect(fit.y + fit.h).toBeLessThanOrEqual(H);
  });

  it('applies typed values, honouring bounds and a locked ratio', () => {
    expect(setRectField(r(0, 0, 200, 100), 'x', 50, null, W, H)).toEqual(r(50, 0, 200, 100));
    expect(setRectField(r(0, 0, 200, 100), 'x', 5000, null, W, H).x).toBe(800); // keeps the box inside
    expect(setRectField(r(0, 0, 200, 100), 'w', 5000, null, W, H).w).toBe(W);
    expect(setRectField(r(0, 0, 200, 100), 'w', 1, null, W, H).w).toBe(8);
    const locked = setRectField(r(0, 0, 200, 100), 'w', 400, 2, W, H);
    expect(locked.w).toBe(400);
    expect(locked.h).toBe(200);
    const byHeight = setRectField(r(0, 0, 200, 100), 'h', 150, 2, W, H);
    expect(byHeight.h).toBe(150);
    expect(byHeight.w).toBe(300);
  });
});

describe('page margins', () => {
  it('converts between a crop area and margin percentages', () => {
    expect(areaToMargins(r(0.1, 0.2, 0.7, 0.5))).toEqual({ left: 10, top: 20, right: 20, bottom: 30 });
    const back = marginsToArea({ left: 10, top: 20, right: 20, bottom: 30 })!;
    expect(back.x).toBeCloseTo(0.1, 6);
    expect(back.y).toBeCloseTo(0.2, 6);
    expect(back.w).toBeCloseTo(0.7, 6);
    expect(back.h).toBeCloseTo(0.5, 6);
  });
  it('rejects margins that leave almost nothing or are invalid', () => {
    expect(marginsToArea({ left: 60, top: 0, right: 40, bottom: 0 })).toBeNull();
    expect(marginsToArea({ left: 50, top: 0, right: 60, bottom: 0 })).toBeNull();
    expect(marginsToArea({ left: -5, top: 0, right: 0, bottom: 0 })).toBeNull();
    expect(marginsToArea({ left: NaN, top: 0, right: 0, bottom: 0 })).toBeNull();
    expect(marginsToArea({ left: 0, top: 0, right: 0, bottom: 0 })).toEqual({ x: 0, y: 0, w: 1, h: 1 });
  });
});
