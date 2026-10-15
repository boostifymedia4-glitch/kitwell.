import { Fragment, type ReactNode } from 'react';
import { Link } from '@/i18n/Link';
import { usePath } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { Faq } from '@/components/ui/Faq';
import { PostCard } from '@/components/ui/PostCard';
import { POST_IMAGE_SIZE, getPost, postImage, postPath, relatedPosts, type BlogPost as Post } from '@/blog/posts';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { Rich } from '@/i18n/Rich';
import { useNotFoundMeta, usePageMeta } from '@/i18n/usePageMeta';
import { formatDate } from '@/lib/format';
import { normalizePath } from '@/routes';
import { getCategory, getTool, categoryPath, toolPath } from '@/tools/registry';
import type { ToolDef } from '@/tools/types';
import { useLocalize } from '@/i18n/useLocalize';

/** Builds the resolver that turns `<tool_merge_pdf>`, `<post_some-slug>` and `<all_pdf>` markers in article text into internal links. */
function linkResolver() {
  return (tag: string): ((children: ReactNode) => ReactNode) | undefined => {
    const [kind, ...rest] = tag.split('_');
    const name = rest.join('_');
    if (kind === 'tool') {
      const tool = getTool(name.split('_').join('-'));
      return tool ? (c) => <Link to={toolPath(tool)}>{c}</Link> : undefined;
    }
    if (kind === 'post') {
      const post = getPost(name);
      return post ? (c) => <Link to={postPath(post.slug)}>{c}</Link> : undefined;
    }
    if (kind === 'all') {
      const cat = getCategory(name);
      return cat ? (c) => <Link to={categoryPath(cat.id)}>{c}</Link> : undefined;
    }
    return undefined;
  };
}

export default function BlogPostPage() {
  const path = normalizePath(usePath());
  const post = getPost(path.split('/')[2] ?? '');
  const notFound = useNotFoundMeta();
  const meta = usePageMeta(path);
  if (!post || !meta) return <Seo {...notFound} />;
  return <Article post={post} meta={meta} path={path} />;
}

function Article({ post, meta, path }: { post: Post; meta: NonNullable<ReturnType<typeof usePageMeta>>; path: string }) {
  const { t, lang, messages } = useI18n();
  const links = linkResolver();
  const key = (k: string) => `blog.${post.slug}.${k}`;
  const rich = (k: string) => <Rich text={t(key(k))} resolve={links} />;
  // Articles are written in English only; other languages see the English text inside an English-language block.
  const englishArticle = lang.code !== 'en' && !messages[key('title')];
  const tocItems = post.blocks.filter((b) => (b.type === 'h2' && b.id !== 'cta.h') || b.type === 'faq');
  const tools = post.tools.map(getTool).filter((x): x is ToolDef => Boolean(x));
  const related = relatedPosts(post, 3);
  const anchor = (id: string) => `sec-${id.replace('.', '-')}`;
  const firstH2 = post.blocks.findIndex((b) => b.type === 'h2');
  const toc = tocItems.length > 2 && (
    <nav className="post-toc" aria-labelledby="toc-title">
      <h2 id="toc-title">{t('blog.contents')}</h2>
      <ol>
        {tocItems.map((h) => (
          <li key={h.id}>
            <a href={`#${anchor(h.id)}`}>{t(key(h.type === 'faq' ? `${h.id}.h` : h.id))}</a>
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <>
      <Seo {...meta} />
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path={path} />
          <h1>{t(key('title'))}</h1>
          <p className="post-meta">
            <span>
              {t('blog.byAuthor', { author: site.author.name })}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{t('blog.published', { date: formatDate(post.published, lang.code) })}</time>
            {post.updated !== post.published && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={post.updated}>{t('blog.updated', { date: formatDate(post.updated, lang.code) })}</time>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{t('blog.minutes', { count: post.minutes })}</span>
          </p>
          {englishArticle && (
            <p className="note" role="note">
              {t('blog.englishOnly')}
            </p>
          )}
        </header>

        <figure className="post-hero">
          <img src={postImage(post.slug)} width={POST_IMAGE_SIZE.width} height={POST_IMAGE_SIZE.height} alt={t(key('imageAlt'))} fetchPriority="high" decoding="async" />
        </figure>

        <div className="post-layout">
          <article className="prose post-body" lang={englishArticle ? 'en' : undefined} dir={englishArticle ? 'ltr' : undefined}>
            {post.blocks.map((b, index) => {
              const tocHere = index === firstH2 ? toc : null;
              switch (b.type) {
                case 'h2':
                  return (
                    <Fragment key={b.id}>
                      {tocHere}
                      <h2 id={anchor(b.id)}>{t(key(b.id))}</h2>
                    </Fragment>
                  );
                case 'h3':
                  return <h3 key={b.id}>{t(key(b.id))}</h3>;
                case 'p':
                  return <p key={b.id}>{rich(b.id)}</p>;
                case 'note':
                  return (
                    <p key={b.id} className="note" role="note">
                      {rich(b.id)}
                    </p>
                  );
                case 'takeaways':
                  return (
                    <aside key={b.id} className="post-takeaways" aria-labelledby="takeaways-title">
                      <h2 id="takeaways-title">{t('blog.takeaways')}</h2>
                      <ul>
                        {Array.from({ length: b.items }, (_, i) => (
                          <li key={i}>{rich(`${b.id}.${i + 1}`)}</li>
                        ))}
                      </ul>
                    </aside>
                  );
                case 'ul':
                case 'ol': {
                  const List = b.type;
                  return (
                    <List key={b.id}>
                      {Array.from({ length: b.items }, (_, i) => (
                        <li key={i}>{rich(`${b.id}.${i + 1}`)}</li>
                      ))}
                    </List>
                  );
                }
                case 'faq':
                  return (
                    <Fragment key={b.id}>
                      <h2 id={anchor(b.id)}>{t(key(`${b.id}.h`))}</h2>
                      <Faq items={Array.from({ length: b.items }, (_, i) => ({ q: t(key(`${b.id}.${i + 1}.q`)), a: t(key(`${b.id}.${i + 1}.a`)) }))} />
                    </Fragment>
                  );
              }
            })}
          </article>

          <aside className="post-aside" aria-label={t('blog.relatedTools')}>
            <h2>{t('blog.relatedTools')}</h2>
            <ul className="post-tools">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <ToolLink tool={tool} />
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <aside className="post-author" aria-label={t('blog.aboutAuthor')}>
          <p className="post-author-name">
            <strong>{site.author.name}</strong>
            <span>{site.author.jobTitle}</span>
          </p>
          <p>{t('blog.authorBio', { author: site.author.name, site: site.name })}</p>
          <Link to="/about" className="post-more">
            {t('blog.aboutAuthor')} <Icon name="arrow-right" size={14} />
          </Link>
        </aside>

        {related.length > 0 && (
          <section className="section" aria-labelledby="more-guides">
            <div className="section-head">
              <h2 id="more-guides">{t('blog.relatedGuides')}</h2>
              <Link to="/blog" className="btn btn-ghost btn-sm">
                {t('blog.backToBlog')} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <ul className="post-list">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

function ToolLink({ tool }: { tool: ToolDef }) {
  const loc = useLocalize();
  const x = loc.tool(tool);
  return (
    <Link to={toolPath(tool)} className="post-tool">
      <ToolIcon tool={tool} size="sm" />
      <span>{x.name}</span>
      <Icon name="arrow-right" size={14} />
    </Link>
  );
}

