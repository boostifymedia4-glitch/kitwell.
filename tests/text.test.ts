import { describe, expect, it } from 'vitest';
import { cleanText, convertCase, removeDuplicateLines, sortLines, textStats } from '../src/lib/text';

describe('textStats', () => {
  it('returns zeros for empty text', () => {
    const s = textStats('');
    expect([s.words, s.characters, s.sentences, s.paragraphs, s.lines]).toEqual([0, 0, 0, 0, 0]);
  });
  it('counts words, sentences and paragraphs', () => {
    const s = textStats('Hello world. This is a test!\n\nSecond paragraph here.');
    expect(s.words).toBe(9);
    expect(s.sentences).toBe(3);
    expect(s.paragraphs).toBe(2);
  });
  it('counts emoji as one character', () => {
    expect(textStats('a😀b').characters).toBe(3);
    expect(textStats('a b').charactersNoSpaces).toBe(2);
  });
});

describe('convertCase', () => {
  it('handles basic modes', () => {
    expect(convertCase('Hello World', 'upper')).toBe('HELLO WORLD');
    expect(convertCase('Hello World', 'lower')).toBe('hello world');
    expect(convertCase('Hello', 'toggle')).toBe('hELLO');
  });
  it('title-cases with small words', () => {
    expect(convertCase('the lord of the rings', 'title')).toBe('The Lord of the Rings');
    expect(convertCase("what a day to be alive", 'title')).toBe('What a Day to Be Alive');
  });
  it('sentence-cases', () => {
    expect(convertCase('hello there. HOW are you? fine', 'sentence')).toBe('Hello there. How are you? Fine');
  });
  it('converts programming cases', () => {
    expect(convertCase('some mixed_Case-text', 'camel')).toBe('someMixedCaseText');
    expect(convertCase('someMixedCase', 'snake')).toBe('some_mixed_case');
    expect(convertCase('some text here', 'kebab')).toBe('some-text-here');
    expect(convertCase('some text', 'constant')).toBe('SOME_TEXT');
    expect(convertCase('some text', 'pascal')).toBe('SomeText');
  });
});

describe('removeDuplicateLines', () => {
  const base = { ignoreCase: false, trimLines: false, removeEmpty: false };
  it('keeps first occurrences in order', () => {
    const r = removeDuplicateLines('a\nb\na\nc\nb', base);
    expect(r.output).toBe('a\nb\nc');
    expect(r.removed).toBe(2);
  });
  it('supports case-insensitive, trimming and empty removal', () => {
    const r = removeDuplicateLines('A\n a \n\na', { ignoreCase: true, trimLines: true, removeEmpty: true });
    expect(r.output).toBe('A');
  });
});

describe('sortLines', () => {
  const o = { mode: 'az' as const, ignoreCase: true, natural: false, removeEmpty: false };
  it('sorts A-Z and Z-A', () => {
    expect(sortLines('b\nC\na', o)).toBe('a\nb\nC');
    expect(sortLines('b\nC\na', { ...o, mode: 'za' })).toBe('C\nb\na');
  });
  it('natural sort orders numbers by value', () => {
    expect(sortLines('item10\nitem2\nitem1', { ...o, natural: true })).toBe('item1\nitem2\nitem10');
  });
  it('sorts numerically and by length', () => {
    expect(sortLines('10\n9\n100', { ...o, mode: 'numeric' })).toBe('9\n10\n100');
    expect(sortLines('ccc\na\nbb', { ...o, mode: 'length' })).toBe('a\nbb\nccc');
  });
  it('shuffle keeps the same lines', () => {
    const out = sortLines('1\n2\n3\n4\n5', { ...o, mode: 'shuffle' }).split('\n').sort();
    expect(out).toEqual(['1', '2', '3', '4', '5']);
  });
});

describe('cleanText', () => {
  const none = {
    trimLines: false, collapseSpaces: false, removeEmptyLines: false, collapseEmptyLines: false,
    removeLineBreaks: false, stripInvisible: false, straightenQuotes: false, stripTags: false,
  };
  it('collapses spaces and trims lines', () => {
    expect(cleanText('  a   b  \n  c ', { ...none, collapseSpaces: true, trimLines: true })).toBe('a b\nc');
  });
  it('removes invisible chars and straightens quotes', () => {
    expect(cleanText('a​b “q”', { ...none, stripInvisible: true, straightenQuotes: true })).toBe('ab "q"');
  });
  it('removes empty lines and line breaks', () => {
    expect(cleanText('a\n\n\nb', { ...none, removeEmptyLines: true })).toBe('a\nb');
    expect(cleanText('a\nb', { ...none, removeLineBreaks: true })).toBe('a b');
  });
});
