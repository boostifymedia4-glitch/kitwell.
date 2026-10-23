/**
 * The PDF/A profiles the tool produces. Each one was validated with veraPDF (see tests/pdfA.test.ts). A-level profiles
 * (1a, 2a, 3a) need tagged structure and PDF/A-4e/4f need 3D or attachments, so they are not offered. Kept apart from
 * pdfA.ts so the interface can list the profiles without loading the converter.
 */
export type PdfAProfile = '1b' | '2b' | '2u' | '3b' | '3u' | '4';
export const PDFA_PROFILES: PdfAProfile[] = ['1b', '2b', '2u', '3b', '3u', '4'];
export const DEFAULT_PROFILE: PdfAProfile = '2b';
export const PROFILE_INFO: Record<PdfAProfile, { part: number; conformance: 'B' | 'U' | null }> = {
  '1b': { part: 1, conformance: 'B' },
  '2b': { part: 2, conformance: 'B' },
  '2u': { part: 2, conformance: 'U' },
  '3b': { part: 3, conformance: 'B' },
  '3u': { part: 3, conformance: 'U' },
  '4': { part: 4, conformance: null },
};
export const pdfaLabel = (profile: PdfAProfile) => `PDF/A-${profile}`;
