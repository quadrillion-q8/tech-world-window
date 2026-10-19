import { useState, useRef, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { toolByPath } from '../data/tools';
import { FaqSection } from '../components/FaqSection';
import { trackMonetization } from '../lib/analytics';

const TOOL_PATH = '/tools/windows-repair-log-analyzer';
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_SCAN_CHARS = 350_000;

type RepairFinding = {
  key: string;
  title: string;
  level: 'Error pattern' | 'Warning pattern' | 'Success marker';
  explanation: string;
  count: number;
  examples: { line: number; text: string }[];
};

type RepairCode = { code: string; count: number; example: string };

type RepairReport = {
  family: string;
  linesScanned: number;
  truncated: boolean;
  codes: RepairCode[];
  findings: RepairFinding[];
  relevantLines: { line: number; text: string }[];
};

const RULES: {
  key: string;
  title: string;
  level: RepairFinding['level'];
  pattern: RegExp;
  explanation: string;
}[] = [
  {
    key: 'repair-source',
    title: 'Repair-source or component files may be missing',
    level: 'Warning pattern',
    pattern: /0x800f081f|0x800f0906|source files could not be found|payload files are missing|repair content is missing/i,
    explanation: 'These signals can occur when Windows servicing cannot find suitable source files. Confirm the installed Windows edition, language and release before choosing matching repair media; this pattern alone does not prove why the source is unavailable.',
  },
  {
    key: 'update-failure',
    title: 'Windows Update failure signals',
    level: 'Error pattern',
    pattern: /WU_E_[A-Z0-9_]+|0x802[0-9a-f]{5,}|windows update.{0,50}(failed|failure|error)|update installation failed/i,
    explanation: 'The line contains a known Windows Update error family or failure phrase. Note the full code and nearby timestamp, then compare multiple occurrences before changing update components.',
  },
  {
    key: 'access-denied',
    title: 'Permission or access-denied signals',
    level: 'Error pattern',
    pattern: /0x80070005|access is denied|access denied|permission denied/i,
    explanation: 'Access failures can involve permissions, security software or a servicing process that cannot open a resource. Do not disable security software broadly; check the exact resource and the matching event first.',
  },
  {
    key: 'component-store',
    title: 'Component-store corruption or repair failure signals',
    level: 'Error pattern',
    pattern: /CBS_E_CORRUPT|corruption detected|component store.{0,40}corrupt|cannot repair|could not repair|repair failed|corrupt(?:ed)? file/i,
    explanation: 'The text contains a corruption or repair-failure phrase. Determine whether the message is a final result, an intermediate attempt, or an old entry; a matching line does not establish that corruption remains present.',
  },
  {
    key: 'package-failure',
    title: 'Package or servicing-operation failure signals',
    level: 'Error pattern',
    pattern: /CBS_E_[A-Z0-9_]+|DISM_E_[A-Z0-9_]+|failed to.{0,60}package|package.{0,60}(failed|failure|error)|servicing stack.{0,50}(failed|error)/i,
    explanation: 'A package or servicing operation appears to have failed. The package identity, operation phase, timestamp and code on surrounding lines often matter more than an isolated message.',
  },
  {
    key: 'connectivity',
    title: 'Timeout or update-connectivity signals',
    level: 'Warning pattern',
    pattern: /0x802440|0x80072ee2|timed? out|timeout|connection.{0,40}failed|name resolution/i,
    explanation: 'This may point to a timeout or connectivity condition, but the same words can appear in unrelated context. Check the date/time, network, proxy/VPN and whether the error repeats.',
  },
  {
    key: 'restart-pending',
    title: 'Restart or pending-servicing signals',
    level: 'Warning pattern',
    pattern: /pending.{0,30}(restart|reboot)|(?:restart|reboot).{0,30}required/i,
    explanation: 'The log mentions work that may require a restart. Save work and follow Windows’ own restart state; do not interrupt a servicing operation that is still actively progressing.',
  },
  {
    key: 'success-marker',
    title: 'A successful repair or clean-state marker appears',
    level: 'Success marker',
    pattern: /the restore operation completed successfully|no component store corruption detected|no corruption detected|operation completed successfully/i,
    explanation: 'A success phrase was found in the scanned text. Check its timestamp and context; an old success line does not cancel a later failure in the same log.',
  },
];

function detectLogFamily(text: string, fileName: string): string {
  const sample = (fileName + '\n' + text.slice(0, 20000)).toLowerCase();
  const found: string[] = [];
  if (/cbs\.log|\[sr\]|\bcsi\s+\d|component-based servicing/.test(sample)) found.push('CBS servicing log');
  if (/dism\.log|dism\.exe|dism package manager|deployment image servicing/.test(sample)) found.push('DISM servicing log');
  if (/windowsupdate\.log|windows update|wu_e_|wuauserv/.test(sample)) found.push('Windows Update log');
  if (/<event\b|eventid|event id\s*[:=]/.test(sample)) found.push('Event Viewer text export');
  return found.length ? found.join(' + ') : 'General or mixed Windows text log';
}

function analyzeRepairLog(input: string, fileName: string): RepairReport {
  const textWasLimited = input.length > MAX_SCAN_CHARS;
  const text = textWasLimited ? input.slice(-MAX_SCAN_CHARS) : input;
  const allLines = text.split(/\r\n|\n|\r/).filter(line => line.trim());
  const truncated = textWasLimited || allLines.length > 10000;
  const lines = allLines.slice(-10000);
  const family = detectLogFamily(text, fileName);
  const codeMap = new Map<string, { count: number; example: string }>();

  lines.forEach(line => {
    const matches = line.match(/\b0x[0-9a-f]{8}\b|\b(?:CBS|DISM|WU)_E_[A-Z0-9_]+\b/gi) || [];
    matches.forEach(raw => {
      const code = raw.toUpperCase();
      const current = codeMap.get(code);
      if (current) current.count += 1;
      else codeMap.set(code, { count: 1, example: line.trim().slice(0, 240) });
    });
  });

  const findings: RepairFinding[] = RULES.flatMap(rule => {
    const matches: { line: number; text: string }[] = [];
    lines.forEach((line, index) => {
      if (rule.pattern.test(line)) matches.push({ line: index + 1, text: line.trim().slice(0, 240) });
    });
    if (!matches.length) return [];
    return [{
      key: rule.key,
      title: rule.title,
      level: rule.level,
      explanation: rule.explanation,
      count: matches.length,
      examples: matches.slice(0, 4),
    }];
  });

  const relevantLines = lines.flatMap((line, index) =>
    /error|failed|failure|warning|corrupt|0x[0-9a-f]{8}|CBS_E_|DISM_E_|WU_E_|restart required/i.test(line)
      ? [{ line: index + 1, text: line.trim().slice(0, 240) }]
      : []
  ).slice(0, 18);

  return {
    family,
    linesScanned: lines.length,
    truncated,
    codes: [...codeMap.entries()].map(([code, data]) => ({ code, count: data.count, example: data.example }))
      .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code)).slice(0, 10),
    findings,
    relevantLines,
  };
}

