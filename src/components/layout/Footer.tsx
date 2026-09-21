import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { categories, categoryPath, toolPath, toolsInCategory } from '@/tools/registry';
import { BrandMark } from './Header';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              <BrandMark />
              {site.name}
            </Link>
            <p className="muted" style={{ marginTop: 12, fontSize: 'var(--text-sm)', maxWidth: '34ch' }}>
              {site.tagline}. Files are processed in your browser and are not uploaded by our tools.
            </p>
          </div>
          {categories.map((c) => (
            <nav key={c.id} aria-label={c.name}>
              <h2>
                <Link to={categoryPath(c.id)} style={{ color: 'inherit' }}>
                  {c.name}
                </Link>
              </h2>
              <ul>
                {toolsInCategory(c.id)
                  .filter((t) => t.popular)
                  .slice(0, 5)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link to={toolPath(t)}>{t.name}</Link>
                    </li>
                  ))}
                <li>
                  <Link to={categoryPath(c.id)}>All {c.short.toLowerCase()} tools →</Link>
                </li>
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <nav aria-label="Legal" className="row" style={{ gap: 16 }}>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
