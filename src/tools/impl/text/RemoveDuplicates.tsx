import { useMemo, useState } from 'react';
import { CheckField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, Stats, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { removeDuplicateLines } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const RemoveDuplicates: ToolImplementation = () => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimLines, setTrimLines] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const result = useMemo(() => removeDuplicateLines(text, { ignoreCase, trimLines, removeEmpty }), [text, ignoreCase, trimLines, removeEmpty]);
  return (
    <div className="stack">
      <TextInput label={t('removeDuplicates.yourList')} value={text} onChange={setText} rows={10} placeholder={t('removeDuplicates.placeholder')} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="row" style={{ gap: 20 }}>
        <CheckField label={t('removeDuplicates.ignoreCase')} checked={ignoreCase} onChange={setIgnoreCase} />
        <CheckField label={t('removeDuplicates.trim')} checked={trimLines} onChange={setTrimLines} />
        <CheckField label={t('removeDuplicates.removeEmpty')} checked={removeEmpty} onChange={setRemoveEmpty} />
      </div>
      {text && <Stats items={[{ label: t('removeDuplicates.linesKept'), value: result.kept }, { label: t('removeDuplicates.duplicatesRemoved'), value: result.removed }]} />}
      <OutputBox label={t('removeDuplicates.uniqueLines')} value={result.output} rows={10} filename="unique-lines.txt" />
    </div>
  );
};

export default RemoveDuplicates;
