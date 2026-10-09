/**
 * Browser OCR with Tesseract (WebAssembly). The worker, the engine and the English language data are all
 * served from this site (/ocr/…, copied from node_modules by scripts/copy-ocr-assets.mjs), so no image or
 * text is sent anywhere and nothing is fetched from a CDN.
 */
import { createWorker, type Worker } from 'tesseract.js';
import type { OcrWord } from './ocr';
import { tr } from '@/i18n/translate';

export const OCR_LANGUAGES = [{ code: 'eng' }] as const;

export interface OcrRecognition {
  text: string;
  confidence: number;
  words: OcrWord[];
}

export interface OcrEngine {
  recognize(image: HTMLCanvasElement): Promise<OcrRecognition>;
  terminate(): Promise<void>;
}

const PATHS = { workerPath: '/ocr/worker.min.js', corePath: '/ocr/core', langPath: '/ocr/lang' };

export async function createOcrEngine(onStatus?: (status: string, progress: number) => void): Promise<OcrEngine> {
  let worker: Worker;
  try {
    worker = await createWorker('eng', 1, {
      ...PATHS,
      cacheMethod: 'none',
      workerBlobURL: false,
      gzip: true,
      logger: (m) => onStatus?.(m.status, m.progress),
    });
  } catch {
    throw new Error(tr('err.ocr.engineStart'));
  }
  return {
    async recognize(image) {
      const { data } = await worker.recognize(image, {}, { text: true, blocks: true });
      const words: OcrWord[] = [];
      for (const block of data.blocks ?? []) {
        for (const paragraph of block.paragraphs ?? []) {
          for (const line of paragraph.lines ?? []) {
            const lineWords = line.words ?? [];
            lineWords.forEach((word, i) => {
              words.push({
                text: word.text,
                x0: word.bbox.x0,
                y0: word.bbox.y0,
                x1: word.bbox.x1,
                y1: word.bbox.y1,
                confidence: word.confidence,
                lineEnd: i === lineWords.length - 1,
              });
            });
          }
        }
      }
      return { text: data.text ?? '', confidence: Math.round(data.confidence ?? 0), words };
    },
    async terminate() {
      await worker.terminate();
    },
  };
}
