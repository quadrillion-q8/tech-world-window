import type { Article } from './articles';

/**
 * Universal Gaming pillar: a symptom-first route through performance, frame pacing,
 * crashes, thermals and the hardware or software layers that can affect a game.
 */
export const gamingPerformancePillar: Article = {
  id: 'gaming-performance-complete',
  slug: 'pc-gaming-performance-complete-guide',
  title: 'PC Gaming Performance: A Complete Guide to FPS, Stutter and Crashes',
  seoTitle: 'PC Gaming Troubleshooting: FPS, Stutter & Crashes',
  dek: 'Diagnose low FPS, uneven frame times, shader stutter, game crashes, GPU limits and heat with a repeatable process. Identify the failing layer before changing drivers, settings or hardware.',
  metaDescription: 'Fix PC gaming performance problems with a symptom-first guide to low FPS, stutter, frame-time spikes, crashes, heat and bottlenecks.',
  excerpt: 'Start with what the game is actually doing: low average FPS, uneven frame delivery, a crash, a temperature or clock drop, or network delay. Measure a repeatable scene, change one variable at a time, and follow the evidence before buying parts or reinstalling everything.',
  category: 'Gaming',
  subcategory: 'Performance & Troubleshooting',
  authorId: 'imranNatiq',
  publishedAt: '2026-10-25',
  updatedAt: '2026-10-25',
  readingTime: 18,
  tags: ['PC Gaming', 'Gaming Performance', 'Low FPS', 'Game Stutter', 'Frame Time', 'Shader Compilation', 'Game Crashes', 'GPU Bottleneck', 'Troubleshooting'],
  featured: true,
  contentRole: 'pillar',
  pillarPath: '/gaming',
  searchIntent: 'informational',
  relatedArticles: [
    'gaming-stutter',
    'gpu-frame-time-spikes',
    'shader-compilation-stutter',
    'gaming-low-fps',
    'gaming-crashes-desktop',
    'gaming-gpu-100-percent',
    'gpu-overheating',
    'psu-failure-symptoms',
    'check-ram-for-errors',
    'nvme-temperature',
    'gaming-laptop-upgrade-check',
    'research-gaming-stutter',
    'gamebar-presence-writer-fix',
    'why-8gb-ram-no-longer-enough-windows-11',
  ],
  testing: 'This is an evidence-led troubleshooting framework, not a claim that TWW benchmark-tested every game, driver, GPU or PC configuration. Tools and sensor availability vary. Compare repeatable runs on the same system and treat correlations as clues rather than proof of a root cause.',
  sources: [
    { label: 'PresentMon — frame-time and performance telemetry', url: 'https://github.com/GameTechDev/PresentMon' },
    { label: 'CapFrameX — capture and frame-time analysis', url: 'https://www.capframex.com/' },
    { label: 'NVIDIA — PC latency and gaming performance resources', url: 'https://www.nvidia.com/en-us/geforce/technologies/reflex/' },
    { label: 'Microsoft Support — Windows gaming and graphics help', url: 'https://support.microsoft.com/windows' },
  ],
  content: [
    {
      heading: 'Start here: identify the symptom before choosing a fix',
      paragraphs: [
        'Gaming performance is not one number. Low average frames per second (FPS), uneven frame delivery, repeated shader-compilation hitches, a game that closes to the desktop, thermal throttling, and online latency can feel similar while needing different tests. Begin by describing exactly what happens and when.',
        'Use the table to select a focused route. If the problem began after one specific update, setting change, overclock or hardware upgrade, record that change first. Avoid applying a long list of tweaks at once because it becomes impossible to tell which one mattered.'
      ],
      table: {
        caption: 'Choose a troubleshooting path from the symptom you can reproduce',
        headers: ['What you notice', 'First useful check', 'Follow this guide'],
        rows: [
          ['Low FPS throughout a scene', 'Record resolution, graphics preset, frame rate and CPU/GPU behavior', { text: 'Find the real FPS bottleneck', href: '/pc-game-low-fps-how-to-find-the-cause' }],
          ['Brief hitches or microstutter while average FPS looks fine', 'Capture frame times across a repeatable route', { text: 'Diagnose PC game stuttering', href: '/pc-game-stuttering-fix-frame-time' }],
          ['A sharp spike when entering a new area or first running a scene', 'Repeat the same scene and compare first-run with later runs', { text: 'Understand shader compilation stutter', href: '/shader-compilation-stutter-pc-games' }],
          ['A GPU frame-time spike or irregular delivery', 'Compare GPU load, clocks, temperature and the captured frame-time trace', { text: 'Investigate GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix' }],
          ['GPU usage stays near 100%', 'Check whether FPS and frame delivery meet your target before treating utilization as a fault', { text: 'Interpret 100% GPU usage', href: '/gpu-100-percent-usage-gaming' }],
          ['The game crashes or freezes', 'Record the error, game version, recent changes and Reliability Monitor events', { text: 'Troubleshoot game crashes', href: '/pc-games-crashing-to-desktop-troubleshooting' }],
          ['Performance falls as the session continues', 'Log temperatures, effective clocks, power behavior and fan response over time', { text: 'Check GPU overheating', href: '/gpu-overheating-gaming-pc-causes-fix' }],
          ['A game feels delayed online but local FPS is stable', 'Separate ping, packet loss and server behavior from local frame-time data', { text: 'Start with Windows troubleshooting', href: '/windows-troubleshooting-complete-guide' }],
        ],
      },
    },
    {
      heading: 'Build a baseline you can trust',
      paragraphs: [
        'Before changing settings, choose a repeatable in-game scene or built-in benchmark and capture what happens for long enough to include the symptom. Record the game and version, resolution, graphics preset, upscaling or frame-generation settings, display refresh rate, frame cap, driver version and whether the first run differs from later runs.',
        'Keep the comparison fair: use the same scene, camera route, power mode and background applications. Change one setting or component at a time, repeat the capture, and restore it if the result is not consistent. A single run can be affected by downloads, compilation, weather or crowd variation, background tasks and normal measurement noise.',
        'Average FPS describes throughput over a period. Frame times describe how long each frame took. A sequence of mostly short frames with a few long frames can deliver a high average FPS while still producing visible hitches. Percentile lows summarize the slow end of a capture, but they do not identify the cause by themselves.'
      ],
      steps: [
        'Write down the exact symptom and the point in the game where it occurs.',
        'Capture a baseline before editing graphics options, drivers, overlays or power settings.',
        'Check whether the symptom repeats in the same scene, in a second game, and after a clean restart.',
        'Make one reversible change, then repeat the same capture and compare both the result and the conditions.',
        'Keep the original capture and notes so a later change can be compared against the same baseline.'
      ],
      relatedLinks: [
        { label: 'Free Frame-Time Analyzer', href: '/tools/frame-time-analyzer', description: 'Analyze compatible PresentMon, CapFrameX and NVIDIA FrameView CSV captures in the browser.' },
        { label: 'What actually causes PC game stuttering?', href: '/research/what-actually-causes-pc-game-stuttering', description: 'Read the deeper frame-time investigation and its methodological limits.' }
      ]
    },
    {
      heading: 'Low FPS: test the workload before calling it a bottleneck',
      paragraphs: [
        'Low FPS means the system is not producing frames as quickly as you want, but it does not automatically mean the GPU is weak or the CPU is too slow. Resolution, ray tracing, render scale, game-engine limits, background work, temperature, memory pressure and power settings can all influence the result.',
        'Compare behavior at the same scene and target. A lower resolution or graphics setting can help establish whether graphics workload is a major factor, but it is a diagnostic comparison—not proof that a GPU upgrade is the best purchase. CPU limits can vary by game and scene, and total CPU utilization can hide a saturated main thread.',
        'Full GPU utilization is often normal when the game is rendering as fast as it can under the chosen settings. Look for whether utilization aligns with the expected workload, whether clocks remain stable, whether the target frame rate is reached and whether there are accompanying temperature, power or frame-time anomalies.'
      ],
      table: {
        caption: 'Evidence that can help narrow a low-FPS problem',
        headers: ['Observation', 'What it may indicate', 'Next step'],
        rows: [
          ['FPS rises substantially when resolution or render scale is reduced', 'Graphics workload may be an important limit in that scene', { text: 'Check low-FPS diagnosis', href: '/pc-game-low-fps-how-to-find-the-cause' }],
          ['One CPU thread is saturated while GPU load varies or stays below expected levels', 'A CPU or game-thread limit may be relevant', { text: 'Use the bottleneck calculator as a planning aid', href: '/tools/pc-bottleneck-calculator' }],
          ['GPU is fully utilized and frame delivery is consistent', 'The GPU may be working normally at the chosen settings', { text: 'Interpret GPU utilization correctly', href: '/gpu-100-percent-usage-gaming' }],
          ['FPS drops along with falling clocks and rising temperatures', 'Thermal, power or platform limits need investigation', { text: 'Check GPU temperature behavior', href: '/gpu-overheating-gaming-pc-causes-fix' }],
          ['Performance worsens while RAM use, paging or asset loading spikes', 'System memory or storage activity may contribute', { text: 'Check RAM errors and stability', href: '/how-to-check-ram-for-errors-windows' }],
        ],
      },
    },
    {
      heading: 'Stutter and frame-time spikes: find when the long frame occurs',
      paragraphs: [
        'Stutter is a visible interruption in otherwise continuous motion. The useful question is not merely whether FPS dipped, but when long frames appear and what else was happening at that moment. A trace can show whether the problem is isolated or repeated, but frame times alone do not name the responsible process or component.',
        'Hitches concentrated around first-time effects, new areas or newly encountered assets can be consistent with shader compilation or asset streaming. Persistent spikes after every restart, spikes tied to thermal changes, and spikes that appear after an overlay or driver change point toward different tests. Repeat the same sequence before concluding that a shader cache, driver or game setting is responsible.',
        'Do not routinely delete shader caches, disable unrelated Windows services or apply latency tweaks from a checklist. Those changes may reset useful state or introduce new variables. Test only a change that matches the observed symptom and keep a way to restore the original configuration.'
      ],
      relatedLinks: [
        { label: 'PC game stuttering and microstutter', href: '/pc-game-stuttering-fix-frame-time', description: 'Use the dedicated guide for frame pacing, repeated spikes and microstutter.' },
        { label: 'Shader compilation stutter', href: '/shader-compilation-stutter-pc-games', description: 'Compare first-run hitches with repeat runs and avoid premature cache deletion.' },
        { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix', description: 'Correlate spikes with telemetry without assuming the GPU is always at fault.' }
      ]
    },
    {
      heading: 'Crashes, freezes and instability need a different path',
      paragraphs: [
        'A game that closes to the desktop, freezes indefinitely, resets the graphics driver or crashes the whole PC should be investigated as a stability problem, not treated as ordinary low FPS. Record the exact error text, any crash code, the time of the failure, the game version and recent driver, firmware or hardware changes.',
        'Start with the game files and supported launcher repair options, then check whether the failure is reproducible in one title or across several demanding workloads. Reliability Monitor and relevant Windows event records can provide timing and module details, but one warning or Kernel-Power entry does not prove that the power supply is defective.',
        'If the problem began after enabling a CPU/GPU overclock, undervolt, XMP/EXPO memory profile or overlay, return to a known-stable configuration and retest. If errors occur across multiple games or the system also shows blue screens, memory errors or unexpected restarts, investigate system stability instead of reinstalling the game repeatedly.'
      ],
      steps: [
        'Save the exact crash message or stop code and note the time.',
        'Remove optional overlays or injected monitoring features one at a time for a controlled comparison.',
        'Verify game files using the launcher’s supported function and check for a game-specific known issue.',
        'Temporarily return overclocked or undervolted hardware to manufacturer/default settings before retesting.',
        'If the whole PC resets, inspect the events just before the restart and check temperatures, memory stability and power-related symptoms together.',
        'Protect important files before running stress tests or making firmware changes on an unstable system.'
      ],
      relatedLinks: [
        { label: 'Game crashes to desktop', href: '/pc-games-crashing-to-desktop-troubleshooting', description: 'Follow a step-by-step path for a game that repeatedly crashes or freezes.' },
        { label: 'PC power-supply problems', href: '/pc-power-supply-problems-symptoms', description: 'Review safe PSU warning signs when the entire system loses power or restarts under load.' },
        { label: 'Check RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Test memory stability when crashes or stop codes cross application boundaries.' }
      ]
    },
    {
      heading: 'Thermals, clocks and power: interpret the trend, not one reading',
      paragraphs: [
        'Temperature readings are model- and sensor-specific. A GPU core temperature, hotspot, memory junction and laptop CPU package value are different measurements and have different limits. Compare the correct sensor with manufacturer documentation and look at the trend alongside effective clocks, fan behavior, power draw and the moment performance changes.',
        'If the system performs well when cool but slows after several minutes, capture a longer session. Dust, restricted airflow, an aggressive laptop power profile, an unexpectedly low power limit or a cooling fault may all deserve investigation, but no single temperature screenshot identifies the cause by itself.',
        'Power-related instability deserves caution. Unexpected shutdowns under load can have several causes, including GPU spikes, overheating, cabling, motherboard behavior, RAM instability and a failing or insufficient PSU. Never open a power supply. If a hardware change has been made, check the component manufacturer’s power and connector requirements and have internal electrical work handled safely.'
      ],
      relatedLinks: [
        { label: 'GPU overheating while gaming', href: '/gpu-overheating-gaming-pc-causes-fix', description: 'Check sensor trends, clocks, airflow and the specific GPU model limits.' },
        { label: 'PC power-supply symptoms', href: '/pc-power-supply-problems-symptoms', description: 'Use system-level evidence instead of blaming a PSU from one restart.' }
      ]
    },
    {
      heading: 'RAM, VRAM, storage and background activity can matter',
      paragraphs: [
        'Memory capacity and memory stability are different questions. A system can run out of practical headroom when the game, browser, recording software and background applications compete for RAM; memory errors can instead cause crashes, corrupted data or unpredictable behavior. Check usage and symptoms before deciding which case fits.',
        'VRAM pressure can lead to texture changes, asset movement or inconsistent performance in some workloads, but the impact varies by game, settings and driver. Reduce texture quality as a controlled test rather than assuming a named GPU has the same usable memory in every game.',
        'Slow or unhealthy storage can affect loading, asset streaming and system responsiveness, particularly when the drive is nearly full or reports errors. Do not run unnecessary benchmarks on a drive that disappears, reports repeated errors or contains unbacked-up data. Check health and temperature first, then protect important files.'
      ],
      relatedLinks: [
        { label: 'Windows high memory usage', href: '/windows-11-high-memory-usage-how-to-find-the-cause', description: 'Separate memory pressure from a suspected memory leak.' },
        { label: 'Check SSD health in Windows', href: '/how-to-check-ssd-health-windows', description: 'Review supported health data and backup-first warning signs.' },
        { label: 'NVMe SSD running hot', href: '/nvme-ssd-temperature-too-high', description: 'Check whether drive temperatures track the slowdown or hitch.' }
      ]
    },
    {
      heading: 'Separate local frame rate from online latency',
      paragraphs: [
        'A player can have stable local FPS and still experience delayed actions, rubber-banding or missed interactions online. Those symptoms may relate to latency, jitter, packet loss, Wi-Fi quality, routing, the game server or matchmaking region rather than a GPU performance problem.',
        'Compare an offline or practice scene with the online symptom when possible. Watch in-game network statistics and test the connection separately. Avoid changing GPU drivers or buying a graphics card to solve a problem that remains when local frame delivery is smooth.'
      ],
      relatedLinks: [
        { label: 'Complete Windows troubleshooting guide', href: '/windows-troubleshooting-complete-guide', description: 'Use the wider guide when connectivity, drivers or Windows behavior may be involved.' }
      ]
    },
    {
      heading: 'A practical troubleshooting order',
      paragraphs: [
        'Use the least disruptive test that can answer the next question. A useful outcome is one that narrows the diagnosis, even if it does not solve the problem on the first try.'
      ],
      steps: [
        'Describe the symptom as low FPS, long-frame stutter, first-run hitch, crash, thermal decline or network delay.',
        'Save a baseline and record recent changes before modifying settings.',
        'Check game-specific issues and compare the same scene after a clean restart.',
        'Use capture data and available telemetry to test one plausible cause at a time.',
        'Validate temperatures, clocks, memory stability and storage health when the evidence points to the system layer.',
        'Return any change that makes no repeatable difference; do not accumulate unrelated tweaks.',
        'Consider a hardware upgrade only after the limitation is measured and the exact platform compatibility is confirmed.'
      ],
      relatedLinks: [
        { label: 'Calculate a possible PC bottleneck', href: '/tools/pc-bottleneck-calculator', description: 'Use as a planning estimate, not a substitute for in-game measurement.' },
        { label: 'Browse PC hardware diagnosis', href: '/hardware', description: 'Follow the hardware pillar when temperature, memory, storage or power evidence points outside the game.' }
      ]
    },
    {
      heading: 'Frequently asked questions',
      paragraphs: ['These answers are starting points, not universal rules for every game or hardware combination.'],
      bullets: [
        'A high average FPS does not guarantee smooth motion: a small number of long frames can still be visible as hitches.',
        '100% GPU utilization is not automatically bad; it can be normal when the GPU is the active rendering limit.',
        'A benchmark or bottleneck calculator estimates behavior. It cannot reproduce every game engine, scene, driver or system configuration.',
        'A temperature value has to be interpreted for the sensor and exact model; do not compare different sensors as if they had the same limit.',
        'If a crash or restart affects the entire PC, widen the investigation to memory, thermals, power and hardware stability.'
      ]
    }
  ],
  faq: [
    { question: 'Why does my game stutter when average FPS is high?', answer: 'Average FPS hides the timing of individual frames. A few unusually long frames can create visible hitches, so capture frame times in a repeatable scene and compare the trace with system telemetry.' },
    { question: 'Is 100% GPU usage while gaming a problem?', answer: 'Not by itself. It often means the GPU is fully occupied rendering the chosen workload. Investigate if the target performance is missed or the utilization coincides with unexpected clock drops, overheating, crashes or irregular frame delivery.' },
    { question: 'Should I reinstall Windows to fix low FPS?', answer: 'Usually not as an opening step. First identify whether the issue is game-specific, driver-related, thermal, power-related, memory-related or caused by settings and background activity. Reinstallation is disruptive and may not address hardware or workload limits.' },
    { question: 'Can a PC bottleneck calculator tell me exactly how much FPS I will get?', answer: 'No. It can help frame an upgrade question, but real FPS depends on the game, scene, resolution, settings, CPU and GPU behavior, memory, thermals, driver and software configuration.' },
    { question: 'How do I tell shader compilation stutter from another type of stutter?', answer: 'A hitch concentrated around first-time effects or areas that becomes less frequent on repeat runs can be consistent with shader compilation or asset preparation. Repeat the same route and compare captures before assuming the cache or driver is the cause.' },
    { question: 'What should I do if games crash and the PC restarts?', answer: 'Record the error and time, return optional overclocks to stable defaults, check system events and investigate temperature, RAM and power clues together. Protect important data and avoid opening a PSU.' }
  ],
};
