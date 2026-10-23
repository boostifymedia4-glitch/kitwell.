/* global process */
/**
 * GET /api/share/cleanup on Vercel (run daily by the cron in vercel.json): deletes every expired shared file. When
 * CRON_SECRET is set, Vercel sends it as a bearer token and any other caller is refused.
 */
import { del, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'unauthorized' });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'not_configured' });
  let removed = 0;
  let cursor;
  try {
    do {
      const page = await list({ prefix: 'share/', cursor, limit: 500 });
      const expired = page.blobs.filter((b) => {
        const m = /^share\/[^/]+\/(\d{13})__/.exec(b.pathname);
        return !m || Number(m[1]) <= Date.now();
      });
      if (expired.length) {
        await del(expired.map((b) => b.url));
        removed += expired.length;
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return res.status(200).json({ removed });
  } catch {
    return res.status(500).json({ error: 'failed' });
  }
}
