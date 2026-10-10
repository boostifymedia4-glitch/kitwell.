import type { CSSProperties } from 'react';
import { ART_COLORS } from './ToolArt';

/**
 * The three illustrations of the homepage privacy section, in the same visual language as the tool icons
 * (solid colour, white details, one accent, a tinted tile): a browser window holding a document with a shield,
 * a document with an "account not needed" badge, and a checklist with an information badge.
 */
export type TrustKind = 'browser' | 'account' | 'limits';

const TRUST_COLOR: Record<TrustKind, string> = { browser: ART_COLORS.blue, account: ART_COLORS.indigo, limits: ART_COLORS.amber };

const WHITE = '#FFFFFF';
const GREEN = ART_COLORS.green;
const RED = ART_COLORS.red;
const SLATE = ART_COLORS.slate;
const POP = '#FFE28A';

function Browser() {
  const blue = ART_COLORS.blue;
  return (
    <>
      <rect x="4" y="8" width="40" height="33" rx="7" fill={blue} />
      <path d="M4 15a7 7 0 0 1 7-7h26a7 7 0 0 1 7 7v1H4z" fill={WHITE} opacity={0.22} />
      <circle cx="11" cy="12.5" r="1.6" fill={WHITE} opacity={0.9} />
      <circle cx="16.5" cy="12.5" r="1.6" fill={WHITE} opacity={0.65} />
      <circle cx="22" cy="12.5" r="1.6" fill={WHITE} opacity={0.4} />
      <rect x="12" y="19" width="18" height="21" rx="3.2" fill={WHITE} />
      <rect x="15.5" y="24" width="11" height="2.6" rx="1.3" fill={blue} opacity={0.5} />
      <rect x="15.5" y="29" width="11" height="2.6" rx="1.3" fill={blue} opacity={0.5} />
      <rect x="15.5" y="34" width="7" height="2.6" rx="1.3" fill={blue} opacity={0.5} />
      <path d="M36.5 23l8 3v6.5c0 5-3.4 8.6-8 10.2-4.6-1.6-8-5.2-8-10.2V26z" fill={GREEN} stroke={WHITE} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M32.6 33l2.9 2.9 5.2-5.4" fill="none" stroke={WHITE} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Account() {
  const indigo = ART_COLORS.indigo;
  return (
    <>
      <path d="M21 6h12.5l10 10v21a5 5 0 0 1-5 5H21a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill={indigo} />
      <path d="M33.5 6v10h10z" fill={WHITE} opacity={0.4} />
      <path d="M33 24l1.7 4.6 4.6 1.7-4.6 1.7L33 36.6l-1.7-4.6-4.6-1.7 4.6-1.7z" fill={POP} />
      <rect x="22" y="14" width="7" height="2.6" rx="1.3" fill={WHITE} opacity={0.8} />
      <circle cx="16" cy="32" r="10" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <circle cx="16" cy="29" r="3.2" fill={SLATE} />
      <path d="M10.2 39.6a5.8 5.8 0 0 1 11.6 0z" fill={SLATE} />
      <path d="M9 40L23 24" fill="none" stroke={RED} strokeWidth="2.6" strokeLinecap="round" />
    </>
  );
}

function Limits() {
  const amber = ART_COLORS.amber;
  return (
    <>
      <rect x="9" y="8" width="30" height="35" rx="6" fill={amber} />
      <rect x="17.5" y="4.5" width="13" height="7.5" rx="3" fill={WHITE} stroke={amber} strokeWidth="1.6" />
      <rect x="14" y="17" width="7.5" height="7.5" rx="2" fill={WHITE} />
      <path d="M15.6 20.8l1.6 1.6 3-3.2" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="27" width="7.5" height="7.5" rx="2" fill={WHITE} />
      <path d="M15.6 30.8l1.6 1.6 3-3.2" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="25" y="19.2" width="10" height="3" rx="1.5" fill={WHITE} opacity={0.9} />
      <rect x="25" y="29.2" width="10" height="3" rx="1.5" fill={WHITE} opacity={0.9} />
      <circle cx="36" cy="37" r="8.5" fill={ART_COLORS.blue} stroke={WHITE} strokeWidth="1.8" />
      <circle cx="36" cy="32.4" r="1.3" fill={WHITE} />
      <path d="M36 36v5.2" fill="none" stroke={WHITE} strokeWidth="2.3" strokeLinecap="round" />
    </>
  );
}

const SCENES: Record<TrustKind, () => React.JSX.Element> = { browser: Browser, account: Account, limits: Limits };

/** The tinted tile with one of the three illustrations. Decorative: the card heading carries the meaning. */
export function TrustIcon({ kind }: { kind: TrustKind }) {
  const Scene = SCENES[kind];
  return (
    <span className="tool-icon tool-icon-lg" style={{ '--art': TRUST_COLOR[kind] } as CSSProperties} aria-hidden="true">
      <svg viewBox="2 3 44 44" width="100%" height="100%" focusable="false" data-trust={kind}>
        <Scene />
      </svg>
    </span>
  );
}

export const TRUST_KINDS: readonly TrustKind[] = ['browser', 'account', 'limits'];
