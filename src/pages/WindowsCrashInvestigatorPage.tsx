import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaqSection } from '../components/FaqSection';
import { toolByPath } from '../data/tools';
import { SEOEngine } from '../seo/SEOEngine';

const TOOL_PATH = '/tools/windows-crash-investigator';

const symptoms = [
  { value: 'blue-screen', label: 'Blue screen (BSOD)' },
  { value: 'unexpected-restart', label: 'Unexpected restart or power-off' },
  { value: 'boot-failure', label: 'Windows fails to start' },
  { value: 'driver-crash', label: 'Possible driver crash' },
  { value: 'game-crash', label: 'Crash during a PC game or workload' },
  { value: 'freeze', label: 'Freeze followed by a restart' },
  { value: 'other', label: 'Other Windows crash' },
] as const;

type AnalysisResponse = { report?: string; error?: string };
type AnalysisStatus = 'idle' | 'loading' | 'done';

export function WindowsCrashInvestigatorPage() {
  const tool = toolByPath.get(TOOL_PATH)!;
  const [symptom, setSymptom] = useState<string>('blue-screen');
  const [windowsVersion, setWindowsVersion] = useState('Windows 11');
  const [stopCode, setStopCode] = useState('');
  const [failedComponent, setFailedComponent] = useState('');
  const [frequency, setFrequency] = useState('repeats');
  const [recentChanges, setRecentChanges] = useState('');
  const [evidence, setEvidence] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [error, setError] = useState('');
  const [report, setReport] = useState('');
  const [copyState, setCopyState] = useState('');

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setCopyState('');

    if (!consent) {
      setError('Please read the data-sharing notice and confirm consent before submitting.');
      return;
    }
    if (!stopCode.trim() && !failedComponent.trim() && evidence.trim().length < 40 && recentChanges.trim().length < 40) {
      setError('Add a stop code, a failed component, meaningful recent-change details, or at least a short excerpt of diagnostic evidence.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/pc-investigator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent,
          symptom,
          windowsVersion,
          stopCode,
          failedComponent,
          frequency,
          recentChanges,
          evidence,
        }),
      });
      const payload = await response.json() as AnalysisResponse;
      if (!response.ok) throw new Error(payload.error || 'The analysis request could not be completed. Please try again.');
      if (!payload.report || typeof payload.report !== 'string') {
        throw new Error('The AI service returned an empty report. Please try again with a smaller excerpt.');
      }
      setReport(payload.report);
      setStatus('done');
    } catch (caught) {
      setStatus('idle');
      setError(caught instanceof Error ? caught.message : 'An unexpected error occurred. Please try again.');
    }
  }

  async function copyReport() {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
      setCopyState('Report copied.');
    } catch {
      setCopyState('Automatic copying was blocked by this browser. Select the report text and copy it manually.');
    }
  }

  function downloadReport() {
    if (!report) return;
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tww-windows-crash-investigation.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function clearReport() {
    setReport('');
    setStatus('idle');
    setError('');
    setCopyState('');
  }

  return (
    <section className="section tool-page wci-page">
      <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={TOOL_PATH} />
      <span className="eyebrow">AI-ASSISTED WINDOWS DIAGNOSTICS</span>
      <h1>AI Windows Crash Investigator</h1>
      <p className="page-intro">Turn a blue-screen stop code, selected Event Viewer details or WinDbg analysis text into a ranked evidence review—with uncertainty and safe next checks kept visible.</p>

      <div className="wci-privacy" role="note">
        <strong>Evidence first. No automatic PC access.</strong>
        <p>This tool does not scan your computer, accept full .dmp files, execute commands or repair Windows. To create a report, the text you submit is sent to an AI provider through Tech World Window's server. TWW does not save the submitted text to a database, but provider processing and retention depend on the provider terms and configuration.</p>
        <p><strong>Before submitting:</strong> remove account names, email addresses, device serial numbers, private file paths, IP addresses, license keys and any confidential information. Submit only the excerpt needed for troubleshooting.</p>
      </div>

      <form className="wci-form" onSubmit={analyze}>
        <div className="wci-grid">
          <div className="wci-panel">
            <h2>1. Describe the crash</h2>
            <div className="wci-field">
              <label htmlFor="wci-symptom">Main symptom</label>
              <select id="wci-symptom" value={symptom} onChange={event => setSymptom(event.target.value)}>
                {symptoms.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </div>
            <div className="wci-field">
              <label htmlFor="wci-windows">Windows version</label>
              <select id="wci-windows" value={windowsVersion} onChange={event => setWindowsVersion(event.target.value)}>
                <option>Windows 11</option>
                <option>Windows 10</option>
                <option>Windows 10 or 11 (not sure)</option>
                <option>Other / not sure</option>
              </select>
            </div>
            <div className="wci-field">
              <label htmlFor="wci-stop-code">Stop code or bug-check code</label>
              <input id="wci-stop-code" value={stopCode} onChange={event => setStopCode(event.target.value)} maxLength={100} placeholder="e.g. MEMORY_MANAGEMENT or 0x0000001A" autoComplete="off" />
              <small>Use the exact name or hexadecimal code shown by Windows.</small>
            </div>
            <div className="wci-field">
              <label htmlFor="wci-failed-component">“What failed” driver or component (if shown)</label>
              <input id="wci-failed-component" value={failedComponent} onChange={event => setFailedComponent(event.target.value)} maxLength={120} placeholder="e.g. example.sys (only if actually shown)" autoComplete="off" />
            </div>
            <div className="wci-field">
              <label htmlFor="wci-frequency">When does it happen?</label>
              <select id="wci-frequency" value={frequency} onChange={event => setFrequency(event.target.value)}>
                <option value="once">It happened once</option>
                <option value="repeats">It repeats unpredictably</option>
                <option value="after-update">After a Windows, driver or app update</option>
                <option value="under-load">During gaming or heavy workload</option>
                <option value="idle">While idle or waking from sleep</option>
                <option value="startup">During startup or sign-in</option>
                <option value="other">Other / unknown</option>
              </select>
            </div>
            <div className="wci-field">
              <label htmlFor="wci-changes">Recent changes and symptoms</label>
              <textarea id="wci-changes" value={recentChanges} onChange={event => setRecentChanges(event.target.value)} rows={5} maxLength={1600} placeholder="What changed shortly before the crash? Does it happen in the same conditions? Any unusual heat, noises or hardware changes?" />
              <small>{recentChanges.length}/1600 characters</small>
            </div>
          </div>

          <div className="wci-panel">
            <h2>2. Add diagnostic evidence</h2>
            <div className="wci-evidence-help">
              <strong>Best source: WinDbg analysis text</strong>
              <p>If a crash dump is available, open it with WinDbg and copy the relevant text output from !analyze -v. Do not upload the full dump file here.</p>
              <strong>Other useful source</strong>
              <p>In Event Viewer, open Windows Logs → System and copy the relevant BugCheck event (often Event ID 1001) or nearby crash-related details. Remove identifiers and private paths first.</p>
            </div>
            <div className="wci-field">
              <label htmlFor="wci-evidence">Paste selected crash or event text</label>
              <textarea id="wci-evidence" className="wci-evidence-input" value={evidence} onChange={event => setEvidence(event.target.value)} rows={14} maxLength={16000} placeholder="Paste only relevant, redacted text. Stop-code details and a focused excerpt are better than unrelated log history." />
              <small>{evidence.length.toLocaleString()}/16,000 characters. Full .dmp uploads are not supported.</small>
            </div>
            <details className="wci-details">
              <summary>What should I remove before submitting?</summary>
              <p>Remove usernames, email addresses, serial numbers, private paths, IP addresses, access tokens and business/customer data. Do not paste passwords or other secrets. If in doubt, submit only the stop code and a short event summary.</p>
            </details>
          </div>
        </div>

        <div className="wci-consent">
          <label>
            <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />
            <span>I understand that the diagnostic text entered above will be sent to an AI provider through Tech World Window's server to generate this report.</span>
          </label>
        </div>

        {error && <p className="wci-error" role="alert">{error}</p>}

        <div className="wci-actions">
          <button className="ft-primary" type="submit" disabled={!consent || status === 'loading'}>
            {status === 'loading' ? 'Analyzing evidence…' : 'Analyze crash evidence'}
          </button>
          <p>Submissions are limited in size and rate. The report may be wrong; verify important steps against the linked Microsoft documentation.</p>
        </div>
      </form>

      {status === 'loading' && (
        <div className="wci-progress" role="status" aria-live="polite">
          <strong>Reviewing the evidence</strong>
          <p>The investigator is looking for directly supported clues, alternative explanations and missing information. It does not run tests on your PC.</p>
        </div>
      )}

      {report && (
        <section className="wci-report" aria-labelledby="wci-report-title">
          <div className="wci-report-heading">
            <div>
              <span className="eyebrow">AI-GENERATED ANALYSIS</span>
              <h2 id="wci-report-title">Investigation report</h2>
            </div>
            <div className="wci-report-actions">
              <button type="button" className="ft-secondary" onClick={copyReport}>Copy report</button>
              <button type="button" className="ft-secondary" onClick={downloadReport}>Download .txt</button>
              <button type="button" className="ft-secondary" onClick={clearReport}>Clear report</button>
            </div>
          </div>
          {copyState && <p className="wci-status" role="status">{copyState}</p>}
          <pre className="wci-report-text">{report}</pre>
          <p className="wci-caveat">This is a hypothesis report, not proof that a specific driver or component is faulty. Back up important files before troubleshooting and stop if you suspect storage failure or electrical damage.</p>
        </section>
      )}

      <div className="article-body wci-explain">
        <section>
          <h2>How to get a more useful crash report</h2>
          <ol className="article-steps">
            <li>Record the exact stop code and the “What failed” field if Windows displayed one.</li>
            <li>Describe when the crash began, how often it repeats, and any recent driver, firmware, application or hardware changes.</li>
            <li>Paste a focused excerpt from Event Viewer or the text output from WinDbg !analyze -v. Redact personal identifiers first.</li>
            <li>Review the report's evidence and uncertainty, then perform one safe, reversible check at a time.</li>
          </ol>
        </section>
        <section>
          <h2>What this AI tool can—and cannot—tell you</h2>
          <p>The model can summarize supplied evidence, compare plausible explanations and suggest what to check next. It cannot inspect your actual computer, validate whether a log is complete, prove that a listed driver caused the crash or guarantee that a suggested fix will work. A stop code names a failure type, not always the original cause.</p>
          <p>The tool provides a text response only. It will not run PowerShell, alter the registry, install a driver, update BIOS/UEFI, delete files or reinstall Windows. Be cautious about third-party driver utilities and destructive repair steps.</p>
        </section>
        <section>
          <h2>Microsoft references and related TWW tools</h2>
          <ul className="wci-links">
            <li><a href="https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/stop-code-error-troubleshooting" target="_blank" rel="noreferrer">Microsoft: Advanced troubleshooting for stop-code errors</a></li>
            <li><a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2" target="_blank" rel="noreferrer">Microsoft: Bug-check code reference</a></li>
            <li><Link to="/tools/bsod-error-code-lookup">BSOD Error Code Lookup</Link></li>
            <li><Link to="/tools/windows-troubleshooting-assistant">Windows Troubleshooting Assistant</Link></li>
            <li><Link to="/windows-11-blue-screen-stop-code-how-to-read">Windows blue-screen stop-code guide</Link></li>
          </ul>
        </section>
      </div>

      <FaqSection items={tool.faq || []} />
    </section>
  );
}
