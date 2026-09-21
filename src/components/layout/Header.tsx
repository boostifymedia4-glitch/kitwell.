import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '@/config/site';
import { categories, categoryPath } from '@/tools/registry';
import { Icon } from '../Icon';
import { ToolSearch } from '../ui/ToolSearch';

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 6v20M10 16l10-10M13 13.5l9 12.5" />
      </svg>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${site.name} home`}>
          <BrandMark />
          {site.name}
        </Link>
        <nav className="nav" aria-label="Primary">
          {categories.map((c) => (
            <NavLink key={c.id} to={categoryPath(c.id)}>
              {c.short}
            </NavLink>
          ))}
          <NavLink to="/tools" end>
            All tools
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
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>
      {open && (
        <div className="mobile-nav" id="mobile-nav">
          <div className="container">
            <div className="search">
              <ToolSearch onNavigate={() => setOpen(false)} />
            </div>
            <nav aria-label="Mobile">
              {categories.map((c) => (
                <Link key={c.id} to={categoryPath(c.id)}>
                  <span className={`chip chip-sm chip-${c.id}`}>
                    <Icon name={c.icon} size={16} />
                  </span>
                  {c.name}
                </Link>
              ))}
              <Link to="/tools">All tools</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
