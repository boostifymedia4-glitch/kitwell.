import type { ReactNode } from 'react';
import { CATEGORY_ART, TOOL_ART, type ArtBase, type ArtColor, type ArtGlyph, type TagFormat, type ToolArt as Art } from '@/tools/toolArt';

/**
 * Colour-coded, layered tool illustrations drawn as inline SVG (no images, no dependencies, nothing to load).
 * Every icon is a 48 x 48 scene: a base (sheet, photo, note or code window), a solid colour, a white glyph with one
 * accent detail, an optional second sheet behind it and an optional format tag. Formats keep their own colours
 * (PDF red, JPG amber, PNG blue, WEBP purple ...), so a conversion reads as "source colour + target tag".
 */

/** Solid colours chosen so a white glyph keeps a contrast of about 3:1 or better (graphics need 3:1). */
export const ART_COLORS: Record<ArtColor, string> = {
  red: '#DC3F44',
  coral: '#E8603A',
  orange: '#DE6A14',
  amber: '#C27D00',
  green: '#2A9456',
  teal: '#0F8F85',
  cyan: '#0A86B5',
  blue: '#3B68D2',
  indigo: '#5753D8',
  purple: '#8B47C7',
  pink: '#CF3A92',
  slate: '#58687B',
};

/** The colour of each format tag. */
const TAG_COLORS: Record<TagFormat, ArtColor> = {
  PDF: 'red', JPG: 'amber', PNG: 'blue', WEBP: 'purple', GIF: 'pink', SVG: 'orange', B64: 'teal', JSON: 'indigo',
  XML: 'orange', HTML: 'coral', MD: 'slate', URL: 'blue', QR: 'indigo', TXT: 'slate',
};

const WHITE = '#FFFFFF';
/** The accent detail in a glyph: warm light yellow on cool colours, plain white on warm ones. */
const POP_COOL = '#FFE28A';
const WARM: ArtColor[] = ['red', 'coral', 'orange', 'amber', 'pink'];
const popFor = (c: ArtColor) => (WARM.includes(c) ? '#FFF1D6' : POP_COOL);

type GlyphFn = (p: string) => ReactNode;
const W = WHITE;

const label = (text: string, size: number, y = 16.5) => (
  <text x="12" y={y} textAnchor="middle" fontSize={size} fontWeight={800} fill={W} stroke="none" fontFamily="'Inter Variable', system-ui, sans-serif">
    {text}
  </text>
);

