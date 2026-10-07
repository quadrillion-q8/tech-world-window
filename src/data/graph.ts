/**
 * Entity-first single source of truth for canonical public routes.
 * Navigation, sitemap generation, SSG inclusion and validation consume this graph.
 */
export type RouteNode = {
  path: string;
  kind: 'home' | 'category' | 'article' | 'author' | 'tool' | 'tools' | 'static' | 'product-review' | 'comparison';
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
  { path: '/reviews', kind: 'category', title: 'Technology Reviews', indexable: true, navOrder: 50, navLabel: 'Reviews' },
  { path: '/best', kind: 'category', title: 'Best Technology Picks', indexable: true, navOrder: 60, navLabel: 'Best' },
  { path: '/guides', kind: 'category', title: 'Guides', indexable: true, navOrder: 70, navLabel: 'Guides' },
  { path: '/tools', kind: 'tools', title: 'Technology Tools', indexable: true, navOrder: 80, navLabel: 'Tools' },
  { path: '/testing', kind: 'static', title: 'TWW Testing Methodology', indexable: true },
  { path: '/research', kind: 'static', title: 'TWW Technology Research', indexable: true },
  { path: '/reviews/ssds', kind: 'category', title: 'SSD Reviews', indexable: true },
  { path: '/reviews/ssds/samsung-990-pro-4tb', kind: 'product-review', title: 'Samsung 990 PRO 4TB Review', indexable: true },
  { path: '/reviews/ssds/crucial-t500-2tb', kind: 'product-review', title: 'Crucial T500 2TB Review', indexable: true },
  { path: '/compare/samsung-990-pro-vs-crucial-t500', kind: 'comparison', title: 'Samsung 990 PRO 4TB vs Crucial T500 2TB', indexable: true },
  { path: '/reviews/gpus', kind: 'category', title: 'GPU Reviews', indexable: true },
  { path: '/reviews/laptops', kind: 'category', title: 'Laptop Reviews', indexable: true },
  { path: '/reviews/cpus', kind: 'category', title: 'CPU Reviews', indexable: true },
  { path: '/best-ssds', kind: 'article', title: 'Best SSDs for Gaming and Windows', indexable: true },
  { path: '/best-gaming-laptops', kind: 'article', title: 'Best Gaming Laptops: How to Choose', indexable: true },
  { path: '/best-gaming-monitors', kind: 'article', title: 'Best Gaming Monitors: How to Choose', indexable: true },
  { path: '/best-ram', kind: 'article', title: 'Best RAM for Gaming PCs and Windows', indexable: true },
  { path: '/tools/pc-bottleneck-calculator', kind: 'tool', title: 'PC Bottleneck Calculator', indexable: true },
  { path: '/tools/psu-wattage-calculator', kind: 'tool', title: 'PSU Wattage Calculator', indexable: true },
  { path: '/tools/ram-calculator', kind: 'tool', title: 'RAM Calculator', indexable: true },
  { path: '/tools/storage-calculator', kind: 'tool', title: 'Storage Calculator', indexable: true },
  { path: '/about', kind: 'static', title: 'About Tech World Window', indexable: true },
  { path: '/contact', kind: 'static', title: 'Contact', indexable: true },
  { path: '/editorial-policy', kind: 'static', title: 'Editorial Policy', indexable: true },
  { path: '/privacy-policy', kind: 'static', title: 'Privacy Policy', indexable: true },
  { path: '/affiliate-disclosure', kind: 'static', title: 'Affiliate Disclosure', indexable: true },
  { path: '/authors/imran-natiq', kind: 'author', title: 'Imran Natiq', indexable: true },
  { path: '/windows-troubleshooting-complete-guide', kind: 'article', title: 'Windows Troubleshooting: Complete Guide to Diagnosing and Fixing Windows Problems', indexable: true },
  { path: '/windows-11-wifi-connected-no-internet', kind: 'article', title: 'Windows Says Connected but No Internet: Complete Troubleshooting Guide', indexable: true },
  { path: '/pc-game-stuttering-fix-frame-time', kind: 'article', title: 'PC Game Stuttering: Frame-Time Spikes', indexable: true },
  { path: '/how-to-check-ssd-health-windows', kind: 'article', title: 'How to Check SSD Health in Windows', indexable: true },
  { path: '/windows-11-dns-not-working-how-to-fix', kind: 'article', title: 'Windows 11 DNS Not Working: How to Tell If DNS Is the Problem', indexable: true },
  { path: '/windows-11-network-adapter-reset-guide', kind: 'article', title: 'Windows 11 Network Adapter Reset: When to Use It and What It Changes', indexable: true },
  { path: '/gpu-frame-time-spikes-causes-fix', kind: 'article', title: 'GPU Frame-Time Spikes: Common Causes of Uneven PC Game Performance', indexable: true },
  { path: '/shader-compilation-stutter-pc-games', kind: 'article', title: 'Shader Compilation Stutter in PC Games: Why It Happens and What to Check', indexable: true },
  { path: '/nvme-ssd-temperature-too-high', kind: 'article', title: 'NVMe SSD Temperature Too High: What the Numbers Actually Mean', indexable: true },
  { path: '/why-ssd-is-slowing-down-windows', kind: 'article', title: 'Why an SSD Can Slow Down Over Time: What to Check Before Replacing It', indexable: true },
  { path: '/how-to-check-ram-for-errors-windows', kind: 'article', title: 'How to Check RAM for Errors on Windows (MemTest86 and Windows Memory Diagnostic)', indexable: true },
  { path: '/windows-11-blue-screen-stop-code-how-to-read', kind: 'article', title: 'Windows 11 Blue Screen: How to Read the Stop Code and Find the Cause', indexable: true },
  { path: '/windows-11-freezing-randomly-causes-fix', kind: 'article', title: 'Windows 11 Freezing Randomly: How to Find the Cause', indexable: true },
  { path: '/microsoft-windows-surface-event-october-7-what-to-watch', kind: 'article', title: 'Microsoft October 7 Windows & Surface Event: Surface Laptop Ultra, RTX Spark and Local AI', indexable: true },
  { path: '/windows-11-wont-start-troubleshooting', kind: 'article', title: "Windows 11 Won’t Start: A Safe Troubleshooting Guide", indexable: true },
  { path: '/windows-11-update-stuck-troubleshooting', kind: 'article', title: "Windows 11 Update Stuck: What to Check Before Resetting Windows Update", indexable: true },
  { path: '/windows-11-high-memory-usage-how-to-find-the-cause', kind: 'article', title: "Windows 11 High Memory Usage: How to Find the Real Cause", indexable: true },
  { path: '/windows-11-unknown-device-device-manager', kind: 'article', title: "Windows 11 Unknown Device in Device Manager: How to Identify It", indexable: true },
  { path: '/windows-11-disk-100-percent-usage', kind: 'article', title: "Windows 11 100% Disk Usage: What It Means and What to Check", indexable: true },
  { path: '/windows-11-slow-startup-fix', kind: 'article', title: "Windows 11 Slow Startup: Find Out What Is Delaying Sign-In", indexable: true },
  { path: '/pc-game-low-fps-how-to-find-the-cause', kind: 'article', title: "Low FPS in PC Games: How to Find the Real Bottleneck", indexable: true },
  { path: '/pc-games-crashing-to-desktop-troubleshooting', kind: 'article', title: "PC Games Keep Crashing to Desktop: A Step-by-Step Diagnosis", indexable: true },
  { path: '/gpu-100-percent-usage-gaming', kind: 'article', title: "GPU at 100% Usage While Gaming: Is That a Problem?", indexable: true },
  { path: '/how-much-ram-do-you-need-gaming', kind: 'article', title: "How Much RAM Do You Need for Gaming and Windows?", indexable: true },
  { path: '/gpu-overheating-gaming-pc-causes-fix', kind: 'article', title: "GPU Overheating While Gaming: What to Check Before Replacing It", indexable: true },
  { path: '/pc-power-supply-problems-symptoms', kind: 'article', title: "PC Power Supply Problems: Symptoms That Point to the PSU", indexable: true },
  { path: '/ssd-nearly-full-windows-performance', kind: 'article', title: "SSD Nearly Full: How Much Free Space Does Windows Need?", indexable: true },
  { path: '/ddr4-vs-ddr5-ram-difference', kind: 'article', title: "DDR4 vs DDR5 RAM: What Actually Changes?", indexable: true },
  { path: '/laptop-nvme-ssd-upgrade-compatibility', kind: 'article', title: "Laptop NVMe SSD Upgrade: Check Compatibility Before You Buy", indexable: true },
  { path: '/gaming-laptop-upgradeable-ram-ssd', kind: 'article', title: "Can You Upgrade a Gaming Laptop? Check RAM and SSD First", indexable: true },
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
      { label: 'Windows and Surface Event', href: '/microsoft-windows-surface-event-october-7-what-to-watch', description: 'What is confirmed and what to watch.' },
    ],
  },
  {
    label: 'Windows',
    href: '/windows',
    description: 'Fixes, settings, updates and practical Windows help.',
    links: [
      { label: 'Windows Hub', href: '/windows' },
      { label: 'Universal Windows Troubleshooting', href: '/windows-troubleshooting-complete-guide', description: 'Start with the symptom and diagnose Windows problems systematically.' },
      { label: 'Windows Internet Troubleshooting', href: '/windows-11-wifi-connected-no-internet', description: 'Diagnose Wi-Fi, Ethernet, IP, DNS, VPN, and adapter failures.' },
      { label: 'DNS Problems', href: '/windows-11-dns-not-working-how-to-fix', description: 'Tell DNS failures apart from wider outages.' },
      { label: 'Network Reset', href: '/windows-11-network-adapter-reset-guide', description: 'Know when a Windows network reset is appropriate.' },
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
      { label: 'GPU Frame-Time Spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Separate GPU workload from other causes.' },
      { label: 'Shader Stutter', href: '/shader-compilation-stutter-pc-games', description: 'Recognize shader compilation behavior.' },
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
      { label: 'NVMe Temperatures', href: '/nvme-ssd-temperature-too-high', description: 'Interpret SSD heat and performance together.' },
      { label: 'SSD Slowdowns', href: '/why-ssd-is-slowing-down-windows', description: 'Diagnose storage performance changes.' },
      { label: 'RAM Testing', href: '/how-to-check-ram-for-errors-windows', description: 'Test memory for errors.' },
      { label: 'Blue Screens', href: '/windows-11-blue-screen-stop-code-how-to-read', description: 'Read stop codes and find the cause.' },
      { label: 'Random Freezes', href: '/windows-11-freezing-randomly-causes-fix', description: 'Classify freezes and find the cause.' },
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
    label: 'Reviews', href: '/reviews', description: 'Evidence-led product testing and technology comparisons.',
    links: [
      { label: 'All Reviews', href: '/reviews' },
      { label: 'SSD Reviews', href: '/reviews/ssds' },
      { label: 'GPU Reviews', href: '/reviews/gpus' },
      { label: 'Laptop Reviews', href: '/reviews/laptops' },
      { label: 'CPU Reviews', href: '/reviews/cpus' },
    ],
  },
  {
    label: 'Best', href: '/best', description: 'Buying guides built around real use cases and transparent criteria.',
    links: [
      { label: 'All Buying Guides', href: '/best' },
      { label: 'Best SSDs', href: '/best-ssds' },
      { label: 'Best Gaming Laptops', href: '/best-gaming-laptops' },
      { label: 'Best Gaming Monitors', href: '/best-gaming-monitors' },
      { label: 'Best RAM', href: '/best-ram' },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    description: 'Useful interactive tools with transparent assumptions.',
    links: [
      { label: 'Free Tech Tools', href: '/tools' },
      { label: 'PC Bottleneck Calculator', href: '/tools/pc-bottleneck-calculator', description: 'Explore CPU/GPU pairing.' },
      { label: 'PSU Wattage Calculator', href: '/tools/psu-wattage-calculator', description: 'Estimate practical PSU headroom.' },
      { label: 'RAM Calculator', href: '/tools/ram-calculator', description: 'Estimate memory requirements.' },
      { label: 'Storage Calculator', href: '/tools/storage-calculator', description: 'Plan storage capacity and headroom.' },
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
