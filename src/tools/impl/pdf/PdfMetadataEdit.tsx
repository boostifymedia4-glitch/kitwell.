import { useEffect, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Field } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { editMetadata, readEditableMetadata, type EditableMetadata } from '@/lib/pdfEdit';
import { loadPdf } from '@/lib/pdfOps';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const FIELDS: { key: keyof EditableMetadata; label: string; hint?: string }[] = [
  { key: 'title', label: 'pdfMetadataEdit.title' },
  { key: 'author', label: 'pdfMetadataEdit.author' },
  { key: 'subject', label: 'pdfMetadataEdit.subject' },
  { key: 'keywords', label: 'pdfMetadataEdit.keywords', hint: 'pdfMetadataEdit.keywordsHint' },
  { key: 'creator', label: 'pdfMetadataEdit.creator' },
  { key: 'producer', label: 'pdfMetadataEdit.producer' },
];

function Editor({ bytes, name, onReset }: { bytes: Uint8Array; name: string; onReset: () => void }) {
  const { t } = useI18n();
  const task = useTask<{ blob: Blob; cleared: boolean }>();
  const [values, setValues] = useState<EditableMetadata | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [touchModified, setTouchModified] = useState(true);
  const running = task.state.status === 'running';

  useEffect(() => {
    let cancelled = false;
    loadPdf(bytes)
      .then((doc) => !cancelled && setValues(readEditableMetadata(doc)))
      .catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [bytes]);

  const save = (clearAll: boolean) =>
    task.run(async () => {
      if (!values) throw new Error(t('pdfMetadataEdit.stillLoading'));
      const out = await editMetadata(bytes, values, { clearAll, touchModified });
      return { blob: new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' }), cleared: clearAll };
    });

  if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;
  if (!values) return <ProcessingState label={t('pdfMetadataEdit.reading')} />;

  return (
    <div className="stack">
      <div className="options-grid">
        {FIELDS.map((f) => (
          <Field key={f.key} label={t(f.label)} hint={f.hint ? t(f.hint) : undefined}>
            {(id) => <input id={id} className="input" value={values[f.key]} maxLength={500} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />}
          </Field>
        ))}
      </div>
      <CheckField label={t('pdfMetadataEdit.touchModified')} checked={touchModified} onChange={setTouchModified} />
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={() => save(false)} disabled={running}>
          <Icon name="pencil" size={18} />
          {t('pdfMetadataEdit.save')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => save(true)} disabled={running}>
          <Icon name="eraser" size={16} />
          {t('pdfMetadataEdit.removeAll')}
        </button>
      </div>
      {running && <ProcessingState label={t('pdfMetadataEdit.saving')} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <>
          <PdfResult
            blob={task.state.result.blob}
            name={`${baseName(name)}${task.state.result.cleared ? '-clean' : '-edited'}.pdf`}
            onReset={onReset}
            title={task.state.result.cleared ? t('pdfMetadataEdit.removed') : t('pdfMetadataEdit.ready')}
          />
          {task.state.result.cleared && <Notice>{t('pdfMetadataEdit.removedNotice')}</Notice>}
        </>
      )}
    </div>
  );
}

const PdfMetadataEdit: ToolImplementation = () => {
  const { pdf } = usePdfTool();
  return (
    <PdfSource pdf={pdf}>
      {(ready) => <Editor key={`${ready.file.name}-${ready.file.size}-${ready.file.lastModified}`} bytes={ready.bytes} name={ready.file.name} onReset={pdf.reset} />}
    </PdfSource>
  );
};

export default PdfMetadataEdit;
