import { useMemo, useState } from 'react';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { convertCase, type CaseMode } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const MODES: { value: CaseMode; label: string }[] = [
  { value: 'upper', label: 'UPPERCASE' },
  { value: 'lower', label: 'lowercase' },
  { value: 'title', label: 'Title Case' },
  { value: 'sentence', label: 'Sentence case' },
  { value: 'camel', label: 'camelCase' },
  { value: 'pascal', label: 'PascalCase' },
  { value: 'snake', label: 'snake_case' },
  { value: 'kebab', label: 'kebab-case' },
  { value: 'constant', label: 'CONSTANT_CASE' },
  { value: 'toggle', label: 'tOGGLE cASE' },
];

const CaseConverter: ToolImplementation = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<CaseMode>('title');
  const output = useMemo(() => convertCase(text, mode), [text, mode]);
  return (
    <div className="stack">
      <TextInput label="Your text" value={text} onChange={setText} rows={8} prose placeholder="Type or paste your text here…" actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="field" role="group" aria-label="Choose case">
        <span className="label">Convert to</span>
        <div className="toolbar">
          {MODES.map((m) => (
            <button key={m.value} type="button" className={`btn btn-sm ${mode === m.value ? 'btn-primary' : 'btn-secondary'}`} aria-pressed={mode === m.value} onClick={() => setMode(m.value)}>
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <OutputBox label="Result" value={output} rows={8} prose filename="converted.txt" />
    </div>
  );
};

export default CaseConverter;
