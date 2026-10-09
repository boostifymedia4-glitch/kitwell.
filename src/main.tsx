import '@fontsource-variable/inter/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/navigation.css';
import './styles/catalog.css';
import './styles/motion.css';
import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { matchPage } from './routes';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Load the current route's chunk first so hydration matches the prerendered HTML exactly.
matchPage(window.location.pathname)
  .preload()
  .finally(() => {
    if (container.hasChildNodes() && container.dataset.prerendered !== undefined) hydrateRoot(container, app);
    else createRoot(container).render(app);
  });
