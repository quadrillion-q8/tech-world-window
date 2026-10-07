import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';

const tools = [
  {
    title: 'PC Bottleneck Calculator',
    description: 'Estimate whether a CPU/GPU pairing may be limiting performance at 1080p, 1440p, or 4K.',
    href: '/tools/pc-bottleneck-calculator',
    status: 'Available now',
  },
  {
    title: 'PSU Wattage Calculator',
    description: 'Estimate a sensible PSU range from GPU, CPU and other system load.',
    href: '/tools/psu-wattage-calculator',
    status: 'Available now',
  },
  {
    title: 'RAM Calculator',
    description: 'Estimate a practical memory capacity from Windows, application and gaming use.',
    href: '/tools/ram-calculator',
    status: 'Available now',
  },
  {
    title: 'Storage Calculator',
    description: 'Estimate how much SSD or HDD capacity your games, apps and files will need.',
    href: '/tools/storage-calculator',
    status: 'Available now',
  },
];

export function ToolsHubPage() {
  return (
    <section className="section tools-hub-page">
      <SEOEngine
        title="Free Tech Tools"
        description="Free technology tools from Tech World Window, including practical calculators and troubleshooting helpers."
        path="/tools"
      />
      <div className="category-hero">
        <span className="eyebrow">FREE TECH TOOLS</span>
        <h1>Useful tools, not mystery numbers.</h1>
        <p>Interactive tools designed to help you understand a technology problem or make a better decision—not simply produce a score with no explanation.</p>
      </div>

      <div className="article-grid">
        {tools.map(tool => (
          <article className="article-card" key={tool.href}>
            <div className="card-topline">
              <span className="eyebrow">{tool.status}</span>
              <span className="reading-time">Interactive</span>
            </div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <Link className="text-link" to={tool.href}>Use this tool →</Link>
          </article>
        ))}
      </div>

      <div className="editorial-note">
        <strong>Why we build tools</strong>
        <p>Good technology tools should explain their assumptions and limitations. Results are educational aids, not a replacement for model-specific benchmarks, professional diagnosis, or independent testing.</p>
      </div>
    </section>
  );
}
