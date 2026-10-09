import { useState } from 'react';
import { useI18n } from '@/i18n';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { ColorField, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { outputName } from '@/lib/format';
import { rasterizeSvg, type SvgSize } from '@/lib/imageEdits';
import { FORMAT_OPTIONS, FORMATS, type FormatKey } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const SvgConvert: ToolImplementation = () => {
  const { t } = useI18n();
  const SCALES = ['1', '2', '3', '4'].map((v) => ({ value: v, label: t('svgConvert.scaleOption', { scale: v }) }));
  const [target, setTarget] = useState<FormatKey>('png');
  const [mode, setMode] = useState<'scale' | 'width'>('scale');
  const [scale, setScale] = useState('2');
  const [width, setWidth] = useState<number | ''>(1024);
  const [quality, setQuality] = useState(92);
  const [background, setBackground] = useState('#ffffff');
  const fmt = FORMATS[target];

  return (
    <BatchImageTool
      extensions={['svg']}
      actionLabel={t('svgConvert.action', { format: fmt.label })}
      zipName={`svg-to-${fmt.ext}.zip`}
      disabled={mode === 'width' && !width}
      options={
        <>
          <SelectField label={t('svgConvert.outputFormat')} value={target} options={FORMAT_OPTIONS} onChange={setTarget} />
          <Segmented
            label={t('svgConvert.sizeBy')}
            value={mode}
            onChange={setMode}
            options={[
              { value: 'scale', label: t('svgConvert.sizeBy.scale') },
              { value: 'width', label: t('svgConvert.sizeBy.width') },
            ]}
          />
          {mode === 'scale' ? (
            <SelectField label={t('svgConvert.scale')} value={scale} options={SCALES} onChange={setScale} />
          ) : (
            <NumberField label={t('svgConvert.width')} value={width} min={1} max={16000} onChange={setWidth} hint={t('svgConvert.widthHint')} />
          )}
          {target !== 'png' && <RangeField label={t('svgConvert.quality')} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />}
          {target === 'jpeg' && <ColorField label={t('svgConvert.background')} value={background} onChange={setBackground} />}
        </>
      }
      process={async (file) => {
        const size: SvgSize = mode === 'scale' ? { mode: 'scale', scale: Number(scale) } : { mode: 'width', width: Number(width) };
        const result = await rasterizeSvg(file, size, { mime: fmt.mime, quality: quality / 100, background });
        return { name: outputName(file.name, fmt.ext), blob: result.blob, note: `${result.width} × ${result.height} px` };
      }}
    />
  );
};

export default SvgConvert;
