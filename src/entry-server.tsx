import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { site } from './config/site';
import { allPaths, getPageMeta, NOT_FOUND_META } from './pageMeta';
import { matchPage, normalizePath } from './routes';

export async function render(url: string) {
  const path = normalizePath(url);
  await matchPage(path).preload();
  const html = renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
  const meta = getPageMeta(path) ?? NOT_FOUND_META;
  return { html, meta, found: getPageMeta(path) !== null };
}

export { allPaths };
export const siteUrl = site.url;
export const siteName = site.name;
