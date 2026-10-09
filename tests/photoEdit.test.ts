import { describe, expect, it } from 'vitest';
import { ADJUST_CONTROLS, FILTERS, NEUTRAL, applyEdits, blurPixels, isNeutral, sharpenPixels, straightenScale, turnedSize, vignettePixels, type Adjustments, type FilterId, type Pixels } from '../src/lib/photoEdit';

const make = (w: number, h: number, fill: (x: number, y: number) => number[]): Pixels => {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) data.set(fill(x, y), (y * w + x) * 4);
  return { width: w, height: h, data };
};
const solid = (rgb: number[], w = 4, h = 4) => make(w, h, () => [...rgb, 255]);
const px = (p: Pixels, x = 0, y = 0) => [...p.data.slice((y * p.width + x) * 4, (y * p.width + x) * 4 + 4)];
const adj = (over: Partial<Adjustments>): Adjustments => ({ ...NEUTRAL, ...over });

describe('colour adjustments', () => {
  it('does nothing with neutral settings', () => {
    const p = make(5, 5, (x, y) => [x * 40, y * 40, (x + y) * 20, 255]);
    const before = Uint8ClampedArray.from(p.data);
    applyEdits(p, NEUTRAL, 'none');
    expect([...p.data]).toEqual([...before]);
    expect(isNeutral(NEUTRAL, 'none')).toBe(true);
    expect(isNeutral(adj({ hue: 1 }), 'none')).toBe(false);
    expect(isNeutral(NEUTRAL, 'sepia')).toBe(false);
  });

  it('brightness shifts and clamps', () => {
    const p = solid([100, 100, 100]);
    applyEdits(p, adj({ brightness: 20 }), 'none');
    expect(px(p).slice(0, 3)).toEqual([151, 151, 151]); // 100 + 20% of 255
    applyEdits(p, adj({ brightness: 100 }), 'none');
    expect(px(p).slice(0, 3)).toEqual([255, 255, 255]);
    const dark = solid([100, 100, 100]);
    applyEdits(dark, adj({ brightness: -100 }), 'none');
    expect(px(dark).slice(0, 3)).toEqual([0, 0, 0]);
  });

  it('contrast pushes values away from (or towards) the middle', () => {
    const hi = make(2, 1, (x) => (x === 0 ? [180, 180, 180, 255] : [70, 70, 70, 255]));
    applyEdits(hi, adj({ contrast: 50 }), 'none');
    expect(px(hi, 0)[0]).toBeGreaterThan(180);
    expect(px(hi, 1)[0]).toBeLessThan(70);
    const lo = make(2, 1, (x) => (x === 0 ? [180, 180, 180, 255] : [70, 70, 70, 255]));
    applyEdits(lo, adj({ contrast: -50 }), 'none');
    expect(px(lo, 0)[0]).toBeLessThan(180);
    expect(px(lo, 1)[0]).toBeGreaterThan(70);
  });

  it('saturation -100 gives grey, +100 increases colour spread', () => {
    const grey = solid([200, 100, 50]);
    applyEdits(grey, adj({ saturation: -100 }), 'none');
    const [r, g, b] = px(grey);
    expect(Math.abs(r - g)).toBeLessThanOrEqual(1);
    expect(Math.abs(g - b)).toBeLessThanOrEqual(1);
    const vivid = solid([200, 100, 50]);
    applyEdits(vivid, adj({ saturation: 100 }), 'none');
    expect(px(vivid)[0] - px(vivid)[2]).toBeGreaterThan(150);
  });

  it('hue rotation keeps brightness roughly and changes the colour', () => {
    const p = solid([255, 0, 0]);
    applyEdits(p, adj({ hue: 120 }), 'none');
    const [r, g, b] = px(p);
    expect(g).toBeGreaterThan(r);
    expect(g).toBeGreaterThan(b);
    const full = solid([255, 0, 0]);
    applyEdits(full, adj({ hue: 180 }), 'none');
    expect(px(full)[0]).toBeLessThan(120);
  });

  it('warmth moves red up and blue down', () => {
    const p = solid([100, 100, 100]);
    applyEdits(p, adj({ temperature: 50 }), 'none');
    expect(px(p)[0]).toBeGreaterThan(100);
    expect(px(p)[2]).toBeLessThan(100);
    expect(px(p)[1]).toBe(100);
  });

  it('never changes transparency', () => {
    const p = make(3, 3, () => [90, 140, 200, 77]);
    applyEdits(p, adj({ brightness: 30, contrast: 20, saturation: 40, hue: 30, blur: 2, sharpen: 30, vignette: 40 }), 'vintage');
    for (let i = 3; i < p.data.length; i += 4) expect(p.data[i]).toBe(77);
  });
});

