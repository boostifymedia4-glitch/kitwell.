/**
 * Build step: renders every route in every language to static HTML (title, meta, canonical, hreflang, JSON-LD and
 * body content) so crawlers and first paint get real content. The client then hydrates the page.
 * English lives at plain paths and every other language under /<code>/.
 *
 * Also writes sitemap.xml (with hreflang alternates), robots.txt, 404.html and routes.json (used by the server).
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, allPaths, siteUrl, siteName, languageCodes } = await import(ssrEntry);
const template = await readFile(join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\u003c');
const exists = (p) => access(p).then(() => true, () => false);

const hasOgImage = await exists(join(dist, 'og-image.png'));
const prefix = (code, path) => (code === 'en' ? path : path === '/' ? `/${code}` : `/${code}${path}`);

function headTags(r, found) {
  const { meta } = r;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${found && !meta.noindex ? 'index,follow' : 'noindex,follow'}" />`,
    found ? `<link rel="canonical" href="${esc(r.canonical)}" />` : '',
    ...(found ? r.alternates.map((a) => `<link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`) : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(siteName)}" />`,
    `<meta property="og:locale" content="${esc(r.ogLocale)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    found ? `<meta property="og:url" content="${esc(r.canonical)}" />` : '',
    hasOgImage ? `<meta property="og:image" content="${esc(siteUrl)}/og-image.png" />` : '',
    `<meta name="twitter:card" content="${hasOgImage ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    ...(meta.jsonLd ?? []).map((b) => `<script type="application/ld+json" data-seo>${jsonLd(b)}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}

function page(r, found) {
  return template
    .replace('<html lang="en">', `<html lang="${esc(r.htmlLang)}" dir="${r.dir}">`)
    .replace('<!--head-->', headTags(r, found))
    .replace(/<div id="root"><!--app--><\/div>/, found ? `<div id="root" data-prerendered>${r.html}</div>` : `<div id="root">${r.html}</div>`);
}

const routes = [];
const paths = allPaths();
for (const code of languageCodes) {
  for (const path of paths) {
    const url = prefix(code, path);
    const r = await render(url);
    if (!r.found) throw new Error(`Route ${url} rendered as not found`);
    const file = url === '/' ? join(dist, 'index.html') : join(dist, url, 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page(r, true));
    routes.push(url);
  }
}

// 404 page (served by the server with a real 404 status); English.
const nf = await render('/__not-found__');
await writeFile(join(dist, '404.html'), page(nf, false));

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p.split('/').length === 3 ? '0.8' : p.startsWith('/tools/') || p.startsWith('/blog') ? '0.7' : '0.4');
const abs = (url) => `${siteUrl}${url === '/' ? '' : url}`;
const entries = [];
for (const code of languageCodes) {
  for (const path of paths) {
    const url = prefix(code, path);
    const links = languageCodes.map((c) => ({ c, href: abs(prefix(c, path)) }));
    entries.push({ url, path, links });
  }
}
const tagOf = (c) => (c === 'zh' ? 'zh-CN' : c);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  entries
    .map(
      (e) =>
        `  <url><loc>${esc(abs(e.url))}</loc><lastmod>${today}</lastmod><priority>${priority(e.path)}</priority>\n` +
        e.links.map((l) => `    <xhtml:link rel="alternate" hreflang="${tagOf(l.c)}" href="${esc(l.href)}" />`).join('\n') +
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(prefix('en', e.path)))}" />\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(join(dist, 'routes.json'), JSON.stringify(routes));

console.log(`Prerendered ${routes.length} routes (${languageCodes.length} languages) + 404, sitemap.xml, robots.txt (site URL: ${siteUrl})`);
if (siteUrl.includes('example.com')) {
  console.warn('WARNING: SITE_URL is not set, so canonical URLs and the sitemap use the example.com placeholder. Set SITE_URL before deploying.');
}
