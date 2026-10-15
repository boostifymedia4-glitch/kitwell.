/* global process */
/**
 * Vercel serverless function for POST /api/contact (the static Vercel deployment has no Express server).
 * It uses the same rules as server/contact.mjs. Set CONTACT_WEBHOOK_URL in the Vercel project settings to deliver
 * messages; without it the function answers 503 and the page says the form is not connected.
 */
import { createLimiter, handleSubmission } from '../server/contactCore.mjs';

const limiter = createLimiter({ limit: Number(process.env.CONTACT_RATE_LIMIT) || 5 });

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (!limiter(ip)) return res.status(429).json({ error: 'rate_limited' });
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'invalid', fields: [] });
    }
  }
  if (JSON.stringify(body ?? {}).length > 16_000) return res.status(400).json({ error: 'invalid', fields: [] });
  const result = await handleSubmission(body);
  return res.status(result.status).json(result.body);
}
