import { useEffect, useMemo, useState } from 'react';
import { IMAGE_EXTENSIONS, MAX_IMAGE_BYTES } from '@/components/tool/BatchImageTool';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { CheckField, ColorField, NumberField, RangeField, SelectField } from '@/components/tool/Fields';
import { FileList } from '@/components/tool/FileList';
import { DownloadButton, ResetButton, ResultPanel } from '@/components/tool/Results';
import { Stats } from '@/components/tool/TextIO';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { formatBytes } from '@/lib/format';
import { MAX_GIF_FRAMES, encodeGif, fitRects, parseGif, type FitMode, type GifFrame } from '@/lib/gif';
import { useFileQueue, useObjectUrl, useTask } from '@/lib/hooks';
import type { ToolImplementation } from '../../types';

interface Result {
  blob: Blob;
  width: number;
  height: number;
  frames: number;
  durationMs: number;
}

const SHAPES = [
  { value: 'first', label: 'Same shape as the first picture' },
  { value: '1', label: 'Square (1:1)' },
  { value: '1.7778', label: 'Wide (16:9)' },
  { value: '1.3333', label: 'Landscape (4:3)' },
  { value: '0.75', label: 'Portrait (3:4)' },
  { value: '0.5625', label: 'Tall (9:16)' },
] as const;

const FIT_OPTIONS: { value: FitMode; label: string }[] = [
  { value: 'contain', label: 'Fit inside (keep whole picture, add bars)' },
  { value: 'cover', label: 'Fill the frame (crop the edges)' },
  { value: 'stretch', label: 'Stretch to fit' },
];

const LOOPS = [
  { value: '0', label: 'Forever' },
  { value: '1', label: 'Once' },
  { value: '2', label: '2 times' },
  { value: '3', label: '3 times' },
  { value: '5', label: '5 times' },
  { value: '10', label: '10 times' },
] as const;

const COLOURS = [
  { value: '256', label: '256 (best quality)' },
  { value: '128', label: '128' },
  { value: '64', label: '64' },
  { value: '32', label: '32 (smaller)' },
  { value: '16', label: '16 (smallest)' },
] as const;

type Shape = (typeof SHAPES)[number]['value'];

async function decode(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file);
  } catch {
    throw new Error(`“${file.name}” could not be read as a picture. It may be damaged or in a format your browser cannot open.`);
  }
}

