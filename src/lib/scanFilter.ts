/**
 * Clean-up filters for photographed or scanned pages (Scan to PDF). They work on RGBA pixel data in place.
 *
 * "grayscale" removes colour. "document" makes a high-contrast black and white page: it evens out uneven lighting
 * and shadows by comparing every pixel with the average of its neighbourhood, so dark text on light paper stays
 * readable. It is an image filter only; no text is recognised (this is not OCR).
 */
export type ScanFilter = 'original' | 'grayscale' | 'document';

const luma = (r: number, g: number, b: number) => 0.299 * r + 0.587 * g + 0.114 * b;

export function applyScanFilter(data: Uint8ClampedArray, width: number, height: number, filter: ScanFilter): void {
  if (filter === 'original') return;
  const n = width * height;
  const gray = new Float32Array(n);
  for (let i = 0; i < n; i++) gray[i] = luma(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);

  if (filter === 'grayscale') {
    for (let i = 0; i < n; i++) {
      const v = Math.round(gray[i]);
      data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = v;
    }
    return;
  }

  // Integral image for fast neighbourhood averages.
  const w1 = width + 1;
  const integral = new Float64Array(w1 * (height + 1));
  for (let y = 0; y < height; y++) {
    let row = 0;
    for (let x = 0; x < width; x++) {
      row += gray[y * width + x];
      integral[(y + 1) * w1 + (x + 1)] = integral[y * w1 + (x + 1)] + row;
    }
  }
  const radius = Math.max(8, Math.round(Math.min(width, height) / 24));
  // Pixels clearly darker than their surroundings are ink; a small bias keeps flat paper white.
  const bias = 0.9;
  for (let y = 0; y < height; y++) {
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(height, y + radius + 1);
    for (let x = 0; x < width; x++) {
      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(width, x + radius + 1);
      const sum = integral[y1 * w1 + x1] - integral[y0 * w1 + x1] - integral[y1 * w1 + x0] + integral[y0 * w1 + x0];
      const mean = sum / ((x1 - x0) * (y1 - y0));
      const ink = gray[y * width + x] < mean * bias && mean - gray[y * width + x] > 6;
      const v = ink ? 0 : 255;
      const i = (y * width + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = v;
    }
  }
}

/** Longest side, in pixels, that scanned pages are scaled down to (about A4 at 300 dpi). Smaller images are kept as they are. */
export const MAX_SCAN_SIDE = 3508;

export function scaledSize(width: number, height: number, maxSide = MAX_SCAN_SIDE): { width: number; height: number } {
  const scale = Math.min(1, maxSide / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}
