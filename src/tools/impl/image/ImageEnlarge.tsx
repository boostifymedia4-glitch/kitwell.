import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { Notice } from '@/components/tool/Feedback';
import { CheckField, ColorField, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { enlargeImage, type EnlargeSpec } from '@/lib/imageEdits';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const ImageEnlarge: ToolImplementation = () => {
  const [mode, setMode] = useState<'factor' | 'width'>('factor');
  const [factor, setFactor] = useState('2');
  const [width, setWidth] = useState<number | ''>(2000);
  const [sharpen, setSharpen] = useState(true);
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState('#ffffff');

  return (
    <div className="stack">
      <Notice>Enlarging makes an image bigger and smooth, but it cannot add detail that was never there. This is high-quality resampling, not AI upscaling.</Notice>
      <BatchImageTool
        actionLabel="Enlarge images"
        zipName="enlarged-images.zip"
        disabled={mode === 'width' && !width}
        options={
          <>
            <Segmented
              label="Enlarge by"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'factor', label: 'Factor' },
                { value: 'width', label: 'Target width' },
              ]}
            />
            {mode === 'factor' ? (
              <SelectField
                label="Factor"
                value={factor}
                onChange={setFactor}
                options={[
                  { value: '1.5', label: '1.5×' },
                  { value: '2', label: '2×' },
                  { value: '3', label: '3×' },
                  { value: '4', label: '4×' },
                ]}
              />
            ) : (
              <NumberField label="Width (px)" value={width} min={2} max={16000} onChange={setWidth} hint="Must be larger than the original width." />
            )}
            <CheckField label="Sharpen slightly" checked={sharpen} onChange={setSharpen} />
            <RangeField label="Quality (JPG/WebP)" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
            <ColorField label="Background (JPG)" value={background} onChange={setBackground} />
          </>
        }
        process={async (file) => {
          const fmt = FORMATS[sameFormatAs(file)];
          const spec: EnlargeSpec = mode === 'factor' ? { mode: 'factor', factor: Number(factor) } : { mode: 'width', width: Number(width) };
          const result = await enlargeImage(file, spec, { mime: fmt.mime, quality: quality / 100, background, sharpen });
          return {
            name: outputName(file.name, fmt.ext, `-${result.width}x${result.height}`),
            blob: result.blob,
            note: `${result.width} × ${result.height} px · ${formatBytes(result.blob.size)}`,
          };
        }}
      />
    </div>
  );
};

export default ImageEnlarge;
