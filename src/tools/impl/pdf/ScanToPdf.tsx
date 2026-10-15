import { useEffect, useRef, useState } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { SelectField } from '@/components/tool/Fields';
import { FileList } from '@/components/tool/FileList';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { imagesToPdf, type ImageInput, type ImagesToPdfOptions } from '@/lib/pdfOps';
import { applyScanFilter, scaledSize, type ScanFilter } from '@/lib/scanFilter';
import type { ToolImplementation } from '../../types';

const MAX_PAGES = 100;

/** Decodes a photo (the browser applies its rotation), scales it down if it is huge, applies the filter and re-encodes it. */
async function preparePage(file: File, filter: ScanFilter, t: (key: string) => string): Promise<ImageInput> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const { width, height } = scaledSize(img.naturalWidth, img.naturalHeight);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error(t('err.convert.image'));
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    if (filter !== 'original') {
      const pixels = ctx.getImageData(0, 0, width, height);
      applyScanFilter(pixels.data, width, height, filter);
      ctx.putImageData(pixels, 0, 0);
    }
    // Black and white pages compress best as PNG; photographs as JPEG.
    const png = filter === 'document';
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, png ? 'image/png' : 'image/jpeg', 0.88));
    if (!blob) throw new Error(t('err.convert.image'));
    return { bytes: new Uint8Array(await blob.arrayBuffer()), kind: png ? 'png' : 'jpg' };
  } finally {
    URL.revokeObjectURL(url);
  }
}

const ScanToPdf: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: MAX_PAGES }, true);
  const task = useTask<Blob>();
  const { reset: resetTask } = task;
  const camera = useRef<HTMLInputElement>(null);
  const [pageSize, setPageSize] = useState<ImagesToPdfOptions['pageSize']>('a4');
  const [orientation, setOrientation] = useState<ImagesToPdfOptions['orientation']>('auto');
  const [margin, setMargin] = useState('0');
  const [filter, setFilter] = useState<ScanFilter>('document');

  useEffect(() => {
    resetTask();
  }, [queue.items, pageSize, orientation, margin, filter, resetTask]);
  const running = task.state.status === 'running';

  const create = () =>
    task.run(async (report) => {
      const pages: ImageInput[] = [];
      for (let i = 0; i < queue.items.length; i++) {
        const { file } = queue.items[i];
        report(i, queue.items.length, t('imagesToPdf.reading', { name: file.name }));
        try {
          pages.push(await preparePage(file, filter, t));
        } catch (err) {
          throw new Error(t('imagesToPdf.fileError', { name: file.name, message: (err as Error).message }), { cause: err });
        }
      }
      report(queue.items.length, queue.items.length, t('imagesToPdf.building'));
      const out = await imagesToPdf(pages, { pageSize, orientation, margin: Number(margin) });
      return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  return (
    <div className="stack">
      <UploadDropzone
        extensions={IMAGE_EXTENSIONS}
        multiple
        maxBytes={MAX_IMAGE_BYTES}
        maxFiles={MAX_PAGES}
        disabled={running}
        compact={queue.items.length > 0}
        title={queue.items.length ? t('imagesToPdf.addMore') : undefined}
        onFiles={queue.add}
      />
      <div className="toolbar">
        <button type="button" className="btn btn-secondary" disabled={running} onClick={() => camera.current?.click()}>
          <Icon name="image" size={16} />
          {t('scanToPdf.takePhoto')}
        </button>
        {/* On phones and tablets this opens the camera; elsewhere it opens the file chooser. */}
        <input ref={camera} type="file" accept="image/*" capture="environment" hidden onChange={(e) => (queue.add(Array.from(e.target.files ?? [])), (e.target.value = ''))} />
      </div>
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      <FileList items={queue.items} kind="image" onRemove={queue.remove} onMove={queue.move} disabled={running} />
      {queue.items.length > 0 && (
        <>
          <p className="hint">{t('imagesToPdf.hint')}</p>
          <div className="options-grid">
            <SelectField
              label={t('scanToPdf.filter')}
              value={filter}
              onChange={setFilter}
              hint={t('scanToPdf.filterHint')}
              options={[
                { value: 'document', label: t('scanToPdf.filter.document') },
                { value: 'grayscale', label: t('scanToPdf.filter.grayscale') },
                { value: 'original', label: t('scanToPdf.filter.original') },
              ]}
            />
            <SelectField
              label={t('imagesToPdf.pageSize')}
              value={pageSize}
              onChange={setPageSize}
              options={[
                { value: 'a4', label: t('imagesToPdf.pageSize.a4') },
                { value: 'letter', label: t('imagesToPdf.pageSize.letter') },
                { value: 'fit', label: t('imagesToPdf.pageSize.fit') },
              ]}
            />
            <SelectField
              label={t('imagesToPdf.orientation')}
              value={orientation}
              onChange={setOrientation}
              options={[
                { value: 'auto', label: t('imagesToPdf.orientation.auto') },
                { value: 'portrait', label: t('imagesToPdf.orientation.portrait') },
                { value: 'landscape', label: t('imagesToPdf.orientation.landscape') },
              ]}
            />
            <SelectField
              label={t('imagesToPdf.margin')}
              value={margin}
              onChange={setMargin}
              options={[
                { value: '0', label: t('imagesToPdf.margin.none') },
                { value: '24', label: t('imagesToPdf.margin.small') },
                { value: '48', label: t('imagesToPdf.margin.medium') },
              ]}
            />
          </div>
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={create} disabled={running} aria-busy={running}>
              <Icon name="file-image" size={18} />
              {t('scanToPdf.create')}
            </button>
            <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
              {t('imagesToPdf.clear')}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('imagesToPdf.creating')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title={t('imagesToPdf.ready')}>
          <p className="muted">{t('convert.summary', { pages: t('ui.pages', { count: queue.items.length }), size: formatBytes(task.state.result.size) })}</p>
          <Notice tone="info">{t('scanToPdf.note')}</Notice>
          <div className="toolbar">
            <DownloadButton blob={task.state.result} name="scan.pdf" />
            <ResetButton onClick={reset} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
};

export default ScanToPdf;
