// Editor-reviewed navigation paths. Keep links specific to the reader's next decision.
export type TopicLink = readonly [path: string, reason: string];
export const topicLinks: Record<string, readonly TopicLink[]> = {
  "/pc-game-stuttering-fix-frame-time": [
    [
      "/gamebar-presence-writer-fix",
      "Test Game Bar and capture settings as one variable in a repeatable stutter investigation."
    ],
    [
      "/reviews/gpus",
      "Compare GPU specifications only after diagnosing frame delivery."
    ]
  ],
  "/research/what-actually-causes-pc-game-stuttering": [
    [
      "/gamebar-presence-writer-fix",
      "Separate a background process hypothesis from measured frame-time evidence."
    ]
  ],
  "/pc-games-crashing-to-desktop-troubleshooting": [
    [
      "/pc-power-supply-problems-symptoms",
      "Investigate power-related instability when the symptoms warrant it."
    ],
    [
      "/windows-11-blue-screen-stop-code-how-to-read",
      "Distinguish a game crash from a Windows stop error."
    ]
  ],
  "/windows-11-26h2-installation-guide": [
    [
      "/windows-11-26h2-iso-released",
      "Read the dated release and ISO context separately from installation instructions."
    ],
    [
      "/windows-secure-boot-certificate-update",
      "Check the separate Secure Boot certificate transition before changing firmware."
    ]
  ],
  "/windows-patch-tuesday": [
    [
      "/windows-11-8gb-ram-update-october-2026",
      "Review the dated memory-related Windows update coverage rather than treating it as a hardware requirement change."
    ]
  ],
  "/why-8gb-ram-is-no-longer-enough-for-windows-11": [
    [
      "/windows-11-8gb-ram-update-october-2026",
      "Distinguish the October update coverage from general advice about memory capacity."
    ],
    [
      "/best-ram",
      "Check capacity and compatibility before choosing memory."
    ]
  ],
  "/bios-uefi-recovery-guide": [
    [
      "/windows-secure-boot-certificate-update",
      "Check certificate status without assuming that a firmware reset is needed."
    ],
    [
      "/ssd-not-detected-in-bios-or-windows",
      "If a drive disappears after firmware changes, isolate the detection stage."
    ]
  ],
  "/why-windows-asks-for-a-bitlocker-recovery-key-after-bios-update": [
    [
      "/windows-secure-boot-certificate-update",
      "Understand the separate certificate update and avoid unnecessary changes to boot security."
    ]
  ],
  "/laptop-battery-warning-signs": [
    [
      "/laptop-plugged-in-not-charging",
      "Separate a charging problem from a worn or unsafe battery."
    ]
  ],
  "/laptop-wont-turn-on": [
    [
      "/laptop-plugged-in-not-charging",
      "Check external power and charging symptoms before opening a laptop."
    ],
    [
      "/pc-turns-on-but-no-display",
      "A powered device without a display needs a different diagnostic path."
    ]
  ],
  "/windows-11-unknown-device-device-manager": [
    [
      "/windows-11-usb-device-not-recognized",
      "When the unknown device is connected over USB, isolate the port, cable and device first."
    ]
  ],
  "/windows-11-wifi-connected-no-internet": [
    [
      "/windows-11-wifi-keeps-disconnecting",
      "If the connection drops repeatedly rather than staying connected, follow the disconnect-specific checks."
    ]
  ],
  "/how-to-check-ssd-health-windows": [
    [
      "/ssd-not-detected-in-bios-or-windows",
      "If the SSD cannot be seen at all, establish detection before attempting a health report."
    ],
    [
      "/research/how-ssd-temperature-affects-performance",
      "Learn how temperature and workload can affect SSD performance."
    ]
  ],
  "/gpu-overheating-gaming-pc-causes-fix": [
    [
      "/reviews/gpus",
      "Use product-specific thermal and power evidence when comparing a replacement."
    ]
  ],
  "/best-ssds": [
    [
      "/reviews/ssds",
      "Browse exact SSD specifications, endurance ratings and independent testing references."
    ],
    [
      "/compare/samsung-990-pro-vs-crucial-t500",
      "Compare two specific SSD capacities and specifications before choosing."
    ]
  ],
  "/best-gaming-laptops": [
    [
      "/reviews/laptops",
      "Compare exact laptop configurations instead of model-family names."
    ],
    [
      "/gaming-laptop-upgradeable-ram-ssd",
      "Check upgrade options before paying for a configuration."
    ]
  ],
  "/best-gaming-monitors": [
    [
      "/reviews/gpus",
      "Match display resolution and refresh targets to the GPU and independently tested workload."
    ]
  ],
  "/best-ram": [
    [
      "/reviews/cpus",
      "Check the processor platform and motherboard memory requirements before buying RAM."
    ]
  ],
  "/laptop-nvme-ssd-upgrade-compatibility": [
    [
      "/reviews/ssds",
      "Compare actual SSD form factors and interfaces after identifying the supported slot."
    ]
  ],
  "/pc-game-low-fps-how-to-find-the-cause": [
    [
      "/reviews/cpus",
      "Compare CPU evidence when the diagnosis points to a processor limit."
    ],
    [
      "/compare/rtx-5070-ti-vs-rx-9070-xt",
      "Compare GPU specifications only when graphics performance is the relevant constraint."
    ]
  ],
  "/tools/frame-time-analyzer": [
    [
      "/gamebar-presence-writer-fix",
      "Compare the same game scene before and after changing Game Bar settings."
    ],
    [
      "/research/what-actually-causes-pc-game-stuttering",
      "Interpret frame-time patterns with a clear distinction between measured results and hypotheses."
    ]
  ],
  "/tools/windows-battery-health-analyzer": [
    [
      "/laptop-plugged-in-not-charging",
      "Battery health alone cannot establish why a laptop is not charging."
    ],
    [
      "/laptop-battery-warning-signs",
      "Recognize physical battery warning signs that take priority over a report."
    ]
  ],
  "/tools/secure-boot-status-checker": [
    [
      "/windows-secure-boot-certificate-update",
      "Understand the certificate transition and the meaning of the status check."
    ],
    [
      "/why-windows-asks-for-a-bitlocker-recovery-key-after-bios-update",
      "Protect access to encrypted data before considering firmware changes."
    ]
  ],
  "/tools/windows-support-lifecycle-checker": [
    [
      "/windows-11-26h2-installation-guide",
      "Use the installation guide after checking the relevant Windows release and support status."
    ],
    [
      "/windows-patch-tuesday",
      "Review monthly updates separately from lifecycle dates."
    ]
  ],
  "/tools/windows-repair-log-analyzer": [
    [
      "/windows/windows-update-stuck",
      "Use log findings alongside the update-specific troubleshooting sequence."
    ]
  ],
  "/tools/psu-wattage-calculator": [
    [
      "/pc-power-supply-problems-symptoms",
      "Wattage estimates are planning inputs, not a diagnosis of a failing PSU."
    ]
  ],
  "/tools/ram-calculator": [
    [
      "/how-much-ram-do-you-need-gaming",
      "Compare memory capacity requirements with actual usage."
    ]
  ],
  "/tools/storage-calculator": [
    [
      "/ssd-nearly-full-windows-performance",
      "Understand why workload and available space matter beyond a capacity estimate."
    ]
  ],
  "/tools/pc-bottleneck-calculator": [
    [
      "/reviews/cpus",
      "Compare CPU specifications and independent performance evidence."
    ],
    [
      "/reviews/gpus",
      "Compare GPU-specific specifications and testing evidence."
    ]
  ]
};
export const productTopicLinks: Record<string, readonly TopicLink[]> = {
  "SSD": [
    [
      "/best-ssds",
      "Choose capacity, interface and endurance for the intended workload."
    ],
    [
      "/laptop-nvme-ssd-upgrade-compatibility",
      "Check form factor and interface before buying for a laptop."
    ]
  ],
  "GPU": [
    [
      "/pc-game-low-fps-how-to-find-the-cause",
      "Identify the performance bottleneck before replacing a graphics card."
    ],
    [
      "/tools/psu-wattage-calculator",
      "Estimate system power requirements and verify the exact PSU and GPU specifications."
    ]
  ],
  "Laptop": [
    [
      "/best-gaming-laptops",
      "Compare laptop configurations, cooling, displays and upgradeability."
    ],
    [
      "/gaming-laptop-upgradeable-ram-ssd",
      "Check the exact laptop configuration before planning an upgrade."
    ]
  ],
  "CPU": [
    [
      "/tools/pc-bottleneck-calculator",
      "Use a planning estimate alongside independent benchmarks and actual workload data."
    ],
    [
      "/ddr4-vs-ddr5-ram-difference",
      "Verify memory platform compatibility before buying a processor or motherboard."
    ]
  ]
};
