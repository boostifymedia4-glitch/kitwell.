/**
 * PDF to PDF/A preparation (profiles 1b, 2b, 2u, 3b, 3u), entirely in the browser.
 *
 * Two modes:
 *  - "keep": fixes what can be fixed without touching page content (adds the PDF/A identification and XMP metadata, the
 *    sRGB output intent and a file ID; removes JavaScript, forbidden actions, attachments and annotation flags that PDF/A
 *    forbids). If the file has problems that cannot be fixed this way (fonts that are not embedded, CMYK colour, LZW),
 *    it refuses and says which ones: it never produces a file that only pretends to be PDF/A.
 *  - "flatten": renders every page as a picture and builds a new, image-only PDF with the same PDF/A structure. That
 *    always satisfies the rules the tool applies, at the price of selectable text.
 *
 * Kitwell has no full PDF/A validator. The result is checked by `checkPdfA`, which covers exactly the rules above.
 */
import {
  PDFArray,
  PDFBool,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFNumber,
  PDFRawStream,
  PDFRef,
  PDFStream,
  PDFString,
  decodePDFRawStream,
  type PDFObject,
} from '@cantoo/pdf-lib';
import { srgbIccProfile, SRGB_PROFILE_NAME } from './iccProfile';
import { PdfError } from './pdfOps';
import { site } from '@/config/site';
import { tr } from '@/i18n/translate';

export const MAX_FLATTEN_PAGES = 200;

/**
 * The profiles this tool produces. Each one was validated with veraPDF (see tests/pdfA.test.ts and the QA notes); A-level
 * profiles (1a, 2a, 3a) need tagged structure and PDF/A-4e/4f need 3D or attachments, so they are not offered.
 */
export type PdfAProfile = '1b' | '2b' | '2u' | '3b' | '3u' | '4';
export const PDFA_PROFILES: PdfAProfile[] = ['1b', '2b', '2u', '3b', '3u', '4'];
export const DEFAULT_PROFILE: PdfAProfile = '2b';
const PROFILE_INFO: Record<PdfAProfile, { part: number; conformance: 'B' | 'U' | null }> = {
  '1b': { part: 1, conformance: 'B' },
  '2b': { part: 2, conformance: 'B' },
  '2u': { part: 2, conformance: 'U' },
  '3b': { part: 3, conformance: 'B' },
  '3u': { part: 3, conformance: 'U' },
  '4': { part: 4, conformance: null },
};
export const pdfaLabel = (profile: PdfAProfile) => `PDF/A-${profile}`;

export interface PdfAIssue {
  /** Translation key under `pdfa.fix.*` or `pdfa.block.*`. */
  key: string;
  params?: Record<string, string | number>;
}

export interface PdfAAnalysis {
  pages: number;
  /** Problems that cannot be fixed without changing page content. */
  blockers: PdfAIssue[];
}

export interface PdfAResult {
  bytes: Uint8Array;
  pages: number;
  /** Human-readable list of what was done. */
  actions: string[];
  mode: 'keep' | 'flatten';
}

const name = (s: string) => PDFName.of(s);
const FORBIDDEN_ACTIONS = new Set(['Launch', 'Sound', 'Movie', 'ResetForm', 'ImportData', 'Hide', 'SetOCGState', 'Rendition', 'Trans', 'GoTo3DView', 'JavaScript']);
const ALLOWED_NAMED = new Set(['NextPage', 'PrevPage', 'FirstPage', 'LastPage']);
const REMOVED_ANNOTS = new Set(['FileAttachment', 'Sound', 'Movie', 'Screen', '3D', 'RichMedia']);
const STANDARD_INFO_KEYS = new Set(['Title', 'Author', 'Subject', 'Keywords', 'Creator', 'Producer', 'CreationDate', 'ModDate', 'Trapped']);

const dictOf = (obj: PDFObject | undefined): PDFDict | undefined => {
  if (obj instanceof PDFDict) return obj;
  if (obj instanceof PDFStream) return obj.dict;
  return undefined;
};

function nameValue(obj: PDFObject | undefined): string | undefined {
  return obj instanceof PDFName ? obj.decodeText() : undefined;
}

function resolve(doc: PDFDocument, obj: PDFObject | undefined): PDFObject | undefined {
  return obj instanceof PDFRef ? doc.context.lookup(obj) : obj;
}

