import type { OutputMime } from './imageProcessor';
import { extensionOf } from './format';

export type FormatKey = 'jpeg' | 'png' | 'webp';

export const FORMATS: Record<FormatKey, { mime: OutputMime; ext: string; label: string }> = {
  jpeg: { mime: 'image/jpeg', ext: 'jpg', label: 'JPG' },
  png: { mime: 'image/png', ext: 'png', label: 'PNG' },
  webp: { mime: 'image/webp', ext: 'webp', label: 'WebP' },
};

export const FORMAT_OPTIONS = (Object.keys(FORMATS) as FormatKey[]).map((k) => ({ value: k, label: FORMATS[k].label }));

/** Output format that matches the input file; formats we cannot encode fall back to PNG. */
export function sameFormatAs(file: File): FormatKey {
  const ext = extensionOf(file.name);
  if (ext === 'jpg' || ext === 'jpeg') return 'jpeg';
  if (ext === 'webp') return 'webp';
  return 'png';
}

export const INPUT_EXTENSIONS: Record<string, string[]> = {
  jpeg: ['jpg', 'jpeg'],
  png: ['png'],
  webp: ['webp'],
};
