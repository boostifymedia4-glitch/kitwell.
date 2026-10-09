import { extensionOf, formatBytes } from './format';
import { tr } from '@/i18n/translate';

export const MB = 1024 * 1024;

export interface FileRules {
  /** Lower-case extensions without the dot, e.g. ['jpg', 'jpeg']. */
  extensions: string[];
  maxBytes: number;
  maxFiles: number;
}

export interface ValidationResult {
  accepted: File[];
  rejected: { name: string; reason: string }[];
}

export function validateFiles(files: File[], rules: FileRules, existing = 0): ValidationResult {
  const accepted: File[] = [];
  const rejected: ValidationResult['rejected'] = [];
  for (const file of files) {
    if (existing + accepted.length >= rules.maxFiles) {
      rejected.push({ name: file.name, reason: tr('err.files.limit', { max: rules.maxFiles }) });
      continue;
    }
    if (!rules.extensions.includes(extensionOf(file.name))) {
      rejected.push({
        name: file.name,
        reason: tr('err.files.unsupportedType', { types: rules.extensions.map((e) => `.${e}`).join(', ') }),
      });
      continue;
    }
    if (file.size === 0) {
      rejected.push({ name: file.name, reason: tr('err.files.empty') });
      continue;
    }
    if (file.size > rules.maxBytes) {
      rejected.push({
        name: file.name,
        reason: tr('err.files.tooLarge', { size: formatBytes(file.size), max: formatBytes(rules.maxBytes) }),
      });
      continue;
    }
    accepted.push(file);
  }
  return { accepted, rejected };
}
