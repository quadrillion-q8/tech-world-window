import type { Article, ArticleSection } from './articles';

type Enhancement = {
  sections: ArticleSection[];
  faq?: { question: string; answer: string }[];
  relatedArticles?: string[];
  updatedAt?: string;
  seoTitle?: string;
  metaDescription?: string;
  sources?: { label: string; url: string }[];
};

/**
 * Editorial depth layer for the highest-value TWW evergreen pages.
 * These additions are deliberately diagnostic rather than keyword padding:
 * they explain how to interpret evidence and choose the next test.
 */
const enhancements: Record<string, Enhancement> = {
  'windows-11-wont-start-troubleshooting': {
    sections: [{
      heading: 'TWW diagnosis: do not skip the startup stage',
      paragraphs: [
        'The most useful clue is not the error message alone; it is the last stage the machine can reliably reach. A PC that reaches firmware but never reaches the Windows logo points you toward boot storage or boot configuration. A PC that reaches Windows Recovery but crashes when loading the desktop points you toward drivers, updates, system files, or hardware instability.',
        'Repeat the failure once after making no changes. If the stopping point changes from boot to boot, treat that variability as evidence of an underlying hardware, power, storage, or memory problem rather than assuming Windows itself is corrupt.'
      ],
      table: {
        caption: 'Use the failure stage to choose the next test',
        headers: ['Observed stage', 'Best next question', 'Avoid doing first'],
        rows: [
          ['No firmware logo', 'Does the machine complete basic hardware initialization?', 'Reinstalling Windows'],
          ['Firmware works, Windows does not', 'Is the boot drive detected and can recovery start?', 'Random driver installs'],
          ['Windows logo loops or crashes', 'Did an update, driver, BIOS change, or hardware change precede it?', 'Deleting system files'],
          ['Sign-in works, desktop fails', 'Does Safe Mode load normally?', 'Resetting the whole PC']
        ]
      }
    }],
    faq: [{ question: 'When should I stop troubleshooting and back up my data?', answer: 'If the drive is disappearing, producing repeated I/O errors, making unusual noises, or the system becomes less reliable after each restart, prioritize data recovery before destructive repairs.' }]
  },
  'windows/windows-update-stuck': {
    sections: [{
      heading: 'TWW diagnosis: stuck is not the same as slow',
      paragraphs: [
        'An update can appear unchanged while Windows is still processing packages, restarting services, verifying files, or waiting on a reboot stage. The useful question is whether there is evidence of progress, not whether the percentage has moved recently.',
        'Before resetting Windows Update components, record the exact stage, update name or error code, and whether the machine can still reach the desktop. Those details make later troubleshooting much more targeted.'
      ],
      bullets: [
        'Percentage changes occasionally → give the process time and watch for disk or CPU activity.',
        'Repeated rollback or recovery → investigate the update, system files, storage and recent drivers.',
        'Same error after every retry → stop repeating the same installation and diagnose the error code.',
        'Multiple PCs fail on the same network → consider service, policy or network causes rather than one damaged Windows installation.'
      ]
    }],
    faq: [{ question: 'Should I force-restart a PC when Windows Update looks stuck?', answer: 'Not immediately. If Windows is still responsive or showing installation activity, an interruption can create a second problem. If the machine is genuinely unresponsive for an extended period, use the least disruptive recovery path and document what happened first.' }]
  },
  'windows-11-disk-100-percent-usage': {
    sections: [{
      heading: 'TWW diagnosis: 100% active time is a clue, not a diagnosis',
      paragraphs: [
        'Task Manager can show 100% disk active time while the drive transfers relatively little data. That combination points toward latency or a queue of small operations, not necessarily a drive that is reaching its maximum sequential throughput.',
        'Compare active time with transfer rate, response time, free capacity, drive health and the process generating I/O. A diagnosis becomes much stronger when several signals point to the same cause.'
      ],
      table: {
        caption: 'Interpret disk symptoms together',
        headers: ['Signal', 'What it suggests', 'Next check'],
        rows: [
          ['100% active time + very low MB/s', 'High latency or many small I/O requests', 'Process, response time, storage health'],
          ['High MB/s during a known transfer', 'Normal sustained workload', 'Whether the workload is expected'],
          ['High usage + nearly full drive', 'Reduced working space may be contributing', 'Free space and large temporary files'],
          ['Usage spikes + freezing or errors', 'Storage or system problem may be involved', 'Health data, Event Viewer and backups']
        ]
      }
    }]
  },
  'windows-11-slow-startup-fix': {
    sections: [{
      heading: 'TWW diagnosis: measure the slow stage before optimizing',
      paragraphs: [
        '“Windows is slow to start” can describe several different delays: firmware initialization, boot loading, sign-in, desktop startup, or the time it takes applications to become responsive. Treating all of them as startup-app problems leads to unnecessary changes.',
        'Compare a normal boot with the first boot after a driver, Windows update, storage change, or major application installation. A sudden change is often more informative than a generic startup benchmark.'
      ],
      bullets: [
        'Slow before the Windows logo → firmware, hardware initialization or boot-device path.',
        'Slow at the Windows logo → boot files, storage or drivers.',
        'Fast sign-in but slow desktop → startup applications and background services.',
        'Slow only after updates → identify the changed driver, service or update before disabling everything.'
      ]
    }]
  },
  'pc-game-low-fps-how-to-find-the-cause': {
    sections: [{
      heading: 'TWW diagnosis: change one variable at a time',
      paragraphs: [
        'A useful bottleneck test changes one graphics or workload variable and observes what happens to frame time. If lowering resolution produces a large improvement, the GPU is more likely to be limiting. If it barely changes performance while one CPU thread remains saturated, investigate the CPU or game-engine side instead.',
        'Average FPS alone can hide the problem. Record average FPS together with 1% lows or frame-time behavior in the same repeatable scene so a fix can be judged against the same workload.'
      ],
      table: {
        caption: 'Simple bottleneck experiments',
        headers: ['Experiment', 'If performance changes a lot', 'Likely direction'],
        rows: [
          ['Lower resolution', 'FPS rises substantially', 'GPU workload'],
          ['Lower CPU-heavy settings', 'FPS or 1% lows improve', 'CPU/game-engine workload'],
          ['Close background load', 'Stutter improves but average FPS changes little', 'Background contention'],
          ['Cap FPS below the unstable peak', 'Frame pacing becomes smoother', 'Frame-time stability rather than raw GPU power']
        ]
      }
    }]
  },
  'pc-game-stuttering-fix-frame-time': {
    sections: [{
      heading: 'TWW diagnosis: stutter is a timing problem',
      paragraphs: [
        'Two systems can report the same average FPS while one feels dramatically worse. The difference is often frame-time consistency: one frame arrives late, then several arrive quickly, producing a visible hitch.',
        'When diagnosing stutter, identify whether the spike repeats at a predictable event—asset streaming, shader compilation, entering a new area, a background task, or a thermal/power transition. Repeatability is a powerful clue.'
      ],
      bullets: [
        'Repeatable in the same location → investigate game engine, shader compilation or asset streaming.',
        'Random across different games → investigate system, driver, power, thermal or background causes.',
        'Appears after long sessions → compare temperatures and clocks before and during the problem.',
        'Disappears when background software is closed → isolate the responsible process instead of lowering graphics quality blindly.'
      ]
    }]
  },
  'gpu-frame-time-spikes-causes-fix': {
    sections: [{
      heading: 'TWW diagnosis: find the event behind the spike',
      paragraphs: [
        'A GPU frame-time spike is an observation, not a root cause. The useful evidence is what the GPU, CPU, VRAM, system RAM, clocks and temperatures were doing immediately before and during the spike.',
        'If GPU utilization falls sharply during a hitch while CPU or storage activity rises, the GPU may simply be waiting. If GPU utilization remains high and the spike follows a heavier scene effect, the graphics workload itself may be responsible.'
      ]
    }]
  },
  'shader-compilation-stutter-pc-games': {
    sections: [{
      heading: 'TWW diagnosis: distinguish shader stutter from general instability',
      paragraphs: [
        'Shader compilation stutter usually has a recognizable pattern: the hitch occurs when a game first encounters a new effect, location, material or rendering path, and the behavior may become less frequent after the relevant shaders have been built or cached.',
        'If the same game continues to stutter randomly in already-visited areas, do not assume every hitch is shader compilation. Compare the timing with asset streaming, CPU load, storage activity and frame-time behavior.'
      ],
      bullets: [
        'First encounter with a new effect → shader compilation is plausible.',
        'Same scene stutters repeatedly after several runs → investigate broader frame-time causes.',
        'Stutter begins after a driver change → compare behavior before and after the driver update.',
        'All games stutter → look beyond one game engine and investigate the system.'
      ]
    }]
  },
  'how-to-check-ssd-health-windows': {
    sections: [{
      heading: 'TWW diagnosis: health data is evidence, not a single green/red verdict',
      paragraphs: [
        'SSD health information is most useful when compared with symptoms. A drive can report healthy while another problem causes slow performance, and a drive showing wear information can still operate normally. Look at temperature, remaining life indicators where available, error information, capacity, and whether the drive is intermittently disappearing.',
        'Back up important data before experimenting with a drive that is showing repeated errors or disappearing from firmware. Diagnostic work should never be allowed to become the reason valuable data is lost.'
      ]
    }]
  },
  'nvme-ssd-temperature-too-high': {
    sections: [{
      heading: 'TWW diagnosis: temperature must be interpreted with workload and throttling',
      paragraphs: [
        'A high NVMe temperature is not automatically a failure. The important questions are how high it becomes under a repeatable workload, whether performance drops as temperature rises, and whether the drive or system reports thermal throttling.',
        'Compare idle temperature, sustained transfer temperature and the temperature at which performance changes. Short bursts and long writes can produce very different results.'
      ],
      bullets: [
        'High temperature with stable performance → monitor airflow and heatsink contact.',
        'Temperature rises and sustained performance falls → thermal throttling becomes more likely.',
        'Temperature is normal but errors or disappearing drives occur → investigate firmware, power and drive health instead.'
      ]
    }]
  },
  'why-ssd-is-slowing-down-windows': {
    sections: [{
      heading: 'TWW diagnosis: prove that the SSD is the bottleneck before replacing it',
      paragraphs: [
        'A system that feels slower over time does not automatically have a worn-out SSD. Check free space, background workloads, Windows updates, temperatures, drive health, interface mode and the specific operation that became slow.',
        'The strongest case for replacing the drive is a combination of storage-specific evidence—health warnings, repeated I/O errors, disappearing devices, sustained performance degradation or capacity constraints—rather than age alone.'
      ]
    }]
  },
  'how-to-check-ram-for-errors-windows': {
    sections: [{
      heading: 'TWW diagnosis: one successful boot does not prove RAM stability',
      paragraphs: [
        'Memory faults can be intermittent and workload-dependent. A PC may boot normally and still fail during a longer memory test, gaming session, compression workload or after enabling XMP/EXPO.',
        'If errors appear, return the system to known-good memory settings before replacing parts. Test modules and slots systematically so a bad module is not confused with a motherboard slot or configuration problem.'
      ]
    }]
  },
  'windows-11-blue-screen-stop-code-how-to-read': {
    sections: [{
      heading: 'TWW diagnosis: the stop code narrows the search; it rarely names the failed part',
      paragraphs: [
        'A BSOD code is best treated as a category clue. The same code can result from a driver, memory corruption, storage problems, firmware, overheating or another component that caused the kernel to receive invalid data.',
        'Record the stop code, the named driver or module if shown, when the crash occurs, and what changed recently. That combination is much more actionable than searching the code alone and replacing the first component mentioned online.'
      ]
    }]
  },
  'windows-11-freezing-randomly-causes-fix': {
    sections: [{
      heading: 'TWW diagnosis: determine whether the freeze is total',
      paragraphs: [
        'A frozen application is different from a frozen Windows session. Test whether the mouse moves, whether keyboard shortcuts respond, whether audio continues, and whether another application can be opened. Those observations help separate one process from a system-wide stall.',
        'If freezes correlate with high temperatures, heavy disk activity, memory pressure, a recent driver, or a specific workload, keep that correlation intact while testing rather than making many changes at once.'
      ]
    }]
  },
  'best-ssds': {
    sections: [{
      heading: 'TWW buying principle: choose the SSD for the workload, not the headline number',
      paragraphs: [
        'Sequential read and write figures are useful, but they do not describe every workload. Gaming, Windows responsiveness, large file transfers, content creation and sustained writes stress storage differently.',
        'Before choosing a model, decide whether the real constraint is capacity, sustained workload behavior, thermals, endurance, interface compatibility or price. A faster specification is not automatically a better purchase for a lighter workload.'
      ],
      bullets: [
        'Gaming → prioritize capacity, consistent performance and platform compatibility.',
        'OS/application drive → responsiveness and reliability matter more than peak sequential figures.',
        'Large sustained writes → investigate sustained behavior and thermal management.',
        'Laptop upgrade → verify physical size, interface, thermal clearance and migration plan first.'
      ]
    }]
  },
  'best-gaming-laptops': {
    sections: [{
      heading: 'TWW buying principle: evaluate the whole laptop, not the GPU name',
      paragraphs: [
        'Two laptops with the same GPU model can deliver different results because power limits, cooling, CPU configuration, memory, display resolution and firmware differ. The GPU label is only the beginning of the comparison.',
        'For a gaming laptop, evaluate sustained performance and usability together: cooling behavior, fan noise, display quality, upgradeability, charger size, battery behavior away from the wall and the manufacturer’s support path.'
      ]
    }]
  },
  'best-gaming-monitors': {
    sections: [{
      heading: 'TWW buying principle: match the monitor to the system and the game',
      paragraphs: [
        'Resolution, refresh rate and panel behavior should be evaluated together. A very high refresh rate has limited value if the system rarely produces enough frames, while a high resolution can increase GPU load and change the settings required for a stable frame rate.',
        'Also consider variable refresh support, response behavior, connectivity and ergonomics. The best monitor is the one whose characteristics match the PC and the way it is actually used.'
      ]
    }]
  },
  'best-ram': {
    sections: [{
      heading: 'TWW buying principle: capacity and platform compatibility come before frequency',
      paragraphs: [
        'Memory recommendations should start with the workload and platform. A higher-rated kit is not useful if the motherboard, CPU or laptop cannot run it reliably, and additional capacity can be more valuable than a small frequency increase when the system is running short of RAM.',
        'For upgrades, verify the exact motherboard or laptop model, module type, maximum supported capacity, slot configuration and firmware behavior before buying.'
      ]
    }]
  }
};


