import { describe, expect, it } from 'vitest';
import { getPost, postKeys, postPath, posts } from '../src/blog/posts';
import { en } from '../src/i18n/en';
import { getPageMeta, allPaths } from '../src/pageMeta';
import { getCategory, getTool } from '../src/tools/registry';

const TAG = /<([\w-]+)>([\s\S]*?)<\/\1>/g;
const textOf = (post: (typeof posts)[number]) => postKeys(post).map((k) => en[k]);

describe('blog articles', () => {
  it('has the three launch articles with distinct slugs', () => {
    expect(posts.map((p) => p.slug)).toEqual(['compress-pdf-without-losing-quality', 'convert-images-to-pdf', 'ocr-scanned-pdf-searchable']);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
  });

  for (const post of posts) {
    describe(post.slug, () => {
      it('has English text for every block and no unused article keys', () => {
        const keys = postKeys(post);
        // `lead` block ids for headings are real keys too, so compare against everything under the slug.
        const headingKeys = post.blocks.filter((b) => b.type === 'h2').map((b) => `blog.${post.slug}.${b.id}`);
        const expected = new Set([...keys, ...headingKeys]);
        for (const k of expected) expect(en[k], k).toBeTruthy();
        const actual = Object.keys(en).filter((k) => k.startsWith(`blog.${post.slug}.`));
        expect(actual.filter((k) => !expected.has(k))).toEqual([]);
      });

      it('has a title and description of search-friendly length', () => {
        const title = en[`blog.${post.slug}.title`];
        const description = en[`blog.${post.slug}.description`];
        expect(title.length).toBeGreaterThan(20);
        expect(title.length).toBeLessThanOrEqual(65);
        expect(description.length).toBeGreaterThanOrEqual(110);
        expect(description.length).toBeLessThanOrEqual(165);
      });

      it('is a complete article, not filler', () => {
        const body = textOf(post).filter(Boolean).join(' ').replace(TAG, '$2');
        const words = body.split(/\s+/).length;
        expect(words).toBeGreaterThan(750);
        expect(post.blocks.filter((b) => b.type === 'h2').length).toBeGreaterThanOrEqual(6);
        const paragraphs = textOf(post).filter(Boolean);
        expect(new Set(paragraphs).size).toBe(paragraphs.length);
        expect(body).not.toMatch(/lorem|ipsum|TODO|\[.*\]/i);
      });

      it('links to real tools, guides and categories, with balanced tags', () => {
        let toolLinks = 0;
        let guideLinks = 0;
        for (const text of textOf(post)) {
          expect((text.match(/</g) ?? []).length, text).toBe((text.match(/>/g) ?? []).length);
          for (const m of text.matchAll(TAG)) {
            const [kind, ...rest] = m[1].split('_');
            const name = rest.join('_');
            if (kind === 'tool') {
              expect(getTool(name.split('_').join('-')), m[1]).toBeDefined();
              toolLinks++;
            } else if (kind === 'post') {
              expect(getPost(name), m[1]).toBeDefined();
              expect(name).not.toBe(post.slug);
              guideLinks++;
            } else if (kind === 'all') expect(getCategory(name), m[1]).toBeDefined();
            else throw new Error(`Unknown link tag <${m[1]}>`);
          }
        }
        expect(toolLinks).toBeGreaterThanOrEqual(3);
        expect(guideLinks).toBeGreaterThanOrEqual(1);
        for (const slug of post.tools) expect(getTool(slug), slug).toBeDefined();
        expect(post.tools).toContain(post.tool);
      });

      it('has FAQ structured data matching the visible questions', () => {
        const meta = getPageMeta(postPath(post.slug));
        expect(meta).not.toBeNull();
        const blocks = meta!.jsonLd as { '@type': string; mainEntity?: { name: string }[]; headline?: string; datePublished?: string; author?: { name: string } }[];
        const article = blocks.find((b) => b['@type'] === 'BlogPosting');
        expect(article?.headline).toBe(en[`blog.${post.slug}.title`]);
        expect(article?.datePublished).toBe(post.published);
        expect(article?.author?.name).toBe('Kitwell');
        const faq = blocks.find((b) => b['@type'] === 'FAQPage');
        expect(faq?.mainEntity?.map((q) => q.name)).toEqual([1, 2, 3].map((n) => en[`blog.${post.slug}.faq.${n}.q`]));
        expect(blocks.find((b) => b['@type'] === 'BreadcrumbList')).toBeDefined();
      });
    });
  }

  it('lists the blog and every article for prerendering and the sitemap', () => {
    const paths = allPaths();
    expect(paths).toContain('/blog');
    for (const p of posts) expect(paths).toContain(postPath(p.slug));
    expect(getPageMeta('/blog/not-a-post')).toBeNull();
  });
});
