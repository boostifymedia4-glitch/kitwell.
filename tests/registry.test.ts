import { describe, expect, it } from 'vitest';
import { implLoaders } from '../src/tools/impl';
import { allPaths, breadcrumbsFor, getPageMeta } from '../src/pageMeta';
import { categories, getTool, relatedTools, searchTools, toolPath, tools } from '../src/tools/registry';
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
