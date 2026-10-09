import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { PageShell } from '@/components/ui/PageShell';
import { posts, postPath } from '@/blog/posts';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { formatDate } from '@/lib/format';

export default function Blog() {
  const { t, lang } = useI18n();
  return (
    <PageShell path="/blog" title={t('blog.title')} lead={t('blog.lead', { site: site.name })} wide>
      {posts.length === 0 ? (
        <p className="muted">{t('blog.empty')}</p>
      ) : (
        <ul className="post-list">
          {posts.map((p) => {
            const key = (k: string) => `blog.${p.slug}.${k}`;
            return (
              <li key={p.slug}>
                <article className="card post-card">
                  <p className="post-meta">
                    <time dateTime={p.published}>{formatDate(p.published, lang.code)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{t('blog.minutes', { count: p.minutes })}</span>
                  </p>
                  <h2>
                    <Link to={postPath(p.slug)} className="post-link">
                      {t(key('title'))}
                    </Link>
                  </h2>
                  <p>{t(key('excerpt'))}</p>
                  <span className="post-more" aria-hidden="true">
                    {t('blog.readMore')} <Icon name="arrow-right" size={14} />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
}
