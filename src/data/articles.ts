export type ArticleCategory = 'News' | 'Windows' | 'Gaming' | 'Hardware' | 'Guides' | 'Reviews';

export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  excerpt: string;
  category: ArticleCategory;
  subcategory?: string;
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: string;
  readingTime: number;
  tags: string[];
  featured?: boolean;
  content: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
  sources?: { label: string; url: string }[];
  testing?: string;
  relatedArticles?: string[];
  faq?: { question: string; answer: string }[];
  contentRole?: 'pillar' | 'cluster';
  pillarPath?: string;
  searchIntent?: 'informational' | 'commercial' | 'navigational';
};

export const articles: Article[] = [
  {
    id: 'windows-wifi-diagnosis',
    slug: 'windows-11-wifi-connected-no-internet',
    title: 'Windows 11 Says Connected, but There Is No Internet: A Practical Diagnosis',
    dek: 'Work through the connection in the right order—from router and DNS checks to the network adapter—before resetting everything.',
    excerpt: 'A systematic troubleshooting path for a Windows 11 PC that connects to Wi-Fi but cannot reach websites.',
    category: 'Windows',
    subcategory: 'Troubleshooting',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-04',
    readingTime: 7,
    tags: ['Windows 11', 'Wi-Fi', 'DNS', 'Troubleshooting'],
    relatedArticles: ['ssd-health'],
    contentRole: 'cluster',
    pillarPath: '/windows',
    searchIntent: 'informational',
    featured: true,
    content: [
      { heading: 'Start by isolating the fault', paragraphs: ['First, check whether another phone or computer can use the same Wi-Fi. If every device is offline, investigate the router or internet service before changing Windows settings.', 'If only one Windows PC is affected, continue with the checks below. This simple split avoids unnecessary driver removal and network resets.'] },
      { heading: 'Check the basics before changing settings', paragraphs: ['Turn Wi-Fi off and back on, reconnect to the correct network, and restart the router only if other devices also show trouble. If you use a VPN or proxy, temporarily disconnect it for a controlled test.'] , bullets: ['Open another website and test a second browser.', 'Check the date and time in Windows.', 'Forget and reconnect to the Wi-Fi network only after confirming you know its password.'] },
      { heading: 'Test DNS and the network path', paragraphs: ['Open Command Prompt and run ipconfig /all to inspect the active adapter. You can then run ipconfig /flushdns. If you are comfortable with command-line diagnostics, compare whether a public IP address responds while domain names fail; that pattern can point toward DNS rather than Wi-Fi itself.'] },
      { heading: 'When to investigate the driver', paragraphs: ['If the problem follows this PC across multiple networks, check Windows Update and the laptop or adapter maker’s support page for a suitable network driver. Avoid downloading driver packages from unknown third-party sites.'] },
      { heading: 'When a reset makes sense', paragraphs: ['Use Windows Network reset only after simpler tests. It can remove and reinstall network adapters and reset some networking components, so note any VPN or static-IP settings first.'] },
    ],
    faq: [
      { question: 'Why does Windows say connected but no internet?', answer: 'The Wi-Fi link may be working while the router, ISP, DNS, VPN, proxy, or Windows network stack is not.' },
      { question: 'Should I reset network settings immediately?', answer: 'No. First determine whether other devices are affected and test basic connectivity. A reset is a later troubleshooting step.' },
    ],
  },
  {
    id: 'gaming-stutter',
    slug: 'pc-game-stuttering-fix-frame-time',
    title: 'PC Game Stuttering: How to Diagnose Frame-Time Spikes',
    dek: 'Average FPS can look healthy while the game still feels uneven. Use frame-time evidence to narrow down the cause.',
    excerpt: 'A practical guide to separating shader compilation, background tasks, thermal limits, and hardware bottlenecks.',
    category: 'Gaming',
    subcategory: 'Performance',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-03',
    readingTime: 9,
    tags: ['Gaming PC', 'Frame time', 'GPU', 'CPU'],
    relatedArticles: ['ssd-health'],
    contentRole: 'cluster',
    pillarPath: '/gaming',
    searchIntent: 'informational',
    featured: true,
    content: [
      { heading: 'Look beyond average FPS', paragraphs: ['Average frames per second hides short pauses. A frame-time graph makes spikes visible and helps you compare the same scene before and after a change. Record one repeatable test instead of changing several settings at once.'] },
      { heading: 'Check repeatable causes first', paragraphs: ['Shader compilation can cause stutters after a game update or driver change. Background downloads, overlays, recording tools, and first-run asset loading can also disturb frame delivery.'] , bullets: ['Reproduce the same route or benchmark.', 'Watch CPU, GPU, memory, and temperature trends.', 'Change one variable per test and keep notes.'] },
      { heading: 'Check temperatures and clocks', paragraphs: ['If performance declines after several minutes, inspect CPU and GPU temperatures, clock speeds, power limits, and fan behavior. A high temperature alone does not prove throttling; look for a matching drop in clocks or power behavior.'] },
      { heading: 'Avoid miracle optimization lists', paragraphs: ['Do not disable security features or apply registry tweaks simply because a video recommends them. Prefer reversible settings, current official drivers, and measurements that show whether a change helped.'] },
    ],
    testing: 'Starter editorial template: replace this note with the exact PC specs, game version, capture method, test scene, settings, and measured before/after results whenever the article is presented as hands-on testing.',
    faq: [
      { question: 'Can high FPS still feel stuttery?', answer: 'Yes. Uneven frame delivery and short frame-time spikes can feel disruptive even when average FPS is high.' },
      { question: 'Should I reinstall Windows to fix stuttering?', answer: 'Usually not as a first step. Capture frame-time and system telemetry, then isolate drivers, background tasks, thermals, and game-specific behavior.' },
    ],
  },
  {
    id: 'ssd-health',
    slug: 'how-to-check-ssd-health-windows',
    title: 'How to Check SSD Health in Windows Without Guessing',
    dek: 'Learn what SMART status, remaining life estimates, temperature, and warning indicators can—and cannot—tell you.',
    excerpt: 'A safer way to inspect storage health and decide when to back up or investigate further.',
    category: 'Hardware',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-02',
    readingTime: 6,
    tags: ['SSD', 'SMART', 'Windows', 'Storage'],
    relatedArticles: ['windows-wifi-diagnosis', 'gaming-stutter'],
    contentRole: 'cluster',
    pillarPath: '/hardware',
    searchIntent: 'informational',
    content: [
      { heading: 'Start with a backup mindset', paragraphs: ['A health indicator is not a guarantee that a drive will survive, and a normal status does not replace backups. If files are important and the drive is behaving unusually, secure a copy before running lengthy tests.'] },
      { heading: 'Use a reputable monitoring tool', paragraphs: ['Check the drive maker’s official utility or a well-established SMART reader. Review the exact drive model, firmware, temperature, critical warnings, and available endurance information when exposed by the device.'] },
      { heading: 'Understand the limits', paragraphs: ['Different SATA and NVMe drives report attributes differently. A percentage used or remaining-life estimate is a vendor-defined indicator, not a precise prediction of the day a drive will fail.'] },
    ],
    faq: [
      { question: 'Does “Good” mean an SSD cannot fail?', answer: 'No. It means the reported health data does not currently show a recognized critical condition; sudden failures are still possible.' },
    ],
  },
];

export const categories = [
  { name: 'News', slug: 'news', description: 'Important technology updates, explained with context.' },
  { name: 'Windows', slug: 'windows', description: 'Windows fixes, updates, settings, drivers, and troubleshooting.' },
  { name: 'Gaming', slug: 'gaming', description: 'FPS, frame-time, gaming hardware, latency, and stability.' },
  { name: 'Hardware', slug: 'hardware', description: 'PC components, laptop parts, storage, cooling, and displays.' },
  { name: 'Guides', slug: 'guides', description: 'Evergreen, step-by-step technology help.' },
  { name: 'Reviews', slug: 'reviews', description: 'Evidence-led reviews and practical testing.' },
] as const;
