# Kitwell

A fast, privacy-friendly website of 77 everyday tools (image, PDF, text, developer) in 25 interface languages. Every tool runs **in the visitor's browser**; the server only serves static files.

**Stack:** Vite + React 19 + TypeScript, build-time prerendering (one static HTML file per URL, then hydrated), a small Express server for headers/compression/404s. Brand name is a placeholder: change it in `src/config/site.ts` and colours in `src/styles/tokens.css`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 20+) |
| `npm run dev` | Dev server with hot reload (no prerender). Copies the OCR files first. |
| `npm run check` | Type check, lint, tests, then production build |
| `npm run build` | Copies the OCR files, builds, and prerenders every route (about 2,300 pages including the language versions) into `dist/` |
| `npm start` | Serve `dist/` on `PORT` (default 3000) |
| `npm test` | Vitest (482 tests; server tests need a prior build) |

## Deployment

1. Set the real domain **before building** (used for canonical URLs, sitemap, Open Graph):
   `SITE_URL=https://your-domain.com npm run build` (on Vercel, `SITE_URL` falls back to the project's production domain)
2. Run `npm start` on any Node 20+ host (Hostinger Node.js hosting, a VPS, Render, Fly, etc.). Env vars: `PORT`, `TRUST_PROXY=1` when behind a reverse proxy/CDN (so rate limiting sees real IPs), `UPGRADE_INSECURE_REQUESTS=true` once HTTPS is in place, and `CONTACT_WEBHOOK_URL` for the contact form (see Contact form).
3. Serve over HTTPS. The server sends CSP, HSTS, nosniff, frame-ancestors none, and Permissions-Policy headers, and returns real 404 status codes.
4. Static-only hosting also works (upload `dist/`), but you then lose the security headers and true 404 status, so the Node server is recommended.
5. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.

## Before launch (needs your input)

- Set `CONTACT_WEBHOOK_URL` (see Contact form); until then the contact form says it is not connected.
- Have a lawyer review the Privacy Policy, Terms and Cookie information for Pakistan and your visitor countries. They are short plain-language texts that describe only what the site does today; they are not legal advice.
- Add `public/og-image.png` (1200×630) for social previews; the build picks it up automatically.
- Choose the final brand name/domain.
- Have the non-English interface strings reviewed by native speakers (see Languages).

## Tool icons

Every tool has a colour-coded illustration drawn as inline SVG (no image files, no icon library): `src/tools/toolArt.ts` is the single table that gives each of the 77 tools a base (sheet, photo, note or code window), a colour, a glyph and, for conversions, a format tag in the format's own colour (PDF red, JPG amber, PNG blue, WEBP purple ...). `src/components/ui/ToolArt.tsx` draws them and `ToolIcon` is the only component that shows them (cards, menus, search, related tools, page headers). `tests/toolArt.test.ts` checks that every tool is mapped, that no two tools look the same and that every colour keeps 3:1 contrast with the white glyph. The `icon` field in the tool data is kept for the line-icon fallback and tests.

## Adding a tool

1. Add an entry to `src/tools/data/<category>.ts` (slug, name, description, steps, FAQ, limits, related tools, `impl` key). Put it in one of the groups listed in `src/tools/registry.ts`; the mega menu, footer, category pages and search are generated from that data.
2. Add a component in `src/tools/impl/<category>/` and register it in `src/tools/impl/index.ts`.
3. `npm run check`. The registry tests verify metadata, related links and that every tool has an implementation. The page, URL, sitemap entry, breadcrumbs and structured data are generated automatically.

## Languages

The whole site can be shown in 25 languages: English, Urdu, Arabic, Persian, Spanish, French, German, Portuguese, Italian, Turkish, Chinese (Simplified), Japanese, Korean, Hindi, Indonesian, Bengali, Russian, Dutch, Vietnamese, Polish, Thai, Ukrainian, Romanian, Greek and Czech. English lives at the plain address and every other language under its code (`/ur/tools`, `/zh/privacy`), so a page always renders in one language for everyone. The address decides the language; the switcher goes to the same page in the other language and remembers the choice in `localStorage` (key `kitwell-language`). `<html lang>` and `dir` follow the page (Urdu, Arabic and Persian are right-to-left; Chinese is `zh-CN`). Every page is prerendered in every language (`npm run build` writes about 2,100 pages) with a self-referencing canonical, reciprocal `hreflang` links for all 25 languages plus `x-default`, localised title, description, Open Graph and structured data, and `sitemap.xml` entries with `xhtml:link` alternates. The Privacy Policy, Terms and Cookie information are translated in every language; each translated page states that the English text is authoritative. The coverage checks live in `scripts/i18n-audit.mjs` and `tests/i18n.test.ts` / `tests/i18nSeo.test.ts`. The site has no cookie banner (it sets no cookies), so there is no consent interface to translate.

- **What is translated:** menus, search, footer, pages, help and FAQ, the contact form, blog guides, all 77 tool pages (names, descriptions, steps, FAQ, limits), every tool interface, and error messages thrown by the tools. **English only, on purpose:** text stamped into generated PDFs ("Page 1 of 10", "CONFIDENTIAL"), and errors raised inside web workers.
- **Source and layout:** `src/i18n/en/*.ts` is the English catalog (one object per area; keys are `area.name`, plurals are `key.one` / `key.other`). Tool content is translated by tool slug in `src/i18n/locales/<code>/tools.ts`; the other files mirror the English ones. See `docs/i18n-conventions.md` (rules for developers) and `docs/translation-brief.md` (rules for translators).
- **Checks:** `node scripts/i18n-audit.mjs --report [--list <code>]` finds hardcoded text and unknown keys, lists missing keys per language and writes `docs/translation-coverage.md`. `tests/i18n.test.ts` fails when a locale has unknown keys, mismatched `{placeholders}`, untranslated copies, or a `coverage` flag in `src/i18n/languages.ts` that does not match reality. Plural forms follow each language's own CLDR categories.
- **Fallback:** a missing key falls back to English, never to a blank or a raw key.
- **Adding a language:** add it to `LANGUAGES` (`src/i18n/languages.ts`), create `src/i18n/locales/<code>/` and register it in `src/i18n/loaders.ts`. Each language is its own lazy chunk.
- The server and the first client render are always English, so hydration matches the prerendered HTML; a saved language is applied right after load.
- **Quality:** the translations were produced for this project with automated checks (completeness, placeholders, plural forms, no raw keys) and browser checks. They have **not** been reviewed by native speakers; do that before launch. Tool names and quoted button labels were chosen per file and may differ slightly between files.

## Contact form

`/contact` has a working form (name, email, subject, optional tool/page, message). It posts to `POST /api/contact`, which validates the message, rate-limits (5 per 15 minutes per IP; `CONTACT_RATE_LIMIT`), drops honeypot submissions and forwards the message as JSON to the URL in `CONTACT_WEBHOOK_URL` (a Slack/Discord incoming webhook, Make/Zapier hook, Formspree-style endpoint or your own receiver). The JSON has `name`, `email`, `topic`, `message`, `page`, `receivedAt`, plus `text` and `content` (Slack and Discord formats). Nothing is stored on the server. The owner's email address is never shown on the site.

Two entry points share the same rules (`server/contactCore.mjs`): the Express server (`server/contact.mjs`) and Vercel serverless functions (`api/contact.js`, `api/contact/status.js`) for the static Vercel deployment, which has no Node server. On Vercel set `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_RATE_LIMIT`) in the project's environment variables. The Vercel rate limiter is in memory per function instance, so it is best-effort there.

