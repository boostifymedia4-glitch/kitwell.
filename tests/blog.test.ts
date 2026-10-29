import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getPost, postImage, postKeys, postPath, postThumb, posts, relatedPosts } from '../src/blog/posts';
import { en } from '../src/i18n/en';
import { makeLocalizer } from '../src/i18n/localizedMeta';
import { getPageMeta, allPaths } from '../src/pageMeta';
import { alternatesFor } from '../src/seo';
import { getCategory, getTool } from '../src/tools/registry';

const TAG = /<([\w-]+)>([\s\S]*?)<\/\1>/g;
const textOf = (post: (typeof posts)[number]) => postKeys(post).map((k) => en[k]);
const wordsOf = (post: (typeof posts)[number]) => textOf(post).filter(Boolean).join(' ').replace(TAG, '$2').split(/\s+/).length;

describe('blog articles', () => {
  it('has forty-eight articles with distinct slugs, newest first', () => {
    expect(posts).toHaveLength(48);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    const dates = posts.map((p) => p.published);
    expect([...dates].sort().reverse()).toEqual(dates);
    for (const p of posts) expect(p.updated >= p.published, p.slug).toBe(true);
  });

  for (const post of posts) {
    describe(post.slug, () => {
      it('has English text for every block and no unused article keys', () => {
        const expected = new Set(postKeys(post));
        for (const k of expected) expect(en[k], k).toBeTruthy();
        const actual = Object.keys(en).filter((k) => k.startsWith(`blog.${post.slug}.`));
        expect(actual.filter((k) => !expected.has(k))).toEqual([]);
      });

      it('has a title and description of search-friendly length', () => {
        const title = en[`blog.${post.slug}.title`];
        const description = en[`blog.${post.slug}.description`];
        expect(title.length).toBeGreaterThan(20);
        expect(title.length).toBeLessThanOrEqual(60);
        expect(description.length).toBeGreaterThanOrEqual(120);
        expect(description.length).toBeLessThanOrEqual(165);
        expect(getPageMeta(postPath(post.slug))!.title.length).toBeLessThanOrEqual(70);
        expect(en[`blog.${post.slug}.excerpt`].length).toBeGreaterThan(40);
      });

      it('is a complete article, not filler', () => {
        const body = textOf(post).filter(Boolean).join(' ').replace(TAG, '$2');
        expect(wordsOf(post)).toBeGreaterThan(1000);
        expect(post.blocks.filter((b) => b.type === 'h2').length).toBeGreaterThanOrEqual(7);
        const paragraphs = textOf(post).filter(Boolean);
        expect(new Set(paragraphs).size).toBe(paragraphs.length);
        expect(body).not.toMatch(/lorem|ipsum|TODO|\[.*\]/i);
        expect(post.blocks.some((b) => b.type === 'takeaways')).toBe(true);
        expect(en[`blog.${post.slug}.imageAlt`].length).toBeGreaterThan(20);
      });

      it('has a heading order without gaps and a question-style FAQ', () => {
        const first = post.blocks.find((b) => b.type !== 'p' && b.type !== 'takeaways');
        expect(first?.type).toBe('h2');
        const faq = post.blocks.find((b) => b.type === 'faq');
        expect(faq && faq.type === 'faq' && faq.items >= 3).toBe(true);
        if (faq && faq.type === 'faq') for (let n = 1; n <= faq.items; n++) expect(en[`blog.${post.slug}.faq.${n}.q`].endsWith('?'), `faq ${n}`).toBe(true);
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
        // Roughly three links per thousand words, counting the links inside the text only.
        expect(toolLinks).toBeGreaterThanOrEqual(5);
        expect(guideLinks).toBeGreaterThanOrEqual(2);
        for (const slug of post.tools) expect(getTool(slug), slug).toBeDefined();
        expect(post.tools).toContain(post.tool);
      });

      it('has a featured image (1200x630 JPEG and a small WebP) on disk', () => {
        expect(existsSync(`public${postImage(post.slug)}`), postImage(post.slug)).toBe(true);
        expect(existsSync(`public${postThumb(post.slug)}`), postThumb(post.slug)).toBe(true);
      });

      it('has Article, FAQ and breadcrumb structured data with image, author and dates', () => {
        const meta = getPageMeta(postPath(post.slug));
        expect(meta).not.toBeNull();
        expect(meta!.image).toBe(postImage(post.slug));
        expect(meta!.ogType).toBe('article');
        expect(meta!.englishOnly).toBe(true);
        expect(meta!.noindex).toBeFalsy();
        const blocks = meta!.jsonLd as { '@type': string; mainEntity?: { name: string }[]; headline?: string; datePublished?: string; dateModified?: string; image?: string[]; author?: { '@type': string; name: string; sameAs?: string[] } }[];
        const article = blocks.find((b) => b['@type'] === 'BlogPosting');
        expect(article?.headline).toBe(en[`blog.${post.slug}.title`]);
        expect(article?.datePublished).toBe(post.published);
        expect(article?.dateModified).toBe(post.updated);
        expect(article?.image?.[0]).toContain(postImage(post.slug));
        expect(article?.author?.['@type']).toBe('Person');
        expect(article?.author?.name).toBe('Ubaid Ullah');
        const faq = blocks.find((b) => b['@type'] === 'FAQPage');
        const faqBlock = post.blocks.find((b) => b.type === 'faq');
        const count = faqBlock && faqBlock.type === 'faq' ? faqBlock.items : 0;
        expect(faq?.mainEntity?.map((q) => q.name)).toEqual(Array.from({ length: count }, (_, i) => en[`blog.${post.slug}.faq.${i + 1}.q`]));
        expect(blocks.find((b) => b['@type'] === 'BreadcrumbList')).toBeDefined();
      });
    });
  }

  it('keeps articles English only: other languages are noindex and have no language alternates', () => {
    const post = posts[0];
    const de = makeLocalizer('de', {}, {});
    const meta = getPageMeta(postPath(post.slug), de);
    expect(meta?.noindex).toBe(true);
    expect(meta?.englishOnly).toBe(true);
    expect(alternatesFor(postPath(post.slug), true)).toEqual([]);
    expect(alternatesFor(postPath(post.slug)).length).toBeGreaterThan(20);
  });

  it('links every article from at least one other article (no orphans) and suggests related guides', () => {
    const linked = new Set<string>();
    for (const p of posts) for (const text of textOf(p)) for (const m of text.matchAll(TAG)) if (m[1].startsWith('post_')) linked.add(m[1].slice(5));
    for (const p of posts) expect(linked.has(p.slug), `${p.slug} has no inbound link from another article`).toBe(true);
    for (const p of posts) {
      const related = relatedPosts(p);
      expect(related).toHaveLength(3);
      expect(related.map((r) => r.slug)).not.toContain(p.slug);
    }
  });

  it('lists the blog and every article for prerendering and the sitemap', () => {
    const paths = allPaths();
    expect(paths).toContain('/blog');
    for (const p of posts) expect(paths).toContain(postPath(p.slug));
    expect(getPageMeta('/blog/not-a-post')).toBeNull();
  });
});
