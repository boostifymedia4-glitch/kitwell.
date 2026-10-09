# Translation brief

Read this completely before translating. It applies to every language.

## Goal

Kitwell (a site of free browser-based tools for images, PDFs, text and developers) is shown in 17 languages. You translate
the English source text into **one** language. The result is shown to real visitors, so it must read like text written by a
native speaker of a good software product: natural, consistent and correct, not word-for-word.

* Only translate what you are confident about. If you are unsure of a technical term, use the form most software in that
  language uses, or keep the English term (for example "OCR", "PDF", "Base64"). Never invent words.
* Never leave English text in a value just to be finished, and never copy the English sentence into the file.
  If you cannot translate a key, **omit it** (the site then falls back to English) and say so in your final report.
* Do not machine-translate mechanically. Use one consistent term for each concept across all files (file, tool,
  page, download, upload, compress, merge, split, redact, sign, password, preview, result...). Decide the vocabulary
  once at the start and keep it.

## Register and script

| Language | Notes |
| --- | --- |
| Urdu (ur) | Standard Urdu in Nastaliq-friendly Arabic script, polite "آپ". Keep Latin for format names (PDF, PNG). Digits: use Western digits (0-9) inside numbers and placeholders. |
| Arabic (ar) | Modern Standard Arabic, neutral and polite. Western digits (0-9). |
| Spanish (es) | Neutral international Spanish; address the user with the informal imperative common in software ("Añade tu archivo"). |
| French (fr) | "vous" form; infinitive/imperative as usual in French UIs. |
| German (de) | "Sie" form. |
| Portuguese (pt) | Neutral Brazilian Portuguese ("você" forms or imperative as common in apps). |
| Italian (it) | Informal-polite imperative as common in apps ("Aggiungi il file"). |
| Turkish (tr) | "siz" form. |
| Chinese (zh) | Simplified Chinese (简体中文), "您" or no pronoun. |
| Japanese (ja) | です/ます style. |
| Korean (ko) | 해요체 / 합니다체 as common in apps (be consistent). |
| Hindi (hi) | Devanagari, "आप" form. Keep common English tech terms in Devanagari transliteration only if that is how Hindi software writes them. |
| Indonesian (id) | "Anda" form, standard Bahasa Indonesia. |
| Bengali (bn) | Standard Bengali (বাংলা), "আপনি" form. |
| Russian (ru) | "вы" form. |
| Dutch (nl) | "je/jouw" form as modern Dutch apps do, consistently. |

## File format

Every locale file mirrors one English file in `src/i18n/en/`. Example (`src/i18n/locales/de/shell.ts`):

```ts
import type { PartialMessages } from '../../en';

export default {
  'skip': 'Zum Inhalt springen',
  'brand.home': '{site} Startseite',
} as PartialMessages;
```

* Keys are copied **exactly** from the English file. Only the value is translated. Use a normal single- or double-quoted
  string literal; escape quotes inside with a backslash or switch quote type. No template strings, no concatenation, no
  `${}`.
* Keep every `{placeholder}` exactly as written (same names, all of them present) - the words around them move as the
  grammar requires. `{count}`, `{name}`, `{site}`, `{size}` etc. are filled in by the program.
* Keep markup tags such as `<contact>...</contact>`, `<tool_compress_pdf>...</tool_compress_pdf>`, `<post_x>` and `<all_pdf>`
  exactly (tag names unchanged, closing tag present) and translate only the words between them. Tags may move in the
  sentence.
* Keep `&`, `…`, `·`, `–`, `→`, `×` and similar symbols where they appear unless your language's typography
  uses another sign (for example « » or „ “ for quotation marks; use the ones normal for your language).
* Do **not** translate: PDF, PNG, JPG/JPEG, GIF, WebP, SVG, JSON, XML, HTML, URL, UUID, Base64, OCR, QR, AES-256, ISO,
  UTC, DPI, px, pt, KB, MB, the brand name Kitwell, file names such as `images.pdf` / `-compressed.pdf`, regular
  expression and code syntax, keyboard keys such as Ctrl.
* Keep the meaning and the level of detail. Do not add or drop information, warnings or limits. Do not make promises the
  English text does not make (for example about accuracy, security or legal effect).
* Length matters for buttons and labels (small screens): keep short labels short.
* If English has a trailing space, ellipsis `…` or a colon, keep the equivalent.

### Plurals

Where the English file has `key.one` and `key.other`, give the plural forms **your language uses** (CLDR categories):

| Language | Forms to provide for every plural group |
| --- | --- |
| ja, zh, ko, id | `.other` |
| de, nl, tr, hi, bn, ur | `.one`, `.other` |
| es, fr, it, pt | `.one`, `.many`, `.other` (`.many` is only used for millions; give the same wording as `.other`) |
| ru | `.one`, `.few`, `.many`, `.other` |
| ar | `.zero`, `.one`, `.two`, `.few`, `.many`, `.other` |

Do not guess. Run this in the project root to see exactly which keys your language needs:

```
node scripts/i18n-audit.mjs --report
```

It prints, per language, `translated/total keys`, placeholder problems and strings identical to English. The "total"
already counts each language's own plural forms. A form such as `x.few` is written next to the others in the same file
and uses the same placeholders as `x.other`. In languages where the number is implied by the word ("one page"), a `.one`
form may leave out `{count}`.

## Tool content (`tools.ts`)

Names, descriptions, steps, FAQ and limits of the 69 tools are translated by tool slug. The English source is in
`.tmp/tools-en.json` (read it). Format:

```ts
import type { ToolTextMap } from '../../toolText';

const tools: ToolTextMap = {
  'jpg-to-png': {
    name: '...',            // tool name, as it appears in the menu and the heading
    description: '...',     // one sentence under the heading
    metaDescription: '...', // search-result description, about 120-160 characters, must read naturally
    steps: ['...', '...'],  // same number of steps as English
    faq: [{ q: '...', a: '...' }],  // same number of entries and order as English
    limits: ['...'],        // same number of entries as English
  },
};
export default tools;
```

* All 69 slugs, every field, same array lengths and order as the English source.
* Tool names are short and consistent with how the same operation is named in the interface texts (for example the
  names "Merge PDF", "Compress PDF", "OCR PDF" must use the same verbs as your interface translation).
* `metaDescription` is shown in search results: natural, complete, no keyword stuffing, no hype.

## Checking your work

1. `node scripts/i18n-audit.mjs --report` - for your language, "translated" must reach "total" for the files you own,
   "placeholder issues" must be 0, and "identical to English" should only contain strings that are legitimately the same
   (technical names). Look at the list the script prints for your language and fix real copies.
2. Skim a few files again for consistency of terms.

Do **not** run the whole test-suite, do not edit anything outside the files you were assigned, do not edit
`src/i18n/en/*`, `languages.ts`, `index.ts` or the docs, and do not run git commands.

## Final report (required)

Reply with: the files you wrote, the audit numbers for your language, and an honest list of anything you are not
confident about (specific keys or terms) or left out.
