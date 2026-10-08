import { useEffect, useRef, useState } from 'react';
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

const KIND_LABEL: Record<Scanned['kind'], string> = {
  url: 'Web link',
  wifi: 'Wi-Fi network',
  email: 'Email',
  phone: 'Phone number',
  sms: 'SMS',
  'unsafe-link': 'Script or data link',
  text: 'Text',
};

function WifiDetails({ wifi }: { wifi: NonNullable<Scanned['wifi']> }) {
  const [show, setShow] = useState(false);
  return (
    <table className="table">
      <tbody>
        <tr>
          <th scope="row">Network</th>
          <td>{wifi.ssid || '—'}</td>
        </tr>
        <tr>
          <th scope="row">Security</th>
          <td>{wifi.security || '—'}</td>
        </tr>
        <tr>
          <th scope="row">Password</th>
          <td>
            {wifi.password ? (
              <span className="row" style={{ gap: 8 }}>
                <code>{show ? wifi.password : '••••••••'}</code>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShow((v) => !v)} aria-pressed={show}>
                  {show ? 'Hide' : 'Show'}
                </button>
                <CopyButton text={wifi.password} label="Copy password" />
              </span>
            ) : (
              '—'
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">Hidden network</th>
          <td>{wifi.hidden ? 'Yes' : 'No'}</td>
        </tr>
      </tbody>
    </table>
  );
}

function ScanResult({ scanned }: { scanned: Scanned }) {
  return (
    <div className="stack-sm">
      <span className="badge">{KIND_LABEL[scanned.kind]}</span>
      {scanned.wifi && <WifiDetails wifi={scanned.wifi} />}
      <code className="scan-text">{scanned.text}</code>
      {scanned.kind === 'unsafe-link' && (
        <Notice tone="warn">This code contains a script or data link. It is shown as text only and is never opened from here.</Notice>
      )}
      <div className="toolbar">
        <CopyButton text={scanned.text} label="Copy text" />
        {scanned.href && (
          <a className="btn btn-secondary btn-sm" href={scanned.href} target="_blank" rel="noopener noreferrer nofollow">
            Open link <Icon name="arrow-right" size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

const QrScanner: ToolImplementation = () => {
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
        title={queue.items.length ? 'Add more images' : 'Drop images with QR codes here or click to choose'}
        onFiles={queue.add}
      />
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {queue.items.length === 0 && <p className="hint">Photos and screenshots both work. Make sure the whole code is visible, with a clear margin around it.</p>}
      <FileList
        items={queue.items.map((i) => {
          const s = scans[i.id];
          return { ...i, status: s?.status === 'scanning' ? 'processing' : s?.status === 'found' ? 'done' : s ? 'error' : undefined, message: s?.status === 'none' ? 'No QR code found' : s?.status === 'error' ? s.message : undefined };
        })}
        kind="image"
        onRemove={queue.remove}
      />
      <div className="stack" aria-live="polite">
        {queue.items.map((i) => {
          const s = scans[i.id];
          if (s?.status !== 'found') return null;
          return (
            <section key={i.id} className="card info-card" aria-label={`Result for ${i.file.name}`}>
              <h3 style={{ marginBottom: 'var(--space-3)', wordBreak: 'break-all' }}>{i.file.name}</h3>
              <ScanResult scanned={s.scanned} />
            </section>
          );
        })}
      </div>
      {queue.items.length > 0 && (
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={queue.clear}>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
