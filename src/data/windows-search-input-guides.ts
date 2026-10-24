import type { Article } from './articles';

/**
 * Windows Search and input-device guides.
 * These symptom-led articles cite Microsoft's published guidance and prioritize
 * reversible tests, controlled comparisons and model-specific cautions.
 */
export const windowsSearchInputGuides: Article[] = [
  {
    "id": "windows-search-not-working",
    "slug": "windows-search-not-working",
    "title": "Windows Search Not Working: Fix Start Menu and Missing Results",
    "seoTitle": "Windows Search Not Working? Fix",
    "dek": "When Start-menu search returns nothing, cannot find apps, or misses files, first separate a search-index problem from a broken Windows shell, an unindexed folder, or an issue limited to one app.",
    "metaDescription": "Windows Search not working? Diagnose blank results, missing files, indexing delays and Start-menu problems before rebuilding the index.",
    "excerpt": "Start by identifying where search fails. Start-menu app search, File Explorer file search, web results and one application's search can fail for different reasons.",
    "category": "Windows",
    "subcategory": "Search and productivity",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 8,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Windows Search",
      "Start menu",
      "Search indexing",
      "Troubleshooting"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal"
    ],
    "testing": "This guide uses Microsoft's published documentation for Search indexing and troubleshooting. Windows menu names and available troubleshooters can vary by Windows build and device policy; the article does not claim every procedure was reproduced on every build.",
    "sources": [
      {
        "label": "Microsoft Support — Search indexing in Windows",
        "url": "https://support.microsoft.com/en-us/windows/experience/performance-optimization/search-indexing-in-windows"
      },
      {
        "label": "Microsoft Support — Troubleshooting Outlook search issues",
        "url": "https://support.microsoft.com/en-us/outlook/troubleshooting-outlook-search-issues"
      },
      {
        "label": "Microsoft Support — Start menu and XAML-dependent app issue (KB5072911)",
        "url": "https://support.microsoft.com/en-us/servicing/os/windows/docs/2025/11/kb5072911-explorer-the-start-menu-and-other-xaml-dependent-apps-might-not-start-or-close-unexpectedl"
      }
    ],
    "content": [
      {
        "heading": "Identify which kind of search is failing",
        "paragraphs": [
          "Windows search is not one single result source. Start-menu search can look for apps, settings and files; File Explorer searches folders and file metadata; individual apps maintain their own search behavior; and online results depend on connectivity and account or organization settings. If only one app fails, start with that app's search guidance rather than rebuilding the Windows index.",
          "Before changing settings, try two different queries: a short name for a built-in app and the exact name of a file you know exists. Note whether the search box opens, whether it accepts typing, whether it shows no results, or whether it freezes. Also note whether File Explorer search and other apps still work."
        ],
        "table": {
          "caption": "Match the failure pattern to the most useful first check",
          "headers": [
            "What happens",
            "Possible area",
            "First check"
          ],
          "rows": [
            [
              "Search or Start will not open, or freezes",
              "Windows shell, recent update, profile or system component",
              "Restart once, then check Windows Update and whether Start or other shell features also fail."
            ],
            [
              "Apps appear but local files are missing",
              "Indexed locations, filters or indexing state",
              "Check Search settings and confirm the file's folder is in the locations being searched."
            ],
            [
              "File Explorer search works but one app does not",
              "That app's own index, account or configuration",
              "Use the app's official search troubleshooting steps."
            ],
            [
              "Results appear slowly after setup or a rebuild",
              "Index is still being created or updated",
              "Check indexing status and allow time for the initial pass to finish."
            ],
            [
              "Only online results fail",
              "Network, account, privacy or organization settings",
              "Test local app/file search separately and check connectivity."
            ]
          ]
        }
      },
      {
        "heading": "Start with reversible checks",
        "paragraphs": [
          "Save open work and restart Windows. If the problem began immediately after an update, driver installation or new utility, record that change before trying more fixes. Test search again after startup with the same two queries.",
          "Check whether the problem affects every user account on the PC, if another account is available. A failure limited to one profile points toward profile-specific settings or data; a failure across accounts makes a wider Windows or indexing issue more plausible. Neither result proves a particular cause.",
          "If Start, Settings, the taskbar and Search are all failing together, do not assume the search index is the cause. Microsoft has documented certain update/provisioning scenarios affecting XAML-dependent Windows components; install the appropriate current cumulative update for your device and organization rather than running registry scripts copied from an unrelated fix."
        ],
        "steps": [
          "Write down exactly where search fails and when it started.",
          "Restart Windows and repeat the same search test.",
          "Check Windows Update, including whether a required restart is pending.",
          "Compare Start-menu search with File Explorer and the affected app's own search.",
          "If available, compare with another Windows user profile before making deeper changes."
        ]
      },
      {
        "heading": "Check the folders Windows is indexing",
        "paragraphs": [
          "Open Settings and look for Privacy & security > Searching Windows on Windows 11. The page offers Classic and Enhanced indexing modes. Classic includes common user folders by default; Enhanced searches more broadly across user folders and files, but can use more system resources. Choose based on the folders you actually need searchable.",
          "With Classic indexing, use the indexed-location controls to check whether the missing file's folder is included. Search may not find a file by its contents when that file type is configured for properties-only indexing. A search that misses a file outside indexed locations is not, by itself, evidence that Windows Search is damaged.",
          "The first index build may take a while, potentially a couple of hours on some systems. Check whether indexing is still progressing and allow the initial pass to complete before judging the result. Large collections, low system resources and frequent file changes can affect timing."
        ],
        "bullets": [
          "Test an exact filename before trying a broad phrase.",
          "Confirm the file is in a folder Windows is configured to index.",
          "Check whether you need file names only or searchable file contents.",
          "Avoid indexing every external, network or removable location without considering performance and availability."
        ],
        "relatedLinks": [
          {
            "label": "File Explorer not responding",
            "href": "/windows-file-explorer-not-responding",
            "description": "Use this when Explorer itself freezes or a particular folder hangs, rather than when search only misses results."
          },
          {
            "label": "Windows troubleshooting complete guide",
            "href": "/windows-troubleshooting-complete-guide",
            "description": "Return to symptom-first troubleshooting if several Windows components are failing."
          }
        ]
      },
      {
        "heading": "Use the indexer troubleshooter before rebuilding the index",
        "paragraphs": [
          "On supported Windows 11 builds, look under Settings > Privacy & security > Searching Windows for the Indexer troubleshooter. Its location and availability can change with Windows updates and managed-device policy. Follow the diagnostic results and note any reported issue before resetting data.",
          "If the index appears incomplete or corrupted after checking locations and allowing it to finish, Windows provides an Advanced indexing option to rebuild it. Rebuilding is not an instant repair: search results can be incomplete while the index is recreated, and the process may take time and use system resources. Keep the PC available and powered while the index is being rebuilt.",
          "Do not begin by deleting Search database files, importing registry fixes, re-registering system packages with generic scripts, or disabling security services. Those actions can create a second problem and make it harder to identify the original failure."
        ],
        "steps": [
          "Run the available Indexer troubleshooter and record its result.",
          "Verify the relevant folders and file types are included.",
          "Rebuild the index only if the evidence points to an index issue.",
          "Wait for the index to finish, then repeat the exact same searches.",
          "If Search or Start still fails across the system, investigate Windows updates, system health and the user profile rather than repeatedly rebuilding the index."
        ]
      },
      {
        "heading": "When the problem needs deeper diagnosis",
        "paragraphs": [
          "Escalate beyond indexing if Search will not open, Start or Settings also fail, the problem began after a particular cumulative update, or several built-in Windows apps crash together. Record the Windows build from winver, the update history, any error message, and whether the issue affects one or every user profile.",
          "For a work or school PC, organization policies may control indexing, web results or update installation. Ask the administrator before changing managed settings. If only a specific third-party app or Outlook search fails, follow that application's repair path and avoid changing Windows-wide indexing without confirming it is involved."
        ],
        "bullets": [
          "Back up important files before any reset or reinstall.",
          "Avoid unofficial repair utilities that promise to fix all Windows Search problems automatically.",
          "If the fault appeared directly after a known update, check Microsoft's current update-health documentation for the relevant Windows version before using a workaround."
        ]
      },
      {
        "heading": "Bottom line",
        "paragraphs": [
          "A blank search result does not automatically mean the index is corrupt. Establish whether Search itself is broken, the target location is excluded, indexing is still running, or one application has its own issue. Use the indexer troubleshooter and rebuild only when the evidence supports it."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does Windows Search find apps but not my files?",
        "answer": "The folder may not be indexed, the selected indexing mode may not cover it, or the file type may be configured for properties-only indexing. Check the file's location and Search settings first."
      },
      {
        "question": "How long should Windows indexing take?",
        "answer": "Microsoft notes that an initial index can take up to a couple of hours. Large libraries, device performance and ongoing file changes can affect the time; check status before rebuilding again."
      },
      {
        "question": "Should I rebuild the Windows Search index immediately?",
        "answer": "No. Verify indexed locations and allow the current index to finish first. Rebuilding temporarily changes search results and may take time."
      },
      {
        "question": "What if the Start menu and Search both fail to open?",
        "answer": "That pattern can involve the Windows shell or an update-related problem rather than just indexing. Check Windows Update and Microsoft's current issue documentation for the device's build."
      }
    ]
  },
  {
    "id": "windows-touchpad-not-working",
    "slug": "windows-touchpad-not-working",
    "title": "Laptop Touchpad Not Working in Windows: Safe Diagnosis",
    "seoTitle": "Laptop Touchpad Not Working? Windows Fixes",
    "dek": "A touchpad that stops moving the pointer, ignores taps or loses gestures may be disabled, affected by settings, or missing a working driver. Separate those possibilities before uninstalling anything.",
    "metaDescription": "Laptop touchpad not working in Windows? Check touchpad settings, function keys, external-mouse behavior and drivers safely.",
    "excerpt": "Start with the simplest distinction: is the touchpad disabled, are only gestures failing, or has Windows stopped detecting the device? Those symptoms require different fixes.",
    "category": "Windows",
    "subcategory": "Input devices",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 7,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Laptop touchpad",
      "Touchpad driver",
      "Cursor",
      "Input devices"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "Laptops with built-in touchpads"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal"
    ],
    "testing": "This guide follows Microsoft's published touchpad troubleshooting and driver guidance. Function-key combinations and advanced touchpad controls differ between laptop manufacturers; use the exact model's support instructions for those controls.",
    "sources": [
      {
        "label": "Microsoft Support — Fix touchpad problems in Windows",
        "url": "https://support.microsoft.com/en-au/windows/hardware/input-devices/fix-touchpad-problems-in-windows"
      },
      {
        "label": "Microsoft Support — Touch gestures for Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/input-devices/touch-gestures-for-windows"
      }
    ],
    "content": [
      {
        "heading": "Identify what has stopped working",
        "paragraphs": [
          "A touchpad problem can mean the pointer will not move, clicks do not register, scrolling or multi-finger gestures have stopped, or the touchpad disappears from Settings. A gesture-only failure is not the same as a device that Windows no longer detects.",
          "If the touchpad stopped after connecting a mouse, pressing a function key, installing an update or waking from sleep, note that timing. Connect a known-good USB mouse if available so you can navigate Settings and Device Manager without repeatedly pressing touchpad shortcuts."
        ],
        "table": {
          "caption": "Touchpad symptoms and their first checks",
          "headers": [
            "Symptom",
            "Possible area",
            "First check"
          ],
          "rows": [
            [
              "Pointer does not move at all",
              "Touchpad disabled, hotkey, driver or hardware",
              "Check Settings and the model-specific touchpad/function-key toggle."
            ],
            [
              "Pointer works but taps or clicks fail",
              "Click/tap settings, surface condition or driver",
              "Test physical click and review touchpad settings."
            ],
            [
              "Basic movement works but scrolling or gestures fail",
              "Gesture configuration or precision-touchpad support",
              "Review available gesture settings and whether the hardware supports them."
            ],
            [
              "Touchpad is absent from Settings or Device Manager",
              "Driver, firmware setting or hardware detection",
              "Check Device Manager and the laptop maker's support instructions."
            ],
            [
              "Touchpad stops only when a mouse is connected",
              "External-mouse preference",
              "Review whether the device is configured to disable the touchpad when a mouse is attached."
            ]
          ]
        }
      },
      {
        "heading": "Check the touchpad settings and hardware toggle",
        "paragraphs": [
          "In Windows 11, open Settings > Bluetooth & devices > Touchpad. In Windows 10, the page is generally under Settings > Devices > Touchpad. Confirm the touchpad is enabled and inspect the options for taps, scrolling and gestures. Names and available switches vary by device and driver.",
          "Some laptops have a function-key shortcut or a dedicated touchpad toggle. Look for the touchpad symbol on the keyboard and consult the laptop manufacturer's manual for the correct key combination. Do not assume the same Fn shortcut applies to every laptop brand or model.",
          "If the touchpad stops only when a USB or Bluetooth mouse is connected, look for an option that keeps the touchpad enabled when a mouse is attached. If only multi-finger gestures fail, confirm that the device supports those gestures; not all touchpads expose the same features."
        ],
        "steps": [
          "Connect an external mouse if you need a reliable way to navigate.",
          "Open the Touchpad settings page and confirm the touchpad is enabled.",
          "Check the model-specific function key or hardware toggle.",
          "Test pointer movement, taps, physical clicks and scrolling separately.",
          "If the problem affects only gestures, inspect their settings rather than reinstalling the whole device."
        ]
      },
      {
        "heading": "Check whether Windows detects the touchpad",
        "paragraphs": [
          "Open Device Manager and look under Human Interface Devices and Mice and other pointing devices. The exact device name depends on the manufacturer. If the touchpad is listed with a warning symbol, record the message or error code before changing its driver.",
          "If it is missing, check whether a firmware/BIOS option or manufacturer utility can disable the touchpad, and install relevant Windows updates. If the device still does not appear, use the laptop maker's model-specific support route; a missing entry alone cannot tell you whether the cause is firmware, a driver or physical hardware."
        ],
        "bullets": [
          "Record the laptop's exact model and Windows version.",
          "Check for a device status/error code in Device Manager.",
          "Use the support page for the exact model rather than an unrelated driver package.",
          "If the touchpad failed after a hardware repair, liquid exposure or impact, stop assuming that a software setting is the only possible cause."
        ]
      },
      {
        "heading": "Update or reinstall the correct driver",
        "paragraphs": [
          "Microsoft recommends Windows Update as the preferred starting point for touchpad driver updates. Check optional driver updates if they are offered for your device, then restart and retest. You can also inspect the touchpad entry in Device Manager to see whether Windows exposes an update option.",
          "If updating does not help, reinstalling the device driver through Device Manager may help Windows reload the appropriate driver after restart. Before uninstalling anything, make sure you have another way to control the laptop and a working internet connection. On some systems the touchpad driver is supplied by the laptop manufacturer, so follow the official model-specific instructions.",
          "If the problem began immediately after a driver update and a supported rollback option is available, record the current version and consider testing the previous version. Change one variable at a time and check whether pointer behavior improves."
        ],
        "steps": [
          "Install available Windows updates and restart.",
          "Check the laptop manufacturer's support page for the correct touchpad or chipset package.",
          "Use Device Manager's update or reinstall workflow only for the identified device.",
          "Restart, then test the same movement, click and gesture patterns.",
          "If the driver is not detected or the touchpad remains absent, contact the manufacturer or arrange hardware diagnosis."
        ]
      },
      {
        "heading": "When not to keep troubleshooting in Windows",
        "paragraphs": [
          "If the touchpad is physically damaged, has been exposed to liquid, or stopped working immediately after the laptop was opened for repair, power down if there are signs of electrical damage and seek qualified service. A loose internal cable or failed touchpad assembly cannot be ruled in or out from Settings alone.",
          "Do not open the laptop or disconnect internal parts solely to test a touchpad unless you have the correct service instructions and understand the battery and warranty risks. Keep a backup of important data before invasive repair work."
        ],
        "relatedLinks": [
          {
            "label": "Keyboard or mouse not working",
            "href": "/windows-keyboard-mouse-not-working",
            "description": "Use this when an external keyboard, external mouse or wireless receiver is the problem."
          },
          {
            "label": "Bluetooth not working",
            "href": "/windows-11-bluetooth-not-working",
            "description": "Use this if a Bluetooth mouse or keyboard fails to pair or repeatedly disconnects."
          },
          {
            "label": "Windows troubleshooting complete guide",
            "href": "/windows-troubleshooting-complete-guide",
            "description": "Return to the main guide for wider driver or device problems."
          }
        ]
      },
      {
        "heading": "Bottom line",
        "paragraphs": [
          "Check the touchpad's enabled state, the manufacturer's hardware toggle and the exact symptom first. Use Windows Update or the laptop maker's official driver package before more invasive steps, and escalate if the device is not detected or physical damage is possible."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why is my laptop touchpad missing from Settings?",
        "answer": "Windows may not be detecting the device, or its driver, firmware setting or hardware may be involved. Check Device Manager and the exact laptop manufacturer's support instructions."
      },
      {
        "question": "Can a function key disable a laptop touchpad?",
        "answer": "Some laptops provide a keyboard shortcut or dedicated touchpad toggle. The correct key combination varies by model, so use the manufacturer's manual."
      },
      {
        "question": "Should I uninstall the touchpad driver?",
        "answer": "Not as the first step. Check settings, Windows Update and the correct manufacturer driver first. Before reinstalling, make sure you have another way to control the laptop."
      },
      {
        "question": "Why does the touchpad move the pointer but gestures do not work?",
        "answer": "Gestures may be disabled, configured differently, or unsupported by the touchpad hardware. Check the available gesture settings before assuming the driver is broken."
      }
    ]
  },
  {
    "id": "windows-keyboard-mouse-not-working",
    "slug": "windows-keyboard-mouse-not-working",
    "title": "Keyboard or Mouse Not Working in Windows: Troubleshooting",
    "seoTitle": "Keyboard or Mouse Not Working? Windows Fix",
    "dek": "When a keyboard or mouse stops responding, determine whether the problem follows one device, a USB port, a wireless receiver, Bluetooth or Windows before changing drivers.",
    "metaDescription": "Fix a keyboard or mouse that is not working in Windows. Check USB ports, hubs, batteries, wireless pairing, settings and drivers in order.",
    "excerpt": "A wired USB mouse, a wireless receiver and a Bluetooth keyboard use different connection paths. Establish which device and connection fail before changing Windows drivers.",
    "category": "Windows",
    "subcategory": "Input devices",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 8,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Keyboard not working",
      "Mouse not working",
      "USB",
      "Bluetooth",
      "Wireless receiver"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "Wired and wireless keyboards and mice"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal"
    ],
    "testing": "This guide follows Microsoft's published keyboard/mouse and Bluetooth troubleshooting advice. USB behavior, wireless receivers, drivers and firmware vary by device; the diagnostic steps do not prove a specific component has failed.",
    "sources": [
      {
        "label": "Microsoft Support — Mouse and keyboard problems in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/input-devices/mouse-and-keyboard-problems-in-windows"
      },
      {
        "label": "Microsoft Support — Fix Bluetooth problems in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/bluetooth/fix-bluetooth-problems-in-windows"
      },
      {
        "label": "Microsoft Support — Pair a Bluetooth device in Windows",
        "url": "https://support.microsoft.com/en-US/Windows/Hardware/bluetooth/pair-a-bluetooth-device-in-windows"
      }
    ],
    "content": [
      {
        "heading": "First decide whether one device or the whole input path has failed",
        "paragraphs": [
          "A keyboard or mouse that does not respond can be affected by power, batteries, a damaged cable, a USB port, a hub, a wireless receiver, Bluetooth pairing, a driver or the device itself. If both stop at the same time, check shared connections and Windows behavior before concluding that both devices failed independently.",
          "If you can, connect a known-good wired keyboard or mouse directly to the computer. For a laptop, the built-in touchpad or on-screen keyboard may provide a temporary path into Settings. Test the failing device on another compatible computer if available; do not plug an unfamiliar device into a work machine or use an untrusted USB accessory."
        ],
        "table": {
          "caption": "Match the input-device symptom to the first check",
          "headers": [
            "Symptom",
            "Possible area",
            "First check"
          ],
          "rows": [
            [
              "Wired USB device is completely unresponsive",
              "Cable, port, hub, device power or driver",
              "Reconnect it directly to another USB port and bypass any hub."
            ],
            [
              "Wireless receiver device has no response",
              "Battery, receiver, pairing or USB port",
              "Check battery/charge, reconnect the receiver and use the manufacturer's pairing instructions."
            ],
            [
              "Bluetooth keyboard or mouse is missing or disconnects",
              "Bluetooth radio, pairing, battery or driver",
              "Confirm Bluetooth is on, the accessory is charged and it is in pairing mode."
            ],
            [
              "Keyboard types the wrong characters",
              "Input layout, Num Lock, accessibility or app settings",
              "Check the active keyboard layout and whether the issue occurs in more than one app."
            ],
            [
              "Only some keys or mouse buttons fail",
              "Physical obstruction, wear, device settings or application behavior",
              "Inspect for debris and test in another app or on another host."
            ],
            [
              "Both keyboard and mouse fail together",
              "Shared USB hub, receiver, power state or Windows input stack",
              "Use a direct connection and determine whether other Windows controls still respond."
            ]
          ]
        }
      },
      {
        "heading": "Troubleshoot wired USB keyboards and mice",
        "paragraphs": [
          "Unplug the device, wait briefly, then reconnect it. Try a different USB port and connect directly to the computer instead of through a hub, dock or monitor. If the hub has external power, confirm that it is connected and powered. Check the cable and connector for visible damage.",
          "If one port works and another does not, the device may be fine and the fault may involve the port, hub or dock. If the same device also fails on another compatible computer, the device or cable becomes a stronger suspect. These comparisons narrow the path but are not definitive hardware tests.",
          "Do not force a connector into a port, use liquid to clean the device, or continue using a damaged cable. If a USB port is bent, loose, unusually hot or smells burnt, stop using it and arrange inspection."
        ],
        "steps": [
          "Reconnect the device and test a second direct USB port.",
          "Bypass a hub, docking station or monitor USB port if possible.",
          "Test a known-good device in the same port and the affected device on another compatible computer.",
          "For a laptop with no working input, connect a reliable external keyboard/mouse before proceeding.",
          "Record which connection/device combinations work rather than changing several things at once."
        ],
        "relatedLinks": [
          {
            "label": "USB device not recognized in Windows",
            "href": "/windows-11-usb-device-not-recognized",
            "description": "Use this for device-detection errors, connection chimes, or a USB device that does not appear in Windows."
          },
          {
            "label": "Laptop touchpad not working",
            "href": "/windows-touchpad-not-working",
            "description": "Use this when the built-in laptop touchpad, rather than an external mouse, fails."
          }
        ]
      },
      {
        "heading": "Check batteries, receivers and Bluetooth",
        "paragraphs": [
          "For battery-powered devices, recharge them or fit fresh batteries in the correct orientation. Check the device's power switch and status light. For USB receiver models, connect the receiver directly to the computer and follow the manufacturer's pairing or reset process if the device has lost its link.",
          "Bluetooth devices must be charged, discoverable and within range. In Windows, verify Bluetooth is enabled and remove/re-pair the accessory only if you can reliably navigate Settings. If Bluetooth itself is missing or many accessories disconnect, use the separate Bluetooth troubleshooting guide rather than repeatedly pairing the same keyboard or mouse.",
          "Do not assume a 2.4 GHz USB receiver and Bluetooth are interchangeable. Some peripherals support both modes, some support only one, and the manufacturer's directions determine which connection method applies."
        ],
        "bullets": [
          "Turn the device off and on once, then check battery or charge status.",
          "For a Bluetooth accessory, verify pairing mode and remove nearby interference where practical.",
          "Test another Bluetooth accessory if available to see whether the problem follows one device or the PC.",
          "For receiver-based models, confirm the correct receiver is being used and connected."
        ],
        "relatedLinks": [
          {
            "label": "Bluetooth not working in Windows",
            "href": "/windows-11-bluetooth-not-working",
            "description": "Diagnose missing Bluetooth controls, pairing failures and repeated drops."
          }
        ]
      },
      {
        "heading": "Check keyboard layout and input settings",
        "paragraphs": [
          "If the keyboard responds but types unexpected characters, first check the active keyboard layout or input language. Also verify Num Lock on keyboards with a numeric keypad and test the same keys in another application. This symptom is different from a keyboard that produces no input at all.",
          "For slow or repeated input, check whether the issue happens in every app and after closing unusually resource-heavy programs. Some accessibility options change how keys repeat or how modifier keys behave. Review those settings only if the symptoms match, and record the original values before changing them.",
          "If only one key or button consistently fails across different applications and another computer, physical wear or damage becomes more likely. Software tests cannot repair a broken switch or cable."
        ]
      },
      {
        "heading": "Update device drivers through trusted sources",
        "paragraphs": [
          "If the device powers on and the physical connection is sound but Windows does not detect it, check Device Manager for a warning icon or error code under Keyboards, Mice and other pointing devices, Human Interface Devices or Universal Serial Bus controllers. The exact category depends on the device and driver.",
          "Start with Windows Update and, where needed, the official support page for the exact computer or peripheral. Avoid third-party driver-updater tools. If the failure started just after an update and a supported rollback option is available, record the driver version before testing the previous version.",
          "Before uninstalling an input-device driver, make sure an alternate input method is available. Blindly removing drivers from a system that has no working keyboard or mouse can make recovery unnecessarily difficult."
        ],
        "steps": [
          "Record the device name and any Device Manager error code.",
          "Install applicable Windows updates and restart.",
          "Check the PC or peripheral maker's official support page for model-specific drivers.",
          "Change one driver or connection variable at a time, then repeat the original test.",
          "If the device remains undetected across known-good ports and hosts, consider hardware service or replacement."
        ]
      },
      {
        "heading": "When to seek repair or use a fallback",
        "paragraphs": [
          "If an input device was exposed to liquid, has a damaged connector, becomes unusually hot or has a burning smell, disconnect it and stop testing. For a desktop with no working keyboard or mouse, a known-good wired USB device is often the simplest recovery path; on many laptops, the built-in touchpad or Windows on-screen keyboard can help temporarily if those controls still work.",
          "If both input devices fail only after Windows starts, but work in firmware setup or another boot environment, investigate Windows drivers, startup utilities or recent updates. If they fail in multiple environments and on different ports, hardware or firmware deserves more attention. Do not assume one observation proves the cause.",
          "Back up important data before any system reset or reinstall, and do not start a destructive recovery procedure simply because input is unavailable."
        ],
        "relatedLinks": [
          {
            "label": "Windows troubleshooting complete guide",
            "href": "/windows-troubleshooting-complete-guide",
            "description": "Use the master diagnostic flow if input failures appear alongside wider Windows problems."
          },
          {
            "label": "USB device not recognized",
            "href": "/windows-11-usb-device-not-recognized",
            "description": "Follow the USB-specific route if Windows reports a connection or device-detection error."
          }
        ]
      },
      {
        "heading": "Bottom line",
        "paragraphs": [
          "Start with power, direct connections and a known-good comparison. Then separate USB, receiver and Bluetooth failures from keyboard-layout or driver problems. Use Windows Update and official manufacturer guidance, and stop if the device or port shows physical damage."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why did my keyboard and mouse stop working at the same time?",
        "answer": "Look for a shared cause such as a USB hub, wireless receiver, power state or Windows issue. Test a known-good wired device directly on another port before assuming both peripherals failed."
      },
      {
        "question": "Should I use a USB hub while troubleshooting?",
        "answer": "Temporarily bypass the hub and connect directly to the computer. This helps determine whether the hub, dock or its power supply is involved."
      },
      {
        "question": "Why does my keyboard type the wrong letters?",
        "answer": "The selected input layout or language may have changed, or a key/numeric lock or application setting may be involved. Compare typing in more than one app before changing drivers."
      },
      {
        "question": "When should I reinstall a keyboard or mouse driver?",
        "answer": "Only after checking power, cables, ports, pairing and Device Manager. Ensure you have an alternate way to control Windows before removing a driver."
      }
    ]
  }
];
