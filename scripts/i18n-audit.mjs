/**
 * Translation audit. Run with: node scripts/i18n-audit.mjs [--report] [--files a,b] [--strict]
 *
 *  1. Catalog: reads every file in src/i18n/en/ (the English source) and reports duplicate keys.
 *  2. Call sites: finds t('key') / tr('key') calls in src and checks that each static key exists in the catalog.
 *  3. Hardcoded text: lists user-facing English left in components and libraries (JSX text, aria-label, title,
 *     placeholder, alt, hint, label attributes and the message of thrown errors).
 *  4. Coverage (with --report): for each locale, which keys and which tools are translated, placeholder
 *     mismatches and text that is identical to English. Writes docs/translation-coverage.md.
 *
 * Exit code 1 when a static key is missing, a key is duplicated, or (with --strict) hardcoded text remains.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const option = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const onlyFiles = option('files')?.split(',').map((f) => f.trim());

/** English source files and legal pages whose full text intentionally exists only in English. */
const EXEMPT = ['src/pageMeta.ts', 'src/tools/registry.ts', 'src/pages/Privacy.tsx', 'src/pages/Terms.tsx', 'src/pages/Cookies.tsx'];

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
};
const parse = (file, text) => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
const rel = (f) => relative(root, f).replace(/\\/g, '/');

