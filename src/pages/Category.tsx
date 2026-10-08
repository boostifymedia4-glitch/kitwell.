import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GroupedTools } from '@/components/ui/GroupedTools';
import { getPageMeta, NOT_FOUND_META } from '@/pageMeta';
import { categories, categoryPath, getCategory, groupId, groupsInCategory, toolsInCategory } from '@/tools/registry';
import { normalizePath } from '@/routes';

export default function Category() {
  const path = normalizePath(useLocation().pathname);
  const cat = getCategory(path.split('/')[2] ?? '');
  const meta = getPageMeta(path);
  if (!cat || !meta) return <Seo {...NOT_FOUND_META} />;
  const groups = groupsInCategory(cat.id);
  const others = categories.filter((c) => c.id !== cat.id);
  return (
    <>
      <Seo {...meta} />
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path={path} />
          <div className="page-title-row">
            <span className={`tool-icon tool-icon-lg chip-${cat.id}`} aria-hidden="true">
              <Icon name={cat.icon} size={28} />
            </span>
            <div>
              <h1>{cat.name}</h1>
              <p className="lead">
                {cat.intro} <span className="muted">{toolsInCategory(cat.id).length} tools.</span>
              </p>
            </div>
          </div>
          {groups.length > 1 && (
            <nav aria-label={`Sections in ${cat.name}`} className="jump">
              {groups.map((g) => (
                <a key={g.name} href={`#${groupId(g.name)}`} className="jump-link">
                  {g.name}
                </a>
              ))}
            </nav>
          )}
        </header>
        <GroupedTools category={cat.id} />
        <section className="section" aria-labelledby="other-cats">
          <h2 id="other-cats" className="group-title" style={{ marginBottom: 'var(--space-4)' }}>
            More tool categories
          </h2>
          <div className="row">
            {others.map((c) => (
              <Link key={c.id} to={categoryPath(c.id)} className="jump-link">
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
