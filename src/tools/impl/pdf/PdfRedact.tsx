import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Field, NumberField, SelectField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage } from '@/lib/format';
import { useTask } from '@/lib/hooks';
import { renderPageAsJpeg } from '@/lib/pdfFlatten';
import { PdfError } from '@/lib/pdfOps';
import { buildMatchers, countBoxes, findTextBoxes, redactPdf, type PositionedText, type RedactBox, type RedactPlan } from '@/lib/pdfRedact';
import { destroyPdf, openPdf, renderPageToWidth } from '@/lib/pdfjs';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const PREVIEW_PX = 760;
const MIN_DRAW = 0.01;
const MAX_SEARCH_PAGES = 100;

type UiBox = RedactBox & { label: string };
type UiPlan = Record<number, UiBox[]>;

const QUALITY = [
  { value: '150', label: 'Standard (150 DPI)' },
  { value: '200', label: 'High (200 DPI, larger file)' },
  { value: '110', label: 'Small file (110 DPI)' },
] as const;

interface Outcome {
  blob: Blob;
  pages: number;
  areas: number;
  /** Search terms that still appear in the text of the new file. */
  leftovers: string[];
  redactedHaveNoText: boolean;
}

const contains = (a: RedactBox, b: RedactBox) => {
  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  return cx >= a.x && cx <= a.x + a.w && cy >= a.y && cy <= a.y + a.h;
};

