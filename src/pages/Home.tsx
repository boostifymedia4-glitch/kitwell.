import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { AdSlot } from '@/components/ui/AdSlot';
import { Faq } from '@/components/ui/Faq';
import { ToolGrid } from '@/components/ui/ToolCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { TrustIcon, type TrustKind } from '@/components/ui/TrustArt';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { site } from '@/config/site';
import { useLocalize } from '@/i18n/useLocalize';
import { useI18n, type MessageKey } from '@/i18n';
import { usePageMeta } from '@/i18n/usePageMeta';
import { categories, categoryPath, getTool, showcaseTools, popularTools, toolPath, toolsInCategory, tools } from '@/tools/registry';

const SHORTCUTS = ['jpg-to-png', 'image-compressor', 'merge-pdf', 'pdf-to-jpg', 'json-formatter', 'word-counter']
  .map(getTool)
  .filter((t) => t !== undefined);

const TRUST: { kind: TrustKind; title: MessageKey; text: MessageKey }[] = [
  { kind: 'browser', title: 'home.trust1Title', text: 'home.trust1Text' },
  { kind: 'account', title: 'home.trust2Title', text: 'home.trust2Text' },
  { kind: 'limits', title: 'home.trust3Title', text: 'home.trust3Text' },
];

const FAQ_COUNT = 4;

export default function Home() {
  const meta = usePageMeta('/');
  const { t } = useI18n();
  const loc = useLocalize();
  const faq = Array.from({ length: FAQ_COUNT }, (_, i) => ({ q: t(`home.faq${i + 1}.q`), a: t(`home.faq${i + 1}.a`, { site: site.name }) }));
  return (
    <>
      {meta && <Seo {...meta} />}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <h1 id="hero-title">{t('home.title')}</h1>
          <p className="lead">
            {t('home.lead', { count: tools.length })}
          </p>
          <ToolSearch variant="hero" />
          <ul className="shortcuts" aria-label={t('home.popular')}>
            {SHORTCUTS.map((s) => (
              <li key={s.slug}>
                <Link to={toolPath(s)} className="shortcut">
                  <ToolIcon tool={s} size="sm" />
                  {loc.tool(s).name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container">
        <section className="section" aria-labelledby="popular">
          <div className="section-head">
            <div>
              <h2 id="popular">{t('home.popular')}</h2>
              <p>{t('home.popularSub')}</p>
            </div>
            <Link to="/tools" className="btn btn-secondary btn-sm">
              {t('home.allTools', { count: tools.length })} <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          <ToolGrid tools={popularTools()} showCategory />
        </section>

        {categories.map((c) => (
          <section key={c.id} className="section" aria-labelledby={`home-${c.id}`}>
            <div className="section-head">
              <div className="row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                <CategoryIcon id={c.id} />
                <div>
                  <h2 id={`home-${c.id}`}>{t(`cat.${c.id}` as MessageKey)}</h2>
                  <p>{t(`cat.${c.id}.description`)}</p>
                </div>
              </div>
              <Link to={categoryPath(c.id)} className="btn btn-secondary btn-sm">
                {t('home.viewAll', { count: toolsInCategory(c.id).length })} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <ToolGrid tools={showcaseTools(c.id)} />
          </section>
        ))}

        <AdSlot id="home-mid" />

        <section className="section" aria-labelledby="privacy">
          <div className="section-head">
            <div>
              <h2 id="privacy">{t('home.privacyTitle')}</h2>
              <p>{t('home.privacySub')}</p>
            </div>
          </div>
          <div className="trust-grid">
            {TRUST.map((item) => (
              <div key={item.title} className="card trust-item">
                <TrustIcon kind={item.kind} />
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="faq">
          <div className="section-head">
            <h2 id="faq">{t('home.faqTitle')}</h2>
          </div>
          <Faq items={faq} />
        </section>
      </div>
    </>
  );
}
