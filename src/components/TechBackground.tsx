/**
 * Premium ambient background for Tech World Window.
 *
 * Soft light fields and a faint dot grid sit underneath a circuit-board layer:
 * 45-degree routed traces with small cyan "signal packets" travelling along
 * them and softly pulsing solder-pad vias. Everything is decorative, has no
 * pointer events, and is pure CSS/SVG (no JS timers). Motion is disabled by
 * the prefers-reduced-motion rules in globals.css.
 */

// Authentic 45-degree routed traces (1920x1080 design space).
const TRACES = [
  'M -50 300 H 300 L 350 350 V 600 L 400 650 H 900',
  'M 2000 700 H 1500 L 1400 600 V 200 L 1300 100 H 900',
  'M 600 1200 V 900 L 700 800 V 500 L 650 450 H 300',
  'M 1200 -50 V 300 L 1300 400 H 1600 L 1650 450 V 900',
];

// Solder pads / vias at the corners and endpoints. `accent` pads use the
// site's amber instead of cyan, so the layer echoes the TWW palette.
const VIAS: Array<{ cx: number; cy: number; accent?: boolean }> = [
  { cx: 300, cy: 300 }, { cx: 350, cy: 350, accent: true }, { cx: 400, cy: 650 },
  { cx: 1500, cy: 700 }, { cx: 1400, cy: 600 }, { cx: 1300, cy: 100, accent: true },
  { cx: 600, cy: 900 }, { cx: 700, cy: 800 }, { cx: 650, cy: 450 },
  { cx: 1200, cy: 300 }, { cx: 1300, cy: 400, accent: true }, { cx: 1650, cy: 450 },
];

export function TechBackground() {
  return (
    <div className="tech-background tech-background-site" aria-hidden="true">
      <div className="tech-bg-atmosphere" />
      <div className="tech-bg-grid" />
      <div className="tech-bg-glow tech-bg-glow-a" />
      <div className="tech-bg-glow tech-bg-glow-b" />
      <div className="tech-bg-glow tech-bg-glow-c" />
      <svg
        className="tech-bg-circuit"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {TRACES.map((d, i) => (
          <path key={`base-${i}`} d={d} className="pcb-trace" />
        ))}
        {TRACES.map((d, i) => (
          <path
            key={`energy-${i}`}
            d={d}
            pathLength={1000}
            className={`pcb-energy pcb-energy-${i + 1}`}
          />
        ))}
        {VIAS.map((v, i) => (
          <circle
            key={`via-${i}`}
            cx={v.cx}
            cy={v.cy}
            r={2.5}
            className={`pcb-via ${i % 2 === 0 ? 'pcb-via-slow' : 'pcb-via-fast'}${v.accent ? ' pcb-via-accent' : ''}`}
          />
        ))}
      </svg>
      <div className="tech-bg-vignette" />
    </div>
  );
}

export default TechBackground;
