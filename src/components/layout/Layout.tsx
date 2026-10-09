import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const first = useRef(true);
  const mainRef = useRef<HTMLElement>(null);
  const { t } = useI18n();

  // On client-side navigation: reset scroll and move focus to the new page for keyboard/screen-reader users.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip')}
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} style={{ outline: 'none' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
