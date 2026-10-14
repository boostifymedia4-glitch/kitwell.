import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { afterEach, describe, expect, it } from 'vitest';
// @ts-expect-error plain JS modules without types
import { contactApp, contactConfigured, validateContact } from '../server/contact.mjs';

const good = { name: 'Sam', email: 'sam@example.com', topic: 'technical', message: 'The merge tool stops at page 3.', page: '/tools/pdf/merge-pdf' };

let server: Server | undefined;
afterEach(() => new Promise<void>((resolve) => (server ? server.close(() => resolve()) : resolve())));

function start(env: Record<string, string | undefined>, fetchImpl: typeof fetch = (async () => new Response('ok')) as typeof fetch) {
  const running: Server = contactApp({ env, fetchImpl }).listen(0);
  server = running;
  return `http://127.0.0.1:${(running.address() as AddressInfo).port}/api/contact`;
}
const post = (url: string, body: unknown, raw = false) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw ? (body as string) : JSON.stringify(body) });

describe('contact validation', () => {
  it('accepts a complete message and trims it', () => {
    const r = validateContact({ ...good, name: '  Sam  ' });
    expect(r.ok).toBe(true);
    expect(r.value.name).toBe('Sam');
  });
  it('lists every invalid field', () => {
    const r = validateContact({ name: '', email: 'nope', topic: 'x', message: 'short' });
    expect(r.ok).toBe(false);
    expect(r.fields).toEqual(['name', 'email', 'topic', 'message']);
  });
  it('rejects over-long messages and ignores non-string input', () => {
    expect(validateContact({ ...good, message: 'a'.repeat(4001) }).ok).toBe(false);
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact({ ...good, name: 42 }).ok).toBe(false);
  });
  it('reports configuration only for http(s) webhook URLs', () => {
    expect(contactConfigured({})).toBe(false);
    expect(contactConfigured({ CONTACT_WEBHOOK_URL: 'javascript:alert(1)' })).toBe(false);
    expect(contactConfigured({ CONTACT_WEBHOOK_URL: 'https://hooks.example.com/x' })).toBe(true);
  });
});

describe('contact endpoint', () => {
  it('says it is not configured, and never reports success, when no webhook is set', async () => {
    const url = start({});
    expect(await (await fetch(`${url}/status`)).json()).toEqual({ configured: false });
    const res = await post(url, good);
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe('not_configured');
  });

  it('forwards a valid message to the webhook and reports success only when it accepts', async () => {
    const calls: { url: string; body: Record<string, string> }[] = [];
    const url = start({ CONTACT_WEBHOOK_URL: 'https://hooks.example.com/x' }, (async (u: string, init: RequestInit) => {
      calls.push({ url: String(u), body: JSON.parse(String(init.body)) });
      return new Response('ok');
    }) as unknown as typeof fetch);
    expect(await (await fetch(`${url}/status`)).json()).toEqual({ configured: true });
    const res = await post(url, good);
    expect(res.status).toBe(200);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://hooks.example.com/x');
    expect(calls[0].body.message).toBe(good.message);
    expect(calls[0].body.text).toContain('sam@example.com');
  });

  it('reports a delivery failure when the webhook rejects the message', async () => {
    const url = start({ CONTACT_WEBHOOK_URL: 'https://hooks.example.com/x' }, (async () => new Response('no', { status: 500 })) as typeof fetch);
    const res = await post(url, good);
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBe('delivery_failed');
  });

  it('rejects invalid input and malformed JSON with 400', async () => {
    const url = start({ CONTACT_WEBHOOK_URL: 'https://hooks.example.com/x' });
    const bad = await post(url, { ...good, email: 'x' });
    expect(bad.status).toBe(400);
    expect((await bad.json()).fields).toEqual(['email']);
    expect((await post(url, '{oops', true)).status).toBe(400);
  });

  it('quietly drops honeypot submissions without forwarding them', async () => {
    let called = 0;
    const url = start({ CONTACT_WEBHOOK_URL: 'https://hooks.example.com/x' }, (async () => {
      called++;
      return new Response('ok');
    }) as typeof fetch);
    const res = await post(url, { ...good, website: 'http://spam.example' });
    expect(res.status).toBe(200);
    expect(called).toBe(0);
  });

  it('rate-limits repeated submissions', async () => {
    const url = start({ CONTACT_RATE_LIMIT: '2', CONTACT_WEBHOOK_URL: 'https://hooks.example.com/x' });
    expect((await post(url, good)).status).toBe(200);
    expect((await post(url, good)).status).toBe(200);
    expect((await post(url, good)).status).toBe(429);
  });
});

describe('Vercel function /api/contact', () => {
  const fakeRes = () => {
    const r = {
      code: 0,
      body: undefined as unknown,
      headers: {} as Record<string, string>,
      status(c: number) {
        r.code = c;
        return r;
      },
      setHeader(k: string, v: string) {
        r.headers[k] = v;
      },
      json(b: unknown) {
        r.body = b;
        return r;
      },
    };
    return r;
  };
  const call = async (body: unknown, method = 'POST') => {
    // @ts-expect-error plain JS module without types
    const { default: handler } = await import('../api/contact.js');
    const res = fakeRes();
    await handler({ method, body, headers: { 'x-forwarded-for': `10.0.0.${Math.floor(Math.random() * 250)}` } }, res);
    return res;
  };

  it('answers 503 and never reports success without a webhook', async () => {
    delete process.env.CONTACT_WEBHOOK_URL;
    const res = await call(good);
    expect(res.code).toBe(503);
    expect(res.body).toEqual({ error: 'not_configured' });
  });
  it('rejects other methods and invalid input', async () => {
    expect((await call(good, 'GET')).code).toBe(405);
    const bad = await call({ ...good, email: 'x', topic: 'nope' });
    expect(bad.code).toBe(400);
    expect((bad.body as { fields: string[] }).fields).toEqual(['email', 'topic']);
  });
  it('forwards to the webhook and reports success only when it accepts', async () => {
    process.env.CONTACT_WEBHOOK_URL = 'https://hooks.example.com/x';
    const original = globalThis.fetch;
    const calls: Record<string, string>[] = [];
    globalThis.fetch = (async (_u: string, init: RequestInit) => {
      calls.push(JSON.parse(String(init.body)));
      return new Response('ok');
    }) as typeof fetch;
    try {
      const res = await call({ ...good, topic: 'tool-error' });
      expect(res.code).toBe(200);
      expect(calls[0].subject).toBe('Tool Error');
      expect(calls[0].email).toBe('sam@example.com');
      globalThis.fetch = (async () => new Response('no', { status: 500 })) as typeof fetch;
      expect((await call(good)).code).toBe(502);
    } finally {
      globalThis.fetch = original;
      delete process.env.CONTACT_WEBHOOK_URL;
    }
  });
  it('accepts exactly the six subjects', () => {
    expect(validateContact({ ...good, topic: 'privacy' }).ok).toBe(true);
    expect(validateContact({ ...good, topic: 'bug' }).ok).toBe(false);
  });
});
