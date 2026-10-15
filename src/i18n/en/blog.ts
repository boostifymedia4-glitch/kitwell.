/**
 * Blog: listing page chrome and the three launch articles. Article keys follow `blog.<slug>.<block id>`
 * (lists: `.<n>`, questions: `.<n>.q` / `.<n>.a`); the order and type of the blocks is in src/blog/posts.ts.
 * `<tool_xxx>text</tool_xxx>` becomes a link to that tool (hyphens written as underscores), `<post_xxx>` to
 * another article and `<all_xxx>` to a category. Keep the tags and translate the words inside them.
 */
export const blog = {
  // Blog index and shared article chrome
  'blog.authorBio': '{author} is the founder of {site}, a one-person project that offers online tools for PDFs, images, text and developers.',
  'blog.aboutAuthor': 'About the author',
  'blog.title': 'Blog',
  'blog.lead': 'Practical guides for PDFs, images, text and developer tasks, written around the tools on {site}.',
  'blog.byAuthor': 'By {author}',
  'blog.takeaways': 'Key takeaways',
  'blog.relatedGuides': 'Related guides',
  'blog.readMore': 'Read the guide',
  'blog.minutes': '{count} min read',
  'blog.published': 'Published {date}',
  'blog.updated': 'Updated {date}',
  'blog.by': 'By {site}',
  'blog.contents': 'In this guide',
  'blog.relatedTools': 'Tools used in this guide',
  'blog.moreGuides': 'More guides',
  'blog.backToBlog': 'All guides',
  'blog.englishOnly': 'This guide is available in English only.',
  'blog.openTool': 'Open {name}',
  'blog.empty': 'No guides yet.',



} as Record<string, string>;
