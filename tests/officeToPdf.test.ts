import { beforeAll, describe, expect, it } from 'vitest';
import { DOMParser as LinkedomParser } from 'linkedom';
import { buildPdf } from '../src/lib/docPdf';
import { readDocx } from '../src/lib/docx';
import { htmlToBlocks, parseHtml } from '../src/lib/htmlDoc';
import { OfficeError } from '../src/lib/officeZip';
import { pptxToPdf } from '../src/lib/pptxPdf';
import { excelDate, formatNumber, readXlsx } from '../src/lib/xlsx';
import { makeDocx, makePptx, makeXlsx, PNG } from './helpers/officeFixtures';
import { nodeFontLoader, pdfPages } from './helpers/pdfTestUtils';

beforeAll(() => {
  (globalThis as unknown as { DOMParser: unknown }).DOMParser = LinkedomParser;
});

const loader = nodeFontLoader;
const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u));

describe('HTML to PDF', () => {
  const html = `<!doctype html><html><head><title>Invoice 7</title><style>p{color:red}</style><script>alert(1)</script></head><body>
    <h1>Invoice</h1><p>Hello <b>bold</b> and <a href="https://example.com">a link</a>.<br>Next line Zażółć.</p>
    <ul><li>Apples<ul><li>Green</li></ul></li><li>Pears</li></ul><ol start="3"><li>Third</li></ol>
    <table><tr><th>Item</th><th>Qty</th></tr><tr><td>Pen</td><td style="text-align:right">2</td></tr></table>
    <pre>line 1\n  line 2</pre><blockquote><p>Quoted</p></blockquote><hr>
    <img src="data:image/png;base64,${b64(PNG)}"><img src="https://tracker.example/pixel.png"><img src="data:image/webp;base64,AAAA">
    <iframe src="https://example.com"></iframe><svg><circle/></svg></body></html>`;

  it('reads structure and counts what it cannot or must not load', () => {
    const read = htmlToBlocks(parseHtml(html));
    expect(read.title).toBe('Invoice 7');
    const types = read.blocks.map((b) => b.type);
    expect(types).toEqual(expect.arrayContaining(['heading', 'paragraph', 'list', 'table', 'code', 'rule', 'image']));
    expect(read.externalImages).toBe(1); // never fetched
    expect(read.unsupportedImages).toBe(1);
    expect(read.skippedElements).toBe(2); // iframe, svg
    const list = read.blocks.find((b) => b.type === 'list');
    expect(list && list.type === 'list' && list.items.map((i) => i.marker)).toEqual(['•', '–', '•']);
    const ordered = read.blocks.filter((b) => b.type === 'list')[1];
    expect(ordered.type === 'list' && ordered.items[0].marker).toBe('3.');
    // script and style content never reach the output
    expect(JSON.stringify(read.blocks)).not.toContain('alert(1)');
    expect(JSON.stringify(read.blocks)).not.toContain('color:red');
  });

  it('produces a real PDF with the text, link text, table and a picture', async () => {
    const read = htmlToBlocks(parseHtml(html));
    const out = await buildPdf(read.blocks, { loader, title: read.title });
    const { texts, count } = await pdfPages(out.bytes);
    expect(count).toBe(1);
    for (const word of ['Invoice', 'bold', 'a link', 'Next line', 'Zażółć', 'Apples', 'Green', 'Pears', '3.', 'Item', 'Pen', 'line 1', 'Quoted']) expect(texts[0]).toContain(word);
    expect(out.skippedImages).toBe(0);
    expect(new TextDecoder().decode(out.bytes.slice(0, 5))).toBe('%PDF-');
  });

  it('does not treat an empty document as a success', () => {
    expect(htmlToBlocks(parseHtml('<html><body>   </body></html>')).blocks).toEqual([]);
  });
});

