import { describe, expect, it } from 'vitest';
import { applyScanFilter, scaledSize } from '../src/lib/scanFilter';

/** A 60x40 "photographed page": a brightness gradient (uneven lighting) with a dark text stroke. */
function page(): { data: Uint8ClampedArray; w: number; h: number } {
  const w = 60;
  const h = 40;
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const light = 150 + (x / w) * 90; // left side in shadow
      const stroke = y > 18 && y < 22 && x > 10 && x < 50;
      const v = stroke ? light - 100 : light;
      const i = (y * w + x) * 4;
      data[i] = v;
      data[i + 1] = v + 5;
      data[i + 2] = v - 5;
      data[i + 3] = 255;
    }
  }
  return { data, w, h };
}
const px = (d: Uint8ClampedArray, w: number, x: number, y: number) => d[(y * w + x) * 4];

describe('scan filters', () => {
  it('leaves the original untouched', () => {
    const { data, w, h } = page();
    const copy = data.slice();
    applyScanFilter(data, w, h, 'original');
    expect(data).toEqual(copy);
  });

  it('grayscale removes colour but keeps brightness', () => {
    const { data, w, h } = page();
    applyScanFilter(data, w, h, 'grayscale');
    for (let i = 0; i < data.length; i += 4) {
      expect(data[i]).toBe(data[i + 1]);
      expect(data[i + 1]).toBe(data[i + 2]);
      expect(data[i + 3]).toBe(255);
    }
    expect(px(data, w, 55, 5)).toBeGreaterThan(px(data, w, 5, 5));
  });

  it('document mode gives white paper and black ink even where the page is in shadow', () => {
    const { data, w, h } = page();
    applyScanFilter(data, w, h, 'document');
    // paper in the dark left area and the bright right area both become white
    expect(px(data, w, 3, 5)).toBe(255);
    expect(px(data, w, 57, 5)).toBe(255);
    // the stroke becomes black in the middle and at both ends of the line
    expect(px(data, w, 30, 20)).toBe(0);
    expect(px(data, w, 14, 20)).toBe(0);
    expect(px(data, w, 46, 20)).toBe(0);
    // only pure black and white remain
    for (let i = 0; i < data.length; i += 4) expect([0, 255]).toContain(data[i]);
  });

  it('scales down only the images that are too large', () => {
    expect(scaledSize(1000, 800)).toEqual({ width: 1000, height: 800 });
    expect(scaledSize(7016, 4960)).toEqual({ width: 3508, height: 2480 });
    expect(scaledSize(1, 5000)).toEqual({ width: 1, height: 3508 });
  });
});
