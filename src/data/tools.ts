/**
 * Single registry for every tool page. The hub page, SEO metadata, JSON-LD (WebApplication and
 * FAQPage) and article call-outs all read from here, so adding a tool means adding one entry
 * plus a route in graph.ts.
 */
import { BSOD_BASE_PATH, bsodBySlug, bsodEntries, shortHex, type BsodEntry } from './bsod';

export type ToolFaq = { question: string; answer: string };
export type ToolGroup = 'diagnose' | 'plan' | 'create';

export type ToolDef = {
  id: string;
  path: string;
  title: string;
  group: ToolGroup;
  /** Short label shown on hub cards, e.g. Analyzer or Calculator. */
  kindLabel: string;
  status: 'New' | 'Available now';
  hubDescription: string;
  menuDescription: string;
  /** Page <title> without the brand suffix. */
  seoTitle: string;
  metaDescription: string;
  faq?: ToolFaq[];
};

export const HUB_SEO_DESCRIPTION = 'Free Windows and PC tools for Secure Boot checks, repair logs, blue screens, gaming diagnostics, memory workload budgeting and hardware planning.';

export const tools: ToolDef[] = [
  {
    id: 'windows-troubleshooting-assistant',
    path: '/tools/windows-troubleshooting-assistant',
    title: 'Windows Troubleshooting Assistant',
    group: 'diagnose',
    kindLabel: 'Assistant',
    status: 'New',
    hubDescription: 'Choose the symptom—startup failure, blue screen, slow PC, network issue, stuck update or game stutter—and get a safe first-check plan with links to focused guides.',
    menuDescription: 'Find the safest next check for Windows problems.',
    seoTitle: 'Windows Troubleshooting Assistant',
    metaDescription: 'Use this free Windows troubleshooting assistant to classify startup, blue-screen, slowdown, network, update or PC gaming problems and find safe next checks.',
    faq: [
      { question: 'Does the assistant diagnose my PC automatically?', answer: 'No. It routes the symptom you choose to safe first checks and relevant guides. It does not scan your computer, inspect logs, or prove a hardware fault.' },
      { question: 'Does it upload my answers or computer data?', answer: 'No. The choices and recommendations run in your browser. If you have accepted analytics cookies, the site may record tool-use events containing the selected symptom category and chosen option, not files, diagnostic logs, or device identifiers.' },
      { question: 'Should I reinstall Windows if the first check does not work?', answer: 'Usually not as a first step. Record the exact symptom and error, protect important files, and follow the focused guide before trying destructive recovery steps.' },
      { question: 'What should I do if I suspect a failing drive or electrical damage?', answer: 'Stop repeated power-on attempts if you hear unusual drive noises, smell burning, see liquid damage or a swollen battery, or suspect electrical damage. Protect important data and seek qualified repair help rather than opening a power supply or forcing a repair.' },
    ],
  },
  {
    id: 'secure-boot-status-checker',
    path: '/tools/secure-boot-status-checker',
    title: 'Secure Boot Status Checker',
    group: 'diagnose',
    kindLabel: 'Checker',
    status: 'New',
    hubDescription: 'Check whether Secure Boot is enabled and whether Windows reports the 2023 certificate update as Updated using a read-only local PowerShell script.',
    menuDescription: 'Check Secure Boot and certificate-update status safely.',
    seoTitle: 'Secure Boot Status Checker: Certificate Update',
    metaDescription: 'Check Windows Secure Boot and 2023 certificate status with read-only PowerShell output. Analyze results in-browser; nothing is uploaded or changed.',
    faq: [
      { question: 'Can this checker inspect my PC automatically?', answer: 'No. Run the read-only PowerShell script on your Windows PC and paste the output. The browser cannot access UEFI firmware directly.' },
      { question: 'Does the script change Secure Boot or firmware settings?', answer: 'No. It reads the Secure Boot state and the UEFICA2023Status value. It does not write registry values, change firmware keys, update the BIOS, or alter BitLocker.' },
      { question: 'Does Secure Boot enabled mean the 2023 certificates are installed?', answer: 'No. Confirm-SecureBootUEFI reports whether Secure Boot is enabled. UEFICA2023Status is a separate status value, and Windows Security should also be checked.' },
      { question: 'What if the certificate status is missing or not Updated?', answer: 'That output does not prescribe a firmware change by itself. Check Windows Security > Device security > Secure Boot, install supported Windows updates, and follow Microsoft or exact-model OEM guidance if action is needed.' },
      { question: 'Does the tool upload the pasted output?', answer: 'No. The output is interpreted in your browser tab and is not submitted by this tool. Nothing is scanned or changed automatically.' }
    ]
  },
  {
    id: 'windows-support-lifecycle-checker',
    path: '/tools/windows-support-lifecycle-checker',
    title: 'Windows Support Lifecycle Checker',
    group: 'diagnose',
    kindLabel: 'Checker',
    status: 'New',
    hubDescription: 'Check Windows 10 and 11 end-of-updates dates by version and edition, compare Windows 10 ESU and LTSC servicing, and find the safest next step.',
    menuDescription: 'Check Windows version support dates and next steps.',
    seoTitle: 'Windows Support Lifecycle Checker',
    metaDescription: 'Check Windows 10 and 11 support dates by version and edition. Compare standard servicing, Windows 10 ESU and LTSC dates, plus the latest KB reference.',
    faq: [
      { question: 'Does end of updates mean Windows will stop working?', answer: 'No. The computer can continue to run, but a release that has ended standard servicing no longer receives its normal monthly security and quality updates. Check whether a valid ESU program or a separate LTSC lifecycle applies.' },
      { question: 'Does this checker read my PC or verify my license?', answer: 'No. Select the Windows family, edition and version manually. The checker does not scan the device, access Windows Update, read installed KBs, verify licensing or confirm ESU enrollment.' },
      { question: 'Can Windows 10 still receive security updates after October 2025?', answer: 'Eligible devices can receive security-only updates through the Windows 10 Extended Security Updates program if correctly enrolled. Consumer and commercial programs have different rules and dates; installing an ESU preparation package alone does not enroll a device.' },
      { question: 'Why do Windows 11 editions have different support end dates?', answer: 'Microsoft publishes different servicing windows for Home and Pro versus Enterprise and Education. LTSC and IoT Enterprise LTSC use separate product lifecycle rules and must not be treated as ordinary consumer releases.' },
      { question: 'What does the KB number in the result mean?', answer: 'It is the latest update reference recorded in this dated dataset for the selected release line. It does not prove that the update applies to every edition or that it is installed on your device. Check Microsoft’s current release history for the latest details.' },
      { question: 'How do I confirm my Windows version and edition?', answer: 'Press Win + R, type winver, and press Enter. Then open Settings > System > About to check the edition. If the PC is managed by work or school, ask the administrator whether it uses LTSC or an Extended Security Updates program.' },
      { question: 'Is ESU the same as normal Windows support?', answer: 'No. ESU is a time-limited program for eligible enrolled devices. It supplies eligible security updates, not new Windows features or full technical support, and it does not reset the original product lifecycle.' },
    ],
  },
  {
    id: 'frame-time-analyzer',
    path: '/tools/frame-time-analyzer',
    title: 'Frame-Time Analyzer',
    group: 'diagnose',
    kindLabel: 'Analyzer',
    status: 'New',
    hubDescription: 'Analyze frame-time captures locally, overlay up to four runs on a shared-axis graph, compare 1% and 0.1% lows, and export every detected stutter event as CSV.',
    menuDescription: 'Compare up to four frame-time runs and export stutter events.',
    seoTitle: 'Frame Time Analyzer for Gaming: 1% Lows',
    metaDescription: 'Free frame time analyzer for gaming. Compare up to four PresentMon, CapFrameX or FrameView CSV captures, inspect 1% lows and export stutter events locally.',
    faq: [
      { question: 'What is a frame-time analyzer?', answer: 'It analyzes per-frame timing data and reports average FPS, 1% and 0.1% lows, frame-time percentiles, detected stutter events and a graph. Frame-time intervals can reveal uneven delivery that average FPS hides.' },
      { question: 'Is my capture uploaded anywhere?', answer: 'No. The selected file is read in your browser, and analysis, comparison, copying and downloads happen locally. The file and report are not sent to Tech World Window.' },
      { question: 'Does this tool use AI or need an API key?', answer: 'No. Metrics, comparisons and findings are calculated locally in your browser with documented deterministic rules. No hosted AI model or API key is used.' },
      { question: 'Which capture tools work with this analyzer?', answer: 'It supports CSV or pasted data containing recognized per-frame timing columns, including common PresentMon, CapFrameX and NVIDIA FrameView exports. The analyzer looks for fields such as MsBetweenPresents or FrameTime. Capture-tool versions and export settings can change column names, so check the source-column warning after import.' },
      { question: 'What are 1% lows and 0.1% lows?', answer: 'Here, each low is the average FPS of the slowest 1% or 0.1% of frame-time samples. Other tools may define low FPS differently; compare results only when the calculation method and timing metric match.' },
      { question: 'What frame time should I target?', answer: 'A frame-time budget is 1,000 divided by the target FPS: about 16.67 ms at 60 FPS, 8.33 ms at 120 FPS, 6.94 ms at 144 FPS and 4.17 ms at 240 FPS. These are timing budgets, not universal pass/fail thresholds.' },
      { question: 'How long should a capture be?', answer: 'Capture at least 60 seconds of the same gameplay scene when possible. Short clips contain very few frames in the slowest 1% and especially the slowest 0.1%, making low-FPS figures less stable.' },
      { question: 'Can I compare multiple captures?', answer: 'Yes. Load a baseline, then add up to three more CSV or text captures (four runs total). The tool overlays their frame-time traces and compares average FPS, 1% and 0.1% lows, the 99th-percentile frame time, stutter events per minute and frames over budget. For a fair test, repeat the same scene with the same timing column, capture tool, settings and hardware, and use similar capture durations. Small differences can be normal run-to-run variation and do not prove what caused a change.' },
      { question: 'Why must both captures use the same timing column?', answer: 'A present-to-present interval and a display-change interval can describe different parts of frame delivery. If the selected columns differ, treat the comparison cautiously and confirm that both files measure the same metric before drawing conclusions.' },
      { question: 'Can I export the detected stutter events?', answer: 'Yes. Download the analysis report or export the full detected-event timeline as CSV, including event time, slowest frame, affected-frame count and the selected frame-time budget. Exports are created locally.' },
      { question: 'Can this tool identify the exact cause of a stutter?', answer: 'No. A frame-time trace can identify when intervals became slow, but it cannot prove whether a CPU, GPU, driver, shader, storage device, background task or thermal limit caused the event. Use the findings to choose the next measurement.' },
    ],
  },
  {
    id: 'gpu-usage-checker',
    path: '/tools/gpu-usage-checker',
    title: 'GPU Usage Checker',
    group: 'diagnose',
    kindLabel: 'Checker',
    status: 'New',
    hubDescription: 'Find out whether 100% GPU usage, a low reading or a -1% value is normal in your game. Enter what you see and get a plain-English answer with an ordered list of safe checks.',
    menuDescription: 'Check whether your GPU usage reading is normal.',
    seoTitle: 'GPU Usage Checker: Is 100% GPU Usage Normal?',
    metaDescription: 'Free GPU usage checker. See whether 100% GPU usage, a low reading or a -1% value is normal in games, then follow an ordered list of safe checks.',
    faq: [
      { question: 'Is 100% GPU usage bad while gaming?', answer: 'Usually not. In a game with no frame cap, a GPU near full load that delivers the FPS you want is working as intended. Investigate when FPS is lower than expected, frames arrive unevenly, clocks or temperatures change with performance, or the GPU is busy when no demanding program is running.' },
      { question: 'Should my GPU be at 100% while gaming?', answer: 'It can be, and in a GPU-limited game it often is. A game with a frame cap, V-Sync or a CPU limit may keep GPU usage lower, and that is also normal when performance meets your target. There is no required percentage.' },
      { question: 'Why does my GPU usage show -1%?', answer: 'A -1%, N/A or frozen reading usually means the monitoring tool could not read a valid counter or sensor. Check Task Manager > Performance > GPU to see whether the 3D engine moves while the game runs. If it does, the GPU is working and the tool is the unreliable part. Update or restart the tool before suspecting hardware.' },
      { question: 'Why is my GPU usage high when I am not gaming?', answer: 'Game menus and launchers often run uncapped, and browsers with hardware acceleration, video editors, recorders, animated wallpapers and encoding tools can all use GPU engines. Sort Task Manager > Processes by GPU to identify the process before changing drivers. High activity alone does not prove malware or a hardware fault.' },
      { question: 'Why is my GPU usage low and my FPS low?', answer: 'The common causes are a CPU-limited scene (one core near its limit while overall CPU usage looks modest), a frame cap or V-Sync, the game running on the wrong GPU, or limits in the game engine, memory or storage. Check per-core CPU usage first, then test with the cap and V-Sync turned off.' },
      { question: 'What GPU temperature is too high?', answer: 'It depends on the exact GPU model and on which sensor you read, such as core or hotspot. This checker does not use a universal limit. Look up the maximum operating temperature for your model on the maker’s specification page and compare it with a sustained reading, not a single spike.' },
      { question: 'Does this tool read my PC or upload my numbers?', answer: 'No. It does not scan your computer. You type in values from your own monitoring tool, and the answer is calculated in your browser from a fixed set of rules. Nothing you enter is sent to Tech World Window.' },
      { question: 'Can this checker diagnose a failing graphics card?', answer: 'No. A utilization percentage describes workload, not hardware health. If you see visual artifacts, repeated driver resets or unexpected shutdowns, stop stress testing and follow the related guides, or contact the maker or a qualified technician.' }
    ],
  },
  {
    id: 'windows-battery-health-analyzer',
    path: '/tools/windows-battery-health-analyzer',
    title: 'Windows Battery Health Analyzer',
    group: 'diagnose',
    kindLabel: 'Analyzer',
    status: 'New',
    hubDescription: 'Read a Windows battery-report HTML file locally to compare design capacity with full-charge capacity, estimate capacity loss, and show cycle count when reported.',
    menuDescription: 'Check reported laptop battery capacity without uploading the report.',
    seoTitle: 'Windows Battery Health Analyzer: Capacity & Wear',
    metaDescription: 'Analyze a Windows battery-report HTML file locally. Compare design and full-charge capacity, estimate capacity loss, and view cycle count when reported.',
    faq: [
      { question: 'How do I create a battery report in Windows?', answer: 'Open Windows Terminal or Command Prompt and run powercfg /batteryreport. Open the HTML file path printed by Windows, then select that saved report in this tool. You run the command yourself; this tool does not run commands on your PC.' },
      { question: 'Is my battery report uploaded?', answer: 'No. The HTML report is read and parsed in your browser. Tech World Window does not receive the file or the battery values extracted from it.' },
      { question: 'How is capacity loss estimated?', answer: 'The capacity ratio is Full Charge Capacity divided by Design Capacity, multiplied by 100. A result below 100% means the reported full-charge capacity is below the design figure. It does not predict exact runtime, cell condition, or the date a battery will fail.' },
      { question: 'What if Windows does not report a cycle count?', answer: 'Some manufacturers do not expose every battery field in the report. The analyzer shows cycle count only when it is present and does not fill missing data with guesses.' },
      { question: 'Does low reported capacity mean the battery is unsafe?', answer: 'Not by itself. Capacity loss can mean shorter runtime. Swelling, unusual heat, odor, leakage, or physical damage are separate safety warnings. Stop using a swollen or damaged battery and arrange qualified service; do not puncture or open a battery pack.' },
    ],
  },
  {
    id: 'bsod-error-code-lookup',
    path: BSOD_BASE_PATH,
    title: 'BSOD Error Code Lookup',
    group: 'diagnose',
    kindLabel: 'Lookup',
    status: 'New',
    hubDescription: `Search a Windows BSOD stop code by name, hex value or keyword. Understand the error, review likely causes and follow a safe troubleshooting order for ${bsodEntries.length} common stop codes.`,
    menuDescription: 'Search Windows blue-screen stop codes and safe fixes.',
    seoTitle: 'BSOD Error Code Lookup: Windows Stop Codes and Fixes',
    // Kept under the 160-character validator limit (about 141 characters with a two-digit count).
    metaDescription: `Look up Windows BSOD stop codes by name, hex or keyword. Get plain-English meanings, likely causes and a safe fix order for ${bsodEntries.length} common errors.`,
    faq: [
      { question: 'How do I find my blue screen stop code?', answer: 'Windows shows the stop code as text on the blue screen, for example CRITICAL_PROCESS_DIED. If the PC restarted before you could read it, open Event Viewer, then Windows Logs, then System, and look for a BugCheck event with ID 1001, which records the code. Reliability Monitor also lists critical events.' },
      { question: 'Does the hex code or the name matter more?', answer: 'They identify the same bug check. The name is easier to search and read, while the hex value, for example 0x000000EF, appears in logs and dump files.' },
      { question: 'Can I scan an Event Viewer export here?', answer: 'Yes. Paste or select a text-based XML, CSV, TXT or LOG export. The lookup searches the supplied text locally for known stop codes and BugCheck clues. Binary .evtx files and full memory dumps are not supported, and your evidence is not uploaded.' },
      { question: 'Can a blue screen be fixed without reinstalling Windows?', answer: 'Often yes. Most stop codes come from drivers, memory, storage or system file problems that can be found and fixed in order. Reinstalling Windows is a last resort, and it does not fix failing hardware.' },
      { question: 'Is the stop code enough to diagnose the problem?', answer: 'Not on its own. A code names the type of failure, and several causes can lead to the same code. Use it to choose the first checks, then look at what changed recently and whether the crash repeats under the same conditions.' },
      { question: 'What should I do first after a blue screen?', answer: 'Record the exact stop code and any “What failed” driver name, note when the crash happened, and back up important files if Windows is stable enough. Undo one recent driver, update or hardware change at a time; avoid changing several things at once.' },
      { question: 'Why does the same stop code have several possible causes?', answer: 'A stop code describes the kind of failure Windows detected, not necessarily the original cause. A driver, unstable memory, storage errors, overheating or damaged system files can sometimes produce related symptoms. Crash dumps and repeatable patterns help narrow it down.' },
      { question: 'Should I use a driver updater or registry cleaner to fix a BSOD?', answer: 'Avoid third-party driver-updater and registry-cleaner utilities as a first response. Use Windows Update and the PC or component manufacturer’s official driver page, change one thing at a time, and keep a recovery path available.' },
      { question: 'When should I stop troubleshooting and get help?', answer: 'Seek qualified help if crashes prevent backups or recovery, storage may be failing, the PC shows signs of electrical or liquid damage, or repeated memory and hardware tests report errors. Do not keep stressing a system that may have a failing drive.' },
    ],
  },
  {
    id: 'windows-repair-log-analyzer',
    path: '/tools/windows-repair-log-analyzer',
    title: 'Windows Repair Log Analyzer',
    group: 'diagnose',
    kindLabel: 'Log analyzer',
    status: 'New',
    hubDescription: 'Inspect supported CBS, DISM, Windows Update and Event Viewer text exports locally. Find recurring error codes, repair-source problems, permissions issues and useful log excerpts without uploading files.',
    menuDescription: 'Find Windows servicing and update errors in local log exports.',
    seoTitle: 'Windows Repair Log Analyzer: CBS, DISM and Update Logs',
    metaDescription: 'Analyze Windows CBS, DISM, Windows Update and Event Viewer text exports locally. Extract common error codes and useful lines without uploads.',
    faq: [
      { question: 'Are my Windows logs uploaded?', answer: 'No. The selected text file is read and analyzed in your browser. The log contents, file name and extracted lines are not sent to Tech World Window. No AI API key is required.' },
      { question: 'Which files are supported?', answer: 'Use text-based CBS.log, DISM.log, exported WindowsUpdate.log, or Event Viewer XML/CSV/TXT exports. Binary .evtx and .etl traces, ZIP archives and memory dumps are not parsed by this first version.' },
      { question: 'Does this tool repair Windows automatically?', answer: 'No. It only identifies known text patterns and shows nearby evidence. It does not run commands, change Windows settings, modify files or prove the root cause.' },
      { question: 'Why might a log contain no findings?', answer: 'The relevant error may be outside the scanned text window, use a pattern not yet recognized, or be stored in a binary trace. A quiet result is not proof that Windows is healthy or that a repair succeeded.' },
      { question: 'What should I do before trying a repair?', answer: 'Keep important files backed up, note the exact error code and Windows version, and prefer reversible checks. For repair-source errors, confirm that any Windows installation media matches the installed edition, language and release before using it.' },
    ],
  },
  {
    id: 'pc-bottleneck-calculator',
    path: '/tools/pc-bottleneck-calculator',
    title: 'PC Bottleneck Calculator: CPU vs GPU',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Compare broad CPU and GPU performance tiers at 1080p, 1440p and 4K, then verify the suspected limit with real game measurements.',
    menuDescription: 'Compare CPU/GPU tiers and verify a possible gaming limit.',
    seoTitle: 'PC Bottleneck Calculator & Checker: CPU or GPU Limit?',
    metaDescription: 'Free PC bottleneck calculator and checker: compare CPU and GPU tiers at 1080p, 1440p and 4K, then confirm with a real test. Not an exact percentage.',
    faq: [
      { question: 'Does this PC bottleneck calculator give an exact percentage?', answer: 'No. It compares broad CPU and GPU performance tiers with a simple resolution adjustment. It does not measure your PC, query a live benchmark database, or predict exact FPS.' },
      { question: 'Can a CPU bottleneck a graphics card?', answer: 'Yes. If the CPU cannot prepare frames as fast as the GPU can draw them, the GPU waits and its usage stays below its limit. This is more likely at lower resolutions and high frame-rate targets. A common sign is a game that does not speed up when you lower graphics settings while one CPU thread stays near its limit, but confirm it with a repeatable test rather than one reading.' },
      { question: 'Does 100% GPU usage mean my PC has a problem?', answer: 'Not usually. High GPU utilization can mean the game is using the graphics card fully. Check whether performance meets your target and look for abnormal temperatures, falling clocks, instability or frame-time problems.' },
      { question: 'Should I upgrade my CPU or GPU first?', answer: 'Do not decide from this estimate alone. Measure the games and settings you care about, identify the repeatable limit, check compatibility and power/cooling requirements, and compare independent benchmarks for the exact components.' },
      { question: 'Why can the same PC show different bottlenecks in different games?', answer: 'Games use CPU threads, graphics features, memory and engines differently. Resolution, quality settings, ray tracing, upscaling and target frame rate also change the workload, so there is no single bottleneck result for every situation.' },
      { question: 'What does this PC bottleneck calculator actually compare?', answer: 'It compares broad CPU and GPU performance tiers and adjusts the estimate for resolution. It does not identify an exact model’s performance from a live benchmark database.' },
      { question: 'How do I check my PC for a CPU or GPU bottleneck?', answer: 'Repeat the same game scene, record FPS and frame times, then lower resolution or one GPU-heavy setting while keeping other variables unchanged. Check CPU-thread activity, clocks, temperatures and memory use before upgrading.' },
    ],
  },
  {
    id: 'psu-wattage-calculator',
    path: '/tools/psu-wattage-calculator',
    title: 'PSU Wattage Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate a starting PSU wattage range from GPU, CPU and other system load, then check connectors, transient power and manufacturer guidance before buying.',
    menuDescription: 'Estimate PSU wattage and check the details that matter before buying.',
    seoTitle: 'PSU Wattage Calculator: Estimate Power Supply Size',
    // Kept under the 160-character validator limit (147 characters).
    metaDescription: 'Estimate a starting PC power supply wattage from your GPU, CPU and other parts. Learn about headroom, GPU power spikes, connectors and PSU quality.',
    faq: [
      { question: 'How much PSU wattage does my PC need?', answer: 'Add a realistic estimate for the graphics card, processor and the rest of the system, then leave suitable headroom. This calculator uses a simple 35% planning margin and rounds to a common wattage; it is a starting point, not a guarantee. Check the exact GPU manufacturer recommendation and independent tests for your components.' },
      { question: 'Is a higher-wattage power supply always better?', answer: 'No. Wattage alone does not tell you build quality, voltage regulation, noise, protections, efficiency or connector suitability. Choose a reputable model reviewed under load, with the right native connectors and enough capacity for the actual system.' },
      { question: 'Why can a GPU need more power than its average board power?', answer: 'Some graphics cards can draw brief transient power spikes above typical sustained consumption. The calculator cannot model those spikes or a specific PSU response, so check the GPU maker’s guidance and choose a tested PSU platform with suitable transient handling.' },
      { question: 'Do I need an ATX 3.0 or ATX 3.1 power supply?', answer: 'It depends on the graphics card, connector and PSU model. Newer standards can include defined transient-power requirements and newer GPU power connectors, but the label alone does not prove that a particular unit is the right choice. Verify native connector type, cable requirements and the GPU manufacturer’s instructions.' },
      { question: 'Can this calculator tell me whether my existing PSU is safe?', answer: 'No. It estimates a wattage shortlist only. It cannot inspect PSU age, condition, quality, wiring, protection circuits or whether a specific model handles your GPU’s transient loads. Do not open a PSU; if it smells burnt, makes abnormal electrical noises or shows damage, stop using it and have it replaced or checked by a qualified professional.' },
    ],
  },
  {
    id: 'ram-calculator',
    path: '/tools/ram-calculator',
    title: 'RAM Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate how much RAM your workload may need, then compare memory data rate, CAS latency and theoretical bandwidth before upgrading.',
    menuDescription: 'Plan RAM capacity and compare speed and latency.',
    seoTitle: 'RAM Calculator: How Much RAM Do I Need? Speed & Latency',
    metaDescription: 'Estimate RAM needs for Windows, gaming and apps, then compare data rate, CAS latency and bandwidth. Check compatibility before buying an upgrade.',
    faq: [
      { question: 'How much RAM do I need for gaming?', answer: 'The right capacity depends on the games, background apps, resolution-independent workload and whether you stream, create content or run virtual machines. Use the estimate as a planning starting point, then check actual memory use during your heaviest normal session.' },
      { question: 'Does more RAM make a PC faster?', answer: 'More capacity helps when your workload is running short of memory and Windows has to page data to storage. If memory use is comfortably below capacity, adding RAM may make little difference; CPU, GPU, storage, or software limits may matter more.' },
      { question: 'Is higher RAM speed always better?', answer: 'Not always. Actual performance depends on the CPU memory controller, motherboard, supported profile, timings, channel configuration and workload. A higher advertised data rate is useful only if the system supports and runs it stably.' },
      { question: 'What does CAS latency in nanoseconds mean?', answer: 'This calculator estimates CAS latency from the selected CAS timing and transfer rate. It is one timing measure, not total application latency or a full measure of memory performance; other timings and the memory controller also matter.' },
      { question: 'Can I mix different RAM kits or capacities?', answer: 'Mixed modules may run at a lower common speed or timing and are not guaranteed to be stable together. Check the system or motherboard support list, capacity limits, DDR generation and channel layout; laptops may have soldered or non-upgradeable memory.' },
      { question: 'Does this calculator check compatibility with my PC?', answer: 'No. It estimates capacity and theoretical metrics from your inputs. Verify the exact CPU, motherboard or laptop model, DDR generation, supported capacity, physical format and memory profiles before purchasing.' },
    ],
  },
  {
    id: 'memory-workload-budget-estimator',
    path: '/tools/memory-workload-budget-estimator',
    title: 'Memory Workload Budget Estimator',
    group: 'plan',
    kindLabel: 'Estimator',
    status: 'New',
    hubDescription: 'Estimate peak RAM demand across Windows, gaming, browser/chat, recording, local AI and background work, then compare the total with usable physical memory.',
    menuDescription: 'Estimate memory demand and remaining physical-RAM headroom.',
    seoTitle: 'Memory Workload Budget Estimator: RAM Headroom',
    metaDescription: 'Estimate peak RAM demand from Windows, gaming, browser, recording, local AI and background workloads. Compare it with usable physical memory before upgrading.',
    faq: [
      { question: 'Does this estimator scan my PC or read Task Manager?', answer: 'No. You enter rough workload estimates manually. The tool does not scan your PC, read running processes, inspect Task Manager, or run a benchmark.' },
      { question: 'How accurate is the memory workload estimate?', answer: 'It is a planning estimate, not a measurement. Categories can overlap and short workload spikes can be missed, so compare the result with Task Manager during your real workload before buying RAM.' },
      { question: 'Does committed memory above installed RAM prove that Windows is paging to disk?', answer: 'No. Commit charge is a system-wide commitment against the commit limit; it does not, by itself, show that the excess is actively being read from or written to the page file. Check In use, Available, Committed and the actual slowdown together.' },
      { question: 'What should I enter for RAM reserved or unavailable to Windows?', answer: 'Enter a known fixed firmware reservation only. Do not enter a maximum shared-GPU memory figure as if all of it were permanently reserved; graphics memory can be allocated dynamically.' },
      { question: 'When should I consider a RAM upgrade?', answer: 'Do not decide from this estimate alone. Reproduce the slow or heavy workload, inspect Task Manager > Performance > Memory, and look for sustained memory pressure that coincides with the symptom. Also check whether the exact PC supports the capacity and module type.' },
    ],
  },
  {
    id: 'video-embed-code-generator',
    path: '/tools/video-embed-code-generator',
    title: 'Video Embed Code Generator',
    group: 'create',
    kindLabel: 'Code generator',
    status: 'New',
    hubDescription: 'Turn a supported YouTube URL into responsive HTML iframe, React JSX or WordPress-ready embed code, with privacy, playback and sizing controls.',
    menuDescription: 'Generate responsive YouTube embed code for HTML, React or WordPress.',
    seoTitle: 'Video Embed Code Generator: Responsive YouTube HTML',
    metaDescription: 'Generate responsive YouTube embed code for HTML, React JSX or WordPress. Set aspect ratio, start time, controls, lazy loading and privacy-enhanced mode.',
    faq: [
      { question: 'Which video URLs does this generator accept?', answer: 'The generator accepts YouTube watch links, youtu.be short links, Shorts URLs, live URLs and standard YouTube embed URLs. It validates the hostname and video ID locally before creating code. This first version supports YouTube only.' },
      { question: 'Does the generator upload my URL or use an AI API?', answer: 'No. URL parsing and code generation run in your browser and do not send the video URL to a Tech World Window generation service or an AI API. If you choose to load the optional preview, your browser connects to YouTube and its privacy practices apply.' },
      { question: 'What is privacy-enhanced mode?', answer: 'It uses YouTube’s youtube-nocookie.com embed host. This changes the embed domain but is not a promise of zero network requests or complete legal privacy compliance. The video provider may still receive data when the player is loaded or used.' },
      { question: 'Why is autoplay muted automatically?', answer: 'Browsers commonly block autoplay that produces sound. When autoplay is enabled, this generator also enables mute in the generated player parameters to improve compatibility. Visitors can still have different browser or device policies.' },
      { question: 'How does looping one YouTube video work?', answer: 'For a single video, the generated YouTube embed sets loop=1 and adds that same video ID in the playlist parameter. Without the playlist parameter, single-video looping may not work as expected.' },
      { question: 'Is the generated embed responsive?', answer: 'Yes. The iframe sits inside a width-fluid wrapper with the selected CSS aspect ratio, so the player can resize with its container while preserving the chosen shape.' },
      { question: 'Can I use this output in WordPress?', answer: 'Choose WordPress HTML and paste the snippet into a Custom HTML block or the code editor in a context that permits iframe markup. Some hosted plans, editors, themes or security plugins restrict iframe HTML.' },
      { question: 'What happens before I load the preview?', answer: 'The tool shows a local preview placeholder and does not mount a YouTube iframe. You must explicitly select Load video preview before third-party player content is requested from the browser.' },
    ],
  },
  {
    id: 'storage-calculator',
    path: '/tools/storage-calculator',
    title: 'SSD & HDD Storage Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate game-library and file storage, then add planning headroom before choosing an SSD or HDD.',
    menuDescription: 'Estimate game storage and free-space headroom.',
    seoTitle: 'SSD & HDD Storage Calculator',
    metaDescription: 'Plan SSD or HDD capacity for games, apps and files. Estimate your total, add 20% headroom, and compare the result in GB and decimal TB.',
  },
];