function filtersOf(doc: PDFDocument, dict: PDFDict): string[] {
  const f = resolve(doc, dict.get(name('Filter')));
  if (f instanceof PDFName) return [f.decodeText()];
  if (f instanceof PDFArray) return f.asArray().map((x) => nameValue(resolve(doc, x)) ?? '');
  return [];
}

/** True when the dictionary describes a font that is not embedded (Type 3 fonts carry their own glyphs). */
function unembeddedFontName(doc: PDFDocument, font: PDFDict): string | null {
  const subtype = nameValue(font.get(name('Subtype')));
  if (!subtype || subtype === 'Type3') return null;
  let target = font;
  if (subtype === 'Type0') {
    const desc = resolve(doc, font.get(name('DescendantFonts')));
    const first = desc instanceof PDFArray ? resolve(doc, desc.get(0)) : undefined;
    if (!(first instanceof PDFDict)) return null;
    target = first;
  }
  const descriptor = resolve(doc, target.get(name('FontDescriptor')));
  const base = nameValue(font.get(name('BaseFont'))) ?? 'unknown';
  if (!(descriptor instanceof PDFDict)) return base;
  const embedded = ['FontFile', 'FontFile2', 'FontFile3'].some((k) => descriptor.has(name(k)));
  return embedded ? null : base;
}

function usesCmykOperator(doc: PDFDocument): boolean {
  for (const page of doc.getPages()) {
    const contents = resolve(doc, page.node.get(name('Contents')));
    const streams: PDFObject[] = contents instanceof PDFArray ? contents.asArray().map((x) => resolve(doc, x)!).filter(Boolean) : contents ? [contents] : [];
    for (const s of streams) {
      if (!(s instanceof PDFRawStream)) continue;
      let text: string;
      try {
        text = new TextDecoder('latin1').decode(decodePDFRawStream(s).decode());
      } catch {
        continue;
      }
      if (/(?:^|\s)-?[\d.]+\s+-?[\d.]+\s+-?[\d.]+\s+-?[\d.]+\s+[kK](?=\s|$)/.test(text)) return true;
    }
  }
  return false;
}

/** Dictionary entries that mean transparency: constant alpha below 1, a blend mode, a transparency group or a soft mask. */
const TRANSPARENCY = [/\/(?:CA|ca)\s+(?!1(?:\.0*)?(?![\d.]))[\d.]+/, /\/BM\s*\/(?!Normal\b|Compatible\b)/, /\/S\s*\/Transparency/, /\/SMask\s*(?:\d+\s+\d+\s+R|<<)/];

/** Finds the problems that make a PDF/A conversion that keeps the page content impossible. */
export function analyzeForPdfA(doc: PDFDocument, profile: PdfAProfile = DEFAULT_PROFILE): PdfAAnalysis {
  const { part, conformance } = PROFILE_INFO[profile];
  const fonts = new Set<string>();
  const noUnicode = new Set<string>();
  let transparency = false;
  let jpx = false;
  let cmyk = false;
  let lzw = false;
  let noAppearance = 0;
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    const d = dictOf(obj);
    if (!d) continue;
    if (nameValue(d.get(name('Type'))) === 'Font') {
      const bad = unembeddedFontName(doc, d);
      if (bad) fonts.add(bad.replace(/^[A-Z]{6}\+/, ''));
      const fontKind = nameValue(d.get(name('Subtype')));
      if ((conformance === 'U' || part === 4) && fontKind !== 'CIDFontType0' && fontKind !== 'CIDFontType2' && !d.has(name('ToUnicode'))) noUnicode.add((nameValue(d.get(name('BaseFont'))) ?? 'unknown').replace(/^[A-Z]{6}\+/, ''));
    }
    if (part === 1) {
      // Direct (inline) dictionaries are part of their parent's text, so the check reads the dictionary as text.
      const text = d.toString();
      if (TRANSPARENCY.some((re) => re.test(text))) transparency = true;
      if (obj instanceof PDFStream && filtersOf(doc, d).includes('JPXDecode')) jpx = true;
    }
    if (obj instanceof PDFStream && filtersOf(doc, d).some((f) => f === 'LZWDecode' || f === 'Crypt')) lzw = true;
    if (!cmyk && d.toString().includes('/DeviceCMYK')) cmyk = true;
    const subtype = nameValue(d.get(name('Subtype')));
    if (d.has(name('Rect')) && subtype && !['Link', 'Popup', ...REMOVED_ANNOTS].includes(subtype) && !d.has(name('AP'))) noAppearance++;
  }
  if (!cmyk) cmyk = usesCmykOperator(doc);
  const blockers: PdfAIssue[] = [];
  if (fonts.size) blockers.push({ key: 'pdfa.block.fonts', params: { names: [...fonts].slice(0, 6).join(', ') + (fonts.size > 6 ? '…' : '') } });
  if (cmyk) blockers.push({ key: 'pdfa.block.cmyk' });
  if (lzw) blockers.push({ key: 'pdfa.block.lzw' });
  if (noAppearance) blockers.push({ key: 'pdfa.block.noAppearance', params: { number: noAppearance } });
  if (noUnicode.size) blockers.push({ key: 'pdfa.block.noUnicode', params: { names: [...noUnicode].slice(0, 6).join(', ') + (noUnicode.size > 6 ? '…' : '') } });
  if (transparency) blockers.push({ key: 'pdfa.block.transparency' });
  if (jpx) blockers.push({ key: 'pdfa.block.jpx' });
  if (part === 1 && doc.catalog.has(name('OCProperties'))) blockers.push({ key: 'pdfa.block.layers' });
  return { pages: doc.getPageCount(), blockers };
}

