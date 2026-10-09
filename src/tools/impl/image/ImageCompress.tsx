import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { ColorField, RangeField, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMATS, sameFormatAs, type FormatKey } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

type Target = 'same' | FormatKey;

const ImageCompress: ToolImplementation = () => {
  const { t } = useI18n();
  const [target, setTarget] = useState<Target>('same');
  const [quality, setQuality] = useState(75);
  const [maxDim, setMaxDim] = useState('0');
  const [background, setBackground] = useState('#ffffff');

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
          <RangeField label={t('imageCompress.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
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
          <ColorField label={t('imageCompress.background')} value={background} onChange={setBackground} />
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
            ? t('imageCompress.noteSmaller', { before: formatBytes(file.size), after: formatBytes(result.blob.size), saved })
            : t('imageCompress.noteLarger', { before: formatBytes(file.size), after: formatBytes(result.blob.size) });
        return { name: outputName(file.name, fmt.ext, '-compressed'), blob: result.blob, note };
      }}
    />
  );
};

export default ImageCompress;
