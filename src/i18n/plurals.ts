/** Plural forms: English defines `key.one` and `key.other`; other languages define the forms their own rules use. */
export const PLURAL_CATEGORIES = ['zero', 'one', 'two', 'few', 'many', 'other'] as const;

const split = (key: string): { base: string; form: string } | null => {
  const dot = key.lastIndexOf('.');
  const form = dot > 0 ? key.slice(dot + 1) : '';
  return (PLURAL_CATEGORIES as readonly string[]).includes(form) ? { base: key.slice(0, dot), form } : null;
};

/** The English key whose placeholders and meaning a translated key follows (`x.few` follows `x.other`). */
export function sourceKeyOf(key: string, english: Record<string, string>): string | null {
  if (key in english) return key;
  const p = split(key);
  return p && `${p.base}.other` in english ? `${p.base}.other` : null;
}

/** The keys a language must provide: every English key, with plural groups replaced by that language's own forms. */
export function requiredKeys(english: Record<string, string>, code: string): string[] {
  const forms = new Intl.PluralRules(code).resolvedOptions().pluralCategories;
  const out = new Set<string>();
  for (const key of Object.keys(english)) {
    const p = split(key);
    if (p && `${p.base}.other` in english) for (const f of forms) out.add(`${p.base}.${f}`);
    else out.add(key);
  }
  return [...out];
}
