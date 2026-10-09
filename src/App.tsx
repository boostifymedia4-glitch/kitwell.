import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { English } from './i18n/English';
import { I18nProvider } from './i18n';
import { matchPage } from './routes';

export default function App() {
  const { pathname } = useLocation();
  const Page = matchPage(pathname);
  // The homepage is translated; every other page is English-only for now and is marked as such.
  const translated = pathname === '/';
  return (
    <I18nProvider>
      <Layout>
        <Suspense fallback={<div className="container" style={{ minHeight: '60vh' }} aria-busy="true" />}>
          {translated ? <Page /> : <English><Page /></English>}
        </Suspense>
      </Layout>
    </I18nProvider>
  );
}
