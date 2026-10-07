import type { ReactNode } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { routeGraph, type RouteNode } from './data/graph';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/Category';
import { ArticlePage } from './pages/ArticlePage';
import { ToolPage } from './pages/ToolPage';
import { ToolsHubPage } from './pages/ToolsHubPage';
import { CommercialHubPage } from './pages/CommercialHubPage';
import { StaticPage } from './pages/StaticPage';
import { NotFoundPage } from './pages/NotFoundPage';

function elementForRoute(route: RouteNode): ReactNode {
  switch (route.kind) {
    case 'home':
      return <Home />;
    case 'article':
      return <ArticlePage />;
    case 'tool':
      return <ToolPage />;
    case 'tools':
      return <ToolsHubPage />;
    case 'category':
      return route.path.startsWith('/reviews') || route.path.startsWith('/best') ? <CommercialHubPage /> : <CategoryPage />;
    case 'author':
    case 'static':
      return <StaticPage />;
  }
}

const childRoutes: RouteRecord[] = [
  ...routeGraph.map(route => {
    if (route.path === '/') {
      return { index: true, element: elementForRoute(route) } as RouteRecord;
    }
    return {
      path: route.path.replace(/^\//, ''),
      element: elementForRoute(route),
    } as RouteRecord;
  }),
  { path: '*', element: <NotFoundPage /> },
];

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: childRoutes,
  },
];
