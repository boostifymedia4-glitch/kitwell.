import { useEffect, useState } from 'react';
import { IMAGE_EXTENSIONS } from '@/components/tool/BatchImageTool';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { SelectField } from '@/components/tool/Fields';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { downloadText } from '@/lib/download';
import { MB } from '@/lib/files';
import { baseName, formatBytes } from '@/lib/format';
import { useFileQueue, useObjectUrl } from '@/lib/hooks';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 5 * MB;
type Style = 'datauri' | 'base64' | 'html' | 'css';

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('The file could not be read.'));
    reader.readAsDataURL(file);
  });
}

const ImageToBase64: ToolImplementation = () => {
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_BYTES, maxFiles: 1 }, false);
  const file = queue.items[0]?.file ?? null;
  const preview = useObjectUrl(file);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [style, setStyle] = useState<Style>('datauri');

  useEffect(() => {
    setDataUrl(null);
    setError(null);
    if (!file) return;
    let cancelled = false;
    readAsDataUrl(file)
      .then((d) => !cancelled && setDataUrl(d))
      .catch((e: Error) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [file]);

  const raw = dataUrl?.split(',')[1] ?? '';
  const output = !dataUrl
    ? ''
    : style === 'datauri'
      ? dataUrl
      : style === 'base64'
        ? raw
        : style === 'html'
          ? `<img src="${dataUrl}" alt="" />`
          : `background-image: url("${dataUrl}");`;

  return (
    <div className="stack">
      {!file && <UploadDropzone extensions={IMAGE_EXTENSIONS} maxBytes={MAX_BYTES} onFiles={queue.add} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {file && (
        <>
          <div className="two-col">
            <div className="preview-box">{preview && <img src={preview} alt={`Preview of ${file.name}`} />}</div>
            <div className="stack">
              <div className="stat-grid">
                <div className="stat">
                  <b>{formatBytes(file.size)}</b>
                  <span>Original size</span>
                </div>
                <div className="stat">
                  <b>{dataUrl ? formatBytes(raw.length) : '…'}</b>
                  <span>Base64 text</span>
                </div>
              </div>
              <SelectField
                label="Output format"
                value={style}
                onChange={setStyle}
                options={[
                  { value: 'datauri', label: 'Data URI' },
                  { value: 'base64', label: 'Base64 only' },
                  { value: 'html', label: 'HTML <img> tag' },
                  { value: 'css', label: 'CSS background-image' },
                ]}
              />
              <div className="toolbar">
                <CopyButton text={output} label="Copy result" variant="primary" size="md" disabled={!dataUrl} />
                <button type="button" className="btn btn-secondary" disabled={!dataUrl} onClick={() => downloadText(output, `${baseName(file.name)}-base64.txt`)}>
                  Download .txt
                </button>
                <button type="button" className="btn btn-ghost" onClick={queue.clear}>
                  Choose another image
                </button>
              </div>
            </div>
          </div>
          {!dataUrl && !error && <ProcessingState label="Encoding…" />}
          {dataUrl && (
            <div className="field">
              <label className="label" htmlFor="b64-out">
                Result
              </label>
              <textarea id="b64-out" className="textarea" readOnly value={output} rows={8} onFocus={(e) => e.currentTarget.select()} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageToBase64;
