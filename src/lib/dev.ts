import { tr } from '@/i18n/translate';
/** Pure developer-tool utilities: JSON, XML, encoding, regex, generators, time and colour. */

// ---------- JSON ----------

export interface JsonIssue {
  message: string;
  line: number;
  column: number;
}

export type JsonResult<T> = { ok: true; value: T } | { ok: false; error: JsonIssue };

function positionToLineCol(text: string, pos: number): { line: number; column: number } {
  const before = text.slice(0, Math.max(0, Math.min(pos, text.length)));
  const parts = before.split('\n');
  return { line: parts.length, column: parts[parts.length - 1].length + 1 };
}

/**
 * Strict JSON scanner used only to explain *where* the native parser failed.
 * Native JSON.parse remains the source of truth for validity.
 */
function scanJson(text: string): { pos: number; message: string } | null {
  let i = 0;
  const fail = (message: string, pos = i): never => {
    throw { pos, message };
  };
  const ws = () => {
    while (i < text.length && /[ \t\n\r]/.test(text[i])) i++;
  };
  const literal = (word: string) => {
    if (text.startsWith(word, i)) i += word.length;
    else fail(`Unexpected token, expected "${word}"`);
  };
  const str = () => {
    i++; // opening quote
    while (i < text.length) {
      const c = text[i];
      if (c === '"') {
        i++;
        return;
      }
      if (c === '\\') {
        const n = text[i + 1];
        if (n === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(text.slice(i + 2, i + 6))) fail(tr('err.json.badUnicode'));
          i += 6;
        } else if (n !== undefined && '"\\/bfnrt'.includes(n)) i += 2;
        else fail(tr('err.json.badEscape'));
      } else if (c < ' ') fail(tr('err.json.controlChar'));
      else i++;
    }
    fail(tr('err.json.unterminatedString'));
  };
  const num = () => {
    const m = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(text.slice(i));
    if (!m) fail(tr('err.json.invalidNumber'));
    else i += m[0].length;
  };
  const value = (): void => {
    ws();
    const c = text[i];
    if (c === undefined) fail(tr('err.json.unexpectedEnd'));
    else if (c === '{') {
      i++;
      ws();
      if (text[i] === '}') {
        i++;
        return;
      }
      for (;;) {
        ws();
        if (text[i] !== '"') fail(text[i] === '}' ? tr('err.json.trailingComma') : tr('err.json.propertyName'));
        str();
        ws();
        if (text[i] !== ':') fail('Expected ":" after property name');
        i++;
        value();
        ws();
        if (text[i] === ',') {
          i++;
          continue;
        }
        if (text[i] === '}') {
          i++;
          return;
        }
        fail('Expected "," or "}"');
      }
    } else if (c === '[') {
      i++;
      ws();
      if (text[i] === ']') {
        i++;
        return;
      }
      for (;;) {
        ws();
        if (text[i] === ']') fail(tr('err.json.trailingComma'));
        value();
        ws();
        if (text[i] === ',') {
          i++;
          continue;
        }
        if (text[i] === ']') {
          i++;
          return;
        }
        fail('Expected "," or "]"');
      }
    } else if (c === '"') str();
    else if (c === 't') literal('true');
    else if (c === 'f') literal('false');
    else if (c === 'n') literal('null');
    else if (c === '-' || (c >= '0' && c <= '9')) num();
    else fail(c === "'" ? tr('err.json.doubleQuotes') : tr('err.json.unexpectedChar', { char: c }));
  };
  try {
    value();
    ws();
    if (i < text.length) fail(tr('err.json.trailingContent'));
    return null;
  } catch (e) {
    if (typeof e === 'object' && e && 'pos' in e) return e as { pos: number; message: string };
    throw e;
  }
}

export function parseJson(text: string): JsonResult<unknown> {
  if (!text.trim()) return { ok: false, error: { message: tr('err.json.empty'), line: 1, column: 1 } };
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (err) {
    const located = scanJson(text);
    if (located) return { ok: false, error: { message: located.message, ...positionToLineCol(text, located.pos) } };
    return { ok: false, error: { message: err instanceof Error ? err.message : tr('err.json.invalid'), line: 1, column: 1 } };
  }
}

export function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => [k, sortKeysDeep(v)]),
    );
  }
  return value;
}

