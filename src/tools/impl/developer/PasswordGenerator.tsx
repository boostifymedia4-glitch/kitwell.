import { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { CheckField, NumberField, Segmented } from '@/components/tool/Fields';
import { Icon } from '@/components/Icon';
import { generatePassword, passwordEntropyBits, type PasswordOptions } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import { generateNamePassword, NAME_LENGTH, PASSWORD_SYMBOLS, strengthOf, type NamePasswordOptions } from '@/lib/passwords';
import { ALL_WORDS, WORD_CATEGORIES } from '@/lib/wordlists';
import type { ToolImplementation } from '../../types';

type Mode = 'name' | 'random';

const TONE = { danger: 'var(--danger)', warning: 'var(--warning)', success: 'var(--success)' } as const;

interface Entry {
  password: string;
  bits: number;
}

const PasswordGenerator: ToolImplementation = () => {
  const [mode, setMode] = useState<Mode>('name');
  const [length, setLength] = useState(14);
  const [count, setCount] = useState<number | ''>(5);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [ambiguous, setAmbiguous] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [list, setList] = useState<Entry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  const max = mode === 'name' ? NAME_LENGTH.max : 128;
  const min = mode === 'name' ? NAME_LENGTH.min : 8;
  const effectiveLength = Math.min(max, Math.max(min, length));

  const generate = useCallback(() => {
    try {
      const n = Math.min(20, Math.max(1, Number(count) || 1));
      const out: Entry[] = [];
      if (mode === 'name') {
        const o: NamePasswordOptions = { length: effectiveLength, categories, digits, symbols, upper, lower };
        for (let i = 0; i < n; i++) out.push(generateNamePassword(o));
      } else {
        const o: PasswordOptions = { length: effectiveLength, lower, upper, digits, symbols, excludeAmbiguous: ambiguous };
        const bits = passwordEntropyBits(o);
        for (let i = 0; i < n; i++) out.push({ password: generatePassword(o), bits });
      }
      setList(out);
      setError(null);
    } catch (e) {
      setList([]);
      setError(errorMessage(e));
    }
  }, [mode, effectiveLength, count, categories, digits, symbols, upper, lower, ambiguous]);

  // Generate on load and whenever a setting changes.
  useEffect(() => generate(), [generate]);

  const bits = list.length ? Math.min(...list.map((e) => e.bits)) : 0;
  const s = strengthOf(bits);
  const wordCount = useMemo(() => ALL_WORDS(categories).length, [categories]);
  const toggleCategory = (id: string) => setCategories((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const symbolList = [...PASSWORD_SYMBOLS].join(' ');

  return (
    <div className="stack">
      <Segmented
        label="Password style"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'name', label: 'Name + word' },
          { value: 'random', label: 'Fully random' },
        ]}
      />
      {mode === 'name' ? (
        <Notice tone="warn">
          <strong>Easier to remember, but weaker.</strong> A password built on a recognisable name or word is easier to guess than fully random text, even with random numbers, capitals and symbols added. Use it for low-risk accounts. For email, banking or a password manager, switch to <em>Fully random</em> and use 16 or more characters.
        </Notice>
      ) : (
        <Notice tone="success">Maximum security: every character is chosen independently at random. Store it in a password manager.</Notice>
      )}

      <div className="options-grid">
        <NumberField
          label={`Length (${min}–${max})`}
          value={length}
          min={min}
          max={max}
          onChange={(v) => setLength(v === '' ? min : Math.min(max, Math.max(min, v)))}
        />
        <NumberField label="How many (1–20)" value={count} min={1} max={20} onChange={setCount} />
      </div>
      <div className="field">
        <label className="label" htmlFor="pw-length">
          Length slider
        </label>
        <input id="pw-length" type="range" min={min} max={max} value={effectiveLength} onChange={(e) => setLength(Number(e.target.value))} />
      </div>

      {mode === 'name' && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="label" style={{ marginBottom: 8 }}>
            Name and word categories <span className="hint">({wordCount.toLocaleString('en-US')} words{categories.length ? ' selected' : ', all categories'})</span>
          </legend>
          <div className="chip-row">
            {WORD_CATEGORIES.map((c) => (
              <label key={c.id} className={`chip-check${categories.includes(c.id) ? ' is-on' : ''}`}>
                <input type="checkbox" checked={categories.includes(c.id)} onChange={() => toggleCategory(c.id)} />
                {c.label}
              </label>
            ))}
            {categories.length > 0 && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCategories([])}>
                Use all categories
              </button>
            )}
          </div>
        </fieldset>
      )}

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label" style={{ marginBottom: 8 }}>
          Characters to include
        </legend>
        <div className="row" style={{ gap: 20 }}>
          <CheckField label="Uppercase (A–Z)" checked={upper} onChange={setUpper} />
          <CheckField label="Lowercase (a–z)" checked={lower} onChange={setLower} />
          <CheckField label="Numbers (0–9)" checked={digits} onChange={setDigits} />
          <CheckField label={`Symbols (${symbolList})`} checked={symbols} onChange={setSymbols} />
          {mode === 'random' && <CheckField label="Avoid look-alikes (I l 1 O 0 o)" checked={ambiguous} onChange={setAmbiguous} />}
        </div>
      </fieldset>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && list.length > 0 && (
        <div className="stack-sm">
          <div className="row row-between">
            <span className="label">Strength: {s.label}</span>
            <span className="hint">{mode === 'name' ? 'at most about' : 'about'} {bits} bits{mode === 'name' ? ' if an attacker knows the pattern' : ' of entropy'}</span>
          </div>
          <div className="strength" role="img" aria-label={`Password strength: ${s.label}`}>
            <span style={{ width: `${s.pct}%`, background: TONE[s.tone] }} />
          </div>
        </div>
      )}
      <ul className="result-list" aria-label="Generated passwords">
        {list.map((p, i) => (
          <li className="result-item" key={`${i}-${p.password}`}>
            <code className="file-name" style={{ fontSize: 'var(--text-sm)', userSelect: 'all' }}>
              {visible ? p.password : '•'.repeat(Math.min(p.password.length, 32))}
            </code>
            <CopyButton text={p.password} />
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
        <CopyButton text={list.map((p) => p.password).join('\n')} label="Copy all" variant="secondary" size="md" />
      </div>
    </div>
  );
};

export default PasswordGenerator;
