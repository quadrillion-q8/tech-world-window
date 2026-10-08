import type { Article } from './articles';

/**
 * TWW Research / Analysis layer.
 *
 * Important editorial rule: these pages do not invent benchmark numbers.
 * They publish original diagnostic frameworks and analysis now; measured
 * results should be added only after TWW actually runs the stated test.
 */
export const researchArticles: Article[] = [
  {
    id: 'research-ssd-nearly-full',
    slug: 'research/ssd-nearly-full-what-really-changes',
    title: 'What Really Changes When an SSD Gets Nearly Full?',
    seoTitle: 'SSD Nearly Full: What Really Changes? | TWW Research',
    dek: 'A practical TWW investigation into free space, Windows storage behavior, sustained workloads, and what evidence actually points to an SSD becoming the bottleneck.',
    metaDescription: 'What really happens as an SSD fills up? TWW explains what to measure, what Windows does, and how to separate low-space problems from SSD failure.',
    excerpt: 'A nearly full SSD is not automatically a failing SSD. The useful question is which workload changed and what storage evidence changed with it.',
    category: 'Hardware',
    subcategory: 'Research',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    readingTime: 8,
    tags: ['SSD', 'NVMe', 'Windows', 'Storage', 'Research'],
    relatedArticles: ['ssd-full-space', 'ssd-slowdown', 'ssd-health', 'nvme-temperature'],
    contentRole: 'cluster',
    pillarPath: '/research',
    searchIntent: 'informational',
    content: [
      { heading: 'The important distinction: capacity pressure is not the same as drive failure', paragraphs: [
        'When a PC feels slower after an SSD has filled up, it is tempting to conclude that the NAND has worn out. That conclusion is too broad. Low free space, background storage work, temporary-file pressure, sustained-write behavior, thermal throttling, and an actual health problem can produce overlapping symptoms.',
        'The TWW approach is therefore to measure the storage path before replacing the drive. The goal is to identify what changed, reproduce the slowdown, and connect the symptom to storage-specific evidence.'
      ] },
      { heading: 'What to measure before changing anything', paragraphs: [
        'Record used capacity, free capacity, drive temperature, the exact operation that feels slow, and whether the slowdown occurs during short bursts or sustained transfers. Also check whether Windows is performing updates, indexing, security scans, or another background workload at the same time.',
        'A useful comparison is the same operation with a large amount of free space versus the nearly-full state. That comparison is more informative than a generic claim that every SSD needs a particular percentage of free space.'
      ], table: {
        caption: 'Evidence that helps separate storage causes',
        headers: ['Observation', 'What it suggests', 'Next check'],
        rows: [
          ['Only large sustained writes slow down', 'Sustained-write behavior, cache exhaustion, thermals, or workload limits', 'Repeat the same transfer and watch temperature and throughput'],
          ['Windows feels slow everywhere', 'The SSD may not be the only cause', 'Check CPU, RAM, background tasks and system responsiveness'],
          ['Drive reports errors or disappears', 'Potential hardware, firmware, power, or connection problem', 'Back up data and investigate health/logs before performance testing'],
          ['Only low free-space state is affected', 'Capacity pressure is a stronger suspect', 'Free space and retest before replacing hardware'],
        ]
      } },
      { heading: 'Why the common “keep 20% free” rule needs context', paragraphs: [
        'A fixed percentage can be a useful conservative operating habit, but it should not be presented as a universal failure threshold. Drives differ in capacity, controller design, NAND configuration, over-provisioning, workload, and firmware behavior.',
        'Windows also provides storage-management mechanisms such as TRIM and Optimize-Volume. Microsoft documents that the default Optimize-Volume behavior for supported SSDs uses ReTrim rather than HDD-style defragmentation.'
      ] },
      { heading: 'The TWW test design', paragraphs: [
        'A proper TWW study should use the same SSD, Windows installation, firmware, driver state, workload and ambient conditions while changing only the free-space state. Each state should be tested more than once, with idle time between runs where appropriate.',
        'The measurements should include sequential and random workloads, application launch behavior, sustained writes, temperature, and any observable throttling. Results should be reported with the hardware and software context rather than turned into a universal promise.'
      ], bullets: [
        'State A: comfortably free storage.',
        'State B: high utilization.',
        'State C: very high utilization.',
        'Repeat each workload and compare both performance and variability.',
        'Record temperatures and background activity during every run.'
      ] },
      { heading: 'Bottom line', paragraphs: [
        'An SSD becoming nearly full is a reason to investigate, not a reason to immediately replace it. The strongest diagnosis comes from a change that can be reproduced and tied to storage-specific evidence.',
        'For current systems, keep important data backed up regardless of performance. Capacity management is maintenance; it is not a substitute for a backup strategy.'
      ] }
    ],
    sources: [
      { label: 'Microsoft Learn: Optimize-Volume', url: 'https://learn.microsoft.com/en-us/powershell/module/storage/optimize-volume' },
      { label: 'Microsoft Learn: Storage Sense', url: 'https://learn.microsoft.com/en-us/windows/configuration/storage/storage-sense' }
    ],
    testing: 'TWW analysis and test design. This article does not claim benchmark results that have not been independently measured by TWW.',
    faq: [
      { question: 'Does a nearly full SSD automatically become slow?', answer: 'No. Low free space can contribute to storage pressure, but the actual cause should be confirmed with workload, capacity, temperature, health and system-activity evidence.' },
      { question: 'How much free space should an SSD have?', answer: 'There is no single percentage that applies equally to every SSD and workload. Keeping meaningful free capacity is sensible, but the appropriate amount depends on drive size, workload and operating requirements.' }
    ]
  },

  {
    id: 'research-disk-100-low-mbps',
    slug: 'research/windows-100-percent-disk-usage-low-mbps',
    title: 'Windows Shows 100% Disk Usage but Very Low MB/s: What Is Actually Happening?',
    seoTitle: '100% Disk Usage but Low MB/s: Windows Diagnosis | TWW',
    dek: 'Why Task Manager can show 100% disk active time while transfer speed remains low, and how to diagnose latency, queueing, background I/O and storage faults.',
    metaDescription: 'Windows shows 100% disk usage but low MB/s? TWW explains active time, throughput, latency, queueing and the tests that separate software from storage faults.',
    excerpt: '100% active time is not the same thing as 100% storage bandwidth. The difference is the key to diagnosing many Windows disk complaints.',
    category: 'Windows',
    subcategory: 'Storage',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    readingTime: 8,
    tags: ['Windows 11', 'Disk Usage', 'SSD', 'HDD', 'Troubleshooting'],
    relatedArticles: ['windows-disk-100-percent', 'windows-slow-startup', 'windows-troubleshooting-universal'],
    contentRole: 'cluster',
    pillarPath: '/windows-troubleshooting-complete-guide',
    searchIntent: 'informational',
    content: [
      { heading: '100% active time does not mean 100% bandwidth', paragraphs: [
        'Task Manager can report a disk at 100% active time even when the transfer-rate number is surprisingly small. Active time describes how continuously the storage device is busy servicing requests; it does not mean the drive is delivering its maximum sequential throughput.',
        'That distinction matters because a storage device can spend a long time servicing small or delayed requests. A queue full of tiny operations can feel terrible to Windows while producing only a modest MB/s number.'
      ] },
      { heading: 'The four numbers I want beside each other', paragraphs: [
        'When diagnosing this symptom, look at active time, throughput, response time or latency where the monitoring tool exposes it, and which process is generating the I/O. A fifth useful signal is whether the disk problem appears only during a particular Windows task.',
        'The combination is more useful than the 100% figure alone.'
      ], table: {
        caption: 'Interpret the symptom instead of reacting to the percentage',
        headers: ['Pattern', 'More likely direction', 'Do next'],
        rows: [
          ['100% active + very low throughput + one process dominates', 'Small or latency-heavy workload', 'Identify the process and operation'],
          ['100% active + sustained high throughput', 'Real storage bandwidth demand', 'Check workload, thermals and drive capability'],
          ['100% active + frequent freezes + errors/disappearing drive', 'Possible storage or hardware fault', 'Back up data and inspect health/logs'],
          ['100% active only during update/security/indexing work', 'Background Windows workload', 'Let the task finish, then retest idle behavior'],
        ]
      } },
      { heading: 'A better diagnostic sequence', paragraphs: ['Start with the process generating I/O, then reproduce the slowdown under controlled conditions. Avoid installing “disk optimizer” utilities before you know what is consuming the storage queue.'] , steps: [
        'Record the active-time percentage, throughput and the process at the moment of the slowdown.',
        'Wait for obvious Windows maintenance activity to finish, then compare idle behavior.',
        'Check whether the problem follows one application or occurs across Windows.',
        'Check drive health, free capacity, temperature and connection/interface state.',
        'Only after collecting evidence, test a targeted change and repeat the same workload.'
      ] },
      { heading: 'Why HDDs and SSDs can look different', paragraphs: [
        'A hard drive has mechanical seek and rotational behavior, so random access can create severe latency even at modest transfer rates. SSDs remove mechanical movement but can still encounter latency from queue depth, controller behavior, thermal limits, background maintenance, firmware, or a failing device.',
        'That is why “it is an SSD, so 100% usage must be normal” is also an oversimplification.'
      ] },
      { heading: 'Bottom line', paragraphs: [
        'Treat 100% disk usage as a clue. The useful diagnosis comes from the workload, latency, process, health state, and whether the symptom is reproducible. If the drive is disappearing, reporting errors, or causing repeated system stalls, protect the data before continuing performance experiments.'
      ] }
    ],
    sources: [
      { label: 'Microsoft Learn: Storage optimization', url: 'https://learn.microsoft.com/en-us/powershell/module/storage/optimize-volume' },
      { label: 'Microsoft Learn: Storage Sense', url: 'https://learn.microsoft.com/en-us/windows/configuration/storage/storage-sense' }
    ],
    testing: 'TWW diagnostic analysis. No synthetic benchmark numbers are claimed; the article defines the measurements that should be captured during a real investigation.'
  },

  {
    id: 'research-gaming-stutter',
    slug: 'research/what-actually-causes-pc-game-stuttering',
    title: 'What Actually Causes PC Game Stuttering? A Frame-Time Investigation',
    seoTitle: 'What Actually Causes PC Game Stuttering? | TWW Research',
    dek: 'A TWW framework for separating shader compilation, CPU limits, GPU limits, asset streaming, background tasks and thermal behavior using frame-time evidence.',
    metaDescription: 'PC game stuttering is a frame-time problem. TWW shows how to separate shader, CPU, GPU, storage, background and thermal causes.',
    excerpt: 'Average FPS can look excellent while a game still feels bad. The useful evidence is how consistently frames arrive and what changed during the spike.',
    category: 'Gaming',
    subcategory: 'Research',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    readingTime: 9,
    tags: ['PC Gaming', 'Stuttering', 'Frame Time', 'GPU', 'CPU', 'Research'],
    relatedArticles: ['gaming-stutter', 'gpu-frame-time-spikes', 'shader-compilation-stutter', 'gaming-low-fps'],
    contentRole: 'pillar',
    pillarPath: '/research',
    searchIntent: 'informational',
    content: [
      { heading: 'Why average FPS can hide a bad experience', paragraphs: [
        'Average FPS compresses an entire run into one number. It can therefore look healthy even when a small number of frames arrive much later than the surrounding frames. Those late frames are experienced as hitches or stutter.',
        'The TWW diagnostic model starts with frame time: how long each frame took, when the spikes occurred, and what the system was doing at those moments.'
      ] },
      { heading: 'The first question: is the stutter repeatable?', paragraphs: [
        'Repeatability is one of the strongest clues. If a hitch happens at the same doorway, effect, cutscene or first encounter with a rendering feature, game-engine or shader work becomes more plausible. If it appears randomly across games, the investigation should move toward drivers, power, thermals, background software or system stability.',
        'Do not change graphics settings randomly between tests. A diagnostic comparison is useful only when the test conditions remain comparable.'
      ], table: {
        caption: 'Use the pattern of the hitch to choose the next test',
        headers: ['Stutter pattern', 'Likely direction', 'Useful evidence'],
        rows: [
          ['First encounter with an effect or area', 'Shader compilation or asset preparation', 'Repeat the same path after caching/building'],
          ['CPU usage spikes while GPU usage falls', 'CPU-side bottleneck or waiting', 'Frame-time graph + CPU thread/load evidence'],
          ['GPU stays heavily loaded during the spike', 'GPU workload or thermal/power behavior', 'GPU clocks, temperature, utilization and frame time'],
          ['Storage activity rises exactly at the hitch', 'Asset streaming or storage latency', 'Disk active time, throughput and repeatability'],
          ['Occurs across many games', 'System-level cause', 'Drivers, thermals, power, memory and background tasks'],
        ]
      } },
      { heading: 'A controlled TWW stutter test', paragraphs: ['A useful test changes one variable at a time and repeats the same route or benchmark section. The point is not to create a perfect benchmark; it is to make the cause easier to isolate.'], steps: [
        'Record a repeatable section of gameplay with frame-time data enabled.',
        'Run the same section twice without changing settings.',
        'Mark the exact moment of each large frame-time spike.',
        'Compare CPU load, GPU load, clocks, temperatures, VRAM/RAM pressure and storage activity around the spike.',
        'Change one suspected variable, repeat the same section, and compare the frame-time pattern rather than only the average FPS.'
      ] },
      { heading: 'What TWW will and will not claim', paragraphs: [
        'A frame-time graph can show that a hitch occurred and can reveal correlations. It cannot, by itself, prove that a specific component is defective. The strongest conclusions combine repeatability with multiple independent signals.',
        'This is also why TWW will not label every hitch “shader compilation stutter” simply because the game stutters. Shader behavior is one hypothesis that must fit the pattern.'
      ] },
      { heading: 'Bottom line', paragraphs: [
        'The fastest path to a better gaming experience is not always lowering graphics settings. First determine what is producing the late frames. Once the bottleneck is identified, the setting or hardware change becomes much easier to justify.'
      ] }
    ],
    sources: [
      { label: 'Microsoft Learn: Game Mode background', url: 'https://learn.microsoft.com/en-us/previous-versions/windows/desktop/gamemode/game-mode-portal' }
    ],
    testing: 'TWW research framework. No universal FPS or frame-time result is claimed without a documented test run on specified hardware, software and game settings.'
  },

  {
    id: 'research-ram-capacity',
    slug: 'research/does-more-ram-make-windows-faster',
    title: 'Does More RAM Actually Make Windows Faster? What to Measure Before Upgrading',
    seoTitle: 'Does More RAM Make Windows Faster? TWW Research',
    dek: 'More RAM can help when a workload is running short of memory, but the benefit depends on what Windows is doing before and after the upgrade.',
    metaDescription: 'Does adding RAM make Windows faster? TWW explains what to measure—memory pressure, paging, workload and responsiveness—before buying an upgrade.',
    excerpt: 'RAM capacity is valuable when the workload needs it. The mistake is treating every slow PC as a memory-capacity problem.',
    category: 'Hardware',
    subcategory: 'Research',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    readingTime: 8,
    tags: ['RAM', 'Windows 11', 'Memory', 'PC Upgrades', 'Research'],
    relatedArticles: ['ram-upgrade-gaming', 'check-ram-for-errors', 'ddr4-vs-ddr5'],
    contentRole: 'pillar',
    pillarPath: '/research',
    searchIntent: 'informational',
    content: [
      { heading: 'High RAM usage is not automatically a problem', paragraphs: [
        'Windows uses available memory for applications, caches and system work. A high percentage by itself does not prove that the PC needs more RAM.',
        'The more useful question is whether the workload is experiencing memory pressure: applications are being forced to wait, paging becomes significant, multitasking becomes less responsive, or the workload cannot keep its working set in memory.'
      ] },
      { heading: 'The evidence to collect before buying RAM', paragraphs: [
        'Capture total installed memory, memory in use, committed memory, the applications consuming the most memory, and whether the slowdown appears only when several applications are open together. Compare the same workload before and after the upgrade.',
        'If a game or application is slow even when memory pressure is low, more RAM may not change the actual bottleneck.'
      ], table: {
        caption: 'A better RAM-upgrade decision tree',
        headers: ['Observation', 'RAM is a strong suspect?', 'Look at'],
        rows: [
          ['System slows only when many large apps are open', 'Often', 'Committed memory, paging and application working sets'],
          ['Game uses most RAM and stutters when multitasking', 'Possible', 'RAM pressure plus frame-time and VRAM data'],
          ['High memory percentage but system remains responsive', 'Not necessarily', 'Actual pressure and workload behavior'],
          ['Crashes or BSODs occur', 'Capacity is not the first assumption', 'Memory errors, drivers, firmware and stability'],
        ]
      } },
      { heading: 'Capacity and memory stability are different questions', paragraphs: [
        'Adding capacity does not repair defective memory. A PC can have plenty of RAM and still crash because a module, slot, memory controller, firmware setting or overclock is unstable.',
        'Microsoft’s Windows troubleshooting guidance recommends memory diagnostics when investigating relevant stop errors.'
      ] },
      { heading: 'The TWW comparison method', paragraphs: ['A useful capacity study should keep the CPU, GPU, storage, Windows build, application versions and settings constant. Only memory capacity should change. Measure responsiveness, application launch behavior, multitasking, paging-related activity and gaming frame-time where relevant.'], steps: [
        'Establish a baseline with the existing memory configuration.',
        'Reproduce the workload that the user actually cares about.',
        'Record memory pressure and system responsiveness, not just percentage used.',
        'Install the additional capacity with platform-compatible settings.',
        'Repeat the exact workload and compare the behavior.'
      ] },
      { heading: 'Bottom line', paragraphs: [
        'More RAM is most valuable when the workload is constrained by memory capacity. If the PC is slow for another reason, buying RAM can be an expensive way to leave the real bottleneck untouched.'
      ] }
    ],
    sources: [
      { label: 'Microsoft Learn: Bug checks and memory diagnostics', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-checks--blue-screens-' },
      { label: 'Microsoft Learn: Stop-code troubleshooting', url: 'https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/stop-code-error-troubleshooting' }
    ],
    testing: 'TWW research framework. Performance results should be added only after controlled testing with a documented hardware and software configuration.'
  },

  {
    id: 'research-nvme-thermal',
    slug: 'research/how-ssd-temperature-affects-performance',
    title: 'How SSD Temperature Can Affect Real-World Performance',
    seoTitle: 'How SSD Temperature Affects Performance | TWW Research',
    dek: 'SSD temperature matters most when heat changes behavior. TWW explains how to distinguish harmless warmth from a thermal-performance problem.',
    metaDescription: 'How does SSD temperature affect performance? TWW explains the difference between normal heat, thermal throttling and genuine storage faults.',
    excerpt: 'An SSD being warm is not enough to diagnose a problem. The useful signal is whether temperature changes performance or reliability under the same workload.',
    category: 'Hardware',
    subcategory: 'Research',
    authorId: 'imranNatiq',
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    readingTime: 8,
    tags: ['NVMe', 'SSD', 'Thermals', 'Storage', 'Research'],
    relatedArticles: ['nvme-temperature', 'ssd-slowdown', 'ssd-health', 'ssd-full-space'],
    contentRole: 'cluster',
    pillarPath: '/research',
    searchIntent: 'informational',
    content: [
      { heading: 'Temperature is a condition, not a diagnosis', paragraphs: [
        'A temperature reading becomes useful when it can be connected to a change in behavior. The same temperature can be harmless in one drive and problematic in another because controllers, NAND, firmware, heatsinks, airflow and workload differ.',
        'The question TWW asks is simple: does the drive get hotter and then slow down, error, disconnect, or otherwise behave differently under the same workload?'
      ] },
      { heading: 'Short bursts and sustained workloads tell different stories', paragraphs: [
        'A short file operation may finish before heat becomes limiting. A long transfer, repeated benchmark, large game installation or heavy content-creation workload can expose thermal behavior that a quick test never reaches.',
        'That is why a single idle temperature or a single short benchmark is weak evidence for a thermal diagnosis.'
      ] },
      { heading: 'The TWW thermal test design', paragraphs: ['Run a repeatable storage workload while recording temperature and performance at the same time. The key comparison is not “hot versus cool”; it is performance before, during and after the temperature rise.'], steps: [
        'Record idle temperature after the system has stabilized.',
        'Run a repeatable sustained storage workload.',
        'Log temperature and throughput throughout the run.',
        'Mark the point at which performance changes, if it changes.',
        'Repeat after improving cooling, keeping the workload and software environment the same.'
      ] },
      { heading: 'How to separate thermal behavior from a failing SSD', paragraphs: ['Thermal behavior usually follows workload and temperature. A hardware or firmware problem may instead show errors, disappearing devices, inconsistent detection, or failures unrelated to sustained heat. Those symptoms should change the priority from benchmarking to data protection and fault isolation.'] , table: {
        caption: 'Thermal clue versus broader storage warning',
        headers: ['Observation', 'Interpretation', 'Priority'],
        rows: [
          ['Performance drops as temperature rises and recovers after cooling', 'Thermal limitation is plausible', 'Improve cooling and retest'],
          ['Temperature is high but performance remains stable', 'Heat may be within the device’s operating behavior', 'Monitor'],
          ['Drive disappears or throws errors', 'Potential hardware/firmware/power issue', 'Back up and investigate first'],
          ['Slowdown occurs at normal temperature', 'Look beyond thermals', 'Check workload, health and system I/O'],
        ]
      } },
      { heading: 'Bottom line', paragraphs: [
        'Do not buy a heatsink because a monitoring application displayed a high number once. First establish whether heat actually changes performance or reliability. When it does, the before/after test becomes much more useful than a generic temperature threshold.'
      ] }
    ],
    sources: [
      { label: 'Microsoft Learn: Storage optimization', url: 'https://learn.microsoft.com/en-us/powershell/module/storage/optimize-volume' }
    ],
    testing: 'TWW research framework. No drive-specific thermal threshold is presented as universal; measured results should be tied to the exact SSD, firmware, workload and environment.'
  }
];
