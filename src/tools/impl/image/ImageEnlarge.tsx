import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { Notice } from '@/components/tool/Feedback';
import { CheckField, ColorField, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { formatBytes, outputName } from '@/lib/format';
import { enlargeImage, type EnlargeSpec } from '@/lib/imageEdits';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

const ImageEnlarge: ToolImplementation = () => {
  const { t } = useI18n();
  const [mode, setMode] = useState<'factor' | 'width'>('factor');
  const [factor, setFactor] = useState('2');
  const [width, setWidth] = useState<number | ''>(2000);
  const [sharpen, setSharpen] = useState(true);
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState('#ffffff');

  return (
    <div className="stack">
      <Notice>{t('imageEnlarge.notice')}</Notice>
      <BatchImageTool
        actionLabel={t('imageEnlarge.action')}
        zipName="enlarged-images.zip"
        disabled={mode === 'width' && !width}
        options={
          <>
            <Segmented
              label={t('imageEnlarge.enlargeBy')}
              value={mode}
              onChange={setMode}
              options={[
                { value: 'factor', label: t('imageEnlarge.factor') },
                { value: 'width', label: t('imageEnlarge.targetWidth') },
              ]}
            />
            {mode === 'factor' ? (
              <SelectField
                label={t('imageEnlarge.factor')}
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
              <NumberField label={t('imageEnlarge.width')} value={width} min={2} max={16000} onChange={setWidth} hint={t('imageEnlarge.widthHint')} />
            )}
            <CheckField label={t('imageEnlarge.sharpen')} checked={sharpen} onChange={setSharpen} />
            <RangeField label={t('imageEnlarge.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
            <ColorField label={t('imageEnlarge.background')} value={background} onChange={setBackground} />
          </>
        }
        process={async (file) => {
          const fmt = FORMATS[sameFormatAs(file)];
          const spec: EnlargeSpec = mode === 'factor' ? { mode: 'factor', factor: Number(factor) } : { mode: 'width', width: Number(width) };
          const result = await enlargeImage(file, spec, { mime: fmt.mime, quality: quality / 100, background, sharpen });
          return {
            name: outputName(file.name, fmt.ext, `-${result.width}x${result.height}`),
            blob: result.blob,
            note: t('imageEnlarge.note', { width: result.width, height: result.height, size: formatBytes(result.blob.size) }),
          };
        }}
      />
    </div>
  );
};

export default ImageEnlarge;
