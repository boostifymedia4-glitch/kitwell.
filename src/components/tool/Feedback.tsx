import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Progress } from '@/lib/hooks';
import { Icon } from '../Icon';

export function ErrorMessage({ children, onDismiss }: { children: ReactNode; onDismiss?: () => void }) {
  return (
    <div className="alert alert-error" role="alert">
      <Icon name="alert" size={18} />
      <div style={{ flex: 1 }}>{children}</div>
      {onDismiss && (
        <button type="button" className="icon-btn" style={{ width: 24, height: 24 }} aria-label="Dismiss message" onClick={onDismiss}>
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

export function RejectionList({ items, onDismiss }: { items: { name: string; reason: string }[]; onDismiss: () => void }) {
  if (items.length === 0) return null;
  return (
    <ErrorMessage onDismiss={onDismiss}>
      <p>
        <strong>{items.length === 1 ? 'A file was not added:' : `${items.length} files were not added:`}</strong>
      </p>
      <ul style={{ paddingLeft: 18, marginTop: 4 }}>
        {items.slice(0, 5).map((r, i) => (
          <li key={`${r.name}-${i}`}>
            <span style={{ wordBreak: 'break-all' }}>{r.name}</span>: {r.reason}
          </li>
        ))}
        {items.length > 5 && <li>…and {items.length - 5} more.</li>}
      </ul>
    </ErrorMessage>
  );
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn' | 'success'; children: ReactNode }) {
  return (
    <div className={`alert alert-${tone}`} role={tone === 'info' ? undefined : 'status'}>
      <Icon name={tone === 'success' ? 'check-circle' : tone === 'warn' ? 'warning' : 'info'} size={18} />
      <div>{children}</div>
    </div>
  );
}

export function ProcessingState({ label = 'Processing…', progress }: { label?: string; progress?: Progress | null }) {
  const pct = progress && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : null;
  return (
    <div role="status" aria-live="polite" className="stack-sm">
      <div className="processing">
        <span className="spinner" aria-hidden="true" />
        <span>
          {progress?.label ?? label}
          {progress && progress.total > 1 ? ` (${progress.done} of ${progress.total})` : ''}
        </span>
      </div>
      {pct !== null && (
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress">
          <span style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}

export function PrivacyNotice({ fileTool }: { fileTool: boolean }) {
  return (
    <div className="privacy-note">
      <Icon name="shield" size={18} />
      <p>
        {fileTool
          ? 'Your files are processed locally in your browser. This tool does not upload them to our servers.'
          : 'What you type or paste is processed locally in your browser and is not sent to our servers.'}{' '}
        <Link to="/privacy">Privacy details</Link>
      </p>
    </div>
  );
}
