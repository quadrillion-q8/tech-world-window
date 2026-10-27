import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/globals.css';
import './styles/visual-refresh.css';
import './styles/workbench.css';
import './styles/editorial-article-refresh.css';
import './styles/sitewide-ui-polish.css';
import './styles/page-layout-refinements.css';
import './styles/homepage-card-a11y.css';
import './styles/sitewide-typography-card-system.css';
import './styles/main-menu-visual-upgrade.css';

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