export const toolByPath = new Map(tools.map(tool => [tool.path, tool]));

/** Articles that should point readers at a tool (slug without leading slash -> tool paths). */
export const articleToolLinks: Record<string, string[]> = {
  'how-much-ram-do-you-need-gaming': ['/tools/memory-workload-budget-estimator'],
  'research/does-more-ram-make-windows-faster': ['/tools/ram-calculator'],
  'research/upgrade-ram-ssd-now-or-wait': ['/tools/ram-calculator', '/tools/storage-calculator'],
  'laptop-battery-warning-signs': ['/tools/windows-battery-health-analyzer'],
  'windows-11-blue-screen-stop-code-how-to-read': [BSOD_BASE_PATH, '/tools/windows-troubleshooting-assistant'],
  'windows-troubleshooting-complete-guide': [BSOD_BASE_PATH, '/tools/windows-troubleshooting-assistant', '/tools/windows-support-lifecycle-checker'],
  'windows-secure-boot-certificate-update': ['/tools/secure-boot-status-checker'],
  'windows-11-wont-start-troubleshooting': [BSOD_BASE_PATH, '/tools/windows-troubleshooting-assistant'],
  'windows/windows-update-stuck': ['/tools/windows-troubleshooting-assistant', '/tools/windows-repair-log-analyzer'],
  'windows-11-high-memory-usage-how-to-find-the-cause': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-26h2-installation-guide': ['/tools/windows-support-lifecycle-checker'],
  'windows-11-26h2-iso-released': ['/tools/windows-support-lifecycle-checker'],
  'windows-11-disk-100-percent-usage': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-dns-not-working-how-to-fix': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-wifi-connected-no-internet': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-freezing-randomly-causes-fix': ['/tools/windows-troubleshooting-assistant'],
  'pc-game-stuttering-fix-frame-time': ['/tools/frame-time-analyzer', '/tools/windows-troubleshooting-assistant'],
  'gpu-frame-time-spikes-causes-fix': ['/tools/frame-time-analyzer', '/tools/windows-troubleshooting-assistant'],
  'shader-compilation-stutter-pc-games': ['/tools/frame-time-analyzer', '/tools/windows-troubleshooting-assistant'],
  'pc-game-low-fps-how-to-find-the-cause': ['/tools/frame-time-analyzer', '/tools/gpu-usage-checker', '/tools/pc-bottleneck-calculator', '/tools/windows-troubleshooting-assistant'],
  'gpu-100-percent-usage-gaming': ['/tools/gpu-usage-checker', '/tools/pc-bottleneck-calculator'],
  'gpu-overheating-gaming-pc-causes-fix': ['/tools/gpu-usage-checker'],
  'pc-power-supply-problems-symptoms': ['/tools/psu-wattage-calculator'],
};

