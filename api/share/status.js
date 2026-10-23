/* global process */
/** GET /api/share/status on Vercel: share links need Vercel Blob (BLOB_READ_WRITE_TOKEN). */
import { shareLimits } from '../../server/shareCore.mjs';

export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.SHARE_DISABLED === 'true') return res.status(503).json({ error: 'not_configured' });
  const { ttlHours, maxBytes } = shareLimits();
  return res.status(200).json({ enabled: true, backend: 'blob', ttlHours, maxBytes });
}
