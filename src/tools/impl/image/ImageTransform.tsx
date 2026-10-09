import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { CheckField, ColorField, NumberField, RangeField, Segmented } from '@/components/tool/Fields';
import { outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

type Preset = '90' | '180' | '270' | 'custom';

/** Rotate or flip images; `tool.config.mode` selects which controls are shown. */
const ImageTransform: ToolImplementation = ({ tool }) => {
  const { t } = useI18n();
  const rotateMode = tool.config?.mode === 'rotate';
  const [preset, setPreset] = useState<Preset>('90');
  const [custom, setCustom] = useState<number | ''>(15);
  const [flipH, setFlipH] = useState(true);
  const [flipV, setFlipV] = useState(false);
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState('#ffffff');

  const angle = preset === 'custom' ? Number(custom) || 0 : Number(preset);
  const invalid = rotateMode ? preset === 'custom' && custom === '' : !flipH && !flipV;

  return (
    <BatchImageTool
      actionLabel={rotateMode ? t('imageTransform.rotate') : t('imageTransform.flip')}
      zipName={rotateMode ? 'rotated-images.zip' : 'flipped-images.zip'}
      disabled={invalid}
      options={
        <>
          {rotateMode ? (
            <>
              <Segmented
                label={t('imageTransform.rotation')}
                value={preset}
                onChange={setPreset}
                options={[
                  { value: '90', label: t('imageTransform.right90') },
                  { value: '180', label: t('imageTransform.180') },
                  { value: '270', label: t('imageTransform.left90') },
                  { value: 'custom', label: t('imageTransform.custom') },
                ]}
              />
              {preset === 'custom' && <NumberField label={t('imageTransform.angle')} value={custom} min={-360} max={360} step={0.5} onChange={setCustom} />}
            </>
          ) : (
            <div className="stack-sm">
              <span className="label">{t('imageTransform.flipDirection')}</span>
              <CheckField label={t('imageTransform.horizontal')} checked={flipH} onChange={setFlipH} />
              <CheckField label={t('imageTransform.vertical')} checked={flipV} onChange={setFlipV} />
            </div>
          )}
          <RangeField label={t('imageTransform.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
          {rotateMode && preset === 'custom' && <ColorField label={t('imageTransform.background')} value={background} onChange={setBackground} />}
        </>
      }
      process={async (file) => {
        const fmt = FORMATS[sameFormatAs(file)];
        const result = await processImage(file, {
          mime: fmt.mime,
          quality: quality / 100,
          background,
          rotate: rotateMode ? angle : 0,
          flipH: !rotateMode && flipH,
          flipV: !rotateMode && flipV,
        });
        return {
          name: outputName(file.name, fmt.ext, rotateMode ? '-rotated' : '-flipped'),
          blob: result.blob,
          note: t('imageTransform.note', { width: result.width, height: result.height }),
        };
      }}
    />
  );
};

export default ImageTransform;
