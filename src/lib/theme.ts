import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'kitwell-theme';

const systemTheme = (): Theme => (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const stored = (): Theme | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

/** Puts the theme on the page and updates the browser colour. */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c1413' : '#0f766e');
}

/**
 * The theme the visitor sees. A saved choice wins; with no choice it follows the system and keeps following it
 * when the system changes. `null` until mounted, so server and browser render the same markup.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(stored() ?? systemTheme());
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onSystem = () => {
      if (stored()) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      const next = stored() ?? systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    mq?.addEventListener('change', onSystem);
    window.addEventListener('storage', onStorage);
    return () => {
      mq?.removeEventListener('change', onSystem);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = (document.documentElement.getAttribute('data-theme') as Theme) === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice lasts for this visit only */
    }
    applyTheme(next);
    setTheme(next);
  }, []);

  return { theme, toggle };
}
