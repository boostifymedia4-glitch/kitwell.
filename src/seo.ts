import { absoluteUrl } from '@/config/site';
import { DEFAULT_LANGUAGE, LANGUAGES, getLanguage, langTag } from '@/i18n/languages';
import { withLang } from '@/i18n/routing';

/** Open Graph locales (language_TERRITORY) for each language code. */
export const OG_LOCALE: Record<string, string> = {
  en: 'en_US', ur: 'ur_PK', ar: 'ar_AR', es: 'es_ES', fr: 'fr_FR', de: 'de_DE', pt: 'pt_BR', it: 'it_IT', tr: 'tr_TR', zh: 'zh_CN',
  ja: 'ja_JP', ko: 'ko_KR', hi: 'hi_IN', id: 'id_ID', bn: 'bn_BD', ru: 'ru_RU', nl: 'nl_NL', vi: 'vi_VN', pl: 'pl_PL', fa: 'fa_IR',
  th: 'th_TH', uk: 'uk_UA', ro: 'ro_RO', el: 'el_GR', cs: 'cs_CZ',
};

export interface Alternate {
  hreflang: string;
  href: string;
}

/** Self-referencing canonical address of a page (`path` has no language prefix) in one language. */
export const canonicalFor = (path: string, code: string) => absoluteUrl(withLang(path, code));

/** Every language version of a page plus x-default (the English version), for reciprocal hreflang links. */
export function alternatesFor(path: string, englishOnly = false): Alternate[] {
  if (englishOnly) return [];
  return [
    ...LANGUAGES.map((l) => ({ hreflang: langTag(l), href: canonicalFor(path, l.code) })),
    { hreflang: 'x-default', href: canonicalFor(path, DEFAULT_LANGUAGE) },
  ];
}

export const ogLocaleFor = (code: string) => OG_LOCALE[code] ?? OG_LOCALE.en;
export const htmlLangFor = (code: string) => {
  const l = getLanguage(code);
  return l ? langTag(l) : DEFAULT_LANGUAGE;
};
