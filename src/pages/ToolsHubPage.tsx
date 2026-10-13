import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { HUB_SEO_DESCRIPTION, tools, type ToolGroup } from '../data/tools';

const groups: { id: ToolGroup; heading: string; intro: string }[] = [
  { id: 'diagnose', heading: 'Diagnose a problem', intro: 'Choose the symptom or analyze an error, then follow the focused guide that explains what to do next.' },
  { id: 'plan', heading: 'Plan a purchase or upgrade', intro: 'Estimate capacity and headroom before you spend money on parts.' },
];

export function ToolsHubPage() {
  return (
    <section className="section tools-hub-page">
      <SEOEngine
        title="Free Tech Tools"
        description={HUB_SEO_DESCRIPTION}
        path="/tools"
      />
      <div className="category-hero">
        <span className="eyebrow">FREE TECH TOOLS</span>
        <h1>Useful tools, not mystery numbers.</h1>
        <p>Narrow down common Windows problems, investigate frame-time stutter, decode blue-screen stop codes, and plan a PC upgrade with transparent estimates. Each tool explains what its result can—and cannot—tell you.</p>
        <div className="tools-hub-proof" aria-label="Tool principles"><span><strong>Browser-first</strong><small>Analyzer runs locally</small></span><span><strong>Transparent</strong><small>Assumptions explained</small></span><span><strong>Practical</strong><small>Next steps included</small></span></div>
      </div>

      {groups.map(group => (
        <div className="tools-group" key={group.id}>
          <h2>{group.heading}</h2>
          <p>{group.intro}</p>
          <div className="article-grid">
            {tools.filter(tool => tool.group === group.id).map(tool => (
              <article className="article-card" key={tool.path}>
                <div className="card-topline">
                  <span className="eyebrow">{tool.status}</span>
                  <span className="reading-time">{tool.kindLabel}</span>
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.hubDescription}</p>
                <Link className="text-link" to={tool.path} aria-label={`Open ${tool.title}`}>Open tool <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      ))}

      <div className="editorial-note">
        <strong>How to use these results</strong>
        <p>Start with the estimate, then verify it against the exact device, workload or component specification. The bottleneck and capacity calculators are planning aids—not live benchmark databases—and a wattage result cannot certify PSU quality or compatibility. The Frame-Time Analyzer processes compatible captures in your browser; the BSOD lookup helps prioritize checks but cannot diagnose hardware from a stop code alone.</p>
      </div>
    </section>
  );
}
