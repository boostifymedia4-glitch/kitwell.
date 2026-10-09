import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { useI18n } from '@/i18n';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GroupedTools } from '@/components/ui/GroupedTools';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { usePageMeta } from '@/i18n/usePageMeta';
import { categories, categoryPath, toolsInCategory, tools } from '@/tools/registry';

export default function Tools() {
  const { t } = useI18n();
  const meta = usePageMeta('/tools');
  return (
    <>
      {meta && <Seo {...meta} />}
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path="/tools" />
          <h1>{t('tools.title')}</h1>
          <p className="lead">{t('tools.lead', { count: tools.length })}</p>
          <div className="page-search">
            <ToolSearch variant="hero" />
          </div>
          <nav aria-label={t('tools.jump')} className="jump">
            {categories.map((c) => (
              <a key={c.id} href={`#cat-${c.id}`} className="jump-link">
                {t(`cat.${c.id}`)}
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
                  <h2 id={`cat-${c.id}-title`}>{t(`cat.${c.id}`)}</h2>
                  <p>{t(`cat.${c.id}.description`)}</p>
                </div>
              </div>
              <Link to={categoryPath(c.id)} className="btn btn-secondary btn-sm">
                {t('home.viewAll', { count: toolsInCategory(c.id).length })} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <GroupedTools category={c.id} groupLevel="h3" idPrefix={`${c.id}-`} />
          </section>
        ))}
      </div>
    </>
  );
}
