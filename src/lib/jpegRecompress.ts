/** Browser JPEG re-encoder used by PDF compression: decode, scale down if needed, encode again. */
import type { JpegEncoder } from './pdfCompress';
import { canvasToBlob, makeCanvas } from './imageProcessor';

export const browserJpegEncoder: JpegEncoder = async (jpeg, { quality, maxSide }) => {
  let bitmap: ImageBitmap;
  try {
    // PDF image streams ignore EXIF rotation and colour profiles, so the browser must not apply them either.
    bitmap = await createImageBitmap(new Blob([jpeg as BlobPart], { type: 'image/jpeg' }), { imageOrientation: 'none', colorSpaceConversion: 'none' });
  } catch {
    return null;
  }
  try {
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = makeCanvas(width, height);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
    if (!ctx) return null;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
    return { bytes: new Uint8Array(await blob.arrayBuffer()), width, height };
  } finally {
    bitmap.close();
  }
};
