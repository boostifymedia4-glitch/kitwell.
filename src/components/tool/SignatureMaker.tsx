import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { MB } from '@/lib/files';
import { useFileQueue } from '@/lib/hooks';
import { INK_COLOURS, SIGNATURE_FONTS, contentBounds, whiteToTransparent } from '@/lib/signatureImage';
import { Icon } from '../Icon';
import { CheckField, Field, Segmented } from './Fields';
import { ErrorMessage, RejectionList } from './Feedback';
import { UploadDropzone } from './UploadDropzone';

export interface SignatureImage {
  blob: Blob;
  bytes: Uint8Array;
  /** Width divided by height. */
  aspect: number;
}

type Tab = 'draw' | 'type' | 'upload';

const DRAW_W = 900;
const DRAW_H = 300;

/** Crops a canvas to its ink (plus a small margin) and, optionally, adds today's date underneath. */
function finish(source: HTMLCanvasElement, withDate: boolean, ink: string): HTMLCanvasElement | null {
  const ctx = source.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const image = ctx.getImageData(0, 0, source.width, source.height);
  const box = contentBounds(image.data, source.width, source.height);
  if (!box) return null;
  const pad = Math.round(Math.max(box.w, box.h) * 0.03) + 4;
  const dateSize = withDate ? Math.max(14, Math.round(box.h * 0.22)) : 0;
  const out = document.createElement('canvas');
  out.width = box.w + pad * 2;
  out.height = box.h + pad * 2 + (withDate ? dateSize + pad : 0);
  const octx = out.getContext('2d');
  if (!octx) return null;
  octx.drawImage(source, box.x, box.y, box.w, box.h, pad, pad, box.w, box.h);
  if (withDate) {
    octx.fillStyle = ink;
    octx.font = `${dateSize}px system-ui, "Segoe UI", Arial, sans-serif`;
    octx.textBaseline = 'top';
    octx.fillText(new Date().toISOString().slice(0, 10), pad, pad + box.h + pad);
  }
  return out;
}

const toBlob = (canvas: HTMLCanvasElement) => new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('The signature could not be saved.'))), 'image/png'));

