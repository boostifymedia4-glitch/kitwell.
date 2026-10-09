declare module 'gifenc' {
  type Palette = number[][];
  interface FrameOptions {
    palette?: Palette;
    /** Delay in milliseconds. */
    delay?: number;
    /** 0 = loop forever, -1 = play once, n = repeat n more times. Only read on the first frame. */
    repeat?: number;
    transparent?: boolean;
    transparentIndex?: number;
    dispose?: number;
    colorDepth?: number;
  }
  interface Encoder {
    writeFrame(index: Uint8Array, width: number, height: number, opts?: FrameOptions): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
    reset(): void;
  }
  export function GIFEncoder(opts?: { initialCapacity?: number; auto?: boolean }): Encoder;
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    opts?: { format?: 'rgb565' | 'rgb444' | 'rgba4444'; oneBitAlpha?: boolean | number; clearAlpha?: boolean; clearAlphaThreshold?: number; clearAlphaColor?: number },
  ): Palette;
  export function applyPalette(rgba: Uint8Array | Uint8ClampedArray, palette: Palette, format?: 'rgb565' | 'rgb444' | 'rgba4444'): Uint8Array;
}
