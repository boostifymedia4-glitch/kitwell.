import { createElement, use, type ComponentType } from 'react';

export type LazyPage = ComponentType & { preload: () => Promise<unknown> };

/**
 * Like React.lazy, but the loaded module is remembered so it can be rendered synchronously once
 * preloaded. That lets the server render (and the browser hydrate) a route without a Suspense fallback.
 */
export function lazyPage(loader: () => Promise<{ default: ComponentType }>): LazyPage {
  let loaded: ComponentType | undefined;
  let promise: Promise<unknown> | undefined;
  const preload = () => (promise ??= loader().then((m) => (loaded = m.default)));
  const Page = () => {
    if (!loaded) use(preload());
    return createElement(loaded as ComponentType);
  };
  return Object.assign(Page, { preload });
}