function Redactor({ bytes, name, pageCount, onReset }: { bytes: Uint8Array; name: string; pageCount: number; onReset: () => void }) {
  const task = useTask<Outcome>();
  const running = task.state.status === 'running';
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState<number | ''>(1);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [plan, setPlan] = useState<UiPlan>({});
  const [draft, setDraft] = useState<RedactBox | null>(null);
  const [terms, setTerms] = useState('');
  const [emails, setEmails] = useState(false);
  const [phones, setPhones] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [findMessage, setFindMessage] = useState<string | null>(null);
  const [finding, setFinding] = useState(false);
  const [dpi, setDpi] = useState<'150' | '200' | '110'>('150');
  const [keepProperties, setKeepProperties] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const draftRef = useRef<RedactBox | null>(null);

  useEffect(() => {
    let cancelled = false;
    let opened: PDFDocumentProxy | null = null;
    openPdf(bytes)
      .then((d) => {
        if (cancelled) return destroyPdf(d);
        opened = d;
        setDoc(d);
      })
      .catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
      if (opened) void destroyPdf(opened);
    };
  }, [bytes]);

  const shown = Math.min(pageCount, Math.max(1, Number(previewPage) || 1));
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;
    let cancelled = false;
    setSize(null);
    renderPageToWidth(doc, shown, PREVIEW_PX, canvas)
      .then((s) => !cancelled && setSize(s))
      .catch((e) => !cancelled && setLoadError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [doc, shown]);

  // Anything done to the plan makes an earlier result out of date.
  const { reset: resetTask } = task;
  useEffect(() => resetTask(), [plan, dpi, keepProperties, resetTask]);

  const setDraftBox = (b: RedactBox | null) => {
    draftRef.current = b;
    setDraft(b);
  };
  const toFraction = (e: PointerEvent) => {
    const r = layerRef.current!.getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) };
  };
  const down = (e: PointerEvent) => {
    if (!size || running) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = toFraction(e);
    setDraftBox({ ...start.current, w: 0, h: 0 });
  };
  const move = (e: PointerEvent) => {
    if (!start.current) return;
    const p = toFraction(e);
    setDraftBox({ x: Math.min(start.current.x, p.x), y: Math.min(start.current.y, p.y), w: Math.abs(p.x - start.current.x), h: Math.abs(p.y - start.current.y) });
  };
  const up = () => {
    const box = draftRef.current;
    if (box && box.w >= MIN_DRAW && box.h >= MIN_DRAW) setPlan((p) => ({ ...p, [shown]: [...(p[shown] ?? []), { ...box, label: 'Drawn box' }] }));
    start.current = null;
    setDraftBox(null);
  };

  const removeBox = (page: number, index: number) =>
    setPlan((p) => {
      const list = (p[page] ?? []).filter((_, i) => i !== index);
      const next = { ...p };
      if (list.length) next[page] = list;
      else delete next[page];
      return next;
    });

  const find = async (scope: 'page' | 'all') => {
    if (!doc) return;
    const matchers = buildMatchers({ terms: terms.split('\n'), emails, phones, longNumbers: numbers });
    if (matchers.length === 0) {
      setFindMessage('Type a word to search for, or tick one of the options.');
      return;
    }
    setFinding(true);
    setFindMessage(null);
    try {
      const pages = scope === 'page' ? [shown] : Array.from({ length: Math.min(pageCount, MAX_SEARCH_PAGES) }, (_, i) => i + 1);
      const additions: UiPlan = {};
      let found = 0;
      let blank = 0;
      for (const n of pages) {
        const page = await doc.getPage(n);
        try {
          const vp = page.getViewport({ scale: 1 });
          const content = await page.getTextContent();
          const items: PositionedText[] = [];
          for (const it of content.items) if ('str' in it) items.push({ str: it.str, transform: it.transform, width: it.width, height: it.height });
          if (items.every((i) => !i.str.trim())) blank++;
          for (const m of findTextBoxes(items, vp.transform, vp.width, vp.height, matchers)) {
            additions[n] = [...(additions[n] ?? []), { ...m.box, label: m.text }];
            found++;
          }
        } finally {
          page.cleanup();
        }
      }
      setPlan((current) => {
        const next: UiPlan = { ...current };
        for (const [key, boxes] of Object.entries(additions)) {
          const n = Number(key);
          const merged = [...(next[n] ?? [])];
          for (const b of boxes) if (!merged.some((m) => contains(m, b))) merged.push(b);
          next[n] = merged;
        }
        return next;
      });
      const extra = pages.length < pageCount && scope === 'all' ? ` Only the first ${MAX_SEARCH_PAGES} pages were searched.` : '';
      setFindMessage(
        (found > 0 ? `Marked ${found} match${found === 1 ? '' : 'es'}.` : 'No matches found.') +
          (blank > 0 ? ` ${blank} searched page${blank === 1 ? ' has' : 's have'} no selectable text (scans); draw boxes on ${blank === 1 ? 'it' : 'them'} by hand.` : '') +
          extra,
      );
    } catch (e) {
      setFindMessage(errorMessage(e));
    } finally {
      setFinding(false);
    }
  };

  const apply = () =>
    task.run(async (report) => {
      if (!doc) throw new PdfError('Wait for the document to finish loading.');
      const clean: RedactPlan = {};
      for (const [k, v] of Object.entries(plan)) clean[Number(k)] = v.map(({ x, y, w, h }) => ({ x, y, w, h }));
      const quality = Number(dpi) >= 200 ? 0.9 : 0.85;
      const out = await redactPdf(bytes, clean, (n, boxes) => renderPageAsJpeg(doc, n, Number(dpi), quality, boxes), {
        keepProperties,
        onProgress: (done, total) => report(done, total, `Processing page ${Math.min(done + 1, total)} of ${total}`),
      });

      // Check the new file: redacted pages must hold no text at all, and searched words must not appear anywhere.
      const check = await openPdf(out);
      const searched = terms.split('\n').map((t) => t.trim()).filter(Boolean);
      const leftovers = new Set<string>();
      let redactedHaveNoText = true;
      try {
        for (let n = 1; n <= check.numPages; n++) {
          const page = await check.getPage(n);
          const text = (await page.getTextContent()).items.map((i) => ('str' in i ? i.str : '')).join(' ');
          page.cleanup();
          if (plan[n] && text.trim()) redactedHaveNoText = false;
          for (const t of searched) if (text.toLowerCase().includes(t.toLowerCase())) leftovers.add(`${t} (page ${n})`);
        }
      } finally {
        await destroyPdf(check);
      }
      return {
        blob: new Blob([out as BlobPart], { type: 'application/pdf' }),
        pages: Object.keys(plan).length,
        areas: countBoxes(clean),
        leftovers: [...leftovers],
        redactedHaveNoText,
      };
    });

  if (loadError) return <ErrorMessage>{loadError}</ErrorMessage>;

  const here = plan[shown] ?? [];
  const totalAreas = countBoxes(plan);
  const pagesWithBoxes = Object.keys(plan).map(Number).sort((a, b) => a - b);
  const boxView = (b: RedactBox, key: string, label: string, dashed = false) => (
    <div key={key} className="region-box redact-box" data-draft={dashed || undefined} style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, width: `${b.w * 100}%`, height: `${b.h * 100}%` }}>
      <span>{label}</span>
    </div>
  );
  const done = task.state.status === 'done' ? task.state.result : null;

  return (
    <div className="stack">
      <Notice tone="warn">
        <strong>Redacted pages become pictures.</strong> The text underneath is destroyed, but those pages can no longer be selected or searched. Pages without redactions are kept as they are. Review the result before you share it.
      </Notice>

      <div className="options-grid">
        <NumberField label={`Page (1–${pageCount})`} value={previewPage} min={1} max={pageCount} onChange={setPreviewPage} disabled={running} />
      </div>
      <div className="preview-box" style={{ background: 'var(--bg-sunken)', padding: 'var(--space-4)' }}>
        <div className="region-stage">
          <canvas ref={canvasRef} role="img" aria-label={`Page ${shown}. Draw boxes on the page to choose what to black out.`} />
          {size && (
            <div ref={layerRef} className="region-layer" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-hidden="true">
              {here.map((b, i) => boxView(b, `b${i}`, String(i + 1)))}
              {draft && boxView(draft, 'draft', '', true)}
            </div>
          )}
        </div>
      </div>
      {!size && <ProcessingState label="Rendering page…" />}
      <p className="hint">Drag on the page to draw a box over what must disappear. The boxes turn solid black in the result.</p>

      <section className="stack-sm" aria-label="Find text to redact">
        <h3 className="redact-heading">Find and mark text automatically</h3>
        <Field label="Words or phrases (one per line)" hint="Matches inside a single line of text are marked. Check every page afterwards.">
          {(id) => <textarea id={id} className="textarea" rows={3} value={terms} placeholder={'Jane Doe\n4111 1111 1111 1111'} onChange={(e) => setTerms(e.target.value)} disabled={running} />}
        </Field>
        <div className="row" style={{ gap: 20 }}>
          <CheckField label="Email addresses" checked={emails} onChange={setEmails} disabled={running} />
          <CheckField label="Phone numbers" checked={phones} onChange={setPhones} disabled={running} />
          <CheckField label="Long numbers (9+ digits)" checked={numbers} onChange={setNumbers} disabled={running} />
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-secondary" onClick={() => void find('page')} disabled={running || finding || !doc}>
            Find on this page
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => void find('all')} disabled={running || finding || !doc}>
            Find on all pages
          </button>
        </div>
        {finding && <ProcessingState label="Searching…" />}
        {findMessage && <p className="hint" role="status">{findMessage}</p>}
      </section>

      <section className="stack-sm" aria-label="Areas to redact">
        <div className="row row-between">
          <span className="label">
            Areas to redact: {totalAreas} on {pagesWithBoxes.length} page{pagesWithBoxes.length === 1 ? '' : 's'}
          </span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPlan({})} disabled={running || totalAreas === 0}>
            Clear all
          </button>
        </div>
        {pagesWithBoxes.length > 0 && (
          <div className="chip-row">
            {pagesWithBoxes.map((n) => (
              <button key={n} type="button" className={`chip-check${n === shown ? ' is-on' : ''}`} onClick={() => setPreviewPage(n)} aria-label={`Go to page ${n}, ${plan[n].length} areas`}>
                Page {n} · {plan[n].length}
              </button>
            ))}
          </div>
        )}
        {here.length === 0 ? (
          <p className="hint">Nothing marked on page {shown} yet.</p>
        ) : (
          <ul className="region-list">
            {here.map((b, i) => (
              <li key={i} className="redact-row">
                <strong>#{i + 1}</strong>
                <span className="redact-label">{b.label}</span>
                <button type="button" className="icon-btn" aria-label={`Remove area ${i + 1} on page ${shown}`} onClick={() => removeBox(shown, i)} disabled={running}>
                  <Icon name="trash" size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="options-grid">
        <SelectField label="Quality of redacted pages" value={dpi} onChange={setDpi} options={[...QUALITY]} />
      </div>
      <CheckField label="Keep document properties (title, author…)" checked={keepProperties} onChange={setKeepProperties} disabled={running} />
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={apply} disabled={running || totalAreas === 0 || !doc}>
          <Icon name="redact" size={18} />
          Apply redactions
        </button>
      </div>
      {running && <ProcessingState label="Redacting…" progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {done && (
        <>
          {done.leftovers.length > 0 ? (
            <Notice tone="warn">
              <strong>Not everything you searched for was marked.</strong> These still appear in the text: {done.leftovers.slice(0, 8).join(', ')}
              {done.leftovers.length > 8 ? '…' : ''}. Go back, mark them, and apply again.
            </Notice>
          ) : (
            <Notice tone="success">
              {done.redactedHaveNoText ? `Checked: the ${done.pages} redacted page${done.pages === 1 ? '' : 's'} now contain no text at all` : 'The redacted pages still contain some text, so do not share this file'}
              {terms.trim() && done.redactedHaveNoText ? ', and none of your search words appear anywhere in the file.' : '.'}
            </Notice>
          )}
          <PdfResult blob={done.blob} name={`${baseName(name)}-redacted.pdf`} onReset={onReset} note={`${done.areas} areas on ${done.pages} pages redacted`} />
        </>
      )}
    </div>
  );
}

const PdfRedact: ToolImplementation = () => {
  const { pdf } = usePdfTool();
  return (
    <PdfSource pdf={pdf}>
      {(ready) => <Redactor key={`${ready.file.name}-${ready.file.size}-${ready.file.lastModified}`} bytes={ready.bytes} name={ready.file.name} pageCount={ready.pageCount} onReset={pdf.reset} />}
    </PdfSource>
  );
};

export default PdfRedact;
