import type { Article } from './articles';

/**
 * New everyday-computing troubleshooting cluster, researched against official
 * Microsoft Support procedures and written as symptom-led diagnostic guides.
 * The guides prioritize safe checks and distinguish likely causes from proof.
 */
export const universalPcIssueGuides: Article[] = [
  {
    "id": "windows-bluetooth-not-working",
    "slug": "windows-11-bluetooth-not-working",
    "title": "Bluetooth Not Working in Windows 11: Pairing, Missing Toggle and Dropouts",
    "seoTitle": "Windows 11 Bluetooth Not Working? Fix",
    "dek": "Bluetooth may be missing, refuse to pair, disconnect repeatedly or connect without working properly. Identify which failure you have before reinstalling drivers or resetting Windows.",
    "metaDescription": "Fix Windows 11 Bluetooth problems by separating missing adapters, pairing failures, repeated disconnects and Bluetooth audio issues with safe tests.",
    "excerpt": "First find out whether Bluetooth is missing from Settings, whether one accessory fails to pair, or whether an already paired device drops out. These patterns point to different tests.",
    "category": "Windows",
    "subcategory": "Bluetooth and peripherals",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 9,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Bluetooth",
      "Bluetooth not working",
      "Pairing",
      "Wireless headphones",
      "Device drivers",
      "Troubleshooting"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "Bluetooth accessories and adapters"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal",
      "windows-no-sound"
    ],
    "testing": "This symptom-led guide is based on Microsoft's published Windows Bluetooth troubleshooting guidance. It does not claim that every cause was reproduced on one PC; Bluetooth hardware, driver packages and accessory behavior vary by model. Prefer the PC or accessory manufacturer's instructions for model-specific steps.",
    "sources": [
      {
        "label": "Microsoft Support — Fix Bluetooth problems in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/bluetooth/fix-bluetooth-problems-in-windows"
      }
    ],
    "content": [
      {
        "heading": "Identify the Bluetooth failure before changing settings",
        "paragraphs": [
          "Bluetooth problems are not all the same. A missing Bluetooth switch suggests Windows may not be seeing the adapter or its driver. A device that appears but will not pair can have a pairing, range, battery or accessory-state problem. A device that pairs and then disconnects needs a different investigation.",
          "Record the accessory model, Windows version, when the problem started, whether other Bluetooth devices work, and whether the same accessory works with a phone or another computer. This simple comparison helps separate the PC from the accessory."
        ],
        "table": {
          "caption": "Use the symptom to choose the first safe test",
          "headers": [
            "What you see",
            "What it may indicate",
            "First check"
          ],
          "rows": [
            [
              "Bluetooth toggle is missing",
              "Adapter detection, driver, firmware or radio state",
              "Restart Windows and check Bluetooth in Device Manager."
            ],
            [
              "One device will not pair",
              "Accessory pairing mode, stored pairing or compatibility",
              "Charge the accessory, put it in pairing mode and test another host."
            ],
            [
              "Devices repeatedly disconnect",
              "Range, interference, power management or driver behavior",
              "Test nearby without a dock or other unnecessary wireless devices."
            ],
            [
              "Headphones connect but have no sound",
              "Windows selected a different playback output",
              "Choose the intended output device in Sound settings."
            ]
          ]
        }
      },
      {
        "heading": "Start with low-risk checks",
        "paragraphs": [
          "Turn Bluetooth off and back on in Settings, make sure Airplane mode is not preventing wireless connections, and restart the PC. Charge the accessory and follow its documented pairing-mode procedure; many devices are not discoverable simply because they are powered on.",
          "Move the accessory close to the computer for the test and temporarily remove avoidable obstacles or nearby sources of wireless interference. If the device pairs with another computer or phone but not this PC, focus next on Windows. If it fails everywhere, check the accessory's own instructions before changing the PC."
        ],
        "steps": [
          "Save open work and restart Windows rather than only waking it from sleep.",
          "Confirm Bluetooth is enabled and the accessory has charge.",
          "Check the accessory's manufacturer instructions for pairing or reset mode.",
          "Test one accessory at a time and note whether other Bluetooth devices work."
        ]
      },
      {
        "heading": "If Bluetooth is missing from Settings",
        "paragraphs": [
          "Open Device Manager and look for a Bluetooth category or a device with a warning symbol. A missing category is evidence that Windows is not presenting a normal Bluetooth adapter entry; it does not by itself prove the physical radio has failed.",
          "Install Windows updates and any applicable optional driver updates, then use the support page for the exact PC or adapter model if the problem remains. Avoid generic third-party driver-updater utilities. They can install an unrelated package and make it harder to determine which change caused the result."
        ],
        "bullets": [
          "If Bluetooth disappeared after a driver or Windows update, record the update date and check whether the PC manufacturer provides a known-good adapter driver.",
          "If the adapter appears with an error code, write down the code before uninstalling or changing the driver.",
          "If it is a USB Bluetooth adapter, test a direct USB port rather than a hub, then compare with another computer if possible."
        ]
      },
      {
        "heading": "If pairing works but the connection keeps dropping",
        "paragraphs": [
          "Forget and pair the accessory again only after confirming that you know how to put it back into pairing mode. Test one device at close range and disconnect unused docks or adapters temporarily. If only one accessory drops, its firmware, battery, multipoint behavior or compatibility may be involved; if several Bluetooth devices fail on the same PC, investigate the PC's adapter and driver.",
          "Some adapter drivers expose a power-saving option, but not every Windows device offers the same setting. If you change one, record the original state and test again. Do not disable unrelated power-management settings wholesale."
        ],
        "relatedLinks": [
          {
            "label": "No sound from speakers or headphones",
            "href": "/windows-11-no-sound-speakers-headphones",
            "description": "Use this when the Bluetooth device connects but Windows sends audio elsewhere."
          },
          {
            "label": "USB device not recognized",
            "href": "/windows-11-usb-device-not-recognized",
            "description": "Compare symptoms if a USB Bluetooth adapter is not detected."
          }
        ]
      },
      {
        "heading": "Know when to stop",
        "paragraphs": [
          "Do not reset Windows just because Bluetooth is unreliable. First preserve the exact error, test another accessory or host, and use drivers from the adapter or PC maker. If the adapter repeatedly vanishes across restarts and a supported driver, or the PC has suffered liquid or physical damage, model-specific hardware diagnosis may be needed.",
          "A Bluetooth connection failure and a general internet outage are separate problems: Bluetooth is a short-range device connection, not the Wi-Fi network connection used to reach the internet."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why is the Bluetooth toggle missing in Windows 11?",
        "answer": "Windows may not be detecting the adapter normally, or its driver, radio state or firmware may be involved. Check Device Manager and the PC maker's driver guidance before assuming the adapter is broken."
      },
      {
        "question": "Why does Bluetooth keep disconnecting?",
        "answer": "Possible causes include range, accessory battery or firmware, interference, adapter drivers and power behavior. Test one device close to the PC before making broader changes."
      },
      {
        "question": "My Bluetooth headphones are connected but there is no sound. Is Bluetooth broken?",
        "answer": "Not necessarily. Windows may be using another playback device or the app may have a different output selected. Check Sound settings and the app's audio output first."
      },
      {
        "question": "Should I download a Bluetooth driver updater?",
        "answer": "No. Use Windows Update and the exact PC or adapter manufacturer's support page. Generic updater tools add another variable and may install an unsuitable driver."
      }
    ]
  },
  {
    "id": "windows-no-sound",
    "slug": "windows-11-no-sound-speakers-headphones",
    "title": "No Sound in Windows 11? Diagnose Speakers, Headphones and Missing Audio",
    "seoTitle": "No Sound in Windows 11? Fix Audio Output",
    "dek": "When speakers or headphones stop working, first separate a muted app, wrong output device, missing audio endpoint, driver failure and microphone-permission problem.",
    "metaDescription": "Troubleshoot no sound in Windows 11 or 10 with checks for output selection, volume mixer, headphones, audio enhancements, drivers and microphone permissions.",
    "excerpt": "If Windows is silent, do not reinstall the audio driver immediately. Check whether sound fails in every app, whether the correct output is selected, and whether Windows detects the device.",
    "category": "Windows",
    "subcategory": "Audio and peripherals",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 10,
    "tags": [
      "Windows 11",
      "Windows 10",
      "No sound",
      "Audio not working",
      "Headphones",
      "Speakers",
      "Microphone",
      "Audio driver"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "Built-in, USB, HDMI and Bluetooth audio devices"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal",
      "windows-bluetooth-not-working",
      "windows-camera-not-working",
      "windows-second-monitor-not-detected"
    ],
    "testing": "This guide summarizes Microsoft's Windows audio and microphone troubleshooting workflows. It is not a claim of a universal fix or a reproduced failure on every sound card. Menu names and driver options differ by device, Windows version and audio software.",
    "sources": [
      {
        "label": "Microsoft Support — Fix sound or audio problems in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/audio/fix-sound-or-audio-problems-in-windows"
      },
      {
        "label": "Microsoft Support — Fix microphone problems",
        "url": "https://support.microsoft.com/en-us/windows/hardware/drivers/fix-microphone-problems"
      }
    ],
    "content": [
      {
        "heading": "First establish where the sound stops",
        "paragraphs": [
          "A system that has no sound anywhere needs a different test from a single app that is muted or using the wrong output. Start with a short local sound or another known-working app, then test built-in speakers, wired headphones or a different output if available. Do not infer that the speaker hardware has failed from one silent app.",
          "If the output device is missing entirely, treat detection and driver status as the next question. If the device is listed and the volume meter moves but no sound is audible, check the selected output, physical mute controls, connection and audio format before reinstalling software."
        ],
        "table": {
          "caption": "Choose the first check from the symptom",
          "headers": [
            "Symptom",
            "Likely area to investigate",
            "First test"
          ],
          "rows": [
            [
              "Only one app is silent",
              "App volume, app output selection or app state",
              "Check the app's volume and output device."
            ],
            [
              "All apps are silent",
              "Windows output, mute, connection or audio service",
              "Select the intended output in Settings > System > Sound."
            ],
            [
              "No audio device appears",
              "Detection, driver, disabled endpoint or firmware",
              "Check Device Manager and the device manufacturer's support page."
            ],
            [
              "Sound works but microphone does not",
              "Input selection or privacy permissions",
              "Check the selected input and microphone permissions."
            ],
            [
              "Sound goes to a monitor or dock",
              "HDMI/DisplayPort audio endpoint selected by Windows",
              "Choose speakers or headphones as the output."
            ]
          ]
        }
      },
      {
        "heading": "Check output device, volume and physical connections",
        "paragraphs": [
          "Open Settings > System > Sound and select the output you actually use. A monitor connected over HDMI or DisplayPort can appear as an audio output even when the monitor has no speakers. USB headsets, docking stations and Bluetooth devices can also become the selected output after reconnection.",
          "Raise the system and app volume, inspect the volume mixer for a muted application, and check the headset's inline controls or laptop hardware mute key. For wired devices, reconnect the plug and test another supported port or another headset. For Bluetooth, first confirm that the accessory is paired and then check audio output selection."
        ],
        "steps": [
          "Select the expected speakers or headphones under Settings > System > Sound.",
          "Open the volume mixer and make sure the affected app is not muted or routed elsewhere.",
          "Disconnect unnecessary audio outputs temporarily and test again.",
          "Try a second app or known-working headset to separate software from hardware."
        ]
      },
      {
        "heading": "Use the troubleshooter before making driver changes",
        "paragraphs": [
          "On Windows 11, start with the audio troubleshooter in the Get Help app or Settings > System > Troubleshoot > Other troubleshooters where available. Test after each action so the cause remains clear.",
          "If audio enhancements are enabled, temporarily turn them off and retest. Enhancements, spatial audio and vendor control-panel effects can change processing and can sometimes be part of the problem. If sound becomes distorted only at a particular sample rate or format, restore the original setting if the test makes things worse."
        ]
      },
      {
        "heading": "If audio stopped after a Windows or driver update",
        "paragraphs": [
          "Record which update or driver preceded the failure. In Device Manager, check the audio device's status and use Windows Update or the PC maker's exact support page for an appropriate driver. If the problem began immediately after a driver update and Roll Back Driver is available, a controlled rollback may be more informative than installing several drivers in succession.",
          "Restarting Windows Audio or Windows Audio Endpoint Builder may help in some cases, but service changes are an advanced step. Save open work first and do not alter unrelated services. Avoid downloading driver packages from unofficial mirrors."
        ],
        "bullets": [
          "Keep the current driver version and error code before changing anything.",
          "Do not uninstall every audio-related device at once; you may lose useful vendor-specific functionality.",
          "If sound works through one output but not the built-in speakers, test the hardware path and manufacturer diagnostics rather than assuming Windows is entirely broken."
        ]
      },
      {
        "heading": "Microphone not working is an input problem",
        "paragraphs": [
          "A working speaker does not prove the microphone works. Open Settings > System > Sound and check the selected input device and input meter. Then open Settings > Privacy & security > Microphone and confirm that microphone access and the relevant app permissions are enabled. Desktop apps have a separate access toggle on supported Windows versions.",
          "Test the microphone in Windows Sound settings or a built-in recording app before changing the conferencing app. If it works there but not in one meeting app, check that app's own input selection and permissions."
        ],
        "relatedLinks": [
          {
            "label": "Bluetooth not working",
            "href": "/windows-11-bluetooth-not-working",
            "description": "Use this if the headset will not pair or repeatedly disconnects."
          },
          {
            "label": "Camera not working",
            "href": "/windows-11-camera-not-working",
            "description": "Check privacy permissions and app selection if video-call input devices fail."
          }
        ]
      },
      {
        "heading": "When the issue may be hardware-related",
        "paragraphs": [
          "If a known-working headset works but internal speakers do not, or a device is missing in multiple supported operating systems, hardware or model-specific firmware deserves closer inspection. Do not open a laptop or connect exposed components unless you are qualified and have followed its service instructions.",
          "The useful result is a clear record: which apps were tested, which output or input was selected, whether the device appeared in Windows, and whether the problem began after a change. That is more useful than repeatedly reinstalling drivers without a comparison."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does Windows show sound but I hear nothing?",
        "answer": "Windows may be routing audio to a different output, including a monitor or dock, or the physical device may be muted or disconnected. Select the intended output and test another app."
      },
      {
        "question": "Why does sound work in one app but not another?",
        "answer": "Check that app's volume, in-app output selection and audio session before changing system drivers."
      },
      {
        "question": "Should I reinstall my audio driver first?",
        "answer": "No. Check output selection, volume, connections and the troubleshooter first. If the issue began after a driver update, record the version and consider a supported rollback."
      },
      {
        "question": "Why is my microphone not detected?",
        "answer": "Check the selected input, privacy permissions, app permissions and Device Manager. A microphone and a speaker use separate input and output paths."
      }
    ]
  },
  {
    "id": "windows-camera-not-working",
    "slug": "windows-11-camera-not-working",
    "title": "Windows Camera Not Working: Fix a Missing Webcam or Black Screen",
    "seoTitle": "Windows Camera Not Working? Fix Webcam Errors",
    "dek": "A webcam can be blocked by a privacy shutter, app permissions, another running app, a driver or a device-detection problem. Test the camera independently before reinstalling software.",
    "metaDescription": "Fix a Windows 11 or 10 camera that is missing, blocked, black or unavailable in video calls with safe privacy, app, driver and hardware checks.",
    "excerpt": "Test the webcam in Windows Camera first. If it works there but not in a meeting app, focus on app selection and permissions instead of replacing the camera driver.",
    "category": "Windows",
    "subcategory": "Camera and conferencing",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 9,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Webcam not working",
      "Camera black screen",
      "Camera permissions",
      "Device Manager",
      "Video calls"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "Built-in and USB webcams"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal",
      "windows-no-sound"
    ],
    "testing": "The steps follow Microsoft's published Windows camera guidance. Camera shutters, function-key controls, driver extensions and firmware vary by manufacturer, so this article does not claim that one menu path or setting applies to every laptop or webcam.",
    "sources": [
      {
        "label": "Microsoft Support — Camera doesn't work in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/camera/camera-doesn-t-work-in-windows"
      }
    ],
    "content": [
      {
        "heading": "Test the camera outside the meeting app",
        "paragraphs": [
          "Before changing drivers, open the built-in Camera app and check whether it shows a live preview. If the preview works there but not in a browser or video-call app, Windows can access the camera and the next check should be that app's device selection, permissions or configuration.",
          "If the Camera app also fails, note whether the camera is missing, shows a black preview, displays an error code or is blocked by a privacy indicator. Each result narrows the problem differently."
        ],
        "table": {
          "caption": "Read the camera symptom before choosing a fix",
          "headers": [
            "Symptom",
            "First area to check",
            "What it does not prove"
          ],
          "rows": [
            [
              "Camera works in one app only",
              "Other app's camera selection and permissions",
              "It does not prove the camera hardware is faulty."
            ],
            [
              "Black preview in every app",
              "Physical shutter, function key, driver or device",
              "It does not identify a single failed component."
            ],
            [
              "Camera missing from Windows",
              "Privacy switch, Device Manager and driver detection",
              "A missing entry alone does not prove hardware failure."
            ],
            [
              "Camera stopped after an update",
              "Driver version and supported rollback option",
              "The timing is a clue, not proof that the update is the only cause."
            ]
          ]
        }
      },
      {
        "heading": "Check the physical camera controls and privacy settings",
        "paragraphs": [
          "Check for a sliding camera shutter, a privacy switch or a keyboard function key that disables the webcam. The indicator light and key combination differ by laptop model; use the manufacturer's manual rather than guessing at a key sequence.",
          "Open Settings > Privacy & security > Camera and enable camera access and app access as appropriate. Desktop apps may use a separate toggle. If only one application fails, verify it is allowed to use the camera and that it has selected the correct webcam rather than a virtual camera or disconnected device."
        ],
        "steps": [
          "Open the Camera app from Start and test the preview.",
          "Check the laptop's shutter or camera privacy key, then test again.",
          "Review Settings > Privacy & security > Camera.",
          "Close other video-call and recording apps, then retest the affected app."
        ]
      },
      {
        "heading": "If the camera is missing or has an error",
        "paragraphs": [
          "Open Device Manager and look under Cameras or the device category provided by the manufacturer. Read any status or error code before acting. Install applicable Windows updates and, if offered, a matching camera driver through Windows Update or the PC maker's support page.",
          "If the camera stopped working directly after a driver update, check whether Roll Back Driver is available. Uninstalling a camera device and scanning for hardware changes can be a later troubleshooting step, but first confirm you can obtain the correct manufacturer driver if Windows does not reinstall it automatically."
        ],
        "bullets": [
          "Avoid driver sites that identify the camera only by a generic name.",
          "If using a USB webcam, connect it directly to the PC for the first test rather than through a dock or hub.",
          "For a built-in camera that never appears in Device Manager, check BIOS/UEFI settings and the model's service guidance only when you are comfortable with those steps."
        ]
      },
      {
        "heading": "Black screen, blocked camera or low-quality video",
        "paragraphs": [
          "A black preview can result from a shutter, camera selection, permissions, driver state, lighting or a device fault. Check the lens and try a simple local preview before blaming the internet connection. If the preview is clear locally but a remote meeting looks poor, then investigate the meeting app and network path.",
          "On supported Windows 11 versions, Microsoft documents a Basic camera mode that can help diagnose some camera plug-in or processing problems. Availability depends on version and hardware; do not assume every system has this option."
        ]
      },
      {
        "heading": "Protect privacy and avoid unnecessary resets",
        "paragraphs": [
          "Do not leave camera access enabled for apps that do not need it. Once testing is complete, review privacy settings and restore your normal access choices. A temporary security-software test should only follow the software vendor's instructions and should not leave protection disabled.",
          "If the camera fails in the Windows Camera app, across more than one app, and after supported driver checks, use the computer or camera manufacturer's diagnostics. Physical damage, a disconnected internal camera cable or a disabled device may need model-specific service."
        ],
        "relatedLinks": [
          {
            "label": "No sound or microphone input",
            "href": "/windows-11-no-sound-speakers-headphones",
            "description": "Troubleshoot microphone selection and app permissions if the camera works but call audio does not."
          }
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does my webcam work in Camera but not in Teams or a browser?",
        "answer": "The camera is visible to Windows, so check the specific app's selected camera, privacy permissions, browser site permission and whether another application is using it."
      },
      {
        "question": "Why is my laptop camera black?",
        "answer": "Check a physical shutter or privacy key, close other camera apps, test the Camera app and then inspect permissions and driver status."
      },
      {
        "question": "Should I disable antivirus to fix the webcam?",
        "answer": "Do not leave security software disabled. Review its camera or privacy-protection settings and follow the security vendor's controlled diagnostic steps."
      },
      {
        "question": "What if the camera is missing from Device Manager?",
        "answer": "Check the physical privacy controls, Windows updates and the computer manufacturer's camera driver and firmware guidance. A missing device entry is not sufficient by itself to diagnose a failed camera."
      }
    ]
  },
  {
    "id": "windows-second-monitor-not-detected",
    "slug": "windows-second-monitor-not-detected",
    "title": "Second Monitor Not Detected in Windows: Diagnose Cables, Ports and Settings",
    "seoTitle": "Second Monitor Not Detected? Fix Windows",
    "dek": "A second screen can show No Signal, stay black, or never appear in Display settings. Isolate the monitor, cable, input, adapter, dock, GPU port and Windows display mode in that order.",
    "metaDescription": "Fix a second monitor not detected in Windows 11 or 10 with safe tests for power, input source, cable, display mode, ports, docks and graphics drivers.",
    "excerpt": "Start with the monitor's own input and a known-good cable. If Windows cannot detect the screen, simplify the connection before changing resolution or reinstalling graphics drivers.",
    "category": "Windows",
    "subcategory": "Displays and connectivity",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 10,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Second monitor not detected",
      "External display",
      "HDMI",
      "DisplayPort",
      "USB-C",
      "Docking station"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "External monitors and supported docks"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal",
      "windows-no-sound"
    ],
    "testing": "This guide uses Microsoft's documented multiple-display workflow and common connection-isolation principles. Display output support depends on the specific GPU, port, cable, dock and computer model. It does not claim that every USB-C port carries video or that every dock supports every display configuration.",
    "sources": [
      {
        "label": "Microsoft Support — How to use multiple monitors in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/display-graphics/how-to-use-multiple-monitors-in-windows"
      }
    ],
    "content": [
      {
        "heading": "Separate a monitor's No Signal message from a Windows detection problem",
        "paragraphs": [
          "A monitor that says No Signal may be powered on but receiving no usable video input. A monitor that works but is absent from Windows Display settings points toward a detection or connection path problem. A detected display that remains black may instead be in the wrong display mode, on an unsupported resolution or refresh rate, or connected to a port that is not producing the expected output.",
          "Record the PC model, graphics card if it is a desktop, monitor model, cable type and whether the screen worked before a recent update, dock change or hardware move."
        ],
        "table": {
          "caption": "Choose the first display test",
          "headers": [
            "What you see",
            "First area to test",
            "Avoid doing first"
          ],
          "rows": [
            [
              "Monitor says No Signal",
              "Power, selected input, cable and output port",
              "Changing Windows resolution before confirming a signal path."
            ],
            [
              "Monitor is missing in Display settings",
              "Connection, supported output, dock and Detect",
              "Assuming the monitor or GPU has failed."
            ],
            [
              "Screen is detected but black",
              "Windows+P mode, input, resolution and refresh rate",
              "Repeatedly installing different graphics drivers."
            ],
            [
              "Works directly but not through a dock",
              "Dock firmware, power, bandwidth and cable compatibility",
              "Assuming every USB-C port or dock supports video."
            ],
            [
              "PC has no picture on any display at startup",
              "Startup/POST and hardware diagnostics",
              "Treating it as only a Windows multi-monitor setting."
            ]
          ]
        }
      },
      {
        "heading": "Check the monitor, input and cable first",
        "paragraphs": [
          "Confirm the monitor power light is on and manually select the input that matches the cable, such as HDMI or DisplayPort. Reseat both ends of the cable. If possible, test a known-working cable and one display connection at a time; adapters and docks add more potential failure points.",
          "For the first test, connect the monitor directly to the computer and temporarily remove the dock or adapter. If the screen works directly, the monitor and basic cable path are more likely to be functional, and the next investigation should focus on the dock, adapter, power supply or compatibility."
        ],
        "steps": [
          "Turn on the monitor and select the correct physical input.",
          "Reseat the cable and test a known-working cable if available.",
          "Connect directly to the PC without a dock or adapter for comparison.",
          "Test the monitor with another device, or test the PC with another monitor, if practical."
        ]
      },
      {
        "heading": "Ask Windows to detect and use the display",
        "paragraphs": [
          "In Windows 11, open Settings > System > Display, expand Multiple displays, and select Detect. Use the Windows key + P shortcut to choose Duplicate, Extend, PC screen only or Second screen only. If the monitor is detected, select Identify and arrange the numbered displays to match their physical positions.",
          "If you use a wireless display, follow its separate connection workflow rather than treating it as a wired HDMI or DisplayPort issue. Restart Windows after simplifying the connection if the system has just been docked or undocked."
        ]
      },
      {
        "heading": "Check the computer's actual video-output capability",
        "paragraphs": [
          "A physical connector does not guarantee every display mode. On some desktop PCs with a dedicated graphics card, the monitor should be connected to the graphics card's video outputs rather than an inactive motherboard output. The correct arrangement depends on the CPU, motherboard firmware and graphics configuration.",
          "USB-C is especially model-dependent: some ports support DisplayPort Alt Mode, Thunderbolt or another video-capable configuration, while others are data-only. Confirm the exact PC and dock specifications rather than buying an adapter based only on the connector shape."
        ],
        "bullets": [
          "Test a direct HDMI or DisplayPort connection before troubleshooting USB-C docks.",
          "Check the manufacturer's port diagram and supported maximum display count/resolution.",
          "For multi-monitor docks, verify the dock's power adapter, firmware and operating-system requirements."
        ]
      },
      {
        "heading": "When to investigate graphics drivers and display settings",
        "paragraphs": [
          "If the display previously worked and the failure began after a graphics driver update, note the driver version and review the GPU or computer manufacturer's troubleshooting advice. Windows Update may provide a relevant driver, but avoid installing multiple packages without testing between changes.",
          "If Windows detects the screen, choose a supported resolution and refresh rate. A short-lived display-driver reset using Windows key + Ctrl + Shift + B may help diagnose a temporary graphics-stack issue, but it is not a substitute for checking the signal path or diagnosing a persistent hardware fault."
        ],
        "relatedLinks": [
          {
            "label": "PC turns on but has no display",
            "href": "/pc-turns-on-but-no-display",
            "description": "Use this different diagnostic path if the computer shows no startup image on any screen."
          },
          {
            "label": "No sound from Windows",
            "href": "/windows-11-no-sound-speakers-headphones",
            "description": "Check audio output if HDMI or DisplayPort changed the selected playback device."
          }
        ]
      },
      {
        "heading": "Stop if the port or hardware appears damaged",
        "paragraphs": [
          "Do not force a connector, use visibly damaged cables, or repeatedly reconnect a port that is loose, hot or physically damaged. If no display works during startup, the problem may extend beyond Windows settings. Record the connection path and any diagnostic LEDs or error codes before seeking model-specific support."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does Windows not detect my second monitor?",
        "answer": "Common possibilities include an incorrect monitor input, bad cable, unsupported output path, dock issue, Windows display mode or graphics-driver problem. Simplify to a direct connection and then use Display settings > Detect."
      },
      {
        "question": "Why does my monitor say No Signal?",
        "answer": "The monitor is not receiving a usable video signal on its selected input. Check its source setting, cable and PC output before changing Windows resolution."
      },
      {
        "question": "Does every USB-C port support an external monitor?",
        "answer": "No. Video capabilities depend on the exact PC port and its supported standards. Check the computer's specifications and dock requirements."
      },
      {
        "question": "My PC has no picture on any monitor. Is this the same problem?",
        "answer": "Not necessarily. If there is no startup image on any display, investigate power-on and hardware initialization as well as the screen connection. See the PC no-display guide."
      }
    ]
  },
  {
    "id": "windows-file-explorer-not-responding",
    "slug": "windows-file-explorer-not-responding",
    "title": "File Explorer Not Responding in Windows: Find the Cause Safely",
    "seoTitle": "File Explorer Not Responding? Fix Windows",
    "dek": "File Explorer may freeze on one folder, restart repeatedly, show a loading bar or stop opening. Determine whether the issue is a folder, cloud/network location, resource pressure or Windows component.",
    "metaDescription": "Fix File Explorer not responding in Windows 11 or 10 with safe checks for a frozen folder, Explorer process, storage pressure, updates and system files.",
    "excerpt": "First check whether one folder hangs or all of Explorer is affected. A slow external or network location can look like an Explorer crash, and storage warnings should change your next step.",
    "category": "Windows",
    "subcategory": "Windows performance and file management",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 10,
    "tags": [
      "Windows 11",
      "Windows 10",
      "File Explorer not responding",
      "Explorer freezing",
      "Windows freeze",
      "Disk usage",
      "Storage",
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
      "windows-troubleshooting-universal",
      "windows-printer-offline",
      "windows-search-not-working"
    ],
    "testing": "This troubleshooting workflow is informed by Microsoft's File Explorer guidance and TWW's existing Windows storage diagnostic material. It does not claim that one Explorer restart, system command or cache action fixes all hangs. Back up important files before investigating a drive that reports errors.",
    "sources": [
      {
        "label": "Microsoft Support — Fix File Explorer if it won't open or start",
        "url": "https://support.microsoft.com/en-us/windows/experience/fileexplorer/fix-file-explorer-if-it-won-t-open-or-start"
      }
    ],
    "content": [
      {
        "heading": "Find out whether Explorer or one location is hanging",
        "paragraphs": [
          "File Explorer can appear frozen while it waits for a slow folder, disconnected network share, external drive, cloud-synced location or shell extension. If only one location hangs, test another local folder before treating the whole Windows desktop as broken.",
          "Note whether the taskbar remains responsive, whether the problem starts after opening a specific folder, and whether a removable drive or network location is involved. If the drive makes unusual mechanical noises or Windows reports read errors, prioritize data protection instead of repeatedly trying to open it."
        ],
        "table": {
          "caption": "Use the scope of the freeze to select the next test",
          "headers": [
            "Symptom",
            "What to check",
            "Safe first action"
          ],
          "rows": [
            [
              "One folder is slow or freezes",
              "Large folder, thumbnails, network/cloud path or external drive",
              "Open a different local folder and compare."
            ],
            [
              "All Explorer windows freeze",
              "Explorer process, resource use, recent software or update",
              "Restart Windows Explorer from Task Manager."
            ],
            [
              "Explorer hangs while copying files",
              "Drive health, disk activity, USB connection and destination free space",
              "Stop if there are I/O errors; protect important data."
            ],
            [
              "Desktop and other apps also freeze",
              "System-wide memory, disk, driver or hardware issue",
              "Use the broader Windows freezing guide."
            ],
            [
              "Only a cloud/network folder hangs",
              "Connection and availability of the remote location",
              "Test the local disk and network separately."
            ]
          ]
        }
      },
      {
        "heading": "Restart Windows Explorer without resetting Windows",
        "paragraphs": [
          "Save work in open applications. Open Task Manager with Ctrl + Shift + Esc, find Windows Explorer in the process list, and choose Restart if that option is available. The taskbar and desktop may briefly disappear while Explorer reloads. Reopen a simple local folder and check whether the behavior changes.",
          "If Task Manager itself remains responsive but Explorer immediately freezes again, capture when it happens and move on to update, resource and location checks. Repeatedly ending unrelated system processes can make diagnosis harder."
        ],
        "steps": [
          "Save open documents and pause any file transfer in progress.",
          "Open Task Manager with Ctrl + Shift + Esc.",
          "Select Windows Explorer and choose Restart if available.",
          "Test a simple local folder before returning to the location that caused the hang."
        ]
      },
      {
        "heading": "Check external drives, network shares and cloud folders",
        "paragraphs": [
          "Disconnecting a stalled external drive or testing a local folder can help establish whether the delay follows a particular location. Do not unplug a drive during active writes. For a network share, confirm the network path is reachable; for a cloud-backed folder, check the sync client and online status rather than assuming Explorer itself is corrupted.",
          "If the freeze occurs while moving or copying files and the drive reports errors, stop unnecessary repeated reads and protect the data. A drive that is failing needs storage-health diagnosis, not an aggressive cleanup or format."
        ],
        "relatedLinks": [
          {
            "label": "Windows shows 100% disk usage",
            "href": "/windows-11-disk-100-percent-usage",
            "description": "Check whether high disk activity coincides with the Explorer delay."
          },
          {
            "label": "How to check SSD health",
            "href": "/how-to-check-ssd-health-windows",
            "description": "Review storage warning signs if hangs occur during file access or copying."
          }
        ]
      },
      {
        "heading": "Check updates and system resource pressure",
        "paragraphs": [
          "Install applicable Windows updates and restart the PC. During a reproduction, check Task Manager for sustained CPU, memory or disk activity. High activity is a clue to investigate the process doing the work; it is not proof that the drive or Explorer is faulty.",
          "If Explorer began hanging after installing a shell extension, archive utility, cloud client or other file-management software, test that change in a controlled way. Avoid registry-cleaning tools and bulk deletion of folders whose purpose you do not understand."
        ]
      },
      {
        "heading": "Use system-file checks only when the evidence fits",
        "paragraphs": [
          "If Explorer and other Windows components keep failing after the simple checks, system-file repair may be appropriate. Open Terminal or Command Prompt as an administrator and run DISM before System File Checker, then test again. These tools check Windows components; they cannot prove that a failing drive, incompatible extension or third-party program is the cause.",
          "Run one command at a time and wait for it to complete. If the disk is returning I/O errors or the PC is unstable during reads, back up important data and investigate storage health before running repeated repair operations."
        ],
        "codeBlocks": [
          "DISM /Online /Cleanup-Image /RestoreHealth",
          "sfc /scannow"
        ]
      },
      {
        "heading": "When to escalate the diagnosis",
        "paragraphs": [
          "If the freeze affects the entire desktop, appears with blue screens or unexpected restarts, or continues across multiple local folders after updates and system-file checks, use the wider Windows troubleshooting process to inspect reliability history and relevant error logs. If only one drive or folder triggers the failure, focus on that path first.",
          "Do not use Reset this PC or a clean installation as the first reaction to a single Explorer hang. The safer outcome is to identify whether the problem follows Explorer, a location, resource pressure or the storage device."
        ]
      }
    ],
    "faq": [
      {
        "question": "Does restarting Windows Explorer delete my files?",
        "answer": "Restarting the Explorer process reloads the desktop and file-management interface; it is not a file reset. Save work and pause transfers before restarting the process."
      },
      {
        "question": "Why does File Explorer freeze on one folder only?",
        "answer": "The folder may contain large media collections, rely on a slow external/network/cloud location, or encounter a file or extension problem. Compare with a simple local folder first."
      },
      {
        "question": "Should I clear the thumbnail cache or delete temporary files?",
        "answer": "Do not start with bulk deletion. Establish the scope of the freeze and check storage and resource activity first; remove data only when you understand what will be deleted."
      },
      {
        "question": "When should I run DISM and SFC?",
        "answer": "Use them when Windows components appear damaged and simpler checks have failed, not as a universal fix for a slow drive, failing disk or third-party Explorer extension."
      }
    ]
  },
  {
    "id": "windows-printer-offline",
    "slug": "windows-printer-offline-queue-stuck",
    "title": "Printer Offline in Windows: Fix Connection Problems and Stuck Print Jobs",
    "seoTitle": "Printer Offline in Windows? Fix the Queue",
    "dek": "A printer marked Offline, missing from Windows or stuck on one document may have a connection, queue, default-printer, driver or print-spooler issue. Isolate the symptom before clearing jobs.",
    "metaDescription": "Fix a Windows printer that shows Offline or will not print with safe checks for power, Wi-Fi or USB, the print queue, default printer, drivers and spooler.",
    "excerpt": "First check the printer's own status and connection, then print a test page. Clear the print queue only when necessary because doing so removes pending jobs.",
    "category": "Windows",
    "subcategory": "Printers and devices",
    "authorId": "imranNatiq",
    "publishedAt": "2026-10-24",
    "updatedAt": "2026-10-24",
    "readingTime": 10,
    "tags": [
      "Windows 11",
      "Windows 10",
      "Printer offline",
      "Printer not printing",
      "Print queue",
      "Print Spooler",
      "Wi-Fi printer",
      "USB printer"
    ],
    "appliesTo": [
      "Windows 11",
      "Windows 10",
      "USB, Wi-Fi, Ethernet and shared printers"
    ],
    "contentRole": "cluster",
    "pillarPath": "/windows-troubleshooting-complete-guide",
    "searchIntent": "informational",
    "relatedArticles": [
      "windows-troubleshooting-universal",
      "windows-file-explorer-not-responding"
    ],
    "testing": "This guide is based on Microsoft's documented printer-connection and print-queue troubleshooting. Printer menus, driver packages and network setup differ by manufacturer. The print-spooler queue-clearing procedure removes queued documents, so it is not presented as an early or consequence-free step.",
    "sources": [
      {
        "label": "Microsoft Support — Fix printer connection and printing problems in Windows",
        "url": "https://support.microsoft.com/en-us/windows/hardware/printer/fix-printer-connection-and-printing-problems-in-windows"
      }
    ],
    "content": [
      {
        "heading": "Read the printer status before changing Windows",
        "paragraphs": [
          "A printer marked Offline is not the same as a document stuck in the queue or a printer that produces blank or poor-quality pages. Begin with the printer's own display or lights and whether it is ready, has paper and supplies, and shows an error. Then check how it connects to the computer.",
          "If the printer is on Wi-Fi or Ethernet, confirm that it is connected to the expected network. If it is USB-connected, reseat the cable and test a direct computer port rather than a hub. For an office or shared printer, the network or print server may be managed by IT."
        ],
        "table": {
          "caption": "Choose the first printer check from the observed symptom",
          "headers": [
            "Symptom",
            "What to check first",
            "Important caution"
          ],
          "rows": [
            [
              "Windows says Offline",
              "Printer panel, network/USB connection and Windows status",
              "Do not clear the queue before checking connectivity."
            ],
            [
              "One document will not print",
              "Print queue, document state and application",
              "A queue reset deletes pending print jobs."
            ],
            [
              "Printer is not listed",
              "Add-device flow, network visibility and manufacturer driver",
              "Confirm you are using a supported installation method."
            ],
            [
              "Test page prints, one app does not",
              "Application or document settings",
              "The printer hardware may be working normally."
            ],
            [
              "Printer is ready but pages are blank or damaged",
              "Ink/toner, paper, printer diagnostics and print quality",
              "Connection resets will not fix a mechanical or supply problem."
            ]
          ]
        }
      },
      {
        "heading": "Confirm power, connection and the correct printer",
        "paragraphs": [
          "Make sure the printer is awake and not showing a paper, cover, ink or toner error. For wireless models, check the printer's network status and compare the network name with the intended one. A router change, guest network or changed password can leave a printer disconnected even while the PC has internet access.",
          "Open Settings > Bluetooth & devices > Printers & scanners on Windows 11, or the corresponding printer settings on Windows 10. Select the intended printer and open its queue. If multiple printers or old copies of the same printer are listed, verify the name and connection rather than sending test jobs to every entry."
        ],
        "steps": [
          "Check the printer panel and resolve any paper, cover or supply warning.",
          "Verify the Wi-Fi/Ethernet or USB connection and the correct network.",
          "Open the intended printer's queue and inspect paused or error states.",
          "Print a Windows test page to separate system-wide printing from one application."
        ]
      },
      {
        "heading": "Check the queue and offline setting",
        "paragraphs": [
          "Open the print queue and inspect whether jobs are paused, cancelled or repeatedly failing. If the printer is online but Windows is set to use it offline, correct the status only after checking the actual connection. Canceling a single failed job is a smaller test than deleting every queued document.",
          "If a Windows test page succeeds while one document or application fails, troubleshoot that application's print settings, paper size, selected printer and document. A printer that successfully prints a test page is not automatically free of every hardware problem, but the result is useful evidence."
        ]
      },
      {
        "heading": "Update the driver using the printer manufacturer's guidance",
        "paragraphs": [
          "If Windows cannot add the printer, repeatedly loses it, or displays a driver error, check Windows Update and the printer maker's exact model support page. Some devices use built-in Windows installation paths; do not assume that an old installer from the manufacturer's download page is always the best method for every Windows edition or processor architecture.",
          "If the issue began after a driver change, record the current version and compare with the manufacturer's recommended package. Avoid installing several printer utilities and driver packages together, because you may change the queue, discovery service and driver at the same time."
        ],
        "relatedLinks": [
          {
            "label": "USB device not recognized",
            "href": "/windows-11-usb-device-not-recognized",
            "description": "Use this if a directly connected USB printer is not detected at all."
          },
          {
            "label": "Wi-Fi disconnecting",
            "href": "/windows-11-wifi-keeps-disconnecting",
            "description": "Use this if the PC's own wireless connection also drops."
          }
        ]
      },
      {
        "heading": "Reset the Print Spooler only when the queue is the problem",
        "paragraphs": [
          "The Print Spooler manages print jobs. If jobs remain stuck after checking the connection and queue, Microsoft's troubleshooting process describes stopping the spooler, clearing files in the printer queue folder, and starting the service again. This removes pending jobs from that queue, so first cancel or record anything that still needs to be printed.",
          "Do not delete files from an arbitrary system folder or change service settings if you are unsure which printer queue is affected. On work-managed devices, check with the administrator before stopping shared printing services."
        ],
        "steps": [
          "Save or record the pending jobs and close the printer queue.",
          "Open Services and stop Print Spooler.",
          "Follow Microsoft's official instructions for clearing the print queue files.",
          "Start Print Spooler again and send a single test page before restoring normal printing."
        ]
      },
      {
        "heading": "Know when the problem is outside Windows",
        "paragraphs": [
          "If the printer's panel reports a hardware fault, it jams repeatedly, feeds paper incorrectly or fails its built-in test, consult the printer manufacturer's diagnostics. If the printer works from another device but not from this PC, focus on Windows installation, queue and driver state. If several devices cannot reach a network printer, investigate the network or printer itself.",
          "For shared office printers, managed networks and print servers, avoid resetting network configuration or deleting server queues without permission. Record the printer model, connection type, exact Windows status and test-page result so the next step is evidence-led."
        ]
      }
    ],
    "faq": [
      {
        "question": "Why does Windows say my printer is offline when it is turned on?",
        "answer": "Power alone does not prove a working connection. Check the printer's status panel, selected Wi-Fi network or USB connection, then confirm that Windows has selected the correct printer."
      },
      {
        "question": "Will clearing the print queue delete documents from my computer?",
        "answer": "It removes pending print jobs from that printer's queue; it does not ordinarily delete the original document files. Record or cancel important jobs before clearing the queue."
      },
      {
        "question": "Why can I print a test page but not from one application?",
        "answer": "The printer path may work while the application has a different printer, document size, page range or print setting selected. Troubleshoot the app and document next."
      },
      {
        "question": "Should I reinstall the printer driver?",
        "answer": "Only after checking connection, printer status and queue. Use Windows Update or the printer manufacturer's current instructions for the exact model."
      }
    ]
  }
];
