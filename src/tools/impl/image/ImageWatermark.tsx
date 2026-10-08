import { useEffect, useState } from 'react';
import { BatchImageTool, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ErrorMessage, RejectionList } from '@/components/tool/Feedback';
import { CheckField, ColorField, Field, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { formatBytes, outputName } from '@/lib/format';
import { useFileQueue } from '@/lib/hooks';
import { watermarkImage, type MarkPosition, type WatermarkSpec } from '@/lib/imageEdits';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const POSITIONS: { value: MarkPosition; label: string }[] = [
  { value: 'bottom-right', label: 'Bottom right' },
  { value: 'bottom-center', label: 'Bottom centre' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'center', label: 'Centre' },
  { value: 'top-right', label: 'Top right' },
  { value: 'top-center', label: 'Top centre' },
  { value: 'top-left', label: 'Top left' },
  { value: 'middle-right', label: 'Middle right' },
  { value: 'middle-left', label: 'Middle left' },
];

const ImageWatermark: ToolImplementation = () => {
  const [kind, setKind] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('© Your name');
  const [color, setColor] = useState('#ffffff');
  const [bold, setBold] = useState(true);
  const [sizePct, setSizePct] = useState(5);
  const [logoPct, setLogoPct] = useState(20);
  const [opacity, setOpacity] = useState(60);
  const [position, setPosition] = useState<MarkPosition>('bottom-right');
  const [layout, setLayout] = useState<'single' | 'tile'>('single');
  const [angle, setAngle] = useState<number | ''>(0);
  const [quality, setQuality] = useState(92);

  const logo = useFileQueue({ extensions: ['png', 'jpg', 'jpeg', 'webp'], maxBytes: MAX_IMAGE_BYTES, maxFiles: 1 }, false);
  const logoFile = logo.items[0]?.file ?? null;
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  useEffect(() => {
    setLogoError(null);
    if (!logoFile) {
      setBitmap(null);
      return;
    }
    let cancelled = false;
    let made: ImageBitmap | null = null;
    createImageBitmap(logoFile)
      .then((b) => {
        if (cancelled) b.close();
        else {
          made = b;
          setBitmap(b);
        }
      })
      .catch(() => !cancelled && setLogoError('The logo could not be read as an image.'));
    return () => {
      cancelled = true;
      made?.close();
    };
  }, [logoFile]);

  const ready = kind === 'text' ? text.trim().length > 0 : Boolean(bitmap);

  return (
    <BatchImageTool
      actionLabel="Add watermark"
      zipName="watermarked-images.zip"
      disabled={!ready}
      options={
        <>
          <Segmented
            label="Watermark type"
            value={kind}
            onChange={setKind}
            options={[
              { value: 'text', label: 'Text' },
              { value: 'image', label: 'Logo' },
            ]}
          />
          {kind === 'text' ? (
            <>
              <Field label="Text">{(id) => <input id={id} className="input" value={text} maxLength={120} onChange={(e) => setText(e.target.value)} />}</Field>
              <RangeField label="Text size" value={sizePct} min={1} max={30} onChange={setSizePct} format={(v) => `${v}% of width`} />
              <ColorField label="Colour" value={color} onChange={setColor} />
              <CheckField label="Bold" checked={bold} onChange={setBold} />
            </>
          ) : (
            <div className="stack-sm" style={{ gridColumn: '1 / -1' }}>
              {!logoFile && <UploadDropzone extensions={['png', 'jpg', 'jpeg', 'webp']} maxBytes={MAX_IMAGE_BYTES} compact title="Add your logo" onFiles={logo.add} />}
              <RejectionList items={logo.rejections} onDismiss={logo.dismissRejections} />
              {logoError && <ErrorMessage>{logoError}</ErrorMessage>}
              {logoFile && (
                <div className="file-item">
                  <div className="file-meta">
                    <div className="file-name">{logoFile.name}</div>
                    <div className="file-sub">{formatBytes(logoFile.size)}</div>
                  </div>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={logo.clear}>
                    Change logo
                  </button>
                </div>
              )}
              <RangeField label="Logo size" value={logoPct} min={3} max={80} onChange={setLogoPct} format={(v) => `${v}% of width`} />
            </div>
          )}
          <RangeField label="Opacity" value={opacity} min={5} max={100} onChange={setOpacity} format={(v) => `${v}%`} />
          <SelectField
            label="Layout"
            value={layout}
            onChange={setLayout}
            options={[
              { value: 'single', label: 'One mark' },
              { value: 'tile', label: 'Repeated across the image' },
            ]}
          />
          {layout === 'single' && <SelectField label="Position" value={position} onChange={setPosition} options={POSITIONS} />}
          <NumberField label="Rotation (degrees, clockwise)" value={angle} min={-180} max={180} onChange={setAngle} />
          <RangeField label="Quality (JPG/WebP)" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
        </>
      }
      process={async (file) => {
        const fmt = FORMATS[sameFormatAs(file)];
        const mark: WatermarkSpec['mark'] =
          kind === 'text' ? { kind: 'text', text, color, bold, sizePct } : { kind: 'image', bitmap: bitmap as ImageBitmap, sizePct: logoPct };
        const result = await watermarkImage(
          file,
          { mark, opacity: opacity / 100, position, layout, angle: Number(angle) || 0 },
          { mime: fmt.mime, quality: quality / 100, background: '#ffffff' },
        );
        return { name: outputName(file.name, fmt.ext, '-watermarked'), blob: result.blob, note: `${result.width} × ${result.height} px` };
      }}
    />
  );
};

export default ImageWatermark;
