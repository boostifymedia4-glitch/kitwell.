import { useEffect, useState } from 'react';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { ColorField, NumberField, RangeField, SelectField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { baseName } from '@/lib/format';
import { addPageNumbers, formatPageNumber, type NumberFormat, type NumberPosition } from '@/lib/pdfEdit';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const POSITIONS: NumberPosition[] = ['bottom-center', 'bottom-right', 'bottom-left', 'top-center', 'top-right', 'top-left'];

const FORMATS: NumberFormat[] = ['n', 'page-n', 'n-of-total', 'page-n-of-total'];

const PdfPageNumbers: ToolImplementation = () => {
  const { t } = useI18n();
  const { pdf, task, reset, running } = usePdfTool();
  const [position, setPosition] = useState<NumberPosition>('bottom-center');
  const [format, setFormat] = useState<NumberFormat>('n');
  const [startAt, setStartAt] = useState<number | ''>(1);
  const [fromPage, setFromPage] = useState<number | ''>(1);
  const [toPage, setToPage] = useState<number | ''>('');
  const [size, setSize] = useState(12);
  const [margin, setMargin] = useState<number | ''>(28);
  const [color, setColor] = useState('#000000');

  // Page numbers typed for one PDF may be out of range for the next one.
  const current = pdf.state.status === 'ready' ? pdf.state.file : null;
  useEffect(() => {
    setFromPage(1);
    setToPage('');
  }, [current]);

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
              <SelectField label={t('pdfPageNumbers.position')} value={position} onChange={setPosition} options={POSITIONS.map((value) => ({ value, label: t(`pdfPageNumbers.pos.${value}`) }))} />
              <SelectField label={t('pdfPageNumbers.format')} value={format} onChange={setFormat} options={FORMATS.map((value) => ({ value, label: t(`pdfPageNumbers.fmt.${value}`) }))} />
              <NumberField label={t('pdfPageNumbers.from')} value={fromPage} min={1} max={ready.pageCount} onChange={setFromPage} hint={t('pdfPageNumbers.from.hint')} />
              <NumberField label={t('pdfPageNumbers.to')} value={toPage} min={1} max={ready.pageCount} onChange={setToPage} hint={t('pdfPageNumbers.to.hint', { count: ready.pageCount })} />
              <NumberField label={t('pdfPageNumbers.startAt')} value={startAt} min={0} max={99999} onChange={setStartAt} />
              <RangeField label={t('pdfPageNumbers.fontSize')} value={size} min={8} max={36} onChange={setSize} format={(v) => `${v} pt`} />
              <NumberField label={t('pdfPageNumbers.margin')} value={margin} min={0} max={200} onChange={setMargin} />
              <ColorField label={t('pdfPageNumbers.colour')} value={color} onChange={setColor} />
            </div>
            <p className="hint" aria-live="polite">
              {t('pdfPageNumbers.example', { example: formatPageNumber(format, start, lastNumber) })}
            </p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="hash" size={18} />
                {t('pdfPageNumbers.add')}
              </button>
            </div>
            {running && <ProcessingState label={t('pdfPageNumbers.processing')} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && <PdfResult blob={task.state.result} name={`${baseName(ready.file.name)}-numbered.pdf`} onReset={reset} />}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfPageNumbers;
