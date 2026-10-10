import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CategoryIcon } from '../src/components/ui/CategoryIcon';
import { GroupedTools } from '../src/components/ui/GroupedTools';
import Home from '../src/pages/Home';
import Tools from '../src/pages/Tools';
import { ToolGrid } from '../src/components/ui/ToolCard';
import { TRUST_KINDS, TrustIcon } from '../src/components/ui/TrustArt';
import { categories, popularTools, showcaseTools, toolsInCategory } from '../src/tools/registry';

const render = (node: ReturnType<typeof createElement>) => renderToStaticMarkup(createElement(StaticRouter, { location: '/' }, node));
const arts = (html: string) => [...html.matchAll(/data-art="([a-z0-9-]+)"/g)].map((m) => m[1]);

describe('tool icons on category listings', () => {
  for (const c of categories) {
    it(`${c.id}: every tool card shows that tool's own illustration, once`, () => {
      const html = render(createElement(GroupedTools, { category: c.id }));
      expect(arts(html).sort()).toEqual(toolsInCategory(c.id).map((t) => t.slug).sort());
      // the same component the homepage and All tools page use
      expect((html.match(/class="card tool-card"/g) ?? []).length).toBe(toolsInCategory(c.id).length);
    });
    it(`${c.id}: the homepage section shows the same illustrations`, () => {
      const html = render(createElement(ToolGrid, { tools: showcaseTools(c.id) }));
      expect(arts(html)).toEqual(showcaseTools(c.id).map((t) => t.slug));
    });
  }

  it('popular tools use the same illustrations as their category listing', () => {
    expect(arts(render(createElement(ToolGrid, { tools: popularTools(), showCategory: true })))).toEqual(popularTools().map((t) => t.slug));
  });
});

describe('homepage privacy illustrations', () => {
  it('render three different multi-colour SVGs, decorative and self-contained', () => {
    const svgs = TRUST_KINDS.map((k) => renderToStaticMarkup(createElement(TrustIcon, { kind: k })));
    expect(new Set(svgs).size).toBe(3);
    for (const [i, svg] of svgs.entries()) {
      expect(svg).toContain(`data-trust="${TRUST_KINDS[i]}"`);
      expect(svg).toContain('aria-hidden="true"');
      expect(new Set(svg.match(/fill="#[0-9A-Fa-f]{6}"/g)).size).toBeGreaterThanOrEqual(3);
      expect(svg).not.toMatch(/https?:|href=|url\(#| id=/);
    }
  });
});

describe('category heading icons', () => {
  const colours = { image: '#3B68D2', pdf: '#DC3F44', text: '#8B47C7', developer: '#2A9456' } as const;

  it('are multi-colour illustrations with a distinct colour each, never a single-colour line icon', () => {
    const seen = new Set<string>();
    for (const c of categories) {
      const html = renderToStaticMarkup(createElement(CategoryIcon, { id: c.id }));
      expect(html, c.id).toContain(`data-category-art="${c.id}"`);
      expect(html).toContain(`--art:${colours[c.id]}`);
      expect(html).toContain(`fill="${colours[c.id]}"`);
      expect(new Set(html.match(/fill="#[0-9A-Fa-f]{6}"/g)).size, c.id).toBeGreaterThanOrEqual(2);
      expect(html).not.toContain('stroke="currentColor"'); // the old line icons drew in currentColor, i.e. teal
      seen.add(colours[c.id]);
    }
    expect(seen.size).toBe(4);
  });

  it('are used by the homepage and the All tools page instead of the old chip classes', () => {
    for (const [page, node] of [['home', createElement(Home)], ['all tools', createElement(Tools)]] as const) {
      const html = render(node);
      expect((html.match(/data-category-art="/g) ?? []).length, page).toBeGreaterThanOrEqual(4);
      expect(html, page).not.toMatch(/tool-icon[^"]*chip-/);
    }
  });
});
