import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { ColorField, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { outputName } from '@/lib/format';
import { rasterizeSvg, type SvgSize } from '@/lib/imageEdits';
import { FORMAT_OPTIONS, FORMATS, type FormatKey } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

const SCALES = ['1', '2', '3', '4'].map((v) => ({ value: v, label: `${v}× the SVG’s own size` }));

const SvgConvert: ToolImplementation = () => {
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
      actionLabel={`Convert to ${fmt.label}`}
      zipName={`svg-to-${fmt.ext}.zip`}
      disabled={mode === 'width' && !width}
      options={
        <>
          <SelectField label="Output format" value={target} options={FORMAT_OPTIONS} onChange={setTarget} />
          <Segmented
            label="Size by"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'scale', label: 'Scale' },
              { value: 'width', label: 'Width in px' },
            ]}
          />
          {mode === 'scale' ? (
            <SelectField label="Scale" value={scale} options={SCALES} onChange={setScale} />
          ) : (
            <NumberField label="Width (px)" value={width} min={1} max={16000} onChange={setWidth} hint="Height follows the SVG’s proportions." />
          )}
          {target !== 'png' && <RangeField label="Quality" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />}
          {target === 'jpeg' && <ColorField label="Background (JPG has no transparency)" value={background} onChange={setBackground} />}
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