const stripCode = (text: string) => text.replace(/`/g, '');

export function bsodSeo(entry: BsodEntry) {
  if (entry.slug === 'kernel-security-check-failure') {
    return {
      title: 'KERNEL_SECURITY_CHECK_FAILURE (0x139): Safe Fixes',
      description: 'KERNEL_SECURITY_CHECK_FAILURE (0x139 / 0x00000139) on Windows 11 or 10? Check drivers, unstable RAM settings and low-level software safely.',
    };
  }
  if (entry.slug === 'memory-management') {
    return {
      title: 'MEMORY_MANAGEMENT (0x1A): Causes and Safe Fixes',
      description: 'MEMORY_MANAGEMENT (0x1A / 0x0000001A) blue screen on Windows? Test RAM, return XMP/EXPO to stock, check drivers and read the crash evidence.',
    };
  }
  if (entry.slug === 'page-fault-in-nonpaged-area') {
    return {
      title: 'PAGE_FAULT_IN_NONPAGED_AREA (0x50): Causes & Fixes',
      description: 'Diagnose PAGE_FAULT_IN_NONPAGED_AREA (0x50 / 0x00000050) on Windows 10 and 11. Check drivers, RAM stability and crash-dump evidence safely.',
    };
  }
  return {
    title: `${entry.name} (${shortHex(entry.hex)}): Causes and Fixes`,
    description: `${entry.name} (${entry.hex}) on Windows 11 and 10: what it means, common causes and a safe step-by-step fix order.`,
  };
}

export function bsodFaq(entry: BsodEntry): ToolFaq[] {
  const order = entry.steps.slice(0, 4).map((item, index) => `${index + 1}) ${item.title}`).join('; ');
  return [
    { question: `What does ${entry.name} mean?`, answer: stripCode(`${entry.summary} ${entry.meaning}`) },
    { question: `What usually causes ${entry.name}?`, answer: stripCode(`Typical causes: ${entry.causes.join('; ')}.`) },
    { question: `How do I fix ${entry.name} (${entry.hex})?`, answer: stripCode(`A sensible order is: ${order}. ${entry.escalate}`) },
    ...(entry.deepDive?.faq ?? []),
  ];
}

export type ToolPageData = {
  title: string;
  description: string;
  faq: ToolFaq[];
  /** Present for interactive tools: emitted as WebApplication JSON-LD. */
  webApp?: { name: string; description: string };
};

export function getToolPageData(path: string): ToolPageData | undefined {
  const tool = toolByPath.get(path);
  if (tool) {
    return {
      title: `${tool.seoTitle} | Tech World Window`,
      description: tool.metaDescription,
      faq: tool.faq || [],
      webApp: { name: tool.title, description: tool.metaDescription },
    };
  }
  if (path.startsWith(`${BSOD_BASE_PATH}/`)) {
    const entry = bsodBySlug.get(path.slice(BSOD_BASE_PATH.length + 1));
    if (entry) {
      const seo = bsodSeo(entry);
      return { title: `${seo.title} | Tech World Window`, description: seo.description, faq: bsodFaq(entry) };
    }
  }
  return undefined;
}
