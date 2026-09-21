import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { CheckField, NumberField, RangeField, Segmented } from '@/components/tool/Fields';
import { outputName } from '@/lib/format';
import { processImage, type ImagePlan } from '@/lib/image';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const ImageResize: ToolImplementation = () => {
  const [mode, setMode] = useState<'pixels' | 'percent'>('pixels');
  const [width, setWidth] = useState<number | ''>(1280);
  const [height, setHeight] = useState<number | ''>('');
  const [lock, setLock] = useState(true);
  const [percent, setPercent] = useState(50);
  const [quality, setQuality] = useState(92);

  const invalid = mode === 'pixels' && !width && !height;

  return (
    <BatchImageTool
      actionLabel="Resize images"
      zipName="resized-images.zip"
      disabled={invalid}
      options={
        <>
          <Segmented
            label="Resize by"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'pixels', label: 'Pixels' },
              { value: 'percent', label: 'Percentage' },
            ]}
          />
          {mode === 'pixels' ? (
            <>
              <NumberField label="Width (px)" value={width} min={1} max={16000} onChange={setWidth} hint="Leave empty to calculate from height." />
              <NumberField label="Height (px)" value={height} min={1} max={16000} onChange={setHeight} hint="Leave empty to calculate from width." />
              <CheckField label="Keep aspect ratio" checked={lock} onChange={setLock} />
            </>
          ) : (
            <RangeField label="Scale" value={percent} min={5} max={300} onChange={setPercent} format={(v) => `${v}%`} />
          )}
          <RangeField label="Quality (JPG/WebP)" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
        </>
      }
      process={async (file) => {
        const fmt = FORMATS[sameFormatAs(file)];
        const plan: ImagePlan = { mime: fmt.mime, quality: quality / 100, background: '#ffffff' };
        if (mode === 'percent') plan.scale = percent / 100;
        else if (lock || !(width && height)) plan.fit = { width: Number(width) || undefined, height: Number(height) || undefined };
        else {
          plan.width = Number(width);
          plan.height = Number(height);
        }
        const result = await processImage(file, plan);
        return {
          name: outputName(file.name, fmt.ext, `-${result.width}x${result.height}`),
          blob: result.blob,
          note: `${result.width} × ${result.height} px`,
        };
      }}
    />
  );
};

export default ImageResize;
