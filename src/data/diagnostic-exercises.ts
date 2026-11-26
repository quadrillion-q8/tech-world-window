import type { Article, ArticleSection } from './articles';

// These are original diagnostic exercises, not results from hardware tests.
// Keep the numbers and scenarios explicitly illustrative in the rendered text.
const exercises: Record<string, ArticleSection> = {
  'gpu-100-percent-usage-gaming': {
    heading: 'Worked example: distinguish a busy GPU from a GPU fault',
    paragraphs: [
      'Illustrative diagnostic exercise (not a measured TWW benchmark): a game runs at 80 FPS with 99% GPU utilization at its original resolution. Lowering render scale in the same scene produces 110 FPS with 99% utilization. The increase is 37.5%; the GPU remains busy because it can complete more frames at the reduced workload. This supports a rendering-workload limitation, not a failed graphics card.',
      'If the same change instead leaves FPS almost unchanged, check the frame cap, CPU-thread activity and frame-time capture before blaming the GPU. Neither outcome rules out a separate reliability problem. Record your own results in this worksheet rather than comparing your PC against the illustrative numbers.'
    ],
    table: {
      caption: 'GPU workload isolation worksheet — fill with your own readings',
      headers: ['Run', 'Change', 'Record', 'Decision'],
      rows: [
        ['A', 'Original settings', 'FPS, GPU engine/utilization, clock, temperature, frame cap', 'Baseline'],
        ['B', 'Render scale only', 'Same readings in the same scene', 'Does FPS respond to reduced rendering work?'],
        ['A repeat', 'Restore original settings', 'Same readings again', 'Does the original pattern return?']
      ]
    },
    relatedLinks: [
      { label: 'Inspect frame delivery', href: '/tools/frame-time-analyzer', description: 'Compare captures if the reported FPS does not match how smooth the game feels.' },
      { label: 'Calculate your observed FPS change', href: '/tools/pc-bottleneck-calculator', description: 'Enter the two measured FPS values; use the result as evidence, not as a bottleneck percentage.' },
      { label: 'Investigate low FPS separately', href: '/pc-game-low-fps-how-to-find-the-cause', description: 'Use the broader bottleneck diagnosis when changing render scale does not explain the result.' }
    ]
  },
  'how-to-check-ssd-health-windows': {
    heading: 'Worked example: decide what to do with conflicting SSD health readings',
    paragraphs: [
      'Illustrative decision exercise, not a real drive report: Windows labels an SSD Healthy, but the drive vendor utility shows an increasing media-error counter and Windows logs repeated storage resets. Do not average the readings into a single health percentage. The operating-system summary and the individual error signals describe different things.',
      'Protect important files first. Save the exact model, firmware and health log with the date; check the vendor definition of the counter and whether it is actually increasing. Storage resets can also involve a controller, connection, driver or power issue. Avoid write-intensive benchmarks on a suspect drive. If it repeatedly disappears or reads fail, stop testing and seek qualified help.'
    ],
    table: {
      caption: 'SSD evidence record — distinguish wear, errors and connectivity',
      headers: ['Field', 'First observation', 'Later observation'],
      rows: [
        ['Model / firmware / interface', 'Record exact values', 'Confirm same device'],
        ['Health / critical warning / wear', 'Record field names and values', 'Compare the same fields'],
        ['Media errors / storage resets', 'Record count, event and timestamp', 'Check changes, not just totals'],
        ['Backup and symptoms', 'Record backup status and observed behavior', 'Decide whether to stop testing']
      ]
    },
    relatedLinks: [
      { label: 'Drive disappearing from BIOS or Windows', href: '/ssd-not-detected-in-bios-or-windows', description: 'Investigate detection separately from wear or temperature.' },
      { label: 'SSD temperature and performance', href: '/nvme-ssd-temperature-too-high', description: 'Use a separate thermal investigation on a stable drive, not a failing one.' }
    ]
  },
  'nvme-ssd-temperature-too-high': {
    heading: 'Worked example: tell thermal limiting apart from write-cache exhaustion',
    paragraphs: [
      'Illustrative reasoning exercise, not TWW measurements: a large file copy starts fast and slows after several minutes. The same temperature rise and speed drop alone do not distinguish thermal limiting from cache exhaustion. The amount written, drive free space, background activity and cooling can all change the result.',
      'On a healthy drive with a current backup, use an ordinary repeatable read workload first where practical, rather than repeatedly filling the SSD with writes. Compare the same sensor and workload after a controlled cooldown, and record elapsed time, transferred bytes and throughput. A manufacturer-reported thermal-management event is stronger evidence than temperature alone. Do not disable safeguards, remove a heatsink while powered, or intentionally exceed the device operating range.'
    ],
    table: {
      caption: 'Thermal-versus-cache evidence worksheet',
      headers: ['Observation', 'Supports', 'Remaining uncertainty'],
      rows: [
        ['Speed recovers after cooling, with equivalent workload and drive state', 'Possible thermal limiting', 'Cache state or background work may also have changed'],
        ['Slowdown repeats after a similar amount written', 'Possible write-cache or sustained-write limit', 'Temperature and free space still matter'],
        ['Critical warning, I/O errors or disappearance', 'Reliability concern; stop testing', 'Cause needs separate diagnosis']
      ]
    },
    relatedLinks: [
      { label: 'Check SSD health first', href: '/how-to-check-ssd-health-windows', description: 'Confirm whether a safe performance investigation is appropriate.' },
      { label: 'SSD temperature research', href: '/research/how-ssd-temperature-affects-performance', description: 'Read the evidence limitations and broader thermal investigation method.' }
    ]
  },
  'gpu-frame-time-spikes-causes-fix': {
    heading: 'Worked example: a 100-frame capture can hide one severe hitch',
    paragraphs: [
      'Synthetic arithmetic example, not a measured game benchmark: run A contains 100 frames of 10 ms each. Run B contains 99 frames of 10 ms and one frame of 100 ms. Run A takes 1,000 ms and delivers 100 FPS; run B takes 1,090 ms and delivers about 91.7 FPS. The average declines modestly, but one frame in run B takes ten times as long.',
      'In this specific 100-frame example, the slowest 1% contains one frame, equivalent to 10 FPS in run B. That illustrates why a tail metric can reveal a problem hidden by average FPS. It does not establish whether the cause is the GPU, CPU, shaders, storage or a background process. A real capture needs a much longer repeatable scene and the same timing column across runs.'
    ],
    table: {
      caption: 'Synthetic comparison — arithmetic illustration only',
      headers: ['Metric', 'Run A', 'Run B'],
      rows: [
        ['Total frames', '100', '100'],
        ['Elapsed time', '1,000 ms', '1,090 ms'],
        ['Average FPS', '100', '91.7'],
        ['Worst frame', '10 ms', '100 ms'],
        ['Slowest 1% FPS', '100', '10']
      ]
    },
    relatedLinks: [
      { label: 'Analyze your own frame-time CSV', href: '/tools/frame-time-analyzer', description: 'Use the same timing source and compare your actual captures locally.' },
      { label: 'Distinguish shader-compilation stutter', href: '/shader-compilation-stutter-pc-games', description: 'Investigate first-run versus repeat-run behavior before assigning a hardware cause.' }
    ]
  }
};

export function addDiagnosticExercises(articles: Article[]): Article[] {
  return articles.map(article => {
    const exercise = exercises[article.slug];
    if (!exercise) return article;
    if (article.content.some(section => section.heading === exercise.heading)) return article;
    return {
      ...article,
      updatedAt: '2026-11-26',
      // Put the worked example after the opening section rather than burying it.
      content: [...article.content.slice(0, 1), exercise, ...article.content.slice(1)]
    };
  });
}
