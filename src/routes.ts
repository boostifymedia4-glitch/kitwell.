import { lazyPage, type LazyPage } from './lazyPage';
import { getPageMeta, staticPages } from './pageMeta';

const Home = lazyPage(() => import('./pages/Home'));
const Tools = lazyPage(() => import('./pages/Tools'));
const Category = lazyPage(() => import('./pages/Category'));
const ToolRoute = lazyPage(() => import('./pages/ToolRoute'));
const About = lazyPage(() => import('./pages/About'));
const Contact = lazyPage(() => import('./pages/Contact'));
const Help = lazyPage(() => import('./pages/Help'));
const Blog = lazyPage(() => import('./pages/Blog'));
const BlogPost = lazyPage(() => import('./pages/BlogPost'));
const Privacy = lazyPage(() => import('./pages/Privacy'));
const Terms = lazyPage(() => import('./pages/Terms'));
const Cookies = lazyPage(() => import('./pages/Cookies'));
export const NotFound = lazyPage(() => import('./pages/NotFound'));

const fixed: Record<string, LazyPage> = {
  '/': Home,
  '/tools': Tools,
  '/about': About,
  '/contact': Contact,
  '/help': Help,
  '/blog': Blog,
  '/privacy': Privacy,
  '/terms': Terms,
  '/cookies': Cookies,
};

export function normalizePath(pathname: string): string {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** Resolves a URL path to its page component. Unknown paths resolve to NotFound. */
export function matchPage(pathname: string): LazyPage {
  const path = normalizePath(pathname);
  if (path in fixed && path in staticPages) return fixed[path];
  if (!getPageMeta(path)) return NotFound;
  if (path.startsWith('/blog/')) return BlogPost;
  return path.split('/').filter(Boolean).length === 2 ? Category : ToolRoute;
}
