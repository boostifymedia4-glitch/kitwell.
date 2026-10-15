import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals an element once, the first time it scrolls into view. Server-rendered and no-JavaScript visitors see the
 * content at once; elements already on screen at load are never hidden, and reduced motion shows everything instantly.
 */
export function useRevealOnce<T extends HTMLElement>(): { ref: React.RefObject<T | null>; state: string } {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState('');
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return;
    setState('is-armed');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('is-armed is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, state };
}

export function Reveal({ as, delay = 0, className = '', children }: { as?: ElementType; delay?: number; className?: string; children: ReactNode }) {
  const Tag = as ?? 'div';
  const { ref, state } = useRevealOnce<HTMLElement>();
  return (
    <Tag ref={ref} className={`about-reveal ${state} ${className}`.trim()} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Renders text with `[[phrase]]` shown in the soft marker highlight. */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 ? <mark key={i} className="about-mark">{part}</mark> : <span key={i}>{part}</span>))}
    </>
  );
}

/** A quote whose words fade in one after another the first time it is seen. */
export function QuoteWords({ text, className = '' }: { text: string; className?: string }) {
  const { ref, state } = useRevealOnce<HTMLQuoteElement>();
  const words = text.split(' ');
  return (
    <blockquote ref={ref} className={`about-words ${state} ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="about-word" style={{ '--i': i } as CSSProperties}>
            {w}
          </span>
        ))}
      </span>
    </blockquote>
  );
}

/** Fills a thin line as the story is scrolled (wide screens only; the line is hidden by CSS elsewhere). */
export function StoryProgress({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const line = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const target = targetRef.current;
    const el = line.current;
    if (!target || !el || reducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = target.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const done = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / Math.max(1, total)));
      el.style.setProperty('--p', String(done));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetRef]);
  return <span ref={line} className="about-progress" aria-hidden="true" />;
}

const PHOTO = '/images/founder/ubaid-ullah';

/**
 * The founder's portrait: a circle inside a slowly turning teal and champagne ring, with a soft glow, tiny orbiting dots,
 * a gentle float, an entrance, a pointer tilt with a light sheen (fine pointers only) and a "Founder & CEO" pill.
 * Every looping effect is switched off by CSS for visitors who prefer reduced motion.
 */
export function FounderPhoto({ size = 'hero', pill = 'Founder & CEO', priority = false }: { size?: 'hero' | 'small'; pill?: string; priority?: boolean }) {
  const tilt = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = tilt.current;
    if (!el || size !== 'hero' || reducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
    };
    const leave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [size]);
  return (
    <div className="founder-photo" data-size={size}>
      <div className="fp-float">
        <div className="fp-glow" aria-hidden="true" />
        <div className="fp-tilt" ref={tilt}>
          <div className="fp-ring" aria-hidden="true" />
          {size === 'hero' && (
            <>
              <span className="fp-orbit fp-orbit-1" aria-hidden="true"><i /></span>
              <span className="fp-orbit fp-orbit-2" aria-hidden="true"><i /></span>
              <span className="fp-orbit fp-orbit-3" aria-hidden="true"><i /></span>
            </>
          )}
          <div className="fp-circle">
            <picture>
              <source srcSet={`${PHOTO}.webp`} type="image/webp" />
              <img
                src={`${PHOTO}.jpg`}
                width={413}
                height={531}
                alt="Ubaid Ullah, founder of Kitwell"
                fetchPriority={priority ? 'high' : undefined}
                loading={priority ? undefined : 'lazy'}
                decoding="async"
              />
            </picture>
            <span className="fp-sheen" aria-hidden="true" />
          </div>
          {size === 'hero' && <span className="fp-pill">{pill}</span>}
        </div>
      </div>
    </div>
  );
}

export const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
