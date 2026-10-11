import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PartialMessages } from './en';
import { DEFAULT_LANGUAGE, getLanguage, langTag, type Language } from './languages';
import { localeLoaders } from './loaders';
import { splitLang, withLang } from './routing';
import type { ToolTextMap } from './toolText';
import { setActiveLanguage, translateWith, type Vars } from './translate';

export type MessageKey = string;
export { tr } from './translate';

interface I18n {
  lang: Language;
  /** Translates a key, filling {placeholders}. Falls back to English when a translation is missing. */
  t: (key: MessageKey, vars?: Vars) => string;
  /** Switches language by going to the same page under the other language's address. */
  setLanguage: (code: string) => Promise<void>;
  /** The language's translated text for the whole site, for components that localise structured content. */
  messages: PartialMessages;
  /** Translated tool names, descriptions, steps, FAQ and limits, keyed by tool slug. */
  toolText: ToolTextMap;
  /** True while a language file is loading. */
  loading: boolean;
}

/** A language's loaded text. Server rendering and hydration start from this so the first render is already localised. */
export interface LocaleData {
  code: string;
  messages: PartialMessages;
  toolText: ToolTextMap;
}

const STORAGE_KEY = 'kitwell-language';

const english = getLanguage(DEFAULT_LANGUAGE)!;

const Context = createContext<I18n>({
  lang: english,
  t: (key, vars) => translateWith('en', {}, key, vars),
  setLanguage: async () => undefined,
  messages: {},
  toolText: {},
  loading: false,
});

export const useI18n = () => useContext(Context);

const cache = new Map<string, LocaleData>();

/** Loads one language (a lazy chunk per language, so visitors only download the language they use). */
export async function loadLocale(code: string): Promise<LocaleData> {
  if (code === DEFAULT_LANGUAGE) return { code, messages: {}, toolText: {} };
  const hit = cache.get(code);
  if (hit) return hit;
  const loader = localeLoaders[code];
  if (!loader) throw new Error(`No translations registered for "${code}".`);
  const mod = await loader();
  const loaded = { code, messages: mod.default, toolText: mod.tools };
  cache.set(code, loaded);
  return loaded;
}

function readStored(): string | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && getLanguage(value) ? value : null;
  } catch {
    return null;
  }
}

function store(code: string) {
  try {
    if (code === DEFAULT_LANGUAGE) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage may be blocked; the choice then only lasts for this visit */
  }
}

/**
 * Holds the language of the page. The address decides it (/ur/... is Urdu), so a page always renders in the same
 * language for everyone, including search engines. `initial` carries the already loaded text of the page's language
 * (server rendering and hydration), so the first render matches the prerendered HTML.
 */
export function I18nProvider({ children, initial }: { children: ReactNode; initial?: LocaleData }) {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const urlCode = splitLang(pathname).code;
  const [state, setState] = useState<LocaleData>(initial ?? { code: DEFAULT_LANGUAGE, messages: {}, toolText: {} });
  const [loading, setLoading] = useState(false);
  const request = useRef(0);

  // Follow the address: when it changes language (a link, the back button, a typed address) load that language.
  useEffect(() => {
    if (urlCode === state.code) return;
    const mine = ++request.current;
    setLoading(true);
    loadLocale(urlCode)
      .then((data) => {
        if (mine === request.current) setState(data);
      })
      .catch(() => {
        /* the language file could not be loaded (for example offline): stay on the current language */
      })
      .finally(() => {
        if (mine === request.current) setLoading(false);
      });
  }, [urlCode, state.code]);

  // The text and the language used by plain library code (tr) follow the state.
  setActiveLanguage(state.code, state.messages);

  // A visitor who chose a language before is taken to it when they open an English address.
  const redirected = useRef(false);
  useEffect(() => {
    if (redirected.current) return;
    redirected.current = true;
    const saved = readStored();
    if (saved && saved !== DEFAULT_LANGUAGE && urlCode === DEFAULT_LANGUAGE) navigate(withLang(pathname, saved) + search + hash, { replace: true });
    // only on the first render of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lang = getLanguage(state.code) ?? english;

  const setLanguage = useCallback(
    async (code: string) => {
      if (!getLanguage(code)) return;
      store(code);
      try {
        await loadLocale(code);
      } catch {
        return;
      }
      navigate(withLang(pathname, code) + search + hash);
    },
    [navigate, pathname, search, hash],
  );

  // Keep <html lang> and <html dir> in step with the language so screen readers and RTL layouts work.
  useEffect(() => {
    document.documentElement.lang = langTag(lang);
    document.documentElement.dir = lang.dir;
  }, [lang]);

  const value = useMemo<I18n>(
    () => ({
      lang,
      t: (key, vars) => translateWith(lang.code, state.messages, key, vars),
      setLanguage,
      messages: state.messages,
      toolText: state.toolText,
      loading,
    }),
    [lang, state, setLanguage, loading],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
