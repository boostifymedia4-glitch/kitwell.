/**
 * English source strings for the site shell (header, menus, search, homepage, footer, language picker).
 * Other languages live in ./locales/<code>.ts and may translate any subset: missing keys fall back to English.
 * Placeholders use {name}. Tool pages and tool names are not part of this file yet (see README, "Languages").
 */
export const en = {
  'skip': 'Skip to content',
  'brand.home': '{site} home',

  'nav.image': 'Image',
  'nav.pdf': 'PDF',
  'nav.text': 'Text',
  'nav.developer': 'Developer',
  'nav.allTools': 'All tools',
  'nav.about': 'About',
  'nav.primary': 'Primary',
  'nav.mobile': 'Mobile',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',

  'cat.image': 'Image Tools',
  'cat.pdf': 'PDF Tools',
  'cat.text': 'Text Tools',
  'cat.developer': 'Developer Tools',

  'mega.viewAll': 'View all {count} tools',
  'mega.foot': '{count} free tools. Files stay in your browser.',
  'mega.browse': 'Browse all tools',

  'search.label': 'Search tools',
  'search.placeholder': 'Search tools',
  'search.hero': 'Search tools, e.g. “compress image” or “merge pdf”',
  'search.none': 'No tools match “{query}”. Try a format or task, like “png” or “json”.',
  'search.found': '{count} tools found',

  'home.title': 'Everyday tools for files, PDFs, text and code',
  'home.lead': 'Free browser-based tools for everyday file, PDF, text and developer tasks. {count} tools, no sign-up, nothing to install.',
  'home.popular': 'Popular tools',
  'home.popularSub': 'The tools people reach for most.',
  'home.allTools': 'All {count} tools',
  'home.viewAll': 'View all {count}',
  'home.privacyTitle': 'Built around your privacy',
  'home.privacySub': 'Most online converters upload your files. These don’t need to.',
  'home.trust1Title': 'Processed in your browser',
  'home.trust1Text': 'Files are opened, converted and saved by your own browser. Our tools do not upload them to a server.',
  'home.trust2Title': 'No account, no watermark',
  'home.trust2Text': 'Use any tool immediately. There is nothing to sign up for and nothing is added to your output.',
  'home.trust3Title': 'Honest about limits',
  'home.trust3Text': 'Every tool page lists the formats and sizes it supports, and what it cannot do, before you start.',

  'footer.tagline': 'Free tools that run in your browser. Your files are processed on your device and are not uploaded by our tools.',
  'footer.noSignup': 'No sign-up',
  'footer.local': 'Files stay on your device',
  'footer.popular': 'Popular tools',
  'footer.resources': 'Resources',
  'footer.company': 'Company',
  'footer.allTools': 'All tools',
  'footer.help': 'Help & FAQ',
  'footer.sitemap': 'Sitemap',
  'footer.about': 'About',
  'footer.contact': 'Contact',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
  'footer.cookies': 'Cookie information',
  'footer.rights': '© {year} {site}. All rights reserved.',
  'footer.seeAll': 'All {count} tools',
  'footer.language': 'Language',

  'lang.title': 'Choose your language',
  'lang.note': 'Menus, the footer and the homepage are translated. Tool pages are in English for now.',
  'lang.close': 'Close',
  'lang.change': 'Change language. Current language: {name}',
} as const;

export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;
export type PartialMessages = Partial<Messages>;
