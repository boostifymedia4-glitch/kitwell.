import { describe, expect, it } from 'vitest';
import { implLoaders } from '../src/tools/impl';
import { allPaths, breadcrumbsFor, getPageMeta } from '../src/pageMeta';
import { hasIcon } from '../src/components/Icon';
import { categories, featuredTools, popularTools, showcaseTools, groups, groupsInCategory, searchTools, toolPath, toolsInGroup, tools, getTool, relatedTools } from '../src/tools/registry';
import { computeSize } from '../src/lib/imageProcessor';

describe('tool registry', () => {
  it('has the expected MVP tool counts', () => {
    const count = (c: string) => tools.filter((t) => t.category === c).length;
    expect([count('image'), count('pdf'), count('text') + count('developer')]).toEqual([15, 12, 20]);
  });

  it('uses unique slugs and names', () => {
    expect(new Set(tools.map((t) => t.slug)).size).toBe(tools.length);
    expect(new Set(tools.map((t) => t.name)).size).toBe(tools.length);
  });

  it('every tool maps to an implementation loader', () => {
    for (const t of tools) expect(implLoaders[t.impl], `${t.slug} -> ${t.impl}`).toBeTypeOf('function');
    const used = new Set(tools.map((t) => t.impl));
    for (const key of Object.keys(implLoaders)) expect(used.has(key), `unused loader ${key}`).toBe(true);
  });

  it('related tools exist, are not self-references and are not duplicated', () => {
    for (const t of tools) {
      expect(t.related.length, t.slug).toBeGreaterThanOrEqual(4);
      expect(t.related).not.toContain(t.slug);
      expect(new Set(t.related).size).toBe(t.related.length);
      expect(relatedTools(t)).toHaveLength(t.related.length);
    }
  });

  it('has useful on-page content for every tool', () => {
    for (const t of tools) {
      expect(t.steps.length, `${t.slug} steps`).toBeGreaterThanOrEqual(2);
      expect(t.faq.length, `${t.slug} faq`).toBeGreaterThanOrEqual(1);
      expect(t.limits.length, `${t.slug} limits`).toBeGreaterThanOrEqual(1);
      expect(t.keywords.length, `${t.slug} keywords`).toBeGreaterThanOrEqual(1);
    }
  });

  it('every tool is reachable from at least one other tool page', () => {
    const linked = new Set(tools.flatMap((t) => t.related));
    for (const t of tools) expect(linked.has(t.slug), `${t.slug} has no inbound related link`).toBe(true);
  });

  it('search ranks name matches first', () => {
    expect(searchTools('merge pdf')[0].slug).toBe('merge-pdf');
    expect(searchTools('json')[0].category).toBe('developer');
    expect(searchTools('   ')).toEqual([]);
    expect(searchTools('zzzzqq')).toEqual([]);
  });
});

