import { useState } from 'react';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { Field, NumberField, Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { ResetButton, ResultFiles, ResultPanel, type ResultFile } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { everyNGroups, parseSplitGroups, splitPdf } from '@/lib/pdfOps';
import { usePdfFile } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

type Mode = 'ranges' | 'every';

const PdfSplit: ToolImplementation = () => {
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
            if (groups.length > 500) throw new Error('That would create more than 500 files. Use a larger number of pages per file.');
            const outputs = await splitPdf(ready.bytes, groups, (d, t) => report(d, t, 'Splitting'));
            const base = baseName(ready.file.name);
            return outputs.map((bytes, i) => {
              const first = groups[i][0] + 1;
              const last = groups[i][groups[i].length - 1] + 1;
              const label = groups[i].length === 1 ? `page-${first}` : first === last ? `page-${first}` : `pages-${first}-${last}`;
              return {
                name: `${base}-${label}.pdf`,
                blob: new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
                note: `${groups[i].length} ${groups[i].length === 1 ? 'page' : 'pages'}`,
              };
            });
          });

        return (
          <>
            <div className="stack">
              <Segmented
                label="Split method"
                value={mode}
                onChange={(m) => {
                  setMode(m);
                  task.reset();
                }}
                options={[
                  { value: 'ranges', label: 'Custom ranges' },
                  { value: 'every', label: 'Every N pages' },
                ]}
              />
              {mode === 'ranges' ? (
                <Field label="Page ranges" hint="One output file per comma-separated range. Use + to combine pieces into one file, e.g. 1-3, 4-6, 7+9.">
                  {(id) => <input id={id} className="input mono" value={ranges} placeholder={`1-3, 4-6, 7-${ready.pageCount}`} onChange={(e) => setRanges(e.target.value)} />}
                </Field>
              ) : (
                <NumberField label="Pages per file" value={every} min={1} max={ready.pageCount} onChange={setEvery} hint={`Use 1 to split into ${ready.pageCount} single-page files.`} />
              )}
              <div className="toolbar">
                <button type="button" className="btn btn-primary btn-lg" onClick={split} disabled={running || (mode === 'ranges' && !ranges.trim())}>
                  <Icon name="split" size={18} />
                  Split PDF
                </button>
              </div>
            </div>
            {running && <ProcessingState label="Splitting…" progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && (
              <ResultPanel title={`Created ${task.state.result.length} ${task.state.result.length === 1 ? 'file' : 'files'}`}>
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
