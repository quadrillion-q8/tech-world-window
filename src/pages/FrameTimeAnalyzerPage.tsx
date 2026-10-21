import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { toolByPath } from '../data/tools';
import { FaqSection } from '../components/FaqSection';
import { trackMonetization } from '../lib/analytics';
import {
  analyzeFrames, buildFindings, buildSampleCsv, parseFrameData, spikeEventsCsv, summaryText, SPIKE_RULE,
  type FrameAnalysis, type ParsedCapture,
} from '../lib/frameTime';

const TOOL_PATH = '/tools/frame-time-analyzer';
const TARGETS = [30, 50, 60, 75, 90, 100, 120, 144, 165, 180, 200, 240, 280, 300, 360, 480, 500, 540];
const MAX_FILE_BYTES = 250 * 1024 * 1024;
const CHART = { width: 900, height: 300, left: 52, right: 16, top: 14, bottom: 34, maxPoints: 900 };
const MAX_COMPARISONS = 3;

type Loaded = { data: ParsedCapture; isSample: boolean; label: string };
function captureLabel(capture: Loaded): string {
  if (capture.isSample) return 'Synthetic sample data';
  return capture.label || capture.data.application || 'Capture';
}
const COMPARISON_METRICS: { label: string; unit: string; decimals: number; higherIsBetter: boolean; value: (analysis: FrameAnalysis) => number }[] = [
  { label: 'Average FPS', unit: 'FPS', decimals: 1, higherIsBetter: true, value: a => a.avgFps },
  { label: '1% low FPS', unit: 'FPS', decimals: 1, higherIsBetter: true, value: a => a.low1Fps },
  { label: '0.1% low FPS', unit: 'FPS', decimals: 1, higherIsBetter: true, value: a => a.low01Fps },
  { label: '99th percentile frame time', unit: 'ms', decimals: 2, higherIsBetter: false, value: a => a.p99Ms },
  { label: 'Stutter events per minute', unit: '/min', decimals: 1, higherIsBetter: false, value: a => a.spikesPerMinute },
  { label: 'Frames over budget', unit: 'pp', decimals: 1, higherIsBetter: false, value: a => a.overBudgetPct },
];
function signedValue(value: number, decimals: number, unit: string): string {
  return (value > 0 ? '+' : '') + value.toFixed(decimals) + ' ' + unit;
}

const levelLabel = { good: 'Looks fine', watch: 'Worth a look', problem: 'Needs attention' } as const;

function niceCeil(value: number): number {
  const steps = [12, 20, 40, 60, 80, 100, 120, 160, 200, 300, 400, 600, 800, 1000, 2000];
  return steps.find(step => step >= value) ?? Math.ceil(value / 1000) * 1000;
}

function sizeBucket(count: number): string {
  if (count < 1000) return '<1k';
  if (count < 10000) return '1k-10k';
  if (count < 100000) return '10k-100k';
  return '100k+';
}

