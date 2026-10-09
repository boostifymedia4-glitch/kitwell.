import { useEffect, useState } from 'react';
import { BatchImageTool, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ErrorMessage, RejectionList } from '@/components/tool/Feedback';
import { CheckField, ColorField, Field, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { formatBytes, outputName } from '@/lib/format';
import { useFileQueue } from '@/lib/hooks';
import { watermarkImage, type MarkPosition, type WatermarkSpec } from '@/lib/imageEdits';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const POSITIONS: { value: MarkPosition; key: string }[] = [
  { value: 'bottom-right', key: 'imageWatermark.position.bottomRight' },
  { value: 'bottom-center', key: 'imageWatermark.position.bottomCenter' },
  { value: 'bottom-left', key: 'imageWatermark.position.bottomLeft' },
  { value: 'center', key: 'imageWatermark.position.center' },
  { value: 'top-right', key: 'imageWatermark.position.topRight' },
  { value: 'top-center', key: 'imageWatermark.position.topCenter' },
  { value: 'top-left', key: 'imageWatermark.position.topLeft' },
  { value: 'middle-right', key: 'imageWatermark.position.middleRight' },
  { value: 'middle-left', key: 'imageWatermark.position.middleLeft' },
];

const ImageWatermark: ToolImplementation = () => {
  const { t } = useI18n();
  const [kind, setKind] = useState<'text' | 'image'>('text');
  const [text, setText] = useState(() => t('imageWatermark.defaultText'));
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
  const [logoError, setLogoError] = useState<boolean>(false);

  useEffect(() => {
    setLogoError(false);
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
      .catch(() => !cancelled && setLogoError(true));
    return () => {
      cancelled = true;
      made?.close();
    };
  }, [logoFile]);

  const ready = kind === 'text' ? text.trim().length > 0 : Boolean(bitmap);

  return (
    <BatchImageTool
      actionLabel={t('imageWatermark.action')}
      zipName="watermarked-images.zip"
      disabled={!ready}
      options={
        <>
          <Segmented
            label={t('imageWatermark.type')}
            value={kind}
            onChange={setKind}
            options={[
              { value: 'text', label: t('imageWatermark.type.text') },
              { value: 'image', label: t('imageWatermark.type.logo') },
            ]}
          />
          {kind === 'text' ? (
            <>
              <Field label={t('imageWatermark.text')}>{(id) => <input id={id} className="input" value={text} maxLength={120} onChange={(e) => setText(e.target.value)} />}</Field>
              <RangeField label={t('imageWatermark.textSize')} value={sizePct} min={1} max={30} onChange={setSizePct} format={(v) => t('imageWatermark.percentOfWidth', { value: v })} />
              <ColorField label={t('imageWatermark.colour')} value={color} onChange={setColor} />
              <CheckField label={t('imageWatermark.bold')} checked={bold} onChange={setBold} />
            </>
          ) : (
            <div className="stack-sm" style={{ gridColumn: '1 / -1' }}>
              {!logoFile && <UploadDropzone extensions={['png', 'jpg', 'jpeg', 'webp']} maxBytes={MAX_IMAGE_BYTES} compact title={t('imageWatermark.addLogo')} onFiles={logo.add} />}
              <RejectionList items={logo.rejections} onDismiss={logo.dismissRejections} />
              {logoError && <ErrorMessage>{t('imageWatermark.logoError')}</ErrorMessage>}
              {logoFile && (
                <div className="file-item">
                  <div className="file-meta">
                    <div className="file-name">{logoFile.name}</div>
                    <div className="file-sub">{formatBytes(logoFile.size)}</div>
                  </div>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={logo.clear}>
                    {t('imageWatermark.changeLogo')}
                  </button>
                </div>
              )}
              <RangeField label={t('imageWatermark.logoSize')} value={logoPct} min={3} max={80} onChange={setLogoPct} format={(v) => t('imageWatermark.percentOfWidth', { value: v })} />
            </div>
          )}
          <RangeField label={t('imageWatermark.opacity')} value={opacity} min={5} max={100} onChange={setOpacity} format={(v) => `${v}%`} />
          <SelectField
            label={t('imageWatermark.layout')}
            value={layout}
            onChange={setLayout}
            options={[
              { value: 'single', label: t('imageWatermark.layout.single') },
              { value: 'tile', label: t('imageWatermark.layout.tile') },
            ]}
          />
          {layout === 'single' && <SelectField label={t('imageWatermark.position')} value={position} onChange={setPosition} options={POSITIONS.map((p) => ({ value: p.value, label: t(p.key) }))} />}
          <NumberField label={t('imageWatermark.rotation')} value={angle} min={-180} max={180} onChange={setAngle} />
          <RangeField label={t('imageWatermark.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
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
        return { name: outputName(file.name, fmt.ext, '-watermarked'), blob: result.blob, note: t('imageWatermark.note', { width: result.width, height: result.height }) };
      }}
    />
  );
};

export default ImageWatermark;
