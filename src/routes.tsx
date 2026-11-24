import type { RouteRecord } from 'vite-react-ssg';
import { routeGraph, type RouteNode } from './data/graph';
import { RootLayout } from './layouts/RootLayout';
import { BSOD_BASE_PATH } from './data/bsod';
import { NotFoundPage } from './pages/NotFoundPage';
import { loadRouteSeo } from './seo/routeSeo';

function lazyPageForRoute(route: RouteNode): RouteRecord['lazy'] | undefined {
  if (route.path === '/gamebar-presence-writer-fix') {
    return async () => ({ Component: (await import('./pages/GameBarPresenceWriterPage')).GameBarPresenceWriterPage });
  }
  if (route.path === '/tools/video-embed-code-generator') {
    return async () => ({ Component: (await import('./pages/VideoEmbedCodeGeneratorPage')).VideoEmbedCodeGeneratorPage });
  }
  if (route.path === '/tools/secure-boot-status-checker') {
    return async () => ({ Component: (await import('./pages/SecureBootStatusCheckerPage')).SecureBootStatusCheckerPage });
  }
  if (route.path === '/tools/windows-support-lifecycle-checker') {
    return async () => ({ Component: (await import('./pages/WindowsSupportLifecycleCheckerPage')).WindowsSupportLifecycleCheckerPage });
  }
  if (route.path === '/tools/windows-battery-health-analyzer') {
    return async () => ({ Component: (await import('./pages/WindowsBatteryHealthAnalyzerPage')).WindowsBatteryHealthAnalyzerPage });
  }
  if (route.path === '/tools/windows-repair-log-analyzer') {
    return async () => ({ Component: (await import('./pages/WindowsRepairLogAnalyzerPage')).WindowsRepairLogAnalyzerPage });
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
  switch (route.kind) {
    case 'home': return async () => ({ Component: (await import('./pages/Home')).Home });
    case 'article': return async () => ({ Component: (await import('./pages/ArticlePage')).ArticlePage });
    case 'tool': return async () => ({ Component: (await import('./pages/ToolPage')).ToolPage });
    case 'tools': return async () => ({ Component: (await import('./pages/ToolsHubPage')).ToolsHubPage });
    case 'category': return route.path.startsWith('/reviews') || route.path.startsWith('/best')
      ? async () => ({ Component: (await import('./pages/CommercialHubPage')).CommercialHubPage })
      : async () => ({ Component: (await import('./pages/Category')).CategoryPage });
    case 'author':
    case 'static': return async () => ({ Component: (await import('./pages/StaticPage')).StaticPage });
    default: return undefined;
  }
}

const childRoutes: RouteRecord[] = [
  ...routeGraph.map(route => {
    const loadPage = lazyPageForRoute(route);
    if (!loadPage) throw new Error('No page module for ' + route.path);
    const lazy: NonNullable<RouteRecord['lazy']> = async () => {
      if (!route.indexable) return loadPage();
      const [page, routeSeo] = await Promise.all([loadPage(), loadRouteSeo(route.path)]);
      return { ...page, handle: { routeSeo } };
    };
    if (route.path === '/') return { index: true, lazy } as RouteRecord;
    return { path: route.path.replace(/^\//, ''), lazy } as RouteRecord;
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
