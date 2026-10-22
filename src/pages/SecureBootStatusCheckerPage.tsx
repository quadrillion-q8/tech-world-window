import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { FaqSection } from '../components/FaqSection';
import { toolByPath } from '../data/tools';

const TOOL_PATH = '/tools/secure-boot-status-checker';
const TOOL = toolByPath.get(TOOL_PATH);

const CHECK_SCRIPT = [
  '# Read-only Secure Boot check. It does not change firmware or Windows settings.',
  "$ErrorActionPreference = 'Continue'",
  "$secureBootEnabled = 'Unavailable'",
  "try { $secureBootEnabled = [string](Confirm-SecureBootUEFI) } catch { $secureBootEnabled = 'Unavailable: ' + $_.Exception.Message }",
  "$certificateStatus = 'Not found or not exposed'",
  "$servicePath = 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecureBoot\\Servicing'",
  "try { $certificateStatus = [string](Get-ItemPropertyValue -Path $servicePath -Name 'UEFICA2023Status' -ErrorAction Stop) } catch { }",
  '[pscustomobject]@{ SecureBootEnabled = $secureBootEnabled; UEFICA2023Status = $certificateStatus } | Format-List'
].join('\n');

type Assessment = {
  title: string;
  summary: string;
  nextSteps: string[];
  level: 'ok' | 'warning' | 'info';
};

function assessOutput(output: string): Assessment | null {
  const text = output.trim();
  if (!text) return null;
  const lower = text.toLowerCase();

  if (/unable to set proper privileges|access was denied|access is denied|access denied/.test(lower)) {
    return {
      title: 'The Secure Boot check could not read its status',
      summary: 'PowerShell reports an access or privilege error. This is a permissions result, not proof that your certificates are missing.',
      nextSteps: [
        'Open Windows Terminal or Windows PowerShell with Run as administrator, then run the read-only check again.',
        'If the message remains, use the Secure Boot status shown in Windows Security and follow your device maker’s support guidance.'
      ],
      level: 'info'
    };
  }

  if (/cmdlet not supported on this platform|not supported on this platform/.test(lower)) {
    return {
      title: 'Windows could not query Secure Boot through this command',
      summary: 'This can occur on a legacy-BIOS system or on a platform that does not expose the UEFI Secure Boot interface to this cmdlet. The result does not identify the certificate state.',
      nextSteps: [
        'Check whether the PC uses UEFI firmware and supports Secure Boot.',
        'If the PC should support Secure Boot, check Windows Security > Device security > Secure Boot and consult the exact model’s manufacturer documentation.'
      ],
      level: 'info'
    };
  }

  const secureMatch = text.match(/SecureBootEnabled\s*:\s*([^\r\n]+)/i);
  const certificateMatch = text.match(/UEFICA2023Status\s*:\s*([^\r\n]+)/i);
  const secureValue = secureMatch?.[1].trim().toLowerCase();
  const certificateValue = certificateMatch?.[1].trim() || '';
  const certificateUpdated = /^updated\b/i.test(certificateValue);

  if (!secureMatch && !certificateMatch) {
    return {
      title: 'The pasted output could not be recognized',
      summary: 'Paste the complete PowerShell output, including the SecureBootEnabled and UEFICA2023Status fields. The checker only interprets text you provide; it cannot scan the PC directly.',
      nextSteps: [
        'Copy the script again and run it in an elevated PowerShell window.',
        'Paste the full result without editing the field names.'
      ],
      level: 'info'
    };
  }

  if (secureValue === 'true' && certificateUpdated) {
    return {
      title: 'Both reported checks look good',
      summary: 'SecureBootEnabled is True and Windows reports UEFICA2023Status as Updated. This is a positive status check, not a full firmware audit.',
      nextSteps: [
        'Open Windows Security > Device security > Secure Boot and confirm that it does not ask for further action.',
        'Keep Windows Update enabled and check your PC maker’s support page for firmware advisories for your exact model.'
      ],
      level: 'ok'
    };
  }

  if (secureValue === 'false' && certificateUpdated) {
    return {
      title: 'Certificate status says Updated, but Secure Boot is disabled',
      summary: 'These are separate checks. The reported certificate status is Updated, while Windows reports Secure Boot as disabled. Do not toggle firmware settings blindly; verify why it is disabled on this specific PC.',
      nextSteps: [
        'Check Windows Security > Device security > Secure Boot and the manufacturer’s documentation for your exact model.',
        'Before any firmware or Secure Boot change, make sure you can access the correct BitLocker recovery key if device encryption is enabled.'
      ],
      level: 'warning'
    };
  }

  if (secureValue === 'true') {
    return {
      title: 'Secure Boot is enabled, but the certificate update is not confirmed',
      summary: 'SecureBootEnabled is True, but the output does not report UEFICA2023Status as Updated. That does not by itself prove a failure; confirm the device’s status in Windows Security.',
      nextSteps: [
        'Open Windows Security > Device security > Secure Boot and read the status or action message shown there.',
        'Install available Windows updates, restart when prompted, then recheck the status.',
        'If Windows Security says action is needed or the status remains unresolved, follow Microsoft’s guidance and check for a firmware update from your device manufacturer.'
      ],
      level: 'warning'
    };
  }

  if (secureValue === 'false') {
    return {
      title: 'Secure Boot is reported as disabled',
      summary: 'The output reports Secure Boot as False. This does not establish whether it was intentionally disabled, whether the PC supports it, or whether its certificate update has completed.',
      nextSteps: [
        'Check Windows Security > Device security > Secure Boot and consult the manufacturer’s guide for the exact PC or motherboard.',
        'Do not enable, disable, clear, or restore firmware keys as a generic troubleshooting step.',
        'Have the correct BitLocker recovery key available before following any model-specific firmware instructions.'
      ],
      level: 'warning'
    };
  }

  if (certificateUpdated) {
    return {
      title: 'Windows reports the certificate status as Updated',
      summary: 'The certificate-update field says Updated, but the Secure Boot enabled state was not confirmed in the pasted output.',
      nextSteps: [
        'Rerun the script from an elevated PowerShell window.',
        'Confirm the status in Windows Security > Device security > Secure Boot.'
      ],
      level: 'info'
    };
  }

  return {
    title: 'The certificate update needs a closer check',
    summary: 'The pasted output does not confirm UEFICA2023Status as Updated. A missing or different value is not enough to prescribe a firmware change; use Windows Security and the official guidance to decide what applies to this device.',
    nextSteps: [
      'Check Windows Security > Device security > Secure Boot for the device-specific status and recommended action.',
      'Install available Windows updates and restart the PC, then check again.',
      'If action is still needed, use the manufacturer’s instructions for the exact model. Do not disable Secure Boot or clear keys to work around certificate expiration.'
    ],
    level: 'warning'
  };
}

