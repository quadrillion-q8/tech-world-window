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
    title: 'Windows Says Connected but No Internet: Complete Troubleshooting Guide',
    dek: 'A universal Windows troubleshooting path for Wi-Fi and Ethernet problems—from router, IP and DNS checks to VPNs, drivers and the final network reset.',
    excerpt: 'When Windows says you are connected but websites will not load, the connection is usually failing at a specific layer. This guide shows you how to identify that layer before changing settings blindly.',
    category: 'Windows',
    subcategory: 'Troubleshooting',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-04',
    updatedAt: '2026-10-06',
    readingTime: 12,
    tags: ['Windows 11', 'Windows 10', 'Wi-Fi', 'Ethernet', 'Internet', 'DNS', 'Troubleshooting'],
    relatedArticles: ['windows-dns-not-working', 'windows-network-reset'],
    contentRole: 'cluster',
    pillarPath: '/windows',
    searchIntent: 'informational',
    featured: true,
    content: [
      {
        heading: 'First: identify which part of the connection is broken',
        paragraphs: [
          '“Connected” does not necessarily mean that every part of the path to the Internet is working. Your PC can have a working Wi-Fi or Ethernet link while DHCP, the default gateway, DNS, a VPN, a proxy, the browser, the router, or the ISP is failing.',
          'The fastest diagnosis is to change one variable at a time and test again. Start by asking whether the problem affects every device on the same network, only this Windows PC, or only one browser or application.'
        ],
        bullets: [
          'Every device is offline: investigate the router, modem, ISP, or upstream service first.',
          'Only this Windows PC is offline: continue with the Windows and adapter checks below.',
          'Only one browser or app is affected: test another browser or app before changing the network configuration.',
          'Wi-Fi fails but Ethernet works, or Ethernet fails but Wi-Fi works: the working connection is a useful control test and points toward the affected adapter or link.'
        ]
      },
      {
        heading: 'Check the simple causes before using commands',
        paragraphs: [
          'Confirm that the PC is connected to the intended network and that Airplane mode is off. If the connection is Wi-Fi, move closer to the access point or test another available band when practical. If it is Ethernet, reseat the cable and try another known-good cable or router port if available.',
          'If other devices also cannot reach the Internet, restart the modem/router according to the manufacturer’s procedure. If other devices work normally, do not assume the router needs to be reset.'
        ],
        bullets: [
          'Open a second website to rule out a single-site outage.',
          'Try a second browser if the problem appears browser-specific.',
          'Temporarily disconnect a VPN for a controlled test.',
          'Check Settings > Network & internet > Proxy for an unexpected manual proxy.',
          'Check the Windows date and time because incorrect system time can cause some secure websites and services to fail.',
          'On public, hotel, airport, school, or café networks, open a normal web page and look for a captive-portal sign-in page.'
        ]
      },
      {
        heading: 'Use the Windows diagnostic tools first',
        paragraphs: [
          'On current Windows 11 installations, Microsoft recommends using the automated network troubleshooting experience in the Get Help app. It can identify common configuration problems before you start changing the network stack manually.',
          'Treat automated troubleshooting as a diagnostic aid, not proof that the underlying hardware is healthy. If the issue remains, continue with the tests below.'
        ]
      },
      {
        heading: 'Check the IP address and default gateway',
        paragraphs: [
          'Open Command Prompt and run ipconfig /all. Find the adapter you are actually using and inspect its IPv4 address, Default Gateway, and DNS Servers. The exact values vary by network, so the goal is to recognize an abnormal pattern rather than match a single number.',
          'An address beginning with 169.254.x.x is a strong clue that Windows did not receive a normal IPv4 address from DHCP. On a typical home or office network, that moves the investigation toward the router, DHCP service, cable/Wi-Fi link, or adapter rather than toward DNS.'
        ],
        bullets: [
          'No Default Gateway: the PC may not have a usable route beyond the local network.',
          '169.254.x.x IPv4 address: investigate DHCP/network configuration.',
          'Normal local IP and gateway: continue to the gateway and DNS tests.',
          'A static IP, corporate network, VPN, or managed environment may intentionally use different addressing, so do not overwrite a working configuration just because it differs from a home router.'
        ]
      },
      {
        heading: 'Test the path in layers: gateway, Internet, then DNS',
        paragraphs: [
          'The most useful troubleshooting habit is to test progressively farther from the PC. First find the Default Gateway with ipconfig, then test it with ping. A successful gateway test shows that the PC can reach the local router; it does not prove that the ISP or Internet is working.',
          'Next, test name resolution with nslookup. For example, run nslookup example.com. If the DNS lookup fails while local connectivity is healthy, investigate DNS rather than repeatedly resetting Wi-Fi.',
          'A public-IP ping can sometimes provide another comparison, but ping is not a universal Internet test because some networks and servers block ICMP. Treat a failed public-IP ping as a clue, not a verdict.'
        ],
        bullets: [
          'Gateway ping fails: focus on the local connection, adapter, Wi-Fi link, Ethernet cable, router, or local firewall configuration.',
          'Gateway works but DNS lookups fail: investigate DNS configuration, DNS reachability, VPN/filtering software, or the DNS service.',
          'DNS works but one website fails: the issue may be specific to that site, browser, account, certificate, extension, or service.',
          'Another device works on the same network while this PC fails: keep the investigation focused on this PC rather than resetting the whole network.'
        ]
      },
      {
        heading: 'When DNS is the likely problem',
        paragraphs: [
          'DNS translates names such as example.com into addresses used for network communication. A PC can therefore appear connected while ordinary website names fail to resolve.',
          'Run nslookup example.com and compare the result with another working device on the same network if possible. If name resolution fails, check the configured DNS servers and consider whether a VPN, security product, custom DNS configuration, or network policy is intercepting DNS traffic.',
          'ipconfig /flushdns clears the Windows DNS client resolver cache. It is a targeted troubleshooting step, not a universal repair command; flushing a cache will not fix a broken router, ISP connection, or adapter.'
        ]
      },
      {
        heading: 'Check VPNs, proxies, security software, and managed networks',
        paragraphs: [
          'Third-party network software can change how Windows routes or filters traffic. VPN clients, proxy settings, endpoint security, firewall products, virtual switches, and other network filters can create symptoms that look like ordinary Wi-Fi failure.',
          'If the problem disappears when a VPN or proxy is disconnected, do not immediately reset Windows networking. Identify which software or policy changed the traffic path and investigate that component instead.',
          'On work or school computers, avoid changing DNS, proxy, firewall, VPN, or static-IP settings without checking the organization’s requirements.'
        ]
      },
      {
        heading: 'When to investigate the network adapter or driver',
        paragraphs: [
          'If this PC fails across multiple known-good networks, the problem is less likely to be the original router or ISP. Check Device Manager > Network adapters for warnings, confirm that the correct adapter is enabled, install pending Windows updates, and compare the installed driver with the PC or adapter manufacturer’s support page.',
          'If the problem began immediately after a Windows or driver update, record that timing. A rollback or manufacturer-provided driver may be appropriate, but avoid downloading driver packages from unknown third-party sites.'
        ]
      },
      {
        heading: 'Use the Windows network reset only after diagnosis',
        paragraphs: [
          'Network reset is a recovery step, not the first diagnostic step. Microsoft notes that it removes installed network adapters and resets their settings before reinstalling the adapters after restart. That can help with persistent configuration problems, but it can also affect VPN clients, virtual switches, and other custom networking software.',
          'Before using it, record any static IP, custom DNS, VPN, proxy, virtual-machine networking, or other special configuration that you may need to recreate.'
        ],
        bullets: [
          'Windows 11: Settings > Network & internet > Advanced network settings > Network reset.',
          'Use Reset now only after simpler checks have failed and you understand what configuration may be lost.',
          'After the restart, reconnect to your network and retest before making several additional changes.'
        ]
      },
      {
        heading: 'A compact diagnosis map',
        paragraphs: [
          'You do not need to run every possible command. Stop when the evidence points to a specific layer and fix that layer first.'
        ],
        bullets: [
          'All devices fail → router/modem/ISP or upstream service.',
          'Only this PC fails on one network → local Windows configuration or network adapter.',
          'This PC fails on several known-good networks → adapter, driver, VPN/security software, or Windows networking.',
          'Gateway unreachable → local link, adapter, cable/Wi-Fi, or router path.',
          'Gateway reachable but DNS fails → DNS configuration or DNS path.',
          'DNS works but a single site fails → site/browser/application-specific issue.',
          'VPN off fixes the problem → VPN, routing, or filter configuration.',
          'A recent driver/update coincides with failure → investigate the update or driver before performing broad resets.'
        ]
      },
      {
        heading: 'If nothing above works',
        paragraphs: [
          'At this point, collect evidence instead of repeating resets: the output of ipconfig /all, the gateway ping result, an nslookup result for a failing domain, the affected adapter and driver version, whether another network works, and when the problem started.',
          'That information makes the next step much more precise. For persistent failures across multiple networks, hardware or deeper Windows networking problems become more plausible and may require manufacturer support or a technician rather than another generic “Wi-Fi fix.”'
        ]
      }
    ],
    faq: [
      {
        question: 'Why does Windows say connected but there is no Internet?',
        answer: 'Windows may have a working local Wi-Fi or Ethernet connection while the route to the Internet, DNS resolution, VPN, proxy, browser, router, or ISP path is failing.'
      },
      {
        question: 'How do I know whether the problem is DNS?',
        answer: 'If the PC can reach the local gateway but domain-name lookups fail with nslookup, DNS becomes a strong suspect. Test DNS before changing unrelated adapter settings.'
      },
      {
        question: 'What does a 169.254.x.x address mean in Windows?',
        answer: 'On a typical DHCP-based network, a 169.254.x.x IPv4 address indicates that Windows did not obtain a normal IPv4 address from the network. Investigate DHCP and the local network path.'
      },
      {
        question: 'Should I use Windows Network Reset first?',
        answer: 'No. Network Reset is a later recovery step because it removes and reinstalls network adapters and resets their settings. Diagnose the failure first and record custom networking settings before using it.'
      },
      {
        question: 'Why does Wi-Fi work on my phone but not on my Windows PC?',
        answer: 'That usually shifts the investigation toward the Windows PC: its adapter, IP configuration, DNS, VPN or proxy, driver, security software, or Windows networking stack.'
      },
      {
        question: 'Can a VPN cause connected but no Internet?',
        answer: 'Yes. A VPN can change routing and filtering behavior. Disconnecting it temporarily is a useful controlled test, especially if other devices on the same network work normally.'
      },
      {
        question: 'What if only one website does not open?',
        answer: 'Do not assume the whole Internet connection is broken. Test other sites, another browser, and DNS resolution. The failure may be specific to the website, browser, extension, certificate, or service.'
      },
      {
        question: 'Does flushing DNS always fix Internet problems?',
        answer: 'No. ipconfig /flushdns clears the Windows DNS resolver cache. It can help with some cached DNS problems, but it cannot repair a broken router, ISP connection, Wi-Fi adapter, cable, or unrelated network failure.'
      }
    ],
    testing: 'This guide follows Microsoft’s current Windows connectivity guidance and separates local-link, IP/DHCP, gateway, DNS, application, adapter, and reset stages. Command results should be interpreted as diagnostic evidence rather than treated as universal pass/fail tests.',
    sources: [
      { label: 'Microsoft Support: Fix Wi-Fi connection issues in Windows', url: 'https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows' },
      { label: 'Microsoft Support: Fix Ethernet connection problems in Windows', url: 'https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-ethernet-connection-problems-in-windows' },
      { label: 'Microsoft Learn: Troubleshooting DNS clients', url: 'https://learn.microsoft.com/windows-server/networking/dns/troubleshoot/troubleshoot-dns-client' },
      { label: 'Microsoft Learn: netsh winsock', url: 'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-winsock' }
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
    relatedArticles: ['nvme-temperature', 'ssd-slowing-down'],
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
