export interface Language {
  /** URL prefix and file name in ./locales (the established code, e.g. zh). */
  code: string;
  /** BCP 47 tag for <html lang> and hreflang when it differs from the code (zh is zh-CN). */
  tag?: string;
  /** The language's own name, shown in the picker. */
  name: string;
  english: string;
  /** Country or region the language is most associated with, shown under the name in the picker. */
  region: string;
  dir: 'ltr' | 'rtl';
  /** 'full' only when every key in ./en.ts is translated (checked by tests/i18n.test.ts). */
  coverage: 'full' | 'partial';
}

/** Add a language by adding it here, creating ./locales/<code>.ts and registering it in ./loaders.ts. */
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', english: 'English', region: 'United States', dir: 'ltr', coverage: 'full' },
  { code: 'ur', name: 'اردو', english: 'Urdu', region: 'Pakistan', dir: 'rtl', coverage: 'full' },
  { code: 'ar', name: 'العربية', english: 'Arabic', region: 'Saudi Arabia', dir: 'rtl', coverage: 'full' },
  { code: 'es', name: 'Español', english: 'Spanish', region: 'Spain', dir: 'ltr', coverage: 'full' },
  { code: 'fr', name: 'Français', english: 'French', region: 'France', dir: 'ltr', coverage: 'full' },
  { code: 'de', name: 'Deutsch', english: 'German', region: 'Germany', dir: 'ltr', coverage: 'full' },
  { code: 'pt', name: 'Português', english: 'Portuguese', region: 'Portugal', dir: 'ltr', coverage: 'full' },
  { code: 'it', name: 'Italiano', english: 'Italian', region: 'Italy', dir: 'ltr', coverage: 'full' },
  { code: 'tr', name: 'Türkçe', english: 'Turkish', region: 'Turkey', dir: 'ltr', coverage: 'full' },
  { code: 'zh', tag: 'zh-CN', name: '中文（简体）', english: 'Chinese', region: 'China', dir: 'ltr', coverage: 'full' },
  { code: 'ja', name: '日本語', english: 'Japanese', region: 'Japan', dir: 'ltr', coverage: 'full' },
  { code: 'ko', name: '한국어', english: 'Korean', region: 'South Korea', dir: 'ltr', coverage: 'full' },
  { code: 'hi', name: 'हिन्दी', english: 'Hindi', region: 'India', dir: 'ltr', coverage: 'full' },
  { code: 'id', name: 'Bahasa Indonesia', english: 'Indonesian', region: 'Indonesia', dir: 'ltr', coverage: 'full' },
  { code: 'bn', name: 'বাংলা', english: 'Bengali', region: 'Bangladesh', dir: 'ltr', coverage: 'full' },
  { code: 'ru', name: 'Русский', english: 'Russian', region: 'Russia', dir: 'ltr', coverage: 'full' },
  { code: 'nl', name: 'Nederlands', english: 'Dutch', region: 'Netherlands', dir: 'ltr', coverage: 'full' },

  { code: 'vi', name: 'Tiếng Việt', english: 'Vietnamese', region: 'Vietnam', dir: 'ltr', coverage: 'full' },
  { code: 'pl', name: 'Polski', english: 'Polish', region: 'Poland', dir: 'ltr', coverage: 'full' },
  { code: 'fa', name: 'فارسی', english: 'Persian', region: 'Iran', dir: 'rtl', coverage: 'full' },
  { code: 'th', name: 'ไทย', english: 'Thai', region: 'Thailand', dir: 'ltr', coverage: 'full' },
  { code: 'uk', name: 'Українська', english: 'Ukrainian', region: 'Ukraine', dir: 'ltr', coverage: 'full' },
  { code: 'ro', name: 'Română', english: 'Romanian', region: 'Romania', dir: 'ltr', coverage: 'full' },
  { code: 'el', name: 'Ελληνικά', english: 'Greek', region: 'Greece', dir: 'ltr', coverage: 'full' },
  { code: 'cs', name: 'Čeština', english: 'Czech', region: 'Czechia', dir: 'ltr', coverage: 'full' },
];

export const DEFAULT_LANGUAGE = 'en';
/** The BCP 47 tag of a language, for <html lang> and hreflang. */
export const langTag = (l: Language): string => l.tag ?? l.code;
export const getLanguage = (code: string): Language | undefined => LANGUAGES.find((l) => l.code === code);
