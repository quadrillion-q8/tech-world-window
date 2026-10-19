import { useMemo, useState, type ChangeEvent } from 'react';
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
    <p className="page-intro">Search a Windows blue screen (BSOD) stop code by its name, hexadecimal value, or a phrase from the error. Each result explains what Windows detected, common causes, and a safer order of checks for Windows 11 and Windows 10. A stop code narrows the investigation; it does not prove which component is faulty.</p>

    <div className="bsod-search" role="search">
      <label htmlFor="bsod-query">Stop code, hex value or words from the blue screen</label>
      <input
        id="bsod-query"
        type="search"
        value={query}
        onChange={event => onSearch(event.target.value)}
        placeholder="Try 0x7E, memory management, or VIDEO_TDR_FAILURE"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="bsod-count" aria-live="polite">
        {searching ? (results.length ? `${results.length} matching code${results.length === 1 ? '' : 's'}` : 'No matching code in this lookup.') : `${bsodEntries.length} common stop codes`}
      </p>
    </div>

    <p className="bsod-count">Investigating Windows servicing or update failures? <Link className="text-link" to="/tools/windows-repair-log-analyzer">Use the Windows Repair Log Analyzer</Link> for supported CBS, DISM and Windows Update logs.</p>

    <BugCheckEvidenceAnalyzer />

    {searching && results.length === 0 && <div className="editorial-note">
      <strong>Code not listed yet</strong>
      <p>This lookup covers common stop codes, not every possible bug check. Try the code without extra punctuation, search by part of its name, or check the spelling. Our <Link className="text-link" to="/windows-11-blue-screen-stop-code-how-to-read">blue screen stop-code guide</Link> explains where to find the code and how to read it. If you only know the symptom, start with the <Link className="text-link" to="/tools/windows-troubleshooting-assistant">Windows Troubleshooting Assistant</Link>.</p>
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


type BugCheckEvidenceResult = {
  entries: (typeof bsodEntries)[number][];
  sawBugCheck1001: boolean;
  excerpts: string[];
  scannedLines: number;
};

const MAX_EVIDENCE_BYTES = 5 * 1024 * 1024;
const MAX_EVIDENCE_CHARS = 250_000;

function normalizeBugCheckHex(value: string): string {
  return value.replace(/^0x/i, '').replace(/^0+/, '').toUpperCase() || '0';
}

function scanBugCheckText(text: string): BugCheckEvidenceResult {
  const boundedText = text.slice(0, MAX_EVIDENCE_CHARS);
  const found = new Map<string, (typeof bsodEntries)[number]>();
  const knownHex = new Map(bsodEntries.map(entry => [normalizeBugCheckHex(entry.hex), entry]));

  for (const entry of bsodEntries) {
    if (boundedText.toUpperCase().includes(entry.name)) found.set(entry.slug, entry);
  }

  for (const match of boundedText.match(/0x[0-9a-f]{1,8}/gi) || []) {
    const entry = knownHex.get(normalizeBugCheckHex(match));
    if (entry) found.set(entry.slug, entry);
  }

  // Event ID 1001 can store the bug-check code as decimal in XML/CSV exports.
  const decimalCodePattern = /BugcheckCode[\s"'\u003e,;:=]{0,24}(\d{1,10})/gi;
  let decimalMatch: RegExpExecArray | null;
  while ((decimalMatch = decimalCodePattern.exec(boundedText)) !== null) {
    const decimal = Number(decimalMatch[1]);
    if (Number.isSafeInteger(decimal) && decimal > 0 && decimal <= 0xffffffff) {
      const entry = knownHex.get(normalizeBugCheckHex('0x' + decimal.toString(16)));
      if (entry) found.set(entry.slug, entry);
    }
  }

  const rawLines = boundedText.split(/\r\n|\n|\r/).filter(line => line.trim());
  const excerpts = rawLines.filter(line =>
    /bug.?check|bugcheckcode|<eventid|event\s*id\s*[:=]?\s*1001|0x[0-9a-f]{1,8}|stop\s*code/i.test(line)
    || [...found.values()].some(entry => line.toUpperCase().includes(entry.name))
  ).slice(0, 8).map(line => line.trim().slice(0, 260));
  const sawBugCheck1001 = /<EventID[^>]*>\s*1001\s*<\/EventID>|\bEvent\s*ID\s*[:=]?\s*1001\b/i.test(boundedText);

  return { entries: [...found.values()], sawBugCheck1001, excerpts, scannedLines: rawLines.length };
}

function BugCheckEvidenceAnalyzer() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<BugCheckEvidenceResult | null>(null);

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > MAX_EVIDENCE_BYTES) {
      setError('This export is larger than 5 MB. Export only the relevant Event Viewer event or paste a smaller text excerpt.');
      setResult(null);
      input.value = '';
      return;
    }
    try {
      const content = await file.text();
      setText(content.slice(0, MAX_EVIDENCE_CHARS));
      setFileName(file.name);
      setError(content.length > MAX_EVIDENCE_CHARS ? 'Only the first 250,000 characters were loaded for this scan.' : '');
      setResult(null);
      trackMonetization('tool_used', { tool: 'bsod_lookup', method: 'event-file' });
    } catch {
      setError('The file could not be read as text. Export the event as XML, CSV or TXT and try again.');
    } finally {
      input.value = '';
    }
  };

  const onScan = () => {
    if (!text.trim()) {
      setError('Select a text export or paste the relevant Event Viewer evidence first.');
      setResult(null);
      return;
    }
    setError('');
    setResult(scanBugCheckText(text));
    trackMonetization('tool_completed', { tool: 'bsod_lookup', method: fileName ? 'event-file' : 'pasted-evidence' });
  };

  const onClear = () => {
    setText('');
    setFileName('');
    setError('');
    setResult(null);
  };

  return <section className="bsod-howto">
    <h2>Scan Event Viewer evidence locally</h2>
    <p>Paste or select a text-based Event Viewer XML, CSV, TXT or LOG export. The scan looks for known stop codes, decimal BugCheck codes and Event ID 1001 clues; it does not attempt to diagnose every event in the file.</p>
    <div className="editorial-note">
      <strong>Private by design</strong>
      <p>The text is processed in this browser. It is not uploaded, and no AI service or API key is used. Binary .evtx/.dmp files are not supported.</p>
    </div>
    <div className="bsod-search">
      <label htmlFor="bsod-evidence-file">Choose a small text export (maximum 5 MB)</label>
      <input id="bsod-evidence-file" type="file" accept=".xml,.csv,.txt,.log,text/xml,text/csv,text/plain" onChange={onFile} />
      {fileName && <p className="bsod-count">Loaded locally: {fileName}</p>}
      <label htmlFor="bsod-evidence-text">Or paste the event details</label>
      <textarea
        id="bsod-evidence-text"
        value={text}
        onChange={event => { setText(event.target.value); setResult(null); setError(''); setFileName(''); }}
        maxLength={MAX_EVIDENCE_CHARS}
        rows={7}
        spellCheck={false}
        placeholder={'Paste a BugCheck Event ID 1001 or a few relevant Event Viewer XML/CSV lines here.'}
        style={{ width: '100%', boxSizing: 'border-box', padding: '0.9rem', border: '1px solid var(--line)', borderRadius: '10px', font: 'inherit', resize: 'vertical' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '0.7rem' }}>
        <button className="ft-primary" type="button" onClick={onScan}>Scan evidence</button>
        <button className="ft-secondary" type="button" onClick={onClear}>Clear</button>
      </div>
      {error && <p role="alert" className="editorial-note">{error}</p>}
    </div>

    {result && <div className="article-body">
      <h3>Scan summary</h3>
      <p>Scanned {result.scannedLines.toLocaleString('en-US')} non-empty text lines. {result.sawBugCheck1001 ? 'An Event ID 1001 marker was found; confirm that its provider/source is BugCheck before relying on it.' : 'No clear Event ID 1001 marker was recognized.'}</p>
      {result.entries.length
        ? <><h3>Recognized stop-code matches</h3><div className="bsod-grid">{result.entries.map(entry => <BsodCard key={entry.slug} entry={entry} />)}</div></>
        : <div className="editorial-note"><strong>No known stop code was recognized</strong><p>The export may not include a stop code, the value may be stored in an unsupported format, or the code may not be in this lookup. This does not mean the log is clean or that a particular component is healthy.</p></div>}
      {result.excerpts.length > 0 && <><h3>Relevant text lines</h3><ul>{result.excerpts.map((line, index) => <li key={index}><code style={{ overflowWrap: 'anywhere' }}>{line}</code></li>)}</ul></>}
    </div>}
  </section>;
}