function FrameTimeChart({ frames, analysis, comparisons }: {
  frames: number[];
  analysis: FrameAnalysis;
  comparisons: { frames: number[]; analysis: FrameAnalysis; label: string }[];
}) {
  const { width, height, left, right, top, bottom, maxPoints } = CHART;
  const plotW = width - left - right, plotH = height - top - bottom;
  const budgetMs = 1000 / analysis.targetHz;
  const longestMs = Math.max(analysis.maxMs, ...comparisons.map(item => item.analysis.maxMs));
  const highestP999 = Math.max(analysis.p999Ms, ...comparisons.map(item => item.analysis.p999Ms));
  const yMax = niceCeil(Math.min(longestMs, Math.max(highestP999 * 1.3, budgetMs * 2.5, 20)));
  const clipped = longestMs > yMax;
  const timelineDurationSec = Math.max(analysis.durationSec, ...comparisons.map(item => item.analysis.durationSec));
  const downsample = (source: number[]): [number, number][] => {
    const out: [number, number][] = [];
    if (source.length <= maxPoints) {
      let elapsed = 0;
      for (let i = 0; i < source.length; i++) { out.push([elapsed, source[i]]); elapsed += source[i]; }
      return out;
    }
    const bucketSize = source.length / maxPoints;
    let elapsed = 0, cursor = 0;
    for (let bucket = 0; bucket < maxPoints; bucket++) {
      const end = Math.min(source.length, Math.round((bucket + 1) * bucketSize));
      const startTime = elapsed; let peak = 0;
      for (; cursor < end; cursor++) { if (source[cursor] > peak) peak = source[cursor]; elapsed += source[cursor]; }
      if (peak > 0) out.push([startTime, peak]);
    }
    return out;
  };
  const points = useMemo(() => downsample(frames), [frames, maxPoints]);
  const comparisonPoints = useMemo(() => comparisons.map(item => downsample(item.frames)), [comparisons, maxPoints]);
  const x = (ms: number) => left + (ms / (timelineDurationSec * 1000)) * plotW;
  const y = (ms: number) => top + plotH - (Math.min(ms, yMax) / yMax) * plotH;
  const line = points.map(([time, value]) => x(time).toFixed(1) + ',' + y(value).toFixed(1)).join(' ');
  const comparisonLines = comparisonPoints.map(series => series.map(([time, value]) => x(time).toFixed(1) + ',' + y(value).toFixed(1)).join(' '));
  const ticks = [0, 1, 2, 3, 4].map(i => (yMax / 4) * i);
  const markers = analysis.spikes.slice(0, 100);
  const comparisonMarkers = comparisons.map(item => item.analysis.spikes.slice(0, 100));
  const downsampled = frames.length > maxPoints;
  const comparisonDownsampled = comparisons.some(item => item.frames.length > maxPoints);
  const lineClasses = ['ft-line-compare', 'ft-line-compare-two', 'ft-line-compare-three'];
  const spikeClasses = ['ft-spike-compare', 'ft-spike-compare-two', 'ft-spike-compare-three'];
  return <figure className="ft-chart">
    <svg viewBox={'0 0 ' + width + ' ' + height} role="img"
      aria-label={comparisons.length
        ? 'Frame-time overlay with baseline average ' + analysis.avgFps.toFixed(1) + ' FPS and ' + comparisons.length + ' comparison capture(s). Shared elapsed-time and millisecond axes.'
        : 'Frame time over the capture. Average ' + analysis.avgFps.toFixed(0) + ' FPS, worst frame ' + analysis.maxMs.toFixed(0) + ' milliseconds, ' + analysis.spikes.length + ' stutter events.'}>
      {ticks.map(tick => <g key={tick}>
        <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} className="ft-grid" />
        <text x={left - 8} y={y(tick) + 4} textAnchor="end" className="ft-axis">{Number.isInteger(tick) ? tick : tick.toFixed(1)}</text>
      </g>)}
      {budgetMs < yMax && <g>
        <line x1={left} x2={width - right} y1={y(budgetMs)} y2={y(budgetMs)} className="ft-target" />
        <text x={width - right - 4} y={y(budgetMs) - 5} textAnchor="end" className="ft-axis">{analysis.targetHz} Hz frame time ({budgetMs.toFixed(1)} ms)</text>
      </g>}
      <polyline points={line} className="ft-line" fill="none" />
      {comparisonLines.map((series, index) => <polyline key={'line-' + index} points={series} className={'ft-line ' + lineClasses[index]} fill="none" />)}
      {markers.map(spike => <circle key={'baseline-' + spike.startIndex} cx={x(spike.startSec * 1000)} cy={y(spike.worstMs)} r={3.5} className="ft-spike" />)}
      {comparisonMarkers.map((series, runIndex) => series.map(spike => <circle key={'comparison-' + runIndex + '-' + spike.startIndex} cx={x(spike.startSec * 1000)} cy={y(spike.worstMs)} r={3.5} className={'ft-spike ' + spikeClasses[runIndex]} />))}
      <text x={left} y={height - 10} className="ft-axis">0 s</text>
      <text x={left + plotW / 2} y={height - 10} textAnchor="middle" className="ft-axis">{(timelineDurationSec / 2).toFixed(0)} s</text>
      <text x={width - right} y={height - 10} textAnchor="end" className="ft-axis">{timelineDurationSec.toFixed(0)} s</text>
      <text x={12} y={top + plotH / 2} className="ft-axis" transform={'rotate(-90 12 ' + (top + plotH / 2) + ')'} textAnchor="middle">Frame time (ms)</text>
    </svg>
    {comparisons.length > 0 && <div className="ft-chart-legend" aria-label="Chart legend">
      <span><i className="ft-legend-swatch" /> Baseline: {analysis.avgFps.toFixed(1)} FPS</span>
      {comparisons.map((item, index) => {
        const label = item.label.length > 24 ? item.label.slice(0, 21) + '…' : item.label;
        return <span key={'legend-' + index}><i className={'ft-legend-swatch ' + lineClasses[index]} /> {label}</span>;
      })}
    </div>}
    <figcaption>
      {comparisons.length ? 'All captures share the same millisecond and elapsed-time axes. A trace ends when its capture ends; compare runs made in the same scene with similar durations.' : 'Lower is better. Dots mark detected stutter events.'}
      {downsampled || comparisonDownsampled ? ' Long captures are drawn using the slowest frame in each small time slice, so spikes stay visible.' : ''}
      {clipped ? ' The axis stops at ' + yMax + ' ms; slower frames in any capture are drawn at the top edge.' : ''}
    </figcaption>
  </figure>;
}

