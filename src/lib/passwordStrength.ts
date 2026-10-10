/**
 * An honest strength estimate for a password, in bits (log2 of the number of guesses an attacker would need).
 *
 * The estimate looks at the password itself rather than at which boxes were ticked:
 *  - known names and words (from the same word database the generator uses) cost only as much as picking one
 *    word from that list, however long the word is;
 *  - repeated characters and runs such as 1234 or abcd are cheap to guess and are priced accordingly;
 *  - everything else is priced per character from the character set it belongs to.
 *
 * It is an estimate for planning, not a guarantee: it assumes an attacker who knows how passwords are
 * built and has this word list. A real attacker may know more (or less).
 */
import { ALL_WORDS, SUFFIX_WORDS } from './wordlists';
import { PASSWORD_SYMBOLS } from './passwords';

export type StrengthTone = 'danger' | 'warning' | 'success';
export type StrengthId = 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';

export interface Strength {
  id: StrengthId;
  tone: StrengthTone;
  /** Width of the meter, 0-100. */
  pct: number;
}

export interface Estimate {
  bits: number;
  /** Known names and words found in the password. */
  words: string[];
  /** True when the password contains runs of repeated characters or sequences. */
  patterns: boolean;
}

let dictionary: Map<string, number> | null = null;
const lookup = () => {
  if (!dictionary) {
    dictionary = new Map();
    for (const w of [...ALL_WORDS(), ...SUFFIX_WORDS]) dictionary.set(w.toLowerCase(), w.length);
  }
  return dictionary;
};
/** Size of the guessing list for one known word. */
const dictionaryBits = () => Math.log2(lookup().size);

const MIN_WORD = 3;
/** This many separate stretches of letters, digits and symbols means the characters are interleaved at random. */
const RANDOM_LOOKING_SEGMENTS = 4;

/** Bits to choose a capitalisation of a known word: none for lower case, one for Title or UPPER, more for mixed. */
function casingBits(word: string): number {
  if (word === word.toLowerCase()) return 0;
  if (word === word.toUpperCase()) return 1;
  if (word === word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) return 1;
  // Mixed capitals: roughly one bit for every character that could have been either case.
  return Math.min(word.length, 2 + word.length * 0.6);
}

type Kind = 'digit' | 'letter' | 'symbol';
const charKind = (ch: string): Kind => (/[0-9]/.test(ch) ? 'digit' : /[A-Za-z]/.test(ch) ? 'letter' : 'symbol');

/** Bits for one character on its own (used for the first character of a repeated run). */
function charBits(ch: string): number {
  const kind = charKind(ch);
  if (kind === 'digit') return Math.log2(10);
  if (kind === 'letter') return Math.log2(26);
  return Math.log2(PASSWORD_SYMBOLS.includes(ch) ? PASSWORD_SYMBOLS.length : 33);
}

function segmentBits(segment: string, kind: Kind, mixedCase: boolean): number {
  if (kind === 'digit') return segment.length * Math.log2(10);
  if (kind === 'letter') {
    // A leading capital is a common habit (one bit). Capitals scattered through the letters mean upper and
    // lower case are both in play, which widens the pool each character comes from.
    return segment.length * Math.log2(mixedCase ? 52 : 26) + (!mixedCase && /^[A-Z]/.test(segment) ? 1 : 0);
  }
  return [...segment].reduce((sum, ch) => sum + charBits(ch), 0);
}

/** Lengths of runs where every next character repeats or steps by one (1111, abcd, 9876). */
function patternRuns(s: string): { start: number; length: number; kind: 'repeat' | 'sequence' }[] {
  const runs: { start: number; length: number; kind: 'repeat' | 'sequence' }[] = [];
  let i = 0;
  while (i < s.length - 1) {
    const step = s.charCodeAt(i + 1) - s.charCodeAt(i);
    if (step === 0 || step === 1 || step === -1) {
      let j = i + 1;
      while (j + 1 < s.length && s.charCodeAt(j + 1) - s.charCodeAt(j) === step) j++;
      const length = j - i + 1;
      if (length >= 3 || (step === 0 && length >= 3)) runs.push({ start: i, length, kind: step === 0 ? 'repeat' : 'sequence' });
      i = j;
    } else i++;
  }
  return runs;
}

