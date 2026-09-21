import { useEffect, useState } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { SelectField } from '@/components/tool/Fields';
import { FileList } from '@/components/tool/FileList';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { formatBytes } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { INPUT_EXTENSIONS } from '@/lib/imageFormats';
import { imagesToPdf, type ImageInput, type ImagesToPdfOptions } from '@/lib/pdfOps';
import { processImage } from '@/lib/image';
import type { ToolImplementation } from '../../types';

const MAX_IMAGES = 100;

/** Detect JPEG/PNG by file signature so a mislabelled extension does not break embedding. */
function kindOf(bytes: Uint8Array): ImageInput['kind'] | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'png';
  return null;
}

const ImagesToPdf: ToolImplementation = ({ tool }) => {
  const accept = tool.config?.accept ?? 'any';
  const extensions = INPUT_EXTENSIONS[accept] ?? IMAGE_EXTENSIONS;
  const queue = useFileQueue({ extensions, maxBytes: MAX_IMAGE_BYTES, maxFiles: MAX_IMAGES }, true);
  const task = useTask<Blob>();
  const { reset: resetTask } = task;
  const [pageSize, setPageSize] = useState<ImagesToPdfOptions['pageSize']>('a4');
  const [orientation, setOrientation] = useState<ImagesToPdfOptions['orientation']>('auto');
  const [margin, setMargin] = useState('24');

  useEffect(() => {
    resetTask();
  }, [queue.items, resetTask]);

  const running = task.state.status === 'running';

  const create = () =>
    task.run(async (report) => {
      const images: ImageInput[] = [];
      for (let i = 0; i < queue.items.length; i++) {
        const { file } = queue.items[i];
        report(i, queue.items.length, `Reading ${file.name}`);
        let bytes = new Uint8Array(await file.arrayBuffer());
        let kind = kindOf(bytes);
        if (!kind) {
          // WebP, GIF, BMP, AVIF: let the browser decode them and embed a lossless PNG.
          try {
            const png = await processImage(file, { mime: 'image/png', quality: 1, background: '#ffffff' });
            bytes = new Uint8Array(await png.blob.arrayBuffer());
            kind = 'png';
          } catch (err) {
            throw new Error(`${file.name}: ${(err as Error).message}`, { cause: err });
          }
        }
        images.push({ bytes, kind });
      }
      report(queue.items.length, queue.items.length, 'Building PDF');
      const out = await imagesToPdf(images, { pageSize, orientation, margin: Number(margin) });
      return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
    });

  const reset = () => {
    queue.clear();
    task.reset();
  };

  return (
    <div className="stack">
      <UploadDropzone
        extensions={extensions}
        multiple
        maxBytes={MAX_IMAGE_BYTES}
        maxFiles={MAX_IMAGES}
        disabled={running}
        compact={queue.items.length > 0}
        title={queue.items.length ? 'Add more images' : undefined}
        onFiles={queue.add}
      />
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      <FileList items={queue.items} kind="image" onRemove={queue.remove} onMove={queue.move} disabled={running} />
      {queue.items.length > 0 && (
        <>
          <p className="hint">Each image becomes one page, in the order shown. Drag rows or use the arrows to reorder.</p>
          <div className="options-grid">
            <SelectField
              label="Page size"
              value={pageSize}
              onChange={setPageSize}
              options={[
                { value: 'a4', label: 'A4' },
                { value: 'letter', label: 'US Letter' },
                { value: 'fit', label: 'Fit to image' },
              ]}
            />
            <SelectField
              label="Orientation"
              value={orientation}
              onChange={setOrientation}
              hint={pageSize === 'fit' ? 'Not used when the page fits each image.' : undefined}
              options={[
                { value: 'auto', label: 'Automatic' },
                { value: 'portrait', label: 'Portrait' },
                { value: 'landscape', label: 'Landscape' },
              ]}
            />
            <SelectField
              label="Margin"
              value={margin}
              onChange={setMargin}
              options={[
                { value: '0', label: 'None' },
                { value: '24', label: 'Small' },
                { value: '48', label: 'Medium' },
                { value: '72', label: 'Large' },
              ]}
            />
          </div>
          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={create} disabled={running}>
              <Icon name="file-image" size={18} />
              Create PDF
            </button>
            <button type="button" className="btn btn-ghost" onClick={reset} disabled={running}>
              Clear all
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label="Creating PDF…" progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {task.state.status === 'done' && (
        <ResultPanel title="Your PDF is ready">
          <p className="muted">
            {queue.items.length} {queue.items.length === 1 ? 'page' : 'pages'} · {formatBytes(task.state.result.size)}
          </p>
          <div className="toolbar">
            <DownloadButton blob={task.state.result} name="images.pdf" label="Download images.pdf" />
            <ResetButton onClick={reset} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
};

export default ImagesToPdf;