export function formatJson(text: string, indent: number | 'tab', sortKeys: boolean): JsonResult<string> {
  const parsed = parseJson(text);
  if (!parsed.ok) return parsed;
  const v = sortKeys ? sortKeysDeep(parsed.value) : parsed.value;
  return { ok: true, value: JSON.stringify(v, null, indent === 'tab' ? '\t' : indent) };
}

export function minifyJson(text: string): JsonResult<string> {
  const parsed = parseJson(text);
  if (!parsed.ok) return parsed;
  return { ok: true, value: JSON.stringify(parsed.value) };
}

export function describeJson(value: unknown): { type: string; summary: string; depth: number } {
  const depth = (v: unknown): number =>
    Array.isArray(v)
      ? 1 + Math.max(0, ...v.map(depth))
      : v && typeof v === 'object'
        ? 1 + Math.max(0, ...Object.values(v).map(depth))
        : 0;
  if (Array.isArray(value)) return { type: 'Array', summary: `${value.length} item${value.length === 1 ? '' : 's'}`, depth: depth(value) };
  if (value && typeof value === 'object') {
    const n = Object.keys(value).length;
    return { type: 'Object', summary: `${n} key${n === 1 ? '' : 's'}`, depth: depth(value) };
  }
  return { type: value === null ? 'null' : typeof value, summary: String(value), depth: 0 };
}

// ---------- XML ----------

export interface XmlError {
  message: string;
  line: number;
  column: number;
}

type XmlNode =
  | { kind: 'element'; name: string; attrs: string; selfClosing: boolean; children: XmlNode[] }
  | { kind: 'text'; value: string }
  | { kind: 'raw'; value: string };

export function parseXml(text: string): { ok: true; nodes: XmlNode[] } | { ok: false; error: XmlError } {
  const root: XmlNode[] = [];
  const stack: { name: string; pos: number; children: XmlNode[] }[] = [{ name: '', pos: 0, children: root }];
  const err = (message: string, pos: number) => ({ ok: false as const, error: { message, ...positionToLineCol(text, pos) } });
  let i = 0;
  while (i < text.length) {
    if (text[i] !== '<') {
      const end = text.indexOf('<', i);
      const chunk = text.slice(i, end === -1 ? text.length : end);
      stack[stack.length - 1].children.push({ kind: 'text', value: chunk });
      i += chunk.length;
      continue;
    }
    const rawEnd = (open: string, close: string) => {
      const end = text.indexOf(close, i + open.length);
      return end === -1 ? -1 : end + close.length;
    };
    let next: number;
    if (text.startsWith('<!--', i)) {
      next = rawEnd('<!--', '-->');
      if (next < 0) return err(tr('err.xml.unterminatedComment'), i);
      stack[stack.length - 1].children.push({ kind: 'raw', value: text.slice(i, next) });
    } else if (text.startsWith('<![CDATA[', i)) {
      next = rawEnd('<![CDATA[', ']]>');
      if (next < 0) return err('Unterminated CDATA section', i);
      stack[stack.length - 1].children.push({ kind: 'raw', value: text.slice(i, next) });
    } else if (text.startsWith('<?', i)) {
      next = rawEnd('<?', '?>');
      if (next < 0) return err(tr('err.xml.unterminatedPi'), i);
      stack[stack.length - 1].children.push({ kind: 'raw', value: text.slice(i, next) });
    } else if (text.startsWith('<!', i)) {
      // DOCTYPE, possibly with an internal subset in brackets.
      let depth = 0;
      let j = i + 2;
      for (; j < text.length; j++) {
        if (text[j] === '[') depth++;
        else if (text[j] === ']') depth--;
        else if (text[j] === '>' && depth <= 0) break;
      }
      if (j >= text.length) return err(tr('err.xml.unterminatedDeclaration'), i);
      next = j + 1;
      stack[stack.length - 1].children.push({ kind: 'raw', value: text.slice(i, next) });
    } else {
      // Tag: find closing ">" that is not inside a quoted attribute value.
      let j = i + 1;
      let quote = '';
      for (; j < text.length; j++) {
        const c = text[j];
        if (quote) {
          if (c === quote) quote = '';
        } else if (c === '"' || c === "'") quote = c;
        else if (c === '>') break;
      }
      if (j >= text.length) return err(quote ? tr('err.xml.unterminatedAttribute') : tr('err.xml.unterminatedTag'), i);
      const inner = text.slice(i + 1, j);
      next = j + 1;
      if (inner.startsWith('/')) {
        const name = inner.slice(1).trim();
        const top = stack[stack.length - 1];
        if (stack.length === 1) return err(tr('err.xml.unexpectedClosing', { name }), i);
        if (top.name !== name) return err(tr('err.xml.mismatched', { expected: top.name, found: name }), i);
        stack.pop();
      } else {
        const m = /^([^\s/>]+)([\s\S]*?)(\/?)$/.exec(inner);
        if (!m || !/^[A-Za-z_:][\w:.-]*$/.test(m[1])) return err(tr('err.xml.invalidTagName', { name: inner.split(/\s/)[0] }), i);
        const node: XmlNode = { kind: 'element', name: m[1], attrs: m[2].trim(), selfClosing: m[3] === '/', children: [] };
        stack[stack.length - 1].children.push(node);
        if (!node.selfClosing) stack.push({ name: node.name, pos: i, children: node.children });
      }
    }
    i = next;
  }
  if (stack.length > 1) {
    const open = stack[stack.length - 1];
    return err(tr('err.xml.unclosedTag', { name: open.name }), open.pos);
  }
  const elements = root.filter((n) => n.kind === 'element');
  if (elements.length === 0) return err(tr('err.xml.noElement'), 0);
  if (elements.length > 1) return err(tr('err.xml.singleRoot'), 0);
  const stray = root.find((n) => n.kind === 'text' && n.value.trim() !== '');
  if (stray) return err(tr('err.xml.strayText'), text.indexOf((stray as { value: string }).value.trim()));
  return { ok: true, nodes: root };
}

