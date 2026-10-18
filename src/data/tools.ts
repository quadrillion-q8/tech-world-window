/**
 * Single registry for every tool page. The hub page, SEO metadata, JSON-LD (WebApplication and
 * FAQPage) and article call-outs all read from here, so adding a tool means adding one entry
 * plus a route in graph.ts.
 */
import { BSOD_BASE_PATH, bsodBySlug, bsodEntries, shortHex, type BsodEntry } from './bsod';

export type ToolFaq = { question: string; answer: string };
export type ToolGroup = 'diagnose' | 'plan';

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

export const HUB_SEO_DESCRIPTION = 'Free Windows troubleshooting, frame-time analysis, blue-screen lookup, laptop battery health analysis and PC hardware calculators.';

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
    id: 'frame-time-analyzer',
    path: '/tools/frame-time-analyzer',
    title: 'Frame-Time Analyzer',
    group: 'diagnose',
    kindLabel: 'Analyzer',
    status: 'New',
    hubDescription: 'Analyze PresentMon, CapFrameX or FrameView captures, compare before/after changes, inspect 1% and 0.1% lows, and download a local report.',
    menuDescription: 'Find stutter that average FPS hides.',
    seoTitle: 'Frame-Time Analyzer: 1% Lows, Stutter and FPS Graph',
    metaDescription: 'Analyze PresentMon, CapFrameX or FrameView CSVs for 1% lows and stutter spikes. Compare two captures and download a local report in your browser.',
    faq: [
      { question: 'What is a frame-time analyzer?', answer: 'It reads a capture of how long each frame took to render and reports average FPS, 1% and 0.1% lows, stutter events and a frame-time graph. Frame times reveal stutter that a single average FPS number hides.' },
      { question: 'Is my capture uploaded anywhere?', answer: 'No. The file is read and analyzed in your browser. Nothing is sent to Tech World Window or to any other server.' },
      { question: 'Which capture tools work with this analyzer?', answer: 'Any tool that exports a CSV with a per-frame time in milliseconds works, including PresentMon, CapFrameX and NVIDIA FrameView. The analyzer looks for columns such as MsBetweenPresents or FrameTime. You can also paste one frame time in milliseconds per line.' },
      { question: 'What are 1% lows and 0.1% lows?', answer: 'They describe the slowest frames in a capture. Here the 1% low is the average FPS of the slowest 1% of frames, and the 0.1% low is the same for the slowest 0.1%. Tools define lows in different ways, so compare numbers only when they come from the same method.' },
      { question: 'How long should a capture be?', answer: 'Capture at least 60 seconds of the same gameplay scene. Shorter captures contain few slow frames, which makes 1% and 0.1% lows unreliable.' },
      { question: 'Can I save or share the analysis results?', answer: 'Yes. After analysis, copy the summary or download a plain-text report containing the metrics, findings, warnings and up to five of the slowest detected events. The export is generated locally and is not uploaded.' },
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
    hubDescription: `Search a Windows blue screen stop code by name or hex value and get the meaning, common causes and a safe fix order for ${bsodEntries.length} common codes.`,
    menuDescription: 'Look up a blue screen stop code.',
    seoTitle: 'BSOD Error Code Lookup: Windows Blue Screen Stop Codes',
    metaDescription: `Look up a Windows blue screen stop code by name or hex value. Plain-language meaning, common causes and a safe fix order for ${bsodEntries.length} common codes.`,
    faq: [
      { question: 'How do I find my blue screen stop code?', answer: 'Windows shows the stop code as text on the blue screen, for example CRITICAL_PROCESS_DIED. If the PC restarted before you could read it, open Event Viewer, then Windows Logs, then System, and look for a BugCheck event with ID 1001, which records the code. Reliability Monitor also lists critical events.' },
      { question: 'Does the hex code or the name matter more?', answer: 'They identify the same bug check. The name is easier to search and read, while the hex value, for example 0x000000EF, appears in logs and dump files.' },
      { question: 'Can a blue screen be fixed without reinstalling Windows?', answer: 'Often yes. Most stop codes come from drivers, memory, storage or system file problems that can be found and fixed in order. Reinstalling Windows is a last resort, and it does not fix failing hardware.' },
      { question: 'Is the stop code enough to diagnose the problem?', answer: 'Not on its own. A code names the type of failure, and several causes can lead to the same code. Use it to choose the first checks, then look at what changed recently and whether the crash repeats under the same conditions.' },
    ],
  },
  {
    id: 'pc-bottleneck-calculator',
    path: '/tools/pc-bottleneck-calculator',
    title: 'PC Bottleneck Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate a possible CPU/GPU limit at 1080p, 1440p, or 4K, then learn how to verify it with real game measurements.',
    menuDescription: 'Estimate CPU/GPU limits and learn how to verify them.',
    seoTitle: 'PC Bottleneck Calculator: CPU and GPU Balance by Resolution',
    metaDescription: 'Estimate possible CPU or GPU limits at 1080p, 1440p and 4K. Learn why bottlenecks vary by game and how to verify performance before upgrading.',
    faq: [
      { question: 'Does this PC bottleneck calculator give an exact percentage?', answer: 'No. It compares broad CPU and GPU performance tiers with a simple resolution adjustment. It does not measure your PC, query a live benchmark database, or predict exact FPS.' },
      { question: 'Does 100% GPU usage mean my PC has a problem?', answer: 'Not usually. High GPU utilization can mean the game is using the graphics card fully. Check whether performance meets your target and look for abnormal temperatures, falling clocks, instability or frame-time problems.' },
      { question: 'Should I upgrade my CPU or GPU first?', answer: 'Do not decide from this estimate alone. Measure the games and settings you care about, identify the repeatable limit, check compatibility and power/cooling requirements, and compare independent benchmarks for the exact components.' },
      { question: 'Why can the same PC show different bottlenecks in different games?', answer: 'Games use CPU threads, graphics features, memory and engines differently. Resolution, quality settings, ray tracing, upscaling and target frame rate also change the workload, so there is no single bottleneck result for every situation.' },
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
    metaDescription: 'Estimate a starting PC power supply wattage from GPU, CPU and other components. Learn about headroom, GPU power spikes, connectors, PSU quality and manufacturer recommendations.',
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
    hubDescription: 'Estimate practical RAM capacity and compare data rate, CAS latency and theoretical bandwidth.',
    menuDescription: 'Estimate memory capacity and compare RAM speed.',
    seoTitle: 'RAM Calculator: Capacity, Speed & Latency',
    metaDescription: 'Estimate practical RAM capacity and compare memory data rate, CAS latency and theoretical bandwidth before choosing a compatible upgrade.',
  },
  {
    id: 'storage-calculator',
    path: '/tools/storage-calculator',
    title: 'Storage Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate how much SSD or HDD capacity your games, apps and files will need.',
    menuDescription: 'Plan storage capacity and headroom.',
    seoTitle: 'Storage Calculator',
    metaDescription: 'Estimate how much SSD or HDD capacity your games, apps and files will need before choosing a drive.',
  },
];

