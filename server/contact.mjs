/**
 * Contact form endpoint.
 *
 * Messages are forwarded to the webhook in CONTACT_WEBHOOK_URL (a Slack/Discord/Make/Zapier/Formspree-style
 * endpoint that accepts JSON). Nothing is stored on this server. When the variable is not set the endpoint
 * answers 503 `not_configured`, and the page says so instead of pretending the message was sent.
 */
import express from 'express';
import rateLimit from 'express-rate-limit';
import { contactConfigured, handleSubmission, validateContact, TOPICS, LIMITS } from './contactCore.mjs';

export { contactConfigured, validateContact, TOPICS, LIMITS };

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
    const result = await handleSubmission(req.body, { env, fetchImpl });
    return res.status(result.status).json(result.body);
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
