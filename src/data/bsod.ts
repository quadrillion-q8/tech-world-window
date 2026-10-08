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
    meaning: 'Some memory must stay in RAM at all times. When Windows asks for such a page and it is invalid, the system cannot recover. Faulty RAM, a driver writing to the wrong address, or a damaged file system are the usual explanations, and security software that hooks deep into the system has also been implicated.',
    causes: [
      'Faulty or badly seated RAM',
      'A driver or security tool corrupting memory',
      'File system corruption on the system drive',
      'A memory overclock or XMP/EXPO profile that is not stable',
    ],
    steps: [
      step.memory(),
      { title: 'Reseat and isolate the RAM sticks', detail: 'Power off, unplug the PC and reseat each stick firmly. If you have more than one, test with a single stick in the slot your motherboard manual recommends, then swap sticks. A crash that follows one stick identifies it.' },
      { title: 'Scan the file system', detail: 'Open Terminal (Admin) and run `chkdsk C: /scan`. It checks the volume without taking it offline. Back up first if the drive is old or has shown errors.' },
      step.stock(),
      step.undo(),
    ],
    escalate: 'Memory errors in a test mean replacing the stick, not tuning around it. If tests pass but crashes continue, look at the most recently installed drivers and security software.',
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
    summary: 'Windows detected corruption in a critical kernel data structure and stopped.',
    meaning: 'The kernel runs integrity checks on important data structures. This stop means one of those checks failed. Faulty drivers, incompatible software, memory or disk errors and damaged system files can all corrupt kernel data.',
    causes: [
      'Outdated or incompatible drivers',
      'Memory errors',
      'Damaged system files or drive errors',
      'Incompatible third-party security or system tools',
    ],
    steps: [step.undo(), step.sfc(), step.memory(), step.drive(), step.stock()],
    escalate: 'Repeated occurrences with clean memory and drive tests justify a clean Windows installation to rule out deep software corruption.',
    related: [GUIDE.decode, GUIDE.ram, GUIDE.ssd],
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
