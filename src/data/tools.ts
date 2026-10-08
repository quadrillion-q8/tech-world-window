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

export const HUB_SEO_DESCRIPTION = 'Free technology tools from Tech World Window, including practical calculators and troubleshooting helpers.';

export const tools: ToolDef[] = [
  {
    id: 'frame-time-analyzer',
    path: '/tools/frame-time-analyzer',
    title: 'Frame-Time Analyzer',
    group: 'diagnose',
    kindLabel: 'Analyzer',
    status: 'New',
    hubDescription: 'Upload a PresentMon, CapFrameX or FrameView capture to see 1% and 0.1% lows, stutter spikes and a frame-time graph, all inside your browser.',
    menuDescription: 'Find stutter that average FPS hides.',
    seoTitle: 'Frame-Time Analyzer: 1% Lows, Stutter and FPS Graph',
    metaDescription: 'Free frame-time analyzer. Upload a PresentMon, CapFrameX or FrameView CSV for 1% and 0.1% lows, stutter spikes and a graph. Runs in your browser.',
    faq: [
      { question: 'What is a frame-time analyzer?', answer: 'It reads a capture of how long each frame took to render and reports average FPS, 1% and 0.1% lows, stutter events and a frame-time graph. Frame times reveal stutter that a single average FPS number hides.' },
      { question: 'Is my capture uploaded anywhere?', answer: 'No. The file is read and analyzed in your browser. Nothing is sent to Tech World Window or to any other server.' },
      { question: 'Which capture tools work with this analyzer?', answer: 'Any tool that exports a CSV with a per-frame time in milliseconds works, including PresentMon, CapFrameX and NVIDIA FrameView. The analyzer looks for columns such as MsBetweenPresents or FrameTime. You can also paste one frame time in milliseconds per line.' },
      { question: 'What are 1% lows and 0.1% lows?', answer: 'They describe the slowest frames in a capture. Here the 1% low is the average FPS of the slowest 1% of frames, and the 0.1% low is the same for the slowest 0.1%. Tools define lows in different ways, so compare numbers only when they come from the same method.' },
      { question: 'How long should a capture be?', answer: 'Capture at least 60 seconds of the same gameplay scene. Shorter captures contain few slow frames, which makes 1% and 0.1% lows unreliable.' },
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
    hubDescription: 'Estimate whether a CPU/GPU pairing may be limiting performance at 1080p, 1440p, or 4K.',
    menuDescription: 'Explore CPU/GPU pairing.',
    seoTitle: 'PC Bottleneck Calculator',
    metaDescription: 'A simple educational PC pairing estimator. Learn why CPU and GPU bottlenecks depend on resolution, games, settings, and target frame rate.',
  },
  {
    id: 'psu-wattage-calculator',
    path: '/tools/psu-wattage-calculator',
    title: 'PSU Wattage Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate a sensible PSU range from GPU, CPU and other system load.',
    menuDescription: 'Estimate practical PSU headroom.',
    seoTitle: 'PSU Wattage Calculator',
    metaDescription: 'Estimate a sensible power supply range from your GPU, CPU and other system load before you buy a PSU.',
  },
  {
    id: 'ram-calculator',
    path: '/tools/ram-calculator',
    title: 'RAM Calculator',
    group: 'plan',
    kindLabel: 'Calculator',
    status: 'Available now',
    hubDescription: 'Estimate a practical memory capacity from Windows, application and gaming use.',
    menuDescription: 'Estimate memory requirements.',
    seoTitle: 'RAM Calculator',
    metaDescription: 'Estimate a practical memory capacity from Windows, application and gaming use before you buy or upgrade RAM.',
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
  'windows-11-blue-screen-stop-code-how-to-read': [BSOD_BASE_PATH],
  'windows-11-wont-start-troubleshooting': [BSOD_BASE_PATH],
  'pc-game-stuttering-fix-frame-time': ['/tools/frame-time-analyzer'],
  'gpu-frame-time-spikes-causes-fix': ['/tools/frame-time-analyzer'],
  'shader-compilation-stutter-pc-games': ['/tools/frame-time-analyzer'],
  'pc-game-low-fps-how-to-find-the-cause': ['/tools/frame-time-analyzer'],
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