export function estimatePassword(password: string): Estimate {
  if (!password) return { bits: 0, words: [], patterns: false };
  const lower = password.toLowerCase();
  const dict = lookup();
  const words: string[] = [];
  // Mark characters that belong to known words (longest match first at each position).
  const covered = new Array<boolean>(password.length).fill(false);
  let bits = 0;
  for (let i = 0; i < password.length; ) {
    let best = 0;
    for (let len = Math.min(12, password.length - i); len >= MIN_WORD; len--) {
      if (/^[a-z]+$/.test(lower.slice(i, i + len)) && dict.has(lower.slice(i, i + len))) {
        best = len;
        break;
      }
    }
    if (best >= MIN_WORD) {
      const word = password.slice(i, i + best);
      words.push(word);
      bits += dictionaryBits() + casingBits(word);
      for (let k = 0; k < best; k++) covered[i + k] = true;
      i += best;
    } else i++;
  }

  // Everything that is not part of a known word, priced character by character. Runs are priced once.
  const runs = patternRuns(password).filter((r) => {
    for (let k = 0; k < r.length; k++) if (covered[r.start + k]) return false;
    return true;
  });
  const inRun = new Array<boolean>(password.length).fill(false);
  for (const run of runs) {
    // First character at full price, the rest almost free: log2(length) bits to say how long it goes on.
    bits += charBits(password[run.start]) + Math.log2(run.length) + (run.kind === 'sequence' ? 1 : 0);
    for (let k = 0; k < run.length; k++) inRun[run.start + k] = true;
  }
  // Stretches of ordinary characters are priced by what they are made of: digits, letters (a wider pool when
  // upper and lower case are mixed) or symbols.
  const free = (i: number) => !covered[i] && !inRun[i];
  // Mixed case: a capital that is not simply the first letter of its stretch, next to lower-case letters.
  let capitalInside = false;
  let anyLower = false;
  for (let i = 0; i < password.length; i++) {
    if (!free(i)) continue;
    if (/[a-z]/.test(password[i])) anyLower = true;
    else if (/[A-Z]/.test(password[i]) && i > 0 && free(i - 1) && /[A-Za-z]/.test(password[i - 1])) capitalInside = true;
  }
  const mixedCase = capitalInside && anyLower;
  const segments: { text: string; kind: Kind }[] = [];
  for (let i = 0; i < password.length; ) {
    if (!free(i)) {
      i++;
      continue;
    }
    const kind = charKind(password[i]);
    let j = i;
    while (j < password.length && free(j) && charKind(password[j]) === kind) j++;
    segments.push({ text: password.slice(i, j), kind });
    i = j;
  }
  if (segments.length >= RANDOM_LOOKING_SEGMENTS) {
    // Letters, digits and symbols are interleaved with no structure (a random password): every character could
    // have come from the whole pool of character types that appear, so price them from that pool.
    const text = segments.map((s) => s.text).join('');
    const pool = (/[a-z]/.test(text) ? 26 : 0) + (/[A-Z]/.test(text) ? 26 : 0) + (/[0-9]/.test(text) ? 10 : 0) + (/[^A-Za-z0-9]/.test(text) ? ([...text].every((c) => /[A-Za-z0-9]/.test(c) || PASSWORD_SYMBOLS.includes(c)) ? PASSWORD_SYMBOLS.length : 33) : 0);
    bits += text.length * Math.log2(Math.max(pool, 2));
  } else {
    for (const s of segments) bits += segmentBits(s.text, s.kind, mixedCase);
  }
  return { bits: Math.round(bits * 10) / 10, words, patterns: runs.length > 0 };
}

export function strengthOf(bits: number): Strength {
  if (bits < 40) return { id: 'weak', tone: 'danger', pct: 25 };
  if (bits < 60) return { id: 'fair', tone: 'warning', pct: 50 };
  if (bits < 80) return { id: 'strong', tone: 'success', pct: 78 };
  return { id: 'very-strong', tone: 'success', pct: 100 };
}

/** Order of the ratings, weakest first. */
export const STRENGTH_ORDER: readonly StrengthId[] = ['weak', 'fair', 'good', 'strong', 'very-strong'];
const STRENGTHS: Record<StrengthId, Strength> = {
  weak: { id: 'weak', tone: 'danger', pct: 25 },
  fair: { id: 'fair', tone: 'warning', pct: 40 },
  good: { id: 'good', tone: 'success', pct: 55 },
  strong: { id: 'strong', tone: 'success', pct: 78 },
  'very-strong': { id: 'very-strong', tone: 'success', pct: 100 },
};
export const strengthById = (id: StrengthId): Strength => STRENGTHS[id];

/** The weakest of several ratings. */
export const weakest = (items: Strength[]): Strength => items.reduce((a, b) => (STRENGTH_ORDER.indexOf(b.id) < STRENGTH_ORDER.indexOf(a.id) ? b : a));

/**
 * What a name-based password must contain to be rated by its length: at least one uppercase letter, one number and
 * one of the allowed symbols (never more than two), and nothing but letters, numbers and those symbols.
 */
export function meetsNameCriteria(password: string): boolean {
  if (!/^[A-Za-z0-9]*$/.test(password.split('').filter((c) => !PASSWORD_SYMBOLS.includes(c)).join(''))) return false;
  const symbols = password.split('').filter((c) => PASSWORD_SYMBOLS.includes(c)).length;
  return /[A-Z]/.test(password) && /[0-9]/.test(password) && symbols >= 1 && symbols <= 2;
}

/**
 * Rating of a name-based password: 8 characters Good, 9 to 10 Strong, 11 to 16 Very strong. It is only given to a
 * password that really meets the criteria above (checked here, not assumed); otherwise it returns null and the
 * caller falls back to the estimate in bits.
 */
export function nameRating(password: string): Strength | null {
  if (!meetsNameCriteria(password)) return null;
  const n = password.length;
  if (n < 8) return null;
  return STRENGTHS[n === 8 ? 'good' : n <= 10 ? 'strong' : 'very-strong'];
}
