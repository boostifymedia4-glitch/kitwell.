import { describe, expect, it } from 'vitest';
import { generatePassword } from '../src/lib/dev';
import { generateNamePassword, PASSWORD_SYMBOLS, strengthOf, type NamePasswordOptions } from '../src/lib/passwords';
import { ALL_WORDS, SUFFIX_WORDS, WORD_CATEGORIES } from '../src/lib/wordlists';

const base: NamePasswordOptions = { length: 14, categories: [], digits: true, symbols: true, upper: true, lower: true };
const symbolRe = new RegExp(`[${PASSWORD_SYMBOLS.replace('-', '\\-')}]`);

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
    for (const length of [8, 9, 10, 12, 14, 16, 20, 24, 32, 48, 64]) {
      for (const digits of [true, false]) {
        for (const symbols of [true, false]) {
          for (const [upper, lower] of [[true, true], [true, false], [false, true]]) {
            for (let i = 0; i < 6; i++) {
              const { password } = generateNamePassword({ ...base, length, digits, symbols, upper, lower });
              expect(password, JSON.stringify({ length, digits, symbols, upper, lower })).toHaveLength(length);
              expect(password).toMatch(/^[A-Za-z0-9@#$*+\-!]+$/);
            }
          }
        }
      }
    }
  });
  it('respects the character options', () => {
    for (let i = 0; i < 100; i++) {
      const both = generateNamePassword(base).password;
      expect(both).toMatch(/[A-Z]/);
      expect(both).toMatch(/[a-z]/);
      expect(both).toMatch(/\d/);
      expect(both).toMatch(symbolRe);
      expect(generateNamePassword({ ...base, digits: false }).password).not.toMatch(/\d/);
      expect(generateNamePassword({ ...base, symbols: false }).password).not.toMatch(symbolRe);
      expect(generateNamePassword({ ...base, upper: false }).password).not.toMatch(/[A-Z]/);
      expect(generateNamePassword({ ...base, lower: false }).password).not.toMatch(/[a-z]/);
    }
  });
  it('uses only the practical symbol set', () => {
    for (let i = 0; i < 300; i++) {
      const p = generateNamePassword({ ...base, length: 20 }).password;
      expect(p.replace(/[A-Za-z0-9]/g, '')).toMatch(/^[@#$*+\-!]$/);
    }
  });
  it('builds on a name from the chosen categories', () => {
    const words = ALL_WORDS(['footballers']).map((w) => w.toLowerCase());
    for (let i = 0; i < 80; i++) {
      const p = generateNamePassword({ ...base, categories: ['footballers'], length: 16 }).password.toLowerCase();
      expect(words.some((w) => p.includes(w))).toBe(true);
    }
  });
  it('is not predictable: varied names, numbers, capitalisation, symbols and layouts', () => {
    const results = Array.from({ length: 400 }, () => generateNamePassword({ ...base, length: 16 }).password);
    expect(new Set(results).size).toBeGreaterThan(390);
    const symbols = new Set(results.map((p) => p.match(symbolRe)![0]));
    expect(symbols.size).toBe(PASSWORD_SYMBOLS.length);
    const shapes = new Set(results.map((p) => p.replace(/[A-Z]/g, 'U').replace(/[a-z]/g, 'l').replace(/\d/g, '9').replace(/[@#$*+\-!]/g, 's').replace(/(.)\1+/g, '$1')));
    expect(shapes.size).toBeGreaterThan(8);
    const startsUpper = results.filter((p) => /^[A-Z]/.test(p)).length;
    expect(startsUpper).toBeGreaterThan(40);
    expect(startsUpper).toBeLessThan(390);
    const firstDigit = new Set(results.map((p) => p.match(/\d/)![0]));
    expect(firstDigit.size).toBeGreaterThanOrEqual(8);
  });
  it('rejects impossible settings', () => {
    expect(() => generateNamePassword({ ...base, upper: false, lower: false })).toThrow(/uppercase/);
    expect(() => generateNamePassword({ ...base, length: 4 })).toThrow(/length/);
    expect(() => generateNamePassword({ ...base, length: 200 })).toThrow(/length/);
  });
  it('reports honest strength: name passwords are weaker than random ones', () => {
    const named = generateNamePassword({ ...base, length: 14 }).bits;
    expect(named).toBeLessThan(60);
    expect(strengthOf(named).label).not.toBe('Very strong');
    expect(strengthOf(30).label).toBe('Weak');
    expect(strengthOf(100).label).toBe('Very strong');
  });
});

describe('fully random passwords', () => {
  const o = { length: 24, lower: true, upper: true, digits: true, symbols: true, excludeAmbiguous: false };
  it('use only letters, numbers and the practical symbols, with every selected type present', () => {
    for (let i = 0; i < 200; i++) {
      const p = generatePassword(o);
      expect(p).toMatch(/^[A-Za-z0-9@#$*+\-!]{24}$/);
      expect(p).toMatch(/[a-z]/);
      expect(p).toMatch(/[A-Z]/);
      expect(p).toMatch(/\d/);
      expect(p).toMatch(symbolRe);
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
});
