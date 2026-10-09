/**
 * QR code generation and reading. Matrix, SVG, pixel and payload logic is pure so it can be tested in Node.
 * Generation uses `qrcode` for the matrix only; drawing is done here so size and colours are exact.
 */
import jsQR from 'jsqr';
import QRCode from 'qrcode';
import { decode, makeCanvas, type Ctx2D } from './imageProcessor';
import { tr } from '@/i18n/translate';

export type ErrorCorrection = 'L' | 'M' | 'Q' | 'H';

export interface QrMatrix {
  size: number;
  isDark(x: number, y: number): boolean;
}

export class QrError extends Error {}

export function qrMatrix(text: string, level: ErrorCorrection): QrMatrix {
  if (!text) throw new QrError(tr('err.qr.noText'));
  try {
    const qr = QRCode.create(text, { errorCorrectionLevel: level });
    const { size } = qr.modules;
    return { size, isDark: (x, y) => qr.modules.get(y, x) === 1 };
  } catch {
    throw new QrError(tr('err.qr.tooMuchData'));
  }
}

const HEX = /^#[0-9a-f]{6}$/i;
const parseHex = (hex: string): [number, number, number] => {
  if (!HEX.test(hex)) throw new QrError(tr('err.qr.badColours'));
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export interface RenderOptions {
  /** Quiet zone around the code, in modules. The QR standard asks for 4. */
  margin: number;
  dark: string;
  light: string;
}

/** Compact SVG: one background rectangle and one path made of horizontal runs of dark modules. */
export function qrSvg(m: QrMatrix, { margin, dark, light }: RenderOptions): string {
  parseHex(dark);
  parseHex(light);
  const total = m.size + margin * 2;
  let path = '';
  for (let y = 0; y < m.size; y++) {
    let x = 0;
    while (x < m.size) {
      if (!m.isDark(x, y)) {
        x++;
        continue;
      }
      const start = x;
      while (x < m.size && m.isDark(x, y)) x++;
      path += `M${start + margin} ${y + margin}h${x - start}v1h-${x - start}z`;
    }
  }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges">` +
    `<rect width="${total}" height="${total}" fill="${light}"/><path d="${path}" fill="${dark}"/></svg>`
  );
}

/** The real size of a PNG for a target size: a whole number of pixels per module keeps edges sharp. */
export function qrOutputSize(m: QrMatrix, margin: number, targetSize: number) {
  const modules = m.size + margin * 2;
  const scale = Math.max(1, Math.floor(targetSize / modules));
  return { modules, scale, size: modules * scale };
}

/** RGBA pixels for the code at a whole number of pixels per module, so edges stay sharp. */
export function qrPixels(m: QrMatrix, { margin, dark, light }: RenderOptions, targetSize: number) {
  const { scale, size } = qrOutputSize(m, margin, targetSize);
  const [dr, dg, db] = parseHex(dark);
  const [lr, lg, lb] = parseHex(light);
  const data = new Uint8ClampedArray(size * size * 4);
  for (let py = 0; py < size; py++) {
    const my = Math.floor(py / scale) - margin;
    for (let px = 0; px < size; px++) {
      const mx = Math.floor(px / scale) - margin;
      const on = mx >= 0 && my >= 0 && mx < m.size && my < m.size && m.isDark(mx, my);
      const i = (py * size + px) * 4;
      data[i] = on ? dr : lr;
      data[i + 1] = on ? dg : lg;
      data[i + 2] = on ? db : lb;
      data[i + 3] = 255;
    }
  }
  return { data, width: size, height: size };
}

