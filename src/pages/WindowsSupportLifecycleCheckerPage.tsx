import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { FaqSection } from '../components/FaqSection';
import { toolByPath } from '../data/tools';
import '../styles/windows-support-lifecycle.css';

const TOOL_PATH = '/tools/windows-support-lifecycle-checker';
const DATA_CHECKED = '2026-10-22';
const WINDOWS_11_RELEASES = 'https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information';
const WINDOWS_10_RELEASES = 'https://learn.microsoft.com/en-us/windows/release-health/release-information';
const WINDOWS_LIFECYCLE_FAQ = 'https://learn.microsoft.com/en-us/lifecycle/faq/windows';
const WINDOWS_10_END_OF_SUPPORT = 'https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025';
const WINDOWS_10_ESU = 'https://support.microsoft.com/en-us/servicing/os/windows-10/2025/10/windows-10-extended-security-updates-esu-program';
const WINDOWS_10_CONSUMER_ESU = 'https://blogs.windows.com/windowsexperience/2025/06/24/stay-secure-with-windows-11-copilot-pcs-and-windows-365-before-support-ends-for-windows-10/';
const WINDOWS_11_HOME_PRO_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-home-and-pro';
const WINDOWS_11_ENT_EDU_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-enterprise-and-education-version-21h2';
const WINDOWS_10_HOME_PRO_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro';
const WINDOWS_10_ENT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-10-enterprise-ltsc-2021';
const WINDOWS_10_IOT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-10-iot-enterprise-ltsc-2021';
const WINDOWS_11_ENT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-enterprise-ltsc-2024';
const WINDOWS_11_IOT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-iot-enterprise-ltsc-2024';

type OsFamily = 'Windows 11' | 'Windows 10';
type EditionGroup = 'homePro' | 'enterpriseEducation' | 'enterpriseLtsc' | 'iotEnterpriseLtsc';
type LifecycleRecord = {
  family: OsFamily;
  version: string;
  versionLabel: string;
  edition: EditionGroup;
  editionLabel: string;
  endDate: string;
  dateLabel: 'End of updates' | 'End of servicing';
  latestKb?: string;
  latestKbDate?: string;
  kbNote?: string;
  note?: string;
  nextSteps: string[];
  sourceUrl: string;
};

