import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n';
import { withLang } from '@/i18n/routing';
import { formatBytes } from '@/lib/format';
import { ShareError, createShare, shareStatus, type ShareStatus } from '@/lib/share';
import { Icon } from '../Icon';
import { CopyButton } from './CopyButton';
import { ErrorMessage, Notice } from './Feedback';

interface Created {
  link: string;
  expiresAt: number;
  qr: string;
}

/**
 * "Get a share link": uploads the result to the server for a limited time and shows the link with a QR code. It only
 * appears when the server supports it, and nothing is uploaded until the button is pressed.
 */
export function ShareLink({ blob, name }: { blob: Blob; name: string }) {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState<ShareStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Created | null>(null);

  useEffect(() => {
    let live = true;
    void shareStatus().then((s) => live && setStatus(s));
    return () => {
      live = false;
    };
  }, []);
  // A different file (or a new name) needs a new link.
  useEffect(() => {
    setCreated(null);
    setError(null);
  }, [blob, name]);

  if (!status) return null;

  const create = async () => {
    setBusy(true);
    setError(null);
    try {
      const { id, expiresAt } = await createShare(blob, name, status);
      const link = `${window.location.origin}${withLang(`/share?id=${id}`, lang.code)}`;
      const { toDataURL } = await import('qrcode');
      const qr = await toDataURL(link, { margin: 1, width: 224, errorCorrectionLevel: 'M' });
      setCreated({ link, expiresAt, qr });
    } catch (err) {
      const code = err instanceof ShareError ? err.code : 'failed';
      setError(code === 'too_large' ? t('share.err.tooLarge', { max: formatBytes(status.maxBytes) }) : code === 'rate_limited' ? t('share.err.rateLimit') : t('share.err.failed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="stack-sm share-box">
      {!created && (
        <>
          <div className="toolbar">
            <button type="button" className="btn btn-secondary" onClick={create} disabled={busy} aria-busy={busy}>
              <Icon name="link" size={16} />
              {busy ? t('share.creating') : t('share.create')}
            </button>
          </div>
          <p className="hint">{t('share.hint', { hours: status.ttlHours })}</p>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {created && (
        <div className="stack-sm">
          <Notice tone="success">{t('share.ready', { time: new Intl.DateTimeFormat(lang.code, { dateStyle: 'medium', timeStyle: 'short' }).format(created.expiresAt) })}</Notice>
          <div className="field">
            <label className="label" htmlFor="share-link-url">
              {t('share.link')}
            </label>
            <div className="row" style={{ gap: 8 }}>
              <input id="share-link-url" className="input mono" readOnly value={created.link} onFocus={(e) => e.currentTarget.select()} style={{ flex: 1, minWidth: 0 }} />
              <CopyButton text={created.link} />
            </div>
          </div>
          <img src={created.qr} width={224} height={224} alt={t('share.qrAlt')} style={{ background: '#fff', borderRadius: 8, maxWidth: '100%', height: 'auto' }} />
          <p className="hint">{t('share.hint', { hours: status.ttlHours })}</p>
        </div>
      )}
    </div>
  );
}
