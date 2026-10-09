import { useMemo, useState } from 'react';
import { tr, useI18n } from '@/i18n';
import { ErrorMessage } from '@/components/tool/Feedback';
import { DownloadButton } from '@/components/tool/Results';
import { base64ToBytes } from '@/lib/dev';
import { MB } from '@/lib/files';
import { formatBytes } from '@/lib/format';
import { useObjectUrl } from '@/lib/hooks';
import type { ToolImplementation } from '../../types';

const MAX_BYTES = 10 * MB;

interface Decoded {
  blob: Blob;
  ext: string;
}

/** Identify the image type from its file signature, not from what the text claims. */
function sniff(bytes: Uint8Array): { mime: string; ext: string } | null {
  const b = bytes;
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { mime: 'image/png', ext: 'png' };
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { mime: 'image/jpeg', ext: 'jpg' };
  if (b.length > 6 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return { mime: 'image/gif', ext: 'gif' };
  if (b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) {
    return { mime: 'image/webp', ext: 'webp' };
  }
  return null;
}

function decode(input: string): Decoded | { error: string } | null {
  const text = input.trim();
  if (!text) return null;
  let payload = text;
  const m = /^data:([^;,]*)((?:;[^;,]*)*),/i.exec(text);
  if (m) {
    if (/svg/i.test(m[1])) return { error: tr('base64ToImage.err.svg') };
    if (!/;base64/i.test(m[2])) return { error: tr('base64ToImage.err.notBase64') };
    payload = text.slice(m[0].length);
  }
  const estimated = Math.floor((payload.replace(/\s+/g, '').length * 3) / 4);
  if (estimated > MAX_BYTES) return { error: tr('base64ToImage.err.tooLarge', { limit: formatBytes(MAX_BYTES) }) };
  let bytes: Uint8Array;
  try {
    bytes = base64ToBytes(payload);
  } catch (e) {
    return { error: (e as Error).message };
  }
  const type = sniff(bytes);
  if (!type) return { error: tr('base64ToImage.err.notImage') };
  return { blob: new Blob([bytes.buffer as ArrayBuffer], { type: type.mime }), ext: type.ext };
}

const Base64ToImage: ToolImplementation = () => {
  const { t } = useI18n();
  const [input, setInput] = useState('');
  const [imgError, setImgError] = useState(false);
  const result = useMemo(() => decode(input), [input]);
  const decoded = result && 'blob' in result ? result : null;
  const url = useObjectUrl(decoded?.blob);

  return (
    <div className="stack">
      <div className="field">
        <label className="label" htmlFor="b64-in">
          {t('base64ToImage.label')}
        </label>
        <textarea
          id="b64-in"
          className="textarea"
          rows={8}
          spellCheck={false}
          placeholder={t('base64ToImage.placeholder')}
          value={input}
          aria-invalid={Boolean(result && 'error' in result)}
          onChange={(e) => {
            setInput(e.target.value);
            setImgError(false);
          }}
        />
      </div>
      {result && 'error' in result && <ErrorMessage>{result.error}</ErrorMessage>}
      {imgError && <ErrorMessage>{t('base64ToImage.err.display')}</ErrorMessage>}
      {!input.trim() && <p className="hint">{t('base64ToImage.hint')}</p>}
      {decoded && url && (
        <div className="stack">
          <div className="preview-box">
            <img src={url} alt={t('base64ToImage.decodedAlt')} onError={() => setImgError(true)} />
          </div>
          <div className="toolbar">
            <DownloadButton blob={decoded.blob} name={`image.${decoded.ext}`} label={t('base64ToImage.download', { ext: decoded.ext, size: formatBytes(decoded.blob.size) })} />
            <button type="button" className="btn btn-ghost" onClick={() => setInput('')}>
              {t('base64ToImage.clear')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base64ToImage;
