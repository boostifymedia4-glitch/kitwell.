import { useState, type ReactNode } from 'react';
import { downloadBlob, downloadZip, type NamedBlob } from '@/lib/download';
import { formatBytes } from '@/lib/format';
import { Icon } from '../Icon';
import { ErrorMessage } from './Feedback';

export function DownloadButton({ blob, name, label, variant = 'primary' }: { blob: Blob; name: string; label?: string; variant?: 'primary' | 'secondary' }) {
  return (
    <button type="button" className={`btn btn-${variant}`} onClick={() => downloadBlob(blob, name)}>
      <Icon name="download" size={16} />
      {label ?? 'Download'}
    </button>
  );
}

export function ResetButton({ onClick, label = 'Start over' }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      <Icon name="rotate-ccw" size={16} />
      {label}
    </button>
  );
}

export function ResultPanel({ title = 'Done', children }: { title?: string; children: ReactNode }) {
  return (
    <section className="result-panel" aria-label="Result" aria-live="polite">
      <div className="result-title">
        <Icon name="check-circle" size={20} />
        {title}
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
  const [zipError, setZipError] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);

  const zip = async () => {
    setZipError(null);
    setZipping(true);
    try {
      await downloadZip(files, zipName);
    } catch {
      setZipError('The ZIP file could not be created, probably because the files are too large for your device’s memory. Download the files individually instead.');
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
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => downloadBlob(f.blob, f.name)} aria-label={`Download ${f.name}`}>
              <Icon name="download" size={14} />
              Download
            </button>
          </li>
        ))}
      </ul>
      {files.length > 1 && (
        <div className="toolbar">
          <button type="button" className="btn btn-primary" onClick={zip} disabled={zipping}>
            <Icon name="download" size={16} />
            {zipping ? 'Preparing ZIP…' : `Download all (${files.length}) as ZIP`}
          </button>
        </div>
      )}
      {zipError && <ErrorMessage>{zipError}</ErrorMessage>}
    </div>
  );
}
