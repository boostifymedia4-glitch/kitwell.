import { useRef, useState } from 'react';
import { LANGUAGES } from '@/i18n/languages';
import { useI18n } from '@/i18n';
import { Icon } from '../Icon';

/**
 * Footer language picker: a button that shows the current language and opens a modal list of all
 * supported languages. Uses the native <dialog>, so focus is trapped, Escape closes it and focus returns
 * to the button.
 */
export function LanguageSelector() {
  const { lang, t, setLanguage } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState<string | null>(null);

  const choose = async (code: string) => {
    setPending(code);
    await setLanguage(code);
    setPending(null);
    dialog.current?.close();
  };

  return (
    <>
      <button type="button" className="lang-btn" aria-haspopup="dialog" aria-label={t('lang.change', { name: lang.name })} onClick={() => dialog.current?.showModal()}>
        <Icon name="globe" size={18} />
        <span lang={lang.code}>{lang.name}</span>
        <Icon name="chevron-down" size={15} />
      </button>
      <dialog
        ref={dialog}
        className="lang-dialog"
        aria-labelledby="lang-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="lang-head">
          <h2 id="lang-title">{t('lang.title')}</h2>
          <button type="button" className="icon-btn" aria-label={t('lang.close')} onClick={() => dialog.current?.close()}>
            <Icon name="x" size={20} />
          </button>
        </div>
        <p className="lang-note">
          <Icon name="info" size={16} />
          <span>{t('lang.note')}</span>
        </p>
        <ul className="lang-grid">
          {LANGUAGES.map((l) => {
            const current = l.code === lang.code;
            return (
              <li key={l.code}>
                <button type="button" className="lang-option" aria-label={`${l.name} (${l.english})`} aria-current={current ? 'true' : undefined} disabled={pending !== null} onClick={() => void choose(l.code)}>
                  <span className="lang-name" lang={l.code}>
                    {l.name}
                  </span>
                  <span className="lang-english">
                    {l.english}
                    {l.coverage === 'partial' && <em title="Only part of the menus and homepage is translated; the rest appears in English."> · partial</em>}
                  </span>
                  {pending === l.code ? <span className="spinner" aria-hidden="true" /> : current ? <Icon name="check" size={18} className="lang-check" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </dialog>
    </>
  );
}
