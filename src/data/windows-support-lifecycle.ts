/**
 * Dated, manually verified Windows lifecycle and release-history facts.
 * Review this file against the official Microsoft sources whenever release dates or monthly KBs change.
 * Snapshot checked: 2026-10-22.
 */
export const DATA_CHECKED = '2026-10-22';
export const WINDOWS_11_RELEASES = 'https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information';
export const WINDOWS_10_RELEASES = 'https://learn.microsoft.com/en-us/windows/release-health/release-information';
export const WINDOWS_LIFECYCLE_FAQ = 'https://learn.microsoft.com/en-us/lifecycle/faq/windows';
export const WINDOWS_10_END_OF_SUPPORT = 'https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025';
export const WINDOWS_10_ESU = 'https://support.microsoft.com/en-us/servicing/os/windows-10/2025/10/windows-10-extended-security-updates-esu-program';
export const WINDOWS_10_CONSUMER_ESU = 'https://blogs.windows.com/windowsexperience/2025/06/24/stay-secure-with-windows-11-copilot-pcs-and-windows-365-before-support-ends-for-windows-10/';
export const WINDOWS_11_HOME_PRO_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-home-and-pro';
export const WINDOWS_11_ENT_EDU_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-enterprise-and-education-version-21h2';
export const WINDOWS_10_HOME_PRO_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro';
export const WINDOWS_10_ENT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-10-enterprise-ltsc-2021';
export const WINDOWS_10_IOT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-10-iot-enterprise-ltsc-2021';
export const WINDOWS_11_ENT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-enterprise-ltsc-2024';
export const WINDOWS_11_IOT_LTSC_LIFECYCLE = 'https://learn.microsoft.com/en-us/lifecycle/products/windows-11-iot-enterprise-ltsc-2024';

export type OsFamily = 'Windows 11' | 'Windows 10';
export type EditionGroup = 'homePro' | 'enterpriseEducation' | 'enterpriseLtsc' | 'iotEnterpriseLtsc';
export type LifecycleRecord = {
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

export const records: LifecycleRecord[] = [
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

export type EsuMode = 'none' | 'consumer' | 'commercial1' | 'commercial2' | 'commercial3';
export type EsuRecord = { label: string; endDate: string; note: string; sourceUrl: string };
export const esuRecords: Record<Exclude<EsuMode, 'none'>, EsuRecord> = {
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

