import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { CheckField, NumberField, Segmented } from '@/components/tool/Fields';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { generatePassword, type PasswordOptions } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import { generateNamePassword, NAME_LENGTH, PASSWORD_SYMBOLS, type NamePasswordOptions } from '@/lib/passwords';
import { estimatePassword, strengthOf } from '@/lib/passwordStrength';
import { ALL_WORDS, WORD_CATEGORIES } from '@/lib/wordlists';
import type { ToolImplementation } from '../../types';

type Mode = 'name' | 'random';

const TONE = { danger: 'var(--danger)', warning: 'var(--warning)', success: 'var(--success)' } as const;

/** Turns `<em>word</em>` markers in a translated sentence into emphasised text. */
function withEmphasis(text: string): ReactNode {
  return text.split(/<em>(.*?)<\/em>/).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>));
}

const PasswordGenerator: ToolImplementation = () => {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>('name');
  const [length, setLength] = useState(24);
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

  const max = mode === 'name' ? NAME_LENGTH.max : 128;
  const min = mode === 'name' ? NAME_LENGTH.min : 8;
  const effectiveLength = Math.min(max, Math.max(min, length));

  const generate = useCallback(() => {
    try {
      const n = Math.min(20, Math.max(1, Number(count) || 1));
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

  // The estimate is made from each password itself (words, repeats, patterns), and the weakest one is shown.
  const bits = list.length ? Math.min(...list.map((p) => estimatePassword(p).bits)) : 0;
  const s = strengthOf(bits);
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
        <Notice tone="warn">
          <strong>{t('passwordGenerator.nameWarningTitle')}</strong> {withEmphasis(t('passwordGenerator.nameWarningBody'))}
        </Notice>
      ) : (
        <Notice tone="success">{t('passwordGenerator.randomNotice')}</Notice>
      )}

      <div className="options-grid">
        <NumberField
          label={t('passwordGenerator.length', { min, max })}
          value={length}
          min={min}
          max={max}
          onChange={(v) => setLength(v === '' ? min : Math.min(max, Math.max(min, v)))}
        />
        <NumberField label={t('passwordGenerator.howMany')} value={count} min={1} max={20} onChange={setCount} />
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
            <span className="hint">{mode === 'name' ? t('passwordGenerator.bits.name', { bits: Math.round(bits) }) : t('passwordGenerator.bits.random', { bits: Math.round(bits) })}</span>
          </div>
          <div className="strength" role="img" aria-label={t('passwordGenerator.strengthAria', { label: strengthLabel })}>
            <span style={{ width: `${s.pct}%`, background: TONE[s.tone] }} />
          </div>
          {mode === 'name' && s.id !== 'strong' && s.id !== 'very-strong' && <p className="hint">{t('passwordGenerator.nameLengthHint')}</p>}
          <p className="hint">{t('passwordGenerator.estimateNote')}</p>
        </div>
      )}
      <ul className="result-list" aria-label={t('passwordGenerator.generatedList')}>
        {list.map((p, i) => (
          <li className="result-item" key={`${i}-${p}`}>
            <code className="pw-text">
              {visible ? p : '•'.repeat(Math.min(p.length, 32))}
            </code>
            <span className={`pw-chip pw-chip-${strengthOf(estimatePassword(p).bits).tone}`}>{t(`passwordGenerator.strength.${strengthOf(estimatePassword(p).bits).id}`)}</span>
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
