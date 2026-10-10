/**
 * The one place that decides what every tool's icon looks like. Each tool has a base shape, a colour, a glyph that
 * says what the tool does and, for conversions, a colour-coded format tag. `ToolIcon` reads this table; nothing else
 * chooses an icon, so a tool looks the same on the homepage, in menus, in search and on its own page.
 */

/** Colour families. Formats have fixed colours (PDF red, JPG amber, PNG blue ...); operations use the rest. */
export type ArtColor = 'red' | 'coral' | 'orange' | 'amber' | 'green' | 'teal' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink' | 'slate';

/** What the icon is built on: a sheet of paper, a photograph, a note, or a code window. */
export type ArtBase = 'page' | 'photo' | 'note' | 'window';

export type ArtGlyph =
  | 'merge' | 'split' | 'compress' | 'rotate' | 'extract' | 'reorder' | 'trash' | 'image' | 'images' | 'eye' | 'info' | 'hash' | 'drop'
  | 'crop' | 'pencil' | 'lock' | 'unlock' | 'lines' | 'scan' | 'sign' | 'form' | 'redact' | 'compare' | 'convert' | 'resize' | 'flip' | 'swap'
  | 'b64' | 'pipette' | 'bezier' | 'zoom' | 'blur' | 'qr' | 'play' | 'sliders' | 'count' | 'chars' | 'case' | 'dupes' | 'sort' | 'sparkle'
  | 'diff' | 'braces' | 'check' | 'minify' | 'xml' | 'link' | 'html' | 'regex' | 'markdown' | 'key' | 'uuid' | 'clock' | 'palette';

export interface ToolArt {
  base: ArtBase;
  color: ArtColor;
  glyph: ArtGlyph;
  /** Format tag shown on the icon, e.g. the target format of a conversion. */
  tag?: TagFormat;
  /** A second sheet behind the first (merge, batches). */
  stack?: boolean;
}

/** Formats that may appear as a tag; each has its own colour in ToolArt.tsx. */
export type TagFormat = 'PDF' | 'JPG' | 'PNG' | 'WEBP' | 'GIF' | 'SVG' | 'B64' | 'JSON' | 'XML' | 'HTML' | 'MD' | 'URL' | 'QR' | 'TXT';

const a = (base: ArtBase, color: ArtColor, glyph: ArtGlyph, extra: Partial<ToolArt> = {}): ToolArt => ({ base, color, glyph, ...extra });