export function FrameTimeAnalyzerPage() {
  const tool = toolByPath.get(TOOL_PATH)!;
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [error, setError] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [targetHz, setTargetHz] = useState(144);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comparisons, setComparisons] = useState<Loaded[]>([]);
  const [comparisonError, setComparisonError] = useState('');
  const [comparisonBusy, setComparisonBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const comparisonFileRef = useRef<HTMLInputElement>(null);

  const analysis = useMemo(() => (loaded ? analyzeFrames(loaded.data.frames, targetHz) : null), [loaded, targetHz]);
  const comparisonAnalyses = useMemo(() => comparisons.map(capture => analyzeFrames(capture.data.frames, targetHz)), [comparisons, targetHz]);
  const chartComparisons = useMemo(() => comparisons.map((capture, index) => ({ frames: capture.data.frames, analysis: comparisonAnalyses[index], label: captureLabel(capture) })), [comparisons, comparisonAnalyses]);
  const comparisonColumns = useMemo(() => {
    if (!loaded || !analysis) return [];
    return [{ capture: loaded, analysis }, ...comparisons.map((capture, index) => ({ capture, analysis: comparisonAnalyses[index] }))];
  }, [loaded, analysis, comparisons, comparisonAnalyses]);
  const findings = useMemo(() => (analysis ? buildFindings(analysis) : []), [analysis]);
  const worstSpikes = useMemo(() => (analysis ? [...analysis.spikes].sort((a, b) => b.worstMs - a.worstMs).slice(0, 5) : []), [analysis]);

  const ingest = (text: string, isSample: boolean, label = 'Pasted frame times') => {
    const result = parseFrameData(text);
    setCopied(false);
    if (!result.ok) {
      setError(result.error);
      setLoaded(null);
      setComparisons([]);
      setComparisonError('');
      return;
    }
    setError('');
    setLoaded({ data: result.data, isSample, label });
    setComparisons([]);
    setComparisonError('');
    trackMonetization('tool_completed', { tool: 'frame_time_analyzer', size: sizeBucket(result.data.frames.length), sample: isSample });
  };

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) { setError('That file is larger than 250 MB. Trim the capture to the part you want to analyze and try again.'); setLoaded(null); setComparisons([]); event.target.value = ''; return; }
    setBusy(true);
    trackMonetization('tool_used', { tool: 'frame_time_analyzer', method: 'file' });
    try { ingest(await file.text(), false, file.name); }
    catch { setError('The file could not be read. Check that it is a CSV or text file.'); setLoaded(null); setComparisons([]); }
    finally { setBusy(false); event.target.value = ''; }
  };

  const onComparisonFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!files.length) return;
    const available = MAX_COMPARISONS - comparisons.length;
    if (available <= 0) {
      setComparisonError('You can compare up to four captures total. Remove a comparison or clear the current comparisons before adding another.');
      return;
    }
    setComparisonBusy(true);
    setComparisonError('');
    const additions: Loaded[] = [];
    const problems: string[] = [];
    for (const file of files.slice(0, available)) {
      if (file.size > MAX_FILE_BYTES) { problems.push(file.name + ': larger than 250 MB; trim the capture and try again.'); continue; }
      try {
        const parsed = parseFrameData(await file.text());
        if (!parsed.ok) problems.push(file.name + ': ' + parsed.error);
        else additions.push({ data: parsed.data, isSample: false, label: file.name });
      } catch {
        problems.push(file.name + ': the file could not be read as CSV or text.');
      }
    }
    setComparisons(current => [...current, ...additions].slice(0, MAX_COMPARISONS));
    if (files.length > available) problems.push('Only the first ' + available + ' comparison file(s) were considered because the limit is four captures total.');
    setComparisonError(problems.join(' '));
    if (additions.length) trackMonetization('tool_used', { tool: 'frame_time_analyzer', method: 'comparison_files', count: additions.length });
    setComparisonBusy(false);
  };

  const onRemoveComparison = (index: number) => {
    setComparisons(current => current.filter((_, currentIndex) => currentIndex !== index));
    setComparisonError('');
    if (comparisonFileRef.current) comparisonFileRef.current.value = '';
  };

  const onClearComparison = () => {
    setComparisons([]);
    setComparisonError('');
    if (comparisonFileRef.current) comparisonFileRef.current.value = '';
  };

  const onPaste = () => {
    trackMonetization('tool_used', { tool: 'frame_time_analyzer', method: 'paste' });
    ingest(pasteText, false, 'Pasted frame times');
  };

  const onSample = () => {
    trackMonetization('tool_used', { tool: 'frame_time_analyzer', method: 'sample' });
    ingest(buildSampleCsv(), true, 'Synthetic sample data');
  };

  const onClear = () => {
    setLoaded(null);
    setComparisons([]);
    setComparisonError('');
    setError('');
    setPasteText('');
    setCopied(false);
    if (fileRef.current) fileRef.current.value = '';
    if (comparisonFileRef.current) comparisonFileRef.current.value = '';
  };

  const onCopy = async () => {
    if (!analysis || !loaded) return;
    try {
      await navigator.clipboard.writeText(summaryText(analysis, loaded.isSample ? 'sample data' : loaded.data.application || 'capture'));
      setCopied(true);
    } catch { setError('Copying was blocked by the browser. Select the numbers and copy them manually.'); }
  };

  const onDownloadComparisonReport = () => {
    if (!analysis || !loaded || !comparisonAnalysis || !comparison) return;
    const rows: [string, number, number, string][] = [
      ['Average FPS', analysis.avgFps, comparisonAnalysis.avgFps, 'FPS'],
      ['1% low', analysis.low1Fps, comparisonAnalysis.low1Fps, 'FPS'],
      ['0.1% low', analysis.low01Fps, comparisonAnalysis.low01Fps, 'FPS'],
      ['99th percentile frame time', analysis.p99Ms, comparisonAnalysis.p99Ms, 'ms'],
      ['Detected stutter events per minute', analysis.spikesPerMinute, comparisonAnalysis.spikesPerMinute, '/min'],
      ['Frames over selected frame-time budget', analysis.overBudgetPct, comparisonAnalysis.overBudgetPct, '%'],
    ];
    const report = [
      'TECH WORLD WINDOW — BEFORE/AFTER FRAME-TIME COMPARISON',
      '======================================================',
      `Target refresh rate: ${targetHz} Hz`,
      `Baseline: ${loaded.isSample ? 'synthetic sample (not a real benchmark)' : loaded.data.application || 'first capture'}`,
      `Comparison: ${comparison.isSample ? 'synthetic sample (not a real benchmark)' : comparison.data.application || 'second capture'}`,
      '',
      ...rows.map(([label, before, after, unit]) => `${label}: baseline ${before.toFixed(2)} ${unit}; comparison ${after.toFixed(2)} ${unit}; change ${after - before >= 0 ? '+' : ''}${(after - before).toFixed(2)} ${unit}`),
      '',
      'Use the same game scene, settings, capture tool and similar capture duration for a fair comparison.',
      'FPS and low-FPS values are usually better when higher; frame time, stutter rate and over-budget share are usually better when lower.',
      'A difference does not prove that a driver, setting or component caused the change. Both captures are analyzed locally; no file is uploaded.',
    ].join('\n');
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `frame-time-comparison-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const onDownloadSpikeCsv = () => {
    if (!analysis || !loaded || analysis.spikes.length === 0) return;
    const label = captureLabel(loaded);
    const blob = new Blob([spikeEventsCsv(analysis, label)], { type: 'text/csv;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `frame-time-stutter-events-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    trackMonetization('tool_used', { tool: 'frame_time_analyzer', method: 'download_event_csv', sample: loaded.isSample, events: analysis.spikes.length });
  };

  const onDownloadReport = () => {
    if (!analysis || !loaded) return;
    const label = captureLabel(loaded);
    const spikeRows = worstSpikes.length
      ? worstSpikes.map((spike, index) => `${index + 1}. ${spike.startSec.toFixed(2)} s — ${spike.worstMs.toFixed(2)} ms; ${spike.frameCount} frame(s) affected`).join('\n')
      : 'No spikes met this analyzer’s detection rule.';
    const report = [
      'TECH WORLD WINDOW — FRAME-TIME ANALYSIS REPORT',
      '==============================================',
      summaryText(analysis, label),
      '',
      `Target refresh rate: ${analysis.targetHz} Hz (${(1000 / analysis.targetHz).toFixed(2)} ms per refresh)`,
      `Frame-time source column: ${loaded.data.columnUsed || 'plain values'}`,
      `Input rows read: ${loaded.data.rowsRead.toLocaleString('en-US')}`,
      `Sample data: ${loaded.isSample ? 'Yes — generated demonstration data, not a real benchmark' : 'No — analyzed locally in this browser'}`,
      `Frames taking more than 10% above the selected refresh budget: ${analysis.overBudgetPct.toFixed(2)}%`,
      `Mean absolute frame-time change: ${analysis.meanAbsDeltaMs.toFixed(3)} ms`,
      '',
      'FINDINGS',
      '--------',
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. [${levelLabel[finding.level]}] ${finding.title}\n   ${finding.detail}`) : ['No findings available.']),
      '',
      'WORST DETECTED STUTTER EVENTS (UP TO FIVE)',
      '------------------------------------------',
      spikeRows,
      '',
      ...(loaded.data.warnings.length ? ['IMPORT WARNINGS', '---------------', ...loaded.data.warnings, ''] : []),
      'METHOD NOTES',
      '------------',
      'The report summarizes this capture and the analyzer’s current calculation rules. Findings are diagnostic leads, not proof of a root cause.',
      '1% and 0.1% lows use the slowest 1% and 0.1% of frame times; tools can define lows differently, so compare results made with the same method.',
      'No capture file or report data is uploaded by the analyzer. This report was generated locally in the browser.',
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `frame-time-analysis-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    trackMonetization('tool_used', { tool: 'frame_time_analyzer', method: 'download_report', sample: loaded.isSample });
  };

  return <section className="section tool-page ft-page">
    <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={TOOL_PATH} />
    <span className="eyebrow">FREE ANALYSIS TOOL</span>
    <h1>Frame-Time Analyzer</h1>
    <p className="page-intro">Average FPS can look healthy while a game still stutters. Analyze a PresentMon, CapFrameX, NVIDIA FrameView, or compatible frame-time CSV to inspect 1% and 0.1% lows, find stutter spikes, and graph frame pacing. Compare up to four captures on the same axes, then export event data and a multi-run report—all locally in your browser.</p>
    <p className="ft-privacy"><strong>Private by design.</strong> Your capture is analyzed in your browser, and the copy/download actions happen locally. The file and report are never uploaded.</p>

    <div className="ft-input">
      <div className="ft-input-actions">
        <label className="button button-primary ft-file-button">
          {busy ? 'Reading file…' : 'Choose capture file (CSV)'}
          <input ref={fileRef} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={onFile} disabled={busy} />
        </label>
        <button type="button" className="ft-secondary" onClick={onSample}>Try sample data</button>
        {(loaded || error) && <button type="button" className="ft-secondary" onClick={onClear}>Clear</button>}
      </div>
      <label className="ft-target-select">Your display refresh rate or FPS target
        <select value={targetHz} onChange={event => setTargetHz(Number(event.target.value))}>
          {TARGETS.map(hz => <option key={hz} value={hz}>{hz} Hz</option>)}
        </select>
      </label>
      <details className="ft-paste">
        <summary>Paste frame times instead</summary>
        <label htmlFor="ft-paste-box">Paste CSV text, or one frame time in milliseconds per line</label>
        <textarea id="ft-paste-box" rows={6} value={pasteText} onChange={event => setPasteText(event.target.value)} spellCheck={false} />
        <button type="button" className="ft-secondary" onClick={onPaste} disabled={!pasteText.trim()}>Analyze pasted data</button>
      </details>
    </div>

    <div aria-live="polite">
      {error && <div className="ft-error" role="alert"><strong>Could not analyze this data.</strong> {error}</div>}
    </div>

    {loaded && analysis && <div className="ft-results">
      {loaded.isSample && <div className="editorial-note"><strong>Synthetic sample</strong><p>This is generated demonstration data, not a real benchmark. Upload your own capture to analyze your PC.</p></div>}
      {loaded.data.warnings.map(warning => <p className="ft-warning" key={warning}>{warning}</p>)}

      <section className="ft-comparison-panel" aria-labelledby="ft-comparison-heading">
        <div className="ft-comparison-copy">
          <span className="eyebrow">BEFORE / AFTER</span>
          <h2 id="ft-comparison-heading">Compare a second capture</h2>
          <p>The capture already loaded above is the baseline. Choose a second capture to compare averages, low FPS, slow-frame timing, stutter rate, and frames over the selected refresh-rate budget.</p>
        </div>
        <div className="ft-input-actions">
          <label className="button button-primary ft-file-button">
            {comparisonBusy ? 'Reading comparison captures…' : comparisons.length >= MAX_COMPARISONS ? 'Four captures loaded' : 'Choose comparison captures (up to 3 CSVs)'}
            <input ref={comparisonFileRef} type="file" accept=".csv,.txt,text/csv,text/plain" multiple onChange={onComparisonFiles} disabled={comparisonBusy || comparisons.length >= MAX_COMPARISONS} />
          </label>
          {comparisons.length > 0 && <button type="button" className="ft-secondary" onClick={onClearComparison}>Clear comparisons</button>}
        </div>
        <p className="ft-note">Keep the first capture as your baseline. Select up to three additional CSV or text files at once, or add more later. Four captures total can be compared locally.</p>
        {comparisons.map((capture, index) => <div className="ft-loaded-comparison" key={capture.label + '-' + index}>
          <div>
            <strong>Run {index + 2}: {captureLabel(capture)}</strong>
            <span>{capture.data.frames.length.toLocaleString('en-US')} frames · {capture.data.columnUsed || 'plain values'} · {(capture.data.frames.reduce((sum, value) => sum + value, 0) / 1000).toFixed(1)} s</span>
            {capture.data.warnings.map(warning => <small className="ft-warning" key={index + '-' + warning}>{warning}</small>)}
          </div>
          <button type="button" className="ft-secondary" onClick={() => onRemoveComparison(index)}>Remove</button>
        </div>)}
        {comparisonError && <div className="ft-error" role="alert"><strong>Some comparison files could not be added.</strong> {comparisonError}</div>}
        {comparisons.some(capture => loaded.data.columnUsed.trim().toLowerCase() !== capture.data.columnUsed.trim().toLowerCase()) && <p className="ft-warning">At least one comparison uses a different source column from the baseline. Present-to-present and display-change intervals can measure different timing events; confirm that every run measures the same metric before interpreting differences.</p>}
        {comparisons.length > 0 && <div className="ft-comparison-results">
          {loaded.isSample && <p className="ft-warning">The baseline is synthetic sample data. This comparison demonstrates the calculation and must not be treated as a real benchmark result.</p>}
          <p className="ft-note">Compare like with like: use the same game scene, settings, capture tool, hardware, driver, and target refresh rate, with similar capture lengths. Different runs naturally vary.</p>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Multi-run frame-time metrics">
            <table className="article-table ft-multi-run-table">
              <caption>Baseline and comparison captures; deltas are relative to the baseline</caption>
              <thead><tr><th scope="col">Metric</th>{comparisonColumns.map((run, index) => <th scope="col" key={'head-' + index}>{index === 0 ? 'Baseline' : 'Run ' + (index + 1)}<small className="ft-run-name">{captureLabel(run.capture)}</small></th>)}</tr></thead>
              <tbody>
                {COMPARISON_METRICS.map(metric => <tr key={metric.label}>
                  <th scope="row">{metric.label}</th>
                  {comparisonColumns.map((run, index) => {
                    const value = metric.value(run.analysis);
                    const delta = index === 0 ? 0 : value - metric.value(comparisonColumns[0].analysis);
                    const isBetter = metric.higherIsBetter ? delta > 0 : delta < 0;
                    const isWorse = metric.higherIsBetter ? delta < 0 : delta > 0;
                    return <td key={metric.label + '-' + index}>
                      <strong>{value.toFixed(metric.decimals)} {metric.unit === 'pp' ? '%' : metric.unit}</strong>
                      {index > 0 && <small className={'ft-run-delta ' + (isBetter ? 'ft-run-better' : isWorse ? 'ft-run-worse' : 'ft-run-neutral')}>Δ {signedValue(delta, metric.decimals, metric.unit)} vs baseline</small>}
                    </td>;
                  })}
                </tr>)}
              </tbody>
            </table>
          </div>
          <p className="ft-note">Higher FPS and low-FPS values are usually favorable; lower frame time, stutter rate, and over-budget share are usually favorable. A green or red delta only describes direction—not statistical significance or root cause. “Frames over budget” changes are shown in percentage points.</p>
          <p className="ft-input-actions"><button type="button" className="ft-secondary" onClick={onDownloadComparisonReport}>Download multi-run report (.txt)</button></p>
        </div>}
      </section>

      <div className="ft-stats" role="list">
        <div role="listitem"><span>Average</span><strong>{analysis.avgFps.toFixed(1)} FPS</strong><small>{analysis.frameCount.toLocaleString('en-US')} frames over {analysis.durationSec.toFixed(1)} s</small></div>
        <div role="listitem"><span>1% low</span><strong>{analysis.low1Fps.toFixed(1)} FPS</strong><small>Average of the slowest 1% of frames</small></div>
        <div role="listitem"><span>0.1% low</span><strong>{analysis.low01Fps.toFixed(1)} FPS</strong><small>Average of the slowest 0.1% of frames</small></div>
        <div role="listitem"><span>Worst frame</span><strong>{analysis.maxMs.toFixed(1)} ms</strong><small>99th percentile: {analysis.p99Ms.toFixed(2)} ms ({analysis.p99Fps.toFixed(0)} FPS)</small></div>
        <div role="listitem"><span>Stutter events</span><strong>{analysis.spikes.length}</strong><small>{analysis.spikesPerMinute.toFixed(1)} per minute</small></div>
      </div>

      <h2>What the numbers suggest</h2>
      <ul className="ft-findings">
        {findings.map(finding => <li key={finding.title} className={`ft-finding ft-${finding.level}`}>
          <span className="ft-badge">{levelLabel[finding.level]}</span>
          <strong>{finding.title}</strong>
          <p>{finding.detail}</p>
          {finding.links.length > 0 && <p className="ft-links">{finding.links.map(link => <Link key={link.href} className="text-link" to={link.href}>{link.label}</Link>)}</p>}
        </li>)}
      </ul>

      <h2>{comparisons.length ? 'Frame-time overlay: baseline and comparison runs' : 'Frame time over the capture'}</h2>
      <FrameTimeChart frames={loaded.data.frames} analysis={analysis} comparisons={chartComparisons} />

      <h2>How frames were spread</h2>
      <div className="ft-histogram">
        {analysis.histogram.map(row => <div className="ft-hist-row" key={row.label}>
          <span className="ft-hist-label">{row.label}</span>
          <span className="ft-hist-bar" aria-hidden="true"><i style={{ width: `${Math.max(row.pct > 0 ? 0.6 : 0, row.pct)}%` }} /></span>
          <span className="ft-hist-pct">{row.pct < 0.1 && row.pct > 0 ? '<0.1' : row.pct.toFixed(1)}%</span>
        </div>)}
      </div>
      <p className="ft-note">{analysis.overBudgetPct.toFixed(1)}% of frames took more than 10% longer than the {analysis.targetHz} Hz frame time.</p>

      {worstSpikes.length > 0 && <div className="table-wrap" tabIndex={0} role="region" aria-label="Worst stutter events">
        <table className="article-table">
          <caption>Worst stutter events</caption>
          <thead><tr><th scope="col">Time into capture</th><th scope="col">Slowest frame</th><th scope="col">Frames affected</th></tr></thead>
          <tbody>{worstSpikes.map(spike => <tr key={spike.startIndex}>
            <th scope="row">{spike.startSec.toFixed(1)} s</th><td>{spike.worstMs.toFixed(1)} ms</td><td>{spike.frameCount}</td>
          </tr>)}</tbody>
        </table>
      </div>}
      {analysis.spikes.length > 0 && <p className="ft-input-actions"><button type="button" className="ft-secondary" onClick={onDownloadSpikeCsv}>Download all detected stutter events (.csv)</button><span className="ft-note">{analysis.spikes.length.toLocaleString('en-US')} events; generated locally with the rule described below.</span></p>}

      <p className="ft-input-actions"><button type="button" className="ft-secondary" onClick={onCopy}>{copied ? 'Copied' : 'Copy summary'}</button><button type="button" className="ft-secondary" onClick={onDownloadReport}>Download report (.txt)</button></p>
    </div>}

    <div className="article-body ft-explain">
      <section>
        <h2>How to capture frame-time data</h2>
        <ol className="article-steps">
          <li>Pick a capture tool that records every frame: PresentMon, CapFrameX and NVIDIA FrameView are free options. Menu names vary by tool and version.</li>
          <li>Start the game and go to the scene or route you want to measure. Use the same one each time so results are comparable.</li>
          <li>Start the capture with the tool&apos;s hotkey, play for at least 60 seconds, then stop it.</li>
          <li>Find the exported CSV and choose it above. The analyzer looks for a MsBetweenPresents or FrameTime column and ignores the rest.</li>
        </ol>
      </section>

      <section>
        <h2>Capture tools and metric definitions</h2>
        <p>This page analyzes exported frame-time samples; it does not record gameplay or prove why a hitch happened. Use the capture software's own documentation to understand which timing metric its CSV contains.</p>
        <ul>
          <li><a href="https://github.com/GameTechDev/PresentMon/blob/main/README-ConsoleApplication.md" rel="noopener noreferrer">PresentMon CSV output documentation ↗</a> — describes fields such as <code>MsBetweenPresents</code> and <code>MsBetweenDisplayChange</code>.</li>
          <li><a href="https://www.capframex.com/features" rel="noopener noreferrer">CapFrameX features and analysis ↗</a> — documents capture, frame-time analysis and comparison workflows.</li>
          <li><a href="https://www.nvidia.com/en-us/geforce/technologies/frameview/" rel="noopener noreferrer">NVIDIA FrameView ↗</a> — records frame-time and performance metrics.</li>
        </ul>
        <p>For before-and-after comparisons, use the same source column in both files. Present-to-present intervals and display-change intervals can measure different parts of frame delivery. A graph makes patterns easier to inspect, but it cannot isolate a CPU, GPU, driver, shader, storage or thermal cause on its own.</p>
      </section>

      <section>
        <h2>How to read the graph</h2>
        <p>A low, flat line means frames are arriving evenly, which is what smooth gameplay looks like. Tall, thin spikes are single slow frames that you feel as hitches. A thick, jittery band means frame times vary from frame to frame even without big spikes. The dashed line shows the frame time of the refresh rate you chose: frames above it took longer than your display can show in one refresh.</p>
      </section>

      <section>
        <h2>How the numbers are calculated</h2>
        <ul>
          <li><strong>Average FPS</strong> is the number of frames divided by the capture time, which equals 1000 divided by the mean frame time.</li>
          <li><strong>1% low and 0.1% low</strong> are the average FPS of the slowest 1% and 0.1% of frames. Other tools sometimes use the 99th percentile frame time instead, so this page shows that figure as well. Only compare lows produced by the same method.</li>
          <li><strong>Stutter event:</strong> a frame that takes more than {SPIKE_RULE.ratio} times the median of the {SPIKE_RULE.windowFrames} frames around it and at least {SPIKE_RULE.minExcessMs} ms longer than that median. Consecutive slow frames count as one event.</li>
          <li><strong>Frames over budget</strong> are those longer than {Math.round((SPIKE_RULE.budgetTolerance - 1) * 100)}% above the frame time of the refresh rate you pick.</li>
          <li><strong>Findings</strong> apply simple rules to these numbers. They point to likely areas to check and cannot prove a cause.</li>
        </ul>
      </section>

      <section>
        <h2>What this tool cannot tell you</h2>
        <p>A frame-time capture shows that frames were slow, not why. It cannot separate a CPU limit from a GPU limit without utilization data, and results from different capture tools or settings are not directly comparable. Treat the output as evidence to guide the next test, not as a final diagnosis.</p>
      </section>

      <section>
        <h2>Related guides</h2>
        <ul>
          <li><Link className="text-link" to="/pc-game-stuttering-fix-frame-time">PC game stuttering: frame-time spikes</Link></li>
          <li><Link className="text-link" to="/gpu-frame-time-spikes-causes-fix">GPU frame-time spikes: common causes</Link></li>
          <li><Link className="text-link" to="/shader-compilation-stutter-pc-games">Shader compilation stutter in PC games</Link></li>
          <li><Link className="text-link" to="/pc-game-low-fps-how-to-find-the-cause">Low FPS in PC games: find the real bottleneck</Link></li>
          <li><Link className="text-link" to="/research/what-actually-causes-pc-game-stuttering">Frame-time research: what causes PC game stuttering?</Link></li>
        </ul>
      </section>
    </div>

    <FaqSection items={tool.faq || []} />
  </section>;
}
