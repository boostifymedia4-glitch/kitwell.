/**
 * Visual signatures: places a signature picture on pages. This is NOT a cryptographic digital signature:
 * nothing is certified, no certificate is attached, and later changes to the file are not detectable.
 */
import { degrees } from '@cantoo/pdf-lib';
import { visibleBox, visibleToPage } from './pdfEdit';
import { PdfError, loadPdf } from './pdfOps';

export interface SignaturePlacement {
  /** 1-based page number. */
  page: number;
  /** The signature box as fractions (0-1) of the visible page, origin top-left, like the on-screen preview. */
  x: number;
  y: number;
  w: number;
  h: number;
}

const inside = (n: number) => Number.isFinite(n) && n >= 0 && n <= 1;

export async function signPdf(bytes: Uint8Array, signaturePng: Uint8Array, placements: SignaturePlacement[]): Promise<Uint8Array> {
  if (placements.length === 0) throw new PdfError('Choose where the signature should go.');
  const doc = await loadPdf(bytes);
  let image;
  try {
    image = await doc.embedPng(signaturePng);
  } catch {
    throw new PdfError('The signature image could not be read. Draw, type or upload a PNG or JPG signature.');
  }
  const pages = doc.getPages();
  for (const p of placements) {
    if (!Number.isInteger(p.page) || p.page < 1 || p.page > pages.length) throw new PdfError(`Page ${p.page} does not exist in this document.`);
    if (![p.x, p.y, p.w, p.h].every(inside) || p.w < 0.01 || p.h < 0.005 || p.x + p.w > 1.0001 || p.y + p.h > 1.0001) throw new PdfError('The signature must fit inside the page.');
    const page = pages[p.page - 1];
    const vb = visibleBox(page);
    const width = p.w * vb.visibleWidth;
    const height = p.h * vb.visibleHeight;
    // Bottom-left corner of the box in visible space (origin bottom-left).
    const left = p.x * vb.visibleWidth;
    const bottom = (1 - p.y - p.h) * vb.visibleHeight;
    const at = visibleToPage(vb, left, bottom);
    page.drawImage(image, { x: at.x, y: at.y, width, height, rotate: degrees(vb.rotation) });
  }
  return doc.save();
}

/** Fits an image of `imageAspect` (width / height) inside a box of `boxAspect`, centred. Used to size a new signature on a page. */
export function defaultSignatureBox(imageAspect: number, pageAspect: number, widthFraction = 0.28): { w: number; h: number } {
  const w = widthFraction;
  const h = (w * pageAspect) / imageAspect; // fractions of different page sides, so convert through the page aspect
  return h > 0.4 ? { w: (0.4 * imageAspect) / pageAspect, h: 0.4 } : { w, h };
}
