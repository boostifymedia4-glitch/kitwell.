import { useEffect, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { PdfSource } from '@/components/tool/PdfSource';
import { formatBytes, errorMessage } from '@/lib/format';
import { readMetadata, type PdfMetadata as Meta } from '@/lib/pdfOps';
import { usePdfFile } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const KNOWN: [string, number, number][] = [
  ['A4', 595.28, 841.89],
  ['A3', 841.89, 1190.55],
  ['A5', 419.53, 595.28],
  ['US Letter', 612, 792],
  ['US Legal', 612, 1008],
];

function describeSize(w: number, h: number): string {
  const [short, long] = w < h ? [w, h] : [h, w];
  const known = KNOWN.find(([, kw, kh]) => Math.abs(kw - short) < 2 && Math.abs(kh - long) < 2);
  const mm = `${Math.round((w / 72) * 25.4)} × ${Math.round((h / 72) * 25.4)} mm`;
  return `${known ? `${known[0]} · ` : ''}${w.toFixed(0)} × ${h.toFixed(0)} pt (${mm})`;
}

const fmtDate = (d?: Date) => (d ? d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : undefined);

function MetaTable({ meta, name }: { meta: Meta; name: string }) {
  const rows: [string, string | undefined][] = [
    ['File name', name],
    ['File size', formatBytes(meta.fileSize)],
    ['Title', meta.title],
    ['Author', meta.author],
    ['Subject', meta.subject],
    ['Keywords', meta.keywords],
    ['Creator (application)', meta.creator],
    ['Producer (PDF library)', meta.producer],
    ['Created', fmtDate(meta.created)],
    ['Modified', fmtDate(meta.modified)],
    ['PDF version', meta.version],
    ['Pages', String(meta.pageCount)],
    ['Encrypted', 'No'],
  ];
  const json = JSON.stringify(
    {
      fileName: name,
      fileSizeBytes: meta.fileSize,
      title: meta.title ?? null,
      author: meta.author ?? null,
      subject: meta.subject ?? null,
      keywords: meta.keywords ?? null,
      creator: meta.creator ?? null,
      producer: meta.producer ?? null,
      created: meta.created?.toISOString() ?? null,
      modified: meta.modified?.toISOString() ?? null,
      pdfVersion: meta.version ?? null,
      pageCount: meta.pageCount,
      pageSizes: meta.pageSizes.map((s) => ({ widthPt: s.width, heightPt: s.height, pages: s.count })),
    },
    null,
    2,
  );
  return (
    <div className="stack">
      <table className="table">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v ?? <span className="subtle">Not set</span>}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Page sizes</th>
            <td>
              {meta.pageSizes.slice(0, 10).map((s) => (
                <div key={`${s.width}x${s.height}`}>
                  {describeSize(s.width, s.height)} — {s.count} {s.count === 1 ? 'page' : 'pages'}
                </div>
              ))}
              {meta.pageSizes.length > 10 && <div className="subtle">…and {meta.pageSizes.length - 10} more sizes</div>}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="toolbar">
        <CopyButton text={json} label="Copy as JSON" />
      </div>
    </div>
  );
}

const PdfMetadata: ToolImplementation = () => {
  const pdf = usePdfFile();
  return <PdfSource pdf={pdf}>{(ready) => <MetaLoader bytes={ready.bytes} name={ready.file.name} />}</PdfSource>;
};

function MetaLoader({ bytes, name }: { bytes: Uint8Array; name: string }) {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setMeta(null);
    setError(null);
    readMetadata(bytes)
      .then((m) => !cancelled && setMeta(m))
      .catch((e) => !cancelled && setError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [bytes]);
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!meta) return <ProcessingState label="Reading metadata…" />;
  return <MetaTable meta={meta} name={name} />;
}

export default PdfMetadata;
