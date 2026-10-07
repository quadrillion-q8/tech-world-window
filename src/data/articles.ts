import { windowsTroubleshootingPillar } from './windows-troubleshooting-pillar';
export type ArticleCategory = 'News' | 'Windows' | 'Gaming' | 'Hardware' | 'Guides' | 'Reviews';

/** A table cell is plain text, or text with an internal link (route path or in-page #anchor). */
export type TableCell = string | { text: string; href: string };

export type ArticleTable = {
  caption: string;
  headers: string[];
  rows: TableCell[][];
};

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  /** Ordered steps, rendered as a numbered list. */
  steps?: string[];
  table?: ArticleTable;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  /** Optional shorter <title> for search results (brand suffix is appended automatically). */
  seoTitle?: string;
  dek: string;
  /** Optional meta description, kept to roughly 155 characters. Falls back to dek. */
  metaDescription?: string;
  excerpt: string;
  category: ArticleCategory;
  subcategory?: string;
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: string;
  readingTime: number;
  tags: string[];
  /** Software versions the guidance applies to, shown on the page. */
  appliesTo?: string[];
  featured?: boolean;
  content: ArticleSection[];
  sources?: { label: string; url: string }[];
  testing?: string;
  relatedArticles?: string[];
  faq?: { question: string; answer: string }[];
  contentRole?: 'pillar' | 'cluster';
  pillarPath?: string;
  searchIntent?: 'informational' | 'commercial' | 'navigational';
};

