/**
 * English source strings for the site shell (header, menus, search, homepage, footer, language picker).
 * Other languages live in ./locales/<code>.ts and may translate any subset: missing keys fall back to English.
 * Placeholders use {name}. Tool pages and tool names are not part of this file yet (see README, "Languages").
 */
export const shell = {
  'skip': 'Skip to content',
  'brand.home': '{site} home',

  'nav.image': 'Image',
  'nav.pdf': 'PDF',
  'nav.text': 'Text',
  'nav.developer': 'Developer',
  'nav.allTools': 'All Tools',
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
  'mega.foot': "{count} tools for images, PDFs, text and development.",
  'mega.categories': 'Tool categories',
  'mega.browse': 'Browse all tools',

  'search.label': 'Search tools',
  'search.placeholder': 'Search tools',
  'search.hero': 'Search tools, e.g. “compress image” or “merge pdf”',
  'search.none': 'No tools match “{query}”. Try a format or task, like “png” or “json”.',
  'search.found': '{count} tools found',

  'lang.optionLabel': '{name} ({english})',
  'lang.partial': 'partial',
  'lang.partialHint': 'Only part of the site is translated into this language; the rest appears in English.',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'footer.blog': 'Blog',
  'home.title': 'Everyday tools for files, PDFs, text and code',
  'home.allTools': 'All {count} tools',
  'home.viewAll': 'View all {count}',

  'footer.description': 'Practical tools for PDFs, images, text, and developer tasks—all in one place.',
  'footer.popular': 'Popular tools',
  'footer.resources': 'Resources',
  'footer.company': 'Company',
  'footer.allTools': 'All tools',
  'footer.help': 'Help & FAQ',
  'footer.about': 'About',
  'footer.contact': 'Contact',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
  'footer.cookies': 'Cookie information',
  'footer.rights': '© {year} {site}. All rights reserved.',
  'footer.seeAll': 'All {count} tools',
  'footer.language': 'Language',

  'lang.title': 'Choose your language',
  'lang.change': 'Change language. Current language: {name}',
} as const;
