import type { ReactNode } from 'react';
import { formatBytes, plural } from '@/lib/format';
import { PDF_RULES, type usePdfFile } from '@/lib/usePdfFile';
import { Icon } from '../Icon';
import { ErrorMessage, ProcessingState, RejectionList } from './Feedback';
import { UploadDropzone } from './UploadDropzone';

type PdfHandle = ReturnType<typeof usePdfFile>;

/** Dropzone -> loading -> file summary flow shared by all single-PDF tools. */
export function PdfSource({ pdf, children }: { pdf: PdfHandle; children: (ready: Extract<PdfHandle['state'], { status: 'ready' }>) => ReactNode }) {
  const { state } = pdf;
  return (
    <div className="stack">
      {(state.status === 'empty' || state.status === 'error') && (
        <UploadDropzone extensions={PDF_RULES.extensions} maxBytes={PDF_RULES.maxBytes} onFiles={pdf.load} title="Drop a PDF here or click to choose" />
      )}
      <RejectionList items={pdf.rejections} onDismiss={() => pdf.load([])} />
      {state.status === 'error' && <ErrorMessage>{state.message}</ErrorMessage>}
      {state.status === 'loading' && <ProcessingState label={`Reading ${state.name}…`} />}
      {state.status === 'ready' && (
        <>
          <div className="file-item">
            <span className="file-thumb file-thumb-fallback">
              <Icon name="file-text" size={22} />
            </span>
            <div className="file-meta">
              <div className="file-name" title={state.file.name}>
                {state.file.name}
              </div>
              <div className="file-sub">
                {formatBytes(state.file.size)} · {plural(state.pageCount, 'page')}
              </div>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={pdf.reset}>
              Choose another PDF
            </button>
          </div>
          {children(state)}
        </>
      )}
    </div>
  );
}
