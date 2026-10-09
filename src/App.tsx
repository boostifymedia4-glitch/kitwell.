import { Suspense } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { I18nProvider } from './i18n';
import { matchPage } from './routes';

export default function App() {
  const { pathname } = useLocation();
  const Page = matchPage(pathname);
  // Pages fade in after a link click; the first load and back/forward navigation show the page at once.
  const enter = useNavigationType() === 'PUSH';
  return (
    <I18nProvider>
      <Layout>
        <Suspense fallback={<div className="container" style={{ minHeight: '60vh' }} aria-busy="true" />}>
          <div key={pathname} className={enter ? 'page-in' : undefined} style={{ display: 'contents' }}>
            <Page />
          </div>
        </Suspense>
      </Layout>
    </I18nProvider>
  );
}
