import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { trackMonetization } from '../lib/analytics';

type ToolKind = 'bottleneck' | 'psu' | 'ram' | 'storage';

const toolMeta: Record<ToolKind, { title: string; description: string; path: string }> = {
  bottleneck: { title: 'PC Bottleneck Calculator', description: 'Estimate CPU/GPU balance at common gaming resolutions.', path: '/tools/pc-bottleneck-calculator' },
  psu: { title: 'PSU Wattage Calculator', description: 'Estimate a sensible power-supply range from your CPU, GPU and system configuration.', path: '/tools/psu-wattage-calculator' },
  ram: { title: 'RAM Calculator: Capacity, Speed & Latency', description: 'Estimate practical memory capacity and compare data rate, CAS latency and theoretical bandwidth.', path: '/tools/ram-calculator' },
  storage: { title: 'Storage Calculator', description: 'Estimate how much SSD or HDD capacity your games, photos and files can consume.', path: '/tools/storage-calculator' },
};

function boundedNumber(value: string, min: number, max: number, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function kindFromPath(path: string): ToolKind {
  if (path.includes('psu-wattage')) return 'psu';
  if (path.includes('ram-calculator')) return 'ram';
  if (path.includes('storage-calculator')) return 'storage';
  return 'bottleneck';
}

export function ToolPage() {
  const location = useLocation();
  const kind = kindFromPath(location.pathname);
  const meta = toolMeta[kind];

  const [cpu, setCpu] = useState(2);
  const [gpu, setGpu] = useState(2);
  const [resolution, setResolution] = useState('1440p');
  const [gpuWatts, setGpuWatts] = useState(220);
  const [cpuWatts, setCpuWatts] = useState(120);
  const [systemWatts, setSystemWatts] = useState(80);
  const [ramUse, setRamUse] = useState(12);
  const [ramApps, setRamApps] = useState(4);
  const [headroom, setHeadroom] = useState(4);
  const [ramSpeed, setRamSpeed] = useState(3200);
  const [ramCas, setRamCas] = useState(16);
  const [ramChannels, setRamChannels] = useState(2);
  const [games, setGames] = useState(8);
  const [gameSize, setGameSize] = useState(100);
  const [otherStorage, setOtherStorage] = useState(200);

  const bottleneck = useMemo(() => {
    const gpuWeight = resolution === '1080p' ? 1 : resolution === '1440p' ? 1.3 : 1.7;
    const cpuScore = cpu;
    const gpuScore = gpu * gpuWeight;
    const delta = Math.abs(cpuScore - gpuScore);
    if (delta < 0.8) return { label: 'Relatively balanced on paper', detail: 'The selected tiers look reasonably matched for this simplified model.' };
    if (cpuScore < gpuScore) return { label: 'Possible CPU limitation', detail: 'At lower resolutions, a weaker CPU can limit high-FPS performance. Check game-specific benchmarks before upgrading.' };
    return { label: 'Possible GPU limitation', detail: 'Higher resolutions usually increase graphics workload. A GPU limit is often normal when the target FPS is met.' };
  }, [cpu, gpu, resolution]);

  const psu = useMemo(() => {
    const load = gpuWatts + cpuWatts + systemWatts;
    const recommended = Math.ceil((load * 1.35) / 50) * 50;
    const commonSize = [450, 550, 650, 750, 850, 1000, 1200, 1500].find(size => size >= recommended) ?? recommended;
    return { load, recommended, commonSize };
  }, [gpuWatts, cpuWatts, systemWatts]);

  const ram = useMemo(() => {
    const total = ramUse + ramApps + headroom;
    return Math.ceil(total / 4) * 4;
  }, [ramUse, ramApps, headroom]);

  const ramSpeedMetrics = useMemo(() => ({
    latencyNs: (ramCas * 2000) / ramSpeed,
    bandwidthGbps: (ramSpeed * 8 * ramChannels) / 1000,
  }), [ramCas, ramSpeed, ramChannels]);

  const storage = useMemo(() => {
    const total = games * gameSize + otherStorage;
    const recommended = Math.ceil((total * 1.2) / 100) * 100;
    return { total, recommended, terabytes: (recommended / 1000).toFixed(2) };
  }, [games, gameSize, otherStorage]);

  const conversion = (tool: string) => trackMonetization('tool_conversion', { tool });

  return <section className="section tool-page">
    <SEOEngine title={meta.title} description={meta.description} path={meta.path} />
    <span className="eyebrow">FREE INTERACTIVE TOOL</span>
    <h1>{meta.title}</h1>
    <p className="page-intro">{meta.description} Results are estimates with transparent assumptions, not professional specifications.</p>

    {kind === 'bottleneck' && <div className="tool-panel">
      <div className="tool-controls">
        <label>CPU performance tier<select value={cpu} onChange={e => setCpu(Number(e.target.value))}>{['Entry-level CPU','Mid-range CPU','High-end CPU','Enthusiast CPU'].map((x,i)=><option value={i+1} key={x}>{x}</option>)}</select></label>
        <label>GPU performance tier<select value={gpu} onChange={e => setGpu(Number(e.target.value))}>{['Entry-level GPU','Mid-range GPU','High-end GPU','Enthusiast GPU'].map((x,i)=><option value={i+1} key={x}>{x}</option>)}</select></label>
        <label>Gaming resolution<select value={resolution} onChange={e => setResolution(e.target.value)}><option>1080p</option><option>1440p</option><option>4K</option></select></label>
      </div>
      <div className="tool-result"><span className="eyebrow">ESTIMATED MATCH</span><h2>{bottleneck.label}</h2><p>{bottleneck.detail}</p><small>This is a qualitative tier comparison, not a measured bottleneck percentage or FPS prediction. Game engine, settings, ray tracing, upscaling, background tasks and target refresh rate can change the limiting component.</small></div>
    </div>}

    {kind === 'bottleneck' && <div className="editorial-note">
      <h2>How to interpret a PC bottleneck estimate</h2>
      <p>A bottleneck is the part of a system that limits performance in a particular workload. It is not a permanent percentage attached to a CPU or graphics card: the limiting component can change between games, scenes, graphics settings and target frame rates.</p>
      <h3>What resolution changes</h3>
      <p>At 1080p, a graphics card has fewer pixels to render, so the CPU can become the limit more often when aiming for very high frame rates. At 1440p and 4K, the graphics workload usually rises and the GPU is more likely to set the pace. This is a tendency, not a rule for every game or PC.</p>
      <h3>Check the real system before buying parts</h3>
      <ol>
        <li>Repeat a representative section of the same game with the same settings.</li>
        <li>Check GPU utilization, GPU temperature and clock speed alongside frame time—not utilization alone.</li>
        <li>Look for a repeatable pattern: GPU load falling while a CPU thread is saturated can suggest a CPU-side limit; consistently high GPU load while frame rate is below target can suggest a graphics-side limit.</li>
        <li>Check for other causes such as thermal throttling, power limits, background tasks, shader compilation or memory pressure before replacing hardware.</li>
      </ol>
      <p>This tool uses broad performance tiers, so its result is a starting hypothesis—not a measured bottleneck percentage, compatibility check, or FPS forecast.</p>
      <p>For symptom-led checks, see <Link className="text-link" to="/pc-game-low-fps-how-to-find-the-cause">how to diagnose low FPS</Link>, <Link className="text-link" to="/gpu-100-percent-usage-gaming">what 100% GPU usage means</Link>, and the <Link className="text-link" to="/tools/frame-time-analyzer">Frame-Time Analyzer</Link> for supported capture files.</p>
      <h3>PC bottleneck calculator: common questions</h3>
      <details><summary>Does this calculator give an exact bottleneck percentage?</summary><p>No. It compares broad CPU and GPU performance tiers with a simple resolution adjustment. It does not use a live benchmark database or measure your PC.</p></details>
      <details><summary>Does 100% GPU usage mean my PC has a problem?</summary><p>Not usually. High GPU utilization can mean the game is making full use of the graphics card. Check whether performance meets your target and look for abnormal temperatures, falling clocks, instability or frame-time problems.</p></details>
      <details><summary>Should I upgrade my CPU or GPU first?</summary><p>Do not decide from this estimate alone. Measure the games and settings you care about, identify the repeatable limit, check compatibility and power/cooling requirements, and compare independent benchmarks for the exact components.</p></details>
      <details><summary>Why can the same PC show different bottlenecks in different games?</summary><p>Games use CPU threads, graphics features, memory and engines differently. Resolution, quality settings, ray tracing, upscaling and target frame rate also change the workload, so there is no single bottleneck result for every situation.</p></details>
    </div>}

    {kind === 'psu' && <div className="tool-panel">
      <div className="tool-controls">
        <label>GPU typical board power (W)<input type="number" min="30" max="800" value={gpuWatts} onChange={e=>setGpuWatts(boundedNumber(e.target.value, 30, 800, 220))}/></label>
        <label>CPU typical package power (W)<input type="number" min="20" max="400" value={cpuWatts} onChange={e=>setCpuWatts(boundedNumber(e.target.value, 20, 400, 120))}/></label>
        <label>Other system load (W)<input type="number" min="20" max="300" value={systemWatts} onChange={e=>setSystemWatts(boundedNumber(e.target.value, 20, 300, 80))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">ESTIMATE</span><h2>Start your shortlist at {psu.commonSize} W</h2><p>Estimated sustained system load: about {psu.load} W. A simple 35% planning margin gives roughly {psu.recommended} W before choosing a standard size.</p><small>Check the GPU maker’s PSU guidance, 12V-2x6/PCIe connector needs, transient spikes, PSU quality and independent reviews. A wattage estimate cannot verify a specific PSU model.</small></div>
    </div>}

    {kind === 'ram' && <div className="tool-panel">
      <div className="tool-controls">
        <label>Windows + baseline use (GB)<input type="number" min="4" max="32" value={ramUse} onChange={e=>setRamUse(boundedNumber(e.target.value, 4, 32, 12))}/></label>
        <label>Gaming / application use (GB)<input type="number" min="2" max="64" value={ramApps} onChange={e=>setRamApps(boundedNumber(e.target.value, 2, 64, 4))}/></label>
        <label>Extra headroom (GB)<input type="number" min="2" max="32" value={headroom} onChange={e=>setHeadroom(boundedNumber(e.target.value, 2, 32, 4))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">PRACTICAL CAPACITY TARGET</span><h2>{ram} GB RAM target</h2><p>This rounds your estimated working set up to a 4 GB step, not a guarantee that every workload needs this amount. For a real upgrade, check current memory use during your heaviest workload, channel configuration, supported capacity and laptop upgradeability.</p></div>
      <div className="tool-controls">
        <label>Memory data rate (MT/s)<select value={ramSpeed} onChange={e=>setRamSpeed(Number(e.target.value))}><option value={2133}>2133 MT/s</option><option value={2400}>2400 MT/s</option><option value={2666}>2666 MT/s</option><option value={2933}>2933 MT/s</option><option value={3200}>3200 MT/s</option><option value={3600}>3600 MT/s</option><option value={4800}>4800 MT/s</option><option value={5200}>5200 MT/s</option><option value={5600}>5600 MT/s</option><option value={6000}>6000 MT/s</option><option value={6400}>6400 MT/s</option><option value={7200}>7200 MT/s</option><option value={8000}>8000 MT/s</option></select></label>
        <label>CAS latency (CL)<input type="number" min="6" max="60" value={ramCas} onChange={e=>setRamCas(Math.round(boundedNumber(e.target.value, 6, 60, 16)))}/></label>
        <label>Memory channels<select value={ramChannels} onChange={e=>setRamChannels(Number(e.target.value))}><option value={1}>1 channel</option><option value={2}>2 channels</option><option value={4}>4 channels</option></select></label>
      </div>
      <div className="tool-result"><span className="eyebrow">SPEED ESTIMATE</span><h2>About {ramSpeedMetrics.latencyNs.toFixed(1)} ns CAS latency</h2><p>Theoretical peak bandwidth: about {ramSpeedMetrics.bandwidthGbps.toFixed(1)} GB/s across {ramChannels} {ramChannels === 1 ? 'channel' : 'channels'}. This estimate assumes 64-bit channels and uses the selected transfer rate and CAS timing; it is not a benchmark or a prediction of application performance.</p><small>Compare kits only within the same platform and configuration. DDR generation, motherboard/CPU support, rank layout, timings beyond CL, and actual memory-controller settings matter. Advertised MT/s is a transfer rate, not the physical clock in MHz. Confirm the system's supported settings before buying.</small></div>
    </div>}

    {kind === 'storage' && <div className="tool-panel">
      <div className="tool-controls">
        <label>Number of games<input type="number" min="0" max="100" value={games} onChange={e=>setGames(boundedNumber(e.target.value, 0, 100, 8))}/></label>
        <label>Average game size (GB)<input type="number" min="1" max="500" value={gameSize} onChange={e=>setGameSize(boundedNumber(e.target.value, 1, 500, 100))}/></label>
        <label>Other files/apps (GB)<input type="number" min="0" max="10000" value={otherStorage} onChange={e=>setOtherStorage(boundedNumber(e.target.value, 0, 10000, 200))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">PLANNED STORAGE</span><h2>{storage.recommended.toLocaleString()} GB planned</h2><p>Your listed content totals about {storage.total.toLocaleString()} GB. With 20% planning room, shortlist around {storage.terabytes} TB (decimal) or the next larger drive size. Drive formatting and operating-system overhead mean advertised capacity is not all available for files.</p></div>
    </div>}

    <div className="editorial-note">
      <strong>Use the result responsibly</strong>
      <p>These tools are educational planning aids. For a purchase, verify the exact hardware specifications, compatibility, transient power requirements, workload and independent testing.</p>
      {kind === 'bottleneck' && <p><Link className="text-link" to="/best-gaming-laptops" onClick={()=>conversion('bottleneck_to_laptop_guide')}>Compare gaming-laptop buying criteria →</Link></p>}
      {kind === 'psu' && <p><Link className="text-link" to="/hardware" onClick={()=>conversion('psu_to_hardware')}>Explore hardware guides →</Link></p>}
      {kind === 'ram' && <p><Link className="text-link" to="/best-ram" onClick={()=>conversion('ram_to_buying_guide')}>Read the RAM buying guide →</Link></p>}
      {kind === 'storage' && <p><Link className="text-link" to="/best-ssds" onClick={()=>conversion('storage_to_ssd_guide')}>Read the SSD buying guide →</Link></p>}
    </div>
  </section>;
}
