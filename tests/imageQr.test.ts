import { describe, expect, it } from 'vitest';
import {
  anchorBox, applyRegions, clampRegion, enlargedSize, svgIntrinsicSize, type Pixels,
} from '../src/lib/imageEdits';
import {
  QrError, classifyQr, decodeQr, emailPayload, phonePayload, qrContrast, qrMatrix, qrPixels, qrSvg, wifiPayload,
  type ErrorCorrection,
} from '../src/lib/qr';

const solid = (w: number, h: number, rgba: [number, number, number, number]): Pixels => {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) data.set(rgba, i * 4);
  return { data, width: w, height: h };
};
/** Horizontal gradient so every column differs. */
const gradient = (w: number, h: number): Pixels => {
  const p = solid(w, h, [0, 0, 0, 255]);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) p.data.set([(x * 255) / (w - 1), (y * 255) / (h - 1), 128, 255], (y * w + x) * 4);
  return p;
};
const px = (p: Pixels, x: number, y: number) => Array.from(p.data.slice((y * p.width + x) * 4, (y * p.width + x) * 4 + 4));
const unique = (p: Pixels, r: { x: number; y: number; w: number; h: number }) => {
  const set = new Set<string>();
  for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) set.add(px(p, x, y).join(','));
  return set.size;
};

describe('region effects', () => {
  const region = { x: 10, y: 10, w: 20, h: 20 };

  it('covers a region with solid black and leaves the rest alone', () => {
    const p = gradient(60, 60);
    const outside = px(p, 5, 5);
    applyRegions(p, [region], 'cover', 50);
    expect(px(p, 15, 15)).toEqual([0, 0, 0, 255]);
    expect(unique(p, region)).toBe(1);
    expect(px(p, 5, 5)).toEqual(outside);
    expect(px(p, 30, 30)).not.toEqual([0, 0, 0, 255]); // first pixel after the region
  });

  it('pixelates into uniform blocks, only inside the region', () => {
    const p = gradient(60, 60);
    const before = Uint8ClampedArray.from(p.data);
    applyRegions(p, [region], 'pixelate', 100); // block = 20 * 0.25 = 5px
    expect(unique(p, { x: 10, y: 10, w: 5, h: 5 })).toBe(1);
    expect(unique(p, region)).toBeLessThanOrEqual(16);
    for (let i = 0; i < p.data.length; i++) {
      const x = (i >> 2) % 60;
      const y = Math.floor(i / 4 / 60);
      const inside = x >= 10 && x < 30 && y >= 10 && y < 30;
      if (!inside) expect(p.data[i]).toBe(before[i]);
    }
  });

  it('blurs: smooths detail inside the region without touching outside', () => {
    // High-frequency checkerboard.
    const p = solid(50, 50, [0, 0, 0, 255]);
    for (let y = 0; y < 50; y++) for (let x = 0; x < 50; x++) if ((x + y) % 2 === 0) p.data.set([255, 255, 255, 255], (y * 50 + x) * 4);
    const outsideBefore = px(p, 2, 2);
    applyRegions(p, [{ x: 10, y: 10, w: 30, h: 30 }], 'blur', 60);
    const inner = [px(p, 20, 20)[0], px(p, 21, 20)[0], px(p, 20, 21)[0], px(p, 25, 25)[0]];
    for (const v of inner) {
      expect(v).toBeGreaterThan(90); // near mid-grey, no longer 0 or 255
      expect(v).toBeLessThan(165);
    }
    expect(px(p, 2, 2)).toEqual(outsideBefore);
  });

  it('keeps a blurred flat colour unchanged (no edge darkening)', () => {
    const p = solid(40, 40, [200, 100, 50, 255]);
    applyRegions(p, [{ x: 5, y: 5, w: 30, h: 30 }], 'blur', 100);
    expect(px(p, 5, 5)).toEqual([200, 100, 50, 255]);
    expect(px(p, 20, 20)).toEqual([200, 100, 50, 255]);
  });

  it('clamps regions that extend past the image and ignores empty ones', () => {
    const p = solid(20, 20, [255, 255, 255, 255]);
    applyRegions(p, [{ x: 15, y: 15, w: 50, h: 50 }, { x: -30, y: -30, w: 10, h: 10 }, { x: 5, y: 5, w: 0, h: 5 }], 'cover', 50);
    expect(px(p, 19, 19)).toEqual([0, 0, 0, 255]);
    expect(px(p, 0, 0)).toEqual([255, 255, 255, 255]);
    expect(clampRegion({ x: -5, y: -5, w: 10, h: 10 }, 20, 20)).toEqual({ x: 0, y: 0, w: 5, h: 5 });
    expect(clampRegion({ x: 30, y: 0, w: 5, h: 5 }, 20, 20)).toBeNull();
  });

  it('copes with regions of one pixel and with several regions', () => {
    const p = gradient(30, 30);
    applyRegions(p, [{ x: 3, y: 3, w: 1, h: 1 }, { x: 10, y: 10, w: 8, h: 8 }, { x: 20, y: 20, w: 8, h: 8 }], 'blur', 80);
    expect(px(p, 3, 3)[3]).toBe(255);
  });
});