// ---------- metadata ----------

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const BOM = String.fromCharCode(0xfeff);
const iso = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export interface DocInfo {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  created: Date;
  modified: Date;
}

export function buildXmp(info: DocInfo, profile: PdfAProfile = DEFAULT_PROFILE): string {
  const { part, conformance } = PROFILE_INFO[profile];
  const lines: string[] = [];
  const desc = (ns: string, uri: string, body: string) => lines.push(`  <rdf:Description rdf:about="" xmlns:${ns}="${uri}">${body}</rdf:Description>`);
  desc('pdfaid', 'http://www.aiim.org/pdfa/ns/id/', conformance ? `<pdfaid:part>${part}</pdfaid:part><pdfaid:conformance>${conformance}</pdfaid:conformance>` : `<pdfaid:part>${part}</pdfaid:part><pdfaid:rev>2020</pdfaid:rev>`);
  let dc = '';
  if (info.title) dc += `<dc:title><rdf:Alt><rdf:li xml:lang="x-default">${esc(info.title)}</rdf:li></rdf:Alt></dc:title>`;
  if (info.author) dc += `<dc:creator><rdf:Seq><rdf:li>${esc(info.author)}</rdf:li></rdf:Seq></dc:creator>`;
  if (info.subject) dc += `<dc:description><rdf:Alt><rdf:li xml:lang="x-default">${esc(info.subject)}</rdf:li></rdf:Alt></dc:description>`;
  if (dc) desc('dc', 'http://purl.org/dc/elements/1.1/', dc);
  let pdf = `<pdf:Producer>${esc(site.name)}</pdf:Producer>`;
  if (info.keywords) pdf += `<pdf:Keywords>${esc(info.keywords)}</pdf:Keywords>`;
  desc('pdf', 'http://ns.adobe.com/pdf/1.3/', pdf);
  let xmp = '';
  if (info.creator) xmp += `<xmp:CreatorTool>${esc(info.creator)}</xmp:CreatorTool>`;
  xmp += `<xmp:CreateDate>${iso(info.created)}</xmp:CreateDate><xmp:ModifyDate>${iso(info.modified)}</xmp:ModifyDate><xmp:MetadataDate>${iso(info.modified)}</xmp:MetadataDate>`;
  desc('xmp', 'http://ns.adobe.com/xap/1.0/', xmp);
  return `<?xpacket begin="${BOM}" id="W5M0MpCehiHzreSzNTczkc9d"?>\n<x:xmpmeta xmlns:x="adobe:ns:meta/">\n <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n${lines.join('\n')}\n </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end="w"?>`;
}

function readInfo(doc: PDFDocument, fallbackTitle?: string): DocInfo {
  const now = new Date();
  now.setMilliseconds(0);
  const created = doc.getCreationDate() ?? now;
  created.setMilliseconds(0);
  return {
    title: doc.getTitle() || fallbackTitle,
    author: doc.getAuthor() || undefined,
    subject: doc.getSubject() || undefined,
    keywords: doc.getKeywords() || undefined,
    creator: doc.getCreator() || undefined,
    created,
    modified: now,
  };
}