/** Reads `{ 'a.b': 'text', ... }` object literals (possibly several) out of a catalog file. */
function readCatalog(file, text) {
  const sf = parse(file, text);
  const entries = new Map();
  const duplicates = [];
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      for (const p of node.properties) {
        if (!ts.isPropertyAssignment(p)) continue;
        const k = ts.isStringLiteral(p.name) || ts.isNoSubstitutionTemplateLiteral(p.name) ? p.name.text : ts.isIdentifier(p.name) ? p.name.text : null;
        let v = p.initializer;
        while (ts.isAsExpression(v) || ts.isParenthesizedExpression(v)) v = v.expression;
        if (k && (ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v))) {
          if (entries.has(k)) duplicates.push(k);
          entries.set(k, v.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  // Only the exported catalog objects: top-level variable initialisers and default exports.
  for (const st of sf.statements) {
    if (ts.isVariableStatement(st)) st.declarationList.declarations.forEach((d) => d.initializer && visit(d.initializer));
    else if (ts.isExportAssignment(st)) visit(st.expression);
  }
  return { entries, duplicates };
}

async function loadEnglish() {
  const dir = join(src, 'i18n', 'en');
  const all = new Map();
  const byFile = {};
  const dupes = [];
  for (const f of (await readdir(dir)).filter((n) => n.endsWith('.ts') && n !== 'index.ts')) {
    const text = await readFile(join(dir, f), 'utf8');
    const { entries, duplicates } = readCatalog(f, text);
    byFile[f.replace('.ts', '')] = entries.size;
    for (const [k, v] of entries) {
      if (all.has(k)) dupes.push(`${k} (in ${f})`);
      all.set(k, v);
    }
    dupes.push(...duplicates.map((k) => `${k} (twice in ${f})`));
  }
  return { all, byFile, dupes };
}

const hasKey = (all, key) => all.has(key) || all.has(`${key}.one`) || all.has(`${key}.other`);

// ---------- call sites and hardcoded text ----------

const ATTRS = new Set(['aria-label', 'title', 'placeholder', 'alt', 'label', 'hint', 'aria-description', 'aria-placeholder']);
const PROPS = new Set(['label', 'title', 'hint', 'description', 'placeholder', 'message', 'note']);
const THROWERS = new Set(['PdfError', 'Error', 'GifError', 'ImageEditError', 'QrError', 'TypeError']);
const looksLikeText = (s) => /\p{L}/u.test(s.replace(/&[a-z]+;|&#\d+;/gi, ''));
// Strings that are fine without translation: formats, technical tokens, single symbols.
const ALLOWED = new Set(['undefined', 'null', 'WPA / WPA2 / WPA3', 'ISO 8601 (UTC)', 'Kitwell', 'PDF', 'PNG', 'JPG', 'JPEG', 'WebP', 'GIF', 'SVG', 'JSON', 'XML', 'HTML', 'URL', 'UUID', 'Base64', 'HEX', 'RGB', 'HSL', 'OCR', 'QR', 'AES-256', 'ISO', 'UTC', 'DPI', 'px', 'pt', 'KB', 'MB', 'B', 'x', 'X', 'Y', 'W', 'H', '×', '→', '←', '…', '·', '–', '—', 'a', 'A', 'AM', 'PM']);
const isAllowed = (s) => {
  const t = s.trim();
  return !t || /^[a-z][A-Za-z0-9]*([.][A-Za-z0-9-]+)+$/.test(t) || !looksLikeText(t) || ALLOWED.has(t) || /^[A-Z0-9 ._/+\-×:]{1,12}$/.test(t) || /^[#.\w-]+$/.test(t) && !/\s/.test(t) && t.length < 3;
};

function scan(file, text, english) {
  const sf = parse(file, text);
  const missing = [];
  const dynamic = [];
  const hardcoded = [];
  const at = (n) => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1;
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : '';
      if ((callee === 't' || callee === 'tr') && node.arguments.length) {
        const a = node.arguments[0];
        if (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a)) {
          if (!hasKey(english, a.text)) missing.push({ key: a.text, line: at(node) });
        } else if (ts.isTemplateExpression(a) || ts.isBinaryExpression(a) || ts.isConditionalExpression(a)) dynamic.push({ line: at(node), text: a.getText().slice(0, 60) });
      }
    }
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && THROWERS.has(node.expression.text) && node.arguments?.length) {
      const a = node.arguments[0];
      if ((ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a) || ts.isTemplateExpression(a)) && !isAllowed(a.getText().slice(1, -1))) hardcoded.push({ kind: 'error', line: at(node), text: a.getText().slice(0, 80) });
    }
    // Text in expressions: {cond ? 'Copied' : 'Copy'}, {ready && 'Done'}, label ?? 'Download', label = 'Processing…'
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      let parent = node.parent;
      let child = node;
      while (parent && (ts.isConditionalExpression(parent) || ts.isParenthesizedExpression(parent) || (ts.isBinaryExpression(parent) && ['&&', '||', '??'].includes(parent.operatorToken.getText())))) {
        if (ts.isConditionalExpression(parent) && parent.condition === child) break;
        if (ts.isBinaryExpression(parent) && parent.left === child && parent.operatorToken.getText() === '&&') break;
        child = parent;
        parent = parent.parent;
      }
      const t = node.text;
      const texty = looksLikeText(t) && !isAllowed(t) && (/s/.test(t.trim()) || /^[A-Z][a-z]{3,}/.test(t) || /[.…:!?]$/.test(t.trim()));
      if (texty && parent && ts.isJsxExpression(parent) && !ts.isJsxAttribute(parent.parent)) hardcoded.push({ kind: 'jsx-expr', line: at(node), text: t.slice(0, 80) });
      else if (texty && parent && ts.isJsxExpression(parent) && ts.isJsxAttribute(parent.parent) && ATTRS.has(parent.parent.name.getText())) hardcoded.push({ kind: 'attr-expr:' + parent.parent.name.getText(), line: at(node), text: t.slice(0, 80) });
      else if (texty && node.parent && ts.isBinaryExpression(node.parent) && ['??', '||'].includes(node.parent.operatorToken.getText()) && node.parent.right === node && !ts.isCallExpression(node.parent.parent)) hardcoded.push({ kind: 'fallback', line: at(node), text: t.slice(0, 80) });
      else if (texty && ts.isBindingElement(node.parent) && node.parent.initializer === node) hardcoded.push({ kind: 'default', line: at(node), text: t.slice(0, 80) });
      else if (texty && ts.isParameter(node.parent) && node.parent.initializer === node) hardcoded.push({ kind: 'default', line: at(node), text: t.slice(0, 80) });
    }
    if (ts.isJsxText(node)) {
      const t = node.text.replace(/\s+/g, ' ').trim();
      if (t && !isAllowed(t)) hardcoded.push({ kind: 'jsx-text', line: at(node), text: t.slice(0, 80) });
    }
    if (ts.isJsxAttribute(node) && node.initializer && ATTRS.has(node.name.getText())) {
      const init = node.initializer;
      const lit = ts.isStringLiteral(init) ? init.text : ts.isJsxExpression(init) && init.expression && (ts.isStringLiteral(init.expression) || ts.isNoSubstitutionTemplateLiteral(init.expression)) ? init.expression.text : ts.isJsxExpression(init) && init.expression && ts.isTemplateExpression(init.expression) ? init.expression.getText().slice(1, -1) : null;
      if (lit !== null && !isAllowed(lit)) hardcoded.push({ kind: `attr:${node.name.getText()}`, line: at(node), text: lit.slice(0, 80) });
    }
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && PROPS.has(node.name.text) && (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer)) && !isAllowed(node.initializer.text)) {
      hardcoded.push({ kind: `prop:${node.name.text}`, line: at(node), text: node.initializer.text.slice(0, 80) });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { missing, dynamic, hardcoded };
}

