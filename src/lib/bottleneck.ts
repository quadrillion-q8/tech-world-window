export type GamingResolution = '1080p' | '1440p' | '4K';
export const resolutionDemand: Record<GamingResolution, number> = { '1080p': 1, '1440p': 1.3, '4K': 1.7 };
export type BottleneckKind = 'cpu' | 'balanced' | 'gpu';

// Ordinal planning heuristic only. These weights are not measured pixel scaling,
// hardware benchmarks, utilization percentages or an FPS prediction.
export function estimateBottleneck(cpuTier: number, gpuTier: number, resolution: GamingResolution) {
  const gpuEffectiveTier = gpuTier / resolutionDemand[resolution];
  const difference = cpuTier - gpuEffectiveTier;
  const kind: BottleneckKind = Math.abs(difference) < 0.8 ? 'balanced' : difference < 0 ? 'cpu' : 'gpu';
  const labels = {
    cpu: { label: 'Possible CPU limitation', detail: 'The selected CPU tier is lower relative to the effective graphics tier in this simplified model. Verify with repeatable game tests.' },
    balanced: { label: 'Relatively balanced on paper', detail: 'The selected tiers look reasonably matched for this simplified model.' },
    gpu: { label: 'Possible GPU limitation', detail: 'The selected graphics tier is lower relative to the CPU tier after adjusting for rendering demand. A GPU limit is often normal when target FPS is met.' }
  };
  return { kind, gpuEffectiveTier, difference, ...labels[kind] };
}

// Use real user-entered FPS values from an otherwise unchanged scene.
// The response is descriptive, not a diagnosis or bottleneck percentage.
export function compareRenderScaleFps(baseline: number, reduced: number) {
  if (!Number.isFinite(baseline) || !Number.isFinite(reduced) || baseline <= 0 || reduced <= 0) return null;
  const changePercent = (reduced / baseline - 1) * 100;
  return Number.isFinite(changePercent) ? changePercent : null;
}
