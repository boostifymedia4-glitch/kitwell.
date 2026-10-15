/**
 * Text with real Unicode fonts for generated PDFs (HTML, Word, Excel and PowerPoint to PDF, text stamps).
 *
 * The standard PDF fonts only cover Western European letters, so Polish, Czech, Romanian, Turkish, Vietnamese,
 * Cyrillic, Greek and Devanagari text would be lost. This module embeds Noto Sans (SIL Open Font License) in the
 * scripts the document actually uses and picks the right font for every character. Scripts that need complex
 * shaping or very large fonts (Arabic, Hebrew, Thai, Chinese, Japanese, Korean...) are not covered: those
 * characters are replaced by "?" and reported through `unsupported`, so the person is told instead of getting
 * silently wrong output.
 */
import type { PDFDocument, PDFFont, PDFPage, RGB } from '@cantoo/pdf-lib';
import { degrees } from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { tr } from '@/i18n/translate';

/**
 * @pdf-lib/fontkit exposes both a stream-based and a one-shot subset encoder; @cantoo/pdf-lib picks the one-shot
 * encoder when it exists, which that fontkit cannot run on its own. Hiding it makes pdf-lib use the stream encoder,
 * so fonts are subset (a few KB per font) instead of embedded whole.
 */
const subsetFontkit = {
  create(data: Uint8Array, postscriptName?: string) {
    const font = fontkit.create(data, postscriptName) as unknown as { createSubset: () => object };
    const createSubset = font.createSubset.bind(font);
    font.createSubset = () =>
      new Proxy(createSubset() as Record<string, unknown>, {
        get(target, key) {
          if (key === 'encode') return undefined;
          const value = Reflect.get(target, key, target);
          return typeof value === 'function' ? value.bind(target) : value;
        },
      });
    return font;
  },
};

export type FontSubset = 'latin' | 'latin-ext' | 'cyrillic' | 'cyrillic-ext' | 'greek' | 'vietnamese' | 'devanagari';
export type FontFileId = `${FontSubset}-${400 | 700}`;
/** Returns the bytes of one font file. The browser build fetches them from this site; tests read them from disk. */
export type FontLoader = (id: FontFileId) => Promise<Uint8Array>;

/** Which scripts a piece of text needs. Latin is always loaded. */
const SCRIPT_TESTS: [FontSubset, RegExp][] = [
  ['latin-ext', /[Ā-ʯḀ-ỿⱠ-Ɀ꜠-ꟿ]/],
  ['vietnamese', /[ĂăĐđĨĩŨũƠơƯưẠ-ỹ]/],
  ['cyrillic', /[Ѐ-џҐґҰұ]/],
  // eslint-disable-next-line no-misleading-character-class
  ['cyrillic-ext', /[Ѡ-ԯᲀ-ᲈⷠ-ⷿꙀ-ꚟ]/],
  ['greek', /[Ͱ-Ͽ]/],
  ['devanagari', /[ऀ-ॿ]/],
];

export function subsetsFor(text: string): FontSubset[] {
  const out: FontSubset[] = ['latin'];
  for (const [subset, re] of SCRIPT_TESTS) if (re.test(text)) out.push(subset);
  // Vietnamese letters overlap with Latin Extended, so load both when either appears.
  if (out.includes('vietnamese') && !out.includes('latin-ext')) out.push('latin-ext');
  return out;
}

export interface TextStyle {
  size: number;
  bold?: boolean;
  italic?: boolean;
  color?: RGB;
}

interface Loaded {
  font: PDFFont;
  chars: Set<number>;
}

let defaultLoader: FontLoader | null = null;
/** Installs the loader used by `PdfFonts.create` when none is passed (the browser build sets it lazily). */
export function setDefaultFontLoader(loader: FontLoader) {
  defaultLoader = loader;
}

async function browserLoader(): Promise<FontLoader> {
  const { fontUrl } = await import('./pdfFontUrls');
  return async (id) => {
    const res = await fetch(fontUrl(id));
    if (!res.ok) throw new Error(tr('err.convert.font'));
    return new Uint8Array(await res.arrayBuffer());
  };
}

export class PdfFonts {
  /** Characters of the text that no embedded font covers (they are drawn as "?"). */
  readonly unsupported = new Set<string>();
  private constructor(
    private readonly regular: Loaded[],
    private readonly bold: Loaded[],
  ) {}

  /** Embeds the fonts needed for `sample` (all the text that will be drawn) into `doc`. */
  static async create(doc: PDFDocument, sample: string, loader?: FontLoader): Promise<PdfFonts> {
    doc.registerFontkit(subsetFontkit as unknown as Parameters<PDFDocument['registerFontkit']>[0]);
    const load = loader ?? defaultLoader ?? (defaultLoader = await browserLoader());
    const subsets = subsetsFor(sample);
    const embed = async (weight: 400 | 700) => {
      const out: Loaded[] = [];
      for (const subset of subsets) {
        const bytes = await load(`${subset}-${weight}`);
        const font = await doc.embedFont(bytes, { subset: true });
        out.push({ font, chars: new Set(font.getCharacterSet()) });
      }
      return out;
    };
    return new PdfFonts(await embed(400), await embed(700));
  }

  private pick(cp: number, bold: boolean): PDFFont | null {
    for (const f of bold ? this.bold : this.regular) if (f.chars.has(cp)) return f.font;
    return null;
  }

  /** Splits a string into runs that share one font; unsupported characters become "?". */
  private segments(text: string, bold: boolean): { font: PDFFont; text: string }[] {
    const out: { font: PDFFont; text: string }[] = [];
    const fallback = this.pick(63, bold) as PDFFont;
    for (const ch of text) {
      const cp = ch.codePointAt(0) as number;
      // Tabs, soft hyphens and zero-width characters have no glyph; drop or space them.
      if (cp === 9) {
        this.push(out, this.pick(32, bold) as PDFFont, '    ');
        continue;
      }
      if (cp === 0xad || cp === 0x200b || cp === 0x200c || cp === 0x200d || cp === 0xfeff || (cp < 32 && cp !== 10)) continue;
      if (cp === 0xa0) {
        this.push(out, this.pick(32, bold) as PDFFont, ' ');
        continue;
      }
      const font = this.pick(cp, bold);
      if (font) this.push(out, font, ch);
      else {
        this.unsupported.add(ch);
        this.push(out, fallback, '?');
      }
    }
    return out;
  }

  private push(out: { font: PDFFont; text: string }[], font: PDFFont, text: string) {
    const last = out[out.length - 1];
    if (last && last.font === font) last.text += text;
    else out.push({ font, text });
  }

  /** Width of `text` in points. */
  measure(text: string, size: number, bold = false): number {
    let w = 0;
    for (const s of this.segments(text, bold)) w += s.font.widthOfTextAtSize(s.text, size);
    return w;
  }

  /** Draws one line of text with its baseline at `y` and returns its width. */
  draw(page: PDFPage, text: string, x: number, y: number, style: TextStyle): number {
    let cursor = x;
    for (const s of this.segments(text, Boolean(style.bold))) {
      page.drawText(s.text, { x: cursor, y, size: style.size, font: s.font, color: style.color, ...(style.italic ? { xSkew: degrees(12) } : {}) });
      cursor += s.font.widthOfTextAtSize(s.text, style.size);
    }
    return cursor - x;
  }
}
