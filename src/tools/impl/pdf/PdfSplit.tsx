import { useState } from 'react';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { Field, NumberField, Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { ResetButton, ResultFiles, ResultPanel, type ResultFile } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { baseName } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { everyNGroups, parseSplitGroups, splitPdf } from '@/lib/pdfOps';
import { usePdfFile } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

type Mode = 'ranges' | 'every';

const PdfSplit: ToolImplementation = () => {
  const { t } = useI18n();
  const pdf = usePdfFile();
  const task = useTask<ResultFile[]>();
  const [mode, setMode] = useState<Mode>('ranges');
  const [ranges, setRanges] = useState('');
  const [every, setEvery] = useState<number | ''>(1);
  const running = task.state.status === 'running';

  const reset = () => {
    pdf.reset();
    task.reset();
    setRanges('');
  };

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const split = () =>
          task.run(async (report) => {
            const groups = mode === 'ranges' ? parseSplitGroups(ranges, ready.pageCount) : everyNGroups(ready.pageCount, Number(every) || 1);
            if (groups.length > 500) throw new Error(t('pdfSplit.tooMany'));
            const outputs = await splitPdf(ready.bytes, groups, (d, total) => report(d, total, t('pdfSplit.splitting')));
            const base = baseName(ready.file.name);
            return outputs.map((bytes, i) => {
              const first = groups[i][0] + 1;
              const last = groups[i][groups[i].length - 1] + 1;
              const label = groups[i].length === 1 ? `page-${first}` : first === last ? `page-${first}` : `pages-${first}-${last}`;
              return {
                name: `${base}-${label}.pdf`,
                blob: new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
                note: t('pdfSplit.note', { count: groups[i].length }),
              };
            });
          });

        return (
          <>
            <div className="stack">
              <Segmented
                label={t('pdfSplit.method')}
                value={mode}
                onChange={(m) => {
                  setMode(m);
                  task.reset();
                }}
                options={[
                  { value: 'ranges', label: t('pdfSplit.method.ranges') },
                  { value: 'every', label: t('pdfSplit.method.every') },
                ]}
              />
              {mode === 'ranges' ? (
                <Field label={t('pdfSplit.ranges')} hint={t('pdfSplit.ranges.hint')}>
                  {(id) => <input id={id} className="input mono" value={ranges} placeholder={`1-3, 4-6, 7-${ready.pageCount}`} onChange={(e) => setRanges(e.target.value)} />}
                </Field>
              ) : (
                <NumberField label={t('pdfSplit.every')} value={every} min={1} max={ready.pageCount} onChange={setEvery} hint={t('pdfSplit.every.hint', { count: ready.pageCount })} />
              )}
              <div className="toolbar">
                <button type="button" className="btn btn-primary btn-lg" onClick={split} disabled={running || (mode === 'ranges' && !ranges.trim())}>
                  <Icon name="split" size={18} />
                  {t('pdfSplit.split')}
                </button>
              </div>
            </div>
            {running && <ProcessingState label={t('pdfSplit.processing')} progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && (
              <ResultPanel title={t('pdfSplit.created', { count: task.state.result.length })}>
                <ResultFiles files={task.state.result} zipName={`${baseName(ready.file.name)}-split.zip`} />
                <ResetButton onClick={reset} />
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfSplit;
