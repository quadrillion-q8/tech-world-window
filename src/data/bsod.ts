/**
 * Blue screen (bug check) knowledge base for the BSOD Error Code Lookup tool.
 *
 * Each entry becomes its own indexable page (see graph.ts), so the text must stay specific to the
 * code. Wording is deliberately hedged where a stop code has several possible causes. Do not add an
 * entry without original, accurate content: thin near-duplicate pages hurt rather than help.
 */

export type BsodCategory = 'drivers' | 'graphics' | 'memory' | 'storage' | 'boot' | 'hardware' | 'system';

export const bsodCategoryLabels: Record<BsodCategory, string> = {
  drivers: 'Driver errors',
  graphics: 'Graphics and display errors',
  memory: 'Memory errors',
  storage: 'Storage and file system errors',
  boot: 'Start-up and boot errors',
  hardware: 'Hardware and CPU errors',
  system: 'System file and kernel errors',
};

export type BsodStep = { title: string; detail: string };

/** Optional evidence-reading section for stop codes whose causes need extra interpretation. */
export type BsodDeepDive = {
  heading: string;
  paragraphs: string[];
  subsections?: { heading: string; paragraphs: string[]; steps?: BsodStep[] }[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  faq?: { question: string; answer: string }[];
  sources?: { label: string; url: string }[];
};

export type BsodEntry = {
  slug: string;
  /** Official bug check name as shown on the blue screen. */
  name: string;
  /** Full 8-digit hex bug check code, e.g. 0x000000EF. */
  hex: string;
  category: BsodCategory;
  summary: string;
  meaning: string;
  causes: string[];
  steps: BsodStep[];
  escalate: string;
  deepDive?: BsodDeepDive;
  /** Internal guide paths. Every path must exist in the route graph (validated at build time). */
  related: string[];
};

export const BSOD_BASE_PATH = '/tools/bsod-error-code-lookup';
export const bsodPath = (slug: string) => `${BSOD_BASE_PATH}/${slug}`;

/** 0x000000EF -> 0xEF */
export function shortHex(hex: string): string {
  const digits = hex.replace(/^0x/i, '').replace(/^0+/, '');
  return `0x${digits || '0'}`;
}

const GUIDE = {
  decode: '/windows-11-blue-screen-stop-code-how-to-read',
  wontStart: '/windows-11-wont-start-troubleshooting',
  ram: '/how-to-check-ram-for-errors-windows',
  ssd: '/how-to-check-ssd-health-windows',
  gpuHeat: '/gpu-overheating-gaming-pc-causes-fix',
  psu: '/pc-power-supply-problems-symptoms',
  crashes: '/pc-games-crashing-to-desktop-troubleshooting',
  freezes: '/windows-11-freezing-randomly-causes-fix',
  update: '/windows/windows-update-stuck',
  device: '/windows-11-unknown-device-device-manager',
  nvme: '/nvme-ssd-temperature-too-high',
  pillar: '/windows-troubleshooting-complete-guide',
  ssdFull: '/ssd-nearly-full-windows-performance',
  laptopSsd: '/laptop-nvme-ssd-upgrade-compatibility',
};

const step = {
  undo: (extra = ''): BsodStep => ({
    title: 'Undo the most recent change',
    detail: `If the blue screens began after a Windows update, a new driver or new software, remove that change first. Uninstall the update from Settings, Windows Update, Update history, or roll a driver back in Device Manager (right-click the device, Properties, Driver, Roll Back Driver).${extra ? ' ' + extra : ''}`,
  }),
  sfc: (): BsodStep => ({
    title: 'Repair Windows system files',
    detail: 'Open Terminal (Admin) and run `sfc /scannow`. If it reports damage it could not repair, run `DISM /Online /Cleanup-Image /RestoreHealth`, restart, and run `sfc /scannow` once more.',
  }),
  memory: (): BsodStep => ({
    title: 'Test the memory',
    detail: 'Run Windows Memory Diagnostic (search for it in Start) for a quick check, then MemTest86 for several passes if the crashes continue. Any error points to a faulty stick or slot, or to memory settings the hardware cannot run reliably.',
  }),
  stock: (): BsodStep => ({
    title: 'Return the PC to stock settings',
    detail: 'Reset the BIOS to defaults, then leave XMP or EXPO, CPU or GPU overclocks and undervolts (including per-core offsets such as Curve Optimizer) switched off while you test. If the crashes stop, re-enable one setting at a time to find the unstable one.',
  }),
  drive: (): BsodStep => ({
    title: 'Check the health of the drive',
    detail: 'Read the SMART data with the drive maker\'s tool or CrystalDiskInfo and look for reallocated or pending sectors, media errors and a low remaining-life figure. Back up important files first if the drive reports any warning.',
  }),
  gpuDriver: (lead: string): BsodStep => ({
    title: lead,
    detail: 'Download the latest driver for your exact GPU from NVIDIA, AMD or Intel (or the laptop maker for notebooks), then install it using the vendor\'s clean-install option. If the newest driver is the one that started the crashes, install the previous release instead.',
  }),
  temps: (): BsodStep => ({
    title: 'Watch temperatures under load',
    detail: 'Use a monitoring tool to log CPU, GPU and drive temperatures while you reproduce the problem. Sustained high readings, loud fans or thermal throttling point to dust, failed fans or poor airflow rather than a software fault.',
  }),
  safeMode: (): BsodStep => ({
    title: 'Start in Safe Mode if Windows will not load',
    detail: 'Hold Shift while choosing Restart, or let Windows fail to start three times to open the recovery menu. Choose Troubleshoot, Advanced options, Startup Settings, Restart, then Safe Mode. If Windows is stable there, a driver or startup program is the likely cause.',
  }),
  identifyDriver: (): BsodStep => ({
    title: 'Note the file name on the blue screen',
    detail: 'If the screen shows a line such as "What failed" followed by a .sys file, write it down. Searching that file name shows which driver it belongs to, which tells you what to update or remove. The named file is the code that crashed, which is not always the root cause.',
  }),
};

export const bsodEntries: BsodEntry[] = [
  {
    slug: 'critical-process-died',
    name: 'CRITICAL_PROCESS_DIED',
    hex: '0x000000EF',
    category: 'system',
    summary: 'A process Windows cannot run without stopped or was damaged, so Windows halted to protect itself.',
    meaning: 'Windows keeps a small set of critical processes alive for as long as it runs. If one of them exits, or the data it depends on is damaged, Windows has no safe way to continue and stops with this code. The process is rarely the real culprit: the cause is usually whatever damaged it, such as a faulty driver, corrupted system files, unreliable storage or bad memory.',
    causes: [
      'A recently installed or updated driver, especially a storage, graphics or security-software driver',
      'Corrupted Windows system files after an interrupted update or an unclean shutdown',
      'A drive that is failing or returning read errors',
      'Faulty or unstable RAM, including unstable XMP or EXPO profiles',
    ],
    steps: [step.undo(), step.sfc(), step.drive(), step.memory(), step.safeMode()],
    escalate: 'If the code keeps returning on a freshly reinstalled Windows, suspect hardware, most often the drive or the memory. Back up your files before any reset or repair install.',
    related: [GUIDE.decode, GUIDE.wontStart, GUIDE.ssd],
  },
  {
    slug: 'irql-not-less-or-equal',
    name: 'IRQL_NOT_LESS_OR_EQUAL',
    hex: '0x0000000A',
    category: 'drivers',
    summary: 'Kernel-mode code, usually a driver, touched memory it was not allowed to use at that moment.',
    meaning: 'The "IRQL" is the priority level the processor was running at. This stop happens when kernel code, normally a driver, accesses memory that is not valid for the current priority level. It is one of the most common blue screens and points much more often to a driver or memory problem than to Windows itself.',
    causes: [
      'A buggy or outdated driver; network, VPN and security-software filter drivers are frequent suspects',
      'Faulty RAM or memory settings that are not stable',
      'Newly added hardware, or a device with a failing connection',
      'Overclock or undervolt instability',
    ],
    steps: [
      step.identifyDriver(),
      step.undo('Network and VPN drivers are worth special attention for this code.'),
      step.memory(),
      step.stock(),
      { title: 'Disconnect hardware you added recently', detail: 'Unplug new USB devices, capture cards or add-in cards and run the PC for a few days. If the crashes stop, reconnect one device at a time and update or replace the driver of the one that brings them back.' },
    ],
    escalate: 'If crashes continue with every optional device removed and memory tests clean, a failing motherboard component becomes more likely and a clean Windows installation is a useful test.',
    related: [GUIDE.decode, GUIDE.ram, GUIDE.device],
  },
  {
    slug: 'driver-irql-not-less-or-equal',
    name: 'DRIVER_IRQL_NOT_LESS_OR_EQUAL',
    hex: '0x000000D1',
    category: 'drivers',
    summary: 'A driver tried to read or write pageable memory at a priority level where that is not allowed.',
    meaning: 'This is the driver-specific cousin of IRQL_NOT_LESS_OR_EQUAL. A driver touched pageable memory while the processor was at a priority level that forbids it. The blue screen often names the driver file, and that driver (or something it works with) is the first place to look.',
    causes: [
      'A faulty network adapter, Wi-Fi or Bluetooth driver',
      'Security software, VPN or virtualization drivers',
      'Outdated chipset or storage drivers',
      'Failing RAM, less often',
    ],
    steps: [
      step.identifyDriver(),
      { title: 'Update or reinstall the driver that was named', detail: 'Get the driver from the device or motherboard maker rather than relying on Windows Update alone. For a network adapter, download the package on another PC if the affected PC cannot stay online long enough.' },
      { title: 'Temporarily remove VPN and security add-ons', detail: 'Uninstall third-party VPN clients, firewall add-ons and similar low-level software, then check whether the crashes stop. Reinstall the current version afterwards if it was not the cause.' },
      step.memory(),
      step.sfc(),
    ],
    escalate: 'If no driver name is shown and the crashes happen at random, treat it like a memory or hardware problem and test RAM before changing more software.',
    related: [GUIDE.decode, GUIDE.device, GUIDE.pillar],
  },
  {
    slug: 'page-fault-in-nonpaged-area',
    name: 'PAGE_FAULT_IN_NONPAGED_AREA',
    hex: '0x00000050',
    category: 'memory',
    summary: 'Windows tried to use memory that should always be present in RAM and found it invalid or missing.',
    meaning: 'Bug check 0x50 (also shown as 0x00000050) means Windows referenced invalid system memory. Faulty or unstable RAM is one possibility, but a buggy driver or system service, security software, a corrupted NTFS volume, or recently added hardware can also contribute. The code alone does not prove that RAM has failed; note any driver named on the blue screen and check events recorded at the same time.',
    causes: [
      'Faulty or badly seated RAM',
      'A driver or security tool corrupting memory',
      'File system corruption on the system drive',
      'A memory overclock or XMP/EXPO profile that is not stable',
    ],
    steps: [
      step.undo('If the blue screen names a driver, record it and check the PC or component maker’s supported version before using driver-cleanup utilities.'),
      { title: 'Check recent memory or hardware changes', detail: 'If the crashes began after adding RAM or enabling XMP/EXPO, return that specific change to its default for a controlled test. If hardware was recently installed, check the exact model’s service guidance instead of changing unrelated firmware settings.' },
      step.memory(),
      { title: 'Repair Windows system files', detail: 'Open Terminal (Admin) and run `DISM /Online /Cleanup-Image /RestoreHealth`. When it finishes, run `sfc /scannow`, then restart if repairs were made. These tools address Windows image and protected system-file corruption; they do not prove that corrupted files caused this stop code.' },
      { title: 'Check the file system only when storage evidence points there', detail: 'If Windows logs NTFS or disk errors, or the drive disappears or reports warnings, protect important files before further tests. On a drive without those warning signs, open Terminal (Admin) and run `chkdsk C: /scan`; do not start with a write-heavy repair or repeated benchmark.' },
      { title: 'Inspect or reseat memory only if you are comfortable doing so', detail: 'If a memory test reports errors, shut down, disconnect power, and follow the computer or motherboard maker’s instructions. Testing one module at a time may help distinguish a stick from a slot or unstable setting; otherwise use qualified service.' },
    ],
    escalate: 'If a memory test reports errors, preserve the result and identify whether the fault follows a module, slot, or memory setting before replacing parts. If tests pass but the crash continues, preserve any minidump and use the named driver plus same-time Event Viewer records to guide the next diagnosis. If Windows cannot stay running long enough to protect important files, stop repeated repair attempts and prioritize data recovery or qualified support.',
    deepDive: {
      heading: 'How to interpret PAGE_FAULT_IN_NONPAGED_AREA evidence',
      paragraphs: [
        'Microsoft documents bug check 0x50 as an invalid system-memory reference. The name describes the failure Windows detected; it does not identify the part that caused it. Drivers, memory instability, storage or file-system problems, and other system changes can lead to similar symptoms, so replacing RAM based on the code alone is not a reliable diagnosis.',
        'Start with the timeline. Record when the crash began, what changed immediately beforehand, whether the same workload triggers it, and whether the blue screen names a .sys file. A named module is a useful lead, not automatic proof of root cause. If crashes recur, keep the minidump files in C:\\Windows\\Minidump and note the matching BugCheck event (Event ID 1001) in Event Viewer. A debugger-informed dump analysis can be more informative than the stop-code label alone.',
        'Treat test results proportionally. A memory-test error is meaningful evidence of instability, but it may reflect a module, slot, memory controller, or unsupported settings; isolate these possibilities before buying parts. A test that passes lowers suspicion but cannot exclude every intermittent fault. Likewise, check the file system when Windows reports NTFS or disk errors rather than assuming every 0x50 crash is a storage failure.',
        'Change one variable at a time and record the result. This makes the diagnosis reproducible and lets you reverse an unsuccessful change. Avoid registry cleaners, automatic driver-updater utilities, indiscriminate BIOS changes, and reinstalling Windows before you have protected data and collected the basic evidence.'
      ],
      subsections: [
        {
          heading: "Advanced path: use a minidump to narrow the cause",
          paragraphs: [
            "This is an optional step for recurring crashes, not a requirement for every user. Small crash dumps are often stored in `C:\\Windows\\Minidump`; depending on the dump settings, a larger dump may be stored as `C:\\Windows\\MEMORY.DMP`. If neither exists, dump creation may be disabled or configured elsewhere. The absence of a dump does not prove that a crash did not happen.",
          ],
          steps: [
            {
              title: "Keep the dump and its timestamp",
              detail: "Copy the file associated with the crash before attempting more fixes. Record the crash time, stop code, any named `.sys` file, and the matching BugCheck event. Keep the original unchanged.",
            },
            {
              title: "Open a copy in Microsoft's WinDbg debugger",
              detail: "Install WinDbg using Microsoft's official guidance, open the copied `.dmp` file, and run `!analyze -v` in the debugger command window after the dump loads. This is an advanced diagnostic step; you do not need WinDbg to perform the basic checks above.",
            },
            {
              title: "Look for patterns across evidence",
              detail: "Read the bug-check summary, module or image name, and stack text alongside the crash timestamp and recent changes. Compare more than one dump when available. A named driver or stack frame is an investigative lead, not proof that the module alone caused the crash.",
            },
          ],
        },
        {
          heading: "What the 0x50 parameters can tell you",
          paragraphs: [
            "A debugger can show the four bug-check parameters. In Microsoft's reference, parameter 1 is the referenced memory address; parameter 2 describes the attempted access, with encodings that vary by Windows version and processor architecture; parameter 3 is the instruction address when known; and parameter 4 describes the page-fault subtype. Do not infer a failed part from the raw numbers alone: interpret them against the matching Microsoft documentation and the full `!analyze -v` output.",
            "Privacy note: even a small dump can include process details, loaded drivers, and kernel context. Review dump contents before sharing them, and do not post raw crash dumps publicly. Share only with a trusted support channel or technician when needed.",
          ],
        },
      ],
      table: {
        caption: 'Use the observed evidence to choose the next test',
        headers: ['Evidence', 'What it can suggest', 'Next action'],
        rows: [
          ['Crash started after a driver, Windows update, VPN or security-tool change', 'A recent software or kernel-driver change may be involved', 'Roll back or remove that one change, then retest'],
          ['The blue screen or dump repeatedly points to the same .sys module', 'That module or its interaction with another component deserves investigation', 'Identify its publisher and use the PC or device maker’s supported driver'],
          ['Memory testing reports errors', 'The memory subsystem is unstable; the cause is not necessarily one RAM stick', 'Save the result and test supported settings, modules and slots using the device manual'],
          ['Crashes began after enabling XMP/EXPO or an overclock', 'The configuration may be unstable at the selected settings', 'Return only that setting to a supported default and compare'],
          ['NTFS or disk errors appear at the same time, or the drive reports warnings', 'Storage or file-system trouble needs separate investigation', 'Back up important files first, then check drive health and file-system evidence'],
          ['Several unrelated stop codes occur, or the named module changes each time', 'A shared instability may be corrupting different operations', 'Preserve all dumps and event times; test memory and review recent system changes']
        ]
      },
      faq: [
        { question: 'Does PAGE_FAULT_IN_NONPAGED_AREA mean my RAM is broken?', answer: 'No. Faulty or unstable RAM is one possibility, but the stop code alone does not prove a failed memory module. Drivers, low-level security software, unstable memory settings, and file-system or hardware issues can also contribute. Test memory and use crash evidence before replacing parts.' },
        { question: 'What does 0x00000050 mean compared with 0x50?', answer: 'They are two hexadecimal representations of the same bug-check value. PAGE_FAULT_IN_NONPAGED_AREA is the associated stop-code name.' },
        { question: 'Should I run CHKDSK first?', answer: 'Not automatically. First protect important files if storage trouble is plausible. Use chkdsk C: /scan when Windows or Event Viewer provides file-system clues; do not assume the drive is responsible without supporting evidence.' },
        { question: 'What if Windows Memory Diagnostic finds no errors?', answer: 'A clean result is useful but does not rule out every intermittent fault or unstable memory configuration. If crashes continue, preserve the minidump, note the named module and event time, and review recent driver or software changes.' },
        { question: 'Can I fix this by reinstalling Windows?', answer: 'Reinstallation is not a good first step and will not repair failing hardware. Back up important files, investigate recent changes, run targeted tests, and preserve crash evidence before considering a repair install or reset.' },
        { question: 'Where are PAGE_FAULT_IN_NONPAGED_AREA minidumps saved?', answer: 'Small dumps are commonly saved in C:\\Windows\\Minidump. Depending on the configured dump type, Windows may save a larger dump as C:\\Windows\\MEMORY.DMP instead. If no file exists, check the system dump settings; the absence of a dump is not proof that no crash occurred.' },
        { question: 'What does WinDbg !analyze -v tell me?', answer: 'It summarizes the bug check and relevant module and stack information from a dump. The output can narrow the investigation, but a named module is not automatically the root cause. Correlate it with timestamps, recent changes, and other dumps if available.' },
        { question: 'Is it safe to upload a minidump publicly?', answer: 'Do not post raw crash dumps publicly. Even small dumps can include process details, loaded drivers, and kernel context. Review the file and share it only through a trusted support channel when necessary.' }
      ],
      sources: [
        { label: 'Microsoft Learn: Bug Check 0x50 — PAGE_FAULT_IN_NONPAGED_AREA', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x50--page-fault-in-nonpaged-area' },
        { label: 'Microsoft Support: Use System File Checker to repair missing or corrupted system files', url: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e' },
        { label: 'Microsoft Learn: Bug Check Code Reference', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2' },
        { label: 'Microsoft Learn: Analyze a kernel-mode dump file with WinDbg', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/analyzing-a-kernel-mode-dump-file-with-windbg' },
        { label: 'Microsoft Learn: Read small memory dump files', url: 'https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/read-small-memory-dump-file' },
        { label: 'Microsoft Support: Resolving blue-screen errors in Windows', url: 'https://support.microsoft.com/en-us/windows/resolving-blue-screen-errors-in-windows-60b01860-58f2-be66-7516-5c45a66ae3c6' }
      ]
    },
    related: [GUIDE.decode, GUIDE.ram, GUIDE.ssd],
  },
  {
    slug: 'system-service-exception',
    name: 'SYSTEM_SERVICE_EXCEPTION',
    hex: '0x0000003B',
    category: 'drivers',
    summary: 'An error occurred while code moved from normal user mode into the privileged kernel.',
    meaning: 'This stop is triggered when a routine crossing from user mode into kernel mode raises an exception. Graphics drivers are a very common source, but any driver, security tool or damaged system file can trigger it, so the file named on screen matters more than the code number.',
    causes: [
      'A graphics driver problem, particularly just after an update',
      'Antivirus or system-utility drivers',
      'Corrupted system files',
      'Faulty RAM or storage',
    ],
    steps: [
      step.identifyDriver(),
      step.gpuDriver('Reinstall the graphics driver cleanly'),
      step.sfc(),
      { title: 'Check security and utility software', detail: 'Update, or temporarily uninstall, third-party antivirus, disk utilities and system optimizers. Windows Security alone is a reasonable stand-in while you test.' },
      step.memory(),
    ],
    escalate: 'If the crash happens only during gaming or video playback, concentrate on the GPU driver, temperatures and power delivery.',
    related: [GUIDE.decode, GUIDE.crashes, GUIDE.ram],
  },
  {
    slug: 'system-thread-exception-not-handled',
    name: 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED',
    hex: '0x0000007E',
    category: 'drivers',
    summary: 'A Windows system thread raised an error that nothing handled, often tied to a named driver file.',
    meaning: 'A system thread generated an exception that no handler caught. The blue screen frequently names a driver file. Display drivers such as nvlddmkm.sys (NVIDIA) or amdkmdag.sys (AMD) appear often, but the file shows which code crashed and not always why, so use it as a starting point rather than a verdict.',
    causes: [
      'Outdated, corrupt or incompatible drivers',
      'A graphics driver conflict, for example after swapping the GPU',
      'Corrupted system files',
      'BIOS or firmware that needs an update',
    ],
    steps: [
      step.identifyDriver(),
      step.gpuDriver('If a display driver was named, reinstall it cleanly'),
      { title: 'Update the BIOS and chipset drivers', detail: 'Check the motherboard or laptop maker\'s support page for a newer BIOS and chipset package. Read the release notes first and keep the PC on stable power during a BIOS update.' },
      step.sfc(),
      step.safeMode(),
    ],
    escalate: 'A different driver file named on each crash suggests a shared cause such as memory or power rather than several separate driver bugs.',
    related: [GUIDE.decode, GUIDE.device, GUIDE.pillar],
  },
  {
    slug: 'kmode-exception-not-handled',
    name: 'KMODE_EXCEPTION_NOT_HANDLED',
    hex: '0x0000001E',
    category: 'drivers',
    summary: 'A kernel-mode program, usually a driver, caused an exception that the error handler could not catch.',
    meaning: 'Windows stops when kernel-mode code raises an exception nothing can handle. A faulty or incompatible driver or low-level utility is the typical cause, and unstable memory or overclocking can produce the same symptom.',
    causes: [
      'A faulty or incompatible driver or low-level utility',
      'Corrupted system files',
      'RAM errors',
      'Overclocking or undervolting instability',
    ],
    steps: [step.identifyDriver(), step.undo(), step.sfc(), step.stock(), step.memory()],
    escalate: 'If it only occurs when a specific program or device is in use, uninstall that software or driver and check the maker\'s support page for a fixed version.',
    related: [GUIDE.decode, GUIDE.ram, GUIDE.pillar],
  },
  {
    slug: 'kernel-security-check-failure',
    name: 'KERNEL_SECURITY_CHECK_FAILURE',
    hex: '0x00000139',
    category: 'system',
    summary: 'Windows stopped after detecting corruption in a critical kernel data structure. A driver or unstable memory configuration is a common place to start investigating.',
    meaning: 'Bug check 0x139 means Windows detected corruption in a protected kernel data structure. It is a symptom, not a component-level diagnosis: a faulty driver can corrupt memory, unstable RAM settings can produce invalid data, and damaged system files or hardware problems can contribute. The exact dump parameters and crash context may narrow the cause, so do not assume the RAM or SSD is faulty from the stop-code name alone.',
    causes: [
      'A buggy, incompatible, or recently updated device driver',
      'Third-party security, monitoring, RGB, overclocking, or other low-level software',
      'Unstable XMP/EXPO, CPU/GPU overclocking, or undervolting settings',
      'Faulty RAM or memory-controller instability',
      'Damaged Windows system files or storage errors',
    ],
    steps: [
      { title: 'Record what changed and when it crashes', detail: 'Note the exact stop code, the time, and whether the crash began after a driver, Windows update, game, security tool, or hardware change. Reliability Monitor can show whether repeated crashes began at the same time. If a minidump exists, preserve it for diagnosis rather than deleting it.' },
      { title: 'Undo recent driver or low-level software changes', detail: 'If the crashes began after a driver or utility update, roll back that specific change or uninstall the recently added low-level tool. Prefer the PC or component manufacturer’s supported driver package; do not use third-party driver-updater utilities.' },
      { title: 'Return memory and CPU settings to stock', detail: 'Temporarily disable XMP/EXPO and CPU or GPU overclocking/undervolting, then test whether the stop recurs. This is a diagnostic step, not proof that the hardware is defective.' },
      step.sfc(),
      { title: 'Test RAM if crashes continue', detail: 'Run Windows Memory Diagnostic or a bootable memory test. Any reported memory error is significant; if a test passes, it still does not rule out every intermittent or configuration-related issue.' },
      { title: 'Check storage only when evidence points there', detail: 'If Windows also reports disk errors, files become unreadable, or the drive health tool shows warnings, back up important data first and check the SSD health report. Do not assume the SSD is the cause just because this stop code appeared.' },
      step.stock(),
    ],
    escalate: 'If 0x139 continues after recent driver/software changes are removed, memory settings are returned to stock, and memory/system-file checks are clean, preserve the minidump and seek a debugger-informed diagnosis or qualified support before resorting to a clean Windows installation.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x139',
      paragraphs: [
        'Microsoft’s bug check reference describes 0x139 as the kernel detecting corruption of a critical data structure. The first parameter in the crash record names the kind of violation, which is why two crashes with the same stop code can have different causes.',
        'The documented types include an inconsistency in a doubly linked list, an invalid parameter passed to a function that treats bad input as fatal, a compiler-inserted array bounds check, and control-flow or write guard checks. A list inconsistency often points to a driver or other kernel-mode code touching memory it should not, which is why recent driver and software changes are the first thing to review.',
        'You do not need a debugger to start. Reliability Monitor and the BugCheck event (ID 1001 in the System log of Event Viewer) show when each crash happened, and Windows normally saves a small dump in `C:\\Windows\\Minidump`. If crashes repeat, keep those files: a debugger’s `!analyze -v` output can name the module involved, which is more useful than the stop code alone.',
      ],
      table: {
        caption: 'Match what you observe to the next check',
        headers: ['What you observe', 'What it may suggest', 'Next check'],
        rows: [
          ['Crashes began right after a driver, firmware or utility update', 'A driver or low-level tool may be corrupting kernel memory', 'Roll back or remove that one change and retest'],
          ['Crashes only under load or during games', 'Heat, power or unstable memory or overclock settings may be involved; drivers are still possible', 'Return memory, CPU and GPU to stock, then compare and watch temperatures'],
          ['Crashes stopped after turning XMP or EXPO off', 'The memory profile may not be stable on that platform', 'Retest at a lower speed or a supported profile, then run a memory test'],
          ['Several different stop codes appear in the same week', 'Memory, storage or a failing component may be corrupting data more broadly', 'Run memory and drive checks and list every code from Event Viewer'],
          ['The same driver or module name appears in each dump', 'That driver or its software is the leading suspect', 'Update or remove it using the maker’s supported package'],
        ],
      },
      faq: [
        { question: 'Is KERNEL_SECURITY_CHECK_FAILURE usually caused by RAM?', answer: 'RAM can cause it, but it is not always the first suspect. Microsoft describes the code as corruption of a critical kernel data structure, and its guidance centers on what changed on the system and whether the maker has patches. Recent driver changes, low-level software and unstable memory or overclock settings are all worth ruling out before you replace memory.' },
        { question: 'Does 0x139 mean my PC has a virus?', answer: 'Not by itself. Microsoft’s reference notes that malware can damage disks and lead to bug checks, but most reports trace back to drivers, settings or hardware. If you also see other signs of infection, run a full Microsoft Defender scan.' },
        { question: 'Do I need to reinstall Windows to fix it?', answer: 'Usually not as a first step. Remove recent driver or software changes, restore stock settings, run System File Checker and a memory test, and keep the minidump. A clean install makes sense only if those steps do not help and your data is backed up.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x139 KERNEL_SECURITY_CHECK_FAILURE', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x139--kernel-security-check-failure' }],
    },
    related: [GUIDE.decode, GUIDE.ram, GUIDE.ssd, GUIDE.freezes],
  },
  {
    slug: 'dpc-watchdog-violation',
    name: 'DPC_WATCHDOG_VIOLATION',
    hex: '0x00000133',
    category: 'drivers',
    summary: 'A driver task ran for too long and the watchdog timer stopped Windows. Storage drivers are common triggers.',
    meaning: 'Drivers schedule short high-priority tasks called deferred procedure calls. If one runs too long, or the system spends too long at an elevated priority level, the watchdog timer stops Windows. Storage drivers and SSD firmware are among the most commonly reported triggers, but other drivers can cause it too.',
    causes: [
      'Storage controller or SSD driver and firmware problems',
      'Outdated network, graphics or USB drivers',
      'A drive or its connection stalling under load',
      'Incompatible peripherals or old firmware',
    ],
    steps: [
      { title: 'Update SSD firmware and chipset drivers', detail: 'Use the SSD maker\'s utility to check for firmware updates, and install the chipset and storage package from the motherboard or laptop maker. Back up data before a firmware update.' },
      { title: 'Try the Microsoft SATA AHCI driver', detail: 'In Device Manager, expand IDE ATA/ATAPI controllers, right-click the SATA AHCI controller, choose Update driver, Browse my computer, Let me pick, then Standard SATA AHCI Controller. Vendor storage drivers trigger this stop for some PCs and the Microsoft driver is a common workaround. Note the original driver first so you can go back.' },
      { title: 'Disconnect non-essential peripherals', detail: 'Remove USB hubs, docks, capture devices and other add-ons, then see whether the crashes stop. Reconnect them one at a time.' },
      step.drive(),
      step.undo(),
    ],
    escalate: 'If the crash occurs during heavy disk activity and the drive reports warnings, treat it as a failing drive and back up first.',
    related: [GUIDE.decode, GUIDE.ssd, GUIDE.nvme],
  },
  {
    slug: 'video-tdr-failure',
    name: 'VIDEO_TDR_FAILURE',
    hex: '0x00000116',
    category: 'graphics',
    summary: 'The graphics driver stopped responding and did not recover in time after Windows tried to reset it.',
    meaning: 'Windows can reset a graphics driver that stops responding, a feature called timeout detection and recovery. This stop means the reset did not succeed. The screen usually freezes or flickers first. A driver bug, heat, an unstable overclock, power delivery or a failing GPU can each be behind it.',
    causes: [
      'A graphics driver bug or a corrupted installation',
      'GPU overheating, dust or a failing fan',
      'An unstable GPU overclock or undervolt, or a power supply that struggles under GPU load',
      'A failing GPU or a poor PCIe or power-cable connection',
    ],
    steps: [
      step.gpuDriver('Reinstall the graphics driver cleanly'),
      step.stock(),
      step.temps(),
      { title: 'Check GPU power connections', detail: 'With the PC off and unplugged, reseat the PCIe power cables on both the GPU and the power supply, and use one cable per connector rather than a daisy-chained pigtail where possible.' },
      { title: 'Note when it happens', detail: 'Crashes only in demanding games point toward heat or power. Crashes while idle or watching video point more toward the driver or the GPU hardware.' },
    ],
    escalate: 'If clean drivers, stock settings, good temperatures and secure power cables do not help, test the GPU in another PC or borrow a known-good card to separate a failing GPU from the rest of the system.',
    related: [GUIDE.gpuHeat, GUIDE.psu, GUIDE.crashes],
  },
  {
    slug: 'video-scheduler-internal-error',
    name: 'VIDEO_SCHEDULER_INTERNAL_ERROR',
    hex: '0x00000119',
    category: 'graphics',
    summary: 'The Windows video scheduler, which hands work to the GPU, detected a fatal violation.',
    meaning: 'The video scheduler manages work sent to the GPU. When it detects a violation it cannot recover from, Windows stops. The graphics driver or the GPU itself is the usual suspect, and the stop often appears after a driver update or during a game.',
    causes: [
      'A new or corrupted graphics driver',
      'An unstable GPU overclock or factory overclock profile',
      'GPU or VRAM problems, including overheating',
      'A power supply or cable problem under graphics load',
    ],
    steps: [
      step.gpuDriver('Install a clean copy of the graphics driver'),
      step.stock(),
      step.undo('If a recent Windows update started the crashes, hold back that update and check the GPU maker\'s driver notes.'),
      step.temps(),
      step.sfc(),
    ],
    escalate: 'Persisting crashes with a known-good driver and stock settings suggest GPU hardware, so test with another card if you can.',
    related: [GUIDE.gpuHeat, GUIDE.crashes, GUIDE.psu],
  },
  {
    slug: 'video-dxgkrnl-fatal-error',
    name: 'VIDEO_DXGKRNL_FATAL_ERROR',
    hex: '0x00000113',
    category: 'graphics',
    summary: 'The DirectX graphics kernel subsystem found a violation, usually related to the graphics driver or GPU.',
    meaning: 'The DirectX graphics kernel (dxgkrnl) coordinates the graphics driver with Windows. A violation there stops the system. It generally relates to the graphics driver or GPU hardware and can appear when a game, video or graphics workload starts.',
    causes: [
      'A graphics driver problem or corrupted driver installation',
      'GPU hardware faults or overheating',
      'Unstable overclocking or undervolting',
      'Damaged system files that the graphics stack depends on',
    ],
    steps: [
      step.gpuDriver('Reinstall the graphics driver cleanly'),
      step.sfc(),
      step.stock(),
      step.temps(),
      { title: 'Check Windows and hybrid-graphics settings', detail: 'On laptops with integrated and dedicated graphics, update both drivers from the laptop maker. In Windows Settings, System, Display, Graphics, review any per-app GPU overrides you added.' },
    ],
    escalate: 'If the screen artifacts or flickers before the crash, suspect the GPU or its cooling, and test with another card or on another PC.',
    related: [GUIDE.gpuHeat, GUIDE.crashes, GUIDE.decode],
  },
  {
    slug: 'thread-stuck-in-device-driver',
    name: 'THREAD_STUCK_IN_DEVICE_DRIVER',
    hex: '0x000000EA',
    category: 'graphics',
    summary: 'A driver got stuck in a loop, often waiting for hardware that stopped responding. Graphics drivers are common.',
    meaning: 'A device driver stayed in an endless loop, usually while waiting for hardware to become idle. Graphics drivers and GPU hardware are the most frequent cases, so the display may freeze for a while before the blue screen appears.',
    causes: [
      'A faulty or outdated graphics driver',
      'A GPU that has become unresponsive from heat, power problems or hardware faults',
      'An unstable overclock',
      'An incompatible driver after a major Windows update',
    ],
    steps: [
      step.gpuDriver('Reinstall the graphics driver cleanly'),
      step.stock(),
      step.temps(),
      { title: 'Check the GPU slot and power', detail: 'Power off and unplug the PC, reseat the GPU in its PCIe slot, reconnect its power cables, and confirm the card is fully seated and screwed in.' },
      step.undo(),
    ],
    escalate: 'If the display freezes or shows artifacts before each crash even with a clean driver, test the GPU in another system.',
    related: [GUIDE.gpuHeat, GUIDE.psu, GUIDE.freezes],
  },
  {
    slug: 'inaccessible-boot-device',
    name: 'INACCESSIBLE_BOOT_DEVICE',
    hex: '0x0000007B',
    category: 'boot',
    summary: 'Windows could not read the drive it boots from during start-up.',
    meaning: 'During start-up Windows needs a working driver and a readable system drive. This stop appears when the storage controller mode or driver changes, the drive is not detected or failing, or the file system or boot data is damaged.',
    causes: [
      'A BIOS or UEFI change to the storage mode (AHCI, RAID, Intel RST or VMD), including a BIOS reset or update',
      'A cloned or moved drive that Windows has no matching driver for',
      'A failing drive or a loose cable or connector',
      'File system or boot configuration damage after a failed update or power loss',
    ],
    steps: [
      { title: 'Undo recent BIOS changes', detail: 'If the stop began after a BIOS update, reset or change, enter the BIOS and restore the original storage mode. Changing the mode on a PC that was installed under a different one can cause exactly this error, and switching back often fixes it.' },
      { title: 'Confirm the drive is detected', detail: 'Check that the system drive appears in the BIOS or UEFI storage list. If it is missing, power off, reseat the SATA or M.2 connection and test again.' },
      { title: 'Run Startup Repair', detail: 'From the recovery menu choose Troubleshoot, Advanced options, Startup Repair. It can fix boot configuration problems without touching your files.' },
      { title: 'Check the file system from recovery', detail: 'In Advanced options open Command Prompt and confirm which drive letter holds Windows (letters can differ in recovery), then run `chkdsk X: /f` with that letter in place of X. Back up first if you can, because repairs on a failing drive can make things worse.' },
    ],
    escalate: 'If the drive is missing from the BIOS, makes clicking noises, or reports serious SMART warnings, stop repair attempts and recover your files first.',
    related: [GUIDE.wontStart, GUIDE.ssd, GUIDE.decode],
  },
  {
    slug: 'unmountable-boot-volume',
    name: 'UNMOUNTABLE_BOOT_VOLUME',
    hex: '0x000000ED',
    category: 'boot',
    summary: 'Windows found the boot drive but could not mount its file system.',
    meaning: 'Unlike INACCESSIBLE_BOOT_DEVICE, Windows can reach the drive here but cannot mount the file system on it. File system damage, a failing drive and connection problems are the usual causes, and an unexpected power loss during a write can leave the volume in a bad state.',
    causes: [
      'File system corruption on the Windows volume',
      'A failing drive with bad sectors',
      'A loose or damaged SATA cable or M.2 connection',
      'Damaged boot data after an interrupted update or power loss',
    ],
    steps: [
      { title: 'Back up before repairs', detail: 'If the files matter, connect the drive to another PC (a USB enclosure works) or boot a recovery environment and copy what you need first. File system repairs can remove damaged data.' },
      { title: 'Run Startup Repair', detail: 'From the recovery menu choose Troubleshoot, Advanced options, Startup Repair and let it finish.' },
      { title: 'Repair the file system', detail: 'In Advanced options open Command Prompt, confirm which drive letter holds Windows, then run `chkdsk X: /f` with that letter. Let it run to completion.' },
      { title: 'Reseat or replace the cable', detail: 'Power off, unplug the PC and reseat the data cable or M.2 drive. A new SATA cable is cheap and rules out a common cause.' },
      step.drive(),
    ],
    escalate: 'If chkdsk reports many bad sectors or the SMART data is poor, replace the drive and restore from backup rather than repairing it repeatedly.',
    related: [GUIDE.wontStart, GUIDE.ssd, GUIDE.decode],
  },
  {
    slug: 'memory-management',
    name: 'MEMORY_MANAGEMENT',
    hex: '0x0000001A',
    category: 'memory',
    summary: 'Windows hit a severe memory-management error, most often from faulty RAM or unstable memory settings.',
    meaning: 'This is a broad stop code for serious memory-management failures. Faulty RAM, memory settings the hardware cannot run reliably and driver bugs are the usual causes. Storage problems that affect the paging file can contribute as well.',
    causes: [
      'Faulty RAM, or sticks that are not seated correctly',
      'An XMP or EXPO profile, or manual memory overclock, that is not stable',
      'A driver corrupting memory',
      'A failing drive holding the paging file',
    ],
    steps: [
      step.memory(),
      { title: 'Turn off XMP or EXPO temporarily', detail: 'Enter the BIOS and load default memory settings. If the crashes stop, the profile is not stable on your CPU and motherboard. Try a lower speed, or slightly more voltage only within the memory maker\'s rated range.' },
      { title: 'Reseat and test sticks one at a time', detail: 'Power off, unplug the PC and reseat the RAM. Test one stick at a time in the slot your motherboard manual recommends to find a bad stick or slot.' },
      step.undo(),
      step.drive(),
    ],
    escalate: 'Any error in a full MemTest86 run means the module or slot is at fault. Replace the module rather than relying on it.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x1A',
      paragraphs: [
        'Microsoft’s bug check reference describes 0x1A as a severe memory-management error and says the first parameter identifies the exact violation. Some documented subtypes point toward hardware, such as an in-page operation that failed with a CRC error. Others, such as a write-after-free or an overrun from a previous page, can come from a driver bug.',
        'That is why the stop code alone is not a verdict on your RAM. Microsoft also suggests running Windows Memory Diagnostic to check physical memory, and a debugger’s `!analyze` output shows the subtype and may name the component involved. Windows normally saves a small dump in `C:\\Windows\\Minidump`; keep it if the crashes repeat.',
        'Note when the crashes happen. A repeated failure that names the same driver component can point away from a failing module and toward a driver or settings problem, while crashes that follow a memory-speed change point toward stability.',
      ],
      table: {
        caption: 'Match what you observe to the next check',
        headers: ['What you observe', 'What it may suggest', 'Next check'],
        rows: [
          ['Crashes began after enabling XMP or EXPO or changing memory speed', 'The profile may be unstable on that CPU, board and module combination', 'Load default memory settings and retest before replacing RAM'],
          ['A memory test reports errors', 'A module, slot or memory setting is faulty or unstable', 'Retest one module at a time in a recommended slot and replace a module that fails alone'],
          ['Memory tests pass but crashes continue', 'A driver, a storage fault or an intermittent hardware issue is still possible', 'Review drivers changed before the first crash, check drive health and keep the dump'],
          ['Crashes only in games or graphics workloads', 'A graphics driver or GPU memory behavior may be involved', 'Roll back or cleanly reinstall the graphics driver from the GPU maker and retest'],
          ['Disk errors or very slow file access accompany the crashes', 'Trouble on the drive holding the paging file may contribute', 'Back up your data first, then check drive health'],
        ],
      },
      faq: [
        { question: 'What does 0x1A mean in MEMORY_MANAGEMENT (0x0000001A)?', answer: '0x1A and 0x0000001A are the same bug check number written two ways. It stands for MEMORY_MANAGEMENT, and the first parameter in the crash record identifies the specific violation.' },
        { question: 'Does MEMORY_MANAGEMENT always mean bad RAM?', answer: 'No. Faulty RAM and unstable memory settings are common causes, but drivers and storage problems can also trigger it. Test memory and review recent changes before you replace modules.' },
        { question: 'My Windows Memory Diagnostic test passed. Is my RAM fine?', answer: 'Not necessarily. A quick test can miss intermittent faults. A longer bootable test such as MemTest86 is more thorough, and instability that only appears with XMP or EXPO enabled needs a test run at that setting as well.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x1A MEMORY_MANAGEMENT', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x1a--memory-management' }],
    },
    related: [GUIDE.ram, GUIDE.decode, GUIDE.freezes],
  },
  {
    slug: 'whea-uncorrectable-error',
    name: 'WHEA_UNCORRECTABLE_ERROR',
    hex: '0x00000124',
    category: 'hardware',
    summary: 'Windows received a fatal hardware error report from the processor, memory, a PCIe device or another component.',
    meaning: 'The Windows Hardware Error Architecture collects error reports from hardware. This stop means a hardware error was reported that the system could not correct. The CPU, memory, PCIe devices, storage, overclocking and power or cooling problems can all report through it, so the code does not itself say which part is at fault.',
    causes: [
      'An unstable CPU, memory or GPU overclock or undervolt',
      'Overheating or inadequate power delivery',
      'A failing CPU, RAM, storage device or PCIe card',
      'Outdated BIOS or chipset firmware',
    ],
    steps: [
      { title: 'Look for WHEA events in Event Viewer', detail: 'Open Event Viewer, Windows Logs, System, and look for events from WHEA-Logger around the time of the crash. They often indicate the type of component that reported the error, which narrows the search.' },
      step.stock(),
      step.temps(),
      step.memory(),
      { title: 'Update firmware and remove extras', detail: 'Install the latest BIOS and chipset drivers from the motherboard or laptop maker, and remove any non-essential PCIe cards to see whether the crashes stop.' },
    ],
    escalate: 'If errors persist at stock settings with good temperatures, a hardware component is failing. Isolate it by swapping RAM, GPU or drive with known-good parts.',
    related: [GUIDE.psu, GUIDE.gpuHeat, GUIDE.freezes],
  },
  {
    slug: 'clock-watchdog-timeout',
    name: 'CLOCK_WATCHDOG_TIMEOUT',
    hex: '0x00000101',
    category: 'hardware',
    summary: 'A processor core did not respond to the system clock in time, often from unstable CPU settings.',
    meaning: 'A processor core stopped responding to the clock interrupt that the system expects at regular intervals. Unstable CPU settings, such as an overclock or an aggressive per-core undervolt, are a common cause, and BIOS problems or failing hardware can also produce it.',
    causes: [
      'An overclock or undervolt that is not stable, including per-core offsets such as Curve Optimizer',
      'An outdated or faulty BIOS version',
      'CPU cooling or power delivery problems',
      'A failing processor or motherboard, less often',
    ],
    steps: [
      step.stock(),
      { title: 'Update the BIOS', detail: 'Check the motherboard or laptop maker\'s support page for a newer BIOS, especially after installing a new CPU generation. Read the release notes and keep the PC on stable power during the update.' },
      step.temps(),
      step.undo(),
      { title: 'Reseat the CPU cooler and check power cables', detail: 'With the PC off and unplugged, check that the CPU cooler is mounted evenly and that the 8-pin or 4+4-pin CPU power cable is fully seated.' },
    ],
    escalate: 'If the crash persists at stock settings with current firmware and good temperatures, the CPU or motherboard may be faulty and needs testing with other parts.',
    related: [GUIDE.freezes, GUIDE.psu, GUIDE.decode],
  },
  {
    slug: 'unexpected-kernel-mode-trap',
    name: 'UNEXPECTED_KERNEL_MODE_TRAP',
    hex: '0x0000007F',
    category: 'hardware',
    summary: 'The processor raised a fault the kernel could not handle, often tied to memory, heat or overclocking.',
    meaning: 'The processor generated a trap, a type of fault, that the kernel is not allowed to handle. Hardware causes such as faulty RAM, overheating and unstable overclocks are common, although software and drivers can trigger it too.',
    causes: [
      'Faulty RAM or memory settings that are not stable',
      'Overheating or an unstable CPU overclock',
      'A faulty driver or incompatible software',
      'Failing motherboard or CPU hardware',
    ],
    steps: [step.memory(), step.stock(), step.temps(), step.undo(), step.sfc()],
    escalate: 'Crashes that continue at stock settings with passing memory tests justify testing other hardware, starting with the power supply and the motherboard.',
    related: [GUIDE.ram, GUIDE.psu, GUIDE.decode],
  },
  {
    slug: 'bad-pool-header',
    name: 'BAD_POOL_HEADER',
    hex: '0x00000019',
    category: 'memory',
    summary: 'Windows found a damaged header in a block of memory it manages, the memory pool.',
    meaning: 'Windows keeps track of kernel memory blocks with small headers. This stop appears when one of those headers is damaged, usually because a driver wrote outside its own memory, or because of faulty RAM or disk problems.',
    causes: [
      'A driver that writes outside its allocated memory',
      'Faulty RAM',
      'Disk errors or file system damage',
      'Security or system-utility software that hooks deep into Windows',
    ],
    steps: [step.identifyDriver(), step.undo(), step.memory(), step.sfc(), step.drive()],
    escalate: 'If the code appears after installing a specific program, uninstall it and look for an updated release before reinstalling.',
    related: [GUIDE.decode, GUIDE.ram, GUIDE.ssd],
  },
  {
    slug: 'ntfs-file-system',
    name: 'NTFS_FILE_SYSTEM',
    hex: '0x00000024',
    category: 'storage',
    summary: 'The NTFS file system driver hit a problem it could not recover from.',
    meaning: 'Windows uses the NTFS file system on most drives. This stop is raised when the NTFS driver meets a condition it cannot handle. Damaged file system structures, a failing drive or loose connection, or security software interfering with disk access can be behind it.',
    causes: [
      'File system corruption, often after power loss or forced shutdowns',
      'A failing drive with bad sectors',
      'A loose cable or poor M.2 contact',
      'Disk-related security or backup software conflicting with Windows',
    ],
    steps: [
      { title: 'Back up your data', detail: 'If the drive is reachable at all, copy important files to another drive before running repairs.' },
      { title: 'Scan and repair the volume', detail: 'Open Terminal (Admin) and run `chkdsk C: /scan`. If it reports errors, schedule a repair with `chkdsk C: /f` and restart.' },
      step.drive(),
      { title: 'Reseat the drive connection', detail: 'With the PC off and unplugged, reseat the SATA cable or M.2 drive, and try a different SATA port or cable if you have one.' },
      step.sfc(),
    ],
    escalate: 'Recurring file system errors on a drive that reports health warnings mean replacement, not repeated repair.',
    related: [GUIDE.ssd, GUIDE.ssdFull, GUIDE.decode],
  },
  {
    slug: 'kernel-data-inpage-error',
    name: 'KERNEL_DATA_INPAGE_ERROR',
    hex: '0x0000007A',
    category: 'storage',
    summary: 'Windows could not read a page of kernel data back from disk into memory.',
    meaning: 'Windows sometimes moves memory pages to the paging file on disk and reads them back later. This stop means a requested page could not be read back. A failing drive, a bad cable or controller connection and memory errors are the typical explanations.',
    causes: [
      'A failing drive or bad sectors in the paging file area',
      'A loose or damaged data cable, or an unreliable controller connection',
      'Faulty RAM',
      'Malware or file system corruption, less often',
    ],
    steps: [
      step.drive(),
      { title: 'Check the cable and port', detail: 'Power off and unplug the PC, then reseat the SATA or M.2 connection. Try another SATA cable or port, because a bad cable is a cheap thing to rule out.' },
      { title: 'Scan the volume', detail: 'Open Terminal (Admin) and run `chkdsk C: /scan`. Back up first if SMART data shows warnings.' },
      step.memory(),
      step.sfc(),
    ],
    escalate: 'If the drive reports reallocated or pending sectors, copy your data off immediately and replace the drive.',
    related: [GUIDE.ssd, GUIDE.nvme, GUIDE.decode],
  },
  {
    slug: 'unexpected-store-exception',
    name: 'UNEXPECTED_STORE_EXCEPTION',
    hex: '0x00000154',
    category: 'storage',
    summary: 'The Windows store component, which handles memory compression and paging, caught an unexpected exception.',
    meaning: 'The store component manages compressed memory and paging. When it catches an exception it cannot handle, Windows stops. Failing or incompatible storage, outdated storage drivers and security software are commonly associated with this code.',
    causes: [
      'A failing or unreliable SSD or hard drive',
      'Outdated storage controller drivers or SSD firmware',
      'Security software conflicting with storage access',
      'Damaged system files',
    ],
    steps: [
      step.drive(),
      { title: 'Update storage drivers and SSD firmware', detail: 'Install the chipset and storage package from the motherboard or laptop maker, and check the SSD maker\'s utility for a firmware update. Back up before any firmware update.' },
      { title: 'Test without third-party security software', detail: 'Uninstall third-party antivirus temporarily and rely on Windows Security while you test. Reinstall the latest version afterwards if it was not the cause.' },
      step.sfc(),
      step.memory(),
    ],
    escalate: 'If SMART data shows errors or the drive disappears at random, treat the drive as failing and back up immediately.',
    related: [GUIDE.ssd, GUIDE.nvme, GUIDE.decode],
  },
  {
    slug: 'driver-power-state-failure',
    name: 'DRIVER_POWER_STATE_FAILURE',
    hex: '0x0000009F',
    category: 'drivers',
    summary: 'A driver did not respond correctly while the PC changed power state, such as sleeping, waking or shutting down.',
    meaning: 'When Windows changes power state, every driver must cooperate. If one fails to respond in time or ends up in an inconsistent state, Windows stops. Network, graphics, USB and storage drivers are common culprits, and settings such as Fast Startup can make the problem more likely.',
    causes: [
      'An outdated or faulty driver that mishandles sleep, wake or shutdown',
      'Aggressive power-saving settings on network or USB devices',
      'Fast Startup combined with problem drivers',
      'Old BIOS or chipset firmware',
    ],
    steps: [
      { title: 'Work out when it happens', detail: 'Note whether the crash occurs when going to sleep, waking, restarting or shutting down. That tells you which transition the faulty driver fails on, and whether it happens on a laptop only on battery.' },
      { title: 'Update chipset, graphics, network and USB drivers', detail: 'Get them from the PC or motherboard maker, not only Windows Update. Restart afterwards and test the transition that crashed.' },
      { title: 'Turn off Fast Startup', detail: 'Open Control Panel, Power Options, Choose what the power buttons do, Change settings that are currently unavailable, then untick Turn on fast startup. Restart and test again.' },
      { title: 'Loosen device power saving', detail: 'In Device Manager, open the properties of network adapters and USB hubs, and where a Power Management tab exists, untick Allow the computer to turn off this device to save power.' },
      step.undo(),
    ],
    escalate: 'If crashes only happen on wake from sleep and every driver is current, check for a BIOS update, which often contains power-management fixes.',
    related: [GUIDE.decode, GUIDE.freezes, GUIDE.device],
  },
  {
    slug: 'store-data-structure-corruption',
    name: 'STORE_DATA_STRUCTURE_CORRUPTION',
    hex: '0x000001C7',
    category: 'storage',
    summary: 'The Windows store component detected corruption in its data structures.',
    meaning: 'The store component keeps its own data structures for memory compression and paging. This stop means it found them damaged. Drive problems, driver issues, damaged system files or a sudden power loss can contribute, so it is wise to check storage and system files first.',
    causes: [
      'A drive with errors or an unreliable controller connection',
      'Outdated storage drivers or SSD firmware',
      'Damaged system files after an interrupted update or power loss',
      'Faulty RAM, less often',
    ],
    steps: [
      step.drive(),
      step.sfc(),
      { title: 'Scan the file system', detail: 'Open Terminal (Admin) and run `chkdsk C: /scan`. If it finds errors, back up first and then schedule a repair with `chkdsk C: /f`.' },
      { title: 'Update storage drivers and firmware', detail: 'Install the chipset and storage package from the PC or motherboard maker, and check the SSD maker\'s utility for new firmware.' },
      step.memory(),
    ],
    escalate: 'Recurring corruption on a healthy-looking drive can mean a power-delivery or controller problem, so test with another drive if you can.',
    related: [GUIDE.ssd, GUIDE.nvme, GUIDE.decode],
  },
  {
    slug: 'pfn-list-corrupt',
    name: 'PFN_LIST_CORRUPT',
    hex: '0x0000004E',
    category: 'memory',
    summary: 'Windows found damage in the list it uses to track pages of physical memory. A driver passing bad memory information is the most common cause, with memory hardware a possibility.',
    meaning: 'Bug check 0x4E means the page frame number (PFN) list, which the memory manager uses to keep track of physical memory pages, is corrupted. Microsoft notes that the usual cause is a driver handing the memory manager a bad memory descriptor list, for example by unlocking the same pages twice. A few subtypes instead point toward hardware, such as single-bit memory errors or broken DMA transfers. The stop code alone does not say which side the fault is on.',
    causes: [
      'A driver that mishandles memory descriptor lists, often one recently installed or updated',
      'Storage, network, security or virtualization software that works close to the kernel',
      'Faulty RAM, including single-bit errors that corrupt the page tables',
      'A memory profile (XMP, EXPO) or overclock that is not stable',
    ],
    steps: [
      step.undo(),
      step.identifyDriver(),
      step.stock(),
      step.memory(),
      step.sfc(),
    ],
    escalate: 'If the crashes continue with every recent driver change removed, stock settings and a clean full memory test, keep the minidump and have a technician read the first parameter with a debugger. That one value separates a driver fault from a hardware fault far better than the stop code does.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x4E',
      paragraphs: [
        'Microsoft’s bug check reference says the first parameter of 0x4E names the kind of violation, and the other parameters change meaning with it. That is why two PFN_LIST_CORRUPT crashes can have different causes.',
        'Windows normally saves a small dump in `C:\\Windows\\Minidump`, and the BugCheck event (ID 1001 in the System log of Event Viewer) records the parameters. If crashes repeat, keep those files: a debugger’s `!analyze -v` output shows the subtype and may name the driver involved.',
      ],
      table: {
        caption: 'What the first parameter of 0x4E can mean',
        headers: ['First parameter', 'What Microsoft describes', 'Where to look first'],
        rows: [
          ['0x1 or 0x2', 'A list head or list entry in the PFN lists was corrupted', 'Recent driver changes, then memory'],
          ['0x6', 'The hardware or prototype page table entries were corrupted, which Microsoft says can come from single-bit memory errors or broken DMA transfers', 'Memory test at stock settings, then devices that use DMA'],
          ['0x7', 'A driver unlocked a page more times than it locked it', 'The driver named in the dump'],
          ['0x8D', 'The free page list holds a page in an inconsistent state, which Microsoft says most likely indicates a hardware problem', 'Memory test and stock settings'],
          ['0x9A', 'A driver tried to free a page that was still locked for I/O', 'The driver named in the dump'],
        ],
      },
      faq: [
        { question: 'Does PFN_LIST_CORRUPT mean my RAM is bad?', answer: 'Not necessarily. Microsoft says the most common cause is a driver passing a bad memory descriptor list. Faulty RAM is possible, particularly for subtypes that mention single-bit errors, so test memory but also review recent driver changes.' },
        { question: 'What does 0x4E mean in PFN_LIST_CORRUPT (0x0000004E)?', answer: '0x4E and 0x0000004E are the same bug check number written two ways. The first parameter in the crash record identifies the specific violation.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x4E PFN_LIST_CORRUPT', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x4e--pfn-list-corrupt' }],
    },
    related: [GUIDE.ram, GUIDE.decode, GUIDE.freezes],
  },
  {
    slug: 'registry-error',
    name: 'REGISTRY_ERROR',
    hex: '0x00000051',
    category: 'system',
    summary: 'Windows hit a severe problem reading or maintaining the registry. Storage trouble or file-system damage is the first thing to rule out.',
    meaning: 'Bug check 0x51 means a severe registry error occurred. Microsoft describes two causes: an I/O error while the registry was reading one of its files, which can come from hardware problems or file system corruption, and a failed refresh operation that only the security system uses and that fails only when resource limits are reached. In practice, the first is the one home users meet, which is why the drive and file system deserve attention before anything else.',
    causes: [
      'A drive that is failing or returning read errors',
      'File system corruption, often after power loss or a forced shutdown',
      'A loose or faulty storage cable, or an unreliable storage controller',
      'Registry files damaged during an interrupted Windows update',
    ],
    steps: [
      { title: 'Back up your files first', detail: 'If Windows still starts, copy important files to another drive before running any repair. Read errors on the drive that holds the registry can get worse under heavy repair activity.' },
      step.drive(),
      { title: 'Scan the file system', detail: 'Open Terminal (Admin) and run `chkdsk C: /scan`, which checks the volume without locking it for repair. If it reports problems, follow its guidance, ideally after your backup is complete.' },
      step.sfc(),
      step.safeMode(),
    ],
    escalate: 'If the drive reports bad or pending sectors, or REGISTRY_ERROR returns after a repair, treat the drive as unreliable: back up what you can and plan to replace it rather than reinstalling onto the same disk.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x51',
      paragraphs: [
        'Microsoft’s reference lists the third parameter as a pointer to the registry hive and the fourth as the result of its hive check, when available. These are meant for debugging, so most people will get more from Event Viewer: look in Windows Logs, System for disk, ntfs or Kernel-Power entries near the time of each crash.',
        'Because the registry lives in files on disk, the cause is usually found outside the registry itself. A drive health tool and the Event Viewer disk entries are the quickest ways to tell storage trouble from a one-off interruption.',
      ],
      table: {
        caption: 'Match what you observe to the next check',
        headers: ['What you observe', 'What it may suggest', 'Next check'],
        rows: [
          ['Disk or ntfs errors appear in Event Viewer near the crash', 'The registry could not read its files reliably', 'Check drive health and run `chkdsk C: /scan` after backing up'],
          ['The crash followed a power cut or forced shutdown', 'File system damage from an unclean shutdown', 'Run the file system scan and System File Checker'],
          ['The crash followed an interrupted Windows update', 'Registry or system files may be inconsistent', 'Run DISM and System File Checker, then retry the update'],
          ['Other stop codes appear on the same PC', 'Storage or memory may be unreliable more broadly', 'List every code from Event Viewer and test both drive and memory'],
        ],
      },
      faq: [
        { question: 'Is REGISTRY_ERROR caused by a registry cleaner or a bad registry edit?', answer: 'It can be, but Microsoft’s own description centres on I/O errors reading the registry files, which points to the drive or file system. A related stop code, BAD_SYSTEM_CONFIG_INFO, is the one Microsoft links to missing keys after manual edits.' },
        { question: 'Do I need to reinstall Windows after REGISTRY_ERROR?', answer: 'Not as a first step. Back up your files, check the drive and file system, and run System File Checker. Reinstall onto a new drive if the old one is reporting errors.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x51 REGISTRY_ERROR', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x51--registry-error' }],
    },
    related: [GUIDE.ssd, GUIDE.decode, GUIDE.wontStart],
  },
  {
    slug: 'driver-verifier-detected-violation',
    name: 'DRIVER_VERIFIER_DETECTED_VIOLATION',
    hex: '0x000000C4',
    category: 'drivers',
    summary: 'Driver Verifier caught a driver breaking a kernel rule and stopped Windows on purpose. Turning Driver Verifier off stops the crashes, but the driver it named is still the problem.',
    meaning: 'Bug check 0xC4 is the general code Windows raises when Driver Verifier, a built-in driver testing tool, detects a fatal violation in a driver. The driver broke a kernel rule such as calling a function at the wrong interrupt level, freeing memory twice or writing past the end of a memory allocation, and Verifier stopped the system at that point so the fault could be found. Driver Verifier is not switched on by default, so this stop code usually means someone, or some tool, turned it on.',
    causes: [
      'Driver Verifier was enabled, by you, a technician or a driver-testing tool, and is checking a driver that breaks kernel rules',
      'A driver with a real defect, such as memory misuse or incorrect locking, that Verifier caught early',
      'A third-party or outdated driver that has not been updated for your Windows version',
    ],
    steps: [
      { title: 'Check whether Driver Verifier is running', detail: 'Open Terminal (Admin) and run `verifier /querysettings`. If it lists drivers or flags, Driver Verifier is enabled on this PC.' },
      { title: 'Switch Driver Verifier off', detail: 'Run `verifier /reset` in Terminal (Admin) and restart. If Windows crashes during start-up, open Safe Mode first (hold Shift while choosing Restart, then Troubleshoot, Advanced options, Startup Settings) and run the same command there.' },
      step.identifyDriver(),
      step.undo('Verifier names the driver it caught, so reverting or updating that specific driver is the real fix.'),
      { title: 'Update or remove the driver it named', detail: 'Install the latest version from the device or PC maker. If no fixed version exists, uninstall the software that installed the driver, or replace the device, because Driver Verifier only reports faults and cannot repair them.' },
    ],
    escalate: 'Turning Driver Verifier off hides the symptom, not the faulty driver. If the same driver keeps being named, keep the minidump and report it to the driver’s maker, and avoid turning Verifier back on unless you are deliberately testing.',
    deepDive: {
      heading: 'Reading the crash evidence for 0xC4',
      paragraphs: [
        'Microsoft’s reference says the first parameter identifies the type of violation and the remaining parameters depend on it. The same stop code can therefore mean anything from a memory-allocation mistake to a deadlock.',
        'Windows normally saves a small dump in `C:\\Windows\\Minidump`. A debugger’s `!analyze -v` output shows the first parameter and the driver on the stack, which together identify the faulty driver far more precisely than the stop code.',
      ],
      table: {
        caption: 'Common first-parameter values for 0xC4',
        headers: ['First parameter', 'What Microsoft describes', 'What it suggests'],
        rows: [
          ['0x1 or 0x2', 'A pool allocation made at an interrupt level that is too high', 'Incorrect driver code'],
          ['0x10 to 0x14', 'Freeing memory that was never allocated or was already freed', 'Incorrect driver code'],
          ['0x51 to 0x59', 'Writing past the end of a pool allocation', 'Memory corruption by the driver'],
          ['0x60 to 0x62', 'A driver unloaded without freeing its pool allocations', 'A leak when the driver unloads'],
          ['0xC0 to 0xC3', 'An I/O routine was called or returned with interrupts disabled', 'Incorrect driver code'],
          ['0x1000 or 0x1001', 'A deadlock detected by Verifier’s deadlock detection', 'Incorrect locking in the driver'],
          ['0x2000 to 0x2005', 'Code integrity violations such as executable pool', 'A driver breaking memory protection rules'],
        ],
      },
      faq: [
        { question: 'Is DRIVER_VERIFIER_DETECTED_VIOLATION caused by Driver Verifier itself?', answer: 'No. Driver Verifier is the tool that catches the fault. The fault is in a driver. Turning Verifier off stops the blue screen, but the driver stays defective and may cause other problems.' },
        { question: 'How do I turn off Driver Verifier?', answer: 'Open Terminal as administrator, type verifier /reset, press Enter, and restart. If Windows cannot start normally, run the same command from Safe Mode.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0xC4 DRIVER_VERIFIER_DETECTED_VIOLATION', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0xc4--driver-verifier-detected-violation' }],
    },
    related: [GUIDE.decode, GUIDE.device, GUIDE.wontStart],
  },
  {
    slug: 'driver-corrupted-expool',
    name: 'DRIVER_CORRUPTED_EXPOOL',
    hex: '0x000000C5',
    category: 'drivers',
    summary: 'Windows touched invalid memory at an interrupt level that was too high. A driver that damaged the system memory pool is almost certainly behind it.',
    meaning: 'Bug check 0xC5 means the system tried to access invalid memory, or pageable memory, at an interrupt request level (IRQL) that was too high. Microsoft states the ultimate cause is almost certainly a driver that corrupted the system memory pool, usually by damaging a small allocation. Larger allocations that are damaged usually raise a different code, DRIVER_CORRUPTED_MMPOOL (0xD0).',
    causes: [
      'A driver that writes outside the memory it was given, often one recently installed or updated',
      'Software that installed a driver incorrectly or only partly',
      'An outdated driver that does not match the installed Windows version',
      'Unstable RAM or memory settings that damage data the driver relies on',
    ],
    steps: [
      step.undo('Microsoft also suggests checking that any new software was installed correctly.'),
      step.identifyDriver(),
      { title: 'Install updated drivers from the maker', detail: 'Check the PC, motherboard or device maker’s support page for newer versions, particularly for network, storage, graphics and security software. Avoid third-party driver-updater tools.' },
      step.stock(),
      step.memory(),
    ],
    escalate: 'If the same driver keeps appearing, remove that software and test without it. If you want to find an unnamed culprit, a technician can use Driver Verifier’s special pool option, which can make the PC crash more often while it hunts, so only do it with a backup and the knowledge to switch it off with `verifier /reset`.',
    deepDive: {
      heading: 'Reading the crash evidence for 0xC5',
      paragraphs: [
        'Microsoft’s reference gives the four parameters of 0xC5 as the memory that was referenced, the IRQL at the time, whether the access was a read or a write, and the address of the code that made the reference. The last one is the most useful: it points to the driver that was running when the damage was found.',
        'Pool corruption is often found long after it happens, so the driver named is not always the one that caused it. A debugger’s `!analyze -v` output and the same driver appearing across several dumps are stronger evidence than any single crash.',
      ],
      table: {
        caption: 'The four parameters of 0xC5',
        headers: ['Parameter', 'What Microsoft says it holds', 'Why it helps'],
        rows: [
          ['First', 'The memory that was referenced', 'Shows what was touched'],
          ['Second', 'The IRQL at the time of the reference', 'A high value explains why pageable memory could not be used'],
          ['Third', '0 for a read, 1 for a write', 'Separates reading bad data from writing it'],
          ['Fourth', 'The address of the code that referenced the memory', 'Points to the driver that was running'],
        ],
      },
      faq: [
        { question: 'What is the difference between 0xC5 and 0xD0?', answer: 'Microsoft says 0xC5 usually appears when a driver corrupts a small pool allocation, smaller than a page, while corruption of larger allocations produces DRIVER_CORRUPTED_MMPOOL (0xD0).' },
        { question: 'Can I fix DRIVER_CORRUPTED_EXPOOL without a debugger?', answer: 'Often, yes. Remove or update the driver or software installed just before the crashes began, note any file name shown on the blue screen, and run a memory test. A debugger helps when no recent change explains it.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0xC5 DRIVER_CORRUPTED_EXPOOL', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0xc5--driver-corrupted-expool' }],
    },
    related: [GUIDE.decode, GUIDE.device, GUIDE.ram],
  },
  {
    slug: 'bad-system-config-info',
    name: 'BAD_SYSTEM_CONFIG_INFO',
    hex: '0x00000074',
    category: 'boot',
    summary: 'Windows found a problem in the system registry settings it needs to start, such as a damaged or missing critical key.',
    meaning: 'Bug check 0x74 indicates an error in the registry. Microsoft says it can occur if the SYSTEM registry hive is corrupt, although that is unlikely because the boot loader checks the hive when it loads it. It can also occur when critical registry keys or values are missing, for example after someone edited the registry by hand or an application or service damaged it.',
    causes: [
      'Manual registry edits or a registry “cleaner” that removed an important key',
      'An application or service that corrupted the registry',
      'Registry data damaged by an interrupted update or an unclean shutdown',
      'A failing drive, or a drive with too little free space for Windows to work',
    ],
    steps: [
      { title: 'Look for registry events in Event Viewer', detail: 'If Windows starts, open Event Viewer, then Windows Logs, System, and look for registry-related errors around the time of the crash. An event that names a hive or key tells you where to focus.' },
      step.undo('If the crash followed a registry edit or a registry-cleaning tool, reverse that change or restore from a restore point.'),
      step.sfc(),
      { title: 'Check free space and drive health', detail: 'Microsoft advises confirming that the drive has enough free space for Windows to function normally. Check the drive’s SMART health too, because a failing drive can corrupt registry files.' },
      { title: 'Try Safe Mode, then restore', detail: 'Boot into Safe Mode and restart normally. If the crash continues, use System Restore with a restore point from before the problem. If that fails, use the Reset this PC option or Windows installation media to repair or reinstall, with your files backed up first.' },
    ],
    escalate: 'If the registry is too damaged to restore, Microsoft’s own guidance runs from a restore point to resetting the PC and finally reinstalling Windows from installation media. Back up what you can before each step, and replace the drive if it reports errors.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x74',
      paragraphs: [
        'Microsoft’s reference says the first three parameters are reserved and the fourth holds an NT status value, when available. That status often names the cause directly: 0xC000014C, for example, is the code for “the registry is corrupt”.',
        'If Windows will not start, you can read the stop code and the status from the blue screen photo or from the minidump after repairing the PC. Booting from Windows installation media and choosing Repair is a safer route than editing the registry offline.',
      ],
      table: {
        caption: 'Match what you observe to the next check',
        headers: ['What you observe', 'What it may suggest', 'Next check'],
        rows: [
          ['The crash followed a registry edit or cleaner', 'A critical key or value is missing', 'Restore from a restore point from before the change'],
          ['The status in the fourth parameter is 0xC000014C', 'A registry data file is corrupt or could not be recovered', 'Restore or repair using installation media'],
          ['The drive is nearly full', 'Windows may lack space to work and write registry data', 'Free space, then rerun System File Checker'],
          ['Disk errors appear in Event Viewer', 'The drive may be damaging registry files', 'Check drive health and back up data'],
        ],
      },
      faq: [
        { question: 'What is the difference between BAD_SYSTEM_CONFIG_INFO and REGISTRY_ERROR?', answer: 'Both involve the registry. Microsoft describes REGISTRY_ERROR mainly as an I/O error while the registry reads its files, and BAD_SYSTEM_CONFIG_INFO as damaged or missing critical settings that Windows needs, such as keys removed by manual edits.' },
        { question: 'Can I fix BAD_SYSTEM_CONFIG_INFO by editing the registry?', answer: 'Editing it by hand is the most likely way to cause this stop code, so restoring from a restore point or repairing with installation media is safer than manual edits.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x74 BAD_SYSTEM_CONFIG_INFO', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x74--bad-system-config-info' }],
    },
    related: [GUIDE.wontStart, GUIDE.decode, GUIDE.ssdFull],
  },
  {
    slug: 'attempted-write-to-readonly-memory',
    name: 'ATTEMPTED_WRITE_TO_READONLY_MEMORY',
    hex: '0x000000BE',
    category: 'drivers',
    summary: 'A driver tried to write to memory that is marked read-only. Windows often names the driver on the blue screen.',
    meaning: 'Bug check 0xBE means a driver attempted to write to a read-only memory segment. Microsoft’s reference says that when Windows can identify the offending driver, it prints the driver’s name on the blue screen, which makes this one of the more traceable stop codes. The name shown is the code that was running, so it is where to start rather than proof of the root cause.',
    causes: [
      'A driver with a defect that writes to memory it should only read',
      'An outdated or incompatible driver, often after a Windows update',
      'Security, virtualization or overlay software that hooks deeply into the system',
      'Less often, unreliable memory that corrupts data the driver depends on',
    ],
    steps: [
      step.identifyDriver(),
      step.undo(),
      { title: 'Install an updated driver or software version', detail: 'Search the file name shown on the blue screen to find which driver or program it belongs to, then install the current version from the device, PC or software maker. If no update exists, uninstall that software and test without it.' },
      step.sfc(),
      step.stock(),
      step.safeMode(),
    ],
    escalate: 'If no driver is named and the crashes continue after updates, settings and system-file checks, keep the minidump and have it read with a debugger, which can show the address and the driver on the stack.',
    deepDive: {
      heading: 'Reading the crash evidence for 0xBE',
      paragraphs: [
        'Microsoft’s reference gives the first parameter as the virtual address of the attempted write and the second as the contents of its page table entry. The last two are reserved. You rarely need them unless a debugger is involved.',
        'The driver name Windows prints is stored in memory when the PC crashes and ends up in the minidump. Matching that name against the date your crashes began, in Reliability Monitor, is often enough to find the change responsible.',
      ],
      table: {
        caption: 'Match what you observe to the next check',
        headers: ['What you observe', 'What it may suggest', 'Next check'],
        rows: [
          ['A .sys file name is shown on the blue screen', 'That driver was running when the write was attempted', 'Identify its owner and update or remove it'],
          ['Crashes began after a Windows update', 'An older driver may not suit the new build', 'Install the maker’s current driver, or remove the update to test'],
          ['Crashes began after installing security or overlay software', 'Low-level hooks may conflict with Windows protections', 'Uninstall it and retest'],
          ['No driver is named and other stop codes appear too', 'Memory or another component may be involved', 'Run a full memory test and list every stop code'],
        ],
      },
      faq: [
        { question: 'Is ATTEMPTED_WRITE_TO_READONLY_MEMORY a hardware problem?', answer: 'It is usually a driver or software problem, because the stop code means a driver wrote where it should not. Unreliable memory is a less common possibility if no driver is named and other crashes occur.' },
        { question: 'Which driver is responsible?', answer: 'If Windows could identify it, the .sys file name appears on the blue screen. Searching that file name shows which device or program it belongs to.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0xBE ATTEMPTED_WRITE_TO_READONLY_MEMORY', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0xbe--attempted-write-to-readonly-memory' }],
    },
    related: [GUIDE.decode, GUIDE.device, GUIDE.crashes],
  },
  {
    slug: 'resource-not-owned',
    name: 'RESOURCE_NOT_OWNED',
    hex: '0x000000E3',
    category: 'system',
    summary: 'A piece of Windows or a driver tried to release a lock it did not hold. It usually points to a driver or file-system component rather than hardware.',
    meaning: 'Bug check 0xE3 means a thread tried to release a resource, a kind of internal lock, that it did not own. Microsoft’s reference does not list causes, but the meaning implies a driver or component whose lock handling is wrong, such as releasing a lock twice or on the wrong thread. It is an uncommon stop code, so a recent driver, update or low-level program is the most useful place to start.',
    causes: [
      'A driver or file-system filter that handles locks incorrectly',
      'A recently installed or updated driver, especially for storage, security or backup software',
      'An outdated component that conflicts with the installed Windows version',
    ],
    steps: [
      step.undo(),
      { title: 'Install pending Windows updates', detail: 'Open Settings, Windows Update and install anything waiting, including optional driver updates from the PC maker. A fixed component may already be available.' },
      step.identifyDriver(),
      { title: 'Check security, backup and disk tools', detail: 'Antivirus, backup, encryption and disk utilities often install file-system filter drivers. Update or temporarily uninstall the one you added most recently, and retest.' },
      step.sfc(),
    ],
    escalate: 'If the crash repeats with the same driver or program involved, keep the minidump and report it to the maker. A debugger can show the resource and the thread that tried to release it.',
    deepDive: {
      heading: 'Reading the crash evidence for 0xE3',
      paragraphs: [
        'Microsoft’s reference gives the first three parameters as the address of the resource, the address of the thread, and the address of the owner table, if one exists. They are mainly useful to a developer with a debugger, together with the call stack that shows which driver made the release.',
        'For most people, the practical evidence is timing. Reliability Monitor shows when the crashes started, and a driver, update or tool installed at that time is the most likely cause.',
      ],
      table: {
        caption: 'Match what you observe to the next check',
        headers: ['What you observe', 'What it may suggest', 'Next check'],
        rows: [
          ['The crash began after a driver or software install', 'That component may mishandle locks', 'Remove or update it and retest'],
          ['The crash happens during disk-heavy work such as backup', 'A file-system filter driver may be involved', 'Update or disable backup or security tools one at a time'],
          ['The crash began after a Windows update', 'An older driver may conflict with the new build', 'Install the maker’s current drivers'],
        ],
      },
      faq: [
        { question: 'Does RESOURCE_NOT_OWNED mean my hardware is failing?', answer: 'Not usually. The code describes a lock being released by a thread that did not hold it, which is a software fault. If it appears alongside other stop codes, test memory and storage as well.' },
        { question: 'Why is so little written about this stop code?', answer: 'Microsoft’s reference lists the parameters but not specific causes or fixes, so advice is based on what the code means: look at recent drivers, updates and low-level software first.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0xE3 RESOURCE_NOT_OWNED', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0xe3--resource-not-owned' }],
    },
    related: [GUIDE.decode, GUIDE.update, GUIDE.freezes],
  },
  {
    slug: 'critical-structure-corruption',
    name: 'CRITICAL_STRUCTURE_CORRUPTION',
    hex: '0x00000109',
    category: 'system',
    summary: 'Windows detected that critical kernel code or data was changed. A driver, unstable memory or settings that corrupt memory are the usual places to look.',
    meaning: 'Bug check 0x109 means the kernel detected corruption of critical kernel code or data. Microsoft lists three causes: a driver modifying kernel code or data, a kernel breakpoint set without a debugger attached, and hardware corruption such as kernel code or data held in failing memory. The fourth parameter says which kind of structure was damaged, which is why two crashes with this code can have different causes.',
    causes: [
      'A driver or low-level tool that modifies protected kernel code or data',
      'Faulty RAM or memory settings that are not stable',
      'Recently installed or updated drivers, particularly for security, overclocking or monitoring software',
      'A debugging tool or breakpoint left active without a debugger attached',
    ],
    steps: [
      { title: 'Check Event Viewer for the device or driver involved', detail: 'Open Event Viewer, then Windows Logs, System, and look for errors close to each crash that identify a device or driver.' },
      step.undo(),
      step.identifyDriver(),
      step.stock(),
      step.memory(),
      { title: 'Run the maker’s hardware diagnostics', detail: 'Many PC and laptop makers include a hardware test in the BIOS or boot menu or as a downloadable tool. Run the memory and drive tests it offers, and confirm any new hardware is compatible with your version of Windows.' },
    ],
    escalate: 'If memory tests and maker diagnostics fail, replace the part that reports the fault. If everything passes and the crashes continue, keep the minidump for a debugger-informed diagnosis before reinstalling Windows.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x109',
      paragraphs: [
        'Microsoft’s reference says the first three parameters are reserved and the fourth identifies the type of the corrupted region. That one value is the key to the crash: it tells a debugger whether kernel code, a table, a list or a driver object was changed.',
        'Hardware is a documented cause as well as software. Microsoft’s basic troubleshooting for this code includes checking Event Viewer, disabling or updating a named driver, running Windows Memory Diagnostic and running the manufacturer’s hardware diagnostics.',
      ],
      table: {
        caption: 'Some fourth-parameter values for 0x109 documented by Microsoft',
        headers: ['Fourth parameter', 'What Microsoft describes', 'What it suggests'],
        rows: [
          ['0x0', 'A generic data region', 'Corruption of protected data'],
          ['0x1', 'A function modification', 'Something altered kernel code'],
          ['0x2', 'A processor interrupt dispatch table (IDT)', 'Something altered a core CPU table'],
          ['0x19', 'Modification of the loaded module list', 'A driver or tool altered kernel structures'],
          ['0x1C', 'Driver object corruption', 'A driver’s own data was damaged'],
          ['0x27, 0x28 or 0x29', 'Type 1, 2 or 3 pool corruption', 'Memory pool damage, often by a driver'],
          ['0x101', 'General pool corruption', 'Memory pool damage'],
          ['0x102', 'Modification of win32k.sys', 'Alteration of a core graphics component'],
        ],
      },
      faq: [
        { question: 'Is CRITICAL_STRUCTURE_CORRUPTION caused by malware?', answer: 'The stop code means kernel code or data was changed, and Microsoft attributes that to drivers, debugging tools or hardware corruption rather than naming malware. If you see other signs of infection, run a full Microsoft Defender scan.' },
        { question: 'How is 0x109 different from 0x139?', answer: 'Both involve corruption, but KERNEL_SECURITY_CHECK_FAILURE (0x139) reports a damaged critical data structure caught by a runtime check, while 0x109 reports that critical kernel code or data was modified, with its fourth parameter naming what changed.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x109 CRITICAL_STRUCTURE_CORRUPTION', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x109---critical-structure-corruption' }],
    },
    related: [GUIDE.decode, GUIDE.ram, GUIDE.freezes],
  },
  {
    slug: 'kernel-mode-heap-corruption',
    name: 'KERNEL_MODE_HEAP_CORRUPTION',
    hex: '0x0000013A',
    category: 'system',
    summary: 'Windows detected damage inside a kernel memory heap. A driver misusing memory is the most common reason, with unstable memory a possibility.',
    meaning: 'Bug check 0x13A means the kernel-mode heap manager detected corruption in a heap. Microsoft’s reference describes the first parameter as the type of corruption, such as a buffer overrun, a buffer underrun, a block used after it was freed, or a corrupted free list. All of these usually trace back to code that wrote outside the memory it owned, which is why drivers are the first suspect.',
    causes: [
      'A driver that writes past the end of, or before the start of, a memory block',
      'A driver that uses memory after releasing it, or releases it twice',
      'Recently installed or updated drivers, especially after hardware changes',
      'Faulty RAM or unstable memory settings that corrupt data in memory',
    ],
    steps: [
      step.undo('Heap corruption often begins right after hardware or drivers change.'),
      step.identifyDriver(),
      step.stock(),
      step.memory(),
      step.sfc(),
    ],
    escalate: 'If the crashes continue after a clean memory test and a driver review, keep the minidump. A debugger can show the first parameter and the call stack, which names the code performing the faulty heap operation.',
    deepDive: {
      heading: 'Reading the crash evidence for 0x13A',
      paragraphs: [
        'Microsoft’s reference gives the first parameter as the type of heap corruption, the second as the heap that reported it, and the third as the address where it was detected. The first parameter is the one to note, because it tells you how the heap was damaged.',
        'Windows normally saves a small dump in `C:\\Windows\\Minidump`. If several crashes show the same first parameter and the same driver on the stack, that driver is the leading suspect.',
      ],
      table: {
        caption: 'Some first-parameter values for 0x13A documented by Microsoft',
        headers: ['First parameter', 'What Microsoft describes', 'What it suggests'],
        rows: [
          ['0x3 or 0x4', 'One or more corrupt entry headers', 'Memory was overwritten near a block'],
          ['0x6', 'Corruption consistent with a buffer overrun', 'Code wrote past the end of a block'],
          ['0x7', 'Corruption consistent with a buffer underrun', 'Code wrote before the start of a block'],
          ['0xB', 'Error consistent with using a block after freeing it', 'Use after free'],
          ['0xD', 'A corrupt free list, possibly use after free or an overflow of a nearby block', 'Memory misuse by a driver'],
          ['0x13', 'The heap routine was passed a NULL heap handle', 'A driver calling the heap with a bad handle'],
        ],
      },
      faq: [
        { question: 'Is KERNEL_MODE_HEAP_CORRUPTION caused by bad RAM?', answer: 'It can be, but Microsoft’s descriptions of its subtypes, such as overruns and use after free, point mostly to code misusing memory. Test RAM, and also review recent driver and hardware changes.' },
        { question: 'Why did it start after I changed PC parts?', answer: 'New hardware often brings new drivers, and a driver that misuses memory can cause this code. Install the current drivers from the maker and check that new memory is running at a stable setting.' },
      ],
      sources: [{ label: 'Microsoft Learn: Bug Check 0x13A KERNEL_MODE_HEAP_CORRUPTION', url: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x13a--kernel-mode-heap-corruption' }],
    },
    related: [GUIDE.decode, GUIDE.ram, GUIDE.freezes],
  },
];

export const bsodBySlug = new Map(bsodEntries.map(entry => [entry.slug, entry]));

/** Other codes in the same category, used for internal linking between code pages. */
export function relatedBsodCodes(entry: BsodEntry, limit = 4): BsodEntry[] {
  return bsodEntries.filter(other => other.category === entry.category && other.slug !== entry.slug).slice(0, limit);
}

/**
 * Finds codes from a typed or pasted query: a hex code ("0xEF", "000000EF"), a stop code name,
 * a pasted sentence containing the name, or plain words ("page fault").
 */
export function searchBsod(query: string): BsodEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return bsodEntries;
  const upper = trimmed.toUpperCase();
  const tokens = upper.split(/[^A-Z0-9_]+/).filter(Boolean);
  const hexTokens = tokens
    .filter(token => token.startsWith('0X') || token.length >= 2)
    .map(token => token.replace(/^0X/, ''))
    .filter(token => /^[0-9A-F]{1,8}$/.test(token))
    .map(token => token.replace(/^0+/, '') || '0');
  const underscored = upper.replace(/\s+/g, '_');
  const wordTokens = tokens.filter(token => token.length >= 3);

  const scored: { entry: BsodEntry; score: number; order: number }[] = [];
  bsodEntries.forEach((entry, order) => {
    const entryHex = entry.hex.replace(/^0x/i, '').replace(/^0+/, '') || '0';
    let score = 0;
    if (hexTokens.includes(entryHex)) score = 100;
    else if (upper.includes(entry.name) || tokens.includes(entry.name)) score = 90;
    else if (underscored.length >= 3 && entry.name.includes(underscored)) score = 70;
    else if (wordTokens.length) {
      const nameHaystack = entry.name.replace(/_/g, ' ');
      const fullHaystack = `${nameHaystack} ${entry.summary.toUpperCase()} ${bsodCategoryLabels[entry.category].toUpperCase()}`;
      if (wordTokens.every(token => nameHaystack.includes(token))) score = 60;
      else if (wordTokens.every(token => fullHaystack.includes(token))) score = 30;
    }
    if (score > 0) scored.push({ entry, score, order });
  });
  return scored.sort((a, b) => b.score - a.score || a.order - b.order).map(item => item.entry);
}