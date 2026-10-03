import { useMemo, useState } from 'react';
import { SEOEngine } from '../seo/SEOEngine';

const cpuOptions = [{ label: 'Entry-level CPU', value: 1 }, { label: 'Mid-range CPU', value: 2 }, { label: 'High-end CPU', value: 3 }, { label: 'Enthusiast CPU', value: 4 }];
const gpuOptions = [{ label: 'Entry-level GPU', value: 1 }, { label: 'Mid-range GPU', value: 2 }, { label: 'High-end GPU', value: 3 }, { label: 'Enthusiast GPU', value: 4 }];

export function ToolPage() {
  const [cpu, setCpu] = useState(2);
  const [gpu, setGpu] = useState(2);
  const [resolution, setResolution] = useState('1440p');
  const result = useMemo(() => {
    const gpuWeight = resolution === '1080p' ? 1 : resolution === '1440p' ? 1.3 : 1.7;
    const cpuScore = cpu;
    const gpuScore = gpu * gpuWeight;
    const delta = Math.abs(cpuScore - gpuScore);
    if (delta < 0.8) return { label: 'Relatively balanced on paper', detail: 'The selected tiers look reasonably matched for this simplified model.' };
    if (cpuScore < gpuScore) return { label: 'Possible CPU limitation', detail: 'At lower resolutions, a weaker CPU can limit high-FPS performance. Check game-specific benchmarks before upgrading.' };
    return { label: 'Possible GPU limitation', detail: 'Higher resolutions usually increase graphics workload. A GPU limit is often normal and can be desirable when the target FPS is met.' };
  }, [cpu, gpu, resolution]);
  return <section className="section tool-page">
    <SEOEngine title="PC Bottleneck Calculator" description="A simple educational PC pairing estimator. Learn why CPU/GPU bottlenecks depend on resolution, games, settings, and target frame rate." path="/tools/pc-bottleneck-calculator" />
    <span className="eyebrow">FREE INTERACTIVE TOOL</span><h1>PC Bottleneck Estimator</h1><p className="page-intro">A learning tool for thinking about CPU/GPU pairing—not a precise benchmark or a substitute for game-specific tests.</p>
    <div className="tool-panel"><div className="tool-controls"><label>CPU performance tier<select value={cpu} onChange={e => setCpu(Number(e.target.value))}>{cpuOptions.map(o => <option value={o.value} key={o.value}>{o.label}</option>)}</select></label><label>GPU performance tier<select value={gpu} onChange={e => setGpu(Number(e.target.value))}>{gpuOptions.map(o => <option value={o.value} key={o.value}>{o.label}</option>)}</select></label><label>Gaming resolution<select value={resolution} onChange={e => setResolution(e.target.value)}><option>1080p</option><option>1440p</option><option>4K</option></select></label></div><div className="tool-result"><span className="eyebrow">ESTIMATED MATCH</span><h2>{result.label}</h2><p>{result.detail}</p><small>Real performance varies by game engine, settings, CPU/GPU model, memory, thermals, drivers, and target frame rate.</small></div></div>
    <div className="editorial-note"><strong>How to use this responsibly</strong><p>Use this estimate as a conversation starter. For a real decision, compare independent benchmarks for the exact CPU, GPU, game, resolution, and settings you plan to use.</p></div>
  </section>;
}
