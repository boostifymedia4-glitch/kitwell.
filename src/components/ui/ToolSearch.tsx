import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategory, searchTools, toolPath } from '@/tools/registry';
import { Icon } from '../Icon';

interface Props {
  variant?: 'header' | 'hero';
  /** Registers the "/" keyboard shortcut to focus this field. */
  shortcut?: boolean;
  onNavigate?: () => void;
}

export function ToolSearch({ variant = 'header', shortcut = false, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const results = useMemo(() => searchTools(query), [query]);

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcut]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const go = (i: number) => {
    const tool = results[i];
    if (!tool) return;
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(toolPath(tool));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(active);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div className={`search ${variant === 'hero' ? 'search-hero' : ''}`} ref={rootRef}>
      <div className="search-field">
        <Icon name="search" size={18} />
        <label htmlFor={`${listId}-input`} className="visually-hidden">
          Search tools
        </label>
        <input
          id={`${listId}-input`}
          ref={inputRef}
          className="input"
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={variant === 'hero' ? 'Search tools, e.g. “compress image” or “merge pdf”' : 'Search tools'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {shortcut && !query && <kbd aria-hidden="true">/</kbd>}
      </div>
      {showPanel && (
        <ul className="search-results" id={listId} role="listbox" aria-label="Matching tools">
          {results.length === 0 ? (
            <li role="presentation" className="search-empty">
              No tools match “{query}”. Try a format or task, like “png” or “json”.
            </li>
          ) : (
            results.map((t, i) => (
              <li key={t.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <a
                  href={toolPath(t)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(i);
                  }}
                  tabIndex={-1}
                >
                  <span className={`chip chip-sm chip-${t.category}`}>
                    <Icon name={t.icon} size={16} />
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{getCategory(t.category)?.name}</small>
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      )}
      <p className="visually-hidden" role="status" aria-live="polite">
        {showPanel ? `${results.length} ${results.length === 1 ? 'tool' : 'tools'} found` : ''}
      </p>
    </div>
  );
}
