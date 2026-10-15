import { useEffect } from 'react';
import { absoluteUrl, site } from '@/config/site';
import { useI18n } from '@/i18n';
import { alternatesFor, canonicalFor, ogLocaleFor } from '@/seo';

export interface PageMeta {
  title: string;
  description: string;
  /** Address without the language prefix, e.g. /tools/pdf/merge-pdf. */
  path: string;
  noindex?: boolean;
  jsonLd?: object[];
  /** Address of the preview image (Open Graph and Twitter), relative to the site root. */
  image?: string;
  /** `article` for blog posts; `website` otherwise. */
  ogType?: 'website' | 'article';
  /** The page exists only in English: other languages point their canonical at the English version and are not indexed. */
  englishOnly?: boolean;
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Head tags for prerendered pages are written at build time (scripts/prerender.mjs, from the same
 * `pageMeta` function). This component keeps them in sync during client-side navigation.
 */
export function Seo({ title, description, path, noindex, jsonLd, image, ogType = 'website', englishOnly }: PageMeta) {
  const { lang } = useI18n();
  const code = lang.code;
  useEffect(() => {
    const url = canonicalFor(path, englishOnly ? 'en' : code);
    const hideFromSearch = noindex || (englishOnly && code !== 'en');
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', hideFromSearch ? 'noindex,follow' : 'index,follow');
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    if (image) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteUrl(image));
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteUrl(image));
      setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', ogLocaleFor(code));
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
    if (!hideFromSearch) {
      for (const a of alternatesFor(path, englishOnly)) {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = a.hreflang;
        link.href = a.href;
        document.head.appendChild(link);
      }
    }

    document.head.querySelectorAll('script[data-seo]').forEach((n) => n.remove());
    for (const block of jsonLd ?? []) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = '';
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [title, description, path, noindex, jsonLd, code, image, ogType, englishOnly]);
  return null;
}

export const defaultOgImage = `${site.url}${site.ogImage}`;
