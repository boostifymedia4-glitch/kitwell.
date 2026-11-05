import type { ReactNode } from 'react';
import { Link } from '@/i18n/Link';
import { Icon } from '@/components/Icon';
import { site } from '@/config/site';
import { useI18n, type MessageKey } from '@/i18n';
import { useReveal } from '@/lib/hooks';
import { tools } from '@/tools/registry';

const vars = () => ({ site: site.name, count: tools.length });

/** The introduction below the hero: a heading and two lines about having every tool in one place. */
export function IntroSection() {
  const { t } = useI18n();
  return (
    <section className="section home-intro" aria-labelledby="home-intro-title">
      <h2 id="home-intro-title">{t('home.intro.title')}</h2>
      <p>{t('home.intro.text', vars())}</p>
    </section>
  );
}

/** A coloured badge with an icon, shown above or beside a section heading. */
function HeadBadge({ icon, tone }: { icon: string; tone: string }) {
  return (
    <span className={`head-badge tone-${tone}`} aria-hidden="true">
      <Icon name={icon} size={26} />
    </span>
  );
}

function FeatureCard({ icon, title, text, tone }: { icon: string; title: ReactNode; text: ReactNode; tone: string }) {
  return (
    <div className="card feature-card">
      <span className={`feature-icon tone-${tone}`} aria-hidden="true">
        <Icon name={icon} size={24} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

/** "Safe, private, and built to be trusted": how files are handled, HTTPS, sharing and limits. */
export function TrustSection() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const cards: { icon: string; key: string; tone: string }[] = [
    { icon: 'monitor', key: 'browser', tone: 'blue' },
    { icon: 'lock', key: 'https', tone: 'green' },
    { icon: 'share', key: 'choice', tone: 'violet' },
    { icon: 'badge-check', key: 'limits', tone: 'amber' },
  ];
  return (
    <section className="section" aria-labelledby="home-trust-title">
      <div className="section-head section-head-center">
        <div>
          <HeadBadge icon="lock" tone="green" />
          <h2 id="home-trust-title">{t('home.trust.title')}</h2>
          <p>{t('home.trust.intro', vars())}</p>
        </div>
      </div>
      <div className="feature-grid" ref={ref}>
        {cards.map((c) => (
          <FeatureCard key={c.key} icon={c.icon} tone={c.tone} title={t(`home.trust.${c.key}.title` as MessageKey)} text={t(`home.trust.${c.key}.text` as MessageKey)} />
        ))}
      </div>
      <p className="section-foot">
        <Link to="/privacy" className="text-link">
          {t('home.trust.link')} <Icon name="arrow-right" size={14} />
        </Link>
      </p>
    </section>
  );
}

function WindowsGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="10" y="1" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="1" y="10" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="10" y="10" width="7" height="7" rx="1" fill="currentColor" />
    </svg>
  );
}

function MiniTiles({ n }: { n: number }) {
  return (
    <span className="mini-tiles" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ animationDelay: `${i * 90}ms` }} />
      ))}
    </span>
  );
}

/** A light, original illustration of the same page on a laptop, a tablet and a phone, with the supported systems below. */
export function CompatSection() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section" aria-labelledby="home-compat-title">
      <div className="compat card" ref={ref}>
        <div className="compat-text">
          <HeadBadge icon="laptop" tone="blue" />
          <h2 id="home-compat-title">{t('home.compat.title')}</h2>
          <p>{t('home.compat.intro', vars())}</p>
          <ul className="os-list">
            <li><WindowsGlyph /> Windows</li>
            <li><Icon name="laptop" size={18} /> macOS</li>
            <li><Icon name="terminal" size={18} /> Linux</li>
          </ul>
          <p className="compat-note">{t('home.compat.note')}</p>
        </div>
        <div className="compat-visual" aria-hidden="true">
          <figure className="device device-laptop">
            <div className="device-screen">
              <span className="mini-bar" />
              <MiniTiles n={8} />
            </div>
            <div className="device-base" />
            <figcaption>{t('home.compat.desktop')}</figcaption>
          </figure>
          <figure className="device device-tablet">
            <div className="device-screen">
              <span className="mini-bar" />
              <MiniTiles n={6} />
            </div>
            <figcaption>{t('home.compat.tablet')}</figcaption>
          </figure>
          <figure className="device device-phone">
            <div className="device-screen">
              <span className="mini-bar" />
              <MiniTiles n={4} />
            </div>
            <figcaption>{t('home.compat.phone')}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Six reasons to use the site, each one backed by something the site really does. */
export function WhySection() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const cards: { icon: string; key: string; tone: string }[] = [
    { icon: 'grid', key: 'all', tone: 'teal' },
    { icon: 'gift', key: 'free', tone: 'rose' },
    { icon: 'globe', key: 'browser', tone: 'blue' },
    { icon: 'sparkles', key: 'simple', tone: 'amber' },
    { icon: 'languages', key: 'languages', tone: 'violet' },
    { icon: 'shield', key: 'secure', tone: 'green' },
  ];
  return (
    <section className="section" aria-labelledby="home-why-title">
      <div className="section-head section-head-center">
        <div>
          <HeadBadge icon="badge-check" tone="amber" />
          <h2 id="home-why-title">{t('home.why.title', vars())}</h2>
          <p>{t('home.why.intro')}</p>
        </div>
      </div>
      <div className="feature-grid feature-grid-3" ref={ref}>
        {cards.map((c) => (
          <FeatureCard key={c.key} icon={c.icon} tone={c.tone} title={t(`home.why.${c.key}.title` as MessageKey)} text={t(`home.why.${c.key}.text` as MessageKey, vars())} />
        ))}
      </div>
    </section>
  );
}
