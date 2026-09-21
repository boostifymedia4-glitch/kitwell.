import { useDeferredValue, useMemo, useState } from 'react';
import { ClearButton, Stats, TextInput } from '@/components/tool/TextIO';
import { textStats } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const LIMITS: { name: string; max: number }[] = [
  { name: 'X (Twitter) post', max: 280 },
  { name: 'Meta description (approx.)', max: 160 },
  { name: 'Page title (approx.)', max: 60 },
  { name: 'SMS (single GSM-7 message)', max: 160 },
  { name: 'Instagram caption', max: 2200 },
];

const CharacterCounter: ToolImplementation = () => {
  const [text, setText] = useState('');
  const deferred = useDeferredValue(text);
  const s = useMemo(() => textStats(deferred), [deferred]);
  return (
    <div className="stack">
      <Stats
        items={[
          { label: 'Characters', value: s.characters },
          { label: 'Without spaces', value: s.charactersNoSpaces },
          { label: 'Words', value: s.words },
          { label: 'Lines', value: s.lines },
          { label: 'Bytes (UTF-8)', value: s.bytes },
        ]}
      />
      <TextInput label="Your text" value={text} onChange={setText} rows={10} prose placeholder="Type or paste your text here…" actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="stack-sm">
        <span className="label">Common limits</span>
        <div className="two-col">
          {LIMITS.map((l) => {
            const over = s.characters > l.max;
            const pct = Math.min(100, (s.characters / l.max) * 100);
            return (
              <div key={l.name} className={`limit-bar ${over ? 'limit-over' : ''}`}>
                <div className="row row-between">
                  <span>{l.name}</span>
                  <span className={over ? 'file-status-error' : 'muted'}>
                    {s.characters.toLocaleString('en-US')} / {l.max.toLocaleString('en-US')}
                    {over ? ` (${(s.characters - l.max).toLocaleString('en-US')} over)` : ''}
                  </span>
                </div>
                <div className="progress" role="progressbar" aria-label={l.name} aria-valuemin={0} aria-valuemax={l.max} aria-valuenow={Math.min(s.characters, l.max)}>
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
