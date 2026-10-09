import { absoluteUrl, site } from '@/config/site';
import type { PageMeta } from '@/components/Seo';
import { allHelpItems } from '@/pages/helpData';
import { categories, categoryPath, getCategory, getTool, toolPath, toolTitle, tools } from '@/tools/registry';
import type { Category, FaqItem, ToolDef } from '@/tools/types';
import { getPost, postPath, posts } from '@/blog/posts';
import { en } from '@/i18n/en';

export interface Crumb {
  name: string;
  path: string;
}

interface StaticPage {
  title: string;
  description: string;
  name: string;
}

export const staticPages: Record<string, StaticPage> = {
  '/': {
    name: 'Home',
    title: `${site.name} – Free Online Image, PDF, Text & Developer Tools`,
    description:
      'Convert and compress images, merge and split PDFs, format JSON and clean text. Fast, free tools that run in your browser, with no sign-up.',
  },
  '/tools': {
    name: 'All tools',
    title: `All Online Tools – Image, PDF, Text & Developer | ${site.name}`,
    description: 'Browse every tool: image converters and editors, PDF utilities, text tools and developer utilities. All free and browser-based.',
  },
  '/blog': {
    name: 'Blog',
    title: `Blog – Guides for PDFs and Images | ${site.name}`,
    description: `Practical guides to compressing PDFs, converting images to PDF and making scanned documents searchable, written around the free tools on ${site.name}.`,
  },
  '/about': {
    name: 'About',
    title: `About ${site.name} – Browser-Based Everyday Tools`,
    description: `Why ${site.name} exists, how the tools work in your browser, and what we do and do not do with your files.`,
  },
  '/contact': {
    name: 'Contact',
    title: `Contact ${site.name} – Support and Feedback`,
    description: `Contact ${site.name}: report a bug, suggest a new tool or ask a question about how the tools work.`,
  },
  '/help': {
    name: 'Help & FAQ',
    title: `Help & FAQ – How ${site.name} Works | ${site.name}`,
    description: 'Answers about using the tools, privacy and your files, PDF signing, redaction, OCR, compression, passwords and languages.',
  },
  '/privacy': {
    name: 'Privacy Policy',
    title: `Privacy Policy | ${site.name}`,
    description: `How ${site.name} handles your files, data and cookies. Most tools process files locally in your browser.`,
  },
  '/terms': {
    name: 'Terms & Conditions',
    title: `Terms & Conditions | ${site.name}`,
    description: `The terms that apply when you use the ${site.name} website and its browser-based tools, including acceptable use and disclaimers.`,
  },
  '/cookies': {
    name: 'Cookie Information',
    title: `Cookie & Local Storage Information | ${site.name}`,
    description: `What cookies and browser storage ${site.name} uses, and how that changes if advertising is enabled.`,
  },
};

/**
 * Supplies the text for a page's metadata in one language. The default is English; the client builds a
 * localizer from the selected language (see src/i18n/usePageMeta.ts) so titles, descriptions and structured
 * data match the language the page is shown in.
 */
export interface Localizer {
  staticPage: (path: string, page: StaticPage) => StaticPage;
  category: (c: Category) => Category;
  tool: (t: ToolDef) => ToolDef;
  crumbs: { home: string; tools: string };
  /** Language code for structured data (`inLanguage`). */
  lang: string;
  help: FaqItem[];
  /** Text of a blog article in this language. */
  post: (slug: string, key: string) => string;
  notFound: Pick<PageMeta, 'title' | 'description'>;
}

export const englishLocalizer: Localizer = {
  staticPage: (_path, page) => page,
  category: (c) => c,
  tool: (t) => t,
  crumbs: { home: 'Home', tools: 'Tools' },
  lang: 'en',
  help: allHelpItems,
  post: (slug, key) => en[`blog.${slug}.${key}`] ?? '',
  notFound: { title: `Page not found | ${site.name}`, description: 'The page you are looking for does not exist.' },
};

