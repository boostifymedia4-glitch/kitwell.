/**
 * A small, valid ICC version 2 matrix/TRC profile for sRGB, written from the published sRGB primaries (D50-adapted) and
 * transfer curve. PDF/A needs an output intent with an embedded profile for device colours. Building the profile here
 * avoids shipping a third-party profile file.
 */

const s15 = (v: number) => Math.round(v * 65536);

function writeAscii(view: DataView, offset: number, text: string) {
  for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
}

const xyzTag = (x: number, y: number, z: number): Uint8Array => {
  const out = new Uint8Array(20);
  const v = new DataView(out.buffer);
  writeAscii(v, 0, 'XYZ ');
  v.setInt32(8, s15(x));
  v.setInt32(12, s15(y));
  v.setInt32(16, s15(z));
  return out;
};

/** sRGB transfer curve (IEC 61966-2-1) sampled at 1024 points. */
const curveTag = (): Uint8Array => {
  const n = 1024;
  const out = new Uint8Array(12 + n * 2);
  const v = new DataView(out.buffer);
  writeAscii(v, 0, 'curv');
  v.setUint32(8, n);
  for (let i = 0; i < n; i++) {
    const c = i / (n - 1);
    const lin = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    v.setUint16(12 + i * 2, Math.round(lin * 65535));
  }
  return out;
};

const textTag = (text: string): Uint8Array => {
  const out = new Uint8Array(8 + text.length + 1);
  writeAscii(new DataView(out.buffer), 0, 'text');
  writeAscii(new DataView(out.buffer), 8, text);
  return out;
};

const descTag = (text: string): Uint8Array => {
  // textDescriptionType: ASCII part, then empty Unicode and ScriptCode parts.
  const ascii = text.length + 1;
  const out = new Uint8Array(12 + ascii + 4 + 4 + 2 + 1 + 67);
  const v = new DataView(out.buffer);
  writeAscii(v, 0, 'desc');
  v.setUint32(8, ascii);
  writeAscii(v, 12, text);
  return out;
};

export const SRGB_PROFILE_NAME = 'sRGB IEC61966-2.1';

/** Returns the profile bytes (about 2.6 KB). */
export function srgbIccProfile(): Uint8Array {
  const curve = curveTag();
  const tags: [string, Uint8Array][] = [
    ['desc', descTag(SRGB_PROFILE_NAME)],
    ['cprt', textTag('No copyright, use freely')],
    ['wtpt', xyzTag(0.9642, 1.0, 0.8249)],
    ['rXYZ', xyzTag(0.4360747, 0.2225045, 0.0139322)],
    ['gXYZ', xyzTag(0.3850649, 0.7168786, 0.0971045)],
    ['bXYZ', xyzTag(0.1430804, 0.0606169, 0.7141733)],
    ['rTRC', curve],
    ['gTRC', curve],
    ['bTRC', curve],
  ];
  const tableSize = 4 + tags.length * 12;
  let offset = 128 + tableSize;
  const placed: { sig: string; offset: number; size: number; data: Uint8Array }[] = [];
  const shared = new Map<Uint8Array, number>();
  for (const [sig, data] of tags) {
    const known = shared.get(data);
    if (known !== undefined) {
      placed.push({ sig, offset: known, size: data.length, data });
      continue;
    }
    shared.set(data, offset);
    placed.push({ sig, offset, size: data.length, data });
    offset += Math.ceil(data.length / 4) * 4;
  }
  const out = new Uint8Array(offset);
  const v = new DataView(out.buffer);
  v.setUint32(0, offset); // profile size
  writeAscii(v, 4, 'none'); // preferred CMM
  v.setUint32(8, 0x02100000); // version 2.1.0
  writeAscii(v, 12, 'mntr'); // display device profile
  writeAscii(v, 16, 'RGB ');
  writeAscii(v, 20, 'XYZ ');
  v.setUint16(24, 2015); // creation date 2015-01-01 00:00:00
  v.setUint16(26, 1);
  v.setUint16(28, 1);
  writeAscii(v, 36, 'acsp');
  writeAscii(v, 40, 'MSFT'); // primary platform
  v.setUint32(64, 0); // rendering intent: perceptual
  v.setInt32(68, s15(0.9642)); // PCS illuminant (D50)
  v.setInt32(72, s15(1.0));
  v.setInt32(76, s15(0.8249));
  writeAscii(v, 80, 'none'); // creator
  v.setUint32(128, tags.length);
  placed.forEach((p, i) => {
    const at = 132 + i * 12;
    writeAscii(v, at, p.sig);
    v.setUint32(at + 4, p.offset);
    v.setUint32(at + 8, p.size);
  });
  const written = new Set<number>();
  for (const p of placed) {
    if (written.has(p.offset)) continue;
    written.add(p.offset);
    out.set(p.data, p.offset);
  }
  return out;
}
