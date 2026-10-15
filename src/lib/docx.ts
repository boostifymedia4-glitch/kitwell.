/**
 * Reads a .docx file into the blocks used by the PDF layout engine (src/lib/docPdf.ts).
 *
 * Supported: paragraphs with bold, italic, underline and links, headings, bulleted and numbered lists, tables,
 * embedded JPEG and PNG pictures, line and page breaks, alignment, page orientation. Not supported (and reported):
 * headers and footers, footnotes, text boxes, equations, charts, shapes, tracked-change markup, and any font or
 * layout detail beyond the above. Old binary .doc files cannot be read.
 */
import type { Align, Block, Cell, ListItem, Run } from './docPdf';
import { LINE_BREAK } from './docPdf';
import { tr } from '@/i18n/translate';
import {
  OfficeError,
  attr,
  childElements,
  descendants,
  firstChild,
  imageKind,
  localName,
  openOffice,
  part,
  readRels,
  resolvePath,
  textOf,
  xmlPart,
  type Zip,
} from './officeZip';

export interface DocxRead {
  title: string;
  blocks: Block[];
  landscape: boolean;
  pageSize: 'a4' | 'letter';
  unsupportedImages: number;
  headersOrFooters: boolean;
  equations: number;
  textBoxes: number;
}

const on = (el: Element | undefined) => {
  if (!el) return false;
  const v = attr(el, 'val');
  return v === null || !/^(0|false|off|none)$/i.test(v);
};

