import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { trackMonetization } from '../lib/analytics';

type ToolKind = 'bottleneck' | 'psu' | 'ram' | 'storage';

const toolMeta: Record<ToolKind, { title: string; description: string; path: string }> = {
  bottleneck: { title: 'PC Bottleneck Calculator: CPU vs GPU', description: 'Estimate CPU/GPU limits at 1080p, 1440p and 4K. Verify with real FPS and frame-time tests; this tier estimate is not an exact percentage.', path: '/tools/pc-bottleneck-calculator' },
  psu: { title: 'PSU Wattage Calculator: Estimate Power Supply Size', description: 'Estimate a starting PSU wattage from your CPU, GPU and system configuration, then verify connectors, transient power and manufacturer guidance.', path: '/tools/psu-wattage-calculator' },
  ram: { title: 'RAM Calculator: Capacity, Speed & Latency', description: 'Estimate practical memory capacity and compare data rate, CAS latency and theoretical bandwidth.', path: '/tools/ram-calculator' },
  storage: { title: 'SSD & HDD Storage Calculator', description: 'Plan SSD or HDD capacity for games, apps and files. Estimate your total, add 20% headroom, and compare the result in GB and decimal TB.', path: '/tools/storage-calculator' },
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
  const estimateNote: Record<ToolKind, string> = {
    bottleneck: 'This is a broad-tier estimate, not a measured bottleneck percentage or FPS forecast; verify the result with repeatable gameplay tests.',
    psu: 'This is a starting wattage estimate, not a measurement of power draw or a test of PSU quality. Verify component recommendations, transient demands and native connector requirements.',
    ram: 'This is a capacity and timing estimate, not a compatibility check or real-world performance benchmark. Verify your platform’s supported memory type and configuration.',
    storage: 'This is a capacity-planning estimate, not exact usable space. Operating-system files, formatting, recovery partitions and changing game sizes affect what fits.',
  };

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
    <p className="page-intro">{meta.description} {estimateNote[kind]}</p>

    {kind === 'bottleneck' && <div className="tool-panel">
      <div className="tool-controls">
        <label>CPU performance tier<select value={cpu} onChange={e => setCpu(Number(e.target.value))}>{['Entry-level CPU','Mid-range CPU','High-end CPU','Enthusiast CPU'].map((x,i)=><option value={i+1} key={x}>{x}</option>)}</select></label>
        <label>GPU performance tier<select value={gpu} onChange={e => setGpu(Number(e.target.value))}>{['Entry-level GPU','Mid-range GPU','High-end GPU','Enthusiast GPU'].map((x,i)=><option value={i+1} key={x}>{x}</option>)}</select></label>
        <label>Gaming resolution<select value={resolution} onChange={e => setResolution(e.target.value)}><option>1080p</option><option>1440p</option><option>4K</option></select></label>
      </div>
      <div className="tool-result" aria-live="polite" aria-atomic="true"><span className="eyebrow">ESTIMATED MATCH</span><h2>{bottleneck.label}</h2><p>{bottleneck.detail}</p><small>This is a qualitative tier comparison, not a measured bottleneck percentage or FPS prediction. Game engine, settings, ray tracing, upscaling, background tasks and target refresh rate can change the limiting component.</small></div>
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
      <details><summary>What does this PC bottleneck calculator actually compare?</summary><p>It compares broad CPU and GPU performance tiers and adjusts the estimate for resolution. It does not identify an exact model’s performance from a live benchmark database.</p></details>
      <details><summary>How do I confirm a possible CPU or GPU bottleneck?</summary><p>Repeat the same game scene, record FPS and frame times, then lower resolution or one GPU-heavy setting while keeping other variables unchanged. Check CPU-thread activity, clocks, temperatures and memory use before upgrading.</p></details>
    </div>}

    {kind === 'psu' && <div className="tool-panel">
      <div className="tool-controls">
        <label>GPU typical board power (W)<input type="number" min="30" max="800" value={gpuWatts} onChange={e=>setGpuWatts(boundedNumber(e.target.value, 30, 800, 220))}/></label>
        <label>CPU typical package power (W)<input type="number" min="20" max="400" value={cpuWatts} onChange={e=>setCpuWatts(boundedNumber(e.target.value, 20, 400, 120))}/></label>
        <label>Other system load (W)<input type="number" min="20" max="300" value={systemWatts} onChange={e=>setSystemWatts(boundedNumber(e.target.value, 20, 300, 80))}/></label>
      </div>
      <div className="tool-result"><span className="eyebrow">ESTIMATED STARTING POINT</span><h2>Shortlist a {psu.commonSize} W PSU or higher</h2><p>Estimated sustained system load: about {psu.load} W. This calculator applies a simple 35% planning margin ({psu.recommended} W) and rounds up to a common capacity. It does not simulate short GPU power spikes or test a specific PSU.</p><small>Before buying, verify the exact graphics-card maker recommendation, the PSU’s native GPU connector and cable instructions, transient-load testing, protections, noise and independent reviews. Do not choose by wattage or the 80 PLUS label alone.</small></div>
    </div>}
    {kind === 'psu' && <div className="editorial-note">
      <h2>How to choose a power supply for your PC</h2>
      <p>Use the result as a shortlist, not a pass/fail safety rating. The right unit depends on the exact CPU and GPU, their power limits, the rest of the system, connector requirements, and the quality of the PSU design.</p>
      <h3>Check these details before ordering</h3>
      <ol>
        <li>Look up the graphics card manufacturer's recommended PSU capacity for your exact card model—not just the GPU family.</li>
        <li>Confirm the unit has the correct native PCIe or 12V-2x6 connector and follow the PSU and GPU cable instructions. Do not force connectors or rely on an unsuitable adapter.</li>
        <li>Read independent reviews that test electrical performance, protection behavior, noise and transient response. Wattage and efficiency certification alone do not establish quality.</li>
        <li>Account for overclocking, power limits, future upgrades and the PSU's age or condition. If the system shuts down under load, investigate overheating, cabling and hardware faults instead of assuming wattage is the only cause.</li>
      </ol>
      <p>A 35% margin is a planning assumption used by this calculator, not a universal engineering rule. Some builds need a different choice; the tool does not model transient spikes, PSU degradation, connector condition or a specific unit's performance.</p>
      <h3>PSU wattage calculator: common questions</h3>
      <details><summary>Is the result the minimum wattage my PC can run on?</summary><p>No. It is a suggested starting capacity based on the values you enter and a simple margin. Check the exact GPU manufacturer's recommendation and reviews of the specific PSU model before buying.</p></details>
      <details><summary>Should I buy a 1000 W PSU just to be safe?</summary><p>Not automatically. Excess capacity does not compensate for poor quality or missing connectors. Choose a tested model that meets the actual system's sustained and transient requirements with sensible upgrade headroom.</p></details>
      <details><summary>Does 80 PLUS Gold mean the PSU is high quality?</summary><p>No. 80 PLUS is an efficiency certification, not a complete assessment of voltage regulation, protections, noise, transient response or long-term reliability. Look for credible independent testing of the exact model.</p></details>
      <details><summary>Can I reuse an old PSU after upgrading my GPU?</summary><p>Only after checking its exact model, age, condition, available native connectors, capacity and tested transient performance against the new GPU's requirements. Never open the PSU casing; it can retain dangerous voltages even when unplugged.</p></details>
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
      <div className="editorial-note">
        <h2>How to use this RAM estimate</h2>
        <p>The capacity result is a planning target based on the three amounts you entered. It is not a minimum specification for every game or application. If you want to avoid an unnecessary upgrade, check Task Manager's memory usage during your normal heaviest workload and look for sustained pressure, slowdowns, or heavy paging.</p>
        <h3>Capacity, speed and compatibility are different questions</h3>
        <ul>
          <li><strong>Capacity:</strong> add RAM when your workload regularly approaches available memory and paging or app pressure is affecting responsiveness.</li>
          <li><strong>Speed and latency:</strong> higher data rates and lower timings can help some workloads, but gains depend on platform and application; this estimate is not a benchmark.</li>
          <li><strong>Compatibility:</strong> verify DDR generation, DIMM or SO-DIMM format, supported capacity, memory profile support, and whether your laptop's RAM is upgradeable.</li>
          <li><strong>Stability:</strong> mixed kits and aggressive profiles may not run at their advertised settings on every system.</li>
        </ul>
        <h3>RAM calculator: common questions</h3>
        <details><summary>Will adding RAM increase FPS?</summary><p>Only in situations where memory capacity or memory configuration is limiting performance. If the game is limited by the GPU or CPU and memory use is not under pressure, more RAM may not increase frame rate.</p></details>
        <details><summary>Is 32 GB RAM enough for gaming?</summary><p>It is a practical capacity for many current gaming setups, but the right amount depends on the specific games, mods, browser tabs, streaming and creative apps you run alongside them. Check actual usage rather than treating one capacity as universal.</p></details>
        <details><summary>Should I prioritize RAM capacity or speed?</summary><p>First make sure you have enough capacity for your workload and a compatible configuration. After that, compare platform-supported memory speeds and independent tests for the exact CPU and workload.</p></details>
        <p>For more context, read <Link className="text-link" to="/research/does-more-ram-make-windows-faster">does more RAM make Windows faster?</Link>, our <Link className="text-link" to="/best-ram" onClick={()=>conversion('ram_to_buying_guide')}>RAM buying guide</Link>, and the <Link className="text-link" to="/research/upgrade-ram-ssd-now-or-wait">RAM/SSD upgrade timing decision guide</Link>.</p>
      </div>
    </div>}

    {kind === 'storage' && <div className="tool-panel">
      <div className="tool-controls">
        <label>Number of games<input type="number" min="0" max="100" value={games} onChange={e=>setGames(boundedNumber(e.target.value, 0, 100, 8))}/></label>
        <label>Average game size (GB)<input type="number" min="1" max="500" value={gameSize} onChange={e=>setGameSize(boundedNumber(e.target.value, 1, 500, 100))}/></label>
        <label>Other files/apps (GB)<input type="number" min="0" max="10000" value={otherStorage} onChange={e=>setOtherStorage(boundedNumber(e.target.value, 0, 10000, 200))}/></label>
      </div>
      <div className="tool-result" aria-live="polite" aria-atomic="true"><span className="eyebrow">PLANNED STORAGE</span><h2>{storage.recommended.toLocaleString()} GB planned</h2><p>Your listed content totals about {storage.total.toLocaleString()} GB. With 20% planning room, shortlist around {storage.terabytes} TB (decimal) or the next larger drive size. Drive formatting and operating-system overhead mean advertised capacity is not all available for files.</p></div>
    </div>}

    {kind === 'storage' && <div className="editorial-note">
      <h2>How this storage calculator estimates capacity</h2>
      <p>Enter the number of games you expect to keep installed, estimate their average size in GB, and add the space needed for other files and apps. The calculator adds those amounts, applies 20% planning room, rounds the recommendation up in 100 GB increments, and shows the result in decimal terabytes (1 TB = 1,000 GB).</p>
      <p>The result is a planning estimate, not a reading of your current drive. Actual installs vary by game edition, updates, downloadable content and language packs, and the calculator does not inspect your files or predict future updates.</p>
      <h3>Improve the estimate before buying</h3>
      <ol>
        <li>Use recent install sizes for the games you actually keep on the drive, especially if you use large add-ons or several major titles.</li>
        <li>Include non-game files such as applications, documents, photos, video, downloads and other content stored on that drive; avoid counting the same content twice.</li>
        <li>Keep additional room if your library changes frequently or you regularly work with large media files. The built-in 20% is a planning allowance, not a universal minimum.</li>
        <li>Remember that advertised drive capacity and the space shown by the operating system differ because manufacturers use decimal units and some capacity is used by formatting, partitions and system files.</li>
      </ol>
      <p>Capacity is only one buying decision. Confirm the drive interface and physical format supported by your exact computer, then compare the workload and reliability needs before choosing an SSD. See the <Link className="text-link" to="/best-ssds">SSD buying guide</Link>, the <Link className="text-link" to="/laptop-nvme-ssd-upgrade-compatibility">laptop NVMe compatibility checklist</Link>, or the <Link className="text-link" to="/research/upgrade-ram-ssd-now-or-wait">RAM/SSD upgrade timing decision guide</Link> before ordering an upgrade.</p>
      <h3>Storage calculator: common questions</h3>
      <details><summary>Why does the calculator add 20% headroom?</summary><p>It leaves planning room beyond the listed games and files, so the estimate is not exactly equal to the sum of today’s content. It is not a guarantee that every future update will fit.</p></details>
      <details><summary>Why is usable storage lower than the number on the drive box?</summary><p>Drive makers advertise capacity in decimal units, while operating systems may display capacity differently. Formatting, partitions and operating-system files also consume space. The calculator gives a planning estimate rather than exact usable capacity.</p></details>
      <details><summary>What should I include in “Other files/apps”?</summary><p>Include the non-game content you expect to store on the same drive, such as applications, documents, photos, downloads, media and other files. Do not count items already included in your game-size estimate.</p></details>
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
