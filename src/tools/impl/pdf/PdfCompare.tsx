import { useEffect, useMemo, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { DownloadButton, ResetButton } from '@/components/tool/Results';
import { Stats } from '@/components/tool/TextIO';
import { Icon } from '@/components/Icon';
import { errorMessage } from '@/lib/format';
import { compareDocuments, pixelDiff, textReport, withContext, type CompareOptions, type PageTextDiff, type PageStatus } from '@/lib/pdfCompare';
import { destroyPdf, openPdf, renderPageToWidth } from '@/lib/pdfjs';
import { itemsToText, type TextItemLike } from '@/lib/pdfText';
import { usePdfFile } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const MAX_PAGES = 100;
const VISUAL_WIDTH = 640;

const STATUS_LABEL: Record<PageStatus, string> = { same: 'Identical', changed: 'Changed', added: 'Only in revised', removed: 'Only in original' };

async function pageTexts(doc: PDFDocumentProxy, limit: number): Promise<string[]> {
  const out: string[] = [];
  for (let n = 1; n <= Math.min(doc.numPages, limit); n++) {
    const page = await doc.getPage(n);
    try {
      out.push(itemsToText((await page.getTextContent()).items as TextItemLike[]));
    } finally {
      page.cleanup();
    }
  }
  return out;
}

interface Loaded {
  docA: PDFDocumentProxy;
  docB: PDFDocumentProxy;
  textsA: string[];
  textsB: string[];
}

function Comparison({ bytesA, bytesB, nameA, nameB, onReset }: { bytesA: Uint8Array; bytesB: Uint8Array; nameA: string; nameB: string; onReset: () => void }) {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<CompareOptions>({ ignoreCase: false, ignoreWhitespace: true });
  const [onlyChanged, setOnlyChanged] = useState(true);
  const [selected, setSelected] = useState(1);
  const [view, setView] = useState<'text' | 'visual'>('text');
  const [layer, setLayer] = useState<'diff' | 'a' | 'b'>('diff');
  const [visual, setVisual] = useState<{ percent: number; note: string | null } | null>(null);
  const [visualBusy, setVisualBusy] = useState(false);
  const refA = useRef<HTMLCanvasElement>(null);
  const refB = useRef<HTMLCanvasElement>(null);
  const refDiff = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const opened: PDFDocumentProxy[] = [];
    (async () => {
      const docA = await openPdf(bytesA);
      opened.push(docA);
      const docB = await openPdf(bytesB);
      opened.push(docB);
      const [textsA, textsB] = [await pageTexts(docA, MAX_PAGES), await pageTexts(docB, MAX_PAGES)];
      if (cancelled) return;
      setLoaded({ docA, docB, textsA, textsB });
    })().catch((e) => !cancelled && setError(errorMessage(e)));
    return () => {
      cancelled = true;
      opened.forEach((d) => void destroyPdf(d));
    };
  }, [bytesA, bytesB]);

  const result = useMemo(() => (loaded ? compareDocuments(loaded.textsA, loaded.textsB, options) : null), [loaded, options]);

  const pages = result?.pages ?? [];
  const visiblePages = onlyChanged && result && result.totals.changedPages + result.totals.addedPages + result.totals.removedPages > 0 ? pages.filter((p) => p.status !== 'same') : pages;
  const current: PageTextDiff | undefined = pages.find((p) => p.page === selected) ?? visiblePages[0];

  // Pick the first changed page when results arrive.
  useEffect(() => {
    if (!result) return;
    const first = result.pages.find((p) => p.status !== 'same');
    setSelected(first?.page ?? 1);
  }, [result?.totals.pagesA, result?.totals.pagesB, loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Visual comparison of the selected page, drawn on demand.
  useEffect(() => {
    if (view !== 'visual' || !loaded || !current) return;
    let cancelled = false;
    setVisualBusy(true);
    setVisual(null);
    (async () => {
      const { docA, docB } = loaded;
      const a = refA.current;
      const b = refB.current;
      const d = refDiff.current;
      if (!a || !b || !d) return;
      const hasA = current.page <= Math.min(docA.numPages, MAX_PAGES);
      const hasB = current.page <= Math.min(docB.numPages, MAX_PAGES);
      for (const c of [a, b, d]) {
        c.width = 1;
        c.height = 1;
      }
      if (!hasA || !hasB) {
        const only = hasA ? { doc: docA, c: a } : { doc: docB, c: b };
        await renderPageToWidth(only.doc, current.page, VISUAL_WIDTH, only.c);
        if (!cancelled) setVisual({ percent: 100, note: hasA ? 'This page exists only in the original file.' : 'This page exists only in the revised file.' });
        return;
      }
      const size = await renderPageToWidth(docA, current.page, VISUAL_WIDTH, a);
      const temp = document.createElement('canvas');
      const sizeB = await renderPageToWidth(docB, current.page, VISUAL_WIDTH, temp);
      b.width = size.w;
      b.height = size.h;
      const bctx = b.getContext('2d', { willReadFrequently: true });
      const actx = a.getContext('2d', { willReadFrequently: true });
      if (!bctx || !actx) return;
      bctx.fillStyle = '#fff';
      bctx.fillRect(0, 0, size.w, size.h);
      bctx.drawImage(temp, 0, 0, size.w, size.h);
      const dataA = actx.getImageData(0, 0, size.w, size.h);
      const dataB = bctx.getImageData(0, 0, size.w, size.h);
      const diff = pixelDiff(dataA.data, dataB.data, size.w, size.h);
      d.width = size.w;
      d.height = size.h;
      d.getContext('2d')?.putImageData(new ImageData(diff.overlay as Uint8ClampedArray<ArrayBuffer>, size.w, size.h), 0, 0);
      const sameShape = Math.abs(sizeB.h / sizeB.w - size.h / size.w) < 0.01;
      if (!cancelled) setVisual({ percent: diff.percent, note: sameShape ? null : 'The two pages have different sizes, so the revised page was stretched to fit before comparing.' });
    })()
      .catch((e) => !cancelled && setError(errorMessage(e)))
      .finally(() => !cancelled && setVisualBusy(false));
    return () => {
      cancelled = true;
    };
  }, [view, loaded, current?.page]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!loaded || !result) return <ProcessingState label="Reading both PDFs…" />;

  const t = result.totals;
  const differences = t.changedPages + t.addedPages + t.removedPages;
  const scannedBoth = result.pages.every((p) => p.noText);
  const truncated = Math.max(loaded.docA.numPages, loaded.docB.numPages) > MAX_PAGES;
  const report = textReport(nameA, nameB, result);

  return (
    <div className="stack">
      {truncated && <Notice tone="warn">Only the first {MAX_PAGES} pages of each file were compared.</Notice>}
      <Stats
        items={[
          { label: 'Pages changed', value: t.changedPages },
          { label: 'Pages identical', value: t.identicalPages },
          { label: 'Words added', value: t.addedWords },
          { label: 'Words removed', value: t.removedWords },
        ]}
      />
      {t.pagesA !== t.pagesB && (
        <Notice tone="info">
          The original has {loaded.docA.numPages} pages and the revised file has {loaded.docB.numPages}. Pages are compared by number.
        </Notice>
      )}
      {scannedBoth && (
        <Notice tone="warn">
          Neither file has selectable text (they look like scans), so there is no text to compare. Use the visual comparison, or run OCR PDF on both files first.
        </Notice>
      )}
      {differences === 0 && !scannedBoth && <Notice tone="success">No differences in the text were found. Check the visual view for layout or image changes.</Notice>}

      <div className="options-grid">
        <CheckField label="Ignore upper/lower case" checked={options.ignoreCase} onChange={(v) => setOptions((o) => ({ ...o, ignoreCase: v }))} />
        <CheckField label="Ignore differences in spacing and line breaks" checked={options.ignoreWhitespace} onChange={(v) => setOptions((o) => ({ ...o, ignoreWhitespace: v }))} />
        <CheckField label="Show only pages with changes" checked={onlyChanged} onChange={setOnlyChanged} />
      </div>

      <div className="compare-layout">
        <nav aria-label="Pages" className="compare-pages">
          <ul>
            {visiblePages.map((p) => (
              <li key={p.page}>
                <button type="button" className="compare-page" aria-current={current?.page === p.page ? 'true' : undefined} onClick={() => setSelected(p.page)}>
                  <strong>Page {p.page}</strong>
                  <span className={`badge badge-${p.status}`}>{STATUS_LABEL[p.status]}</span>
                  {(p.addedWords > 0 || p.removedWords > 0) && (
                    <small>
                      +{p.addedWords} −{p.removedWords} words
                    </small>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <section className="compare-detail" aria-label={current ? `Page ${current.page} comparison` : 'Comparison'}>
          <Segmented
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: 'text', label: 'Text changes' },
              { value: 'visual', label: 'Visual changes' },
            ]}
          />
          {current && view === 'text' && (
            <div className="compare-text" tabIndex={0} role="region" aria-label={`Text changes on page ${current.page}`}>
              {current.noText ? (
                <p className="muted">This page has no selectable text.</p>
              ) : current.status === 'same' ? (
                <p className="muted">The text on this page is identical.</p>
              ) : (
                <p>
                  {withContext(current.parts, 10).map((part, i, all) =>
                    part.type === 'added' ? (
                      <ins key={i}>{part.text}</ins>
                    ) : part.type === 'removed' ? (
                      <span key={i}>
                        <del>{part.text}</del>
                        {all[i + 1]?.type === 'added' ? ' ' : null}
                      </span>
                    ) : part.type === 'gap' ? (
                      <span key={i} className="muted">
                        {part.text}
                      </span>
                    ) : (
                      <span key={i}>{part.text}</span>
                    ),
                  )}
                </p>
              )}
              <p className="hint">
                <ins>Green</ins> was added in the revised file, <del>red</del> was removed from the original.
              </p>
            </div>
          )}
          <div hidden={view !== 'visual'}>
            <Segmented
              label="Show"
              value={layer}
              onChange={setLayer}
              options={[
                { value: 'diff', label: 'Differences' },
                { value: 'a', label: 'Original' },
                { value: 'b', label: 'Revised' },
              ]}
            />
            {visualBusy && <ProcessingState label="Comparing pages…" />}
            {visual && (
              <p className="hint" role="status">
                {visual.percent === 0 ? 'No visible differences on this page.' : `${visual.percent}% of this page looks different.`} {visual.note}
              </p>
            )}
            <div className="compare-canvases">
              <canvas ref={refDiff} hidden={layer !== 'diff'} role="img" aria-label="Differences highlighted in red" />
              <canvas ref={refA} hidden={layer !== 'a'} role="img" aria-label="Original page" />
              <canvas ref={refB} hidden={layer !== 'b'} role="img" aria-label="Revised page" />
            </div>
          </div>
        </section>
      </div>

      <div className="toolbar">
        <DownloadButton blob={new Blob([report], { type: 'text/plain;charset=utf-8' })} name="pdf-comparison.txt" label="Download text report" variant="secondary" />
        <ResetButton onClick={onReset} label="Compare other files" />
      </div>
    </div>
  );
}

const PdfCompare: ToolImplementation = () => {
  const a = usePdfFile();
  const b = usePdfFile();
  const [started, setStarted] = useState<{ a: Uint8Array; b: Uint8Array; nameA: string; nameB: string } | null>(null);

  const readyA = a.state.status === 'ready' ? a.state : null;
  const readyB = b.state.status === 'ready' ? b.state : null;
  // Choosing a different file makes an earlier comparison out of date.
  useEffect(() => setStarted(null), [readyA?.file, readyB?.file]);

  const resetAll = () => {
    setStarted(null);
    a.reset();
    b.reset();
  };

  return (
    <div className="stack">
      <div className="compare-sources">
        <div className="stack-sm">
          <h3 className="compare-label">1. Original PDF</h3>
          <PdfSource pdf={a}>{() => null}</PdfSource>
        </div>
        <div className="stack-sm">
          <h3 className="compare-label">2. Revised PDF</h3>
          <PdfSource pdf={b}>{() => null}</PdfSource>
        </div>
      </div>
      {readyA && readyB && !started && (
        <div className="toolbar">
          <button type="button" className="btn btn-primary btn-lg" onClick={() => setStarted({ a: readyA.bytes, b: readyB.bytes, nameA: readyA.file.name, nameB: readyB.file.name })}>
            <Icon name="git-compare" size={18} />
            Compare PDFs
          </button>
        </div>
      )}
      {started && <Comparison bytesA={started.a} bytesB={started.b} nameA={started.nameA} nameB={started.nameB} onReset={resetAll} />}
    </div>
  );
};

export default PdfCompare;
