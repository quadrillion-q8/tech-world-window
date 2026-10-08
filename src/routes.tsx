import type { ReactNode } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { routeGraph, type RouteNode } from './data/graph';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/Category';
import { ArticlePage } from './pages/ArticlePage';
import { ToolPage } from './pages/ToolPage';
import { ToolsHubPage } from './pages/ToolsHubPage';
import { FrameTimeAnalyzerPage } from './pages/FrameTimeAnalyzerPage';
import { BsodLookupPage } from './pages/BsodLookupPage';
import { BsodCodePage } from './pages/BsodCodePage';
import { BSOD_BASE_PATH } from './data/bsod';
import { CommercialHubPage } from './pages/CommercialHubPage';
import { StaticPage } from './pages/StaticPage';
import { ProductReviewPage } from './pages/ProductReviewPage';
import { ProductComparisonPage } from './pages/ProductComparisonPage';
import { NotFoundPage } from './pages/NotFoundPage';

function elementForRoute(route: RouteNode): ReactNode {
  switch (route.kind) {
    case 'home':
      return <Home />;
    case 'article':
      return <ArticlePage />;
    case 'tool':
      if (route.path === '/tools/frame-time-analyzer') return <FrameTimeAnalyzerPage />;
      if (route.path === BSOD_BASE_PATH) return <BsodLookupPage />;
      return <ToolPage />;
    case 'bsod-code':
      return <BsodCodePage />;
    case 'tools':
      return <ToolsHubPage />;
    case 'category':
      return route.path.startsWith('/reviews') || route.path.startsWith('/best') ? <CommercialHubPage /> : <CategoryPage />;
    case 'product-review':
      return <ProductReviewPage />;
    case 'comparison':
      return <ProductComparisonPage />;
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
