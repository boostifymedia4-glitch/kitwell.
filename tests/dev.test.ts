import { describe, expect, it } from 'vitest';
import {
  base64Decode, base64Encode, contrastRatio, formatJson, formatXml, generatePassword, generateUuid, htmlDecode,
  htmlEncode, minifyJson, parseColor, parseJson, parseTimestamp, rgbToHex, rgbToHsl, rgbToHsv, hslToRgb, runRegex,
  urlDecode, urlEncode, passwordEntropyBits,
} from '../src/lib/dev';

describe('JSON', () => {
  it('formats with indentation and sorts keys', () => {
    const r = formatJson('{"b":1,"a":{"d":1,"c":2}}', 2, true);
    expect(r).toEqual({ ok: true, value: '{\n  "a": {\n    "c": 2,\n    "d": 1\n  },\n  "b": 1\n}' });
  });
  it('supports tabs and minify', () => {
    expect(formatJson('[1]', 'tab', false)).toEqual({ ok: true, value: '[\n\t1\n]' });
    expect(minifyJson('{ "a": [1, 2] }')).toEqual({ ok: true, value: '{"a":[1,2]}' });
  });
  it('reports line and column of errors', () => {
    const r = parseJson('{\n  "a": 1,\n  "b": ,\n}');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error.line).toBe(3);
  });
  it('flags trailing commas and single quotes', () => {
    const t = parseJson('{"a":1,}');
    expect(!t.ok && t.error.message).toMatch(/Trailing comma/);
    const q = parseJson("{'a':1}");
    expect(!q.ok && q.error.message).toMatch(/property name/);
  });
  it('rejects empty input', () => {
    expect(parseJson('  ').ok).toBe(false);
  });
});

describe('XML', () => {
  it('pretty-prints', () => {
    const r = formatXml('<a><b>1</b><c x="1"/><d><e/></d></a>', 2, false);
    expect(r).toEqual({ ok: true, value: '<a>\n  <b>1</b>\n  <c x="1"/>\n  <d>\n    <e/>\n  </d>\n</a>' });
  });
  it('minifies', () => {
    const r = formatXml('<a>\n  <b>1</b>\n</a>', 2, true);
    expect(r).toEqual({ ok: true, value: '<a><b>1</b></a>' });
  });
  it('keeps declarations, comments and CDATA', () => {
    const r = formatXml('<?xml version="1.0"?><a><!-- hi --><![CDATA[<x>]]></a>', 2, false);
    expect(r.ok && r.value).toBe('<?xml version="1.0"?>\n<a>\n  <!-- hi -->\n  <![CDATA[<x>]]>\n</a>');
  });
  it('detects mismatched and unclosed tags', () => {
    const m = formatXml('<a><b></a>', 2, false);
    expect(!m.ok && m.error.message).toMatch(/Mismatched/);
    const u = formatXml('<a><b>', 2, false);
    expect(!u.ok && u.error.message).toMatch(/Unclosed/);
    const multi = formatXml('<a/><b/>', 2, false);
    expect(!multi.ok && multi.error.message).toMatch(/single root/);
  });
  it('handles ">" inside attribute values', () => {
    const r = formatXml('<a t="1>2"><b/></a>', 2, false);
    expect(r.ok && r.value).toContain('t="1>2"');
  });
});

