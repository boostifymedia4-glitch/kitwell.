/**
 * Temporary share links for the Express server: files are kept on disk for SHARE_TTL_HOURS and then deleted.
 *
 *   GET  /api/share/status      { enabled, backend, ttlHours, maxBytes }
 *   POST /api/share?name=a.pdf  raw file body -> { id, expiresAt }
 *   GET  /api/share/info?id=ID  { name, size, expiresAt, url } or 404 (the same address the Vercel function answers)
 *   GET  /api/share/:id/file    the file as a download, or 404 (this is the `url` of the info answer)
 *
 * Set SHARE_DISABLED=true to switch the feature off, and SHARE_DIR to choose where files are stored.
 */
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { cleanShareName, createDiskShareStore, newShareId, shareContentType, shareLimits, validShareId } from './shareCore.mjs';

export function shareRouter({ env = process.env, now = Date.now } = {}) {
  const router = express.Router();
  const { ttlHours, maxBytes } = shareLimits(env);
  const enabled = env.SHARE_DISABLED !== 'true';
  const store = createDiskShareStore({ dir: env.SHARE_DIR || join(tmpdir(), 'kitwell-share'), ttlMs: ttlHours * 3_600_000, maxBytes, now });
  const timer = enabled ? setInterval(() => void store.sweep().catch(() => {}), 10 * 60_000) : null;
  timer?.unref();
  if (enabled) void store.sweep().catch(() => {});

  const uploadLimiter = rateLimit({
    windowMs: 10 * 60_000,
    limit: Number(env.SHARE_RATE_LIMIT) || 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({ error: 'rate_limited' }),
  });

  router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    if (!enabled) return res.status(503).json({ error: 'not_configured' });
    next();
  });
  router.get('/status', (_req, res) => res.json({ enabled: true, backend: 'disk', ttlHours, maxBytes }));

  router.post('/', uploadLimiter, async (req, res) => {
    const declared = Number(req.headers['content-length']);
    if (declared > maxBytes) return res.status(413).json({ error: 'too_large', maxBytes });
    try {
      const id = newShareId();
      const record = await store.put(id, req.query.name, req);
      return res.status(201).json({ id, name: record.name, size: record.size, expiresAt: record.expiresAt });
    } catch (err) {
      const status = err && err.status;
      if (status === 413) return res.status(413).json({ error: 'too_large', maxBytes });
      if (status === 400) return res.status(400).json({ error: 'invalid' });
      console.error(err);
      return res.status(500).json({ error: 'failed' });
    }
  });

  router.get('/info', async (req, res) => {
    const id = String(req.query.id ?? '');
    const record = validShareId(id) ? await store.meta(id) : null;
    if (!record) return res.status(404).json({ error: 'not_found' });
    return res.json({ name: record.name, size: record.size, expiresAt: record.expiresAt, url: `/api/share/${id}/file` });
  });

  router.get('/:id/file', async (req, res) => {
    const record = validShareId(req.params.id) ? await store.meta(req.params.id) : null;
    if (!record) return res.status(404).json({ error: 'not_found' });
    const name = cleanShareName(record.name);
    res.set({
      'Content-Type': shareContentType(name),
      'Content-Length': String(record.size),
      'Content-Disposition': `attachment; filename="${name.replace(/[^\x20-\x7e]/g, '_').replace(/"/g, '')}"; filename*=UTF-8''${encodeURIComponent(name)}`,
      'X-Content-Type-Options': 'nosniff',
    });
    store.open(req.params.id).on('error', () => res.destroy()).pipe(res);
  });

  return router;
}
