import { useEffect, useRef, useState } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { CropSelector } from '@/components/tool/CropSelector';
import { ColorField, NumberField, RangeField, SelectField } from '@/components/tool/Fields';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { ResetButton, ResultFiles, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { MIN_CROP, applyRatio, initialRect, setRectField, type Rect, CROP_RATIOS } from '@/lib/cropRect';
import { outputName } from '@/lib/format';
import { useFileQueue, useObjectUrl, useTask } from '@/lib/hooks';
import { processImage } from '@/lib/image';
import { FORMAT_OPTIONS, FORMATS, sameFormatAs, type FormatKey } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';


const ImageCrop: ToolImplementation = () => {
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
      if (!file || !natural) throw new Error('Add an image first.');
      const key = format === 'same' ? sameFormatAs(file) : format;
      const fmt = FORMATS[key];
      const c = { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.max(1, Math.round(rect.w)), height: Math.max(1, Math.round(rect.h)) };
      const result = await processImage(file, { mime: fmt.mime, quality: quality / 100, background, crop: c });
      return { name: outputName(file.name, fmt.ext, '-cropped'), blob: result.blob, note: `${result.width} × ${result.height} px` };
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
            <CropSelector width={natural?.w ?? 1} height={natural?.h ?? 1} rect={rect} onChange={setRect} ratio={ratio} label="Crop area" hidden={!natural}>
              <img
                ref={imgRef}
                src={url}
                alt={`Preview of ${file.name} with crop area`}
                onLoad={onLoad}
                onError={() => setLoadError('This file could not be read as an image. It may be corrupted or in an unsupported format.')}
                draggable={false}
              />
            </CropSelector>
          </div>

          {natural && (
            <>
              <p className="hint">
                Original: {natural.w} × {natural.h} px. Drag the box to move it, drag the corner to resize, or type exact values.
              </p>
              <div className="options-grid">
                <SelectField label="Aspect ratio" value={ratioKey} options={CROP_RATIOS} onChange={chooseRatio} />
                <NumberField label="X (px)" value={Math.round(rect.x)} min={0} max={natural.w} onChange={(v) => setField('x', v)} />
                <NumberField label="Y (px)" value={Math.round(rect.y)} min={0} max={natural.h} onChange={(v) => setField('y', v)} />
                <NumberField label="Width (px)" value={Math.round(rect.w)} min={MIN_CROP} max={natural.w} onChange={(v) => setField('w', v)} />
                <NumberField label="Height (px)" value={Math.round(rect.h)} min={MIN_CROP} max={natural.h} onChange={(v) => setField('h', v)} />
                <SelectField label="Output format" value={format} onChange={setFormat} options={[{ value: 'same', label: 'Same as original' }, ...FORMAT_OPTIONS]} />
                <RangeField label="Quality (JPG/WebP)" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
                <ColorField label="Background (JPG)" value={background} onChange={setBackground} />
              </div>
              <div className="toolbar">
                <button type="button" className="btn btn-primary btn-lg" onClick={crop} disabled={running}>
                  <Icon name="crop" size={18} />
                  Crop image
                </button>
                <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
                  Choose another image
                </button>
              </div>
            </>
          )}
        </>
      )}
      {running && <ProcessingState label="Cropping…" />}
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
