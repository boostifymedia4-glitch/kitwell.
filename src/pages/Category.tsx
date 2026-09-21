import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolGrid } from '@/components/ui/ToolCard';
import { getPageMeta, NOT_FOUND_META } from '@/pageMeta';
import { categories, categoryPath, getCategory, toolsInCategory } from '@/tools/registry';
import { normalizePath } from '@/routes';

export default function Category() {
  const path = normalizePath(useLocation().pathname);
  const cat = getCategory(path.split('/')[2] ?? '');
  const meta = getPageMeta(path);
  if (!cat || !meta) return <Seo {...NOT_FOUND_META} />;
  const list = toolsInCategory(cat.id);
  const others = categories.filter((c) => c.id !== cat.id);
  return (
    <>
      <Seo {...meta} />
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path={path} />
          <div className="row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
            <span className={`chip chip-${cat.id}`} style={{ width: 52, height: 52 }}>
              <Icon name={cat.icon} size={26} />
            </span>
            <div>
              <h1>{cat.name}</h1>
              <p className="lead">{cat.intro}</p>
            </div>
          </div>
        </header>
        <ToolGrid tools={list} headingLevel="h2" />
        <section className="section" aria-labelledby="other-cats">
          <h2 id="other-cats" style={{ marginBottom: 'var(--space-4)' }}>
            More tool categories
          </h2>
          <div className="row">
            {others.map((c) => (
              <Link key={c.id} to={categoryPath(c.id)} className="pill">
                <Icon name={c.icon} size={16} />
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
