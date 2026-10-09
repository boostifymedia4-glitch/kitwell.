import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { AdSlot } from '@/components/ui/AdSlot';
import { Faq } from '@/components/ui/Faq';
import { ToolGrid } from '@/components/ui/ToolCard';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { site } from '@/config/site';
import { English } from '@/i18n/English';
import { useI18n, type MessageKey } from '@/i18n';
import { getPageMeta } from '@/pageMeta';
import { categories, categoryPath, getTool, showcaseTools, popularTools, toolPath, toolsInCategory, tools } from '@/tools/registry';

const SHORTCUTS = ['jpg-to-png', 'image-compressor', 'merge-pdf', 'pdf-to-jpg', 'json-formatter', 'word-counter']
  .map(getTool)
  .filter((t) => t !== undefined);

const TRUST: { icon: string; title: MessageKey; text: MessageKey }[] = [
  { icon: 'shield', title: 'home.trust1Title', text: 'home.trust1Text' },
  { icon: 'lock', title: 'home.trust2Title', text: 'home.trust2Text' },
  { icon: 'info', title: 'home.trust3Title', text: 'home.trust3Text' },
];

const FAQ = [
  { q: 'Are the tools really free?', a: `Yes. There is no sign-up and no per-use fee. ${site.name} may be supported by advertising in future; ads will always be labelled and kept away from tool controls and download buttons.` },
  { q: 'Are my files uploaded?', a: 'No. Image, PDF, text and developer tools run in your browser using JavaScript. Files are read locally and results are created locally. See the Privacy Policy for details.' },
  { q: 'Which browsers work best?', a: 'Current versions of Chrome, Edge, Firefox and Safari. A few features, such as saving WebP images, depend on what your browser supports; the tool will tell you if something is unavailable.' },
  { q: 'Is there a file size limit?', a: 'Because work happens on your device, limits depend on your memory. Each tool sets a sensible cap (for example 25 MB per image and 100 MB per PDF) and shows it before you upload.' },
];

export default function Home() {
  const meta = getPageMeta('/');
  const { t } = useI18n();
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
          <English><ul className="shortcuts" aria-label={t('home.popular')}>
            {SHORTCUTS.map((t) => (
              <li key={t.slug}>
                <Link to={toolPath(t)} className="shortcut">
                  <ToolIcon tool={t} size="sm" />
                  {t.name}
                </Link>
              </li>
            ))}
          </ul></English>
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
          <English>
            <ToolGrid tools={popularTools()} showCategory />
          </English>
        </section>

        {categories.map((c) => (
          <section key={c.id} className="section" aria-labelledby={`home-${c.id}`}>
            <div className="section-head">
              <div className="row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                <span className={`tool-icon tool-icon-md chip-${c.id}`} aria-hidden="true">
                  <Icon name={c.icon} size={22} />
                </span>
                <div>
                  <h2 id={`home-${c.id}`}>{t(`cat.${c.id}` as MessageKey)}</h2>
                  <English as="p" style={{ display: 'block' }}>{c.description}</English>
                </div>
              </div>
              <Link to={categoryPath(c.id)} className="btn btn-secondary btn-sm">
                {t('home.viewAll', { count: toolsInCategory(c.id).length })} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <English>
              <ToolGrid tools={showcaseTools(c.id)} />
            </English>
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
                <span className="tool-icon tool-icon-md chip-image" aria-hidden="true">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </div>
            ))}
          </div>
        </section>

        <English>
          <section className="section" aria-labelledby="faq">
            <div className="section-head">
              <h2 id="faq">Questions, answered</h2>
            </div>
            <Faq items={FAQ} />
          </section>
        </English>
      </div>
    </>
  );
}
