import { uniqueNames } from './format';

export interface NamedBlob {
  name: string;
  blob: Blob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give the browser time to start the download before releasing the URL.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function downloadText(text: string, filename: string, type = 'text/plain') {
  downloadBlob(new Blob([text], { type: `${type};charset=utf-8` }), filename);
}

/** Build a ZIP in memory. fflate is loaded lazily so it only ships to pages that need it. */
export async function makeZip(files: NamedBlob[]): Promise<Blob> {
  const { zipSync } = await import('fflate');
  const names = uniqueNames(files.map((f) => f.name));
  const entries: Record<string, Uint8Array> = {};
  for (let i = 0; i < files.length; i++) {
    entries[names[i]] = new Uint8Array(await files[i].blob.arrayBuffer());
  }
  // Images and PDFs are already compressed; store them without extra deflate work.
  const zipped = zipSync(entries, { level: 0 });
  return new Blob([zipped.buffer as ArrayBuffer], { type: 'application/zip' });
}

export async function downloadZip(files: NamedBlob[], zipName: string) {
  downloadBlob(await makeZip(files), zipName);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for insecure contexts or denied clipboard permission.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      ta.remove();
    }
  }
}
