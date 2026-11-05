/**
 * Contact form rules shared by the Express server (server/contact.mjs) and the Vercel functions in /api.
 * Messages are forwarded to the webhook in CONTACT_WEBHOOK_URL; nothing is stored here.
 */
export const TOPICS = ['general', 'technical', 'tool-error', 'suggestion', 'privacy', 'other'];
export const TOPIC_LABELS = {
  general: 'General Question',
  technical: 'Technical Issue',
  'tool-error': 'Tool Error',
  suggestion: 'Feature Suggestion',
  privacy: 'Privacy Request',
  other: 'Other',
};
/** The message has no limit that people notice; the cap only protects the server from absurdly large bodies. */
export const LIMITS = { name: 80, email: 120, message: 50000, minMessage: 10, page: 200 };

/**
 * One optional attachment, sent as base64 inside the JSON body. It is checked again here, whatever the browser did: the
 * extension must be on the list, the bytes must really look like that kind of file, and it must fit in 3 MB (Vercel
 * functions accept bodies of up to 4.5 MB, and base64 adds a third).
 */
export const ATTACHMENT = {
  maxBytes: 3 * 1024 * 1024,
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'txt', 'doc', 'docx'],
};
const startsWith = (bytes, sig, at = 0) => sig.every((b, i) => bytes[at + i] === b);
const SIGNATURES = {
  jpg: (b) => startsWith(b, [0xff, 0xd8, 0xff]),
  jpeg: (b) => startsWith(b, [0xff, 0xd8, 0xff]),
  png: (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  gif: (b) => startsWith(b, [0x47, 0x49, 0x46, 0x38]),
  webp: (b) => startsWith(b, [0x52, 0x49, 0x46, 0x46]) && startsWith(b, [0x57, 0x45, 0x42, 0x50], 8),
  pdf: (b) => startsWith(b, [0x25, 0x50, 0x44, 0x46]),
  doc: (b) => startsWith(b, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
  docx: (b) => startsWith(b, [0x50, 0x4b, 0x03, 0x04]),
  // Plain text: no NUL bytes and valid UTF-8.
  txt: (b) => {
    if (b.includes(0)) return false;
    try {
      new TextDecoder('utf-8', { fatal: true }).decode(b);
      return true;
    } catch {
      return false;
    }
  },
};
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

/** Returns `{ ok: true, value }` (with the real size and a safe file name) or `{ ok: false }`. */
export function validateAttachment(a) {
  if (!a || typeof a !== 'object' || typeof a.data !== 'string' || typeof a.name !== 'string') return { ok: false };
  // The encoded text is about a third larger than the file; refuse anything clearly too big before decoding it.
  if (a.data.length === 0 || a.data.length > Math.ceil((ATTACHMENT.maxBytes * 4) / 3) + 8 || !BASE64.test(a.data)) return { ok: false };
  const base = a.name.split(/[\\/]/).pop() ?? '';
  const name = [...base].filter(keep).join('').replace(/[<>:"|?*]/g, '_').trim().slice(0, 100);
  const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
  if (!name || !ATTACHMENT.extensions.includes(ext)) return { ok: false };
  const bytes = Buffer.from(a.data, 'base64');
  if (bytes.length === 0 || bytes.length > ATTACHMENT.maxBytes) return { ok: false };
  if (!SIGNATURES[ext](bytes)) return { ok: false };
  return { ok: true, value: { name, extension: ext, size: bytes.length, data: a.data } };
}

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
/** Trims, caps the length and drops control characters (tab, line feed and carriage return are kept). */
const keep = (c) => {
  const n = c.charCodeAt(0);
  return (n >= 32 && n !== 127) || n === 9 || n === 10 || n === 13;
};
const clean = (v, max) => (typeof v === 'string' ? [...v].filter(keep).join('').trim().slice(0, max) : '');

/** Returns `{ ok: true, value }` or `{ ok: false, fields }` listing the invalid field names. */
export function validateContact(body) {
  const b = body && typeof body === 'object' ? body : {};
  const value = {
    name: clean(b.name, LIMITS.name),
    email: clean(b.email, LIMITS.email),
    topic: TOPICS.includes(b.topic) ? b.topic : '',
    message: clean(b.message, LIMITS.message + 1),
    page: clean(b.page, LIMITS.page),
  };
  const fields = [];
  const attachment = b.attachment === undefined || b.attachment === null ? null : validateAttachment(b.attachment);
  if (!value.name) fields.push('name');
  if (!EMAIL.test(value.email)) fields.push('email');
  if (!value.topic) fields.push('topic');
  if (value.message.length < LIMITS.minMessage || value.message.length > LIMITS.message) fields.push('message');
  if (b.agree !== true) fields.push('agree');
  if (attachment && !attachment.ok) fields.push('attachment');
  if (attachment && attachment.ok) value.attachment = attachment.value;
  return fields.length ? { ok: false, fields } : { ok: true, value };
}

export function contactConfigured(env = process.env) {
  return /^https?:\/\//i.test(env.CONTACT_WEBHOOK_URL ?? '');
}

/** Sends the message to the webhook. Throws when the webhook does not accept it. */
export async function forward(url, v, fetchImpl = fetch) {
  const subject = TOPIC_LABELS[v.topic] ?? v.topic;
  const text = `New message (${subject}) from ${v.name} <${v.email}>${v.page ? ` about ${v.page}` : ''}${v.attachment ? ` with attachment ${v.attachment.name} (${v.attachment.size} bytes)` : ''}\n\n${v.message}`;
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...v, subject, text, content: text.slice(0, 1900), receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook answered ${res.status}`);
}

/**
 * Handles one submission and returns `{ status, body }`. Used by the serverless function; the Express router
 * has the same behaviour. A message counts as sent only when the webhook accepted it.
 */
export async function handleSubmission(body, { env = process.env, fetchImpl = fetch } = {}) {
  // Hidden field that people never fill in. Bots do; they get a quiet success and nothing is sent.
  if (body && typeof body.website === 'string' && body.website.trim() !== '') return { status: 200, body: { ok: true } };
  const checked = validateContact(body);
  if (!checked.ok) return { status: 400, body: { error: 'invalid', fields: checked.fields } };
  if (!contactConfigured(env)) return { status: 503, body: { error: 'not_configured' } };
  try {
    await forward(env.CONTACT_WEBHOOK_URL, checked.value, fetchImpl);
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error('Contact delivery failed:', err instanceof Error ? err.message : err);
    return { status: 502, body: { error: 'delivery_failed' } };
  }
}

/** A small in-memory limiter (per server instance). The Express server uses express-rate-limit instead. */
export function createLimiter({ windowMs = 15 * 60_000, limit = 5 } = {}) {
  const hits = new Map();
  return (key, now = Date.now()) => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    return true;
  };
}