Without `CONTACT_WEBHOOK_URL` the page says the form is not connected and the endpoint answers 503; it never reports success for a message it did not deliver.

## Convert-to-PDF and repair tools

Eight tools were added to the PDF category (data in `src/tools/data/pdfConvert.ts`, interfaces in `src/tools/impl/pdf/`, engines in `src/lib/`). All run in the browser; nothing is uploaded and there is no server component.

| Tool | Engine |
| --- | --- |
| Scan to PDF | images to pages (`scanFilter.ts`: grayscale or adaptive black-and-white clean-up) |
| HTML to PDF | inert `DOMParser` reader (`htmlDoc.ts`); never fetches URLs, runs scripts or loads external resources |
| Word to PDF | DOCX reader (`docx.ts`, `officeZip.ts`) |
| PowerPoint to PDF | PPTX reader (`pptxPdf.ts`) |
| Excel to PDF | XLSX reader (`xlsx.ts`), saved values only |
| PDF to Markdown | pdf.js text positions with heading, list and paragraph heuristics (`pdfMarkdown.ts`) |
| Repair PDF | xref reconstruction and page-tree rebuild (`pdfRepair.ts`) |
| PDF to PDF/A | PDF/A-2b preparation (`pdfA.ts`, sRGB profile built in `iccProfile.ts`) |

