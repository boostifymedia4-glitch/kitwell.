import { describe, expect, it } from 'vitest';
import { buildPdf, LINE_BREAK, type Block } from '../src/lib/docPdf';
import { subsetsFor } from '../src/lib/pdfFont';
import { nodeFontLoader, pdfPages } from './helpers/pdfTestUtils';

const loader = nodeFontLoader;
const p = (text: string, extra = {}): Block => ({ type: 'paragraph', runs: [{ text, ...extra }] });

describe('document layout engine', () => {
  it('writes selectable text, headings, lists and a table', async () => {
    const blocks: Block[] = [
      { type: 'heading', level: 1, runs: [{ text: 'Quarterly report' }] },
      p('This paragraph has enough words to be laid out as real selectable text in the PDF.'),
      { type: 'list', items: [{ runs: [{ text: 'First point' }], level: 0 }, { runs: [{ text: 'Second point' }], level: 0, marker: '2.' }] },
      {
        type: 'table',
        rows: [
          [{ runs: [{ text: 'Name' }], header: true }, { runs: [{ text: 'Amount' }], header: true }],
          [{ runs: [{ text: 'Alpha' }] }, { runs: [{ text: '42' }], align: 'right' }],
        ],
      },
    ];
    const out = await buildPdf(blocks, { loader, title: 'Report' });
    expect(out.pages).toBe(1);
    const { texts } = await pdfPages(out.bytes);
    expect(texts[0]).toContain('Quarterly report');
    expect(texts[0]).toContain('selectable text');
    expect(texts[0]).toContain('Second point');
    expect(texts[0]).toContain('Alpha');
    expect(texts[0]).toContain('42');
  });

  it('keeps Polish, Czech, Romanian, Turkish, Cyrillic, Greek and Vietnamese letters', async () => {
    const samples = ['Zażółć gęślą jaźń', 'Příliš žluťoučký kůň', 'Ștefan țară', 'Çağrı ışığı şu', 'Привіт, світе', 'Καλημέρα κόσμε', 'Tiếng Việt đẹp'];
    const out = await buildPdf(samples.map((s) => p(s)), { loader });
    expect(out.unsupported).toEqual([]);
    const { texts } = await pdfPages(out.bytes);
    for (const s of samples) expect(texts[0]).toContain(s.split(' ')[0]);
  });

  it('reports characters it cannot draw instead of dropping them silently', async () => {
    const out = await buildPdf([p('Hello 你好 world')], { loader });
    expect(out.unsupported).toContain('你');
    const { texts } = await pdfPages(out.bytes);
    expect(texts[0]).toContain('Hello');
    expect(texts[0]).toContain('?');
  });

  it('paginates long content, wraps long words and honours landscape and page breaks', async () => {
    const long = Array.from({ length: 140 }, (_, i) => p(`Paragraph ${i} with some body text that continues for a while to fill the page.`));
    const out = await buildPdf([...long, { type: 'pagebreak' }, p('After the break'), p('x'.repeat(400))], { loader, landscape: true, pageSize: 'letter' });
    const { count, sizes, texts } = await pdfPages(out.bytes);
    expect(count).toBeGreaterThan(3);
    expect(sizes[0]).toEqual([792, 612]);
    expect(texts[count - 1]).toContain('xxxx');
    expect(texts.join(' ')).toContain('After the break');
  }, 60000);

  it('repeats the table header on every page', async () => {
    const rows = [[{ runs: [{ text: 'Header A' }], header: true }, { runs: [{ text: 'Header B' }], header: true }]];
    for (let i = 0; i < 120; i++) rows.push([{ runs: [{ text: `row ${i}` }], header: false }, { runs: [{ text: `value ${i}` }], header: false }] as never);
    const out = await buildPdf([{ type: 'table', rows }], { loader });
    const { texts, count } = await pdfPages(out.bytes);
    expect(count).toBeGreaterThan(1);
    for (const t of texts) expect(t).toContain('Header A');
    expect(texts.join(' ')).toContain('row 119');
  });

  it('embeds PNG images and skips damaged ones', async () => {
    const png = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='), (c) => c.charCodeAt(0));
    const out = await buildPdf([{ type: 'image', bytes: png, kind: 'png' }, { type: 'image', bytes: new Uint8Array([1, 2, 3]), kind: 'jpg' }, p('caption')], { loader });
    expect(out.skippedImages).toBe(1);
    expect((await pdfPages(out.bytes)).texts[0]).toContain('caption');
  });

  it('honours forced line breaks', async () => {
    const out = await buildPdf([{ type: 'paragraph', runs: [{ text: 'one' }, LINE_BREAK, { text: 'two' }] }], { loader });
    expect((await pdfPages(out.bytes)).texts[0]).toContain('one two');
  });
});

describe('font script detection', () => {
  it('loads only the scripts a text needs', () => {
    expect(subsetsFor('plain ascii')).toEqual(['latin']);
    expect(subsetsFor('Łódź')).toContain('latin-ext');
    expect(subsetsFor('Привіт')).toContain('cyrillic');
    expect(subsetsFor('Καλημέρα')).toContain('greek');
    expect(subsetsFor('हिन्दी')).toContain('devanagari');
    expect(subsetsFor('Tiếng')).toEqual(expect.arrayContaining(['vietnamese', 'latin-ext']));
  });
});
