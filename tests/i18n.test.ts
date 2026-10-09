import { describe, expect, it } from 'vitest';
import { en, type MessageKey } from '../src/i18n/en';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../src/i18n/languages';
import { localeLoaders } from '../src/i18n/loaders';

const keys = Object.keys(en) as MessageKey[];
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('languages', () => {
  it('offers the 17 requested languages', () => {
    expect(LANGUAGES.map((l) => l.english)).toEqual([
      'English', 'Urdu', 'Arabic', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Turkish',
      'Chinese', 'Japanese', 'Korean', 'Hindi', 'Indonesian', 'Bengali', 'Russian', 'Dutch',
    ]);
    expect(new Set(LANGUAGES.map((l) => l.code)).size).toBe(LANGUAGES.length);
  });
  it('marks only Urdu and Arabic as right-to-left', () => {
    expect(LANGUAGES.filter((l) => l.dir === 'rtl').map((l) => l.code)).toEqual(['ur', 'ar']);
  });
  it('has a loader for every language except the default', () => {
    expect(Object.keys(localeLoaders).sort()).toEqual(LANGUAGES.map((l) => l.code).filter((c) => c !== DEFAULT_LANGUAGE).sort());
  });
});

describe('translations', () => {
  for (const lang of LANGUAGES.filter((l) => l.code !== DEFAULT_LANGUAGE)) {
    describe(lang.english, () => {
      it('only uses known keys and keeps every placeholder', async () => {
        const messages = (await localeLoaders[lang.code]()).default as Record<string, string>;
        for (const [key, value] of Object.entries(messages)) {
          expect(keys, `${lang.code}: unknown key ${key}`).toContain(key);
          expect(value.trim().length, `${lang.code}.${key} is empty`).toBeGreaterThan(0);
          expect(placeholders(value), `${lang.code}.${key} placeholders`).toEqual(placeholders(en[key as MessageKey]));
        }
      });
      it('really translates (is not a copy of the English text) and its coverage flag is honest', async () => {
        const messages = (await localeLoaders[lang.code]()).default as Record<string, string>;
        const missing = keys.filter((k) => !(k in messages));
        const copied = keys.filter((k) => messages[k] === en[k] && !/^(nav\.pdf|cat\.pdf)$/.test(k) && en[k].length > 12);
        expect(copied, `${lang.code} has untranslated copies`).toEqual([]);
        expect(lang.coverage === 'full', `${lang.code} coverage flag must match ${missing.length} missing keys`).toBe(missing.length === 0);
      });
    });
  }
});
