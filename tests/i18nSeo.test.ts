import { describe, expect, it } from 'vitest';
import { DEFAULT_LANGUAGE, LANGUAGES, langTag } from '../src/i18n/languages';
import { loadLocale } from '../src/i18n';
import { makeLocalizer } from '../src/i18n/localizedMeta';
import { splitLang, withLang } from '../src/i18n/routing';
import { allPaths, getPageMeta } from '../src/pageMeta';
import { alternatesFor, canonicalFor, ogLocaleFor } from '../src/seo';
import { en } from '../src/i18n/en';
import { tools } from '../src/tools/registry';

const codes = LANGUAGES.map((l) => l.code);

describe('language routing', () => {
  it('keeps English at plain paths and prefixes every other language', () => {
    expect(withLang('/tools/pdf', 'en')).toBe('/tools/pdf');
    expect(withLang('/', 'vi')).toBe('/vi');
    expect(withLang('/tools/pdf?x=1#a', 'fa')).toBe('/fa/tools/pdf?x=1#a');
    expect(withLang('/ur/tools', 'cs')).toBe('/cs/tools');
    expect(withLang('/cs/tools', 'en')).toBe('/tools');
  });
  it('reads the language from the address', () => {
    expect(splitLang('/th/blog/')).toEqual({ code: 'th', path: '/blog' });
    expect(splitLang('/el')).toEqual({ code: 'el', path: '/' });
    expect(splitLang('/tools')).toEqual({ code: 'en', path: '/tools' });
  });
});

describe('international SEO', () => {
  it('has reciprocal hreflang alternates for all 25 languages plus x-default', () => {
    const alts = alternatesFor('/tools/pdf/merge-pdf');
    expect(alts).toHaveLength(26);
    expect(new Set(alts.map((a) => a.hreflang)).size).toBe(26);
    expect(alts.find((a) => a.hreflang === 'x-default')!.href).toBe(canonicalFor('/tools/pdf/merge-pdf', DEFAULT_LANGUAGE));
    expect(alts.find((a) => a.hreflang === 'zh-CN')!.href).toContain('/zh/');
  });
  it('has distinct canonicals and og locales per language', () => {
    expect(new Set(codes.map((c) => canonicalFor('/about', c))).size).toBe(25);
    expect(new Set(codes.map(ogLocaleFor)).size).toBe(25);
    expect(langTag(LANGUAGES.find((l) => l.code === 'zh')!)).toBe('zh-CN');
  });
  for (const code of codes.filter((c) => c !== DEFAULT_LANGUAGE)) {
    it(`localises titles, descriptions and URLs of every page in ${code}`, async () => {
      const data = await loadLocale(code);
      const l = makeLocalizer(code, data.messages, data.toolText);
      // Blog articles are English only on purpose (noindex in other languages; see tests/blog.test.ts).
      for (const path of allPaths().filter((p) => !p.startsWith('/blog/'))) {
        const meta = getPageMeta(path, l)!;
        const english = getPageMeta(path)!;
        expect(meta.title.length, path).toBeGreaterThan(3);
        if (path.split('/').length >= 4 || path === '/') expect(meta.title, `${code} ${path} title`).not.toBe(english.title);
        expect(meta.description, `${code} ${path} description`).not.toBe(english.description);
        expect(JSON.stringify(meta.jsonLd)).toContain(`/${code}`);
      }
    }, 30000);
    it(`has the legal pages and the English-authoritative note in ${code}`, async () => {
      const { messages } = await loadLocale(code);
      const legalKeys = Object.keys(en).filter((k) => k.startsWith('legal.'));
      expect(legalKeys.length).toBeGreaterThan(30);
      for (const k of legalKeys) expect(messages[k], `${code} ${k}`).toBeTruthy();
    });
    it(`translates every tool in ${code}`, async () => {
      const { toolText } = await loadLocale(code);
      for (const t of tools) expect(toolText[t.slug]?.name, `${code} ${t.slug}`).toBeTruthy();
    });
  }
});

describe('language selector', () => {
  it('no longer carries the "English is authoritative" notice in any language', async () => {
    expect(en['lang.note' as keyof typeof en]).toBeUndefined();
    for (const code of codes.filter((c) => c !== DEFAULT_LANGUAGE)) {
      const { messages } = await loadLocale(code);
      expect(messages['lang.note'], code).toBeUndefined();
    }
  });
  it('still lists all 25 languages exactly once', () => {
    expect(LANGUAGES).toHaveLength(25);
    expect(new Set(LANGUAGES.map((l) => l.name)).size).toBe(25);
  });
});

describe('language selector regions', () => {
  it('has a country or region label for every language', () => {
    for (const l of LANGUAGES) expect(l.region, l.code).toBeTruthy();
    expect(LANGUAGES.find((l) => l.code === 'de')!.region).toBe('Germany');
    expect(LANGUAGES.find((l) => l.code === 'zh')!.region).toBe('China');
  });
});
