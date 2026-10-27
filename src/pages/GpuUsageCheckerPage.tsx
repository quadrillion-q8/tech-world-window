import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { FaqSection } from '../components/FaqSection';
import { toolByPath } from '../data/tools';
import {
  diagnoseGpuUsage,
  summarizeForCopy,
  type CpuState,
  type FpsOutcome,
  type FrameLimit,
  type GpuInputs,
  type MonitorSource,
  type Scenario,
  type Verdict,
} from '../lib/gpuUsage';
import '../styles/gpu-usage-checker.css';

const TOOL_PATH = '/tools/gpu-usage-checker';

type FormState = {
  scenario: Scenario;
  gpuPercent: string;
  invalidReading: boolean;
  fps: FpsOutcome;
  cpu: CpuState;
  frameLimit: FrameLimit;
  source: MonitorSource;
  tempC: string;
  maxTempC: string;
};

const INITIAL: FormState = {
  scenario: 'gaming',
  gpuPercent: '',
  invalidReading: false,
  fps: 'meets',
  cpu: 'unknown',
  frameLimit: 'unknown',
  source: 'task-manager',
  tempC: '',
  maxTempC: '',
};

const EXAMPLE: FormState = {
  ...INITIAL,
  gpuPercent: '99',
  fps: 'meets',
  cpu: 'headroom',
  frameLimit: 'uncapped',
  source: 'vendor-overlay',
};

function parseNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function toInputs(form: FormState): GpuInputs {
  const gpu = parseNumber(form.gpuPercent);
  const temp = parseNumber(form.tempC);
  const max = parseNumber(form.maxTempC);
  return {
    scenario: form.scenario,
    gpuPercent: gpu,
    invalidReading: form.invalidReading,
    fps: form.fps,
    cpu: form.cpu,
    frameLimit: form.frameLimit,
    source: form.source,
    tempC: temp,
    maxTempC: max,
  };
}

