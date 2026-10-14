import { en } from '@/i18n/en';
import { FAQ_COUNT } from '@/i18n/en/help';
import { LANGUAGES } from '@/i18n/languages';
import type { FaqItem } from '@/tools/types';

type Translate = (key: string, vars?: Record<string, string | number>) => string;

/** The ten Help & FAQ questions (`faq.<n>.q/.a`) in the language `t` translates to. */
export function buildFaq(t: Translate): FaqItem[] {
  const vars = { languages: LANGUAGES.length };
  return Array.from({ length: FAQ_COUNT }, (_, i) => ({ q: t(`faq.${i + 1}.q`, vars), a: t(`faq.${i + 1}.a`, vars) }));
}

/** English content, used for the prerendered page and its FAQ structured data. */
export const allHelpItems: FaqItem[] = buildFaq((key, vars) => (en[key] ?? key).replace(/\{(\w+)\}/g, (w, n: string) => String(vars?.[n] ?? w)));
