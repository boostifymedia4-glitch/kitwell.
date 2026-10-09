import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { Seo } from '@/components/Seo';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { ToolGrid } from '@/components/ui/ToolCard';
import { useNotFoundMeta } from '@/i18n/usePageMeta';
import { popularTools } from '@/tools/registry';

export default function NotFound() {
  const { t } = useI18n();
  const meta = useNotFoundMeta();
  return (
    <>
      <Seo {...meta} />
      <div className="container">
        <div className="notfound">
          <h1>404</h1>
          <p className="lead muted" style={{ margin: '12px auto 24px', maxWidth: '46ch' }}>
            {t('notFound.text')}
          </p>
          <div style={{ maxWidth: 480, margin: '0 auto 24px', textAlign: 'left' }}>
            <ToolSearch variant="hero" />
          </div>
          <Link to="/" className="btn btn-primary">
            {t('notFound.home')}
          </Link>
        </div>
        <section aria-labelledby="nf-popular">
          <h2 id="nf-popular" style={{ marginBottom: 'var(--space-4)' }}>
            {t('notFound.popular')}
          </h2>
          <ToolGrid tools={popularTools().slice(0, 6)} />
        </section>
      </div>
    </>
  );
}
