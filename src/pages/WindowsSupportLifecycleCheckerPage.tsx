import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { FaqSection } from '../components/FaqSection';
import { toolByPath } from '../data/tools';
import {
  DATA_CHECKED,
  WINDOWS_10_END_OF_SUPPORT,
  WINDOWS_10_ENT_LTSC_LIFECYCLE,
  WINDOWS_10_RELEASES,
  WINDOWS_11_RELEASES,
  WINDOWS_LIFECYCLE_FAQ,
  esuRecords,
  records,
  type EditionGroup,
  type EsuMode,
  type LifecycleRecord,
  type OsFamily,
} from '../data/windows-support-lifecycle';

import '../styles/windows-support-lifecycle.css';

const TOOL_PATH = '/tools/windows-support-lifecycle-checker';
function formatDate(value: string): string {
  return new Date(value + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function statusFor(endDate: string): { label: string; className: string } {
  const today = todayIso();
  if (endDate < today) return { label: 'End of updates has passed', className: 'is-ended' };
  if (endDate === today) return { label: 'Last scheduled day of updates', className: 'is-ending' };
  const days = Math.floor((Date.parse(endDate + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000);
  if (days <= 90) return { label: 'Ending soon', className: 'is-ending' };
  return { label: 'Within published servicing window', className: 'is-supported' };
}

function optionsFor(family: OsFamily, edition: EditionGroup): LifecycleRecord[] {
  return records.filter(record => record.family === family && record.edition === edition);
}

export function WindowsSupportLifecycleCheckerPage() {
  const tool = toolByPath.get(TOOL_PATH)!;
  const [family, setFamily] = useState<OsFamily>('Windows 11');
  const [edition, setEdition] = useState<EditionGroup>('homePro');
  const [version, setVersion] = useState('26H2');
  const [esuMode, setEsuMode] = useState<EsuMode>('none');

  const availableEditions = useMemo(() => {
    const ordered: EditionGroup[] = ['homePro', 'enterpriseEducation', 'enterpriseLtsc', 'iotEnterpriseLtsc'];
    return ordered.filter(item => optionsFor(family, item).length > 0);
  }, [family]);

  const availableVersions = useMemo(() => optionsFor(family, edition), [family, edition]);
  const record = availableVersions.find(item => item.version === version) ?? availableVersions[0];
  const isStandardWindows10 = family === 'Windows 10' && (edition === 'homePro' || edition === 'enterpriseEducation');
  const selectedEsu = family === 'Windows 10' && edition === 'homePro' && esuMode === 'consumer'
    ? esuRecords.consumer
    : family === 'Windows 10' && edition === 'enterpriseEducation' && esuMode.startsWith('commercial') && esuMode !== 'none'
      ? esuRecords[esuMode as Exclude<EsuMode, 'none' | 'consumer'>]
      : null;

  const resultEndDate = selectedEsu?.endDate ?? record?.endDate ?? '';
  const status = resultEndDate ? statusFor(resultEndDate) : { label: 'Select a Windows release', className: 'is-neutral' };
  const supportLabel = selectedEsu ? 'ESU coverage end date' : (record?.dateLabel ?? 'End of updates');
  const currentKb = record?.latestKb;
  const isConsumerEsuSelected = family === 'Windows 10' && edition === 'homePro' && esuMode === 'consumer';
  const isCommercialEsuSelected = family === 'Windows 10' && edition === 'enterpriseEducation' && esuMode.startsWith('commercial') && esuMode !== 'none';

  const onFamilyChange = (value: OsFamily) => {
    const firstEdition: EditionGroup = 'homePro';
    const firstVersion = optionsFor(value, firstEdition)[0]?.version ?? '';
    setFamily(value);
    setEdition(firstEdition);
    setVersion(firstVersion);
    setEsuMode('none');
  };

  const onEditionChange = (value: EditionGroup) => {
    const firstVersion = optionsFor(family, value)[0]?.version ?? '';
    setEdition(value);
    setVersion(firstVersion);
    setEsuMode('none');
  };

  const onVersionChange = (value: string) => {
    setVersion(value);
    setEsuMode('none');
  };

  const titleDescription = 'Check the published end-of-updates date for Windows 10 or Windows 11 by version and edition. Compare standard servicing with eligible Windows 10 Extended Security Updates (ESU), see the latest update reference in the current dataset, and choose a safe next step.';

  const guideLink = family === 'Windows 11'
    ? <Link className="text-link" to="/windows-11-26h2-installation-guide">Windows 11 26H2 installation guide</Link>
    : <Link className="text-link" to="/windows-11-26h2-installation-guide">Check Windows 11 installation and compatibility guidance</Link>;

  return <section className="section tool-page support-lifecycle-page">
    <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={TOOL_PATH} />
    <span className="eyebrow">FREE WINDOWS SUPPORT CHECKER</span>
    <h1>Windows Support Lifecycle Checker</h1>
    <p className="page-intro">{titleDescription}</p>

    <div className="lifecycle-privacy">
      <strong>Manual lookup, not a device scan.</strong>
      <p>This tool does not inspect your PC, contact Windows Update, check your license, or verify ESU enrollment. It compares your selections with a dated dataset from official Microsoft lifecycle and release-health tables.</p>
    </div>

    <div className="lifecycle-selector-card">
      <h2>Choose your Windows release</h2>
      <p>Press <code>Win + R</code>, enter <code>winver</code>, and note the Windows version. Check Settings → System → About for the edition. If the device is managed by work or school, ask your administrator whether it uses LTSC or ESU.</p>
      <div className="lifecycle-select-grid">
        <label htmlFor="lifecycle-family">Windows version family
          <select id="lifecycle-family" value={family} onChange={event => onFamilyChange(event.target.value as OsFamily)}>
            <option value="Windows 11">Windows 11</option>
            <option value="Windows 10">Windows 10</option>
          </select>
        </label>
        <label htmlFor="lifecycle-edition">Edition / servicing channel
          <select id="lifecycle-edition" value={edition} onChange={event => onEditionChange(event.target.value as EditionGroup)}>
            {availableEditions.map(item => <option value={item} key={item}>{optionsFor(family, item)[0]?.editionLabel}</option>)}
          </select>
        </label>
        <label htmlFor="lifecycle-release">Release or LTSC year
          <select id="lifecycle-release" value={record?.version ?? version} onChange={event => onVersionChange(event.target.value)}>
            {availableVersions.map(item => <option value={item.version} key={item.version}>{item.versionLabel}</option>)}
          </select>
        </label>
        {isStandardWindows10 && <label htmlFor="lifecycle-esu">Windows 10 ESU enrollment (optional)
          <select id="lifecycle-esu" value={esuMode} onChange={event => setEsuMode(event.target.value as EsuMode)}>
            <option value="none">Not enrolled / not sure</option>
            {edition === 'homePro' && <option value="consumer">Personal device: Consumer ESU enrolled</option>}
            {edition === 'enterpriseEducation' && <>
              <option value="commercial1">Commercial ESU: Year 1</option>
              <option value="commercial2">Commercial ESU: Year 2</option>
              <option value="commercial3">Commercial ESU: Year 3</option>
            </>}
          </select>
        </label>}
      </div>
      <p className="lifecycle-small-note">Data last checked {formatDate(DATA_CHECKED)}. Release dates, KBs, rollout eligibility and ESU terms can change; verify the official Microsoft link before making an upgrade or licensing decision.</p>
    </div>

    {record && <section className="lifecycle-result-card" aria-live="polite" aria-atomic="true">
      <div className="lifecycle-result-head">
        <div>
          <span className="eyebrow">MATCHED SERVICING RECORD</span>
          <h2>{record.family} {record.versionLabel}</h2>
          <p>{record.editionLabel}</p>
        </div>
        <span className={'lifecycle-status ' + (selectedEsu ? 'is-esu ' : '') + status.className}>{selectedEsu ? 'ESU scenario selected' : status.label}</span>
      </div>
      {selectedEsu && <div className="lifecycle-esu-note"><strong>{selectedEsu.label}</strong><p>{selectedEsu.note}</p></div>}
      {!selectedEsu && record.note && <p className="lifecycle-record-note">{record.note}</p>}
      <div className="lifecycle-facts-grid">
        <div className="lifecycle-fact lifecycle-fact-date">
          <span>{supportLabel}</span>
          <strong>{formatDate(resultEndDate)}</strong>
          <small>{selectedEsu ? 'Only applies if the displayed ESU enrollment and eligibility are valid.' : 'Published date for the selected edition and servicing channel.'}</small>
        </div>
        <div className="lifecycle-fact">
          <span>Latest update reference in this snapshot</span>
          <strong>{currentKb ?? 'Check release history'}</strong>
          <small>{record?.latestKbDate ? 'Microsoft release table date: ' + formatDate(record.latestKbDate) : 'A version-specific current KB is not recorded here; follow the official release-history page.'}</small>
        </div>
        <div className="lifecycle-fact">
          <span>What this result means</span>
          <strong>{selectedEsu ? 'Security-only extension' : status.label}</strong>
          <small>{selectedEsu ? 'ESU is not a full product-support extension and does not provide new features.' : 'The tool reports published servicing dates; it cannot confirm installed updates or local policy.'}</small>
        </div>
      </div>
      {record.kbNote && <p className="lifecycle-record-note">{record.kbNote}</p>}

      <div className="lifecycle-next-step">
        <h3>What to do next</h3>
        <ol>
          {(selectedEsu
            ? [
              'Confirm enrollment, licensing and coverage on the device or with your administrator. This checker cannot verify ESU entitlement.',
              'Install the latest eligible security update offered by Windows Update or your managed deployment channel.',
              'Use ESU as a transition period, not as a replacement for planning a supported Windows version.',
            ]
            : record.nextSteps
          ).map((step, index) => <li key={index}>{step}</li>)}
        </ol>
        {(record.family === 'Windows 11' && record.version === '24H2' && record.edition === 'homePro') && <p>{guideLink} explains upgrade prerequisites and safer troubleshooting for eligible devices. Do not bypass a compatibility hold to force a release.</p>}
        {record.family === 'Windows 10' && edition === 'homePro' && !selectedEsu && <p>Microsoft’s <a href={WINDOWS_10_END_OF_SUPPORT} target="_blank" rel="noreferrer">Windows 10 end-of-support guidance</a> explains upgrade eligibility and Consumer ESU options.</p>}
        {record.family === 'Windows 10' && record.edition === 'enterpriseLtsc' && <p>For a managed LTSC device, use the <a className="text-link" href={WINDOWS_10_ENT_LTSC_LIFECYCLE} target="_blank" rel="noreferrer">official LTSC lifecycle record</a> and confirm migration planning with your administrator.</p>}
      </div>

      <div className="lifecycle-source-row">
        <a href={selectedEsu?.sourceUrl ?? record.sourceUrl} target="_blank" rel="noreferrer">Verify this result with Microsoft ↗</a>
        <a href={record.family === 'Windows 11' ? WINDOWS_11_RELEASES : WINDOWS_10_RELEASES} target="_blank" rel="noreferrer">View current release history ↗</a>
        <a href={WINDOWS_LIFECYCLE_FAQ} target="_blank" rel="noreferrer">Windows lifecycle policy FAQ ↗</a>
      </div>
    </section>}

    <div className="article-body lifecycle-explainer">
      <section>
        <h2>Important distinctions this checker accounts for</h2>
        <ul>
          <li><strong>Version is not the same as edition.</strong> Windows 11 Home/Pro and Enterprise/Education versions can have different end-of-updates dates.</li>
          <li><strong>End of updates does not switch the PC off.</strong> Windows can continue to run, but unsupported devices can miss standard security and quality fixes.</li>
          <li><strong>ESU is not normal support.</strong> It is a time-limited security-update program for eligible, enrolled devices; it does not deliver ordinary feature updates or restore full technical support.</li>
          <li><strong>LTSC is a separate product channel.</strong> The long IoT Enterprise LTSC dates must not be applied to regular Home/Pro or standard Enterprise LTSC.</li>
          <li><strong>Dates are edition-specific.</strong> Check the exact product shown by <code>winver</code> and Settings → System → About before acting.</li>
        </ul>
      </section>
      <section>
        <h2>Useful next steps from Tech World Window</h2>
        <ul>
          <li><Link className="text-link" to="/windows-11-26h2-installation-guide">Windows 11 26H2 installation, upgrade and troubleshooting guide</Link></li>
          <li><Link className="text-link" to="/windows-11-26h2-iso-released">Windows 11 26H2 release and ISO information</Link></li>
          <li><Link className="text-link" to="/windows-troubleshooting-complete-guide">Complete Windows troubleshooting guide</Link></li>
          <li><Link className="text-link" to="/tools/windows-troubleshooting-assistant">Windows Troubleshooting Assistant</Link></li>
        </ul>
      </section>
      <section className="lifecycle-method-note">
        <h2>Update method and limitations</h2>
        <p>This is a manually maintained reference dataset, checked on {formatDate(DATA_CHECKED)} against Microsoft release-health and lifecycle pages. The KB shown is the latest update reference in that snapshot, not a guarantee that the package applies to every edition or that it is installed on a particular device. Release information can be published with different date conventions; follow the linked page for the exact release and edition.</p>
        <p>Nothing is scanned, installed, enrolled, changed or uploaded by this page. It cannot diagnose device compatibility, verify licensing, read registry values, confirm update history or check ESU status.</p>
      </section>
    </div>

    <FaqSection items={tool?.faq ?? []} />
  </section>;
}
