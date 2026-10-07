import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { trackMonetization } from '../lib/analytics';

type ToolKind = 'bottleneck' | 'psu' | 'ram' | 'storage';

const toolMeta: Record<ToolKind, { title: string; description: string; path: string }> = {
  bottleneck: { title: 'PC Bottleneck Calculator', description: 'Estimate CPU/GPU balance at common gaming resolutions.', path: '/tools/pc-bottleneck-calculator' },
  psu: { title: 'PSU Wattage Calculator', description: 'Estimate a sensible power-supply range from your CPU, GPU and system configuration.', path: '/tools/psu-wattage-calculator' },
  ram: { title: 'RAM Calculator', description: 'Estimate practical memory capacity for gaming, Windows and multitasking.', path: '/tools/ram-calculator' },
  storage: { title: 'Storage Calculator', description: 'Estimate how much SSD or HDD capacity your games, photos and files can consume.', path: '/tools/storage-calculator' },
};

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
    return { load, recommended };
  }, [gpuWatts, cpuWatts, systemWatts]);

  const ram = useMemo(() => {
    const total = ramUse + ramApps + headroom;
    return Math.ceil(total / 4) * 4;
  }, [ramUse, ramApps, headroom]);

  const storage = useMemo(() => {
    const total = games * gameSize + otherStorage;
    return { total, recommended: Math.ceil((total * 1.2) / 100) * 100 };
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
      <div className="tool-result"><span className="eyebrow">ESTIMATED MATCH</span><h2>{bottleneck.label}</h2><p>{bottleneck.detail}</p></div>
    </div>}

    {kind === 'psu' && <div className="tool-panel">
      <div className="tool-controls">
        <label>GPU typical board power (W)<input type="number" min="30" max="800" value={gpuWatts} onChange={e=>setGpuWatts(Number(e.target.value))}/></label>
        <label>CPU typical package power (W)<input type="number" min="20" max="400" value={cpuWatts} onChange={e=>setCpuWatts(Number(e.target.value))}/></label>
        <label>Other system load (W)<input type="number" min="20" max="300" value={systemWatts} onChange={e=>setSystemWatts(Number(e.target.value))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">ESTIMATE</span><h2>{psu.recommended} W PSU range</h2><p>Estimated sustained system load: about {psu.load} W. The calculator adds headroom for transient demand and normal operating margin.</p></div>
    </div>}

    {kind === 'ram' && <div className="tool-panel">
      <div className="tool-controls">
        <label>Windows + baseline use (GB)<input type="number" min="4" max="32" value={ramUse} onChange={e=>setRamUse(Number(e.target.value))}/></label>
        <label>Gaming / application use (GB)<input type="number" min="2" max="64" value={ramApps} onChange={e=>setRamApps(Number(e.target.value))}/></label>
        <label>Extra headroom (GB)<input type="number" min="2" max="32" value={headroom} onChange={e=>setHeadroom(Number(e.target.value))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">PRACTICAL TARGET</span><h2>{ram} GB RAM</h2><p>This rounds your estimated working set up to a common capacity. Check the exact motherboard or laptop limit before buying.</p></div>
    </div>}

    {kind === 'storage' && <div className="tool-panel">
      <div className="tool-controls">
        <label>Number of games<input type="number" min="0" max="100" value={games} onChange={e=>setGames(Number(e.target.value))}/></label>
        <label>Average game size (GB)<input type="number" min="1" max="500" value={gameSize} onChange={e=>setGameSize(Number(e.target.value))}/></label>
        <label>Other files/apps (GB)<input type="number" min="0" max="10000" value={otherStorage} onChange={e=>setOtherStorage(Number(e.target.value))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">PLANNED STORAGE</span><h2>{storage.recommended} GB</h2><p>Your listed content totals about {storage.total} GB. The result adds 20% planning room instead of treating every last gigabyte as usable capacity.</p></div>
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
