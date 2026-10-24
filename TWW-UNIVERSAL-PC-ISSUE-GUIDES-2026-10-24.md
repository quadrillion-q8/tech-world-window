# Universal PC Issue Guides — 24 October 2026

## Scope

Added six evergreen, symptom-led troubleshooting guides to the existing Windows troubleshooting cluster:

- `/windows-11-bluetooth-not-working` — pairing failures, missing Bluetooth controls and repeat disconnections.
- `/windows-11-no-sound-speakers-headphones` — speakers, headphones, missing outputs and microphone-input checks.
- `/windows-11-camera-not-working` — camera privacy controls, black previews, app selection and driver detection.
- `/windows-second-monitor-not-detected` — no signal, display detection, ports, docks and USB-C capability.
- `/windows-file-explorer-not-responding` — frozen folders, Explorer process, storage/resource triage and system-file checks.
- `/windows-printer-offline-queue-stuck` — printer connectivity, print queue, driver checks and spooler reset cautions.

## Research and editorial treatment

Primary research used current Microsoft Support documentation:

- [Bluetooth troubleshooting](https://support.microsoft.com/en-us/windows/hardware/bluetooth/fix-bluetooth-problems-in-windows)
- [Windows sound and audio troubleshooting](https://support.microsoft.com/en-us/windows/hardware/audio/fix-sound-or-audio-problems-in-windows)
- [Microphone troubleshooting](https://support.microsoft.com/en-us/windows/hardware/drivers/fix-microphone-problems)
- [Camera troubleshooting](https://support.microsoft.com/en-us/windows/hardware/camera/camera-doesn-t-work-in-windows)
- [Using multiple monitors](https://support.microsoft.com/en-us/windows/hardware/display-graphics/how-to-use-multiple-monitors-in-windows)
- [File Explorer won't open or start](https://support.microsoft.com/en-us/windows/experience/fileexplorer/fix-file-explorer-if-it-won-t-open-or-start)
- [Printer connection and printing problems](https://support.microsoft.com/en-us/windows/hardware/printer/fix-printer-connection-and-printing-problems-in-windows)

Each guide includes a symptom decision table, least-disruptive-first checks, interpretation limits, stop conditions, FAQs and source links. Hardware-specific behavior is qualified rather than generalized. The articles make no claims of lab testing or guaranteed ranking outcomes.

## Architecture and internal discovery

- Registered the six entries through the existing `Article` data model, preserving the central route graph and automatic sitemap/SSG pipeline.
- Linked the entries to the Windows troubleshooting pillar and relevant adjacent guides.
- Retained existing URLs and did not add duplicate versions of current coverage for Wi-Fi, USB device detection, startup, no-display-on-boot, SSD health or system-wide freezes.

## Validation follow-through

The repository's `npm run build` gate should validate TypeScript, route/SEO parity, sitemap/RSS output, content integrity, internal-link topology, gallery coverage and prerendered HTML. CI results should be checked on the pull request before merge/deployment.
