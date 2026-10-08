import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { HUB_SEO_DESCRIPTION, tools, type ToolGroup } from '../data/tools';

const groups: { id: ToolGroup; heading: string; intro: string }[] = [
  { id: 'diagnose', heading: 'Diagnose a problem', intro: 'Analyze a capture or look up an error code, then follow the guide that explains what to do next.' },
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
        <p>Interactive tools designed to help you understand a technology problem or make a better decision—not simply produce a score with no explanation.</p>
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
                <Link className="text-link" to={tool.path}>Use this tool →</Link>
              </article>
            ))}
          </div>
        </div>
      ))}

      <div className="editorial-note">
        <strong>Why we build tools</strong>
        <p>Good technology tools should explain their assumptions and limitations. Results are educational aids, not a replacement for model-specific benchmarks, professional diagnosis, or independent testing.</p>
      </div>
    </section>
  );
}
