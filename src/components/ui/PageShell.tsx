import type { ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { usePageMeta } from '@/i18n/usePageMeta';
import { Seo } from '../Seo';
import { Breadcrumbs } from './Breadcrumbs';

export function PageShell({ path, title, lead, children, wide }: { path: string; title: string; lead?: string; children?: ReactNode; wide?: boolean }) {
  const meta = usePageMeta(path);
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

/** The body of a legal page. Outside English a note says the text is a translation and the English version is authoritative. */
export function LegalBody({ children }: { children: ReactNode }) {
  const { t, lang } = useI18n();
  return (
    <>
      {lang.code !== 'en' && (
        <p className="note" role="note">
          {t('legal.translationNote')}
        </p>
      )}
      {children}
    </>
  );
}