const roman = (n: number) => {
  const map: [number, string][] = [[1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'], [100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'], [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']];
  let out = '';
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
};
const letters = (n: number) => {
  let out = '';
  while (n > 0) {
    out = String.fromCharCode(97 + ((n - 1) % 26)) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
};

function formatNumber(fmt: string, n: number): string {
  switch (fmt) {
    case 'lowerLetter':
      return `${letters(n)}.`;
    case 'upperLetter':
      return `${letters(n).toUpperCase()}.`;
    case 'lowerRoman':
      return `${roman(n)}.`;
    case 'upperRoman':
      return `${roman(n).toUpperCase()}.`;
    default:
      return `${n}.`;
  }
}

export function readDocx(bytes: Uint8Array): DocxRead {
  const zip: Zip = openOffice(bytes, 'Word (.doc)');
  const docXml = xmlPart(zip, 'word/document.xml');
  if (!docXml) throw new OfficeError(tr('err.office.notWord'));
  const body = descendants(docXml, 'body')[0];
  if (!body) throw new OfficeError(tr('err.office.noContent'));
  const rels = readRels(zip, 'word/_rels/document.xml.rels');

  const read: DocxRead = { title: '', blocks: [], landscape: false, pageSize: 'a4', unsupportedImages: 0, headersOrFooters: false, equations: 0, textBoxes: 0 };

  // ---- styles: style id -> heading level ----
  const styleNames = new Map<string, { name: string; basedOn?: string; bold?: boolean }>();
  const stylesXml = xmlPart(zip, 'word/styles.xml');
  if (stylesXml) {
    for (const st of descendants(stylesXml, 'style')) {
      const id = attr(st, 'styleId');
      if (!id) continue;
      styleNames.set(id, { name: (attr(firstChild(st, 'name'), 'val') ?? '').toLowerCase(), basedOn: attr(firstChild(st, 'basedOn'), 'val') ?? undefined, bold: on(firstChild(firstChild(st, 'rPr') as Element, 'b')) });
    }
  }
  const headingLevel = (styleId: string | null): number => {
    let id = styleId;
    for (let depth = 0; id && depth < 8; depth++) {
      const st = styleNames.get(id);
      const name = st?.name ?? id.toLowerCase();
      const m = /^heading\s*(\d)$/.exec(name);
      if (m) return Math.min(6, Number(m[1]));
      if (name === 'title') return 1;
      if (name === 'subtitle') return 2;
      id = st?.basedOn ?? null;
    }
    return 0;
  };

  // ---- numbering: numId + level -> format ----
  const levelFormats = new Map<string, string>();
  const numXml = xmlPart(zip, 'word/numbering.xml');
  if (numXml) {
    const abstract = new Map<string, Map<string, string>>();
    for (const an of descendants(numXml, 'abstractNum')) {
      const lv = new Map<string, string>();
      for (const l of childElements(an, 'lvl')) lv.set(attr(l, 'ilvl') ?? '0', attr(firstChild(l, 'numFmt'), 'val') ?? 'bullet');
      abstract.set(attr(an, 'abstractNumId') ?? '', lv);
    }
    for (const num of descendants(numXml, 'num')) {
      const numId = attr(num, 'numId');
      const absId = attr(firstChild(num, 'abstractNumId'), 'val');
      const lv = absId ? abstract.get(absId) : undefined;
      if (numId && lv) for (const [ilvl, fmt] of lv) levelFormats.set(`${numId}:${ilvl}`, fmt);
    }
  }
  const counters = new Map<string, number[]>();

  // ---- images ----
  const media = (rid: string | null): { bytes: Uint8Array; kind: 'jpg' | 'png' } | null => {
    const rel = rid ? rels.get(rid) : undefined;
    if (!rel || rel.external) return null;
    const data = part(zip, resolvePath('word', rel.target));
    const kind = data ? imageKind(data) : null;
    return data && kind ? { bytes: data, kind } : null;
  };

  // ---- paragraphs ----
  interface ParaOut {
    runs: Run[];
    images: { bytes: Uint8Array; kind: 'jpg' | 'png' }[];
    pageBreak: boolean;
  }
  const readRuns = (container: Element, out: ParaOut, href?: string) => {
    for (const child of childElements(container)) {
      const name = localName(child);
      if (name === 'r') {
        const rPr = firstChild(child, 'rPr');
        const base: Run = { text: '', bold: on(firstChild(rPr as Element, 'b')) && Boolean(rPr), italic: on(firstChild(rPr as Element, 'i')) && Boolean(rPr), underline: Boolean(rPr) && on(firstChild(rPr as Element, 'u')), href };
        for (const item of childElements(child)) {
          const iname = localName(item);
          if (iname === 't' || iname === 'delText') {
            if (iname === 'delText') continue;
            out.runs.push({ ...base, text: textOf(item) });
          } else if (iname === 'tab') out.runs.push({ ...base, text: '    ' });
          else if (iname === 'br' || iname === 'cr') {
            if (attr(item, 'type') === 'page') out.pageBreak = true;
            else out.runs.push(LINE_BREAK);
          } else if (iname === 'noBreakHyphen') out.runs.push({ ...base, text: '-' });
          else if (iname === 'drawing' || iname === 'pict') {
            const blips = descendants(item, 'blip');
            const rid = blips.length ? attr(blips[0], 'embed') : null;
            const imgs = descendants(item, 'imagedata');
            const img = media(rid ?? (imgs.length ? attr(imgs[0], 'id') : null));
            if (img) out.images.push(img);
            else if (rid || imgs.length) read.unsupportedImages++;
            if (descendants(item, 'txbxContent').length) read.textBoxes++;
          }
        }
      } else if (name === 'hyperlink') {
        const rel = attr(child, 'id') ? rels.get(attr(child, 'id') as string) : undefined;
        readRuns(child, out, rel?.target ?? href);
      } else if (name === 'ins' || name === 'smartTag' || name === 'sdt' || name === 'sdtContent' || name === 'fldSimple' || name === 'customXml') readRuns(child, out, href);
      else if (name === 'oMath' || name === 'oMathPara') read.equations++;
    }
  };

  const readParagraph = (p: Element): { out: ParaOut; heading: number; num: { id: string; level: number } | null; align?: Align } => {
    const pPr = firstChild(p, 'pPr');
    const styleId = attr(firstChild(pPr as Element, 'pStyle'), 'val');
    let heading = headingLevel(styleId);
    const outline = attr(firstChild(pPr as Element, 'outlineLvl'), 'val');
    if (!heading && outline !== null && Number(outline) < 6) heading = Number(outline) + 1;
    const numPr = firstChild(pPr as Element, 'numPr');
    const numId = attr(firstChild(numPr as Element, 'numId'), 'val');
    const ilvl = Number(attr(firstChild(numPr as Element, 'ilvl'), 'val') ?? 0);
    const jc = attr(firstChild(pPr as Element, 'jc'), 'val');
    const align: Align | undefined = jc === 'center' ? 'center' : jc === 'right' || jc === 'end' ? 'right' : jc === 'both' || jc === 'distribute' ? 'justify' : undefined;
    const out: ParaOut = { runs: [], images: [], pageBreak: false };
    readRuns(p, out);
    return { out, heading, num: numId && numId !== '0' ? { id: numId, level: ilvl } : null, align };
  };

  const trimBreaks = (runs: Run[]) => {
    let a = 0;
    let b = runs.length;
    while (a < b && runs[a] === LINE_BREAK) a++;
    while (b > a && runs[b - 1] === LINE_BREAK) b--;
    return runs.slice(a, b);
  };
  const hasText = (runs: Run[]) => runs.some((r) => r.text.trim() !== '');

  const tableBlock = (tbl: Element): Block | null => {
    const look = firstChild(firstChild(tbl, 'tblPr') as Element, 'tblLook');
    const firstRowHeader = look ? attr(look, 'firstRow') === '1' : false;
    const rows: Cell[][] = [];
    childElements(tbl, 'tr').forEach((tr, r) => {
      const cells: Cell[] = [];
      for (const tc of childElements(tr, 'tc')) {
        const runs: Run[] = [];
        let align: Align | undefined;
        for (const p of childElements(tc, 'p')) {
          const { out, align: a } = readParagraph(p);
          if (runs.length && hasText(out.runs)) runs.push(LINE_BREAK);
          runs.push(...out.runs);
          align ??= a;
        }
        const span = Number(attr(firstChild(firstChild(tc, 'tcPr') as Element, 'gridSpan'), 'val') ?? 1);
        cells.push({ runs: trimBreaks(runs), align, header: firstRowHeader && r === 0, colSpan: Number.isFinite(span) && span > 1 ? Math.min(span, 50) : 1 });
      }
      if (cells.length) rows.push(cells);
    });
    return rows.length ? { type: 'table', rows } : null;
  };

  let list: ListItem[] | null = null;
  let listId = '';
  const closeList = () => {
    if (list && list.length) read.blocks.push({ type: 'list', items: list });
    list = null;
  };

  for (const el of childElements(body)) {
    const name = localName(el);
    if (name === 'p') {
      const { out, heading, num, align } = readParagraph(el);
      const runs = trimBreaks(out.runs);
      if (num) {
        const fmt = levelFormats.get(`${num.id}:${num.level}`) ?? 'bullet';
        let marker = '•';
        if (fmt !== 'bullet') {
          const key = num.id;
          const arr = counters.get(key) ?? [];
          arr.length = num.level + 1;
          for (let i = 0; i <= num.level; i++) arr[i] = arr[i] ?? 0;
          arr[num.level] = (arr[num.level] ?? 0) + 1;
          counters.set(key, arr);
          marker = formatNumber(fmt, arr[num.level]);
        } else if (num.level % 2 === 1) marker = '–';
        if (list && listId !== num.id) closeList();
        list ??= [];
        listId = num.id;
        list.push({ runs: runs.length ? runs : [{ text: ' ' }], level: num.level, marker });
      } else {
        closeList();
        if (heading && hasText(runs)) read.blocks.push({ type: 'heading', level: heading, runs, align });
        else if (hasText(runs)) read.blocks.push({ type: 'paragraph', runs, align });
      }
      for (const img of out.images) {
        closeList();
        read.blocks.push({ type: 'image', bytes: img.bytes, kind: img.kind });
      }
      if (out.pageBreak) {
        closeList();
        read.blocks.push({ type: 'pagebreak' });
      }
    } else if (name === 'tbl') {
      closeList();
      const t = tableBlock(el);
      if (t) read.blocks.push(t);
    } else if (name === 'sdt') {
      // Content controls: read their paragraphs like body content.
      for (const inner of descendants(el, 'p')) {
        const { out } = readParagraph(inner);
        const runs = trimBreaks(out.runs);
        if (hasText(runs)) {
          closeList();
          read.blocks.push({ type: 'paragraph', runs });
        }
      }
    }
  }
  closeList();

  // ---- page setup ----
  const sects = descendants(docXml, 'sectPr');
  const last = sects[sects.length - 1];
  const pg = last ? firstChild(last, 'pgSz') : undefined;
  if (pg) {
    const w = Number(attr(pg, 'w') ?? 0);
    const h = Number(attr(pg, 'h') ?? 0);
    read.landscape = attr(pg, 'orient') === 'landscape' || (w > 0 && h > 0 && w > h);
    const short = Math.min(w, h);
    read.pageSize = short > 0 && Math.abs(short - 12240) < 300 ? 'letter' : 'a4';
  }

  const core = xmlPart(zip, 'docProps/core.xml');
  read.title = core ? textOf(descendants(core, 'title')[0]).trim() : '';
  read.headersOrFooters = Object.keys(zip).some((k) => /^word\/(header|footer)\d*\.xml$/.test(k) && /<w:t[ >]/.test(new TextDecoder().decode(zip[k])));
  return read;
}
