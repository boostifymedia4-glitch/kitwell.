/**
 * Structure of the blog articles. The words are in the translation catalog (src/i18n/en/blog.ts) under
 * `blog.<slug>.<block id>`; this file only says which blocks an article has and in which order.
 */
export type Block =
  | { type: 'h2' | 'p' | 'note'; id: string }
  | { type: 'ul' | 'ol'; id: string; items: number }
  | { type: 'faq'; id: string; items: number };

export interface BlogPost {
  slug: string;
  /** ISO date of publication. */
  published: string;
  /** ISO date of the last substantive change. */
  updated: string;
  minutes: number;
  /** Tool shown first in "Tools used in this guide". */
  tool: string;
  tools: string[];
  blocks: Block[];
}

const section = (n: number, parts: Block[]): Block[] => [{ type: 'h2', id: `s${n}.h` }, ...parts];

export const posts: BlogPost[] = [
  {
    slug: 'compress-pdf-without-losing-quality',
    published: '2026-10-09',
    updated: '2026-10-09',
    minutes: 6,
    tool: 'compress-pdf',
    tools: ['compress-pdf', 'split-pdf', 'merge-pdf', 'image-compressor', 'images-to-pdf', 'ocr-pdf'],
    blocks: [
      { type: 'p', id: 'intro.1' },
      { type: 'p', id: 'intro.2' },
      ...section(1, [{ type: 'p', id: 's1.p1' }, { type: 'p', id: 's1.p2' }]),
      ...section(2, [{ type: 'ul', id: 's2.l', items: 3 }]),
      ...section(3, [{ type: 'p', id: 's3.p1' }, { type: 'ol', id: 's3.o', items: 4 }, { type: 'p', id: 's3.p2' }]),
      ...section(4, [{ type: 'p', id: 's4.p1' }, { type: 'note', id: 's4.n' }]),
      ...section(5, [{ type: 'p', id: 's5.p1' }, { type: 'ul', id: 's5.l', items: 3 }, { type: 'p', id: 's5.p2' }]),
      ...section(6, [{ type: 'ul', id: 's6.l', items: 4 }]),
      ...section(7, [{ type: 'p', id: 's7.p1' }]),
      ...section(8, [{ type: 'ol', id: 's8.o', items: 5 }]),
      { type: 'faq', id: 'faq', items: 3 },
      { type: 'h2', id: 'cta.h' },
      { type: 'p', id: 'cta.p' },
    ],
  },
  {
    slug: 'convert-images-to-pdf',
    published: '2026-10-09',
    updated: '2026-10-09',
    minutes: 6,
    tool: 'images-to-pdf',
    tools: ['images-to-pdf', 'jpg-to-pdf', 'png-to-pdf', 'image-compressor', 'image-resizer', 'compress-pdf', 'merge-pdf', 'split-pdf', 'pdf-to-jpg'],
    blocks: [
      { type: 'p', id: 'intro.1' },
      { type: 'p', id: 'intro.2' },
      ...section(1, [{ type: 'p', id: 's1.p1' }, { type: 'ul', id: 's1.l', items: 3 }]),
      ...section(2, [{ type: 'ol', id: 's2.o', items: 5 }]),
      ...section(3, [{ type: 'p', id: 's3.p1' }, { type: 'p', id: 's3.p2' }]),
      ...section(4, [{ type: 'p', id: 's4.p1' }, { type: 'note', id: 's4.n' }]),
      ...section(5, [{ type: 'p', id: 's5.p1' }]),
      ...section(6, [{ type: 'ul', id: 's6.l', items: 3 }]),
      ...section(7, [{ type: 'ul', id: 's7.l', items: 3 }]),
      { type: 'faq', id: 'faq', items: 3 },
      { type: 'h2', id: 'cta.h' },
      { type: 'p', id: 'cta.p' },
    ],
  },
  {
    slug: 'ocr-scanned-pdf-searchable',
    published: '2026-10-09',
    updated: '2026-10-09',
    minutes: 7,
    tool: 'ocr-pdf',
    tools: ['ocr-pdf', 'extract-pdf-text', 'images-to-pdf', 'compress-pdf', 'compare-pdf', 'redact-pdf'],
    blocks: [
      { type: 'p', id: 'intro.1' },
      { type: 'p', id: 'intro.2' },
      ...section(1, [{ type: 'p', id: 's1.p1' }, { type: 'p', id: 's1.p2' }]),
      ...section(2, [{ type: 'p', id: 's2.p1' }, { type: 'p', id: 's2.p2' }]),
      ...section(3, [{ type: 'ol', id: 's3.o', items: 5 }]),
      ...section(4, [{ type: 'ul', id: 's4.l', items: 3 }]),
      ...section(5, [{ type: 'p', id: 's5.p1' }, { type: 'ul', id: 's5.l', items: 5 }, { type: 'note', id: 's5.n' }]),
      ...section(6, [{ type: 'ul', id: 's6.l', items: 3 }]),
      { type: 'faq', id: 'faq', items: 3 },
      { type: 'h2', id: 'cta.h' },
      { type: 'p', id: 'cta.p' },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postPath = (slug: string) => `/blog/${slug}`;

/** Keys of every piece of text an article uses, in reading order. Used by tests and the translation audit. */
export function postKeys(post: BlogPost): string[] {
  const base = `blog.${post.slug}`;
  const keys = [`${base}.title`, `${base}.description`, `${base}.excerpt`];
  for (const b of post.blocks) {
    if (b.type === 'ul' || b.type === 'ol') for (let n = 1; n <= b.items; n++) keys.push(`${base}.${b.id}.${n}`);
    else if (b.type === 'faq') {
      keys.push(`${base}.${b.id}.h`);
      for (let n = 1; n <= b.items; n++) keys.push(`${base}.${b.id}.${n}.q`, `${base}.${b.id}.${n}.a`);
    } else keys.push(`${base}.${b.id}`);
  }
  return keys;
}
