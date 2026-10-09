import { en } from '@/i18n/en';
import { helpStructure } from '@/i18n/en/help';
import type { FaqItem } from '@/tools/types';

export interface HelpSection {
  id: string;
  title: string;
  items: FaqItem[];
}

/** Builds the Help & FAQ content from the catalog (`help.<section>.<n>.q/.a`) in the language `t` translates to. */
export function buildHelpSections(t: (key: string) => string): HelpSection[] {
  return helpStructure.map(([id, count]) => ({
    id,
    title: t(`help.${id}.title`),
    items: Array.from({ length: count }, (_, i) => ({ q: t(`help.${id}.${i}.q`), a: t(`help.${id}.${i}.a`) })),
  }));
}

/** English content, used for the prerendered page and its FAQ structured data. */
export const helpSections: HelpSection[] = buildHelpSections((key) => en[key] ?? key);

export const allHelpItems: FaqItem[] = helpSections.flatMap((s) => s.items);
