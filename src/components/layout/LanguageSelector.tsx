import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { LANGUAGES } from '@/i18n/languages';
import { useI18n } from '@/i18n';
import { Icon } from '../Icon';

const COLUMNS = 3;
const CLOSE_DELAY = 160;

/**
 * Compact language picker: a button with the current language that opens a multi-column menu showing every
 * language at once. On devices with a mouse the menu opens on hover (and stays open while the pointer is over the
 * button or the menu); everywhere it also opens on click or tap. The menu is a disclosure, so Escape closes it,
 * Tab moves on normally, and the arrow keys, Home and End move between languages.
 */
export function LanguageSelector({ placement = 'down', showRegion = false }: { placement?: 'down' | 'up'; showRegion?: boolean }) {
  const { lang, t, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [focusIn, setFocusIn] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const menuId = useId();

  const cancelClose = () => window.clearTimeout(timer.current);
  const scheduleClose = () => {
    cancelClose();
    timer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };
  const hoverable = (e: { pointerType: string }) => e.pointerType === 'mouse';

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  }, []);

  // Close on a click or tap outside, and when focus leaves the widget.
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // After a keyboard open, move focus to the current language.
  useEffect(() => {
    if (!open || !focusIn) return;
    setFocusIn(false);
    const list = options();
    const at = LANGUAGES.findIndex((l) => l.code === lang.code);
    list[Math.max(0, at)]?.focus();
  }, [open, focusIn, lang.code]);

  const options = () => Array.from(root.current?.querySelectorAll<HTMLButtonElement>('.lang-option') ?? []);

  const focusOption = (index: number) => {
    const list = options();
    if (list.length) list[(index + list.length) % list.length].focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      close(true);
      return;
    }
    const list = options();
    const at = list.indexOf(document.activeElement as HTMLButtonElement);
    const rtl = document.documentElement.dir === 'rtl';
    const step: Record<string, number> = { ArrowDown: COLUMNS, ArrowUp: -COLUMNS, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    if (e.key === 'ArrowDown' && document.activeElement === button.current) {
      e.preventDefault();
      setOpen(true);
      setFocusIn(true);
    } else if (open && at >= 0 && e.key in step) {
      e.preventDefault();
      const next = at + step[e.key];
      if (next >= 0 && next < list.length) focusOption(next);
    } else if (open && at >= 0 && e.key === 'Home') {
      e.preventDefault();
      focusOption(0);
    } else if (open && at >= 0 && e.key === 'End') {
      e.preventDefault();
      focusOption(list.length - 1);
    }
  };

  const choose = async (code: string) => {
    if (code === lang.code) {
      close(true);
      return;
    }
    setPending(code);
    await setLanguage(code);
    setPending(null);
    setOpen(false);
  };

  return (
    <div
      ref={root}
      className={`lang-wrap lang-${placement}${showRegion ? '' : ' lang-plain'}`}
      onPointerEnter={(e) => {
        if (!hoverable(e)) return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (hoverable(e)) scheduleClose();
      }}
      onKeyDown={onKeyDown}
    >
      <button
        ref={button}
        type="button"
        className="lang-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t('lang.change', { name: lang.name })}
        onClick={(e) => {
          // a keyboard activation (detail 0) opens the menu and moves focus into it
          if (!open && e.detail === 0) setFocusIn(true);
          setOpen((v) => !v);
        }}
      >
        <Icon name="globe" size={18} />
        <span className="lang-btn-name" lang={lang.code}>
          {lang.name}
        </span>
        <Icon name="chevron-down" size={14} />
      </button>
      {open && (
        <div id={menuId} className="lang-menu" role="group" aria-label={t('lang.title')}>
          <ul className="lang-grid">
            {LANGUAGES.map((l) => {
              const current = l.code === lang.code;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    className="lang-option"
                    lang={l.code}
                    aria-label={t('lang.optionLabel', { name: l.name, english: l.english })}
                    aria-current={current ? 'true' : undefined}
                    disabled={pending !== null}
                    onClick={() => void choose(l.code)}
                  >
                    <span className="lang-text">
                      <span className="lang-name">{l.name}</span>
                      {showRegion && (
                        <span className="lang-region" lang="en" dir="ltr">
                          {l.region}
                        </span>
                      )}
                    </span>
                    {pending === l.code ? <span className="spinner" aria-hidden="true" /> : current ? <Icon name="check" size={14} className="lang-check" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
