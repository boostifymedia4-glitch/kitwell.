import { useEffect } from 'react';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { alternatesFor, canonicalFor, ogLocaleFor } from '@/seo';

export interface PageMeta {
  title: string;
  description: string;
  /** Address without the language prefix, e.g. /tools/pdf/merge-pdf. */
  path: string;
  noindex?: boolean;
  jsonLd?: object[];
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
export function Seo({ title, description, path, noindex, jsonLd }: PageMeta) {
  const { lang } = useI18n();
  const code = lang.code;
  useEffect(() => {
    const url = canonicalFor(path, code);
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,follow' : 'index,follow');
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
    if (!noindex) {
      for (const a of alternatesFor(path)) {
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
  }, [title, description, path, noindex, jsonLd, code]);
  return null;
}

export const defaultOgImage = `${site.url}${site.ogImage}`;