describe('Word to PDF', () => {
  it('reads headings, formatting, lists, tables, pictures and page setup', () => {
    const read = readDocx(makeDocx());
    expect(read.title).toBe('Plan title');
    expect(read.blocks[0]).toMatchObject({ type: 'heading', level: 1 });
    const para = read.blocks[1];
    expect(para.type === 'paragraph' && para.runs.find((r) => r.text === 'important')?.bold).toBe(true);
    const lists = read.blocks.filter((b) => b.type === 'list');
    expect(lists.length).toBe(2);
    expect(lists[0].type === 'list' && lists[0].items.map((i) => i.marker)).toEqual(['•', '•']);
    expect(lists[1].type === 'list' && lists[1].items.map((i) => i.marker)).toEqual(['1.', '2.']);
    expect(read.blocks.some((b) => b.type === 'table')).toBe(true);
    expect(read.blocks.some((b) => b.type === 'image')).toBe(true);
    expect(read.landscape).toBe(false);
    expect(readDocx(makeDocx({ landscape: true })).landscape).toBe(true);
  });

  it('turns a document into a PDF whose text can be read back', async () => {
    const read = readDocx(makeDocx());
    const out = await buildPdf(read.blocks, { loader, pageSize: read.pageSize, landscape: read.landscape });
    const { texts } = await pdfPages(out.bytes);
    for (const word of ['Project plan', 'important', 'slanted', 'Zażółć', 'First bullet', 'Step two', 'Pen', '3.50', 'Last paragraph']) expect(texts[0]).toContain(word);
  });

  it('rejects old .doc files, non-Office files and ZIPs that are not Word documents', () => {
    const ole = new Uint8Array(600);
    ole.set([0xd0, 0xcf, 0x11, 0xe0], 0);
    expect(() => readDocx(ole)).toThrow(/old binary Word/);
    expect(() => readDocx(new TextEncoder().encode('just text'))).toThrow(OfficeError);
    expect(() => readDocx(makeXlsx())).toThrow(/not a Word document/);
  });
});

describe('Excel to PDF', () => {
  it('reads visible sheets with formatted numbers and dates', () => {
    const read = readXlsx(makeXlsx());
    expect(read.sheets).toBe(2);
    expect(read.hiddenSheets).toBe(1);
    const table = read.blocks.find((b) => b.type === 'table');
    const cells = table && table.type === 'table' ? table.rows.map((r) => r.map((c) => c.runs[0].text)) : [];
    expect(cells[0]).toEqual(['Region', 'Revenue', 'Date', 'Rate']);
    expect(cells[1]).toEqual(['Łódź', '1,234.50', '2023-03-15', '26%']);
    expect(cells[2]).toEqual(['Total', '1,234.50', '', '']);
    expect(read.uncalculated).toBe(1);
    expect(JSON.stringify(read.blocks)).not.toContain('hidden');
  });

  it('formats numbers like Excel does', () => {
    expect(formatNumber(1234.5, '#,##0.00')).toBe('1,234.50');
    expect(formatNumber(0.256, '0%')).toBe('26%');
    expect(formatNumber(3, undefined)).toBe('3');
    expect(formatNumber(0.1 + 0.2, undefined)).toBe('0.3');
    expect(excelDate(45000, false)).toBe('2023-03-15');
    expect(excelDate(45000.5, true)).toBe('2023-03-15 12:00');
  });

  it('produces a PDF containing every visible sheet', async () => {
    const read = readXlsx(makeXlsx());
    const out = await buildPdf(read.blocks, { loader, landscape: read.landscape });
    const { texts } = await pdfPages(out.bytes);
    const all = texts.join(' ');
    for (const word of ['Sales', 'Region', 'Revenue', 'Łódź', '1,234.50', '2023-03-15', 'Notes', 'no data']) expect(all).toContain(word);
  });
});

describe('PowerPoint to PDF', () => {
  it('makes one page per slide at the slide size, with the slide text', async () => {
    const out = await pptxToPdf(makePptx(3), loader);
    expect(out.slides).toBe(3);
    const { count, sizes, texts } = await pdfPages(out.bytes);
    expect(count).toBe(3);
    expect(sizes[0]).toEqual([720, 540]);
    expect(texts[0]).toContain('Slide 1 title');
    expect(texts[1]).toContain('Body text of slide 2');
    expect(texts[2]).toContain('Привіт');
    expect(out.skippedImages).toBe(0);
  });

  it('rejects non-presentations', async () => {
    await expect(pptxToPdf(makeDocx(), loader)).rejects.toThrow(/not a PowerPoint/);
    await expect(pptxToPdf(new Uint8Array([1, 2, 3, 4]), loader)).rejects.toThrow(OfficeError);
  });
});
