import type { FaqItem } from '@/tools/types';

/** The parts of a tool page that are translated. Anything missing falls back to the English text in src/tools/data. */
export interface ToolText {
  name: string;
  description: string;
  metaDescription: string;
  steps: string[];
  faq: FaqItem[];
  limits: string[];
}

export type ToolTextMap = Record<string, Partial<ToolText>>;
