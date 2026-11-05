/** Rules for the contact form. They mirror server/contact.mjs, which re-checks everything on the server. */
export const CONTACT_TOPICS = ['general', 'technical', 'tool-error', 'suggestion', 'privacy', 'other'] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];
/** The message needs at least `minMessage` characters. The large upper value only guards the server; people never see it. */
export const CONTACT_LIMITS = { name: 80, email: 120, message: 50000, minMessage: 10, page: 200 } as const;

/** One optional attachment: pictures, PDF, Word and plain text files of up to 3 MB. */
export const ATTACHMENT_RULES = {
  maxBytes: 3 * 1024 * 1024,
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'txt', 'doc', 'docx'],
} as const;

export interface ContactForm {
  name: string;
  email: string;
  topic: ContactTopic | '';
  message: string;
  page: string;
  /** The person ticked "I agree to the Terms & Conditions and Privacy Policy". */
  agree: boolean;
}

export type ContactField = 'name' | 'email' | 'topic' | 'message' | 'agree';
export type AttachmentProblem = 'type' | 'size' | 'empty';

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

/** Returns the invalid fields, in form order. An empty list means the form can be sent. */
export function invalidContactFields(form: ContactForm): ContactField[] {
  const out: ContactField[] = [];
  if (!form.name.trim()) out.push('name');
  if (!EMAIL.test(form.email.trim())) out.push('email');
  if (!CONTACT_TOPICS.includes(form.topic as ContactTopic)) out.push('topic');
  const len = form.message.trim().length;
  if (len < CONTACT_LIMITS.minMessage || len > CONTACT_LIMITS.message) out.push('message');
  if (!form.agree) out.push('agree');
  return out;
}

/** What is wrong with a chosen file, or null when it can be attached. */
export function checkAttachment(file: Pick<File, 'name' | 'size'>): AttachmentProblem | null {
  const ext = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : '';
  if (!(ATTACHMENT_RULES.extensions as readonly string[]).includes(ext)) return 'type';
  if (file.size === 0) return 'empty';
  if (file.size > ATTACHMENT_RULES.maxBytes) return 'size';
  return null;
}

/** The content of a file as base64 text, the way it travels inside the message. */
export function readBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const text = String(reader.result);
      resolve(text.slice(text.indexOf(',') + 1));
    };
    reader.readAsDataURL(file);
  });
}

export type ContactResult = 'sent' | 'not_configured' | 'rate_limited' | 'delivery_failed' | 'invalid' | 'network';

export interface ContactPayload extends ContactForm {
  website: string;
  attachment?: { name: string; data: string };
}

/** Posts the form. Only a 2xx answer from the server counts as sent. */
export async function sendContact(form: ContactPayload, fetchImpl: typeof fetch = fetch): Promise<ContactResult> {
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
