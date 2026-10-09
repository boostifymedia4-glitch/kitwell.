import { useEffect, useRef, useState } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { CropSelector } from '@/components/tool/CropSelector';
import { ColorField, NumberField, RangeField, SelectField } from '@/components/tool/Fields';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { ResetButton, ResultFiles, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { MIN_CROP, applyRatio, initialRect, setRectField, type Rect, cropRatioOptions } from '@/lib/cropRect';
import { outputName } from '@/lib/format';
import { useFileQueue, useObjectUrl, useTask } from '@/lib/hooks';
import { processImage } from '@/lib/image';
import { FORMAT_OPTIONS, FORMATS, sameFormatAs, type FormatKey } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';


const ImageCrop: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: 1 }, false);
  const file = queue.items[0]?.file ?? null;
  const url = useObjectUrl(file);
  const imgRef = useRef<HTMLImageElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [ratioKey, setRatioKey] = useState('free');
  const [format, setFormat] = useState<FormatKey | 'same'>('same');
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState('#ffffff');
  const [loadError, setLoadError] = useState<string | null>(null);
  const task = useTask<{ name: string; blob: Blob; note: string }>();

  const ratio = ratioKey === 'free' ? null : Number(ratioKey);

  useEffect(() => {
    setNatural(null);
    setLoadError(null);
    task.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    setRatioKey('free');
    setRect(initialRect(img.naturalWidth, img.naturalHeight));
  };

  const chooseRatio = (key: string) => {
    setRatioKey(key);
    if (natural && key !== 'free') setRect(applyRatio(rect, Number(key), natural.w, natural.h));
  };

  const setField = (key: keyof Rect, raw: number | '') => {
    if (natural && raw !== '') setRect(setRectField(rect, key, raw, ratio, natural.w, natural.h));
  };

  const crop = () =>
    task.run(async () => {
      if (!file || !natural) throw new Error(t('imageCrop.addFirst'));
      const key = format === 'same' ? sameFormatAs(file) : format;
      const fmt = FORMATS[key];
      const c = { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.max(1, Math.round(rect.w)), height: Math.max(1, Math.round(rect.h)) };
      const result = await processImage(file, { mime: fmt.mime, quality: quality / 100, background, crop: c });
      return { name: outputName(file.name, fmt.ext, '-cropped'), blob: result.blob, note: t('imageCrop.note', { width: result.width, height: result.height }) };
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  const running = task.state.status === 'running';

  return (
    <div className="stack">
      {!file && <UploadDropzone extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} onFiles={queue.add} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {file && url && (
        <>
          {loadError && <ErrorMessage>{loadError}</ErrorMessage>}
          <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
            <CropSelector width={natural?.w ?? 1} height={natural?.h ?? 1} rect={rect} onChange={setRect} ratio={ratio} label={t('imageCrop.cropArea')} hidden={!natural}>
              <img
                ref={imgRef}
                src={url}
                alt={t('imageCrop.alt', { name: file.name })}
                onLoad={onLoad}
                onError={() => setLoadError(t('imageCrop.loadError'))}
                draggable={false}
              />
            </CropSelector>
          </div>

          {natural && (
            <>
              <p className="hint">
                {t('imageCrop.original', { width: natural.w, height: natural.h })}
              </p>
              <div className="options-grid">
                <SelectField label={t('imageCrop.aspectRatio')} value={ratioKey} options={cropRatioOptions()} onChange={chooseRatio} />
                <NumberField label={t('imageCrop.x')} value={Math.round(rect.x)} min={0} max={natural.w} onChange={(v) => setField('x', v)} />
                <NumberField label={t('imageCrop.y')} value={Math.round(rect.y)} min={0} max={natural.h} onChange={(v) => setField('y', v)} />
                <NumberField label={t('imageCrop.width')} value={Math.round(rect.w)} min={MIN_CROP} max={natural.w} onChange={(v) => setField('w', v)} />
                <NumberField label={t('imageCrop.height')} value={Math.round(rect.h)} min={MIN_CROP} max={natural.h} onChange={(v) => setField('h', v)} />
                <SelectField label={t('imageCrop.outputFormat')} value={format} onChange={setFormat} options={[{ value: 'same', label: t('imageCrop.sameAsOriginal') }, ...FORMAT_OPTIONS]} />
                <RangeField label={t('imageCrop.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
                <ColorField label={t('imageCrop.background')} value={background} onChange={setBackground} />
              </div>
              <div className="toolbar">
                <button type="button" className="btn btn-primary btn-lg" onClick={crop} disabled={running}>
                  <Icon name="crop" size={18} />
                  {t('imageCrop.action')}
                </button>
                <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
                  {t('imageCrop.another')}
                </button>
              </div>
            </>
          )}
        </>
      )}
      {running && <ProcessingState label={t('imageCrop.cropping')} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel>
          <ResultFiles files={[task.state.result]} zipName="cropped.zip" />
          <ResetButton onClick={reset} />
        </ResultPanel>
      )}
    </div>
  );
};

export default ImageCrop;
