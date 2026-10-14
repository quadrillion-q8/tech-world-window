import type { ReactNode } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { routeGraph, type RouteNode } from './data/graph';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/Category';
import { ArticlePage } from './pages/ArticlePage';
import { ToolPage } from './pages/ToolPage';
import { ToolsHubPage } from './pages/ToolsHubPage';
import { BSOD_BASE_PATH } from './data/bsod';
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
      if (route.path === BSOD_BASE_PATH) return null;
      return <ToolPage />;
    case 'bsod-code':
      return null;
    case 'tools':
      return <ToolsHubPage />;
    case 'category':
      return route.path.startsWith('/reviews') || route.path.startsWith('/best') ? <CommercialHubPage /> : <CategoryPage />;
    case 'product-review':
      return null;
    case 'comparison':
      return null;
    case 'author':
    case 'static':
      if (route.path === '/gallery') return null;
      return <StaticPage />;
  }
}

function lazyPageForRoute(route: RouteNode): RouteRecord['lazy'] | undefined {
  if (route.path === '/gamebar-presence-writer-fix') {
    return async () => ({ Component: (await import('./pages/GameBarPresenceWriterPage')).GameBarPresenceWriterPage });
  }
  if (route.path === '/tools/frame-time-analyzer') {
    return async () => ({ Component: (await import('./pages/FrameTimeAnalyzerPage')).FrameTimeAnalyzerPage });
  }
  if (route.path === '/tools/windows-troubleshooting-assistant') {
    return async () => ({ Component: (await import('./pages/WindowsTroubleshootingAssistantPage')).WindowsTroubleshootingAssistantPage });
  }
  if (route.path === BSOD_BASE_PATH) {
    return async () => ({ Component: (await import('./pages/BsodLookupPage')).BsodLookupPage });
  }
  if (route.kind === 'bsod-code') {
    return async () => ({ Component: (await import('./pages/BsodCodePage')).BsodCodePage });
  }
  if (route.kind === 'product-review') {
    return async () => ({ Component: (await import('./pages/ProductReviewPage')).ProductReviewPage });
  }
  if (route.kind === 'comparison') {
    return async () => ({ Component: (await import('./pages/ProductComparisonPage')).ProductComparisonPage });
  }
  if (route.path === '/gallery') {
    return async () => ({ Component: (await import('./pages/GalleryPage')).GalleryPage });
  }
  return undefined;
}

const childRoutes: RouteRecord[] = [
  ...routeGraph.map(route => {
    const lazy = lazyPageForRoute(route);
    if (route.path === '/') {
      return { index: true, ...(lazy ? { lazy } : { element: elementForRoute(route) }) } as RouteRecord;
    }
    return {
      path: route.path.replace(/^\//, ''),
      ...(lazy ? { lazy } : { element: elementForRoute(route) }),
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
