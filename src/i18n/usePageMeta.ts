import { useMemo } from 'react';
import type { PageMeta } from '@/components/Seo';
import { site } from '@/config/site';
import { getPageMeta } from '@/pageMeta';
import { useI18n } from '.';
import { makeLocalizer } from './localizedMeta';

/** Page metadata (title, description, structured data) in the language the page is shown in. */
export function usePageMeta(path: string): PageMeta | null {
  const { lang, messages, toolText } = useI18n();
  return useMemo(() => {
    if (lang.code === 'en') return getPageMeta(path);
    return getPageMeta(path, makeLocalizer(lang.code, messages, toolText));
  }, [path, lang.code, messages, toolText]);
}

/** Metadata of the 404 page in the current language. */
export function useNotFoundMeta(): PageMeta {
  const { t } = useI18n();
  return { title: t('meta.notFound.title', { site: site.name }), description: t('meta.notFound.description'), path: '/404', noindex: true };
}
