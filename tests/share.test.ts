import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { afterAll, describe, expect, it } from 'vitest';
// @ts-expect-error plain JavaScript module shared with the server
import { cleanShareName, createDiskShareStore, newShareId, validShareId } from '../server/shareCore.mjs';

const dir = mkdtempSync(join(tmpdir(), 'kitwell-share-test-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('temporary share links', () => {
  it('creates long random ids and rejects anything else', () => {
    const a = newShareId();
    expect(validShareId(a)).toBe(true);
    expect(a).not.toBe(newShareId());
    expect(validShareId('../etc/passwd')).toBe(false);
    expect(validShareId('short')).toBe(false);
  });

  it('cleans download names', () => {
    expect(cleanShareName('../../evil/..' + String.fromCharCode(92) + 'name?.pdf')).toBe('name.pdf');
    expect(cleanShareName('')).toBe('file');
    expect(cleanShareName('a'.repeat(300)).length).toBe(120);
  });

  it('stores a file, serves its metadata until the expiry and then deletes it', async () => {
    let now = 1_000_000;
    const store = createDiskShareStore({ dir, ttlMs: 60_000, maxBytes: 1024, now: () => now });
    const id = newShareId();
    const record = await store.put(id, 'report.pdf', Readable.from([Buffer.from('hello world')]));
    expect(record).toMatchObject({ name: 'report.pdf', size: 11, expiresAt: now + 60_000 });
    expect((await store.meta(id)).size).toBe(11);
    now += 59_000;
    expect(await store.meta(id)).not.toBeNull();
    now += 2_000;
    expect(await store.meta(id)).toBeNull();
  });

  it('refuses files over the limit and empty files, leaving nothing behind', async () => {
    const store = createDiskShareStore({ dir, ttlMs: 60_000, maxBytes: 10 });
    const big = newShareId();
    await expect(store.put(big, 'big.bin', Readable.from([Buffer.alloc(50)]))).rejects.toMatchObject({ status: 413 });
    expect(await store.meta(big)).toBeNull();
    const empty = newShareId();
    await expect(store.put(empty, 'e.bin', Readable.from([]))).rejects.toMatchObject({ status: 400 });
  });

  it('sweeps expired files', async () => {
    let now = 5_000_000;
    const store = createDiskShareStore({ dir, ttlMs: 1000, maxBytes: 100, now: () => now });
    const id = newShareId();
    await store.put(id, 'a.txt', Readable.from([Buffer.from('x')]));
    now += 5000;
    expect(await store.sweep()).toBeGreaterThanOrEqual(1);
    expect(await store.meta(id)).toBeNull();
  });
});
