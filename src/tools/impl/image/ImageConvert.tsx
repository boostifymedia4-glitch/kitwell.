import { useState } from 'react';
import { BatchImageTool, IMAGE_EXTENSIONS } from '@/components/tool/BatchImageTool';
import { ColorField, RangeField, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMAT_OPTIONS, FORMATS, INPUT_EXTENSIONS, type FormatKey } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const ImageConvert: ToolImplementation = ({ tool }) => {
  const fixedTarget = tool.config?.from !== 'any';
  const [target, setTarget] = useState<FormatKey>((tool.config?.to as FormatKey) ?? 'png');
  const [quality, setQuality] = useState(90);
  const [background, setBackground] = useState('#ffffff');
  const fmt = FORMATS[target];

  return (
    <BatchImageTool
      extensions={INPUT_EXTENSIONS[tool.config?.from ?? ''] ?? IMAGE_EXTENSIONS}
      actionLabel={`Convert to ${fmt.label}`}
      zipName={`${tool.slug}.zip`}
      options={
        <>
          {!fixedTarget && <SelectField label="Output format" value={target} options={FORMAT_OPTIONS} onChange={setTarget} />}
          {target !== 'png' && <RangeField label="Quality" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />}
          {target === 'jpeg' && <ColorField label="Background for transparency" value={background} onChange={setBackground} />}
        </>
      }
      process={async (file) => {
        const result = await processImage(file, { mime: fmt.mime, quality: quality / 100, background });
        return {
          name: outputName(file.name, fmt.ext),
          blob: result.blob,
          note: `${result.width} × ${result.height} px · was ${formatBytes(file.size)}`,
        };
      }}
    />
  );
};

export default ImageConvert;
