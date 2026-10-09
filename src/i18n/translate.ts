/**
 * Looking up and filling in translated text. Used by React components (through useI18n) and, because errors
 * are thrown from plain library code, also directly as `tr()` which always uses the language that is currently
 * selected. Without a selected language (tests, server rendering) the English source text is used.
 */
import { en } from './en';

export type Vars = Record<string, string | number>;
type Messages = Record<string, string | undefined>;

const rulesCache = new Map<string, Intl.PluralRules>();
function pluralCategory(code: string, count: number): string {
  let rules = rulesCache.get(code);
  if (!rules) {
    try {
      rules = new Intl.PluralRules(code);
    } catch {
      rules = new Intl.PluralRules('en');
    }
    rulesCache.set(code, rules);
  }
  return rules.select(count);
}

const warned = new Set<string>();

/**
 * Finds the text for `key`. When `vars.count` is a number the plural form is chosen with the language's own
 * rules: `key.one`, `key.few`, `key.other`... then `key.other`, then plain `key`. Anything missing in the
 * language falls back to English. {placeholders} are filled from `vars`.
 */
export function translateWith(code: string, messages: Messages, key: string, vars?: Vars): string {
  const candidates = [key];
  if (vars && typeof vars.count === 'number') candidates.unshift(`${key}.${pluralCategory(code, vars.count)}`, `${key}.other`);
  let text: string | undefined;
  for (const k of candidates) {
    text = messages[k];
    if (text !== undefined) break;
  }
  if (text === undefined) {
    // Plural forms English has: one / other. Use the English one that matches the number.
    const englishCandidates = vars && typeof vars.count === 'number' ? [`${key}.${pluralCategory('en', vars.count)}`, `${key}.other`, key] : [key];
    for (const k of englishCandidates) {
      text = en[k];
      if (text !== undefined) break;
    }
  }
  if (text === undefined) {
    if (!warned.has(key)) {
      warned.add(key);
      if (typeof console !== 'undefined' && !(typeof process !== 'undefined' && process.env?.VITEST)) console.warn(`[i18n] missing key: ${key}`);
    }
    return key;
  }
  return vars ? text.replace(/\{(\w+)\}/g, (whole, name: string) => (name in vars ? String(vars[name]) : whole)) : text;
}

let active: { code: string; messages: Messages } = { code: 'en', messages: {} };

/** Called by the language provider whenever the language changes. */
export function setActiveLanguage(code: string, messages: Messages) {
  active = { code, messages };
}

export const activeLanguageCode = () => active.code;

/** Translates with the currently selected language. Use in library code that has no access to React. */
export const tr = (key: string, vars?: Vars): string => translateWith(active.code, active.messages, key, vars);
