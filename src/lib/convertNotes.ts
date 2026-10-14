/** Notes shown after a conversion: everything the converter had to leave out or could not draw, as translatable messages. */
export interface Note {
  key: string;
  vars: Record<string, string | number>;
}

export interface ConversionFacts {
  /** Characters the PDF fonts do not cover. */
  unsupported?: string[];
  externalImages?: number;
  unsupportedImages?: number;
  skipped?: number;
  truncated?: number;
  headersFooters?: boolean;
  extras?: number;
  uncalculated?: number;
  hiddenSheets?: number;
  cutSheets?: number;
  unsupportedElements?: number;
}

export function notesFor(f: ConversionFacts): Note[] {
  const notes: Note[] = [];
  if (f.unsupported?.length) notes.push({ key: 'convert.warn.chars', vars: { chars: f.unsupported.slice(0, 12).join(' ') + (f.unsupported.length > 12 ? ' …' : '') } });
  const counted: [keyof ConversionFacts, string][] = [
    ['externalImages', 'convert.warn.externalImages'],
    ['unsupportedImages', 'convert.warn.unsupportedImages'],
    ['skipped', 'convert.warn.skipped'],
    ['truncated', 'convert.warn.truncated'],
    ['extras', 'convert.warn.extras'],
    ['uncalculated', 'convert.warn.uncalculated'],
    ['hiddenSheets', 'convert.warn.hiddenSheets'],
    ['cutSheets', 'convert.warn.cutSheets'],
    ['unsupportedElements', 'convert.warn.unsupportedElements'],
  ];
  for (const [field, key] of counted) {
    const value = f[field];
    if (typeof value === 'number' && value > 0) notes.push({ key, vars: { number: value } });
  }
  if (f.headersFooters) notes.push({ key: 'convert.warn.headersFooters', vars: {} });
  return notes;
}
