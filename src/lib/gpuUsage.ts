/**
 * Rules-based triage for "Is my GPU usage normal?".
 *
 * This is deliberately a transparent decision table, not a hardware test: it takes values the reader
 * already read from a monitoring tool and returns the most likely explanation plus an ordered list of
 * safe checks. It never applies a universal temperature limit — temperature is only compared with a
 * maximum the reader supplies from their own GPU maker's specification.
 */

export type Scenario = 'gaming' | 'desktop' | 'media';
export type FpsOutcome = 'meets' | 'below-steady' | 'below-unstable';
export type CpuState = 'unknown' | 'headroom' | 'core-pinned';
export type FrameLimit = 'unknown' | 'uncapped' | 'capped';
export type MonitorSource = 'task-manager' | 'vendor-overlay' | 'third-party' | 'other';

export type GpuInputs = {
  scenario: Scenario;
  /** Reported GPU utilization, 0–100. Null when the reader has no usable number. */
  gpuPercent: number | null;
  /** The reader's tool shows -1%, N/A, a frozen value or another impossible number. */
  invalidReading: boolean;
  fps: FpsOutcome;
  cpu: CpuState;
  frameLimit: FrameLimit;
  source: MonitorSource;
  tempC: number | null;
  /** Maximum operating temperature from the GPU maker's specification, if the reader looked it up. */
  maxTempC: number | null;
};

export type VerdictLevel = 'normal' | 'check' | 'measure' | 'reading';

export type Verdict = {
  level: VerdictLevel;
  /** Short label shown on the result badge. */
  label: string;
  headline: string;
  summary: string;
  reasons: string[];
  steps: string[];
  links: { label: string; href: string }[];
  /** Extra temperature context, shown only when a temperature was entered. */
  tempNote?: string;
};

export type GpuResult = { ok: true; verdict: Verdict } | { ok: false; error: string };

