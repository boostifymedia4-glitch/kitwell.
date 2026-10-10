import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { useI18n } from '@/i18n';
import { useLocalize } from '@/i18n/useLocalize';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { GroupedTools } from '@/components/ui/GroupedTools';
import { useNotFoundMeta, usePageMeta } from '@/i18n/usePageMeta';
import { categories, categoryPath, getCategory, groupId, groupsInCategory, toolsInCategory } from '@/tools/registry';
import { normalizePath } from '@/routes';

export default function Category() {
  const { t } = useI18n();
  const loc = useLocalize();
  const path = normalizePath(useLocation().pathname);
  const source = getCategory(path.split('/')[2] ?? '');
  const cat = source && loc.category(source);
  const meta = usePageMeta(path);
  const notFound = useNotFoundMeta();
  if (!cat || !meta) return <Seo {...notFound} />;
  const groups = groupsInCategory(cat.id);
  const others = categories.filter((c) => c.id !== cat.id);
  return (
    <>
      <Seo {...meta} />
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path={path} />
          <div className="page-title-row">
            <CategoryIcon id={cat.id} size="lg" />
            <div>
              <h1>{cat.name}</h1>
              <p className="lead">
                {cat.intro} <span className="muted">{t('category.count', { count: toolsInCategory(cat.id).length })}</span>
              </p>
            </div>
          </div>
          {groups.length > 1 && (
            <nav aria-label={t('category.sections', { name: cat.name })} className="jump">
              {groups.map((g) => (
                <a key={g.name} href={`#${groupId(g.name)}`} className="jump-link">
                  {loc.group(g).name}
                </a>
              ))}
            </nav>
          )}
        </header>
        <GroupedTools category={cat.id} />
        <section className="section" aria-labelledby="other-cats">
          <h2 id="other-cats" className="group-title" style={{ marginBottom: 'var(--space-4)' }}>
            {t('category.more')}
          </h2>
          <div className="row">
            {others.map((c) => (
              <Link key={c.id} to={categoryPath(c.id)} className="jump-link">
                <Icon name={c.icon} size={16} />
                {t(`cat.${c.id}`)}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