/** Writes the Info dictionary, the XMP packet, the output intent and the file ID that PDF/A requires. */
export function applyPdfAStructure(doc: PDFDocument, fallbackTitle?: string, profile: PdfAProfile = DEFAULT_PROFILE): string[] {
  const actions: string[] = [];
  const info = readInfo(doc, fallbackTitle);
  const infoDict = doc.context.lookup(doc.context.trailerInfo.Info);
  if (infoDict instanceof PDFDict) {
    for (const key of infoDict.keys()) if (!STANDARD_INFO_KEYS.has(key.decodeText())) infoDict.delete(key);
    infoDict.delete(name('Trapped'));
  }
  if (info.title) doc.setTitle(info.title);
  doc.setProducer(site.name);
  doc.setCreationDate(info.created);
  doc.setModificationDate(info.modified);

  const xmp = new TextEncoder().encode(buildXmp(info, profile));
  const metadata = doc.context.stream(xmp, { Type: 'Metadata', Subtype: 'XML' });
  doc.catalog.set(name('Metadata'), doc.context.register(metadata));
  actions.push(tr('pdfa.fix.metadata'));

  const icc = doc.context.stream(srgbIccProfile(), { N: 3, Alternate: 'DeviceRGB' });
  const intent = doc.context.obj({
    Type: 'OutputIntent',
    S: 'GTS_PDFA1',
    OutputConditionIdentifier: PDFString.of(SRGB_PROFILE_NAME),
    Info: PDFString.of(SRGB_PROFILE_NAME),
    DestOutputProfile: doc.context.register(icc),
  });
  doc.catalog.set(name('OutputIntents'), doc.context.obj([doc.context.register(intent)]));
  actions.push(tr('pdfa.fix.intent'));

  const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
  doc.context.trailerInfo.ID = doc.context.obj([PDFHexString.of(id), PDFHexString.of(id)]);
  actions.push(tr('pdfa.fix.id'));
  // PDF/A-4 keeps the descriptive data and the dates in XMP only: the document information dictionary must not be present.
  if (PROFILE_INFO[profile].part === 4) {
    const infoRef = doc.context.trailerInfo.Info;
    if (infoRef instanceof PDFRef) doc.context.delete(infoRef);
    doc.context.trailerInfo.Info = undefined;
  }
  return actions;
}

// ---------- fixes that do not touch page content ----------

function actionIsForbidden(doc: PDFDocument, action: PDFObject | undefined): boolean {
  const d = dictOf(resolve(doc, action));
  if (!d) return false;
  const s = nameValue(d.get(name('S')));
  if (!s) return false;
  if (FORBIDDEN_ACTIONS.has(s)) return true;
  if (s === 'Named') return !ALLOWED_NAMED.has(nameValue(d.get(name('N'))) ?? '');
  return false;
}

