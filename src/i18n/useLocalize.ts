import { useMemo } from 'react';
import { groupId } from '@/tools/registry';
import type { Category, ToolDef, ToolGroup } from '@/tools/types';
import { site } from '@/config/site';
import { useI18n } from '.';

/**
 * Localised views of the registry data. The English text stays in src/tools (the source of truth); these
 * functions return copies with the selected language's text where a translation exists.
 */
export function useLocalize() {
  const { t, toolText, lang } = useI18n();
  return useMemo(() => {
    const tool = (x: ToolDef): ToolDef => {
      const tx = toolText[x.slug];
      return tx ? { ...x, ...tx, faq: tx.faq ?? x.faq, steps: tx.steps ?? x.steps, limits: tx.limits ?? x.limits } : x;
    };
    const category = (c: Category): Category => ({
      ...c,
      name: t(`cat.${c.id}`),
      short: t(`nav.${c.id}`),
      description: t(`cat.${c.id}.description`),
      intro: t(`cat.${c.id}.intro`),
      metaTitle: t(`cat.${c.id}.metaTitle`, { site: site.name }),
      metaDescription: t(`cat.${c.id}.metaDescription`),
    });
    const group = (g: ToolGroup): ToolGroup => ({ ...g, name: t(`group.${groupId(g.name)}.name`), description: t(`group.${groupId(g.name)}.description`) });
    return { tool, tools: (xs: ToolDef[]) => xs.map(tool), category, group, code: lang.code };
  }, [t, toolText, lang.code]);
}
