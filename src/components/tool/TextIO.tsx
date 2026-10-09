import { useId, type ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { downloadText } from '@/lib/download';
import { CopyButton } from './CopyButton';

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  prose?: boolean;
  invalid?: boolean;
  actions?: ReactNode;
  describedBy?: string;
}

export function TextInput({ label, value, onChange, placeholder, rows = 10, prose, invalid, actions, describedBy }: InputProps) {
  const id = useId();
  return (
    <div className="field">
      <div className="row row-between">
        <label className="label" htmlFor={id}>
          {label}
        </label>
        {actions}
      </div>
      <textarea
        id={id}
        className={`textarea ${prose ? 'prose-font' : ''}`}
        rows={rows}
        value={value}
        placeholder={placeholder}
        spellCheck={false}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface OutputProps {
  label: string;
  value: string;
  rows?: number;
  prose?: boolean;
  filename?: string;
  mime?: string;
  placeholder?: string;
}

/** Read-only result box with copy and optional download. */
export function OutputBox({ label, value, rows = 10, prose, filename, mime, placeholder }: OutputProps) {
  const { t } = useI18n();
  const id = useId();
  return (
    <div className="field output-box">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={`textarea ${prose ? 'prose-font' : ''}`}
        rows={rows}
        readOnly
        value={value}
        placeholder={placeholder ?? t('ui.resultPlaceholder')}
        spellCheck={false}
      />
      <div className="output-actions">
        <CopyButton text={value} label={t('ui.copyResult')} />
        {filename && (
          <button type="button" className="btn btn-secondary btn-sm" disabled={!value} onClick={() => downloadText(value, filename, mime)}>
            {t('ui.download')}
          </button>
        )}
      </div>
    </div>
  );
}

export function Stats({ items }: { items: { label: string; value: string | number }[] }) {
  const { t, lang } = useI18n();
  return (
    <div className="stat-grid" role="group" aria-label={t('ui.stats')}>
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <b>{typeof s.value === 'number' ? s.value.toLocaleString(lang.code) : s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ClearButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const { t } = useI18n();
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={onClick} disabled={disabled}>
      {t('ui.clear')}
    </button>
  );
}