// ---------- locale coverage ----------

const FORMS = ['zero', 'one', 'two', 'few', 'many', 'other'];
const splitForm = (key) => {
  const dot = key.lastIndexOf('.');
  const form = dot > 0 ? key.slice(dot + 1) : '';
  return FORMS.includes(form) ? { base: key.slice(0, dot), form } : null;
};
const sourceKey = (key, english) => {
  if (english.has(key)) return key;
  const p = splitForm(key);
  return p && english.has(`${p.base}.other`) ? `${p.base}.other` : null;
};
/** Every English key, with plural groups replaced by the forms the language itself uses. */
const requiredKeysFor = (english, code) => {
  const forms = new Intl.PluralRules(code).resolvedOptions().pluralCategories;
  const out = new Set();
  for (const key of english.keys()) {
    const p = splitForm(key);
    if (p && english.has(`${p.base}.other`)) for (const f of forms) out.add(`${p.base}.${f}`);
    else out.add(key);
  }
  return [...out];
};

const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

async function localeCoverage(english, toolSlugs) {
  const dir = join(src, 'i18n', 'locales');
  const result = [];
  for (const entry of (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory())) {
    const code = entry.name;
    const messages = new Map();
    const toolsTranslated = new Set();
    for (const f of await readdir(join(dir, code))) {
      if (!f.endsWith('.ts') || f === 'index.ts') continue;
      const text = await readFile(join(dir, code, f), 'utf8');
      if (f === 'tools.ts') {
        const sf = parse(f, text);
        const walkTools = (n) => {
          if (ts.isPropertyAssignment(n) && (ts.isStringLiteral(n.name) || ts.isIdentifier(n.name)) && toolSlugs.has(n.name.text) && ts.isObjectLiteralExpression(n.initializer)) toolsTranslated.add(n.name.text);
          ts.forEachChild(n, walkTools);
        };
        walkTools(sf);
        continue;
      }
      for (const [k, v] of readCatalog(f, text).entries) messages.set(k, v);
    }
    const required = requiredKeysFor(english, code);
    const missing = required.filter((k) => !messages.has(k));
    const extra = [...messages.keys()].filter((k) => !sourceKey(k, english));
    const badPlaceholders = [...messages.entries()].filter(([k, v]) => {
      const src = sourceKey(k, english);
      if (!src) return false;
      if (splitForm(k) && src !== k) return false;
      // Plural forms may drop {count} where the word itself says the number.
      if (splitForm(k)) return !placeholders(v).split(',').filter(Boolean).every((p) => placeholders(english.get(src)).split(',').includes(p));
      return placeholders(v) !== placeholders(english.get(src));
    });
    const identical = [...messages.entries()].filter(([k, v]) => english.get(k) === v && v.length > 14);
    result.push({ code, total: required.length, translated: required.length - missing.length, missing, extra, badPlaceholders, identical, tools: toolsTranslated.size, toolTotal: toolSlugs.size });
  }
  return result.sort((a, b) => a.code.localeCompare(b.code));
}

async function toolSlugList() {
  const slugs = new Set();
  for (const f of ['image', 'pdf', 'text', 'developer']) {
    const text = await readFile(join(src, 'tools', 'data', `${f}.ts`), 'utf8');
    for (const m of text.matchAll(/slug:\s*'([^']+)'/g)) slugs.add(m[1]);
  }
  return slugs;
}

