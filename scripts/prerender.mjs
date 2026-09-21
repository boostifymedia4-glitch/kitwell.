/**
 * Build step: renders every route to static HTML (title, meta, canonical, JSON-LD and body content)
 * so crawlers and first paint get real content. The client then hydrates the page.
 *
 * Also writes sitemap.xml, robots.txt, 404.html and routes.json (used by the server).
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, allPaths, siteUrl, siteName } = await import(ssrEntry);
const template = await readFile(join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');
const exists = (p) => access(p).then(() => true, () => false);

const hasOgImage = await exists(join(dist, 'og-image.png'));
const abs = (path) => `${siteUrl}${path === '/' ? '' : path}`;

function headTags(meta, found) {
  const url = abs(meta.path);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${found && !meta.noindex ? 'index,follow' : 'noindex,follow'}" />`,
    found ? `<link rel="canonical" href="${esc(url)}" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(siteName)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    hasOgImage ? `<meta property="og:image" content="${esc(siteUrl)}/og-image.png" />` : '',
    `<meta name="twitter:card" content="${hasOgImage ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    ...(meta.jsonLd ?? []).map((b) => `<script type="application/ld+json" data-seo>${jsonLd(b)}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}

function page(html, meta, found) {
  return template
    .replace('<!--head-->', headTags(meta, found))
    .replace(/<div id="root"><!--app--><\/div>/, `<div id="root" data-prerendered>${html}</div>`);
}

const routes = [];
for (const path of allPaths()) {
  const { html, meta, found } = await render(path);
  if (!found) throw new Error(`Route ${path} rendered as not found`);
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(html, meta, true));
  routes.push(path);
}

// 404 page (served by the server with a real 404 status).
const nf = await render('/__not-found__');
await writeFile(join(dist, '404.html'), page(nf.html, nf.meta, false));

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p.split('/').length === 3 ? '0.8' : p.startsWith('/tools/') ? '0.7' : '0.4');
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((p) => `  <url><loc>${esc(abs(p))}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`).join('\n') +
  `\n</urlset>\n`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(join(dist, 'routes.json'), JSON.stringify(routes));

console.log(`Prerendered ${routes.length} routes + 404, sitemap.xml, robots.txt (site URL: ${siteUrl})`);
if (siteUrl.includes('example.com')) {
  console.warn('WARNING: SITE_URL is not set, so canonical URLs and the sitemap use the example.com placeholder. Set SITE_URL before deploying.');
}
