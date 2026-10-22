import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/globals.css';
import './styles/visual-refresh.css';
import './styles/workbench.css';
import './styles/editorial-article-refresh.css';

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
