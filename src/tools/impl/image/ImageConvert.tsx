import { useState } from 'react';
import { BatchImageTool, IMAGE_EXTENSIONS } from '@/components/tool/BatchImageTool';
import { ColorField, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMAT_OPTIONS, FORMATS, INPUT_EXTENSIONS, type FormatKey } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

/** Fixed encoder quality: a good balance of size and detail, so the tools need no quality slider. */
const QUALITY: Record<FormatKey, number> = { jpeg: 0.92, webp: 0.9, png: 1 };
/** Transparent areas become white when the output is a JPG, which cannot store transparency. */
const JPEG_BACKGROUND = '#ffffff';

const ImageConvert: ToolImplementation = ({ tool }) => {
  const { t } = useI18n();
  const fixedTarget = tool.config?.from !== 'any';
  const [target, setTarget] = useState<FormatKey>((tool.config?.to as FormatKey) ?? 'png');
  const [background, setBackground] = useState(JPEG_BACKGROUND);
  const fmt = FORMATS[target];

  return (
    <BatchImageTool
      extensions={INPUT_EXTENSIONS[tool.config?.from ?? ''] ?? IMAGE_EXTENSIONS}
      actionLabel={t('imageConvert.action', { format: fmt.label })}
      zipName={`${tool.slug}.zip`}
      options={
        fixedTarget ? undefined : (
          <>
            <SelectField label={t('imageConvert.outputFormat')} value={target} options={FORMAT_OPTIONS} onChange={setTarget} />
            {target === 'jpeg' && <ColorField label={t('imageConvert.background')} value={background} onChange={setBackground} />}
          </>
        )
      }
      process={async (file) => {
        const result = await processImage(file, { mime: fmt.mime, quality: QUALITY[target], background: fixedTarget ? JPEG_BACKGROUND : background });
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