describe('encoding', () => {
  it('url encodes and decodes', () => {
    expect(urlEncode('a b&c=d/é', 'component', false)).toBe('a%20b%26c%3Dd%2F%C3%A9');
    expect(urlEncode('https://x.com/a b?q=1', 'full', false)).toBe('https://x.com/a%20b?q=1');
    expect(urlEncode('a b', 'component', true)).toBe('a+b');
    expect(urlDecode('a%20b+c', 'component', true)).toBe('a b c');
    expect(() => urlDecode('%E0%A4%A', 'component', false)).toThrow(/malformed/);
  });
  it('html encodes and decodes', () => {
    expect(htmlEncode('<a href="x">&\'</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;');
    expect(htmlEncode('é', true)).toBe('&#233;');
    expect(htmlDecode('&lt;b&gt; &amp; &#65; &#x42; &copy; &unknown;')).toBe('<b> & A B © &unknown;');
  });
  it('base64 round-trips UTF-8', () => {
    expect(base64Encode('héllo ✓', false)).toBe('aMOpbGxvIOKckw==');
    expect(base64Decode('aMOpbGxvIOKckw==')).toBe('héllo ✓');
    expect(base64Encode('??>>', true)).toBe('Pz8-Pg');
    expect(base64Decode('Pz8-Pg')).toBe('??>>');
  });
  it('rejects invalid base64', () => {
    expect(() => base64Decode('@@@')).toThrow(/not valid Base64/);
    expect(() => base64Decode('/w==')).toThrow(/UTF-8/);
  });
});

describe('regex', () => {
  it('finds matches, groups and named groups', () => {
    const r = runRegex('(?<y>\\d{4})-(\\d{2})', 'g', 'on 2024-05 and 1999-12');
    expect(r.matches).toHaveLength(2);
    expect(r.matches[0].named.y).toBe('2024');
    expect(r.matches[1].groups[1]).toBe('12');
  });
  it('reports invalid patterns', () => {
    expect(runRegex('(', 'g', 'x').error).toBeTruthy();
  });
  it('previews replacements', () => {
    expect(runRegex('a', 'g', 'banana', 'o').replaced).toBe('bonono');
  });
  it('does not hang on empty matches', () => {
    expect(runRegex('x*', 'g', 'abc').matches.length).toBe(4);
  });
});

describe('generators', () => {
  const o = { length: 16, lower: true, upper: true, digits: true, symbols: true, excludeAmbiguous: false };
  it('generates passwords with every selected class', () => {
    for (let i = 0; i < 50; i++) {
      const p = generatePassword(o);
      expect(p).toHaveLength(16);
      expect(p).toMatch(/[a-z]/);
      expect(p).toMatch(/[A-Z]/);
      expect(p).toMatch(/\d/);
      expect(p).toMatch(/[^A-Za-z0-9]/);
    }
  });
  it('excludes ambiguous characters', () => {
    for (let i = 0; i < 30; i++) expect(generatePassword({ ...o, excludeAmbiguous: true })).not.toMatch(/[Il1O0o]/);
  });
  it('requires a character type', () => {
    expect(() => generatePassword({ ...o, lower: false, upper: false, digits: false, symbols: false })).toThrow();
  });
  it('estimates entropy', () => {
    expect(passwordEntropyBits({ ...o, symbols: false, upper: false, digits: false, length: 10 })).toBe(47);
  });
  it('makes v4 uuids', () => {
    expect(generateUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
});

describe('timestamps', () => {
  it('auto-detects seconds vs milliseconds', () => {
    expect(parseTimestamp('1700000000', 'auto').date.toISOString()).toBe('2023-11-14T22:13:20.000Z');
    expect(parseTimestamp('1700000000000', 'auto').unit).toBe('ms');
  });
  it('rejects garbage and out-of-range', () => {
    expect(() => parseTimestamp('abc', 'auto')).toThrow();
    expect(() => parseTimestamp('99999999999999999', 's')).toThrow(/range/);
  });
});

describe('colour', () => {
  it('parses formats', () => {
    expect(parseColor('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
    expect(parseColor('FF8800')).toEqual({ r: 255, g: 136, b: 0 });
    expect(parseColor('rgb(10, 20 ,30)')).toEqual({ r: 10, g: 20, b: 30 });
    expect(parseColor('hsl(120, 100%, 50%)')).toEqual({ r: 0, g: 255, b: 0 });
    expect(parseColor('rgb(300,0,0)')).toBeNull();
    expect(parseColor('nope')).toBeNull();
  });
  it('converts', () => {
    expect(rgbToHex({ r: 255, g: 136, b: 0 })).toBe('#ff8800');
    expect(rgbToHsl({ r: 255, g: 136, b: 0 })).toEqual({ h: 32, s: 100, l: 50 });
    expect(rgbToHsv({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, v: 100 });
    expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
  });
  it('computes WCAG contrast', () => {
    expect(contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).toBeCloseTo(21, 0);
  });
});
