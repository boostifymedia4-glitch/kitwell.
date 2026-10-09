import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { en, type MessageKey, type PartialMessages } from './en';
import { DEFAULT_LANGUAGE, getLanguage, type Language } from './languages';
import { localeLoaders } from './loaders';

export type { MessageKey } from './en';

type Vars = Record<string, string | number>;

interface I18n {
  lang: Language;
  /** Translates a key, filling {placeholders}. Falls back to English when a translation is missing. */
  t: (key: MessageKey, vars?: Vars) => string;
  setLanguage: (code: string) => Promise<void>;
  /** True while a language file is loading. */
  loading: boolean;
}

const STORAGE_KEY = 'kitwell-language';

function format(template: string, vars?: Vars): string {
  return vars ? template.replace(/\{(\w+)\}/g, (whole, name: string) => (name in vars ? String(vars[name]) : whole)) : template;
}

const english = getLanguage(DEFAULT_LANGUAGE)!;

const Context = createContext<I18n>({
  lang: english,
  t: (key, vars) => format(en[key], vars),
  setLanguage: async () => undefined,
  loading: false,
});

export const useI18n = () => useContext(Context);

const cache = new Map<string, PartialMessages>();

async function loadMessages(code: string): Promise<PartialMessages> {
  if (code === DEFAULT_LANGUAGE) return {};
  const hit = cache.get(code);
  if (hit) return hit;
  const loader = localeLoaders[code];
  if (!loader) throw new Error(`No translations registered for "${code}".`);
  const messages = (await loader()).default;
  cache.set(code, messages);
  return messages;
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
 * Holds the chosen language. The server and the first client render are always English so hydration
 * matches the prerendered HTML; a saved choice is applied right after mount.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ lang: Language; messages: PartialMessages }>({ lang: english, messages: {} });
  const [loading, setLoading] = useState(false);
  const request = useRef(0);

  const setLanguage = useCallback(async (code: string) => {
    const lang = getLanguage(code);
    if (!lang) return;
    const mine = ++request.current;
    setLoading(true);
    try {
      const messages = await loadMessages(lang.code);
      if (mine !== request.current) return;
      setState({ lang, messages });
      store(lang.code);
    } catch {
      // The language file could not be loaded (for example offline): stay on the current language.
    } finally {
      if (mine === request.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = readStored();
    if (saved && saved !== DEFAULT_LANGUAGE) void setLanguage(saved);
  }, [setLanguage]);

  // Keep <html lang> and <html dir> in step with the language so screen readers and RTL layouts work.
  useEffect(() => {
    document.documentElement.lang = state.lang.code;
    document.documentElement.dir = state.lang.dir;
  }, [state.lang]);

  const value = useMemo<I18n>(
    () => ({
      lang: state.lang,
      t: (key, vars) => format(state.messages[key] ?? en[key], vars),
      setLanguage,
      loading,
    }),
    [state, setLanguage, loading],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