function resultLabel(level: Assessment['level']): string {
  if (level === 'ok') return 'Positive status signal';
  if (level === 'warning') return 'Needs closer attention';
  return 'Could not fully confirm';
}

export function SecureBootStatusCheckerPage() {
  const [output, setOutput] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(CHECK_SCRIPT);
      setCopyMessage('Read-only script copied. Paste it into an elevated PowerShell window on the Windows PC.');
    } catch {
      setCopyMessage('Clipboard access was blocked. Select the script text above and copy it manually.');
    }
  }

  function checkOutput() {
    setAssessment(assessOutput(output));
  }

  function clearOutput() {
    setOutput('');
    setAssessment(null);
  }

  return <section className="section tool-page secure-boot-page">
    <SEOEngine
      title={TOOL?.seoTitle ?? 'Secure Boot Status Checker'}
      description={TOOL?.metaDescription ?? 'Check Windows Secure Boot and 2023 certificate status using read-only PowerShell output.'}
      path={TOOL_PATH}
    />
    <span className="eyebrow secure-boot-page-kicker">FREE WINDOWS SECURITY TOOL</span>
    <h1>Secure Boot Status Checker</h1>
    <p className="page-intro">Check whether Windows reports Secure Boot enabled and whether the 2023 certificate-update status is marked Updated. You run a read-only command on your own PC; this page cannot inspect firmware directly.</p>

    <aside className="secure-boot-privacy" aria-labelledby="secure-boot-privacy-title">
      <div className="secure-boot-privacy-mark" aria-hidden="true">LOCAL<br />ONLY</div>
      <div className="secure-boot-privacy-copy">
        <span className="eyebrow">PRIVACY &amp; SAFETY</span>
        <h2 id="secure-boot-privacy-title">Read-only by design</h2>
        <p>The script reads the Secure Boot state and one Windows status value. It does not enable or disable Secure Boot, write firmware keys, update the BIOS, suspend BitLocker, or send the pasted output to Tech World Window.</p>
      </div>
    </aside>

    <section className="secure-boot-step-card" aria-labelledby="secure-boot-run-title">
      <div className="secure-boot-step-heading">
        <span className="secure-boot-step-number" aria-hidden="true">01</span>
        <div>
          <h2 id="secure-boot-run-title">Run the local check</h2>
          <p>Run this read-only script on the Windows PC you want to check.</p>
        </div>
      </div>
      <ol className="secure-boot-instructions">
        <li>Open Start and search for <strong>Windows Terminal</strong>.</li>
        <li>Choose <strong>Run as administrator</strong>. The Secure Boot cmdlet may require elevated privileges.</li>
        <li>Copy the script below, paste it into PowerShell, and press Enter.</li>
      </ol>
      <div className="secure-boot-code-block">
        <div className="secure-boot-code-heading">
          <span>POWERSHELL</span>
          <span>READ-ONLY CHECK</span>
        </div>
        <pre className="secure-boot-code" tabIndex={0} role="region" aria-label="Read-only PowerShell script"><code>{CHECK_SCRIPT}</code></pre>
      </div>
      <div className="secure-boot-action-row">
        <button type="button" className="button button-primary" onClick={copyScript}>Copy read-only PowerShell check</button>
      </div>
      <p className="secure-boot-copy-status" role="status" aria-live="polite">{copyMessage}</p>
    </section>

    <section className="secure-boot-step-card" aria-labelledby="secure-boot-interpret-title">
      <div className="secure-boot-step-heading">
        <span className="secure-boot-step-number" aria-hidden="true">02</span>
        <div>
          <h2 id="secure-boot-interpret-title">Interpret the result</h2>
          <p>Paste the complete output from PowerShell. It is interpreted locally in this browser tab.</p>
        </div>
      </div>
      <div className="secure-boot-output-field">
        <label htmlFor="secure-boot-output">PowerShell output</label>
        <textarea
          id="secure-boot-output"
          className="secure-boot-output"
          rows={8}
          spellCheck={false}
          value={output}
          onChange={event => {
            setOutput(event.target.value);
            setAssessment(null);
          }}
          aria-describedby="secure-boot-output-help"
          placeholder={'SecureBootEnabled : True\nUEFICA2023Status : Updated'}
        />
        <p id="secure-boot-output-help" className="secure-boot-field-help">Include both fields if available. The checker cannot read firmware directly and does not upload the text you paste.</p>
      </div>
      <div className="secure-boot-output-actions">
        <button type="button" className="button button-primary" onClick={checkOutput} disabled={!output.trim()}>Check my result</button>
        <button type="button" className="button button-secondary secure-boot-clear" onClick={clearOutput} disabled={!output}>Clear output</button>
      </div>
      {assessment && <div className="secure-boot-result" data-level={assessment.level} role="status" aria-live="polite">
        <span className="secure-boot-status-label" data-level={assessment.level}>{resultLabel(assessment.level)}</span>
        <h3>{assessment.title}</h3>
        <p>{assessment.summary}</p>
        <h4>Recommended next steps</h4>
        <ol>{assessment.nextSteps.map(step => <li key={step}>{step}</li>)}</ol>
      </div>}
    </section>

    <section className="secure-boot-reference" aria-labelledby="secure-boot-reference-title">
      <h2 id="secure-boot-reference-title">What this checker can and cannot prove</h2>
      <p><code>Confirm-SecureBootUEFI</code> reports whether Secure Boot is enabled; it does not by itself prove that all replacement certificates are installed. The <code>UEFICA2023Status</code> value is a separate Windows-reported update signal. Cross-check Windows Security for the device’s current status and recommended action.</p>
      <p>Microsoft says devices missing replacement certificates can continue to start and receive standard Windows updates, while missing future protections for early-boot components. The safe response is to check status and apply supported Windows or OEM guidance—not to disable Secure Boot.</p>
      <p>Read the <Link to="/windows-secure-boot-certificate-update">Secure Boot certificate update guide</Link> for interpretation, BitLocker precautions and next steps. For official instructions, see <a href="https://support.microsoft.com/en-us/servicing/os/secure-boot/2026/03/secure-boot-certificate-update-status-in-the-windows-security-app" target="_blank" rel="noreferrer">Microsoft’s Secure Boot status guidance</a>.</p>
    </section>

    <FaqSection items={TOOL?.faq ?? []} />
  </section>;
}
