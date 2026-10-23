/**
 * Temporary share links (client side). The server keeps a shared file for a limited time and then deletes it; see
 * server/share.mjs (Express, files on disk) and api/share/* (Vercel Blob). Nothing is uploaded unless the visitor
 * presses the share button.
 */

export interface ShareStatus {
  enabled: boolean;
  backend: 'disk' | 'blob';
  ttlHours: number;
  maxBytes: number;
}

export interface ShareInfo {
  name: string;
  size: number;
  expiresAt: number;
  /** Address the file can be downloaded from. */
  url: string;
}

export type ShareErrorCode = 'too_large' | 'rate_limited' | 'failed';
export class ShareError extends Error {
  constructor(readonly code: ShareErrorCode) {
    super(code);
  }
}

let statusRequest: Promise<ShareStatus | null> | null = null;

/** Whether this site can create share links (null when the feature is off or the server cannot be reached). */
export function shareStatus(): Promise<ShareStatus | null> {
  statusRequest ??= fetch('/api/share/status', { cache: 'no-store' })
    .then((r) => (r.ok ? (r.json() as Promise<ShareStatus>) : null))
    .then((s) => (s && s.enabled ? s : null))
    .catch(() => null);
  return statusRequest;
}

const randomId = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/** The same cleaning the server applies: no folders or control characters, bounded length. */
// eslint-disable-next-line no-control-regex
const cleanName = (name: string) => (name.split(/[\/]/).pop() ?? '').replace(/[\u0000-\u001f<>:"|?*]/g, '').replace(/^[\s.]+/, '').trim().slice(0, 120) || 'file';

/** Uploads the file and returns its id and expiry. */
export async function createShare(blob: Blob, name: string, status: ShareStatus): Promise<{ id: string; expiresAt: number }> {
  if (blob.size > status.maxBytes) throw new ShareError('too_large');
  const safe = cleanName(name);
  try {
    if (status.backend === 'blob') {
      const id = randomId();
      const expiresAt = Date.now() + status.ttlHours * 3_600_000;
      const { upload } = await import('@vercel/blob/client');
      await upload(`share/${id}/${expiresAt}__${safe}`, blob, { access: 'public', handleUploadUrl: '/api/share/upload', contentType: blob.type || 'application/octet-stream' });
      return { id, expiresAt };
    }
    const res = await fetch(`/api/share?name=${encodeURIComponent(safe)}`, { method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: blob });
    if (res.status === 413) throw new ShareError('too_large');
    if (res.status === 429) throw new ShareError('rate_limited');
    if (!res.ok) throw new ShareError('failed');
    const body = (await res.json()) as { id: string; expiresAt: number };
    return { id: body.id, expiresAt: body.expiresAt };
  } catch (err) {
    throw err instanceof ShareError ? err : new ShareError('failed');
  }
}

/** Looks a shared file up; null when it has expired or never existed. */
export async function fetchShare(id: string): Promise<ShareInfo | null> {
  const res = await fetch(`/api/share/info?id=${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new ShareError('failed');
  return (await res.json()) as ShareInfo;
}
