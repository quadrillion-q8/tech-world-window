import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { HUB_SEO_DESCRIPTION, tools, type ToolGroup } from '../data/tools';

const groups: { id: ToolGroup; heading: string; intro: string }[] = [
  { id: 'diagnose', heading: 'Diagnose and analyze', intro: 'Investigate Windows symptoms, blue-screen codes, laptop battery reports, and gaming performance data.' },
  { id: 'plan', heading: 'Plan a purchase or upgrade', intro: 'Estimate capacity and headroom before you spend money on parts.' },
  { id: 'create', heading: 'Create and publish', intro: 'Generate practical, responsive code snippets for publishing video on your own website.' },
];

type ToolFilter = 'all' | ToolGroup;

export function ToolsHubPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ToolFilter>('all');

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter(tool => {
      const matchesGroup = filter === 'all' || tool.group === filter;
      const searchable = [tool.title, tool.hubDescription, tool.menuDescription, tool.kindLabel].join(' ').toLowerCase();
      return matchesGroup && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query]);

  const visibleGroups = groups
    .map(group => ({ ...group, tools: filteredTools.filter(tool => tool.group === group.id) }))
    .filter(group => group.tools.length > 0);

  return (
    <section className="section tools-hub-page">
      <SEOEngine
        title="Free Tech Tools"
        description={HUB_SEO_DESCRIPTION}
        path="/tools"
      />
      <div className="category-hero">
        <span className="eyebrow">FREE TECH TOOLS</span>
        <h1>Find what's wrong. Understand why. Choose your next step.</h1>
        <p>Free browser-based tools for Windows troubleshooting, gaming analysis, PC upgrade planning and responsive video embed code. Every tool explains what its results can—and cannot—tell you.</p>
        <ul className="tools-hub-proof" aria-label="What to expect from our tools">
          <li><span className="proof-icon" aria-hidden="true">01</span><span><strong>Browser-first analysis</strong><small>Uploaded diagnostic files are processed locally by supported tools</small></span></li>
          <li><span className="proof-icon" aria-hidden="true">02</span><span><strong>Explainable results</strong><small>Methods, limits, and assumptions stay visible</small></span></li>
          <li><span className="proof-icon" aria-hidden="true">03</span><span><strong>Practical next steps</strong><small>Move from a result to a focused guide</small></span></li>
        </ul>
      </div>

      <div className="tools-discovery" aria-label="Find a tool">
        <label className="tools-search-label" htmlFor="tools-search">Search by tool or problem</label>
        <input
          id="tools-search"
          className="tools-search-input"
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Try: battery health, blue screen, frame-time, PSU, video embed…"
          autoComplete="off"
        />
        <div className="tools-filter-row" role="group" aria-label="Filter tools">
          {([
            { value: 'all', label: 'All tools' },
            { value: 'diagnose', label: 'Diagnose problems' },
            { value: 'plan', label: 'Plan upgrades' },
            { value: 'create', label: 'Create content' },
          ] as const).map(option => (
            <button
              key={option.value}
              className={filter === option.value ? 'tools-filter is-active' : 'tools-filter'}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
          <span className="tools-count" aria-live="polite">{filteredTools.length} of {tools.length} tools</span>
        </div>
      </div>

      {visibleGroups.map(group => (
        <div className="tools-group" key={group.id}>
          <h2>{group.heading}</h2>
          <p>{group.intro}</p>
          <div className="article-grid">
            {group.tools.map(tool => (
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

      {filteredTools.length === 0 && (
        <div className="editorial-note tools-empty" role="status">
          <strong>No matching tools yet</strong>
          <p>Try a broader term such as Windows, battery, gaming, memory, storage, power, or video embed.</p>
          <button type="button" className="tools-filter" onClick={() => { setQuery(''); setFilter('all'); }}>Show all tools</button>
        </div>
      )}

      <div className="editorial-note">
        <strong>Use results as evidence, not a verdict</strong>
        <p>Battery capacity depends on what Windows and the laptop manufacturer report. Frame-time captures show when frames were slow, not the root cause. Bottleneck, RAM, storage and PSU calculators are planning aids—not live benchmark databases or compatibility guarantees. Follow the linked guide and verify important decisions against the exact device or component specification.</p>
      </div>
    </section>
  );
}