describe('watermark and enlarge maths', () => {
  it('anchors a box at each of the nine positions', () => {
    const a = (pos: Parameters<typeof anchorBox>[0]) => anchorBox(pos, 1000, 600, 100, 50, 20);
    expect(a('top-left')).toEqual({ x: 20, y: 20 });
    expect(a('top-center')).toEqual({ x: 450, y: 20 });
    expect(a('top-right')).toEqual({ x: 880, y: 20 });
    expect(a('middle-left')).toEqual({ x: 20, y: 275 });
    expect(a('center')).toEqual({ x: 450, y: 275 });
    expect(a('middle-right')).toEqual({ x: 880, y: 275 });
    expect(a('bottom-left')).toEqual({ x: 20, y: 530 });
    expect(a('bottom-center')).toEqual({ x: 450, y: 530 });
    expect(a('bottom-right')).toEqual({ x: 880, y: 530 });
  });

  it('computes enlarged sizes by factor and by width', () => {
    expect(enlargedSize(400, 300, { mode: 'factor', factor: 2 })).toEqual({ w: 800, h: 600 });
    expect(enlargedSize(400, 300, { mode: 'width', width: 1000 })).toEqual({ w: 1000, h: 750 });
    expect(enlargedSize(3, 1, { mode: 'factor', factor: 1.5 })).toEqual({ w: 5, h: 2 });
  });
});

describe('SVG size', () => {
  it('uses width and height when both are in pixels or unitless', () => {
    expect(svgIntrinsicSize('<svg xmlns="x" width="120" height="80"></svg>')).toEqual({ width: 120, height: 80 });
    expect(svgIntrinsicSize('<svg width="120px" height="80px"/>')).toEqual({ width: 120, height: 80 });
    expect(svgIntrinsicSize("<svg width='64.5' height='32'>")).toEqual({ width: 64.5, height: 32 });
  });
  it('falls back to the viewBox, keeping its aspect ratio', () => {
    expect(svgIntrinsicSize('<svg viewBox="0 0 24 12"></svg>')).toEqual({ width: 24, height: 12 });
    expect(svgIntrinsicSize('<svg viewBox="0,0,100,50" width="200"></svg>')).toEqual({ width: 200, height: 100 });
    expect(svgIntrinsicSize('<svg viewBox="0 0 100 50" height="25"></svg>')).toEqual({ width: 50, height: 25 });
  });
  it('returns null when nothing usable is declared', () => {
    expect(svgIntrinsicSize('<svg width="100%" height="100%"></svg>')).toBeNull();
    expect(svgIntrinsicSize('<html></html>')).toBeNull();
  });
});

