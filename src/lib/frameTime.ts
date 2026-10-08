/**
 * Frame-time parsing and analysis. Pure functions, no DOM access, so the same code runs
 * during SSG, in the browser, and in tests. Nothing here performs network requests.
 */

export type ParsedCapture = {
  /** Frame times in milliseconds, in capture order. */
  frames: number[];
  /** Name of the column the frame times came from. */
  columnUsed: string;
  /** Application name when the capture contained several and one was selected. */
  application?: string;
  rowsRead: number;
  truncated: boolean;
  warnings: string[];
};

export type ParseResult = { ok: true; data: ParsedCapture } | { ok: false; error: string };

export const MIN_FRAMES = 60;
export const MAX_FRAMES = 1_000_000;

const FRAME_TIME_COLUMNS = [
  'msbetweenpresents', 'ms between presents', 'frametime', 'frame time', 'frametime(ms)', 'frame time (ms)',
  'frametime (ms)', 'frametime [ms]', 'frame time [ms]', 'frame_time', 'frametimes', 'frame times', 'ms/frame',
];
const FALLBACK_FRAME_TIME_COLUMNS = ['msbetweendisplaychange', 'ms between display change'];
const FPS_COLUMNS = ['fps', 'framerate', 'frame rate', 'framerate (fps)', 'framerate [fps]', 'avg fps'];

function splitLine(line: string, delimiter: string): string[] {
  if (!line.includes('"')) return line.split(delimiter).map(cell => cell.trim());
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; } else inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      cells.push(current.trim());
      current = '';
    } else current += char;
  }
  cells.push(current.trim());
  return cells;
}

function detectDelimiter(line: string): string {
  const counts: [string, number][] = [[',', 0], [';', 0], ['\t', 0]];
  for (const char of line) for (const entry of counts) if (char === entry[0]) entry[1]++;
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][1] > 0 ? counts[0][0] : ',';
}

