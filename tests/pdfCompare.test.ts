import { describe, expect, it } from 'vitest';
import { compareDocuments, countWords, pixelDiff, textReport, withContext, type CompareOptions } from '../src/lib/pdfCompare';

const strict: CompareOptions = { ignoreCase: false, ignoreWhitespace: true };

describe('compareDocuments', () => {
  it('reports identical pages as the same', () => {
    const { pages, totals } = compareDocuments(['Hello world', 'Second page'], ['Hello world', 'Second page'], strict);
    expect(pages.map((p) => p.status)).toEqual(['same', 'same']);
    expect(totals).toMatchObject({ identicalPages: 2, changedPages: 0, addedWords: 0, removedWords: 0 });
  });

  it('counts added and removed words per page and in total', () => {
    const { pages, totals } = compareDocuments(['The price is 100 dollars today', 'Same'], ['The price is 250 dollars today now', 'Same'], strict);
    expect(pages[0]).toMatchObject({ status: 'changed', addedWords: 2, removedWords: 1 });
    expect(pages[0].parts.filter((p) => p.type === 'added').map((p) => p.text.trim())).toEqual(['250', 'now']);
    expect(pages[0].parts.find((p) => p.type === 'removed')!.text.trim()).toBe('100');
    expect(pages[1].status).toBe('same');
    expect(totals).toMatchObject({ changedPages: 1, identicalPages: 1, addedWords: 2, removedWords: 1 });
  });

  it('handles extra and missing pages', () => {
    const longer = compareDocuments(['One'], ['One', 'Two three'], strict);
    expect(longer.pages[1]).toMatchObject({ status: 'added', addedWords: 2, page: 2 });
    expect(longer.totals).toMatchObject({ addedPages: 1, pagesA: 1, pagesB: 2 });
    const shorter = compareDocuments(['One', 'Two three four'], ['One'], strict);
    expect(shorter.pages[1]).toMatchObject({ status: 'removed', removedWords: 3 });
    expect(shorter.totals.removedPages).toBe(1);
  });

  it('can ignore case and whitespace, or not', () => {
    expect(compareDocuments(['Hello   World\nagain'], ['hello world again'], { ignoreCase: true, ignoreWhitespace: true }).pages[0].status).toBe('same');
    expect(compareDocuments(['Hello World'], ['hello world'], { ignoreCase: false, ignoreWhitespace: true }).pages[0].status).toBe('changed');
    expect(compareDocuments(['Hello World'], ['Hello  World'], { ignoreCase: false, ignoreWhitespace: true }).pages[0].status).toBe('same');
  });

  it('flags pages without any text', () => {
    const { pages } = compareDocuments(['', 'Text'], ['', 'Text'], strict);
    expect(pages[0]).toMatchObject({ status: 'same', noText: true });
    expect(pages[1].noText).toBe(false);
  });

  it('handles two empty documents', () => {
    const { pages, totals } = compareDocuments([], [], strict);
    expect(pages).toEqual([]);
    expect(totals.changedPages).toBe(0);
  });
});

describe('display helpers', () => {
  const long = Array.from({ length: 60 }, (_, i) => `word${i}`).join(' ');
  it('shortens long unchanged runs to context around the changes', () => {
    const { pages } = compareDocuments([`${long} old ${long}`], [`${long} new ${long}`], strict);
    const shown = withContext(pages[0].parts, 5);
    expect(shown.some((p) => p.type === 'gap')).toBe(true);
    expect(shown.filter((p) => p.type === 'removed' || p.type === 'added').map((p) => p.text.trim())).toEqual(['old', 'new']);
    expect(shown.map((p) => p.text).join('').length).toBeLessThan(pages[0].parts.map((p) => p.text).join('').length / 3);
  });
  it('leaves short unchanged runs alone', () => {
    const parts = compareDocuments(['a b c old d e'], ['a b c new d e'], strict).pages[0].parts;
    expect(withContext(parts, 8).some((p) => p.type === 'gap')).toBe(false);
  });
  it('writes a readable report', () => {
    const r = compareDocuments(['Alpha beta', 'Same'], ['Alpha gamma', 'Same', 'Extra page'], strict);
    const report = textReport('a.pdf', 'b.pdf', r);
    expect(report).toContain('Pages changed: 1');
    expect(report).toContain('  + gamma');
    expect(report).toContain('  - beta');
    expect(report).toContain('Page 3: only in the revised file');
    expect(textReport('a', 'b', compareDocuments(['x'], ['x'], strict))).toContain('No differences');
  });
  it('counts words', () => {
    expect(countWords('  a  b\nc ')).toBe(3);
    expect(countWords('   ')).toBe(0);
  });
});

describe('pixelDiff', () => {
  const solid = (w: number, h: number, v: number) => new Uint8ClampedArray(Array.from({ length: w * h * 4 }, (_, i) => (i % 4 === 3 ? 255 : v)));
  it('is zero for identical images', () => {
    const a = solid(10, 10, 200);
    const d = pixelDiff(a, a.slice(), 10, 10);
    expect(d).toMatchObject({ changedPixels: 0, percent: 0, totalPixels: 100 });
  });
  it('marks changed pixels red and reports the share', () => {
    const a = solid(10, 10, 255);
    const b = solid(10, 10, 255);
    for (let i = 0; i < 5; i++) b.fill(0, i * 4, i * 4 + 3); // first five pixels turn black
    const d = pixelDiff(a, b, 10, 10);
    expect(d.changedPixels).toBe(5);
    expect(d.percent).toBe(5);
    expect([d.overlay[0], d.overlay[1], d.overlay[2]]).toEqual([235, 40, 60]);
    expect(d.overlay[4 * 9]).toBeGreaterThan(200); // an unchanged white pixel stays light
  });
  it('ignores tiny differences below the threshold', () => {
    expect(pixelDiff(solid(4, 4, 100), solid(4, 4, 120), 4, 4, 48).changedPixels).toBe(0);
    expect(pixelDiff(solid(4, 4, 100), solid(4, 4, 200), 4, 4, 48).changedPixels).toBe(16);
  });
  it('rejects mismatched sizes', () => {
    expect(() => pixelDiff(solid(2, 2, 0), solid(3, 3, 0), 2, 2)).toThrow();
  });
});
