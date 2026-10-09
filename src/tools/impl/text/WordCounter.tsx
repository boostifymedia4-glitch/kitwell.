import { useDeferredValue, useMemo, useState } from 'react';
import { ClearButton, Stats, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { formatMinutes, textStats } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const WordCounter: ToolImplementation = () => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const deferred = useDeferredValue(text);
  const s = useMemo(() => textStats(deferred), [deferred]);
  return (
    <div className="stack">
      <Stats
        items={[
          { label: t('wordCounter.words'), value: s.words },
          { label: t('wordCounter.characters'), value: s.characters },
          { label: t('wordCounter.charactersNoSpaces'), value: s.charactersNoSpaces },
          { label: t('wordCounter.sentences'), value: s.sentences },
          { label: t('wordCounter.paragraphs'), value: s.paragraphs },
          { label: t('wordCounter.readingTime'), value: formatMinutes(s.readingMinutes) },
          { label: t('wordCounter.speakingTime'), value: formatMinutes(s.speakingMinutes) },
        ]}
      />
      <TextInput label={t('wordCounter.yourText')} value={text} onChange={setText} rows={14} prose placeholder={t('wordCounter.placeholder')} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
    </div>
  );
};

export default WordCounter;
