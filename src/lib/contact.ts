/** Rules for the contact form. They mirror server/contact.mjs, which re-checks everything on the server. */
export const CONTACT_TOPICS = ['bug', 'suggestion', 'question', 'other'] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];
export const CONTACT_LIMITS = { name: 80, email: 120, message: 4000, minMessage: 10, page: 200 } as const;

export interface ContactForm {
  name: string;
  email: string;
  topic: ContactTopic | '';
  message: string;
  page: string;
}

export type ContactField = 'name' | 'email' | 'topic' | 'message';

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

/** Returns the invalid fields, in form order. An empty list means the form can be sent. */
export function invalidContactFields(form: ContactForm): ContactField[] {
  const out: ContactField[] = [];
  if (!form.name.trim()) out.push('name');
  if (!EMAIL.test(form.email.trim())) out.push('email');
  if (!CONTACT_TOPICS.includes(form.topic as ContactTopic)) out.push('topic');
  const len = form.message.trim().length;
  if (len < CONTACT_LIMITS.minMessage || len > CONTACT_LIMITS.message) out.push('message');
  return out;
}

/** True when the configured address is a real one and not the "[add before launch]" placeholder. */
export const isRealEmail = (value: string) => /^[^\s@[\]]+@[^\s@[\]]+\.[A-Za-z]{2,}$/.test(value);

export type ContactResult = 'sent' | 'not_configured' | 'rate_limited' | 'delivery_failed' | 'invalid' | 'network';

/** Posts the form. Only a 2xx answer from the server counts as sent. */
export async function sendContact(form: ContactForm & { website: string }, fetchImpl: typeof fetch = fetch): Promise<ContactResult> {
  try {
    const res = await fetchImpl('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) return 'sent';
    if (res.status === 503) return 'not_configured';
    if (res.status === 429) return 'rate_limited';
    if (res.status === 400) return 'invalid';
    return 'delivery_failed';
  } catch {
    return 'network';
  }
}

/** Asks the server whether messages can be delivered. Null when that could not be found out. */
export async function contactConfigured(fetchImpl: typeof fetch = fetch): Promise<boolean | null> {
  try {
    const res = await fetchImpl('/api/contact/status');
    if (!res.ok) return null;
    const data = (await res.json()) as { configured?: boolean };
    return Boolean(data.configured);
  } catch {
    return null;
  }
}
