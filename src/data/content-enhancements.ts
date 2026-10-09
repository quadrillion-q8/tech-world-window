import type { Article, ArticleSection } from './articles';

type Enhancement = {
  sections: ArticleSection[];
  faq?: { question: string; answer: string }[];
  relatedArticles?: string[];
  updatedAt?: string;
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

for (const [slug, authority] of Object.entries(authorityEnrichments)) {
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
    updatedAt: authority.updatedAt ?? existing.updatedAt
  };
}

export function enhanceArticles(baseArticles: Article[]): Article[] {
  return baseArticles.map(article => {
    const enhancement = enhancements[article.slug];
    if (!enhancement) return article;

    const existingHeadings = new Set(article.content.map(section => section.heading));
    const addedSections = enhancement.sections.filter(section => !section.heading || !existingHeadings.has(section.heading));

    return {
      ...article,
      updatedAt: enhancement.updatedAt ?? '2026-10-08',
      content: [...article.content, ...addedSections],
      faq: [...(article.faq ?? []), ...(enhancement.faq ?? [])],
      relatedArticles: enhancement.relatedArticles
        ? Array.from(new Set([...(article.relatedArticles ?? []), ...enhancement.relatedArticles]))
        : article.relatedArticles
    };
  });
}
