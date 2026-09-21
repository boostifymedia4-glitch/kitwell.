import { processOnCurrentThread, type ImagePlan } from './imageProcessor';

interface Request {
  id: number;
  file: Blob;
  plan: ImagePlan;
}

self.onmessage = async (event: MessageEvent<Request>) => {
  const { id, file, plan } = event.data;
  try {
    const result = await processOnCurrentThread(file, plan);
    self.postMessage({ id, ok: true, result });
  } catch (err) {
    self.postMessage({ id, ok: false, error: err instanceof Error ? err.message : 'Processing failed.' });
  }
};
