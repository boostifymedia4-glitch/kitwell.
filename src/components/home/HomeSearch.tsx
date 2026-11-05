import { useEffect, useId, useRef } from 'react';
import { Icon } from '../Icon';
import { useI18n } from '@/i18n';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/**
 * The homepage search field. It only holds the text; the page shows the matching tools in its own results area above the
 * categories. Press "/" anywhere to jump to it, and Escape clears it.
 */
export function HomeSearch({ value, onChange }: Props) {
  const { t } = useI18n();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="search search-hero">
      <div className="search-field">
        <Icon name="search" size={18} />
        <label htmlFor={`${id}-input`} className="visually-hidden">
          {t('search.label')}
        </label>
        <input
          id={`${id}-input`}
          ref={inputRef}
          className="input"
          type="search"
          autoComplete="off"
          spellCheck={false}
          placeholder={t('search.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onChange('');
          }}
        />
        {value ? (
          <button type="button" className="search-clear" aria-label={t('home.search.clear')} onClick={() => { onChange(''); inputRef.current?.focus(); }}>
            <Icon name="x" size={16} />
          </button>
        ) : (
          <kbd aria-hidden="true">/</kbd>
        )}
      </div>
    </div>
  );
}
