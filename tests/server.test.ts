import { existsSync } from 'node:fs';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// These tests exercise the built site, so they only run after `npm run build`.
const built = existsSync('dist/routes.json');

describe.skipIf(!built)('production server', () => {
  let server: Server;
  let base: string;

  beforeAll(async () => {
    // @ts-expect-error plain JS module without types
    const { createApp } = await import('../server/index.mjs');
    server = createApp().listen(0);
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });
  afterAll(() => new Promise<void>((r) => server.close(() => r())));

  it('serves prerendered pages with real content and security headers', async () => {
    const res = await fetch(`${base}/tools/pdf/merge-pdf`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('<h1>Merge PDF</h1>');
    expect(html).toContain('<link rel="canonical"');
    expect(res.headers.get('content-security-policy')).toContain("script-src 'self'");
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
    expect(res.headers.get('x-powered-by')).toBeNull();
  });

  it('returns a real 404 status with the 404 page', async () => {
    const res = await fetch(`${base}/does-not-exist`);
    expect(res.status).toBe(404);
    expect(await res.text()).toContain('404');
  });

  it('does not serve arbitrary files or traverse paths', async () => {
    for (const p of ['/../package.json', '/%2e%2e/package.json', '/assets/../../package.json', '/server/index.mjs', '/routes.json/../..']) {
      const res = await fetch(`${base}${p}`);
      const body = await res.text();
      expect(body, p).not.toContain('"name": "kitwell"');
      expect(body, p).not.toContain('createApp');
    }
  });

  it('redirects trailing slashes to the canonical URL', async () => {
    const res = await fetch(`${base}/tools/`, { redirect: 'manual' });
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('/tools');
  });

  it('rejects non-GET methods and never leaks stack traces', async () => {
    const res = await fetch(`${base}/`, { method: 'POST', body: 'x' });
    expect(res.status).toBe(405);
    expect(await res.text()).not.toMatch(/at .*\.(js|mjs|ts)/);
  });

  it('publishes sitemap and robots', async () => {
    const sm = await (await fetch(`${base}/sitemap.xml`)).text();
    expect(sm).toContain('/tools/image/jpg-to-png');
    expect(await (await fetch(`${base}/robots.txt`)).text()).toContain('Sitemap:');
  });

  it('caches hashed assets immutably', async () => {
    const html = await (await fetch(`${base}/`)).text();
    const asset = /\/assets\/[^"]+\.js/.exec(html)![0];
    const res = await fetch(`${base}${asset}`);
    expect(res.headers.get('cache-control')).toContain('immutable');
  });
});
