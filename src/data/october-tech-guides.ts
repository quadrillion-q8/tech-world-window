import type { Article } from "./articles";

/**
 * Six diagnostic guides from TWW's October 2026 editorial backlog.
 * Each guide is symptom-specific, source-led and connected to an existing topic cluster.
 */
export const octoberTechGuides: Article[] = [
  {
    id: "wifi-keeps-disconnecting",
    slug: "windows-11-wifi-keeps-disconnecting",
    title: "Windows 11 Wi-Fi Keeps Disconnecting: Find the Real Cause",
    seoTitle: "Windows 11 Wi-Fi Keeps Disconnecting? Fix",
    dek: "Find out whether recurring Wi-Fi drops follow your Windows PC, the signal environment or the router before changing drivers or resetting the network.",
    metaDescription: "Windows 11 Wi-Fi keeps disconnecting? Isolate PC, signal, router and driver causes with a safe, step-by-step diagnostic workflow.",
    excerpt: "First establish whether other devices disconnect at the same time. If only one PC drops, investigate its wireless adapter and driver; if several devices drop together, start with the access point, router or internet service.",
    category: "Windows",
    subcategory: "Networking",
    authorId: "imranNatiq",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingTime: 10,
    tags: ["Windows 11", "Windows 10", "Wi-Fi", "Wireless Adapter", "Router", "Connection Drops", "Networking", "Troubleshooting"],
    appliesTo: ["Windows 11", "Windows 10"],
    relatedArticles: ["windows-wifi-diagnosis", "windows-dns-not-working", "windows-troubleshooting-universal"],
    contentRole: "cluster",
    pillarPath: "/windows-troubleshooting-complete-guide",
    searchIntent: "informational",
    testing: "This is a diagnostic workflow, not a claim that one setting fixes every adapter. Driver behavior, router firmware, radio conditions and power options vary by model. Change one variable at a time and compare the same location and workload before drawing a conclusion.",
    content: [
      {
        heading: "Start with the pattern, not a network reset",
        paragraphs: [
          "A Wi-Fi connection that repeatedly disconnects is different from a connection that stays connected but cannot reach the internet. Repeated drops can come from the PC, wireless adapter, driver, signal environment, access point, router or a wider service interruption. The quickest route is to find out what changes when the failure happens.",
          "Before changing anything, note the time of a drop, whether the Wi-Fi icon changes, whether reconnecting happens automatically, and whether a video call or download is interrupted. If the problem began after a driver, Windows, router or power-setting change, record that too."
        ],
        table: {
          caption: "Use the symptom pattern to choose the first test",
          headers: ["What you observe", "What it may indicate", "Safest next test"],
          rows: [
            ["Several devices disconnect together", "Router, access point, power or ISP issue", "Check router status and test another device when the network returns."],
            ["Only one Windows PC disconnects", "Adapter, driver, configuration or device-specific interference", "Test the PC on a different trusted Wi-Fi network."],
            ["Drops happen mostly far from the router", "Weak signal, interference or roaming behavior", "Repeat the test close to the access point."],
            ["Drops mainly on battery power", "A power profile or adapter power behavior may be involved", "Compare on AC power, then inspect the adapter's supported power options."],
            ["Wi-Fi remains connected but websites fail", "DNS, gateway, VPN, proxy or upstream internet problem", "Use the connected-but-no-internet guide linked below."]
          ]
        }
      },
      {
        heading: "Determine whether the fault follows the PC or the network",
        paragraphs: [
          "Run two controlled comparisons. First, check whether a phone or another computer loses Wi-Fi at the same moment. Second, connect the affected PC to a different trusted network, such as a personal mobile hotspot if available. Do not use an unfamiliar open network for sensitive activity.",
          "If the PC stays stable on another network, the original router, signal conditions or network configuration becomes a stronger suspect. If the PC disconnects on multiple unrelated networks, focus on the laptop's wireless adapter, driver, power behavior or hardware. Neither result proves a single cause, but both narrow the search.",
          "Repeat the same test near the router and at the usual problem location. A stable connection near the access point but recurring drops in one room point toward signal coverage, interference, walls or band/roaming behavior rather than a Windows-wide fault."
        ],
        steps: [
          "Record whether other devices drop at the same time.",
          "Test the Windows PC near the router.",
          "Test the same PC on a second trusted network if possible.",
          "Compare behavior on AC power and battery if the drops appear power-related.",
          "Keep a note of the one variable changed between each test."
        ]
      },
      {
        heading: "Inspect the Windows wireless adapter and driver",
        paragraphs: [
          "Open Device Manager and expand Network adapters to identify the exact wireless adapter model. Record the driver provider, date and version from the adapter's Properties window before updating it. A generic name or an old date alone does not prove that a driver is faulty.",
          "Install drivers through Windows Update or the official support page for the exact laptop or adapter model. Avoid third-party driver-updater utilities, which can supply mismatched packages. If the drops began immediately after a driver update and the Roll Back Driver option is available, compare the previous driver under the same conditions before trying other changes.",
          "Power-saving behavior deserves attention only when the pattern supports it, such as drops that occur on battery or after idle periods. Some adapter properties and power options differ by driver and Windows build. Change a setting only if it exists on the device, record its original value, and restore it if the behavior does not improve."
        ],
        bullets: [
          "If the Wi-Fi adapter disappears from Device Manager, check for a disabled device, firmware toggle, driver failure or hardware fault.",
          "If the issue started after a Windows update, use the supported driver rollback or OEM troubleshooting path rather than downloading a random older driver.",
          "If multiple unrelated networks fail and the adapter repeatedly resets, preserve the event times and adapter details for further diagnosis."
        ],
        relatedLinks: [
          { label: "Windows says connected but has no internet", href: "/windows-11-wifi-connected-no-internet", description: "Use this when the connection stays up but internet access fails." },
          { label: "Windows 11 network adapter reset guide", href: "/windows-11-network-adapter-reset-guide", description: "Understand the effect of a network reset before using it." }
        ]
      },
      {
        heading: "Check signal, router behavior and interference",
        paragraphs: [
          "Place the router in an open, elevated position when practical and test close to it before changing advanced settings. Walls, metal objects, nearby electronics and crowded radio channels can affect reliability. A stronger signal is useful evidence, but signal bars do not measure every aspect of link quality.",
          "If the router broadcasts separate 2.4 GHz and 5 GHz networks, test each band where available and supported. The 2.4 GHz band can reach farther but may be more crowded; 5 GHz can offer more capacity at shorter range. The best result depends on the building, router, client adapter and local radio environment.",
          "Restart the router only after noting its current status and checking whether other devices are affected. Review the router manufacturer's documentation before changing channel, channel width, firmware or security mode. There is no universal channel setting that improves every network, and router changes can disrupt other household devices."
        ]
      },
      {
        heading: "When to use a network reset",
        paragraphs: [
          "A Windows network reset is a later step, not the first diagnostic action. It removes and reinstalls network adapters and returns networking components to default settings. It can require reconfiguring VPN software, virtual switches or other network tools, and may change saved network configuration.",
          "Use it only after controlled tests and targeted adapter troubleshooting have failed, and after you have recorded any settings you need to restore. If other devices are dropping too, resetting Windows is unlikely to repair a router or provider fault.",
          "If drops continue across multiple known-good networks with current, model-correct drivers, document the adapter model, driver version and failure pattern. A hardware check may be more useful than repeatedly resetting the same configuration."
        ],
        relatedLinks: [
          { label: "Windows DNS troubleshooting", href: "/windows-11-dns-not-working-how-to-fix", description: "Use when the Wi-Fi link stays connected but name lookups fail." },
          { label: "Complete Windows troubleshooting guide", href: "/windows-troubleshooting-complete-guide", description: "Follow the broader low-risk diagnostic workflow." }
        ]
      }
    ],
    sources: [
      { label: "Microsoft Support: Fix Wi-Fi connection issues in Windows", url: "https://support.microsoft.com/en-us/windows/fix-wi-fi-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c" },
      { label: "Intel: Wireless adapter keeps disconnecting (Intel adapters)", url: "https://www.intel.com/content/www/us/en/support/articles/000088581.html" },
      { label: "Microsoft Support: Update drivers through Device Manager", url: "https://support.microsoft.com/en-us/windows/update-drivers-through-device-manager-in-windows-ec62f46c-ff14-c91d-eead-d7126dc1f7b6" }
    ],
    faq: [
      { question: "Why does my Windows 11 laptop keep disconnecting from Wi-Fi while other devices work?", answer: "That pattern makes a laptop-specific adapter, driver, power or compatibility issue more likely. Test the laptop on another trusted network and compare behavior close to the router before changing drivers." },
      { question: "Should I disable Wi-Fi adapter power saving?", answer: "Not automatically. First confirm that drops correlate with battery power or idle periods. If a relevant power option exists, record the original setting and compare one change at a time." },
      { question: "Will a network reset fix repeated Wi-Fi disconnects?", answer: "It can help with some Windows configuration problems, but it will not fix weak signal, router faults or a failing adapter. Use it after simpler isolation tests and be prepared to reconfigure VPNs or virtual networking." }
    ],
    howTo: {
      name: "Diagnose recurring Wi-Fi disconnects in Windows",
      steps: [
        "Check whether other devices disconnect at the same time.",
        "Test the affected PC close to the router and on another trusted network.",
        "Record the wireless adapter model and driver details in Device Manager.",
        "Use Windows Update or the device manufacturer's official driver for the exact model.",
        "Change router or power settings only after recording a baseline and changing one variable at a time."
      ]
    }
  },
  {
    id: "black-screen-after-login",
    slug: "windows-11-black-screen-after-login",
    title: "Windows 11 Black Screen After Login: Safe Troubleshooting",
    seoTitle: "Windows 11 Black Screen After Login: Fix",
    dek: "Recover a black or blank desktop after signing in to Windows by checking display output, the Windows shell and recent driver changes before attempting a reset.",
    metaDescription: "Windows 11 shows a black screen after login? Check display output, Explorer, graphics drivers and recovery options in a safe order.",
    excerpt: "A black desktop after sign-in does not automatically mean Windows is corrupted. Check whether the keyboard shortcuts, security screen or Task Manager still work, then choose the next step based on that evidence.",
    category: "Windows",
    subcategory: "Startup and display",
    authorId: "imranNatiq",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingTime: 11,
    tags: ["Windows 11", "Windows 10", "Black Screen", "Explorer.exe", "Display Driver", "Safe Mode", "Windows Recovery", "Troubleshooting"],
    appliesTo: ["Windows 11", "Windows 10"],
    relatedArticles: ["windows-wont-start", "windows-unknown-device", "windows-troubleshooting-universal"],
    contentRole: "cluster",
    pillarPath: "/windows-troubleshooting-complete-guide",
    searchIntent: "informational",
    testing: "The correct path depends on whether Windows sign-in completed and whether the security screen or Task Manager responds. Display drivers, multi-monitor configurations, profile problems and incomplete updates can look similar; do not assume one cause from a black screen alone.",
    content: [
      {
        heading: "Identify which black-screen symptom you have",
        paragraphs: [
          "This guide is for a screen that becomes black or blank after you sign in to Windows. A monitor showing No signal before the Windows sign-in screen is a different fault path, and a black screen containing a stop code should be handled as a crash rather than a stalled desktop.",
          "If Windows is installing an update or the storage activity indicator suggests work is continuing, give the computer time before forcing it off. If the screen remains black and the system is responsive, use the least disruptive checks first."
        ],
        table: {
          caption: "Choose a safe next test based on what still responds",
          headers: ["Symptom", "What it may suggest", "First action"],
          rows: [
            ["Black screen with a cursor", "Windows shell or graphics-driver issue", "Try the graphics reset shortcut and Ctrl+Alt+Delete."],
            ["Security screen opens", "Windows session is running at least partially", "Open Task Manager and check whether the desktop shell can start."],
            ["External monitor works, laptop panel does not", "Panel, display routing or graphics configuration", "Check projection mode and model-specific display support."],
            ["No signal before Windows loads", "Monitor, cable, GPU or failed POST", "Use the separate no-display hardware guide."],
            ["Stop code or repeated restart", "System crash, driver or hardware error", "Record the exact stop code and follow crash recovery guidance."]
          ]
        }
      },
      {
        heading: "Try the low-risk display checks first",
        paragraphs: [
          "Press Windows + Ctrl + Shift + B once. On supported Windows systems, this requests a graphics-driver reset; the screen may flicker or you may hear a beep. It is a test, not proof that the driver is the cause. Wait a few seconds and observe whether the desktop returns.",
          "Press Windows + P, then select a display option with the arrow keys and Enter if the display-projection panel is active. An incorrect projection mode can send the desktop to a disconnected monitor. If you use a dock or multiple displays, disconnect unnecessary display devices and test one known-good monitor or cable where practical.",
          "Try Ctrl + Alt + Delete. If the Windows security screen appears, use its power options to restart normally if needed. The fact that this screen appears suggests the machine is responding, but it does not by itself establish whether the issue is Explorer, the graphics stack, a profile or a background application."
        ],
        steps: [
          "Wait briefly if an update or first sign-in may still be finishing.",
          "Try Windows + Ctrl + Shift + B once and observe the result.",
          "Check projection mode and test a known-good external display if available.",
          "Open Ctrl + Alt + Delete and see whether the security screen responds."
        ]
      },
      {
        heading: "Use Task Manager to test the Windows desktop shell",
        paragraphs: [
          "If Ctrl + Alt + Delete works, choose Task Manager. If Task Manager opens, select Run new task, enter explorer.exe and confirm. If the taskbar, desktop icons and file explorer return, the Windows shell may not have started correctly in that session.",
          "This is a targeted test, not a universal repair. If Explorer was already running, repeatedly launching more copies is not useful. If Task Manager does not open or Explorer fails again, continue to the recovery and driver checks rather than deleting system files or running an opaque fix script.",
          "If only one Windows account is affected, the issue may be tied to that profile or its startup applications. Do not delete the profile as a first response. Protect any unbacked-up files and use Microsoft's supported account-recovery guidance if Windows reports a temporary or damaged profile."
        ],
        relatedLinks: [
          { label: "Windows 11 will not start", href: "/windows-11-wont-start-troubleshooting", description: "Use when Windows cannot reliably reach sign-in or repeatedly enters recovery." },
          { label: "Unknown device and driver troubleshooting", href: "/windows-11-unknown-device-device-manager", description: "Find the exact device and driver when evidence points to a device problem." }
        ]
      },
      {
        heading: "Use Safe Mode or roll back a recent display change",
        paragraphs: [
          "If the black screen began immediately after a graphics-driver, Windows update, display utility or startup application change, use that timing as a clue. When the sign-in screen is available, hold Shift while selecting Restart to enter Windows Recovery Environment. Recovery access can vary by device and configuration.",
          "From Recovery, use the documented Startup Settings path to try Safe Mode. If Safe Mode provides a working desktop, review recent driver or software changes and use Device Manager or the hardware vendor's official package to roll back or reinstall the relevant display driver. Do not install a driver intended for a different laptop or graphics model.",
          "Some recovery actions can require the BitLocker recovery key. Locate the key before starting a recovery path that asks for it; do not clear the TPM or change firmware security settings in an attempt to bypass encryption. If the drive is encrypted and the key is unavailable, pause before making changes that could make data inaccessible."
        ]
      },
      {
        heading: "When to stop and avoid resetting Windows",
        paragraphs: [
          "Do not choose Reset this PC or a clean install merely because the desktop is black. First distinguish a display-output problem, a shell that fails to start, a driver regression and a wider startup failure. A reset can remove applications and settings, and any recovery operation has to be considered in light of data backups and encryption.",
          "If there is no display before Windows starts, the motherboard reports a hardware debug code, the computer repeatedly powers off, or a known-good external monitor also receives no signal, move to hardware diagnosis. If the machine is managed by an employer or school, check with its administrator before changing drivers, recovery options or security settings."
        ],
        relatedLinks: [
          { label: "PC turns on but has no display", href: "/pc-turns-on-but-no-display", description: "Follow this path when there is no image before Windows sign-in or the PC may not complete POST." },
          { label: "Complete Windows troubleshooting guide", href: "/windows-troubleshooting-complete-guide", description: "Use the broader Windows recovery workflow when the symptom spans several startup stages." }
        ]
      }
    ],
    sources: [
      { label: "Microsoft Support: Troubleshooting blank screens in Windows", url: "https://support.microsoft.com/en-us/windows/hardware/display-graphics/troubleshooting-blank-screens-in-windows" },
      { label: "Microsoft Support: Update drivers through Device Manager", url: "https://support.microsoft.com/en-us/windows/update-drivers-through-device-manager-in-windows-ec62f46c-ff14-c91d-eead-d7126dc1f7b6" },
      { label: "Microsoft Support: We can't sign in to your account", url: "https://support.microsoft.com/en-us/windows/security/identity-signin/we-can-t-sign-in-to-your-account-error-message" }
    ],
    faq: [
      { question: "Why is my Windows 11 screen black after I sign in?", answer: "Possible causes include display projection, a stalled Windows shell, a graphics-driver issue, a startup program or a user-profile problem. Check which shortcuts and tools still respond before choosing a repair." },
      { question: "Does restarting Explorer.exe always fix a black desktop?", answer: "No. It helps only when the Windows shell is the relevant failure. If Explorer does not start or the screen goes black again, investigate display drivers, startup software and recovery options." },
      { question: "Can I reset Windows if I cannot see the desktop?", answer: "A reset is not the first step. Try the display, shell and recovery checks first, protect important files, and make sure you have the BitLocker recovery key if encryption is enabled." }
    ],
    howTo: {
      name: "Troubleshoot a black screen after Windows sign-in",
      steps: [
        "Confirm the screen is black after sign-in rather than before the PC displays the Windows logo.",
        "Try the graphics reset shortcut, display projection options and Ctrl + Alt + Delete.",
        "If Task Manager opens, run explorer.exe once to test the Windows shell.",
        "If needed, enter Windows Recovery Environment and try Safe Mode.",
        "Use the official driver or recovery path that matches the evidence, protecting encrypted data before recovery actions."
      ]
    }
  },
  {
    id: "laptop-plugged-in-not-charging",
    slug: "laptop-plugged-in-not-charging",
    title: "Laptop Plugged In but Not Charging: What to Check",
    seoTitle: "Laptop Plugged In but Not Charging? Fix",
    dek: "Separate charging limits, an incompatible adapter, USB-C power delivery, battery wear and port problems before deciding a laptop needs a new battery.",
    metaDescription: "Laptop plugged in but not charging? Check adapter compatibility, charge limits, ports, battery health and safety warnings before replacing parts.",
    excerpt: "First check whether the laptop reports a charging limit or a charger warning. The adapter, cable and charging port must meet the exact model's power requirements, and a stuck percentage is not automatically a failed battery.",
    category: "Hardware",
    subcategory: "Laptop power and battery",
    authorId: "imranNatiq",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingTime: 10,
    tags: ["Laptop", "Battery", "Not Charging", "USB-C", "Power Adapter", "Battery Health", "Hardware Troubleshooting"],
    appliesTo: ["Windows laptops; exact charging behavior depends on device model"],
    relatedArticles: ["laptop-wont-turn-on", "nvme-laptop-upgrade"],
    contentRole: "cluster",
    pillarPath: "/hardware",
    searchIntent: "informational",
    testing: "Charging behavior differs between laptop models. A charge cap can be an intentional battery-care feature, while adapter warnings, heat, a damaged port or a swollen battery require a different response. Confirm the exact model and its manufacturer guidance before interpreting a battery percentage or replacing hardware.",
    content: [
      {
        heading: "Identify the exact charging symptom",
        paragraphs: [
          "A laptop can be plugged in without increasing its battery percentage for several different reasons. Some devices intentionally pause charging at a selected threshold to reduce time spent at full charge. Others are receiving too little power, cannot identify the adapter, have a damaged charging path or have a battery that needs service.",
          "Safety comes first. If the battery case or trackpad is lifting, the chassis is bulging, the device smells unusual, or the battery becomes abnormally hot, stop using and charging the laptop. Do not press a swollen case closed, puncture the battery or attempt a DIY cell replacement. Arrange qualified service and follow the manufacturer's damaged-battery instructions."
        ],
        table: {
          caption: "Charging symptoms and the next safe check",
          headers: ["What you see", "Possible explanation", "Next step"],
          rows: [
            ["Stopped at a repeatable percentage such as 80%", "Battery-care or charge-limit setting", "Check the laptop manufacturer's power utility and BIOS/UEFI documentation."],
            ["Charging slowly or losing charge while plugged in", "Adapter or cable power may be insufficient", "Use the approved adapter and cable, and bypass a dock for testing."],
            ["Adapter not recognized or warning at startup", "Adapter ID, power rating, cable or port issue", "Record the exact warning and compare the charger to the exact model specification."],
            ["Charging changes when the plug moves", "Loose or damaged connector, cable or port", "Stop stressing the connector and arrange inspection if the fit is unstable."],
            ["Swelling, leakage or unusual heat", "Potential battery safety issue", "Stop use and charging; do not continue the tests below."]
          ]
        }
      },
      {
        heading: "Verify the adapter, cable and charging port",
        paragraphs: [
          "Start with the laptop manufacturer's supplied or explicitly compatible charger. Check the laptop's exact model number and compare the adapter's supported output with the OEM specification; do not assume that a connector fitting physically means the adapter is compatible. A charger can power a laptop lightly but still be too weak for charging under load.",
          "For USB-C charging, verify that the port on the laptop supports charging and that the charger and cable meet the device's required USB Power Delivery profile and power level. Not every USB-C port supports charging input, and not every USB-C cable can provide every supported power level. Test without an external hub or dock so it is not an extra variable.",
          "Inspect the port and cable externally for obvious damage. Do not insert metal tools, liquids or improvised objects into the connector. If the plug is loose, sparks, smells burnt or must be held at an angle, stop moving it around and have the charging port inspected."
        ],
        steps: [
          "Confirm the exact laptop model and its approved charger specification.",
          "Connect directly to a suitable wall outlet and bypass any dock or hub.",
          "Use a known-good compatible cable and adapter if available.",
          "Check that the connector is in a port documented for charging.",
          "Record any BIOS or Windows adapter warning before trying other changes."
        ]
      },
      {
        heading: "Check for a charge limit or battery-care mode",
        paragraphs: [
          "Some laptop manufacturers include a conservation mode, battery-health mode or charge threshold that intentionally stops charging before 100 percent. This can be expected behavior, especially when the laptop is usually connected to power. Check the official support application and model manual before treating a fixed percentage as a fault.",
          "If you change a charge limit, note its original value and allow the device to behave long enough to observe whether the setting explains the symptom. If the laptop says an adapter is not recognized, a charging threshold is less likely to explain that warning; diagnose the adapter path first.",
          "A BIOS/UEFI or manufacturer battery report can add evidence, but menus and tests vary by model. Use the specific OEM documentation rather than guessing a universal menu name."
        ]
      },
      {
        heading: "Review battery status in Windows",
        paragraphs: [
          "In Windows, compare the battery icon and Settings battery information with the status displayed by the laptop manufacturer's utility or firmware diagnostics. A short observation after the laptop is idle can help distinguish a stable charge cap from a battery percentage that continues to fall while plugged in.",
          "Windows can generate a battery report on supported systems. Open Terminal or Command Prompt and run powercfg /batteryreport, then open the report saved at the path shown in the output. Review design capacity, full-charge capacity and usage history as trends, not as a definitive verdict on the charging port. A report does not test every adapter, battery controller or USB-C power-delivery fault.",
          "If the reported capacity has fallen substantially over time, the device may have a worn battery, but the number should be interpreted alongside the manufacturer diagnostic, age, workload and actual runtime. Avoid third-party utilities that ask you to install unknown drivers or firmware."
        ],
        codeBlocks: ["powercfg /batteryreport"],
        relatedLinks: [
          { label: "Laptop battery health and warning signs", href: "/laptop-battery-warning-signs", description: "Understand battery wear, safety symptoms and when a battery needs service." },
          { label: "Can you upgrade a gaming laptop?", href: "/gaming-laptop-upgradeable-ram-ssd", description: "Learn why exact-model service documentation matters before opening a laptop." }
        ]
      },
      {
        heading: "When a hardware inspection is the right next step",
        paragraphs: [
          "Arrange a professional check when the adapter is confirmed compatible but is not recognized, the charging port is physically loose, charging cuts in and out with no clear cable fault, the battery-health utility reports a failure or the battery has abnormal heat or swelling. A technician can separate the adapter, port, charging circuitry and battery instead of replacing parts based on the percentage alone.",
          "Do not attempt a firmware update while power is unstable. If the manufacturer's troubleshooting procedure calls for a BIOS/UEFI update, first confirm stable power, read the exact model-specific instructions and preserve recovery information. If the laptop contains important unbacked-up files, back them up while the device is stable before further service."
        ],
        relatedLinks: [
          { label: "Complete Windows troubleshooting guide", href: "/windows-troubleshooting-complete-guide", description: "Use the general diagnostic approach for software-related power symptoms." },
          { label: "Laptop won't turn on", href: "/laptop-wont-turn-on", description: "Follow a different path if the laptop no longer powers on at all." }
        ]
      }
    ],
    sources: [
      { label: "Microsoft Support: PC is charging slowly or discharging while plugged in", url: "https://support.microsoft.com/en-us/windows/experience/power-battery/pc-is-charging-slowly-or-discharging-while-it-s-plugged-in" },
      { label: "Microsoft Support: Fix USB-C problems in Windows", url: "https://support.microsoft.com/en-us/windows/hardware/usb/fix-usb-c-problems-in-windows" }
    ],
    faq: [
      { question: "Why does my laptop say plugged in but not charging at 80 percent?", answer: "Some laptops intentionally use a battery-care or charge-limit mode. Check the exact model's OEM power utility and manual before assuming the battery has failed." },
      { question: "Can a weak USB-C charger power a laptop without charging it?", answer: "Yes. If a charger or cable does not meet the laptop's required power level, the system may charge slowly or continue discharging while plugged in. Verify the laptop, charger and cable specifications." },
      { question: "Does a Windows battery report tell me whether the charging port is broken?", answer: "No. A battery report can show capacity and usage history, but it does not fully test the adapter, cable, charging port or motherboard charging circuit." },
      { question: "Can I keep using a laptop with a swollen battery?", answer: "No. Stop using and charging it, do not press the case closed or puncture the battery, and arrange qualified service using the manufacturer's safety guidance." }
    ],
    howTo: {
      name: "Diagnose a laptop that is plugged in but not charging",
      steps: [
        "Stop immediately if there is swelling, leakage, abnormal heat or physical battery damage.",
        "Check the exact model's approved adapter, cable and charging-port requirements.",
        "Test directly from a wall outlet without a dock or hub.",
        "Check for an intentional charge limit in the OEM utility or firmware.",
        "Compare Windows battery status with the manufacturer diagnostic and battery report before deciding on service."
      ]
    }
  },
  {
    id: "pc-turns-on-but-no-display",
    slug: "pc-turns-on-but-no-display",
    title: "PC Turns On but Has No Display: A Safe Diagnostic Guide",
    seoTitle: "PC Turns On but Has No Display? Fix",
    dek: "Find out whether a desktop's black screen comes from the monitor path, failed POST, memory, graphics or power connections before replacing parts.",
    metaDescription: "PC powers on but has no display? Check monitor input, graphics output, motherboard indicators and safe POST tests in order.",
    excerpt: "Fans and lights do not prove that a PC has completed POST. Separate a monitor or cable problem from a system that is not initializing its hardware before changing components.",
    category: "Hardware",
    subcategory: "Desktop troubleshooting",
    authorId: "imranNatiq",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingTime: 11,
    tags: ["Desktop PC", "No Display", "No POST", "GPU", "RAM", "Motherboard", "Power Supply", "Troubleshooting"],
    appliesTo: ["Desktop PCs; motherboard and OEM procedures vary by model"],
    relatedArticles: ["psu-failure-symptoms", "gpu-overheating"],
    contentRole: "cluster",
    pillarPath: "/hardware",
    searchIntent: "informational",
    testing: "Desktop diagnostic LEDs, beep codes, memory-slot recommendations and CMOS procedures are motherboard-specific. Consult the manual for the exact board or OEM system. Only perform internal checks if comfortable working with hardware and after disconnecting mains power.",
    content: [
      {
        heading: "Separate no signal, no image and failed POST",
        paragraphs: [
          "A desktop that lights up but shows no display can have a simple monitor-input problem, a faulty cable, a graphics-output mismatch or a system that never completes Power-On Self-Test (POST). Fans and RGB lighting can run even when the CPU, memory, GPU or motherboard has not initialized successfully.",
          "Before opening the case, record what the screen says and whether the system ever shows a manufacturer logo or BIOS/UEFI screen. Note recent changes such as a new GPU, RAM kit, CPU, display or BIOS update. Stop immediately if there is a burning smell, liquid damage or visible electrical damage."
        ],
        table: {
          caption: "Classify the no-display symptom before changing hardware",
          headers: ["What you observe", "Possible failure area", "First action"],
          rows: [
            ["Monitor says No signal", "Input, cable, GPU output or no video initialization", "Select the correct monitor input and test a known-good cable."],
            ["Backlight is on but image is black", "Display path or system startup stage", "Try another display and check whether a logo ever appears."],
            ["Motherboard CPU, DRAM, VGA or BOOT light stays on", "Component or startup stage indicated by the board", "Photograph the indicator and consult the exact motherboard manual."],
            ["Problem began after a hardware change", "Compatibility, seating or power connection", "Power down and reverse only the recent change if safe and documented."],
            ["Windows sign-in previously appeared, then screen goes black", "Windows display driver or desktop session", "Use the post-login black-screen guide rather than a pre-boot hardware workflow."]
          ]
        }
      },
      {
        heading: "Check the monitor, input and video cable",
        paragraphs: [
          "Confirm that the monitor has power and is set to the input connected to the PC. Test with a known-good cable and, if possible, a second monitor or a different supported output port. Remove docks, adapters and switches from the path while testing so the display chain has fewer variables.",
          "If the desktop has a separate graphics card, normally connect the display to the graphics card's outputs rather than the motherboard video ports. The motherboard ports work only when the installed CPU and system support integrated graphics and the firmware permits the output. Some processor models have no integrated graphics, so check the exact processor specification before trying this branch.",
          "A monitor working on another device proves only that it can display that test signal; it does not prove every cable, port or resolution combination is working. Keep the original symptom and change one item at a time."
        ],
        steps: [
          "Verify the display is powered on and the correct input is selected.",
          "Try a known-good cable and supported port.",
          "Test a second display if available.",
          "Use the graphics card's output unless the exact CPU supports integrated graphics.",
          "Observe whether a BIOS or manufacturer logo appears."
        ]
      },
      {
        heading: "Use motherboard indicators as evidence",
        paragraphs: [
          "Many motherboards have diagnostic LEDs, a small two-digit code display or a beep-code system. Common labels include CPU, DRAM, VGA and BOOT, but the meaning and expected behavior are defined by the board manual. A light that stays on can narrow the stage where initialization stopped; it is not a universal proof that a particular part is defective.",
          "Photograph the indicator after giving the system time to start and check the manual for that exact board revision. If there is a beep pattern, record the pattern and consult the manufacturer's interpretation. Do not swap parts based only on a generic internet chart that may describe a different model.",
          "For a new build or a PC that failed immediately after an upgrade, verify processor and RAM compatibility, the recommended DIMM slot, GPU seating and required CPU/PCIe power connectors against the board and component manuals."
        ]
      },
      {
        heading: "Try minimal-hardware checks only if you are comfortable",
        paragraphs: [
          "Shut the PC down, switch off the power supply if it has an accessible switch, and disconnect the mains power before touching internal components. Follow the exact PC or motherboard service instructions and use sensible electrostatic-discharge precautions. Do not open a power supply; hazardous voltage can remain inside even after it is unplugged.",
          "If the manual supports it, disconnect nonessential peripherals and start with the minimum hardware needed for diagnosis. Memory testing may involve one module in a manufacturer-recommended slot, but do not guess the slot. Reseat a GPU or memory module only when you know how the retention mechanism works and the system is fully disconnected from power.",
          "Treat clearing CMOS as a model-specific later step. It can discard customized firmware settings and may change boot, memory or security configuration. Record needed settings first and follow the motherboard manual exactly. Never start a BIOS update when the system cannot maintain stable power or the recovery procedure is unclear."
        ],
        relatedLinks: [
          { label: "PC power supply symptoms", href: "/pc-power-supply-problems-symptoms", description: "Review power-failure symptoms without opening the power supply." },
          { label: "Windows 11 will not start", href: "/windows-11-wont-start-troubleshooting", description: "Continue here when the system displays an image but Windows cannot boot." },
          { label: "Black screen after Windows login", href: "/windows-11-black-screen-after-login", description: "Use this distinct workflow if the display fails after sign-in." }
        ]
      },
      {
        heading: "When professional diagnosis is safer",
        paragraphs: [
          "Seek qualified service if the PC has signs of electrical damage, a damaged connector, repeated power cycling, a burning smell, liquid exposure or a diagnostic code you cannot interpret. Stop if a component requires force or you are unsure how to disconnect it safely.",
          "If the PC is under warranty, check the system manufacturer's support path before removing parts or changing firmware. Give the technician the exact symptom, the last successful startup stage, any debug code and the changes already tested. This is more useful than a list of parts replaced without evidence."
        ]
      }
    ],
    sources: [
      { label: "Intel Support: No-boot/no-display guidance for Intel boxed desktop processors", url: "https://www.intel.com/content/www/us/en/support/articles/000021605/processors.html" },
      { label: "ASUS ROG Support: Motherboard no power, no boot or no display troubleshooting", url: "https://rog.asus.com/support/faq/1042632/" },
      { label: "Microsoft Support: Troubleshooting blank screens in Windows", url: "https://support.microsoft.com/en-us/windows/hardware/display-graphics/troubleshooting-blank-screens-in-windows" }
    ],
    faq: [
      { question: "Can a PC turn on even if it has not passed POST?", answer: "Yes. Fans, lighting and some motherboard LEDs can operate before the system successfully initializes hardware. Look for the board's diagnostic indicator and whether a BIOS or manufacturer logo appears." },
      { question: "Should I connect my monitor to the motherboard instead of the graphics card?", answer: "Only if the exact CPU supports integrated graphics and the system supports that output. Many CPU models do not provide integrated graphics, so check the processor specification first." },
      { question: "Should I clear CMOS when there is no display?", answer: "Not as the first step. Check the monitor path, power connections, recent changes and model-specific debug indicators first. Clearing CMOS can erase customized firmware settings and must follow the board manual." }
    ],
    howTo: {
      name: "Diagnose a desktop PC that powers on without displaying an image",
      steps: [
        "Record whether the monitor reports No signal and whether a BIOS or manufacturer logo appears.",
        "Check monitor power, input, cable and a second display if available.",
        "Connect to the appropriate graphics output after verifying integrated-graphics support.",
        "Record motherboard diagnostic LEDs or beep codes and consult the exact manual.",
        "Perform internal checks only with mains power disconnected and according to the system service documentation."
      ]
    }
  },
  {
    id: "ssd-not-detected-in-bios-or-windows",
    slug: "ssd-not-detected-in-bios-or-windows",
    title: "SSD Not Detected in BIOS or Windows: Find the Failure Point",
    seoTitle: "SSD Not Detected in BIOS or Windows? Fix",
    dek: "Find out whether an SSD is missing at firmware level, detected but not mounted by Windows, offline, missing a drive letter or possibly failing—without risking existing data.",
    metaDescription: "SSD not detected in BIOS or Windows? Check firmware, Disk Management and drive health safely before initializing or formatting anything.",
    excerpt: "Protect existing data before attempting repairs. A drive missing in BIOS is a different problem from a drive visible in Disk Management but absent from File Explorer, and initializing or formatting the wrong disk can destroy access to data.",
    category: "Hardware",
    subcategory: "Storage",
    authorId: "imranNatiq",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingTime: 11,
    tags: ["SSD", "NVMe", "SATA SSD", "Disk Management", "BIOS", "Storage", "Data Protection", "Troubleshooting"],
    appliesTo: ["Windows 11", "Windows 10; firmware and slot support vary by computer"],
    relatedArticles: ["ssd-health", "ssd-slowdown"],
    contentRole: "cluster",
    pillarPath: "/hardware",
    searchIntent: "informational",
    testing: "Disk Management labels do not by themselves prove a drive is healthy. Initialization, formatting, partition deletion and certain command-line operations can destroy access to existing files. If the drive contains needed data, prioritize preservation and manufacturer-approved diagnostics over attempts to make it appear in File Explorer.",
    content: [
      {
        heading: "Protect the data before troubleshooting",
        paragraphs: [
          "If the SSD previously contained files you need, do not initialize it, format it, delete partitions or run destructive disk commands just because Windows asks for action. A disk can be missing because of a connection, slot-compatibility or hardware fault, and a damaged partition can also prevent normal mounting. Changing its layout may make recovery more difficult.",
          "Start by deciding whether this is a brand-new empty drive or a drive that was already used. If the drive has important data and suddenly disappeared, repeatedly restarting, reseating or running repairs is not a substitute for a backup or recovery plan. If the drive intermittently vanishes, reports errors or fails a manufacturer's health test, stop unnecessary writes and consider qualified data recovery."
        ],
        table: {
          caption: "Where the SSD is visible determines the next safe step",
          headers: ["What you observe", "What it may mean", "Safe next step"],
          rows: [
            ["SSD is absent in BIOS/UEFI", "Physical connection, slot support, power, firmware or drive fault", "Check the exact system manual and model-specific slot support."],
            ["SSD appears in BIOS but not in File Explorer", "Disk may be offline, unpartitioned, missing a letter or unreadable", "Open Disk Management and inspect status without initializing or formatting."],
            ["Drive appears as Offline", "Windows is not exposing it as an available disk", "Check why it is offline; bring it online only when the disk identity and data context are clear."],
            ["Partition is healthy but no letter appears", "A mounted volume may lack a drive letter", "Assign a letter only if the partition is the expected volume and data is intact."],
            ["Previously working drive disappears intermittently", "Connection, controller, firmware or drive-health problem", "Protect data and use the manufacturer's diagnostic or service guidance."]
          ]
        }
      },
      {
        heading: "Check whether the drive is detected by BIOS or UEFI",
        paragraphs: [
          "Enter firmware setup using the method documented for the exact laptop or motherboard, then look for storage or NVMe/SATA device information. Menu names vary. If the drive is not listed, changing a Windows drive letter or reinstalling a Windows application will not fix that detection layer.",
          "For a desktop SATA SSD, the model manual may identify data-cable and power-connector checks. For an M.2 drive, verify that the slot supports the installed drive type and length, and check whether the manual describes shared lanes or ports that become unavailable with particular configurations. M.2 describes a physical form factor; it does not guarantee that every slot supports both SATA and NVMe.",
          "Only inspect internal connections when the system is fully powered down, unplugged and safe to open. Follow the manufacturer's service guide. If removing the drive could affect warranty or you are not comfortable handling small connectors, stop and use professional service."
        ]
      },
      {
        heading: "Inspect the disk in Windows Disk Management",
        paragraphs: [
          "If firmware detects the SSD, open Disk Management by right-clicking Start and choosing Disk Management, or search for Create and format hard disk partitions. Compare the capacity and status carefully so you do not select the Windows system disk or a different external drive.",
          "An Offline disk, a healthy partition without a drive letter and an Unallocated disk are different conditions. If an expected healthy partition simply lacks a letter, a letter may restore access without formatting. If a disk is offline, check the context and its identity before bringing it online. If the partition shows RAW, Unknown or Not Initialized and the drive previously held files, do not treat that state as permission to initialize or format it.",
          "Initialization is intended for a new disk with no existing data. Microsoft explicitly separates this from troubleshooting a disk that already holds files. If the drive is genuinely new, empty and correctly detected, use Microsoft's supported setup procedure; otherwise preserve the existing layout and investigate why Windows cannot read it."
        ],
        relatedLinks: [
          { label: "How to check SSD health in Windows", href: "/how-to-check-ssd-health-windows", description: "Review drive-health indicators and their limitations." },
          { label: "Laptop NVMe SSD upgrade compatibility", href: "/laptop-nvme-ssd-upgrade-compatibility", description: "Check form factor, interface and slot support for an upgrade." }
        ]
      },
      {
        heading: "Use manufacturer diagnostics without risking files",
        paragraphs: [
          "If Windows or firmware intermittently detects the drive, check the SSD manufacturer's official diagnostic utility and support documentation for the exact model. Save any available error code or health report. Do not assume a single SMART value or an application displaying Good proves the entire storage path is fault-free.",
          "Avoid firmware updates, secure erase, format, partition changes or command-line repairs until you have confirmed the data is backed up and the operation is appropriate for the problem. If the device is disconnecting during use or reporting media errors, prioritize data preservation over stress tests.",
          "For a drive that is not detected in firmware after confirming supported slot, proper installation and model-specific connections, the remaining possibilities may include the SSD itself, the slot, controller or motherboard. A cross-test can help only if performed with compatible hardware and with the data-preservation risks understood."
        ]
      },
      {
        heading: "Know when to stop",
        paragraphs: [
          "Stop when the drive contains irreplaceable data and is repeatedly disappearing, cannot be read, or makes a previously used data volume appear blank or uninitialized. Do not create a new volume to see whether the disk starts working. Record the exact firmware and Disk Management status and seek an experienced storage technician or data-recovery service when the files are important.",
          "Once data is safe, keep a backup and follow the SSD or computer manufacturer's replacement procedure if diagnostics identify a failing drive. If the SSD is detected in firmware but Windows cannot mount a volume, continue with the appropriate Windows storage path rather than immediately buying another drive."
        ],
        relatedLinks: [
          { label: "Why an SSD can slow down over time", href: "/why-ssd-is-slowing-down-windows", description: "Diagnose performance symptoms when the drive is still detected." },
          { label: "NVMe SSD temperatures", href: "/nvme-ssd-temperature-too-high", description: "Check temperature and thermal throttling when the drive remains accessible." }
        ]
      }
    ],
    sources: [
      { label: "Microsoft Learn: Overview of Disk Management", url: "https://learn.microsoft.com/en-us/windows-server/storage/disk-management/overview-of-disk-management" },
      { label: "Microsoft Learn: Initialize new disks", url: "https://learn.microsoft.com/en-us/windows-server/storage/disk-management/initialize-new-disks" },
      { label: "Microsoft Learn: Troubleshoot Disk Management", url: "https://learn.microsoft.com/en-us/troubleshoot/windows-server/backup-and-storage/troubleshoot-disk-management" }
    ],
    faq: [
      { question: "Why is my SSD detected in BIOS but not in File Explorer?", answer: "Windows may see the disk as offline, unallocated, missing a drive letter or unable to read its partition. Check Disk Management without initializing or formatting a drive that already contains data." },
      { question: "Should I initialize an SSD that says Not Initialized?", answer: "Only when you have confirmed it is a new, empty disk with no existing data. If it previously held files, initializing it can put data at risk; investigate the fault and preserve the drive first." },
      { question: "Can an M.2 SSD fit a slot but still not work?", answer: "Yes. Physical fit alone does not confirm that the slot supports the drive's interface or configuration. Check the exact system manual for NVMe/SATA support and shared-slot limitations." },
      { question: "What should I do if an SSD keeps disappearing?", answer: "Protect important files, avoid unnecessary writes and record the manufacturer's diagnostic results. Intermittent detection can involve the drive, connection, slot or controller and needs more than a drive-letter change." }
    ],
    howTo: {
      name: "Diagnose an SSD that is not detected",
      steps: [
        "Protect existing data and do not initialize, format or delete partitions on a previously used drive.",
        "Check whether BIOS or UEFI detects the drive.",
        "If firmware detects it, inspect the correct device in Disk Management and note its exact status.",
        "Use the computer and SSD manufacturer's official manuals and diagnostics for the model.",
        "If important data is at risk or detection remains intermittent, stop further writes and seek qualified service."
      ]
    }
  },
  {
    id: "usb-device-not-recognized",
    slug: "windows-11-usb-device-not-recognized",
    title: "USB Device Not Recognized in Windows: A Diagnostic Guide",
    seoTitle: "USB Device Not Recognized in Windows 11 & 10: Fix",
    dek: "Find out whether a USB problem follows the device, cable, port, hub, power path or Windows driver before reinstalling software or formatting a storage device.",
    metaDescription: "Fix “USB device not recognized” in Windows 11 and 10. Check cables, ports, hubs, Code 43 and driver errors safely—without risking important files.",
    excerpt: "Start by cross-testing the device and cable on a direct port and another computer. Record the exact Device Manager error, and never format a USB storage device containing files you need just because Windows cannot read it.",
    category: "Windows",
    subcategory: "USB and device drivers",
    authorId: "imranNatiq",
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-26",
    heroImage: "/images/gallery/laptop-motherboard-usb-ports-cables.webp",
    readingTime: 6,
    tags: ["Windows 11", "Windows 10", "USB", "Device Manager", "USB-C", "Drivers", "External Storage", "Troubleshooting"],
    appliesTo: ["Windows 11", "Windows 10; USB features depend on the device and port"],
    relatedArticles: ["windows-unknown-device", "windows-troubleshooting-universal"],
    contentRole: "cluster",
    pillarPath: "/windows-troubleshooting-complete-guide",
    searchIntent: "informational",
    testing: "A USB error can originate from the peripheral, cable, port, hub, power budget, device firmware or Windows driver stack. A cross-test isolates the fault more reliably than changing every driver at once. The available error details differ between device classes and Windows versions.",
    content: [
      {
        heading: "Check which part of the USB connection fails",
        paragraphs: [
          "The message USB device not recognized is a symptom, not a diagnosis. The peripheral may be faulty, the cable may carry power but not data, the port or hub may be damaged, the device may need more power, or Windows may have a driver or enumeration problem. A storage drive that does not appear in File Explorer follows a slightly different path from a mouse or keyboard that never connects.",
          "If the device is a USB storage drive with important files, do not accept a format or initialization prompt as a fix. Preserve the data first. If the connector or port is visibly damaged, hot, smells burnt or only works when held at an angle, stop testing it."
        ],
        table: {
          caption: "Use controlled cross-tests to isolate a USB failure",
          headers: ["Test result", "What it suggests", "Next step"],
          rows: [
            ["One device fails in one port", "Port, cable or device-specific issue", "Try a direct alternate port and a known-good compatible cable."],
            ["Several devices fail in the same port", "Port, hub, power or host-controller path", "Remove the hub and test another direct port."],
            ["Device works on another computer", "Original PC, port, driver or power path", "Inspect Device Manager and test a direct port."],
            ["Device fails on two computers with a known-good cable", "Peripheral, cable compatibility or device firmware", "Check the device manufacturer's support instructions."],
            ["Storage device appears in Disk Management but not File Explorer", "Mounting, partition or drive-letter issue rather than USB enumeration alone", "Follow the SSD/disk detection guide and protect data."]
          ]
        }
      },
      {
        heading: "Test the device, cable, port and hub one at a time",
        paragraphs: [
          "Disconnect the device, wait briefly and connect it directly to a built-in USB port rather than a dock or unpowered hub. On a desktop, test another accessible port that is documented for the same connector type. For a device with a detachable cable, try a known-good cable that supports the device's data and power needs; some cables are intended primarily for charging.",
          "If the peripheral needs substantial power, use its manufacturer-approved power supply or a suitable powered hub. A hub adds another component to the connection path, so remove it during initial isolation and add it back only after the direct test is stable.",
          "Test the same device on another computer if available. If it works there, focus on the original PC's port, host controller, driver stack or power path. If it fails across systems with a known-good cable, the peripheral or its firmware becomes a stronger suspect. Neither test is conclusive on its own, but together they narrow the possibilities."
        ],
        steps: [
          "Safely disconnect the peripheral and inspect the connector externally.",
          "Connect directly to a different suitable port without a hub.",
          "Test with a known-good, data-capable cable where the cable is detachable.",
          "Try the same device on another computer if available.",
          "Record exactly which combination succeeds or fails before changing drivers."
        ]
      },
      {
        heading: "Read the Device Manager error before reinstalling a driver",
        paragraphs: [
          "Open Device Manager, find the affected device or Unknown USB Device entry, and open Properties. Record the exact Device status error code and the device name before making changes. A yellow warning symbol shows that Windows has a problem with the device, but the code and device class give more useful direction.",
          "If the code points to a missing or malfunctioning driver, use Windows Update or the peripheral maker's official support page for the exact model and Windows version. Microsoft documents how to update, reinstall or roll back a specific driver through Device Manager. Avoid bulk driver updaters and registry cleaners.",
          "If the issue began immediately after a driver update, use the driver's Roll Back Driver option when available and compare behavior. If you uninstall a device entry as a targeted troubleshooting step, save your work first and restart Windows so it can re-enumerate the hardware. Do not repeatedly uninstall every USB controller without a model-specific reason."
        ],
        table: {
          caption: "Common USB Device Manager statuses and what to check next",
          headers: ["Device Manager status", "What it means", "Safe first action"],
          rows: [
            ["Unknown USB Device (Device Descriptor Request Failed)", "Windows could not retrieve a valid device descriptor during USB enumeration. The entry may also show Code 43; that code alone does not identify which component failed.", "Try a known-good data-capable cable and direct port, then test the device on another computer."],
            ["Unknown USB Device (Port Reset Failed)", "Windows could not complete the port-reset step needed to initialize communication.", "Remove a hub or adapter, fully shut down, and retest a direct port."],
            ["Unknown USB Device (Set Address Failed)", "Windows could not complete the USB address-assignment step during enumeration.", "Remove extensions and test a known-good cable on another direct port or computer."],
            ["Code 43 — Windows has stopped this device because it has reported problems", "A device or controlling driver reported a problem. This is a general status, not proof that the cable, port or device itself is at fault.", "Cross-test the device, then follow the exact manufacturer's guidance or targeted driver steps."],
            ["Code 10 — This device cannot start", "Windows could not start the device successfully; this status alone does not distinguish a driver issue from a hardware or communication fault.", "Check whether the device works on another computer and review the model-correct official driver. Consider rollback only if the problem began after an update."],
            ["Code 28 — The drivers for this device are not installed", "Windows does not have a matching driver installed for the device.", "Open Properties > Details > Hardware Ids, then locate the driver through the PC or peripheral manufacturer's support page."]
          ]
        },
        relatedLinks: [
          { label: "Unknown device in Device Manager", href: "/windows-11-unknown-device-device-manager", description: "Use hardware IDs and device status to identify a driver problem." },
          { label: "SSD not detected in BIOS or Windows", href: "/ssd-not-detected-in-bios-or-windows", description: "Follow the data-safe workflow when the USB device is storage." }
        ]
      },
      {
        heading: "Clear a latched USB power state and check selective suspend",
        paragraphs: [
          "A full power-off can clear a temporarily stuck USB controller or power state after sleep/wake or a protective shutdown, but it is not a diagnosis. Stop if a port is loose, unusually hot, visibly damaged or smells burnt. Follow the computer maker's model-specific reset instructions if provided.",
          "USB selective suspend lets Windows suspend an idle USB device to save power. If failure consistently follows sleep/wake or long idle periods, review power-management options only as a controlled test. Microsoft recommends leaving selective suspend enabled by default; do not disable it globally as a routine fix."
        ],
        steps: [
          "Safely disconnect USB peripherals. Do not reconnect a device or cable that shows heat or visible damage.",
          "Use Windows Shut down, not Restart or Sleep, and wait until the system is fully powered off.",
          "On a desktop, unplug mains power and hold the case power button for about 15 seconds, then leave it disconnected for about 60 seconds before restoring power. Follow the motherboard manufacturer's instructions if they differ.",
          "On a laptop, unplug the charger and accessories, leave the system fully shut down for about 60 seconds, and use the laptop maker's documented embedded-controller (EC) reset procedure if one applies. Do not open the chassis or disconnect an internal battery for this check.",
          "Reconnect power and test one known-good, low-power USB device directly on a different port before reconnecting other peripherals.",
          "If failures track sleep, idle or battery power, open Device Manager > Universal Serial Bus controllers and inspect the relevant USB Root Hub's Power Management tab if it is available. Record the original setting; options vary by hardware and driver. Change only one relevant setting and restore it if the test does not help.",
          "If USB selective suspend appears in the active power plan, treat it as a diagnostic variable, not an automatic fix. Restore its original setting after the comparison if no clear improvement occurs."
        ]
      },
      {
        heading: "Treat USB storage differently from a keyboard or mouse",
        paragraphs: [
          "If a USB flash drive or external SSD is detected by Windows but not shown in File Explorer, open Disk Management and inspect its status without making changes. It may be offline or lack a drive letter, but it may also have a damaged partition or failing storage. Use its capacity and identity to make sure you are looking at the correct device.",
          "Do not initialize, format, delete partitions or run destructive disk commands on a drive containing important files. If it reports RAW, Not Initialized, I/O errors or disappears intermittently, prioritize a backup or recovery path rather than trying to make the warning disappear.",
          "For USB-C devices, check the port and cable capability as well as the connector shape. A USB-C port may support a subset of data, display or power features, and a physically compatible cable does not automatically support every mode. Use the device and computer manuals for the exact capabilities."
        ],
        relatedLinks: [
          { label: "Complete Windows troubleshooting guide", href: "/windows-troubleshooting-complete-guide", description: "Start with the symptom-first workflow if the fault extends beyond USB." }
        ]
      },
      {
        heading: "When the fault needs hardware service",
        paragraphs: [
          "Stop using a port that is loose, visibly bent, burnt or unusually hot. Do not force an oversized connector into a port, bend the plug to maintain contact, or open a powered device to inspect its circuitry. A damaged port or peripheral may need service even if Windows no longer displays an error.",
          "If several devices fail on one PC after direct-port and cross-computer tests, update Windows through supported channels and check the computer manufacturer's official chipset or USB-controller guidance. If the machine is under warranty or the controller problem persists, seek model-specific service rather than installing unrelated drivers."
        ]
      }
    ],
    sources: [
      { label: "Microsoft Support: Fix USB-C problems in Windows", url: "https://support.microsoft.com/en-us/windows/hardware/usb/fix-usb-c-problems-in-windows" },
      { label: "Microsoft Support: Update drivers through Device Manager", url: "https://support.microsoft.com/en-us/windows/update-drivers-through-device-manager-in-windows-ec62f46c-ff14-c91d-eead-d7126dc1f7b6" },
      { label: "Microsoft Learn: Overview of Disk Management", url: "https://learn.microsoft.com/en-us/windows-server/storage/disk-management/overview-of-disk-management" },
      { label: "Microsoft Support: Error codes in Device Manager in Windows", url: "https://support.microsoft.com/en-us/windows/hardware/drivers/error-codes-in-device-manager-in-windows" },
      { label: "Microsoft Learn: Troubleshooting an unknown USB device", url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/case-study--troubleshooting-an-unknown-usb-device-by-using-etw-and-netmon" },
      { label: "Microsoft Learn: USB selective suspend", url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/usb-selective-suspend" }
    ],
    faq: [
      { question: "Why does Windows say USB device not recognized?", answer: "The message can arise from the device, cable, port, hub, power path or Windows driver stack. Test a direct port, a suitable known-good cable and another computer before choosing a repair." },
      { question: "Should I uninstall all USB controllers in Device Manager?", answer: "No. Start with the exact device and its error code, then follow the manufacturer's or Microsoft's targeted guidance. Broad controller changes can disrupt other peripherals and are not the first step." },
      { question: "What if my USB drive asks to be formatted?", answer: "Do not format it if you need the files. Check the drive's identity and status, avoid writes, and use a data-preservation or recovery path if the data matters." },
      { question: "Can a USB-C cable charge a device but fail to transfer data?", answer: "Yes. Cable capabilities vary. Use a known-good cable that supports the data function and power level required by the device, and verify the port capabilities in the manufacturer's documentation." }
    ],
    howTo: {
      name: "Troubleshoot a USB device that Windows does not recognize",
      steps: [
        "Record the exact symptom and protect data if the device is a storage drive.",
        "Test a direct port, compatible cable and another computer where possible.",
        "Record the device's error code in Device Manager.",
        "Use Windows Update or the device maker's official targeted driver for the exact model.",
        "Stop if the connector or port is physically damaged or a storage device shows signs of failure."
      ]
    }
  }
];