const GifMaker: ToolImplementation = () => {
  const queue = useFileQueue({ extensions: IMAGE_EXTENSIONS, maxBytes: MAX_IMAGE_BYTES, maxFiles: MAX_GIF_FRAMES }, true);
  const task = useTask<Result>();
  const running = task.state.status === 'running';
  const [width, setWidth] = useState<number | ''>(480);
  const [shape, setShape] = useState<Shape>('first');
  const [fit, setFit] = useState<FitMode>('contain');
  const [background, setBackground] = useState('#ffffff');
  const [transparent, setTransparent] = useState(false);
  const [delay, setDelay] = useState(500);
  const [lastPause, setLastPause] = useState<number | ''>(0);
  const [loops, setLoops] = useState<'0' | '1' | '2' | '3' | '5' | '10'>('0');
  const [colours, setColours] = useState<'256' | '128' | '64' | '32' | '16'>('256');
  const [pingPong, setPingPong] = useState(false);

  const done = task.state.status === 'done' ? task.state.result : null;
  const url = useObjectUrl(done?.blob);
  const files = useMemo(() => queue.items.map((i) => i.file), [queue.items]);
  // Changing the pictures makes an earlier GIF out of date.
  const { reset: resetTask } = task;
  useEffect(() => resetTask(), [width, shape, fit, background, transparent, delay, lastPause, loops, colours, pingPong, resetTask]);

  const sequence = useMemo(() => {
    const idx = files.map((_, i) => i);
    return pingPong && idx.length > 2 ? [...idx, ...idx.slice(1, -1).reverse()] : idx;
  }, [files, pingPong]);

  const create = () =>
    task.run(async (report) => {
      if (files.length === 0) throw new Error('Add at least one picture.');
      const w = Math.round(Number(width));
      if (!(w >= 16 && w <= 1200)) throw new Error('The width must be between 16 and 1200 pixels.');
      let aspect: number;
      if (shape === 'first') {
        const first = await decode(files[0]);
        aspect = first.width / first.height;
        first.close();
      } else aspect = Number(shape);
      const h = Math.max(1, Math.round(w / aspect));
      const base = Math.max(20, delay);
      const extra = Math.max(0, Number(lastPause) || 0);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Your browser could not create a drawing surface.');

      const bytes = await encodeGif(
        {
          count: sequence.length,
          get: async (i): Promise<GifFrame> => {
            const bitmap = await decode(files[sequence[i]]);
            try {
              ctx.clearRect(0, 0, w, h);
              if (!transparent) {
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, w, h);
              }
              const r = fitRects(bitmap.width, bitmap.height, w, h, fit);
              ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(bitmap, r.sx, r.sy, r.sw, r.sh, r.dx, r.dy, r.dw, r.dh);
              const pixels = ctx.getImageData(0, 0, w, h).data;
              return { rgba: new Uint8ClampedArray(pixels), delayMs: base + (i === sequence.length - 1 ? extra : 0) };
            } finally {
              bitmap.close();
            }
          },
        },
        { width: w, height: h, plays: Number(loops), colors: Number(colours), transparent },
        (d, total) => report(d, total, `Building frame ${Math.min(d + 1, total)} of ${total}`),
      );
      const info = parseGif(bytes);
      return { blob: new Blob([bytes as BlobPart], { type: 'image/gif' }), width: info.width, height: info.height, frames: info.frames, durationMs: info.delaysMs.reduce((a, b) => a + b, 0) };
    });

  return (
    <div className="stack">
      {files.length === 0 && <UploadDropzone multiple extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} maxFiles={MAX_GIF_FRAMES} onFiles={queue.add} title="Drop pictures here or click to choose" />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {files.length > 0 && (
        <>
          <FileList items={queue.items} kind="image" onRemove={(id) => { queue.remove(id); resetTask(); }} onMove={(a, b) => { queue.move(a, b); resetTask(); }} disabled={running} />
          {files.length < MAX_GIF_FRAMES && (
            <UploadDropzone multiple compact extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} maxFiles={MAX_GIF_FRAMES} onFiles={(f) => { queue.add(f); resetTask(); }} disabled={running} title="Add more pictures" />
          )}
          <p className="hint">
            {files.length} picture{files.length === 1 ? '' : 's'}, in play order. Drag to reorder or use the arrows.
            {files.length === 1 && ' With one picture the GIF will be a still image.'}
          </p>

          <div className="options-grid">
            <NumberField label="Width (px)" value={width} min={16} max={1200} onChange={setWidth} disabled={running} hint="Smaller widths make much smaller GIFs." />
            <SelectField label="Frame shape" value={shape} onChange={setShape} options={[...SHAPES]} />
            <SelectField label="Fit pictures" value={fit} onChange={setFit} options={FIT_OPTIONS} />
            <SelectField label="Plays" value={loops} onChange={setLoops} options={[...LOOPS]} />
            <SelectField label="Colours per frame" value={colours} onChange={setColours} options={[...COLOURS]} />
            <NumberField label="Pause on the last frame (ms)" value={lastPause} min={0} max={10000} step={100} onChange={setLastPause} disabled={running} />
          </div>
          <RangeField label="Time per frame" value={delay} min={50} max={3000} step={10} onChange={setDelay} format={(v) => `${(v / 1000).toFixed(2)} s`} />
          <div className="row" style={{ gap: 20, alignItems: 'center' }}>
            <CheckField label="Keep transparent areas" checked={transparent} onChange={setTransparent} />
            {!transparent && <ColorField label="Background colour" value={background} onChange={setBackground} />}
            <CheckField label="Play forwards, then backwards" checked={pingPong} onChange={setPingPong} disabled={files.length < 3} />
          </div>
          {transparent && <p className="hint">GIF transparency is on or off for each pixel, so soft edges become hard.</p>}

          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={create} disabled={running}>
              <Icon name="film" size={18} />
              Create GIF
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => { queue.clear(); resetTask(); }} disabled={running}>
              Clear all
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label="Creating your GIF…" progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {done && url && (
        <ResultPanel title="Your GIF is ready">
          <div className="gif-preview">
            <img src={url} alt={`Animated GIF preview, ${done.frames} frames`} width={done.width} height={done.height} />
          </div>
          <Stats
            items={[
              { label: 'Size', value: formatBytes(done.blob.size) },
              { label: 'Dimensions', value: `${done.width} × ${done.height}` },
              { label: 'Frames', value: done.frames },
              { label: 'Length', value: `${(done.durationMs / 1000).toFixed(1)} s` },
            ]}
          />
          {done.blob.size > 10 * 1024 * 1024 && <Notice tone="warn">This GIF is over 10 MB. Many websites and chat apps reject files that large. Use a smaller width, fewer colours or fewer frames.</Notice>}
          <div className="toolbar">
            <DownloadButton blob={done.blob} name="animation.gif" label="Download animation.gif" />
            <ResetButton onClick={() => { queue.clear(); resetTask(); }} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
};

export default GifMaker;
