import { hasWeakPattern, secureRandomInt } from './dev';
import { ALL_WORDS, SUFFIX_WORDS } from './wordlists';
import { tr } from '@/i18n/translate';

/** The only symbols used in generated passwords: common, easy to type on any keyboard. */
export const PASSWORD_SYMBOLS = '@#$*';

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

export const NAME_LENGTH = { min: 8, max: 64 } as const;
/** A run of digits is between 2 and 8 long, so longer passwords get more words rather than endless digits. */
const MIN_DIGITS = 2;
const MAX_DIGITS = 8;
/** Name-based passwords use at most this many symbols. */
export const MAX_NAME_SYMBOLS = 2;

const pick = <T>(items: readonly T[]): T => items[secureRandomInt(items.length)];
const chance = (p: number) => secureRandomInt(1000) < p * 1000;
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

type Style = 'title' | 'upper' | 'flip' | 'inner';

/** Applies a random capitalisation style to a word, limited to what the options allow. */
function styleWord(word: string, upper: boolean, lower: boolean): string {
  if (upper && !lower) return word.toUpperCase();
  if (lower && !upper) return word.toLowerCase();
  const style = pick<Style>(['title', 'title', 'title', 'title', 'upper', 'flip', 'inner']);
  switch (style) {
    case 'upper':
      return word.toUpperCase();
    case 'flip':
      return word.charAt(0).toLowerCase() + word.charAt(1).toUpperCase() + word.slice(2).toLowerCase();
    case 'inner': {
      const t = cap(word);
      if (t.length < 3) return t;
      const i = 1 + secureRandomInt(t.length - 1);
      return t.slice(0, i) + t.charAt(i).toUpperCase() + t.slice(i + 1);
    }
    default:
      return cap(word);
  }
}

const digitsBlock = (n: number) => Array.from({ length: n }, () => String(secureRandomInt(10))).join('');

// Pieces: W = the name, X = extra word(s) that make up the length, D = digits, S = a symbol. The order is always
// name or words first, then numbers, then the symbol(s): nothing but symbols ever follows the numbers. The variety comes from the words, the numbers, the capitalisation
// and from using one or two symbols, not from shuffling the order.
const TEMPLATE_ONE_SYMBOL = 'WXDS';
const TEMPLATE_TWO_SYMBOLS = 'WXDSS';

interface Fit {
  words: string[];
  digits: number;
}

/**
 * Chooses extra words so that the numbers fill exactly the space that is left (2 to 8 digits), or so that
 * nothing is left when numbers are switched off. Returns null when this try cannot be made to fit.
 */
function fitExtras(room: number, digits: boolean, pool: string[]): Fit | null {
  const words: string[] = [];
  let r = room;
  for (let i = 0; i < 10; i++) {
    if (digits) {
      if (r < MIN_DIGITS) return null;
      if (r <= MAX_DIGITS && chance(words.length === 0 ? 0.55 : 0.8)) return { words, digits: r };
    } else if (r === 0) return { words, digits: 0 };
    const limit = digits ? r - MIN_DIGITS : r;
    // Short curated words most of the time, and a word from the chosen categories now and then.
    const fromPool = chance(0.4);
    const source = fromPool ? pool : SUFFIX_WORDS;
    const fits = source.filter((w) => w.length <= limit);
    if (fits.length === 0) return digits && r <= MAX_DIGITS ? { words, digits: r } : null;
    const w = pick(fits);
    words.push(w);
    r -= w.length;
  }
  if (digits) return r >= MIN_DIGITS && r <= MAX_DIGITS ? { words, digits: r } : null;
  return r === 0 ? { words, digits: 0 } : null;
}

function build(opts: NamePasswordOptions, pool: string[]): string | null {
  const symbolCount = opts.symbols ? (opts.length >= 10 ? pick([1, 2]) : 1) : 0;
  const name = pick(pool);
  const room = opts.length - name.length - symbolCount;
  if (room < (opts.digits ? MIN_DIGITS : 0)) return null;
  const fit = fitExtras(room, opts.digits, pool);
  if (!fit) return null;

  const symbols: string[] = [];
  while (symbols.length < symbolCount) {
    const s = pick([...PASSWORD_SYMBOLS]);
    if (!symbols.includes(s)) symbols.push(s);
  }
  const used = { S: 0 };
  const pieces: Record<string, () => string> = {
    W: () => styleWord(name, opts.upper, opts.lower),
    D: () => (fit.digits ? digitsBlock(fit.digits) : ''),
    X: () => fit.words.map((w) => styleWord(w, opts.upper, opts.lower)).join(''),
    S: () => symbols[used.S++] ?? '',
  };
  const template = symbolCount === 2 ? TEMPLATE_TWO_SYMBOLS : TEMPLATE_ONE_SYMBOL;
  const password = [...template].map((k) => pieces[k]()).join('');
  if (password.length !== opts.length) return null;
  if (opts.upper && !/[A-Z]/.test(password)) return null;
  if (opts.lower && !/[a-z]/.test(password)) return null;
  if (hasWeakPattern(password)) return null;
  return password;
}

/**
 * A password built from a recognisable name or word, random digits, optional extra words and one or two
 * symbols, e.g. Nvidia482Star@. Easier to remember than fully random text, but weaker: its strength is
 * estimated by ./passwordStrength.ts, which counts every known word as a single pick from a word list.
 */
export function generateNamePassword(opts: NamePasswordOptions): string {
  if (!opts.upper && !opts.lower) throw new Error(tr('err.passwords.chooseCase'));
  const length = Math.floor(opts.length);
  if (!(length >= NAME_LENGTH.min && length <= NAME_LENGTH.max)) throw new Error(tr('err.passwords.length', { min: NAME_LENGTH.min, max: NAME_LENGTH.max }));
  const full = ALL_WORDS(opts.categories);
  if (full.length === 0) throw new Error(tr('err.passwords.chooseCategory'));
  const base = { ...opts, length };

  // Prefer names that leave room for the other parts.
  const symbolRoom = opts.symbols ? 1 : 0;
  const roomy = full.filter((w) => w.length <= length - symbolRoom - (opts.digits ? MIN_DIGITS : 0) - 0);
  const pool = roomy.length ? roomy : full;
  for (let attempt = 0; attempt < 600; attempt++) {
    const made = build(base, pool);
    if (made) return made;
  }
  throw new Error(tr('err.passwords.cannotBuild'));
}