PDFs are laid out by Kitwell's own layout engine (`docPdf.ts`) with Noto Sans (`@fontsource/noto-sans`, subset-embedded via `@pdf-lib/fontkit`): Latin, Latin Extended, Cyrillic, Greek, Vietnamese and Devanagari. Arabic, Hebrew, Thai and CJK text is **not** supported and shows as "?" with a count in the result notes. Output is **not** a pixel copy of the source: fonts, spacing, columns, headers/footers, charts and effects differ, and each tool says what was skipped. Legacy `.doc`/`.ppt`/`.xls` and password-protected files are rejected with a clear message. **PDF to PDF/A** prepares PDF/A-2b in two modes. *Keep text and fonts* adds the PDF/A identification, XMP metadata, an sRGB output intent and a file ID, and removes JavaScript, forbidden actions, attachments and annotation flags; it refuses (and lists why) when fonts are not embedded or the file uses CMYK or LZW. *Turn pages into pictures* renders each page (up to 200) and builds an image-only PDF/A. Kitwell has **no full PDF/A validator** (veraPDF needs Java, which is not available here), so results are checked only against the rules the tool applies (`checkPdfA`) and the page says it is not a certification.

## Blog

`/blog` has 13 guides written around the tools. **Articles are English only on purpose:** other languages show the English text, are marked `noindex`, point their canonical address at the English article, have no hreflang links and are left out of the sitemap (the blog index and its shared labels are translated).

- **Writing:** one Markdown file per article in `content/blog/<slug>.md` (format described at the top of `scripts/build-blog.mjs`). Run `node scripts/build-blog.mjs` and commit the generated `src/blog/articles.ts` and `src/i18n/en/blogArticles.ts`. Inside text, `<tool_merge_pdf>…</tool_merge_pdf>`, `<post_slug>…</post_slug>` and `<all_pdf>…</all_pdf>` become internal links.
- **Images:** every article needs `public/images/blog/<slug>.jpg` (1200x630, used on the page, Open Graph and structured data) and `<slug>-640.webp` (cards). The current ones are drawn as SVG and rendered in a browser; `tests/blog.test.ts` fails when a file is missing.
- **SEO checks (tests/blog.test.ts):** title up to 60 characters, description 120 to 165, one H1, question-style FAQ, more than 1,000 words, at least five tool links and two guide links per article, no orphan articles, BlogPosting schema with image, author (Person), dates and FAQ, plus breadcrumbs. Google stopped showing FAQ rich results in 2026, so the FAQ markup is kept only as harmless structured data.

## OCR (local, WebAssembly)

