import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { FaqSection } from '../components/FaqSection';
import { trackMonetization } from '../lib/analytics';
import { toolByPath } from '../data/tools';
import { BSOD_BASE_PATH } from '../data/bsod';

type SymptomKey = 'startup' | 'crash' | 'slow' | 'network' | 'update' | 'gaming';
type Advice = {
  heading: string;
  summary: string;
  checks: string[];
  caution?: string;
  links: { href: string; label: string }[];
};
type Flow = {
  label: string;
  prompt: string;
  choices: { value: string; label: string }[];
  advice: Record<string, Advice>;
};

const TOOL_PATH = '/tools/windows-troubleshooting-assistant';

const FLOWS: Record<SymptomKey, Flow> = {
  startup: {
    label: 'Windows will not start',
    prompt: 'Where does the startup process stop?',
    choices: [
      { value: 'no-power', label: 'No power, lights, or fan response' },
      { value: 'logo', label: 'Stuck at the manufacturer logo or boot device screen' },
      { value: 'spinning', label: 'Windows logo, spinning dots, or recovery screen' },
      { value: 'desktop-freeze', label: 'Sign-in or desktop appears, then freezes' },
    ],
    advice: {
      'no-power': {
        heading: 'Check the power path without opening the device',
        summary: 'A no-power symptom is different from a Windows boot failure. Start with external power and visible indicators before assuming the motherboard has failed.',
        checks: [
          'Test a known-working wall outlet and inspect the external power cable or compatible laptop adapter for visible damage.',
          'Disconnect nonessential USB devices and docks, then try one normal power-on attempt.',
          'Record charging lights, blink codes, fan response, or any recent liquid exposure or impact.',
        ],
        caution: 'Do not open a power supply. Stop if there is a burning smell, liquid damage, a swollen battery, or damaged mains wiring.',
        links: [{ href: '/windows-11-wont-start-troubleshooting', label: 'Windows will not start: safe troubleshooting guide' }, { href: '/pc-power-supply-problems-symptoms', label: 'PC power supply warning signs' }],
      },
      logo: {
        heading: 'Find out whether firmware can see the boot drive',
        summary: 'A system that reaches the manufacturer logo may be failing before Windows has loaded. Avoid changing several firmware settings at once.',
        checks: [
          'Disconnect external storage and USB accessories, then retry once.',
          'If you can enter firmware setup safely, check whether the expected SSD is listed. Do not change storage mode, Secure Boot, or boot order without recording the original setting.',
          'Note any new drive, RAM, firmware, or BIOS change that happened before the problem began.',
        ],
        caution: 'If the drive is missing, clicking, or reports a health warning and the data matters, avoid repeated boot attempts and prioritize data protection.',
        links: [{ href: '/windows-11-wont-start-troubleshooting', label: 'Windows will not start: safe troubleshooting guide' }, { href: '/how-to-check-ssd-health-windows', label: 'How to check SSD health in Windows' }],
      },
      spinning: {
        heading: 'Separate a slow boot from a repeatable boot failure',
        summary: 'Windows may still be processing an update or trying to enter recovery. The next step depends on whether progress continues and whether this repeats on every boot.',
        checks: [
          'Record the exact message, percentage, recovery screen, or error code, and note how long it remains unchanged.',
          'If the machine is responsive or showing activity during an update, avoid interrupting it immediately.',
          'If recovery appears repeatedly, try the built-in Startup Repair or uninstall the latest update before considering a reset.',
        ],
        caution: 'Do not use Reset this PC or reinstall Windows before considering data backup and less destructive recovery options.',
        links: [{ href: '/windows-11-wont-start-troubleshooting', label: 'Windows will not start: safe troubleshooting guide' }, { href: '/windows/windows-update-stuck', label: 'Windows Update stuck: what to check first' }],
      },
      'desktop-freeze': {
        heading: 'Identify whether the freeze is at sign-in or after the desktop loads',
        summary: 'A usable sign-in screen followed by a frozen desktop often needs a different investigation from a machine that cannot load Windows at all.',
        checks: [
          'Note whether the mouse, keyboard shortcuts, and Ctrl+Alt+Delete still respond.',
          'If Task Manager opens, check whether CPU, memory, or disk remains saturated and note the process involved.',
          'Think about recent startup applications, driver updates, docks, or newly attached devices.',
        ],
        links: [{ href: '/windows-11-freezing-randomly-causes-fix', label: 'Windows freezing randomly: find the cause' }, { href: '/windows-11-slow-startup-fix', label: 'Windows slow startup: identify the delay' }],
      },
    },
  },
  crash: {
    label: 'Blue screen or repeated system crashes',
    prompt: 'Which pattern best describes the crashes?',
    choices: [
      { value: 'once', label: 'One blue screen or a rare crash' },
      { value: 'repeat-code', label: 'Repeated crashes with the same stop code' },
      { value: 'after-change', label: 'Crashes started after a driver, update, or hardware change' },
    ],
    advice: {
      once: {
        heading: 'Record the error before changing anything',
        summary: 'A single crash is a clue, not proof of failing hardware. Capture the stop code and see whether the behavior repeats.',
        checks: [
          'Write down the stop code and any “What failed” file name shown on screen.',
          'Open Reliability Monitor with perfmon /rel to see the crash time and recent critical events.',
          'Check whether Windows, a driver, or hardware changed shortly before the crash.',
        ],
        links: [{ href: '/windows-11-blue-screen-stop-code-how-to-read', label: 'How to read a Windows blue-screen stop code' }, { href: BSOD_BASE_PATH, label: 'Search the BSOD error-code lookup' }],
      },
      'repeat-code': {
        heading: 'Use the stop code to prioritize the next evidence',
        summary: 'Repeated crashes with the same code are more useful to investigate than a long list of unrecorded errors. Keep the code and timing together.',
        checks: [
          'Record the stop code, “What failed” file if shown, crash time, and workload.',
          'Review Reliability Monitor and check whether the same driver or change appears repeatedly.',
          'Start with reversible checks and system logs before replacing parts or reinstalling Windows.',
        ],
        caution: 'If the PC also reports drive-health warnings, protect important files before running repeated stress tests.',
        links: [{ href: BSOD_BASE_PATH, label: 'Search the BSOD error-code lookup' }, { href: '/windows-11-blue-screen-stop-code-how-to-read', label: 'Blue-screen stop codes: find the cause' }, { href: '/how-to-check-ram-for-errors-windows', label: 'How to check RAM for errors' }],
      },
      'after-change': {
        heading: 'Test the most recent change first',
        summary: 'A new driver, Windows update, firmware setting, or hardware component provides a useful starting point, but timing alone does not prove it caused the crash.',
        checks: [
          'Write down the exact driver, update, application, or component added immediately before the first crash.',
          'If practical, roll back one recent software or driver change and retest before making another change.',
          'For new RAM or overclocking settings, return to supported stock settings before further testing.',
        ],
        links: [{ href: '/windows-11-blue-screen-stop-code-how-to-read', label: 'Blue-screen diagnosis guide' }, { href: '/how-to-check-ram-for-errors-windows', label: 'How to check RAM for errors' }],
      },
    },
  },
  slow: {
    label: 'Slow, freezing, or high resource usage',
    prompt: 'What do you notice most?',
    choices: [
      { value: 'disk', label: 'Disk active time is high or Windows stutters while loading files' },
      { value: 'memory', label: 'Memory use stays high or applications close unexpectedly' },
      { value: 'boot', label: 'Startup or sign-in takes much longer than before' },
      { value: 'freeze', label: 'The whole PC freezes unpredictably' },
    ],
    advice: {
      disk: {
        heading: 'Compare disk active time, throughput, latency, and health',
        summary: '100% active time does not necessarily mean a drive is transferring data quickly. Diagnose the workload and drive evidence together.',
        checks: [
          'In Task Manager, compare Disk active time with MB/s and identify which process is generating activity.',
          'Check free space and review drive health. Back up important files before deeper tests if the drive reports warnings.',
          'Record whether the slowdown began suddenly, after an update, or as the drive filled up.',
        ],
        caution: 'Do not disable random Windows services or repeatedly run write-heavy benchmarks on a drive that may be failing.',
        links: [{ href: '/windows-11-disk-100-percent-usage', label: 'Windows 11 100% disk usage: what it means' }, { href: '/how-to-check-ssd-health-windows', label: 'How to check SSD health' }, { href: '/ssd-nearly-full-windows-performance', label: 'SSD nearly full: free-space guidance' }],
      },
      memory: {
        heading: 'Find which workload is using memory',
        summary: 'A high percentage alone does not establish a memory fault. Look for the process, committed memory, and whether the slowdown appears under a repeatable workload.',
        checks: [
          'Sort Task Manager by Memory and note the top processes while the slowdown is occurring.',
          'Compare normal idle use with your usual heavy workload and check whether browser tabs, virtual machines, or games account for the difference.',
          'If the PC also crashes or reports memory errors, test memory at default BIOS settings before buying an upgrade.',
        ],
        links: [{ href: '/windows-11-high-memory-usage-how-to-find-the-cause', label: 'Windows 11 high memory usage: find the cause' }, { href: '/how-to-check-ram-for-errors-windows', label: 'How to check RAM for errors' }, { href: '/tools/ram-calculator', label: 'Estimate a practical RAM capacity' }],
      },
      boot: {
        heading: 'Measure which startup stage is delayed',
        summary: 'A slow firmware screen, slow Windows loading, and a slow desktop after sign-in point to different causes.',
        checks: [
          'Note whether the delay happens before the Windows logo, during the logo, at sign-in, or after the desktop appears.',
          'Compare startup behavior before and after recent drivers, updates, or installed applications.',
          'Review startup apps and change only items you recognize, one at a time.',
        ],
        links: [{ href: '/windows-11-slow-startup-fix', label: 'Windows 11 slow startup: identify the delay' }, { href: '/windows-troubleshooting-complete-guide', label: 'Complete Windows troubleshooting guide' }],
      },
      freeze: {
        heading: 'Capture what changes when the freeze happens',
        summary: 'Freezes can involve a driver, a workload, thermals, storage, memory, or power. Timing and repeatability help narrow the field.',
        checks: [
          'Note whether audio continues, the mouse moves, and whether Ctrl+Alt+Delete responds.',
          'Record temperature and resource readings before the freeze if monitoring is already available; avoid adding heavy stress tests first.',
          'Check Reliability Monitor and Event Viewer around the event time, then change one likely factor at a time.',
        ],
        links: [{ href: '/windows-11-freezing-randomly-causes-fix', label: 'Windows freezing randomly: diagnosis guide' }, { href: '/windows-11-blue-screen-stop-code-how-to-read', label: 'Blue-screen and crash evidence' }],
      },
    },
  },
  network: {
    label: 'Wi-Fi, Ethernet, or internet problem',
    prompt: 'Which pattern fits best?',
    choices: [
      { value: 'one-device', label: 'Only this Windows PC has no internet' },
      { value: 'all-devices', label: 'Several devices cannot reach the internet' },
      { value: 'dns', label: 'Some sites fail by name, but other connections work' },
      { value: 'drops', label: 'The connection disconnects or drops intermittently' },
    ],
    advice: {
      'one-device': {
        heading: 'Separate adapter, IP, VPN, and DNS causes',
        summary: 'If other devices work on the same network, begin with the affected PC instead of resetting the router for everyone.',
        checks: [
          'Test another website and another browser, then temporarily disconnect a VPN or proxy only if you know how to restore it.',
          'Check whether Wi-Fi or Ethernet shows Connected and whether Windows reports a specific error.',
          'Run ipconfig /all and record the adapter, IPv4 address, default gateway, and DNS server without publishing personal network details.',
        ],
        links: [{ href: '/windows-11-wifi-connected-no-internet', label: 'Windows connected but no internet: diagnostic guide' }, { href: '/windows-11-dns-not-working-how-to-fix', label: 'How to identify a DNS problem' }],
      },
      'all-devices': {
        heading: 'Check the shared network before changing Windows',
        summary: 'When several devices lose internet at the same time, the cause may be the modem, router, line, or service provider rather than one computer.',
        checks: [
          'Check router or modem status lights and whether the local Wi-Fi network is still available.',
          'Test a second device and a wired connection if available; note whether local devices can still see each other.',
          'Check the ISP service status before using the router factory-reset button.',
        ],
        caution: 'A factory reset can erase connection settings. Do not use it as an early troubleshooting step.',
        links: [{ href: '/windows-11-wifi-connected-no-internet', label: 'Connected but no internet: complete guide' }],
      },
      dns: {
        heading: 'Confirm DNS is the issue before changing servers',
        summary: 'A DNS problem affects name lookups. It is not the only reason a website can fail, so compare names and network reachability first.',
        checks: [
          'Check whether the problem affects multiple sites or only one domain.',
          'Use nslookup for a failing hostname and compare with a known working hostname.',
          'Record VPN, security software, and recent network changes before changing DNS settings.',
        ],
        links: [{ href: '/windows-11-dns-not-working-how-to-fix', label: 'Windows 11 DNS troubleshooting' }, { href: '/windows-11-network-adapter-reset-guide', label: 'When to reset the network adapter' }],
      },
      drops: {
        heading: 'Find out whether the link, adapter, or router drops first',
        summary: 'Intermittent disconnections are easier to diagnose when you record timing, connection type, and whether other devices are affected.',
        checks: [
          'Compare Wi-Fi with Ethernet if possible and note whether the drop occurs on both.',
          'Check whether other devices disconnect at the same moment.',
          'Record the adapter model, driver date, signal conditions, and event time before resetting the network stack.',
        ],
        links: [{ href: '/windows-11-wifi-connected-no-internet', label: 'Windows internet troubleshooting' }, { href: '/windows-11-network-adapter-reset-guide', label: 'Network adapter reset: when to use it' }],
      },
    },
  },
  update: {
    label: 'Windows Update is stuck or failing',
    prompt: 'What happens when you update?',
    choices: [
      { value: 'percentage', label: 'The progress percentage has not changed' },
      { value: 'error', label: 'An error code appears after the update fails' },
      { value: 'rollback', label: 'Windows repeatedly rolls back or undoes changes' },
    ],
    advice: {
      percentage: {
        heading: 'Check for progress before interrupting the update',
        summary: 'Some update stages take a long time without changing the visible percentage. The key is whether the system is still responsive or showing activity.',
        checks: [
          'Record the percentage, update name, time elapsed, and whether the display or disk activity changes.',
          'If Windows is responsive or there is evidence of activity, give it time rather than repeatedly forcing a shutdown.',
          'If the same stage fails repeatedly, capture the update name and error from Update history.',
        ],
        caution: 'Avoid repeated forced power-offs during an active firmware update or an installation stage that is still progressing.',
        links: [{ href: '/windows/windows-update-stuck', label: 'Windows Update stuck: how long to wait and what to check' }],
      },
      error: {
        heading: 'Use the exact update error code',
        summary: 'An error code is more useful than a generic “update failed” message. Keep the code and update name together.',
        checks: [
          'Open Settings → Windows Update → Update history and record the failed update and error code.',
          'Check free storage, recent driver changes, and whether other updates fail with the same code.',
          'Avoid downloading random repair utilities or deleting system folders based on a generic error.',
        ],
        links: [{ href: '/windows/windows-update-stuck', label: 'Windows Update troubleshooting guide' }, { href: '/windows-troubleshooting-complete-guide', label: 'Complete Windows troubleshooting guide' }],
      },
      rollback: {
        heading: 'Investigate the rollback instead of repeating the same install',
        summary: 'Repeated rollbacks may involve a driver, storage, compatibility, or system-file issue. Preserve the error and current recovery options.',
        checks: [
          'Record the update KB number and exact rollback message.',
          'Disconnect nonessential peripherals and check available system-drive space.',
          'Review recent driver or firmware changes and use the built-in recovery options if Windows cannot start normally.',
        ],
        caution: 'Back up important files before a recovery operation and avoid resetting Windows until less disruptive options are considered.',
        links: [{ href: '/windows/windows-update-stuck', label: 'Windows Update stuck: safe repair order' }, { href: '/windows-11-wont-start-troubleshooting', label: 'Windows startup recovery guide' }],
      },
    },
  },
  gaming: {
    label: 'PC game has low FPS, stutter, or crashes',
    prompt: 'What best describes the game problem?',
    choices: [
      { value: 'low-fps', label: 'Average FPS is consistently lower than expected' },
      { value: 'repeat-stutter', label: 'The game hitches or frame times spike during play' },
      { value: 'first-visit', label: 'Stutter is worst on first encounters or after a game update' },
      { value: 'crashes', label: 'The game closes or crashes to desktop' },
    ],
    advice: {
      'low-fps': {
        heading: 'Measure a repeatable scene and separate CPU from GPU limits',
        summary: 'Average FPS is an outcome, not a cause. Record utilization, clocks, temperature, resolution, settings, and frame-time behavior in the same scene.',
        checks: [
          'Repeat the same scene with the same settings and background apps.',
          'Compare performance at a lower resolution; a large improvement suggests the graphics workload is contributing.',
          'Check temperatures, clock behavior, VRAM usage, and whether one CPU thread is heavily loaded.',
        ],
        links: [{ href: '/pc-game-low-fps-how-to-find-the-cause', label: 'Low FPS: find the real bottleneck' }, { href: '/tools/frame-time-analyzer', label: 'Analyze a frame-time capture' }],
      },
      'repeat-stutter': {
        heading: 'Capture frame time before changing settings blindly',
        summary: 'A game can have high average FPS and still feel uneven. A capture can show when frames arrive late, although it cannot by itself prove the cause.',
        checks: [
          'Use the same route or scene for at least 60 seconds and compare repeated captures.',
          'Watch frame time alongside GPU/CPU use, VRAM, RAM, temperatures and clocks.',
          'Compare whether the hitch repeats at the same event or happens randomly across scenes.',
        ],
        links: [{ href: '/tools/frame-time-analyzer', label: 'Use the Frame-Time Analyzer' }, { href: '/pc-game-stuttering-fix-frame-time', label: 'PC game stuttering: troubleshooting guide' }, { href: '/gpu-frame-time-spikes-causes-fix', label: 'GPU frame-time spikes: common causes' }],
      },
      'first-visit': {
        heading: 'Check whether the stutter follows new effects or repeats unpredictably',
        summary: 'A hitch on the first encounter with an effect can be consistent with shader compilation, but random stutter elsewhere may have a different cause.',
        checks: [
          'Repeat the same route and note whether the same hitch becomes less frequent after the first pass.',
          'Check whether the game or graphics driver was updated and whether shader caches were cleared.',
          'Do not repeatedly clear shader caches as a generic performance fix; doing so can force shaders to rebuild.',
        ],
        links: [{ href: '/shader-compilation-stutter-pc-games', label: 'Shader compilation stutter: why it happens' }, { href: '/tools/frame-time-analyzer', label: 'Analyze frame-time captures' }],
      },
      crashes: {
        heading: 'Separate a game crash from a system-level failure',
        summary: 'A game closing to desktop is different from a Windows blue screen or complete power loss. Record the error and when it occurs.',
        checks: [
          'Note whether only one game closes or several games fail under load.',
          'Record the game error, crash time, recent patch, graphics driver version, and temperatures.',
          'Verify game files and test one recent change at a time before using driver-cleaning tools or reinstalling Windows.',
        ],
        links: [{ href: '/pc-games-crashing-to-desktop-troubleshooting', label: 'PC games crashing to desktop: diagnosis' }, { href: '/gpu-overheating-gaming-pc-causes-fix', label: 'GPU overheating: what to check first' }],
      },
    },
  },
};