describe('tool catalogue structure', () => {
  it('assigns every tool to a defined group of its own category', () => {
    for (const t of tools) {
      const g = groups.find((x) => x.name === t.group && x.category === t.category);
      expect(g, `${t.slug} -> ${t.group}`).toBeDefined();
    }
  });

  it('has no empty groups and no duplicate group names within a category', () => {
    for (const c of categories) {
      const gs = groupsInCategory(c.id);
      expect(new Set(gs.map((g) => g.name)).size).toBe(gs.length);
      for (const g of gs) expect(toolsInGroup(c.id, g.name).length, g.name).toBeGreaterThan(0);
    }
  });

  it('gives every tool a real icon, distinct within its category', () => {
    for (const t of tools) expect(hasIcon(t.icon), `${t.slug} icon ${t.icon}`).toBe(true);
    for (const c of categories) {
      const seen = new Map<string, string>();
      for (const t of tools.filter((x) => x.category === c.id)) {
        const key = `${t.icon}|${t.convert?.join('>') ?? ''}`;
        expect(seen.has(key), `${t.slug} and ${seen.get(key)} share icon ${key}`).toBe(false);
        seen.set(key, t.slug);
      }
    }
  });

  it('keeps menu and card descriptions short enough to read', () => {
    for (const t of tools) {
      expect(t.description.length, t.slug).toBeLessThanOrEqual(90); // cards show up to 4 lines; longer text would be clipped
      expect(t.name.length, t.slug).toBeLessThanOrEqual(28);
    }
  });

  it('only features tools that exist, in the right category, without repeats', () => {
    for (const c of categories) {
      const list = featuredTools(c.id);
      expect(list.length).toBeGreaterThanOrEqual(7);
      expect(list.every((t) => t.category === c.id)).toBe(true);
      expect(new Set(list.map((t) => t.slug)).size).toBe(list.length);
    }
  });

  it('has a balanced popular list that the homepage category sections do not repeat', () => {
    const popular = popularTools();
    expect(popular).toHaveLength(8);
    expect(new Set(popular.map((t) => t.category)).size).toBe(categories.length);
    const popularSlugs = new Set(popular.map((t) => t.slug));
    for (const c of categories) {
      const list = showcaseTools(c.id);
      expect(list.length, c.id).toBeGreaterThanOrEqual(4);
      expect(list.some((t) => popularSlugs.has(t.slug))).toBe(false);
    }
  });

  it('draws conversion formats only for tools that convert, with short labels', () => {
    for (const t of tools.filter((x) => x.convert)) {
      expect(t.convert![0]).not.toBe(t.convert![1]);
      for (const label of t.convert!) expect(label.length, t.slug).toBeLessThanOrEqual(4);
    }
  });

  it('search finds tools by task, format and category', () => {
    const slugs = (q: string) => searchTools(q).map((t) => t.slug);
    expect(slugs('compress')).toContain('image-compressor');
    expect(slugs('json').slice(0, 3)).toEqual(expect.arrayContaining(['json-formatter', 'json-minifier']));
    expect(slugs('pdf').every((s) => getTool(s))).toBe(true);
    expect(searchTools('pdf').filter((t) => t.category === 'pdf').length).toBeGreaterThanOrEqual(6);
    expect(slugs('combine')).toContain('merge-pdf');
    expect(slugs('base64')).toEqual(expect.arrayContaining(['image-to-base64', 'base64-encoder-decoder']));
  });
});

describe('page metadata', () => {
  it('provides unique titles and descriptions for every indexable page', () => {
    const paths = allPaths();
    const titles = new Set<string>();
    const descs = new Set<string>();
    for (const p of paths) {
      const m = getPageMeta(p);
      expect(m, p).not.toBeNull();
      expect(m!.title.length).toBeLessThanOrEqual(70);
      expect(m!.description.length).toBeGreaterThan(50);
      expect(m!.description.length).toBeLessThanOrEqual(170);
      titles.add(m!.title);
      descs.add(m!.description);
    }
    expect(titles.size).toBe(paths.length);
    expect(descs.size).toBe(paths.length);
  });

  it('covers every category and tool URL', () => {
    const paths = new Set(allPaths());
    for (const c of categories) expect(paths.has(`/tools/${c.id}`)).toBe(true);
    for (const t of tools) expect(paths.has(toolPath(t))).toBe(true);
  });

  it('returns null for unknown or mismatched URLs', () => {
    expect(getPageMeta('/nope')).toBeNull();
    expect(getPageMeta('/tools/image/merge-pdf')).toBeNull();
    expect(getPageMeta('/tools/pdf/merge-pdf/extra')).toBeNull();
    expect(getPageMeta('/tools/unknown')).toBeNull();
  });

  it('builds breadcrumbs', () => {
    expect(breadcrumbsFor('/tools/pdf/merge-pdf').map((c) => c.name)).toEqual(['Home', 'Tools', 'PDF Tools', getTool('merge-pdf')!.name]);
  });
});

describe('image size planning', () => {
  const plan = { mime: 'image/png' as const, quality: 1, background: '#fff' };
  it('fits inside a box preserving aspect ratio', () => {
    expect(computeSize({ ...plan, fit: { width: 500 } }, 1000, 400)).toEqual({ w: 500, h: 200 });
    expect(computeSize({ ...plan, fit: { height: 100 } }, 1000, 400)).toEqual({ w: 250, h: 100 });
    expect(computeSize({ ...plan, fit: { width: 500, height: 100 } }, 1000, 400)).toEqual({ w: 250, h: 100 });
  });
  it('scales by percentage and never upscales with maxDimension', () => {
    expect(computeSize({ ...plan, scale: 0.5 }, 1000, 400)).toEqual({ w: 500, h: 200 });
    expect(computeSize({ ...plan, maxDimension: 800 }, 1600, 800)).toEqual({ w: 800, h: 400 });
    expect(computeSize({ ...plan, maxDimension: 800 }, 400, 200)).toEqual({ w: 400, h: 200 });
  });
});