OCR PDF uses [tesseract.js](https://github.com/naptha/tesseract.js) (Apache-2.0) with the English "best" LSTM model. Nothing is fetched from a CDN:

- `scripts/copy-ocr-assets.mjs` (run by `predev` and `prebuild`) copies the worker, three WebAssembly engine variants and `eng.traineddata.gz` from `node_modules` to `public/ocr/` (about 12 MB, git-ignored, generated). A visitor downloads only the worker (~110 KB), one engine (~3.9 MB) and the language data (~3 MB), and only when they use OCR.
- The Content-Security-Policy allows `'wasm-unsafe-eval'` in `script-src`. That permits compiling WebAssembly only; `eval()` and inline scripts remain blocked.
- English only. More languages need their `.traineddata.gz` files in `public/ocr/lang/` and an entry in `src/lib/ocrEngine.ts`.

## Privacy and security notes

- No uploads: files never reach the server. The only API endpoints are for the contact form. Regex and image processing run in Web Workers; heavy libraries (@cantoo/pdf-lib, PDF.js, pica, jsQR, tesseract.js, gifenc, marked, diff) load only on pages that use them.
- PDF editing uses [@cantoo/pdf-lib](https://github.com/cantoo-scribe/pdf-lib) (an MIT-licensed, maintained fork of pdf-lib) because it can encrypt and decrypt PDFs. Image enlarging uses pica without WebAssembly.
- Redact PDF rebuilds redacted pages as images, so the text underneath does not exist in the output. This is covered by a unit test that searches the decompressed file for the secret text and by a browser check that does the same on the real output.
- Markdown preview is sanitised with DOMPurify; Base64-to-image rejects SVG.
- Passwords are generated with `crypto.getRandomValues` (rejection sampling, no modulo bias) and are never stored or sent.
- `npm audit`: 0 known vulnerabilities at time of writing.

## AdSense readiness

`src/components/ui/AdSlot.tsx` renders nothing until `site.ads.enabled` is set in `src/config/site.ts`, so there are no empty boxes now. Slots sit below the tool panel and mid-homepage, clearly separated from controls. Before enabling: add the ad script (the CSP in `server/index.mjs` must then allow Google's domains), update Privacy/Cookie pages, and add a Google-certified consent banner for EEA/UK visitors.

## Known limitations

- **Compress PDF** recompresses embedded JPEG images only and keeps text selectable; PDFs without large photos barely shrink and the tool says so. Its "Maximum" mode turns every page into a picture (no selectable text, links or form fields).
- **OCR PDF** is English only, works best on clean 200-300 DPI scans, and does not read handwriting. It is slow on large documents (seconds per page).
- **Sign PDF** places a *visual* signature. It is not a cryptographic digital signature, has no certificate or timestamp and cannot detect later changes.
- **Fill PDF Forms** fills standard AcroForm fields with Latin text; XFA (dynamic) forms and signature fields are not supported.
- **Redact PDF** turns redacted pages into images (no text, links or forms on those pages). Automatic search only finds matches inside a single line of selectable text; scans need boxes drawn by hand. Check the result before sharing.
- **Compare PDF** matches pages by number and compares text of up to 100 pages per file; the visual comparison is at screen resolution.
- **GIF Maker** is limited to 100 frames and 256 colours per frame; animated inputs contribute their first frame.
- **Photo Editor** works on one photo up to about 50 megapixels with a fixed edit order; there are no layers or AI features.
- **Password Generator:** name-based passwords are easier to remember but weaker than fully random ones (the tool shows an honest estimate). Generated passwords use only the symbols `@ # $ *`.
- Crop PDF hides the area outside the box (it sets the visible page area); it does not delete that content from the file.
- Watermark PDF text and form text are limited to Latin letters, digits and common symbols, because PDF built-in fonts have no other alphabets.
- Protect PDF uses AES-256 and accepts passwords of printable ASCII characters only. Unlock PDF needs the real password (it never guesses passwords).
- Extract Text from PDF reads the text layer only; scanned PDFs need OCR PDF first.
- QR Code Scanner reads uploaded images only (no camera access). Enlarge Image is smooth high-quality resampling, not AI upscaling.
- WebP output needs a browser that can encode WebP; HEIC/TIFF/RAW inputs are unsupported; animated images use the first frame.
- PDF rendering (PDF to JPG/PNG, viewer, previews) is slowed by browsers when the tab is in the background.
- Not built (by design): background removal / object removal (need large ML models), YouTube tools (need API/terms review; no scraping).
- The convert-to-PDF tools approximate the source layout (see Convert-to-PDF and repair tools). Scan to PDF's camera button has not been tested on real phone hardware.
- Manual testing was done in Chromium only; Firefox and Safari are untested.
