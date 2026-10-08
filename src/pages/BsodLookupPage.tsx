import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { BSOD_BASE_PATH, bsodCategoryLabels, bsodEntries, bsodPath, searchBsod, shortHex, type BsodCategory } from '../data/bsod';
import { toolByPath } from '../data/tools';
import { FaqSection } from '../components/FaqSection';
import { trackMonetization } from '../lib/analytics';

const categoryOrder: BsodCategory[] = ['drivers', 'graphics', 'memory', 'storage', 'boot', 'hardware', 'system'];

export function BsodLookupPage() {
  const tool = toolByPath.get(BSOD_BASE_PATH)!;
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchBsod(query), [query]);
  const searching = query.trim().length > 0;

  const onSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length === 3) trackMonetization('tool_used', { tool: 'bsod_lookup' });
  };

  return <section className="section tool-page bsod-page">
    <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={BSOD_BASE_PATH} />
    <span className="eyebrow">FREE LOOKUP TOOL</span>
    <h1>BSOD Error Code Lookup</h1>
    <p className="page-intro">Type the stop code from your Windows blue screen, either the name (CRITICAL_PROCESS_DIED) or the hex value (0xEF), to see what it means, what usually causes it and the safest order of fixes.</p>

    <div className="bsod-search" role="search">
      <label htmlFor="bsod-query">Stop code, hex value or words from the blue screen</label>
      <input
        id="bsod-query"
        type="search"
        value={query}
        onChange={event => onSearch(event.target.value)}
        placeholder="For example 0x7E, page fault, or VIDEO_TDR_FAILURE"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="bsod-count" aria-live="polite">
        {searching ? (results.length ? `${results.length} matching code${results.length === 1 ? '' : 's'}` : 'No matching code in this lookup.') : `${bsodEntries.length} common stop codes`}
      </p>
    </div>

    {searching && results.length === 0 && <div className="editorial-note">
      <strong>Code not listed yet</strong>
      <p>This lookup covers the most common stop codes. Check the spelling, or read how to find and interpret a stop code in our <Link className="text-link" to="/windows-11-blue-screen-stop-code-how-to-read">blue screen guide</Link>.</p>
    </div>}

    {searching
      ? <div className="bsod-grid">{results.map(entry => <BsodCard key={entry.slug} entry={entry} />)}</div>
      : categoryOrder.map(category => {
        const list = bsodEntries.filter(entry => entry.category === category);
        if (!list.length) return null;
        return <div className="bsod-category" key={category}>
          <h2>{bsodCategoryLabels[category]}</h2>
          <div className="bsod-grid">{list.map(entry => <BsodCard key={entry.slug} entry={entry} />)}</div>
        </div>;
      })}

    <section className="bsod-howto">
      <h2>How to find your stop code</h2>
      <ol className="article-steps">
        <li>Read the blue screen. Windows prints the stop code as text, for example CRITICAL_PROCESS_DIED, and sometimes a line starting with "What failed" that names a driver file.</li>
        <li>If the PC restarted too quickly, open Event Viewer, then Windows Logs, then System, and look for a BugCheck event with ID 1001. It records the code and its parameters.</li>
        <li>Open Reliability Monitor (search for it in Start) to see the date and time of each critical failure and whether it followed a change such as an update or driver install.</li>
        <li>Write down what you changed recently and whether the crash happens during gaming, idle, sleep or start-up. That context matters as much as the code.</li>
      </ol>
      <div className="editorial-note">
        <strong>Before you start fixing</strong>
        <p>A stop code names a type of failure, not always its cause. Back up important files first, make one change at a time, and avoid registry cleaners or "driver updater" programs. For the general approach, see <Link className="text-link" to="/windows-troubleshooting-complete-guide">Windows troubleshooting: the complete guide</Link>.</p>
      </div>
    </section>

    <FaqSection items={tool.faq || []} />
  </section>;
}

function BsodCard({ entry }: { entry: (typeof bsodEntries)[number] }) {
  return <article className="article-card bsod-card">
    <div className="card-topline">
      <span className="bsod-hex">{shortHex(entry.hex)}</span>
      <span className="reading-time">{entry.hex}</span>
    </div>
    <h3><Link to={bsodPath(entry.slug)}>{entry.name}</Link></h3>
    <p>{entry.summary}</p>
    <Link className="text-link" to={bsodPath(entry.slug)}>Causes and fixes →</Link>
  </article>;
}
