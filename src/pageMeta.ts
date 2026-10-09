import { absoluteUrl, site } from '@/config/site';
import type { PageMeta } from '@/components/Seo';
import { allHelpItems } from '@/pages/helpData';
import { categories, categoryPath, getCategory, getTool, toolPath, toolTitle, tools } from '@/tools/registry';

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

export function breadcrumbsFor(path: string): Crumb[] {
  const home: Crumb = { name: 'Home', path: '/' };
  if (path === '/') return [home];
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'tools') {
    const crumbs = [home, { name: 'Tools', path: '/tools' }];
    if (parts[1]) {
      const cat = getCategory(parts[1]);
      if (cat) crumbs.push({ name: cat.name, path: categoryPath(cat.id) });
      const tool = parts[2] ? getTool(parts[2]) : undefined;
      if (tool && tool.category === parts[1]) crumbs.push({ name: tool.name, path: toolPath(tool) });
    }
    return crumbs;
  }
  return [home, { name: staticPages[path]?.name ?? 'Page', path }];
}

const breadcrumbLd = (path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbsFor(path).map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

/** Returns null for unknown paths (rendered as the 404 page). */
export function getPageMeta(path: string): PageMeta | null {
  const sp = staticPages[path];
  if (sp) {
    const jsonLd: object[] = [breadcrumbLd(path)];
    if (path === '/help') {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allHelpItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      });
    }
    if (path === '/') {
      jsonLd.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: absoluteUrl('/'), description: site.tagline });
    }
    return { title: sp.title, description: sp.description, path, jsonLd };
  }

  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'tools') return null;
  const cat = parts[1] ? getCategory(parts[1]) : undefined;
  if (!cat) return null;
  if (parts.length === 2) {
    return {
      title: cat.metaTitle,
      description: cat.metaDescription,
      path,
      jsonLd: [breadcrumbLd(path)],
    };
  }
  const tool = parts.length === 3 ? getTool(parts[2]) : undefined;
  if (!tool || tool.category !== cat.id) return null;
  return {
    title: toolTitle(tool),
    description: tool.metaDescription ?? tool.description,
    path,
    jsonLd: [
      breadcrumbLd(path),
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

export const NOT_FOUND_META: PageMeta = {
  title: `Page not found | ${site.name}`,
  description: 'The page you are looking for does not exist.',
  path: '/404',
  noindex: true,
};

export function allPaths(): string[] {
  return [
    ...Object.keys(staticPages),
    ...categories.map((c) => categoryPath(c.id)),
    ...tools.map(toolPath),
  ];
}