describe('QR codes', () => {
  const opts = { margin: 4, dark: '#000000', light: '#ffffff' };
  const roundTrip = (text: string, level: ErrorCorrection = 'M', o = opts, size = 400) =>
    decodeQr(qrPixels(qrMatrix(text, level), o, size));

  it('generates codes that a QR reader decodes back to the same text', () => {
    for (const text of ['https://kitwell.example/tools?x=1&y=2', 'Hello, world!', '12345', 'Ünïcödé ✓ — مرحبا', 'a'.repeat(500)]) {
      for (const level of ['L', 'M', 'Q', 'H'] as const) expect(roundTrip(text, level), `${text.slice(0, 12)} @${level}`).toBe(text);
    }
  });

  it('works with custom colours and with inverted (light on dark) codes', () => {
    expect(roundTrip('colour test', 'M', { margin: 4, dark: '#0f766e', light: '#fafaf9' })).toBe('colour test');
    expect(roundTrip('inverted', 'M', { margin: 4, dark: '#ffffff', light: '#000000' })).toBe('inverted');
  });

  it('draws whole-pixel modules at about the requested size', () => {
    const m = qrMatrix('size', 'M');
    const { width, height } = qrPixels(m, opts, 512);
    expect(width).toBe(height);
    expect(width % (m.size + 8)).toBe(0);
    expect(width).toBeLessThanOrEqual(512);
    expect(width).toBeGreaterThan(512 - (m.size + 8));
  });

  it('produces a valid, compact SVG', () => {
    const svg = qrSvg(qrMatrix('svg', 'M'), opts);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ')).toBe(true);
    expect(svg).toContain('fill="#ffffff"');
    expect(svg).toContain('fill="#000000"');
    expect(svg.length).toBeLessThan(6000);
    expect(svg).not.toMatch(/<script|onload/i);
  });

  it('rejects empty input, oversized data and bad colours', () => {
    expect(() => qrMatrix('', 'M')).toThrow(QrError);
    expect(() => qrMatrix('x'.repeat(4000), 'H')).toThrow(/too much data/);
    expect(() => qrPixels(qrMatrix('x', 'M'), { ...opts, dark: 'red' }, 200)).toThrow(/valid colours/);
    expect(() => qrSvg(qrMatrix('x', 'M'), { ...opts, light: 'javascript:' })).toThrow(/valid colours/);
  });

  it('measures colour contrast', () => {
    expect(qrContrast('#000000', '#ffffff')).toBeCloseTo(21, 0);
    expect(qrContrast('#777777', '#888888')).toBeLessThan(1.5);
  });

  it('builds Wi-Fi payloads with escaping, and they round-trip through a scan', () => {
    expect(wifiPayload({ ssid: 'Home', password: 'secret', security: 'WPA', hidden: false })).toBe('WIFI:T:WPA;S:Home;P:secret;H:false;;');
    expect(wifiPayload({ ssid: 'Cafe', password: '', security: 'nopass', hidden: true })).toBe('WIFI:T:nopass;S:Cafe;H:true;;');
    const nasty = wifiPayload({ ssid: 'A;B:C,"D"\\E', password: 'p;a:s,s\\', security: 'WPA', hidden: false });
    const scanned = classifyQr(roundTrip(nasty, 'M') as string);
    expect(scanned.kind).toBe('wifi');
    expect(scanned.wifi).toEqual({ ssid: 'A;B:C,"D"\\E', password: 'p;a:s,s\\', security: 'WPA', hidden: false });
    expect(() => wifiPayload({ ssid: '', password: 'x', security: 'WPA', hidden: false })).toThrow(/network name/);
    expect(() => wifiPayload({ ssid: 'x', password: '', security: 'WPA', hidden: false })).toThrow(/password/);
  });

  it('builds email and phone payloads', () => {
    expect(emailPayload('a@b.co')).toBe('mailto:a@b.co');
    expect(emailPayload('a@b.co', 'Hi there', 'Line 1\nLine 2')).toBe('mailto:a@b.co?subject=Hi%20there&body=Line%201%0ALine%202');
    expect(() => emailPayload('not-an-email')).toThrow(/valid email/);
    expect(phonePayload('+1 (555) 010-9999')).toBe('tel:+15550109999');
    expect(() => phonePayload('call me')).toThrow(/digits/);
  });

  it('classifies scanned content and never offers unsafe links', () => {
    expect(classifyQr('https://example.com/a?b=c')).toMatchObject({ kind: 'url', href: 'https://example.com/a?b=c' });
    expect(classifyQr('HTTP://EXAMPLE.COM')).toMatchObject({ kind: 'url' });
    expect(classifyQr('javascript:alert(1)')).toEqual({ kind: 'unsafe-link', text: 'javascript:alert(1)' });
    expect(classifyQr('data:text/html,<script>1</script>').kind).toBe('unsafe-link');
    expect(classifyQr('mailto:a@b.co').kind).toBe('email');
    expect(classifyQr('tel:+123').kind).toBe('phone');
    expect(classifyQr('just words').kind).toBe('text');
    expect(classifyQr('just words').href).toBeUndefined();
  });

  it('returns null when an image has no QR code', () => {
    expect(decodeQr(gradient(200, 200))).toBeNull();
    expect(decodeQr(solid(100, 100, [255, 255, 255, 255]))).toBeNull();
  });
});