function reportAsText(report: RepairReport, fileName: string): string {
  return [
    'TECH WORLD WINDOW — WINDOWS REPAIR LOG SCAN',
    '===========================================',
    'Source label: ' + fileName,
    'Detected family: ' + report.family,
    'Non-empty lines scanned: ' + report.linesScanned,
    'Scanned window limited: ' + (report.truncated ? 'Yes — only a recent excerpt' : 'No'),
    '',
    'RECOGNIZED ERROR CODES',
    '----------------------',
    ...(report.codes.length ? report.codes.map(item => item.code + ' — ' + item.count + ' matching line(s)\n  Example: ' + item.example) : ['No recognized HRESULT or CBS/DISM/WU symbolic codes found.']),
    '',
    'PATTERN FINDINGS',
    '----------------',
    ...(report.findings.length ? report.findings.map(item => '[' + item.level + '] ' + item.title + ' (' + item.count + ' line(s))\n' + item.explanation + '\n' + item.examples.map(ex => 'Line ' + ex.line + ': ' + ex.text).join('\n')) : ['No pattern in the current rule set matched. This does not prove that the log is clean or repair succeeded.']),
    '',
    'LIMITATIONS',
    '-----------',
    'This is a local text-pattern scan, not a Windows repair and not a proof of root cause. Binary EVTX/ETL files and dump files are not parsed. No file contents are uploaded.',
  ].join('\n');
}

