import { articles } from './articles';
import type { Block, BlogCategory, BlogPost } from './types';

export type { Block, BlogCategory, BlogPost };

const moment = (p: BlogPost) => Date.parse(p.publishAt ?? p.published);

/** Newest first (by the exact time for scheduled articles); articles with the same moment keep the order of the content folder. */
export const posts: BlogPost[] = [...articles].sort((a, b) => moment(b) - moment(a));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postPath = (slug: string) => `/blog/${slug}`;

/**
 * Guides for a tool page: first the guides written about that tool, then guides that use it, newest first. The relationship
 * comes only from each article's `tool` and `tools` lines, so a new article appears under the right tools by itself.
 */
export function guidesForTool(slug: string, limit = 3): BlogPost[] {
  const own = posts.filter((p) => p.tool === slug);
  const using = posts.filter((p) => p.tool !== slug && p.tools.includes(slug));
  return [...own, ...using].slice(0, limit);
}

/** Address of the featured image (1200x630 JPEG, used for the article header, Open Graph and structured data) and its small WebP. */
export const postImage = (slug: string) => `/images/blog/${slug}.jpg`;
export const postThumb = (slug: string) => `/images/blog/${slug}-640.webp`;
export const POST_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const POST_THUMB_SIZE = { width: 640, height: 336 } as const;

/** Guides that share the most tools with this one first, then the newest; never the article itself. */
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const own = new Set(post.tools);
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, shared: p.tools.filter((t) => own.has(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.p.published.localeCompare(a.p.published))
    .slice(0, limit)
    .map((x) => x.p);
}

/** Keys of every piece of text an article uses, in reading order. Used by tests and the translation audit. */
export function postKeys(post: BlogPost): string[] {
  const base = `blog.${post.slug}`;
  const keys = [`${base}.title`, `${base}.description`, `${base}.excerpt`, `${base}.imageAlt`];
  for (const b of post.blocks) {
    if (b.type === 'ul' || b.type === 'ol' || b.type === 'takeaways') for (let n = 1; n <= b.items; n++) keys.push(`${base}.${b.id}.${n}`);
    else if (b.type === 'faq') {
      keys.push(`${base}.${b.id}.h`);
      for (let n = 1; n <= b.items; n++) keys.push(`${base}.${b.id}.${n}.q`, `${base}.${b.id}.${n}.a`);
    } else keys.push(`${base}.${b.id}`);
  }
  return keys;
}