/**
 * Authority enrichment layer added 2026-10-10.
 * The goal is diagnostic completeness and contextual pathways, not word-count inflation.
 * All internal links are checked by validate-build and audit-content-integrity.
 */
const authorityEnrichments: Record<string, Enhancement> = {
  'windows-troubleshooting-complete-guide': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'Build a diagnosis from evidence, not guesses',
      paragraphs: [
        'A strong diagnosis connects at least two observations: the symptom pattern and a test result that supports one likely cause. For example, a freeze that coincides with storage errors is a different lead from a freeze that began immediately after a graphics-driver update. Neither observation proves the root cause on its own, but each tells you which test to run next.',
        'Use a short record for recurring faults: the exact symptom, time, recent changes, Windows build, error or event ID, test performed, result, and the single change made. This prevents repeated fixes and makes it easier to reverse a change that did not help.'
      ],
      table: {
        caption: 'Match the next test to the evidence you have',
        headers: ['Evidence so far', 'Next useful investigation', 'What not to conclude yet'],
        rows: [
          ['A stop code repeats after a driver change', 'Record the code and named driver, then test a targeted rollback or update', 'The named driver is always the root cause'],
          ['Freezes coincide with disk errors or drive dropouts', 'Protect important data first; review drive health and system storage events', 'A Windows reinstall will repair a failing drive'],
          ['Performance falls only after a long gaming session', 'Compare clock speeds and temperatures before and during the drop', 'A single temperature reading proves throttling'],
          ['Only one application fails', 'Update or repair that application and compare with another user profile', 'The entire Windows installation is corrupt'],
          ['Several devices on one network fail together', 'Check router, DNS, and provider status from another device', 'The Windows network adapter is necessarily at fault']
        ]
      },
      relatedLinks: [
        { label: 'Windows will not start', href: '/windows-11-wont-start-troubleshooting', description: 'Identify whether the failure occurs before Windows, during boot, or at sign-in.' },
        { label: 'Windows Update is stuck', href: '/windows/windows-update-stuck', description: 'Separate a slow update from a stalled installation before interrupting it.' },
        { label: '100% disk usage', href: '/windows-11-disk-100-percent-usage', description: 'Interpret active time, throughput, background activity, and storage health together.' },
        { label: 'Windows freezes randomly', href: '/windows-11-freezing-randomly-causes-fix', description: 'Use freeze behavior and event records to narrow the likely cause.' }
      ]
    }]
  },
  'windows-11-high-memory-usage-how-to-find-the-cause': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'Tell normal memory use from actual memory pressure',
      paragraphs: [
        'A large memory number by itself does not mean Windows has a memory leak. Windows can use otherwise available RAM for caches, and applications may reserve memory that is not the same as memory that is actively preventing other work. Look at available memory, committed memory, the applications using the most memory, and whether the PC is paging heavily or becoming unresponsive.',
        'Compare the machine during the slowdown with a normal period. If closing one application restores responsiveness and available memory, that application is a useful lead. If usage keeps rising without returning after the workload ends, record the process and repeat the observation before deciding it is a leak.'
      ],
      table: {
        caption: 'Memory readings: what they can and cannot tell you',
        headers: ['Observation', 'Interpretation to investigate', 'Next test'],
        rows: [
          ['High RAM use but the PC remains responsive', 'Could be normal caching or a workload using available memory', 'Check available memory and workload behavior before changing settings'],
          ['Memory use grows steadily while one app is open', 'Possible application memory growth or leak', 'Record the process over time and compare after closing it'],
          ['High committed memory with slow app switching', 'Memory pressure and paging may be contributing', 'Close a known heavy workload and check whether responsiveness returns'],
          ['Crashes, corrupt files, or stop codes as well as high use', 'A separate memory-stability issue is possible', 'Run a memory diagnostic instead of relying on Task Manager alone']
        ]
      },
      relatedLinks: [
        { label: 'Test RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Check for hardware instability when the symptoms go beyond high utilization.' },
        { label: 'How much RAM do you need?', href: '/how-much-ram-do-you-need-gaming', description: 'Evaluate capacity by workload rather than by a single utilization percentage.' },
        { label: 'TWW research: does more RAM make Windows faster?', href: '/research/does-more-ram-make-windows-faster', description: 'Review what measurements can distinguish capacity pressure from other bottlenecks.' }
      ]
    }]
  },
  'how-to-check-ssd-health-windows': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'Use health data alongside symptoms and event logs',
      paragraphs: [
        'A single “good” status is not a promise that a drive cannot fail, and a wear percentage alone is not a complete diagnosis. Check the drive model and firmware, the manufacturer utility or a reputable SMART reader, temperature, critical-warning state, and whether media or data-integrity error counters are changing. Names and thresholds differ between SATA and NVMe devices and between vendors.',
        'If Windows intermittently loses the drive, files become unreadable, or storage-related errors keep appearing, copy important data before running long benchmarks or stress tests. Performance testing is secondary when reliability is in question.'
      ],
      steps: [
        'Identify the exact drive model and interface in Windows or the manufacturer utility.',
        'Capture the current health report, temperature, and available error counters so you have a baseline.',
        'Check Reliability Monitor and Event Viewer for storage or controller errors around the time of the slowdown.',
        'Back up important files, then compare the symptom with free capacity, temperature, and background disk activity.',
        'Repeat the same observation later; changes over time are often more useful than one isolated reading.'
      ],
      relatedLinks: [
        { label: 'Why an SSD can slow down', href: '/why-ssd-is-slowing-down-windows', description: 'Separate low free space, background I/O, heat, and sustained-write behavior from failure.' },
        { label: 'NVMe SSD temperature guide', href: '/nvme-ssd-temperature-too-high', description: 'Interpret temperature in context of workload and thermal throttling.' },
        { label: 'SSD nearly full: what to check', href: '/ssd-nearly-full-windows-performance', description: 'Check capacity pressure without treating a full drive as proof of damage.' },
        { label: 'TWW research: SSD free-space behavior', href: '/research/ssd-nearly-full-what-really-changes', description: 'See which observations help separate capacity pressure from drive failure.' }
      ]
    }]
  },
  'why-ssd-is-slowing-down-windows': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'A practical decision path before replacing the drive',
      paragraphs: [
        'Test the activity that feels slow, not just a synthetic maximum-speed number. Record whether the issue affects boot, launching apps, small file operations, or long writes, and check whether Task Manager shows another process generating disk activity. Use the same workload and conditions when comparing results.',
        'If the drive is reporting errors or disappearing, stop performance experiments and protect data. If health looks normal, continue by checking available space, temperature, background work, power settings, and whether sustained writes have outlasted the drive’s fast write cache.'
      ],
      table: {
        caption: 'SSD slowdown: choose the next check by symptom',
        headers: ['Symptom', 'Check first', 'Important limitation'],
        rows: [
          ['Windows is slow at random times', 'Task Manager disk activity and the process creating I/O', 'High active time does not identify the process or root cause by itself'],
          ['Large copies start fast then slow down', 'Temperature and sustained-write behavior after the initial burst', 'Peak sequential speed does not describe long writes'],
          ['Drive is nearly full', 'Free space, temporary files, and repeat the same workload after cleanup', 'There is no universal free-space percentage that guarantees speed'],
          ['Drive reports errors or disappears', 'Backup, health report, firmware, connection and controller events', 'Do not use a benchmark as the first response to possible failure']
        ]
      },
      relatedLinks: [
        { label: 'Check SSD health', href: '/how-to-check-ssd-health-windows', description: 'Understand SMART data, warnings and when to prioritize a backup.' },
        { label: 'SSD temperature and throttling', href: '/nvme-ssd-temperature-too-high', description: 'Check whether heat coincides with performance loss.' },
        { label: 'TWW research: 100% disk but low MB/s', href: '/research/windows-100-percent-disk-usage-low-mbps', description: 'Understand why active time and throughput can tell different stories.' }
      ]
    }]
  },
  'windows-11-freezing-randomly-causes-fix': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'Preserve a timeline around each freeze',
      paragraphs: [
        'Reliability Monitor (`perfmon /rel`) is a useful first timeline because it shows crashes, application failures, and some Windows failures by date. Event Viewer can add details, but an event close to the freeze is a clue rather than proof: Windows logs many routine warnings, and the timestamp must match the incident.',
        'Look for repeatability. If each freeze follows the same game, wake-from-sleep action, device connection, or workload, reproduce that condition carefully and change one variable. If the machine is unstable across unrelated workloads, broaden the investigation to memory, storage, temperatures, and power.'
      ],
      bullets: [
        'Write down the exact time and whether the system recovered or required a forced shutdown.',
        'Check Reliability Monitor first, then inspect relevant System log events at the same time.',
        'If drive errors or disappearing storage are present, back up before repeated repair attempts.',
        'Avoid reading an isolated Kernel-Power event as a diagnosis; it often records an unexpected shutdown rather than its root cause.'
      ],
      relatedLinks: [
        { label: 'Read Windows blue-screen stop codes', href: '/windows-11-blue-screen-stop-code-how-to-read', description: 'Preserve the error code and use crash records to choose targeted tests.' },
        { label: 'Test RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Investigate memory instability when crashes or corruption accompany freezing.' },
        { label: 'Check SSD health', href: '/how-to-check-ssd-health-windows', description: 'Look for storage warnings or errors when freezes coincide with I/O problems.' },
        { label: 'Universal Windows troubleshooting', href: '/windows-troubleshooting-complete-guide', description: 'Return to the symptom-first diagnostic framework.' }
      ]
    }]
  },
  'pc-game-stuttering-fix-frame-time': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'Make a frame-time capture useful and repeatable',
      paragraphs: [
        'A useful capture records the game, scene, resolution, graphics settings, frame cap, driver version, and whether it is a first or repeat run. Keep the capture window short enough to match the event, but long enough to show what happened immediately before and after the hitch. Compare like with like; a different scene or shader cache state can invalidate a simple before-and-after comparison.',
        'Frame-time graphs can show when frames arrive late, but they do not always identify the cause. Correlate spikes with CPU and GPU load, VRAM/RAM pressure, storage activity, temperatures, clocks, and repeated in-game events. Treat one sensor or one capture as a lead, then test it.'
      ],
      table: {
        caption: 'Read the frame-time pattern before changing settings',
        headers: ['Pattern', 'Hypothesis worth testing', 'How to check it'],
        rows: [
          ['A spike on the first encounter with an effect', 'Shader compilation or asset loading', 'Repeat the same route and compare first-run with warm-cache behavior'],
          ['Spikes repeat at the same scene transition', 'Asset streaming or a game-engine workload', 'Capture the transition several times and compare resource activity'],
          ['GPU load drops as frame time spikes', 'GPU may be waiting on CPU, storage, or another dependency', 'Correlate the timestamp with CPU and disk activity'],
          ['Performance worsens after a long session', 'Temperature, power limits or background accumulation', 'Compare clock and temperature trends from cool start to the slowdown'],
          ['Only one game is affected', 'Game-specific settings, cache, or game update', 'Compare another game and record the exact game build']
        ]
      },
      relatedLinks: [
        { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Investigate what the GPU is doing around a hitch.' },
        { label: 'Shader compilation stutter', href: '/shader-compilation-stutter-pc-games', description: 'Recognize first-run and cache-related hitching.' },
        { label: 'Analyze a frame-time capture', href: '/tools/frame-time-analyzer', description: 'Use TWW’s tool to inspect frame-time samples and summary metrics.' },
        { label: 'TWW research: PC game stuttering', href: '/research/what-actually-causes-pc-game-stuttering', description: 'Review the variables a reproducible stutter investigation should measure.' }
      ]
    }]
  },
  'best-ssds': {
    updatedAt: '2026-10-10',
    sections: [{
      heading: 'How to compare SSDs without overvaluing peak speed',
      paragraphs: [
        'Use the same workload when comparing drives and separate short burst performance from sustained writes. Include capacity, controller and NAND configuration where known, cache behavior, power use, temperature, endurance rating, warranty, and the price at the time of publication. Manufacturer specifications are useful, but they are not the same as independent testing.',
        'TWW should call a product “tested” only when the editorial team has actually tested it using a disclosed method. Where a page relies on manufacturer specifications, published independent measurements, and compatibility research instead, label that basis clearly and do not imply firsthand results. Prices and product availability should be rechecked before each commercial update.'
      ],
      table: {
        caption: 'A transparent SSD comparison checklist',
        headers: ['Factor', 'Why it matters', 'Evidence to record'],
        rows: [
          ['Capacity and price per TB', 'Affects usable space and value', 'Capacity, current price, warranty and date checked'],
          ['Short and sustained writes', 'Drives can behave differently after a fast cache is exhausted', 'Workload, test duration, drive fill state and sustained result'],
          ['Thermals and power', 'Laptop cooling and sustained workloads differ from open desktop test benches', 'Ambient conditions, cooling setup, temperature and power state'],
          ['Endurance and warranty', 'Useful for heavy writes and long-term ownership decisions', 'Manufacturer rating, warranty terms and exclusions'],
          ['Compatibility', 'Interface, physical dimensions and cooling affect real usability', 'System model, M.2 size, PCIe support and clearance']
        ]
      },
      relatedLinks: [
        { label: 'Samsung 990 PRO 4TB review profile', href: '/reviews/ssds/samsung-990-pro-4tb', description: 'Check the model-specific page and its stated evidence basis.' },
        { label: 'Crucial T500 2TB review profile', href: '/reviews/ssds/crucial-t500-2tb', description: 'Compare capacity and product-specific specifications.' },
        { label: 'SSD health guide', href: '/how-to-check-ssd-health-windows', description: 'Understand the maintenance and health indicators that matter after purchase.' },
        { label: 'NVMe temperature guide', href: '/nvme-ssd-temperature-too-high', description: 'Account for thermal limits when planning sustained workloads.' }
      ]
    }]
  }
};


