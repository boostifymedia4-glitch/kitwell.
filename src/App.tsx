import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { matchPage } from './routes';

export default function App() {
  const { pathname } = useLocation();
  const Page = matchPage(pathname);
  return (
    <Layout>
      <Suspense fallback={<div className="container" style={{ minHeight: '60vh' }} aria-busy="true" />}>
        <Page />
      </Suspense>
    </Layout>
  );
}
