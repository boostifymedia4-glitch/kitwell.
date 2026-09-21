import { useMemo, useState } from 'react';
import { CheckField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { cleanText, type CleanOptions } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const LABELS: Record<keyof CleanOptions, string> = {
  trimLines: 'Trim spaces at the start and end of each line',
  collapseSpaces: 'Collapse repeated spaces and tabs',
  stripInvisible: 'Remove invisible characters (zero-width, soft hyphen, non-breaking space)',
  removeEmptyLines: 'Remove all empty lines',
  collapseEmptyLines: 'Collapse multiple empty lines into one',
  removeLineBreaks: 'Join lines into a single paragraph',
  straightenQuotes: 'Replace curly quotes with straight quotes',
  stripTags: 'Remove HTML tags',
};

const TextCleaner: ToolImplementation = () => {
  const [text, setText] = useState('');
  const [opts, setOpts] = useState<CleanOptions>({
    trimLines: true, collapseSpaces: true, stripInvisible: true, removeEmptyLines: false,
    collapseEmptyLines: true, removeLineBreaks: false, straightenQuotes: false, stripTags: false,
  });
  const output = useMemo(() => cleanText(text, opts), [text, opts]);
  return (
    <div className="stack">
      <TextInput label="Your text" value={text} onChange={setText} rows={10} prose placeholder="Paste messy text here…" actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label" style={{ marginBottom: 8 }}>
          Clean-up options
        </legend>
        <div className="two-col" style={{ gap: 10 }}>
          {(Object.keys(LABELS) as (keyof CleanOptions)[]).map((k) => (
            <CheckField key={k} label={LABELS[k]} checked={opts[k]} onChange={(v) => setOpts((o) => ({ ...o, [k]: v }))} />
          ))}
        </div>
      </fieldset>
      <OutputBox label="Cleaned text" value={output} rows={10} prose filename="cleaned.txt" />
    </div>
  );
};

export default TextCleaner;
