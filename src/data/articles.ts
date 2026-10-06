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
    id: 'windows-troubleshooting-universal',
    slug: 'windows-troubleshooting-complete-guide',
    title: 'Windows Troubleshooting: A Complete Guide to Diagnosing and Fixing Windows Problems',
    dek: 'A universal, evidence-led Windows troubleshooting framework for startup failures, freezes, crashes, blue screens, slow performance, updates, drivers, networking, applications, and hardware-related symptoms.',
    excerpt: 'Start with the symptom, isolate the failing layer, run the least destructive test, apply the smallest appropriate fix, and verify the result before moving deeper.',
    category: 'Windows',
    subcategory: 'Troubleshooting',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-06',
    readingTime: 18,
    tags: ['Windows Troubleshooting', 'Windows 11', 'Windows Problems', 'PC Troubleshooting', 'Windows Repair', 'Safe Mode'],
    relatedArticles: ['windows-wifi-diagnosis', 'windows-dns-not-working', 'windows-network-reset', 'gaming-stutter'],
    contentRole: 'pillar',
    pillarPath: '/windows',
    searchIntent: 'informational',
    featured: true,
    content: [
      { heading: 'Start here: identify the symptom before choosing a fix', paragraphs: [
        'Windows problems often look alike. A frozen desktop can be caused by an application, a driver, memory pressure, storage trouble, overheating, or a deeper system problem. A PC that will not start may have a power or hardware fault before Windows is involved. The safest troubleshooting process therefore begins with the exact symptom rather than a favorite repair command.',
        'Use this guide as a diagnostic map. Find the closest symptom, run the simplest test that can separate competing causes, record what changed, and only then move to a repair. The objective is not to perform the largest number of fixes; it is to reduce uncertainty with every step.'
      ], bullets: [
        'PC has no power at all → investigate power and hardware before Windows.',
        'PC powers on but Windows does not load → investigate boot and recovery paths.',
        'Windows loads but freezes or crashes → isolate drivers, software, resources, thermals, and hardware.',
        'Windows is slow → identify whether CPU, memory, storage, startup software, thermals, or background activity is limiting the system.',
        'Only one application fails → troubleshoot the application before repairing all of Windows.',
        'Only one network fails → investigate that connection; if every device is offline, investigate the network path outside Windows first.'
      ] },
      { heading: 'Before changing anything: preserve evidence', paragraphs: [
        'Write down when the problem started and what changed immediately beforehand. A Windows update, graphics or network driver, new application, peripheral, storage upgrade, BIOS change, or security event can be more informative than a long list of generic fixes.',
        'For recurring problems, reproduce the same action if possible. Record the Windows version, affected application, exact error or stop code, and whether the problem occurs after a cold start, after sleep, or only after the computer has been running for a while.',
        'If important files are at risk, protect the data before performing invasive repairs. A troubleshooting procedure is not successful if it makes an existing storage or recovery problem harder to recover from.'
      ], bullets: [
        'Change one meaningful variable at a time.',
        'Prefer reversible tests before destructive actions.',
        'Capture exact error messages instead of paraphrasing them.',
        'Back up important data before resets, reinstalls, partition changes, or other invasive operations.'
      ] },
      { heading: 'Is Windows actually the problem?', paragraphs: [
        'A computer can appear to have a Windows problem when the underlying issue is hardware, firmware, power, cooling, or a peripheral. If the machine loses power, fails before Windows loads, shows instability in firmware, or reproduces the same failure across different operating-system environments, move hardware investigation higher on the list.',
        'Conversely, if Safe Mode works normally, a clean boot removes the problem, or the failure began immediately after a driver or software change, the normal Windows environment becomes a stronger suspect. These tests do not prove the exact cause; they narrow the search.'
      ], bullets: [
        'Problem exists before Windows begins loading → prioritize power, firmware, storage, memory, display, and other hardware paths.',
        'Problem disappears in Safe Mode → investigate third-party drivers, services, and startup software.',
        'Problem affects one application only → investigate that application and its dependencies.',
        'Problem affects several unrelated applications → investigate Windows, drivers, memory, storage, thermals, and system stability.',
        'Problem appears on multiple operating systems or boot environments → investigate shared hardware more aggressively.'
      ] },
      { heading: 'When the PC will not turn on', paragraphs: [
        'If there are no lights, fans, display signals, or other signs of power, do not begin with Windows repair commands. Windows cannot repair a machine that is not reaching the stage where Windows can execute.',
        'For a desktop, check the external power path, power switch, power connections, and recently changed hardware. For a laptop, check the charger, charging indicators, docking equipment, and whether the behavior changes with external peripherals disconnected. If the system powers on but immediately shuts down, treat that as a different symptom and investigate power, thermal, memory, or board-level causes.'
      ], bullets: [
        'Disconnect non-essential USB and external devices and retest.',
        'Check whether the machine shows any power or charging indication.',
        'Do not repeatedly force power cycles if the system is showing signs of overheating or electrical instability.',
        'If there is still no meaningful response, move to hardware diagnosis rather than reinstalling Windows.'
      ] },
      { heading: 'When Windows will not start or is stuck in a boot loop', paragraphs: [
        'Separate a boot failure from a no-power failure. If the Windows logo appears and the system repeatedly restarts, hangs, or enters recovery, the Windows boot and recovery path is now relevant.',
        'Use Windows Recovery Environment when it is available. Start with the least destructive recovery option that matches the evidence, such as Startup Repair or uninstalling a recently problematic update. System Restore can be appropriate when a usable restore point exists and the timeline points to a recent configuration or software change.',
        'If recovery tools repeatedly fail, do not immediately format the drive. First consider whether the storage device, file system, memory, or another hardware component could be causing repeated corruption.'
      ], bullets: [
        'Record any recovery or stop-code message before restarting.',
        'Try Startup Repair when the symptom is a Windows boot failure.',
        'Consider System Restore when the problem follows a recent change and a suitable restore point exists.',