function findColumn(headers: string[], candidates: string[]): number {
  for (const candidate of candidates) {
    const index = headers.indexOf(candidate);
    if (index !== -1) return index;
  }
  return -1;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Accepts PresentMon / CapFrameX / FrameView style CSV, or a plain list of millisecond values. */
export function parseFrameData(rawText: string): ParseResult {
  const text = rawText.replace(/^\uFEFF/, '');
  const lines = text.split(/\r\n|\n|\r/).map(line => line.trim()).filter(Boolean);
  if (lines.length < 2) return { ok: false, error: 'The file is empty or has too few lines. Paste or upload a frame-time capture (CSV).' };

  const warnings: string[] = [];
  let values: number[] = [];
  let columnUsed = '';
  let application: string | undefined;
  let rowsRead = 0;

  // 1. Find a header row within the first 40 lines that names a frame-time (or FPS) column.
  let headerIndex = -1;
  let delimiter = ',';
  let headers: string[] = [];
  for (let i = 0; i < Math.min(lines.length, 40); i++) {
    const candidateDelimiter = detectDelimiter(lines[i]);
    const cells = splitLine(lines[i], candidateDelimiter).map(cell => cell.toLowerCase());
    if (findColumn(cells, [...FRAME_TIME_COLUMNS, ...FALLBACK_FRAME_TIME_COLUMNS, ...FPS_COLUMNS]) !== -1) {
      headerIndex = i; delimiter = candidateDelimiter; headers = cells; break;
    }
  }

  if (headerIndex !== -1) {
    let column = findColumn(headers, FRAME_TIME_COLUMNS);
    if (column === -1) column = findColumn(headers, FALLBACK_FRAME_TIME_COLUMNS);
    if (column === -1) {
      return { ok: false, error: 'This file has an FPS column but no frame-time column. FPS logs average away stutter, so they cannot show frame-time spikes. Capture again with PresentMon, CapFrameX or NVIDIA FrameView, which record the time of every frame.' };
    }
    columnUsed = splitLine(lines[headerIndex], delimiter)[column] || headers[column];
    if (FALLBACK_FRAME_TIME_COLUMNS.includes(headers[column])) {
      warnings.push('Used the display-change interval because no between-presents column was found. Results describe when frames reached the screen, not when they were presented.');
    }
    const appColumn = headers.indexOf('application');
    const rows: { value: number; app?: string }[] = [];
    for (let i = headerIndex + 1; i < lines.length; i++) {
      const cells = splitLine(lines[i], delimiter);
      const value = Number.parseFloat(cells[column]);
      if (!Number.isFinite(value) || value <= 0) continue;
      rows.push({ value, app: appColumn !== -1 ? cells[appColumn] : undefined });
    }
    rowsRead = rows.length;
    if (appColumn !== -1) {
      const counts = new Map<string, number>();
      for (const row of rows) counts.set(row.app || '', (counts.get(row.app || '') || 0) + 1);
      if (counts.size > 1) {
        const [top] = [...counts.entries()].sort((a, b) => b[1] - a[1]);
        application = top[0];
        warnings.push(`The capture contains ${counts.size} applications. Analyzing the one with the most frames: ${top[0] || 'unnamed'}.`);
        values = rows.filter(row => (row.app || '') === top[0]).map(row => row.value);
      } else {
        application = rows[0]?.app;
        values = rows.map(row => row.value);
      }
    } else {
      values = rows.map(row => row.value);
    }
  } else {
    // 2. No header: accept a single numeric column (first numeric cell on each line).
    const firstDelimiter = detectDelimiter(lines[0]);
    const numeric: number[] = [];
    for (const line of lines) {
      const value = Number.parseFloat(splitLine(line, firstDelimiter)[0]);
      if (Number.isFinite(value) && value > 0) numeric.push(value);
    }
    if (numeric.length < Math.min(MIN_FRAMES, lines.length * 0.8)) {
      return { ok: false, error: 'Could not find frame times. Use a PresentMon, CapFrameX or FrameView CSV (with a MsBetweenPresents or FrameTime column), or paste one frame time in milliseconds per line.' };
    }
    values = numeric;
    rowsRead = numeric.length;
    columnUsed = 'first column (no header)';
    warnings.push('No header row found. Treated the first column as frame times in milliseconds.');
  }

  if (values.length < MIN_FRAMES) {
    return { ok: false, error: `Only ${values.length} usable frames were found. At least ${MIN_FRAMES} are needed, and a capture of 60 seconds or more gives meaningful 1% and 0.1% lows.` };
  }

  // Unit sanity checks.
  const typical = median(values.length > 5000 ? values.slice(0, 5000) : values);
  if (typical < 0.2) {
    values = values.map(value => value * 1000);
    warnings.push('Values looked like seconds, so they were converted to milliseconds.');
  } else if (typical > 2000) {
    return { ok: false, error: 'The values are far too large to be frame times in milliseconds. Check that you selected the right column or export.' };
  }

  let truncated = false;
  if (values.length > MAX_FRAMES) {
    values = values.slice(0, MAX_FRAMES);
    truncated = true;
    warnings.push(`Only the first ${MAX_FRAMES.toLocaleString('en-US')} frames were analyzed.`);
  }
  if (values.length < 1000) warnings.push('This is a short capture. 1% and 0.1% lows rest on very few frames, so treat them as rough.');

  return { ok: true, data: { frames: values, columnUsed, application, rowsRead, truncated, warnings } };
}

export type SpikeEvent = { startIndex: number; startSec: number; frameCount: number; worstMs: number };

export type FrameAnalysis = {
  frameCount: number;
  durationSec: number;
  avgFps: number;
  medianMs: number;
  minMs: number;
  maxMs: number;
  p95Ms: number;
  p99Ms: number;
  p999Ms: number;
  low1Fps: number;
  low01Fps: number;
  p99Fps: number;
  stdDevMs: number;
  meanAbsDeltaMs: number;
  overBudgetPct: number;
  over50: number;
  over100: number;
  spikes: SpikeEvent[];
  spikesPerMinute: number;
  earlyClusterShare: number;
  histogram: { label: string; count: number; pct: number }[];
  targetHz: number;
};

function percentile(sorted: Float64Array, q: number): number {
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(q * sorted.length) - 1));
  return sorted[index];
}

function insertSorted(window: number[], value: number) {
  let lo = 0; let hi = window.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (window[mid] < value) lo = mid + 1; else hi = mid; }
  window.splice(lo, 0, value);
}

