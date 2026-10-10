import { describe, expect, it } from 'vitest';
import { PASSWORD_COUNT, PASSWORD_LENGTH, clampPasswordCount, generatePassword, hasWeakPattern } from '../src/lib/dev';
import { MAX_NAME_SYMBOLS, PASSWORD_SYMBOLS, generateNamePassword, type NamePasswordOptions } from '../src/lib/passwords';
import { estimatePassword, meetsNameCriteria, nameRating, strengthOf } from '../src/lib/passwordStrength';
import { ALL_WORDS, SUFFIX_WORDS, WORD_CATEGORIES } from '../src/lib/wordlists';

const base: NamePasswordOptions = { length: 16, categories: [], digits: true, symbols: true, upper: true, lower: true };
const symbolRe = /[@#$*]/g;
const symbolsIn = (p: string) => p.match(symbolRe) ?? [];

describe('word database', () => {
  it('has a large, clean set of single-token words in every category', () => {
    expect(WORD_CATEGORIES.map((c) => c.id)).toEqual(['names', 'ceos', 'companies', 'restaurants', 'hospitals', 'footballers', 'cricketers', 'famous', 'youtubers', 'public', 'cities', 'countries', 'tech']);
    for (const c of WORD_CATEGORIES) {
      expect(c.words.length, c.label).toBeGreaterThanOrEqual(40);
      for (const w of c.words) expect(w).toMatch(/^[A-Za-z]{3,12}$/);
      expect(new Set(c.words).size).toBe(c.words.length);
    }
    expect(ALL_WORDS().length).toBeGreaterThan(1500);
    expect(SUFFIX_WORDS.length).toBeGreaterThan(80);
  });
  it('filters by category', () => {
    expect(ALL_WORDS(['countries'])).toContain('Pakistan');
    expect(ALL_WORDS(['countries'])).not.toContain('Messi');
    expect(ALL_WORDS(['footballers'])).toContain('Messi');
  });
});

describe('name-based passwords', () => {
  it('hit the exact length for every length and option combination', () => {
    for (let length = 8; length <= 16; length++) {
      for (const digits of [true, false]) {
        for (const symbols of [true, false]) {
          for (const [upper, lower] of [[true, true], [true, false], [false, true]]) {
            for (let i = 0; i < 4; i++) {
              const p = generateNamePassword({ ...base, length, digits, symbols, upper, lower });
              expect(p, JSON.stringify({ length, digits, symbols, upper, lower })).toHaveLength(length);
              expect(p).toMatch(/^[A-Za-z0-9@#$*]+$/);
            }
          }
        }
      }
    }
  });

  it('respect the character options', () => {
    for (let i = 0; i < 100; i++) {
      const both = generateNamePassword(base);
      expect(both).toMatch(/[A-Z]/);
      expect(both).toMatch(/[a-z]/);
      expect(both).toMatch(/\d/);
      expect(symbolsIn(both).length).toBeGreaterThanOrEqual(1);
      expect(generateNamePassword({ ...base, digits: false })).not.toMatch(/\d/);
      expect(symbolsIn(generateNamePassword({ ...base, symbols: false }))).toHaveLength(0);
      expect(generateNamePassword({ ...base, upper: false })).not.toMatch(/[A-Z]/);
      expect(generateNamePassword({ ...base, lower: false })).not.toMatch(/[a-z]/);
    }
  });

  it('use one or two of the allowed symbols, never more, and never dots, commas or brackets', () => {
    const counts = new Set<number>();
    for (let i = 0; i < 400; i++) {
      const p = generateNamePassword({ ...base, length: 8 + (i % 9) });
      const n = symbolsIn(p).length;
      counts.add(n);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(MAX_NAME_SYMBOLS);
      expect(p).not.toMatch(/[.,;:()[\]{}<>_=~^%&/\\|'"`? ]/);
    }
    expect([...counts].sort()).toEqual([1, 2]);
  });

  it('start from a recognisable name or word, followed by numbers', () => {
    const lowerWords = ALL_WORDS().map((w) => w.toLowerCase()).sort((a, b) => b.length - a.length);
    let nameFirst = 0;
    for (let i = 0; i < 300; i++) {
      const p = generateNamePassword({ ...base, length: 16 });
      const word = lowerWords.find((w) => p.toLowerCase().startsWith(w) || p.toLowerCase().startsWith(w, 0));
      if (word) nameFirst++;
      expect(estimatePassword(p).words.length).toBeGreaterThanOrEqual(1);
      expect(p).toMatch(/\d{2,8}/);
    }
    expect(nameFirst).toBeGreaterThan(285); // the name comes first (an occasional template puts a symbol before extra words)
  });

  it('build on a name from the chosen categories', () => {
    const words = ALL_WORDS(['footballers']).map((w) => w.toLowerCase());
    for (let i = 0; i < 80; i++) {
      const p = generateNamePassword({ ...base, categories: ['footballers'], length: 16 }).toLowerCase();
      expect(words.some((w) => p.includes(w))).toBe(true);
    }
  });

  it('are not predictable: varied names, numbers, symbols and layouts', () => {
    const results = Array.from({ length: 400 }, () => generateNamePassword({ ...base, length: 16 }));
    expect(new Set(results).size).toBeGreaterThan(390);
    // one or two of the four symbols: 4 single + 12 distinct pairs = 16 possible endings
    expect(new Set(results.map((p) => symbolsIn(p).join(''))).size).toBeGreaterThanOrEqual(14);
    const shapes = new Set(results.map((p) => p.replace(/[A-Z]/g, 'U').replace(/[a-z]/g, 'l').replace(/\d/g, '9').replace(/[@#$*]/g, 's').replace(/(.)\1+/g, '$1')));
    expect(shapes.size).toBeGreaterThanOrEqual(2);
    expect(new Set(results.map((p) => p.match(/\d/)![0])).size).toBeGreaterThanOrEqual(8);
  });

  it('have a capital letter, a number and a symbol, with every other letter lowercase', () => {
    for (let i = 0; i < 500; i++) {
      const p = generateNamePassword({ ...base, length: 8 + (i % 9) });
      expect(p, p).toMatch(/^[A-Z][a-z]*\d+[a-z]*[@#$*]{1,2}$/);
      expect(meetsNameCriteria(p)).toBe(true);
    }
  });

  it('keep the order name, numbers, optional extra word, symbols, with nothing after the symbols', () => {
    for (let i = 0; i < 500; i++) {
      const p = generateNamePassword({ ...base, length: 8 + (i % 9) });
      expect(p, p).toMatch(/^[A-Za-z]+\d{2,8}[A-Za-z]*[@#$*]{1,2}$/);
    }
    // without numbers the order is name, extra words, symbols; without symbols it ends in a letter or digit
    for (let i = 0; i < 100; i++) {
      expect(generateNamePassword({ ...base, digits: false })).toMatch(/^[A-Za-z]+[@#$*]{1,2}$/);
      expect(generateNamePassword({ ...base, symbols: false })).toMatch(/^[A-Za-z]+\d{2,8}[A-Za-z]*$/);
    }
  });

  it('never contain repeated characters or runs such as 1234', () => {
    for (let i = 0; i < 500; i++) expect(hasWeakPattern(generateNamePassword({ ...base, length: 8 + (i % 9) }))).toBe(false);
  });

  it('rejects impossible settings with a clear error', () => {
    expect(() => generateNamePassword({ ...base, upper: false, lower: false })).toThrow(/uppercase/);
    expect(() => generateNamePassword({ ...base, length: 4 })).toThrow(/length/);
    expect(() => generateNamePassword({ ...base, length: 17 })).toThrow(/length/);
    expect(() => generateNamePassword({ ...base, length: 7 })).toThrow(/length/);
    expect(() => generateNamePassword({ ...base, length: 200 })).toThrow(/length/);
    expect(() => generateNamePassword({ ...base, categories: ['not-a-category'] })).toThrow(/category/);
  });
});

describe('name-based strength rating: 8 Good, 9-10 Strong, 11-16 Very strong', () => {
  const rule = (n: number) => (n === 8 ? 'good' : n <= 10 ? 'strong' : 'very-strong');

  it('rates every generated password by its length, after checking that it meets the criteria', () => {
    for (let length = 8; length <= 16; length++) {
      for (let i = 0; i < 150; i++) {
        const p = generateNamePassword({ ...base, length });
        expect(p).toHaveLength(length);
        expect(meetsNameCriteria(p), p).toBe(true);
        expect(nameRating(p)?.id, p).toBe(rule(length));
      }
    }
  });

  it('an 8-character password that meets the criteria is Good, never Weak or Fair', () => {
    expect(nameRating('Kai4821@')?.id).toBe('good');
    expect(nameRating('Kaito42@#')?.id).toBe('strong');
    expect(nameRating('Kaitoran42@')?.id).toBe('very-strong');
    expect(nameRating('Kaitoranbo2026$*'.slice(0, 16))?.id).toBe('very-strong');
  });

  it('gives no rating when the criteria are not met, so nothing is rated by length alone', () => {
    expect(nameRating('kai48215')).toBeNull(); // no capital, no symbol
    expect(nameRating('Kaitoran@')).toBeNull(); // no number
    expect(nameRating('Kaitoran42')).toBeNull(); // no symbol
    expect(nameRating('KAITORAN@')).toBeNull(); // no number
    expect(nameRating('kaitoran42@')).toBeNull(); // no capital
    expect(nameRating('Kai48!21')).toBeNull(); // a symbol that is not allowed
    expect(nameRating('Kai4@#$21')).toBeNull(); // more than two symbols
    expect(nameRating('Kai4 21@')).toBeNull(); // a space
    expect(nameRating('Kai42@')).toBeNull(); // shorter than 8
  });

  it('falls back to the estimate when options remove a required character type', () => {
    for (let i = 0; i < 50; i++) {
      const noDigits = generateNamePassword({ ...base, length: 10, digits: false });
      expect(nameRating(noDigits)).toBeNull();
    }
  });
});

describe('strength estimate (used for Fully random and as the fallback)', () => {
  const bitsOf = (opts: Partial<NamePasswordOptions>, n = 60) => {
    const all = Array.from({ length: n }, () => estimatePassword(generateNamePassword({ ...base, ...opts })).bits);
    return { min: Math.min(...all), avg: all.reduce((a, b) => a + b, 0) / n };
  };

  it('rises with length', () => {
    expect(bitsOf({ length: 8 }).avg).toBeLessThan(bitsOf({ length: 12 }).avg);
    expect(bitsOf({ length: 12 }).avg).toBeLessThan(bitsOf({ length: 16 }).avg);
  });

  it('is honest about recognisable words: a name plus digits is weak', () => {
    const e = estimatePassword('Nvidia482Star@');
    expect(e.words.map((w) => w.toLowerCase())).toEqual(['nvidia', 'star']);
    expect(e.bits).toBeGreaterThan(30);
    expect(e.bits).toBeLessThan(45);
    expect(strengthOf(e.bits).id).toBe('weak');
  });

  it('prices repeated characters and sequences as cheap', () => {
    expect(estimatePassword('aaaaaaaa')).toMatchObject({ patterns: true });
    expect(estimatePassword('aaaaaaaa').bits).toBeLessThan(15);
    expect(estimatePassword('12345678').bits).toBeLessThan(18);
    expect(estimatePassword('abcdefgh').bits).toBeLessThan(18);
    expect(estimatePassword('k3Qz8LpW').bits).toBeGreaterThan(estimatePassword('aaaaaaaa').bits + 25);
    expect(estimatePassword('xk1111qm').bits).toBeLessThan(estimatePassword('xk4927qm').bits);
  });

  it('gives short passwords a low estimate and long random ones a high one', () => {
    expect(estimatePassword('').bits).toBe(0);
    expect(estimatePassword('x').bits).toBeLessThan(6);
    expect(estimatePassword('Qk7!').bits).toBeLessThan(25);
    const long = generatePassword({ length: 16, lower: true, upper: true, digits: true, symbols: true, excludeAmbiguous: false });
    expect(estimatePassword(long).bits).toBeGreaterThan(80);
  });

  it('classifies the labels at sensible thresholds and never says Strong because options were ticked', () => {
    expect(strengthOf(10).id).toBe('weak');
    expect(strengthOf(39.9).id).toBe('weak');
    expect(strengthOf(40).id).toBe('fair');
    expect(strengthOf(59.9).id).toBe('fair');
    expect(strengthOf(60).id).toBe('strong');
    expect(strengthOf(80).id).toBe('very-strong');
  });
});

describe('fully random passwords', () => {
  const o = { length: 16, lower: true, upper: true, digits: true, symbols: true, excludeAmbiguous: false };
  it('use only letters, numbers and the practical symbols, with every selected type present', () => {
    for (let i = 0; i < 200; i++) {
      const p = generatePassword(o);
      expect(p).toMatch(/^[A-Za-z0-9@#$*]{16}$/);
      expect(p).toMatch(/[a-z]/);
      expect(p).toMatch(/[A-Z]/);
      expect(p).toMatch(/\d/);
      expect(p).toMatch(/[@#$*]/);
    }
  });
  it('are mostly letters rather than numbers and symbols', () => {
    let letters = 0;
    let total = 0;
    for (let i = 0; i < 200; i++) {
      const p = generatePassword(o);
      letters += p.replace(/[^A-Za-z]/g, '').length;
      total += p.length;
    }
    expect(letters / total).toBeGreaterThan(0.6);
  });
  it('avoid repeated characters and consecutive runs', () => {
    for (let i = 0; i < 1000; i++) expect(hasWeakPattern(generatePassword({ ...o, length: 8 }))).toBe(false);
  });
  it('rate Very strong at 16 characters with every option, and weak when tiny or single-class', () => {
    expect(strengthOf(estimatePassword(generatePassword({ ...o, length: 16 })).bits).id).toBe('very-strong');
    expect(strengthOf(estimatePassword(generatePassword({ ...o, length: 8, upper: false, symbols: false, digits: false })).bits).id).toBe('weak');
    expect(['strong', 'very-strong']).toContain(strengthOf(estimatePassword(generatePassword({ ...o, length: 12 })).bits).id);
  });
  it('only generate lengths from 8 to 16 and reject anything else', () => {
    expect(PASSWORD_LENGTH).toEqual({ min: 8, max: 16 });
    for (let length = 8; length <= 16; length++) expect(generatePassword({ ...o, length })).toHaveLength(length);
    for (const length of [0, 4, 7, 17, 24, 128, 129]) expect(() => generatePassword({ ...o, length }), String(length)).toThrow(/length/);
    expect(PASSWORD_COUNT).toEqual({ min: 5, max: 10 });
  });
  it('require at least one character type', () => {
    expect(() => generatePassword({ ...o, lower: false, upper: false, digits: false, symbols: false })).toThrow();
  });
  it('detects weak patterns', () => {
    expect(hasWeakPattern('abXXXcd')).toBe(true);
    expect(hasWeakPattern('ab1234c')).toBe(true);
    expect(hasWeakPattern('ab9876c')).toBe(true);
    expect(hasWeakPattern('xAbCdq')).toBe(true);
    expect(hasWeakPattern('k3Q-z8L!')).toBe(false);
    expect(PASSWORD_SYMBOLS).toBe('@#$*');
  });
});

describe('how many passwords: 5 to 10', () => {
  it('accepts the minimum, the maximum and everything between', () => {
    for (let n = 5; n <= 10; n++) expect(clampPasswordCount(n)).toBe(n);
  });
  it('never gives fewer than 5 or more than 10, whatever is typed', () => {
    for (const n of [1, 2, 4, 0, -3, -100]) expect(clampPasswordCount(n), String(n)).toBe(5);
    for (const n of [11, 12, 20, 21, 99, 1000]) expect(clampPasswordCount(n), String(n)).toBe(10);
  });
  it('turns empty and invalid input into the minimum, and rounds down fractions', () => {
    expect(clampPasswordCount('')).toBe(5);
    expect(clampPasswordCount(Number.NaN)).toBe(5);
    expect(clampPasswordCount(Number.POSITIVE_INFINITY)).toBe(5);
    expect(clampPasswordCount(7.9)).toBe(7);
  });
});
