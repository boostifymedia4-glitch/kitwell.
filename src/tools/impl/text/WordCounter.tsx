import { useDeferredValue, useMemo, useState } from 'react';
import { ClearButton, Stats, TextInput } from '@/components/tool/TextIO';
import { formatMinutes, textStats } from '@/lib/text';
import type { ToolImplementation } from '../../types';

const WordCounter: ToolImplementation = () => {
  const [text, setText] = useState('');
  const deferred = useDeferredValue(text);
  const s = useMemo(() => textStats(deferred), [deferred]);
  return (
    <div className="stack">
      <Stats
        items={[
          { label: 'Words', value: s.words },
          { label: 'Characters', value: s.characters },
          { label: 'Characters (no spaces)', value: s.charactersNoSpaces },
          { label: 'Sentences', value: s.sentences },
          { label: 'Paragraphs', value: s.paragraphs },
          { label: 'Reading time', value: formatMinutes(s.readingMinutes) },
          { label: 'Speaking time', value: formatMinutes(s.speakingMinutes) },
        ]}
      />
      <TextInput label="Your text" value={text} onChange={setText} rows={14} prose placeholder="Type or paste your text here…" actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
    </div>
  );
};

export default WordCounter;
