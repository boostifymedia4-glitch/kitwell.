import { Component, Suspense, lazy, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { categoryPath, getCategory, relatedTools, toolPath } from '@/tools/registry';
import { implLoaders } from '@/tools/impl';
import type { ToolDef } from '@/tools/types';
import { Icon } from '../Icon';
import { Seo } from '../Seo';
import { AdSlot } from '../ui/AdSlot';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { Faq } from '../ui/Faq';
import { ToolGrid } from '../ui/ToolCard';
import { ErrorMessage, PrivacyNotice } from './Feedback';
import { getPageMeta } from '@/pageMeta';

/** Heights approximate the loaded UI (file tools ~208px, text/developer tools taller) to avoid layout shift. */
function ToolSkeleton({ fileTool }: { fileTool: boolean }) {
  return (
    <div className="empty" style={{ minHeight: fileTool ? 208 : 460, padding: 0, display: 'grid', placeItems: 'center' }} role="status">
      <div className="processing">
        <span className="spinner" aria-hidden="true" />
        Loading tool…
      </div>
    </div>
  );
}

/** Catches a failed chunk load (e.g. flaky network) so the page shows a message instead of going blank. */
class ToolBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="stack">
        <ErrorMessage>
          This tool could not be loaded. Check your connection and{' '}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.location.reload()}>
            reload the page
          </button>
          .
        </ErrorMessage>
      </div>
    );
  }
}

function ToolInterface({ tool }: { tool: ToolDef }) {
  const Impl = useMemo(() => lazy(implLoaders[tool.impl]), [tool.impl]);
  const [mounted, setMounted] = useState(false);
  // The tool UI is client-only: the server and the first client render both show the same skeleton.
  useEffect(() => setMounted(true), []);
  if (!mounted) return <ToolSkeleton fileTool={tool.fileTool} />;
  return (
    <ToolBoundary>
      <Suspense fallback={<ToolSkeleton fileTool={tool.fileTool} />}>
        <Impl tool={tool} />
      </Suspense>
    </ToolBoundary>
  );
}

export function ToolPage({ tool }: { tool: ToolDef }) {
  const path = toolPath(tool);
  const meta = getPageMeta(path);
  const cat = getCategory(tool.category);
  const related = relatedTools(tool);

  return (
    <>
      {meta && <Seo {...meta} />}
      <div className="container tool-layout">
        <header className="page-head" style={{ paddingBottom: 0 }}>
          <Breadcrumbs path={path} />
          <div className="tool-head">
            <span className={`chip chip-${tool.category}`}>
              <Icon name={tool.icon} size={26} />
            </span>
            <div>
              <h1>{tool.name}</h1>
              <p className="lead">{tool.description}</p>
            </div>
          </div>
        </header>

        <section className="card tool-panel" aria-label={`${tool.name} tool`} key={tool.slug}>
          <ToolInterface tool={tool} />
        </section>
        <PrivacyNotice fileTool={tool.fileTool} />
        <AdSlot id="tool-below" />

        <div className="info-grid">
          <section className="card info-card" aria-labelledby="how-to">
            <h2 id="how-to">How to use {tool.name}</h2>
            <ol className="steps">
              {tool.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>
          <section className="card info-card" aria-labelledby="limits">
            <h2 id="limits">Supported formats &amp; limits</h2>
            <ul className="limit-list">
              {tool.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="faq">
          <h2 id="faq" style={{ marginBottom: 'var(--space-3)' }}>
            Frequently asked questions
          </h2>
          <Faq items={tool.faq} />
        </section>

        <section aria-labelledby="related">
          <div className="section-head">
            <h2 id="related">Related tools</h2>
            {cat && (
              <Link to={categoryPath(cat.id)} className="btn btn-ghost btn-sm">
                All {cat.short.toLowerCase()} tools
                <Icon name="arrow-right" size={14} />
              </Link>
            )}
          </div>
          <ToolGrid tools={related} />
        </section>
      </div>
    </>
  );
}
