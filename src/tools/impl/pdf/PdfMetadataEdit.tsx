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
import type { ToolImplementation } from '../../types';

const FIELDS: { key: keyof EditableMetadata; label: string; hint?: string }[] = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'subject', label: 'Subject' },
  { key: 'keywords', label: 'Keywords', hint: 'Separate with commas.' },
  { key: 'creator', label: 'Created with (application)' },
  { key: 'producer', label: 'Producer (PDF library)' },
];

function Editor({ bytes, name, onReset }: { bytes: Uint8Array; name: string; onReset: () => void }) {
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
      if (!values) throw new Error('The PDF is still loading.');
      const out = await editMetadata(bytes, values, { clearAll, touchModified });
      return { blob: new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' }), cleared: clearAll };
    });

  if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;
  if (!values) return <ProcessingState label="Reading properties…" />;

  return (
    <div className="stack">
      <div className="options-grid">
        {FIELDS.map((f) => (
          <Field key={f.key} label={f.label} hint={f.hint}>
            {(id) => <input id={id} className="input" value={values[f.key]} maxLength={500} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />}
          </Field>
        ))}
      </div>
      <CheckField label="Update the modified date" checked={touchModified} onChange={setTouchModified} />
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={() => save(false)} disabled={running}>
          <Icon name="pencil" size={18} />
          Save changes
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => save(true)} disabled={running}>
          <Icon name="eraser" size={16} />
          Remove all metadata
        </button>
      </div>
      {running && <ProcessingState label="Saving…" />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <>
          <PdfResult
            blob={task.state.result.blob}
            name={`${baseName(name)}${task.state.result.cleared ? '-clean' : '-edited'}.pdf`}
            onReset={onReset}
            title={task.state.result.cleared ? 'All metadata removed' : 'Your updated PDF is ready'}
          />
          {task.state.result.cleared && <Notice>Document properties and embedded XMP metadata were removed. Page text, images and comments are unchanged.</Notice>}
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