export function formatXml(text: string, indent: number | 'tab', minify: boolean): { ok: true; value: string } | { ok: false; error: XmlError } {
  if (!text.trim()) return { ok: false, error: { message: tr('err.xml.empty'), line: 1, column: 1 } };
  const parsed = parseXml(text);
  if (!parsed.ok) return parsed;
  const unit = indent === 'tab' ? '\t' : ' '.repeat(indent);
  const out: string[] = [];

  const meaningful = (nodes: XmlNode[]) => nodes.filter((n) => !(n.kind === 'text' && n.value.trim() === ''));
  const open = (n: Extract<XmlNode, { kind: 'element' }>) => `<${n.name}${n.attrs ? ' ' + n.attrs : ''}`;

  const walk = (nodes: XmlNode[], depth: number) => {
    const pad = minify ? '' : unit.repeat(depth);
    for (const node of meaningful(nodes)) {
      if (node.kind === 'text') out.push(pad + node.value.trim());
      else if (node.kind === 'raw') out.push(pad + node.value);
      else {
        const kids = meaningful(node.children);
        if (node.selfClosing || kids.length === 0) out.push(pad + open(node) + (node.selfClosing ? '/>' : `></${node.name}>`));
        else if (kids.length === 1 && kids[0].kind === 'text') out.push(`${pad}${open(node)}>${kids[0].value.trim()}</${node.name}>`);
        else {
          out.push(`${pad}${open(node)}>`);
          walk(node.children, depth + 1);
          out.push(`${pad}</${node.name}>`);
        }
      }
    }
  };
  walk(parsed.nodes, 0);
  return { ok: true, value: out.join(minify ? '' : '\n') };
}

// ---------- Encoding ----------

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', reg: '®', trade: '™', hellip: '…',
  mdash: '—', ndash: '–', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bull: '•', middot: '·', euro: '€',
  pound: '£', yen: '¥', cent: '¢', sect: '§', deg: '°', plusmn: '±', times: '×', divide: '÷', laquo: '«',
  raquo: '»', para: '¶', larr: '←', rarr: '→', uarr: '↑', darr: '↓', hearts: '♥', frac12: '½', frac14: '¼', frac34: '¾',
};

export function htmlEncode(text: string, nonAscii = false): string {
  let out = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  if (nonAscii) out = Array.from(out, (c) => (c.codePointAt(0)! > 127 ? `&#${c.codePointAt(0)};` : c)).join('');
  return out;
}

export function htmlDecode(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (whole, body: string) => {
    if (body[0] === '#') {
      const code = body[1].toLowerCase() === 'x' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : whole;
    }
    return NAMED_ENTITIES[body] ?? NAMED_ENTITIES[body.toLowerCase()] ?? whole;
  });
}

export type UrlMode = 'component' | 'full';

export function urlEncode(text: string, mode: UrlMode, spaceAsPlus: boolean): string {
  const encoded = mode === 'component' ? encodeURIComponent(text) : encodeURI(text);
  return spaceAsPlus ? encoded.replace(/%20/g, '+') : encoded;
}

