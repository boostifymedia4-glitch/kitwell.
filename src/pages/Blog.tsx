import { PageShell } from '@/components/ui/PageShell';
import { PostCard } from '@/components/ui/PostCard';
import { posts } from '@/blog/posts';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';

export default function Blog() {
  const { t } = useI18n();
  return (
    <PageShell path="/blog" title={t('blog.title')} lead={t('blog.lead', { site: site.name })} wide>
      {posts.length === 0 ? (
        <p className="muted">{t('blog.empty')}</p>
      ) : (
        <ul className="post-list">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <PostCard post={p} eager={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
