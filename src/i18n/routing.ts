import { useLocation } from 'react-router-dom';
import { DEFAULT_LANGUAGE, LANGUAGES } from './languages';

/**
 * Language in the URL. English lives at the plain address (/tools/pdf/merge-pdf) and every other language under
 * its code (/ur/tools/pdf/merge-pdf). The URL is the single source of truth for the language: the same address
 * always returns the same language, which is what search engines need.
 */
const PREFIXES = new Set(LANGUAGES.filter((l) => l.code !== DEFAULT_LANGUAGE).map((l) => l.code));

const trim = (p: string) => {
  const t = p.replace(/\/+$/, '');
  return t === '' ? '/' : t;
};

/** Splits "/ur/tools" into { code: 'ur', path: '/tools' }; addresses without a language prefix are English. */
export function splitLang(pathname: string): { code: string; path: string } {
  const clean = trim(pathname);
  const [, first = '', ...rest] = clean.split('/');
  if (PREFIXES.has(first)) return { code: first, path: rest.length ? `/${rest.join('/')}` : '/' };
  return { code: DEFAULT_LANGUAGE, path: clean };
}

/** The address of `path` (which may carry ?query and #hash) in the given language. */
export function withLang(path: string, code: string): string {
  const m = /^([^?#]*)(.*)$/.exec(path)!;
  const base = splitLang(m[1]).path;
  if (code === DEFAULT_LANGUAGE) return base + m[2];
  return (base === '/' ? `/${code}` : `/${code}${base}`) + m[2];
}

/** The current page's path without its language prefix, e.g. "/tools/pdf" for /ur/tools/pdf. */
export function usePath(): string {
  return splitLang(useLocation().pathname).path;
}
