import type { RouteRecord } from 'vite-react-ssg';
import { routeGraph, type RouteNode } from './data/graph';
import { RootLayout } from './layouts/RootLayout';
import { BSOD_BASE_PATH } from './data/bsod';
import type { Article } from './data/articles';

type LazyPage = NonNullable<RouteRecord['lazy']>;
const articleContentLoaders = import.meta.glob<{ default: Article }>('./data/generated/article-content/*.json');

/**
 * Load route page families on demand.
 *
 * Keep content-heavy route families out of the initial app entry. Article body
 * data is generated per slug so an article route loads only its own full content;
 * hubs and related cards use the lightweight generated metadata index.
 *
 * vite-react-ssg resolves these lazy route modules during prerendering, so the
 * public route graph and static HTML output remain the source of truth.
 */
function lazyPageForRoute(route: RouteNode): LazyPage | undefined {
  // Keep the custom Game Bar experience ahead of the generic article route.
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

  // Keep content-heavy page families out of the initial JavaScript entry.
  if (route.kind === 'home') {
    return async () => ({ Component: (await import('./pages/Home')).Home });
  }
  if (route.kind === 'article') {
    const fileName = `${route.path.slice(1).replace(/\//g, '--')}.json`;
    const contentKey = `./data/generated/article-content/${fileName}`;
    const loadArticle = articleContentLoaders[contentKey];
    if (!loadArticle) {
      throw new Error(\`No generated article content module for route: \${route.path} (expected \${contentKey})\`);
    }
    return async () => {
      const [{ ArticlePage }, contentModule] = await Promise.all([
        import('./pages/ArticlePage'),
        loadArticle(),
      ]);
      return { Component: () => <ArticlePage article={contentModule.default} /> };
    };
  }
  if (route.kind === 'category') {
    if (route.path.startsWith('/reviews') || route.path.startsWith('/best')) {
      return async () => ({ Component: (await import('./pages/CommercialHubPage')).CommercialHubPage });
    }
    return async () => ({ Component: (await import('./pages/Category')).CategoryPage });
  }
  if (route.kind === 'tool') {
    return async () => ({ Component: (await import('./pages/ToolPage')).ToolPage });
  }
  if (route.kind === 'tools') {
    return async () => ({ Component: (await import('./pages/ToolsHubPage')).ToolsHubPage });
  }
  if (route.kind === 'author' || route.kind === 'static') {
    return async () => ({ Component: (await import('./pages/StaticPage')).StaticPage });
  }

  return undefined;
}

const childRoutes: RouteRecord[] = [
  ...routeGraph.map(route => {
    const lazy = lazyPageForRoute(route);
    if (!lazy) {
      throw new Error(`No lazy page component registered for route: ${route.path} (${route.kind})`);
    }
    if (route.path === '/') return { index: true, lazy } as RouteRecord;
    return { path: route.path.slice(1), lazy } as RouteRecord;
  }),
  {
    path: '*',
    lazy: async () => ({ Component: (await import('./pages/NotFoundPage')).NotFoundPage }),
  },
];

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: childRoutes,
  },
];
