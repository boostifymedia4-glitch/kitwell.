import { useState } from 'react';
import { useI18n } from '@/i18n';
import { CloudError, cloudConfigured, dropboxConfigured, googleConfigured, pickFromDropbox, pickFromGoogleDrive, saveToDropbox, saveToGoogleDrive, type CloudService } from '@/lib/cloud';
import { Icon } from '../Icon';
import { ErrorMessage, Notice } from './Feedback';

const SERVICE_KEY: Record<CloudService, string> = { google: 'cloud.google', dropbox: 'cloud.dropbox' };

/** "Or choose a file from Google Drive / Dropbox": only the services that are configured are offered. */
export function CloudPick({ extensions, multiple, onFiles, disabled }: { extensions: string[]; multiple: boolean; onFiles: (files: File[]) => void; disabled?: boolean }) {
  const { t } = useI18n();
  const [busy, setBusy] = useState<CloudService | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!cloudConfigured()) return null;

  const pick = async (service: CloudService) => {
    setBusy(service);
    setError(null);
    try {
      const files = await (service === 'google' ? pickFromGoogleDrive : pickFromDropbox)({ extensions, multiple });
      if (files.length) onFiles(files);
    } catch (err) {
      if (!(err instanceof CloudError && err.kind === 'cancelled')) setError(t('cloud.pickFailed', { service: t(SERVICE_KEY[service]) }));
    } finally {
      setBusy(null);
    }
  };

  const services: CloudService[] = [...(googleConfigured() ? (['google'] as const) : []), ...(dropboxConfigured() ? (['dropbox'] as const) : [])];
  return (
    <div className="stack-sm" style={{ marginTop: 'var(--space-3)' }}>
      <div className="row" style={{ gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="hint">{t('cloud.or')}</span>
        {services.map((s) => (
          <button key={s} type="button" className="btn btn-secondary btn-sm" onClick={() => pick(s)} disabled={disabled || busy !== null} aria-busy={busy === s}>
            <Icon name="upload" size={14} />
            {t(SERVICE_KEY[s])}
          </button>
        ))}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

/** "Save to Google Drive / Dropbox" for a finished file. */
export function CloudSave({ blob, name }: { blob: Blob; name: string }) {
  const { t } = useI18n();
  const [busy, setBusy] = useState<CloudService | null>(null);
  const [saved, setSaved] = useState<CloudService | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!cloudConfigured()) return null;

  const save = async (service: CloudService) => {
    setBusy(service);
    setSaved(null);
    setError(null);
    try {
      await (service === 'google' ? saveToGoogleDrive : saveToDropbox)(blob, name);
      setSaved(service);
    } catch (err) {
      if (!(err instanceof CloudError && err.kind === 'cancelled')) setError(t('cloud.saveFailed', { service: t(SERVICE_KEY[service]) }));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="stack-sm">
      <div className="toolbar">
        {googleConfigured() && (
          <button type="button" className="btn btn-secondary" onClick={() => save('google')} disabled={busy !== null}>
            <Icon name="upload" size={16} />
            {busy === 'google' ? t('cloud.saving', { service: t('cloud.google') }) : t('cloud.saveGoogle')}
          </button>
        )}
        {dropboxConfigured() && (
          <button type="button" className="btn btn-secondary" onClick={() => save('dropbox')} disabled={busy !== null}>
            <Icon name="upload" size={16} />
            {busy === 'dropbox' ? t('cloud.saving', { service: t('cloud.dropbox') }) : t('cloud.saveDropbox')}
          </button>
        )}
      </div>
      {saved && <Notice tone="success">{t('cloud.saved', { service: t(SERVICE_KEY[saved]) })}</Notice>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
