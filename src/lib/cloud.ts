/**
 * Google Drive and Dropbox: choosing a file to open and saving a result, with the providers' own official pickers and
 * APIs. Only public identifiers are used in the browser (a Google OAuth client ID and API key, a Dropbox app key); there
 * is no client secret anywhere. A provider is offered only when its variables were set at build time:
 *
 *   VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_API_KEY (and optionally VITE_GOOGLE_APP_ID, the Cloud project number)
 *   VITE_DROPBOX_APP_KEY
 *
 * Tokens stay in memory only. Files chosen by the visitor are downloaded straight into the browser and processed
 * locally like any other file.
 */

const env = import.meta.env as Record<string, string | undefined>;

export type CloudService = 'google' | 'dropbox';

export const googleConfigured = () => Boolean(env.VITE_GOOGLE_CLIENT_ID && env.VITE_GOOGLE_API_KEY);
export const dropboxConfigured = () => Boolean(env.VITE_DROPBOX_APP_KEY);
export const cloudConfigured = () => googleConfigured() || dropboxConfigured();

export class CloudError extends Error {
  constructor(readonly service: CloudService, readonly kind: 'cancelled' | 'failed') {
    super(`${service} ${kind}`);
  }
}

const scripts = new Map<string, Promise<void>>();
function loadScript(src: string, attrs: Record<string, string> = {}): Promise<void> {
  let p = scripts.get(src);
  if (!p) {
    p = new Promise<void>((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      el.onload = () => resolve();
      el.onerror = () => {
        scripts.delete(src);
        reject(new Error(`could not load ${src}`));
      };
      document.head.appendChild(el);
    });
    scripts.set(src, p);
  }
  return p;
}

const MIME: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',
  txt: 'text/plain',
  html: 'text/html',
  json: 'application/json',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

// ---------- Google Drive (Google Identity Services + Picker + Drive API, scope drive.file) ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
    gapi?: any;
  }
}

let googleToken: { value: string; until: number } | null = null;

async function googleAccessToken(): Promise<string> {
  if (googleToken && googleToken.until > Date.now() + 30_000) return googleToken.value;
  try {
    await loadScript('https://accounts.google.com/gsi/client');
  } catch {
    throw new CloudError('google', 'failed');
  }
  return new Promise<string>((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: env.VITE_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.file',
      callback: (r: { access_token?: string; expires_in?: number; error?: string }) => {
        if (!r.access_token) return reject(new CloudError('google', r.error === 'access_denied' ? 'cancelled' : 'failed'));
        googleToken = { value: r.access_token, until: Date.now() + (r.expires_in ?? 3000) * 1000 };
        resolve(r.access_token);
      },
      error_callback: (e: { type?: string }) => reject(new CloudError('google', e?.type === 'popup_closed' ? 'cancelled' : 'failed')),
    });
    client.requestAccessToken();
  });
}

