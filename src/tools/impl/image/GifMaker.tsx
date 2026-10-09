import { useEffect, useMemo, useState } from 'react';
import { tr, useI18n } from '@/i18n';
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

type Shape = 'first' | '1' | '1.7778' | '1.3333' | '0.75' | '0.5625';

async function decode(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file);
  } catch {
    throw new Error(tr('gifMaker.err.unreadable', { name: file.name }));
  }
}

const GifMaker: ToolImplementation = () => {
  const { t } = useI18n();
  const SHAPES = [
    { value: 'first', label: t('gifMaker.shape.first') },
    { value: '1', label: t('gifMaker.shape.square') },
    { value: '1.7778', label: t('gifMaker.shape.wide') },
    { value: '1.3333', label: t('gifMaker.shape.landscape') },
    { value: '0.75', label: t('gifMaker.shape.portrait') },
    { value: '0.5625', label: t('gifMaker.shape.tall') },
  ] as const;
  const FIT_OPTIONS: { value: FitMode; label: string }[] = [
    { value: 'contain', label: t('gifMaker.fit.contain') },
    { value: 'cover', label: t('gifMaker.fit.cover') },
    { value: 'stretch', label: t('gifMaker.fit.stretch') },
  ];
  const LOOPS = [
    { value: '0', label: t('gifMaker.loops.forever') },
    { value: '1', label: t('gifMaker.loops.once') },
    { value: '2', label: t('gifMaker.loops.times', { count: 2 }) },
    { value: '3', label: t('gifMaker.loops.times', { count: 3 }) },
    { value: '5', label: t('gifMaker.loops.times', { count: 5 }) },
    { value: '10', label: t('gifMaker.loops.times', { count: 10 }) },
  ] as const;
  const COLOURS = [
    { value: '256', label: t('gifMaker.colours.best') },
    { value: '128', label: '128' },
    { value: '64', label: '64' },
    { value: '32', label: t('gifMaker.colours.smaller') },
    { value: '16', label: t('gifMaker.colours.smallest') },
  ] as const;
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
      if (files.length === 0) throw new Error(t('gifMaker.err.noPictures'));
      const w = Math.round(Number(width));
      if (!(w >= 16 && w <= 1200)) throw new Error(t('gifMaker.err.width'));
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
      if (!ctx) throw new Error(t('gifMaker.err.noCanvas'));

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
        (d, total) => report(d, total, t('gifMaker.progress', { current: Math.min(d + 1, total), total })),
      );
      const info = parseGif(bytes);
      return { blob: new Blob([bytes as BlobPart], { type: 'image/gif' }), width: info.width, height: info.height, frames: info.frames, durationMs: info.delaysMs.reduce((a, b) => a + b, 0) };
    });

  return (
    <div className="stack">
      {files.length === 0 && <UploadDropzone multiple extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} maxFiles={MAX_GIF_FRAMES} onFiles={queue.add} title={t('gifMaker.dropTitle')} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {files.length > 0 && (
        <>
          <FileList items={queue.items} kind="image" onRemove={(id) => { queue.remove(id); resetTask(); }} onMove={(a, b) => { queue.move(a, b); resetTask(); }} disabled={running} />
          {files.length < MAX_GIF_FRAMES && (
            <UploadDropzone multiple compact extensions={IMAGE_EXTENSIONS} maxBytes={MAX_IMAGE_BYTES} maxFiles={MAX_GIF_FRAMES} onFiles={(f) => { queue.add(f); resetTask(); }} disabled={running} title={t('gifMaker.addMore')} />
          )}
          <p className="hint">
            {t('gifMaker.order', { count: files.length })}
          </p>

          <div className="options-grid">
            <NumberField label={t('gifMaker.width')} value={width} min={16} max={1200} onChange={setWidth} disabled={running} hint={t('gifMaker.widthHint')} />
            <SelectField label={t('gifMaker.frameShape')} value={shape} onChange={setShape} options={[...SHAPES]} />
            <SelectField label={t('gifMaker.fitPictures')} value={fit} onChange={setFit} options={FIT_OPTIONS} />
            <SelectField label={t('gifMaker.plays')} value={loops} onChange={setLoops} options={[...LOOPS]} />
            <SelectField label={t('gifMaker.colours')} value={colours} onChange={setColours} options={[...COLOURS]} />
            <NumberField label={t('gifMaker.lastPause')} value={lastPause} min={0} max={10000} step={100} onChange={setLastPause} disabled={running} />
          </div>
          <RangeField label={t('gifMaker.timePerFrame')} value={delay} min={50} max={3000} step={10} onChange={setDelay} format={(v) => `${(v / 1000).toFixed(2)} s`} />
          <div className="row" style={{ gap: 20, alignItems: 'center' }}>
            <CheckField label={t('gifMaker.transparent')} checked={transparent} onChange={setTransparent} />
            {!transparent && <ColorField label={t('gifMaker.background')} value={background} onChange={setBackground} />}
            <CheckField label={t('gifMaker.pingPong')} checked={pingPong} onChange={setPingPong} disabled={files.length < 3} />
          </div>
          {transparent && <p className="hint">{t('gifMaker.transparentHint')}</p>}

          <div className="toolbar">
            <button type="button" className="btn btn-primary btn-lg" onClick={create} disabled={running}>
              <Icon name="film" size={18} />
              {t('gifMaker.create')}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => { queue.clear(); resetTask(); }} disabled={running}>
              {t('gifMaker.clearAll')}
            </button>
          </div>
        </>
      )}
      {running && <ProcessingState label={t('gifMaker.creating')} progress={task.progress} />}
      {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
      {done && url && (
        <ResultPanel title={t('gifMaker.ready')}>
          <div className="gif-preview">
            <img src={url} alt={t('gifMaker.previewAlt', { frames: done.frames })} width={done.width} height={done.height} />
          </div>
          <Stats
            items={[
              { label: t('gifMaker.stat.size'), value: formatBytes(done.blob.size) },
              { label: t('gifMaker.stat.dimensions'), value: `${done.width} × ${done.height}` },
              { label: t('gifMaker.stat.frames'), value: done.frames },
              { label: t('gifMaker.stat.length'), value: `${(done.durationMs / 1000).toFixed(1)} s` },
            ]}
          />
          {done.blob.size > 10 * 1024 * 1024 && <Notice tone="warn">{t('gifMaker.tooBig')}</Notice>}
          <div className="toolbar">
            <DownloadButton blob={done.blob} name="animation.gif" label={t('gifMaker.download')} />
            <ResetButton onClick={() => { queue.clear(); resetTask(); }} />
          </div>
        </ResultPanel>
      )}
    </div>
  );
};

export default GifMaker;
