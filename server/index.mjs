/**
 * Production server for the prerendered site.
 *
 * There are no upload or API endpoints: every tool runs in the browser. The server only
 * serves static files, applies security headers and compression, rate-limits requests, and
 * returns a real 404 status for unknown URLs.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function createApp({ distDir = join(root, 'dist') } = {}) {
  const routesFile = join(distDir, 'routes.json');
  if (!existsSync(routesFile)) throw new Error('dist/ not found. Run "npm run build" first.');
  const routes = new Set(JSON.parse(readFileSync(routesFile, 'utf8')));

  const app = express();
  app.disable('x-powered-by');
  // Behind a reverse proxy (Hostinger, Nginx, Cloudflare) set TRUST_PROXY=1 so rate limiting sees real client IPs.
  if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          'default-src': ["'self'"],
          'script-src': ["'self'"],
          'style-src': ["'self'"],
          // React sets a few inline style attributes (positions, sizes); scripts remain fully locked down.
          'style-src-attr': ["'unsafe-inline'"],
          'img-src': ["'self'", 'data:', 'blob:'],
          'font-src': ["'self'"],
          'connect-src': ["'self'", 'blob:', 'data:'],
          'worker-src': ["'self'", 'blob:'],
          'object-src': ["'none'"],
          'base-uri': ["'self'"],
          'form-action': ["'self'"],
          'frame-ancestors': ["'none'"],
          ...(process.env.UPGRADE_INSECURE_REQUESTS === 'true' ? { 'upgrade-insecure-requests': [] } : {}),
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use((_req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    next();
  });
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 600,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: 'Too many requests. Please slow down and try again shortly.',
    }),
  );

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD');
      return res.status(405).type('text/plain').send('Method not allowed');
    }
    next();
  });

  // Hashed build assets never change, so they can be cached for a year.
  app.use(
    '/assets',
    express.static(join(distDir, 'assets'), { immutable: true, maxAge: '1y', index: false, redirect: false, fallthrough: false }),
  );
  app.use(
    express.static(distDir, {
      index: false,
      redirect: false,
      maxAge: '1d',
      // HTML is served through the route handler below; everything else here is a static file.
      setHeaders: (res, file) => {
        if (/\.(html)$/.test(file)) res.setHeader('Cache-Control', 'no-cache');
      },
    }),
  );

  const send404 = (res) => res.status(404).set('Cache-Control', 'no-cache').sendFile(join(distDir, '404.html'));

  app.use((req, res) => {
    let path = req.path;
    // Canonical URLs have no trailing slash.
    if (path.length > 1 && path.endsWith('/')) {
      const query = req.url.slice(req.path.length);
      return res.redirect(301, path.replace(/\/+$/, '') + query);
    }
    if (routes.has(path)) {
      const file = path === '/' ? join(distDir, 'index.html') : join(distDir, path, 'index.html');
      return res.set('Cache-Control', 'no-cache').sendFile(file);
    }
    return send404(res);
  });

  app.use((err, _req, res, _next) => {
    // Never leak paths or stack traces to visitors.
    if (err && err.status === 404) return send404(res);
    console.error(err);
    res.status(500).type('text/plain').send('Something went wrong. Please try again later.');
  });

  return app;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3000;
  createApp().listen(port, () => console.log(`Kitwell listening on http://localhost:${port}`));
}
