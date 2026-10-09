import { useEffect, useMemo, useState } from 'react';
import type { Change } from 'diff';
import { Segmented, CheckField } from '@/components/tool/Fields';
import { ClearButton, Stats, TextInput } from '@/components/tool/TextIO';
import { ProcessingState } from '@/components/tool/Feedback';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

type Mode = 'lines' | 'words';
const MAX_CHARS = 200_000;

const TextDiff: ToolImplementation = () => {
  const { t } = useI18n();
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [mode, setMode] = useState<Mode>('lines');
  const [ignoreWs, setIgnoreWs] = useState(false);
  const [changes, setChanges] = useState<Change[] | null>(null);
  const [lib, setLib] = useState<typeof import('diff') | null>(null);
  const tooLarge = a.length + b.length > MAX_CHARS;

  // The diff library is loaded on demand, only once there is something to compare.
  useEffect(() => {
    if (lib || (!a && !b)) return;
    let cancelled = false;
    import('diff').then((m) => !cancelled && setLib(m));
    return () => {
      cancelled = true;
    };
  }, [a, b, lib]);

  useEffect(() => {
    if (!lib || tooLarge || (!a && !b)) {
      setChanges(null);
      return;
    }
    const timer = window.setTimeout(() => {
      setChanges(mode === 'lines' ? lib.diffLines(a, b, { ignoreWhitespace: ignoreWs }) : lib.diffWordsWithSpace(a, b));
    }, 150);
    return () => window.clearTimeout(timer);
  }, [lib, a, b, mode, ignoreWs, tooLarge]);

  const stats = useMemo(() => {
    if (!changes) return null;
    const count = (ch: Change) => (mode === 'lines' ? ch.count ?? 0 : ch.value.trim() ? ch.value.trim().split(/\s+/).length : 0);
    return {
      added: changes.filter((c) => c.added).reduce((n, c) => n + count(c), 0),
      removed: changes.filter((c) => c.removed).reduce((n, c) => n + count(c), 0),
    };
  }, [changes, mode]);

  const identical = changes && !changes.some((c) => c.added || c.removed);

  return (
    <div className="stack">
      <div className="two-col">
        <TextInput label={t('textDiff.original')} value={a} onChange={setA} rows={10} actions={<ClearButton onClick={() => setA('')} disabled={!a} />} />
        <TextInput label={t('textDiff.changed')} value={b} onChange={setB} rows={10} actions={<ClearButton onClick={() => setB('')} disabled={!b} />} />
      </div>
      <div className="row" style={{ gap: 20 }}>
        <Segmented
          label={t('textDiff.compareBy')}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'lines', label: t('textDiff.lines') },
            { value: 'words', label: t('textDiff.words') },
          ]}
        />
        {mode === 'lines' && <CheckField label={t('textDiff.ignoreWhitespace')} checked={ignoreWs} onChange={setIgnoreWs} />}
      </div>
      {tooLarge && <p className="alert alert-warn">{t('textDiff.tooLarge', { max: MAX_CHARS.toLocaleString('en-US') })}</p>}
      {!tooLarge && (a || b) && !changes && <ProcessingState label={t('textDiff.comparing')} />}
      {changes && stats && (
        <div className="stack" aria-live="polite">
          <Stats items={[{ label: mode === 'lines' ? t('textDiff.linesAdded') : t('textDiff.wordsAdded'), value: stats.added }, { label: mode === 'lines' ? t('textDiff.linesRemoved') : t('textDiff.wordsRemoved'), value: stats.removed }]} />
          {identical ? (
            <p className="alert alert-success">{t('textDiff.identical')}</p>
          ) : mode === 'lines' ? (
            <div className="diff-view" role="region" aria-label={t('textDiff.lineDifferences')} tabIndex={0}>
              {changes.flatMap((c, i) =>
                c.value
                  .replace(/\n$/, '')
                  .split('\n')
                  .map((line, j) => (
                    <div key={`${i}-${j}`} className={`diff-line ${c.added ? 'diff-add' : c.removed ? 'diff-del' : ''}`}>
                      <span className="visually-hidden">{c.added ? t('textDiff.added') : c.removed ? t('textDiff.removed') : t('textDiff.unchanged')}</span>
                      {line || ' '}
                    </div>
                  )),
              )}
            </div>
          ) : (
            <div className="diff-view diff-inline" role="region" aria-label={t('textDiff.wordDifferences')} tabIndex={0}>
              {changes.map((c, i) =>
                c.added ? <ins key={i}>{c.value}</ins> : c.removed ? <del key={i}>{c.value}</del> : <span key={i}>{c.value}</span>,
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextDiff;
