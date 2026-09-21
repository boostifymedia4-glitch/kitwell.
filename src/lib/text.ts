/** Pure text utilities used by the text tools. */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  bytes: number;
  readingMinutes: number;
  speakingMinutes: number;
}

const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('en', { granularity: 'grapheme' }) : null;

export function countGraphemes(text: string): number {
  if (!segmenter) return Array.from(text).length;
  let n = 0;
  for (const _ of segmenter.segment(text)) n++;
  return n;
}

export function textStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed ? trimmed.split(/[.!?]+(?:\s+|$)/).filter((s) => s.trim()).length : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  return {
    words,
    characters: countGraphemes(text),
    charactersNoSpaces: countGraphemes(text.replace(/\s/g, '')),
    sentences,
    paragraphs,
    lines: text ? text.split(/\r\n|\r|\n/).length : 0,
    bytes: new TextEncoder().encode(text).length,
    readingMinutes: words / 238,
    speakingMinutes: words / 150,
  };
}

export function formatMinutes(min: number): string {
  if (min <= 0) return '0 sec';
  if (min < 1) return `${Math.max(1, Math.round(min * 60))} sec`;
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return s ? `${m} min ${s} sec` : `${m} min`;
}

// ---------- Case conversion ----------

export type CaseMode =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant'
  | 'toggle';

const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'via', 'vs']);

/** Splits "someMixed_case-text" into ["some", "Mixed", "case", "text"]. */
export function splitWords(line: string): string[] {
  return line
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

const cap = (w: string) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w);

function titleCase(line: string): string {
  const parts = line.toLowerCase().split(/(\s+)/);
  const wordIdx = parts.map((p, i) => (/\S/.test(p) ? i : -1)).filter((i) => i >= 0);
  const first = wordIdx[0];
  const last = wordIdx[wordIdx.length - 1];
  return parts
    .map((p, i) => {
      if (!/\S/.test(p)) return p;
      if (i !== first && i !== last && SMALL_WORDS.has(p)) return p;
      return p.replace(/^(\P{L}*)(\p{L})/u, (_, pre: string, ch: string) => pre + ch.toUpperCase());
    })
    .join('');
}

function sentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (_, pre: string, ch: string) => pre + ch.toUpperCase());
}

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.split('\n').map(titleCase).join('\n');
    case 'sentence':
      return sentenceCase(text);
    case 'toggle':
      return Array.from(text, (c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('');
    default:
      return text
        .split('\n')
        .map((line) => {
          const words = splitWords(line);
          if (mode === 'camel') return words.map((w, i) => (i === 0 ? w.toLowerCase() : cap(w))).join('');
          if (mode === 'pascal') return words.map(cap).join('');
          if (mode === 'snake') return words.map((w) => w.toLowerCase()).join('_');
          if (mode === 'kebab') return words.map((w) => w.toLowerCase()).join('-');
          return words.map((w) => w.toUpperCase()).join('_');
        })
        .join('\n');
  }
}

// ---------- Line tools ----------

const lines = (text: string) => text.split(/\r\n|\r|\n/);

export interface DedupeOptions {
  ignoreCase: boolean;
  trimLines: boolean;
  removeEmpty: boolean;
}

export function removeDuplicateLines(text: string, opts: DedupeOptions): { output: string; removed: number; kept: number } {
  const seen = new Set<string>();
  const out: string[] = [];
  let removed = 0;
  for (const raw of lines(text)) {
    const line = opts.trimLines ? raw.trim() : raw;
    if (opts.removeEmpty && line.trim() === '') {
      removed++;
      continue;
    }
    const key = opts.ignoreCase ? line.toLowerCase() : line;
    if (seen.has(key)) {
      removed++;
      continue;
    }
    seen.add(key);
    out.push(line);
  }
  return { output: out.join('\n'), removed, kept: out.length };
}

export type SortMode = 'az' | 'za' | 'numeric' | 'length' | 'reverse' | 'shuffle';

export interface SortOptions {
  mode: SortMode;
  ignoreCase: boolean;
  natural: boolean;
  removeEmpty: boolean;
}

function randomIndex(max: number): number {
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  do crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % max;
}

export function sortLines(text: string, opts: SortOptions): string {
  let list = lines(text);
  if (opts.removeEmpty) list = list.filter((l) => l.trim() !== '');
  const collator = new Intl.Collator(undefined, {
    sensitivity: opts.ignoreCase ? 'accent' : 'variant',
    numeric: opts.natural,
  });
  switch (opts.mode) {
    case 'az':
      list.sort(collator.compare);
      break;
    case 'za':
      list.sort((a, b) => collator.compare(b, a));
      break;
    case 'numeric': {
      const num = (s: string) => {
        const m = /-?\d+(?:\.\d+)?/.exec(s);
        return m ? Number(m[0]) : Number.POSITIVE_INFINITY;
      };
      list.sort((a, b) => num(a) - num(b) || collator.compare(a, b));
      break;
    }
    case 'length':
      list.sort((a, b) => a.length - b.length || collator.compare(a, b));
      break;
    case 'reverse':
      list.reverse();
      break;
    case 'shuffle':
      for (let i = list.length - 1; i > 0; i--) {
        const j = randomIndex(i + 1);
        [list[i], list[j]] = [list[j], list[i]];
      }
      break;
  }
  return list.join('\n');
}

// ---------- Cleaning ----------

export interface CleanOptions {
  trimLines: boolean;
  collapseSpaces: boolean;
  removeEmptyLines: boolean;
  collapseEmptyLines: boolean;
  removeLineBreaks: boolean;
  stripInvisible: boolean;
  straightenQuotes: boolean;
  stripTags: boolean;
}

export function cleanText(text: string, o: CleanOptions): string {
  let t = text.replace(/\r\n?/g, '\n');
  if (o.stripInvisible) t = t.replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, '').replace(/\u00A0/g, ' ');
  if (o.stripTags) t = t.replace(/<[^>]*>/g, '');
  if (o.straightenQuotes) t = t.replace(/[‘’‚]/g, "'").replace(/[“”„]/g, '"');
  if (o.collapseSpaces) t = t.replace(/[ \t]{2,}/g, ' ');
  if (o.trimLines) t = t.split('\n').map((l) => l.trim()).join('\n');
  if (o.removeEmptyLines) t = t.split('\n').filter((l) => l.trim() !== '').join('\n');
  else if (o.collapseEmptyLines) t = t.replace(/\n{3,}/g, '\n\n');
  if (o.removeLineBreaks) t = t.replace(/\n+/g, ' ');
  return o.trimLines ? t.trim() : t;
}
