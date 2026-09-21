import { useEffect, useMemo, useState } from 'react';
import type { Change } from 'diff';
import { Segmented, CheckField } from '@/components/tool/Fields';
import { ClearButton, Stats, TextInput } from '@/components/tool/TextIO';
import { ProcessingState } from '@/components/tool/Feedback';
import type { ToolImplementation } from '../../types';

type Mode = 'lines' | 'words';
const MAX_CHARS = 200_000;

const TextDiff: ToolImplementation = () => {
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
    const t = window.setTimeout(() => {
      setChanges(mode === 'lines' ? lib.diffLines(a, b, { ignoreWhitespace: ignoreWs }) : lib.diffWordsWithSpace(a, b));
    }, 150);
    return () => window.clearTimeout(t);
  }, [lib, a, b, mode, ignoreWs, tooLarge]);

  const stats = useMemo(() => {
    if (!changes) return null;
    const count = (t: Change) => (mode === 'lines' ? t.count ?? 0 : t.value.trim() ? t.value.trim().split(/\s+/).length : 0);
    return {
      added: changes.filter((c) => c.added).reduce((n, c) => n + count(c), 0),
      removed: changes.filter((c) => c.removed).reduce((n, c) => n + count(c), 0),
    };
  }, [changes, mode]);

  const identical = changes && !changes.some((c) => c.added || c.removed);

  return (
    <div className="stack">
      <div className="two-col">
        <TextInput label="Original text" value={a} onChange={setA} rows={10} actions={<ClearButton onClick={() => setA('')} disabled={!a} />} />
        <TextInput label="Changed text" value={b} onChange={setB} rows={10} actions={<ClearButton onClick={() => setB('')} disabled={!b} />} />
      </div>
      <div className="row" style={{ gap: 20 }}>
        <Segmented
          label="Compare by"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'lines', label: 'Lines' },
            { value: 'words', label: 'Words' },
          ]}
        />
        {mode === 'lines' && <CheckField label="Ignore whitespace differences" checked={ignoreWs} onChange={setIgnoreWs} />}
      </div>
      {tooLarge && <p className="alert alert-warn">The combined text is over {MAX_CHARS.toLocaleString('en-US')} characters. Compare smaller sections to keep the page responsive.</p>}
      {!tooLarge && (a || b) && !changes && <ProcessingState label="Comparing…" />}
      {changes && stats && (
        <div className="stack" aria-live="polite">
          <Stats items={[{ label: mode === 'lines' ? 'Lines added' : 'Words added', value: stats.added }, { label: mode === 'lines' ? 'Lines removed' : 'Words removed', value: stats.removed }]} />
          {identical ? (
            <p className="alert alert-success">The two texts are identical.</p>
          ) : mode === 'lines' ? (
            <div className="diff-view" role="region" aria-label="Line differences" tabIndex={0}>
              {changes.flatMap((c, i) =>
                c.value
                  .replace(/\n$/, '')
                  .split('\n')
                  .map((line, j) => (
                    <div key={`${i}-${j}`} className={`diff-line ${c.added ? 'diff-add' : c.removed ? 'diff-del' : ''}`}>
                      <span className="visually-hidden">{c.added ? 'Added: ' : c.removed ? 'Removed: ' : 'Unchanged: '}</span>
                      {line || ' '}
                    </div>
                  )),
              )}
            </div>
          ) : (
            <div className="diff-view diff-inline" role="region" aria-label="Word differences" tabIndex={0}>
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
