import { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { CheckField, NumberField, Segmented } from '@/components/tool/Fields';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { PASSWORD_COUNT, PASSWORD_LENGTH, generatePassword, type PasswordOptions } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import { generateNamePassword, PASSWORD_SYMBOLS, type NamePasswordOptions } from '@/lib/passwords';
import { estimatePassword, nameRating, strengthOf, weakest, type Strength } from '@/lib/passwordStrength';
import { ALL_WORDS, WORD_CATEGORIES } from '@/lib/wordlists';
import type { ToolImplementation } from '../../types';

type Mode = 'name' | 'random';

const TONE = { danger: 'var(--danger)', warning: 'var(--warning)', success: 'var(--success)' } as const;

/** Brings a typed value into range; an empty field becomes the fallback. */
const clamp = (n: number | '', lo: number, hi: number, fallback: number) => Math.min(hi, Math.max(lo, n === '' || Number.isNaN(n) ? fallback : Math.floor(n)));

const PasswordGenerator: ToolImplementation = () => {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>('name');
  const [length, setLength] = useState<number | ''>(12);
  const [count, setCount] = useState<number | ''>(5);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [ambiguous, setAmbiguous] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  const { min, max } = PASSWORD_LENGTH;
  const effectiveLength = clamp(length, min, max, 12);

  const generate = useCallback(() => {
    try {
      const n = clamp(count, PASSWORD_COUNT.min, PASSWORD_COUNT.max, 1);
      const out: string[] = [];
      if (mode === 'name') {
        const o: NamePasswordOptions = { length: effectiveLength, categories, digits, symbols, upper, lower };
        for (let i = 0; i < n; i++) out.push(generateNamePassword(o));
      } else {
        const o: PasswordOptions = { length: effectiveLength, lower, upper, digits, symbols, excludeAmbiguous: ambiguous };
        for (let i = 0; i < n; i++) out.push(generatePassword(o));
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

  // Name + word passwords are rated by length once they are checked to contain a capital, a number and a symbol;
  // anything else (and Fully random) is rated from its estimated bits. The weakest password sets the overall rating.
  const rate = (p: string): Strength => (mode === 'name' ? nameRating(p) : null) ?? strengthOf(estimatePassword(p).bits);
  const bits = list.length ? Math.min(...list.map((p) => estimatePassword(p).bits)) : 0;
  const s = list.length ? weakest(list.map(rate)) : strengthOf(0);
  const strengthLabel = t(`passwordGenerator.strength.${s.id}`);
  const wordCount = useMemo(() => ALL_WORDS(categories).length, [categories]);
  const toggleCategory = (id: string) => setCategories((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const symbolList = [...PASSWORD_SYMBOLS].join(' ');

  return (
    <div className="stack">
      <Segmented
        label={t('passwordGenerator.style')}
        value={mode}
        onChange={setMode}
        options={[
          { value: 'name', label: t('passwordGenerator.style.name') },
          { value: 'random', label: t('passwordGenerator.style.random') },
        ]}
      />
      {mode === 'name' ? (
        <Notice tone="info">{t('passwordGenerator.nameNotice')}</Notice>
      ) : (
        <Notice tone="success">{t('passwordGenerator.randomNotice')}</Notice>
      )}

      <div className="options-grid">
        <NumberField
          label={t('passwordGenerator.length', { min, max })}
          value={length}
          min={min}
          max={max}
          onChange={(v) => setLength(v === '' ? '' : Math.min(max, v))}
          onBlur={() => setLength(effectiveLength)}
        />
        <NumberField
          label={t('passwordGenerator.howMany')}
          value={count}
          min={PASSWORD_COUNT.min}
          max={PASSWORD_COUNT.max}
          onChange={(v) => setCount(v === '' ? '' : Math.min(PASSWORD_COUNT.max, v))}
          onBlur={() => setCount(clamp(count, PASSWORD_COUNT.min, PASSWORD_COUNT.max, 1))}
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="pw-length">
          {t('passwordGenerator.lengthSlider')}
        </label>
        <input id="pw-length" type="range" min={min} max={max} value={effectiveLength} onChange={(e) => setLength(Number(e.target.value))} />
      </div>

      {mode === 'name' && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="label" style={{ marginBottom: 8 }}>
            {t('passwordGenerator.categories')}{' '}
            <span className="hint">{categories.length ? t('passwordGenerator.wordsSelected', { count: wordCount.toLocaleString('en-US') }) : t('passwordGenerator.wordsAll', { count: wordCount.toLocaleString('en-US') })}</span>
          </legend>
          <div className="chip-row">
            {WORD_CATEGORIES.map((c) => (
              <label key={c.id} className={`chip-check${categories.includes(c.id) ? ' is-on' : ''}`}>
                <input type="checkbox" checked={categories.includes(c.id)} onChange={() => toggleCategory(c.id)} />
                {t(`passwordGenerator.category.${c.id}`)}
              </label>
            ))}
            {categories.length > 0 && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCategories([])}>
                {t('passwordGenerator.useAllCategories')}
              </button>
            )}
          </div>
        </fieldset>
      )}

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label" style={{ marginBottom: 8 }}>
          {t('passwordGenerator.charactersToInclude')}
        </legend>
        <div className="row" style={{ gap: 20 }}>
          <CheckField label={t('passwordGenerator.uppercase')} checked={upper} onChange={setUpper} />
          <CheckField label={t('passwordGenerator.lowercase')} checked={lower} onChange={setLower} />
          <CheckField label={t('passwordGenerator.numbers')} checked={digits} onChange={setDigits} />
          <CheckField label={t('passwordGenerator.symbols', { symbols: symbolList })} checked={symbols} onChange={setSymbols} />
          {mode === 'random' && <CheckField label={t('passwordGenerator.avoidLookAlikes')} checked={ambiguous} onChange={setAmbiguous} />}
        </div>
      </fieldset>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && list.length > 0 && (
        <div className="stack-sm">
          <div className="row row-between">
            <span className="label">{t('passwordGenerator.strength', { label: strengthLabel })}</span>
            <span className="hint">{mode === 'name' ? t('passwordGenerator.basis.name') : t('passwordGenerator.bits.random', { bits: Math.round(bits) })}</span>
          </div>
          <div className="strength" role="img" aria-label={t('passwordGenerator.strengthAria', { label: strengthLabel })}>
            <span style={{ width: `${s.pct}%`, background: TONE[s.tone] }} />
          </div>
          <p className="hint">{t('passwordGenerator.estimateNote')}</p>
        </div>
      )}
      <ul className="result-list" aria-label={t('passwordGenerator.generatedList')}>
        {list.map((p, i) => (
          <li className="result-item" key={`${i}-${p}`}>
            <code className="pw-text">
              {visible ? p : '•'.repeat(Math.min(p.length, 32))}
            </code>
            <span className={`pw-chip pw-chip-${rate(p).tone}`}>{t(`passwordGenerator.strength.${rate(p).id}`)}</span>
            <CopyButton text={p} />
          </li>
        ))}
      </ul>
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={generate}>
          <Icon name="rotate-ccw" size={18} />
          {t('passwordGenerator.generate')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setVisible((v) => !v)} aria-pressed={!visible}>
          <Icon name="eye" size={16} />
          {visible ? t('passwordGenerator.hide') : t('passwordGenerator.show')}
        </button>
        <CopyButton text={list.join('\n')} label={t('passwordGenerator.copyAll')} variant="secondary" size="md" />
      </div>
    </div>
  );
};

export default PasswordGenerator;
