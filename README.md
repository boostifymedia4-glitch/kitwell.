# Kitwell

A fast, privacy-friendly website of 47 everyday tools (image, PDF, text, developer). Every tool runs **in the visitor's browser**; the server only serves static files.

**Stack:** Vite + React 19 + TypeScript, build-time prerendering (one static HTML file per URL, then hydrated), a small Express server for headers/compression/404s. Brand name is a placeholder: change it in `src/config/site.ts` and colours in `src/styles/tokens.css`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 20+) |
| `npm run dev` | Dev server with hot reload (no prerender) |
| `npm run check` | Type check, lint, tests, then production build |
| `npm run build` | Production build + prerender of all 58 routes into `dist/` |
| `npm start` | Serve `dist/` on `PORT` (default 3000) |
| `npm test` | Vitest (78 tests; server tests need a prior build) |

## Deployment

1. Set the real domain **before building** (used for canonical URLs, sitemap, Open Graph):
   `SITE_URL=https://your-domain.com npm run build`
2. Run `npm start` on any Node 20+ host (Hostinger Node.js hosting, a VPS, Render, Fly, etc.). Env vars: `PORT`, `TRUST_PROXY=1` when behind a reverse proxy/CDN (so rate limiting sees real IPs), `UPGRADE_INSECURE_REQUESTS=true` once HTTPS is in place.
3. Serve over HTTPS. The server sends CSP, HSTS, nosniff, frame-ancestors none, and Permissions-Policy headers, and returns real 404 status codes.
4. Static-only hosting also works (upload `dist/`), but you then lose the security headers and true 404 status, so the Node server is recommended.
5. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.

## Before launch (needs your input)

- Replace placeholders in `Privacy`, `Terms`, `Cookies`, `About`, `Contact` (shown as highlighted `[brackets]`) and `contactEmail` in `src/config/site.ts`. Have the legal pages reviewed for Pakistan and your visitor countries.
- Add `public/og-image.png` (1200×630) for social previews; the build picks it up automatically.
- Choose the final brand name/domain.

## Adding a tool

1. Add an entry to `src/tools/data/<category>.ts` (slug, name, description, steps, FAQ, limits, related tools, `impl` key).
2. Add a component in `src/tools/impl/<category>/` and register it in `src/tools/impl/index.ts`.
3. `npm run check`. The registry tests verify metadata, related links and that every tool has an implementation. The page, URL, sitemap entry, breadcrumbs and structured data are generated automatically.

## Privacy and security notes

- No uploads and no API endpoints: files never reach the server. Regex and image processing run in Web Workers; heavy libraries (pdf-lib, PDF.js, marked, diff) load only on pages that use them.
- Markdown preview is sanitised with DOMPurify; Base64-to-image rejects SVG.
- `npm audit`: 0 known vulnerabilities at time of writing.

## AdSense readiness

`src/components/ui/AdSlot.tsx` renders nothing until `site.ads.enabled` is set in `src/config/site.ts`, so there are no empty boxes now. Slots sit below the tool panel and mid-homepage, clearly separated from controls. Before enabling: add the ad script (the CSP in `server/index.mjs` must then allow Google's domains), update Privacy/Cookie pages, and add a Google-certified consent banner for EEA/UK visitors.

## Known limitations

- PDF tools copy, merge, split, reorder, rotate and render pages. They do **not** edit existing PDF text, compress PDFs, or open password-protected files.
- WebP output needs a browser that can encode WebP; HEIC/TIFF/RAW inputs are unsupported; animated images use the first frame.
- PDF rendering (PDF to JPG/PNG, viewer, thumbnails) is slowed by browsers when the tab is in the background.
- Not built (by design): background removal / object removal (need large ML models), YouTube tools (need API/terms review; no scraping), PDF compression (no reliable free browser method yet).
- Manual testing was done in Chromium only; Firefox and Safari are untested.
