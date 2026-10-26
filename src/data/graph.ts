/**
 * Entity-first single source of truth for canonical public routes.
 * Navigation, sitemap generation, SSG inclusion and validation consume this graph.
 */
import { bsodEntries, bsodPath, shortHex } from './bsod';
import { tools } from './tools';
import { productPageTitle, productPath, products } from './products';
import { comparisons } from './comparisons';

export type RouteNode = {
  path: string;
  kind: 'home' | 'category' | 'article' | 'author' | 'tool' | 'tools' | 'bsod-code' | 'static' | 'product-review' | 'comparison';
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

export const SITE_URL = 'https://www.techworldwindow.com';
export const SITE_NAME = 'Tech World Window';
export const SITE_TAGLINE = 'Your Window Into Technology';

export const routeGraph: RouteNode[] = [
  { path: '/', kind: 'home', title: SITE_NAME, indexable: true },
  { path: '/news', kind: 'category', title: 'Technology News', indexable: true, navOrder: 40, navLabel: 'News' },
  { path: '/windows', kind: 'category', title: 'Windows', indexable: true, navOrder: 10, navLabel: 'Windows' },
  { path: '/gaming', kind: 'category', title: 'Gaming', indexable: true, navOrder: 20, navLabel: 'Gaming' },
  { path: '/hardware', kind: 'category', title: 'Hardware', indexable: true, navOrder: 30, navLabel: 'Hardware' },
  { path: '/reviews', kind: 'category', title: 'Technology Reviews', indexable: true, navOrder: 50, navLabel: 'Reviews' },
  { path: '/best', kind: 'category', title: 'Best Technology Picks', indexable: true, navOrder: 60, navLabel: 'Best' },
  { path: '/guides', kind: 'category', title: 'Guides', indexable: true, navOrder: 70, navLabel: 'Guides' },
  { path: '/tools', kind: 'tools', title: 'Technology Tools', indexable: true, navOrder: 80, navLabel: 'Tools' },
  { path: '/testing', kind: 'static', title: 'TWW Testing Methodology', indexable: true },
  { path: '/research', kind: 'static', title: 'TWW Technology Research', indexable: true },
  { path: '/reviews/ssds', kind: 'category', title: 'SSD Reviews', indexable: true },
  ...products.map(product => ({ path: productPath(product), kind: 'product-review' as const, title: productPageTitle(product), indexable: true })),
  ...comparisons.map(item => ({ path: item.path, kind: 'comparison' as const, title: item.title, indexable: true })),
  { path: '/reviews/gpus', kind: 'category', title: 'GPU Reviews', indexable: true },
  { path: '/reviews/laptops', kind: 'category', title: 'Laptop Reviews', indexable: true },
  { path: '/reviews/cpus', kind: 'category', title: 'CPU Reviews', indexable: true },
  { path: '/best-ssds', kind: 'article', title: 'Best SSDs for Gaming and Windows', indexable: true },
  { path: '/best-gaming-laptops', kind: 'article', title: 'Best Gaming Laptops: How to Choose', indexable: true },
  { path: '/best-gaming-monitors', kind: 'article', title: 'Best Gaming Monitors: How to Choose', indexable: true },
  { path: '/best-ram', kind: 'article', title: 'Best RAM for Gaming PCs and Windows', indexable: true },
  // Tool pages come from the tools registry (src/data/tools.ts); BSOD code pages from src/data/bsod.ts.
  ...tools.map(tool => ({ path: tool.path, kind: 'tool' as const, title: tool.title, indexable: true })),
  ...bsodEntries.map(entry => ({ path: bsodPath(entry.slug), kind: 'bsod-code' as const, title: `${entry.name} (${shortHex(entry.hex)})`, indexable: true })),
  { path: '/about', kind: 'static', title: 'About Tech World Window', indexable: true },
  { path: '/contact', kind: 'static', title: 'Contact', indexable: true },
  { path: '/gallery', kind: 'static', title: 'Repair Bench Photo Gallery', indexable: true },
  { path: '/editorial-policy', kind: 'static', title: 'Editorial Policy', indexable: true },
  { path: '/privacy-policy', kind: 'static', title: 'Privacy Policy', indexable: true },
  { path: '/affiliate-disclosure', kind: 'static', title: 'Affiliate Disclosure', indexable: true },
  { path: '/authors/imran-natiq', kind: 'author', title: 'Imran Natiq', indexable: true },
  { path: '/research/ssd-nearly-full-what-really-changes', kind: 'article', title: 'What Really Changes When an SSD Gets Nearly Full?', indexable: true },
  { path: '/research/windows-100-percent-disk-usage-low-mbps', kind: 'article', title: 'Windows Shows 100% Disk Usage but Very Low MB/s: What Is Actually Happening?', indexable: true },
  { path: '/research/what-actually-causes-pc-game-stuttering', kind: 'article', title: 'What Actually Causes PC Game Stuttering? A Frame-Time Investigation', indexable: true },
  { path: '/research/does-more-ram-make-windows-faster', kind: 'article', title: 'Does More RAM Actually Make Windows Faster? What to Measure Before Upgrading', indexable: true },
  { path: '/research/how-ssd-temperature-affects-performance', kind: 'article', title: 'How SSD Temperature Can Affect Real-World Performance', indexable: true },
  { path: '/research/upgrade-ram-ssd-now-or-wait', kind: 'article', title: 'Should You Upgrade RAM or SSD Now—or Wait? A 2026 Decision Guide', indexable: true },
  { path: '/windows-patch-tuesday', kind: 'article', title: 'Windows Patch Tuesday: What to Install, What Changed, and What to Check', indexable: true },
  { path: '/windows-troubleshooting-complete-guide', kind: 'article', title: 'Windows Troubleshooting: Complete Guide to Diagnosing and Fixing Windows Problems', indexable: true },
  { path: '/windows-11-26h2-installation-guide', kind: 'article', title: 'Windows 11 26H2 Installation Guide: Upgrade, ISO and Fixes', indexable: true },
  { path: '/windows-11-8gb-ram-update-october-2026', kind: 'article', title: 'Windows 11’s 8GB RAM Update: What Changed in October 2026', indexable: true },
  { path: '/windows-11-wifi-connected-no-internet', kind: 'article', title: 'Windows Says Connected but No Internet: Complete Troubleshooting Guide', indexable: true },
  { path: '/pc-game-stuttering-fix-frame-time', kind: 'article', title: 'PC Game Stuttering: Frame-Time Spikes', indexable: true },
  { path: '/pc-gaming-performance-complete-guide', kind: 'article', title: 'PC Gaming Performance: A Complete Guide to FPS, Stutter and Crashes', indexable: true },
  { path: '/how-to-check-ssd-health-windows', kind: 'article', title: 'How to Check SSD Health in Windows', indexable: true },
  { path: '/pc-hardware-troubleshooting-complete-guide', kind: 'article', title: 'PC Hardware Troubleshooting: A Complete Guide to Diagnosis and Upgrades', indexable: true },
  { path: '/windows-11-dns-not-working-how-to-fix', kind: 'article', title: 'Windows 11 DNS Not Working: How to Tell If DNS Is the Problem', indexable: true },
  { path: '/windows-11-network-adapter-reset-guide', kind: 'article', title: 'Windows 11 Network Adapter Reset: When to Use It and What It Changes', indexable: true },
  { path: '/gpu-frame-time-spikes-causes-fix', kind: 'article', title: 'GPU Frame-Time Spikes: Causes and How to Diagnose Them', indexable: true },
  { path: '/shader-compilation-stutter-pc-games', kind: 'article', title: 'Shader Compilation Stutter in PC Games: Why It Happens and What to Check', indexable: true },
  { path: '/gamebar-presence-writer-fix', kind: 'article', title: 'GameBarPresenceWriter.exe: What It Does and How to Troubleshoot Stutter', indexable: true },
  { path: '/nvme-ssd-temperature-too-high', kind: 'article', title: 'NVMe SSD Temperature Too High: What Is Normal and When It Throttles', indexable: true },
  { path: '/why-ssd-is-slowing-down-windows', kind: 'article', title: 'Why an SSD Can Slow Down Over Time: What to Check Before Replacing It', indexable: true },
  { path: '/how-to-check-ram-for-errors-windows', kind: 'article', title: 'How to Check RAM for Errors on Windows (MemTest86 and Windows Memory Diagnostic)', indexable: true },
  { path: '/windows-11-blue-screen-stop-code-how-to-read', kind: 'article', title: 'Windows 11 Blue Screen Stop Codes: What They Mean and How to Find the Cause', indexable: true },
  { path: '/windows-11-freezing-randomly-causes-fix', kind: 'article', title: 'Windows 11 Freezing Randomly: How to Find the Cause', indexable: true },
  { path: '/microsoft-windows-surface-event-october-7-what-to-watch', kind: 'article', title: 'Microsoft October 7 Windows & Surface Event: Surface Laptop Ultra, RTX Spark and Local AI', indexable: true },
  { path: '/windows-11-wont-start-troubleshooting', kind: 'article', title: "Windows 11 Won’t Start: A Safe Troubleshooting Guide", indexable: true },
  { path: '/windows/windows-update-stuck', kind: 'article', title: "Windows Update Stuck? How Long to Wait, What to Check, and How to Fix It (Windows 11 & 10)", indexable: true },
  { path: '/windows-11-high-memory-usage-how-to-find-the-cause', kind: 'article', title: "Windows 11 High Memory Usage: How to Find the Real Cause", indexable: true },
  { path: '/windows-11-unknown-device-device-manager', kind: 'article', title: "Windows 11 Unknown Device in Device Manager: Find the Driver with the Hardware ID", indexable: true },
  { path: '/windows-11-disk-100-percent-usage', kind: 'article', title: "Windows 11 100% Disk Usage: What It Means and What to Check", indexable: true },
  { path: '/windows-11-slow-startup-fix', kind: 'article', title: "Windows 11 Slow Startup: Find Out What Is Delaying Sign-In", indexable: true },
  { path: '/pc-game-low-fps-how-to-find-the-cause', kind: 'article', title: "Low FPS in PC Games: How to Find the Real Bottleneck", indexable: true },
  { path: '/pc-games-crashing-to-desktop-troubleshooting', kind: 'article', title: "PC Games Keep Crashing to Desktop: A Step-by-Step Diagnosis", indexable: true },
  { path: '/gpu-100-percent-usage-gaming', kind: 'article', title: "GPU at 100% Usage While Gaming: Is That a Problem?", indexable: true },
  { path: '/how-much-ram-do-you-need-gaming', kind: 'article', title: "How Much RAM Do You Need for Gaming and Windows 11?", indexable: true },
  { path: '/gpu-overheating-gaming-pc-causes-fix', kind: 'article', title: "GPU Overheating While Gaming: What to Check Before Replacing It", indexable: true },
  { path: '/pc-power-supply-problems-symptoms', kind: 'article', title: "PC Power Supply Problems: Symptoms, Safe Tests, and Diagnosis", indexable: true },
  { path: '/ssd-nearly-full-windows-performance', kind: 'article', title: "SSD Nearly Full: How Much Free Space Does Windows Need?", indexable: true },
  { path: '/ddr4-vs-ddr5-ram-difference', kind: 'article', title: "DDR4 vs DDR5 RAM: What Actually Changes?", indexable: true },
  { path: '/laptop-nvme-ssd-upgrade-compatibility', kind: 'article', title: "Laptop NVMe SSD Upgrade: Check Compatibility Before You Buy", indexable: true },
  { path: '/gaming-laptop-upgradeable-ram-ssd', kind: 'article', title: "Can You Upgrade a Gaming Laptop? RAM & SSD Compatibility Guide", indexable: true },
  { path: '/laptop-wont-turn-on', kind: 'article', title: 'Laptop Won’t Turn On: Safe Checks Before You Need a Repair', indexable: true },
  { path: '/bios-uefi-recovery-guide', kind: 'article', title: 'BIOS or UEFI Update Failed? A Safe, Universal Recovery Guide', indexable: true },
  { path: '/why-windows-asks-for-a-bitlocker-recovery-key-after-bios-update', kind: 'article', title: 'BitLocker Recovery Key After BIOS Update: Find It and Stop Repeat Prompts', indexable: true },
  { path: '/windows-secure-boot-certificate-update', kind: 'article', title: 'Windows Secure Boot Certificate Update: How to Check Status Safely', indexable: true },
  { path: '/laptop-battery-warning-signs', kind: 'article', title: 'Laptop Battery Health Guide: Warning Signs, Testing and Safety', indexable: true },
  { path: '/why-8gb-ram-is-no-longer-enough-for-windows-11', kind: 'article', title: 'Why 8GB RAM Can Feel Limiting on Windows 11', indexable: true },
  { path: '/windows-11-26h2-iso-released', kind: 'article', title: 'Windows 11 26H2 Is Available: What to Know About the ISO', indexable: true },
  { path: '/windows-11-wifi-keeps-disconnecting', kind: 'article', title: 'Windows 11 Wi-Fi Keeps Disconnecting: Find the Real Cause', indexable: true },
  { path: '/windows-11-black-screen-after-login', kind: 'article', title: 'Windows 11 Black Screen After Login: Safe Troubleshooting', indexable: true },
  { path: '/laptop-plugged-in-not-charging', kind: 'article', title: 'Laptop Plugged In but Not Charging: What to Check', indexable: true },
  { path: '/pc-turns-on-but-no-display', kind: 'article', title: 'PC Turns On but Has No Display: A Safe Diagnostic Guide', indexable: true },
  { path: '/ssd-not-detected-in-bios-or-windows', kind: 'article', title: 'SSD Not Detected in BIOS or Windows: Find the Failure Point', indexable: true },
  { path: '/windows-11-usb-device-not-recognized', kind: 'article', title: 'USB Device Not Recognized in Windows: A Diagnostic Guide', indexable: true },
  { path: '/windows-11-bluetooth-not-working', kind: 'article', title: 'Bluetooth Not Working in Windows 11: Pairing, Missing Toggle and Dropouts', indexable: true },
  { path: '/windows-11-no-sound-speakers-headphones', kind: 'article', title: 'No Sound in Windows 11? Diagnose Speakers, Headphones and Missing Audio', indexable: true },
  { path: '/windows-11-camera-not-working', kind: 'article', title: 'Windows Camera Not Working: Fix a Missing Webcam or Black Screen', indexable: true },
  { path: '/windows-second-monitor-not-detected', kind: 'article', title: 'Second Monitor Not Detected in Windows: Diagnose Cables, Ports and Settings', indexable: true },
  { path: '/windows-file-explorer-not-responding', kind: 'article', title: 'File Explorer Not Responding in Windows: Find the Cause Safely', indexable: true },
  { path: '/windows-printer-offline-queue-stuck', kind: 'article', title: 'Printer Offline in Windows: Fix Connection Problems and Stuck Print Jobs', indexable: true },
  { path: '/windows-search-not-working', kind: 'article', title: 'Windows Search Not Working: Fix Start Menu and Missing Results', indexable: true },
  { path: '/windows-touchpad-not-working', kind: 'article', title: 'Laptop Touchpad Not Working in Windows: Safe Diagnosis', indexable: true },
  { path: '/windows-keyboard-mouse-not-working', kind: 'article', title: 'Keyboard or Mouse Not Working in Windows: Troubleshooting', indexable: true },
  { path: '/multi-agent-ai-systems-orchestration', kind: 'article', title: 'Multi-Agent AI Systems Explained: Architecture, Orchestration, Benefits and Risks', indexable: true },
];

export const navigation = routeGraph

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
      
      { label: 'Windows and Surface Event', href: '/microsoft-windows-surface-event-october-7-what-to-watch', description: 'What is confirmed and what to watch.' },
    ],
  },
  {
    label: 'Windows',
    href: '/windows',
    description: 'Fixes, settings, updates and practical Windows help.',
    links: [
      
      { label: 'Universal Windows Troubleshooting', href: '/windows-troubleshooting-complete-guide', description: 'Start with the symptom and diagnose Windows problems systematically.' },
      { label: 'Windows 11 26H2 Installation Guide', href: '/windows-11-26h2-installation-guide', description: 'Choose an upgrade or clean-install path and troubleshoot setup safely.' },
      { label: 'Windows Update Stuck', href: '/windows/windows-update-stuck', description: 'How long to wait, how to test activity, and the safest repair order.' },
      { label: 'Patch Tuesday', href: '/windows-patch-tuesday', description: 'Monthly Windows security updates, known issues and practical next steps.' },
      { label: 'Windows Internet Troubleshooting', href: '/windows-11-wifi-connected-no-internet', description: 'Diagnose Wi-Fi, Ethernet, IP, DNS, VPN, and adapter failures.' },
      { label: 'DNS Problems', href: '/windows-11-dns-not-working-how-to-fix', description: 'Tell DNS failures apart from wider outages.' },
      { label: 'Network Reset', href: '/windows-11-network-adapter-reset-guide', description: 'Know when a Windows network reset is appropriate.' },
      { label: 'Bluetooth Problems', href: '/windows-11-bluetooth-not-working', description: 'Diagnose missing Bluetooth controls, pairing failures and drops.' },
      { label: 'No Sound or Headphones', href: '/windows-11-no-sound-speakers-headphones', description: 'Check Windows audio routing, speakers and microphone input.' },
      { label: 'Webcam Not Working', href: '/windows-11-camera-not-working', description: 'Troubleshoot camera privacy, black preview and device detection.' },
      { label: 'Second Monitor Not Detected', href: '/windows-second-monitor-not-detected', description: 'Isolate display signal, cable, port and dock issues.' },
      { label: 'File Explorer Freezing', href: '/windows-file-explorer-not-responding', description: 'Find out whether a folder, resource or Windows component is hanging.' },
      { label: 'Printer Offline', href: '/windows-printer-offline-queue-stuck', description: 'Check printer connectivity, stuck jobs and the print queue.' },
      { label: 'Windows Search Problems', href: '/windows-search-not-working', description: 'Troubleshoot Start-menu search, missing files and indexing.' },
      { label: 'Laptop Touchpad Not Working', href: '/windows-touchpad-not-working', description: 'Check touchpad settings, device detection and drivers.' },
      { label: 'Keyboard and Mouse Problems', href: '/windows-keyboard-mouse-not-working', description: 'Isolate USB, wireless, Bluetooth and input-setting failures.' },
      { label: 'BSOD Code Lookup', href: '/tools/bsod-error-code-lookup', description: 'Look up a blue screen stop code.' },
      { label: 'Guides', href: '/guides', description: 'Evergreen troubleshooting.' },
    ],
  },
  {
    label: 'Gaming',
    href: '/gaming',
    description: 'Performance, frame-time, stability and gaming hardware.',
    links: [
      { label: 'Multi-Agent AI Systems', href: '/multi-agent-ai-systems-orchestration', description: 'Architecture patterns, costs, security and human approval.' },
      
      { label: 'Complete Gaming Troubleshooting Guide', href: '/pc-gaming-performance-complete-guide', description: 'Start with the symptom and diagnose low FPS, stutter, crashes, thermals and bottlenecks.' },
      { label: 'Frame-Time Stutter', href: '/pc-game-stuttering-fix-frame-time', description: 'Diagnose uneven frame delivery.' },
      { label: 'GPU Frame-Time Spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Separate GPU workload from other causes.' },
      { label: 'Shader Stutter', href: '/shader-compilation-stutter-pc-games', description: 'Recognize shader compilation behavior.' },
      { label: 'Low FPS', href: '/pc-game-low-fps-how-to-find-the-cause', description: 'Separate sustained low frame rates from intermittent hitches.' },
      { label: 'GPU at 100% Usage', href: '/gpu-100-percent-usage-gaming', description: 'Learn when full GPU utilization is expected and what to test if performance is poor.' },
      { label: 'Games Crashing to Desktop', href: '/pc-games-crashing-to-desktop-troubleshooting', description: 'Diagnose game exits and freezes before reinstalling.' },
      { label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer', description: 'Compare captures and inspect uneven frame delivery locally.' },
      { label: 'Hardware', href: '/hardware', description: 'Components that affect gaming.' },
    ],
  },
  {
    label: 'Hardware',
    href: '/hardware',
    description: 'PC parts, laptops, storage, cooling and displays.',
    links: [
      
      { label: 'Complete Hardware Troubleshooting Guide', href: '/pc-hardware-troubleshooting-complete-guide', description: 'Diagnose power, display, memory, storage and thermal problems before replacing parts.' },
      { label: 'SSD Health', href: '/how-to-check-ssd-health-windows', description: 'Understand SMART and endurance data.' },
      { label: 'NVMe Temperatures', href: '/nvme-ssd-temperature-too-high', description: 'Interpret SSD heat and performance together.' },
      { label: 'SSD Slowdowns', href: '/why-ssd-is-slowing-down-windows', description: 'Diagnose storage performance changes.' },
      { label: 'RAM Testing', href: '/how-to-check-ram-for-errors-windows', description: 'Test memory for errors.' },
      { label: 'Blue Screens', href: '/windows-11-blue-screen-stop-code-how-to-read', description: 'Read stop codes and find the cause.' },
      { label: 'Random Freezes', href: '/windows-11-freezing-randomly-causes-fix', description: 'Classify freezes and find the cause.' },
      { label: 'Repair Bench Gallery', href: '/gallery', description: 'Real photos of dust, thermal paste and hardware repairs.' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    description: 'Evergreen answers for real technology problems.',
    links: [
      
      { label: 'Windows', href: '/windows' },
      { label: 'Gaming', href: '/gaming' },
      { label: 'Hardware', href: '/hardware' },
      { label: 'BIOS / UEFI Recovery Guide', href: '/bios-uefi-recovery-guide', description: 'Safely diagnose failed firmware updates and choose a model-specific recovery path.' },
      { label: 'BitLocker Recovery After BIOS Update', href: '/why-windows-asks-for-a-bitlocker-recovery-key-after-bios-update', description: 'Find the recovery key and resolve firmware-triggered prompts without risking encrypted data.' },
      { label: 'Laptop Battery Health & Safety', href: '/laptop-battery-warning-signs', description: 'Check battery health, troubleshoot fast drain, and recognize urgent battery warning signs.' },
      { label: 'Wi-Fi Keeps Disconnecting', href: '/windows-11-wifi-keeps-disconnecting', description: 'Separate device, signal and router problems before resetting the network.' },
      { label: 'Black Screen After Login', href: '/windows-11-black-screen-after-login', description: 'Recover a black desktop by checking display output, the shell and drivers.' },
      { label: 'Laptop Plugged In but Not Charging', href: '/laptop-plugged-in-not-charging', description: 'Check power delivery, charge limits and battery safety before replacing parts.' },
      { label: 'PC Turns On but Has No Display', href: '/pc-turns-on-but-no-display', description: 'Separate monitor issues from failed POST and hardware initialization.' },
      { label: 'SSD Not Detected', href: '/ssd-not-detected-in-bios-or-windows', description: 'Distinguish firmware detection from Windows mounting without risking data.' },
      { label: 'USB Device Not Recognized', href: '/windows-11-usb-device-not-recognized', description: 'Isolate the device, cable, port, power path and Windows driver.' },
      { label: 'Bluetooth Problems', href: '/windows-11-bluetooth-not-working', description: 'Diagnose missing Bluetooth controls, pairing failures and drops.' },
      { label: 'No Sound or Headphones', href: '/windows-11-no-sound-speakers-headphones', description: 'Check Windows audio routing, speakers and microphone input.' },
      { label: 'Webcam Not Working', href: '/windows-11-camera-not-working', description: 'Troubleshoot camera privacy, black preview and device detection.' },
      { label: 'Second Monitor Not Detected', href: '/windows-second-monitor-not-detected', description: 'Isolate display signal, cable, port and dock issues.' },
      { label: 'File Explorer Freezing', href: '/windows-file-explorer-not-responding', description: 'Find out whether a folder, resource or Windows component is hanging.' },
      { label: 'Printer Offline', href: '/windows-printer-offline-queue-stuck', description: 'Check printer connectivity, stuck jobs and the print queue.' },
      { label: 'Windows Search Problems', href: '/windows-search-not-working', description: 'Troubleshoot Start-menu search, missing files and indexing.' },
      { label: 'Laptop Touchpad Not Working', href: '/windows-touchpad-not-working', description: 'Check touchpad settings, device detection and drivers.' },
      { label: 'Keyboard and Mouse Problems', href: '/windows-keyboard-mouse-not-working', description: 'Isolate USB, wireless, Bluetooth and input-setting failures.' },
    ],
  },
  {
    label: 'Reviews', href: '/reviews', description: 'Evidence-led product testing and technology comparisons.',
    links: [
      
      { label: 'SSD Reviews', href: '/reviews/ssds' },
      { label: 'GPU Reviews', href: '/reviews/gpus' },
      { label: 'Laptop Reviews', href: '/reviews/laptops' },
      { label: 'CPU Reviews', href: '/reviews/cpus' },
    ],
  },
  {
    label: 'Buying Guides', href: '/best', description: 'Buying guides built around real use cases and transparent criteria.',
    links: [
      
      { label: 'Best SSDs', href: '/best-ssds' },
      { label: 'Best Gaming Laptops', href: '/best-gaming-laptops' },
      { label: 'Best Gaming Monitors', href: '/best-gaming-monitors' },
      { label: 'Best RAM', href: '/best-ram' },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    description: 'Original technical studies, diagnostic analysis and evidence-led investigations.',
    links: [
      
      { label: 'SSD Nearly Full', href: '/research/ssd-nearly-full-what-really-changes' },
      { label: '100% Disk, Low MB/s', href: '/research/windows-100-percent-disk-usage-low-mbps' },
      { label: 'PC Game Stuttering', href: '/research/what-actually-causes-pc-game-stuttering' },
      { label: 'More RAM', href: '/research/does-more-ram-make-windows-faster' },
      { label: 'SSD Temperature', href: '/research/how-ssd-temperature-affects-performance' },
      { label: 'RAM/SSD Upgrade Timing', href: '/research/upgrade-ram-ssd-now-or-wait', description: 'Measure the bottleneck and compare dated market evidence before buying.' },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    description: 'Useful interactive tools with transparent assumptions.',
    links: [
      
      ...tools.map(tool => ({ label: tool.title, href: tool.path, description: tool.menuDescription })),
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
      
      { label: 'Windows and Surface Event', href: '/microsoft-windows-surface-event-october-7-what-to-watch', description: 'What is confirmed and what to watch.' },
    ],
  },
  {
    label: 'Windows',
    href: '/windows',
    description: 'Fixes, settings, updates and practical Windows help.',
    links: [
      
      { label: 'Universal Windows Troubleshooting', href: '/windows-troubleshooting-complete-guide', description: 'Start with the symptom and diagnose Windows problems systematically.' },
      { label: 'Windows 11 26H2 Installation Guide', href: '/windows-11-26h2-installation-guide', description: 'Choose an upgrade or clean-install path and troubleshoot setup safely.' },
      { label: 'Windows Update Stuck', href: '/windows/windows-update-stuck', description: 'How long to wait, how to test activity, and the safest repair order.' },
      { label: 'Patch Tuesday', href: '/windows-patch-tuesday', description: 'Monthly Windows security updates, known issues and practical next steps.' },
      { label: 'Windows Internet Troubleshooting', href: '/windows-11-wifi-connected-no-internet', description: 'Diagnose Wi-Fi, Ethernet, IP, DNS, VPN, and adapter failures.' },
      { label: 'DNS Problems', href: '/windows-11-dns-not-working-how-to-fix', description: 'Tell DNS failures apart from wider outages.' },
      { label: 'Network Reset', href: '/windows-11-network-adapter-reset-guide', description: 'Know when a Windows network reset is appropriate.' },
      { label: 'Bluetooth Problems', href: '/windows-11-bluetooth-not-working', description: 'Diagnose missing Bluetooth controls, pairing failures and drops.' },
      { label: 'No Sound or Headphones', href: '/windows-11-no-sound-speakers-headphones', description: 'Check Windows audio routing, speakers and microphone input.' },
      { label: 'Webcam Not Working', href: '/windows-11-camera-not-working', description: 'Troubleshoot camera privacy, black preview and device detection.' },
      { label: 'Second Monitor Not Detected', href: '/windows-second-monitor-not-detected', description: 'Isolate display signal, cable, port and dock issues.' },
      { label: 'File Explorer Freezing', href: '/windows-file-explorer-not-responding', description: 'Find out whether a folder, resource or Windows component is hanging.' },
      { label: 'Printer Offline', href: '/windows-printer-offline-queue-stuck', description: 'Check printer connectivity, stuck jobs and the print queue.' },
      { label: 'Windows Search Problems', href: '/windows-search-not-working', description: 'Troubleshoot Start-menu search, missing files and indexing.' },
      { label: 'Laptop Touchpad Not Working', href: '/windows-touchpad-not-working', description: 'Check touchpad settings, device detection and drivers.' },
      { label: 'Keyboard and Mouse Problems', href: '/windows-keyboard-mouse-not-working', description: 'Isolate USB, wireless, Bluetooth and input-setting failures.' },
      { label: 'BSOD Code Lookup', href: '/tools/bsod-error-code-lookup', description: 'Look up a blue screen stop code.' },
      { label: 'Guides', href: '/guides', description: 'Evergreen troubleshooting.' },
    ],
  },
  {
    label: 'Gaming',
    href: '/gaming',
    description: 'Performance, frame-time, stability and gaming hardware.',
    links: [
      
      { label: 'Complete Gaming Troubleshooting Guide', href: '/pc-gaming-performance-complete-guide', description: 'Start with the symptom and diagnose low FPS, stutter, crashes, thermals and bottlenecks.' },
      { label: 'Frame-Time Stutter', href: '/pc-game-stuttering-fix-frame-time', description: 'Diagnose uneven frame delivery.' },
      { label: 'GPU Frame-Time Spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Separate GPU workload from other causes.' },
      { label: 'Shader Stutter', href: '/shader-compilation-stutter-pc-games', description: 'Recognize shader compilation behavior.' },
      { label: 'Low FPS', href: '/pc-game-low-fps-how-to-find-the-cause', description: 'Separate sustained low frame rates from intermittent hitches.' },
      { label: 'GPU at 100% Usage', href: '/gpu-100-percent-usage-gaming', description: 'Learn when full GPU utilization is expected and what to test if performance is poor.' },
      { label: 'Games Crashing to Desktop', href: '/pc-games-crashing-to-desktop-troubleshooting', description: 'Diagnose game exits and freezes before reinstalling.' },
      { label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer', description: 'Compare captures and inspect uneven frame delivery locally.' },
      { label: 'Hardware', href: '/hardware', description: 'Components that affect gaming.' },
    ],
  },
  {
    label: 'Hardware',
    href: '/hardware',
    description: 'PC parts, laptops, storage, cooling and displays.',
    links: [
      
      { label: 'Complete Hardware Troubleshooting Guide', href: '/pc-hardware-troubleshooting-complete-guide', description: 'Diagnose power, display, memory, storage and thermal problems before replacing parts.' },
      { label: 'SSD Health', href: '/how-to-check-ssd-health-windows', description: 'Understand SMART and endurance data.' },
      { label: 'NVMe Temperatures', href: '/nvme-ssd-temperature-too-high', description: 'Interpret SSD heat and performance together.' },
      { label: 'SSD Slowdowns', href: '/why-ssd-is-slowing-down-windows', description: 'Diagnose storage performance changes.' },
      { label: 'RAM Testing', href: '/how-to-check-ram-for-errors-windows', description: 'Test memory for errors.' },
      { label: 'Blue Screens', href: '/windows-11-blue-screen-stop-code-how-to-read', description: 'Read stop codes and find the cause.' },
      { label: 'Random Freezes', href: '/windows-11-freezing-randomly-causes-fix', description: 'Classify freezes and find the cause.' },
      { label: 'Repair Bench Gallery', href: '/gallery', description: 'Real photos of dust, thermal paste and hardware repairs.' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    description: 'Evergreen answers for real technology problems.',
    links: [
      
      { label: 'Windows', href: '/windows' },
      { label: 'Gaming', href: '/gaming' },
      { label: 'Hardware', href: '/hardware' },
      { label: 'BIOS / UEFI Recovery Guide', href: '/bios-uefi-recovery-guide', description: 'Safely diagnose failed firmware updates and choose a model-specific recovery path.' },
      { label: 'BitLocker Recovery After BIOS Update', href: '/why-windows-asks-for-a-bitlocker-recovery-key-after-bios-update', description: 'Find the recovery key and resolve firmware-triggered prompts without risking encrypted data.' },
      { label: 'Laptop Battery Health & Safety', href: '/laptop-battery-warning-signs', description: 'Check battery health, troubleshoot fast drain, and recognize urgent battery warning signs.' },
      { label: 'Wi-Fi Keeps Disconnecting', href: '/windows-11-wifi-keeps-disconnecting', description: 'Separate device, signal and router problems before resetting the network.' },
      { label: 'Black Screen After Login', href: '/windows-11-black-screen-after-login', description: 'Recover a black desktop by checking display output, the shell and drivers.' },
      { label: 'Laptop Plugged In but Not Charging', href: '/laptop-plugged-in-not-charging', description: 'Check power delivery, charge limits and battery safety before replacing parts.' },
      { label: 'PC Turns On but Has No Display', href: '/pc-turns-on-but-no-display', description: 'Separate monitor issues from failed POST and hardware initialization.' },
      { label: 'SSD Not Detected', href: '/ssd-not-detected-in-bios-or-windows', description: 'Distinguish firmware detection from Windows mounting without risking data.' },
      { label: 'USB Device Not Recognized', href: '/windows-11-usb-device-not-recognized', description: 'Isolate the device, cable, port, power path and Windows driver.' },
      { label: 'Bluetooth Problems', href: '/windows-11-bluetooth-not-working', description: 'Diagnose missing Bluetooth controls, pairing failures and drops.' },
      { label: 'No Sound or Headphones', href: '/windows-11-no-sound-speakers-headphones', description: 'Check Windows audio routing, speakers and microphone input.' },
      { label: 'Webcam Not Working', href: '/windows-11-camera-not-working', description: 'Troubleshoot camera privacy, black preview and device detection.' },
      { label: 'Second Monitor Not Detected', href: '/windows-second-monitor-not-detected', description: 'Isolate display signal, cable, port and dock issues.' },
      { label: 'File Explorer Freezing', href: '/windows-file-explorer-not-responding', description: 'Find out whether a folder, resource or Windows component is hanging.' },
      { label: 'Printer Offline', href: '/windows-printer-offline-queue-stuck', description: 'Check printer connectivity, stuck jobs and the print queue.' },
      { label: 'Windows Search Problems', href: '/windows-search-not-working', description: 'Troubleshoot Start-menu search, missing files and indexing.' },
      { label: 'Laptop Touchpad Not Working', href: '/windows-touchpad-not-working', description: 'Check touchpad settings, device detection and drivers.' },
      { label: 'Keyboard and Mouse Problems', href: '/windows-keyboard-mouse-not-working', description: 'Isolate USB, wireless, Bluetooth and input-setting failures.' },
    ],
  },
  {
    label: 'Reviews', href: '/reviews', description: 'Evidence-led product testing and technology comparisons.',
    links: [
      
      { label: 'SSD Reviews', href: '/reviews/ssds' },
      { label: 'GPU Reviews', href: '/reviews/gpus' },
      { label: 'Laptop Reviews', href: '/reviews/laptops' },
      { label: 'CPU Reviews', href: '/reviews/cpus' },
    ],
  },
  {
    label: 'Buying Guides', href: '/best', description: 'Buying guides built around real use cases and transparent criteria.',
    links: [
      
      { label: 'Best SSDs', href: '/best-ssds' },
      { label: 'Best Gaming Laptops', href: '/best-gaming-laptops' },
      { label: 'Best Gaming Monitors', href: '/best-gaming-monitors' },
      { label: 'Best RAM', href: '/best-ram' },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    description: 'Original technical studies, diagnostic analysis and evidence-led investigations.',
    links: [
      
      { label: 'SSD Nearly Full', href: '/research/ssd-nearly-full-what-really-changes' },
      { label: '100% Disk, Low MB/s', href: '/research/windows-100-percent-disk-usage-low-mbps' },
      { label: 'PC Game Stuttering', href: '/research/what-actually-causes-pc-game-stuttering' },
      { label: 'More RAM', href: '/research/does-more-ram-make-windows-faster' },
      { label: 'SSD Temperature', href: '/research/how-ssd-temperature-affects-performance' },
      { label: 'RAM/SSD Upgrade Timing', href: '/research/upgrade-ram-ssd-now-or-wait', description: 'Measure the bottleneck and compare dated market evidence before buying.' },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    description: 'Useful interactive tools with transparent assumptions.',
    links: [
      
      ...tools.map(tool => ({ label: tool.title, href: tool.path, description: tool.menuDescription })),
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