export function GpuUsageCheckerPage() {
  const tool = toolByPath.get(TOOL_PATH)!;
  const [form, setForm] = useState<FormState>(INITIAL);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [submitted, setSubmitted] = useState<GpuInputs | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const run = (state: FormState) => {
    const inputs = toInputs(state);
    setCopied(false);
    const hasNaN = [inputs.gpuPercent, inputs.tempC, inputs.maxTempC].some(value => value !== null && Number.isNaN(value));
    if (hasNaN) {
      setVerdict(null);
      setSubmitted(null);
      setError('One of the number fields is not a valid number. Use digits only, for example 97.');
      return;
    }
    const result = diagnoseGpuUsage(inputs);
    if (!result.ok) {
      setVerdict(null);
      setSubmitted(null);
      setError(result.error);
      return;
    }
    setError('');
    setVerdict(result.verdict);
    setSubmitted(inputs);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(form);
  };

  const onExample = () => {
    setForm(EXAMPLE);
    run(EXAMPLE);
  };

  const onReset = () => {
    setForm(INITIAL);
    setVerdict(null);
    setSubmitted(null);
    setError('');
    setCopied(false);
  };

  const onCopy = async () => {
    if (!verdict || !submitted) return;
    try {
      await navigator.clipboard.writeText(summarizeForCopy(submitted, verdict));
      setCopied(true);
    } catch {
      setCopied(false);
      setError('Your browser blocked copying. Select the result text and copy it manually.');
    }
  };

  const gaming = form.scenario === 'gaming';

  return <section className="section tool-page gpu-checker-page">
    <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={TOOL_PATH} />
    <span className="eyebrow">FREE GPU USAGE CHECK</span>
    <h1>Is my GPU usage normal?</h1>
    <p className="page-intro">Enter what your monitoring tool shows and how the game runs. You get a plain-English answer for 100% GPU usage, a low reading, or a -1% value, plus an ordered list of safe checks.</p>

    <div className="gpuc-answer">
      <strong>Short answer: 100% GPU usage while gaming is usually normal.</strong>
      <p>In a game with no frame cap, a graphics card at or near full load that delivers the FPS you want is working as intended. It becomes worth investigating when FPS is lower than expected, frames arrive unevenly, temperatures or clocks change with performance, or the GPU is busy when no demanding program is running.</p>
    </div>

    <form className="gpuc-form" onSubmit={onSubmit} noValidate>
      <div className="gpuc-grid">
        <div className="gpuc-field">
          <label htmlFor="gpuc-scenario">What is the PC doing?</label>
          <select id="gpuc-scenario" value={form.scenario} onChange={event => update('scenario', event.target.value as Scenario)}>
            <option value="gaming">Playing a game</option>
            <option value="desktop">Idle desktop or game menus</option>
            <option value="media">Watching or editing video</option>
          </select>
        </div>

        <div className="gpuc-field">
          <label htmlFor="gpuc-gpu">GPU usage shown (%)</label>
          <input
            id="gpuc-gpu"
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step="1"
            placeholder="for example 99"
            value={form.gpuPercent}
            disabled={form.invalidReading}
            onChange={event => update('gpuPercent', event.target.value)}
          />
        </div>

        <div className="gpuc-field gpuc-field-wide">
          <label className="gpuc-check" htmlFor="gpuc-invalid">
            <input id="gpuc-invalid" type="checkbox" checked={form.invalidReading} onChange={event => update('invalidReading', event.target.checked)} />
            <span>My tool shows -1%, N/A, a frozen number or a value that does not match what the game is doing.</span>
          </label>
        </div>

        {gaming && <>
          <div className="gpuc-field">
            <label htmlFor="gpuc-fps">How is the performance?</label>
            <select id="gpuc-fps" value={form.fps} onChange={event => update('fps', event.target.value as FpsOutcome)}>
              <option value="meets">Meets the FPS I want and feels smooth</option>
              <option value="below-steady">Lower than I want, but steady</option>
              <option value="below-unstable">Stutters, hitches or uneven frames</option>
            </select>
          </div>

          <div className="gpuc-field">
            <label htmlFor="gpuc-cpu">Is any CPU core near its limit?</label>
            <select id="gpuc-cpu" value={form.cpu} onChange={event => update('cpu', event.target.value as CpuState)}>
              <option value="unknown">I have not checked</option>
              <option value="headroom">No, the CPU has headroom</option>
              <option value="core-pinned">Yes, one or more cores are near 100%</option>
            </select>
            <small>Overall CPU % can hide one saturated core. In Task Manager, switch the CPU graph to logical processors.</small>
          </div>

          <div className="gpuc-field">
            <label htmlFor="gpuc-cap">Frame cap or V-Sync</label>
            <select id="gpuc-cap" value={form.frameLimit} onChange={event => update('frameLimit', event.target.value as FrameLimit)}>
              <option value="unknown">Not sure</option>
              <option value="uncapped">Off, FPS is uncapped</option>
              <option value="capped">On (cap or V-Sync)</option>
            </select>
          </div>
        </>}

        <div className="gpuc-field">
          <label htmlFor="gpuc-source">Where did you read the number?</label>
          <select id="gpuc-source" value={form.source} onChange={event => update('source', event.target.value as MonitorSource)}>
            <option value="task-manager">Windows Task Manager</option>
            <option value="vendor-overlay">NVIDIA or AMD overlay or app</option>
            <option value="third-party">MSI Afterburner, HWiNFO or similar</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div className="gpuc-field">
          <label htmlFor="gpuc-temp">GPU temperature in °C (optional)</label>
          <input id="gpuc-temp" type="number" inputMode="decimal" min={0} max={150} step="1" placeholder="optional" value={form.tempC} onChange={event => update('tempC', event.target.value)} />
        </div>

        <div className="gpuc-field">
          <label htmlFor="gpuc-max">Maker’s maximum temperature in °C (optional)</label>
          <input id="gpuc-max" type="number" inputMode="decimal" min={30} max={150} step="1" placeholder="from your GPU’s spec page" value={form.maxTempC} onChange={event => update('maxTempC', event.target.value)} />
          <small>Limits differ by model, so this tool does not guess one. Enter it only if you looked it up.</small>
        </div>
      </div>

      <div className="gpuc-actions">
        <button type="submit" className="button button-primary">Check my GPU usage</button>
        <button type="button" className="ft-secondary" onClick={onExample}>Try an example</button>
        {(verdict || error) && <button type="button" className="ft-secondary" onClick={onReset}>Start over</button>}
      </div>
      <p className="gpuc-disclaimer">Nothing you enter leaves your browser. The result comes from a fixed set of rules applied to your answers; it is not a hardware test.</p>
    </form>

    <div aria-live="polite">
      {error && <p className="gpuc-error" role="alert">{error}</p>}

      {verdict && <article className="gpuc-result">
        <div className="gpuc-result-head">
          <span className={`gpuc-badge gpuc-badge-${verdict.level}`}>{verdict.label}</span>
        </div>
        <h2>{verdict.headline}</h2>
        <p>{verdict.summary}</p>

        <h3>Why this is the likely reading</h3>
        <ul>{verdict.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>

        <h3>What to check next, in order</h3>
        <ol>{verdict.steps.map(step => <li key={step}>{step}</li>)}</ol>

        {verdict.tempNote && <p className="gpuc-temp">{verdict.tempNote}</p>}

        <h3>Related guides and tools</h3>
        <ul className="gpuc-links">
          {verdict.links.map(link => <li key={link.href}><Link className="text-link" to={link.href}>{link.label}</Link></li>)}
        </ul>

        <p className="gpuc-actions">
          <button type="button" className="ft-secondary" onClick={onCopy}>{copied ? 'Copied' : 'Copy this result'}</button>
        </p>
        <p className="gpuc-disclaimer">This is an estimate from the values you entered. A utilization percentage describes workload, not hardware health, and it cannot prove that a component is failing.</p>
      </article>}
    </div>

    <div className="article-body gpuc-explain">
      <section>
        <h2>Is 100% GPU usage bad while gaming?</h2>
        <p>Usually not. GPU utilization shows how busy the graphics card was over a short sampling window. When a game is not capped, the engine asks the GPU for as many frames as it can produce, so a GPU-limited game will sit near 100%. That is the card being used, not a defect.</p>
        <p>What matters is the outcome: FPS against your target, how evenly frames arrive, and whether clocks and temperature stay stable. Forcing the percentage down is not a health requirement. If you want less heat or fan noise, a frame-rate cap a little above your target does that on purpose.</p>
      </section>

      <section>
        <h2>What does GPU at -1% mean?</h2>
        <p>A reading of -1%, N/A or a number that never moves normally means the monitoring tool could not read a valid counter or sensor. It is much more often a tool, driver or engine-selection problem than a graphics card fault. Open Task Manager, go to Performance and select the GPU, and see whether the 3D engine moves while the game runs. If it does, the GPU is working and the overlay is the unreliable part. Tick the box above to get a step-by-step check for this case.</p>
      </section>

      <section>
        <h2>How to check GPU usage in Windows</h2>
        <ol>
          <li>Press Ctrl+Shift+Esc to open Task Manager.</li>
          <li>Under Processes, right-click a column header and turn on GPU and GPU engine. Sort by GPU to see which program is using it.</li>
          <li>Under Performance, choose GPU and look at the 3D engine for game rendering. Video Decode and Copy are separate engines.</li>
          <li>For temperature, clocks and power, use your GPU maker’s app or a monitoring tool such as the NVIDIA or AMD overlay.</li>
          <li>Judge a sustained scene of 60 to 90 seconds in the same place, not a menu or loading screen.</li>
        </ol>
      </section>

      <section>
        <h2>How the checker decides</h2>
        <p>The result comes from a published decision table, not a hidden score. It combines four things you tell it: the GPU percentage, whether performance meets your target, whether any CPU core is near its limit, and whether a frame cap or V-Sync is active. Near-100% GPU usage with the FPS you want is treated as normal. Near-100% with lower but steady FPS points to a GPU limit at those settings. Low GPU usage with a busy CPU core points to a CPU limit. Stutter always sends you to a frame-time capture, because a utilization percentage cannot explain an individual hitch.</p>
        <div className="gpuc-table-wrap">
          <div className="table-wrap">
            <table className="article-table">
              <caption>How the answers map to a result</caption>
              <thead>
                <tr><th>What you see</th><th>Most likely meaning</th><th>Next step</th></tr>
              </thead>
              <tbody>
                <tr><td>Near 100% GPU, FPS as wanted</td><td>Normal GPU-limited rendering</td><td>No fix needed</td></tr>
                <tr><td>Near 100% GPU, FPS steady but low</td><td>GPU is the limit at these settings</td><td>Lower one GPU-heavy setting and repeat</td></tr>
                <tr><td>Near 100% GPU with stutter</td><td>Utilization does not explain the hitch</td><td>Capture frame times</td></tr>
                <tr><td>Low GPU, one CPU core near 100%, FPS low</td><td>Likely CPU-limited scene</td><td>Test at a lower resolution; reduce CPU-heavy settings</td></tr>
                <tr><td>Low GPU, frame cap or V-Sync on</td><td>The cap may set your FPS</td><td>Turn it off temporarily and compare</td></tr>
                <tr><td>High GPU on the desktop</td><td>Some process is using a GPU engine</td><td>Identify it in Task Manager</td></tr>
                <tr><td>-1%, N/A or frozen value</td><td>Monitoring reading problem</td><td>Cross-check in Task Manager</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2>What this checker cannot tell you</h2>
        <p>It cannot read your hardware, test a GPU, measure real frame times or prove a bottleneck. It does not set a safe temperature, because limits vary by model and by which sensor you read. A result of normal is not a guarantee that nothing is wrong, and a result that suggests a check is not a diagnosis. If you see artifacts, repeated driver resets or unexpected shutdowns, stop stress testing and follow the related guides.</p>
      </section>

      <section>
        <h2>Related guides and tools</h2>
        <ul>
          <li><Link className="text-link" to="/gpu-100-percent-usage-gaming">GPU at 100% usage while gaming: when it is normal and when it is not</Link></li>
          <li><Link className="text-link" to="/tools/frame-time-analyzer">Frame-Time Analyzer</Link></li>
          <li><Link className="text-link" to="/tools/pc-bottleneck-calculator">PC Bottleneck Calculator</Link></li>
          <li><Link className="text-link" to="/pc-game-low-fps-how-to-find-the-cause">Low FPS in PC games: how to find the cause</Link></li>
          <li><Link className="text-link" to="/gpu-overheating-gaming-pc-causes-fix">GPU overheating while gaming</Link></li>
          <li><Link className="text-link" to="/pc-game-stuttering-fix-frame-time">PC game stuttering: complete diagnostic guide</Link></li>
        </ul>
      </section>
    </div>
    <FaqSection items={tool.faq || []} />
  </section>;
}
