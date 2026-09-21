import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { ColorField, RangeField, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMATS, sameFormatAs, type FormatKey } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

type Target = 'same' | FormatKey;

const ImageCompress: ToolImplementation = () => {
  const [target, setTarget] = useState<Target>('same');
  const [quality, setQuality] = useState(75);
  const [maxDim, setMaxDim] = useState('0');
  const [background, setBackground] = useState('#ffffff');

  return (
    <BatchImageTool
      actionLabel="Compress images"
      zipName="compressed-images.zip"
      options={
        <>
          <SelectField
            label="Output format"
            value={target}
            onChange={setTarget}
            options={[
              { value: 'same', label: 'Same as original' },
              { value: 'jpeg', label: 'JPG (smallest for photos)' },
              { value: 'webp', label: 'WebP (smaller, modern)' },
              { value: 'png', label: 'PNG (lossless)' },
            ]}
          />
          <RangeField label="Quality" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
          <SelectField
            label="Maximum size"
            value={maxDim}
            onChange={setMaxDim}
            hint="Larger images are scaled down, never up."
            options={[
              { value: '0', label: 'Keep original size' },
              { value: '3840', label: '3840 px (4K)' },
              { value: '2560', label: '2560 px' },
              { value: '1920', label: '1920 px (Full HD)' },
              { value: '1280', label: '1280 px' },
              { value: '800', label: '800 px' },
            ]}
          />
          <ColorField label="Background for transparency" value={background} onChange={setBackground} />
        </>
      }
      process={async (file) => {
        const key = target === 'same' ? sameFormatAs(file) : target;
        const fmt = FORMATS[key];
        const result = await processImage(file, {
          mime: fmt.mime,
          quality: quality / 100,
          background,
          maxDimension: Number(maxDim) || undefined,
        });
        const saved = Math.round((1 - result.blob.size / file.size) * 100);
        const note =
          result.blob.size < file.size
            ? `${formatBytes(file.size)} → ${formatBytes(result.blob.size)} (-${saved}%)`
            : `${formatBytes(file.size)} → ${formatBytes(result.blob.size)} (larger; keep the original or lower the quality)`;
        return { name: outputName(file.name, fmt.ext, '-compressed'), blob: result.blob, note };
      }}
    />
  );
};

export default ImageCompress;
