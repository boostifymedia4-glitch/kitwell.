/**
 * Structure of the About page. The text lives in the translation catalog (src/i18n/en/about.ts and one file per
 * language); this file only decides which story blocks are paragraphs and which are pull quotes. `[[words]]` in a
 * paragraph marks a phrase for the soft highlighter.
 */
import type { Vars } from '@/i18n/translate';

export type StoryBlock = { type: 'p' | 'quote'; text: string };

/** The type of each story block, in order. A translation must keep this order. */
export const STORY_TYPES: ('p' | 'quote')[] = ['p', 'p', 'quote', 'p', 'quote', 'p', 'p', 'p', 'p', 'p', 'quote'];

type Translate = (key: string, vars?: Vars) => string;

export function storyBlocks(t: Translate, vars: { site: string; tools: number; languages: number }): StoryBlock[] {
  return STORY_TYPES.map((type, i) => ({ type, text: t(`about.story.${i + 1}`, vars) }));
}

export const BELIEF_PARAGRAPHS = 3;
export const NOT_ITEMS = 3;
