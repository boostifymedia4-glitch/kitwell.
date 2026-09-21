import { useMemo, useState } from 'react';
import { CheckField, SelectField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { sortLines, type SortMode } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const TextSorter: ToolImplementation = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<SortMode>('az');
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [natural, setNatural] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  // Shuffle must not re-run on every render, so it is keyed by an explicit counter.
  const [shuffleKey, setShuffleKey] = useState(0);
  const output = useMemo(
    () => (text ? sortLines(text, { mode, ignoreCase, natural, removeEmpty }) : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, mode, ignoreCase, natural, removeEmpty, shuffleKey],
  );
  return (
    <div className="stack">
      <TextInput label="Your lines" value={text} onChange={setText} rows={10} placeholder={'pear\nApple\nbanana\nitem10\nitem2'} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="options-grid">
        <SelectField
          label="Sort method"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'az', label: 'Alphabetical (A → Z)' },
            { value: 'za', label: 'Reverse alphabetical (Z → A)' },
            { value: 'numeric', label: 'Numeric (first number in line)' },
            { value: 'length', label: 'By line length' },
            { value: 'reverse', label: 'Reverse current order' },
            { value: 'shuffle', label: 'Shuffle randomly' },
          ]}
        />
        <div className="stack-sm">
          <CheckField label="Ignore case" checked={ignoreCase} onChange={setIgnoreCase} />
          <CheckField label="Natural order (item2 before item10)" checked={natural} onChange={setNatural} />
          <CheckField label="Remove empty lines" checked={removeEmpty} onChange={setRemoveEmpty} />
        </div>
        {mode === 'shuffle' && (
          <button type="button" className="btn btn-secondary" onClick={() => setShuffleKey((k) => k + 1)}>
            Shuffle again
          </button>
        )}
      </div>
      <OutputBox label="Sorted lines" value={output} rows={10} filename="sorted-lines.txt" />
    </div>
  );
};

export default TextSorter;
