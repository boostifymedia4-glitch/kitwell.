import type { ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { formatBytes } from '@/lib/format';
import { PDF_RULES, type usePdfFile } from '@/lib/usePdfFile';
import { Icon } from '../Icon';
import { ErrorMessage, ProcessingState, RejectionList } from './Feedback';
import { UploadDropzone } from './UploadDropzone';

type PdfHandle = ReturnType<typeof usePdfFile>;

/** Dropzone -> loading -> file summary flow shared by all single-PDF tools. */
export function PdfSource({ pdf, children }: { pdf: PdfHandle; children: (ready: Extract<PdfHandle['state'], { status: 'ready' }>) => ReactNode }) {
  const { state } = pdf;
  const { t } = useI18n();
  return (
    <div className="stack">
      {(state.status === 'empty' || state.status === 'error') && (
        <UploadDropzone extensions={PDF_RULES.extensions} maxBytes={PDF_RULES.maxBytes} onFiles={pdf.load} title={t('ui.pdfDrop')} />
      )}
      <RejectionList items={pdf.rejections} onDismiss={() => pdf.load([])} />
      {state.status === 'error' && <ErrorMessage>{state.message}</ErrorMessage>}
      {state.status === 'loading' && <ProcessingState label={t('ui.readingFile', { name: state.name })} />}
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
                {formatBytes(state.file.size)} · {t('ui.pages', { count: state.pageCount })}
              </div>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={pdf.reset}>
              {t('ui.chooseAnotherPdf')}
            </button>
          </div>
          {children(state)}
        </>
      )}
    </div>
  );
}