/** Removes forbidden actions and JavaScript, attachments, XFA and transfer functions. Returns messages for what was done. */
function removeForbiddenFeatures(doc: PDFDocument): string[] {
  const out: string[] = [];
  let actions = 0;
  let attachments = 0;
  let jsRemoved = false;
  const catalog = doc.catalog;
  if (catalog.has(name('OpenAction')) && actionIsForbidden(doc, catalog.get(name('OpenAction')))) {
    catalog.delete(name('OpenAction'));
    actions++;
  }
  catalog.delete(name('AA'));
  if (catalog.has(name('AF'))) {
    catalog.delete(name('AF'));
    attachments++;
  }
  const names = dictOf(resolve(doc, catalog.get(name('Names'))));
  if (names) {
    if (names.has(name('JavaScript'))) {
      names.delete(name('JavaScript'));
      jsRemoved = true;
    }
    if (names.has(name('EmbeddedFiles'))) {
      names.delete(name('EmbeddedFiles'));
      attachments++;
    }
  }
  const form = dictOf(resolve(doc, catalog.get(name('AcroForm'))));
  let formFixed = false;
  if (form) {
    if (form.has(name('NeedAppearances'))) {
      form.delete(name('NeedAppearances'));
      formFixed = true;
    }
    if (form.has(name('XFA'))) {
      form.delete(name('XFA'));
      formFixed = true;
    }
  }
  const ocProps = dictOf(resolve(doc, catalog.get(name('OCProperties'))));
  if (ocProps) {
    const configs = [resolve(doc, ocProps.get(name('D'))), ...(((resolve(doc, ocProps.get(name('Configs'))) as PDFArray | undefined)?.asArray?.() ?? []).map((c) => resolve(doc, c)))];
    for (const c of configs) dictOf(c)?.delete(name('AS'));
  }
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    const d = dictOf(obj);
    if (!d) continue;
    if (d.has(name('AA'))) {
      d.delete(name('AA'));
      actions++;
    }
    if (d.has(name('A')) && actionIsForbidden(doc, d.get(name('A')))) {
      const s = nameValue(dictOf(resolve(doc, d.get(name('A'))))?.get(name('S')));
      d.delete(name('A'));
      if (s === 'JavaScript') jsRemoved = true;
      else actions++;
    }
    d.delete(name('TR'));
    if (d.has(name('TR2')) && nameValue(d.get(name('TR2'))) !== 'Default') d.delete(name('TR2'));
    d.delete(name('HTP'));
    if (d.has(name('EF')) && nameValue(d.get(name('Type'))) === 'Filespec') attachments++;
  }
  if (jsRemoved) out.push(tr('pdfa.fix.js'));
  if (actions) out.push(tr('pdfa.fix.actions', { number: actions }));
  if (attachments) out.push(tr('pdfa.fix.attachments', { number: attachments }));
  if (formFixed) out.push(tr('pdfa.fix.form'));
  return out;
}

/** Sets the Print flag, clears Hidden, Invisible and NoView, and drops annotation types PDF/A-2 does not allow. */
function fixAnnotations(doc: PDFDocument): string[] {
  let adjusted = 0;
  let removed = 0;
  for (const page of doc.getPages()) {
    const annots = resolve(doc, page.node.get(name('Annots')));
    if (!(annots instanceof PDFArray)) continue;
    const keep: PDFObject[] = [];
    for (const ref of annots.asArray()) {
      const a = dictOf(resolve(doc, ref));
      if (!a) {
        keep.push(ref);
        continue;
      }
      const subtype = nameValue(a.get(name('Subtype'))) ?? '';
      if (REMOVED_ANNOTS.has(subtype)) {
        removed++;
        continue;
      }
      const current = a.get(name('F'));
      const flags = current instanceof PDFNumber ? current.asNumber() : 0;
      const wanted = (flags | 4) & ~(1 | 2 | 32);
      if (subtype !== 'Popup' && (wanted !== flags || !(current instanceof PDFNumber))) {
        a.set(name('F'), PDFNumber.of(wanted));
        adjusted++;
      }
      keep.push(ref);
    }
    if (keep.length !== annots.size()) page.node.set(name('Annots'), doc.context.obj(keep));
  }
  const out: string[] = [];
  if (adjusted || removed) out.push(tr('pdfa.fix.annots', { number: adjusted + removed }));
  return out;
}

/** PDF/A-1 files may not be newer than PDF 1.4 (the content written here needs nothing newer); PDF/A-4 is based on PDF 2.0. */
function finalizeHeader(bytes: Uint8Array, profile: PdfAProfile): Uint8Array {
  const part = PROFILE_INFO[profile].part;
  if (part === 4) return setHeader(bytes, '%PDF-2.0');
  if (part !== 1) return bytes;
  const header = new TextDecoder('latin1').decode(bytes.subarray(0, 8));
  if (header !== '%PDF-1.7' && !/^%PDF-1\.[5-7]$/.test(header)) return bytes;
  return setHeader(bytes, '%PDF-1.4');
}

function setHeader(bytes: Uint8Array, header: string): Uint8Array {
  const out = bytes.slice();
  out.set(new TextEncoder().encode(header), 0);
  return out;
}