/** Lets people create a signature by drawing, typing or uploading, and hands back a transparent PNG. */
export function SignatureMaker({ onReady }: { onReady: (sig: SignatureImage) => void }) {
  const [tab, setTab] = useState<Tab>('draw');
  const [ink, setInk] = useState<string>(INK_COLOURS[0].value);
  const [withDate, setWithDate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // draw
  const drawRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = useState(false);
  // type
  const [name, setName] = useState('');
  const [fontId, setFontId] = useState<(typeof SIGNATURE_FONTS)[number]['id']>('script');
  const typedRef = useRef<HTMLCanvasElement>(null);
  // upload
  const upload = useFileQueue({ extensions: ['png', 'jpg', 'jpeg'], maxBytes: 5 * MB, maxFiles: 1 }, false);
  const [removeWhite, setRemoveWhite] = useState(true);
  const uploadFile = upload.items[0]?.file ?? null;
  const uploadRef = useRef<HTMLCanvasElement>(null);
  const [uploadReady, setUploadReady] = useState(false);

  useEffect(() => {
    const canvas = drawRef.current;
    if (!canvas) return;
    canvas.width = DRAW_W;
    canvas.height = DRAW_H;
  }, []);

  // Typed signature preview
  const font = SIGNATURE_FONTS.find((f) => f.id === fontId)!;
  useEffect(() => {
    const canvas = typedRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!name.trim()) return;
    let size = 150;
    const set = () => (ctx.font = `${font.italic ? 'italic ' : ''}${size}px ${font.stack}`);
    set();
    while (ctx.measureText(name).width > canvas.width - 40 && size > 24) {
      size -= 6;
      set();
    }
    ctx.fillStyle = ink;
    ctx.textBaseline = 'middle';
    ctx.fillText(name, 20, canvas.height / 2);
  }, [name, fontId, ink, font]);

  // Uploaded picture preview
  useEffect(() => {
    setUploadReady(false);
    const canvas = uploadRef.current;
    if (!uploadFile || !canvas) return;
    let cancelled = false;
    createImageBitmap(uploadFile)
      .then((bitmap) => {
        if (cancelled) return bitmap.close();
        const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return bitmap.close();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
        if (removeWhite) {
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
          whiteToTransparent(data.data);
          ctx.putImageData(data, 0, 0);
        }
        setError(null);
        setUploadReady(true);
      })
      .catch(() => !cancelled && setError('That picture could not be read. Use a valid PNG or JPG.'));
    return () => {
      cancelled = true;
    };
  }, [uploadFile, removeWhite]);

  const point = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * canvas.width, y: ((e.clientY - r.top) / r.height) * canvas.height };
  };
  const down = (e: PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    strokes.current = point(e);
    const ctx = e.currentTarget.getContext('2d');
    if (!ctx) return;
    // A tap makes a dot.
    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.arc(strokes.current.x, strokes.current.y, 3, 0, Math.PI * 2);
    ctx.fill();
    setHasInk(true);
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!strokes.current) return;
    const ctx = e.currentTarget.getContext('2d');
    if (!ctx) return;
    const next = point(e);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(strokes.current.x, strokes.current.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    strokes.current = next;
  };
  const up = () => {
    strokes.current = null;
  };
  const clearDrawing = () => {
    const canvas = drawRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const canUse = tab === 'draw' ? hasInk : tab === 'type' ? name.trim().length > 0 : uploadReady;

  const use = async () => {
    const source = tab === 'draw' ? drawRef.current : tab === 'type' ? typedRef.current : uploadRef.current;
    if (!source) return;
    const trimmed = finish(source, withDate, ink);
    if (!trimmed) {
      setError('There is nothing to use yet. Draw, type or upload your signature first.');
      return;
    }
    try {
      const blob = await toBlob(trimmed);
      onReady({ blob, bytes: new Uint8Array(await blob.arrayBuffer()), aspect: trimmed.width / trimmed.height });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The signature could not be saved.');
    }
  };

  return (
    <div className="stack">
      <Segmented
        label="Create your signature"
        value={tab}
        onChange={(t) => {
          setTab(t);
          setError(null);
        }}
        options={[
          { value: 'draw', label: 'Draw' },
          { value: 'type', label: 'Type' },
          { value: 'upload', label: 'Upload' },
        ]}
      />

      {tab === 'draw' && (
        <div className="stack-sm">
          <canvas
            ref={drawRef}
            className="signature-pad"
            role="img"
            aria-label="Signature drawing area. Draw with a mouse, finger or pen."
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
          />
          <div className="row row-between">
            <span className="hint">Sign inside the box using your mouse, finger or pen.</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={clearDrawing} disabled={!hasInk}>
              <Icon name="eraser" size={14} /> Clear
            </button>
          </div>
        </div>
      )}

      {tab === 'type' && (
        <div className="stack-sm">
          <div className="options-grid">
            <Field label="Your name" hint="Type the name to sign with.">
              {(id) => <input id={id} className="input" value={name} maxLength={60} placeholder="Ayesha Khan" onChange={(e) => setName(e.target.value)} />}
            </Field>
            <Field label="Style" hint="Fonts depend on your device.">
              {(id) => (
                <select id={id} className="select" value={fontId} onChange={(e) => setFontId(e.target.value as typeof fontId)}>
                  {SIGNATURE_FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <canvas ref={typedRef} className="signature-pad" width={DRAW_W} height={DRAW_H / 2} role="img" aria-label={name.trim() ? `Typed signature preview: ${name}` : 'Typed signature preview'} />
        </div>
      )}

      {tab === 'upload' && (
        <div className="stack-sm">
          {!uploadFile && <UploadDropzone extensions={['png', 'jpg', 'jpeg']} maxBytes={5 * MB} compact title="Add a picture of your signature" onFiles={upload.add} />}
          <RejectionList items={upload.rejections} onDismiss={upload.dismissRejections} />
          {uploadFile && (
            <>
              <canvas ref={uploadRef} className="signature-pad signature-pad-upload" role="img" aria-label="Uploaded signature preview" />
              <div className="row row-between">
                <CheckField label="Make the white background transparent" checked={removeWhite} onChange={setRemoveWhite} />
                <button type="button" className="btn btn-ghost btn-sm" onClick={upload.clear}>
                  Choose another picture
                </button>
              </div>
            </>
          )}
          {!uploadFile && <canvas ref={uploadRef} hidden />}
        </div>
      )}

      {tab !== 'upload' && <Segmented label="Ink colour" value={ink} onChange={setInk} options={INK_COLOURS.map((c) => ({ value: c.value, label: c.label }))} />}
      <CheckField label="Add today’s date under the signature" checked={withDate} onChange={setWithDate} />
      {error && <ErrorMessage onDismiss={() => setError(null)}>{error}</ErrorMessage>}
      <div className="toolbar">
        <button type="button" className="btn btn-primary" onClick={use} disabled={!canUse}>
          <Icon name="check" size={16} />
          Use this signature
        </button>
      </div>
    </div>
  );
}
