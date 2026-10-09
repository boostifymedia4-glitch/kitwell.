import { useState } from 'react';
import { BatchImageTool, IMAGE_EXTENSIONS } from '@/components/tool/BatchImageTool';
import { ColorField, RangeField, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMAT_OPTIONS, FORMATS, INPUT_EXTENSIONS, type FormatKey } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const ImageConvert: ToolImplementation = ({ tool }) => {
  const { t } = useI18n();
  const fixedTarget = tool.config?.from !== 'any';
  const [target, setTarget] = useState<FormatKey>((tool.config?.to as FormatKey) ?? 'png');
  const [quality, setQuality] = useState(90);
  const [background, setBackground] = useState('#ffffff');
  const fmt = FORMATS[target];

  return (
    <BatchImageTool
      extensions={INPUT_EXTENSIONS[tool.config?.from ?? ''] ?? IMAGE_EXTENSIONS}
      actionLabel={t('imageConvert.action', { format: fmt.label })}
      zipName={`${tool.slug}.zip`}
      options={
        <>
          {!fixedTarget && <SelectField label={t('imageConvert.outputFormat')} value={target} options={FORMAT_OPTIONS} onChange={setTarget} />}
          {target !== 'png' && <RangeField label={t('imageConvert.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />}
          {target === 'jpeg' && <ColorField label={t('imageConvert.background')} value={background} onChange={setBackground} />}
        </>
      }
      process={async (file) => {
        const result = await processImage(file, { mime: fmt.mime, quality: quality / 100, background });
        return {
          name: outputName(file.name, fmt.ext),
          blob: result.blob,
          note: t('imageConvert.note', { width: result.width, height: result.height, size: formatBytes(file.size) }),
        };
      }}
    />
  );
};

export default ImageConvert;
