import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '@/config/site';
import { useLocalize } from '@/i18n/useLocalize';
import { useI18n, type MessageKey } from '@/i18n';
import { categories, categoryPath, groupsInCategory, toolPath, toolsInCategory, toolsInGroup } from '@/tools/registry';
import { Icon } from '../Icon';
import { ToolIcon } from '../ui/ToolIcon';
import { ToolSearch } from '../ui/ToolSearch';
import { MegaMenu } from './MegaMenu';

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 6v20M10 16l10-10M13 13.5l9 12.5" />
      </svg>
    </span>
  );
}

/** Mobile equivalent of the mega menu: one expandable section per category. */
function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { t } = useI18n();
  const loc = useLocalize();
  return (
    <div className="mobile-nav" id="mobile-nav">
      <div className="container">
        <div className="mobile-search">
          <ToolSearch onNavigate={onNavigate} />
        </div>
        <nav aria-label={t('nav.mobile')}>
          {categories.map((c) => {
            const isOpen = expanded === c.id;
            return (
              <div key={c.id} className="acc">
                <button type="button" className="acc-btn" aria-expanded={isOpen} aria-controls={`acc-${c.id}`} onClick={() => setExpanded(isOpen ? null : c.id)}>
                  <span className={`tool-icon tool-icon-sm chip-${c.id}`} aria-hidden="true">
                    <Icon name={c.icon} size={16} />
                  </span>
                  {t(`cat.${c.id}` as MessageKey)}
                  <Icon name="chevron-down" size={18} className={`acc-chevron ${isOpen ? 'is-open' : ''}`} />
                </button>
                {isOpen && (
                  <ul className="acc-panel" id={`acc-${c.id}`}>
                    {groupsInCategory(c.id).map((g) => (
                      <li key={g.name} className="acc-group">
                        <span className="acc-group-title">{loc.group(g).name}</span>
                        <ul>
                          {toolsInGroup(c.id, g.name).map((tool) => (
                            <li key={tool.slug}>
                              <Link to={toolPath(tool)} onClick={onNavigate}>
                                <ToolIcon tool={tool} size="sm" />
                                {loc.tool(tool).name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                    <li>
                      <Link to={categoryPath(c.id)} className="acc-viewall" onClick={onNavigate}>
                        {t('mega.viewAll', { count: toolsInCategory(c.id).length })} <Icon name="arrow-right" size={14} />
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            );
          })}
          <Link to="/tools" className="acc-link" onClick={onNavigate}>
            {t('nav.allTools')}
          </Link>
          <Link to="/blog" className="acc-link" onClick={onNavigate}>
            {t('nav.blog')}
          </Link>
          <Link to="/about" className="acc-link" onClick={onNavigate}>
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="acc-link" onClick={onNavigate}>
            {t('nav.contact')}
          </Link>
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={t('brand.home', { site: site.name })}>
          <BrandMark />
          {site.name}
        </Link>
        <nav className="nav" aria-label={t('nav.primary')}>
          {categories.map((c) => (
            <NavLink key={c.id} to={categoryPath(c.id)} className="nav-link">
              {t(`nav.${c.id}` as MessageKey)}
            </NavLink>
          ))}
          <MegaMenu />
          <NavLink to="/blog" className="nav-link">
            {t('nav.blog')}
          </NavLink>
        </nav>
        <div className="header-search">
          <ToolSearch shortcut />
        </div>
        <button
          type="button"
          className="icon-btn menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>
      {open && <MobileNav onNavigate={() => setOpen(false)} />}
    </header>
  );
}