/** Stable in-page anchor id for a section heading (shared by the page, TOC and validator). */
export function headingId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Approximate visible word count, used for structured data. */
export function articleWordCount(article: Article): number {
  const cellText = (cell: TableCell) => (typeof cell === 'string' ? cell : cell.text);
  const text = [
    article.title,
    article.dek,
    article.excerpt,
    ...article.content.flatMap(section => [
      section.heading ?? '',
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.steps ?? []),
      ...(section.table ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat().map(cellText)] : []),
    ]),
    ...(article.faq ?? []).flatMap(item => [item.question, item.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export const articles: Article[] = [

  windowsTroubleshootingPillar,

  {
    id: 'windows-wifi-diagnosis',
    slug: 'windows-11-wifi-connected-no-internet',
    title: 'Windows Says Connected but No Internet: Complete Troubleshooting Guide',
    dek: 'How to tell whether a Windows PC with a Wi-Fi or Ethernet connection but no internet has a device, router, DNS, VPN, or service-provider problem, and what to test in what order.',
    excerpt: 'Connected does not mean online. Separate the local link, the router, name resolution, and the wider internet before changing settings.',
    category: 'Windows',
    subcategory: 'Networking',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 9,
    tags: ['Windows 11', 'Wi-Fi', 'No Internet', 'Networking', 'Troubleshooting'],
    relatedArticles: ['windows-troubleshooting-universal', 'windows-dns-not-working', 'windows-network-reset'],
    contentRole: 'cluster',
    pillarPath: '/windows-troubleshooting-complete-guide',
    searchIntent: 'informational',
    content: [
      { heading: 'What "connected, no internet" actually means', paragraphs: [
        'Windows reports a connection when the adapter has joined a network and obtained an address. It does not guarantee that traffic can reach the internet. The fault can sit on the PC, the router, the modem, the service provider, or in name resolution.',
        'The fastest way to narrow it down is to ask whether other devices on the same network are online. If they are also offline, the problem is outside Windows.'
      ], bullets: [
        'Other devices also offline → router, modem, or provider.',
        'Only this PC offline → adapter, driver, IP settings, DNS, VPN, or proxy.',
        'Websites fail but IP addresses respond → DNS.',
        'Wi-Fi fails but Ethernet works → wireless adapter, driver, or signal.'
      ] },
      { heading: 'Step 1: confirm the scope', paragraphs: [
        'Check another phone or computer on the same network. Then try the PC on a different network, such as a phone hotspot. If it works elsewhere, the PC is probably fine and the original network needs attention.'
      ] },
      { heading: 'Step 2: check the IP configuration', paragraphs: [
        'Open Terminal and run ipconfig /all. A valid connection normally shows an address in a private range, a default gateway, and DNS servers. An address beginning with 169.254 means Windows did not receive an address from the router.',
        'If the address is missing or self-assigned, restart the router and then release and renew the lease with ipconfig /release followed by ipconfig /renew.'
      ], bullets: [
        'No default gateway → the router is not answering the PC.',
        '169.254.x.x address → the DHCP server did not respond.',
        'Valid address and gateway → continue to the next step.'
      ] },
      { heading: 'Step 3: test the gateway, an IP address, and a name', paragraphs: [
        'Ping the default gateway, then a public IP address, then a website name. The point at which the replies stop tells you which layer is failing.',
        'If the gateway responds but a public IP does not, the problem is upstream of the router. If a public IP responds but a name does not, move to the DNS guide.'
      ], bullets: [
        'Gateway fails → local link or router.',
        'Gateway works, public IP fails → router or provider.',
        'Public IP works, names fail → DNS.'
      ] },
      { heading: 'Step 4: rule out VPN, proxy, and security software', paragraphs: [
        'VPN clients, proxy settings, and some security suites can block or reroute traffic and leave the adapter looking healthy. Disconnect the VPN, check that no manual proxy is configured, and test again.'
      ] },
      { heading: 'Step 5: adapter and driver', paragraphs: [
        'Disable and re-enable the adapter, then check whether a driver update or a recent driver change lines up with the start of the problem. Use the manufacturer or Windows Update for drivers rather than third-party download sites.',
        'If targeted fixes fail and the evidence points to a damaged network stack, a network reset is the last software step. Read the network reset guide first, because it removes saved networks and adapter settings.'
      ] }
    ],
    faq: [
      { question: 'Why does Windows say connected but there is no internet?', answer: 'The adapter joined the network, but traffic is blocked or failing further along, at the router, DNS, the provider, or because of VPN or proxy settings.' },
      { question: 'Should I reset my network right away?', answer: 'No. Test scope, IP configuration, gateway, and DNS first. A reset removes saved networks and adapter settings and is best kept as a later step.' }
    ]
  },

  {
    id: 'windows-dns-not-working',
    slug: 'windows-11-dns-not-working-how-to-fix',
    title: 'Windows 11 DNS Not Working: How to Tell If DNS Is the Problem',
    dek: 'How to recognize a DNS failure on Windows 11, tell it apart from a wider outage, and apply safe fixes without changing more than you need to.',
    excerpt: 'If websites fail by name but a public IP address still responds, DNS is the likely layer. Confirm it before changing resolvers.',
    category: 'Windows',
    subcategory: 'Networking',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 8,
    tags: ['Windows 11', 'DNS', 'Networking', 'Troubleshooting'],
    relatedArticles: ['windows-troubleshooting-universal', 'windows-wifi-diagnosis', 'windows-network-reset'],
    contentRole: 'cluster',
    pillarPath: '/windows-troubleshooting-complete-guide',
    searchIntent: 'informational',
    content: [
      { heading: 'What DNS does', paragraphs: [
        'DNS translates names such as a website address into the numeric addresses computers use. When it fails, the connection can look healthy while browsers report that a server cannot be found.'
      ] },
      { heading: 'How to confirm DNS is the problem', paragraphs: [
        'Ping a public IP address. If it replies but pinging a website name fails, name resolution is the likely failure. You can also use nslookup with a domain name; timeouts or server-failure responses point to the configured resolver.'
      ], bullets: [
        'IP address reachable, names fail → DNS.',
        'Both fail → connectivity problem, not just DNS.',
        'Only one site fails → that site or its record, not your resolver.'
      ] },
      { heading: 'Safe fixes, in order', paragraphs: [
        'Start with the least invasive actions and retest after each one.'
      ], bullets: [
        'Restart the router and the PC.',
        'Clear the Windows resolver cache with ipconfig /flushdns.',
        'Try another resolver on the adapter, then remove it if it makes no difference.',
        'Disable VPN or filtering software briefly to see whether it intercepts DNS.',
        'Use a network reset only if the above does not help and the network stack looks damaged.'
      ] },
      { heading: 'Router versus PC', paragraphs: [
        'If several devices have the same DNS trouble, the router or provider resolver is the common factor. Changing the DNS server on the router fixes it for every device, while changing it on the PC fixes only that PC.'
      ] }
    ],
    faq: [
      { question: 'Is changing my DNS server safe?', answer: 'Yes, it is reversible. Choose a resolver you trust, test the result, and set the adapter back to automatic if it does not help.' },
      { question: 'What does ipconfig /flushdns do?', answer: 'It clears the local DNS cache so Windows asks a resolver again instead of reusing old answers. It does not change your settings.' }
    ]
  },

  {
    id: 'windows-network-reset',
    slug: 'windows-11-network-adapter-reset-guide',
    title: 'Windows 11 Network Adapter Reset: When to Use It and What It Changes',
    dek: 'What a Windows 11 network reset actually does, what you lose when you run it, and which checks should come first.',
    excerpt: 'Network reset is a useful last software step, but it removes saved networks and adapter settings, so use it after targeted tests.',
    category: 'Windows',
    subcategory: 'Networking',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 7,
    tags: ['Windows 11', 'Network Reset', 'Networking', 'Troubleshooting'],
    relatedArticles: ['windows-troubleshooting-universal', 'windows-wifi-diagnosis', 'windows-dns-not-working'],
    contentRole: 'cluster',
    pillarPath: '/windows-troubleshooting-complete-guide',
    searchIntent: 'informational',
    content: [
      { heading: 'What network reset does', paragraphs: [
        'The Windows network reset removes and reinstalls network adapters and returns networking components to their defaults. Afterwards the PC behaves as if networking were newly set up.'
      ] },
      { heading: 'What you may lose', paragraphs: [
        'Saved Wi-Fi networks and passwords are forgotten, custom DNS and static IP settings return to defaults, and VPN clients or virtual adapters may need to be set up again. Write down any settings you rely on before running it.'
      ], bullets: [
        'Saved wireless networks and passwords.',
        'Static IP and custom DNS settings.',
        'VPN profiles and virtual switch adapters in some configurations.'
      ] },
      { heading: 'When it is appropriate', paragraphs: [
        'Consider it when several targeted checks have failed, the router and other devices are fine, the problem is limited to this PC, and the evidence suggests a damaged network stack, such as repeated adapter errors after software changes.',
        'Do not use it as a first response. If other devices are also offline, a reset on this PC cannot fix it.'
      ] },
      { heading: 'After the reset', paragraphs: [
        'Reconnect to your network, test the original symptom, and reinstall or reconfigure any VPN or custom settings one at a time so you can see which one reintroduces the fault.'
      ] }
    ],
    faq: [
      { question: 'Will a network reset delete my files?', answer: 'No. It affects networking settings and adapters, not personal files or installed programs, though VPN software may need reconfiguring.' }
    ]
  },

  {
    id: 'gaming-stutter',
    slug: 'pc-game-stuttering-fix-frame-time',
    title: 'PC Game Stuttering: How to Diagnose Frame-Time Spikes, Microstutter & FPS Drops',
    dek: 'A diagnostic guide to PC game stutter that separates frame-time spikes from low average FPS and works through shaders, CPU and GPU limits, memory, storage, drivers, and thermals.',
    excerpt: 'Smooth play depends on even frame delivery, not just a high average FPS. Classify the stutter first, then test the likely cause.',
    category: 'Gaming',
    subcategory: 'Performance',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 14,
    tags: ['PC Gaming', 'Stutter', 'Frame Time', 'FPS', 'Performance'],
    relatedArticles: ['gpu-frame-time-spikes', 'shader-compilation-stutter'],
    contentRole: 'pillar',
    pillarPath: '/gaming',
    searchIntent: 'informational',
    content: [
      { heading: 'Frame time versus average FPS', paragraphs: [
        'Average FPS hides spikes. A game can average 100 FPS and still stutter if a few frames take far longer than the rest. Frame time, the milliseconds each frame takes, shows those spikes directly, and 1% lows describe the worst frames more honestly than the average.'
      ] },
      { heading: 'Capture evidence first', paragraphs: [
        'Use an overlay or capture tool that shows frame time, CPU and GPU usage, VRAM, and temperatures. Reproduce the stutter in the same place and note whether it happens once, repeatedly, or only on first visit to an area.'
      ], bullets: [
        'Record settings, resolution, driver version, and the exact scene.',
        'Change one setting at a time.',
        'Compare a repeat run with a first run.'
      ] },
      { heading: 'Classify the stutter pattern', paragraphs: [
        'The pattern points at the cause.'
      ], bullets: [
        'Only the first time in an area → shader compilation or asset loading.',
        'Regular, rhythmic spikes → background tasks, overlays, or polling.',
        'Spikes when turning or moving fast → streaming from storage or CPU limits.',
        'Spikes after a few minutes → thermals or power limits.',
        'Everything slows together → GPU or CPU saturation.'
      ] },
      { heading: 'CPU, GPU, and memory limits', paragraphs: [
        'If GPU usage sits near full when frames drop, the GPU is the limit and lower settings or resolution help. If GPU usage is low while one CPU thread is saturated, the game is CPU limited. If VRAM is full, textures swap into system memory and cause spikes.'
      ] },
      { heading: 'Storage, background software, and drivers', paragraphs: [
        'Games installed on a hard drive can hitch when streaming assets. Background updaters, overlays, and recorders can cause periodic spikes. A recent graphics driver change that lines up with new stutter is worth rolling back to test.'
      ] },
      { heading: 'Thermals, power, and laptops', paragraphs: [
        'Throttled clocks reduce performance and can cause uneven frames. Check temperatures and clocks during play. On laptops, confirm the power mode and use the charger, since battery operation often limits performance.'
      ] },
      { heading: 'Network lag is different', paragraphs: [
        'Online latency and packet loss produce rubber-banding, not local rendering stutter. If frame-time graphs are smooth while the game still feels uneven, test network conditions separately.'
      ] },
      { heading: 'A controlled fix order', paragraphs: [
        'Work from least to most invasive and retest after each change.'
      ], bullets: [
        'Close overlays and background software.',
        'Lower the most demanding settings, usually textures, shadows, and ray tracing.',
        'Update or roll back the graphics driver.',
        'Move the game to an SSD if it is on a hard drive.',
        'Check thermals and power limits.',
        'Repair game files or reinstall only if the issue is specific to that game.'
      ] }
    ],
    faq: [
      { question: 'Why does my game stutter even with high FPS?', answer: 'Average FPS hides frame-time spikes. Uneven frame delivery feels like stutter even when the average looks high.' },
      { question: 'Will more RAM or a new GPU fix stutter?', answer: 'Only if that component is the measured limit. Identify the pattern and bottleneck first.' }
    ]
  },

  {
    id: 'gpu-frame-time-spikes',
    slug: 'gpu-frame-time-spikes-causes-fix',
    title: 'GPU Frame-Time Spikes: Common Causes of Uneven PC Game Performance',
    dek: 'How to tell whether frame-time spikes come from the GPU workload itself or from drivers, VRAM, thermals, and other parts of the system.',
    excerpt: 'Spikes that line up with full GPU usage are a workload problem. Spikes with low GPU usage point elsewhere.',
    category: 'Gaming',
    subcategory: 'Performance',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 8,
    tags: ['GPU', 'Frame Time', 'VRAM', 'PC Gaming'],
    relatedArticles: ['gaming-stutter', 'shader-compilation-stutter'],
    contentRole: 'cluster',
    pillarPath: '/pc-game-stuttering-fix-frame-time',
    searchIntent: 'informational',
    content: [
      { heading: 'Is the GPU the limit?', paragraphs: [
        'Watch GPU usage and frame time together. When usage is near full and frame time rises, the GPU cannot finish frames fast enough. When usage is low during spikes, something else, such as the CPU, storage, or a driver, is holding the GPU back.'
      ] },
      { heading: 'VRAM pressure', paragraphs: [
        'When video memory fills, the system moves data to slower system memory, which creates spikes. Lower texture quality or resolution first; those settings affect VRAM most.'
      ] },
      { heading: 'Drivers and settings', paragraphs: [
        'A new driver can introduce or fix stutter. If the problem began after an update, test the previous version. Also check frame limiters, sync settings, and power management modes, which can change frame pacing.'
      ] },
      { heading: 'Thermals and power', paragraphs: [
        'High temperatures or power limits cause clock drops mid-session. Monitor clocks and temperature while the stutter happens, and clean dust and verify airflow if clocks fall under load.'
      ], bullets: [
        'Spikes that begin after warm-up → thermal or power throttling.',
        'Spikes at fixed intervals → background software.',
        'Spikes only in one game → game or driver profile.'
      ] }
    ],
    faq: [
      { question: 'Can a failing GPU cause frame-time spikes?', answer: 'It can, usually with other signs such as artifacts, crashes, or driver resets. Rule out settings, drivers, and thermals first.' }
    ]
  },

  {
    id: 'shader-compilation-stutter',
    slug: 'shader-compilation-stutter-pc-games',
    title: 'Shader Compilation Stutter in PC Games: Why It Happens and What to Check',
    dek: 'Why many PC games hitch the first time effects appear, how shader caches change the behavior, and which checks separate shader stutter from other causes.',
    excerpt: 'If stutter appears the first time you see an effect or area and fades on repeat, shader compilation is the likely cause.',
    category: 'Gaming',
    subcategory: 'Performance',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 8,
    tags: ['Shaders', 'Stutter', 'PC Gaming', 'Drivers'],
    relatedArticles: ['gaming-stutter', 'gpu-frame-time-spikes'],
    contentRole: 'cluster',
    pillarPath: '/pc-game-stuttering-fix-frame-time',
    searchIntent: 'informational',
    content: [
      { heading: 'What shader compilation is', paragraphs: [
        'Shaders are small programs the GPU runs to draw effects. They are compiled for your specific GPU and driver. If a game compiles one in the middle of play, that frame takes much longer and you feel a hitch.'
      ] },
      { heading: 'How to recognize it', paragraphs: [
        'Shader stutter is repeatable on the first visit and mostly disappears when you repeat the same route. It often returns after a driver update or game update, because caches can be rebuilt.'
      ], bullets: [
        'First time in an area → hitching.',
        'Same area on the second pass → smoother.',
        'New driver or game patch → stutter returns for a while.'
      ] },
      { heading: 'What to check', paragraphs: [
        'Let the game finish any shader precompile step it offers. Keep the driver shader cache enabled and give it enough disk space. After a driver update, expect some re-compilation before judging smoothness.',
        'If stutter persists on repeat visits, look at other causes in the main stutter guide.'
      ] },
      { heading: 'What not to do', paragraphs: [
        'Do not delete caches repeatedly in search of a fix. That forces recompilation and makes the symptom worse.'
      ] }
    ],
    faq: [
      { question: 'Why does stutter go away on the second run?', answer: 'The shaders compiled the first time are cached, so later visits reuse them instead of compiling again.' }
    ]
  },

  {
    id: 'ssd-health',
    slug: 'how-to-check-ssd-health-windows',
    title: 'How to Check SSD Health in Windows',
    dek: 'How to read SSD health information in Windows, what SMART values such as wear, spare capacity, and media errors mean, and when to back up and replace a drive.',
    excerpt: 'Health tools report wear and error counters. Learn which values matter, and treat any warning as a reason to back up first.',
    category: 'Hardware',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 10,
    tags: ['SSD', 'SMART', 'Storage', 'Windows'],
    relatedArticles: ['nvme-temperature', 'ssd-slowdown', 'check-ram-for-errors'],
    contentRole: 'pillar',
    pillarPath: '/hardware',
    searchIntent: 'informational',
    content: [
      { heading: 'Where to look', paragraphs: [
        'Windows 11 shows basic drive health for some NVMe drives in Settings under Storage. For fuller detail, use a SMART-aware tool or the drive manufacturer utility, which can report wear, spare capacity, temperature, and error counts.'
      ] },
      { heading: 'Values that matter', paragraphs: [
        'Different drives name values differently, but the important ideas are consistent.'
      ], bullets: [
        'Percentage used or remaining life → estimated wear against rated endurance.',
        'Available spare → reserve blocks left to replace worn cells.',
        'Media and data integrity errors → uncorrectable errors; any growth is serious.',
        'Critical warning flags → the drive itself reporting a problem.',
        'Temperature → sustained high values can reduce performance and life.'
      ] },
      { heading: 'Reading the numbers sensibly', paragraphs: [
        'A drive showing moderate wear is normal; SSDs are designed to wear. Rising media errors, falling spare capacity, or a critical warning are more important than a single wear number. Treat the report as an estimate, not a guarantee.'
      ] },
      { heading: 'When to back up and replace', paragraphs: [
        'Back up regularly regardless of health. Replace a drive that reports critical warnings, growing media errors, or very low remaining life, and replace it sooner if the drive holds data you cannot recreate.'
      ] }
    ],
    faq: [
      { question: 'Can a SSD fail without warning?', answer: 'Yes. Health tools help, but they are not a guarantee, so keep backups.' }
    ]
  },

  {
    id: 'nvme-temperature',
    slug: 'nvme-ssd-temperature-too-high',
    title: 'NVMe SSD Temperature Too High: What the Numbers Actually Mean',
    dek: 'How to interpret NVMe SSD temperature readings, when heat reduces performance, and practical ways to improve cooling.',
    excerpt: 'High NVMe temperatures cause throttling long before they threaten the drive. Read the number alongside performance and the manufacturer limits.',
    category: 'Hardware',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 7,
    tags: ['NVMe', 'SSD', 'Temperature', 'Cooling'],
    relatedArticles: ['ssd-health', 'ssd-slowdown'],
    contentRole: 'cluster',
    pillarPath: '/how-to-check-ssd-health-windows',
    searchIntent: 'informational',
    content: [
      { heading: 'Reading the temperature', paragraphs: [
        'Tools usually report a composite temperature. Limits differ by drive, so check the manufacturer specification rather than relying on a single universal number. What matters most is whether the drive throttles: speeds drop sharply when it gets too hot.'
      ] },
      { heading: 'Signs of thermal throttling', paragraphs: [
        'Transfers that start fast and then fall to a fraction of the speed, especially during long copies or heavy writes, together with a high temperature reading, point to throttling.'
      ], bullets: [
        'Fast start then sudden slowdown during large transfers.',
        'Temperature climbing quickly under sustained load.',
        'Normal speed again after the drive cools.'
      ] },
      { heading: 'Improving cooling', paragraphs: [
        'Make sure the motherboard heatsink or drive heatsink is installed with its thermal pad correctly seated, improve case airflow, and avoid placing the drive directly under a hot GPU if the layout allows another slot. On laptops, clean vents and use a cooling-friendly power mode.'
      ] },
      { heading: 'When to worry', paragraphs: [
        'Brief spikes under load are normal. Sustained high temperatures at idle, or warnings from health tools, justify checking airflow, seating, and the drive health report.'
      ] }
    ],
    faq: [
      { question: 'Do I need a heatsink for an NVMe SSD?', answer: 'Many boards include one. Heavy sustained writes benefit most; light use may not need extra cooling.' }
    ]
  },

  {
    id: 'ssd-slowdown',
    slug: 'why-ssd-is-slowing-down-windows',
    title: 'Why an SSD Can Slow Down Over Time: What to Check Before Replacing It',
    dek: 'The most common reasons an SSD feels slower than before, from low free space and thermal throttling to background activity, drivers, and drive wear.',
    excerpt: 'Most SSD slowdowns have an ordinary cause that can be fixed without replacing the drive. Measure, then change.',
    category: 'Hardware',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 8,
    tags: ['SSD', 'Performance', 'Storage', 'Windows'],
    relatedArticles: ['ssd-health', 'nvme-temperature', 'check-ram-for-errors'],
    contentRole: 'cluster',
    pillarPath: '/how-to-check-ssd-health-windows',
    searchIntent: 'informational',
    content: [
      { heading: 'Start by measuring', paragraphs: [
        'Compare current speeds with what the drive delivered before, using the same test and conditions. Check Task Manager to see whether the drive is busy because of a background process, not because the drive itself is slow.'
      ] },
      { heading: 'Common causes', paragraphs: [
        'Several ordinary factors reduce SSD speed without any fault.'
      ], bullets: [
        'Very little free space, which limits the drive efficiency.',
        'Thermal throttling during sustained writes.',
        'Background indexing, updates, antivirus scans, or sync tools.',
        'Power-saving modes limiting performance, especially on laptops.',
        'Outdated or incorrect storage drivers and firmware.',
        'A drive whose fast cache is exhausted by large sustained writes.'
      ] },
      { heading: 'What to do', paragraphs: [
        'Free space, check temperatures, review background activity, and keep drivers and firmware current. Confirm that Windows is running TRIM, which is normally automatic for SSDs.'
      ] },
      { heading: 'When it is the drive', paragraphs: [
        'If speeds remain low after these checks and the health report shows high wear, spare capacity dropping, or errors, back up and plan to replace the drive.'
      ] }
    ],
    faq: [
      { question: 'Should I defragment an SSD?', answer: 'No. Windows optimizes SSDs with TRIM instead, and traditional defragmentation is not needed.' }
    ]
  },

  {
    id: 'check-ram-for-errors',
    slug: 'how-to-check-ram-for-errors-windows',
    title: 'How to Check RAM for Errors on Windows (MemTest86 and Windows Memory Diagnostic)',
    seoTitle: 'How to Check RAM for Errors in Windows 11 and 10',
    dek: 'How to tell whether random crashes, blue screens, or corrupted files point to faulty memory, which RAM test to run, and how to read the result.',
    metaDescription: 'Random crashes or blue screens? Learn how to test RAM for errors with Windows Memory Diagnostic and MemTest86, and how to read the results.',
    excerpt: 'Bad memory causes crashes that look like software problems. A proper test, run the right way, separates a failing module from a driver or storage fault.',
    category: 'Hardware',
    subcategory: 'Memory',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-07',
    updatedAt: '2026-10-07',
    readingTime: 8,
    tags: ['RAM', 'Memory', 'MemTest86', 'Blue Screen', 'Troubleshooting'],
    appliesTo: ['Windows 10', 'Windows 11'],
    relatedArticles: ['ssd-health', 'ssd-slowdown'],
    contentRole: 'cluster',
    pillarPath: '/hardware',
    searchIntent: 'informational',
    content: [
      { heading: 'When RAM is worth testing', paragraphs: [
        'Faulty memory rarely announces itself. It shows up as problems that seem unrelated and do not follow a pattern: crashes in different programs, blue screens with changing stop codes, files that turn out corrupted, or a PC that fails to boot only some of the time.',
        'A RAM test is worth running when several of these appear together, when the crashes started after installing or moving memory, or when software fixes have not helped. A single crash is not enough evidence.'
      ], bullets: [
        'Blue screens with codes such as MEMORY_MANAGEMENT or PAGE_FAULT_IN_NONPAGED_AREA.',
        'Different applications crashing for no clear reason.',
        'Corrupted downloads, archives, or installers.',
        'Random restarts or a PC that sometimes will not start.'
      ] },
      { heading: 'Before you test: remove the easy explanations', paragraphs: [
        'Reseat the memory modules and make sure they are fully clicked in. Check that you have not just changed BIOS settings. A memory profile such as XMP or EXPO runs the RAM faster than its default speed, and an unstable profile produces the same errors as a bad module.',
        'If you have a profile enabled, run the test once with it enabled and, if errors appear, again at default settings. Errors that disappear at default speed point to an unstable setting rather than a dead module.'
      ] },
      { heading: 'Method 1: Windows Memory Diagnostic (quick check)', paragraphs: [
        'This is built into Windows and needs nothing to download. It is good for a first check but less thorough than MemTest86.'
      ], steps: [
        'Save your work, press Windows + R, type mdsched.exe, and press Enter.',
        'Choose Restart now and check for problems. The PC reboots into the test.',
        'Let it finish. It runs in standard mode by default; press F1 to choose Extended for a longer, more thorough run.',
        'After Windows starts, open Event Viewer, go to Windows Logs, then System, and look for events from MemoryDiagnostics-Results. The message says whether errors were found.'
      ] },
      { heading: 'Method 2: MemTest86 (thorough check)', paragraphs: [
        'MemTest86 runs from a USB drive before Windows loads, so nothing else is using the memory while it is tested. This makes it the better tool when the quick check finds nothing but you still suspect the RAM.',
        'Download it from the official PassMark site, write it to a USB drive with the included tool, boot from that drive, and start the test. Let it complete several full passes. One pass is not enough, because some faults appear only intermittently.'
      ], bullets: [
        'Any reported error is a fail, even a single one.',
        'A clean result across multiple passes makes failing RAM unlikely, though it cannot prove memory is perfect.',
        'Do not stop at the first pass because it looks fine.'
      ] },
      { heading: 'If errors appear: find the faulty module', paragraphs: [
        'Errors tell you something is wrong with the memory system, not necessarily which stick. Test one module at a time in the same slot. If one module fails alone, it is the faulty one. If every module passes alone but fails together, try different slots, because the slot, the motherboard, or the memory settings may be the cause.',
        'A module that fails on its own should be replaced. If it is under warranty, the test result is useful evidence for a claim.'
      ] },
      { heading: 'If the test passes but crashes continue', paragraphs: [
        'A clean result moves suspicion elsewhere. Check storage health next, because failing drives cause similar corruption and crashes, then drivers, then temperatures and the power supply.'
      ], bullets: [
        'Check drive health with the SSD health guide.',
        'Update or roll back recent graphics and chipset drivers.',
        'Watch CPU and GPU temperatures under load.'
      ] }
    ],
    testing: 'The steps use tools built into Windows 10 and 11 and the publicly available MemTest86 utility. Menu names and test options can vary slightly between versions.',
    sources: [
      { label: 'Microsoft Support: Windows Memory Diagnostic', url: 'https://support.microsoft.com/windows' },
      { label: 'PassMark MemTest86', url: 'https://www.memtest86.com/' }
    ],
    faq: [
      { question: 'How long should I run a RAM test?', answer: 'Run several full passes. Windows Memory Diagnostic in Extended mode or MemTest86 can take from under an hour to several hours depending on how much memory you have.' },
      { question: 'Can a RAM test pass and the RAM still be bad?', answer: 'Yes. Some faults are intermittent, so a clean run reduces the likelihood of a memory fault but does not rule it out entirely.' },
      { question: 'Can XMP or EXPO cause RAM errors?', answer: 'Yes. An unstable memory profile can produce the same errors as faulty RAM, so retest at default speed before deciding to replace a module.' }
    ]
  }
];

export const categories = [
  { slug: 'news', name: 'News', description: 'Technology updates with context, not just headlines.' },
  { slug: 'windows', name: 'Windows', description: 'Fixes, settings, updates and practical Windows help.' },
  { slug: 'gaming', name: 'Gaming', description: 'Performance, frame-time, stability and gaming hardware.' },
  { slug: 'hardware', name: 'Hardware', description: 'PC parts, laptops, storage, cooling and displays.' },
  { slug: 'guides', name: 'Guides', description: 'Evergreen answers for real technology problems.' },
  { slug: 'reviews', name: 'Reviews', description: 'Practical testing with methods and limitations.' }
];
