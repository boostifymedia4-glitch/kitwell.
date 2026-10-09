/** Pixel helpers for preparing a signature picture: find its ink, trim the empty margin, drop a white background. */

export interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Bounding box of every pixel that is not (nearly) transparent, or null for an empty picture. */
export function contentBounds(data: Uint8ClampedArray, width: number, height: number, alphaMin = 8): Bounds | null {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > alphaMin) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return maxX < 0 ? null : { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

/** Makes near-white pixels transparent, with a soft edge so scanned signatures keep smooth strokes. Returns how many pixels were cleared. */
export function whiteToTransparent(data: Uint8ClampedArray, threshold = 235): number {
  let cleared = 0;
  const soft = 40;
  for (let i = 0; i < data.length; i += 4) {
    const lightest = Math.min(data[i], data[i + 1], data[i + 2]);
    if (lightest >= threshold) {
      data[i + 3] = 0;
      cleared++;
    } else if (lightest > threshold - soft) {
      data[i + 3] = Math.round((data[i + 3] * (threshold - lightest)) / soft);
    }
  }
  return cleared;
}

/** The ink colours offered for drawn and typed signatures. */
export const INK_COLOURS = [
  { value: '#111111' },
  { value: '#1d3fa8' },
  { value: '#8a1c1c' },
] as const;

/** Handwriting-style font stacks. What is installed differs per device, so each ends in a generic fallback. */
export const SIGNATURE_FONTS = [
  { id: 'script', stack: '"Segoe Script", "Brush Script MT", "Snell Roundhand", "Apple Chancery", cursive', italic: false },
  { id: 'casual', stack: '"Bradley Hand", "Segoe Print", "Comic Sans MS", "Chalkboard SE", cursive', italic: false },
  { id: 'formal', stack: 'Georgia, "Times New Roman", serif', italic: true },
] as const;