const LINKS = {
  frameTime: { label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer' },
  stutter: { label: 'PC game stuttering: complete diagnostic guide', href: '/pc-game-stuttering-fix-frame-time' },
  spikes: { label: 'GPU frame-time spikes', href: '/gpu-frame-time-spikes-causes-fix' },
  shader: { label: 'Shader compilation stutter', href: '/shader-compilation-stutter-pc-games' },
  lowFps: { label: 'Low FPS in PC games', href: '/pc-game-low-fps-how-to-find-the-cause' },
  overheating: { label: 'GPU overheating while gaming', href: '/gpu-overheating-gaming-pc-causes-fix' },
  bottleneck: { label: 'PC Bottleneck Calculator', href: '/tools/pc-bottleneck-calculator' },
  assistant: { label: 'Windows Troubleshooting Assistant', href: '/tools/windows-troubleshooting-assistant' },
  guide: { label: 'GPU at 100% while gaming: full guide', href: '/gpu-100-percent-usage-gaming' },
} as const;

const SOURCE_NOTE: Record<MonitorSource, string | null> = {
  'task-manager':
    'Task Manager can show different GPU engines (3D, Copy, Video Decode). A game’s rendering load normally appears under 3D, so make sure the engine you are reading matches the work you are checking.',
  'vendor-overlay': null,
  'third-party':
    'Third-party monitors read counters or sensors through drivers and can disagree with each other. If a value looks wrong, cross-check it in Task Manager or the GPU maker’s own tool before drawing a conclusion.',
  other: null,
};

function tempContext(tempC: number | null, maxTempC: number | null): string | undefined {
  if (tempC === null) return undefined;
  if (maxTempC === null) {
    return `You entered ${tempC} °C. Safe temperatures differ by GPU model and by which sensor (core or hotspot) you are reading, so this checker does not apply a universal limit. Look up the maximum operating temperature for your exact model on the maker’s specification page and compare it with a sustained reading, not a single spike.`;
  }
  const margin = maxTempC - tempC;
  if (margin <= 0) {
    return `Your ${tempC} °C reading is at or above the ${maxTempC} °C maximum you entered. Stop long stress sessions, check fans, dust and case airflow, and compare the sensor you are reading (core or hotspot) with the one the specification refers to. If it stays this hot at stock settings, contact the maker or a qualified technician.`;
  }
  if (margin <= 5) {
    return `Your ${tempC} °C reading is within ${margin} °C of the ${maxTempC} °C maximum you entered. Clock speeds may be reduced to stay inside that limit, which would show up as lower FPS even with high utilization. Check fan curves, dust, case airflow and the room temperature.`;
  }
  return `Your ${tempC} °C reading is ${margin} °C below the ${maxTempC} °C maximum you entered, which leaves headroom. A single reading does not prove sustained behavior, so watch it over a full play session.`;
}

function withExtras(verdict: Verdict, input: GpuInputs): Verdict {
  const sourceNote = SOURCE_NOTE[input.source];
  const reasons = sourceNote ? [...verdict.reasons, sourceNote] : verdict.reasons;
  return { ...verdict, reasons, tempNote: tempContext(input.tempC, input.maxTempC) };
}

function readingProblem(input: GpuInputs): Verdict {
  return {
    level: 'reading',
    label: 'Likely a reading problem',
    headline: 'The number itself is probably wrong, not your GPU',
    summary:
      'A value such as -1%, N/A, a frozen figure or a reading that does not change with the game usually means the monitoring tool could not read a valid counter or sensor. It does not by itself show a hardware fault.',
    reasons: [
      'Overlays and monitors read performance counters through the graphics driver. If the driver, the tool or the counter is out of step, the tool may display a placeholder such as -1.',
      'A tool that reads a different GPU engine or a different GPU (for example an integrated GPU in a laptop) can also show values that do not match what you see on screen.',
      ...(SOURCE_NOTE[input.source] ? [SOURCE_NOTE[input.source] as string] : []),
    ],
    steps: [
      'Open Task Manager (Ctrl+Shift+Esc) > Performance > GPU, start the game, and see whether the 3D engine graph moves. If it does, the GPU is working and the other tool is the problem.',
      'Close and reopen the monitoring tool, then update it to its latest version. Restart the game afterwards so the overlay attaches again.',
      'If you use a laptop with two GPUs, check which GPU the game is assigned to in Windows Settings > System > Display > Graphics.',
      'Compare the same reading in the GPU maker’s own tool (NVIDIA app, AMD Adrenalin) to see whether the value is consistent.',
      'Only after those checks, install the current driver from the GPU maker. Avoid driver-updater utilities, and do not treat this reading as proof that the card is failing.',
    ],
    links: [LINKS.guide, LINKS.assistant],
  };
}

function nonGaming(input: GpuInputs, gpu: number): Verdict {
  const where = input.scenario === 'desktop' ? 'on the desktop or in menus' : 'during video or media use';
  if (gpu >= 90) {
    return {
      level: 'check',
      label: 'Worth checking',
      headline: `${gpu}% GPU load ${where} is worth identifying`,
      summary:
        'High load without a demanding game running is not automatically a problem, but something is using the GPU and it is worth finding out what. Many causes are ordinary and harmless.',
      reasons: [
        'Game menus, launchers and loading screens often run uncapped and can use a GPU fully while showing very high frame rates.',
        'Browsers with hardware acceleration, video editors, screen recorders, upscaling and animated wallpapers can all use GPU engines.',
        'Encoding, rendering, local AI and some background tools also keep a GPU busy. A busy GPU alone does not prove malware or a hardware fault.',
      ],
      steps: [
        'In Task Manager > Processes, right-click a column header and enable GPU and GPU engine. Sort by GPU to see which process is responsible.',
        'If the process is a game or launcher menu, set a frame-rate cap (or turn on V-Sync) for that title and see whether usage drops.',
        'If it is a browser tab, a recorder or a wallpaper app, close it or turn off hardware acceleration in that app and watch the change.',
        'If you do not recognize the process, check its file location (right-click > Open file location) and run a Microsoft Defender scan before taking further action.',
        'Keep notes of which process and which GPU engine was busy before changing drivers or settings.',
      ],
      links: [LINKS.assistant, LINKS.guide],
    };
  }
  if (gpu >= 50) {
    return {
      level: 'measure',
      label: 'Probably ordinary',
      headline: `${gpu}% load ${where} can be ordinary`,
      summary:
        'Moderate GPU activity is common with video, browser effects, multiple monitors and high-resolution displays. It is only worth investigating if the PC feels slow, noisy or hot.',
      reasons: [
        'Windows composes the desktop on the GPU, and video decode, 4K or high-refresh displays and several monitors all add load.',
        'Percentages depend on the GPU engine and sampling window of the tool you use.',
      ],
      steps: [
        'If nothing feels wrong, no action is needed.',
        'If fans are loud or the PC is hot at idle, sort Task Manager > Processes by GPU and look for an app you did not expect.',
        'Check whether the load disappears when you close the browser or media app.',
      ],
      links: [LINKS.assistant],
    };
  }
  return {
    level: 'normal',
    label: 'Looks normal',
    headline: `${gpu}% load ${where} looks normal`,
    summary: 'Low GPU activity outside a game is expected. There is nothing in these readings that needs fixing.',
    reasons: ['An idle or lightly used GPU normally sits well below its limit.'],
    steps: ['If you came here because of a problem in a game, run the checker again with the game scenario selected and the numbers from a play session.'],
    links: [LINKS.guide],
  };
}

function gaming(input: GpuInputs, gpu: number): Verdict {
  const { fps, cpu, frameLimit } = input;

  if (gpu >= 95) {
    if (fps === 'meets') {
      return {
        level: 'normal',
        label: 'Normal',
        headline: `${gpu}% GPU usage with the FPS you want is normal`,
        summary:
          'In an uncapped game, the graphics card working at or near full load is what you want: it means the GPU is the part setting your frame rate, not a problem waiting to be fixed.',
        reasons: [
          'GPU usage is a workload signal, not a health score. A busy GPU that delivers your target frame rate and smooth frames is doing its job.',
          'You reported that performance meets your target, so there is no symptom to explain.',
        ],
        steps: [
          'Do nothing because of the percentage alone. Forcing usage below 100% is not a health requirement.',
          'If you want lower heat, fan noise or power use, set a frame-rate cap a little above your target and compare noise and temperature.',
          'Watch temperature and clocks over a full session rather than one reading.',
        ],
        links: [LINKS.guide, LINKS.overheating],
      };
    }
    if (fps === 'below-steady') {
      return {
        level: 'check',
        label: 'GPU-limited',
        headline: `At ${gpu}%, the GPU is the limit at these settings`,
        summary:
          'FPS is steady but lower than you want while the GPU is fully used. That pattern points to a graphics-heavy workload, not a fault: the card is simply being asked to do more than it can at this frame rate.',
        reasons: [
          'When utilization is near 100% and frames are even, the GPU is usually the limiting component, so more CPU headroom would not raise FPS.',
          'Resolution, render scale, ray tracing, shadows and upscaling quality are the usual levers that change GPU load.',
        ],
        steps: [
          'Repeat the same scene, then change only one GPU-heavy setting (resolution or render scale first) and compare FPS.',
          'Try an upscaler such as DLSS, FSR or XeSS if the game supports it, and compare image quality as well as FPS.',
          'Lower ray tracing and the heaviest shadow or volumetric settings one at a time.',
          'If clocks drop while temperature rises, check cooling and power limits next, using your GPU maker’s specification.',
        ],
        links: [LINKS.lowFps, LINKS.overheating, LINKS.guide],
      };
    }
    return {
      level: 'measure',
      label: 'Measure frame times',
      headline: `${gpu}% usage does not explain the stutter`,
      summary:
        'Full GPU load and stutter together need a frame-time capture. The percentage describes how busy the GPU was over a sampling window; it cannot say why individual frames arrived late.',
      reasons: [
        'Stutter can come from shader compilation, asset streaming, memory (VRAM) pressure, thermal or power throttling, or the CPU and storage, even when the GPU looks busy.',
        'A rounded utilization figure can hide short dips that line up with each hitch.',
      ],
      steps: [
        'Record a 60-second capture of the same scene with PresentMon, CapFrameX or FrameView and load it in the Frame-Time Analyzer.',
        'Look at whether the hitches are one-off spikes (often shader or loading) or a repeating pattern (often throttling or a background task).',
        'Check dedicated VRAM use; if it is nearly full, lower texture quality one step and repeat.',
        'Watch core clock and temperature during the hitch window to rule out throttling.',
        'Change one variable at a time and keep a before-and-after note.',
      ],
      links: [LINKS.frameTime, LINKS.stutter, LINKS.spikes, LINKS.shader],
    };
  }

  if (gpu >= 70) {
    if (fps === 'meets') {
      return {
        level: 'normal',
        label: 'Normal',
        headline: `${gpu}% usage with the FPS you want is fine`,
        summary:
          'The GPU is working hard but not saturated, and you are getting the performance you want. Nothing in these readings needs fixing.',
        reasons: [
          'Many games, frame caps and V-Sync settings keep a GPU below 100% on purpose.',
          'A GPU below its limit while you meet your target means there is spare headroom.',
        ],
        steps: ['No action needed. Recheck only if performance changes after a driver, game or Windows update.'],
        links: [LINKS.guide],
      };
    }
    if (fps === 'below-steady' && cpu === 'core-pinned') {
      return {
        level: 'check',
        label: 'CPU may be the limit',
        headline: `${gpu}% GPU with a busy CPU core suggests a CPU limit`,
        summary:
          'The GPU is not fully used, FPS is lower than you want and at least one CPU core is near its limit. That combination commonly means the game is waiting on one or two CPU threads.',
        reasons: [
          'Many games depend heavily on one or two threads, so overall CPU usage can look low while a single core is saturated.',
          'Lowering resolution or graphics settings barely helps a CPU-limited scene, which is a quick way to test this.',
        ],
        steps: [
          'Drop the resolution or render scale in the same scene. If FPS barely changes and GPU usage falls, the CPU is the limit.',
          'View per-core CPU usage (Task Manager > Performance > CPU > right-click graph > Change graph to > Logical processors).',
          'Close background apps, overlays and recorders, and check the Windows power mode.',
          'Lower CPU-heavy settings such as crowd density, view distance and simulation quality.',
        ],
        links: [LINKS.bottleneck, LINKS.lowFps, LINKS.frameTime],
      };
    }
    return {
      level: 'measure',
      label: 'Measure first',
      headline: `${gpu}% usage with lower FPS needs a closer look`,
      summary:
        'The GPU is busy but not saturated and FPS is below your target. The percentage alone cannot tell you which part is limiting the game, so a repeatable measurement comes next.',
      reasons: [
        'A frame cap, V-Sync, a game engine limit, a CPU thread, memory or storage can all keep a GPU from reaching full load.',
        frameLimit === 'capped'
          ? 'You said a frame cap or V-Sync is on, which can hold both FPS and GPU usage below the maximum.'
          : 'Check whether a cap or V-Sync is active; they are a common reason for mid-range GPU usage.',
      ],
      steps: [
        'Turn off V-Sync and any frame cap temporarily and repeat the same scene.',
        'Check per-core CPU usage for a single saturated core.',
        'Capture frame times if the game also stutters.',
        'Confirm the game is using the intended GPU in Windows graphics settings (important on laptops).',
      ],
      links: [LINKS.lowFps, LINKS.frameTime, LINKS.bottleneck],
    };
  }

  // gpu < 70 while gaming
  if (fps === 'meets') {
    return {
      level: 'normal',
      label: 'Normal',
      headline: `${gpu}% usage with the FPS you want is fine`,
      summary:
        'A GPU that is not fully used while you meet your target is not a fault. It usually means a frame cap, V-Sync or a lighter game, and it leaves headroom.',
      reasons: [
        'Frame-rate caps, V-Sync and lighter games keep GPU usage low on purpose.',
        'You reported performance that meets your target, so there is no symptom to chase.',
      ],
      steps: ['No action needed. Recheck only if performance drops after an update.'],
      links: [LINKS.guide],
    };
  }
  if (cpu === 'core-pinned') {
    return {
      level: 'check',
      label: 'CPU may be the limit',
      headline: `Low GPU use (${gpu}%) and a busy CPU core point to a CPU limit`,
      summary:
        'The GPU is waiting while at least one CPU core is near its limit and FPS is below target. That is the typical sign of a CPU-limited scene.',
      reasons: [
        'The game cannot feed the GPU faster than its busiest CPU thread allows, so GPU usage falls.',
        'Graphics-setting changes will do little in this situation; CPU-side settings and background load matter more.',
      ],
      steps: [
        'Test by lowering resolution: FPS barely moving confirms a CPU-side limit.',
        'View per-core CPU usage and close background apps, overlays and recorders.',
        'Lower CPU-heavy settings (population, view distance, simulation) and check the Windows power mode.',
        'Check for a game patch or driver note that mentions CPU performance, and use the bottleneck calculator only as a rough comparison.',
      ],
      links: [LINKS.bottleneck, LINKS.lowFps, LINKS.frameTime],
    };
  }
  if (frameLimit === 'capped') {
    return {
      level: 'check',
      label: 'Frame cap likely',
      headline: `A frame cap or V-Sync is probably holding usage at ${gpu}%`,
      summary:
        'You have a cap or V-Sync on, GPU usage is moderate and FPS is below what you want. The cap, or the refresh rate it follows, may be what sets your FPS.',
      reasons: [
        'V-Sync can lock FPS to fractions of the refresh rate when the game cannot keep up, which can look like a lower frame rate with spare GPU headroom.',
        'A cap in the game, the GPU control panel or a third-party tool can all limit FPS.',
      ],
      steps: [
        'Turn off V-Sync and every frame cap temporarily and repeat the same scene.',
        'If FPS rises, set one cap in one place at the value you actually want.',
        'If FPS does not rise, check per-core CPU usage and capture frame times.',
      ],
      links: [LINKS.lowFps, LINKS.frameTime],
    };
  }
  return {
    level: 'measure',
    label: 'Measure first',
    headline: `Low GPU use (${gpu}%) and low FPS: neither part is clearly maxed out`,
    summary:
      'Neither the GPU nor a single CPU core is obviously at its limit, so the cause is not in these numbers. A frame-time capture and a few single-variable tests are the next step.',
    reasons: [
      'Possible causes include the game engine, storage or memory, power plan, background software, the wrong GPU being used, or a driver issue.',
      cpu === 'unknown'
        ? 'You did not check per-core CPU usage. Overall CPU % can hide one saturated core, so that is the first thing to check.'
        : 'CPU usage shows headroom, so a single saturated thread is less likely.',
    ],
    steps: [
      'Check per-core CPU usage in Task Manager for one core near 100%.',
      'Confirm the game runs on the right GPU in Windows graphics settings.',
      'Set the Windows power mode to Balanced or Best performance and test again.',
      'Capture frame times in the same scene and compare with CPU, memory and storage activity at the slow moments.',
      'Test with a clean set of background apps before reinstalling drivers.',
    ],
    links: [LINKS.frameTime, LINKS.lowFps, LINKS.stutter, LINKS.assistant],
  };
}

export function diagnoseGpuUsage(input: GpuInputs): GpuResult {
  if (input.tempC !== null && (!Number.isFinite(input.tempC) || input.tempC < 0 || input.tempC > 150)) {
    return { ok: false, error: 'Enter a temperature between 0 and 150 °C, or leave it blank.' };
  }
  if (input.maxTempC !== null && (!Number.isFinite(input.maxTempC) || input.maxTempC < 30 || input.maxTempC > 150)) {
    return { ok: false, error: 'Enter a maximum temperature between 30 and 150 °C from your GPU maker’s specification, or leave it blank.' };
  }

  const negative = input.gpuPercent !== null && input.gpuPercent < 0;
  if (input.invalidReading || negative) {
    return { ok: true, verdict: withExtras(readingProblem(input), input) };
  }

  if (input.gpuPercent === null || !Number.isFinite(input.gpuPercent)) {
    return { ok: false, error: 'Enter the GPU usage percentage you see, or tick the box if it shows -1%, N/A or another impossible value.' };
  }
  if (input.gpuPercent > 100) {
    return { ok: false, error: 'GPU usage cannot be above 100%. Check the value, or tick the box if the tool shows an impossible reading.' };
  }

  const gpu = Math.round(input.gpuPercent);
  const verdict = input.scenario === 'gaming' ? gaming(input, gpu) : nonGaming(input, gpu);
  return { ok: true, verdict: withExtras(verdict, input) };
}

export function summarizeForCopy(input: GpuInputs, verdict: Verdict): string {
  const lines = [
    'TECH WORLD WINDOW — GPU USAGE CHECK',
    `Situation: ${input.scenario === 'gaming' ? 'Playing a game' : input.scenario === 'desktop' ? 'Desktop or game menus' : 'Video or media'}`,
    `Reported GPU usage: ${input.invalidReading ? 'invalid reading (-1%, N/A or similar)' : input.gpuPercent === null ? 'not entered' : `${Math.round(input.gpuPercent)}%`}`,
    `Result: ${verdict.label} — ${verdict.headline}`,
    '',
    verdict.summary,
    '',
    'Next checks:',
    ...verdict.steps.map((step, index) => `${index + 1}. ${step}`),
    '',
    'This is a rules-based estimate from the values entered, not a hardware test.',
  ];
  return lines.join('\n');
}