export async function pickFromGoogleDrive(opts: { extensions: string[]; multiple: boolean }): Promise<File[]> {
  const token = await googleAccessToken();
  try {
    await loadScript('https://apis.google.com/js/api.js');
    await new Promise<void>((resolve) => window.gapi.load('picker', () => resolve()));
  } catch {
    throw new CloudError('google', 'failed');
  }
  const picked = await new Promise<{ id: string; name: string }[]>((resolve, reject) => {
    const g = window.google.picker;
    const view = new g.DocsView(g.ViewId.DOCS).setIncludeFolders(true);
    const mimes = [...new Set(opts.extensions.map((e) => MIME[e]).filter(Boolean))];
    if (mimes.length === opts.extensions.length && mimes.length) view.setMimeTypes(mimes.join(','));
    const builder = new g.PickerBuilder().addView(view).setOAuthToken(token).setDeveloperKey(env.VITE_GOOGLE_API_KEY);
    if (env.VITE_GOOGLE_APP_ID) builder.setAppId(env.VITE_GOOGLE_APP_ID);
    if (opts.multiple) builder.enableFeature(g.Feature.MULTISELECT_ENABLED);
    builder
      .setCallback((data: any) => {
        if (data.action === g.Action.PICKED) resolve((data.docs as any[]).map((d) => ({ id: d.id, name: d.name })));
        else if (data.action === g.Action.CANCEL) reject(new CloudError('google', 'cancelled'));
      })
      .build()
      .setVisible(true);
  });
  const files: File[] = [];
  for (const doc of picked) {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(doc.id)}?alt=media`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new CloudError('google', 'failed');
    files.push(new File([await res.blob()], doc.name, { type: res.headers.get('Content-Type') ?? '' }));
  }
  return files;
}

export async function saveToGoogleDrive(blob: Blob, name: string): Promise<void> {
  const token = await googleAccessToken();
  const boundary = `kitwell${Math.random().toString(36).slice(2)}`;
  const mime = blob.type || 'application/octet-stream';
  const body = new Blob([`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ name, mimeType: mime })}\r\n--${boundary}\r\nContent-Type: ${mime}\r\n\r\n`, blob, `\r\n--${boundary}--`]);
  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  });
  if (!res.ok) throw new CloudError('google', 'failed');
}

// ---------- Dropbox (Chooser for opening, OAuth token + upload API for saving) ----------

export async function pickFromDropbox(opts: { extensions: string[]; multiple: boolean }): Promise<File[]> {
  try {
    await loadScript('https://www.dropbox.com/static/api/2/dropins.js', { id: 'dropboxjs', 'data-app-key': env.VITE_DROPBOX_APP_KEY ?? '' });
  } catch {
    throw new CloudError('dropbox', 'failed');
  }
  const chosen = await new Promise<{ name: string; link: string }[]>((resolve, reject) => {
    (window as any).Dropbox.choose({
      linkType: 'direct',
      multiselect: opts.multiple,
      extensions: opts.extensions.map((e) => `.${e}`),
      success: (files: { name: string; link: string }[]) => resolve(files),
      cancel: () => reject(new CloudError('dropbox', 'cancelled')),
    });
  });
  const files: File[] = [];
  for (const f of chosen) {
    const res = await fetch(f.link);
    if (!res.ok) throw new CloudError('dropbox', 'failed');
    files.push(new File([await res.blob()], f.name, { type: res.headers.get('Content-Type') ?? '' }));
  }
  return files;
}

let dropboxToken: string | null = null;

/** Opens Dropbox's sign-in in a pop-up (implicit grant, no secret) and resolves with the access token. */
function dropboxAccessToken(): Promise<string> {
  if (dropboxToken) return Promise.resolve(dropboxToken);
  return new Promise<string>((resolve, reject) => {
    const state = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
    const redirect = `${window.location.origin}/oauth/dropbox.html`;
    const url = `https://www.dropbox.com/oauth2/authorize?${new URLSearchParams({ client_id: env.VITE_DROPBOX_APP_KEY ?? '', response_type: 'token', redirect_uri: redirect, state, scope: 'files.content.write' })}`;
    const popup = window.open(url, 'kitwell-dropbox', 'width=560,height=700');
    if (!popup) return reject(new CloudError('dropbox', 'failed'));
    const done = (fn: () => void) => {
      window.removeEventListener('message', onMessage);
      window.clearInterval(watch);
      fn();
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || !e.data || e.data.type !== 'kitwell-dropbox-token' || e.data.state !== state) return;
      done(() => {
        if (typeof e.data.token === 'string' && e.data.token) {
          dropboxToken = e.data.token;
          resolve(e.data.token);
        } else reject(new CloudError('dropbox', 'cancelled'));
      });
    };
    window.addEventListener('message', onMessage);
    const watch = window.setInterval(() => {
      if (popup.closed) done(() => reject(new CloudError('dropbox', 'cancelled')));
    }, 600);
  });
}

export async function saveToDropbox(blob: Blob, name: string): Promise<void> {
  const token = await dropboxAccessToken();
  // The API argument travels in a header, so every non-ASCII character is written as a \u escape.
  const arg = JSON.stringify({ path: `/${name}`, mode: 'add', autorename: true }).replace(/[\u007f-￿]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);
  const res = await fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Dropbox-API-Arg': arg, 'Content-Type': 'application/octet-stream' },
    body: blob,
  });
  if (res.status === 401) dropboxToken = null;
  if (!res.ok) throw new CloudError('dropbox', 'failed');
}
