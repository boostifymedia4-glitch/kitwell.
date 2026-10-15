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
export const LIMITS = { name: 80, email: 120, message: 4000, minMessage: 10, page: 200 };

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
  if (!value.name) fields.push('name');
  if (!EMAIL.test(value.email)) fields.push('email');
  if (!value.topic) fields.push('topic');
  if (value.message.length < LIMITS.minMessage || value.message.length > LIMITS.message) fields.push('message');
  return fields.length ? { ok: false, fields } : { ok: true, value };
}

export function contactConfigured(env = process.env) {
  return /^https?:\/\//i.test(env.CONTACT_WEBHOOK_URL ?? '');
}

/** Sends the message to the webhook. Throws when the webhook does not accept it. */
export async function forward(url, v, fetchImpl = fetch) {
  const subject = TOPIC_LABELS[v.topic] ?? v.topic;
  const text = `New message (${subject}) from ${v.name} <${v.email}>${v.page ? ` about ${v.page}` : ''}\n\n${v.message}`;
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