function removeSorted(window: number[], value: number) {
  let lo = 0; let hi = window.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (window[mid] < value) lo = mid + 1; else hi = mid; }
  if (window[lo] === value) window.splice(lo, 1);
}

const HISTOGRAM_EDGES: { upTo: number; label: string }[] = [
  { upTo: 4.17, label: 'Faster than 240 FPS pace' },
  { upTo: 6.94, label: '144 to 240 FPS pace' },
  { upTo: 8.33, label: '120 to 144 FPS pace' },
  { upTo: 11.11, label: '90 to 120 FPS pace' },
  { upTo: 16.67, label: '60 to 90 FPS pace' },
  { upTo: 25, label: '40 to 60 FPS pace' },
  { upTo: 33.33, label: '30 to 40 FPS pace' },
  { upTo: 50, label: '20 to 30 FPS pace' },
  { upTo: 100, label: '10 to 20 FPS pace (visible hitch)' },
  { upTo: Infinity, label: 'Slower than 10 FPS pace (freeze)' },
];

/** Window of nearby frames used as the local baseline when detecting spikes. */
const SPIKE_HALF_WINDOW = 30;
const SPIKE_RATIO = 2;
const SPIKE_MIN_EXCESS_MS = 8;

/** Published on the tool page so the description of the rule cannot drift from the code. */
export const SPIKE_RULE = {
  windowFrames: SPIKE_HALF_WINDOW * 2 + 1,
  ratio: SPIKE_RATIO,
  minExcessMs: SPIKE_MIN_EXCESS_MS,
  budgetTolerance: 1.1,
};

export function analyzeFrames(frames: number[], targetHz: number): FrameAnalysis {
  const n = frames.length;
  const sorted = Float64Array.from(frames).sort();
  let sum = 0;
  for (const value of frames) sum += value;
  const mean = sum / n;
  const durationSec = sum / 1000;

  let variance = 0;
  for (const value of frames) variance += (value - mean) ** 2;
  const stdDevMs = Math.sqrt(variance / n);

  let deltaSum = 0;
  for (let i = 1; i < n; i++) deltaSum += Math.abs(frames[i] - frames[i - 1]);
  const meanAbsDeltaMs = n > 1 ? deltaSum / (n - 1) : 0;

  const lowAverageFps = (share: number) => {
    const count = Math.max(1, Math.ceil(n * share));
    let total = 0;
    for (let i = n - count; i < n; i++) total += sorted[i];
    return 1000 / (total / count);
  };

  const budgetMs = 1000 / targetHz;
  let overBudget = 0; let over50 = 0; let over100 = 0;
  const histogramCounts = new Array(HISTOGRAM_EDGES.length).fill(0) as number[];
  for (const value of frames) {
    if (value > budgetMs * SPIKE_RULE.budgetTolerance) overBudget++;
    if (value > 50) over50++;
    if (value > 100) over100++;
    const bucket = HISTOGRAM_EDGES.findIndex(edge => value <= edge.upTo);
    histogramCounts[bucket]++;
  }

  // Spike detection against a sliding local median.
  const spikeFlags = new Uint8Array(n);
  const window: number[] = [];
  let lo = 0; let hi = -1; // inclusive indices currently inside the window
  for (let i = 0; i < n; i++) {
    const wantLo = Math.max(0, i - SPIKE_HALF_WINDOW);
    const wantHi = Math.min(n - 1, i + SPIKE_HALF_WINDOW);
    while (hi < wantHi) { hi++; insertSorted(window, frames[hi]); }
    while (lo < wantLo) { removeSorted(window, frames[lo]); lo++; }
    const baseline = window[window.length >> 1];
    if (frames[i] > baseline * SPIKE_RATIO && frames[i] - baseline >= SPIKE_MIN_EXCESS_MS) spikeFlags[i] = 1;
  }

  const spikes: SpikeEvent[] = [];
  let elapsedMs = 0;
  let active: SpikeEvent | null = null;
  for (let i = 0; i < n; i++) {
    if (spikeFlags[i]) {
      if (!active) { active = { startIndex: i, startSec: elapsedMs / 1000, frameCount: 0, worstMs: 0 }; spikes.push(active); }
      active.frameCount++;
      if (frames[i] > active.worstMs) active.worstMs = frames[i];
    } else active = null;
    elapsedMs += frames[i];
  }

  const earlyCount = spikes.filter(spike => spike.startSec <= durationSec * 0.2).length;

  return {
    frameCount: n,
    durationSec,
    avgFps: 1000 / mean,
    medianMs: percentile(sorted, 0.5),
    minMs: sorted[0],
    maxMs: sorted[n - 1],
    p95Ms: percentile(sorted, 0.95),
    p99Ms: percentile(sorted, 0.99),
    p999Ms: percentile(sorted, 0.999),
    low1Fps: lowAverageFps(0.01),
    low01Fps: lowAverageFps(0.001),
    p99Fps: 1000 / percentile(sorted, 0.99),
    stdDevMs,
    meanAbsDeltaMs,
    overBudgetPct: (overBudget / n) * 100,
    over50,
    over100,
    spikes,
    spikesPerMinute: durationSec > 0 ? spikes.length / (durationSec / 60) : 0,
    earlyClusterShare: spikes.length ? earlyCount / spikes.length : 0,
    histogram: HISTOGRAM_EDGES.map((edge, index) => ({ label: edge.label, count: histogramCounts[index], pct: (histogramCounts[index] / n) * 100 })),
    targetHz,
  };
}