export function WindowsRepairLogAnalyzerPage() {
  const tool = toolByPath.get(TOOL_PATH)!;
  const fileRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState('');
  const [fileName, setFileName] = useState('pasted log text');
  const [sourceTrimmed, setSourceTrimmed] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState<RepairReport | null>(null);
  const [actionMessage, setActionMessage] = useState('');

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    if (/\.(evtx|etl|dmp|zip|cab)$/i.test(file.name)) {
      setError('Binary EVTX/ETL files, memory dumps and archives are not supported. Export Event Viewer events as XML or CSV, or select a text log.');
      input.value = '';
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('This file exceeds 10 MB. Export only the relevant event range or use a smaller text excerpt.');
      input.value = '';
      return;
    }
    try {
      const content = await file.text();
      if (!content.trim()) {
        setError('The selected file is empty or could not be interpreted as text.');
        return;
      }
      setSourceTrimmed(content.length > MAX_SCAN_CHARS);
      setSource(content.length > MAX_SCAN_CHARS ? content.slice(-MAX_SCAN_CHARS) : content);
      setFileName(file.name);
      setReport(null);
      setError('');
      setActionMessage('');
      trackMonetization('tool_used', { tool: 'windows_repair_log_analyzer', method: 'file' });
    } catch {
      setError('The file could not be read. Export the relevant log as TXT, CSV or XML and try again.');
    } finally {
      input.value = '';
    }
  };

  const onAnalyze = () => {
    if (!source.trim()) {
      setError('Choose a supported text log or paste a relevant excerpt first.');
      setReport(null);
      return;
    }
    setError('');
    setActionMessage('');
    const result = analyzeRepairLog(source, fileName);
    if (sourceTrimmed) result.truncated = true;
    setReport(result);
    trackMonetization('tool_completed', { tool: 'windows_repair_log_analyzer', size: result.linesScanned > 5000 ? '5k+' : result.linesScanned > 1000 ? '1k-5k' : 'under-1k' });
  };

  const onClear = () => {
    setSource('');
    setFileName('pasted log text');
    setSourceTrimmed(false);
    setError('');
    setReport(null);
    setActionMessage('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const onCopy = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(reportAsText(report, fileName));
      setActionMessage('Report copied. It stays on this device unless you choose to share it.');
    } catch {
      setActionMessage('Copy was blocked by the browser. You can still download the report.');
    }
  };

  const onDownload = () => {
    if (!report) return;
    const blob = new Blob([reportAsText(report, fileName)], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = 'windows-repair-log-scan-' + new Date().toISOString().slice(0, 10) + '.txt';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  return <section className="section tool-page repair-log-page">
    <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={TOOL_PATH} />
    <div className="breadcrumbs"><Link to="/tools">Tools</Link><span>/</span><span>Windows Repair Log Analyzer</span></div>
    <span className="eyebrow">FREE LOCAL ANALYZER</span>
    <h1>Windows Repair Log Analyzer</h1>
    <p className="page-intro">Scan text exports from CBS.log, DISM.log, Windows Update and Event Viewer for recognizable error codes, repair failures, missing-source clues, permission errors and useful excerpts. Findings are evidence to review, not a guaranteed diagnosis.</p>

    <div className="editorial-note">
      <strong>Private by design — no API key is required</strong>
      <p>Files are not uploaded, and no AI API key is used. Text parsing and the rule-based scan happen in this browser. This tool will not run repair commands or change your computer.</p>
      <p>For performance and safety, selected files must be under 10 MB; scans examine up to the most recent 350,000 characters.</p>
    </div>

    <div className="article-grid">
      <section className="article-card">
        <h2>1. Add a supported log export</h2>
        <div style={{ display: 'grid', gap: '0.55rem', margin: '1rem 0' }}>
          <label htmlFor="repair-log-file"><strong>Choose a log or exported event file</strong></label>
          <input ref={fileRef} id="repair-log-file" type="file" accept=".log,.txt,.csv,.xml,text/plain,text/csv,text/xml" onChange={onFile} />
          <small>Supported: CBS.log, DISM.log, exported WindowsUpdate.log, Event Viewer XML/CSV/TXT. Binary .evtx and .etl are not supported.</small>
        </div>
        <label htmlFor="repair-log-text"><strong>Or paste a focused excerpt</strong></label>
        <textarea
          id="repair-log-text"
          value={source}
          onChange={event => { setSource(event.target.value); setFileName('pasted log text'); setSourceTrimmed(false); setReport(null); setActionMessage(''); }}
          maxLength={MAX_SCAN_CHARS}
          rows={12}
          spellCheck={false}
          placeholder={'Paste the lines around an error, for example 0x800f081f, CBS_E_CORRUPT or a Windows Update failure. Remove usernames, private paths and other sensitive details first.'}
          style={{ width: '100%', boxSizing: 'border-box', padding: '0.9rem', border: '1px solid var(--line)', borderRadius: '10px', font: 'inherit', resize: 'vertical', marginTop: '0.55rem' }}
        />
        <p className="bsod-count">{source.length.toLocaleString('en-US')} / {MAX_SCAN_CHARS.toLocaleString('en-US')} characters</p>
        {error && <p className="editorial-note" role="alert">{error}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1rem' }}>
          <button className="ft-primary" type="button" onClick={onAnalyze}>Analyze locally</button>
          <button className="ft-secondary" type="button" onClick={onClear}>Clear</button>
        </div>
      </section>
    </div>

    {report && <section className="article-body" aria-live="polite">
      <h2>Local scan report</h2>
      <div className="article-grid">
        <article className="article-card"><span className="eyebrow">LOG FAMILY</span><h3>{report.family}</h3><p>{report.linesScanned.toLocaleString('en-US')} non-empty text lines scanned{report.truncated ? '; the scan used a recent text window.' : '.'}</p></article>
        <article className="article-card"><span className="eyebrow">RECOGNIZED CODES</span><h3>{report.codes.length}</h3><p>Unique recognized HRESULT or servicing codes in the scanned window.</p></article>
        <article className="article-card"><span className="eyebrow">RULE FINDINGS</span><h3>{report.findings.length}</h3><p>Different pattern categories matched. Individual matches are not proof of a root cause.</p></article>
      </div>

      {report.truncated && <div className="editorial-note"><strong>Large log window</strong><p>Only the most recent {MAX_SCAN_CHARS.toLocaleString('en-US')} characters were scanned to limit browser work. If the key event happened earlier, export a narrower time range around it.</p></div>}

      <h3>Recognized error codes</h3>
      {report.codes.length
        ? <ul>{report.codes.map(item => <li key={item.code}><strong><code>{item.code}</code></strong> — {item.count} matching line(s)<p><small>{item.example}</small></p></li>)}</ul>
        : <p>No recognized HRESULT or CBS/DISM/WU symbolic code was found. The log may still contain useful text not covered by this rule set.</p>}

      <h3>Pattern findings</h3>
      {report.findings.length
        ? <div className="article-grid">{report.findings.map(finding => <article className="article-card" key={finding.key}>
            <div className="card-topline"><span className="eyebrow">{finding.level}</span><span className="reading-time">{finding.count} matching line(s)</span></div>
            <h4>{finding.title}</h4><p>{finding.explanation}</p>
            <ul>{finding.examples.map((example, index) => <li key={finding.key + '-' + index}><small>Scanned line {example.line}: </small><code style={{ overflowWrap: 'anywhere' }}>{example.text}</code></li>)}</ul>
          </article>)}</div>
        : <div className="editorial-note"><strong>No known pattern matched</strong><p>This is not proof the log is clean or that repair succeeded. Confirm that the right text range was exported, then inspect nearby timestamps and codes manually.</p></div>}

      {report.relevantLines.length > 0 && <><h3>Selected diagnostic lines</h3><ul>{report.relevantLines.map((item, index) => <li key={index}><small>Scanned line {item.line}: </small><code style={{ overflowWrap: 'anywhere' }}>{item.text}</code></li>)}</ul></>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1rem' }}>
        <button className="ft-secondary" type="button" onClick={onCopy}>Copy report</button>
        <button className="ft-secondary" type="button" onClick={onDownload}>Download .txt</button>
      </div>
      {actionMessage && <p role="status">{actionMessage}</p>}
      <div className="editorial-note">
        <strong>Safe next steps</strong>
        <p>Do not run a repair command solely because a phrase matched. Preserve important files and compare the same error code across timestamps before making one reversible change.</p>
        <p>Related help: <Link className="text-link" to="/windows/windows-update-stuck">Windows Update troubleshooting</Link>, <Link className="text-link" to="/tools/windows-troubleshooting-assistant">Windows Troubleshooting Assistant</Link>, and <Link className="text-link" to="/tools/bsod-error-code-lookup">BSOD Error Code Lookup</Link>.</p>
      </div>
    </section>}

    <section className="article-body">
      <h2>Where to get useful Windows logs</h2>
      <ol className="article-steps">
        <li><strong>CBS servicing log:</strong> find CBS.log in the Windows servicing logs and copy only the lines around the timestamp of the failure.</li>
        <li><strong>DISM log:</strong> check the DISM log for the same repair attempt and compare the code and time rather than treating one line as a final result.</li>
        <li><strong>Windows Update:</strong> export a text WindowsUpdate.log or select the relevant update event as XML/CSV from Event Viewer.</li>
        <li><strong>Event Viewer:</strong> export selected events as XML or CSV. This tool does not read the binary .evtx container directly.</li>
      </ol>
      <div className="editorial-note">
        <strong>Privacy reminder</strong>
        <p>Logs may contain account names, file paths, device information or internal network details. Review the text before sharing it with anyone. Although this analyzer does not upload it, remove private information before copying a report elsewhere.</p>
      </div>
    </section>

    <FaqSection items={tool.faq || []} />
  </section>;
}
