import { useCallback, useEffect, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage } from '@/components/tool/Feedback';
import { CheckField, NumberField } from '@/components/tool/Fields';
import { Icon } from '@/components/Icon';
import { generatePassword, passwordEntropyBits, type PasswordOptions } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import type { ToolImplementation } from '../../types';

function strength(bits: number): { label: string; color: string; pct: number } {
  if (bits < 40) return { label: 'Weak', color: 'var(--danger)', pct: 25 };
  if (bits < 60) return { label: 'Fair', color: 'var(--warning)', pct: 50 };
  if (bits < 90) return { label: 'Strong', color: 'var(--success)', pct: 78 };
  return { label: 'Very strong', color: 'var(--success)', pct: 100 };
}

const PasswordGenerator: ToolImplementation = () => {
  const [opts, setOpts] = useState<PasswordOptions>({ length: 20, lower: true, upper: true, digits: true, symbols: true, excludeAmbiguous: false });
  const [count, setCount] = useState<number | ''>(5);
  const [list, setList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  const generate = useCallback(() => {
    try {
      const n = Math.min(20, Math.max(1, Number(count) || 1));
      setList(Array.from({ length: n }, () => generatePassword(opts)));
      setError(null);
    } catch (e) {
      setList([]);
      setError(errorMessage(e));
    }
  }, [opts, count]);

  // Generate on load and whenever the settings change.
  useEffect(() => generate(), [generate]);

  const bits = passwordEntropyBits(opts);
  const s = strength(bits);
  const set = <K extends keyof PasswordOptions>(k: K, v: PasswordOptions[K]) => setOpts((o) => ({ ...o, [k]: v }));

  return (
    <div className="stack">
      <div className="options-grid">
        <NumberField label="Length (8–128)" value={opts.length} min={8} max={128} onChange={(v) => set('length', v === '' ? 8 : Math.min(128, Math.max(8, v)))} />
        <NumberField label="How many (1–20)" value={count} min={1} max={20} onChange={setCount} />
      </div>
      <div className="field">
        <label className="label" htmlFor="pw-length">
          Length slider
        </label>
        <input id="pw-length" type="range" min={8} max={128} value={opts.length} onChange={(e) => set('length', Number(e.target.value))} />
      </div>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label" style={{ marginBottom: 8 }}>
          Characters to include
        </legend>
        <div className="row" style={{ gap: 20 }}>
          <CheckField label="Lowercase (a–z)" checked={opts.lower} onChange={(v) => set('lower', v)} />
          <CheckField label="Uppercase (A–Z)" checked={opts.upper} onChange={(v) => set('upper', v)} />
          <CheckField label="Numbers (0–9)" checked={opts.digits} onChange={(v) => set('digits', v)} />
          <CheckField label="Symbols (!@#…)" checked={opts.symbols} onChange={(v) => set('symbols', v)} />
          <CheckField label="Avoid look-alikes (I l 1 O 0 o)" checked={opts.excludeAmbiguous} onChange={(v) => set('excludeAmbiguous', v)} />
        </div>
      </fieldset>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && (
        <div className="stack-sm">
          <div className="row row-between">
            <span className="label">Strength: {s.label}</span>
            <span className="hint">about {bits} bits of entropy</span>
          </div>
          <div className="strength" role="img" aria-label={`Password strength: ${s.label}`}>
            <span style={{ width: `${s.pct}%`, background: s.color }} />
          </div>
        </div>
      )}
      <ul className="result-list" aria-label="Generated passwords">
        {list.map((p, i) => (
          <li className="result-item" key={`${i}-${p}`}>
            <code className="file-name" style={{ fontSize: 'var(--text-sm)', userSelect: 'all' }}>
              {visible ? p : '•'.repeat(Math.min(p.length, 32))}
            </code>
            <CopyButton text={p} />
          </li>
        ))}
      </ul>
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={generate}>
          <Icon name="rotate-ccw" size={18} />
          Generate new
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setVisible((v) => !v)} aria-pressed={!visible}>
          <Icon name="eye" size={16} />
          {visible ? 'Hide passwords' : 'Show passwords'}
        </button>
        <CopyButton text={list.join('\n')} label="Copy all" variant="secondary" size="md" />
      </div>
    </div>
  );
};

export default PasswordGenerator;
