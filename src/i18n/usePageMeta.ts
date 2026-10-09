import { useMemo } from 'react';
import type { PageMeta } from '@/components/Seo';
import { site } from '@/config/site';
import { buildHelpSections } from '@/pages/helpData';
import { getPageMeta, type Localizer } from '@/pageMeta';
import { useI18n } from '.';
import { useLocalize } from './useLocalize';

const keyOf = (path: string) => (path === '/' ? 'home' : path.replace(/^\//, ''));

/** Page metadata (title, description, structured data) in the language the page is shown in. */
export function usePageMeta(path: string): PageMeta | null {
  const { t, lang, toolText } = useI18n();
  const loc = useLocalize();
  return useMemo(() => {
    if (lang.code === 'en') return getPageMeta(path);
    const v = { site: site.name };
    const localizer: Localizer = {
      staticPage: (p) => {
        const k = keyOf(p);
        return { name: k === 'home' ? t('crumb.home') : t(`page.${k}.name`), title: t(`meta.${k}.title`, v), description: t(`meta.${k}.description`, v) };
      },
      category: loc.category,
      tool: (x) => {
        const local = loc.tool(x);
        return toolText[x.slug]?.name ? { ...local, title: t('meta.tool.title', { name: local.name, site: site.name }) } : local;
      },
      crumbs: { home: t('crumb.home'), tools: t('crumb.tools') },
      lang: lang.code,
      post: (slug, key) => t(`blog.${slug}.${key}`),
      help: buildHelpSections(t).flatMap((s) => s.items),
      notFound: { title: t('meta.notFound.title', v), description: t('meta.notFound.description') },
    };
    return getPageMeta(path, localizer);
  }, [path, lang.code, t, loc, toolText]);
}

/** Metadata of the 404 page in the current language. */
export function useNotFoundMeta(): PageMeta {
  const { t } = useI18n();
  return { title: t('meta.notFound.title', { site: site.name }), description: t('meta.notFound.description'), path: '/404', noindex: true };
}

