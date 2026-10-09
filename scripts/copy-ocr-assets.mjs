/**
 * Copies the OCR worker, WebAssembly engine and English language data from node_modules into public/ocr,
 * so the OCR tool runs entirely from this site (no CDN, no third-party requests). Runs before `dev` and `build`.
 * public/ocr is generated and git-ignored.
 */
import { copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'ocr');
const nm = join(root, 'node_modules');

// Only the LSTM engine variants are needed; the browser picks the best one for its CPU at run time.
const files = [
  [join(nm, 'tesseract.js', 'dist', 'worker.min.js'), join(out, 'worker.min.js')],
  [join(nm, 'tesseract.js-core', 'tesseract-core-lstm.wasm.js'), join(out, 'core', 'tesseract-core-lstm.wasm.js')],
  [join(nm, 'tesseract.js-core', 'tesseract-core-simd-lstm.wasm.js'), join(out, 'core', 'tesseract-core-simd-lstm.wasm.js')],
  [join(nm, 'tesseract.js-core', 'tesseract-core-relaxedsimd-lstm.wasm.js'), join(out, 'core', 'tesseract-core-relaxedsimd-lstm.wasm.js')],
  [join(nm, '@tesseract.js-data', 'eng', '4.0.0_best_int', 'eng.traineddata.gz'), join(out, 'lang', 'eng.traineddata.gz')],
];

const newer = async (src, dest) => {
  try {
    const [a, b] = await Promise.all([stat(src), stat(dest)]);
    return a.size !== b.size;
  } catch {
    return true;
  }
};

let copied = 0;
for (const [src, dest] of files) {
  try {
    await stat(src);
  } catch {
    console.error(`OCR asset missing: ${src}\nRun "npm install" first.`);
    process.exit(1);
  }
  if (await newer(src, dest)) {
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(src, dest);
    copied++;
  }
}
console.log(copied ? `OCR assets copied to public/ocr (${copied} files).` : 'OCR assets are up to date.');
