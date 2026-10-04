/**
 * Single source of truth for canonical routes.
 * Add every public indexable route here, then let sitemap generation and
 * route validation consume this inventory. Content existence alone does not
 * automatically make a route public.
 */
export type RouteNode = {
  path: string;
  kind: 'home' | 'category' | 'article' | 'author' | 'tool' | 'tools' | 'static';
  title: string;
  indexable: boolean;
  navOrder?: number;
  navLabel?: string;
};

export const SITE_URL = 'https://techworldwindow.com';

export const routeGraph: RouteNode[] = [
  { path: '/', kind: 'home', title: 'Tech World Window', indexable: true },
  { path: '/news', kind: 'category', title: 'Technology News', indexable: true, navOrder: 10, navLabel: 'News' },
  { path: '/windows', kind: 'category', title: 'Windows', indexable: true, navOrder: 20, navLabel: 'Windows' },
  { path: '/gaming', kind: 'category', title: 'Gaming', indexable: true, navOrder: 30, navLabel: 'Gaming' },
  { path: '/hardware', kind: 'category', title: 'Hardware', indexable: true, navOrder: 40, navLabel: 'Hardware' },
  { path: '/guides', kind: 'category', title: 'Guides', indexable: true, navOrder: 50, navLabel: 'Guides' },
  { path: '/reviews', kind: 'category', title: 'Reviews', indexable: true, navOrder: 60, navLabel: 'Reviews' },
  { path: '/tools', kind: 'tools', title: 'Technology Tools', indexable: true, navOrder: 70, navLabel: 'Tools' },
  { path: '/tools/pc-bottleneck-calculator', kind: 'tool', title: 'PC Bottleneck Calculator', indexable: true },
  { path: '/about', kind: 'static', title: 'About Tech World Window', indexable: true },
  { path: '/contact', kind: 'static', title: 'Contact', indexable: true },
  { path: '/editorial-policy', kind: 'static', title: 'Editorial Policy', indexable: true },
  { path: '/privacy-policy', kind: 'static', title: 'Privacy Policy', indexable: true },
  { path: '/authors/imran-natiq', kind: 'author', title: 'Imran Natiq', indexable: true },
  { path: '/windows-11-wifi-connected-no-internet', kind: 'article', title: 'Windows 11 Says Connected, but There Is No Internet', indexable: true },
  { path: '/pc-game-stuttering-fix-frame-time', kind: 'article', title: 'PC Game Stuttering: Frame-Time Spikes', indexable: true },
  { path: '/how-to-check-ssd-health-windows', kind: 'article', title: 'How to Check SSD Health in Windows', indexable: true }
];

export const navigation = routeGraph
  .filter(route => route.navOrder !== undefined && route.navLabel)
  .sort((a, b) => (a.navOrder ?? 0) - (b.navOrder ?? 0))
  .map(route => ({ label: route.navLabel as string, href: route.path }));