import { site } from '@/config/site';
import { tools } from '@/tools/registry';
import { LANGUAGES } from './languages';
import { buildFaq } from '@/pages/helpData';
import type { Localizer } from '@/pageMeta';
import type { PartialMessages } from './en';
import type { ToolTextMap } from './toolText';
import { makeLocalize } from './useLocalize';
import { translateWith, type Vars } from './translate';

const keyOf = (path: string) => (path === '/' ? 'home' : path.replace(/^\//, ''));

/**
 * Builds the text supplier for page metadata in one language. Pure, so the browser (usePageMeta) and the build-time
 * prerender produce identical titles, descriptions and structured data.
 */
export function makeLocalizer(code: string, messages: PartialMessages, toolText: ToolTextMap): Localizer {
  const t = (key: string, vars?: Vars) => translateWith(code, messages, key, vars);
  const loc = makeLocalize(t, toolText, code);
  const v = { site: site.name, tools: tools.length, languages: LANGUAGES.length };
  return {
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
    lang: code,
    post: (slug, key) => t(`blog.${slug}.${key}`),
    help: buildFaq(t),
    notFound: { title: t('meta.notFound.title', v), description: t('meta.notFound.description') },
  };
}