export const toolByPath = new Map(tools.map(tool => [tool.path, tool]));

/** Articles that should point readers at a tool (slug without leading slash -> tool paths). */
export const articleToolLinks: Record<string, string[]> = {
  'research/does-more-ram-make-windows-faster': ['/tools/ram-calculator'],
  'laptop-battery-warning-signs': ['/tools/windows-battery-health-analyzer'],
  'windows-11-blue-screen-stop-code-how-to-read': [BSOD_BASE_PATH, '/tools/windows-troubleshooting-assistant'],
  'windows-11-wont-start-troubleshooting': [BSOD_BASE_PATH, '/tools/windows-troubleshooting-assistant'],
  'windows/windows-update-stuck': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-high-memory-usage-how-to-find-the-cause': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-disk-100-percent-usage': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-dns-not-working-how-to-fix': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-wifi-connected-no-internet': ['/tools/windows-troubleshooting-assistant'],
  'windows-11-freezing-randomly-causes-fix': ['/tools/windows-troubleshooting-assistant'],
  'pc-game-stuttering-fix-frame-time': ['/tools/frame-time-analyzer', '/tools/windows-troubleshooting-assistant'],
  'gpu-frame-time-spikes-causes-fix': ['/tools/frame-time-analyzer', '/tools/windows-troubleshooting-assistant'],
  'shader-compilation-stutter-pc-games': ['/tools/frame-time-analyzer', '/tools/windows-troubleshooting-assistant'],
  'pc-game-low-fps-how-to-find-the-cause': ['/tools/frame-time-analyzer', '/tools/pc-bottleneck-calculator', '/tools/windows-troubleshooting-assistant'],
  'gpu-100-percent-usage-gaming': ['/tools/pc-bottleneck-calculator'],
};

const stripCode = (text: string) => text.replace(/`/g, '');

export function bsodSeo(entry: BsodEntry) {
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