/** Glyphs are drawn on a 24 x 24 grid with white strokes; `p` is the accent colour for one detail. */
const GLYPHS: Record<ArtGlyph, GlyphFn> = {
  merge: (p) => (<><path d="M3 6h5c4 0 4 6 8 6" /><path d="M3 18h5c4 0 4-6 8-6" /><path d="M14 12h7M18 8.5l3.5 3.5-3.5 3.5" stroke={p} /></>),
  split: (p) => (<><path d="M3 12h6c4 0 4-6 8-6h2M9 12c4 0 4 6 8 6h2" /><path d="M17 3.5L20 6l-3 2.5M17 15.5l3 2.5-3 2.5" stroke={p} /></>),
  compress: (p) => (<><path d="M12 3v6M9 6.5l3 3 3-3M12 21v-6M9 17.5l3-3 3 3" /><path d="M5 12h14" stroke={p} /></>),
  rotate: (p) => (<><path d="M20 12a8 8 0 1 1-2.6-5.9" /><path d="M20 3.5v5h-5" stroke={p} /></>),
  extract: (p) => (<><rect x="3" y="9" width="11" height="12" rx="2.2" /><path d="M12 12l8-8M14 4h6v6" stroke={p} /></>),
  reorder: (p) => (<><path d="M8 4v16M5 7l3-3 3 3" /><path d="M16 20V4M13 17l3 3 3-3" stroke={p} /></>),
  trash: (p) => (<><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /><path d="M10 11v5M14 11v5" stroke={p} /></>),
  image: (p) => (<><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.8" fill={p} stroke="none" /><path d="M3 17l5-5 4 4 3-3 6 5" /></>),
  images: (p) => (<><rect x="7" y="3" width="14" height="12" rx="2.5" /><path d="M3 8v10a2.5 2.5 0 0 0 2.5 2.5H17" /><circle cx="13" cy="7.6" r="1.5" fill={p} stroke="none" /></>),
  eye: (p) => (<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" fill={p} stroke="none" /></>),
  info: (p) => (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><circle cx="12" cy="7.6" r="1.3" fill={p} stroke="none" /></>),
  hash: (p) => (<><path d="M9 4L7 20M17 4l-2 16" /><path d="M4 9h16M3 15h16" stroke={p} /></>),
  drop: (p) => (<><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5" stroke={p} /></>),
  crop: (p) => (<><path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M2 6h14a2 2 0 0 1 2 2v14" stroke={p} /></>),
  pencil: (p) => (<><path d="M4 20l1-5L16 4l4 4L9 19z" /><path d="M13 7l4 4" stroke={p} /></>),
  lock: (p) => (<><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><circle cx="12" cy="16" r="1.7" fill={p} stroke="none" /></>),
  unlock: (p) => (<><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 7.6-1.8" /><circle cx="12" cy="16" r="1.7" fill={p} stroke="none" /></>),
  lines: (p) => (<><path d="M4 6h16M4 11h16" /><path d="M4 16h10" stroke={p} /></>),
  scan: (p) => (<><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" stroke={p} /></>),
  sign: (p) => (<><path d="M15 3l6 6-8 8-6 1 1-6z" /><path d="M3 21c2 0 3-2 5-2s2 2 4 2" stroke={p} /></>),
  form: (p) => (<><rect x="3" y="4" width="7" height="7" rx="1.8" /><path d="M5 7.6l1.6 1.6L9 6" stroke={p} /><path d="M13 6h8M13 9.5h5M13 15h8M13 18.5h5" /><rect x="3" y="13" width="7" height="7" rx="1.8" /></>),
  redact: (p) => (<><rect x="3" y="5" width="18" height="4" rx="1.4" fill={W} stroke="none" /><rect x="3" y="11" width="11" height="4" rx="1.4" fill={p} stroke="none" /><path d="M3 19h15" /></>),
  pdf: () => label('PDF', 9, 15),
  compare: (p) => (<><path d="M12 3v18" strokeOpacity={0.5} /><path d="M3 8h6M3 12h6M3 16h4" /><path d="M15 8h6M15 12h6M15 16h3" stroke={p} /></>),
  convert: (p) => (<><path d="M3 12h15" /><path d="M13 6l6 6-6 6" stroke={p} /></>),
  resize: (p) => (<><path d="M14 4h6v6M10 20H4v-6" /><path d="M20 4l-7 7M4 20l7-7" stroke={p} /></>),
  flip: (p) => (<><path d="M12 3v18" stroke={p} strokeDasharray="2 3" /><path d="M9 7L3 12l6 5zM15 7l6 5-6 5z" /></>),
  swap: (p) => (<><path d="M4 8h14l-3.5-3.5" /><path d="M20 16H6l3.5 3.5" stroke={p} /></>),
  b64: () => label('64', 12, 16.5),
  pipette: (p) => (<><path d="M4 20l1-4 9-9 3 3-9 9z" /><path d="M14 7l3-3 3 3-3 3" stroke={p} /></>),
  bezier: (p) => (<><path d="M3 18C7 18 7 6 12 6s5 12 9 12" /><circle cx="3" cy="18" r="2" fill={p} stroke="none" /><circle cx="21" cy="18" r="2" fill={p} stroke="none" /><circle cx="12" cy="6" r="2" fill={p} stroke="none" /></>),
  zoom: (p) => (<><circle cx="10.5" cy="10.5" r="6.5" /><path d="M16 16l5 5" /><path d="M10.5 8v5M8 10.5h5" stroke={p} /></>),
  blur: (p) => (<><circle cx="12" cy="12" r="3" fill={W} /><circle cx="12" cy="12" r="6.5" stroke={p} strokeDasharray="2 3" /><circle cx="12" cy="12" r="10" strokeDasharray="1 4" /></>),
  qr: (p) => (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="5.5" y="5.5" width="2" height="2" fill={W} stroke="none" /><rect x="16.5" y="5.5" width="2" height="2" fill={W} stroke="none" /><rect x="5.5" y="16.5" width="2" height="2" fill={W} stroke="none" /><rect x="14" y="14" width="3.2" height="3.2" fill={p} stroke="none" /><rect x="18" y="18" width="3" height="3" fill={p} stroke="none" /></>),
  play: (p) => (<><path d="M8 5v14l11-7z" fill={W} /><path d="M3 12a9 9 0 0 1 2.5-6.2" stroke={p} /></>),
  sliders: (p) => (<><path d="M4 7h10M18 7h2M4 17h3M11 17h9" /><circle cx="16" cy="7" r="2.2" fill={p} stroke="none" /><circle cx="9" cy="17" r="2.2" fill={p} stroke="none" /></>),
  count: (p) => (<><path d="M4 7h16M4 12h16M4 17h7" /><path d="M16 17h5M18.5 14.5v5" stroke={p} /></>),
  chars: (p) => (<>{label('Ab', 14, 15)}<path d="M5 20h14" stroke={p} /></>),
  case: (p) => (<>{label('Aa', 15, 16)}<path d="M5 20h14" stroke={p} /></>),
  dupes: (p) => (<><rect x="3" y="3" width="12" height="12" rx="2.6" /><rect x="9" y="9" width="12" height="12" rx="2.6" stroke={p} /></>),
  sort: (p) => (<><path d="M3 6h5M3 12h8M3 18h11" /><path d="M19 4v15M16 16l3 3 3-3" stroke={p} /></>),
  sparkle: (p) => (<><path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z" fill={W} /><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z" fill={p} stroke="none" /></>),
  diff: (p) => (<><path d="M7 3v8M3 7h8" /><path d="M13 17h8" stroke={p} /><path d="M3 17h6M13 7h8" strokeOpacity={0.55} /></>),
  braces: (p) => (<>{label('{ }', 15, 16.5)}<circle cx="12" cy="12" r="1.5" fill={p} stroke="none" /></>),
  check: (p) => (<path d="M4.5 12.5l5 5L19.5 7" stroke={p} strokeWidth={3} />),
  minify: (p) => (<><path d="M5 7l5 5-5 5" /><path d="M19 7l-5 5 5 5" stroke={p} /></>),
  xml: (p) => (<><path d="M8 6l-6 6 6 6M16 6l6 6-6 6" /><path d="M14 4l-4 16" stroke={p} /></>),
  link: (p) => (<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" stroke={p} /></>),
  html: (p) => (<>{label('&', 18, 17.5)}<path d="M4 21h16" stroke={p} /></>),
  regex: (p) => (<><path d="M15 4v10M10.7 6.5l8.6 5M19.3 6.5l-8.6 5" /><circle cx="6" cy="18" r="2.2" fill={p} stroke="none" /></>),
  markdown: (p) => (<><path d="M3 18V6l4.5 6L12 6v12" /><path d="M17 7v9m-3-3l3 3 3-3" stroke={p} /></>),
  key: (p) => (<><circle cx="8" cy="15" r="4.5" /><path d="M11.5 11.5l9-8.5" /><path d="M17 6l3 3M14 9l2.5 2.5" stroke={p} /></>),
  uuid: (p) => (<>{label('ID', 13, 14)}<path d="M3 19h3M8 19h5M15 19h3M20 19h1" stroke={p} /></>),
  clock: (p) => (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" stroke={p} /></>),
  palette: (p) => (<><path d="M12 3a9 9 0 0 0 0 18c1.7 0 2-1.2 1.4-2.2-.7-1.2.1-2.8 1.6-2.8H17a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" /><circle cx="7.5" cy="11" r="1.2" fill={p} stroke="none" /><circle cx="10" cy="7" r="1.2" fill={p} stroke="none" /><circle cx="15" cy="7" r="1.2" fill={p} stroke="none" /></>),
};

/** Where the glyph sits (centre x, centre y) and how big its 24-unit box is drawn, per base. */
const SLOT: Record<ArtBase, { x: number; y: number; size: number }> = {
  page: { x: 26, y: 28.5, size: 21 },
  note: { x: 24, y: 28, size: 22 },
  photo: { x: 24, y: 24.5, size: 24 },
  window: { x: 24, y: 29, size: 21 },
};

function Base({ base, fill, stack }: { base: ArtBase; fill: string; stack: boolean }) {
  switch (base) {
    case 'page':
      return (
        <>
          {stack && <rect x="6" y="6" width="27" height="35" rx="5" transform="rotate(-9 20 24)" fill={fill} opacity={0.3} />}
          <path d="M18 7h12.5l10 10v21a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5z" fill={fill} />
          <path d="M30.5 7v10h10z" fill={W} opacity={0.4} />
        </>
      );
    case 'note':
      return (
        <>
          {stack && <rect x="6" y="6" width="28" height="34" rx="6" transform="rotate(-9 20 23)" fill={fill} opacity={0.3} />}
          <rect x="10" y="8" width="29" height="34" rx="6" fill={fill} />
          <circle cx="18" cy="8" r="2.3" fill={W} opacity={0.85} />
          <circle cx="31" cy="8" r="2.3" fill={W} opacity={0.85} />
        </>
      );
    case 'photo':
      return (
        <>
          <rect x="5" y="5" width="38" height="38" rx="9" fill={fill} />
          <circle cx="34" cy="14" r="4.2" fill={W} opacity={0.28} />
          <path d="M5 34l11-9 9 8 6-5 12 9v2a9 9 0 0 1-9 9H14a9 9 0 0 1-9-9z" fill={W} opacity={0.2} />
        </>
      );
    case 'window':
      return (
        <>
          <rect x="4" y="8" width="40" height="33" rx="7" fill={fill} />
          <path d="M4 15a7 7 0 0 1 7-7h26a7 7 0 0 1 7 7v1H4z" fill={W} opacity={0.22} />
          <circle cx="11" cy="12.5" r="1.6" fill={W} opacity={0.9} />
          <circle cx="16.5" cy="12.5" r="1.6" fill={W} opacity={0.65} />
          <circle cx="22" cy="12.5" r="1.6" fill={W} opacity={0.4} />
        </>
      );
  }
}

function Tag({ format, base }: { format: TagFormat; base: ArtBase }) {
  const w = format.length * 6.1 + 8;
  const x = base === 'window' ? 45 - w : 3;
  const y = base === 'window' ? 34 : 35;
  return (
    <g>
      <rect x={x} y={y} width={w} height="10.5" rx="3.4" fill={ART_COLORS[TAG_COLORS[format]]} stroke={W} strokeWidth="1.6" />
      <text x={x + w / 2} y={y + 7.7} textAnchor="middle" fontSize="7.4" fontWeight={800} fill={W} fontFamily="'Inter Variable', system-ui, sans-serif">
        {format}
      </text>
    </g>
  );
}

function Scene({ art, small, mark }: { art: Art; small: boolean; mark: Record<string, string> }) {
  const fill = ART_COLORS[art.color];
  const slot = SLOT[art.base];
  const k = slot.size / 24;
  const showTag = art.tag && !small;
  return (
    <svg viewBox="2 3 44 44" width="100%" height="100%" aria-hidden="true" focusable="false" {...mark}>
      <Base base={art.base} fill={fill} stack={Boolean(art.stack) && !small} />
      <g transform={`translate(${slot.x - 12 * k} ${slot.y - 12 * k}) scale(${k})`} fill="none" stroke={W} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {GLYPHS[art.glyph](popFor(art.color))}
      </g>
      {showTag && <Tag format={art.tag!} base={art.base} />}
    </svg>
  );
}

/** The illustration for a tool slug. Unknown slugs render a neutral sheet so a new tool never shows a hole. */
export function ToolArt({ slug, small = false }: { slug: string; small?: boolean }) {
  return <Scene art={TOOL_ART[slug] ?? { base: 'page', color: 'slate', glyph: 'lines' }} small={small} mark={{ 'data-art': slug }} />;
}

/** The illustration of a category heading, drawn with the same scene code as the tools. */
export function CategoryArt({ id, small = false }: { id: keyof typeof CATEGORY_ART; small?: boolean }) {
  return <Scene art={CATEGORY_ART[id]} small={small} mark={{ 'data-category-art': id }} />;
}

export const categoryColorOf = (id: keyof typeof CATEGORY_ART): string => ART_COLORS[CATEGORY_ART[id].color];

/** The tile colour behind an icon: the tool's colour, softened. */
export const artColorOf = (slug: string): string => ART_COLORS[(TOOL_ART[slug]?.color ?? 'slate') as ArtColor];
