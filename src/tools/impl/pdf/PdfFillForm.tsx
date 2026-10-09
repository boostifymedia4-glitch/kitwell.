import { useEffect, useId, useMemo, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage } from '@/lib/format';
import { fieldIsFillable, fillForm, readFormFields, type FieldValue, type FormField, type FormInfo } from '@/lib/pdfForms';
import { usePdfTool } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

function sameValue(a: FieldValue, b: FieldValue) {
  return Array.isArray(a) && Array.isArray(b) ? a.length === b.length && a.every((v, i) => v === b[i]) : a === b;
}

function FieldControl({ field, value, onChange }: { field: FormField; value: FieldValue; onChange: (v: FieldValue) => void }) {
  const { t } = useI18n();
  const id = useId();
  const disabled = !fieldIsFillable(field);
  const label = (
    <label className="label" htmlFor={id}>
      {field.name}
      {field.required && <span aria-label={t('pdfFillForm.required')}> *</span>}
      {field.readOnly && <span className="hint"> {t('pdfFillForm.readOnly')}</span>}
    </label>
  );

  if (field.kind === 'checkbox') {
    return (
      <div className="form-field">
        <CheckField label={field.name + (field.required ? ' *' : '')} checked={value === true} onChange={onChange} disabled={disabled} />
      </div>
    );
  }
  if (field.kind === 'radio') {
    return (
      <fieldset className="form-field" disabled={disabled} style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label">
          {field.name}
          {field.required && ' *'}
        </legend>
        <div className="row" style={{ gap: 16 }}>
          {field.options.map((o) => (
            <label key={o} className="check-inline">
              <input type="radio" name={`${id}-radio`} checked={value === o} onChange={() => onChange(o)} /> {o}
            </label>
          ))}
          {value !== '' && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange('')}>
              {t('pdfFillForm.clear')}
            </button>
          )}
        </div>
      </fieldset>
    );
  }
  if (field.kind === 'dropdown' && !field.multiselect) {
    return (
      <div className="form-field">
        {label}
        <select id={id} className="select" value={String(value)} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
          <option value="">{t('pdfFillForm.none')}</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (field.kind === 'dropdown' || field.kind === 'list') {
    const selected = Array.isArray(value) ? value : value ? [String(value)] : [];
    return (
      <fieldset className="form-field" disabled={disabled} style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label">
          {field.name}
          {field.multiselect ? ` ${t('pdfFillForm.chooseAny')}` : ''}
        </legend>
        <div className="stack-sm">
          {field.options.map((o) => (
            <label key={o} className="check-inline">
              <input
                type={field.multiselect ? 'checkbox' : 'radio'}
                name={`${id}-list`}
                checked={selected.includes(o)}
                onChange={(e) => onChange(field.multiselect ? (e.target.checked ? [...selected, o] : selected.filter((s) => s !== o)) : [o])}
              />{' '}
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  if (field.kind === 'text') {
    return (
      <div className="form-field">
        {label}
        {field.multiline ? (
          <textarea id={id} className="textarea" rows={3} value={String(value)} maxLength={field.maxLength} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input id={id} className="input" value={String(value)} maxLength={field.maxLength} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
        )}
        {field.maxLength !== undefined && <span className="hint">{t('pdfFillForm.characters', { count: String(value).length, max: field.maxLength })}</span>}
      </div>
    );
  }
  return (
    <div className="form-field">
      <span className="label">{field.name}</span>
      <span className="hint">{field.kind === 'signature' ? t('pdfFillForm.signatureField') : t('pdfFillForm.cannotFill')}</span>
    </div>
  );
}

const PdfFillForm: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool();
  const [info, setInfo] = useState<FormInfo | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, FieldValue>>({});
  const [flatten, setFlatten] = useState(false);

  const file = pdf.state.status === 'ready' ? pdf.state.file : null;
  const bytes = pdf.state.status === 'ready' ? pdf.state.bytes : null;
  useEffect(() => {
    setInfo(null);
    setLoadError(null);
    setValues({});
    if (!bytes) return;
    let cancelled = false;
    readFormFields(bytes)
      .then((i) => {
        if (cancelled) return;
        setInfo(i);
        setValues(Object.fromEntries(i.fields.map((f) => [f.name, f.value])));
      })
      .catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [bytes]);

  const changed = useMemo(() => (info ? info.fields.filter((f) => fieldIsFillable(f) && !sameValue(values[f.name], f.value)).length : 0), [info, values]);
  const byPage = useMemo(() => {
    const groups = new Map<number | undefined, FormField[]>();
    for (const f of info?.fields ?? []) groups.set(f.page, [...(groups.get(f.page) ?? []), f]);
    return [...groups.entries()].sort((a, b) => (a[0] ?? 9999) - (b[0] ?? 9999));
  }, [info]);

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async () => {
            const send: Record<string, FieldValue> = {};
            for (const f of info?.fields ?? []) if (fieldIsFillable(f) && !sameValue(values[f.name], f.value)) send[f.name] = values[f.name];
            const out = await fillForm(ready.bytes, send, { flatten });
            return new Blob([out as BlobPart], { type: 'application/pdf' });
          });

        if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;
        if (!info) return <ProcessingState label={t('pdfFillForm.looking')} />;
        if (info.fields.length === 0) {
          return (
            <Notice tone="warn">
              <strong>{t('pdfFillForm.noFields')}</strong>{' '}
              {info.xfa ? t('pdfFillForm.xfaOnly') : t('pdfFillForm.flatDocument')}
            </Notice>
          );
        }
        const title = (page: number | undefined) => (page ? t('pdfFillForm.page', { page }) : t('pdfFillForm.otherFields'));
        return (
          <>
            {info.xfa && <Notice tone="warn">{t('pdfFillForm.xfaAlso')}</Notice>}
            <p className="hint">
              {changed > 0 ? t('pdfFillForm.foundChanged', { count: info.fillable, changed }) : t('pdfFillForm.found', { count: info.fillable })}
            </p>
            {byPage.map(([page, fields]) => (
              <section key={page ?? 'none'} className="form-section" aria-label={title(page)}>
                <h3>{title(page)}</h3>
                <div className="form-grid">
                  {fields.map((f) => (
                    <FieldControl key={f.name} field={f} value={values[f.name] ?? ''} onChange={(v) => setValues((cur) => ({ ...cur, [f.name]: v }))} />
                  ))}
                </div>
              </section>
            ))}
            <CheckField label={t('pdfFillForm.flatten')} checked={flatten} onChange={setFlatten} />
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="text-cursor" size={18} />
                {changed > 0 || flatten ? t('pdfFillForm.saveFilled') : t('pdfFillForm.save')}
              </button>
            </div>
            {running && <ProcessingState label={t('pdfFillForm.filling')} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && (
              <PdfResult blob={task.state.result} name={`${baseName(file?.name ?? 'form')}-filled.pdf`} onReset={reset} note={flatten ? t('pdfFillForm.noteFlattened') : t('pdfFillForm.noteEditable')} />
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfFillForm;
