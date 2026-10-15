/**
 * Repair PDF: rebuilds a damaged PDF's structure.
 *
 * What it can fix: a missing, truncated or wrong cross-reference table or trailer, a wrong `startxref` offset,
 * junk before the `%PDF-` header or after the last `%%EOF`, and a damaged page tree (the surviving pages are
 * collected into a new one). What it cannot do: bring back content that is no longer in the file (a file cut off
 * in the middle loses what came after the cut), decrypt files, or repair damage inside compressed object streams.
 * The output is only produced when the repaired file can be opened again and has at least one readable page.
 */
import { PDFDocument, PDFName, PDFArray, PDFRef, PDFDict } from '@cantoo/pdf-lib';
import { tr } from '@/i18n/translate';

export class RepairError extends Error {}

export interface RepairResult {
  bytes: Uint8Array;
  pages: number;
  /** "clean" when the file opened without problems, "repaired" when its structure had to be rebuilt. */
  status: 'clean' | 'repaired';
  actions: string[];
  /** Pages that were in the file but could not be kept because their data is damaged or missing. */
  droppedPages: number;
}

/** Optional independent check of the result (the browser uses PDF.js). Returns how many pages could be read. */
export type PageVerifier = (bytes: Uint8Array) => Promise<number>;

const latin1 = (bytes: Uint8Array) => new TextDecoder('latin1').decode(bytes);

function findHeader(bytes: Uint8Array): number {
  const head = latin1(bytes.subarray(0, Math.min(bytes.length, 2048)));
  return head.indexOf('%PDF-');
}

interface ObjEntry {
  num: number;
  gen: number;
  offset: number;
  end: number;
}

/** Finds every "N G obj" in the file; for numbers that appear more than once the last one wins (newest revision). */
function scanObjects(text: string): Map<number, ObjEntry> {
  const found = new Map<number, ObjEntry>();
  const re = /(?:^|[\s>\]])(\d{1,9})\s+(\d{1,5})\s+obj(?![a-z])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const offset = m.index + m[0].search(/\d/);
    // Only objects that are finished (endobj found before the next object starts) are usable.
    const next = text.indexOf('endobj', offset);
    if (next < 0) continue;
    found.set(Number(m[1]), { num: Number(m[1]), gen: Number(m[2]), offset, end: next + 6 });
  }
  return found;
}

function findRoot(text: string, objects: Map<number, ObjEntry>): number | null {
  // Prefer the catalog the trailers point to, then any catalog object.
  const trailers = [...text.matchAll(/\/Root\s+(\d+)\s+(\d+)\s+R/g)].map((m) => Number(m[1])).reverse();
  for (const n of trailers) {
    const o = objects.get(n);
    if (o && /\/Type\s*\/Catalog\b/.test(text.slice(o.offset, o.end))) return n;
  }
  let last: number | null = null;
  for (const o of objects.values()) if (/\/Type\s*\/Catalog\b/.test(text.slice(o.offset, Math.min(o.end, o.offset + 4000)))) last = o.num;
  return last;
}

export interface Rebuilt {
  bytes: Uint8Array;
  objects: number;
  root: number | null;
  pageObjects: number;
}

/**
 * Appends a freshly built cross-reference table and trailer. When `rebuildPages` is set, a new catalog and page
 * tree listing every surviving page object are added as well.
 */
