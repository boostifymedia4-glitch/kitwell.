import { Fragment, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Faq } from '@/components/ui/Faq';
import { getPost, postPath, posts, type BlogPost as Post } from '@/blog/posts';
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
  const path = normalizePath(useLocation().pathname);
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
  const translated = lang.code === 'en' || Boolean(messages[key('title')]);
  const headings = post.blocks.filter((b) => b.type === 'h2' && b.id !== 'cta.h');
  const tools = post.tools.map(getTool).filter((x): x is ToolDef => Boolean(x));
  const others = posts.filter((p) => p.slug !== post.slug);
  const anchor = (id: string) => `sec-${id.replace('.', '-')}`;

  return (
    <>
      <Seo {...meta} />
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path={path} />
          <h1>{t(key('title'))}</h1>
          <p className="post-meta">
            <span>{t('blog.by', { site: site.name })}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{t('blog.published', { date: formatDate(post.published, lang.code) })}</time>
            <span aria-hidden="true">·</span>
            <span>{t('blog.minutes', { count: post.minutes })}</span>
          </p>
          {!translated && (
            <p className="note" role="note">
              {t('blog.englishOnly')}
            </p>
          )}
        </header>

        <div className="post-layout">
          <article className="prose post-body" lang={translated ? undefined : 'en'} dir={translated ? undefined : 'ltr'}>
            {headings.length > 2 && (
              <nav className="post-toc" aria-labelledby="toc-title">
                <h2 id="toc-title">{t('blog.contents')}</h2>
                <ol>
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${anchor(h.id)}`}>{t(key(h.id))}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {post.blocks.map((b) => {
              switch (b.type) {
                case 'h2':
                  return (
                    <h2 key={b.id} id={anchor(b.id)}>
                      {t(key(b.id))}
                    </h2>
                  );
                case 'p':
                  return <p key={b.id}>{rich(b.id)}</p>;
                case 'note':
                  return (
                    <p key={b.id} className="note" role="note">
                      {rich(b.id)}
                    </p>
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

        {others.length > 0 && (
          <section className="section" aria-labelledby="more-guides">
            <div className="section-head">
              <h2 id="more-guides">{t('blog.moreGuides')}</h2>
              <Link to="/blog" className="btn btn-ghost btn-sm">
                {t('blog.backToBlog')} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <ul className="post-list">
              {others.map((p) => (
                <li key={p.slug}>
                  <article className="card post-card">
                    <p className="post-meta">
                      <span>{t('blog.minutes', { count: p.minutes })}</span>
                    </p>
                    <h3>
                      <Link to={postPath(p.slug)} className="post-link">
                        {t(`blog.${p.slug}.title`)}
                      </Link>
                    </h3>
                    <p>{t(`blog.${p.slug}.excerpt`)}</p>
                  </article>
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
      <Icon name={tool.icon} size={18} />
      <span>{x.name}</span>
      <Icon name="arrow-right" size={14} />
    </Link>
  );
}

