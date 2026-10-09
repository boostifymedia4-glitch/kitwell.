import { secureRandomInt } from './dev';
import { ALL_WORDS, SUFFIX_WORDS } from './wordlists';

/** The only symbols used in generated passwords: common, easy to type on any keyboard. */
export const PASSWORD_SYMBOLS = '@#$*+-!';

export interface NamePasswordOptions {
  /** Total length, 8-64. */
  length: number;
  /** Category ids from the word database; empty means all of them. */
  categories: string[];
  digits: boolean;
  symbols: boolean;
  upper: boolean;
  lower: boolean;
}

export interface GeneratedPassword {
  password: string;
  /** Rough strength in bits, assuming an attacker who knows exactly how these passwords are built. */
  bits: number;
}

export const NAME_LENGTH = { min: 8, max: 64 } as const;
const MAX_DIGITS = 6;
const MIN_DIGITS = 2;

const pick = <T>(items: readonly T[]): T => items[secureRandomInt(items.length)];
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

type Style = 'title' | 'upper' | 'lower' | 'flip' | 'inner';

/** Applies a random capitalisation style to a word, limited to what the options allow. */
function styleWord(word: string, upper: boolean, lower: boolean): string {
  if (upper && !lower) return word.toUpperCase();
  if (lower && !upper) return word.toLowerCase();
  const style = pick<Style>(['title', 'title', 'title', 'upper', 'flip', 'inner']);
  switch (style) {
    case 'upper':
      return word.toUpperCase();
    case 'flip':
      return word.charAt(0).toLowerCase() + word.charAt(1).toUpperCase() + word.slice(2).toLowerCase();
    case 'inner': {
      const lowerWord = cap(word);
      if (lowerWord.length < 3) return lowerWord;
      const i = 1 + secureRandomInt(lowerWord.length - 1);
      return lowerWord.slice(0, i) + lowerWord.charAt(i).toUpperCase() + lowerWord.slice(i + 1);
    }
    default:
      return cap(word);
  }
}

const digitsBlock = (n: number) => Array.from({ length: n }, () => String(secureRandomInt(10))).join('');

// Orders in which the pieces can appear. W = name, D = digits, S = symbol, X = extra word(s).
const TEMPLATES = ['WDSX', 'WSDX', 'XSWD', 'WXSD', 'WDXS', 'DWSX'] as const;

/** Chooses extra words so that digits fill exactly the space left (or nothing is left when digits are off). */
function fitExtras(room: number, digits: boolean): { words: string[]; digits: number } | null {
  let r = room;
  const words: string[] = [];
  for (let i = 0; i < 9; i++) {
    if (digits ? r >= MIN_DIGITS && r <= MAX_DIGITS : r === 0) return { words, digits: digits ? r : 0 };
    const limit = digits ? r - MIN_DIGITS : r;
    const fits = SUFFIX_WORDS.filter((w) => w.length <= limit);
    if (fits.length === 0) return null;
    const w = pick(fits);
    words.push(w);
    r -= w.length;
  }
  return digits ? (r >= MIN_DIGITS && r <= MAX_DIGITS ? { words, digits: r } : null) : r === 0 ? { words, digits: 0 } : null;
}

function build(opts: NamePasswordOptions, pool: string[]): GeneratedPassword | null {
  const symbolLen = opts.symbols ? 1 : 0;
  const name = pick(pool);
  const room = opts.length - name.length - symbolLen;
  if (room < (opts.digits ? MIN_DIGITS : 0)) return null;
  const fit = fitExtras(room, opts.digits);
  if (!fit) return null;

  const pieces: Record<string, string> = {
    W: styleWord(name, opts.upper, opts.lower),
    D: fit.digits ? digitsBlock(fit.digits) : '',
    S: opts.symbols ? pick([...PASSWORD_SYMBOLS]) : '',
    X: fit.words.map((w) => styleWord(w, opts.upper, opts.lower)).join(''),
  };
  const template = pick(TEMPLATES);
  const password = [...template].map((k) => pieces[k]).join('');
  if (password.length !== opts.length) return null;
  if (opts.upper && !/[A-Z]/.test(password)) return null;
  if (opts.lower && !/[a-z]/.test(password)) return null;

  const wordCasing = opts.upper && opts.lower ? Math.log2(5) : 0;
  const bits =
    Math.log2(pool.length) +
    fit.words.length * (Math.log2(SUFFIX_WORDS.length) + wordCasing) +
    fit.digits * Math.log2(10) +
    (opts.symbols ? Math.log2(PASSWORD_SYMBOLS.length) : 0) +
    Math.log2(TEMPLATES.length) +
    wordCasing;
  return { password, bits: Math.floor(bits) };
}

/**
 * A password built from a recognisable name or word, a short extra word, random digits, one symbol and
 * random capitalisation, e.g. Nvidia132@Star. Easier to remember than fully random text, but weaker.
 */
export function generateNamePassword(opts: NamePasswordOptions): GeneratedPassword {
  if (!opts.upper && !opts.lower) throw new Error('Choose uppercase letters, lowercase letters, or both.');
  const length = Math.floor(opts.length);
  if (!(length >= NAME_LENGTH.min && length <= NAME_LENGTH.max)) throw new Error(`Choose a length between ${NAME_LENGTH.min} and ${NAME_LENGTH.max}.`);
  const full = ALL_WORDS(opts.categories);
  if (full.length === 0) throw new Error('Choose at least one word category.');
  const base = { ...opts, length };

  // Prefer names that leave room for the other parts; fall back to any name if the length is very short.
  const roomy = full.filter((w) => w.length <= length - (opts.symbols ? 1 : 0) - (opts.digits ? MIN_DIGITS : 0));
  const pools = [roomy.length ? roomy : full];
  for (let attempt = 0; attempt < 400; attempt++) {
    const made = build(base, pools[0]);
    if (made) return made;
  }
  // Should be unreachable; keep the result valid anyway by padding with random characters.
  const name = styleWord(pick(pools[0]).slice(0, Math.max(3, length - 4)), opts.upper, opts.lower);
  const padLen = Math.max(0, length - name.length);
  const pad = Array.from({ length: padLen }, () => (opts.digits ? String(secureRandomInt(10)) : styleWord('abcdefghij'.charAt(secureRandomInt(10)), opts.upper, opts.lower))).join('');
  return { password: (name + pad).slice(0, length), bits: Math.floor(Math.log2(pools[0].length) + padLen * Math.log2(opts.digits ? 10 : 26)) };
}

export function strengthOf(bits: number): { label: string; tone: 'danger' | 'warning' | 'success'; pct: number } {
  if (bits < 40) return { label: 'Weak', tone: 'danger', pct: 25 };
  if (bits < 60) return { label: 'Fair', tone: 'warning', pct: 50 };
  if (bits < 90) return { label: 'Strong', tone: 'success', pct: 78 };
  return { label: 'Very strong', tone: 'success', pct: 100 };
}
