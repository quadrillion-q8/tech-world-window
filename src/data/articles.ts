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
    relatedArticles: ['windows-wifi-diagnosis', 'windows-dns-not-working', 'windows-network-reset'],
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
        'Uninstall a recent quality or feature update from recovery if the loop began right after it.',
        'Stop and test storage and memory if recovery tools fail repeatedly or report disk errors.'
      ] },
      { heading: 'Blue screens and stop codes', paragraphs: [
        'A blue screen is Windows stopping deliberately because it detected a condition it cannot safely continue from. The stop code and any named file or driver are the most valuable clues, so photograph or write them down before the machine restarts.',
        'Treat the first blue screen after a change differently from repeated blue screens with different codes. A consistent code that names the same driver points toward software. Different codes each time, especially alongside random freezes or application crashes, point toward memory, storage, power, or thermal instability.'
      ], bullets: [
        'Note the stop code, the time, and what you were doing.',
        'Roll back or update the driver that was changed most recently.',
        'Disconnect newly added hardware and retest.',
        'Run a memory test if the codes vary or the system is unstable under load.',
        'Check storage health and temperatures before assuming Windows needs reinstalling.'
      ] },
      { heading: 'Black screen, no display, or display glitches', paragraphs: [
        'First decide whether the computer is running but the display is not. Sounds, keyboard lights, or drive activity suggest the system is alive. Test another cable, port, or monitor, and on a desktop make sure the display cable is connected to the graphics card rather than the motherboard output.',
        'If the display works in firmware or recovery screens but not in Windows, a graphics driver or display setting is more likely. If it fails everywhere, including before Windows, investigate the display path and graphics hardware.'
      ], bullets: [
        'Try a different cable, port, and display before changing software.',
        'Test whether the BIOS or firmware screen appears.',
        'Boot to Safe Mode and remove or roll back the graphics driver if the problem only exists in normal Windows.',
        'Reset refresh rate or resolution if the screen went blank immediately after changing it.'
      ] },
      { heading: 'Freezing and unresponsive Windows', paragraphs: [
        'Separate a single application not responding from the whole system freezing. If the mouse still moves and other programs work, close or repair that application. If the whole system stops responding, the cause is more likely a driver, storage stall, memory problem, or overheating.',
        'Look at the pattern. Freezes under heavy load suggest thermals or power. Freezes after waking from sleep suggest drivers or power settings. Freezes accompanied by drive activity that stays pinned suggest a storage or background-task problem.'
      ], bullets: [
        'Open Task Manager and note which resource is saturated when the system stalls.',
        'Check temperatures if freezing happens under load.',
        'Review Reliability Monitor and Event Viewer for errors near the freeze time.',
        'Test with non-essential startup software and external devices removed.'
      ] },
      { heading: 'Slow Windows and resource saturation', paragraphs: [
        'Slowness is a symptom, not a cause. Use Task Manager to see whether CPU, memory, disk, or network is the limiting resource at the moment the system feels slow. A machine with memory constantly near full will page heavily, which feels like a storage problem even when the drive is fine.',
        'Address the measured bottleneck. Do not install registry cleaners or boost utilities; they rarely help and can introduce new problems.'
      ], bullets: [
        'High memory use → review startup apps and browser tabs, then consider whether the system needs more RAM.',
        'High disk use with an old hard drive → expect slow behavior and consider an SSD.',
        'High CPU with no obvious application → check for background updates, scans, and thermal throttling.',
        'Slow only after long uptime → look for a leaking application or driver and restart to confirm.'
      ] },
      { heading: 'One application keeps failing', paragraphs: [
        'If only one program misbehaves, keep the investigation scoped to it. Update the application, check whether it needs a runtime or component it relies on, and try running it after a clean restart.',
        'Repair or reinstall the application before repairing Windows. If several unrelated applications fail in similar ways, widen the investigation to Windows components, drivers, memory, or storage.'
      ], bullets: [
        'Record the exact error message and the action that triggers it.',
        'Update the application and any required runtime.',
        'Use the application repair option if one exists, then reinstall if needed.',
        'Test with a new Windows user profile to rule out profile corruption.'
      ] },
      { heading: 'Windows Update problems', paragraphs: [
        'Update failures are usually caused by insufficient disk space, interrupted downloads, conflicting software, or damaged update components. Note the error code and whether the failure happens during download, install, or after restart.',
        'Start with the built-in update troubleshooter and make sure there is adequate free space and a stable connection. If an update causes problems after installing, the update history lets you uninstall the most recent quality update when the timeline fits.'
      ], bullets: [
        'Free disk space and restart before retrying.',
        'Disconnect non-essential peripherals during a feature update.',
        'Check the update history for the error code and search that exact code.',
        'Use system file repair tools if updates fail repeatedly with corruption-style errors.'
      ] },
      { heading: 'Network problems', paragraphs: [
        'Decide whether the problem is the device, the network, or the internet service. If every device is offline, the cause is outside Windows. If only this computer is affected, compare wired and wireless behavior, check whether you can reach an IP address but not a name, and then follow the narrower guide that matches the symptom.',
        'Use the specialist guides rather than repeating the same resets: start with the connected-but-no-internet diagnosis, then DNS, and use a network reset only when targeted checks point to a corrupted Windows network stack.'
      ], bullets: [
        'Test another device on the same network.',
        'Compare Wi-Fi with a wired connection if possible.',
        'Check whether pages fail only by name, which suggests DNS.',
        'Keep network reset for later, because it removes saved networks and adapter settings.'
      ] },
      { heading: 'Sound, Bluetooth, USB, and input devices', paragraphs: [
        'Check the physical and selection layer first: cable, port, the selected output device, mute and volume states, and whether the device works on another computer. Then check the driver and Windows privacy or permission settings for the device.',
        'For USB and Bluetooth, test another port or adapter and remove the device pairing before pairing again. Intermittent USB problems can also be power related, especially with unpowered hubs.'
      ], bullets: [
        'Test the device on another computer.',
        'Try a different port, cable, or direct connection instead of a hub.',
        'Remove and re-pair a Bluetooth device.',
        'Reinstall or roll back the device driver if the problem began after an update.'
      ] },
      { heading: 'Safe Mode and Clean Boot', paragraphs: [
        'Safe Mode starts Windows with a minimal set of drivers and services. It is useful for deciding whether the normal environment is involved, and for removing a problematic driver or update.',
        'A clean boot disables non-Microsoft startup items and services so you can find whether third-party software conflicts with Windows. Re-enable items in small groups until the problem returns. Return the system to normal startup when finished.'
      ], bullets: [
        'Problem gone in Safe Mode → suspect drivers, services, or startup software.',
        'Problem gone in a clean boot → re-enable items in halves to find the conflict.',
        'Problem remains in both → suspect Windows files, hardware, or firmware.'
      ] },
      { heading: 'System file repair: SFC and DISM', paragraphs: [
        'System File Checker scans protected Windows files and replaces damaged ones from the local component store. DISM can repair the component store itself. Run them from an elevated Command Prompt or Terminal.',
        'A typical order is DISM with the RestoreHealth option first, then sfc /scannow. These tools address file corruption; they do not fix hardware faults, failing drives, or bad drivers, so a clean result does not rule those out.'
      ], bullets: [
        'DISM /Online /Cleanup-Image /RestoreHealth repairs the component store.',
        'sfc /scannow checks and repairs protected system files.',
        'Restart after repairs and retest the original symptom.',
        'If corruption returns repeatedly, test the storage device and memory.'
      ] },
      { heading: 'Recovery options and how destructive they are', paragraphs: [
        'Recovery options range from gentle to destructive. Choose the lowest level that matches the evidence, and only move up when the lower level fails.'
      ], bullets: [
        'Restart and Safe Mode → no data change.',
        'Uninstall a recent update or driver → small, reversible change.',
        'System Restore → reverts system files and settings, not personal files.',
        'Reset this PC with Keep my files → reinstalls Windows and removes apps and settings.',
        'Reset this PC with Remove everything, or a clean install → erases the drive; back up first.'
      ] },
      { heading: 'Storage, memory, thermals, and power', paragraphs: [
        'Many Windows symptoms are the visible effect of a hardware limit. A failing drive can cause freezes and corruption. Faulty memory can cause random crashes. Dust, a failed fan, or dried thermal paste can cause throttling and shutdowns. An inadequate or failing power supply can cause restarts under load.',
        'Check drive health with SMART-aware tools, run a memory test if crashes vary, watch temperatures during load, and clean dust from vents and fans. Persistent faults after these checks justify professional hardware diagnosis.'
      ], bullets: [
        'Storage: check drive health and back up before heavy repair.',
        'Memory: run a memory test and reseat modules if crashes are random.',
        'Thermals: monitor temperatures under load and clean fans and vents.',
        'Power: suspect the supply or charger when shutdowns occur under load.'
      ] },
      { heading: 'A universal decision tree', paragraphs: [
        'When the symptom is unclear, move through the layers in order and stop as soon as a test explains the behavior.'
      ], bullets: [
        '1. Does the machine power on and reach firmware? If not → power and hardware.',
        '2. Does Windows start? If not → boot, recovery, storage.',
        '3. Does Safe Mode behave normally? If yes → drivers, services, startup software.',
        '4. Is only one application affected? If yes → repair or reinstall that application.',
        '5. Do several unrelated programs fail? → system files, memory, storage, thermals.',
        '6. Does the problem exist outside Windows? → hardware.'
      ] },
      { heading: 'Troubleshooting practices to avoid', paragraphs: [
        'Some popular fixes cause more harm than they prevent. Avoid anything that removes your ability to recover or hides the real cause.'
      ], bullets: [
        'Do not run registry cleaners or system boosters.',
        'Do not download drivers from unofficial sites.',
        'Do not disable security protections to test a theory and leave them off.',
        'Do not reformat a drive before backing up data you care about.',
        'Do not change many settings at once, because you cannot tell which one mattered.'
      ] },
      { heading: 'When to get professional help', paragraphs: [
        'Escalate when the evidence points to hardware, when data is at risk, or when the same fault returns after sound software troubleshooting. Signs include clicking or disappearing drives, burning smells, swollen batteries, repeated shutdowns under load, and no-power faults.',
        'Bring a short record of what you tested and what changed. It shortens diagnosis and avoids repeating work that has already been done.'
      ] },
      { heading: 'Verify the fix', paragraphs: [
        'A fix is only confirmed when the original symptom no longer occurs under the same conditions. Repeat the action that triggered the problem, run the system under normal load for a while, and check that no new errors appear. Keep notes on what worked so the next problem starts from evidence.'
      ] }
    ],
    faq: [
      { question: 'What should I try first when Windows has a problem?', answer: 'Identify the exact symptom and what changed recently, then run the simplest reversible test, such as a restart, Safe Mode, or removing a recent driver or update, before using bigger repairs.' },
      { question: 'Is it safe to reset or reinstall Windows?', answer: 'It can be, but it is destructive. Back up important files first, and rule out failing storage or memory, because reinstalling will not fix a hardware fault.' },
      { question: 'How do I know whether the problem is hardware instead of Windows?', answer: 'Problems that occur before Windows loads, in firmware screens, or across different operating systems point toward hardware. Problems that vanish in Safe Mode point toward drivers or software.' },
      { question: 'Do SFC and DISM fix everything?', answer: 'No. They repair damaged Windows files and the component store. They do not repair failing hardware, bad drivers, or application problems.' }
    ]
  },

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
    relatedArticles: ['nvme-temperature', 'ssd-slowdown'],
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
    relatedArticles: ['ssd-health', 'nvme-temperature'],
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
