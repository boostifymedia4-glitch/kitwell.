import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { CopyButton } from '@/components/tool/CopyButton';
import { Notice, RejectionList } from '@/components/tool/Feedback';
import { FileList } from '@/components/tool/FileList';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { errorMessage } from '@/lib/format';
import { useFileQueue } from '@/lib/hooks';
import { classifyQr, scanImageFile, type Scanned } from '@/lib/qr';
import type { ToolImplementation } from '../../types';

type Scan = { status: 'scanning' } | { status: 'found'; scanned: Scanned } | { status: 'none' } | { status: 'error'; message: string };

const KIND_KEY: Record<Scanned['kind'], string> = {
  url: 'qrScanner.kind.url',
  wifi: 'qrScanner.kind.wifi',
  email: 'qrScanner.kind.email',
  phone: 'qrScanner.kind.phone',
  sms: 'qrScanner.kind.sms',
  'unsafe-link': 'qrScanner.kind.unsafeLink',
  text: 'qrScanner.kind.text',
};

function WifiDetails({ wifi }: { wifi: NonNullable<Scanned['wifi']> }) {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  return (
    <table className="table">
      <tbody>
        <tr>
          <th scope="row">{t('qrScanner.wifi.network')}</th>
          <td>{wifi.ssid || '—'}</td>
        </tr>
        <tr>
          <th scope="row">{t('qrScanner.wifi.security')}</th>
          <td>{wifi.security || '—'}</td>
        </tr>
        <tr>
          <th scope="row">{t('qrScanner.wifi.password')}</th>
          <td>
            {wifi.password ? (
              <span className="row" style={{ gap: 8 }}>
                <code>{show ? wifi.password : '••••••••'}</code>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShow((v) => !v)} aria-pressed={show}>
                  {show ? t('qrScanner.wifi.hide') : t('qrScanner.wifi.show')}
                </button>
                <CopyButton text={wifi.password} label={t('qrScanner.wifi.copyPassword')} />
              </span>
            ) : (
              '—'
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">{t('qrScanner.wifi.hidden')}</th>
          <td>{wifi.hidden ? t('qrScanner.wifi.yes') : t('qrScanner.wifi.no')}</td>
        </tr>
      </tbody>
    </table>
  );
}

function ScanResult({ scanned }: { scanned: Scanned }) {
  const { t } = useI18n();
  return (
    <div className="stack-sm">
      <span className="badge">{t(KIND_KEY[scanned.kind])}</span>
      {scanned.wifi && <WifiDetails wifi={scanned.wifi} />}
      <code className="scan-text">{scanned.text}</code>
      {scanned.kind === 'unsafe-link' && (
        <Notice tone="warn">{t('qrScanner.unsafe')}</Notice>
      )}
      <div className="toolbar">
        <CopyButton text={scanned.text} label={t('qrScanner.copyText')} />
        {scanned.href && (
          <a className="btn btn-secondary btn-sm" href={scanned.href} target="_blank" rel="noopener noreferrer nofollow">
            {t('qrScanner.openLink')} <Icon name="arrow-right" size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

const QrScanner: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: 10 }, true);
  const [scans, setScans] = useState<Record<string, Scan>>({});
  const started = useRef(new Set<string>());

  // Scan each newly added image once.
  useEffect(() => {
    for (const item of queue.items) {
      if (started.current.has(item.id)) continue;
      started.current.add(item.id);
      setScans((s) => ({ ...s, [item.id]: { status: 'scanning' } }));
      scanImageFile(item.file)
        .then((text) => setScans((s) => ({ ...s, [item.id]: text ? { status: 'found', scanned: classifyQr(text) } : { status: 'none' } })))
        .catch((err) => setScans((s) => ({ ...s, [item.id]: { status: 'error', message: errorMessage(err) } })));
    }
  }, [queue.items]);

  return (
    <div className="stack">
      <UploadDropzone
        extensions={IMAGE_EXTENSIONS}
        multiple
        maxBytes={MAX_IMAGE_BYTES}
        maxFiles={10}
        compact={queue.items.length > 0}
        title={queue.items.length ? t('qrScanner.addMore') : t('qrScanner.dropTitle')}
        onFiles={queue.add}
      />
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {queue.items.length === 0 && <p className="hint">{t('qrScanner.hint')}</p>}
      <FileList
        items={queue.items.map((i) => {
          const s = scans[i.id];
          return { ...i, status: s?.status === 'scanning' ? 'processing' : s?.status === 'found' ? 'done' : s ? 'error' : undefined, message: s?.status === 'none' ? t('qrScanner.none') : s?.status === 'error' ? s.message : undefined };
        })}
        kind="image"
        onRemove={queue.remove}
      />
      <div className="stack" aria-live="polite">
        {queue.items.map((i) => {
          const s = scans[i.id];
          if (s?.status !== 'found') return null;
          return (
            <section key={i.id} className="card info-card" aria-label={t('qrScanner.resultFor', { name: i.file.name })}>
              <h3 style={{ marginBottom: 'var(--space-3)', wordBreak: 'break-all' }}>{i.file.name}</h3>
              <ScanResult scanned={s.scanned} />
            </section>
          );
        })}
      </div>
      {queue.items.length > 0 && (
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={queue.clear}>
            {t('qrScanner.clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
