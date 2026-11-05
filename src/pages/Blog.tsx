import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { PageShell } from '@/components/ui/PageShell';
import { PostCard } from '@/components/ui/PostCard';
import { posts, postKeys, type BlogCategory } from '@/blog/posts';
import { site } from '@/config/site';
import { useI18n, type MessageKey } from '@/i18n';

const CATEGORIES: ('all' | BlogCategory)[] = ['all', 'tutorials', 'tips', 'comparisons', 'guides'];

/** The blog list: a short introduction, a search box, topic filters with counts and a grid of article cards. */
export default function Blog() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | BlogCategory>('all');

  // Everything an article says (title, summary and every paragraph) in one lower-case text, so search looks inside the articles.
  const index = useMemo(
    () => new Map(posts.map((p) => [p.slug, { title: t(`blog.${p.slug}.title`).toLowerCase(), all: postKeys(p).map((k) => t(k as MessageKey)).join(' ').replace(/<[^>]+>/g, ' ').toLowerCase() }])),
    [t],
  );

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matching = useMemo(() => {
    const found = posts.filter((p) => words.every((w) => index.get(p.slug)?.all.includes(w)));
    // Articles with the words in the title come first; the order is otherwise newest first.
    return found.slice().sort((a, b) => Number(words.every((w) => index.get(b.slug)?.title.includes(w))) - Number(words.every((w) => index.get(a.slug)?.title.includes(w))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, index]);

  const shown = category === 'all' ? matching : matching.filter((p) => p.category === category);
  const countOf = (c: 'all' | BlogCategory) => (c === 'all' ? matching.length : matching.filter((p) => p.category === c).length);
  const filtered = words.length > 0 || category !== 'all';
  const clear = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <PageShell path="/blog" title={t('blog.hero.title')} lead={t('blog.hero.lead', { site: site.name })} wide>
      {posts.length === 0 ? (
        <p className="muted">{t('blog.empty')}</p>
      ) : (
        <>
          <div className="blog-tools">
            <div className="search search-hero blog-search">
              <div className="search-field">
                <Icon name="search" size={18} />
                <label htmlFor="blog-search" className="visually-hidden">
                  {t('blog.search.label')}
                </label>
                <input
                  id="blog-search"
                  className="input"
                  type="search"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={t('blog.search.placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setQuery('');
                  }}
                />
                {query && (
                  <button type="button" className="search-clear" aria-label={t('home.search.clear')} onClick={() => setQuery('')}>
                    <Icon name="x" size={16} />
                  </button>
                )}
              </div>
            </div>
            <div className="chips" role="group" aria-label={t('blog.filter.label')}>
              {CATEGORIES.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>
                  {t(`blog.cat.${c}` as MessageKey)}
                  <span className="chip-count">{countOf(c)}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="visually-hidden" role="status" aria-live="polite">
            {t('blog.resultsCount', { found: shown.length })}
          </p>

          {shown.length === 0 ? (
            <div className="card search-empty-card">
              <Icon name="search" size={28} />
              <h2 className="empty-title">{t('blog.noResults.title')}</h2>
              <p>{t('blog.noResults.text')}</p>
              {filtered && (
                <button type="button" className="btn btn-primary btn-sm" onClick={clear}>
                  {t('blog.clearFilters')}
                </button>
              )}
            </div>
          ) : (
            <ul className="post-list">
              {shown.map((p, i) => (
                <li key={p.slug}>
                  <PostCard post={p} eager={i < 3} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </PageShell>
  );
}
