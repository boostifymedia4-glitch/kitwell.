import { describe, expect, it } from 'vitest';
import { GifError, MAX_GIF_FRAMES, clampDelay, encodeGif, fitRects, parseGif, type GifFrame, type GifOptions } from '../src/lib/gif';

const solid = (w: number, h: number, [r, g, b, a]: number[]): Uint8ClampedArray => {
  const px = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < px.length; i += 4) px.set([r, g, b, a], i);
  return px;
};
const opts = (over: Partial<GifOptions> = {}): GifOptions => ({ width: 8, height: 6, plays: 0, colors: 256, transparent: false, ...over });
const frames = (n: number, delayMs = 200): GifFrame[] => Array.from({ length: n }, (_, i) => ({ rgba: solid(8, 6, [i * 60, 100, 200 - i * 40, 255]), delayMs }));

describe('encodeGif', () => {
  it('writes a valid animated GIF with the right size, frame count and delays', async () => {
    const bytes = await encodeGif([{ ...frames(1)[0], delayMs: 100 }, { ...frames(2)[1], delayMs: 500 }, { ...frames(3)[2], delayMs: 1230 }], opts());
    const info = parseGif(bytes);
    expect(info).toMatchObject({ version: 'GIF89a', width: 8, height: 6, frames: 3, loopCount: 0 });
    expect(info.delaysMs).toEqual([100, 500, 1230]);
    expect(info.hasTransparency).toBe(false);
  });

  it('handles the loop settings', async () => {
    expect(parseGif(await encodeGif(frames(2), opts({ plays: 0 }))).loopCount).toBe(0); // forever
    expect(parseGif(await encodeGif(frames(2), opts({ plays: 1 }))).loopCount).toBeUndefined(); // once
    expect(parseGif(await encodeGif(frames(2), opts({ plays: 4 }))).loopCount).toBe(3); // 4 plays = 3 repeats
  });

  it('keeps transparency only when asked', async () => {
    const hole = solid(8, 6, [10, 200, 30, 255]);
    for (let i = 0; i < 16; i += 4) hole[i + 3] = 0; // four transparent pixels
    const on = parseGif(await encodeGif([{ rgba: hole, delayMs: 100 }], opts({ transparent: true })));
    expect(on.hasTransparency).toBe(true);
    const off = parseGif(await encodeGif([{ rgba: hole, delayMs: 100 }], opts({ transparent: false })));
    expect(off.hasTransparency).toBe(false);
  });

  it('supports smaller palettes and reports progress', async () => {
    const seen: number[] = [];
    const noisy = new Uint8ClampedArray(8 * 6 * 4).map((_, i) => (i % 4 === 3 ? 255 : (i * 37) % 256));
    const big = await encodeGif([{ rgba: noisy, delayMs: 100 }], opts({ colors: 256 }));
    const small = await encodeGif([{ rgba: noisy, delayMs: 100 }], opts({ colors: 16 }), (d) => seen.push(d));
    expect(parseGif(small).frames).toBe(1);
    expect(small.length).toBeLessThan(big.length);
    expect(seen.at(-1)).toBe(1);
  });

  it('clamps delays to what browsers can play', () => {
    expect(clampDelay(1)).toBe(20);
    expect(clampDelay(100_000)).toBe(60_000);
    expect(clampDelay(333.4)).toBe(333);
  });

  it('rejects invalid input with clear errors', async () => {
    await expect(encodeGif([], opts())).rejects.toThrow(/at least one/);
    await expect(encodeGif(frames(MAX_GIF_FRAMES + 1), opts())).rejects.toThrow(/at most/);
    await expect(encodeGif(frames(1), opts({ width: 0 }))).rejects.toBeInstanceOf(GifError);
    await expect(encodeGif(frames(1), opts({ colors: 100 }))).rejects.toThrow(/colours/);
    await expect(encodeGif([{ rgba: new Uint8ClampedArray(10), delayMs: 100 }], opts())).rejects.toThrow(/does not match/);
    await expect(encodeGif(frames(2), opts({ width: 20_000, height: 20_000 }))).rejects.toThrow(/too large/);
  });
});

describe('parseGif', () => {
  it('rejects data that is not a GIF', () => {
    expect(() => parseGif(new TextEncoder().encode('PNG data'))).toThrow(/Not a GIF/);
  });
  it('detects truncated files', async () => {
    const bytes = await encodeGif(frames(2), opts());
    expect(() => parseGif(bytes.slice(0, bytes.length - 8))).toThrow(GifError);
  });
});

describe('fitRects', () => {
  it('letterboxes (contain)', () => {
    const r = fitRects(400, 200, 100, 100, 'contain');
    expect(r).toMatchObject({ dw: 100, dh: 50, dx: 0, dy: 25, sx: 0, sy: 0, sw: 400, sh: 200 });
  });
  it('crops to fill (cover)', () => {
    const r = fitRects(400, 200, 100, 100, 'cover');
    expect(r.dw).toBe(100);
    expect(r.dh).toBe(100);
    expect(r.sw).toBeCloseTo(200);
    expect(r.sh).toBeCloseTo(200);
    expect(r.sx).toBeCloseTo(100); // the middle of the picture
  });
  it('stretches', () => {
    expect(fitRects(400, 200, 100, 100, 'stretch')).toMatchObject({ dx: 0, dy: 0, dw: 100, dh: 100, sw: 400, sh: 200 });
  });
});