const SYMPTOM_ORDER: SymptomKey[] = ['startup', 'crash', 'slow', 'network', 'update', 'gaming'];
const SYMPTOM_ICONS: Record<SymptomKey, string> = {
  startup: '01', crash: '02', slow: '03', network: '04', update: '05', gaming: '06',
};

export function WindowsTroubleshootingAssistantPage() {
  const [symptom, setSymptom] = useState<SymptomKey | ''>('');
  const [detail, setDetail] = useState('');
  const [showResult, setShowResult] = useState(false);
  const flow = symptom ? FLOWS[symptom] : undefined;
  const advice = flow && detail ? flow.advice[detail] : undefined;
  const tool = toolByPath.get(TOOL_PATH);

  const chooseSymptom = (key: SymptomKey) => {
    setSymptom(key);
    setDetail('');
    setShowResult(false);
    trackMonetization('tool_used', { tool: 'windows_troubleshooting_assistant', method: 'choose_symptom', symptom: key });
  };

  const reset = () => {
    setSymptom('');
    setDetail('');
    setShowResult(false);
  };

  const showAdvice = () => {
    if (!symptom || !detail || !advice) return;
    setShowResult(true);
    trackMonetization('tool_completed', { tool: 'windows_troubleshooting_assistant', symptom, detail });
  };

  return <section className="section tool-page wta-page">
    <SEOEngine
      title={tool?.seoTitle || 'Windows Troubleshooting Assistant'}
      description={tool?.metaDescription || 'Find safe first checks for common Windows and PC problems.'}
      path={TOOL_PATH}
    />
    <span className="eyebrow">FREE INTERACTIVE TOOL</span>
    <h1>Windows Troubleshooting Assistant</h1>
    <p className="page-intro">Choose what is happening, narrow down the symptom, and get a safe first-check plan with links to focused guides. This tool helps you choose the next investigation; it does not scan your PC or diagnose a failed component.</p>

    <div className="wta-privacy"><strong>Browser-first and privacy-conscious</strong><p>Your answers are processed in this browser; files, logs, and diagnostic output are not submitted for analysis. If you have accepted analytics, the site may record the selected symptom category and chosen option for aggregate tool-use measurement.</p></div>

    <section className="wta-step" aria-labelledby="wta-step-one">
      <div className="wta-step-heading"><span>STEP 1</span><div><h2 id="wta-step-one">What is the main problem?</h2><p>Start with the symptom that best matches what you see.</p></div></div>
      <div className="wta-symptom-grid" role="group" aria-label="Choose a problem category">
        {SYMPTOM_ORDER.map(key => <button type="button" key={key} className={`wta-choice${symptom === key ? ' is-selected' : ''}`} aria-pressed={symptom === key} onClick={() => chooseSymptom(key)}>
          <span className="wta-choice-number">{SYMPTOM_ICONS[key]}</span><strong>{FLOWS[key].label}</strong><span className="wta-choice-arrow" aria-hidden="true">→</span>
        </button>)}
      </div>
    </section>

    {flow && <section className="wta-step" aria-labelledby="wta-step-two">
      <div className="wta-step-heading"><span>STEP 2</span><div><h2 id="wta-step-two">{flow.prompt}</h2><p>Choose the closest match. You can change it at any time.</p></div></div>
      <div className="wta-detail-list" role="group" aria-label={flow.prompt}>
        {flow.choices.map(choice => <button type="button" key={choice.value} className={`wta-detail-choice${detail === choice.value ? ' is-selected' : ''}`} aria-pressed={detail === choice.value} onClick={() => { setDetail(choice.value); setShowResult(false); }}>
          <span className="wta-radio" aria-hidden="true" />{choice.label}
        </button>)}
      </div>
      <div className="wta-actions"><button type="button" className="button button-primary" disabled={!detail} onClick={showAdvice}>Show my next checks <span aria-hidden="true">→</span></button><button type="button" className="button button-secondary wta-reset" onClick={reset}>Start again</button></div>
    </section>}

    {showResult && advice && <section className="wta-result" aria-live="polite" aria-labelledby="wta-result-heading">
      <span className="eyebrow">YOUR NEXT-CHECK PLAN</span>
      <h2 id="wta-result-heading">{advice.heading}</h2>
      <p>{advice.summary}</p>
      <h3>Start with these checks</h3>
      <ol>{advice.checks.map(item => <li key={item}>{item}</li>)}</ol>
      {advice.caution && <div className="wta-caution"><strong>Important</strong><p>{advice.caution}</p></div>}
      <h3>Continue with the right guide</h3>
      <ul className="wta-result-links">{advice.links.map(link => <li key={link.href}><Link className="text-link" to={link.href} onClick={() => trackMonetization('tool_conversion', { tool: 'windows_troubleshooting_assistant', symptom, detail, destination: link.href })}>{link.label} <span aria-hidden="true">→</span></Link></li>)}</ul>
      <p className="wta-note">This is a symptom-routing aid, not a definitive diagnosis. If data is at risk or electrical damage is suspected, prioritize safety and backups over repeated testing.</p>
    </section>}

    <div className="editorial-note wta-editorial-note"><strong>How to get a better result</strong><p>Record the exact error, when it began, what changed recently, and whether it repeats. Change one variable at a time and compare the same workload before and after. Avoid downloading unknown “driver updater” or repair utilities.</p><p><Link className="text-link" to="/windows-troubleshooting-complete-guide">Read the complete Windows troubleshooting guide →</Link></p></div>
    <FaqSection items={tool?.faq || []} />
  </section>;
}
