import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { ToolGrid } from '@/components/ui/ToolCard';
import { NOT_FOUND_META } from '@/pageMeta';
import { popularTools } from '@/tools/registry';

export default function NotFound() {
  return (
    <>
      <Seo {...NOT_FOUND_META} />
      <div className="container">
        <div className="notfound">
          <h1>404</h1>
          <p className="lead muted" style={{ margin: '12px auto 24px', maxWidth: '46ch' }}>
            We couldn’t find that page. It may have moved, or the address may be mistyped.
          </p>
          <div style={{ maxWidth: 480, margin: '0 auto 24px', textAlign: 'left' }}>
            <ToolSearch variant="hero" />
          </div>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
        <section aria-labelledby="nf-popular">
          <h2 id="nf-popular" style={{ marginBottom: 'var(--space-4)' }}>
            Popular tools
          </h2>
          <ToolGrid tools={popularTools().slice(0, 6)} />
        </section>
      </div>
    </>
  );
}
