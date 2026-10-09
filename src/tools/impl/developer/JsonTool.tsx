import { useMemo, useState } from 'react';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { CheckField, SelectField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, Stats, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { describeJson, formatJson, minifyJson, parseJson, type JsonIssue } from '@/lib/dev';
import { formatBytes } from '@/lib/format';
import type { ToolImplementation } from '../../types';

const SAMPLE = '{"name":"Kitwell","tools":["json","pdf","image"],"free":true,"limits":{"upload":false,"maxFiles":20}}';

function IssueMessage({ issue, text }: { issue: JsonIssue; text: string }) {
  const { t } = useI18n();
  const line = text.split('\n')[issue.line - 1] ?? '';
  const start = Math.max(0, issue.column - 40);
  const excerpt = line.slice(start, issue.column + 40);
  return (
    <ErrorMessage>
      <p>
        <strong>{t('jsonTool.issueLocation', { line: issue.line, column: issue.column })}</strong> {issue.message}
      </p>
      {excerpt && (
        <pre style={{ margin: '6px 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {excerpt}
          {'\n'}
          {' '.repeat(Math.max(0, issue.column - 1 - start))}^
        </pre>
      )}
    </ErrorMessage>
  );
}

const JsonTool: ToolImplementation = ({ tool }) => {
  const { t } = useI18n();
  const mode = tool.config?.mode ?? 'format';
  const [text, setText] = useState('');
  const [indent, setIndent] = useState('2');
  const [sortKeys, setSortKeys] = useState(false);

  const analysis = useMemo(() => {
    if (!text.trim()) return null;
    if (mode === 'format') return { kind: 'text' as const, result: formatJson(text, indent === 'tab' ? 'tab' : Number(indent), sortKeys) };
    if (mode === 'minify') return { kind: 'text' as const, result: minifyJson(text) };
    return { kind: 'validate' as const, result: parseJson(text) };
  }, [text, mode, indent, sortKeys]);

  const output = analysis?.kind === 'text' && analysis.result.ok ? analysis.result.value : '';
  const error = analysis && !analysis.result.ok ? analysis.result.error : null;
  const bytes = (s: string) => new TextEncoder().encode(s).length;

  return (
    <div className="stack">
      <TextInput
        label={t('jsonTool.input')}
        value={text}
        onChange={setText}
        rows={12}
        invalid={Boolean(error)}
        placeholder={t('jsonTool.placeholder')}
        actions={
          <div className="row" style={{ gap: 4 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText(SAMPLE)}>
              {t('jsonTool.insertExample')}
            </button>
            <ClearButton onClick={() => setText('')} disabled={!text} />
          </div>
        }
      />
      {mode === 'format' && (
        <div className="options-grid">
          <SelectField
            label={t('jsonTool.indentation')}
            value={indent}
            onChange={setIndent}
            options={[
              { value: '2', label: t('jsonTool.spaces', { count: 2 }) },
              { value: '4', label: t('jsonTool.spaces', { count: 4 }) },
              { value: '8', label: t('jsonTool.spaces', { count: 8 }) },
              { value: 'tab', label: t('jsonTool.tab') },
            ]}
          />
          <CheckField label={t('jsonTool.sortKeys')} checked={sortKeys} onChange={setSortKeys} />
        </div>
      )}
      {error && <IssueMessage issue={error} text={text} />}
      {analysis?.kind === 'validate' && analysis.result.ok && (
        <div className="stack">
          <Notice tone="success">
            <strong>{t('jsonTool.validTitle')}</strong> {t('jsonTool.validBody')}
          </Notice>
          {(() => {
            const d = describeJson(analysis.result.value);
            return (
              <Stats
                items={[
                  { label: t('jsonTool.rootType'), value: d.type },
                  { label: t('jsonTool.contents'), value: d.summary },
                  { label: t('jsonTool.nestingDepth'), value: d.depth },
                  { label: t('jsonTool.size'), value: formatBytes(bytes(text)) },
                ]}
              />
            );
          })()}
        </div>
      )}
      {analysis?.kind === 'text' && analysis.result.ok && mode === 'minify' && (
        <Stats items={[{ label: t('jsonTool.before'), value: formatBytes(bytes(text)) }, { label: t('jsonTool.after'), value: formatBytes(bytes(output)) }, { label: t('jsonTool.saved'), value: `${Math.max(0, Math.round((1 - bytes(output) / bytes(text)) * 100))}%` }]} />
      )}
      {mode !== 'validate' && <OutputBox label={mode === 'format' ? t('jsonTool.formatted') : t('jsonTool.minified')} value={output} rows={12} filename={mode === 'format' ? 'formatted.json' : 'minified.json'} mime="application/json" />}
    </div>
  );
};

export default JsonTool;
