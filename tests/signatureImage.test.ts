import { describe, expect, it } from 'vitest';
import { contentBounds, whiteToTransparent } from '../src/lib/signatureImage';

const blank = (w: number, h: number) => new Uint8ClampedArray(w * h * 4);
const put = (d: Uint8ClampedArray, w: number, x: number, y: number, rgba: number[]) => d.set(rgba, (y * w + x) * 4);

describe('contentBounds', () => {
  it('finds the box around the ink', () => {
    const d = blank(20, 10);
    put(d, 20, 5, 2, [0, 0, 0, 255]);
    put(d, 20, 12, 7, [0, 0, 0, 200]);
    expect(contentBounds(d, 20, 10)).toEqual({ x: 5, y: 2, w: 8, h: 6 });
  });
  it('returns null for an empty or faint picture', () => {
    expect(contentBounds(blank(5, 5), 5, 5)).toBeNull();
    const faint = blank(5, 5);
    put(faint, 5, 1, 1, [0, 0, 0, 5]);
    expect(contentBounds(faint, 5, 5)).toBeNull();
  });
});

describe('whiteToTransparent', () => {
  it('clears white, keeps dark ink and softens near-white edges', () => {
    const d = new Uint8ClampedArray([255, 255, 255, 255, 20, 20, 20, 255, 225, 225, 225, 255, 100, 140, 255, 255]);
    const cleared = whiteToTransparent(d, 235);
    expect(cleared).toBe(1);
    expect(d[3]).toBe(0); // white gone
    expect(d[7]).toBe(255); // ink kept
    expect(d[11]).toBeGreaterThan(0); // light grey keeps some opacity
    expect(d[11]).toBeLessThan(255);
    expect(d[15]).toBe(255); // coloured ink kept
  });
  it('does not touch pixels that are already transparent', () => {
    const d = new Uint8ClampedArray([255, 255, 255, 0]);
    whiteToTransparent(d);
    expect(d[3]).toBe(0);
  });
});
