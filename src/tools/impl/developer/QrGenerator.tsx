import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { CheckField, ColorField, Field, NumberField, Segmented, SelectField } from '@/components/tool/Fields';
import { Icon } from '@/components/Icon';
import { downloadBlob } from '@/lib/download';
import {
  QrError, emailPayload, phonePayload, qrContrast, qrMatrix, qrOutputSize, qrPixels, qrSvg, wifiPayload, type ErrorCorrection,
} from '@/lib/qr';
import type { ToolImplementation } from '../../types';

type Kind = 'text' | 'wifi' | 'email' | 'phone';

const LEVELS: { value: ErrorCorrection; label: string }[] = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];

const SIZES = ['256', '512', '1024', '2048'].map((v) => ({ value: v, label: `About ${v} px` }));

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
};

const QrGenerator: ToolImplementation = () => {
  const [kind, setKind] = useState<Kind>('text');
  const [text, setText] = useState('https://');
  const [ssid, setSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [security, setSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);
  const [mailTo, setMailTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState<ErrorCorrection>('M');
  const [size, setSize] = useState('512');
  const [margin, setMargin] = useState<number | ''>(4);
  const [dark, setDark] = useState('#000000');
  const [light, setLight] = useState('#ffffff');
  const [showPw, setShowPw] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const untouched = (kind === 'text' && (text.trim() === '' || text === 'https://')) || (kind === 'wifi' && !ssid) || (kind === 'email' && !mailTo) || (kind === 'phone' && !phone);

  // Everything derived from the form: the payload, and the QR matrix built from it.
  const built = useMemo(() => {
    if (untouched) return { payload: '', matrix: null, error: null as string | null };
    try {
      const payload =
        kind === 'text' ? text : kind === 'wifi' ? wifiPayload({ ssid, password: wifiPassword, security, hidden }) : kind === 'email' ? emailPayload(mailTo, subject, body) : phonePayload(phone);
      return { payload, matrix: qrMatrix(payload, level), error: null };
    } catch (e) {
      return { payload: '', matrix: null, error: e instanceof QrError ? e.message : 'Could not create this QR code.' };
    }
  }, [untouched, kind, text, ssid, wifiPassword, security, hidden, mailTo, subject, body, phone, level]);

  const render = { margin: margin === '' ? 4 : Math.min(8, Math.max(0, margin)), dark, light };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !built.matrix) return;
    const px = qrPixels(built.matrix, render, 512);
    canvas.width = px.width;
    canvas.height = px.height;
    canvas.getContext('2d')?.putImageData(new ImageData(px.data, px.width, px.height), 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [built.matrix, render.margin, render.dark, render.light]);

  const contrast = qrContrast(dark, light);
  const inverted = luminance(dark) > luminance(light);
  const finalSize = built.matrix ? qrOutputSize(built.matrix, render.margin, Number(size)).size : 0;

  const downloadPng = () => {
    if (!built.matrix) return;
    const px = qrPixels(built.matrix, render, Number(size));
    const canvas = document.createElement('canvas');
    canvas.width = px.width;
    canvas.height = px.height;
    canvas.getContext('2d')?.putImageData(new ImageData(px.data, px.width, px.height), 0, 0);
    canvas.toBlob((b) => b && downloadBlob(b, `qr-code-${px.width}px.png`), 'image/png');
  };
  const downloadSvg = () => {
    if (built.matrix) downloadBlob(new Blob([qrSvg(built.matrix, render)], { type: 'image/svg+xml' }), 'qr-code.svg');
  };

  return (
    <div className="stack">
      <Segmented
        label="QR code content"
        value={kind}
        onChange={setKind}
        options={[
          { value: 'text', label: 'Link or text' },
          { value: 'wifi', label: 'Wi-Fi' },
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
        ]}
      />
      <div className="two-col" style={{ alignItems: 'start' }}>
        <div className="stack">
          {kind === 'text' && (
            <Field label="Link or text" hint="Include https:// for web addresses so phones open them as links.">
              {(id) => <textarea id={id} className="textarea prose-font" rows={4} style={{ minHeight: 110 }} value={text} onChange={(e) => setText(e.target.value)} />}
            </Field>
          )}
          {kind === 'wifi' && (
            <>
              <Field label="Network name (SSID)">{(id) => <input id={id} className="input" value={ssid} maxLength={32} autoComplete="off" onChange={(e) => setSsid(e.target.value)} />}</Field>
              <SelectField
                label="Security"
                value={security}
                onChange={setSecurity}
                options={[
                  { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
                  { value: 'WEP', label: 'WEP (old)' },
                  { value: 'nopass', label: 'No password' },
                ]}
              />
              {security !== 'nopass' && (
                <Field label="Password">
                  {(id) => <input id={id} className="input" type={showPw ? 'text' : 'password'} autoComplete="off" spellCheck={false} value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} />}
                </Field>
              )}
              {security !== 'nopass' && <CheckField label="Show password" checked={showPw} onChange={setShowPw} />}
              <CheckField label="Hidden network" checked={hidden} onChange={setHidden} />
            </>
          )}
          {kind === 'email' && (
            <>
              <Field label="Email address">{(id) => <input id={id} className="input" type="email" value={mailTo} onChange={(e) => setMailTo(e.target.value)} />}</Field>
              <Field label="Subject (optional)">{(id) => <input id={id} className="input" value={subject} onChange={(e) => setSubject(e.target.value)} />}</Field>
              <Field label="Message (optional)">{(id) => <textarea id={id} className="textarea prose-font" rows={3} style={{ minHeight: 80 }} value={body} onChange={(e) => setBody(e.target.value)} />}</Field>
            </>
          )}
          {kind === 'phone' && (
            <Field label="Phone number" hint="Digits with an optional leading +, for example +923001234567.">
              {(id) => <input id={id} className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />}
            </Field>
          )}

          <div className="options-grid">
            <SelectField label="Error correction" value={level} onChange={setLevel} options={LEVELS} hint="Higher survives more damage but makes a denser code." />
            <SelectField label="Image size" value={size} onChange={setSize} options={SIZES} />
            <NumberField label="Quiet border (modules)" value={margin} min={0} max={8} onChange={setMargin} hint="4 is the standard." />
            <ColorField label="Code colour" value={dark} onChange={setDark} />
            <ColorField label="Background" value={light} onChange={setLight} />
          </div>
          {(inverted || contrast < 3) && (
            <Notice tone="warn">
              {inverted
                ? 'Light code on a dark background is not read by every scanner. Dark on light is safest.'
                : 'These colours have low contrast, which makes the code hard to scan. Choose a darker code or a lighter background.'}
            </Notice>
          )}
        </div>

        <div className="stack" aria-live="polite">
          {built.error && <ErrorMessage>{built.error}</ErrorMessage>}
          {!built.matrix && !built.error && (
            <div className="empty card" style={{ padding: 'var(--space-6)' }}>
              Fill in the details and your QR code appears here.
            </div>
          )}
          {built.matrix && (
            <>
              <div className="preview-box" style={{ padding: 'var(--space-4)' }}>
                <canvas ref={canvasRef} role="img" aria-label="Your QR code" style={{ width: 'min(100%, 320px)', height: 'auto', imageRendering: 'pixelated' }} />
              </div>
              <p className="hint">
                {built.matrix.size} × {built.matrix.size} modules. The PNG will be {finalSize} × {finalSize} px.
              </p>
              <div className="toolbar">
                <button type="button" className="btn btn-primary" onClick={downloadPng}>
                  <Icon name="download" size={16} /> Download PNG
                </button>
                <button type="button" className="btn btn-secondary" onClick={downloadSvg}>
                  <Icon name="download" size={16} /> Download SVG
                </button>
                <CopyButton text={built.payload} label="Copy content" />
              </div>
              <p className="hint">Scan it with your phone before you print or share it.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
