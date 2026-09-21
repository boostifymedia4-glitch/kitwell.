import { useMemo, useState } from 'react';
import { CopyRow } from '@/components/tool/CopyButton';
import { ErrorMessage } from '@/components/tool/Feedback';
import { Field } from '@/components/tool/Fields';
import { contrastRatio, parseColor, rgbToHex, rgbToHsl, rgbToHsv, type Rgb } from '@/lib/dev';
import type { ToolImplementation } from '../../types';

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const BLACK: Rgb = { r: 0, g: 0, b: 0 };

function Contrast({ label, fg, bg }: { label: string; fg: Rgb; bg: Rgb }) {
  const ratio = contrastRatio(fg, bg);
  const pass = (min: number) => (ratio >= min ? 'Pass' : 'Fail');
  return (
    <div className="stat">
      <div
        style={{ background: rgbToHex(bg), color: rgbToHex(fg), borderRadius: 8, padding: '8px 12px', marginBottom: 8, fontWeight: 600, border: '1px solid var(--border)' }}
      >
        {label}
      </div>
      <b>{ratio.toFixed(2)}:1</b>
      <span>
        Normal text AA: {pass(4.5)} · AAA: {pass(7)}
        <br />
        Large text AA: {pass(3)} · AAA: {pass(4.5)}
      </span>
    </div>
  );
}

const ColorConverter: ToolImplementation = () => {
  const [input, setInput] = useState('#0f766e');
  const rgb = useMemo(() => parseColor(input), [input]);
  const hex = rgb ? rgbToHex(rgb) : null;
  const hsl = rgb ? rgbToHsl(rgb) : null;
  const hsv = rgb ? rgbToHsv(rgb) : null;

  return (
    <div className="stack">
      <div className="row" style={{ alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 260px' }}>
          <Field label="Colour" hint="HEX (#0f766e), rgb(15, 118, 110) or hsl(175, 77%, 26%)">
            {(id) => <input id={id} className="input mono" value={input} spellCheck={false} aria-invalid={!rgb && input !== ''} onChange={(e) => setInput(e.target.value)} />}
          </Field>
        </div>
        <Field label="Picker">
          {(id) => <input id={id} type="color" value={hex ?? '#000000'} onChange={(e) => setInput(e.target.value)} />}
        </Field>
      </div>
      {!rgb && input.trim() !== '' && <ErrorMessage>That is not a recognised colour. Try a HEX value like #0f766e, rgb(15, 118, 110) or hsl(175, 77%, 26%).</ErrorMessage>}
      {rgb && hex && hsl && hsv && (
        <div className="stack">
          <div className="swatch" style={{ background: hex }} role="img" aria-label={`Colour preview ${hex}`} />
          <div className="two-col">
            <CopyRow label="HEX" value={hex.toUpperCase()} />
            <CopyRow label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            <CopyRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            <CopyRow label="HSV" value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`} />
          </div>
          <div className="stack-sm">
            <span className="label">Contrast (WCAG)</span>
            <div className="two-col">
              <Contrast label="Sample text on this colour (white)" fg={WHITE} bg={rgb} />
              <Contrast label="Sample text on this colour (black)" fg={BLACK} bg={rgb} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorConverter;
