import type { ReactNode } from 'react';
import { getPageMeta } from '@/pageMeta';
import { Seo } from '../Seo';
import { Breadcrumbs } from './Breadcrumbs';

export function PageShell({ path, title, lead, children, wide }: { path: string; title: string; lead?: string; children?: ReactNode; wide?: boolean }) {
  const meta = getPageMeta(path);
  return (
    <>
      {meta && <Seo {...meta} />}
      <div className="container">
        <header className="page-head">
          <Breadcrumbs path={path} />
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </header>
        <div className={wide ? undefined : 'prose'} style={{ paddingBottom: 'var(--space-6)' }}>
          {children}
        </div>
      </div>
    </>
  );
}

/** Marks text the site owner must fill in before launch. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="placeholder">[{children}]</span>;
}

export function LegalNotice() {
  return (
    <p className="note" role="note">
      <strong>Starter document.</strong> This text is a template written for a browser-based tools website. It must be reviewed and completed by a
      qualified legal professional for Pakistan and for the countries where you have visitors (for example the EU/UK GDPR and California CCPA) before the
      site goes live. Items in <Placeholder>brackets</Placeholder> need your information.
    </p>
  );
}