export function breadcrumbsFor(path: string, l: Localizer = englishLocalizer): Crumb[] {
  const home: Crumb = { name: l.crumbs.home, path: '/' };
  if (path === '/') return [home];
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'blog') {
    const crumbs: Crumb[] = [home, { name: l.staticPage('/blog', staticPages['/blog']).name, path: '/blog' }];
    const post = parts[1] ? getPost(parts[1]) : undefined;
    if (post) crumbs.push({ name: l.post(post.slug, 'title'), path: postPath(post.slug) });
    return crumbs;
  }
  if (parts[0] === 'tools') {
    const crumbs = [home, { name: l.crumbs.tools, path: '/tools' }];
    if (parts[1]) {
      const cat = getCategory(parts[1]);
      if (cat) crumbs.push({ name: l.category(cat).name, path: categoryPath(cat.id) });
      const tool = parts[2] ? getTool(parts[2]) : undefined;
      if (tool && tool.category === parts[1]) crumbs.push({ name: l.tool(tool).name, path: toolPath(tool) });
    }
    return crumbs;
  }
  return [home, { name: staticPages[path] ? l.staticPage(path, staticPages[path]).name : 'Page', path }];
}

const breadcrumbLd = (path: string, l: Localizer) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbsFor(path, l).map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

/** Returns null for unknown paths (rendered as the 404 page). */
export function getPageMeta(path: string, l: Localizer = englishLocalizer): PageMeta | null {
  const base = staticPages[path];
  const sp = base && l.staticPage(path, base);
  if (sp) {
    const jsonLd: object[] = [breadcrumbLd(path, l)];
    if (path === '/help') {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: l.help.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      });
    }
    if (path === '/') {
      jsonLd.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: absoluteUrl('/'), description: site.tagline });
    }
    return { title: sp.title, description: sp.description, path, jsonLd };
  }

  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'blog' && parts.length === 2) return postMeta(path, parts[1], l);
  if (parts[0] !== 'tools') return null;
  const source = parts[1] ? getCategory(parts[1]) : undefined;
  if (!source) return null;
  const cat = l.category(source);
  if (parts.length === 2) {
    return {
      title: cat.metaTitle,
      description: cat.metaDescription,
      path,
      jsonLd: [breadcrumbLd(path, l)],
    };
  }
  const raw = parts.length === 3 ? getTool(parts[2]) : undefined;
  if (!raw || raw.category !== cat.id) return null;
  const tool = l.tool(raw);
  return {
    title: toolTitle(tool),
    description: tool.metaDescription ?? tool.description,
    path,
    jsonLd: [
      breadcrumbLd(path, l),
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        url: absoluteUrl(path),
        description: tool.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (modern web browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
}

/** Metadata and structured data of a blog article: BlogPosting, its FAQ and breadcrumbs. */
function postMeta(path: string, slug: string, l: Localizer): PageMeta | null {
  const post = getPost(slug);
  if (!post) return null;
  const url = absoluteUrl(path);
  const title = l.post(slug, 'title');
  const description = l.post(slug, 'description');
  const faqBlock = post.blocks.find((b) => b.type === 'faq');
  const jsonLd: object[] = [
    breadcrumbLd(path, l),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      datePublished: post.published,
      dateModified: post.updated,
      inLanguage: l.lang,
      author: { '@type': 'Organization', name: site.name, url: absoluteUrl('/') },
      publisher: { '@type': 'Organization', name: site.name, url: absoluteUrl('/') },
    },
  ];
  if (faqBlock && faqBlock.type === 'faq') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: Array.from({ length: faqBlock.items }, (_, i) => ({
        '@type': 'Question',
        name: l.post(slug, `${faqBlock.id}.${i + 1}.q`),
        acceptedAnswer: { '@type': 'Answer', text: l.post(slug, `${faqBlock.id}.${i + 1}.a`) },
      })),
    });
  }
  return { title: `${title} | ${site.name}`, description, path, jsonLd };
}

export const NOT_FOUND_META: PageMeta = {
  title: `Page not found | ${site.name}`,
  description: 'The page you are looking for does not exist.',
  path: '/404',
  noindex: true,
};

export function allPaths(): string[] {
  return [
    ...Object.keys(staticPages),
    ...posts.map((p) => postPath(p.slug)),
    ...categories.map((c) => categoryPath(c.id)),
    ...tools.map(toolPath),
  ];
}
