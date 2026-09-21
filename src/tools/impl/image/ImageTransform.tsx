import { useState } from 'react';
import { BatchImageTool } from '@/components/tool/BatchImageTool';
import { CheckField, ColorField, NumberField, RangeField, Segmented } from '@/components/tool/Fields';
import { outputName } from '@/lib/format';
import { processImage } from '@/lib/image';
import { FORMATS, sameFormatAs } from '@/lib/imageFormats';
import type { ToolImplementation } from '../../types';

type Preset = '90' | '180' | '270' | 'custom';

/** Rotate or flip images; `tool.config.mode` selects which controls are shown. */
const ImageTransform: ToolImplementation = ({ tool }) => {
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
      actionLabel={rotateMode ? 'Rotate images' : 'Flip images'}
      zipName={rotateMode ? 'rotated-images.zip' : 'flipped-images.zip'}
      disabled={invalid}
      options={
        <>
          {rotateMode ? (
            <>
              <Segmented
                label="Rotation"
                value={preset}
                onChange={setPreset}
                options={[
                  { value: '90', label: '90° right' },
                  { value: '180', label: '180°' },
                  { value: '270', label: '90° left' },
                  { value: 'custom', label: 'Custom' },
                ]}
              />
              {preset === 'custom' && <NumberField label="Angle (degrees, clockwise)" value={custom} min={-360} max={360} step={0.5} onChange={setCustom} />}
            </>
          ) : (
            <div className="stack-sm">
              <span className="label">Flip direction</span>
              <CheckField label="Horizontal (mirror left / right)" checked={flipH} onChange={setFlipH} />
              <CheckField label="Vertical (mirror top / bottom)" checked={flipV} onChange={setFlipV} />
            </div>
          )}
          <RangeField label="Quality (JPG/WebP)" value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
          {rotateMode && preset === 'custom' && <ColorField label="Background for JPG corners" value={background} onChange={setBackground} />}
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
          note: `${result.width} × ${result.height} px`,
        };
      }}
    />
  );
};

export default ImageTransform;