export async function convertKeepingContent(input: Uint8Array, fallbackTitle?: string, profile: PdfAProfile = DEFAULT_PROFILE): Promise<{ result: PdfAResult; analysis: PdfAAnalysis }> {
  const doc = await loadForPdfA(input);
  const analysis = analyzeForPdfA(doc, profile);
  if (analysis.blockers.length) throw new PdfABlocked(analysis);
  const actions = [...removeForbiddenFeatures(doc), ...fixAnnotations(doc), ...applyPdfAStructure(doc, fallbackTitle, profile)];
  const bytes = finalizeHeader(await doc.save({ useObjectStreams: false, updateFieldAppearances: false }), profile);
  const problems = await checkPdfA(bytes, profile);
  if (problems.length) throw new PdfError(tr('err.pdfa.selfCheck', { problems: problems.join('; ') }));
  return { result: { bytes, pages: analysis.pages, actions, mode: 'keep' }, analysis };
}

/** Thrown when the file qualifies only if its content changes; carries the list of reasons for the interface. */
export class PdfABlocked extends PdfError {
  constructor(readonly analysis: PdfAAnalysis) {
    super(tr('pdfa.blockedTitle'));
  }
}

async function loadForPdfA(input: Uint8Array): Promise<PDFDocument> {
  try {
    const doc = await PDFDocument.load(input, { updateMetadata: false, throwOnInvalidObject: false });
    if (doc.isEncrypted) throw new PdfError(tr('err.pdfa.encrypted'));
    return doc;
  } catch (err) {
    if (err instanceof PdfError) throw err;
    const message = String((err as Error)?.message ?? err);
    if (/encrypt/i.test(message)) throw new PdfError(tr('err.pdfa.encrypted'));
    throw new PdfError(tr('err.pdf.unreadable'));
  }
}

/** Builds an image-only PDF/A from already rendered pages (JPEG bytes and the page size in points). */
export async function buildFlattenedPdfA(
  pages: { jpeg: Uint8Array; widthPt: number; heightPt: number }[],
  info: Partial<DocInfo> & { fallbackTitle?: string },
  profile: PdfAProfile = DEFAULT_PROFILE,
): Promise<PdfAResult> {
  const out = await PDFDocument.create({ updateMetadata: false });
  for (const p of pages) {
    const image = await out.embedJpg(p.jpeg);
    const page = out.addPage([p.widthPt, p.heightPt]);
    page.drawImage(image, { x: 0, y: 0, width: p.widthPt, height: p.heightPt });
  }
  const now = new Date();
  now.setMilliseconds(0);
  if (info.title) out.setTitle(info.title);
  if (info.author) out.setAuthor(info.author);
  if (info.subject) out.setSubject(info.subject);
  if (info.keywords) out.setKeywords(info.keywords.split(/[,;]\s*/));
  out.setCreationDate(info.created ?? now);
  const actions = applyPdfAStructure(out, info.fallbackTitle, profile);
  const bytes = finalizeHeader(await out.save({ useObjectStreams: false }), profile);
  const problems = await checkPdfA(bytes, profile);
  if (problems.length) throw new PdfError(tr('err.pdfa.selfCheck', { problems: problems.join('; ') }));
  return { bytes, pages: pages.length, actions, mode: 'flatten' };
}

/** Reads the document information of the original so the flattened copy keeps its title, author and dates. */
export async function readOriginalInfo(input: Uint8Array): Promise<Partial<DocInfo>> {
  try {
    const doc = await PDFDocument.load(input, { updateMetadata: false, throwOnInvalidObject: false, ignoreEncryption: true });
    return { title: doc.getTitle() || undefined, author: doc.getAuthor() || undefined, subject: doc.getSubject() || undefined, keywords: doc.getKeywords() || undefined, created: doc.getCreationDate() ?? undefined };
  } catch {
    return {};
  }
}

// ---------- the tool's own check of the result ----------

/**
 * Re-reads a finished file and checks exactly the rules this tool applies. Returns the problems found (empty when all
 * of them hold). This is not a full PDF/A validation.
 */