// ---------- main ----------

const { all: english, byFile, dupes } = await loadEnglish();
const files = (await walk(src)).filter((f) => /\.(ts|tsx)$/.test(f) && !f.includes(`${join('src', 'i18n')}`) && !f.includes(join('src', 'tools', 'data')) && !f.endsWith('.d.ts') && !f.includes('wordlists') && !f.includes('helpData') && !f.includes('blog') && !EXEMPT.some((x) => f.split(String.fromCharCode(92)).join('/').endsWith(x)));
let missingTotal = 0;
let hardcodedTotal = 0;
const perFile = [];
for (const f of files) {
  const r = rel(f);
  if (onlyFiles && !onlyFiles.some((o) => r.includes(o))) continue;
  const { missing, dynamic, hardcoded } = scan(f, await readFile(f, 'utf8'), english);
  missingTotal += missing.length;
  hardcodedTotal += hardcoded.length;
  if (missing.length || hardcoded.length) perFile.push({ r, missing, hardcoded, dynamic: dynamic.length });
}
console.log(`Catalog: ${english.size} English keys (${Object.entries(byFile).map(([k, v]) => `${k} ${v}`).join(', ')})`);
if (dupes.length) console.log(`DUPLICATE KEYS (${dupes.length}): ${dupes.slice(0, 10).join('; ')}`);
for (const p of perFile) {
  console.log(`\n${p.r}`);
  for (const m of p.missing) console.log(`  line ${m.line}: MISSING KEY ${m.key}`);
  for (const h of p.hardcoded.slice(0, flag('all') ? 999 : 12)) console.log(`  line ${h.line}: hardcoded ${h.kind}: ${h.text}`);
  if (p.hardcoded.length > 12 && !flag('all')) console.log(`  ... ${p.hardcoded.length - 12} more`);
}
console.log(`\nMissing keys: ${missingTotal}. Hardcoded user-facing strings: ${hardcodedTotal} in ${perFile.filter((p) => p.hardcoded.length).length} files.`);

if (flag('report')) {
  const slugs = await toolSlugList();
  const cov = await localeCoverage(english, slugs);
  const rows = cov.map((c) => `| ${c.code} | ${c.translated} / ${c.total} (${Math.round((c.translated / c.total) * 100)}%) | ${c.tools} / ${c.toolTotal} | ${c.missing.length} | ${c.badPlaceholders.length} | ${c.identical.length} | ${c.extra.length} |`);
  const md = [
    '# Translation coverage',
    '',
    `Generated by \`node scripts/i18n-audit.mjs --report\`. English source: ${english.size} interface keys and ${slugs.size} tools.`,
    '',
    '| Locale | Interface keys | Tools translated | Missing keys | Placeholder mismatches | Identical to English | Unknown keys |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rows,
    '',
    `Hardcoded user-facing strings left in source: **${hardcodedTotal}** in ${perFile.filter((p) => p.hardcoded.length).length} files (missing keys referenced from code: **${missingTotal}**).`,
    '',
    ...perFile.filter((p) => p.hardcoded.length).slice(0, 80).map((p) => `- \`${p.r}\`: ${p.hardcoded.length}`),
  ].join('\n');
  await mkdir(join(root, 'docs'), { recursive: true });
  await writeFile(join(root, 'docs', 'translation-coverage.md'), md + '\n');
  const only = option('list');
  if (only) {
    for (const c of cov.filter((x) => x.code === only)) {
      console.log('MISSING', c.missing.join(', '));
      console.log('PLACEHOLDERS', c.badPlaceholders.map(([k, v]) => `${k} => ${v}`).join(' | '));
      console.log('IDENTICAL', c.identical.map(([k]) => k).join(', '));
    }
  }
  console.log('\n' + cov.map((c) => `${c.code}: ${c.translated}/${c.total} keys, ${c.tools}/${c.toolTotal} tools, ${c.badPlaceholders.length} placeholder issues, ${c.identical.length} identical to English`).join('\n'));
}

if (dupes.length || missingTotal || (flag('strict') && hardcodedTotal)) process.exit(1);
