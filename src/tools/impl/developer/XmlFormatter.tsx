import { useMemo, useState } from 'react';
import { ErrorMessage } from '@/components/tool/Feedback';
import { Segmented, SelectField } from '@/components/tool/Fields';
import { ClearButton, OutputBox, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
import { formatXml } from '@/lib/dev';
import type { ToolImplementation } from '../../types';

const SAMPLE = '<?xml version="1.0"?><catalog><book id="1"><title>Example</title><price>9.99</price></book><book id="2"/></catalog>';

const XmlFormatter: ToolImplementation = () => {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indent, setIndent] = useState('2');
  const result = useMemo(() => (text.trim() ? formatXml(text, indent === 'tab' ? 'tab' : Number(indent), mode === 'minify') : null), [text, mode, indent]);

  return (
    <div className="stack">
      <TextInput
        label={t('xmlFormatter.input')}
        value={text}
        onChange={setText}
        rows={12}
        invalid={result?.ok === false}
        placeholder={t('xmlFormatter.placeholder')}
        actions={
          <div className="row" style={{ gap: 4 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText(SAMPLE)}>
              {t('xmlFormatter.insertExample')}
            </button>
            <ClearButton onClick={() => setText('')} disabled={!text} />
          </div>
        }
      />
      <div className="options-grid">
        <Segmented
          label={t('xmlFormatter.action')}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'format', label: t('xmlFormatter.format') },
            { value: 'minify', label: t('xmlFormatter.minify') },
          ]}
        />
        {mode === 'format' && (
          <SelectField
            label={t('xmlFormatter.indentation')}
            value={indent}
            onChange={setIndent}
            options={[
              { value: '2', label: t('xmlFormatter.spaces', { count: 2 }) },
              { value: '4', label: t('xmlFormatter.spaces', { count: 4 }) },
              { value: 'tab', label: t('xmlFormatter.tab') },
            ]}
          />
        )}
      </div>
      {result && !result.ok && (
        <ErrorMessage>
          <strong>{t('xmlFormatter.issueLocation', { line: result.error.line, column: result.error.column })}</strong> {result.error.message}
        </ErrorMessage>
      )}
      <OutputBox label={mode === 'format' ? t('xmlFormatter.formatted') : t('xmlFormatter.minified')} value={result?.ok ? result.value : ''} rows={12} filename="formatted.xml" mime="application/xml" />
    </div>
  );
};

export default XmlFormatter;
