import { useMemo, useState } from 'react';
import { ErrorMessage } from '@/components/tool/Feedback';
import { Segmented, SelectField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { formatXml } from '@/lib/dev';
import type { ToolImplementation } from '../../types';

const SAMPLE = '<?xml version="1.0"?><catalog><book id="1"><title>Example</title><price>9.99</price></book><book id="2"/></catalog>';

const XmlFormatter: ToolImplementation = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indent, setIndent] = useState('2');
  const result = useMemo(() => (text.trim() ? formatXml(text, indent === 'tab' ? 'tab' : Number(indent), mode === 'minify') : null), [text, mode, indent]);

  return (
    <div className="stack">
      <TextInput
        label="XML input"
        value={text}
        onChange={setText}
        rows={12}
        invalid={result?.ok === false}
        placeholder="<root><item>Paste your XML here</item></root>"
        actions={
          <div className="row" style={{ gap: 4 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText(SAMPLE)}>
              Insert example
            </button>
            <ClearButton onClick={() => setText('')} disabled={!text} />
          </div>
        }
      />
      <div className="options-grid">
        <Segmented
          label="Action"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'format', label: 'Format' },
            { value: 'minify', label: 'Minify' },
          ]}
        />
        {mode === 'format' && (
          <SelectField
            label="Indentation"
            value={indent}
            onChange={setIndent}
            options={[
              { value: '2', label: '2 spaces' },
              { value: '4', label: '4 spaces' },
              { value: 'tab', label: 'Tab' },
            ]}
          />
        )}
      </div>
      {result && !result.ok && (
        <ErrorMessage>
          <strong>
            Line {result.error.line}, column {result.error.column}:
          </strong>{' '}
          {result.error.message}
        </ErrorMessage>
      )}
      <OutputBox label={mode === 'format' ? 'Formatted XML' : 'Minified XML'} value={result?.ok ? result.value : ''} rows={12} filename="formatted.xml" mime="application/xml" />
    </div>
  );
};

export default XmlFormatter;
