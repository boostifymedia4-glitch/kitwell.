/**
 * Reads an .xlsx workbook into tables for the PDF layout engine (src/lib/docPdf.ts).
 *
 * Every visible sheet becomes a heading and a table of its cell values as Excel last calculated and saved them
 * (formulas are not recalculated). Numbers, dates, percentages and text are formatted; charts, images, merged
 * cells, cell colours, column widths, print areas and page breaks are not reproduced. Old binary .xls files cannot
 * be read.
 */
import type { Block, Cell } from './docPdf';
import { OfficeError, attr, childElements, descendants, firstChild, openOffice, readRels, resolvePath, textOf, xmlPart } from './officeZip';
import { tr } from '@/i18n/translate';

export const MAX_ROWS_PER_SHEET = 5000;
export const MAX_COLUMNS = 60;

export interface XlsxRead {
  title: string;
  blocks: Block[];
  sheets: number;
  hiddenSheets: number;
  rows: number;
  /** Sheets cut at the row or column limit. */
  cutSheets: number;
  /** Formula cells that carry no saved result (open and save the file in Excel to calculate them). */
  uncalculated: number;
  landscape: boolean;
}

const BUILTIN_DATE_IDS = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 45, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58]);
const BUILTIN: Record<number, string> = { 1: '0', 2: '0.00', 3: '#,##0', 4: '#,##0.00', 9: '0%', 10: '0.00%' };

