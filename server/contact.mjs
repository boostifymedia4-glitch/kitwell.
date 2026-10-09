/**
 * Contact form endpoint.
 *
 * Messages are forwarded to the webhook in CONTACT_WEBHOOK_URL (a Slack/Discord/Make/Zapier/Formspree-style
 * endpoint that accepts JSON). Nothing is stored on this server. When the variable is not set the endpoint
 * answers 503 `not_configured`, and the page says so instead of pretending the message was sent.
 */
import express from 'express';
import rateLimit from 'express-rate-limit';

export const TOPICS = ['bug', 'suggestion', 'question', 'other'];
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

async function forward(url, v, fetchImpl) {
  const text = `New ${v.topic} message from ${v.name} <${v.email}>${v.page ? ` (about ${v.page})` : ''}\n\n${v.message}`;
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...v, text, content: text.slice(0, 1900), receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook answered ${res.status}`);
}

/** Express router mounted at /api/contact. `fetchImpl` and `env` can be replaced in tests. */
export function contactRouter({ env = process.env, fetchImpl = fetch } = {}) {
  const router = express.Router();
  router.use(express.json({ limit: '16kb' }));
  const limiter = rateLimit({
    windowMs: 15 * 60_000,
    limit: Number(env.CONTACT_RATE_LIMIT) || 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({ error: 'rate_limited' }),
  });

  router.get('/status', (_req, res) => res.set('Cache-Control', 'no-store').json({ configured: contactConfigured(env) }));

  router.post('/', limiter, async (req, res) => {
    res.set('Cache-Control', 'no-store');
    // Hidden field that people never fill in. Bots do; they get a quiet success and nothing is sent.
    if (req.body && typeof req.body.website === 'string' && req.body.website.trim() !== '') return res.json({ ok: true });
    const checked = validateContact(req.body);
    if (!checked.ok) return res.status(400).json({ error: 'invalid', fields: checked.fields });
    if (!contactConfigured(env)) return res.status(503).json({ error: 'not_configured' });
    try {
      await forward(env.CONTACT_WEBHOOK_URL, checked.value, fetchImpl);
      return res.json({ ok: true });
    } catch (err) {
      console.error('Contact delivery failed:', err instanceof Error ? err.message : err);
      return res.status(502).json({ error: 'delivery_failed' });
    }
  });

  // Malformed JSON and oversized bodies.
  router.use((err, _req, res, next) => {
    if (err && (err.type === 'entity.parse.failed' || err.type === 'entity.too.large')) return res.status(400).json({ error: 'invalid', fields: [] });
    return next(err);
  });
  return router;
}

/** An app that serves only the contact endpoint. Used by the tests. */
export function contactApp(options) {
  const app = express();
  app.use('/api/contact', contactRouter(options));
  return app;
}
