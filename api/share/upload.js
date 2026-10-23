/* global process */
/**
 * POST /api/share/upload on Vercel: issues a short-lived client token so the browser can upload the file straight to
 * Vercel Blob (serverless functions cannot take large request bodies). The pathname must look like
 * share/<id>/<expiresAt>__<name>, and the expiry may not be further away than SHARE_TTL_HOURS.
 */
import { handleUpload } from '@vercel/blob/client';
import { cleanShareName, shareLimits, validShareId } from '../../server/shareCore.mjs';

const PATH = /^share\/([A-Za-z0-9_-]{16,64})\/(\d{13})__(.{1,120})$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.SHARE_DISABLED === 'true') return res.status(503).json({ error: 'not_configured' });
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'invalid' });
    }
  }
  const { ttlHours, maxBytes } = shareLimits();
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const m = PATH.exec(pathname);
        const expiresAt = m ? Number(m[2]) : 0;
        const now = Date.now();
        if (!m || !validShareId(m[1]) || cleanShareName(m[3]) !== m[3] || expiresAt < now || expiresAt > now + ttlHours * 3_600_000 + 120_000) throw new Error('invalid path');
        return { maximumSizeInBytes: maxBytes, addRandomSuffix: false, allowOverwrite: false, validUntil: now + 15 * 60_000 };
      },
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(result);
  } catch {
    return res.status(400).json({ error: 'invalid' });
  }
}
