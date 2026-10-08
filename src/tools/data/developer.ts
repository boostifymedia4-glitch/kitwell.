import type { ToolDef } from '../types';

const common = { category: 'developer' as const, fileTool: false };

export const developerTools: ToolDef[] = [
  {
    ...common,
    slug: 'json-formatter',
    group: 'JSON and XML',
    name: 'JSON Formatter',
    icon: 'braces',
    impl: 'json-tool',
    config: { mode: 'format' },
    description: 'Format and pretty-print JSON with your choice of indentation and key sorting.',
    metaDescription:
      'Free online JSON formatter and beautifier. Pretty-print JSON with 2 or 4 spaces or tabs, sort keys, and see precise error locations.',
    keywords: ['json beautifier', 'pretty print json', 'format json'],
    steps: ['Paste your JSON.', 'Choose indentation and sorting.', 'Copy or download the formatted result.'],
    faq: [
      {
        q: 'Is my JSON sent to a server?',
        a: 'No. Parsing and formatting happen in your browser with the built-in JSON parser.',
      },
      {
        q: 'Why does it reject my JSON?',
        a: 'Strict JSON does not allow comments, trailing commas or single quotes. The error message shows the line and column of the problem.',
      },
    ],
    limits: ['Numbers larger than 2^53 lose precision because the browser parses them as floating point.'],
    related: ['json-validator', 'json-minifier', 'xml-formatter', 'text-diff-checker', 'base64-encoder-decoder'],
  },
  {
    ...common,
    slug: 'json-validator',
    group: 'JSON and XML',
    name: 'JSON Validator',
    icon: 'badge-check',
    impl: 'json-tool',
    config: { mode: 'validate' },
    description: 'Check whether JSON is valid and get the exact line and column of any error.',
    metaDescription:
      'Free online JSON validator. Check JSON syntax and find the exact line and column of errors, with a summary of the structure.',
    keywords: ['validate json', 'json syntax check', 'json lint'],
    steps: ['Paste your JSON.', 'See instantly whether it is valid.', 'Fix any reported error and check again.'],
    faq: [
      {
        q: 'Does this validate against a JSON Schema?',
        a: 'No. It checks syntax only: whether the text is well-formed JSON.',
      },
    ],
    limits: ['Syntax validation only; JSON Schema validation is not included.'],
    related: ['json-formatter', 'json-minifier', 'xml-formatter', 'regex-tester', 'text-diff-checker'],
  },
  {
    ...common,
    slug: 'json-minifier',
    group: 'JSON and XML',
    name: 'JSON Minifier',
    icon: 'shrink',
    impl: 'json-tool',
    config: { mode: 'minify' },
    description: 'Remove whitespace from JSON to make it as compact as possible.',
    metaDescription:
      'Free online JSON minifier. Strip whitespace from JSON to shrink payloads, and see how many bytes you saved.',
    keywords: ['minify json', 'compress json', 'json compact'],
    steps: ['Paste your JSON.', 'The minified output appears with the size saved.', 'Copy or download it.'],
    faq: [
      {
        q: 'Does minifying change the data?',
        a: 'No. Only insignificant whitespace is removed; keys, values and order are unchanged.',
      },
    ],
    limits: ['Numbers larger than 2^53 lose precision because the browser parses them as floating point.'],
    related: ['json-formatter', 'json-validator', 'xml-formatter', 'base64-encoder-decoder', 'url-encoder-decoder'],
  },
  {
    ...common,
    slug: 'xml-formatter',
    group: 'JSON and XML',
    name: 'XML Formatter',
    icon: 'file-code',
    impl: 'xml-formatter',
    description: 'Pretty-print or minify XML and catch mismatched or unclosed tags.',
    metaDescription:
      'Free online XML formatter. Beautify or minify XML with adjustable indentation and detect mismatched or unclosed tags.',
    keywords: ['xml beautifier', 'format xml', 'pretty print xml'],
    steps: ['Paste your XML.', 'Choose Format or Minify and the indentation.', 'Copy the result.'],
    faq: [
      {
        q: 'How thoroughly is the XML validated?',
        a: 'The tool checks tag nesting, unclosed tags and unterminated comments or CDATA. It does not validate against a DTD or XSD schema.',
      },
    ],
    limits: ['Structural checks only; no DTD or XSD validation.'],
    related: ['json-formatter', 'html-encoder-decoder', 'text-diff-checker', 'json-minifier', 'url-encoder-decoder'],
  },
  {
    ...common,
    slug: 'url-encoder-decoder',
    group: 'Encode and decode',
    name: 'URL Encoder / Decoder',
    icon: 'link',
    impl: 'encode-decode',
    config: { kind: 'url' },
    description: 'Percent-encode or decode URLs and query-string values.',
    metaDescription:
      'Free online URL encoder and decoder. Percent-encode text for URLs or decode encoded strings, for full URLs or single components.',
    keywords: ['urlencode', 'percent encoding', 'decode url'],
    steps: ['Choose Encode or Decode.', 'Paste your text or URL.', 'Copy the result.'],
    faq: [
      {
        q: 'Component or full URL?',
        a: 'Use Component for a single value such as a query parameter; it encodes characters like / ? & =. Use Full URL to leave the URL structure intact.',
      },
    ],
    limits: ['Decoding fails on malformed percent sequences such as a lone %.'],
    related: ['base64-encoder-decoder', 'html-encoder-decoder', 'json-formatter', 'regex-tester', 'uuid-generator', 'qr-code-generator'],
  },
  {
    ...common,
    slug: 'html-encoder-decoder',
    group: 'Encode and decode',
    name: 'HTML Encoder / Decoder',
    icon: 'code',
    impl: 'encode-decode',
    config: { kind: 'html' },
    description: 'Escape special characters as HTML entities or decode entities back to text.',
    metaDescription:
      'Free online HTML encoder and decoder. Escape <, >, & and quotes as HTML entities, or decode named and numeric entities.',
    keywords: ['html escape', 'html entities', 'unescape html'],
    steps: ['Choose Encode or Decode.', 'Paste your text.', 'Copy the result.'],
    faq: [
      {
        q: 'Does encoding make user input safe for HTML?',
        a: 'Escaping the five special characters makes text safe inside HTML element content and quoted attributes. It is not a substitute for a proper templating library or sanitizer in other contexts.',
      },
    ],
    limits: ['Decoding supports the common named entities plus all numeric entities.'],
    related: ['url-encoder-decoder', 'base64-encoder-decoder', 'xml-formatter', 'markdown-previewer', 'json-formatter'],
  },
  {
    ...common,
    slug: 'base64-encoder-decoder',
    group: 'Encode and decode',
    name: 'Base64 Encoder / Decoder',
    icon: 'binary',
    impl: 'encode-decode',
    config: { kind: 'base64' },
    description: 'Encode text to Base64 or decode Base64 back to text, with full UTF-8 support.',
    metaDescription:
      'Free online Base64 encoder and decoder. Convert text to Base64 and back with UTF-8 support and an optional URL-safe alphabet.',
    keywords: ['base64 encode', 'base64 decode', 'atob btoa'],
    steps: ['Choose Encode or Decode.', 'Paste your text.', 'Copy the result.'],
    faq: [
      {
        q: 'Is Base64 encryption?',
        a: 'No. Base64 is an encoding, not encryption. Anyone can decode it, so never use it to protect secrets.',
      },
      {
        q: 'What is URL-safe Base64?',
        a: 'It swaps + and / for - and _ and drops the = padding so the value can sit safely in URLs and filenames.',
      },
    ],
    limits: ['For image data use Image to Base64 and Base64 to Image.'],
    related: ['image-to-base64', 'base64-to-image', 'url-encoder-decoder', 'html-encoder-decoder', 'json-formatter'],
  },
  {
    ...common,
    slug: 'regex-tester',
    group: 'Test and generate',
    name: 'Regex Tester',
    icon: 'regex',
    impl: 'regex-tester',
    description: 'Test JavaScript regular expressions with live match highlighting and capture groups.',
    metaDescription:
      'Free online regex tester for JavaScript. See live matches, capture groups and named groups, and preview replacements.',
    keywords: ['regular expression tester', 'regexp', 'javascript regex'],
    steps: ['Enter a pattern and pick flags.', 'Paste the text to test.', 'Review matches, groups and the replacement preview.'],
    faq: [
      {
        q: 'Which regex flavour is used?',
        a: 'JavaScript (ECMAScript) regular expressions, as implemented by your browser. PCRE, Python and other flavours differ in some features.',
      },
      {
        q: 'Why does my page freeze on some patterns?',
        a: 'Patterns with nested repetition can backtrack catastrophically. Matching runs in a background worker and is stopped after 1.5 seconds, so a runaway pattern cannot freeze the page, but you should still avoid patterns like (a+)+.',
      },
    ],
    limits: ['JavaScript regex syntax only.', 'Matching stops after 5,000 matches or 1.5 seconds.'],
    related: ['text-diff-checker', 'json-validator', 'url-encoder-decoder', 'text-cleaner', 'remove-duplicate-lines'],
  },
  {
    ...common,
    slug: 'markdown-previewer',
    group: 'Test and generate',
    name: 'Markdown Previewer',
    icon: 'markdown',
    impl: 'markdown-previewer',
    description: 'Write Markdown and see a safe, sanitized live preview alongside it.',
    metaDescription:
      'Free online Markdown previewer. Write GitHub-flavoured Markdown and see a live sanitized HTML preview, then copy the HTML.',
    keywords: ['markdown editor', 'markdown preview', 'md to html'],
    steps: ['Write or paste Markdown on the left.', 'See the rendered result on the right.', 'Copy the Markdown or the generated HTML.'],
    faq: [
      {
        q: 'Is the preview safe?',
        a: 'Yes. Generated HTML is sanitized with DOMPurify before display, so scripts and event handlers are removed.',
      },
    ],
    limits: ['GitHub-flavoured Markdown via the marked library; no math or diagram extensions.'],
    related: ['html-encoder-decoder', 'word-counter', 'text-diff-checker', 'json-formatter', 'case-converter'],
  },
  {
    ...common,
    slug: 'password-generator',
    group: 'Test and generate',
    name: 'Password Generator',
    icon: 'key',
    impl: 'password-generator',
    description: 'Generate strong random passwords using your browser’s secure random generator.',
    metaDescription:
      'Free secure password generator. Create random passwords up to 128 characters using cryptographic randomness in your browser.',
    keywords: ['random password', 'strong password generator', 'passphrase generator'],
    steps: ['Set the length and character types.', 'Generate as many passwords as you need.', 'Copy one and store it in a password manager.'],
    faq: [
      {
        q: 'Are generated passwords stored or sent anywhere?',
        a: 'No. Passwords are generated in your browser using crypto.getRandomValues and are never transmitted or saved.',
      },
      {
        q: 'How long should a password be?',
        a: 'At least 16 characters for important accounts. Length matters more than complexity.',
      },
    ],
    limits: ['The strength estimate is based on entropy of the character set, not on breach databases.'],
    related: ['uuid-generator', 'base64-encoder-decoder', 'word-counter', 'url-encoder-decoder', 'timestamp-converter', 'qr-code-generator', 'protect-pdf'],
  },
  {
    ...common,
    slug: 'uuid-generator',
    group: 'Test and generate',
    name: 'UUID Generator',
    icon: 'fingerprint',
    impl: 'uuid-generator',
    description: 'Generate random version 4 UUIDs in bulk with format options.',
    metaDescription:
      'Free online UUID generator. Create random v4 UUIDs in bulk, in uppercase, without hyphens or with braces, using cryptographic randomness.',
    keywords: ['guid generator', 'uuid v4', 'random uuid'],
    steps: ['Choose how many UUIDs and the format.', 'Generate.', 'Copy the list.'],
    faq: [
      {
        q: 'Can two UUIDs collide?',
        a: 'Version 4 UUIDs have 122 random bits, so the chance of a collision is negligible in practice.',
      },
    ],
    limits: ['Only version 4 (random) UUIDs are generated.'],
    related: ['password-generator', 'timestamp-converter', 'base64-encoder-decoder', 'json-formatter', 'url-encoder-decoder', 'qr-code-generator'],
  },
  {
    ...common,
    slug: 'timestamp-converter',
    group: 'Test and generate',
    name: 'Timestamp Converter',
    icon: 'clock',
    impl: 'timestamp-converter',
    description: 'Convert Unix timestamps to human-readable dates and back, in any time zone.',
    metaDescription:
      'Free online Unix timestamp converter. Convert epoch seconds or milliseconds to dates in UTC and local time, and dates back to timestamps.',
    keywords: ['epoch converter', 'unix time', 'timestamp to date'],
    steps: ['Enter a Unix timestamp or pick a date.', 'Read the result in UTC, your local zone and ISO 8601.', 'Copy any value.'],
    faq: [
      {
        q: 'Seconds or milliseconds?',
        a: 'Timestamps with 13 or more digits are treated as milliseconds, shorter ones as seconds. You can override this manually.',
      },
    ],
    limits: ['Supported range is the range of JavaScript dates: roughly years -271821 to 275760.'],
    related: ['uuid-generator', 'json-formatter', 'regex-tester', 'password-generator', 'base64-encoder-decoder'],
  },
  {
    ...common,
    slug: 'color-converter',
    group: 'Test and generate',
    name: 'Color Converter',
    icon: 'palette',
    impl: 'color-converter',
    description: 'Convert colours between HEX, RGB, HSL and HSV, with a live preview and contrast check.',
    metaDescription:
      'Free online colour converter. Convert HEX, RGB, HSL and HSV values, preview the colour and check WCAG contrast ratios.',
    keywords: ['hex to rgb', 'rgb to hsl', 'color code converter'],
    steps: ['Enter a colour in any format or use the picker.', 'See every format update.', 'Copy the value you need.'],
    faq: [
      {
        q: 'What does the contrast check show?',
        a: 'It shows the WCAG contrast ratio of the colour against white and black text, which helps you choose readable combinations.',
      },
    ],
    limits: ['sRGB only; CSS Color 4 spaces such as LAB, LCH and Display-P3 are not supported.', 'Transparency (alpha) values are accepted but ignored.'],
    related: ['image-color-picker', 'html-encoder-decoder', 'base64-encoder-decoder', 'json-formatter', 'password-generator'],
  },
  {
    ...common,
    slug: 'qr-code-generator',
    group: 'Test and generate',
    name: 'QR Code Generator',
    icon: 'qr-code',
    impl: 'qr-generator',
    description: 'Create QR codes for links, text, Wi-Fi, email or phone numbers, as PNG or SVG.',
    metaDescription:
      'Free QR code generator. Make QR codes for URLs, text, Wi-Fi, email and phone numbers and download them as PNG or SVG. Created in your browser.',
    keywords: ['make qr code', 'qr code maker', 'wifi qr code'],
    steps: [
      'Choose what the code should contain and fill in the details.',
      'Adjust the size, colours and error correction if you wish.',
      'Download the PNG or SVG, and test it with your phone before printing.',
    ],
    faq: [
      {
        q: 'Do the codes expire?',
        a: 'No. These are static codes: the data is stored in the code itself, so they work forever and nothing is tracked.',
      },
      {
        q: 'Which error-correction level should I choose?',
        a: 'Medium suits most uses. Choose Quartile or High if the code may get dirty or damaged, but higher levels make the code denser and harder to scan at small sizes.',
      },
      { q: 'Can I use the codes commercially?', a: 'Yes. The QR code standard is open, and codes made here carry no fees, watermarks or tracking from us.' },
      { q: 'Is my data sent anywhere?', a: 'No. The code is generated in your browser, and Wi-Fi passwords you enter stay on your device.' },
    ],
    limits: [
      'Static codes only: no scan tracking and no editable codes.',
      'Very long text makes a dense code that is hard to scan, so keep it short.',
      'Dark-on-light colours with strong contrast scan best.',
    ],
    related: ['qr-code-scanner', 'url-encoder-decoder', 'password-generator', 'uuid-generator', 'base64-encoder-decoder'],
  },
];
