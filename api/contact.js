/* global process */
/**
 * Vercel serverless function for POST /api/contact (the static Vercel deployment has no Express server).
 * It uses the same rules as server/contact.mjs. Set CONTACT_WEBHOOK_URL in the Vercel project settings to deliver
 * messages; without it the function answers 503 and the page says the form is not connected.
 */
import { createLimiter, handleSubmission, requestAllowed } from '../server/contactCore.mjs';

const limiter = createLimiter({ limit: Number(process.env.CONTACT_RATE_LIMIT) || 5 });

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!requestAllowed(req.headers)) return res.status(403).json({ error: 'forbidden' });
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
  // A message with one attachment of up to 3 MB (sent as base64) stays below the 4.5 MB request limit of Vercel functions.
  if (JSON.stringify(body ?? {}).length > 4_500_000) return res.status(400).json({ error: 'invalid', fields: [] });
  const result = await handleSubmission(body);
  return res.status(result.status).json(result.body);
}
