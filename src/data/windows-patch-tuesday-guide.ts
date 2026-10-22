import type { Article } from './articles';

/**
 * Stable monthly landing page. Refresh the current-month section at each
 * Patch Tuesday; do not create a new dated URL for every monthly release.
 */
export const windowsPatchTuesdayGuide: Article = {
  id: 'windows-patch-tuesday',
  slug: 'windows-patch-tuesday',
  title: 'Windows Patch Tuesday: What to Install, What Changed, and What to Check',
  seoTitle: 'Windows Patch Tuesday: October 2026 Updates',
  dek: 'A plain-English Windows update briefing: which October 2026 cumulative updates apply to Windows 11 and eligible Windows 10 editions, what they fix, what is still known to be affected, and what to do before and after installing.',
  metaDescription: 'Windows Patch Tuesday explained for October 2026: KB5127648, KB5126653 and KB5126657, edition-specific support warnings, known issues and safe next steps.',
  excerpt: 'The October 13, 2026 security updates are cumulative, but the correct KB depends on your Windows version and edition. Check the match before assuming a package or support date applies to your PC.',
  category: 'Windows',
  subcategory: 'Windows Update',
  authorId: 'imranNatiq',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  readingTime: 11,
  tags: ['Patch Tuesday', 'Windows Update', 'Windows 11', 'Windows 10', 'Security Updates', 'KB5127648', 'KB5126653', 'KB5126657'],
  contentRole: 'pillar',
  pillarPath: '/windows',
  searchIntent: 'informational',
  content: [
    {
      heading: 'This month at a glance: October 2026',
      paragraphs: [
        'Microsoft released the October 2026 Windows security updates on Tuesday, 13 October. For most supported Windows 11 users, the main monthly cumulative update is KB5127648 for versions 26H2, 25H2 and 24H2. Windows 11 version 23H2 uses KB5126653. Windows 10 has an important difference: KB5126657 applies to eligible devices receiving Extended Security Updates (ESU) and to the named LTSC editions, not to every ordinary Windows 10 Home or Pro PC.',
        'This page is a monthly briefing for normal users, not a list of every server, driver, .NET or Microsoft 365 update. The information below was checked on 22 October 2026 against the linked Microsoft release notes. Release notes can change later in the month, so follow the official article for the latest known-issue status.'
      ],
      table: {
        caption: 'October 2026 Windows client security updates',
        headers: ['Your Windows release', 'October KB / build', 'What to know'],
        rows: [
          ['Windows 11 26H2, 25H2 or 24H2', { text: 'KB5127648 — builds 26300.9711 / 26200.9711 / 26100.9711', href: 'https://support.microsoft.com/en-us/servicing/os/windows-11/2026/10/kb5127648-windows-11-24h2-25h2-26h2-security-update' }, 'The same cumulative update covers these release lines. Windows 11 24H2 Home/Pro reached end of standard updates with this October release.'],
          ['Windows 11 26H1', { text: 'KB5127646 — build 28000.3231', href: 'https://support.microsoft.com/en-us/servicing/os/windows-11/2026/10/kb5127646-windows-11-26h1-security-update' }, '26H1 is a device-specific release for supported newer devices, not a general in-place feature update from 24H2 or 25H2.'],
          ['Windows 11 23H2', { text: 'KB5126653 — build 22631.7652', href: 'https://support.microsoft.com/en-us/servicing/os/windows-11/2026/10/kb5126653-windows-11-23h2-security-update' }, 'The remaining 23H2 Enterprise/Education servicing window ends on 10 November 2026; the November security update is scheduled to be the last for these editions.'],
          ['Windows 10 22H2 on valid ESU; Windows 10 Enterprise LTSC 2021; Windows 10 IoT Enterprise LTSC 2021', { text: 'KB5126657 — builds 19045.7807 / 19044.7807', href: 'https://support.microsoft.com/en-us/servicing/os/windows-10/2026/10/kb5126657-windows-10-21h2-22h2-security-update' }, 'This is not a return to standard support for Windows 10 Home/Pro. Check ESU enrollment or the exact LTSC product.']
        ]
      },
      relatedLinks: [
        { label: 'Windows Support Lifecycle Checker', href: '/tools/windows-support-lifecycle-checker', description: 'Check the published end-of-updates date for your version and edition.' },
        { label: 'Windows Update stuck?', href: '/windows/windows-update-stuck', description: 'Use the safe diagnostic order if the installation appears stalled.' }
      ]
    },
    {
      heading: 'What matters to a home user this month',
      paragraphs: [
        'The October KB5127648 release includes security fixes and several quality improvements carried into the monthly cumulative update. Microsoft says it fixes an Explorer sign-in problem observed in some multi-user environments such as Azure Virtual Desktop and FSLogix, resolves AC-3 audio playback issues in some applications, addresses certain Storage Spaces Direct and printing problems, fixes mouse-input stutter in some games, and addresses fingerprint sign-in failures after a cold boot on some devices.',
        'The update also continues the gradual deployment of newer Secure Boot certificates to eligible devices. If the certificates have not appeared on your PC yet, do not disable Secure Boot or force firmware changes solely because the rollout is still in progress. Check the Windows Security status and follow the device maker’s supported guidance.'
      ],
      bullets: [
        'If your PC has had a black screen or Explorer crash after signing in, install the supported current update and retest; the documented fix particularly names multi-user/AVD/FSLogix environments, so do not assume it proves every desktop black-screen symptom has the same cause.',
        'If you game, Microsoft lists a fix for a mouse-input stutter issue in some games. That is not a promise to solve all stuttering or low-FPS problems.',
        'If fingerprint login failed after a cold boot, test it again after installation and a full restart.',
        'If a work or school device uses Remote Desktop, VPN, custom authentication or storage clustering, review the full known-issue notes with your administrator before changing enterprise policies.'
      ]
    },
    {
      heading: 'Known issues worth knowing before troubleshooting',
      paragraphs: [
        'Microsoft’s October 2026 notes list two particularly relevant Windows 11 24H2/25H2/26H2 issues. First, on some devices where Smart App Control has been turned off, its option in Windows Security may be unavailable or grayed out when trying to turn it back on; systems where it is already enabled are not affected. Microsoft documents registry and Group Policy workarounds, but ordinary users should not copy registry commands from an article without understanding the recovery path. Check the official note and seek qualified help if the control is important to your setup.',
        'Second, non-admin users may fail to connect to some Remote Desktop hosts that have Administrator protection enabled, with error 0xC000000D and the message “The token that was passed to the function is invalid.” Microsoft’s note describes this mainly in enterprise-managed remote-host environments. Its documented mitigation changes policy and is intended for IT administrators, not as a general home-PC fix.',
        'Windows 10’s KB5126657 notes also carry a known USB Audio Class 1.0 issue originating in the September update: some devices can show Code 10, no sound or unresponsive volume controls. Microsoft says the September out-of-band update addressed the 8-channel/3D-audio symptoms, while other cases may remain. If audio trouble began after an update, identify the exact USB audio device and Windows edition, check the current release note and manufacturer driver guidance, and avoid random registry or driver-cleaner tools.'
      ],
      table: {
        caption: 'Symptom-led next steps based on Microsoft’s October release notes',
        headers: ['Symptom', 'Safe first check', 'Avoid'],
        rows: [
          ['Smart App Control cannot be turned on', 'Check whether it was already enabled and read the current Microsoft known-issue note.', 'Do not run registry commands copied from an unknown forum.'],
          ['Remote Desktop fails with 0xC000000D on a managed host', 'Record the exact error and ask the IT administrator to check Administrator protection and Microsoft’s current mitigation.', 'Do not change security policy on a work device without authorization.'],
          ['USB audio device shows Code 10 or no sound', 'Check device model, channel mode, Windows edition and relevant update history; check OEM driver guidance.', 'Do not assume every audio problem is caused by KB5126657.'],
          ['Update installs, but the PC remains slow or unstable', 'Capture the exact symptom, Windows build and affected application; use the focused troubleshooting guide.', 'Do not repeatedly uninstall security updates before testing a narrower cause.']
        ]
      },
      relatedLinks: [
        { label: 'Windows says connected but no internet', href: '/windows-11-wifi-connected-no-internet', description: 'Separate a network fault from an update or software symptom.' },
        { label: 'Windows black screen after login', href: '/windows-11-black-screen-after-login', description: 'Diagnose a black screen by symptom and startup stage.' },
        { label: 'Secure Boot certificate update guide', href: '/windows-secure-boot-certificate-update', description: 'Check certificate status without disabling Secure Boot.' }
      ]
    },
    {
      heading: 'What should you do now?',
      paragraphs: [
        'For a supported personal Windows 11 device, open Settings → Windows Update and select Check for updates. Confirm the version under Settings → System → About or by running winver before trying to identify a KB. Install the update offered to your device, allow the restart, and then check Update history if you need to confirm which package completed.',
        'Windows Update may offer a package gradually or hold it back because of compatibility safeguards. That does not automatically mean the PC is broken. Do not force a feature update or install a random Microsoft Update Catalog package simply because another PC has it; match the exact Windows version, edition, architecture and support status first.',
        'For Windows 10 22H2 Home/Pro, standard support ended on 14 October 2025. KB5126657 is for eligible ESU-enrolled installations and the specified LTSC products. If your standard Windows 10 PC is not enrolled in an applicable ESU program, do not assume that October’s KB gives it standard monthly protection. Check eligibility and plan a supported migration.'
      ],
      steps: [
        'Save important work and make sure important files are backed up before a major update or troubleshooting change.',
        'Open Settings → Windows Update → Check for updates and install the update offered for your device.',
        'Restart when requested; then check Settings → Windows Update → Update history for the result.',
        'If installation fails, record the error code and whether it failed during download, installation, or restart. Do not start with a Windows reset or reinstall.',
        'If a new symptom appears, compare its start time with the update installation and check the exact KB’s current known issues before changing drivers, registry settings or security policy.'
      ],
      relatedLinks: [
        { label: 'Windows Update stuck? How long to wait and what to check', href: '/windows/windows-update-stuck', description: 'Use the least destructive troubleshooting steps first.' },
        { label: 'Windows 11 26H2 installation guide', href: '/windows-11-26h2-installation-guide', description: 'Check eligibility and prepare carefully before a feature upgrade.' },
        { label: 'Windows Support Lifecycle Checker', href: '/tools/windows-support-lifecycle-checker', description: 'Check whether the selected Windows release remains in its published support window.' }
      ]
    },
    {
      heading: 'Why this page is updated monthly',
      paragraphs: [
        'Patch Tuesday is the name commonly used for Microsoft’s scheduled monthly security-update release on the second Tuesday of the month. These monthly quality updates are cumulative for their release line, but the exact applicable package depends on Windows version, edition, architecture and servicing arrangements.',
        'The October 2026 section above is the current snapshot, reviewed 22 October 2026. The same URL is intended to be refreshed at the next Patch Tuesday: update the KB/build table, check Microsoft release-health notes for newly reported or resolved issues, and add only the user actions that the official evidence supports. Older monthly URLs will not be created simply to archive another routine release; the linked official notes provide the historical detail.'
      ],
      bullets: [
        'Monthly snapshot reviewed: 22 October 2026.',
        'Primary data source: Microsoft Support cumulative-update articles and Windows release-health pages.',
        'This guide is an editorial summary, not a complete security bulletin or vulnerability-by-vulnerability list.',
        'It does not inspect your computer or guarantee that a specific update is installed.'
      ]
    }
  ],
  sources: [
    { label: 'Microsoft Support: October 13, 2026 KB5127648 for Windows 11 26H2/25H2/24H2', url: 'https://support.microsoft.com/en-us/servicing/os/windows-11/2026/10/kb5127648-windows-11-24h2-25h2-26h2-security-update' },
    { label: 'Microsoft Support: October 13, 2026 KB5127646 for Windows 11 26H1', url: 'https://support.microsoft.com/en-us/servicing/os/windows-11/2026/10/kb5127646-windows-11-26h1-security-update' },
    { label: 'Microsoft Support: October 13, 2026 KB5126653 for Windows 11 23H2', url: 'https://support.microsoft.com/en-us/servicing/os/windows-11/2026/10/kb5126653-windows-11-23h2-security-update' },
    { label: 'Microsoft Support: October 13, 2026 KB5126657 for Windows 10 ESU and LTSC', url: 'https://support.microsoft.com/en-us/servicing/os/windows-10/2026/10/kb5126657-windows-10-21h2-22h2-security-update' },
    { label: 'Microsoft Learn: Windows 11 release information', url: 'https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information' },
    { label: 'Microsoft Learn: Windows 11 24H2 known issues and notifications', url: 'https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-24H2' },
    { label: 'Microsoft Support: Windows 10 support ended October 14, 2025', url: 'https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025' }
  ],
  testing: 'Monthly editorial summary based on linked Microsoft release notes checked on 22 October 2026. No in-house security audit or independent validation of these updates is claimed. Always match the KB to the exact release and servicing channel.',
  faq: [
    { question: 'What is Patch Tuesday?', answer: 'Patch Tuesday is the common name for Microsoft’s scheduled monthly security-update release, usually on the second Tuesday. Out-of-band releases can occur at other times.' },
    { question: 'Which October 2026 Windows 11 update should I check?', answer: 'KB5127648 applies to Windows 11 versions 26H2, 25H2 and 24H2; KB5126653 applies to Windows 11 23H2; KB5127646 is for the device-specific 26H1 release. Confirm your exact version and edition before using the package information.' },
    { question: 'Does October KB5126657 support every Windows 10 computer?', answer: 'No. Microsoft lists it for eligible Windows 10 ESU devices and Windows 10 Enterprise LTSC 2021 and IoT Enterprise LTSC 2021. Standard Windows 10 Home/Pro support ended in October 2025; valid ESU eligibility/enrollment is separate.' },
    { question: 'Should I delay the monthly security update?', answer: 'For a normal supported home PC, install the update offered through Windows Update and keep important files backed up. If your work depends on a known-affected enterprise feature, review the exact Microsoft known issue and consult IT before changing policy or applying a workaround.' },
    { question: 'The update is not appearing. Should I download an MSU manually?', answer: 'Not as the first step. Check the Windows version, Update history, available disk space and any compatibility safeguard. Use Microsoft Update Catalog only when you have confirmed the package matches the exact release, architecture and servicing prerequisites.' },
    { question: 'Where can I see whether an issue has been resolved?', answer: 'Open the linked Microsoft Support KB article and the relevant Windows release-health page. Microsoft can add, change or remove known-issue notes after an article’s initial publication.' }
  ]
};
