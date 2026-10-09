import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import type { Progress } from '@/lib/hooks';
import { Icon } from '../Icon';

export function ErrorMessage({ children, onDismiss }: { children: ReactNode; onDismiss?: () => void }) {
  const { t } = useI18n();
  return (
    <div className="alert alert-error" role="alert">
      <Icon name="alert" size={18} />
      <div style={{ flex: 1 }}>{children}</div>
      {onDismiss && (
        <button type="button" className="icon-btn" style={{ width: 24, height: 24 }} aria-label={t('ui.dismiss')} onClick={onDismiss}>
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

export function RejectionList({ items, onDismiss }: { items: { name: string; reason: string }[]; onDismiss: () => void }) {
  const { t } = useI18n();
  if (items.length === 0) return null;
  return (
    <ErrorMessage onDismiss={onDismiss}>
      <p>
        <strong>{t('ui.rejected', { count: items.length })}</strong>
      </p>
      <ul style={{ paddingLeft: 18, marginTop: 4 }}>
        {items.slice(0, 5).map((r, i) => (
          <li key={`${r.name}-${i}`}>
            <span style={{ wordBreak: 'break-all' }}>{r.name}</span>: {r.reason}
          </li>
        ))}
        {items.length > 5 && <li>{t('ui.rejected.more', { count: items.length - 5 })}</li>}
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

export function ProcessingState({ label, progress }: { label?: string; progress?: Progress | null }) {
  const { t } = useI18n();
  const pct = progress && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : null;
  return (
    <div role="status" aria-live="polite" className="stack-sm">
      <div className="processing">
        <span className="spinner" aria-hidden="true" />
        <span>
          {progress?.label ?? label ?? t('ui.processing')}
          {progress && progress.total > 1 ? ` ${t('ui.progressCount', { done: progress.done, total: progress.total })}` : ''}
        </span>
      </div>
      {pct !== null && (
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={t('ui.progress')}>
          <span style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}

export function PrivacyNotice({ fileTool }: { fileTool: boolean }) {
  const { t } = useI18n();
  return (
    <div className="privacy-note">
      <Icon name="shield" size={18} />
      <p>
        {fileTool ? t('ui.privacyFile') : t('ui.privacyText')} <Link to="/privacy">{t('ui.privacyDetails')}</Link>
      </p>
    </div>
  );
}
