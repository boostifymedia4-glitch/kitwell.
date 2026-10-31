/**
 * Builds the blog from content/blog/*.md:
 *   - src/blog/articles.ts           structure of every article (blocks, dates, tools, reading time)
 *   - src/i18n/en/blogArticles.ts    the English text under `blog.<slug>.<block id>`
 *
 * Usage: node scripts/build-blog.mjs   (run after editing a file in content/blog, then commit the generated files)
 *
 * Article format
 *   ---                       front matter: title, description, excerpt, imageAlt, published, updated, tool, tools (comma list),
 *   key: value                ctaHeading, cta, and the optional publishAt (see Scheduling)
 *   ---
 *   Intro paragraphs (blank-line separated)
 *   :::takeaways              optional "Key takeaways" box: one "- item" per line
 *   - item
 *   :::
 *   ## Section heading        h2 (also in the table of contents)
 *   ### Sub heading           h3
 *   A paragraph.              consecutive lines are one paragraph
 *   - bullet                  bullet list
 *   1. step                   numbered list
 *   > A note                  highlighted note
 *   :::faq Heading            FAQ block: "Q: question" then "A: answer", repeated
 *   Q: ...
 *   A: ...
 *   :::
 *
 * Inside text, <tool_merge_pdf>anchor</tool_merge_pdf> links to a tool (hyphens written as underscores),
 * <post_some-slug>anchor</post_some-slug> to another article and <all_pdf>anchor</all_pdf> to a category.
 */
