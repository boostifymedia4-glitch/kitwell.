import { describe, expect, it } from 'vitest';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { buildPdf, type Block } from '../src/lib/docPdf';
import { pagesToMarkdown, pdfToMarkdown } from '../src/lib/pdfMarkdown';
import { nodeFontLoader } from './helpers/pdfTestUtils';

const p = (text: string): Block => ({ type: 'paragraph', runs: [{ text }] });
const options = { removeRepeated: true, pageSeparators: false };

async function convert(blocks: Block[], opts = options) {
  const { bytes } = await buildPdf(blocks, { loader: nodeFontLoader });
  const doc = (await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true }).promise) as unknown as PDFDocumentProxy;
  try {
    return await pdfToMarkdown(doc, opts);
  } finally {
    await doc.loadingTask.destroy();
  }
}

describe('PDF to Markdown', () => {
  it('rebuilds headings, paragraphs and lists from a real PDF', async () => {
    const out = await convert([
      { type: 'heading', level: 1, runs: [{ text: 'Annual Report' }] },
      p('This is the first paragraph of the report and it is long enough to wrap onto a second line of the page when laid out.'),
      { type: 'heading', level: 2, runs: [{ text: 'Highlights' }] },
      { type: 'list', items: [{ runs: [{ text: 'Revenue grew' }], level: 0 }, { runs: [{ text: 'Costs fell' }], level: 0 }] },
      { type: 'list', items: [{ runs: [{ text: 'Plan' }], level: 0, marker: '1.' }, { runs: [{ text: 'Build' }], level: 0, marker: '2.' }] },
      p('Closing paragraph.'),
    ]);
    expect(out.markdown).toContain('# Annual Report');
    expect(out.markdown).toContain('## Highlights');
    expect(out.markdown).toMatch(/first paragraph of the report and it is long enough to wrap onto a second line/);
    expect(out.markdown).toMatch(/- Revenue grew\n- Costs fell/);
    expect(out.markdown).toMatch(/1\. Plan\n2\. Build/);
    expect(out.markdown).toContain('Closing paragraph.');
    expect(out.headings).toBe(2);
    expect(out.listItems).toBe(4);
    expect(out.pagesWithText).toBe(1);
  });

  it('keeps paragraphs apart and joins wrapped lines into one paragraph', async () => {
    const out = await convert([p('Alpha beta gamma delta '.repeat(14).trim()), p('Second paragraph here.')]);
    const paras = out.markdown.trim().split('\n\n');
    expect(paras).toHaveLength(2);
    expect(paras[0]).not.toContain('\n');
    expect(paras[1]).toBe('Second paragraph here.');
  });

  it('reports a PDF without text as empty instead of inventing content', () => {
    const out = pagesToMarkdown([{ items: [], height: 800 }], options);
    expect(out.markdown).toBe('');
    expect(out.pagesWithText).toBe(0);
  });

  it('drops running headers, footers and page numbers that repeat on most pages', () => {
    const page = (n: number) => ({
      height: 800,
      items: [
        { str: 'ACME CONFIDENTIAL', transform: [10, 0, 0, 10, 50, 780], width: 90, height: 10 },
        { str: `Body text of page ${n} keeps its words.`, transform: [11, 0, 0, 11, 50, 400], width: 200, height: 11 },
        { str: `Page ${n}`, transform: [10, 0, 0, 10, 300, 20], width: 30, height: 10 },
      ],
    });
    const out = pagesToMarkdown([page(1), page(2), page(3), page(4)], options);
    expect(out.markdown).not.toContain('ACME');
    expect(out.markdown).not.toMatch(/Page \d\b(?! keeps)/);
    expect(out.markdown).toContain('Body text of page 3 keeps its words.');
    expect(out.removedRepeated).toBe(8);
    expect(pagesToMarkdown([page(1), page(2), page(3), page(4)], { ...options, removeRepeated: false }).markdown).toContain('ACME CONFIDENTIAL');
  });

  it('escapes Markdown characters in the text and can mark page breaks', () => {
    const items = (s: string) => ({ height: 800, items: [{ str: s, transform: [11, 0, 0, 11, 50, 400], width: 100, height: 11 }] });
    const out = pagesToMarkdown([items('2 * 3 = 6 and snake_case'), items('# not a heading')], { removeRepeated: false, pageSeparators: true });
    expect(out.markdown).toContain('2 \\* 3 = 6 and snake\\_case');
    expect(out.markdown).toContain('\\# not a heading');
    expect(out.markdown).toContain('---');
  });
});
