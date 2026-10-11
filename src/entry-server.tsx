import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { site } from './config/site';
import { loadLocale } from './i18n';
import { LANGUAGES, DEFAULT_LANGUAGE, getLanguage, langTag } from './i18n/languages';
import { makeLocalizer } from './i18n/localizedMeta';
import { splitLang } from './i18n/routing';
import { allPaths, getPageMeta, NOT_FOUND_META, type Localizer } from './pageMeta';
import { matchPage, normalizePath } from './routes';
import { alternatesFor, canonicalFor, ogLocaleFor } from './seo';

/** Renders one address (with or without a language prefix) to HTML and its localised page metadata. */
export async function render(url: string) {
  const full = normalizePath(url);
  const { code, path } = splitLang(full);
  const locale = await loadLocale(code);
  await matchPage(full).preload();
  const html = renderToString(
    <StaticRouter location={full}>
      <App initial={locale} />
    </StaticRouter>,
  );
  const localizer: Localizer | undefined = code === DEFAULT_LANGUAGE ? undefined : makeLocalizer(code, locale.messages, locale.toolText);
  const found = getPageMeta(path) !== null;
  const meta = getPageMeta(path, localizer) ?? (localizer ? { ...NOT_FOUND_META, ...localizer.notFound } : NOT_FOUND_META);
  const lang = getLanguage(code)!;
  return { html, meta, found, code, path, htmlLang: langTag(lang), dir: lang.dir, ogLocale: ogLocaleFor(code), canonical: canonicalFor(path, code), alternates: alternatesFor(path) };
}

export { allPaths };
export const languageCodes = LANGUAGES.map((l) => l.code);
export const siteUrl = site.url;
export const siteName = site.name;
