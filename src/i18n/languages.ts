export interface Language {
  /** BCP 47 code, also the file name in ./locales. */
  code: string;
  /** The language's own name, shown in the picker. */
  name: string;
  english: string;
  dir: 'ltr' | 'rtl';
  /** 'full' only when every key in ./en.ts is translated (checked by tests/i18n.test.ts). */
  coverage: 'full' | 'partial';
}

/** Add a language by adding it here, creating ./locales/<code>.ts and registering it in ./loaders.ts. */
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', english: 'English', dir: 'ltr', coverage: 'full' },
  { code: 'ur', name: 'اردو', english: 'Urdu', dir: 'rtl', coverage: 'full' },
  { code: 'ar', name: 'العربية', english: 'Arabic', dir: 'rtl', coverage: 'full' },
  { code: 'es', name: 'Español', english: 'Spanish', dir: 'ltr', coverage: 'full' },
  { code: 'fr', name: 'Français', english: 'French', dir: 'ltr', coverage: 'full' },
  { code: 'de', name: 'Deutsch', english: 'German', dir: 'ltr', coverage: 'full' },
  { code: 'pt', name: 'Português', english: 'Portuguese', dir: 'ltr', coverage: 'full' },
  { code: 'it', name: 'Italiano', english: 'Italian', dir: 'ltr', coverage: 'full' },
  { code: 'tr', name: 'Türkçe', english: 'Turkish', dir: 'ltr', coverage: 'full' },
  { code: 'zh', name: '中文（简体）', english: 'Chinese', dir: 'ltr', coverage: 'full' },
  { code: 'ja', name: '日本語', english: 'Japanese', dir: 'ltr', coverage: 'full' },
  { code: 'ko', name: '한국어', english: 'Korean', dir: 'ltr', coverage: 'full' },
  { code: 'hi', name: 'हिन्दी', english: 'Hindi', dir: 'ltr', coverage: 'full' },
  { code: 'id', name: 'Bahasa Indonesia', english: 'Indonesian', dir: 'ltr', coverage: 'full' },
  { code: 'bn', name: 'বাংলা', english: 'Bengali', dir: 'ltr', coverage: 'full' },
  { code: 'ru', name: 'Русский', english: 'Russian', dir: 'ltr', coverage: 'full' },
  { code: 'nl', name: 'Nederlands', english: 'Dutch', dir: 'ltr', coverage: 'full' },
];

export const DEFAULT_LANGUAGE = 'en';
export const getLanguage = (code: string): Language | undefined => LANGUAGES.find((l) => l.code === code);