/**
 * Scheduling: an article with `publishAt: 2026-11-02T18:00:00+05:00` is left out of the build until that moment, so its text
 * is not in the site, the sitemap or the JavaScript. `published` must be the date part of `publishAt`. The site is rebuilt by a
 * small GitHub workflow (.github/workflows/publish-scheduled.yml) whenever an article becomes due. Use `--all` to build every
 * article regardless of date (previews), and BLOG_NOW=<ISO time> to test what a build at that time would contain.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const dir = 'content/blog';
const includeAll = process.argv.includes('--all');
const now = process.env.BLOG_NOW ? Date.parse(process.env.BLOG_NOW) : Date.now();
if (Number.isNaN(now)) throw new Error('BLOG_NOW is not a valid date');
const files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort();
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const plain = (s) => s.replace(/<[^>]+>/g, '');
const countWords = (s) => plain(s).split(/\s+/).filter(Boolean).length;

function parse(file, source) {
  const slug = basename(file, '.md');
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  for (const k of ['title', 'description', 'excerpt', 'imageAlt', 'published', 'tool', 'tools', 'ctaHeading', 'cta']) {
    if (!meta[k]) throw new Error(`${file}: front matter "${k}" is missing`);
  }
  const text = {};
  const blocks = [];
  let section = 0;
  let counters = {};
  const idFor = (kind) => {
    const scope = section === 0 ? 'intro' : `s${section}`;
    counters[scope + kind] = (counters[scope + kind] ?? 0) + 1;
    return `${scope}.${kind}${counters[scope + kind]}`;
  };
  const lines = m[2].replace(/\r/g, '').split('\n');
  let i = 0;
  const flushPara = (buf) => {
    if (!buf.length) return;
    const body = buf.join(' ').trim();
    const scope = section === 0 ? 'intro' : `s${section}`;
    const id = section === 0 ? `intro.${(counters.introp = (counters.introp ?? 0) + 1)}` : idFor('p');
    void scope;
    blocks.push({ type: 'p', id });
    text[id] = body;
    buf.length = 0;
  };
  let para = [];
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) {
      flushPara(para);
      i++;
    } else if (line.startsWith(':::takeaways')) {
      flushPara(para);
      const items = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(':::')) {
        const li = /^-\s+(.*)$/.exec(lines[i]);
        if (li) items.push(li[1].trim());
        i++;
      }
      i++;
      blocks.push({ type: 'takeaways', id: 'sum', items: items.length });
      items.forEach((t, n) => (text[`sum.${n + 1}`] = t));
    } else if (line.startsWith(':::faq')) {
      flushPara(para);
      const heading = line.replace(':::faq', '').trim();
      const qa = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(':::')) {
        const q = /^Q:\s*(.*)$/.exec(lines[i]);
        const a = /^A:\s*(.*)$/.exec(lines[i]);
        if (q) qa.push({ q: q[1].trim(), a: '' });
        else if (a && qa.length) qa[qa.length - 1].a = a[1].trim();
        i++;
      }
      i++;
      blocks.push({ type: 'faq', id: 'faq', items: qa.length });
      text['faq.h'] = heading;
      qa.forEach((x, n) => {
        if (!x.a) throw new Error(`${file}: FAQ question without answer: ${x.q}`);
        text[`faq.${n + 1}.q`] = x.q;
        text[`faq.${n + 1}.a`] = x.a;
      });
    } else if (line.startsWith('## ')) {
      flushPara(para);
      section++;
      blocks.push({ type: 'h2', id: `s${section}.h` });
      text[`s${section}.h`] = line.slice(3).trim();
      i++;
    } else if (line.startsWith('### ')) {
      flushPara(para);
      const id = idFor('h');
      blocks.push({ type: 'h3', id });
      text[id] = line.slice(4).trim();
      i++;
    } else if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      flushPara(para);
      const ordered = /^\d+\./.test(line);
      const items = [];
      while (i < lines.length && (ordered ? /^\d+\.\s+/.test(lines[i]) : /^[-*]\s+/.test(lines[i]))) {
        items.push(lines[i].replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, '').trim());
        i++;
      }
      const id = idFor(ordered ? 'o' : 'l');
      blocks.push({ type: ordered ? 'ol' : 'ul', id, items: items.length });
      items.forEach((t, n) => (text[`${id}.${n + 1}`] = t));
    } else if (line.startsWith('> ')) {
      flushPara(para);
      const id = idFor('n');
      blocks.push({ type: 'note', id });
      text[id] = line.slice(2).trim();
      i++;
    } else {
      para.push(line.trim());
      i++;
    }
  }
  flushPara(para);
  blocks.push({ type: 'h2', id: 'cta.h' }, { type: 'p', id: 'cta.p' });
  text['cta.h'] = meta.ctaHeading;
  text['cta.p'] = meta.cta;

  if (meta.publishAt) {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?([+-]\d{2}:\d{2}|Z)$/.test(meta.publishAt) || Number.isNaN(Date.parse(meta.publishAt))) {
      throw new Error(`${file}: publishAt must look like 2026-11-02T18:00:00+05:00`);
    }
    if (meta.publishAt.slice(0, 10) !== meta.published) throw new Error(`${file}: published must be the date part of publishAt`);
  }

  const words = Object.values(text).reduce((n, t) => n + countWords(t), 0);
  const tools = meta.tools.split(',').map((s) => s.trim()).filter(Boolean);
  const post = {
    slug,
    published: meta.published,
    updated: meta.updated || meta.published,
    minutes: Math.max(3, Math.round(words / 210)),
    tool: meta.tool,
    tools,
    ...(meta.publishAt ? { publishAt: meta.publishAt } : {}),
    blocks,
  };
  const catalog = { title: meta.title, description: meta.description, excerpt: meta.excerpt, imageAlt: meta.imageAlt, ...text };
  return { post, catalog, words };
}

const posts = [];
const entries = [];
const parsed = [];
for (const f of files) {
  const item = parse(f, await readFile(join(dir, f), 'utf8'));
  if (item.post.publishAt && !includeAll && Date.parse(item.post.publishAt) > now) {
    console.log(`${item.post.slug.padEnd(48)} scheduled for ${item.post.publishAt} (left out of this build)`);
    continue;
  }
  parsed.push(item);
}
// A link to an article that is not part of this build (still scheduled) is shown as plain text; it turns into a link by itself
// in the first build that contains the article.
const included = new Set(parsed.map((x) => x.post.slug));
const unlink = (t) => t.replace(/<post_([a-z0-9-]+)>([\s\S]*?)<\/post_\1>/g, (m, slug, anchor) => (included.has(slug) ? m : anchor));
for (const { post, catalog, words } of parsed) {
  posts.push(post);
  for (const [k, v] of Object.entries(catalog)) entries.push(`  '${`blog.${post.slug}.${k}`}': '${esc(unlink(v))}',`);
  console.log(`${post.slug.padEnd(48)} ${String(words).padStart(5)} words  ${post.blocks.filter((b) => b.type === 'h2').length} h2  ${post.minutes} min`);
}

const header = '// GENERATED by scripts/build-blog.mjs from content/blog/*.md. Edit the Markdown files, not this file.\n';
await writeFile(
  'src/blog/articles.ts',
  `${header}import type { BlogPost } from './types';\n\nexport const articles: BlogPost[] = ${JSON.stringify(posts, null, 2).replace(/"([a-z]+)":/g, '$1:').replace(/"/g, "'")};\n`,
);
await writeFile('src/i18n/en/blogArticles.ts', `${header}/** Blog article text (English only; see README, Blog). */\nexport const blogArticles = {\n${entries.join('\n')}\n} as const;\n`);
console.log(`Wrote ${posts.length} articles.`);
