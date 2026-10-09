import { useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { Segmented } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName, formatBytes } from '@/lib/format';
import { browserJpegEncoder } from '@/lib/jpegRecompress';
import { LEVELS, compressPdfImages, savedPercent, type CompressLevel, type CompressReport } from '@/lib/pdfCompress';
import { pdfFromPageImages, renderPageAsJpeg, type RenderedPage } from '@/lib/pdfFlatten';
import { PdfError } from '@/lib/pdfOps';
import { destroyPdf, openPdf } from '@/lib/pdfjs';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

type Mode = 'images' | 'flatten';

interface Result {
  blob: Blob;
  originalSize: number;
  mode: Mode;
  report?: CompressReport;
  pages?: number;
}

const MAX_FLATTEN_PAGES = 300;

const PdfCompress: ToolImplementation = () => {
  const { pdf, task, reset, running } = usePdfTool<Result>();
  const [mode, setMode] = useState<Mode>('images');
  const [level, setLevel] = useState<CompressLevel>('recommended');

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async (report) => {
            if (mode === 'images') {
              const { bytes, report: stats } = await compressPdfImages(ready.bytes, level, browserJpegEncoder, (done, total) => report(done, total, `Recompressing images (${done} of ${total})`));
              return { blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), originalSize: ready.bytes.length, mode, report: stats };
            }
            if (ready.pageCount > MAX_FLATTEN_PAGES) throw new PdfError(`Maximum mode handles up to ${MAX_FLATTEN_PAGES} pages. Split the PDF first or use the standard mode.`);
            const doc = await openPdf(ready.bytes);
            try {
              const settings = LEVELS[level];
              const pages: RenderedPage[] = [];
              for (let n = 1; n <= ready.pageCount; n++) {
                report(n - 1, ready.pageCount, `Rendering page ${n} of ${ready.pageCount}`);
                pages.push(await renderPageAsJpeg(doc, n, settings.dpi, settings.quality));
                await new Promise((r) => setTimeout(r, 0));
              }
              report(ready.pageCount, ready.pageCount, 'Building the PDF');
              const bytes = await pdfFromPageImages(pages);
              return { blob: new Blob([bytes as BlobPart], { type: 'application/pdf' }), originalSize: ready.bytes.length, mode, pages: ready.pageCount };
            } finally {
              await destroyPdf(doc);
            }
          });

        const done = task.state.status === 'done' ? task.state.result : null;
        const saved = done ? savedPercent(done.originalSize, done.blob.size) : 0;
        const name = `${baseName(ready.file.name)}-compressed.pdf`;

        return (
          <>
            <Segmented
              label="Compression mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'images', label: 'Keep text (recommended)' },
                { value: 'flatten', label: 'Maximum (pages become images)' },
              ]}
            />
            {mode === 'images' ? (
              <Notice>Text, links and fonts are left untouched. Embedded JPEG images are recompressed and scaled down. PDFs without large photos cannot shrink much, and the tool says so.</Notice>
            ) : (
              <Notice tone="warn">
                <strong>Quality loss.</strong> Every page is turned into a picture. You will no longer be able to select, search or copy text, and links and form fields stop working. Choose this for scans, or when size matters more than text.
              </Notice>
            )}
            <Segmented label="Strength" value={level} onChange={setLevel} options={(Object.keys(LEVELS) as CompressLevel[]).map((k) => ({ value: k, label: LEVELS[k].label }))} />
            <p className="hint">
              {LEVELS[level].summary}
              {mode === 'flatten' ? `. Pages are rendered at ${LEVELS[level].dpi} DPI.` : `. Images are limited to ${LEVELS[level].maxSide} px on the long side and saved at ${Math.round(LEVELS[level].quality * 100)}% quality.`}
            </p>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running}>
                <Icon name="file-archive" size={18} />
                Compress PDF
              </button>
            </div>
            {running && <ProcessingState label="Compressing…" progress={task.progress} />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {done && (
              <ResultPanel title={saved > 0 ? 'Your PDF is smaller' : 'This PDF could not be made smaller'}>
                <p>
                  <strong>{formatBytes(done.originalSize)}</strong> → <strong>{formatBytes(done.blob.size)}</strong>
                  {saved > 0 ? ` (${saved}% smaller)` : saved < 0 ? ` (${Math.abs(saved)}% larger)` : ' (no change)'}
                </p>
                {done.report && (
                  <p className="muted">
                    {done.report.imagesFound === 0
                      ? 'No JPEG images were found to recompress; the PDF is mostly text or vector content.'
                      : `${done.report.imagesRecompressed} of ${done.report.imagesFound} JPEG images were recompressed.`}
                    {done.report.imagesSkipped > 0 ? ` ${done.report.imagesSkipped} other images (other formats, grayscale or CMYK) were left as they are.` : ''}
                  </p>
                )}
                {done.mode === 'flatten' && <p className="muted">All {done.pages} pages are pictures now; text can no longer be selected.</p>}
                {saved <= 0 && (
                  <Notice tone="warn">
                    {done.mode === 'images'
                      ? 'Your original is already well optimised. Try a stronger setting, or Maximum mode if you do not need selectable text.'
                      : 'The picture version is not smaller than the original. Keep your original, or try a stronger setting.'}
                  </Notice>
                )}
                <div className="toolbar">
                  <DownloadButton blob={done.blob} name={name} label={saved > 0 ? `Download ${name}` : 'Download anyway'} variant={saved > 0 ? 'primary' : 'secondary'} />
                  <ResetButton onClick={reset} />
                </div>
              </ResultPanel>
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfCompress;