const isDateFormat = (code: string) => /[dmyhs]/i.test(code.replace(/"[^"]*"|\[[^\]]*\]|\\./g, '')) && !/^general$/i.test(code);

/** Excel serial date -> "YYYY-MM-DD" (plus the time when the format has one). */
export function excelDate(serial: number, withTime: boolean): string {
  const ms = Math.round((serial - 25569) * 86400000);
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return String(serial);
  const iso = d.toISOString();
  return withTime || serial % 1 !== 0 ? `${iso.slice(0, 10)} ${iso.slice(11, 16)}`.replace(/ 00:00$/, '') : iso.slice(0, 10);
}

export function formatNumber(value: number, code: string | undefined): string {
  if (!code || /^general$/i.test(code)) {
    if (Number.isInteger(value)) return String(value);
    return String(Number(value.toPrecision(12)));
  }
  const clean = code.split(';')[0].replace(/"[^"]*"|\[[^\]]*\]|\\./g, '');
  const percent = clean.includes('%');
  const decimals = (/\.([0#]+)/.exec(clean)?.[1] ?? '').length;
  const v = percent ? value * 100 : value;
  const fixed = v.toFixed(decimals);
  const out = clean.includes(',') ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : fixed;
  const prefix = /^[^0#.,]*/.exec(code.replace(/"/g, ''))?.[0].replace(/\[[^\]]*\]/g, '').replace(/[_*].?/g, '').trim() ?? '';
  return `${/^[$€£¥]/.test(prefix) ? prefix : ''}${out}${percent ? '%' : ''}`;
}

const colIndex = (ref: string) => {
  const letters = /^[A-Z]+/i.exec(ref)?.[0].toUpperCase() ?? 'A';
  let n = 0;
  for (const ch of letters) n = n * 26 + ch.charCodeAt(0) - 64;
  return n - 1;
};

export function readXlsx(bytes: Uint8Array): XlsxRead {
  const zip = openOffice(bytes, 'Excel (.xls)');
  const wbXml = xmlPart(zip, 'xl/workbook.xml');
  if (!wbXml) throw new OfficeError(tr('err.office.notExcel'));
  const rels = readRels(zip, 'xl/_rels/workbook.xml.rels');

  const shared: string[] = [];
  const ssXml = xmlPart(zip, 'xl/sharedStrings.xml');
  if (ssXml) for (const si of childElements(ssXml.documentElement, 'si')) shared.push(descendants(si, 't').map(textOf).join(''));

  // Number formats per cell style index.
  const customFormats = new Map<number, string>();
  const xfFormat: number[] = [];
  const stylesXml = xmlPart(zip, 'xl/styles.xml');
  if (stylesXml) {
    for (const nf of descendants(stylesXml, 'numFmt')) customFormats.set(Number(attr(nf, 'numFmtId')), attr(nf, 'formatCode') ?? '');
    const xfs = descendants(stylesXml, 'cellXfs')[0];
    for (const xf of childElements(xfs, 'xf')) xfFormat.push(Number(attr(xf, 'numFmtId') ?? 0));
  }
  const formatFor = (styleIdx: number): { code: string | undefined; date: boolean; time: boolean } => {
    const id = xfFormat[styleIdx] ?? 0;
    const code = customFormats.get(id) ?? BUILTIN[id];
    const date = customFormats.has(id) ? isDateFormat(customFormats.get(id) as string) : BUILTIN_DATE_IDS.has(id);
    const time = customFormats.has(id) ? /h|s/i.test((customFormats.get(id) as string).replace(/"[^"]*"|\[[^\]]*\]/g, '')) : [18, 19, 20, 21, 22, 46, 47].includes(id);
    return { code, date, time };
  };

  const read: XlsxRead = { title: '', blocks: [], sheets: 0, hiddenSheets: 0, rows: 0, cutSheets: 0, uncalculated: 0, landscape: false };
  let widest = 0;

  for (const sheet of descendants(wbXml, 'sheet')) {
    const name = attr(sheet, 'name') ?? `Sheet ${read.sheets + 1}`;
    if (attr(sheet, 'state') === 'hidden' || attr(sheet, 'state') === 'veryHidden') {
      read.hiddenSheets++;
      continue;
    }
    const rel = rels.get(attr(sheet, 'id') ?? '');
    const path = rel ? resolvePath('xl', rel.target) : '';
    const wsXml = path ? xmlPart(zip, path) : null;
    if (!wsXml) continue;
    read.sheets++;

    const grid: string[][] = [];
    const numeric: boolean[][] = [];
    let maxCol = 0;
    let cut = false;
    for (const row of descendants(wsXml, 'row')) {
      const r = Number(attr(row, 'r') ?? grid.length + 1) - 1;
      if (r >= MAX_ROWS_PER_SHEET) {
        cut = true;
        break;
      }
      for (const c of childElements(row, 'c')) {
        const ref = attr(c, 'r') ?? '';
        const col = ref ? colIndex(ref) : 0;
        if (col >= MAX_COLUMNS) {
          cut = true;
          continue;
        }
        const type = attr(c, 't');
        const v = textOf(firstChild(c, 'v'));
        const hasFormula = Boolean(firstChild(c, 'f'));
        let text = '';
        let isNum = false;
        if (type === 's') text = shared[Number(v)] ?? '';
        else if (type === 'inlineStr') text = descendants(c, 't').map(textOf).join('');
        else if (type === 'str') text = v;
        else if (type === 'b') text = v === '1' ? 'TRUE' : 'FALSE';
        else if (type === 'e') text = v;
        else if (v !== '') {
          const num = Number(v);
          if (Number.isFinite(num)) {
            const f = formatFor(Number(attr(c, 's') ?? 0));
            text = f.date ? excelDate(num, f.time) : formatNumber(num, f.code);
            isNum = true;
          } else text = v;
        } else if (hasFormula) read.uncalculated++;
        if (text === '' && !isNum) continue;
        (grid[r] ??= [])[col] = text;
        (numeric[r] ??= [])[col] = isNum;
        maxCol = Math.max(maxCol, col + 1);
      }
    }
    if (cut) read.cutSheets++;
    const rowsOut: Cell[][] = [];
    for (let r = 0; r < grid.length; r++) {
      const cells = grid[r];
      if (!cells || cells.every((x) => x === undefined || x === '')) continue;
      const firstRow = rowsOut.length === 0;
      rowsOut.push(Array.from({ length: maxCol }, (_, c) => ({ runs: [{ text: cells[c] ?? '' }], align: numeric[r]?.[c] ? ('right' as const) : undefined, header: firstRow && grid.length > 1 && !numeric[r]?.some(Boolean) })));
    }
    read.blocks.push({ type: 'heading', level: 2, runs: [{ text: name }] });
    if (rowsOut.length) {
      read.blocks.push({ type: 'table', rows: rowsOut });
      read.rows += rowsOut.length;
      widest = Math.max(widest, maxCol);
    } else read.blocks.push({ type: 'paragraph', runs: [{ text: '(This sheet has no data.)', italic: true }] });
  }
  read.landscape = widest > 6;
  const core = xmlPart(zip, 'docProps/core.xml');
  read.title = core ? textOf(descendants(core, 'title')[0]).trim() : '';
  return read;
}
