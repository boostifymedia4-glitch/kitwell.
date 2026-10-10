import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { ART_COLORS, ToolArt } from '../src/components/ui/ToolArt';
import { TOOL_ART } from '../src/tools/toolArt';
import { tools } from '../src/tools/registry';

describe('tool icons', () => {
  it('map every tool, and only real tools, in one central table', () => {
    expect(tools).toHaveLength(69);
    expect(Object.keys(TOOL_ART).sort()).toEqual(tools.map((t) => t.slug).sort());
  });

  it('give every tool its own look: no two tools share the same base, colour, glyph and tag', () => {
    const seen = new Map<string, string>();
    for (const t of tools) {
      const a = TOOL_ART[t.slug];
      const key = [a.base, a.color, a.glyph, a.tag ?? ''].join('|');
      expect(seen.has(key), `${t.slug} and ${seen.get(key)} look the same (${key})`).toBe(false);
      seen.set(key, t.slug);
    }
  });

  it('show the target format as the tag of every conversion', () => {
    // the target format; when the target is just "an image" (Base64 to Image), the tag names the source
    for (const t of tools.filter((x) => x.convert)) expect(TOOL_ART[t.slug].tag, t.slug).toBe(t.convert![1] === 'IMG' ? t.convert![0] : t.convert![1]);
  });

  it('use several colours: the palette is used by many tools and every colour is a valid hex', () => {
    const used = new Set(Object.values(TOOL_ART).map((a) => a.color));
    expect(used.size).toBeGreaterThanOrEqual(11);
    for (const c of Object.values(ART_COLORS)) expect(c).toMatch(/^#[0-9A-F]{6}$/);
  });

  it('render an inline SVG for every tool at both sizes, with no remote references or ids', () => {
    for (const t of tools) {
      for (const small of [false, true]) {
        const svg = renderToStaticMarkup(createElement(ToolArt, { slug: t.slug, small }));
        expect(svg, t.slug).toMatch(/^<svg [^>]*aria-hidden="true"/);
        expect(svg).not.toMatch(/https?:|href=|url\(#| id=/);
        expect(svg.length).toBeGreaterThan(300);
        if (!small && TOOL_ART[t.slug].tag) expect(svg).toContain(`>${TOOL_ART[t.slug].tag}<`);
      }
    }
  });

  it('keeps a contrast of at least 3:1 between the white glyph and every solid colour', () => {
    const lum = (hex: string) => {
      const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    for (const [name, hex] of Object.entries(ART_COLORS)) expect(1.05 / (lum(hex) + 0.05), name).toBeGreaterThanOrEqual(3);
  });
});
