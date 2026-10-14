/**
 * Shared helpers for reading Office Open XML files (.docx, .xlsx, .pptx). They are ZIP archives of XML parts.
 * Nothing here runs macros, follows external links or loads anything from the network.
 */
import { strFromU8, unzipSync } from 'fflate';
import { tr } from '@/i18n/translate';

/** Largest total size of the unpacked parts. Protects against "zip bombs" that expand to gigabytes. */
export const MAX_UNPACKED_BYTES = 300 * 1024 * 1024;

export class OfficeError extends Error {}

export type Zip = Record<string, Uint8Array>;

const isZip = (b: Uint8Array) => b[0] === 0x50 && b[1] === 0x4b && (b[2] === 0x03 || b[2] === 0x05);
const isOle = (b: Uint8Array) => b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0;

/** Unpacks an Office file. `legacy` names the old binary format (doc, xls, ppt) to mention in the error message. */
export function openOffice(bytes: Uint8Array, legacy: string): Zip {
  if (isOle(bytes)) throw new OfficeError(tr('err.office.legacy', { format: legacy }));
  if (!isZip(bytes)) throw new OfficeError(tr('err.office.notOffice'));
  let total = 0;
  try {
    return unzipSync(bytes, {
      filter: (file) => {
        total += file.originalSize;
        if (total > MAX_UNPACKED_BYTES) throw new OfficeError(tr('err.office.bomb'));
        return true;
      },
    });
  } catch (err) {
    if (err instanceof OfficeError) throw err;
    throw new OfficeError(tr('err.office.unpack'));
  }
}

export function part(zip: Zip, path: string): Uint8Array | undefined {
  return zip[path] ?? zip[path.replace(/^\//, '')];
}

export function parseXml(text: string): Document {
  const doc = new DOMParser().parseFromString(text.charCodeAt(0) === 0xfeff ? text.slice(1) : text, 'application/xml');
  const bad = doc.getElementsByTagName('parsererror');
  if (bad.length) throw new OfficeError(tr('err.office.badXml'));
  return doc;
}

export function xmlPart(zip: Zip, path: string): Document | null {
  const bytes = part(zip, path);
  return bytes ? parseXml(strFromU8(bytes)) : null;
}

/** Element name without its namespace prefix: "w:p" and "p" both give "p". */
export const localName = (n: Node) => n.nodeName.split(':').pop() as string;

export function childElements(el: Element | Document | null | undefined, name?: string): Element[] {
  const out: Element[] = [];
  if (!el) return out;
  for (const c of Array.from(el.childNodes)) if (c.nodeType === 1 && (!name || localName(c) === name)) out.push(c as Element);
  return out;
}

export function firstChild(el: Element | null | undefined, name: string): Element | undefined {
  return childElements(el, name)[0];
}

/** Attribute value ignoring the namespace prefix ("w:val", "val"). */
export function attr(el: Element | undefined, name: string): string | null {
  if (!el) return null;
  for (const a of Array.from(el.attributes)) if (a.name === name || a.name.endsWith(`:${name}`)) return a.value;
  return null;
}

/** Attribute with a namespace prefix only, e.g. r:id (not the plain id attribute). */
export function prefixedAttr(el: Element | undefined, name: string): string | null {
  if (!el) return null;
  for (const a of Array.from(el.attributes)) if (a.name.endsWith(`:${name}`)) return a.value;
  return null;
}

export function descendants(el: Element | Document, name: string): Element[] {
  const out: Element[] = [];
  const visit = (n: Node) => {
    for (const c of Array.from(n.childNodes)) {
      if (c.nodeType !== 1) continue;
      if (localName(c) === name) out.push(c as Element);
      visit(c);
    }
  };
  visit(el);
  return out;
}

/** Relationship id -> target path (relative to the part that owns the .rels file). */
export function readRels(zip: Zip, relsPath: string): Map<string, { target: string; type: string; external: boolean }> {
  const map = new Map<string, { target: string; type: string; external: boolean }>();
  const doc = xmlPart(zip, relsPath);
  if (!doc) return map;
  for (const rel of descendants(doc, 'Relationship')) {
    const id = attr(rel, 'Id');
    const target = attr(rel, 'Target');
    if (id && target) map.set(id, { target, type: attr(rel, 'Type') ?? '', external: attr(rel, 'TargetMode') === 'External' });
  }
  return map;
}

/** Resolves a relationship target against the folder of the part that references it. */
export function resolvePath(baseDir: string, target: string): string {
  if (target.startsWith('/')) return target.slice(1);
  const parts = baseDir.split('/').filter(Boolean);
  for (const seg of target.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg !== '.') parts.push(seg);
  }
  return parts.join('/');
}

export function imageKind(bytes: Uint8Array): 'jpg' | 'png' | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'png';
  return null;
}

export const textOf = (el: Element | undefined) => (el ? (el.textContent ?? '') : '');
