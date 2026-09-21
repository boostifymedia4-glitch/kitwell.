import { useMemo, useState } from 'react';
import { CheckField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, Stats, TextInput } from '@/components/tool/TextIO';
import { removeDuplicateLines } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const RemoveDuplicates: ToolImplementation = () => {
  const [text, setText] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimLines, setTrimLines] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const result = useMemo(() => removeDuplicateLines(text, { ignoreCase, trimLines, removeEmpty }), [text, ignoreCase, trimLines, removeEmpty]);
  return (
    <div className="stack">
      <TextInput label="Your list (one item per line)" value={text} onChange={setText} rows={10} placeholder={'apple\nbanana\napple\ncherry'} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="row" style={{ gap: 20 }}>
        <CheckField label="Ignore case" checked={ignoreCase} onChange={setIgnoreCase} />
        <CheckField label="Trim whitespace" checked={trimLines} onChange={setTrimLines} />
        <CheckField label="Remove empty lines" checked={removeEmpty} onChange={setRemoveEmpty} />
      </div>
      {text && <Stats items={[{ label: 'Lines kept', value: result.kept }, { label: 'Duplicates removed', value: result.removed }]} />}
      <OutputBox label="Unique lines" value={result.output} rows={10} filename="unique-lines.txt" />
    </div>
  );
};

export default RemoveDuplicates;
