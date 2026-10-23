import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadLocale } from '../src/i18n';
import { en } from '../src/i18n/en';
import { LANGUAGES } from '../src/i18n/languages';
import { makeLocalizer } from '../src/i18n/localizedMeta';
import { translateWith } from '../src/i18n/translate';
import { getPageMeta } from '../src/pageMeta';
import { BELIEF_PARAGRAPHS, NOT_ITEMS, STORY_TYPES, storyBlocks } from '../src/pages/aboutContent';
import { tools } from '../src/tools/registry';

const vars = { site: 'Kitwell', tools: tools.length, languages: LANGUAGES.length };
const english = (key: string, v?: Record<string, string | number>) => translateWith('en', {}, key, v);

describe('About page', () => {
  it('quotes the real number of tools and languages, never typed numbers', () => {
    const story = storyBlocks(english, vars).map((b) => b.text).join(' ');
    expect(story).toContain(`[[${tools.length} free tools in ${LANGUAGES.length} languages]]`);
    const meta = getPageMeta('/about')!;
    expect(meta.description).toContain(`${tools.length} free online tools in ${LANGUAGES.length} languages`);
  });

  it('has the required title and a description that fits a search result', () => {
    const meta = getPageMeta('/about')!;
    expect(meta.title).toBe('About Kitwell - Built by One Founder | Free Online Tools');
    expect(meta.description.length).toBeLessThanOrEqual(160);
    expect(meta.image).toBe('/images/founder/ubaid-ullah-og.jpg');
    expect(existsSync('public/images/founder/ubaid-ullah-og.jpg')).toBe(true);
    expect(existsSync('public/images/founder/ubaid-ullah.webp')).toBe(true);
    expect(existsSync('public/images/founder/ubaid-ullah.jpg')).toBe(true);
  });

  it('has Person, AboutPage and breadcrumb structured data', () => {
    const blocks = getPageMeta('/about')!.jsonLd as { '@type': string; name?: string; jobTitle?: string; sameAs?: string[] }[];
    expect(blocks.map((b) => b['@type'])).toEqual(expect.arrayContaining(['BreadcrumbList', 'AboutPage', 'Person']));
    const person = blocks.find((b) => b['@type'] === 'Person');
    expect(person?.name).toBe('Ubaid Ullah');
    expect(person?.jobTitle).toBe('Founder & CEO');
    expect(person?.sameAs).toContain('https://www.linkedin.com/in/ubaid-ullah3');
  });

  it('keeps the copy complete: no placeholders, three pull quotes and the founder roles', () => {
    const blocks = storyBlocks(english, vars);
    expect(blocks.filter((b) => b.type === 'quote')).toHaveLength(3);
    const all = Object.entries(en).filter(([k]) => k.startsWith('about.')).map(([, v]) => v).join(' ');
    expect(all).not.toMatch(/lorem|ipsum|TODO|\[Add|placeholder/i);
    expect(en['about.hero.title']).toBe('Built by one person. Made for everyone.');
    expect(en['about.ceo.roles']).toBe('Founder. CEO. Product designer. Researcher. Marketer. Support desk.');
    expect(en['about.belief.final']).toContain('start with what you have');
  });

  it('has a catalog entry for every block the page renders', () => {
    for (let i = 1; i <= STORY_TYPES.length; i++) expect(en[`about.story.${i}`], `story ${i}`).toBeTruthy();
    for (let i = 1; i <= BELIEF_PARAGRAPHS; i++) expect(en[`about.belief.p${i}`]).toBeTruthy();
    for (let i = 1; i <= NOT_ITEMS; i++) expect(en[`about.not.${i}`]).toBeTruthy();
    expect(en['about.touch.text']).toContain('{contact}');
    expect(en['about.touch.text']).toContain('{privacy}');
  });

  const others = LANGUAGES.filter((l) => l.code !== 'en');
  for (const { code } of others) {
    it(`is translated and indexable in ${code}`, async () => {
      const { messages, toolText } = await loadLocale(code);
      const aboutKeys = Object.keys(en).filter((k) => k.startsWith('about.') || k === 'meta.about.title' || k === 'meta.about.description');
      for (const key of aboutKeys) {
        expect(messages[key], `${code} ${key}`).toBeTruthy();
        // placeholders and highlight markers must survive translation
        for (const m of en[key].match(/\{\w+\}|\[\[|\]\]/g) ?? []) expect(messages[key], `${code} ${key} keeps ${m}`).toContain(m);
        if (!['about.pill', 'about.ceo.roles'].includes(key) && en[key].length > 40) expect(messages[key], `${code} ${key} is not English`).not.toBe(en[key]);
      }
      const meta = getPageMeta('/about', makeLocalizer(code, messages, toolText))!;
      expect(meta.englishOnly).toBeFalsy();
      expect(meta.noindex).toBeFalsy();
      expect(meta.title).not.toBe(getPageMeta('/about')!.title);
      expect(meta.description.length).toBeLessThanOrEqual(200);
    });
  }
});
