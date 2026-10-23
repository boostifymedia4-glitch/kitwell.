/* global process */
/**
 * GET /api/share/info?id=<id> on Vercel: the name, size, expiry and download address of a shared file, or 404 once it
 * has expired. (Locally the Express server answers /api/share/:id instead.)
 */
import { del, list } from '@vercel/blob';
import { validShareId } from '../../server/shareCore.mjs';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.SHARE_DISABLED === 'true') return res.status(503).json({ error: 'not_configured' });
  const id = String(req.query.id ?? '');
  if (!validShareId(id)) return res.status(404).json({ error: 'not_found' });
  try {
    const { blobs } = await list({ prefix: `share/${id}/`, limit: 1 });
    const blob = blobs[0];
    const m = blob && /^share\/[^/]+\/(\d{13})__(.+)$/.exec(blob.pathname);
    if (!blob || !m) return res.status(404).json({ error: 'not_found' });
    const expiresAt = Number(m[1]);
    if (expiresAt <= Date.now()) {
      await del(blob.url).catch(() => {});
      return res.status(404).json({ error: 'not_found' });
    }
    return res.status(200).json({ name: m[2], size: blob.size, expiresAt, url: blob.downloadUrl });
  } catch {
    return res.status(500).json({ error: 'failed' });
  }
}
