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
    relatedArticles: ['windows-dns-not-working', 'windows-network-reset'],
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
    relatedArticles: ['gpu-frame-time-spikes', 'shader-compilation-stutter'],
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
    relatedArticles: ['windows-wifi-diagnosis', 'nvme-temperature'],
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

  {
    id: 'windows-dns-not-working',
    slug: 'windows-11-dns-not-working-how-to-fix',
    title: 'Windows 11 DNS Not Working: How to Tell If DNS Is the Problem',
    dek: 'If Wi-Fi works but websites do not load by name, a simple DNS test can separate name-resolution problems from a broken internet connection.',
    excerpt: 'Use a few controlled Windows checks to determine whether DNS is failing before changing adapters, reinstalling drivers, or resetting the network.',
    category: 'Windows',
    subcategory: 'Networking',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    readingTime: 6,
    tags: ['Windows 11', 'DNS', 'Wi-Fi', 'Networking'],
    relatedArticles: ['windows-wifi-diagnosis', 'windows-network-reset'],
    contentRole: 'cluster',
    pillarPath: '/windows',
    searchIntent: 'informational',
    content: [
      { heading: 'First prove that the connection itself works', paragraphs: ['A DNS problem is different from having no network connection at all. Check whether the PC has an IP address and whether another device can browse through the same router before changing DNS settings.'] },
      { heading: 'Compare an IP address with a domain name', paragraphs: ['If a known reachable IP responds but a normal website name does not resolve, DNS becomes a stronger suspect. The important point is the pattern: one failed test alone does not prove DNS is responsible.'] },
      { heading: 'Flush the local DNS cache', paragraphs: ['Windows can retain cached DNS information. Running ipconfig /flushdns is a low-risk diagnostic step. Re-test afterward rather than stacking several network changes together.'], bullets: ['Open Command Prompt as a normal user for the cache-flush test.', 'Run the test again in the same browser.', 'Record whether the symptom changed before trying another fix.'] },
      { heading: 'When changing DNS servers makes sense', paragraphs: ['If your current DNS service is consistently failing while the rest of the connection works, testing another reputable DNS resolver can help isolate the issue. Treat that as a diagnostic change, not a universal performance upgrade.'] },
    ],
    faq: [
      { question: 'Does changing DNS make slow internet faster?', answer: 'Not usually. DNS can affect how quickly a hostname is resolved, but it does not increase the bandwidth supplied by your internet connection.' },
      { question: 'Should I change DNS before checking the router?', answer: 'No. First determine whether other devices are affected and whether the Windows PC has normal network connectivity.' },
    ],
  },
  {
    id: 'windows-network-reset',
    slug: 'windows-11-network-adapter-reset-guide',
    title: 'Windows 11 Network Adapter Reset: When to Use It and What It Changes',
    dek: 'A network reset can repair persistent Windows networking problems, but it is a cleanup step—not the first thing to try.',
    excerpt: 'Understand what Windows Network reset changes, what you should record first, and when a simpler adapter or DNS fix is more appropriate.',
    category: 'Windows',
    subcategory: 'Troubleshooting',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    readingTime: 7,
    tags: ['Windows 11', 'Network Adapter', 'Troubleshooting', 'Wi-Fi'],
    relatedArticles: ['windows-wifi-diagnosis', 'windows-dns-not-working'],
    contentRole: 'cluster',
    pillarPath: '/windows',
    searchIntent: 'informational',
    content: [
      { heading: 'Do not start with a reset', paragraphs: ['A network reset can remove and reinstall network adapters and return networking components to a default state. Because it can affect VPNs, virtual adapters, and custom settings, identify the simpler cause first.'] },
      { heading: 'What to record before resetting', paragraphs: ['If the computer uses a static IP, custom DNS, VPN client, virtual machine networking, or specialized adapter software, record those settings before starting. This makes recovery much easier if the reset removes them.'] },
      { heading: 'Use the reset as a controlled last resort', paragraphs: ['When basic Wi-Fi checks, DNS testing, driver checks, and adapter disable/enable steps have not solved the problem, a network reset can clear a damaged Windows networking configuration. Reboot and test the same symptom afterward.'] },
      { heading: 'If the problem returns immediately', paragraphs: ['A successful reset followed by the same failure points toward an external or hardware cause. Check the router, driver version, adapter hardware, VPN software, and whether the same PC fails on another network.'] },
    ],
    faq: [
      { question: 'Will Windows Network reset delete my files?', answer: 'The reset targets networking configuration rather than personal files, but it can remove or reset networking components and settings you may need to configure again.' },
      { question: 'Is network reset the same as reinstalling the Wi-Fi driver?', answer: 'No. A network reset is a broader Windows networking cleanup operation and may reinstall adapters as part of the process.' },
    ],
  },
  {
    id: 'gpu-frame-time-spikes',
    slug: 'gpu-frame-time-spikes-causes-fix',
    title: 'GPU Frame-Time Spikes: Common Causes of Uneven PC Game Performance',
    dek: 'A fast GPU can still produce an uneven experience. Frame-time spikes help reveal whether the problem is workload, thermals, software, or something else.',
    excerpt: 'Learn how to interpret GPU frame-time spikes and isolate the cause without blindly lowering every graphics setting.',
    category: 'Gaming',
    subcategory: 'Performance',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    readingTime: 8,
    tags: ['GPU', 'Frame time', 'Gaming PC', 'Performance'],
    relatedArticles: ['gaming-stutter', 'shader-compilation-stutter'],
    contentRole: 'cluster',
    pillarPath: '/gaming',
    searchIntent: 'informational',
    content: [
      { heading: 'Start with a repeatable scene', paragraphs: ['Use the same game area, camera movement, graphics preset, and resolution when comparing changes. Without a repeatable test, it is easy to mistake normal game variability for an improvement.'] },
      { heading: 'Watch frame time together with GPU usage', paragraphs: ['High GPU usage with stable clocks can indicate that the game is simply GPU-limited. Sudden frame-time spikes accompanied by clock or temperature changes point toward a different investigation.'] },
      { heading: 'Check thermals and power behavior', paragraphs: ['If the GPU becomes hot and its clock speed or power behavior changes at the same time as the stutter, investigate cooling, airflow, fan behavior, and power limits. Temperature by itself is not proof of throttling.'] },
      { heading: 'Do not lower every setting at once', paragraphs: ['Reduce one expensive setting at a time and record the result. Resolution, ray tracing, shadows, volumetrics, and texture-related settings do not have the same performance cost on every game or GPU.'] },
    ],
    faq: [
      { question: 'Is high GPU usage always bad?', answer: 'No. High sustained GPU usage is often normal when a game is GPU-limited. The problem is the combination of unstable frame delivery, clocks, temperatures, or other symptoms.' },
      { question: 'Can a CPU problem look like a GPU frame-time problem?', answer: 'Yes. A CPU-limited game can produce uneven frame delivery even when the GPU is not fully utilized, so both sides of the system should be measured.' },
    ],
  },
  {
    id: 'shader-compilation-stutter',
    slug: 'shader-compilation-stutter-pc-games',
    title: 'Shader Compilation Stutter in PC Games: Why It Happens and What to Check',
    dek: 'Some stutter is caused by shaders being prepared or cached during gameplay. Learn how to recognize that pattern before blaming the GPU.',
    excerpt: 'A practical way to distinguish shader compilation behavior from thermal, driver, storage, or CPU-related stutter.',
    category: 'Gaming',
    subcategory: 'Performance',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    readingTime: 7,
    tags: ['Shader compilation', 'Stuttering', 'PC Gaming', 'GPU Drivers'],
    relatedArticles: ['gaming-stutter', 'gpu-frame-time-spikes'],
    contentRole: 'cluster',
    pillarPath: '/gaming',
    searchIntent: 'informational',
    content: [
      { heading: 'Recognize the pattern', paragraphs: ['Shader-related stutter often appears when a game encounters a new effect, area, or rendering path and needs to prepare data. The pattern can be more repeatable after a driver or game update.'] },
      { heading: 'Do not confuse first-run behavior with permanent hardware trouble', paragraphs: ['A short burst of stutter during initial asset or shader preparation does not automatically mean the GPU is failing. Repeat the same sequence after the relevant caches have been built and compare frame-time behavior.'] },
      { heading: 'Check drivers and game updates', paragraphs: ['Driver changes can invalidate caches or alter shader behavior. If stutter started immediately after an update, record the driver and game versions before changing several other variables.'] },
      { heading: 'When the stutter is probably something else', paragraphs: ['Persistent spikes in every scene, thermal clock drops, memory pressure, background processes, storage problems, or CPU saturation point toward broader causes. Use telemetry rather than assuming every hitch is shader compilation.'] },
    ],
    faq: [
      { question: 'Can shader compilation stutter disappear after playing for a while?', answer: 'It can, depending on how the game manages shader preparation and caching. Repeating the same sequence is useful for testing whether the pattern changes.' },
      { question: 'Should I delete shader caches immediately?', answer: 'Not as a first step. Deleting caches can force the game or driver to rebuild them and may temporarily increase the behavior you are trying to diagnose.' },
    ],
  },
  {
    id: 'nvme-temperature',
    slug: 'nvme-ssd-temperature-too-high',
    title: 'NVMe SSD Temperature Too High: What the Numbers Actually Mean',
    dek: 'NVMe drives can run warm under sustained workloads. The useful question is whether temperature is affecting performance or signaling an installation problem.',
    excerpt: 'Understand SSD temperature readings, throttling patterns, airflow, heatsinks, and when to investigate further.',
    category: 'Hardware',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    readingTime: 7,
    tags: ['NVMe', 'SSD', 'Temperatures', 'PC Hardware'],
    relatedArticles: ['ssd-health', 'ssd-slowing-down'],
    contentRole: 'cluster',
    pillarPath: '/hardware',
    searchIntent: 'informational',
    content: [
      { heading: 'Do not judge temperature without workload context', paragraphs: ['A drive sitting near an idle desktop behaves differently from one handling a large file transfer, game install, benchmark, or sustained write workload. Record the workload and the temperature together.'] },
      { heading: 'Look for performance changes', paragraphs: ['Temperature becomes more important when it coincides with reduced throughput, changing controller behavior, or other repeatable performance limits. A warm reading alone is not proof of damage.'] },
      { heading: 'Check airflow and installation', paragraphs: ['Confirm that the drive is installed correctly, that any motherboard heatsink makes proper contact where applicable, and that nearby components are not trapping heat. Laptop cooling layouts can require a different approach from desktops.'] },
      { heading: 'Test before buying a cooler', paragraphs: ['Measure the same workload before and after improving airflow or heatsink contact. A change that lowers temperature but does not improve the actual symptom may not solve the underlying problem.'] },
    ],
    faq: [
      { question: 'Does a hot NVMe SSD mean it is failing?', answer: 'Not necessarily. Temperature, workload, drive design, airflow, and controller behavior all matter. Look for repeatable performance or health warnings as well.' },
      { question: 'Should every NVMe SSD have a heatsink?', answer: 'Not every system needs the same cooling solution. Sustained workloads, drive design, case airflow, and motherboard layout determine whether additional cooling is useful.' },
    ],
  },
  {
    id: 'ssd-slowing-down',
    slug: 'why-ssd-is-slowing-down-windows',
    title: 'Why an SSD Can Slow Down Over Time: What to Check Before Replacing It',
    dek: 'A slower SSD does not automatically mean the drive is dying. Free space, workload, temperature, health data, firmware, and system behavior can all matter.',
    excerpt: 'A practical diagnostic sequence for an SSD that feels slower than it used to.',
    category: 'Hardware',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    readingTime: 8,
    tags: ['SSD', 'Windows', 'Storage Performance', 'NVMe'],
    relatedArticles: ['ssd-health', 'nvme-temperature'],
    contentRole: 'cluster',
    pillarPath: '/hardware',
    searchIntent: 'informational',
    content: [
      { heading: 'Define what “slower” means', paragraphs: ['Longer boot times, slow file copies, application delays, and benchmark changes can have different causes. Reproduce the symptom and compare the same workload before concluding that the SSD itself is responsible.'] },
      { heading: 'Check free space and background activity', paragraphs: ['A nearly full system drive can behave differently from a lightly used one, while indexing, updates, antivirus scans, and other background activity can distort a quick benchmark. Test under controlled conditions.'] },
      { heading: 'Check health and temperature', paragraphs: ['Review SMART or vendor health information alongside temperature and observed performance. This combination is more useful than a single percentage or a single benchmark score.'] },
      { heading: 'Consider firmware and system configuration', paragraphs: ['If the slowdown is persistent, check the drive maker’s support information for firmware updates and known issues. Also verify that the drive is connected through the expected interface and that Windows is not reporting device errors.'] },
      { heading: 'Back up before deeper testing', paragraphs: ['If the drive shows warning indicators, unexpected errors, disappearing devices, or rapidly worsening behavior, protect important data first. Troubleshooting should never come before a needed backup.'] },
    ],
    faq: [
      { question: 'Can an SSD get slower when it is nearly full?', answer: 'It can. Available space and the drive controller’s ability to manage data can affect sustained write behavior, especially on some workloads and drive designs.' },
      { question: 'Should I replace an SSD just because a benchmark score dropped?', answer: 'No. First reproduce the same workload, check temperatures and background activity, and review health/error information.' },
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
