# TWW PC Game Frame-Time Test Protocol

Use this checklist with the [Frame-Time Analyzer](https://www.techworldwindow.com/tools/frame-time-analyzer) and the blank [CSV test-log template](./tww-frame-time-test-log.csv). The files contain no benchmark results: they are intended to record measurements you collect on your own system.

## Purpose and limits

This is a practical reproducibility checklist, not a formal laboratory standard. It helps document conditions so a before-and-after comparison is interpretable. One run cannot establish a universal result, prove causation, or represent every PC with the same component names.

## 1. Record the test conditions

Record the game title and build, exact scene or route, CPU, GPU, RAM configuration, Windows edition/build, BIOS version, graphics driver, capture application and version, and the CSV timing column used.

Also record resolution, graphics preset, ray tracing, upscaling and mode, frame generation, V-Sync, frame-rate cap, power mode, and whether a laptop was connected to AC power. Do not rely on a screenshot that leaves important settings unstated.

## 2. Make the scenario repeatable

- Choose a scene that can be repeated as closely as possible: the same save, route, benchmark, camera path, or scripted sequence.
- Keep the game build, graphics settings, display mode, power mode, capture application, and source timing metric the same between conditions.
- Warm up the system and game consistently before recording. Write down the warm-up period; do not assume a cold run and a heat-soaked run are directly comparable.
- Close or keep the same background tasks and overlays. Avoid changing monitoring tools between runs.
- Capture at least 60 seconds when the scene allows. Very short captures leave few samples in the slowest 1% and 0.1%, so those figures are less stable.

## 3. Repeat, do not cherry-pick

For a practical before-and-after check, collect at least three runs for each condition when time permits. Preserve every run. Compare all runs, not just the best one. If you deliberately exclude a run because of a documented interruption or capture failure, keep the file and write down the reason.

When possible, alternate or vary the order of A and B runs to reduce the risk that warm-up, temperature, or background activity is mistaken for an effect of the setting being tested. This does not eliminate every confounder.

## 4. Use the same frame-time metric

Present-to-present intervals and display-change intervals describe different points in frame delivery. Do not mix them in a before-and-after comparison. If frame generation is enabled, document it and check whether your capture is measuring application-presented frames or displayed frames.

The analyzer reports its own definitions for average FPS, 1% and 0.1% lows, percentiles, detected stutter events, and frames over budget. Other applications may define similarly named metrics differently. Compare like with like and include the analyzer report alongside the raw captures when sharing a result.

## 5. Report the evidence, not a guess

- Keep the original capture files and the completed CSV log together.
- Report the actual hardware, driver, game build, settings, test duration, timing column and run count.
- Describe what changed and what stayed the same.
- Treat a changed metric as an observation, not proof that a CPU, GPU, driver, shader, storage device, or temperature was the cause.
- Do not present this blank template, generated sample data, or a single unverified run as an independent benchmark result.
- If publishing screenshots or logs, review them for personal usernames, local paths, account names, device identifiers, and other information you do not intend to disclose.

## 6. Analyze locally

Open the [Frame-Time Analyzer](https://www.techworldwindow.com/tools/frame-time-analyzer), choose a compatible CSV capture, and check the detected source column and any warnings. The tool reads and analyzes the selected file in your browser; it does not upload the capture. If you share results elsewhere, you are responsible for reviewing the files and screenshots you choose to publish.

## Capture-tool documentation

- [PresentMon CSV output documentation](https://github.com/GameTechDev/PresentMon/blob/main/README-ConsoleApplication.md)
- [CapFrameX features](https://www.capframex.com/features)
- [CapFrameX project and documentation](https://github.com/CXWorld/CapFrameX)
- [NVIDIA FrameView user guide (PDF)](https://images.nvidia.com/content/geforce/technologies/frameview/frameview-1-4-user-guide-web-version.pdf)

These tools and export schemas can change. Consult the documentation for your installed version and inspect the actual CSV column names before comparing results.