export async function checkPdfA(bytes: Uint8Array, target: PdfAProfile = DEFAULT_PROFILE): Promise<string[]> {
  const { part, conformance } = PROFILE_INFO[target];
  const problems: string[] = [];
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(bytes, { updateMetadata: false, ignoreEncryption: true });
  } catch {
    return ['the file cannot be read again'];
  }
  if (doc.isEncrypted) problems.push('the file is encrypted');
  const metadata = dictOf(resolve(doc, doc.catalog.get(name('Metadata'))));
  const metaStream = resolve(doc, doc.catalog.get(name('Metadata')));
  if (!(metaStream instanceof PDFRawStream) || !metadata) problems.push('XMP metadata is missing');
  else {
    if (metadata.has(name('Filter'))) problems.push('XMP metadata is compressed');
    const xmp = new TextDecoder().decode(decodePDFRawStream(metaStream).decode());
    if (!xmp.includes(`<pdfaid:part>${part}</pdfaid:part>`) || !xmp.includes(conformance ? `<pdfaid:conformance>${conformance}</pdfaid:conformance>` : '<pdfaid:rev>2020</pdfaid:rev>')) problems.push('the PDF/A identification is missing');
    if (part === 4 && new TextDecoder('latin1').decode(bytes.subarray(0, 8)) !== '%PDF-2.0') problems.push('the PDF version is not 2.0');
    if (part === 1 && new TextDecoder('latin1').decode(bytes.subarray(0, 8)) !== '%PDF-1.4') problems.push('the PDF version is newer than 1.4');
    const created = doc.getCreationDate();
    if (created && !xmp.includes(`<xmp:CreateDate>${iso(created)}</xmp:CreateDate>`)) problems.push('the creation date differs between Info and XMP');
    const modified = doc.getModificationDate();
    if (modified && !xmp.includes(`<xmp:ModifyDate>${iso(modified)}</xmp:ModifyDate>`)) problems.push('the modification date differs between Info and XMP');
    const title = doc.getTitle();
    if (title && !xmp.includes(esc(title))) problems.push('the title differs between Info and XMP');
  }
  const intents = resolve(doc, doc.catalog.get(name('OutputIntents')));
  const intent = intents instanceof PDFArray ? dictOf(resolve(doc, intents.get(0))) : undefined;
  const profile = intent ? resolve(doc, intent.get(name('DestOutputProfile'))) : undefined;
  if (!intent || nameValue(intent.get(name('S'))) !== 'GTS_PDFA1' || !(profile instanceof PDFRawStream)) problems.push('the output intent is missing');
  else if (!(profile.dict.get(name('N')) instanceof PDFNumber)) problems.push('the colour profile has no component count');
  if (!doc.context.trailerInfo.ID) problems.push('the file identifier is missing');
  if (doc.catalog.has(name('AA'))) problems.push('the document has additional actions');
  const catalogNames = dictOf(resolve(doc, doc.catalog.get(name('Names'))));
  if (catalogNames?.has(name('JavaScript')) || catalogNames?.has(name('EmbeddedFiles'))) problems.push('JavaScript or attachments remain');
  const infoDict = dictOf(resolve(doc, doc.context.trailerInfo.Info));
  if (infoDict) for (const key of infoDict.keys()) if (!STANDARD_INFO_KEYS.has(key.decodeText())) problems.push(`the document information has a custom entry (${key.decodeText()})`);
  const bad: string[] = [];
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    const d = dictOf(obj);
    if (!d) continue;
    if (d.has(name('AA'))) bad.push('additional actions');
    if (d.has(name('A')) && actionIsForbidden(doc, d.get(name('A')))) bad.push('a forbidden action');
    if (nameValue(d.get(name('Type'))) === 'Font' && unembeddedFontName(doc, d)) bad.push('a font that is not embedded');
    if (obj instanceof PDFStream && filtersOf(doc, d).some((f) => f === 'LZWDecode' || f === 'Crypt')) bad.push('an LZW or Crypt filter');
    const subtype = nameValue(d.get(name('Subtype')));
    if (d.has(name('Rect')) && subtype && !['Popup'].includes(subtype)) {
      const flags = d.get(name('F'));
      const f = flags instanceof PDFNumber ? flags.asNumber() : 0;
      if (!(f & 4) || f & (1 | 2 | 32)) bad.push('an annotation with wrong display flags');
      if (REMOVED_ANNOTS.has(subtype)) bad.push('a forbidden annotation type');
    }
  }
  problems.push(...[...new Set(bad)]);
  const form = dictOf(resolve(doc, doc.catalog.get(name('AcroForm'))));
  if (form && (form.has(name('XFA')) || (form.get(name('NeedAppearances')) instanceof PDFBool && (form.get(name('NeedAppearances')) as PDFBool).asBoolean()))) problems.push('the form needs appearance regeneration');
  return problems;
}
