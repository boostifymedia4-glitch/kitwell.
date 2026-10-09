import { describe, expect, it } from 'vitest';
import { en, type MessageKey } from '../src/i18n/en';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../src/i18n/languages';
import { localeLoaders } from '../src/i18n/loaders';
import { requiredKeys, sourceKeyOf } from '../src/i18n/plurals';

/** Strings that are the same in every language: pure formats, units, technical names and words shared with English. */
const SAME_EVERYWHERE = new Set([
  'contact.form.counter', 'lang.optionLabel', 'ui.sliderLabel', 'err.pdf.mergeFile', 'imagesToPdf.fileError',
  'imageResize.note', 'imageCrop.note', 'imageTransform.note', 'imageWatermark.note', 'imageEnlarge.note', 'imageConvert.note',
  'photoEditor.resultInfo', 'photoEditor.fileInfo', 'imageCompress.maxSize.fullHd', 'imageCompress.noteSmaller',
  'caseConverter.mode.constant', 'imageToBase64.style.css', 'characterCounter.bytes', 'pdfRedact.quality.standard',
  'pdfPageNumbers.fmt.page-n', 'pdfPageNumbers.fmt.n-of-total', 'ui.pages.other', 'gifMaker.shape.portrait',
  'imagesToPdf.summary.one', 'imagesToPdf.summary.other', 'pdfSplit.note.other', 'pdfMetadata.pageCount.other',
  'pdfRedact.leftover', 'pdfRedact.page', 'pdfRedact.pageChip', 'qrGenerator.level.Q', 'category.count', 'colorConverter.contrast',
]);

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
          const source = sourceKeyOf(key, en);
          expect(source, `${lang.code}: unknown key ${key}`).not.toBeNull();
          expect(value.trim().length, `${lang.code}.${key} is empty`).toBeGreaterThan(0);
          const plural = /\.(zero|one|two|few|many|other)$/.test(key) && `${key.slice(0, key.lastIndexOf('.'))}.other` in en;
          // Plural forms of a language may drop {count} where the word itself says the number ("one page").
          if (plural) for (const p of placeholders(value)) expect(placeholders(en[source!]), `${lang.code}.${key} placeholder ${p}`).toContain(p);
          else expect(placeholders(value), `${lang.code}.${key} placeholders`).toEqual(placeholders(en[source!]));
        }
      });
      it('really translates (is not a copy of the English text) and its coverage flag is honest', async () => {
        const messages = (await localeLoaders[lang.code]()).default as Record<string, string>;
        const missing = requiredKeys(en, lang.code).filter((k) => !(k in messages));
        const copied = keys.filter((k) => messages[k] === en[k] && !SAME_EVERYWHERE.has(k) && en[k].length > 12);
        expect(copied, `${lang.code} has untranslated copies`).toEqual([]);
        expect(lang.coverage === 'full', `${lang.code} coverage flag must match ${missing.length} missing keys`).toBe(missing.length === 0);
      });
    });
  }
});
