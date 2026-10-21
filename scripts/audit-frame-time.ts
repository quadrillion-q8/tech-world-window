import { analyzeFrames, buildSampleCsv, MIN_FRAMES, parseFrameData } from '../src/lib/frameTime';

const errors: string[] = [];
function check(condition: boolean, message: string) {
  if (!condition) errors.push(message);
}

// The shipped deterministic sample must parse and produce stable, usable metrics.
const sample = parseFrameData(buildSampleCsv());
check(sample.ok, 'Generated sample capture should parse.');
if (sample.ok) {
  const analysis = analyzeFrames(sample.data.frames, 144);
  check(sample.data.frames.length >= MIN_FRAMES, 'Sample should contain enough frames to analyze.');
  check(analysis.frameCount === sample.data.frames.length, 'Analysis frame count should match parsed samples.');
  check(Number.isFinite(analysis.avgFps) && analysis.avgFps > 0, 'Average FPS should be finite and positive.');
  check(Number.isFinite(analysis.low1Fps) && analysis.low1Fps > 0, '1% low FPS should be finite and positive.');
  check(Number.isFinite(analysis.low01Fps) && analysis.low01Fps > 0, '0.1% low FPS should be finite and positive.');
  check(analysis.spikes.length > 0, 'Synthetic sample should include detectable stutter events.');
}

// CSV numeric cells must be parsed strictly: parseFloat("8.3ms") would accept a
// partial value and silently turn a malformed row into a valid frame sample.
const strictCsv = ['FrameTime', ...Array.from({ length: MIN_FRAMES }, () => '8.3'), '8.3ms'].join('\n');
const strictResult = parseFrameData(strictCsv);
check(strictResult.ok, 'CSV with enough valid rows should remain usable when one malformed row is skipped.');
if (strictResult.ok) {
  check(strictResult.data.frames.length === MIN_FRAMES, 'Malformed numeric suffix must not be counted as a frame.');
  check(strictResult.data.rowsRead === MIN_FRAMES, 'Rows-read metric must exclude malformed numeric cells.');
}

// Plain numeric input remains supported.
const plainInput = Array.from({ length: MIN_FRAMES }, (_, index) => index % 2 === 0 ? '8.2' : '8.4').join('\n');
const plainResult = parseFrameData(plainInput);
check(plainResult.ok, 'A plain list of frame-time values should parse.');
if (plainResult.ok) check(plainResult.data.frames.length === MIN_FRAMES, 'Plain values should preserve valid samples.');

// An FPS-only export must not be mistaken for frame-time data.
const fpsOnly = parseFrameData(['FPS', ...Array.from({ length: MIN_FRAMES }, () => '144')].join('\n'));
check(!fpsOnly.ok, 'FPS-only data must be rejected because it cannot reveal per-frame stutter.');

if (errors.length) {
  for (const error of errors) console.error('Frame-time audit failed: ' + error);
  process.exitCode = 1;
} else {
  console.log('Frame-time parser/analysis regression audit passed.');
}