export function urlDecode(text: string, mode: UrlMode, plusAsSpace: boolean): string {
  const input = plusAsSpace ? text.replace(/\+/g, ' ') : text;
  try {
    return mode === 'component' ? decodeURIComponent(input) : decodeURI(input);
  } catch {
    throw new Error(tr('err.dev.malformedPercent'));
  }
}

export function base64Encode(text: string, urlSafe: boolean): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  const b64 = btoa(bin);
  return urlSafe ? b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : b64;
}

export function base64ToBytes(input: string): Uint8Array {
  const cleaned = input.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned) || cleaned.length % 4 === 1) {
    throw new Error(tr('err.dev.badBase64'));
  }
  const padded = cleaned + '='.repeat((4 - (cleaned.length % 4)) % 4);
  let bin: string;
  try {
    bin = atob(padded);
  } catch {
    throw new Error(tr('err.dev.badBase64'));
  }
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export function base64Decode(input: string): string {
  const bytes = base64ToBytes(input);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error(tr('err.dev.notUtf8'));
  }
}

// ---------- Regex ----------

export interface RegexMatch {
  index: number;
  text: string;
  groups: (string | undefined)[];
  named: Record<string, string | undefined>;
}

export interface RegexRun {
  error?: string;
  matches: RegexMatch[];
  truncated: boolean;
  replaced?: string;
}

export const MAX_REGEX_MATCHES = 5000;

export function runRegex(pattern: string, flags: string, text: string, replacement?: string): RegexRun {
  if (!pattern) return { matches: [], truncated: false };
  let re: RegExp;
  try {
    re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
  } catch (e) {
    return { error: e instanceof Error ? e.message : tr('err.regex.invalid'), matches: [], truncated: false };
  }
  const matches: RegexMatch[] = [];
  let truncated = false;
  for (const m of text.matchAll(re)) {
    if (matches.length >= MAX_REGEX_MATCHES) {
      truncated = true;
      break;
    }
    matches.push({ index: m.index ?? 0, text: m[0], groups: m.slice(1), named: { ...m.groups } });
  }
  let replaced: string | undefined;
  if (replacement !== undefined) {
    try {
      replaced = text.replace(new RegExp(pattern, flags), replacement);
    } catch {
      replaced = undefined;
    }
  }
  return { matches, truncated, replaced };
}

// ---------- Generators ----------

/** Uniform random integer in [0, max) using rejection sampling (no modulo bias). */
export function secureRandomInt(max: number): number {
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  do crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % max;
}

/** True for passwords with three or more identical characters in a row, or a run of four consecutive characters (1234, abcd, 9876). */
export function hasWeakPattern(password: string): boolean {
  const lower = password.toLowerCase();
  for (let i = 0; i + 2 < lower.length; i++) {
    if (lower[i] === lower[i + 1] && lower[i] === lower[i + 2]) return true;
  }
  for (let i = 0; i + 3 < lower.length; i++) {
    const a = lower.charCodeAt(i);
    const d1 = lower.charCodeAt(i + 1) - a;
    if ((d1 === 1 || d1 === -1) && lower.charCodeAt(i + 2) - lower.charCodeAt(i + 1) === d1 && lower.charCodeAt(i + 3) - lower.charCodeAt(i + 2) === d1) {
      if (/^[a-z0-9]{4}$/.test(lower.slice(i, i + 4))) return true;
    }
  }
  return false;
}

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '@#$*',
};
const AMBIGUOUS = /[Il1O0o]/g;

export function passwordPools(o: PasswordOptions): string[] {
  return (['lower', 'upper', 'digits', 'symbols'] as const)
    .filter((k) => o[k])
    .map((k) => (o.excludeAmbiguous ? SETS[k].replace(AMBIGUOUS, '') : SETS[k]))
    .filter(Boolean);
}

/** Lengths the password generator offers, in both styles. */
export const PASSWORD_LENGTH = { min: 8, max: 16 } as const;
/** How many passwords can be generated at once. */
export const PASSWORD_COUNT = { min: 5, max: 10 } as const;

/** Brings a requested number of passwords into 5-10; an empty or invalid value becomes the minimum. */
export const clampPasswordCount = (n: number | ''): number => (n === '' || !Number.isFinite(n) ? PASSWORD_COUNT.min : Math.min(PASSWORD_COUNT.max, Math.max(PASSWORD_COUNT.min, Math.floor(n))));

