import { useEffect, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { Field, Segmented, SelectField } from '@/components/tool/Fields';
import { FileList } from '@/components/tool/FileList';
import { PdfOutput, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { notesFor, type Note } from '@/lib/convertNotes';
import { baseName, formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 10 * 1024 * 1024;
const EXTENSIONS = ['html', 'htm', 'xhtml'];

type Source = 'file' | 'text';
type Size = 'a4' | 'letter';

const HtmlToPdf: ToolImplementation = () => {
  const { t } = useI18n();
  const [source, setSource] = useState<Source>('file');
  const [html, setHtml] = useState('');
  const [size, setSize] = useState<Size>('a4');
  const queue = useFileQueue({ extensions: EXTENSIONS, maxBytes: MAX_BYTES, maxFiles: 1 }, false);
  const task = useTask<{ blob: Blob; pages: number; notes: Note[]; name: string }>();
  const { reset: resetTask } = task;
  const item = queue.items[0];
  useEffect(() => {
    resetTask();
  }, [item, source, html, size, resetTask]);
  const running = task.state.status === 'running';
  const tooLong = html.length > MAX_BYTES;
  const ready = source === 'file' ? Boolean(item) : html.trim().length > 0 && !tooLong;

  const run = () =>
    task.run(async (report) => {
      const [{ htmlToBlocks, parseHtml }, { buildPdf }, { tr }] = await Promise.all([import('@/lib/htmlDoc'), import('@/lib/docPdf'), import('@/i18n/translate')]);
      report(0, 1, t('convert.reading', { name: item?.file.name ?? 'HTML' }));
      const text = source === 'file' && item ? await item.file.text() : html;
      const read = htmlToBlocks(parseHtml(text));
      if (read.blocks.length === 0) throw new Error(tr('err.convert.empty'));
      report(0, 1, t('convert.layout'));
      const out = await buildPdf(read.blocks, { pageSize: size, title: read.title || undefined });
      return {
        blob: new Blob([out.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
        pages: out.pages,
        name: `${source === 'file' && item ? baseName(item.file.name) : baseName(read.title || 'document')}.pdf`,
        notes: notesFor({ unsupported: out.unsupported, externalImages: read.externalImages, unsupportedImages: read.unsupportedImages + out.skippedImages, skipped: read.skippedElements, truncated: out.truncated }),
      };
    });

  const reset = () => {
    queue.clear();
    setHtml('');
    task.reset();
  };

  return (
    <div className="stack">
      <Segmented
        label={t('htmlToPdf.fromFile') + ' / ' + t('htmlToPdf.fromText')}
        value={source}
        onChange={setSource}
        options={[
          { value: 'file', label: t('htmlToPdf.fromFile') },
          { value: 'text', label: t('htmlToPdf.fromText') },
        ]}
      />
      {source === 'file' ? (
        <>
          {!item && <UploadDropzone extensions={EXTENSIONS} maxBytes={MAX_BYTES} onFiles={queue.add} title={t('convert.drop', { format: 'HTML' })} />}
          <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
          <FileList items={queue.items} kind="pdf" onRemove={queue.remove} disabled={running} />
        </>
      ) : (
        <Field label={t('htmlToPdf.code')} hint={t('htmlToPdf.hint')}>
          {(id) => <textarea id={id} className="textarea" rows={10} spellCheck={false} dir="ltr" value={html} placeholder={t('htmlToPdf.placeholder')} onChange={(e) => setHtml(e.target.value)} />}
        </Field>
      )}
      {source === 'file' && item && <p className="hint">{t('htmlToPdf.hint')}</p>}
      {tooLong && <ErrorMessage>{t('err.files.tooLarge', { size: formatBytes(html.length), max: formatBytes(MAX_BYTES) })}</ErrorMessage>}
      {ready && (
        <>
          <div className="options-grid">
            <SelectField
              label={t('imagesToPdf.pageSize')}
              value={size}
              onChange={setSize}
              options={[
                { value: 'a4', label: t('imagesToPdf.pageSize.a4') },
                { value: 'letter', label: t('imagesToPdf.pageSize.letter') },
              ]}
            />
          </div>
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running} aria-busy={running}>
              <Icon name="file-text" size={18} />
              {t('convert.run')}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('convert.running')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title={t('convert.ready')}>
          <p className="muted">{t('convert.summary', { pages: t('ui.pages', { count: task.state.result.pages }), size: formatBytes(task.state.result.blob.size) })}</p>
          {task.state.result.notes.length > 0 && (
            <Notice tone="warn">
              <strong>{t('convert.notes')}</strong>
              <ul style={{ paddingInlineStart: 18, marginTop: 4 }}>
                {task.state.result.notes.map((n) => (
                  <li key={n.key}>{t(n.key, n.vars)}</li>
                ))}
              </ul>
            </Notice>
          )}
          <PdfOutput blob={task.state.result.blob} name={task.state.result.name}>
<ResetButton onClick={reset} />
</PdfOutput>
        </ResultPanel>
      )}
    </div>
  );
};

export default HtmlToPdf;
