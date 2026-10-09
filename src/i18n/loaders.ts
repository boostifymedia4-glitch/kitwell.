import type { PartialMessages } from './en';

type Loader = () => Promise<{ default: PartialMessages }>;

/** One lazy chunk per language, so visitors only download the language they choose. */
export const localeLoaders: Record<string, Loader> = {
  ur: () => import('./locales/ur'),
  ar: () => import('./locales/ar'),
  es: () => import('./locales/es'),
  fr: () => import('./locales/fr'),
  de: () => import('./locales/de'),
  pt: () => import('./locales/pt'),
  it: () => import('./locales/it'),
  tr: () => import('./locales/tr'),
  zh: () => import('./locales/zh'),
  ja: () => import('./locales/ja'),
  ko: () => import('./locales/ko'),
  hi: () => import('./locales/hi'),
  id: () => import('./locales/id'),
  bn: () => import('./locales/bn'),
  ru: () => import('./locales/ru'),
  nl: () => import('./locales/nl'),
};
