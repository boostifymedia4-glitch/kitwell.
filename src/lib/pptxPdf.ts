/**
 * Converts a .pptx presentation to a PDF with one page per slide, drawn from the slide XML.
 *
 * Supported: slide size and order, slide background colour, text boxes and placeholders (position, size, bold,
 * italic, underline, colour, alignment, bullets, text that is shrunk to fit its box), filled rectangles and
 * ellipses, embedded JPEG and PNG pictures, simple tables. Not supported (and counted): charts, SmartArt, video
 * and audio, animations and transitions, gradients and pictures in other formats (EMF, SVG, WebP...), shadows and
 * effects, speaker notes, slide numbers from master slides, and the exact fonts of the original. Old binary .ppt
 * files cannot be read.
 */
import { PDFDocument, rgb, type PDFImage, type PDFPage, type RGB } from '@cantoo/pdf-lib';
import { PdfFonts, type FontLoader } from './pdfFont';
import { tr } from '@/i18n/translate';
import {
  OfficeError,
  attr,
  prefixedAttr,
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

const EMU = 12700;
const MAX_SLIDES = 300;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Para {
  runs: { text: string; size?: number; bold: boolean; italic: boolean; underline: boolean; color?: RGB }[];
  align: 'l' | 'ctr' | 'r' | 'just';
  bullet: boolean;
  level: number;
}
interface Shape {
  kind: 'text' | 'pic' | 'rect' | 'table';
  box: Box;
  fill?: RGB;
  ellipse?: boolean;
  paras?: Para[];
  anchor?: 't' | 'ctr' | 'b';
  insets?: [number, number, number, number];
  image?: { bytes: Uint8Array; kind: 'jpg' | 'png' };
  placeholder?: string;
  rows?: { cells: Para[][]; h: number }[];
  colWidths?: number[];
}

export interface PptxResult {
  bytes: Uint8Array;
  slides: number;
  unsupportedElements: number;
  skippedImages: number;
  unsupported: string[];
}

const hex = (s: string): RGB => rgb(parseInt(s.slice(0, 2), 16) / 255, parseInt(s.slice(2, 4), 16) / 255, parseInt(s.slice(4, 6), 16) / 255);

/** Reads a (possibly themed) colour element: srgbClr, schemeClr, sysClr or prstClr. */
function colorOf(el: Element | undefined, theme: Map<string, string>): RGB | undefined {
  if (!el) return undefined;
  for (const c of childElements(el)) {
    const n = localName(c);
    if (n === 'srgbClr') return hex(attr(c, 'val') ?? '000000');
    if (n === 'sysClr') return hex(attr(c, 'lastClr') ?? '000000');
    if (n === 'schemeClr') {
      const map: Record<string, string> = { tx1: 'dk1', bg1: 'lt1', tx2: 'dk2', bg2: 'lt2' };
      const key = attr(c, 'val') ?? 'dk1';
      const h = theme.get(map[key] ?? key);
      return h ? hex(h) : undefined;
    }
    if (n === 'prstClr') return attr(c, 'val') === 'white' ? rgb(1, 1, 1) : rgb(0, 0, 0);
  }
  return undefined;
}

function readTheme(zip: Zip): Map<string, string> {
  const map = new Map<string, string>();
  const themePath = Object.keys(zip).find((k) => /^ppt\/theme\/theme\d+\.xml$/.test(k));
  const doc = themePath ? xmlPart(zip, themePath) : null;
  const scheme = doc ? descendants(doc, 'clrScheme')[0] : undefined;
  for (const c of childElements(scheme)) {
    const v = firstChild(c, 'srgbClr') ?? firstChild(c, 'sysClr');
    if (v) map.set(localName(c), attr(v, 'val') ?? attr(v, 'lastClr') ?? '000000');
  }
  return map;
}

export async function pptxToPdf(bytes: Uint8Array, loader?: FontLoader): Promise<PptxResult> {
  const zip = openOffice(bytes, 'PowerPoint (.ppt)');
  const presXml = xmlPart(zip, 'ppt/presentation.xml');
  if (!presXml) throw new OfficeError(tr('err.office.notPowerPoint'));
  const presRels = readRels(zip, 'ppt/_rels/presentation.xml.rels');
  const sz = descendants(presXml, 'sldSz')[0];
  const slideW = Number(attr(sz, 'cx') ?? 9144000) / EMU;
  const slideH = Number(attr(sz, 'cy') ?? 6858000) / EMU;
  const theme = readTheme(zip);

  const slidePaths: string[] = [];
  for (const id of descendants(presXml, 'sldId')) {
    const rel = presRels.get(prefixedAttr(id, 'id') ?? '');
    if (rel) slidePaths.push(resolvePath('ppt', rel.target));
  }
  if (slidePaths.length === 0) throw new OfficeError(tr('err.office.noSlides'));
  if (slidePaths.length > MAX_SLIDES) throw new OfficeError(tr('err.office.tooManySlides', { max: MAX_SLIDES }));

  let unsupportedElements = 0;
  let skippedImages = 0;

  // Default sizes from the master's text styles.
  const masterPath = Object.keys(zip).find((k) => /^ppt\/slideMasters\/slideMaster\d+\.xml$/.test(k));
  const masterXml = masterPath ? xmlPart(zip, masterPath) : null;
  const styleSize = (kind: 'titleStyle' | 'bodyStyle' | 'otherStyle', level: number): number | undefined => {
    const style = masterXml ? descendants(masterXml, kind)[0] : undefined;
    const lvl = firstChild(style, `lvl${level + 1}pPr`);
    const sz2 = attr(firstChild(lvl, 'defRPr'), 'sz');
    return sz2 ? Number(sz2) / 100 : undefined;
  };

  const placeholderBox = (slideRels: ReturnType<typeof readRels>, ph: Element): Box | undefined => {
    const type = attr(ph, 'type');
    const idx = attr(ph, 'idx');
    const look = (xml: Document | null) => {
      if (!xml) return undefined;
      for (const sp of descendants(xml, 'sp')) {
        const p = descendants(sp, 'ph')[0];
        if (!p) continue;
        const sameIdx = idx !== null && attr(p, 'idx') === idx;
        const sameType = type !== null && attr(p, 'type') === type;
        if (!(sameIdx || sameType)) continue;
        const xf = descendants(sp, 'xfrm')[0];
        if (xf) return xfrmBox(xf);
      }
      return undefined;
    };
    const layoutRel = [...slideRels.values()].find((r) => /slideLayout$/.test(r.type));
    const layoutPath = layoutRel ? resolvePath('ppt/slides', layoutRel.target) : '';
    const layoutXml = layoutPath ? xmlPart(zip, layoutPath) : null;
    const fromLayout = look(layoutXml);
    if (fromLayout) return fromLayout;
    return look(masterXml);
  };

  const xfrmBox = (xf: Element): Box => {
    const off = firstChild(xf, 'off');
    const ext = firstChild(xf, 'ext');
    return { x: Number(attr(off, 'x') ?? 0) / EMU, y: Number(attr(off, 'y') ?? 0) / EMU, w: Number(attr(ext, 'cx') ?? 0) / EMU, h: Number(attr(ext, 'cy') ?? 0) / EMU };
  };

  const readParas = (tx: Element | undefined, phType: string | undefined): Para[] => {
    const paras: Para[] = [];
    for (const p of childElements(tx, 'p')) {
      const pPr = firstChild(p, 'pPr');
      const lvl = Number(attr(pPr, 'lvl') ?? 0);
      const algn = attr(pPr, 'algn');
      const defRPr = firstChild(pPr, 'defRPr');
      const para: Para = {
        runs: [],
        align: algn === 'ctr' || algn === 'r' || algn === 'just' ? algn : phType === 'ctrTitle' || phType === 'subTitle' ? 'ctr' : 'l',
        bullet: Boolean(firstChild(pPr, 'buChar') || firstChild(pPr, 'buAutoNum')) || (phType === 'body' && !firstChild(pPr, 'buNone')),
        level: lvl,
      };
      const base = phType === 'title' || phType === 'ctrTitle' ? 'titleStyle' : phType === 'body' || phType === 'subTitle' || phType === 'obj' ? 'bodyStyle' : 'otherStyle';
      const defSize = attr(defRPr, 'sz') ? Number(attr(defRPr, 'sz')) / 100 : styleSize(base, lvl);
      for (const node of childElements(p)) {
        const n = localName(node);
        if (n === 'r' || n === 'fld') {
          const rPr = firstChild(node, 'rPr');
          const szAttr = attr(rPr, 'sz');
          para.runs.push({
            text: textOf(firstChild(node, 't')),
            size: szAttr ? Number(szAttr) / 100 : defSize,
            bold: attr(rPr, 'b') === '1' || (attr(rPr, 'b') === null && (phType === 'title' || phType === 'ctrTitle') && false),
            italic: attr(rPr, 'i') === '1',
            underline: Boolean(attr(rPr, 'u')) && attr(rPr, 'u') !== 'none',
            color: colorOf(firstChild(rPr, 'solidFill'), theme),
          });
        } else if (n === 'br') para.runs.push({ text: '\n', size: defSize, bold: false, italic: false, underline: false });
      }
      paras.push(para);
    }
    return paras;
  };

  const readShapes = (container: Element, slideRels: ReturnType<typeof readRels>, slideDir: string, shapes: Shape[], map: (b: Box) => Box) => {
    for (const el of childElements(container)) {
      const name = localName(el);
      if (name === 'sp') {
        const spPr = firstChild(el, 'spPr');
        const ph = descendants(el, 'ph')[0];
        const xf = firstChild(spPr, 'xfrm');
        const raw = xf ? xfrmBox(xf) : ph ? placeholderBox(slideRels, ph) : undefined;
        if (!raw) continue;
        const box = map(raw);
        const fill = colorOf(firstChild(spPr, 'solidFill'), theme);
        const geom = attr(firstChild(spPr, 'prstGeom'), 'prst');
        const tx = firstChild(el, 'txBody');
        const phType = ph ? (attr(ph, 'type') ?? (attr(ph, 'idx') ? 'body' : undefined)) : undefined;
        const paras = readParas(tx, phType).filter((p) => p.runs.length);
        const bodyPr = firstChild(tx, 'bodyPr');
        const ins = (k: string, d: number) => Number(attr(bodyPr, k) ?? d) / EMU;
        if (fill) shapes.push({ kind: 'rect', box, fill, ellipse: geom === 'ellipse' });
        if (paras.some((p) => p.runs.some((r) => r.text.trim()))) {
          shapes.push({ kind: 'text', box, paras, anchor: (attr(bodyPr, 'anchor') as 't' | 'ctr' | 'b' | null) ?? (phType === 'title' || phType === 'ctrTitle' ? 'ctr' : 't'), insets: [ins('lIns', 91440), ins('tIns', 45720), ins('rIns', 91440), ins('bIns', 45720)], placeholder: phType });
        }
      } else if (name === 'pic') {
        const xf = descendants(el, 'xfrm')[0];
        if (!xf) continue;
        const rid = attr(descendants(el, 'blip')[0], 'embed');
        const rel = rid ? slideRels.get(rid) : undefined;
        const data = rel && !rel.external ? part(zip, resolvePath(slideDir, rel.target)) : undefined;
        const kind = data ? imageKind(data) : null;
        if (data && kind) shapes.push({ kind: 'pic', box: map(xfrmBox(xf)), image: { bytes: data, kind } });
        else skippedImages++;
      } else if (name === 'grpSp') {
        const gx = firstChild(firstChild(el, 'grpSpPr'), 'xfrm');
        if (gx) {
          const off = firstChild(gx, 'off');
          const ext = firstChild(gx, 'ext');
          const choff = firstChild(gx, 'chOff');
          const chext = firstChild(gx, 'chExt');
          const sx = Number(attr(chext, 'cx') ?? 1) ? Number(attr(ext, 'cx') ?? 1) / Number(attr(chext, 'cx') ?? 1) : 1;
          const sy = Number(attr(chext, 'cy') ?? 1) ? Number(attr(ext, 'cy') ?? 1) / Number(attr(chext, 'cy') ?? 1) : 1;
          const inner = (b: Box): Box =>
            map({
              x: Number(attr(off, 'x') ?? 0) / EMU + (b.x - Number(attr(choff, 'x') ?? 0) / EMU) * sx,
              y: Number(attr(off, 'y') ?? 0) / EMU + (b.y - Number(attr(choff, 'y') ?? 0) / EMU) * sy,
              w: b.w * sx,
              h: b.h * sy,
            });
          readShapes(el, slideRels, slideDir, shapes, inner);
        } else readShapes(el, slideRels, slideDir, shapes, map);
      } else if (name === 'graphicFrame') {
        const tbl = descendants(el, 'tbl')[0];
        const xf = firstChild(el, 'xfrm');
        if (tbl && xf) {
          const cols = descendants(tbl, 'gridCol').map((g) => Number(attr(g, 'w') ?? 0) / EMU);
          const rows = childElements(tbl, 'tr').map((tr) => ({ h: Number(attr(tr, 'h') ?? 0) / EMU, cells: childElements(tr, 'tc').map((tc) => readParas(firstChild(tc, 'txBody'), undefined)) }));
          shapes.push({ kind: 'table', box: map(xfrmBox(xf)), rows, colWidths: cols });
        } else unsupportedElements++;
      } else if (name === 'cxnSp') {
        // connectors and lines are not drawn
      } else if (name === 'contentPart' || name === 'AlternateContent') unsupportedElements++;
    }
  };

  const doc = await PDFDocument.create();
  const allText: string[] = [];
  const slideData: { shapes: Shape[]; bg?: RGB }[] = [];
  for (const path of slidePaths) {
    const xml = xmlPart(zip, path);
    if (!xml) continue;
    const dir = path.split('/').slice(0, -1).join('/');
    const rels = readRels(zip, `${dir}/_rels/${path.split('/').pop()}.rels`);
    const tree = descendants(xml, 'spTree')[0];
    const shapes: Shape[] = [];
    if (tree) readShapes(tree, rels, dir, shapes, (b) => b);
    const bgFill = descendants(xml, 'bg')[0] ? firstChild(firstChild(descendants(xml, 'bg')[0], 'bgPr'), 'solidFill') : undefined;
    for (const shape of shapes) {
      shape.paras?.forEach((p) => p.runs.forEach((r) => allText.push(r.text)));
      shape.rows?.forEach((r) => r.cells.forEach((c) => c.forEach((p) => p.runs.forEach((run) => allText.push(run.text)))));
    }
    // Charts and diagrams inside graphic frames are counted.
    unsupportedElements += descendants(xml, 'chart').length + descendants(xml, 'relIds').length + descendants(xml, 'oleObj').length;
    slideData.push({ shapes, bg: colorOf(bgFill, theme) });
  }

  const fonts = await PdfFonts.create(doc, allText.join(' ') + ' ?•', loader);
  const images = new Map<Uint8Array, PDFImage | null>();

  const drawParas = (page: PDFPage, paras: Para[], box: Box, anchor: 't' | 'ctr' | 'b', insets: [number, number, number, number], defaultSize: number, defaultColor: RGB) => {
    const innerW = Math.max(8, box.w - insets[0] - insets[2]);
    const innerH = Math.max(8, box.h - insets[1] - insets[3]);
    const layout = (scale: number) => {
      const lines: { text: string; size: number; bold: boolean; italic: boolean; underline: boolean; color: RGB; align: Para['align']; indent: number; bullet: boolean; first: boolean; width: number }[] = [];
      let height = 0;
      for (const para of paras) {
        const indent = para.bullet ? 14 + para.level * 14 : para.level * 14;
        let first = true;
        let cur = { text: '', width: 0, size: 0, bold: false, italic: false, underline: false, color: defaultColor };
        const flush = () => {
          const size = cur.size || (para.runs[0]?.size ?? defaultSize) * scale;
          lines.push({ ...cur, size, align: para.align, indent, bullet: para.bullet, first, width: cur.width });
          height += size * 1.2;
          first = false;
          cur = { text: '', width: 0, size: 0, bold: false, italic: false, underline: false, color: defaultColor };
        };
        for (const run of para.runs) {
          const size = (run.size ?? defaultSize) * scale;
          if (run.text === '\n') {
            flush();
            continue;
          }
          for (const word of run.text.split(/(\s+)/)) {
            if (!word) continue;
            const w = fonts.measure(word, size, run.bold);
            if (cur.width + w > innerW - indent && cur.text.trim()) flush();
            if (!cur.text && /^\s+$/.test(word)) continue;
            // One style per line keeps the layout simple: the first run's style is used for the line.
            if (!cur.text) cur = { ...cur, size, bold: run.bold, italic: run.italic, underline: run.underline, color: run.color ?? defaultColor };
            cur.text += word;
            cur.width += w;
          }
        }
        flush();
        height += defaultSize * scale * 0.25;
      }
      return { lines, height };
    };
    let scale = 1;
    let out = layout(scale);
    while (out.height > innerH && scale > 0.5) {
      scale -= 0.05;
      out = layout(scale);
    }
    let top = box.y + insets[1];
    if (anchor === 'ctr') top = box.y + insets[1] + Math.max(0, (innerH - out.height) / 2);
    else if (anchor === 'b') top = box.y + box.h - insets[3] - out.height;
    let cursor = top;
    for (const line of out.lines) {
      const baseline = slideH - (cursor + line.size * 1.0);
      const textW = fonts.measure(line.text.trimEnd(), line.size, line.bold);
      let x = box.x + insets[0] + line.indent;
      if (line.align === 'ctr') x = box.x + insets[0] + (innerW - textW) / 2;
      else if (line.align === 'r') x = box.x + insets[0] + innerW - textW;
      if (line.bullet && line.first) fonts.draw(page, '•', x - 11, baseline, { size: line.size, color: line.color });
      const drawn = fonts.draw(page, line.text.trimEnd(), x, baseline, { size: line.size, bold: line.bold, italic: line.italic, color: line.color });
      if (line.underline) page.drawLine({ start: { x, y: baseline - 1.5 }, end: { x: x + drawn, y: baseline - 1.5 }, thickness: 0.7, color: line.color });
      cursor += line.size * 1.2;
    }
  };

  for (const slide of slideData) {
    const page = doc.addPage([slideW, slideH]);
    if (slide.bg) page.drawRectangle({ x: 0, y: 0, width: slideW, height: slideH, color: slide.bg });
    for (const sh of slide.shapes) {
      const { box } = sh;
      const y = slideH - box.y - box.h;
      if (sh.kind === 'rect' && sh.fill) {
        if (sh.ellipse) page.drawEllipse({ x: box.x + box.w / 2, y: y + box.h / 2, xScale: box.w / 2, yScale: box.h / 2, color: sh.fill });
        else page.drawRectangle({ x: box.x, y, width: box.w, height: box.h, color: sh.fill });
      } else if (sh.kind === 'pic' && sh.image) {
        let img = images.get(sh.image.bytes);
        if (img === undefined) {
          try {
            img = sh.image.kind === 'png' ? await doc.embedPng(sh.image.bytes) : await doc.embedJpg(sh.image.bytes);
          } catch {
            img = null;
          }
          images.set(sh.image.bytes, img);
        }
        if (img) page.drawImage(img, { x: box.x, y, width: box.w, height: box.h });
        else skippedImages++;
      } else if (sh.kind === 'text' && sh.paras && sh.insets) {
        drawParas(page, sh.paras, box, sh.anchor ?? 't', sh.insets, sh.placeholder === 'title' || sh.placeholder === 'ctrTitle' ? 32 : 18, rgb(0.1, 0.1, 0.12));
      } else if (sh.kind === 'table' && sh.rows && sh.colWidths) {
        let top = box.y;
        for (const row of sh.rows) {
          let x = box.x;
          sh.colWidths.forEach((cw, c) => {
            page.drawRectangle({ x, y: slideH - top - row.h, width: cw, height: row.h, borderColor: rgb(0.6, 0.62, 0.66), borderWidth: 0.6 });
            const paras = row.cells[c]?.filter((p) => p.runs.length);
            if (paras?.length) drawParas(page, paras, { x, y: top, w: cw, h: row.h }, 'ctr', [4, 2, 4, 2], 12, rgb(0.1, 0.1, 0.12));
            x += cw;
          });
          top += row.h;
        }
      }
    }
  }

  doc.setProducer('Kitwell');
  doc.setCreator('Kitwell');
  return { bytes: await doc.save(), slides: slideData.length, unsupportedElements, skippedImages, unsupported: [...fonts.unsupported] };
}