export function generatePassword(o: PasswordOptions): string {
  const wanted = Math.floor(o.length);
  if (!(wanted >= PASSWORD_LENGTH.min && wanted <= PASSWORD_LENGTH.max)) throw new Error(tr('err.passwords.length', { min: PASSWORD_LENGTH.min, max: PASSWORD_LENGTH.max }));
  // A random password that happens to contain 1111 or abcd is rare, but would be easy to guess, so try again.
  for (let i = 0; i < 50; i++) {
    const candidate = buildPassword(o);
    if (!hasWeakPattern(candidate)) return candidate;
  }
  return buildPassword(o);
}

function buildPassword(o: PasswordOptions): string {
  const pools = passwordPools(o);
  if (pools.length === 0) throw new Error(tr('err.dev.noCharType'));
  const length = Math.min(PASSWORD_LENGTH.max, Math.max(pools.length, Math.floor(o.length)));
  const all = pools.join('');
  // Guarantee at least one character from every selected pool, then fill and shuffle.
  const chars = pools.map((p) => p[secureRandomInt(p.length)]);
  while (chars.length < length) chars.push(all[secureRandomInt(all.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

export function passwordEntropyBits(o: PasswordOptions): number {
  const size = passwordPools(o).join('').length;
  return size > 1 ? Math.floor(o.length * Math.log2(size)) : 0;
}

export function generateUuid(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

// ---------- Timestamps ----------

export type TimestampUnit = 'auto' | 's' | 'ms';

export function parseTimestamp(input: string, unit: TimestampUnit): { date: Date; unit: 's' | 'ms' } {
  const trimmed = input.trim();
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) throw new Error(tr('err.dev.timestampFormat'));
  const resolved: 's' | 'ms' = unit === 'auto' ? (trimmed.replace('-', '').split('.')[0].length >= 13 ? 'ms' : 's') : unit;
  const ms = Number(trimmed) * (resolved === 's' ? 1000 : 1);
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) throw new Error(tr('err.dev.timestampRange'));
  return { date, unit: resolved };
}

export function relativeTime(date: Date, now = new Date()): string {
  const diff = (date.getTime() - now.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const abs = Math.abs(diff);
  const steps: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'], [3600, 'minute'], [86400, 'hour'], [2_592_000, 'day'], [31_536_000, 'month'], [Infinity, 'year'],
  ];
  const divisors = [1, 60, 3600, 86400, 2_592_000, 31_536_000];
  const idx = steps.findIndex(([limit]) => abs < limit);
  return rtf.format(Math.round(diff / divisors[idx]), steps[idx][1]);
}

// ---------- Colour ----------

export interface Rgb { r: number; g: number; b: number }
export interface Hsl { h: number; s: number; l: number }
export interface Hsv { h: number; s: number; v: number }

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function rgbToHex({ r, g, b }: Rgb): string {
  return '#' + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sn = s / 100;
  const ln = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const d = max - Math.min(rn, gn, bn);
  const { h } = rgbToHsl({ r, g, b });
  return { h, s: Math.round((max === 0 ? 0 : d / max) * 100), v: Math.round(max * 100) };
}

/** Parses #rgb, #rrggbb, rgb(...) and hsl(...). Alpha values are accepted and ignored. */
export function parseColor(input: string): Rgb | null {
  const s = input.trim().toLowerCase();
  let m = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(s);
  if (m) {
    let hex = m[1];
    if (hex.length <= 4) hex = Array.from(hex, (c) => c + c).join('');
    return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) };
  }
  m = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?)[\s,]+(\d{1,3}(?:\.\d+)?)[\s,]+(\d{1,3}(?:\.\d+)?)(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/.exec(s);
  if (m) {
    const [r, g, b] = [m[1], m[2], m[3]].map(Number);
    return r > 255 || g > 255 || b > 255 ? null : { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  }
  m = /^hsla?\(\s*(-?\d+(?:\.\d+)?)(?:deg)?[\s,]+(\d{1,3}(?:\.\d+)?)%[\s,]+(\d{1,3}(?:\.\d+)?)%(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/.exec(s);
  if (m) {
    const h = ((Number(m[1]) % 360) + 360) % 360;
    const sat = Number(m[2]);
    const lig = Number(m[3]);
    return sat > 100 || lig > 100 ? null : hslToRgb({ h, s: sat, l: lig });
  }
  return null;
}

function luminance({ r, g, b }: Rgb): number {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
