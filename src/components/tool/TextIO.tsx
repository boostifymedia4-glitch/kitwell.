import { useId, type ReactNode } from 'react';
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
export function OutputBox({ label, value, rows = 10, prose, filename, mime, placeholder = 'The result will appear here.' }: OutputProps) {
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
        placeholder={placeholder}
        spellCheck={false}
      />
      <div className="output-actions">
        <CopyButton text={value} label="Copy result" />
        {filename && (
          <button type="button" className="btn btn-secondary btn-sm" disabled={!value} onClick={() => downloadText(value, filename, mime)}>
            Download
          </button>
        )}
      </div>
    </div>
  );
}

export function Stats({ items }: { items: { label: string; value: string | number }[] }) {
  return (
    <div className="stat-grid" role="group" aria-label="Statistics">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <b>{typeof s.value === 'number' ? s.value.toLocaleString('en-US') : s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ClearButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={onClick} disabled={disabled}>
      Clear
    </button>
  );
}
