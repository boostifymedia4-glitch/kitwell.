import type { PartialMessages } from './en';
import type { ToolTextMap } from './toolText';

export interface LocaleModule {
  default: PartialMessages;
  tools: ToolTextMap;
}

/** One lazy chunk per language, so visitors only download the language they choose. */
export const localeLoaders: Record<string, () => Promise<LocaleModule>> = {
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
