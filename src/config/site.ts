/**
 * Central brand + site configuration. Change the name, colours (see styles/tokens.css)
 * and contact details here to rebrand the whole site.
 */
export const site = {
  name: 'Kitwell',
  tagline: 'Everyday file, PDF, text and developer tools that run in your browser',
  url: __SITE_URL__,
  /** Replace before launch. Shown on the Contact and legal pages. */
  contactEmail: '[CONTACT EMAIL – add before launch]',
  ogImage: '/og-image.png',
  locale: 'en_US',
  /** Flip to true once an ad network is approved and configured (see README, 'AdSense'). */
  ads: { enabled: false },
} as const;

export const absoluteUrl = (path: string) => `${site.url}${path === '/' ? '' : path}`;