const luminance = ([r, g, b]: [number, number, number]) => {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

/** Contrast between the two colours (1 to 21). Scanners struggle below about 3. */
export function qrContrast(dark: string, light: string): number {
  const [hi, lo] = [luminance(parseHex(dark)), luminance(parseHex(light))].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

// ---------- Payloads ----------

const escapeWifi = (s: string) => s.replace(/([\\;,:"])/g, '\\$1');

export interface WifiInput {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export function wifiPayload({ ssid, password, security, hidden }: WifiInput): string {
  if (!ssid) throw new QrError(tr('err.qr.wifiName'));
  if (security !== 'nopass' && !password) throw new QrError(tr('err.qr.wifiPassword'));
  const pw = security === 'nopass' ? '' : `P:${escapeWifi(password)};`;
  return `WIFI:T:${security};S:${escapeWifi(ssid)};${pw}H:${hidden ? 'true' : 'false'};;`;
}

export function emailPayload(address: string, subject = '', body = ''): string {
  const to = address.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new QrError(tr('err.qr.email'));
  const params = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join('&');
  return `mailto:${to}${params ? `?${params}` : ''}`;
}

export function phonePayload(number: string): string {
  const cleaned = number.replace(/[\s().-]/g, '');
  if (!/^\+?\d{3,15}$/.test(cleaned)) throw new QrError(tr('err.qr.phone'));
  return `tel:${cleaned}`;
}

// ---------- Reading ----------

export interface Scanned {
  kind: 'url' | 'wifi' | 'email' | 'phone' | 'sms' | 'unsafe-link' | 'text';
  text: string;
  /** Safe to open in a new tab (http or https only). */
  href?: string;
  wifi?: { ssid: string; password: string; security: string; hidden: boolean };
}

function parseWifi(text: string): Scanned['wifi'] {
  const body = text.slice(5);
  const fields: Record<string, string> = {};
  let key = '';
  let val = '';
  let inKey = true;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '\\' && i + 1 < body.length) {
      if (inKey) key += body[++i];
      else val += body[++i];
    } else if (inKey && c === ':') inKey = false;
    else if (!inKey && c === ';') {
      fields[key] = val;
      key = '';
      val = '';
      inKey = true;
    } else if (inKey) key += c;
    else val += c;
  }
  return { ssid: fields.S ?? '', password: fields.P ?? '', security: fields.T ?? '', hidden: fields.H === 'true' };
}

export function classifyQr(text: string): Scanned {
  const t = text.trim();
  if (/^wifi:/i.test(t)) return { kind: 'wifi', text, wifi: parseWifi(t) };
  if (/^(javascript|data|vbscript|file):/i.test(t)) return { kind: 'unsafe-link', text };
  if (/^https?:\/\//i.test(t)) {
    try {
      return { kind: 'url', text, href: new URL(t).href };
    } catch {
      return { kind: 'text', text };
    }
  }
  if (/^mailto:/i.test(t)) return { kind: 'email', text };
  if (/^tel:/i.test(t)) return { kind: 'phone', text };
  if (/^sms(to)?:/i.test(t)) return { kind: 'sms', text };
  return { kind: 'text', text };
}

/** Finds one QR code in RGBA pixels, trying both dark-on-light and light-on-dark. */
export function decodeQr(pixels: { data: Uint8ClampedArray; width: number; height: number }): string | null {
  const found = jsQR(pixels.data, pixels.width, pixels.height, { inversionAttempts: 'attemptBoth' });
  return found?.data ? found.data : null;
}

/**
 * Reads a QR code from an image file. Tries a few sizes, because downscaling helps with noisy or
 * very large photos and a larger copy helps with small codes.
 */
export async function scanImageFile(file: Blob): Promise<string | null> {
  const bitmap = await decode(file);
  try {
    const longest = Math.max(bitmap.width, bitmap.height);
    const tried = new Set<number>();
    for (const limit of [1600, 800, 2800, 400]) {
      const k = Math.min(1, limit / longest);
      const w = Math.max(1, Math.round(bitmap.width * k));
      if (tried.has(w)) continue;
      tried.add(w);
      const h = Math.max(1, Math.round(bitmap.height * k));
      const canvas = makeCanvas(w, h);
      const ctx = canvas.getContext('2d', { willReadFrequently: true }) as Ctx2D | null;
      if (!ctx) throw new QrError(tr('err.qr.unreadableImage'));
      ctx.fillStyle = '#ffffff'; // transparent pixels would otherwise read as black
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(bitmap, 0, 0, w, h);
      const found = decodeQr(ctx.getImageData(0, 0, w, h));
      if (found) return found;
    }
    return null;
  } finally {
    bitmap.close();
  }
}
