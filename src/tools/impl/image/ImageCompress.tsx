import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMATS, sameFormatAs, type FormatKey } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

type Target = 'same' | FormatKey;

/** Fixed encoder quality for JPG and WebP (PNG is lossless). Transparent areas become white in a JPG. */
const QUALITY = 0.75;
const BACKGROUND = '#ffffff';

const ImageCompress: ToolImplementation = () => {
  const { t } = useI18n();
  const [target, setTarget] = useState<Target>('same');
  const [maxDim, setMaxDim] = useState('0');

  return (
    <BatchImageTool
      actionLabel={t('imageCompress.action')}
      zipName="compressed-images.zip"
      options={
        <>
          <SelectField
            label={t('imageCompress.outputFormat')}
            value={target}
            onChange={setTarget}
            options={[
              { value: 'same', label: t('imageCompress.format.same') },
              { value: 'jpeg', label: t('imageCompress.format.jpeg') },
              { value: 'webp', label: t('imageCompress.format.webp') },
              { value: 'png', label: t('imageCompress.format.png') },
            ]}
          />
          <SelectField
            label={t('imageCompress.maxSize')}
            value={maxDim}
            onChange={setMaxDim}
            hint={t('imageCompress.maxSize.hint')}
            options={[
              { value: '0', label: t('imageCompress.maxSize.keep') },
              { value: '3840', label: t('imageCompress.maxSize.4k') },
              { value: '2560', label: t('imageCompress.maxSize.2560') },
              { value: '1920', label: t('imageCompress.maxSize.fullHd') },
              { value: '1280', label: t('imageCompress.maxSize.1280') },
              { value: '800', label: t('imageCompress.maxSize.800') },
            ]}
          />
        </>
      }
      process={async (file) => {
        const key = target === 'same' ? sameFormatAs(file) : target;
        const fmt = FORMATS[key];
        const result = await processImage(file, {
          mime: fmt.mime,
          quality: QUALITY,
          background: BACKGROUND,
          maxDimension: Number(maxDim) || undefined,
        });
        if (result.blob.size >= file.size) {
          // Never hand back a file that is not smaller: keep the original bytes and say so.
          return { name: file.name, blob: file, note: t('imageCompress.noteLarger', { before: formatBytes(file.size), after: formatBytes(result.blob.size) }) };
        }
        const saved = Math.round((1 - result.blob.size / file.size) * 100);
        return { name: outputName(file.name, fmt.ext, '-compressed'), blob: result.blob, note: t('imageCompress.noteSmaller', { before: formatBytes(file.size), after: formatBytes(result.blob.size), saved }) };
      }}
    />
  );
};

export default ImageCompress;