/**
 * Second editorial pass, 2026-10-10.
 * These sections deepen the lowest-coverage diagnostic articles identified in
 * the source audit. Every addition must help a reader decide what to test next.
 */
const additionalAuthorityEnrichments: Record<string, Enhancement> = {
  'windows-11-network-adapter-reset-guide': {
    updatedAt: '2026-10-10',
    seoTitle: 'Windows 11 Network Reset: When to Use It',
    metaDescription: 'Learn what Windows 11 Network Reset changes, what it removes, and which checks to try before rebuilding network settings.',
    sources: [
      { label: 'Microsoft Support: Fix Wi-Fi connection issues in Windows', url: 'https://support.microsoft.com/en-us/windows/fix-wi-fi-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c' },
      { label: 'Microsoft Learn: Test-NetConnection', url: 'https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps' }
    ],
    sections: [{
      heading: 'Before you use Network Reset: preserve the evidence',
      paragraphs: [
        'Network Reset is a broad recovery action, not the first diagnostic test. Before using it, note whether the failure affects Wi-Fi, Ethernet, a VPN, or only one application; record the current adapter name and any non-default IP, DNS, proxy, or VPN settings. This gives you a baseline if the reset removes a configuration that you need to restore.',
        'A reset can remove and reinstall network adapters and return network components to defaults. You may need to reconnect to saved Wi-Fi networks, reconfigure VPN software, or reinstall virtual network adapters used by virtualization or security tools. Check your work or school VPN instructions before proceeding on a managed device.'
      ],
      table: {
        caption: 'Choose a proportionate network repair',
        headers: ['Evidence', 'Try first', 'Why not reset yet?'],
        rows: [
          ['Only one website or application fails', 'Test another site and check application/proxy settings', 'The adapter may be working normally'],
          ['Other devices on the same network are offline', 'Check router, modem, and provider status', 'Resetting this PC will not fix an upstream outage'],
          ['Only this PC has no connection', 'Check IP address, default gateway, VPN/proxy, and adapter status', 'A narrower fault may be identifiable'],
          ['Several network repairs failed and adapter settings appear damaged', 'Record settings, then consider Network Reset', 'This is the point where a broader reset may be justified']
        ]
      },
      relatedLinks: [
        { label: 'Connected but no internet', href: '/windows-11-wifi-connected-no-internet', description: 'Test the router, IP configuration, gateway, DNS, and VPN in sequence.' },
        { label: 'Windows DNS troubleshooting', href: '/windows-11-dns-not-working-how-to-fix', description: 'Confirm whether name resolution is actually the failing layer.' }
      ]
    }],
    faq: [{ question: 'Will Windows Network Reset delete my personal files?', answer: 'It is intended to reset network components rather than personal documents, but it can remove network configuration and adapter settings. Record non-default settings and ensure you know how to reconnect before using it.' }]
  },
  'gpu-100-percent-usage-gaming': {
    updatedAt: '2026-10-10',
    seoTitle: 'GPU at 100% Usage While Gaming: Explained',
    metaDescription: 'GPU usage at 100% is often normal. Check temperatures, clocks, frame times and game settings to distinguish expected load from a problem.',
    sources: [
      { label: 'NVIDIA FrameView User Guide', url: 'https://images.nvidia.com/content/geforce/technologies/frameview/frameview-1-4-user-guide-web-version.pdf' },
      { label: 'AMD: Monitor Performance Metrics with Adrenalin Edition', url: 'https://www.amd.com/en/resources/support-articles/faqs/DH3-038.html' }
    ],
    sections: [{
      heading: 'A useful GPU check compares load, performance, and symptoms',
      paragraphs: [
        'Record GPU utilization alongside GPU temperature, clock, board power if available, VRAM use, CPU activity, frame time, and the actual in-game frame rate. A utilization percentage without those surrounding signals cannot tell you whether performance is healthy or whether the card is overheating, power-limited, or simply rendering a demanding scene.',
        'Repeat the same short game sequence at the same resolution and settings. Then change only one factor, such as render scale or an expensive graphics option. If the GPU load and frame rate respond substantially, the graphics workload is likely important. If performance barely changes, investigate CPU limits, frame caps, synchronization, asset streaming, or the game engine.'
      ],
      table: {
        caption: 'Interpret GPU utilization with the other measurements',
        headers: ['Pattern', 'Possible explanation', 'Next test'],
        rows: [
          ['Near 100% with stable clocks and expected FPS', 'Normal GPU-limited rendering', 'Compare performance with the same scene and settings'],
          ['Near 100% plus rising temperature and falling clocks', 'Thermal or power behavior may be limiting performance', 'Check cooling, fan behavior, power profile, and manufacturer limits'],
          ['GPU utilization drops during each hitch', 'The GPU may be waiting on another part of the workload', 'Compare CPU thread load, storage activity, and frame-time capture'],
          ['Near 100% while idle at desktop', 'Another process or background workload may be active', 'Check Task Manager GPU engine usage and the process list']
        ]
      },
      relatedLinks: [
        { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Investigate what changes immediately before and during an individual hitch.' },
        { label: 'GPU overheating', href: '/gpu-overheating-gaming-pc-causes-fix', description: 'Check temperature and clock evidence before changing cooling or replacing hardware.' },
        { label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer', description: 'Analyze a supported frame-time capture rather than relying only on average FPS.' }
      ]
    }],
    faq: [{ question: 'Is 100% GPU usage by itself a fault?', answer: 'No. High GPU utilization is common when a game is limited by graphics rendering. Investigate the associated temperature, clock, frame-time, stability, and performance behavior instead of treating the percentage alone as a fault.' }]
  },
  'pc-games-crashing-to-desktop-troubleshooting': {
    updatedAt: '2026-10-10',
    seoTitle: 'PC Games Crashing to Desktop: Diagnose It',
    metaDescription: 'Diagnose PC games crashing to desktop by separating game-specific faults from driver, overlay, memory, thermal and system-wide problems.',
    sources: [
      { label: 'NVIDIA FrameView User Guide', url: 'https://images.nvidia.com/content/geforce/technologies/frameview/frameview-1-4-user-guide-web-version.pdf' },
      { label: 'Microsoft: Bug check code reference', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2' }
    ],
    sections: [{
      heading: 'Use the crash pattern to separate game faults from system instability',
      paragraphs: [
        'Start by determining whether one game crashes or several unrelated games fail. A single-game failure makes game files, mods, configuration, overlays, or a game-specific issue sensible first checks. Crashes across several demanding games raise the priority of shared components such as the graphics driver, memory stability, temperatures, power delivery, and Windows system events; they still do not identify a failed component by themselves.',
        'Record the time of each crash and check Reliability Monitor or Event Viewer for a matching application fault, Windows error, or hardware event. A nearby event is a lead, not proof of cause. Note the faulting application or module and whether the failure is a return to desktop, a driver reset, a blue screen, or a complete power loss: those outcomes point to different investigations.'
      ],
      steps: [
        'Reproduce the failure once with the same game, scene, and settings; note the exact outcome and time.',
        'For one affected game, verify its files through the game launcher and temporarily test without mods or optional overlays.',
        'If several games fail, return CPU/GPU/RAM tuning to known-stable defaults and check temperatures and clock behavior.',
        'Review the matching Windows event and update or roll back only the driver or component that has a plausible connection to the failure.',
        'If the PC loses power, shows artifacts, or produces repeated blue screens, stop repeated stress tests and prioritize hardware safety and data protection.'
      ],
      relatedLinks: [
        { label: 'Test RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Use a proper memory test when crashes occur across multiple applications or workloads.' },
        { label: 'Read a Windows stop code', href: '/windows-11-blue-screen-stop-code-how-to-read', description: 'Use the crash type and stop-code evidence if the system blue-screens instead of closing the game.' },
        { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Investigate stutters that occur before a crash or performance drop.' }
      ]
    }],
    faq: [{ question: 'Should I reinstall Windows when games keep crashing?', answer: 'Not as an early step. First check whether one game or several fail, remove optional overlays or mods as a test, validate files, review matching error records, and return unstable tuning to defaults. A Windows reinstall is disruptive and will not repair failing hardware.' }]
  },
  'laptop-nvme-ssd-upgrade-compatibility': {
    updatedAt: '2026-10-10',
    seoTitle: 'Laptop NVMe SSD: Compatibility Checklist',
    metaDescription: 'Before upgrading a laptop SSD, verify interface, M.2 length, clearance, supported capacity, migration method, and data backup.',
    sources: [
      { label: 'Microsoft Learn: Overview of Disk Management', url: 'https://learn.microsoft.com/en-us/windows-server/storage/disk-management/overview-of-disk-management' },
      { label: 'Microsoft Learn: Initialize new disks', url: 'https://learn.microsoft.com/en-us/windows-server/storage/disk-management/initialize-new-disks' }
    ],
    sections: [{
      heading: 'Confirm the exact laptop model before choosing an SSD',
      paragraphs: [
        'Do not use the phrase “M.2 slot” as a complete compatibility check. M.2 describes the module form factor; the laptop documentation must confirm whether the slot accepts PCIe NVMe, SATA, or both, which drive lengths are supported, and whether any side of a double-sided module has enough clearance. Some laptops have multiple slots with different capabilities.',
        'Also distinguish physical compatibility from performance compatibility. A PCIe 4.0 drive may negotiate at a lower supported generation in a compatible older slot, but firmware support, capacity validation, power behavior, and thermal limits still depend on the exact laptop. Use the service manual or specification for the full model number, not only the marketing family name.'
      ],
      table: {
        caption: 'SSD upgrade checks to complete before ordering',
        headers: ['Check', 'Evidence to find', 'Why it matters'],
        rows: [
          ['Interface', 'Manufacturer specification or service manual', 'M.2 shape alone does not confirm SATA/NVMe support'],
          ['Length and sides', 'Supported length such as 2230 or 2280; clearance notes', 'A physically incompatible module may not mount or fit safely'],
          ['Slot generation and capacity', 'Laptop platform documentation', 'Avoid assumptions about maximum supported configuration'],
          ['Thermal design', 'Heatsink, pad, shield and chassis notes', 'A high-power drive may throttle in a thin chassis'],
          ['Migration and recovery', 'Verified backup plus clean-install or cloning plan', 'Protect files before opening or changing the system drive']
        ]
      },
      relatedLinks: [
        { label: 'Check SSD health in Windows', href: '/how-to-check-ssd-health-windows', description: 'Check the existing drive before deciding that replacement is necessary.' },
        { label: 'Why an SSD slows down', href: '/why-ssd-is-slowing-down-windows', description: 'Separate capacity, workload, temperature, and health symptoms.' },
        { label: 'NVMe SSD temperature', href: '/nvme-ssd-temperature-too-high', description: 'Understand why laptop cooling can affect sustained storage performance.' }
      ]
    }],
    faq: [{ question: 'Will every M.2 NVMe SSD work in my laptop?', answer: 'No. The exact interface, module length, physical clearance, firmware, and laptop specifications must be checked. Confirm the complete model number and service documentation before buying.' }]
  },
  'windows-11-dns-not-working-how-to-fix': {
    updatedAt: '2026-10-10',
    seoTitle: 'Windows 11 DNS Problems: Diagnose and Fix',
    metaDescription: 'Confirm a Windows 11 DNS failure with simple tests, interpret the result, and avoid changing network settings until the cause is clearer.',
    sources: [
      { label: 'Microsoft Support: Fix Wi-Fi connection issues in Windows', url: 'https://support.microsoft.com/en-us/windows/fix-wi-fi-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c' },
      { label: 'Microsoft Learn: Test-NetConnection', url: 'https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps' }
    ],
    sections: [{
      heading: 'A DNS error should be tested, not guessed from the browser message',
      paragraphs: [
        'A failed website lookup can come from the current DNS resolver, a local cache, a VPN or security product, a router issue, or the destination domain itself. First test more than one unrelated domain and check whether another device on the same network has the same problem. A single website failure is not enough evidence to replace DNS settings.',
        'In PowerShell, use Resolve-DnsName for a domain and compare it with nslookup if needed. A timeout, SERVFAIL, NXDOMAIN, and a successful response are different outcomes: NXDOMAIN can mean that the queried name does not exist, while a timeout means the query did not receive a response in time. Confirm the domain spelling and query a known-good domain before drawing a conclusion.'
      ],
      codeBlocks: ['Resolve-DnsName example.com\nnslookup example.com\nTest-NetConnection example.com -Port 443'],
      bullets: [
        'If name lookup fails for multiple domains but general connectivity works, investigate DNS resolution and the configured resolver.',
        'If the DNS test succeeds but a browser still fails, check proxy/VPN settings, browser-specific errors, and the destination service.',
        'If several devices on the same network fail together, investigate router DNS settings or upstream service before changing one Windows PC.',
        'Change one variable at a time and record the original resolver settings so you can reverse the test.'
      ],
      relatedLinks: [
        { label: 'Connected but no internet', href: '/windows-11-wifi-connected-no-internet', description: 'If the failure could be broader than DNS, test the local gateway and internet route first.' },
        { label: 'Network Reset guide', href: '/windows-11-network-adapter-reset-guide', description: 'Reserve the broad reset for after narrower connectivity and resolver checks.' }
      ]
    }],
    faq: [{ question: 'Does a successful ping to an IP address prove DNS is broken?', answer: 'No. It is one clue. Compare name-resolution results, more than one domain, other devices, and the browser or application error before identifying DNS as the failing layer.' }]
  },
  'gpu-overheating-gaming-pc-causes-fix': {
    updatedAt: '2026-10-10',
    seoTitle: 'GPU Overheating While Gaming: Causes and Fixes',
    metaDescription: 'Diagnose GPU heat using temperature, hotspot, fan, clock and power trends. Check airflow and manufacturer limits before replacing hardware.',
    sources: [
      { label: 'AMD: Monitor Performance Metrics with Adrenalin Edition', url: 'https://www.amd.com/en/resources/support-articles/faqs/DH3-038.html' },
      { label: 'NVIDIA FrameView User Guide', url: 'https://images.nvidia.com/content/geforce/technologies/frameview/frameview-1-4-user-guide-web-version.pdf' }
    ],
    sections: [{
      heading: 'Check the temperature trend alongside clock speed and fan behavior',
      paragraphs: [
        'A single temperature reading cannot establish overheating. Record the GPU temperature and, when the hardware exposes it, hotspot or junction temperature, fan speed, clock frequency, board power and performance during a repeatable game scene. Compare those readings with the specific card or laptop manufacturer’s stated operating guidance; different GPU designs and sensors do not share one universal threshold.',
        'Look for the sequence: does temperature rise, then clock speed fall and frame time worsen, or does the game hitch first while temperature remains steady? The second pattern makes heat a weaker immediate explanation. On laptops, compare the manufacturer performance profile and AC-power behavior; on desktops, check unobstructed intake/exhaust, fan operation, dust, and whether the case changes when the side panel is temporarily removed for diagnosis.'
      ],
      table: {
        caption: 'What GPU thermal readings should be interpreted together',
        headers: ['Observed pattern', 'Possible interpretation', 'Next check'],
        rows: [
          ['Temperature rises but clocks and performance remain stable', 'May be normal behavior for that GPU under load', 'Compare with the exact manufacturer guidance'],
          ['Temperature rises, clocks drop, and FPS declines', 'Thermal limiting is plausible', 'Check fan response, dust, airflow, and power profile'],
          ['High fan noise but moderate GPU temperature', 'Case airflow, CPU heat, fan curve, or another component may be involved', 'Compare CPU/GPU sensors and fan behavior together'],
          ['Artifacts or sudden shutdowns', 'Potential stability or hardware problem beyond temperature alone', 'Stop repeated stress tests and inspect system evidence']
        ]
      },
      relatedLinks: [
        { label: 'GPU at 100% usage', href: '/gpu-100-percent-usage-gaming', description: 'Separate ordinary GPU load from a performance issue that needs investigation.' },
        { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Check whether heat correlates with the actual frame-time problem.' }
      ]
    }]
  },
  'pc-power-supply-problems-symptoms': {
    updatedAt: '2026-10-10',
    seoTitle: 'PC Power Supply Problems: Signs and Tests',
    metaDescription: 'Learn which PC shutdown patterns can implicate a PSU, what to check safely, and why symptoms alone cannot confirm power-supply failure.',
    sources: [
      { label: 'Seasonic: GPU and PSU failure symptoms', url: 'https://seasonic.com/pl/insights/gpu-and-psu-failure-symptoms/' },
      { label: 'Seasonic: Common mistakes when calculating PSU wattage', url: 'https://seasonic.com/insights/power-supply-calculator-errors/' }
    ],
    sections: [{
      heading: 'PSU symptoms are clues; do not open the power supply',
      paragraphs: [
        'A sudden shutdown under load can be consistent with a power-delivery problem, but temperature, GPU/CPU instability, faulty cabling, motherboard issues, memory errors and software crashes can overlap. Build a timeline: did the system lose power instantly, restart, blue-screen, or return to the desktop? Does the fault happen only when the GPU load rises, or also at idle and during startup?',
        'Check the external power path first: outlet, power strip, AC lead, PSU switch, and securely seated component power connectors if you are comfortable working inside a PC and the system is fully unplugged. If the power supply is modular, use only cables specified for that exact PSU; cables from another unit may have incompatible pinouts even when they fit. Never open a PSU enclosure because hazardous charge can remain after it is unplugged.'
      ],
      table: {
        caption: 'Separate a PSU lead from similar symptoms',
        headers: ['Symptom', 'Other causes to consider', 'Safe next evidence'],
        rows: [
          ['Instant power loss during demanding games', 'PSU, GPU power, thermal protection, outlet/cabling', 'Record load and temperature; inspect external cabling and system logs'],
          ['Game closes but Windows stays running', 'Game files, driver, unstable tuning, RAM', 'Validate game files and inspect matching application errors'],
          ['Blue screen under mixed workloads', 'Driver, RAM, CPU/GPU, storage, firmware', 'Record stop code and test components systematically'],
          ['Restart after a hardware upgrade', 'Connector seating, load headroom, BIOS/settings, component fit', 'Verify model-specific power and connector requirements']
        ]
      },
      relatedLinks: [
        { label: 'GPU overheating', href: '/gpu-overheating-gaming-pc-causes-fix', description: 'Check whether temperature and clock behavior align with the shutdown.' },
        { label: 'PC games crashing', href: '/pc-games-crashing-to-desktop-troubleshooting', description: 'Separate application crashes from system-wide power loss or a blue screen.' }
      ]
    }],
    faq: [{ question: 'Can I confirm a PSU fault from a shutdown symptom alone?', answer: 'No. Shutdown under load can implicate power delivery, but temperatures, cabling, GPU behavior, memory, and the motherboard can produce overlapping symptoms. Confirmation requires systematic testing or a qualified hardware check.' }]
  },
  'gaming-laptop-upgradeable-ram-ssd': {
    updatedAt: '2026-10-10',
    seoTitle: 'Can You Upgrade a Gaming Laptop? Check RAM and SSD',
    metaDescription: 'Check a gaming laptop’s exact service manual for soldered RAM, SODIMM slots, M.2 storage, supported capacities and safe upgrade limits.',
    sources: [
      { label: 'Intel: Extreme Memory Profile (XMP)', url: 'https://www.intel.com/content/www/us/en/gaming/extreme-memory-profile-xmp.html' },
      { label: 'Microsoft Learn: Overview of Disk Management', url: 'https://learn.microsoft.com/en-us/windows-server/storage/disk-management/overview-of-disk-management' }
    ],
    sections: [{
      heading: 'Use the full model number and service manual—not the laptop family name',
      paragraphs: [
        'Two laptops in the same marketing family can have different motherboards, memory arrangements, storage slots, or maximum supported configurations. Find the complete model or SKU and use the manufacturer’s specification and service manual to determine which components are replaceable. Do not assume that a visible access panel means both RAM and storage are upgradeable.',
        'For memory, confirm whether it is soldered, how many SODIMM slots exist, the supported memory generation and capacity, and any module arrangement requirements. For storage, confirm the slot count, SATA or PCIe/NVMe support, module length, physical clearance, and whether the manufacturer restricts the supported configuration. Back up important files and understand the warranty/service conditions before opening the device.'
      ],
      table: {
        caption: 'Laptop upgrade checklist',
        headers: ['Part', 'Confirm', 'Common mistake'],
        rows: [
          ['RAM', 'Soldered vs SODIMM, free slots, capacity and generation', 'Buying desktop DIMMs or a DDR generation the laptop cannot use'],
          ['SSD', 'Interface, M.2 length, slot count and clearance', 'Assuming every M.2 drive is supported'],
          ['Cooling and battery', 'Service procedure and safe disconnection requirements', 'Working on the laptop while powered or connected to AC'],
          ['Software migration', 'Verified backup, recovery key and install/clone plan', 'Replacing the boot drive without a recoverable backup']
        ]
      },
      relatedLinks: [
        { label: 'Laptop NVMe compatibility', href: '/laptop-nvme-ssd-upgrade-compatibility', description: 'Check SSD interface, physical size, slot and thermal requirements before ordering.' },
        { label: 'How much RAM do you need?', href: '/how-much-ram-do-you-need-gaming', description: 'Decide whether the workload needs more capacity before buying modules.' },
        { label: 'DDR4 vs DDR5 RAM', href: '/ddr4-vs-ddr5-ram-difference', description: 'Understand memory-generation compatibility and trade-offs.' }
      ]
    }]
  },
  'ddr4-vs-ddr5-ram-difference': {
    updatedAt: '2026-10-10',
    seoTitle: 'DDR4 vs DDR5 RAM: Differences Explained',
    metaDescription: 'Compare DDR4 and DDR5 compatibility, bandwidth, latency, platform cost and real workload benefits before buying memory or a new PC.',
    sources: [
      { label: 'Intel: Extreme Memory Profile (XMP)', url: 'https://www.intel.com/content/www/us/en/gaming/extreme-memory-profile-xmp.html' },
      { label: 'Intel: How to check XMP compatibility', url: 'https://www.intel.com/content/www/us/en/support/articles/000060130/processors.html' }
    ],
    sections: [{
      heading: 'Compare the full platform cost, not the memory kit in isolation',
      paragraphs: [
        'DDR4 and DDR5 are not interchangeable in a typical consumer motherboard. Decide based on the motherboard and CPU you own or plan to buy before comparing frequency or timings. A switch from an existing DDR4 platform to DDR5 usually involves a compatible motherboard and sometimes a CPU change, so the total platform cost may outweigh a small memory-only performance gain.',
        'For a controlled performance comparison, keep the CPU, GPU, game scene, graphics settings, and background workload the same where possible; change only the memory configuration. Report average FPS and frame-time or 1% low behavior across repeat runs rather than generalizing from a single benchmark. Differences vary by application and platform, so a headline transfer rate is not a universal FPS prediction.'
      ],
      table: {
        caption: 'A practical DDR4 versus DDR5 decision',
        headers: ['Situation', 'What to prioritize', 'Usually avoid'],
        rows: [
          ['Upgrading an existing working PC', 'Compatible capacity and platform support', 'Replacing the whole platform solely for a memory-generation label'],
          ['Building a new PC', 'Total CPU/motherboard/RAM price and workload performance', 'Comparing RAM kits without the platform context'],
          ['Gaming system already GPU-limited', 'GPU settings and stable capacity first', 'Assuming faster memory will substantially lift FPS'],
          ['Memory instability after enabling XMP', 'Return to stable defaults and validate compatibility', 'Increasing voltage or timings without a recovery plan']
        ]
      },
      relatedLinks: [
        { label: 'How much RAM do you need?', href: '/how-much-ram-do-you-need-gaming', description: 'Choose a useful capacity for your actual workloads first.' },
        { label: 'Test RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Check stability after an upgrade or memory-profile change.' }
      ]
    }]
  },
  'how-much-ram-do-you-need-gaming': {
    updatedAt: '2026-10-10',
    seoTitle: 'How Much RAM Do You Need for Gaming?',
    metaDescription: 'Choose 16GB, 32GB or 64GB RAM by workload. Learn how to spot memory pressure and avoid buying extra capacity that will not fix another bottleneck.',
    sources: [
      { label: 'Intel: Extreme Memory Profile (XMP)', url: 'https://www.intel.com/content/www/us/en/gaming/extreme-memory-profile-xmp.html' },
      { label: 'Intel: How to check XMP compatibility', url: 'https://www.intel.com/content/www/us/en/support/articles/000060130/processors.html' }
    ],
    sections: [{
      heading: 'Measure memory pressure before deciding to upgrade',
      paragraphs: [
        'Check RAM use during the workload that actually feels slow: launch the game, load the usual map, keep your normal browser/voice-chat/streaming applications open, and observe available memory, committed memory, and responsiveness. Repeat the observation after closing one known heavy application. If the system becomes responsive again, background workload may be contributing; if a game is GPU-limited or storage latency is high, adding RAM will not address that bottleneck by itself.',
        'Capacity targets are practical starting points, not universal rules. 16GB can remain adequate for lighter gaming and modest multitasking; 32GB gives more headroom for modern games plus a wider background workload; 64GB is mainly justified by heavier creation workloads, virtual machines, large projects, or unusually intensive multitasking. Check requirements for the exact software you use and preserve budget for the components that actually limit performance.'
      ],
      table: {
        caption: 'How to evaluate a RAM-capacity choice',
        headers: ['Workload pattern', 'Capacity to investigate first', 'Evidence to collect'],
        rows: [
          ['One game plus everyday background apps', 'Compare 16GB and 32GB against the title and system load', 'Available memory, paging symptoms, frame-time behavior'],
          ['Gaming plus streaming, heavy browser use or creation apps', '32GB may offer practical headroom', 'Peak concurrent usage and whether closing apps improves performance'],
          ['Virtual machines, large media projects, specialist workloads', 'Consider 64GB or workload-specific needs', 'Application requirements and peak working set/committed memory'],
          ['High FPS but stutters or crashes', 'Do not assume capacity is the cause', 'GPU/CPU limits, driver timing, thermals and memory stability']
        ]
      },
      relatedLinks: [
        { label: 'DDR4 vs DDR5', href: '/ddr4-vs-ddr5-ram-difference', description: 'Check the memory generation your CPU and motherboard support.' },
        { label: 'Test RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Use a stability test if crashes or stop codes accompany memory symptoms.' },
        { label: 'Low FPS diagnosis', href: '/pc-game-low-fps-how-to-find-the-cause', description: 'Separate memory pressure from a CPU or GPU performance limit.' }
      ]
    }]
  },
  'gpu-frame-time-spikes-causes-fix': {
    updatedAt: '2026-10-10',
    seoTitle: 'GPU Frame-Time Spikes: Find the Cause',
    metaDescription: 'Use repeatable frame-time captures and GPU, CPU, temperature and storage metrics to investigate stutter without guessing from average FPS.',
    sources: [
      { label: 'NVIDIA FrameView User Guide', url: 'https://images.nvidia.com/content/geforce/technologies/frameview/frameview-1-4-user-guide-web-version.pdf' },
      { label: 'AMD: Monitor Performance Metrics with Adrenalin Edition', url: 'https://www.amd.com/en/resources/support-articles/faqs/DH3-038.html' }
    ],
    sections: [{
      heading: 'Capture the same scene before comparing fixes',
      paragraphs: [
        'A frame-time graph is most useful when the workload is repeatable. Use the same game version, scene, camera path, graphics settings, resolution, frame cap and capture duration. Warm the scene consistently between runs, and record any driver or configuration change. If the test conditions change each time, small differences can be normal variation rather than evidence that a fix worked.',
        'Inspect what happens around a spike rather than only its maximum. A GPU utilization drop may mean the GPU is waiting on CPU work, asset streaming, compilation, or another dependency; a steady high GPU load during a longer frame can indicate a rendering-heavy event. Overlay data is a clue to correlate, not a guaranteed identification of the cause.'
      ],
      table: {
        caption: 'Frame-time patterns and the next investigation',
        headers: ['Pattern in repeated runs', 'Investigate', 'Do not assume'],
        rows: [
          ['Hitch repeats at the first encounter with an effect', 'Shader compilation or game-specific first-use work', 'That every repeated hitch is shader compilation'],
          ['Hitch repeats while entering a new area', 'Asset streaming, storage and game-engine behavior', 'That the SSD is failing'],
          ['GPU use drops as frame time spikes', 'CPU thread load, background tasks and streaming', 'That a low GPU percentage means the GPU is defective'],
          ['Hitch follows rising temperature and falling clocks', 'Thermal or power limiting', 'That temperature alone proves a hardware fault'],
          ['Spikes occur randomly across different games', 'Driver, background software, power, thermal and stability tests', 'That one game setting explains the whole system']
        ]
      },
      relatedLinks: [
        { label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer', description: 'Analyze compatible frame-time data with the tool’s documented assumptions.' },
        { label: 'Shader compilation stutter', href: '/shader-compilation-stutter-pc-games', description: 'Compare first-use stutter with recurring instability.' },
        { label: 'Low FPS diagnosis', href: '/pc-game-low-fps-how-to-find-the-cause', description: 'Use controlled settings changes to look for the main performance limit.' }
      ]
    }]
  },
  'shader-compilation-stutter-pc-games': {
    updatedAt: '2026-10-10',
    seoTitle: 'Shader Compilation Stutter in PC Games',
    metaDescription: 'Recognize likely shader compilation stutter, distinguish it from asset streaming or system instability, and compare repeatable game runs safely.',
    sources: [
      { label: 'NVIDIA FrameView User Guide', url: 'https://images.nvidia.com/content/geforce/technologies/frameview/frameview-1-4-user-guide-web-version.pdf' },
      { label: 'AMD: Monitor Performance Metrics with Adrenalin Edition', url: 'https://www.amd.com/en/resources/support-articles/faqs/DH3-038.html' }
    ],
    sections: [{
      heading: 'Use first-run versus repeat-run behavior as a diagnostic clue',
      paragraphs: [
        'Shader compilation is more plausible when a hitch appears as the game first encounters a particular visual effect, material, area or rendering path, and that specific hitch becomes less frequent after the relevant content has been visited again. The pattern differs by game, graphics API, driver, and how the game manages its shader cache, so one brief test cannot prove the cause.',
        'Repeat the same route and record whether the spike happens at the same moment, whether GPU utilization drops, and whether CPU activity or storage access changes. If identical hitches continue on every run, investigate asset streaming, background tasks, CPU limits, thermal behavior, overlays and driver changes before clearing caches or reinstalling software. Cache deletion can make the next run worse while shaders are rebuilt.'
      ],
      table: {
        caption: 'Distinguish common causes of gaming stutter',
        headers: ['Observation', 'More plausible lead', 'Next comparison'],
        rows: [
          ['First visit hitches; later passes improve', 'Shader or first-use compilation', 'Compare another repeat pass under the same conditions'],
          ['Hitch when crossing into new areas', 'Asset streaming or game-engine loading', 'Observe storage and CPU activity during the event'],
          ['Stutter starts immediately after a driver update', 'Driver regression or changed cache behavior', 'Compare driver history and use a controlled rollback if justified'],
          ['Hitches vary across unrelated games and workloads', 'System, background software, power or thermal issue', 'Capture system metrics and test one variable at a time']
        ]
      },
      relatedLinks: [
        { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Correlate individual spikes with GPU utilization, clocks, CPU activity and temperatures.' },
        { label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer', description: 'Inspect compatible captures instead of relying on the average FPS counter.' },
        { label: 'PC game stuttering guide', href: '/pc-game-stuttering-fix-frame-time', description: 'Use the broader diagnostic sequence when the symptom is not limited to first-use events.' }
      ]
    }]
  }
};

for (const [slug, authority] of [...Object.entries(authorityEnrichments), ...Object.entries(additionalAuthorityEnrichments)]) {
  const existing = enhancements[slug];
  if (!existing) {
    enhancements[slug] = authority;
    continue;
  }
  enhancements[slug] = {
    ...existing,
    sections: [...existing.sections, ...authority.sections],
    faq: [...(existing.faq ?? []), ...(authority.faq ?? [])],
    relatedArticles: Array.from(new Set([...(existing.relatedArticles ?? []), ...(authority.relatedArticles ?? [])])),
    sources: [...(existing.sources ?? []), ...(authority.sources ?? [])].filter((source, index, all) => all.findIndex(item => item.url === source.url) === index),
    seoTitle: authority.seoTitle ?? existing.seoTitle,
    metaDescription: authority.metaDescription ?? existing.metaDescription,
    updatedAt: authority.updatedAt ?? existing.updatedAt
  };
}


/**
 * Concise search titles for pages whose full editorial headline would create an
 * unnecessarily long title tag after the site-name suffix is appended. The
 * descriptive H1 and article URL remain unchanged.
 */
const seoMetadataOverrides: Record<string, { seoTitle: string; metaDescription?: string }> = {
  'windows-11-wifi-connected-no-internet': {
    seoTitle: 'Windows Connected but No Internet',
    metaDescription: 'Windows says connected but there is no internet? Test the router, IP configuration, DNS, VPN and adapter in a safe order.'
  },
  'windows-11-dns-not-working-how-to-fix': { seoTitle: 'Windows 11 DNS Not Working' },
  'windows-11-network-adapter-reset-guide': { seoTitle: 'Windows 11 Network Reset: When to Use It' },
  'pc-game-stuttering-fix-frame-time': {
    seoTitle: 'PC Game Stuttering: Diagnose the Cause',
    metaDescription: 'Diagnose PC game stutter by separating frame-time spikes from low FPS, shader work, CPU/GPU limits, storage activity and thermals.'
  },
  'gpu-frame-time-spikes-causes-fix': { seoTitle: 'GPU Frame-Time Spikes: Diagnose Stutter' },
  'shader-compilation-stutter-pc-games': { seoTitle: 'Shader Compilation Stutter: PC Games' },
  'nvme-ssd-temperature-too-high': { seoTitle: 'NVMe SSD Temperature: Normal or Too Hot?' },
  'why-ssd-is-slowing-down-windows': { seoTitle: 'Why an SSD Slows Down Over Time' },
  'how-to-check-ram-for-errors-windows': { seoTitle: 'How to Test RAM for Errors' },
  'windows-11-blue-screen-stop-code-how-to-read': { seoTitle: 'Windows 11 Blue Screen Stop Codes' },
  'windows-11-freezing-randomly-causes-fix': { seoTitle: 'Windows 11 Freezing: Find the Cause' },
  'microsoft-windows-surface-event-october-7-what-to-watch': { seoTitle: 'Microsoft Windows Event: What to Watch' },
  'best-gaming-laptops': { seoTitle: 'Best Gaming Laptops: Buying Guide' },
  'best-gaming-monitors': { seoTitle: 'Best Gaming Monitors: Buying Guide' },
  'best-ram': { seoTitle: 'Best RAM for Gaming PCs' },
  'windows/windows-update-stuck': { seoTitle: 'Windows Update Stuck: What to Do' },
  'windows-11-unknown-device-device-manager': { seoTitle: 'Unknown Device in Device Manager' },
  'pc-games-crashing-to-desktop-troubleshooting': { seoTitle: 'PC Games Crashing to Desktop: Diagnose' },
  'gpu-overheating-gaming-pc-causes-fix': { seoTitle: 'GPU Overheating: Causes and Fixes' },
  'ssd-nearly-full-windows-performance': { seoTitle: 'How Much Free Space Does an SSD Need?' },
  'laptop-nvme-ssd-upgrade-compatibility': { seoTitle: 'Laptop NVMe SSD: Compatibility Checklist' },
  'gaming-laptop-upgradeable-ram-ssd': { seoTitle: 'Can You Upgrade a Gaming Laptop?' },
  'research/ssd-nearly-full-what-really-changes': { seoTitle: 'SSD Nearly Full: Research Findings' },
  'research/windows-100-percent-disk-usage-low-mbps': { seoTitle: 'Windows 100% Disk Usage: Research' },
  'research/what-actually-causes-pc-game-stuttering': { seoTitle: 'Causes of PC Game Stuttering: Research' },
  'research/does-more-ram-make-windows-faster': { seoTitle: 'Does More RAM Make Windows Faster?' },
  'research/how-ssd-temperature-affects-performance': { seoTitle: 'SSD Temperature and Performance: Research' },
  'windows-troubleshooting-complete-guide': { seoTitle: 'Windows Troubleshooting: Complete Guide' }
};

export function enhanceArticles(baseArticles: Article[]): Article[] {
  return baseArticles.map(article => {
    const enhancement = enhancements[article.slug];
    const seoOverride = seoMetadataOverrides[article.slug];
    if (!enhancement && !seoOverride) return article;

    const existingHeadings = new Set(article.content.map(section => section.heading));
    const addedSections = enhancement
      ? enhancement.sections.filter(section => !section.heading || !existingHeadings.has(section.heading))
      : [];
    const mergedSources = [...(article.sources ?? []), ...(enhancement?.sources ?? [])]
      .filter((source, index, all) => all.findIndex(item => item.url === source.url) === index);

    return {
      ...article,
      updatedAt: enhancement ? (enhancement.updatedAt ?? '2026-10-08') : article.updatedAt,
      seoTitle: seoOverride?.seoTitle ?? enhancement?.seoTitle ?? article.seoTitle,
      metaDescription: seoOverride?.metaDescription ?? enhancement?.metaDescription ?? article.metaDescription,
      sources: mergedSources.length ? mergedSources : article.sources,
      content: [...article.content, ...addedSections],
      faq: [...(article.faq ?? []), ...(enhancement?.faq ?? [])],
      relatedArticles: enhancement?.relatedArticles
        ? Array.from(new Set([...(article.relatedArticles ?? []), ...enhancement.relatedArticles]))
        : article.relatedArticles
    };
  });
}
