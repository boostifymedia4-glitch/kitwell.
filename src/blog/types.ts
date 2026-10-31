/**
 * Structure of the blog articles. The words are in the English catalog (src/i18n/en/blogArticles.ts, generated from
 * content/blog/*.md by scripts/build-blog.mjs) under `blog.<slug>.<block id>`; the post list only says which blocks an
 * article has and in which order.
 */
export type Block =
  | { type: 'h2' | 'h3' | 'p' | 'note'; id: string }
  | { type: 'ul' | 'ol' | 'takeaways'; id: string; items: number }
  | { type: 'faq'; id: string; items: number };

export interface BlogPost {
  slug: string;
  /** ISO date of publication. */
  published: string;
  /** Exact moment of publication for scheduled articles (ISO with offset); `published` is its date part. */
  publishAt?: string;
  /** ISO date of the last substantive change. */
  updated: string;
  /** Reading time in minutes, computed from the article text. */
  minutes: number;
  /** Tool shown first in "Tools used in this guide". */
  tool: string;
  tools: string[];
  blocks: Block[];
}
