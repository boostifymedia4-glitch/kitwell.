import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { PartialMessages } from './en';
import { DEFAULT_LANGUAGE, getLanguage, type Language } from './languages';
import { localeLoaders } from './loaders';
import type { ToolTextMap } from './toolText';
import { setActiveLanguage, translateWith, type Vars } from './translate';

export type MessageKey = string;
export { tr } from './translate';

interface I18n {
  lang: Language;
  /** Translates a key, filling {placeholders}. Falls back to English when a translation is missing. */
  t: (key: MessageKey, vars?: Vars) => string;
  setLanguage: (code: string) => Promise<void>;
  /** The language's translated text for the whole site, for components that localise structured content. */
  messages: PartialMessages;
  /** Translated tool names, descriptions, steps, FAQ and limits, keyed by tool slug. */
  toolText: ToolTextMap;
  /** True while a language file is loading. */
  loading: boolean;
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

interface Loaded {
  messages: PartialMessages;
  toolText: ToolTextMap;
}
const cache = new Map<string, Loaded>();

async function loadMessages(code: string): Promise<Loaded> {
  if (code === DEFAULT_LANGUAGE) return { messages: {}, toolText: {} };
  const hit = cache.get(code);
  if (hit) return hit;
  const loader = localeLoaders[code];
  if (!loader) throw new Error(`No translations registered for "${code}".`);
  const mod = await loader();
  const loaded = { messages: mod.default, toolText: mod.tools };
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
 * Holds the chosen language. The server and the first client render are always English so hydration
 * matches the prerendered HTML; a saved choice is applied right after mount.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ lang: Language; messages: PartialMessages; toolText: ToolTextMap }>({ lang: english, messages: {}, toolText: {} });
  const [loading, setLoading] = useState(false);
  const request = useRef(0);

  const setLanguage = useCallback(async (code: string) => {
    const lang = getLanguage(code);
    if (!lang) return;
    const mine = ++request.current;
    setLoading(true);
    try {
      const { messages, toolText } = await loadMessages(lang.code);
      if (mine !== request.current) return;
      setActiveLanguage(lang.code, messages);
      setState({ lang, messages, toolText });
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
      t: (key, vars) => translateWith(state.lang.code, state.messages, key, vars),
      setLanguage,
      messages: state.messages,
      toolText: state.toolText,
      loading,
    }),
    [state, setLanguage, loading],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
