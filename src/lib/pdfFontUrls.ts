/** URLs of the bundled Noto Sans files (built into this site's assets, so no third-party request is made). */
import latin400 from '@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff?url';
import latin700 from '@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff?url';
import latinExt400 from '@fontsource/noto-sans/files/noto-sans-latin-ext-400-normal.woff?url';
import latinExt700 from '@fontsource/noto-sans/files/noto-sans-latin-ext-700-normal.woff?url';
import cyrillic400 from '@fontsource/noto-sans/files/noto-sans-cyrillic-400-normal.woff?url';
import cyrillic700 from '@fontsource/noto-sans/files/noto-sans-cyrillic-700-normal.woff?url';
import cyrillicExt400 from '@fontsource/noto-sans/files/noto-sans-cyrillic-ext-400-normal.woff?url';
import cyrillicExt700 from '@fontsource/noto-sans/files/noto-sans-cyrillic-ext-700-normal.woff?url';
import greek400 from '@fontsource/noto-sans/files/noto-sans-greek-400-normal.woff?url';
import greek700 from '@fontsource/noto-sans/files/noto-sans-greek-700-normal.woff?url';
import vietnamese400 from '@fontsource/noto-sans/files/noto-sans-vietnamese-400-normal.woff?url';
import vietnamese700 from '@fontsource/noto-sans/files/noto-sans-vietnamese-700-normal.woff?url';
import devanagari400 from '@fontsource/noto-sans/files/noto-sans-devanagari-400-normal.woff?url';
import devanagari700 from '@fontsource/noto-sans/files/noto-sans-devanagari-700-normal.woff?url';
import type { FontFileId } from './pdfFont';

const URLS: Record<FontFileId, string> = {
  'latin-400': latin400,
  'latin-700': latin700,
  'latin-ext-400': latinExt400,
  'latin-ext-700': latinExt700,
  'cyrillic-400': cyrillic400,
  'cyrillic-700': cyrillic700,
  'cyrillic-ext-400': cyrillicExt400,
  'cyrillic-ext-700': cyrillicExt700,
  'greek-400': greek400,
  'greek-700': greek700,
  'vietnamese-400': vietnamese400,
  'vietnamese-700': vietnamese700,
  'devanagari-400': devanagari400,
  'devanagari-700': devanagari700,
};

export const fontUrl = (id: FontFileId) => URLS[id];
