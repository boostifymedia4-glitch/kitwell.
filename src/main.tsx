import '@fontsource-variable/inter/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/navigation.css';
import './styles/catalog.css';
import './styles/motion.css';
import './styles/about.css';
import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loadLocale } from './i18n';
import { splitLang } from './i18n/routing';
import { matchPage } from './routes';

const container = document.getElementById('root')!;

// Load the page's language and the current route's chunk first so hydration matches the prerendered HTML exactly.
Promise.all([loadLocale(splitLang(window.location.pathname).code).catch(() => undefined), matchPage(window.location.pathname).preload()]).then(([initial]) => {
  const app = (
    <StrictMode>
      <BrowserRouter>
        <App initial={initial} />
      </BrowserRouter>
    </StrictMode>
  );
  if (container.hasChildNodes() && container.dataset.prerendered !== undefined) hydrateRoot(container, app);
  else createRoot(container).render(app);
});
