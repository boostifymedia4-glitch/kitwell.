import { Fragment, useEffect, useMemo, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Field } from '@/components/tool/Fields';
import { OutputBox, Stats, TextInput } from '@/components/tool/TextIO';
import { MAX_REGEX_MATCHES, type RegexRun } from '@/lib/dev';
import { errorMessage } from '@/lib/format';
import { disposeRegexWorker, runRegexSafe } from '@/lib/regexRunner';
import type { ToolImplementation } from '../../types';

const FLAGS = [
  { flag: 'g', label: 'Global (g)' },
  { flag: 'i', label: 'Ignore case (i)' },
  { flag: 'm', label: 'Multiline (m)' },
  { flag: 's', label: 'Dot matches newline (s)' },
  { flag: 'u', label: 'Unicode (u)' },
];

const RegexTester: ToolImplementation = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [replacement, setReplacement] = useState('');
  const [showReplace, setShowReplace] = useState(false);
  const [run, setRun] = useState<RegexRun | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => disposeRegexWorker(), []);

  useEffect(() => {
    if (!pattern) {
      setRun(null);
      setFailure(null);
      return;
    }
    let stale = false;
    setBusy(true);
    const t = window.setTimeout(() => {
      runRegexSafe(pattern, flags, text, showReplace ? replacement : undefined)
        .then((r) => {
          if (stale) return;
          setRun(r);
          setFailure(null);
        })
        .catch((e) => {
          if (stale) return;
          setRun(null);
          setFailure(errorMessage(e));
        })
        .finally(() => !stale && setBusy(false));
    }, 200);
    return () => {
      stale = true;
      window.clearTimeout(t);
    };
  }, [pattern, flags, text, replacement, showReplace]);

  const toggleFlag = (f: string, on: boolean) => setFlags((cur) => (on ? cur + f : cur.replace(f, '')));

  const segments = useMemo(() => {
    if (!run || run.matches.length === 0) return null;
    const out: { text: string; match: boolean }[] = [];
    let pos = 0;
    for (const m of run.matches) {
      if (m.text.length === 0) continue;
      if (m.index > pos) out.push({ text: text.slice(pos, m.index), match: false });
      out.push({ text: m.text, match: true });
      pos = m.index + m.text.length;
    }
    out.push({ text: text.slice(pos), match: false });
    return out;
  }, [run, text]);

  const hasGroups = run?.matches.some((m) => m.groups.length > 0);

  return (
    <div className="stack">
      <Field label="Regular expression" hint="JavaScript syntax, without the surrounding slashes.">
        {(id) => (
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            <span className="mono muted">/</span>
            <input id={id} className="input mono" value={pattern} placeholder="(\d{4})-(\d{2})-(\d{2})" spellCheck={false} aria-invalid={Boolean(run?.error)} onChange={(e) => setPattern(e.target.value)} />
            <span className="mono muted">/{flags}</span>
          </div>
        )}
      </Field>
      <div className="row" style={{ gap: 18 }}>
        {FLAGS.map((f) => (
          <CheckField key={f.flag} label={f.label} checked={flags.includes(f.flag)} onChange={(v) => toggleFlag(f.flag, v)} />
        ))}
      </div>
      <TextInput label="Test text" value={text} onChange={setText} rows={8} placeholder="Paste the text to test against…" />
      {busy && pattern && <ProcessingState label="Matching…" />}
      {run?.error && <ErrorMessage>{run.error}</ErrorMessage>}
      {failure && <ErrorMessage>{failure}</ErrorMessage>}
      {run && !run.error && pattern && (
        <div className="stack" aria-live="polite">
          <Stats items={[{ label: 'Matches', value: run.matches.length + (run.truncated ? '+' : '') }]} />
          {run.truncated && <Notice tone="warn">Showing the first {MAX_REGEX_MATCHES.toLocaleString('en-US')} matches only.</Notice>}
          {!flags.includes('g') && run.matches.length > 0 && <p className="hint">Without the global flag, only the first match is shown.</p>}
          <div className="stack-sm">
            <span className="label">Highlighted matches</span>
            <div className="highlight-box" tabIndex={0} role="region" aria-label="Text with matches highlighted">
              {segments ? segments.map((s, i) => (s.match ? <mark key={i} className="match">{s.text}</mark> : <Fragment key={i}>{s.text}</Fragment>)) : text || <span className="subtle">No text to search.</span>}
            </div>
          </div>
          {run.matches.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: 60 }}>#</th>
                    <th scope="col" style={{ width: 90 }}>Index</th>
                    <th scope="col">Match</th>
                    {hasGroups && <th scope="col">Groups</th>}
                  </tr>
                </thead>
                <tbody>
                  {run.matches.slice(0, 200).map((m, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{m.index}</td>
                      <td className="mono">{m.text || <span className="subtle">(empty)</span>}</td>
                      {hasGroups && (
                        <td className="mono">
                          {m.groups.map((g, gi) => (
                            <div key={gi}>
                              ${gi + 1}: {g === undefined ? <span className="subtle">undefined</span> : g}
                            </div>
                          ))}
                          {Object.entries(m.named).map(([k, v]) => (
                            <div key={k}>
                              {k}: {v ?? <span className="subtle">undefined</span>}
                            </div>
                          ))}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {run.matches.length > 200 && <p className="hint">Table shows the first 200 matches.</p>}
            </div>
          )}
        </div>
      )}
      <CheckField label="Preview a replacement" checked={showReplace} onChange={setShowReplace} />
      {showReplace && (
        <div className="stack">
          <Field label="Replace with" hint="Use $1, $2 or $<name> to insert groups, and $& for the whole match.">
            {(id) => <input id={id} className="input mono" value={replacement} onChange={(e) => setReplacement(e.target.value)} />}
          </Field>
          <OutputBox label="Result" value={run?.replaced ?? ''} rows={6} placeholder="Enter a pattern and text to preview the replacement." />
        </div>
      )}
    </div>
  );
};

export default RegexTester;
