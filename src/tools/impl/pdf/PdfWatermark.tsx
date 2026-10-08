import { useEffect, useState } from 'react';
import { ErrorMessage, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { CheckField, ColorField, Field, NumberField, RangeField, Segmented, SelectField } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { MB } from '@/lib/files';
import { baseName, errorMessage, formatBytes } from '@/lib/format';
import { useFileQueue } from '@/lib/hooks';
import { addWatermark } from '@/lib/pdfEdit';
import { PdfError, parsePageList } from '@/lib/pdfOps';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

type Kind = 'text' | 'image';

/** PNG and JPEG are told apart by their first bytes, not by the file name. */
function imageType(bytes: Uint8Array): 'png' | 'jpg' | null {
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'png';
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg';
  return null;
}

const PdfWatermark: ToolImplementation = () => {
  const { pdf, task, reset, running } = usePdfTool();
  const logo = useFileQueue({ extensions: ['png', 'jpg', 'jpeg'], maxBytes: 5 * MB, maxFiles: 1 }, false);
  const logoFile = logo.items[0]?.file ?? null;
  const [kind, setKind] = useState<Kind>('text');
  const [text, setText] = useState('CONFIDENTIAL');
  const [size, setSize] = useState(60);
  const [bold, setBold] = useState(true);
  const [color, setColor] = useState('#c2410c');
  const [scale, setScale] = useState(40);
  const [opacity, setOpacity] = useState(30);
  const [angle, setAngle] = useState<number | ''>(45);
  const [layout, setLayout] = useState<'center' | 'tile'>('center');
  const [pages, setPages] = useState('');

  // A page range typed for one PDF makes no sense for the next one.
  const current = pdf.state.status === 'ready' ? pdf.state.file : null;
  useEffect(() => setPages(''), [current]);

  const choose = (k: Kind) => {
    setKind(k);
    setAngle(k === 'text' ? 45 : 0);
  };

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async () => {
            let pageList: number[] | undefined;
            if (pages.trim()) {
              try {
                pageList = parsePageList(pages, ready.pageCount);
              } catch (e) {
                throw new PdfError(errorMessage(e));
              }
            }
            const common = { opacity: opacity / 100, angle: Number(angle) || 0, layout, pages: pageList };
            let out: Uint8Array;
            if (kind === 'text') {
              out = await addWatermark(ready.bytes, { ...common, mark: { kind: 'text', text, size, bold, color } });
            } else {
              if (!logoFile) throw new PdfError('Add the watermark image first.');
              const bytes = new Uint8Array(await logoFile.arrayBuffer());
              const type = imageType(bytes);
              if (!type) throw new PdfError('The watermark image must be a PNG or JPG file.');
              out = await addWatermark(ready.bytes, { ...common, mark: { kind: 'image', bytes, type, scale: scale / 100 } });
            }
            return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
          });

        return (
          <>
            <Segmented
              label="Watermark type"
              value={kind}
              onChange={choose}
              options={[
                { value: 'text', label: 'Text' },
                { value: 'image', label: 'Image' },
              ]}
            />
            {kind === 'text' ? (
              <div className="options-grid">
                <Field label="Text" hint="Latin letters, digits and common symbols.">
                  {(id) => <input id={id} className="input" value={text} maxLength={100} onChange={(e) => setText(e.target.value)} />}
                </Field>
                <RangeField label="Font size" value={size} min={12} max={200} onChange={setSize} format={(v) => `${v} pt`} />
                <ColorField label="Colour" value={color} onChange={setColor} />
                <CheckField label="Bold" checked={bold} onChange={setBold} />
              </div>
            ) : (
              <div className="stack-sm">
                {!logoFile && <UploadDropzone extensions={['png', 'jpg', 'jpeg']} maxBytes={5 * MB} compact title="Add the watermark image" onFiles={logo.add} />}
                <RejectionList items={logo.rejections} onDismiss={logo.dismissRejections} />
                {logoFile && (
                  <div className="file-item">
                    <div className="file-meta">
                      <div className="file-name">{logoFile.name}</div>
                      <div className="file-sub">{formatBytes(logoFile.size)}</div>
                    </div>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={logo.clear}>
                      Change image
                    </button>
                  </div>
                )}
                <RangeField label="Image width" value={scale} min={5} max={100} onChange={setScale} format={(v) => `${v}% of page width`} />
              </div>
            )}
            <div className="options-grid">
              <RangeField label="Opacity" value={opacity} min={5} max={100} onChange={setOpacity} format={(v) => `${v}%`} />
              <NumberField label="Rotation (degrees, anticlockwise)" value={angle} min={-180} max={180} onChange={setAngle} />
              <SelectField
                label="Layout"
                value={layout}
                onChange={setLayout}
                options={[
                  { value: 'center', label: 'One mark, centred' },
                  { value: 'tile', label: 'Repeated across the page' },
                ]}
              />
              <Field label="Pages (optional)" hint={`Empty means all ${ready.pageCount} pages. Or enter e.g. 1-3, 5.`}>
                {(id) => <input id={id} className="input mono" value={pages} placeholder="All pages" onChange={(e) => setPages(e.target.value)} />}
              </Field>
            </div>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running || (kind === 'text' && !text.trim()) || (kind === 'image' && !logoFile)}>
                <Icon name="stamp" size={18} />
                Add watermark
              </button>
            </div>
            {running && <ProcessingState label="Adding watermark…" />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && <PdfResult blob={task.state.result} name={`${baseName(ready.file.name)}-watermarked.pdf`} onReset={reset} />}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfWatermark;
