import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '../src/i18n/languages';
import { makeLocalizer } from '../src/i18n/localizedMeta';
import { getPageMeta } from '../src/pageMeta';
import { ABOUT, storyBlocks } from '../src/pages/aboutContent';
import { tools } from '../src/tools/registry';

describe('About page', () => {
  it('quotes the real number of tools and languages, never typed numbers', () => {
    const story = storyBlocks(tools.length, LANGUAGES.length).map((b) => b.text).join(' ');
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
    const types = (getPageMeta('/about')!.jsonLd as { '@type': string; jobTitle?: string; sameAs?: string[] }[]).map((b) => b['@type']);
    expect(types).toEqual(expect.arrayContaining(['BreadcrumbList', 'AboutPage', 'Person']));
    const person = (getPageMeta('/about')!.jsonLd as { '@type': string; name?: string; jobTitle?: string; sameAs?: string[] }[]).find((b) => b['@type'] === 'Person');
    expect(person?.name).toBe('Ubaid Ullah');
    expect(person?.jobTitle).toBe('Founder & CEO');
    expect(person?.sameAs).toContain('https://www.linkedin.com/in/ubaid-ullah3');
  });

  it('is English only: other languages are noindex with an English canonical', () => {
    const meta = getPageMeta('/about', makeLocalizer('de', {}, {}))!;
    expect(meta.englishOnly).toBe(true);
    expect(meta.noindex).toBe(true);
    expect(getPageMeta('/about')!.noindex).toBeFalsy();
  });

  it('keeps the copy complete: no placeholders, three pull quotes and the founder roles', () => {
    const blocks = storyBlocks(77, 25);
    expect(blocks.filter((b) => b.type === 'quote')).toHaveLength(3);
    const all = JSON.stringify(ABOUT) + blocks.map((b) => b.text).join(' ');
    expect(all).not.toMatch(/lorem|ipsum|TODO|\[Add|placeholder/i);
    expect(ABOUT.heroTitle).toBe('Built by one person. Made for everyone.');
    expect(ABOUT.ceo.roles).toBe('Founder. CEO. Product designer. Researcher. Marketer. Support desk.');
    expect(ABOUT.belief.final).toContain('start with what you have');
  });
});
