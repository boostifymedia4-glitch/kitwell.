import { useDeferredValue, useMemo, useState } from 'react';
import { ClearButton, Stats, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { textStats } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const LIMITS: { key: string; max: number }[] = [
  { key: 'characterCounter.limit.x', max: 280 },
  { key: 'characterCounter.limit.meta', max: 160 },
  { key: 'characterCounter.limit.title', max: 60 },
  { key: 'characterCounter.limit.sms', max: 160 },
  { key: 'characterCounter.limit.instagram', max: 2200 },
];

const CharacterCounter: ToolImplementation = () => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const deferred = useDeferredValue(text);
  const s = useMemo(() => textStats(deferred), [deferred]);
  return (
    <div className="stack">
      <Stats
        items={[
          { label: t('characterCounter.characters'), value: s.characters },
          { label: t('characterCounter.withoutSpaces'), value: s.charactersNoSpaces },
          { label: t('characterCounter.words'), value: s.words },
          { label: t('characterCounter.lines'), value: s.lines },
          { label: t('characterCounter.bytes'), value: s.bytes },
        ]}
      />
      <TextInput label={t('characterCounter.yourText')} value={text} onChange={setText} rows={10} prose placeholder={t('characterCounter.placeholder')} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="stack-sm">
        <span className="label">{t('characterCounter.commonLimits')}</span>
        <div className="two-col">
          {LIMITS.map((l) => {
            const name = t(l.key);
            const over = s.characters > l.max;
            const pct = Math.min(100, (s.characters / l.max) * 100);
            return (
              <div key={l.key} className={`limit-bar ${over ? 'limit-over' : ''}`}>
                <div className="row row-between">
                  <span>{name}</span>
                  <span className={over ? 'file-status-error' : 'muted'}>
                    {s.characters.toLocaleString('en-US')} / {l.max.toLocaleString('en-US')}
                    {over ? ` ${t('characterCounter.over', { amount: (s.characters - l.max).toLocaleString('en-US') })}` : ''}
                  </span>
                </div>
                <div className="progress" role="progressbar" aria-label={name} aria-valuemin={0} aria-valuemax={l.max} aria-valuenow={Math.min(s.characters, l.max)}>
                  <span style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterCounter;
