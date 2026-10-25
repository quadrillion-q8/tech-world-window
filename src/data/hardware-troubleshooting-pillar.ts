import type { Article } from './articles';

/**
 * Universal Hardware pillar: a symptom-first guide for diagnosing PC components
 * and confirming compatibility before an upgrade or replacement.
 */
export const hardwareTroubleshootingPillar: Article = {
  id: 'hardware-diagnostics-complete',
  slug: 'pc-hardware-troubleshooting-complete-guide',
  title: 'PC Hardware Troubleshooting: A Complete Guide to Diagnosis and Upgrades',
  seoTitle: 'PC Hardware: Diagnosis & Upgrades',
  dek: 'Find the failing layer in a desktop or laptop before replacing components. Follow safe checks for power, no display, crashes, heat, RAM, SSDs and upgrade compatibility.',
  metaDescription: 'Diagnose PC hardware problems with a practical guide to no power, no display, crashes, overheating, RAM, SSD health and safe upgrades.',
  excerpt: 'Start with the symptom and the last change, protect data, and use one safe test at a time. This guide connects power and display faults, memory and storage warnings, thermals, component compatibility and upgrade planning to the focused TWW guides for each problem.',
  category: 'Hardware',
  subcategory: 'PC Diagnosis & Upgrades',
  authorId: 'imranNatiq',
  publishedAt: '2026-10-25',
  updatedAt: '2026-10-25',
  readingTime: 19,
  tags: ['PC Hardware', 'Hardware Troubleshooting', 'PC Components', 'Laptop Upgrades', 'CPU', 'GPU', 'RAM', 'SSD', 'Power Supply', 'Compatibility'],
  featured: true,
  contentRole: 'pillar',
  pillarPath: '/hardware',
  searchIntent: 'informational',
  testing: 'This is a symptom-led diagnostic reference, not a claim that every listed part has been physically bench-tested by TWW. SMART fields, temperature sensors, firmware options and upgrade support vary by model. Follow the manufacturer documentation for the exact device and use qualified repair support where work involves electrical or battery safety.',
  sources: [
    { label: 'Microsoft Learn — Get-StorageReliabilityCounter', url: 'https://learn.microsoft.com/en-us/powershell/module/storage/get-storagereliabilitycounter?view=windowsserver2025-ps' },
    { label: 'NVM Express — specifications', url: 'https://nvmexpress.org/specifications/' },
    { label: 'JEDEC — memory standards', url: 'https://www.jedec.org/standards-documents' },
    { label: 'MemTest86 — memory diagnostic', url: 'https://www.memtest86.com/' },
  ],
  content: [
    {
      heading: 'Start here: name the symptom and protect the evidence',
      paragraphs: [
        'A PC that will not turn on, a PC that powers on with no picture, a random restart, a slow SSD and a laptop that runs hot need different diagnostic routes. Write down what the machine does, which indicators appear, the last stage reached during startup, and whether the problem began after a drop, firmware change, component upgrade, update or cleaning.',
        'If a drive disappears, reports repeated read errors, or contains the only copy of important files, prioritize backup and data recovery decisions over stress tests or repeated repair attempts. Do not reset or reinstall Windows to troubleshoot a device that has not yet been shown to be healthy.',
        'Desktop and laptop repairs can involve dangerous electrical energy, hot components and lithium-ion batteries. Never open a power supply. Disconnect external power before any work permitted by the manufacturer, do not puncture or bend a battery, and leave internal electrical or battery work to a qualified technician if you are not equipped to do it safely.'
      ],
      table: {
        caption: 'Choose a starting path based on the symptom',
        headers: ['Symptom', 'First question', 'Follow the focused guide'],
        rows: [
          ['No lights or signs of power', 'Does the outlet, charger or external power path work?', { text: 'Laptop will not turn on', href: '/laptop-wont-turn-on' }],
          ['Fans or lights start, but there is no picture', 'Does the monitor and signal path work, and does the PC reach firmware?', { text: 'PC powers on but has no display', href: '/pc-turns-on-but-no-display' }],
          ['Random restart or shutdown under load', 'Does it correlate with temperature, load, hardware change or an error event?', { text: 'PC power-supply symptoms', href: '/pc-power-supply-problems-symptoms' }],
          ['Blue screens, app crashes or instability after a memory change', 'Does the issue repeat with default memory settings and a memory test?', { text: 'Check RAM for errors', href: '/how-to-check-ram-for-errors-windows' }],
          ['Drive disappears or Windows cannot find it', 'Is the SSD detected in firmware, and is the data backed up?', { text: 'SSD not detected in BIOS or Windows', href: '/ssd-not-detected-in-bios-or-windows' }],
          ['Storage slows down or reports warnings', 'What do supported health fields and free-space readings show?', { text: 'Check SSD health', href: '/how-to-check-ssd-health-windows' }],
          ['Performance drops after the device warms up', 'Do clocks, fan behavior and temperature change with the slowdown?', { text: 'Check GPU overheating', href: '/gpu-overheating-gaming-pc-causes-fix' }],
          ['You want more memory or storage', 'What does the exact model support, and is the limitation measured?', { text: 'Check laptop NVMe upgrade compatibility', href: '/laptop-nvme-ssd-upgrade-compatibility' }],
        ],
      },
    },
    {
      heading: 'Separate power, firmware, operating system and component faults',
      paragraphs: [
        'The failure stage helps prevent unnecessary replacements. If the computer shows no sign of power, investigate the external power source, adapter or PSU path, battery state and manufacturer-specific indicators before blaming Windows. If it reaches the manufacturer logo or firmware setup, the machine has passed some early power and display checks, though it can still have a hardware fault.',
        'A crash inside Windows does not prove that Windows is the root cause. Memory instability, a storage failure, cooling problems, a graphics driver, power delivery or one defective component can all produce software-visible symptoms. Conversely, a slow application can be caused by normal workload, background activity or configuration rather than failed hardware.',
        'Look for a repeatable relationship: only under GPU load, only after warming up, only after sleep, only with one DIMM, only after an upgrade, or across several operating systems and applications. A good diagnostic test changes one condition and asks a specific question.'
      ],
      bullets: [
        'No power before firmware: investigate the external power path, battery/adapter or PSU signs, and manufacturer-specific indicators.',
        'Power with no image: check display input, cable, output port, memory seating only if safely accessible, and whether firmware appears.',
        'Failure only inside Windows: compare Safe Mode, recent drivers, event timing and device health; do not assume a reset will fix hardware.',
        'Failure across several unrelated applications or boot environments: move shared hardware, temperature, memory and power higher on the list.',
        'Failure only after adding a component: verify compatibility, installation, power connectors, firmware support and default/stable settings.'
      ],
      relatedLinks: [
        { label: 'Complete Windows troubleshooting guide', href: '/windows-troubleshooting-complete-guide', description: 'Follow the Windows-specific path after the hardware and firmware layers have been considered.' },
        { label: 'Windows blue-screen stop codes', href: '/windows-11-blue-screen-stop-code-how-to-read', description: 'Record the stop code and use it as one clue, not a stand-alone hardware verdict.' }
      ]
    },
    {
      heading: 'Power, startup and display problems',
      paragraphs: [
        'Power-on failures can originate in the outlet, adapter, battery, power button, PSU, motherboard, internal power connections or a shorted component. Use the device maker’s external reset and adapter checks where documented. Avoid opening a power supply or probing live circuits.',
        'A PC that powers on with no picture is a different symptom. Confirm the monitor input, cable and display output, then note whether any manufacturer logo or firmware screen appears. A screen that works in firmware but goes blank when Windows loads may need a graphics-driver or display-configuration investigation rather than immediate hardware replacement.',
        'Unexpected shutdowns under gaming or rendering loads are not enough on their own to condemn the PSU. Record the exact timing, temperatures, clock behavior, recent hardware changes, event records and whether the problem occurs in more than one workload. A PSU should be assessed against the connected hardware’s documented power and connector requirements.'
      ],
      relatedLinks: [
        { label: 'Laptop will not turn on', href: '/laptop-wont-turn-on', description: 'Use the safe first checks for a laptop with no apparent power.' },
        { label: 'Laptop plugged in but not charging', href: '/laptop-plugged-in-not-charging', description: 'Separate adapter, battery, firmware and charge-control symptoms.' },
        { label: 'PC turns on but has no display', href: '/pc-turns-on-but-no-display', description: 'Trace the monitor and startup stages before replacing parts.' },
        { label: 'PC power-supply problems', href: '/pc-power-supply-problems-symptoms', description: 'Review likely signs and safe next steps for power instability.' }
      ]
    },
    {
      heading: 'Storage diagnosis: health, detection, temperature and free space',
      paragraphs: [
        'Storage problems need a backup-first approach. If a drive repeatedly disappears, reports read errors, produces file corruption or is no longer detected in firmware, stop unnecessary benchmarks and protect important data before further experiments. A single healthy status field is not a guarantee that all parts of the storage path are fault-free.',
        'On supported Windows devices, SMART-related values or storage reliability counters can expose temperature, wear or error information, but the driver and controller determine which properties are available. Missing values are not proof of health, and raw vendor-specific attributes should not be compared as if every SSD used the same scale.',
        'Performance can also suffer when an SSD is nearly full, handles sustained background I/O, runs hot or is limited by the workload. These situations need different responses from a drive that is failing. Check actual free space and the timing of the slowdown; do not replace a drive solely because one benchmark score looks lower than expected.'
      ],
      table: {
        caption: 'Distinguish common storage symptoms before acting',
        headers: ['What you see', 'Check next', 'Focused guide'],
        rows: [
          ['SSD disappears from Windows or firmware', 'Confirm detection stage and protect data; inspect approved diagnostics', { text: 'SSD not detected', href: '/ssd-not-detected-in-bios-or-windows' }],
          ['Health tool warns or read errors recur', 'Back up first and compare model-supported health fields', { text: 'Check SSD health in Windows', href: '/how-to-check-ssd-health-windows' }],
          ['NVMe drive runs hot or slows under sustained work', 'Compare the right sensor with model limits and cooling behavior', { text: 'NVMe SSD temperature', href: '/nvme-ssd-temperature-too-high' }],
          ['System drive is nearly full', 'Check actual free space, temporary data and workload before upgrading', { text: 'SSD nearly full', href: '/ssd-nearly-full-windows-performance' }],
          ['SSD is slower than before', 'Inspect background activity, free space, temperature, health and link configuration', { text: 'Why an SSD may slow down', href: '/why-ssd-is-slowing-down-windows' }],
        ],
      },
      relatedLinks: [
        { label: 'How SSD temperature affects performance', href: '/research/how-ssd-temperature-affects-performance', description: 'Read the deeper explanation of drive thermal behavior and its limits.' },
        { label: 'What changes when an SSD gets nearly full?', href: '/research/ssd-nearly-full-what-really-changes', description: 'Understand capacity pressure before buying another drive.' }
      ]
    },
    {
      heading: 'RAM diagnosis: capacity is not the same as reliability',
      paragraphs: [
        'Low available memory during a real workload can cause more paging and slow application switching, but high memory use by itself does not prove the RAM is faulty. Check which applications use memory, whether the system is under pressure, and whether the slowdown coincides with disk activity.',
        'Memory errors are a different class of evidence. Repeated test errors, blue screens after a memory change or instability that follows one module or configuration deserve stability testing. XMP and EXPO profiles apply settings beyond basic defaults; if instability begins after enabling a profile, compare with the default configuration before deciding the DIMM is defective.',
        'For a RAM upgrade, verify the supported DDR generation, module type, slot layout, maximum supported capacity and platform behavior. DDR4 and DDR5 are not interchangeable. Laptops may have soldered memory, accessible modules or a combination, so general advice cannot establish upgradeability without the exact model.'
      ],
      relatedLinks: [
        { label: 'Check RAM for errors', href: '/how-to-check-ram-for-errors-windows', description: 'Choose an appropriate memory test and interpret repeatable errors.' },
        { label: 'How much RAM do you need for gaming?', href: '/how-much-ram-do-you-need-gaming', description: 'Plan capacity around the actual workload instead of a single universal number.' },
        { label: 'DDR4 vs DDR5', href: '/ddr4-vs-ddr5-ram-difference', description: 'Check platform generation and practical compatibility differences.' },
        { label: 'Does more RAM make Windows faster?', href: '/research/does-more-ram-make-windows-faster', description: 'Measure memory pressure before spending money on capacity or speed.' }
      ]
    },
    {
      heading: 'Thermals, cooling and power delivery',
      paragraphs: [
        'Temperature readings depend on the sensor and model. CPU package, GPU core, GPU hotspot, memory junction and SSD controller temperatures are different measurements and should be interpreted against the device’s documentation. Capture the temperature and clock trend during the actual symptom rather than diagnosing from an idle screenshot.',
        'If the system slows only after several minutes, inspect airflow, fan behavior, heat sinks, the laptop power profile and any clock or power-limit changes that coincide with the drop. Cleaning and repasting are not automatic first steps; they involve risk and should be guided by the exact system design and evidence.',
        'Power-delivery symptoms overlap with thermal and stability problems. Repeated restarts, shutdowns under load or black screens after a GPU upgrade can have several causes. Check approved power connectors, the PSU or adapter specification, motherboard guidance and recent changes. Never open a PSU, and do not rely on a generic wattage calculator as proof that a real configuration is stable.'
      ],
      relatedLinks: [
        { label: 'GPU overheating while gaming', href: '/gpu-overheating-gaming-pc-causes-fix', description: 'Compare sensor readings, clocks and fan behavior under a repeatable workload.' },
        { label: 'PC power-supply symptoms', href: '/pc-power-supply-problems-symptoms', description: 'Investigate system-level power clues without treating one restart as proof.' }
      ]
    },
    {
      heading: 'Compatibility checks before buying or replacing components',
      paragraphs: [
        'Compatibility is more than whether a part physically fits. Verify the exact model or motherboard revision, supported interface, firmware/BIOS requirements, cooling clearance, power connectors, maximum supported capacity and the intended workload. Laptop families often have visually similar configurations with different internal layouts.',
        'For storage, distinguish M.2 physical size from the interface supported by the slot: not every M.2 slot supports both SATA and PCIe/NVMe, and not every laptop supports every drive length or capacity. For RAM, confirm the DDR generation, physical format, platform support and whether memory is soldered. For a GPU, check case length and thickness, slot clearance, connector requirements, PSU capability and the display outputs you need.',
        'For CPUs, confirm the socket, chipset and BIOS support, power/thermal design and cooler compatibility. A compatible socket alone does not guarantee that a motherboard firmware version supports a given CPU. Use the manufacturer’s specification and support pages for the exact revision before ordering a part.'
      ],
      table: {
        caption: 'A practical compatibility checklist before ordering',
        headers: ['Component', 'Confirm first', 'Helpful next step'],
        rows: [
          ['RAM', 'DDR generation, DIMM/SO-DIMM, soldered slots, capacity and supported speed', { text: 'RAM capacity for gaming', href: '/how-much-ram-do-you-need-gaming' }],
          ['Laptop SSD', 'M.2 length, SATA versus PCIe/NVMe, slot support, capacity and access limits', { text: 'Laptop NVMe upgrade compatibility', href: '/laptop-nvme-ssd-upgrade-compatibility' }],
          ['Laptop upgrade', 'Exact model suffix, soldered RAM, free slots, warranty and service manual', { text: 'Check whether a gaming laptop is upgradeable', href: '/gaming-laptop-upgradeable-ram-ssd' }],
          ['GPU', 'Case clearance, slot thickness, power connectors, PSU requirements and monitor output', { text: 'Use the PC bottleneck calculator', href: '/tools/pc-bottleneck-calculator' }],
          ['CPU', 'Socket, chipset, BIOS version, memory support, power and cooling requirements', { text: 'Browse CPU profiles', href: '/reviews/cpus' }],
        ],
      },
      relatedLinks: [
        { label: 'Should you upgrade RAM or SSD now—or wait?', href: '/research/upgrade-ram-ssd-now-or-wait', description: 'Make the decision after confirming the measured problem and compatible upgrade path.' }
      ]
    },
    {
      heading: 'Choose the least destructive diagnostic order',
      paragraphs: [
        'The most efficient diagnosis narrows uncertainty with a small number of meaningful tests. Do not run every stress test simply because a PC seems slow or crashes. A failing drive, unstable power path or marginal cooling system can be made harder to diagnose—or risk data—by an inappropriate workload.'
      ],
      steps: [
        'Record the symptom, exact model, operating conditions, recent changes and any error code.',
        'Check external power, cables, monitor input, free storage space and visible warnings first.',
        'Run the manufacturer’s supported diagnostic tools and operating-system evidence tools relevant to the symptom.',
        'Test a single hypothesis at a time, returning settings to a stable default when an experiment adds instability.',
        'Protect data before extended stress tests or invasive repair when a storage or stability warning exists.',
        'Confirm component compatibility against the manufacturer’s exact model documentation before buying replacements.',
        'Escalate to qualified service for internal PSU work, swollen/damaged batteries, burning smell, liquid damage or repairs beyond your equipment and experience.'
      ],
      relatedLinks: [
        { label: 'Browse all hardware guides', href: '/hardware', description: 'Return to the component and symptom map for more focused troubleshooting paths.' },
        { label: 'Complete Windows troubleshooting guide', href: '/windows-troubleshooting-complete-guide', description: 'Use when evidence points to Windows, drivers, updates or networking rather than a hardware limit.' }
      ]
    },
    {
      heading: 'Frequently asked questions',
      paragraphs: ['The correct answer depends on the exact component, configuration and symptom. Use these distinctions to choose a safer next check.'],
      bullets: [
        'A healthy SMART status does not guarantee that a drive, cable, controller or the wider storage path is fault-free.',
        'High CPU, GPU or RAM usage is not automatically a fault; compare it with the workload and the symptom.',
        'A random restart does not by itself prove a defective PSU. Check event timing, thermals, memory stability, connections and recent hardware changes.',
        'Laptop upgradeability cannot be confirmed from the brand or product family alone; use the exact model and service documentation.',
        'A component replacement should follow evidence and compatibility checks, not one temperature, benchmark or error entry.'
      ]
    }
  ],
  faq: [
    { question: 'How do I start diagnosing a PC hardware problem?', answer: 'Record the exact symptom and recent changes, then identify whether the PC fails before firmware, during startup or only under a particular workload. Use the least disruptive test that can separate the likely causes, and protect data before stressing a drive that reports warnings.' },
    { question: 'Does a healthy SSD status mean the drive is definitely fine?', answer: 'No. Available health fields vary by device and driver, and a reported healthy status does not prove that the drive, cable, controller and entire storage path are fault-free. Combine supported health data with symptoms and back up first if errors or disconnects recur.' },
    { question: 'Can I use a generic guide to confirm laptop RAM or SSD compatibility?', answer: 'A generic guide can explain what to check, but compatibility depends on the exact model suffix, board layout, supported memory generation, soldered slots, SSD interface and length, firmware and service limitations.' },
    { question: 'Should I replace the PSU if my PC restarts during a game?', answer: 'Not on that symptom alone. Overheating, GPU behavior, connectors, motherboard issues and RAM instability can overlap with PSU symptoms. Record when the restart occurs and use safe, model-specific diagnostics; never open a PSU.' },
    { question: 'What should I do if an SSD disappears or reports repeated errors?', answer: 'Stop unnecessary stress tests and prioritize a verified backup or professional data-recovery advice if the data is important. Check the supported health data and detection stage before attempting repairs that write to the drive.' },
    { question: 'When should I stop and get professional hardware service?', answer: 'Stop when the task involves internal PSU work, a swollen or damaged battery, liquid damage, burning smell, live electrical testing or a repair that exceeds your tools and experience. Do not risk injury or valuable data to complete a diagnostic.' }
  ],
};
