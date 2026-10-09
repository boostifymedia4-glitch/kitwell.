import { useEffect, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage, ProcessingState } from '@/components/tool/Feedback';
import { PdfSource } from '@/components/tool/PdfSource';
import { formatBytes, errorMessage } from '@/lib/format';
import { readMetadata, type PdfMetadata as Meta } from '@/lib/pdfOps';
import { usePdfFile } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
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

const fmtDate = (d: Date | undefined, locale: string) => (d ? d.toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' }) : undefined);

function MetaTable({ meta, name }: { meta: Meta; name: string }) {
  const { t, lang } = useI18n();
  const rows: [string, string | undefined][] = [
    [t('pdfMetadata.fileName'), name],
    [t('pdfMetadata.fileSize'), formatBytes(meta.fileSize)],
    [t('pdfMetadata.title'), meta.title],
    [t('pdfMetadata.author'), meta.author],
    [t('pdfMetadata.subject'), meta.subject],
    [t('pdfMetadata.keywords'), meta.keywords],
    [t('pdfMetadata.creator'), meta.creator],
    [t('pdfMetadata.producer'), meta.producer],
    [t('pdfMetadata.created'), fmtDate(meta.created, lang.code)],
    [t('pdfMetadata.modified'), fmtDate(meta.modified, lang.code)],
    [t('pdfMetadata.version'), meta.version],
    [t('pdfMetadata.pages'), String(meta.pageCount)],
    [t('pdfMetadata.encrypted'), t('pdfMetadata.no')],
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
              <td>{v ?? <span className="subtle">{t('pdfMetadata.notSet')}</span>}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">{t('pdfMetadata.pageSizes')}</th>
            <td>
              {meta.pageSizes.slice(0, 10).map((s) => (
                <div key={`${s.width}x${s.height}`}>
                  {describeSize(s.width, s.height)} — {t('pdfMetadata.pageCount', { count: s.count })}
                </div>
              ))}
              {meta.pageSizes.length > 10 && <div className="subtle">{t('pdfMetadata.moreSizes', { count: meta.pageSizes.length - 10 })}</div>}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="toolbar">
        <CopyButton text={json} label={t('pdfMetadata.copyJson')} />
      </div>
    </div>
  );
}

const PdfMetadata: ToolImplementation = () => {
  const pdf = usePdfFile();
  return <PdfSource pdf={pdf}>{(ready) => <MetaLoader bytes={ready.bytes} name={ready.file.name} />}</PdfSource>;
};

function MetaLoader({ bytes, name }: { bytes: Uint8Array; name: string }) {
  const { t } = useI18n();
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
  if (!meta) return <ProcessingState label={t('pdfMetadata.reading')} />;
  return <MetaTable meta={meta} name={name} />;
}

export default PdfMetadata;