const records: LifecycleRecord[] = [
  {
    family: 'Windows 11', version: '26H2', versionLabel: 'Version 26H2', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2028-10-10', dateLabel: 'End of updates',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    note: 'Version 26H2 reached general availability on 29 September 2026. Availability is phased and can depend on device eligibility and rollout safeguards.',
    nextSteps: ['Keep Windows Update enabled and install monthly security updates.', 'If 26H2 is not offered, check Windows Update and the device maker guidance instead of forcing an ISO installation or bypassing compatibility safeguards.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '26H2', versionLabel: 'Version 26H2', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education / Enterprise multi-session', endDate: '2029-10-09', dateLabel: 'End of updates',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    note: 'The Enterprise/Education servicing window is longer than the Home/Pro window. Organization-managed devices may follow update policies set by IT.',
    nextSteps: ['Confirm the device is following the organization’s update policy.', 'Plan the next feature update before this servicing deadline and keep current security updates installed.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '26H1', versionLabel: 'Version 26H1', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2028-03-14', dateLabel: 'End of updates',
    latestKb: 'KB5127646', latestKbDate: '2026-10-13',
    note: '26H1 is a device-specific release path. Microsoft says it is not offered as an in-place update from Windows 11 24H2 or 25H2 on existing devices; do not treat it as the universal upgrade target.',
    nextSteps: ['Use Windows Update to see which update Microsoft offers for this specific device.', 'Do not force an edition or release installation merely because another version has a later end date.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '26H1', versionLabel: 'Version 26H1', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education / Enterprise multi-session', endDate: '2029-03-13', dateLabel: 'End of updates',
    latestKb: 'KB5127646', latestKbDate: '2026-10-13',
    note: '26H1 has a device-specific availability path and is not a general in-place upgrade from 24H2 or 25H2. IoT Enterprise is not supported on this release.',
    nextSteps: ['Confirm the deployment target with the OEM or your IT administrator.', 'Follow the update offer shown for the device; do not bypass hardware or deployment safeguards.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '25H2', versionLabel: 'Version 25H2', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2027-10-12', dateLabel: 'End of updates',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    nextSteps: ['Install the latest monthly security update offered in Windows Update.', 'Review the next supported feature-update offer before October 2027.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '25H2', versionLabel: 'Version 25H2', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education / Enterprise multi-session', endDate: '2028-10-10', dateLabel: 'End of updates',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    nextSteps: ['Install current monthly security updates according to organizational policy.', 'Schedule the next supported feature update ahead of the October 2028 deadline.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '24H2', versionLabel: 'Version 24H2', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2026-10-13', dateLabel: 'End of updates',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    kbNote: 'KB5127648 is the latest release-line update listed in Microsoft’s October table. Its listing does not restore standard servicing for Home/Pro after their end-of-updates date.',
    note: 'Microsoft’s current release-health table marks Home/Pro updates as ended for 24H2. Enterprise/Education editions have a separate servicing deadline in October 2027.',
    nextSteps: ['Open Settings → Windows Update → Check for updates and install the eligible feature update offered for this PC.', 'Back up important files first. Rollouts can be phased; do not bypass a compatibility hold or install an image intended for a different device.', 'If the upgrade fails, use the existing Windows 11 installation guide to work through prerequisites and safe checks.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '24H2', versionLabel: 'Version 24H2', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education / Enterprise multi-session', endDate: '2027-10-12', dateLabel: 'End of updates',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    note: 'Enterprise and Education have a different, longer servicing window from Home/Pro for this release.',
    nextSteps: ['Keep monthly security updates current.', 'If this is organization-managed, coordinate the next feature update with IT before October 2027.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '23H2', versionLabel: 'Version 23H2', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2025-11-11', dateLabel: 'End of updates',
    nextSteps: ['Move to a currently supported Windows 11 release offered for this device.', 'Back up important files and use Windows Update or official Microsoft installation guidance; do not bypass compatibility requirements.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '23H2', versionLabel: 'Version 23H2', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education / Enterprise multi-session', endDate: '2026-11-10', dateLabel: 'End of updates',
    latestKb: 'KB5126653', latestKbDate: '2026-10-13',
    note: 'The Enterprise/Education release is nearing end of updates. The 23H2 Home/Pro servicing window ended earlier.',
    nextSteps: ['Start a move to a supported release before 10 November 2026.', 'For managed devices, confirm app compatibility, deployment rings and update timing with IT.'],
    sourceUrl: WINDOWS_11_RELEASES,
  },
  {
    family: 'Windows 11', version: '22H2', versionLabel: 'Version 22H2', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2024-10-08', dateLabel: 'End of updates',
    nextSteps: ['This release is long out of servicing. Move to a supported Windows version after confirming device eligibility and backing up important files.'],
    sourceUrl: WINDOWS_11_HOME_PRO_LIFECYCLE,
  },
  {
    family: 'Windows 11', version: '22H2', versionLabel: 'Version 22H2', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education / Enterprise multi-session', endDate: '2025-10-14', dateLabel: 'End of updates',
    nextSteps: ['This release is out of servicing. Plan a supported feature update with your organization and confirm app compatibility.'],
    sourceUrl: WINDOWS_11_ENT_EDU_LIFECYCLE,
  },
  {
    family: 'Windows 11', version: '2024 LTSC', versionLabel: 'Enterprise LTSC 2024 (24H2)', edition: 'enterpriseLtsc',
    editionLabel: 'Windows 11 Enterprise LTSC 2024', endDate: '2029-10-09', dateLabel: 'End of servicing',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    note: 'LTSC is intended for specialized devices. Enterprise LTSC 2024 does not receive the IoT edition’s extended servicing through 2034.',
    nextSteps: ['Continue supported security servicing and verify application compatibility with the LTSC channel.', 'Do not use consumer feature-update dates for an LTSC installation.'],
    sourceUrl: WINDOWS_11_ENT_LTSC_LIFECYCLE,
  },
  {
    family: 'Windows 11', version: '2024 LTSC', versionLabel: 'IoT Enterprise LTSC 2024 (24H2)', edition: 'iotEnterpriseLtsc',
    editionLabel: 'Windows 11 IoT Enterprise LTSC 2024', endDate: '2034-10-10', dateLabel: 'End of servicing',
    latestKb: 'KB5127648', latestKbDate: '2026-10-13',
    note: 'The extended end-of-servicing date applies to Windows 11 IoT Enterprise LTSC 2024, not to regular Windows 11 Enterprise LTSC 2024.',
    nextSteps: ['Keep the device on the supported IoT Enterprise servicing path and maintain current quality updates.', 'Confirm the exact product name and license before relying on the extended LTSC date.'],
    sourceUrl: WINDOWS_11_IOT_LTSC_LIFECYCLE,
  },
  {
    family: 'Windows 10', version: '22H2', versionLabel: 'Version 22H2', edition: 'homePro',
    editionLabel: 'Home / Pro / Pro Education / Pro for Workstations', endDate: '2025-10-14', dateLabel: 'End of updates',
    latestKb: 'KB5126657', latestKbDate: '2026-10-13',
    kbNote: 'KB5126657 is the October 2026 Windows 10 security update reference for eligible devices receiving ESU. It does not mean a non-enrolled Windows 10 device has standard support.',
    note: 'Standard support ended on 14 October 2025. An eligible personal PC may receive security updates through the Consumer ESU program only if it is enrolled and remains eligible.',
    nextSteps: ['If you have not enrolled in ESU, do not assume security updates are still arriving. Check Windows Update and Microsoft’s ESU eligibility and enrollment guidance.', 'Check whether the PC is eligible for Windows 11. Back up your files before a major upgrade.', 'If the device cannot move yet, review the time-limited ESU option and plan a supported long-term path.'],
    sourceUrl: WINDOWS_10_HOME_PRO_LIFECYCLE,
  },
  {
    family: 'Windows 10', version: '22H2', versionLabel: 'Version 22H2', edition: 'enterpriseEducation',
    editionLabel: 'Enterprise / Education (standard servicing)', endDate: '2025-10-14', dateLabel: 'End of updates',
    latestKb: 'KB5126657', latestKbDate: '2026-10-13',
    kbNote: 'The October 2026 package applies to eligible ESU-enrolled devices. It does not restore standard servicing for a non-enrolled device.',
    note: 'Standard Windows 10 servicing ended on 14 October 2025. Eligible commercial devices can receive security-only updates through the ESU program when correctly licensed and enrolled.',
    nextSteps: ['Verify commercial ESU enrollment and coverage with the organization’s administrator or licensing provider.', 'Plan migration to a supported Windows client or a specifically supported LTSC release; ESU is a bridge, not a full lifecycle extension.'],
    sourceUrl: WINDOWS_10_ESU,
  },
  {
    family: 'Windows 10', version: '2021 LTSC', versionLabel: 'Enterprise LTSC 2021', edition: 'enterpriseLtsc',
    editionLabel: 'Windows 10 Enterprise LTSC 2021', endDate: '2027-01-12', dateLabel: 'End of servicing',
    note: 'This is a separate fixed-lifecycle product, not Windows 10 version 22H2 Home/Pro. The date shown is the published lifecycle end date for Enterprise LTSC 2021.',
    nextSteps: ['Plan the transition to a supported LTSC release before January 2027.', 'If migration cannot finish in time, review Microsoft’s current guidance for eligible LTSC ESU options with your organization.'],
    sourceUrl: WINDOWS_10_ENT_LTSC_LIFECYCLE,
  },
  {
    family: 'Windows 10', version: '2021 LTSC', versionLabel: 'IoT Enterprise LTSC 2021', edition: 'iotEnterpriseLtsc',
    editionLabel: 'Windows 10 IoT Enterprise LTSC 2021', endDate: '2032-01-13', dateLabel: 'End of servicing',
    note: 'The longer date applies only to Windows 10 IoT Enterprise LTSC 2021. It does not apply to ordinary Windows 10 Home/Pro or Windows 10 Enterprise LTSC.',
    nextSteps: ['Verify the precise IoT product and license on the device.', 'Keep the device on the appropriate LTSC servicing path and install applicable security updates.'],
    sourceUrl: WINDOWS_10_IOT_LTSC_LIFECYCLE,
  },
];

type EsuMode = 'none' | 'consumer' | 'commercial1' | 'commercial2' | 'commercial3';
type EsuRecord = { label: string; endDate: string; note: string; sourceUrl: string };
const esuRecords: Record<Exclude<EsuMode, 'none'>, EsuRecord> = {
  consumer: {
    label: 'Consumer ESU (personal device, enrolled)',
    endDate: '2027-10-12',
    note: 'Consumer ESU provides eligible security updates, not feature updates or full technical support. This result assumes the device is enrolled and remains eligible; the checker cannot verify enrollment.',
    sourceUrl: WINDOWS_10_CONSUMER_ESU,
  },
  commercial1: {
    label: 'Commercial ESU — Year 1',
    endDate: '2026-10-13',
    note: 'Commercial ESU Year 1 coverage has ended. An installed preparation package alone does not enroll the device or provide updates. Confirm active coverage with the organization’s licensing administrator.',
    sourceUrl: WINDOWS_10_ESU,
  },
  commercial2: {
    label: 'Commercial ESU — Year 2',
    endDate: '2027-10-12',
    note: 'This date applies only when a qualifying commercial device has valid Year 2 ESU coverage. ESU supplies eligible security updates, not feature updates or general technical support.',
    sourceUrl: WINDOWS_10_ESU,
  },
  commercial3: {
    label: 'Commercial ESU — Year 3',
    endDate: '2028-10-10',
    note: 'This date applies only when a qualifying commercial device has valid Year 3 ESU coverage. Confirm licensing and enrollment; ESU does not reinstate the normal product lifecycle.',
    sourceUrl: WINDOWS_10_ESU,
  },
};

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
