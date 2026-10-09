import { useMemo, useState } from 'react';
import { CheckField, SelectField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { sortLines, type SortMode } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const TextSorter: ToolImplementation = () => {
  const { t } = useI18n();
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
      <TextInput label={t('textSorter.yourLines')} value={text} onChange={setText} rows={10} placeholder={t('textSorter.placeholder')} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="options-grid">
        <SelectField
          label={t('textSorter.sortMethod')}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'az', label: t('textSorter.mode.az') },
            { value: 'za', label: t('textSorter.mode.za') },
            { value: 'numeric', label: t('textSorter.mode.numeric') },
            { value: 'length', label: t('textSorter.mode.length') },
            { value: 'reverse', label: t('textSorter.mode.reverse') },
            { value: 'shuffle', label: t('textSorter.mode.shuffle') },
          ]}
        />
        <div className="stack-sm">
          <CheckField label={t('textSorter.ignoreCase')} checked={ignoreCase} onChange={setIgnoreCase} />
          <CheckField label={t('textSorter.natural')} checked={natural} onChange={setNatural} />
          <CheckField label={t('textSorter.removeEmpty')} checked={removeEmpty} onChange={setRemoveEmpty} />
        </div>
        {mode === 'shuffle' && (
          <button type="button" className="btn btn-secondary" onClick={() => setShuffleKey((k) => k + 1)}>
            {t('textSorter.shuffleAgain')}
          </button>
        )}
      </div>
      <OutputBox label={t('textSorter.sortedLines')} value={output} rows={10} filename="sorted-lines.txt" />
    </div>
  );
};

export default TextSorter;
