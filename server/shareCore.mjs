/**
 * Temporary file sharing: the storage rules shared by the Express server (files on disk) and the Vercel functions
 * (Vercel Blob). A shared file lives for SHARE_TTL_HOURS (default 24) and is then deleted; the link holds a long random
 * id, so only people who were given the link can fetch it. Sharing is always started by the visitor with a button.
 */
import { randomBytes } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

export const shareLimits = (env = process.env) => ({
  ttlHours: Number(env.SHARE_TTL_HOURS) > 0 ? Number(env.SHARE_TTL_HOURS) : 24,
  maxBytes: (Number(env.SHARE_MAX_MB) > 0 ? Number(env.SHARE_MAX_MB) : 100) * 1024 * 1024,
});

export const newShareId = () => randomBytes(16).toString('base64url');
export const validShareId = (id) => typeof id === 'string' && /^[A-Za-z0-9_-]{16,64}$/.test(id);

/** A safe download name: no folders, no control characters, bounded length. */
export function cleanShareName(name) {
  const base = String(name ?? '').split(/[\\/]/).pop() ?? '';
  // eslint-disable-next-line no-control-regex
  const clean = base.replace(/[\u0000-\u001f<>:"|?*]/g, '').replace(/^[\s.]+/, '').trim().slice(0, 120);
  return clean || 'file';
}

/** Files are stored under a fixed set of types; anything else is served as a generic download. */
export const shareContentType = (name) => (/\.pdf$/i.test(name) ? 'application/pdf' : 'application/octet-stream');

/** Storage on a local disk, used by the Express server. `now` can be replaced in tests. */
export function createDiskShareStore({ dir, ttlMs, maxBytes, now = Date.now }) {
  const metaPath = (id) => join(dir, id, 'meta.json');
  const filePath = (id) => join(dir, id, 'file');

  async function remove(id) {
    await rm(join(dir, id), { recursive: true, force: true });
  }

  async function meta(id) {
    if (!validShareId(id)) return null;
    let parsed;
    try {
      parsed = JSON.parse(await readFile(metaPath(id), 'utf8'));
    } catch {
      return null;
    }
    if (parsed.expiresAt <= now()) {
      await remove(id);
      return null;
    }
    return parsed;
  }

  return {
    ttlMs,
    maxBytes,
    meta,
    async put(id, name, input) {
      if (!validShareId(id)) throw Object.assign(new Error('invalid id'), { status: 400 });
      await mkdir(join(dir, id), { recursive: true });
      let size = 0;
      const limit = new Transform({
        transform(chunk, _enc, cb) {
          size += chunk.length;
          if (size > maxBytes) return cb(Object.assign(new Error('too large'), { status: 413 }));
          cb(null, chunk);
        },
      });
      try {
        await pipeline(input, limit, createWriteStream(filePath(id)));
      } catch (err) {
        await remove(id);
        throw err;
      }
      if (size === 0) {
        await remove(id);
        throw Object.assign(new Error('empty'), { status: 400 });
      }
      const createdAt = now();
      const record = { name: cleanShareName(name), size, createdAt, expiresAt: createdAt + ttlMs };
      await writeFile(metaPath(id), JSON.stringify(record));
      return record;
    },
    open: (id) => createReadStream(filePath(id)),
    /** Deletes every expired share; returns how many were removed. */
    async sweep() {
      let removed = 0;
      let ids = [];
      try {
        ids = await readdir(dir);
      } catch {
        return 0;
      }
      for (const id of ids) {
        if (!validShareId(id)) continue;
        let expired = true;
        try {
          expired = JSON.parse(await readFile(metaPath(id), 'utf8')).expiresAt <= now();
        } catch {
          // a folder without metadata is an upload in progress or an interrupted one: remove it only once it is an hour old
          expired = now() - (await stat(join(dir, id)).catch(() => ({ mtimeMs: 0 }))).mtimeMs > 3_600_000;
        }
        if (expired) {
          await remove(id);
          removed++;
        }
      }
      return removed;
    },
  };
}
