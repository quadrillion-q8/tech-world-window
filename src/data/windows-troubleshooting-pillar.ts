import type { Article } from './articles';

/**
 * Universal Windows troubleshooting pillar.
 *
 * Content rules for this file:
 * - Every in-page link target ("#...") must match a heading in this article (checked by validate-build).
 * - Every internal link ("/...") must resolve to an indexable route (checked by validate-build).
 * - Use `inline code` with backticks for commands; avoid backticks in FAQ answers (they feed JSON-LD).
 * - Claims about Windows behavior should be version-aware and hedged where builds differ.
 */
export const windowsTroubleshootingPillar: Article = {
  id: 'windows-troubleshooting-universal',
  slug: 'windows-troubleshooting-complete-guide',
  title: 'Windows Troubleshooting: A Complete Guide to Diagnosing and Fixing Windows Problems',
  seoTitle: 'Windows Troubleshooting Guide: Diagnose and Fix Any Problem',
  dek: 'A universal, evidence-led framework for Windows 11 and Windows 10: find the failing layer first, then fix startup failures, blue screens, freezes, slow performance, updates, drivers, networking, apps, and hardware faults without making things worse.',
  metaDescription: 'Fix Windows 11 and 10 problems step by step: boot failures, blue screens, freezes, slow PCs, updates, drivers and networking. Diagnose first, repair second.',
  excerpt: 'Start with the exact symptom, decide which layer is failing (power, boot, Windows, drivers, apps, or network), run the least destructive test, change one thing at a time, and confirm the fix under the same conditions. Use the triage table to jump straight to your problem.',
  category: 'Windows',
  subcategory: 'Troubleshooting',
  authorId: 'imranNatiq',
  publishedAt: '2026-10-06',
  updatedAt: '2026-10-06',
  readingTime: 26,
  appliesTo: ['Windows 11', 'Windows 10'],
  tags: ['Windows Troubleshooting', 'Windows 11', 'Windows 10', 'Windows Problems', 'PC Troubleshooting', 'Windows Repair', 'Blue Screen', 'Safe Mode', 'SFC and DISM'],
  relatedArticles: ['windows-wifi-diagnosis', 'windows-dns-not-working', 'windows-network-reset', 'windows-wont-start', 'windows-update-stuck', 'windows-high-memory', 'windows-unknown-device', 'windows-disk-100-percent', 'windows-slow-startup'],
  contentRole: 'pillar',
  pillarPath: '/windows',
  searchIntent: 'informational',
  featured: true,
  content: [
    {
      heading: 'Start here: a five-minute triage',
      paragraphs: [
        'Windows problems often look alike. A frozen desktop can be caused by an application, a driver, memory pressure, a failing drive, overheating, or a deeper system fault. A PC that will not start may have a power or hardware problem before Windows is even involved. The safest process therefore begins with the exact symptom, not with a favorite repair command.',
        'Find your symptom in the table, run the first safe test, and follow the link to the section that explains the next steps. Every test in the first column is reversible and does not change your files.',
      ],
      table: {
        caption: 'Symptom-first triage: what to test first and which layer to suspect',
        headers: ['What you see', 'First safe test', 'Layer to suspect', 'Go to'],
        rows: [
          ['No lights, fans, or display signal', 'Try a known-good outlet or charger and unplug all USB devices', 'Power or hardware', { text: 'PC will not turn on', href: '#when-the-pc-will-not-turn-on' }],
          ['Powers on, but Windows logo loops or recovery appears', 'Note any message, remove external drives, let automatic repair finish once', 'Boot path, storage, recent update', { text: 'Boot failure and boot loops', href: '#when-windows-will-not-start-or-is-stuck-in-a-boot-loop' }],
          ['Blue or black crash screen with a stop code', 'Photograph the code before the PC restarts', 'Drivers, memory, storage, or power', { text: 'Blue screens and stop codes', href: '#blue-screens-and-stop-codes' }],
          ['Screen is black but the PC seems to be running', 'Try another cable, port, or monitor; press Win+Ctrl+Shift+B', 'Display path or graphics driver', { text: 'Black screen and display problems', href: '#black-screen-no-display-or-display-glitches' }],
          ['Whole PC freezes or stops responding', 'Open Reliability Monitor (`perfmon /rel`) and look for events at the freeze time', 'Driver, storage stall, memory, or heat', { text: 'Freezing and unresponsive Windows', href: '#freezing-and-unresponsive-windows' }],
          ['PC is slow or laggy', 'Open Task Manager and see which resource is saturated', 'Memory, disk, CPU, heat, or background load', { text: 'Slow Windows', href: '#slow-windows-and-resource-saturation' }],
          ['Only one program fails', 'Restart, update the program, test with a new user profile', 'That application', { text: 'One application keeps failing', href: '#one-application-keeps-failing' }],
          ['Windows Update fails or loops', 'Check free space and note the exact error code', 'Update components, disk space, corruption', { text: 'Windows Update problems', href: '#windows-update-problems' }],
          ['Connected, but pages will not load', 'Test another device on the same network', 'Network path, DNS, or adapter', { text: 'Connected but no internet', href: '/windows-11-wifi-connected-no-internet' }],
          ['Games stutter although FPS looks high', 'Compare frame time, not average FPS', 'Shaders, GPU/CPU limits, storage, heat', { text: 'PC game stuttering', href: '/pc-game-stuttering-fix-frame-time' }],
          ['Drive feels slow or unhealthy', 'Check SMART health and temperature', 'Storage device', { text: 'Check SSD health', href: '/how-to-check-ssd-health-windows' }],
        ],
      },
    },
    {
      heading: 'Windows versions, editions, and languages',
      paragraphs: [
        'This guide applies to Windows 11 and Windows 10. Windows 10 reached end of support on October 14, 2025. It still runs, but Microsoft no longer provides technical support or free security updates for it, except through programs such as Extended Security Updates for enrolled devices. A stable Windows 10 PC and a broken Windows 10 PC are therefore different problems: the first needs a migration plan, the second needs the diagnosis below.',
        'Home, Pro, Enterprise, and Education editions share the same core troubleshooting. The differences that matter are practical: the Local Group Policy Editor is not included in Home, full BitLocker management is part of Pro and higher while many Home devices use device encryption, and work or school devices may be managed so that policy blocks some changes.',
        'Menu names and button labels change with the display language, and some error text is translated. Stop codes, event IDs, error codes such as 0x80070002, and the commands in this guide do not change. When you search for help, search for the code, not the translated sentence. Where Windows 11 adds a newer tool, the text says so.',
      ],
    },
    {
      heading: 'Before changing anything: protect data and preserve evidence',
      paragraphs: [
        'Write down when the problem started and what changed immediately beforehand. A Windows update, graphics or network driver, new application, peripheral, storage upgrade, firmware change, or security event is usually more informative than a long list of generic fixes.',
        'For recurring problems, reproduce the same action if you can. Record the Windows version and build (run `winver`), the affected application, the exact error or stop code, and whether the problem happens after a cold start, after sleep, or only after the computer has been running for a while. Use your phone to photograph errors that disappear on restart.',
        'Check whether the drive is encrypted before invasive steps. Many PCs ship with device encryption or BitLocker on. Changing firmware settings, replacing hardware, or repeated boot failures can cause Windows to ask for a 48-digit BitLocker recovery key at startup. Confirm you can retrieve it, for example from the Microsoft account used to set up the PC, a work or school account, or a copy you saved, before you start.',
        'If important files are at risk, protect them before any repair that rewrites the system. A procedure is not successful if it makes an existing storage or recovery problem harder to recover from.',
      ],
      bullets: [
        'Change one meaningful variable at a time and retest.',
        'Prefer reversible tests (restart, Safe Mode, disconnecting a device) before destructive ones.',
        'Capture exact error messages and codes instead of paraphrasing them.',
        'Back up important data before resets, reinstalls, partition changes, or firmware updates.',
        'Keep a laptop plugged in and never interrupt an update, reset, or repair that is in progress.',
      ],
    },
    {
      heading: 'Is Windows actually the problem?',
      paragraphs: [
        'A computer can appear to have a Windows problem when the cause is hardware, firmware, power, cooling, or a peripheral. If the machine loses power, fails before Windows loads, shows instability in firmware screens, or fails the same way from different operating-system environments, move hardware higher on the list.',
        'Conversely, if Safe Mode works normally, a clean boot removes the problem, or the failure began right after a driver or software change, the normal Windows environment becomes a stronger suspect. These tests do not prove the exact cause. They narrow the search.',
      ],
      bullets: [
        'Problem exists before Windows begins loading → prioritize power, firmware, storage, memory, display, and other hardware paths.',
        'Problem disappears in Safe Mode → investigate third-party drivers, services, and startup software.',
        'Problem affects one application only → investigate that application and its dependencies.',
        'Problem affects several unrelated applications → investigate Windows files, drivers, memory, storage, thermals, and stability.',
        'Problem appears on several operating systems or boot environments → investigate shared hardware first.',
      ],
    },
    {
      heading: 'The built-in diagnostic toolkit',
      paragraphs: [
        'Windows already contains the evidence tools most problems need. Task Manager shows what is saturated right now. Reliability Monitor (`perfmon /rel`) shows a timeline of application failures, Windows failures, and installs, which makes it the quickest way to see what happened around a crash. Event Viewer (`eventvwr.msc`) holds the detailed logs.',
        'Event Viewer is full of harmless warnings, so a single red entry is not a diagnosis. Look for events that line up in time with the symptom, in the Windows Logs > System and Application logs. These are the events that most often carry real information.',
      ],
      table: {
        caption: 'Event Viewer entries worth looking for and what they can suggest',
        headers: ['Source', 'Event ID', 'What it records', 'What it can suggest'],
        rows: [
          ['Kernel-Power', '41', 'The system restarted without shutting down cleanly', 'Crash, power loss, overheating, or a failing power supply. Look at the events just before it.'],
          ['BugCheck', '1001', 'The PC restarted after a blue-screen crash and logged the stop code', 'Use the stop code table below.'],
          ['Disk', '7', 'The device has a bad block', 'Failing drive or cable. Back up first.'],
          ['Disk', '51', 'An error occurred during a paging operation', 'Storage path or drive problem.'],
          ['Disk', '153', 'A disk I/O operation was retried', 'Unstable drive, cable, controller, or driver.'],
          ['Ntfs', '55', 'The file system structure is corrupt', 'Back up, then check the drive and its health.'],
          ['WHEA-Logger', '17, 18, 19', 'The platform reported a hardware error', 'CPU, memory, PCIe device, or unstable power or overclock.'],
          ['Display', '4101', 'The display driver stopped responding and recovered', 'Graphics driver, heat, power delivery, or the GPU itself.'],
          ['Application Error', '1000', 'An application crashed and named a faulting module', 'The named module points to the app, a runtime, or a driver DLL.'],
          ['WindowsUpdateClient', '20', 'An update failed to install', 'Note the error code and see the update section.'],
        ],
      },
    },
    {
      heading: 'Language-independent commands you can run directly',
      paragraphs: [
        'Menu paths differ between Windows versions and languages, but these shortcuts open the same tools everywhere. Press Win+R, type the command, and press Enter. Tools that change the system will ask for administrator permission.',
      ],
      table: {
        caption: 'Commands and shortcuts that work in any Windows display language',
        headers: ['Tool', 'Run this', 'Use it to'],
        rows: [
          ['Task Manager', 'Ctrl+Shift+Esc', 'See which resource is saturated and which process is using it'],
          ['Reliability Monitor', '`perfmon /rel`', 'View crashes, failed updates, and installs on a timeline'],
          ['Event Viewer', '`eventvwr.msc`', 'Read detailed system and application logs'],
          ['Device Manager', '`devmgmt.msc`', 'Find devices with warnings and roll back drivers'],
          ['Disk Management', '`diskmgmt.msc`', 'Confirm drives and partitions are detected'],
          ['Windows Memory Diagnostic', '`mdsched.exe`', 'Schedule a memory test at the next restart'],
          ['System Configuration', '`msconfig`', 'Set Safe Mode or run a clean boot'],
          ['Resource Monitor', '`resmon`', 'See per-process disk, network, and memory activity'],
          ['Network Connections', '`ncpa.cpl`', 'View, disable, and enable network adapters'],
          ['Programs and Features', '`appwiz.cpl`', 'Uninstall programs and view installed updates'],
          ['System Properties', '`sysdm.cpl`', 'Startup and Recovery settings, including crash dumps and automatic restart'],
          ['Windows version', '`winver`', 'Show the Windows version and build for your notes'],
          ['Windows Update settings', '`ms-settings:windowsupdate`', 'Check, pause, and review updates'],
          ['Recovery settings', '`ms-settings:recovery`', 'Reset the PC, advanced startup, and repair options'],
          ['Startup apps', '`ms-settings:startupapps`', 'Control what launches at sign-in'],
          ['Storage', '`ms-settings:storagesense`', 'Free disk space safely'],
          ['Restart the graphics driver', 'Win+Ctrl+Shift+B', 'Recover a black or frozen display without restarting'],
        ],
      },
    },
    {
      heading: 'When the PC will not turn on',
      paragraphs: [
        'If there are no lights, fans, display signals, or other signs of power, do not begin with Windows repair commands. Windows cannot repair a machine that never reaches the stage where Windows can run.',
        'For a desktop, check the external power path first: the wall socket, power cable, the rear switch on the power supply, and anything you changed recently. For a laptop, test a known-good charger of the correct rating, check the charging light, and disconnect docks and peripherals. If the system powers on and immediately shuts down, treat that as a separate symptom involving power, heat, memory, or board-level faults.',
        'Many motherboards and laptops signal faults with beep patterns, indicator lights, or diagnostic codes. The patterns are manufacturer-specific, so look them up in the model\'s own documentation rather than a generic list.',
      ],
      bullets: [
        'Disconnect non-essential USB and external devices and retest.',
        'On a laptop, unplug the charger and peripherals, hold the power button for about 15 to 30 seconds, then reconnect the charger and try again. Some manufacturers document a specific procedure, so check theirs.',
        'Check whether the machine shows any power or charging indication at all.',
        'Do not repeatedly force power cycles if there are signs of overheating or electrical instability.',
        'If you open a desktop, disconnect power completely first, and escalate if you are not comfortable working inside it.',
        'If there is still no meaningful response, move to hardware diagnosis rather than reinstalling Windows.',
      ],
    },
    {
      heading: 'When Windows will not start or is stuck in a boot loop',
      paragraphs: [
        'Separate a boot failure from a no-power failure. If the Windows logo appears and the system then restarts repeatedly, hangs, or enters recovery, the boot and recovery path is relevant. Use the least destructive recovery option that matches the evidence, and move to the next only when the current one fails.',
        'Windows Recovery Environment (Windows RE) appears automatically after repeated failed starts. If it does not, you can start it from Windows installation media created on another working PC from Microsoft\'s official download page. Menu names inside Windows RE follow your display language.',
        'On supported Windows 11 versions (24H2 or later with current updates), Quick Machine Recovery can load Windows RE when Windows cannot start, connect to the internet, and look for a fix delivered through Windows Update. Microsoft describes it as best effort, so treat it as an extra chance rather than a replacement for the steps below.',
        'Guides online often recommend commands that rebuild the boot configuration. Which commands are correct depends on whether the PC uses UEFI with a GPT disk or legacy BIOS with MBR, and on where the boot partition is. The wrong command can make a recoverable system harder to recover, so use them only when matched to your disk layout and after backing up.',
      ],
      steps: [
        'Note any message or error code, and let automatic repair finish once.',
        'Disconnect external drives, USB sticks, and docks, then restart. A removable device can change the boot order or confuse startup.',
        'Open Windows RE and choose Startup Repair from Troubleshoot > Advanced options.',
        'If the loop began after an update, choose Uninstall Updates, trying the latest quality update first and the feature update second.',
        'If a suitable restore point exists and the problem followed a software or driver change, try System Restore.',
        'Use Startup Settings to start Safe Mode and test whether the problem is limited to normal Windows.',
        'If recovery tools fail repeatedly or report disk errors, stop and test storage and memory before resetting. A reset cannot fix failing hardware.',
      ],
      bullets: [
        'Windows RE may ask for your BitLocker recovery key before it can access the drive.',
        'A stop code such as INACCESSIBLE_BOOT_DEVICE after changing the SATA, RAID, or Intel VMD mode in firmware points to a storage-controller mismatch.',
      ],
    },
    {
      heading: 'Blue screens and stop codes',
      paragraphs: [
        'A blue screen is Windows stopping on purpose because it detected a condition it cannot safely continue from. The stop code and any named file are the most valuable clues, so capture them before the machine restarts. Some current Windows 11 builds show a redesigned black screen where older versions showed blue. The information and the investigation are the same.',
        'If the PC restarts too fast to read the code, open System Properties (`sysdm.cpl`), go to Advanced > Startup and Recovery, and turn off Automatically restart. Afterwards, the code is also recorded as event 1001 in the System log and as a Windows failure in Reliability Monitor. Where dump files are enabled, they are saved in `C:\\Windows\\Minidump`.',
        'Treat the first blue screen after a change differently from repeated blue screens with different codes. A consistent code that names the same driver points toward software. Different codes each time, especially alongside random freezes and application crashes, point toward memory, storage, power, or thermal instability. The table lists tendencies, not diagnoses: the same code can have several causes.',
      ],
      table: {
        caption: 'Common stop codes, what they usually point to, and what to check first',
        headers: ['Stop code', 'Hex', 'Usually points to', 'Check first'],
        rows: [
          ['IRQL_NOT_LESS_OR_EQUAL', '0xA', 'A faulty driver or memory', 'The most recent driver change; run a memory test'],
          ['PAGE_FAULT_IN_NONPAGED_AREA', '0x50', 'Bad memory, a driver, or a security-software filter driver', 'Memory test; recently installed software'],
          ['MEMORY_MANAGEMENT', '0x1A', 'Memory or its configuration', '`mdsched.exe`; test one module at a time; remove XMP/EXPO or overclocking'],
          ['SYSTEM_SERVICE_EXCEPTION', '0x3B', 'Drivers, often graphics or security software', 'Update or roll back the graphics driver; review the named file'],
          ['SYSTEM_THREAD_EXCEPTION_NOT_HANDLED', '0x7E', 'A driver that failed', 'The driver named on screen or in the dump'],
          ['INACCESSIBLE_BOOT_DEVICE', '0x7B', 'Storage controller, driver, or boot-volume problem', 'SATA/RAID/VMD mode changes; drive connection; storage health'],
          ['DRIVER_IRQL_NOT_LESS_OR_EQUAL', '0xD1', 'A driver, commonly network or storage', 'Update or roll back network and storage drivers'],
          ['DRIVER_POWER_STATE_FAILURE', '0x9F', 'A driver failing during sleep or power changes', 'Power settings; chipset, network, and storage drivers'],
          ['CRITICAL_PROCESS_DIED', '0xEF', 'Corrupt system files, storage, or a driver', 'DISM and SFC; storage health'],
          ['CLOCK_WATCHDOG_TIMEOUT', '0x101', 'CPU, firmware, or unstable overclocking', 'Reset firmware to defaults; check cooling'],
          ['VIDEO_TDR_FAILURE', '0x116', 'Graphics driver or GPU hardware', 'Clean driver install; temperatures; power delivery'],
          ['WHEA_UNCORRECTABLE_ERROR', '0x124', 'Hardware error from CPU, memory, PCIe, or power', 'Undo overclocks; test memory and cooling'],
          ['DPC_WATCHDOG_VIOLATION', '0x133', 'A driver or firmware stall, often storage', 'Storage driver and SSD firmware'],
          ['KERNEL_SECURITY_CHECK_FAILURE', '0x139', 'Drivers, memory, or corruption', 'Driver changes; memory test; DISM and SFC'],
          ['UNEXPECTED_STORE_EXCEPTION', '0x154', 'Storage, a driver, or security software', 'Storage health; update storage drivers'],
        ],
      },
      bullets: [
        'Note the stop code, the time, and what you were doing.',
        'Roll back or update the driver that changed most recently, using the manufacturer\'s own download.',
        'Disconnect newly added hardware and retest.',
        'Run a memory test if the codes vary or the system is unstable under load.',
        'Check storage health and temperatures before assuming Windows needs reinstalling.',
      ],
    },
    {
      heading: 'Black screen, no display, or display glitches',
      paragraphs: [
        'First decide whether the computer is running but the display is not. Sounds, keyboard lights, or drive activity suggest the system is alive. Test another cable, port, or monitor, and on a desktop make sure the display cable is connected to the graphics card rather than the motherboard output.',
        'If the display works in firmware or recovery screens but not in Windows, a graphics driver or display setting is more likely. If it fails everywhere, including before Windows, investigate the display path and graphics hardware.',
      ],
      bullets: [
        'Press Win+Ctrl+Shift+B to restart the graphics driver. The screen may flicker and the PC may beep.',
        'Press Win+P to cycle display modes in case the image went to a disconnected display.',
        'Try a different cable, port, and display before changing software.',
        'Test whether the firmware (BIOS or UEFI) screen appears.',
        'Boot to Safe Mode and remove or roll back the graphics driver if the problem only exists in normal Windows.',
        'Reset the refresh rate or resolution if the screen went blank right after changing it.',
      ],
    },
    {
      heading: 'Freezing and unresponsive Windows',
      paragraphs: [
        'Separate a single application not responding from the whole system freezing. If the mouse still moves and other programs work, close or repair that application. If the entire system stops responding, the cause is more likely a driver, storage stall, memory problem, or overheating.',
        'Look at the pattern. Freezes under heavy load suggest thermals or power. Freezes after waking from sleep suggest drivers or power settings. Freezes accompanied by pinned drive activity suggest a storage or background-task problem. A freeze that ends in a restart usually leaves a Kernel-Power 41 event.',
      ],
      bullets: [
        'Open Task Manager and note which resource is saturated when the system stalls.',
        'Check temperatures if freezing happens under load.',
        'Review Reliability Monitor and Event Viewer for errors near the freeze time.',
        'Test with non-essential startup software and external devices removed.',
        'Check drive health, because a failing drive can stall everything that touches it.',
      ],
    },
    {
      heading: 'Slow Windows and resource saturation',
      paragraphs: [
        'Slowness is a symptom, not a cause. Use Task Manager to see whether CPU, memory, disk, or network is the limiting resource at the moment the system feels slow. A machine with memory constantly near full will page heavily, which feels like a storage problem even when the drive is fine.',
        'Address the measured bottleneck. Registry cleaners and boost utilities rarely help and can introduce new problems.',
      ],
      bullets: [
        'High memory use → review startup apps and browser tabs, then consider whether the system needs more RAM.',
        'High disk use on a hard drive → expect slow behavior and consider moving Windows to an SSD.',
        'High CPU with no obvious application → check background updates, scans, and thermal throttling.',
        'Very little free space on the system drive → free space; updates and paging suffer when the drive is nearly full.',
        'Slow only after long uptime → look for a leaking application or driver and restart to confirm.',
        'Laptop slow on battery → check the power mode and test with the charger connected.',
        'Slow with unexpected network or CPU activity → scan for malware before assuming a Windows fault.',
      ],
    },
    {
      heading: 'One application keeps failing',
      paragraphs: [
        'If only one program misbehaves, keep the investigation scoped to it. Update the application, check whether it needs a runtime or component it relies on, and try it after a clean restart. The Application Error event (ID 1000) names the faulting module, which often shows whether the app, a runtime, or a driver is responsible.',
        'Repair or reinstall the application before repairing Windows. If several unrelated applications fail in similar ways, widen the investigation to Windows components, drivers, memory, or storage.',
      ],
      bullets: [
        'Record the exact error message and the action that triggers it.',
        'Update the application and any required runtime.',
        'For Store apps, use Settings > Apps > Installed apps > Advanced options to repair or reset the app.',
        'Check whether security software or Controlled folder access is blocking the app.',
        'Use the application repair option if one exists, then reinstall if needed.',
        'Test with a new Windows user profile to rule out profile corruption.',
      ],
    },
    {
      heading: 'Windows Update problems',
      paragraphs: [
        'Update failures are usually caused by insufficient disk space, interrupted downloads, conflicting software, a wrong system date, or damaged update components. Note the error code and whether the failure happens during download, install, or after the restart.',
        'Start with the basics: free disk space, a stable connection, the correct date, time, and region, and a restart to finish any pending update. Then use the built-in troubleshooter, which on newer Windows versions may open in the Get Help app. If system files may be damaged, run DISM and SFC. If an update causes problems after installing, the update history lets you uninstall the most recent quality update when the timeline fits.',
        'Error codes carry meaning even when the message text is translated. These are common ones.',
      ],
      table: {
        caption: 'Common Windows Update error codes and the first thing to check',
        headers: ['Error code', 'Commonly means', 'First check'],
        rows: [
          ['0x80070002', 'A needed file was not found, often a damaged update cache', 'Restart, retry, then DISM and SFC'],
          ['0x80070005', 'Access denied', 'Security software, permissions, or a managed-device policy'],
          ['0x80070070', 'Not enough disk space', 'Free space on the system drive'],
          ['0x80073712', 'A component store file is missing or damaged', 'DISM RestoreHealth, then SFC'],
          ['0x800f081f', 'Source files could not be found', 'Retry on a stable connection; DISM with a matching source'],
          ['0x800f0922', 'The install failed, often from space on the system partition or a connection problem', 'Disconnect VPNs, check free space, retry'],
        ],
      },
      bullets: [
        'Disconnect non-essential peripherals during a feature update.',
        'Search for the exact error code and your Windows version, not a paraphrase.',
        'Do not interrupt an update that is installing; wait, because a stuck percentage is often still working.',
        'Never delete update folders by hand or run scripts you do not understand.',
        'If updates keep failing with corruption-style codes, check storage health as well.',
      ],
    },
    {
      heading: 'Network problems',
      paragraphs: [
        'Decide whether the problem is the device, the network, or the internet service. If every device is offline, the cause is outside Windows: restart the modem and router and check with the provider. If only this computer is affected, compare wired and wireless behavior, then check whether you can reach an IP address but not a name.',
        'Run `ipconfig /all`. An address starting with 169.254 means the PC did not get an address from the router. If you can reach a public IP address but websites fail by name, the problem is more likely DNS. Use the specialist guides rather than repeating the same resets, and keep a network reset for last, because it removes saved networks and adapter settings.',
      ],
      bullets: [
        'Test another device on the same network.',
        'Compare Wi-Fi with a wired connection if possible.',
        'Check whether pages fail only by name, which suggests DNS.',
        'Disable VPN or proxy software temporarily to test whether it is involved.',
        'Use a network reset only when targeted checks point to a corrupted Windows network stack.',
      ],
    },
    {
      heading: 'Sound, Bluetooth, USB, and input devices',
      paragraphs: [
        'Check the physical and selection layer first: cable, port, the selected output device, mute and volume states, and whether the device works on another computer. Then check the driver and the Windows privacy or permission settings for the device.',
        'For USB and Bluetooth, test another port or adapter and remove the pairing before pairing again. Intermittent USB problems can also be power related, especially with unpowered hubs and long cables.',
      ],
      bullets: [
        'Test the device on another computer.',
        'Try a different port, cable, or a direct connection instead of a hub.',
        'Remove and re-pair a Bluetooth device.',
        'Reinstall or roll back the device driver if the problem began after an update.',
        'For USB devices that disconnect, turn off USB selective suspend in the power plan as a test.',
      ],
    },
    {
      heading: 'When it might be malware or security software',
      paragraphs: [
        'Malware can look like an ordinary Windows fault: sudden slowness, browser settings that keep changing, programs you did not install, unexpected network activity, or security protection that has been switched off. Equally, security software itself can cause crashes and slowdowns, particularly when two products are installed together.',
        'Run a full scan with Windows Security. For persistent problems, use Microsoft Defender Offline scan, which runs before Windows fully loads. Keep one real-time security product, not several. If you suspect that credentials were exposed, change passwords from a different, clean device.',
      ],
      bullets: [
        'Do not install "cleaner" or "optimizer" tools in response to pop-up warnings.',
        'Do not disable security protection to test a theory and leave it off.',
        'If files are renamed or encrypted and a ransom note appears, disconnect the PC from the network and seek professional help before taking further action.',
      ],
    },
    {
      heading: 'Safe Mode and Clean Boot',
      paragraphs: [
        'Safe Mode starts Windows with a minimal set of drivers and services. It is useful for deciding whether the normal environment is involved, and for removing a problematic driver or update. To reach it, open Settings > System > Recovery > Advanced startup > Restart now, then Troubleshoot > Advanced options > Startup Settings > Restart, and press 4 or F4. You can also tick Safe boot on the Boot tab of `msconfig`. Untick it afterwards or Windows will keep starting in Safe Mode.',
        'A clean boot disables non-Microsoft startup items and services so you can see whether third-party software conflicts with Windows. In `msconfig`, hide all Microsoft services, disable the rest, and disable startup apps in Task Manager. Then re-enable items in small groups until the problem returns. Return the system to normal startup when finished.',
      ],
      bullets: [
        'Problem gone in Safe Mode → suspect drivers, services, or startup software.',
        'Problem gone in a clean boot → re-enable items in halves to find the conflict.',
        'Problem remains in both → suspect Windows files, hardware, or firmware.',
      ],
    },
    {
      heading: 'System file repair: DISM and SFC',
      paragraphs: [
        'System File Checker (SFC) scans protected Windows files and replaces damaged ones from the local component store. DISM can repair the component store itself. Microsoft\'s guidance is to run DISM first, because it supplies the files SFC needs, then SFC. Run both from an elevated Command Prompt or Terminal.',
        'These tools address file corruption. They do not repair failing hardware, bad drivers, or application faults, so a clean result does not rule those out. DISM normally uses Windows Update as its source. If it cannot find repair content, point it at a mounted Windows image of the same version with the Source option, as described in Microsoft\'s documentation.',
      ],
      steps: [
        'Open Terminal or Command Prompt as administrator.',
        'Run `DISM /Online /Cleanup-Image /RestoreHealth` and wait for it to finish. `CheckHealth` and `ScanHealth` are read-only checks that do not repair anything.',
        'Run `sfc /scannow`.',
        'Restart and retest the original symptom.',
        'If SFC reports files it could not fix, review the details in `%windir%\\Logs\\CBS\\CBS.log`.',
        'If corruption returns repeatedly, test the storage device and memory.',
      ],
    },
    {
      heading: 'In-place repair: reinstall Windows without losing files',
      paragraphs: [
        'If system file repair does not fix a Windows-wide problem but Windows still starts, an in-place repair reinstalls the same version of Windows over itself while keeping your files and installed apps. It is the step between file repair and a reset, and it fixes many problems that reinstalling apps one by one never will.',
        'On supported Windows 11 versions, open Settings > System > Recovery and choose Fix problems using Windows Update, which reinstalls the current version using files from Windows Update. The alternative is to mount a Windows installation image (ISO) of the same edition, version, and language as the installed system, run setup, and choose to keep personal files and apps. A language mismatch is the usual reason the keep-everything option is unavailable.',
      ],
      bullets: [
        'Back up first, plug in a laptop, and make sure there is ample free space.',
        'Disconnect non-essential peripherals and run setup from normal Windows, not Safe Mode.',
        'Some third-party drivers or apps may need reinstalling afterwards.',
        'It does not fix failing hardware, so test storage and memory if the problem returns.',
      ],
    },
    {
      heading: 'Recovery options and how destructive they are',
      paragraphs: [
        'Recovery options range from gentle to destructive. Choose the lowest level that matches the evidence and only move up when the lower level fails. When you use Reset this PC, the cloud download option fetches fresh Windows files and can help when local files are damaged, but it uses data and needs a connection. The local reinstall option reuses files already on the PC.',
      ],
      table: {
        caption: 'Recovery options from least to most destructive',
        headers: ['Option', 'What it changes', 'Personal files', 'Installed apps', 'Risk'],
        rows: [
          ['Restart, Safe Mode, clean boot', 'Nothing permanent', 'Kept', 'Kept', 'Very low'],
          ['Uninstall a recent update or driver', 'Removes one change', 'Kept', 'Kept', 'Low'],
          ['DISM and SFC', 'Repairs damaged system files', 'Kept', 'Kept', 'Low'],
          ['System Restore', 'Reverts system files, drivers, and settings to a restore point', 'Kept', 'Apps and drivers installed after the point are removed', 'Low to medium'],
          ['In-place repair', 'Reinstalls Windows over itself', 'Kept', 'Usually kept', 'Medium'],
          ['Reset this PC: Keep my files', 'Reinstalls Windows', 'Kept', 'Removed', 'High'],
          ['Reset this PC: Remove everything, or clean install', 'Reinstalls and erases the drive', 'Erased', 'Removed', 'Very high. Back up first.'],
        ],
      },
    },
    {
      heading: 'Storage, memory, thermals, and power',
      paragraphs: [
        'Many Windows symptoms are the visible effect of a hardware limit. A failing drive can cause freezes and corruption. Faulty memory can cause random crashes. Dust, a failed fan, or dried thermal paste can cause throttling and shutdowns. An inadequate or failing power supply can cause restarts under load.',
        'Check drive health with a SMART-aware tool or, in PowerShell, `Get-PhysicalDisk | Select-Object FriendlyName, HealthStatus, OperationalStatus`. Run a memory test, watch temperatures under load, and clean dust from vents and fans. If crashes began after enabling an overclock or a memory profile such as XMP or EXPO, undo it and retest before blaming Windows. Update firmware only from the manufacturer and only with stable power. Persistent faults after these checks justify professional hardware diagnosis.',
      ],
      bullets: [
        'Storage: check drive health and back up before heavy repair.',
        'Memory: run `mdsched.exe`, reseat modules, and test one module at a time if crashes are random. A longer bootable memory test is more thorough.',
        'Thermals: monitor temperatures under load and clean fans and vents.',
        'Power: suspect the supply or charger when shutdowns occur under load.',
        'Firmware: reset to defaults if the system became unstable after changing settings.',
      ],
    },
    {
      heading: 'A universal decision tree',
      paragraphs: [
        'When the symptom is unclear, move through the layers in order and stop as soon as a test explains the behavior.',
      ],
      steps: [
        'Does the machine power on and reach firmware? If not, investigate power and hardware.',
        'Does Windows start? If not, investigate boot, recovery, and storage.',
        'Does Safe Mode behave normally? If yes, investigate drivers, services, and startup software.',
        'Is only one application affected? If yes, repair or reinstall that application.',
        'Do several unrelated programs fail? Investigate system files, memory, storage, and thermals.',
        'Does the problem survive DISM, SFC, and an in-place repair? Investigate hardware.',
        'Does the problem exist outside Windows, in firmware or another operating system? It is hardware.',
      ],
    },
    {
      heading: 'Troubleshooting practices to avoid',
      paragraphs: [
        'Some popular fixes cause more harm than they prevent. Avoid anything that removes your ability to recover or hides the real cause.',
      ],
      bullets: [
        'Do not run registry cleaners, system boosters, or "driver updater" utilities.',
        'Do not download drivers from unofficial sites.',
        'Do not paste commands or scripts from a forum that you do not understand.',
        'Do not disable security protections to test a theory and leave them off.',
        'Do not reformat a drive before backing up data you care about.',
        'Do not change many settings at once, because you cannot tell which one mattered.',
        'Do not force-shutdown repeatedly during an update or repair.',
      ],
    },
    {
      heading: 'Keep a troubleshooting log',
      paragraphs: [
        'A short log turns guesswork into evidence, helps you undo changes, and saves hours if you later need professional help. Keep it in a text file on another device.',
      ],
      bullets: [
        'Date, time, and the exact symptom.',
        'Exact error message, stop code, or event ID.',
        'What changed before it started.',
        'Windows version and build from `winver`, plus the PC model.',
        'Each test you ran and its result.',
        'Each change you made, and how to undo it.',
        'The current status.',
      ],
    },
    {
      heading: 'When to get professional help',
      paragraphs: [
        'Escalate when the evidence points to hardware, when data is at risk, or when the same fault returns after sound software troubleshooting. Signs include clicking or disappearing drives, burning smells, swollen batteries, liquid damage, repeated shutdowns under load, and no-power faults.',
        'If a drive is making noise or keeps disappearing, stop using it and ask about data recovery before repair, because further use can reduce what can be recovered. Bring your troubleshooting log, your BitLocker recovery key if the drive is encrypted, and ask for a written diagnosis before agreeing to parts.',
      ],
    },
    {
      heading: 'Verify the fix',
      paragraphs: [
        'A fix is only confirmed when the original symptom no longer occurs under the same conditions. Repeat the action that triggered the problem, run the system under normal load for a while, and check that no new errors appear in Reliability Monitor or Event Viewer. Add what worked to your log so the next problem starts from evidence.',
      ],
    },
    {
      heading: 'Specialist guides for deeper problems',
      paragraphs: [
        'This guide is the starting point. When your evidence points to a specific area, these guides go deeper.',
      ],
      table: {
        caption: 'Specialist Tech World Window guides by problem',
        headers: ['Problem', 'Guide', 'Read it when'],
        rows: [
          ['Connected but no internet', { text: 'Windows says connected but no internet', href: '/windows-11-wifi-connected-no-internet' }, 'Wi-Fi or Ethernet shows connected but pages will not load'],
          ['Websites fail by name', { text: 'Windows 11 DNS not working', href: '/windows-11-dns-not-working-how-to-fix' }, 'An IP address works but names do not resolve'],
          ['Network settings damaged', { text: 'Network adapter reset guide', href: '/windows-11-network-adapter-reset-guide' }, 'Targeted checks failed and you are considering a reset'],
          ['Games stutter', { text: 'PC game stuttering and frame time', href: '/pc-game-stuttering-fix-frame-time' }, 'Frame-time spikes or microstutter in games'],
          ['GPU spikes', { text: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix' }, 'You need to separate GPU workload from other causes'],
          ['Drive health unknown', { text: 'How to check SSD health', href: '/how-to-check-ssd-health-windows' }, 'You suspect storage after crashes or corruption'],
          ['Drive slower than it was', { text: 'Why an SSD slows down', href: '/why-ssd-is-slowing-down-windows' }, 'Storage performance has dropped'],
          ['Drive running hot', { text: 'NVMe SSD temperature too high', href: '/nvme-ssd-temperature-too-high' }, 'Temperatures and throttling look suspicious'],
        ],
      },
    },
  ],
  sources: [
    { label: 'Microsoft Support: Windows 10 support has ended on October 14, 2025', url: 'https://support.microsoft.com/kb/5056949' },
    { label: 'Microsoft Support: Use the System File Checker tool to repair missing or corrupted system files', url: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e' },
    { label: 'Microsoft Learn: Repair a Windows image with DISM', url: 'https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/repair-a-windows-image' },
    { label: 'Microsoft Learn: Bug check code reference', url: 'https://learn.microsoft.com/windows-hardware/drivers/debugger/bug-check-code-reference2' },
  ],
  testing: 'This guide is based on Microsoft documentation and standard Windows diagnostic practice for Windows 11 and Windows 10. Menu names and some options vary by Windows version, build, edition, display language, and manufacturer customization. Stop-code and error-code tables describe common tendencies, not guaranteed causes. Confirm the behavior on your own build before relying on a step.',
  faq: [
    { question: 'What should I try first when Windows has a problem?', answer: 'Identify the exact symptom and what changed recently, then run the simplest reversible test, such as a restart, Safe Mode, or removing a recent driver or update, before using bigger repairs.' },
    { question: 'How do I know whether the problem is hardware instead of Windows?', answer: 'Problems that occur before Windows loads, in firmware screens, or across different operating systems point toward hardware. Problems that disappear in Safe Mode point toward drivers or software.' },
    { question: 'How do I fix a blue screen in Windows?', answer: 'Record the stop code, then work from the most recent change. Roll back or update the driver named or changed last, test memory and storage if the codes vary, and check temperatures. Reinstalling Windows will not fix failing hardware.' },
    { question: 'What should I do if Windows will not start?', answer: 'Disconnect external devices, let automatic repair finish once, then use Windows Recovery Environment: Startup Repair, Uninstall Updates, or System Restore. If recovery tools fail repeatedly or report disk errors, test storage and memory before resetting.' },
    { question: 'In what order should I run DISM and SFC?', answer: 'Run DISM with the RestoreHealth option first, then sfc /scannow, both from an elevated prompt. Microsoft recommends this order because DISM supplies the files that SFC uses for repairs.' },
    { question: 'What is the difference between Safe Mode and a clean boot?', answer: 'Safe Mode starts Windows with a minimal set of drivers and services. A clean boot starts normal Windows but disables non-Microsoft startup items and services, which helps find software conflicts.' },
    { question: 'Is it safe to reset or reinstall Windows?', answer: 'It can be, but it is destructive. Back up important files first, make sure you can retrieve any BitLocker recovery key, and rule out failing storage or memory, because reinstalling will not fix a hardware fault.' },
    { question: 'Will an in-place repair delete my files?', answer: 'An in-place repair is designed to keep personal files and installed apps, but you should still back up first. The installation image must match your edition, version, and language for the keep-everything option to be available.' },
    { question: 'Do SFC and DISM fix everything?', answer: 'No. They repair damaged Windows files and the component store. They do not repair failing hardware, bad drivers, or application problems.' },
    { question: 'Does this guide work for Windows 10 as well as Windows 11?', answer: 'Yes. Most steps are the same. A few tools, such as Quick Machine Recovery and Fix problems using Windows Update, depend on current Windows 11 versions. Windows 10 reached end of support on October 14, 2025, so unsupported devices also need a security plan.' },
  ],
};