export type Finding = {
  level: 'good' | 'watch' | 'problem';
  title: string;
  detail: string;
  links: { label: string; href: string }[];
};

const LINKS = {
  stutter: { label: 'Fix PC game stuttering', href: '/pc-game-stuttering-fix-frame-time' },
  gpuSpikes: { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix' },
  shader: { label: 'Shader compilation stutter', href: '/shader-compilation-stutter-pc-games' },
  lowFps: { label: 'Find the cause of low FPS', href: '/pc-game-low-fps-how-to-find-the-cause' },
  crashes: { label: 'Games crashing to desktop', href: '/pc-games-crashing-to-desktop-troubleshooting' },
  gpuTemps: { label: 'GPU overheating while gaming', href: '/gpu-overheating-gaming-pc-causes-fix' },
  ssdHealth: { label: 'Check SSD health', href: '/how-to-check-ssd-health-windows' },
  gpuUsage: { label: 'GPU at 100% usage', href: '/gpu-100-percent-usage-gaming' },
};

/** Rule-based reading of the numbers. Wording is deliberately hedged: a capture cannot prove a cause. */
export function buildFindings(a: FrameAnalysis): Finding[] {
  const findings: Finding[] = [];
  const fmt = (value: number) => (value >= 100 ? value.toFixed(0) : value.toFixed(1));

  if (a.over100 > 0) {
    findings.push({
      level: 'problem',
      title: `${a.over100} freeze${a.over100 === 1 ? '' : 's'} longer than 100 ms`,
      detail: `The slowest frame took ${fmt(a.maxMs)} ms. Single pauses this long are rarely ordinary low FPS. Common causes include shader compilation, assets loading from storage, background tasks, or hardware throttling. Note what was happening in the game at the time of the worst spikes below.`,
      links: [LINKS.shader, LINKS.stutter, LINKS.gpuTemps],
    });
  }

  if (a.spikes.length > 0) {
    const perMinute = a.spikesPerMinute;
    const level: Finding['level'] = perMinute < 1 ? 'good' : perMinute < 6 ? 'watch' : 'problem';
    const early = a.spikes.length >= 4 && a.earlyClusterShare >= 0.6;
    findings.push({
      level,
      title: `${a.spikes.length} stutter event${a.spikes.length === 1 ? '' : 's'} detected (${perMinute.toFixed(1)} per minute)`,
      detail: early
        ? 'Most spikes happen in the first fifth of the capture. That pattern points toward first-time shader compilation or asset loading rather than a steady performance problem. Capture the same route a second time: if the spikes mostly disappear, warm-up is the likely cause.'
        : 'A stutter event here means a frame that took more than twice as long as its neighbors and at least 8 ms longer. Frequent events spread across the capture suggest a recurring cause such as background activity, memory pressure, storage stalls or CPU scheduling.',
      links: early ? [LINKS.shader, LINKS.stutter] : [LINKS.stutter, LINKS.gpuSpikes],
    });
  } else {
    findings.push({
      level: 'good',
      title: 'No stutter events detected',
      detail: 'No frame stood out sharply from the frames around it, using the rule described under "How the numbers are calculated".',
      links: [],
    });
  }

  const ratio = a.low1Fps / a.avgFps;
  if (ratio < 0.55) {
    findings.push({
      level: 'problem',
      title: 'Large gap between average FPS and 1% lows',
      detail: `1% lows are ${Math.round(ratio * 100)}% of the average. The game feels much worse than the average suggests because the slowest frames are far slower than typical ones.`,
      links: [LINKS.stutter, LINKS.gpuSpikes],
    });
  } else if (ratio < 0.75) {
    findings.push({
      level: 'watch',
      title: 'Moderate gap between average FPS and 1% lows',
      detail: `1% lows are ${Math.round(ratio * 100)}% of the average. Some unevenness exists but it may be normal for this game and scene.`,
      links: [LINKS.stutter],
    });
  } else {
    findings.push({
      level: 'good',
      title: 'Consistent frame delivery',
      detail: `1% lows are ${Math.round(ratio * 100)}% of the average, so the slowest frames are not far from typical ones.`,
      links: [],
    });
  }

  const jitter = a.meanAbsDeltaMs / (1000 / a.avgFps);
  if (jitter > 0.25 && a.spikes.length === 0) {
    findings.push({
      level: 'watch',
      title: 'Uneven pacing without big spikes',
      detail: 'Frame times vary noticeably from one frame to the next even though no single frame is extreme. Frame caps, V-Sync or adaptive-sync behavior, overlays and CPU-limited scenes can all produce this.',
      links: [LINKS.stutter, LINKS.gpuUsage],
    });
  }

  if (a.avgFps < a.targetHz * 0.9) {
    findings.push({
      level: a.avgFps < a.targetHz * 0.6 ? 'problem' : 'watch',
      title: `Average is below your ${a.targetHz} Hz target`,
      detail: `The capture averages ${fmt(a.avgFps)} FPS, so the system is not reaching ${a.targetHz} FPS in this scene. Whether the GPU or the CPU is the limit needs separate utilization data.`,
      links: [LINKS.lowFps, LINKS.gpuUsage],
    });
  }

  if (a.over100 === 0 && a.over50 > 0) {
    findings.push({
      level: 'watch',
      title: `${a.over50} frame${a.over50 === 1 ? '' : 's'} slower than 50 ms`,
      detail: 'Frames this slow are visible as hitches even when the average looks healthy.',
      links: [LINKS.stutter],
    });
  }

  return findings;
}

export function summaryText(a: FrameAnalysis, label: string): string {
  const lines = [
    `Frame-time analysis (${label}) from techworldwindow.com/tools/frame-time-analyzer`,
    `Frames: ${a.frameCount.toLocaleString('en-US')} over ${a.durationSec.toFixed(1)} s`,
    `Average: ${a.avgFps.toFixed(1)} FPS`,
    `1% low: ${a.low1Fps.toFixed(1)} FPS | 0.1% low: ${a.low01Fps.toFixed(1)} FPS`,
    `99th percentile frame time: ${a.p99Ms.toFixed(2)} ms | worst frame: ${a.maxMs.toFixed(1)} ms`,
    `Stutter events: ${a.spikes.length} (${a.spikesPerMinute.toFixed(1)} per minute) | frames over 50 ms: ${a.over50} | over 100 ms: ${a.over100}`,
  ];
  return lines.join('\n');
}

/** Deterministic synthetic capture so visitors can try the tool. It is not a real benchmark. */
export function buildSampleCsv(): string {
  let seed = 20260408;
  const random = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  const rows: string[] = ['Application,ProcessID,TimeInSeconds,MsBetweenPresents'];
  let t = 0;
  while (t < 60) {
    let ms = 10.4 + (random() - 0.5) * 1.6;
    if (t > 2 && t < 6 && random() < 0.012) ms += 25 + random() * 20;
    if (random() < 0.0015) ms += 12 + random() * 14;
    if (t > 21.0 && t < 21.03) ms = 48;
    if (t > 43.0 && t < 43.03) ms = 126;
    rows.push(`sample-game.exe,4242,${t.toFixed(4)},${ms.toFixed(3)}`);
    t += ms / 1000;
  }
  return rows.join('\n');
}