export const TOOL_ART: Record<string, ToolArt> = {
  // Image: converters take the colour of the source format and carry the target format as a tag.
  'jpg-to-png': a('photo', 'amber', 'convert', { tag: 'PNG' }),
  'png-to-jpg': a('photo', 'blue', 'convert', { tag: 'JPG' }),
  'jpg-to-webp': a('photo', 'amber', 'convert', { tag: 'WEBP' }),
  'png-to-webp': a('photo', 'blue', 'convert', { tag: 'WEBP' }),
  'webp-to-jpg': a('photo', 'purple', 'convert', { tag: 'JPG' }),
  'webp-to-png': a('photo', 'purple', 'convert', { tag: 'PNG' }),
  'image-format-converter': a('photo', 'teal', 'swap'),
  'svg-converter': a('photo', 'orange', 'bezier', { tag: 'PNG' }),
  'image-compressor': a('photo', 'green', 'compress'),
  'image-resizer': a('photo', 'blue', 'resize'),
  'image-cropper': a('photo', 'purple', 'crop'),
  'image-rotator': a('photo', 'cyan', 'rotate'),
  'image-flipper': a('photo', 'cyan', 'flip'),
  'enlarge-image': a('photo', 'green', 'zoom'),
  'image-to-base64': a('photo', 'teal', 'b64', { tag: 'B64' }),
  'base64-to-image': a('window', 'teal', 'image', { tag: 'B64' }),
  'image-color-picker': a('photo', 'pink', 'pipette'),
  'image-watermark': a('photo', 'indigo', 'drop'),
  'blur-image-area': a('photo', 'slate', 'blur'),
  'qr-code-scanner': a('photo', 'indigo', 'scan'),
  'gif-maker': a('photo', 'pink', 'play', { tag: 'GIF' }),
  'photo-editor': a('photo', 'purple', 'sliders'),

  // PDF: organise = coral, optimise = green, edit = purple, secure = blue, inspect = slate or teal, convert = format colours.
  'jpg-to-pdf': a('page', 'amber', 'image', { tag: 'PDF' }),
  'png-to-pdf': a('page', 'blue', 'image', { tag: 'PDF' }),
  'images-to-pdf': a('page', 'teal', 'images', { tag: 'PDF', stack: true }),
  'merge-pdf': a('page', 'coral', 'merge', { stack: true }),
  'split-pdf': a('page', 'coral', 'split', { stack: true }),
  'rotate-pdf': a('page', 'coral', 'rotate'),
  'extract-pdf-pages': a('page', 'coral', 'extract'),
  'reorder-pdf-pages': a('page', 'coral', 'reorder'),
  'remove-pdf-pages': a('page', 'coral', 'trash'),
  'pdf-to-jpg': a('page', 'red', 'convert', { tag: 'JPG' }),
  'pdf-to-png': a('page', 'red', 'convert', { tag: 'PNG' }),
  'pdf-viewer': a('page', 'slate', 'eye', { tag: 'PDF' }),
  'pdf-metadata-viewer': a('page', 'slate', 'info', { tag: 'PDF' }),
  'add-page-numbers': a('page', 'purple', 'hash'),
  'watermark-pdf': a('page', 'purple', 'drop'),
  'crop-pdf': a('page', 'purple', 'crop'),
  'edit-pdf-metadata': a('page', 'purple', 'pencil'),
  'protect-pdf': a('page', 'blue', 'lock'),
  'unlock-pdf': a('page', 'blue', 'unlock'),
  'extract-pdf-text': a('page', 'teal', 'lines', { tag: 'TXT' }),
  'compress-pdf': a('page', 'green', 'compress', { tag: 'PDF' }),
  'ocr-pdf': a('page', 'teal', 'scan', { tag: 'PDF' }),
  'sign-pdf': a('page', 'blue', 'sign'),
  'fill-pdf-forms': a('page', 'purple', 'form'),
  'redact-pdf': a('page', 'blue', 'redact'),
  'compare-pdf': a('page', 'slate', 'compare', { stack: true }),

  // Text: warm note sheets.
  'word-counter': a('note', 'orange', 'count'),
  'character-counter': a('note', 'amber', 'chars'),
  'case-converter': a('note', 'coral', 'case'),
  'remove-duplicate-lines': a('note', 'pink', 'dupes'),
  'text-sorter': a('note', 'green', 'sort'),
  'text-cleaner': a('note', 'teal', 'sparkle'),
  'text-diff-checker': a('note', 'blue', 'diff', { stack: true }),

  // Developer: code windows in cool colours.
  'json-formatter': a('window', 'indigo', 'braces', { tag: 'JSON' }),
  'json-validator': a('window', 'green', 'check', { tag: 'JSON' }),
  'json-minifier': a('window', 'purple', 'minify', { tag: 'JSON' }),
  'xml-formatter': a('window', 'orange', 'xml', { tag: 'XML' }),
  'url-encoder-decoder': a('window', 'blue', 'link', { tag: 'URL' }),
  'html-encoder-decoder': a('window', 'coral', 'html', { tag: 'HTML' }),
  'base64-encoder-decoder': a('window', 'teal', 'b64', { tag: 'B64' }),
  'regex-tester': a('window', 'pink', 'regex'),
  'markdown-previewer': a('window', 'slate', 'markdown', { tag: 'MD' }),
  'password-generator': a('window', 'indigo', 'key'),
  'uuid-generator': a('window', 'cyan', 'uuid'),
  'timestamp-converter': a('window', 'amber', 'clock'),
  'color-converter': a('window', 'pink', 'palette'),
  'qr-code-generator': a('window', 'indigo', 'qr', { tag: 'QR' }),
};
