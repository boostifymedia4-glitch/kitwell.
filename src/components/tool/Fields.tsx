import { useId, type ReactNode } from 'react';
import { useI18n } from '@/i18n';

interface FieldProps {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  const id = useId();
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {children(id)}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  hint?: string;
}

export function SelectField<T extends string>({ label, value, options, onChange, hint }: SelectProps<T>) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value as T)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

interface NumberProps {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  disabled?: boolean;
}

export function NumberField({ label, value, onChange, min, max, step = 1, hint, disabled }: NumberProps) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <input
          id={id}
          className="input"
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
      )}
    </Field>
  );
}

export function RangeField({ label, value, onChange, min, max, step = 1, format }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; format?: (v: number) => string }) {
  const { t } = useI18n();
  return (
    <Field label={t('ui.sliderLabel', { label, value: format ? format(value) : value })}>
      {(id) => <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />}
    </Field>
  );
}

export function CheckField({ label, checked, onChange, disabled }: { label: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="field" role="group" aria-label={label}>
      <span className="label" aria-hidden="true">
        {label}
      </span>
      <div className="segmented">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      {(id) => <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)} />}
    </Field>
  );
}