describe('filters', () => {
  const run = (id: FilterId, rgb = [200, 120, 40]) => {
    const p = solid(rgb);
    applyEdits(p, NEUTRAL, id);
    return px(p).slice(0, 3);
  };
  it('black & white makes equal channels', () => {
    const [r, g, b] = run('grayscale');
    expect(r).toBe(g);
    expect(g).toBe(b);
  });
  it('negative inverts', () => {
    expect(run('invert')).toEqual([55, 135, 215]);
  });
  it('sepia gives a warm brown tone', () => {
    const [r, g, b] = run('sepia');
    expect(r).toBeGreaterThan(g);
    expect(g).toBeGreaterThan(b);
  });
  it('cool and warm tilt the blue/red balance in opposite directions', () => {
    const cool = run('cool', [128, 128, 128]);
    const warm = run('warm', [128, 128, 128]);
    expect(cool[2]).toBeGreaterThan(cool[0]);
    expect(warm[0]).toBeGreaterThan(warm[2]);
  });
  it('faded lifts blacks, dramatic deepens them', () => {
    expect(run('fade', [0, 0, 0])[0]).toBeGreaterThan(20);
    expect(run('dramatic', [30, 30, 30])[0]).toBeLessThan(30);
  });
  it('every filter in the list is implemented and changes (or deliberately keeps) the picture', () => {
    expect(FILTERS[0].id).toBe('none');
    for (const f of FILTERS.slice(1)) expect(run(f.id), f.id).not.toEqual([200, 120, 40]);
    expect(run('none')).toEqual([200, 120, 40]);
  });
});

describe('spatial effects', () => {
  const impulse = () => make(9, 9, (x, y) => (x === 4 && y === 4 ? [255, 255, 255, 255] : [0, 0, 0, 255]));
  it('blur spreads light and keeps the total brightness (within rounding)', () => {
    const p = impulse();
    const sumBefore = [...p.data].filter((_, i) => i % 4 === 0).reduce((a, b) => a + b, 0);
    blurPixels(p, 1);
    expect(px(p, 4, 4)[0]).toBeLessThan(255);
    expect(px(p, 3, 4)[0]).toBeGreaterThan(0);
    const sumAfter = [...p.data].filter((_, i) => i % 4 === 0).reduce((a, b) => a + b, 0);
    expect(Math.abs(sumAfter - sumBefore) / sumBefore).toBeLessThan(0.05);
  });
  it('blur radius 0 changes nothing', () => {
    const p = impulse();
    blurPixels(p, 0);
    expect(px(p, 4, 4)[0]).toBe(255);
  });
  it('sharpen increases the contrast across an edge', () => {
    const edge = () => make(8, 2, (x) => (x < 4 ? [100, 100, 100, 255] : [160, 160, 160, 255]));
    const p = edge();
    sharpenPixels(p, 100, 1);
    expect(px(p, 3)[0]).toBeLessThan(100);
    expect(px(p, 4)[0]).toBeGreaterThan(160);
    expect(px(p, 0)[0]).toBe(100); // flat areas stay flat
  });
  it('vignette darkens corners but not the centre', () => {
    const p = solid([200, 200, 200], 21, 21);
    vignettePixels(p, 100);
    expect(px(p, 10, 10)[0]).toBe(200);
    expect(px(p, 0, 0)[0]).toBeLessThan(80);
  });
  it('blur radius is scaled for previews so they look like the export', () => {
    const full = impulse();
    const half = impulse();
    applyEdits(full, adj({ blur: 2 }), 'none', 1);
    applyEdits(half, adj({ blur: 2 }), 'none', 0.5);
    expect(px(half, 3, 4)[0]).toBeGreaterThan(0);
    expect(px(full, 4, 4)[0]).toBeGreaterThan(0);
  });
});

describe('geometry helpers', () => {
  it('swaps width and height for quarter turns', () => {
    expect(turnedSize(400, 300, 0)).toEqual({ width: 400, height: 300 });
    expect(turnedSize(400, 300, 1)).toEqual({ width: 300, height: 400 });
    expect(turnedSize(400, 300, 3)).toEqual({ width: 300, height: 400 });
    expect(turnedSize(400, 300, 2)).toEqual({ width: 400, height: 300 });
  });
  it('scales up when straightening so no corners are empty', () => {
    expect(straightenScale(400, 300, 0)).toBe(1);
    expect(straightenScale(400, 300, 5)).toBeGreaterThan(1);
    expect(straightenScale(400, 300, -5)).toBeCloseTo(straightenScale(400, 300, 5));
    expect(straightenScale(400, 300, 10)).toBeGreaterThan(straightenScale(400, 300, 5));
  });
  it('lists a control for every adjustment', () => {
    expect(ADJUST_CONTROLS.map((c) => c.key).sort()).toEqual(Object.keys(NEUTRAL).sort());
  });
});
