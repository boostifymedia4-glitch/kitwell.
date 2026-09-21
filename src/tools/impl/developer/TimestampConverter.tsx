import { useEffect, useMemo, useState } from 'react';
import { ErrorMessage } from '@/components/tool/Feedback';
import { Field, SelectField } from '@/components/tool/Fields';
import { CopyRow } from '@/components/tool/CopyButton';
import { parseTimestamp, relativeTime, type TimestampUnit } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import type { ToolImplementation } from '../../types';

const localZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

function zoneOptions(): { value: string; label: string }[] {
  const local = localZone();
  let zones: string[];
  try {
    zones = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.('timeZone') ?? [];
  } catch {
    zones = [];
  }
  const unique = Array.from(new Set(['UTC', local, ...zones]));
  return unique.map((z) => ({ value: z, label: z === local ? `${z} (your time zone)` : z }));
}

function formatIn(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone }).format(date);
}

const toInputValue = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

const TimestampConverter: ToolImplementation = () => {
  const zones = useMemo(zoneOptions, []);
  const [now, setNow] = useState(() => new Date());
  const [input, setInput] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<TimestampUnit>('auto');
  const [zone, setZone] = useState(localZone);
  const [dateInput, setDateInput] = useState(() => toInputValue(new Date()));
  const [dateAsUtc, setDateAsUtc] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const parsed = useMemo(() => {
    if (!input.trim()) return null;
    try {
      return { ...parseTimestamp(input, unit), error: null as string | null };
    } catch (e) {
      return { date: null, unit: 's' as const, error: errorMessage(e) };
    }
  }, [input, unit]);

  const fromDate = useMemo(() => {
    if (!dateInput) return null;
    const withSeconds = dateInput.length === 16 ? `${dateInput}:00` : dateInput;
    const d = dateAsUtc ? new Date(`${withSeconds}Z`) : new Date(withSeconds);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [dateInput, dateAsUtc]);

  return (
    <div className="stack">
      <div className="stat-grid">
        <div className="stat">
          <b className="mono">{Math.floor(now.getTime() / 1000)}</b>
          <span>Current Unix time (seconds)</span>
        </div>
        <div className="stat">
          <b className="mono">{now.getTime()}</b>
          <span>Current Unix time (milliseconds)</span>
        </div>
      </div>

      <section className="stack" aria-labelledby="ts-to-date">
        <h2 id="ts-to-date" style={{ fontSize: 'var(--text-lg)' }}>
          Timestamp to date
        </h2>
        <div className="options-grid">
          <Field label="Unix timestamp">
            {(id) => <input id={id} className="input mono" inputMode="numeric" value={input} onChange={(e) => setInput(e.target.value)} aria-invalid={Boolean(parsed?.error)} />}
          </Field>
          <SelectField
            label="Unit"
            value={unit}
            onChange={setUnit}
            options={[
              { value: 'auto', label: 'Auto-detect' },
              { value: 's', label: 'Seconds' },
              { value: 'ms', label: 'Milliseconds' },
            ]}
          />
          <SelectField label="Show time in" value={zone} onChange={setZone} options={zones} />
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}>
            Use current time
          </button>
        </div>
        {parsed?.error && <ErrorMessage>{parsed.error}</ErrorMessage>}
        {parsed?.date && (
          <div className="stack-sm">
            <p className="hint">Interpreted as {parsed.unit === 's' ? 'seconds' : 'milliseconds'}.</p>
            <CopyRow label="ISO 8601 (UTC)" value={parsed.date.toISOString()} />
            <CopyRow label={`In ${zone}`} value={formatIn(parsed.date, zone)} />
            <CopyRow label="UTC" value={parsed.date.toUTCString()} />
            <CopyRow label="Relative" value={relativeTime(parsed.date, now)} />
          </div>
        )}
      </section>

      <hr style={{ margin: 0 }} />

      <section className="stack" aria-labelledby="date-to-ts">
        <h2 id="date-to-ts" style={{ fontSize: 'var(--text-lg)' }}>
          Date to timestamp
        </h2>
        <div className="options-grid">
          <Field label="Date and time">
            {(id) => <input id={id} className="input" type="datetime-local" step={1} value={dateInput} onChange={(e) => setDateInput(e.target.value)} />}
          </Field>
          <SelectField
            label="Interpret as"
            value={dateAsUtc ? 'utc' : 'local'}
            onChange={(v) => setDateAsUtc(v === 'utc')}
            options={[
              { value: 'local', label: `Your local time (${localZone()})` },
              { value: 'utc', label: 'UTC' },
            ]}
          />
        </div>
        {fromDate ? (
          <div className="stack-sm">
            <CopyRow label="Unix timestamp (seconds)" value={String(Math.floor(fromDate.getTime() / 1000))} />
            <CopyRow label="Unix timestamp (milliseconds)" value={String(fromDate.getTime())} />
            <CopyRow label="ISO 8601 (UTC)" value={fromDate.toISOString()} />
          </div>
        ) : (
          <p className="hint">Choose a valid date and time.</p>
        )}
      </section>
    </div>
  );
};

export default TimestampConverter;
