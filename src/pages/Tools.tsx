import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GroupedTools } from '@/components/ui/GroupedTools';
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
          <div className="page-search">
            <ToolSearch variant="hero" />
          </div>
          <nav aria-label="Jump to a category" className="jump">
            {categories.map((c) => (
              <a key={c.id} href={`#cat-${c.id}`} className="jump-link">
                {c.name}
              </a>
            ))}
          </nav>
        </header>
        {categories.map((c) => (
          <section key={c.id} className="category-block" id={`cat-${c.id}`} aria-labelledby={`cat-${c.id}-title`}>
            <div className="category-head">
              <div className="row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                <span className={`tool-icon tool-icon-md chip-${c.id}`} aria-hidden="true">
                  <Icon name={c.icon} size={22} />
                </span>
                <div>
                  <h2 id={`cat-${c.id}-title`}>{c.name}</h2>
                  <p>{c.description}</p>
                </div>
              </div>
              <Link to={categoryPath(c.id)} className="btn btn-secondary btn-sm">
                View all {toolsInCategory(c.id).length} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <GroupedTools category={c.id} groupLevel="h3" idPrefix={`${c.id}-`} />
          </section>
        ))}
      </div>
    </>
  );
}
