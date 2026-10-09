import { useEffect, useState } from 'react';
import { tr, useI18n } from '@/i18n';
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
    reader.onerror = () => reject(new Error(tr('imageToBase64.err.read')));
    reader.readAsDataURL(file);
  });
}

const ImageToBase64: ToolImplementation = () => {
  const { t } = useI18n();
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
            <div className="preview-box">{preview && <img src={preview} alt={t('imageToBase64.previewAlt', { name: file.name })} />}</div>
            <div className="stack">
              <div className="stat-grid">
                <div className="stat">
                  <b>{formatBytes(file.size)}</b>
                  <span>{t('imageToBase64.originalSize')}</span>
                </div>
                <div className="stat">
                  <b>{dataUrl ? formatBytes(raw.length) : '…'}</b>
                  <span>{t('imageToBase64.base64Text')}</span>
                </div>
              </div>
              <SelectField
                label={t('imageToBase64.outputFormat')}
                value={style}
                onChange={setStyle}
                options={[
                  { value: 'datauri', label: t('imageToBase64.style.datauri') },
                  { value: 'base64', label: t('imageToBase64.style.base64') },
                  { value: 'html', label: t('imageToBase64.style.html') },
                  { value: 'css', label: t('imageToBase64.style.css') },
                ]}
              />
              <div className="toolbar">
                <CopyButton text={output} label={t('imageToBase64.copy')} variant="primary" size="md" disabled={!dataUrl} />
                <button type="button" className="btn btn-secondary" disabled={!dataUrl} onClick={() => downloadText(output, `${baseName(file.name)}-base64.txt`)}>
                  {t('imageToBase64.download')}
                </button>
                <button type="button" className="btn btn-ghost" onClick={queue.clear}>
                  {t('imageToBase64.chooseAnother')}
                </button>
              </div>
            </div>
          </div>
          {!dataUrl && !error && <ProcessingState label={t('imageToBase64.encoding')} />}
          {dataUrl && (
            <div className="field">
              <label className="label" htmlFor="b64-out">
                {t('imageToBase64.result')}
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
