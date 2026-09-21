import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolGrid } from '@/components/ui/ToolCard';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { getPageMeta } from '@/pageMeta';
import { categories, categoryPath, toolsInCategory, tools } from '@/tools/registry';

export default function Tools() {
  const meta = getPageMeta('/tools');
  return (
    <>
      {meta && <Seo {...meta} />}
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path="/tools" />
          <h1>All tools</h1>
          <p className="lead">{tools.length} free tools for images, PDFs, text and development. Search, or browse by category.</p>
          <div style={{ marginTop: 'var(--space-5)', maxWidth: 560 }}>
            <ToolSearch variant="hero" />
          </div>
        </header>
        {categories.map((c) => (
          <section key={c.id} className="section" style={{ paddingTop: 'var(--space-6)' }} aria-labelledby={`cat-${c.id}`}>
            <div className="section-head">
              <div className="row">
                <span className={`chip chip-${c.id}`}>
                  <Icon name={c.icon} size={20} />
                </span>
                <div>
                  <h2 id={`cat-${c.id}`}>{c.name}</h2>
                  <p style={{ marginTop: 2 }}>{c.description}</p>
                </div>
              </div>
              <Link to={categoryPath(c.id)} className="btn btn-secondary btn-sm">
                View category <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <ToolGrid tools={toolsInCategory(c.id)} />
          </section>
        ))}
      </div>
    </>
  );
}
