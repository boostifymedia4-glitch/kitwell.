import { useMemo, useState } from 'react';
import { ErrorMessage } from '@/components/tool/Feedback';
import { CheckField, Segmented } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { base64Decode, base64Encode, htmlDecode, htmlEncode, urlDecode, urlEncode, type UrlMode } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import type { ToolImplementation } from '../../types';

type Direction = 'encode' | 'decode';

const EncodeDecode: ToolImplementation = ({ tool }) => {
  const kind = tool.config?.kind ?? 'url';
  const [direction, setDirection] = useState<Direction>('encode');
  const [text, setText] = useState('');
  const [urlMode, setUrlMode] = useState<UrlMode>('component');
  const [space, setSpace] = useState(false); // url: use + for spaces
  const [urlSafe, setUrlSafe] = useState(false); // base64
  const [nonAscii, setNonAscii] = useState(false); // html

  const result = useMemo(() => {
    if (!text) return { output: '', error: null as string | null };
    try {
      let output: string;
      if (kind === 'url') output = direction === 'encode' ? urlEncode(text, urlMode, space) : urlDecode(text, urlMode, space);
      else if (kind === 'html') output = direction === 'encode' ? htmlEncode(text, nonAscii) : htmlDecode(text);
      else output = direction === 'encode' ? base64Encode(text, urlSafe) : base64Decode(text);
      return { output, error: null };
    } catch (e) {
      return { output: '', error: errorMessage(e) };
    }
  }, [text, direction, kind, urlMode, space, urlSafe, nonAscii]);

  const swap = () => {
    if (result.output) setText(result.output);
    setDirection((d) => (d === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <div className="stack">
      <div className="options-grid">
        <Segmented
          label="Direction"
          value={direction}
          onChange={setDirection}
          options={[
            { value: 'encode', label: 'Encode' },
            { value: 'decode', label: 'Decode' },
          ]}
        />
        {kind === 'url' && (
          <>
            <Segmented
              label="Scope"
              value={urlMode}
              onChange={setUrlMode}
              options={[
                { value: 'component', label: 'Component' },
                { value: 'full', label: 'Full URL' },
              ]}
            />
            <CheckField label={direction === 'encode' ? 'Use + for spaces (form encoding)' : 'Treat + as a space'} checked={space} onChange={setSpace} />
          </>
        )}
        {kind === 'base64' && <CheckField label="URL-safe alphabet (- and _, no padding)" checked={urlSafe} onChange={setUrlSafe} disabled={direction === 'decode'} />}
        {kind === 'html' && <CheckField label="Also encode non-ASCII characters" checked={nonAscii} onChange={setNonAscii} disabled={direction === 'decode'} />}
      </div>
      <TextInput label={direction === 'encode' ? 'Text to encode' : 'Text to decode'} value={text} onChange={setText} rows={8} invalid={Boolean(result.error)} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      {result.error && <ErrorMessage>{result.error}</ErrorMessage>}
      <OutputBox label="Result" value={result.output} rows={8} filename={`${kind}-${direction}d.txt`} />
      <div className="toolbar">
        <button type="button" className="btn btn-secondary" onClick={swap} disabled={!result.output}>
          Use result as input ({direction === 'encode' ? 'then decode' : 'then encode'})
        </button>
      </div>
    </div>
  );
};

export default EncodeDecode;
