import { useMemo, useState } from 'react';
import { CheckField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { cleanText, type CleanOptions } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const LABELS: Record<keyof CleanOptions, string> = {
  trimLines: 'textCleaner.trimLines',
  collapseSpaces: 'textCleaner.collapseSpaces',
  stripInvisible: 'textCleaner.stripInvisible',
  removeEmptyLines: 'textCleaner.removeEmptyLines',
  collapseEmptyLines: 'textCleaner.collapseEmptyLines',
  removeLineBreaks: 'textCleaner.removeLineBreaks',
  straightenQuotes: 'textCleaner.straightenQuotes',
  stripTags: 'textCleaner.stripTags',
};

const TextCleaner: ToolImplementation = () => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [opts, setOpts] = useState<CleanOptions>({
    trimLines: true, collapseSpaces: true, stripInvisible: true, removeEmptyLines: false,
    collapseEmptyLines: true, removeLineBreaks: false, straightenQuotes: false, stripTags: false,
  });
  const output = useMemo(() => cleanText(text, opts), [text, opts]);
  return (
    <div className="stack">
      <TextInput label={t('textCleaner.yourText')} value={text} onChange={setText} rows={10} prose placeholder={t('textCleaner.placeholder')} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label" style={{ marginBottom: 8 }}>
          {t('textCleaner.options')}
        </legend>
        <div className="two-col" style={{ gap: 10 }}>
          {(Object.keys(LABELS) as (keyof CleanOptions)[]).map((k) => (
            <CheckField key={k} label={t(LABELS[k])} checked={opts[k]} onChange={(v) => setOpts((o) => ({ ...o, [k]: v }))} />
          ))}
        </div>
      </fieldset>
      <OutputBox label={t('textCleaner.cleanedText')} value={output} rows={10} prose filename="cleaned.txt" />
    </div>
  );
};

export default TextCleaner;
