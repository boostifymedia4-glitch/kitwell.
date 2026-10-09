import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { useI18n, type MessageKey } from '@/i18n';
import { useLocalize } from '@/i18n/useLocalize';
import { categories, categoryPath, featuredTools, popularTools, toolPath, toolsInCategory, tools } from '@/tools/registry';
import { Icon } from '../Icon';
import { BrandMark } from './Header';
import { LanguageSelector } from './LanguageSelector';

/** Footer: tool columns first (they are the reason people come back), then help and company links. */
export function Footer() {
  const { t } = useI18n();
  const loc = useLocalize();
  const legal: { to: string; label: MessageKey }[] = [
    { to: '/privacy', label: 'footer.privacy' },
    { to: '/terms', label: 'footer.terms' },
    { to: '/cookies', label: 'footer.cookies' },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label={t('brand.home', { site: site.name })}>
              <BrandMark />
              {site.name}
            </Link>
            <p>{t('footer.tagline')}</p>
            <ul className="footer-badges">
              <li>
                <Icon name="shield" size={16} />
                {t('footer.local')}
              </li>
              <li>
                <Icon name="check-circle" size={16} />
                {t('footer.noSignup')}
              </li>
            </ul>
          </div>

          <div className="footer-cols">
            <nav aria-labelledby="footer-popular">
              <h2 id="footer-popular">{t('footer.popular')}</h2>
              <ul>
                {popularTools().map((tool) => (
                  <li key={tool.slug}>
                    <Link to={toolPath(tool)}>{loc.tool(tool).name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            {categories.map((c) => (
              <nav key={c.id} aria-labelledby={`footer-${c.id}`}>
                <h2 id={`footer-${c.id}`}>
                  <Link to={categoryPath(c.id)}>{t(`cat.${c.id}` as MessageKey)}</Link>
                </h2>
                <ul>
                  {featuredTools(c.id)
                    .slice(0, 7)
                    .map((tool) => (
                      <li key={tool.slug}>
                        <Link to={toolPath(tool)}>{loc.tool(tool).name}</Link>
                      </li>
                    ))}
                </ul>
                <Link to={categoryPath(c.id)} className="footer-all">
                  {t('footer.seeAll', { count: toolsInCategory(c.id).length })}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </nav>
            ))}
            <nav aria-labelledby="footer-resources">
              <h2 id="footer-resources">{t('footer.resources')}</h2>
              <ul>
                <li>
                  <Link to="/tools">
                    {t('footer.allTools')} ({tools.length})
                  </Link>
                </li>
                <li>
                  <Link to="/help">{t('footer.help')}</Link>
                </li>
                <li>
                  <Link to="/blog">{t('footer.blog')}</Link>
                </li>
                <li>
                  <a href="/sitemap.xml">{t('footer.sitemap')}</a>
                </li>
              </ul>
              <h2 id="footer-company" className="footer-sub">
                {t('footer.company')}
              </h2>
              <ul>
                <li>
                  <Link to="/about">{t('footer.about')}</Link>
                </li>
                <li>
                  <Link to="/contact">{t('footer.contact')}</Link>
                </li>
                {legal.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{t(l.label)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footer.rights', { year: new Date().getFullYear(), site: site.name })}</span>
          <LanguageSelector />
        </div>
      </div>
    </footer>
  );
}
