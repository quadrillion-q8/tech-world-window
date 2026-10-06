/**
 * Entity-first single source of truth for canonical public routes.
 * Navigation, sitemap generation, SSG inclusion and validation consume this graph.
 */
export type RouteNode = {
  path: string;
  kind: 'home' | 'category' | 'article' | 'author' | 'tool' | 'tools' | 'static';
  title: string;
  indexable: boolean;
  navOrder?: number;
  navLabel?: string;
};

export type MenuGroup = {
  label: string;
  href?: string;
  description: string;
  links: { label: string; href: string; description?: string }[];
};

export const SITE_URL = 'https://techworldwindow.com';
export const SITE_NAME = 'Tech World Window';
export const SITE_TAGLINE = 'Your Window Into Technology';

export const routeGraph: RouteNode[] = [
  { path: '/', kind: 'home', title: SITE_NAME, indexable: true },
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

/**
 * Editorial mega-menu inventory. Unlike routeGraph, these are navigation
 * groupings, not additional URLs. Every href must resolve to a graph route.
 */
export const menuGroups: MenuGroup[] = [
  {
    label: 'News',
    href: '/news',
    description: 'Technology updates with context, not just headlines.',
    links: [
      { label: 'Latest Technology News', href: '/news', description: 'What matters and why.' },
      { label: 'Windows', href: '/windows', description: 'Microsoft and Windows coverage.' },
      { label: 'Hardware', href: '/hardware', description: 'PC components and devices.' },
    ],
  },
  {
    label: 'Windows',
    href: '/windows',
    description: 'Fixes, settings, updates and practical Windows help.',
    links: [
      { label: 'Windows Hub', href: '/windows' },
      { label: 'Wi-Fi & Internet', href: '/windows-11-wifi-connected-no-internet', description: 'Diagnose connected-but-offline PCs.' },
      { label: 'Guides', href: '/guides', description: 'Evergreen troubleshooting.' },
    ],
  },
  {
    label: 'Gaming',
    href: '/gaming',
    description: 'Performance, frame-time, stability and gaming hardware.',
    links: [
      { label: 'Gaming Hub', href: '/gaming' },
      { label: 'Frame-Time Stutter', href: '/pc-game-stuttering-fix-frame-time', description: 'Diagnose uneven frame delivery.' },
      { label: 'Hardware', href: '/hardware', description: 'Components that affect gaming.' },
    ],
  },
  {
    label: 'Hardware',
    href: '/hardware',
    description: 'PC parts, laptops, storage, cooling and displays.',
    links: [
      { label: 'Hardware Hub', href: '/hardware' },
      { label: 'SSD Health', href: '/how-to-check-ssd-health-windows', description: 'Understand SMART and endurance data.' },
      { label: 'Reviews', href: '/reviews', description: 'Evidence-led product coverage.' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    description: 'Evergreen answers for real technology problems.',
    links: [
      { label: 'All Guides', href: '/guides' },
      { label: 'Windows', href: '/windows' },
      { label: 'Gaming', href: '/gaming' },
      { label: 'Hardware', href: '/hardware' },
    ],
  },
  {
    label: 'Reviews',
    href: '/reviews',
    description: 'Practical testing with methods and limitations.',
    links: [
      { label: 'All Reviews', href: '/reviews' },
      { label: 'Hardware', href: '/hardware' },
      { label: 'Editorial Policy', href: '/editorial-policy', description: 'How testing claims are handled.' },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    description: 'Useful interactive tools with transparent assumptions.',
    links: [
      { label: 'Free Tech Tools', href: '/tools' },
      { label: 'PC Bottleneck Calculator', href: '/tools/pc-bottleneck-calculator', description: 'Explore CPU/GPU pairing.' },
      { label: 'Guides', href: '/guides', description: 'Understand the result before acting.' },
    ],
  },
];

export const siteEntity = {
  name: SITE_NAME,
  url: SITE_URL,
  tagline: SITE_TAGLINE,
  description: 'Technology news, practical fixes, real-world testing and useful tools — clearly explained.',
  publisherType: 'Organization',
};
