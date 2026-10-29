import { Icon } from '@/components/Icon';
import { Link } from '@/i18n/Link';
import { POST_THUMB_SIZE, postPath, postThumb, type BlogPost } from '@/blog/posts';
import { useI18n } from '@/i18n';
import { formatDate } from '@/lib/format';

/** Card for one article in the blog index and the "Related guides" list. The thumbnail has the same picture description as the article page. */
export function PostCard({ post, eager = false }: { post: BlogPost; eager?: boolean }) {
  const { t, lang } = useI18n();
  const key = (k: string) => `blog.${post.slug}.${k}`;
  return (
    <article className="card post-card">
      <img className="post-card-media" src={postThumb(post.slug)} width={POST_THUMB_SIZE.width} height={POST_THUMB_SIZE.height} alt={t(key('imageAlt'))} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <div className="post-card-body">
        <p className="post-meta">
          <time dateTime={post.published}>{formatDate(post.published, lang.code)}</time>
          <span aria-hidden="true">·</span>
          <span>{t('blog.minutes', { count: post.minutes })}</span>
        </p>
        <h3>
          <Link to={postPath(post.slug)} className="post-link">
            {t(key('title'))}
          </Link>
        </h3>
        <p>{t(key('excerpt'))}</p>
        <span className="post-more" aria-hidden="true">
          {t('blog.readMore')} <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </article>
  );
}
