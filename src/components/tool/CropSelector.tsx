import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { MIN_CROP, moveRect, resizeRect, type Rect } from '@/lib/cropRect';

interface Props {
  /** Size of the picture in the same units as `rect` (for example natural image pixels). */
  width: number;
  height: number;
  rect: Rect;
  onChange: (rect: Rect) => void;
  /** Locked width/height ratio, or null for a free crop. */
  ratio: number | null;
  label: string;
  /** Hide the crop box (for example until the picture has loaded). */
  hidden?: boolean;
  /** The picture itself (an <img> or <canvas>). It must fill the stage's width. */
  children: ReactNode;
  /** Darken everything outside the box (crop tools). Turn off when the box marks where something is placed. */
  shade?: boolean;
  /** Content drawn inside the box, for example the signature being placed. */
  boxContent?: ReactNode;
}

/**
 * A draggable, resizable crop box over a picture. Works with mouse, touch and keyboard
 * (arrow keys move the box, Shift moves it faster). Shared by the image and PDF crop tools.
 */
export function CropSelector({ width, height, rect, onChange, ratio, label, hidden, children, shade = true, boxContent }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const drag = useRef<{ mode: 'move' | 'resize'; px: number; py: number; start: Rect } | null>(null);

  // Display pixels per picture unit; updated whenever the stage is resized.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setScale(stage.clientWidth / width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [width]);

  const down = (mode: 'move' | 'resize') => (e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { mode, px: e.clientX, py: e.clientY, start: rect };
  };

  const move = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.px) / scale;
    const dy = (e.clientY - d.py) / scale;
    onChange(d.mode === 'move' ? moveRect(d.start, dx, dy, width, height) : resizeRect(d.start, dx, dy, ratio, width, height, MIN_CROP));
  };

  const end = () => {
    drag.current = null;
  };

  const key = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1;
    const deltas: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const d = deltas[e.key];
    if (!d) return;
    e.preventDefault();
    onChange(moveRect(rect, d[0], d[1], width, height));
  };

  return (
    <div className="crop-stage" ref={stageRef}>
      {children}
      {!hidden && (
        <div
          className={shade ? 'crop-box' : 'crop-box crop-box-plain'}
          role="group"
          tabIndex={0}
          aria-label={`${label}: ${Math.round(rect.w)} by ${Math.round(rect.h)} at ${Math.round(rect.x)}, ${Math.round(rect.y)}. Use arrow keys to move.`}
          style={{ left: rect.x * scale, top: rect.y * scale, width: rect.w * scale, height: rect.h * scale }}
          onPointerDown={down('move')}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onKeyDown={key}
        >
          {boxContent}
          <span className="crop-handle" onPointerDown={down('resize')} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
