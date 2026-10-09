import { useMemo, useState } from 'react';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { convertCase, type CaseMode } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const MODES: { value: CaseMode; key: string }[] = [
  { value: 'upper', key: 'caseConverter.mode.upper' },
  { value: 'lower', key: 'caseConverter.mode.lower' },
  { value: 'title', key: 'caseConverter.mode.title' },
  { value: 'sentence', key: 'caseConverter.mode.sentence' },
  { value: 'camel', key: 'caseConverter.mode.camel' },
  { value: 'pascal', key: 'caseConverter.mode.pascal' },
  { value: 'snake', key: 'caseConverter.mode.snake' },
  { value: 'kebab', key: 'caseConverter.mode.kebab' },
  { value: 'constant', key: 'caseConverter.mode.constant' },
  { value: 'toggle', key: 'caseConverter.mode.toggle' },
];

const CaseConverter: ToolImplementation = () => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [mode, setMode] = useState<CaseMode>('title');
  const output = useMemo(() => convertCase(text, mode), [text, mode]);
  return (
    <div className="stack">
      <TextInput label={t('caseConverter.yourText')} value={text} onChange={setText} rows={8} prose placeholder={t('caseConverter.placeholder')} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
      <div className="field" role="group" aria-label={t('caseConverter.chooseCase')}>
        <span className="label">{t('caseConverter.convertTo')}</span>
        <div className="toolbar">
          {MODES.map((m) => (
            <button key={m.value} type="button" className={`btn btn-sm ${mode === m.value ? 'btn-primary' : 'btn-secondary'}`} aria-pressed={mode === m.value} onClick={() => setMode(m.value)}>
              {t(m.key)}
            </button>
          ))}
        </div>
      </div>
      <OutputBox label={t('caseConverter.result')} value={output} rows={8} prose filename="converted.txt" />
    </div>
  );
};

export default CaseConverter;
