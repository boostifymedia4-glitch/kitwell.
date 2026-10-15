import { contactConfigured } from '../../server/contactCore.mjs';

/** GET /api/contact/status: tells the Contact page whether messages can be delivered. */
export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ configured: contactConfigured() });
}
