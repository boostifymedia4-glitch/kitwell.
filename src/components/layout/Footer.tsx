import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { categories, categoryPath, featuredTools, toolPath, toolsInCategory } from '@/tools/registry';
import { BrandMark } from './Header';

const COMPANY = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/cookies', label: 'Cookie information' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <BrandMark />
              {site.name}
            </Link>
            <p>{site.tagline}. Files are processed in your browser and are not uploaded by our tools.</p>
          </div>
          {categories.map((c) => (
            <nav key={c.id} aria-label={c.name}>
              <h2>
                <Link to={categoryPath(c.id)}>{c.name}</Link>
              </h2>
              <ul>
                {featuredTools(c.id)
                  .slice(0, 6)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link to={toolPath(t)}>{t.name}</Link>
                    </li>
                  ))}
                <li>
                  <Link to={categoryPath(c.id)} className="footer-all">
                    All {toolsInCategory(c.id).length} tools →
                  </Link>
                </li>
              </ul>
            </nav>
          ))}
          <nav aria-label="Company">
            <h2>Company</h2>
            <ul>
              {COMPANY.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <Link to="/tools">Browse all tools</Link>
        </div>
      </div>
    </footer>
  );
}
