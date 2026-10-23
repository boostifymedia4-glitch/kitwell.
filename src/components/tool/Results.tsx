import { useState, type ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { downloadBlob, downloadZip, type NamedBlob } from '@/lib/download';
import { formatBytes } from '@/lib/format';
import { Icon } from '../Icon';
import { ErrorMessage } from './Feedback';
import { PdfPreview, pdfFileName, stemOf } from './PdfPreview';
import { CloudSave } from './CloudButtons';
import { ShareLink } from './ShareLink';

export function DownloadButton({ blob, name, label, variant = 'primary' }: { blob: Blob; name: string; label?: string; variant?: 'primary' | 'secondary' }) {
  const { t } = useI18n();
  return (
    <button type="button" className={`btn btn-${variant}`} onClick={() => downloadBlob(blob, name)}>
      <Icon name="download" size={16} />
      {label ?? t('ui.download')}
    </button>
  );
}

export function ResetButton({ onClick, label }: { onClick: () => void; label?: string }) {
  const { t } = useI18n();
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      <Icon name="rotate-ccw" size={16} />
      {label ?? t('ui.startOver')}
    </button>
  );
}

export function ResultPanel({ title, children }: { title?: string; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <section className="result-panel" aria-label={t('ui.result')} aria-live="polite">
      <div className="result-title">
        <Icon name="check-circle" size={20} />
        {title ?? t('ui.resultTitle')}
      </div>
      {children}
    </section>
  );
}

export interface ResultFile extends NamedBlob {
  note?: string;
}

/** Lists produced files with per-file download and a ZIP option for batches. */
export function ResultFiles({ files, zipName }: { files: ResultFile[]; zipName: string }) {
  const { t } = useI18n();
  const [zipError, setZipError] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);
  const [stems, setStems] = useState<Record<number, string>>({});
  const [previewing, setPreviewing] = useState<number | null>(null);
  const isPdf = (f: ResultFile) => f.blob.type === 'application/pdf' || /.pdf$/i.test(f.name);
  /** Name used for the download: the edited name for PDFs, the original otherwise. */
  const nameOf = (f: ResultFile, i: number) => (isPdf(f) && stems[i] !== undefined ? pdfFileName(stems[i], f.name) : f.name);

  const zip = async () => {
    setZipError(null);
    setZipping(true);
    try {
      await downloadZip(files.map((f, i) => ({ name: nameOf(f, i), blob: f.blob })), zipName);
    } catch {
      setZipError(t('ui.zipFailed'));
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="stack-sm">
      <ul className="result-list">
        {files.map((f, i) => (
          <li key={`${f.name}-${i}`} className="result-item" style={isPdf(f) ? { flexWrap: 'wrap' } : undefined}>
            <div className="file-meta">
              {isPdf(f) ? (
                <input className="input" value={stems[i] ?? stemOf(f.name)} onChange={(e) => setStems((cur) => ({ ...cur, [i]: e.target.value }))} aria-label={t('ui.fileName')} maxLength={120} spellCheck={false} />
              ) : (
                <div className="file-name" title={f.name}>
                  {f.name}
                </div>
              )}
              <div className="file-sub">
                {formatBytes(f.blob.size)}
                {f.note ? ` · ${f.note}` : ''}
              </div>
            </div>
            {isPdf(f) && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPreviewing(previewing === i ? null : i)} aria-expanded={previewing === i}>
                <Icon name="eye" size={14} />
                {previewing === i ? t('ui.hidePreview') : t('ui.showPreview')}
              </button>
            )}
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => downloadBlob(f.blob, nameOf(f, i))} aria-label={t('ui.downloadFile', { name: nameOf(f, i) })}>
              <Icon name="download" size={14} />
              {t('ui.download')}
            </button>
            {previewing === i && isPdf(f) && (
              <div style={{ flexBasis: '100%' }}>
                <PdfPreview blob={f.blob} />
              </div>
            )}
          </li>
        ))}
      </ul>
      {files.length > 1 && (
        <div className="toolbar">
          <button type="button" className="btn btn-primary" onClick={zip} disabled={zipping}>
            <Icon name="download" size={16} />
            {zipping ? t('ui.preparingZip') : t('ui.downloadAll', { count: files.length })}
          </button>
        </div>
      )}
      {zipError && <ErrorMessage>{zipError}</ErrorMessage>}
      {files.length === 1 && <CloudSave blob={files[0].blob} name={nameOf(files[0], 0)} />}
      {files.length === 1 && <ShareLink blob={files[0].blob} name={nameOf(files[0], 0)} />}
    </div>
  );
}

/** A produced PDF: preview, an editable file name, and the download button. `children` are extra buttons. */
export function PdfOutput({ blob, name, label, variant, children }: { blob: Blob; name: string; label?: (name: string) => string; variant?: 'primary' | 'secondary'; children?: ReactNode }) {
  const { t } = useI18n();
  const [stem, setStem] = useState(stemOf(name));
  const fileName = pdfFileName(stem, name);
  return (
    <>
      <PdfPreview blob={blob} />
      <div className="field">
        <label className="label" htmlFor="pdf-output-name">
          {t('ui.fileName')}
        </label>
        <div className="row" style={{ gap: 8, alignItems: 'center' }}>
          <input id="pdf-output-name" className="input" value={stem} onChange={(e) => setStem(e.target.value)} maxLength={120} spellCheck={false} style={{ flex: 1, minWidth: 0 }} />
          <span className="muted">.pdf</span>
        </div>
      </div>
      <div className="toolbar">
        <DownloadButton blob={blob} name={fileName} label={label ? label(fileName) : t('ui.downloadFile', { name: fileName })} variant={variant} />
        {children}
      </div>
      <CloudSave blob={blob} name={fileName} />
      <ShareLink blob={blob} name={fileName} />
    </>
  );
}

/** Result of a tool that produces one PDF: size, preview, file name, a download button, and a way to start over. */
export function PdfResult({ blob, name, onReset, title, note }: { blob: Blob; name: string; onReset: () => void; title?: string; note?: string }) {
  const { t } = useI18n();
  return (
    <ResultPanel title={title ?? t('ui.pdfReady')}>
      <p className="muted">
        {formatBytes(blob.size)}
        {note ? ` · ${note}` : ''}
      </p>
      <PdfOutput blob={blob} name={name}>
        <ResetButton onClick={onReset} />
      </PdfOutput>
    </ResultPanel>
  );
}