export function rebuildXref(input: Uint8Array, rebuildPages: boolean): Rebuilt {
  const start = findHeader(input);
  if (start < 0) throw new RepairError(tr('err.repair.notPdf'));
  let bytes = input.subarray(start);
  let text = latin1(bytes);
  // A file that was cut off ends in the middle of an object: drop that unfinished tail so that it cannot be mistaken for data.
  const lastEnd = text.lastIndexOf('endobj');
  if (lastEnd >= 0 && !text.slice(lastEnd).includes('%%EOF')) {
    bytes = bytes.subarray(0, lastEnd + 6);
    text = text.slice(0, lastEnd + 6);
  }
  const objects = scanObjects(text);
  if (objects.size === 0) throw new RepairError(tr('err.repair.noObjects'));

  let root = findRoot(text, objects);
  const pageNums: number[] = [];
  for (const o of [...objects.values()].sort((a, b) => a.offset - b.offset)) {
    const body = text.slice(o.offset, Math.min(o.end, o.offset + 20000));
    if (/\/Type\s*\/Page(?![a-zA-Z])/.test(body)) pageNums.push(o.num);
  }
  let extra = '';
  // New object numbers must be above every number the file mentions, including references to lost objects.
  let maxNum = Math.max(...objects.keys());
  for (const m of text.matchAll(/(?:^|[\s[])(\d{1,9})\s+\d{1,5}\s+R\b/g)) maxNum = Math.max(maxNum, Math.min(Number(m[1]), 1_000_000));
  // Everything appended starts after the original bytes and one newline.
  const appendStart = bytes.length + 1;
  const entries = new Map<number, number>();
  for (const o of objects.values()) entries.set(o.num, o.offset);
  if (rebuildPages || root === null) {
    if (pageNums.length === 0) throw new RepairError(tr('err.repair.noPages'));
    const catNum = ++maxNum;
    const pagesNum = ++maxNum;
    const cat = `${catNum} 0 obj\n<< /Type /Catalog /Pages ${pagesNum} 0 R >>\nendobj\n`;
    const pages = `${pagesNum} 0 obj\n<< /Type /Pages /Count ${pageNums.length} /Kids [${pageNums.map((n) => `${n} 0 R`).join(' ')}] >>\nendobj\n`;
    entries.set(catNum, appendStart);
    entries.set(pagesNum, appendStart + cat.length);
    extra = cat + pages;
    root = catNum;
  }
  const xrefOffset = appendStart + extra.length;
  let table = `xref\n0 ${maxNum + 1}\n0000000000 65535 f \n`;
  for (let n = 1; n <= maxNum; n++) {
    const off = entries.get(n);
    const gen = objects.get(n)?.gen ?? 0;
    table += off === undefined ? '0000000000 65535 f \n' : `${String(off).padStart(10, '0')} ${String(gen).padStart(5, '0')} n \n`;
  }
  const info = [...text.matchAll(/\/Info\s+(\d+)\s+(\d+)\s+R/g)].map((m) => Number(m[1])).filter((n) => objects.has(n)).pop();
  const trailer = `trailer\n<< /Size ${maxNum + 1} /Root ${root} 0 R${info ? ` /Info ${info} 0 R` : ''} >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  const out = new TextEncoder().encode('\n' + extra + table + trailer);
  const joined = new Uint8Array(bytes.length + out.length);
  joined.set(bytes, 0);
  joined.set(out, bytes.length);
  return { bytes: joined, objects: objects.size, root, pageObjects: pageNums.length };
}

/** Opens the bytes with pdf-lib, drops pages that cannot be read, and writes a clean copy. */
async function openAndClean(bytes: Uint8Array): Promise<{ bytes: Uint8Array; pages: number; dropped: number }> {
  const doc = await PDFDocument.load(bytes, { throwOnInvalidObject: false, updateMetadata: false });
  let dropped = 0;
  for (let i = doc.getPageCount() - 1; i >= 0; i--) {
    try {
      const page = doc.getPage(i);
      // Pages that lost their inherited size get a standard one so that they stay usable.
      if (!hasMediaBox(page.node)) page.setMediaBox(0, 0, 612, 792);
      page.getSize();
      page.node.Contents();
    } catch {
      doc.removePage(i);
      dropped++;
    }
  }
  if (doc.getPageCount() === 0) throw new RepairError(tr('err.repair.noReadable'));
  const out = await doc.save({ useObjectStreams: false });
  return { bytes: out, pages: doc.getPageCount(), dropped };
}

function hasMediaBox(node: PDFDict): boolean {
  let cur: PDFDict | undefined = node;
  for (let depth = 0; cur && depth < 12; depth++) {
    const box = cur.get(PDFName.of('MediaBox'));
    if (box instanceof PDFArray && box.size() === 4) return true;
    const parent = cur.get(PDFName.of('Parent'));
    cur = parent instanceof PDFRef ? (cur.context.lookup(parent) instanceof PDFDict ? (cur.context.lookup(parent) as PDFDict) : undefined) : parent instanceof PDFDict ? parent : undefined;
  }
  return false;
}

/** Problems in the file's overall structure (not its page content). An empty list means the structure looks sound. */
export function structureProblems(input: Uint8Array): string[] {
  const start = findHeader(input);
  const problems: string[] = [];
  if (start > 0) problems.push(tr('repair.problem.junk'));
  const tail = latin1(input.subarray(Math.max(0, input.length - 2048)));
  if (!tail.includes('%%EOF')) problems.push(tr('repair.problem.noEof'));
  const sx = tail.lastIndexOf('startxref');
  if (sx < 0) problems.push(tr('repair.problem.noStartxref'));
  else {
    const offset = Number(/startxref\s+(\d+)/.exec(tail.slice(sx))?.[1] ?? NaN);
    const there = Number.isFinite(offset) ? latin1(input.subarray(start + offset, start + offset + 32)) : '';
    // A table starts with "xref"; a cross-reference stream starts with an object header.
    if (!/^\s*(xref|\d+\s+\d+\s+obj)/.test(there)) problems.push(tr('repair.problem.badXref'));
  }
  return problems;
}

export async function repairPdf(input: Uint8Array, verify?: PageVerifier): Promise<RepairResult> {
  const start = findHeader(input);
  if (start < 0) throw new RepairError(tr('err.repair.notPdf'));
  const whole = latin1(input);
  if (/\/Encrypt\s*\d+\s+\d+\s+R/.test(whole) || /\/Encrypt\s*<</.test(whole)) {
    throw new RepairError(tr('err.repair.encrypted'));
  }

  const finish = async (res: { bytes: Uint8Array; pages: number; dropped: number }, status: RepairResult['status'], actions: string[]): Promise<RepairResult> => {
    // The repaired file must open again and show its pages.
    const check = await PDFDocument.load(res.bytes, { updateMetadata: false });
    if (check.getPageCount() !== res.pages || res.pages === 0) throw new RepairError(tr('err.repair.unverified'));
    if (verify && (await verify(res.bytes)) === 0) throw new RepairError(tr('err.repair.cannotDisplay'));
    return { bytes: res.bytes, pages: res.pages, status, actions, droppedPages: res.dropped };
  };

  const problems = structureProblems(input);
  if (problems.length === 0) {
    try {
      return await finish(await openAndClean(input), 'clean', [tr('repair.action.clean')]);
    } catch {
      /* the structure looked fine but the file does not open: rebuild */
    }
  }

  const attempts: [string, () => Rebuilt][] = [
    ['repair.action.rebuilt', () => rebuildXref(input, false)],
    ['repair.action.rebuiltPages', () => rebuildXref(input, true)],
  ];
  let lastError: unknown;
  for (const [what, build] of attempts) {
    try {
      const rebuilt = build();
      const res = await openAndClean(rebuilt.bytes);
      const actions = [...problems, tr(what, { objects: rebuilt.objects })];
      if (res.dropped) actions.push(tr('repair.action.dropped', { number: res.dropped }));
      return await finish(res, 'repaired', actions);
    } catch (err) {
      lastError = err;
    }
  }
  // Last resort: the PDF library's own recovery (it also reads files that use compressed object streams).
  try {
    const res = await openAndClean(input.subarray(start));
    return await finish(res, 'repaired', [...problems, tr('repair.action.library')]);
  } catch (err) {
    lastError = lastError ?? err;
  }
  if (lastError instanceof RepairError) throw lastError;
  throw new RepairError(tr('err.repair.tooDamaged'));
}
