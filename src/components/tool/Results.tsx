import { useState, type ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { downloadBlob, downloadZip, type NamedBlob } from '@/lib/download';
import { formatBytes } from '@/lib/format';
import { Icon } from '../Icon';
import { ErrorMessage } from './Feedback';

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

  const zip = async () => {
    setZipError(null);
    setZipping(true);
    try {
      await downloadZip(files, zipName);
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
          <li key={`${f.name}-${i}`} className="result-item">
            <div className="file-meta">
              <div className="file-name" title={f.name}>
                {f.name}
              </div>
              <div className="file-sub">
                {formatBytes(f.blob.size)}
                {f.note ? ` · ${f.note}` : ''}
              </div>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => downloadBlob(f.blob, f.name)} aria-label={t('ui.downloadFile', { name: f.name })}>
              <Icon name="download" size={14} />
              {t('ui.download')}
            </button>
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
    </div>
  );
}

/** Result of a tool that produces one PDF: size, a download button, and a way to start over. */
export function PdfResult({ blob, name, onReset, title, note }: { blob: Blob; name: string; onReset: () => void; title?: string; note?: string }) {
  const { t } = useI18n();
  return (
    <ResultPanel title={title ?? t('ui.pdfReady')}>
      <p className="muted">
        {formatBytes(blob.size)}
        {note ? ` · ${note}` : ''}
      </p>
      <div className="toolbar">
        <DownloadButton blob={blob} name={name} label={t('ui.downloadFile', { name })} />
        <ResetButton onClick={onReset} />
      </div>
    </ResultPanel>
  );
}
