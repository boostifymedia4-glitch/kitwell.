import { useState } from 'react';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { ColorField, NumberField, RangeField, SelectField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName } from '@/lib/format';
import { addPageNumbers, formatPageNumber, type NumberFormat, type NumberPosition } from '@/lib/pdfEdit';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const POSITIONS: { value: NumberPosition; label: string }[] = [
  { value: 'bottom-center', label: 'Bottom centre' },
  { value: 'bottom-right', label: 'Bottom right' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'top-center', label: 'Top centre' },
  { value: 'top-right', label: 'Top right' },
  { value: 'top-left', label: 'Top left' },
];

const FORMATS: { value: NumberFormat; label: string }[] = [
  { value: 'n', label: '1, 2, 3' },
  { value: 'page-n', label: 'Page 1, Page 2' },
  { value: 'n-of-total', label: '1 of 10, 2 of 10' },
  { value: 'page-n-of-total', label: 'Page 1 of 10' },
];

const PdfPageNumbers: ToolImplementation = () => {
  const { pdf, task, reset, running } = usePdfTool();
  const [position, setPosition] = useState<NumberPosition>('bottom-center');
  const [format, setFormat] = useState<NumberFormat>('n');
  const [startAt, setStartAt] = useState<number | ''>(1);
  const [fromPage, setFromPage] = useState<number | ''>(1);
  const [toPage, setToPage] = useState<number | ''>('');
  const [size, setSize] = useState(12);
  const [margin, setMargin] = useState<number | ''>(28);
  const [color, setColor] = useState('#000000');

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const first = Number(fromPage) || 1;
        const last = Number(toPage) || ready.pageCount;
        const start = startAt === '' ? 1 : startAt;
        const lastNumber = start + Math.max(0, last - first);
        const run = () =>
          task.run(async () => {
            const out = await addPageNumbers(ready.bytes, {
              position,
              format,
              startAt: start,
              fromPage: first,
              toPage: toPage === '' ? undefined : toPage,
              size,
              margin: margin === '' ? 28 : margin,
              color,
            });
            return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
          });

        return (
          <>
            <div className="options-grid">
              <SelectField label="Position" value={position} onChange={setPosition} options={POSITIONS} />
              <SelectField label="Format" value={format} onChange={setFormat} options={FORMATS} />
              <NumberField label="First page to number" value={fromPage} min={1} max={ready.pageCount} onChange={setFromPage} hint="Use 2 to skip a cover page." />
              <NumberField label="Last page to number" value={toPage} min={1} max={ready.pageCount} onChange={setToPage} hint={`Empty means page ${ready.pageCount}.`} />
              <NumberField label="Number shown on the first page" value={startAt} min={0} max={99999} onChange={setStartAt} />
              <RangeField label="Font size" value={size} min={8} max={36} onChange={setSize} format={(v) => `${v} pt`} />
              <NumberField label="Distance from edge (pt)" value={margin} min={0} max={200} onChange={setMargin} />
              <ColorField label="Colour" value={color} onChange={setColor} />
            </div>
            <p className="hint" aria-live="polite">
              Example: the first numbered page will show “{formatPageNumber(format, start, lastNumber)}”.
            </p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="hash" size={18} />
                Add page numbers
              </button>
            </div>
            {running && <ProcessingState label="Adding page numbers…" />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && <PdfResult blob={task.state.result} name={`${baseName(ready.file.name)}-numbered.pdf`} onReset={reset} />}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfPageNumbers;
