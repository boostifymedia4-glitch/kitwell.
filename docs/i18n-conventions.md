# Translation conventions

Every sentence a visitor can read must come from the translation catalog, so that it can be shown in all 17
languages. Rules for code in `src/`:

## Where text lives

| What | Where | How to use |
| --- | --- | --- |
| English source text | `src/i18n/en/<area>.ts` (one object per file, `'key': 'English text'`) | add keys here |
| Components | `const { t } = useI18n()` from `@/i18n` | `t('pdfCompress.title')` |
| Plain library code (errors thrown from `src/lib`) | `import { tr } from '@/i18n/translate'` | `throw new PdfError(tr('err.pdf.notPdf'))` |
| Tool names, descriptions, steps, FAQ, limits | `src/tools/data/*.ts` (English) and `src/i18n/locales/<code>/tools.ts` | translated by tool slug, not by key |

`t()` and `tr()` return the English text if a language has no translation for a key, so a missing translation
never shows a blank or a raw key.

## Writing catalog entries

* Key = `<area>.<name>`: component camelCase for interface text (`pdfCompress.mode.images`), `err.<library>.<name>`
  for messages thrown from libraries. Keys are unique across the whole catalog.
* Every value is one plain string literal (single or double quotes, or a backtick string **without** `${}`). No
  concatenation, no template substitutions, no computed keys. This is what lets tools read the catalog.
* Dynamic parts are `{placeholders}`: `'{count} pages'`, `t('x.pages', { count: 3 })`. Never build a sentence from
  pieces (`'Page ' + n + ' of ' + total`): other languages need a different word order.
* Plurals: define `key.one` and `key.other` (and any other forms English does not need are added by translators:
  `key.few`, `key.many`...). Call `t('key', { count: n })`; the right form is chosen from the language's own rules.
* Do not translate: file formats and technical names (PDF, PNG, JPG, GIF, WebP, SVG, JSON, XML, HTML, URL, UUID,
  Base64, OCR, QR, AES-256), the brand name, units (px, pt, KB, MB, DPI), regular-expression and code syntax,
  and file names produced by a tool (`-compressed.pdf`). Leave them out of the catalog or keep them inside a longer
  sentence where they are part of the wording.
* Translate everything else a visitor can see or hear: labels, buttons, headings, hints, notices, placeholders,
  `aria-label`, `title`, `alt`, progress and result messages, and the message of every thrown error.
* Module-level constants that contain text (option lists, label maps) must hold keys, or become functions called
  inside the component, so the text is looked up when the language is known.

## Checking your work

```
node scripts/i18n-audit.mjs --files <path fragments> --all   # hardcoded text and unknown keys in those files
node scripts/i18n-audit.mjs --report                         # coverage per language -> docs/translation-coverage.md
```

The audit fails when a `t('...')` / `tr('...')` call uses a key that is not in the catalog, or when a key is defined
twice. `tests/i18n.test.ts` checks every locale file against the catalog (placeholders must match).
