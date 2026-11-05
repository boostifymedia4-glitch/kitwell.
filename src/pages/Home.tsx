import { useMemo, useState } from 'react';
import { Link } from '@/i18n/Link';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { AdSlot } from '@/components/ui/AdSlot';
import { ToolGrid } from '@/components/ui/ToolCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { HomeSearch } from '@/components/home/HomeSearch';
import { CompatSection, TrustSection, WhySection } from '@/components/home/HomeSections';
import { useLocalize } from '@/i18n/useLocalize';
import { useI18n, type MessageKey } from '@/i18n';
import { usePageMeta } from '@/i18n/usePageMeta';
import { categories, categoryPath, homeCategoryOrder, homeTools, searchTools, toolPath, toolsInCategory } from '@/tools/registry';
import type { ToolDef } from '@/tools/types';

/** The matching tools, shown in their own area above the categories: only the name and the category of each tool. */
function SearchResults({ query, results, onClear }: { query: string; results: ToolDef[]; onClear: () => void }) {
  const { t } = useI18n();
  const loc = useLocalize();
  return (
    <section className="section search-area" aria-labelledby="search-results-title">
      <div className="section-head">
        <div>
          <h2 id="search-results-title">{t('home.search.resultsTitle')}</h2>
          {results.length > 0 && <p>{t('search.found', { count: results.length })}</p>}
        </div>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onClear}>
          {t('home.search.clear')}
        </button>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {t('search.found', { count: results.length })}
      </p>
      {results.length === 0 ? (
        <div className="card search-empty-card">
          <Icon name="search" size={28} />
          <h3>{t('home.search.emptyTitle', { query })}</h3>
          <p>{t('home.search.emptyText')}</p>
          <Link to="/tools" className="btn btn-primary btn-sm">
            {t('home.search.browse')} <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      ) : (
        <ul className="result-grid">
          {results.map((tool) => (
            <li key={tool.slug}>
              <Link to={toolPath(tool)} className="card result-card">
                <ToolIcon tool={tool} size="sm" />
                <span className="result-text">
                  <strong>{loc.tool(tool).name}</strong>
                  <small>{t(`cat.${tool.category}` as MessageKey)}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Home() {
  const meta = usePageMeta('/');
  const { t } = useI18n();
  const loc = useLocalize();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | (typeof homeCategoryOrder)[number]>('all');
  const q = query.trim();
  const results = useMemo(() => {
    if (!q) return [];
    // Typing a whole category name, such as "PDF Tools", lists exactly that category.
    const lower = q.toLowerCase();
    const category = categories.find((c) => [t(`cat.${c.id}` as MessageKey), c.name, c.short].some((n) => n.toLowerCase() === lower));
    if (category) return toolsInCategory(category.id);
    return searchTools(q, 100, (tool) => `${loc.tool(tool).name} ${t(`cat.${tool.category}` as MessageKey)}`, false);
  }, [q, loc, t]);

  return (
    <>
      {meta && <Seo {...meta} />}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <h1 id="hero-title">{t('home.intro.title')}</h1>
          <p className="lead">{t('home.hero.lead')}</p>
          <HomeSearch value={query} onChange={setQuery} />
        </div>
      </section>

      <div className="container">
        {q ? (
          <SearchResults query={q} results={results} onClear={() => setQuery('')} />
        ) : (
          <>
            <div className="chips home-filter" role="group" aria-label={t('home.filter.label')}>
              {(['all', ...homeCategoryOrder] as const).map((id) => (
                <button key={id} type="button" className="chip" aria-pressed={filter === id} onClick={() => setFilter(id)}>
                  {id === 'all' ? t('home.allToolsLink') : t(`cat.${id}` as MessageKey)}
                </button>
              ))}
            </div>

            {homeCategoryOrder.filter((id) => filter === 'all' || filter === id).map((id) => (
              <section key={id} className="section" aria-labelledby={`home-${id}`}>
                <div className="section-head">
                  <div className="row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                    <CategoryIcon id={id} />
                    <div>
                      <h2 id={`home-${id}`}>{t(`cat.${id}` as MessageKey)}</h2>
                      <p>{t(`cat.${id}.description`)}</p>
                    </div>
                  </div>
                  <Link to={categoryPath(id)} className="btn btn-secondary btn-sm">
                    {t('home.allToolsLink')} <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
                <ToolGrid tools={homeTools(id)} variant="home" />
              </section>
            ))}

            <AdSlot id="home-mid" />

            <TrustSection />
            <CompatSection />
            <WhySection />
          </>
        )}
      </div>
    </>
  );
}
