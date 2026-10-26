import { useMemo, useState } from 'react';

const capacityOptions = [8, 16, 24, 32, 48, 64, 96, 128];

function formatGb(value: number): string {
  return Math.abs(value).toFixed(1).replace(/\.0$/, '') + ' GB';
}

export function MemoryPressureEstimator() {
  const [installedRam, setInstalledRam] = useState(32);
  const [unavailableRam, setUnavailableRam] = useState(0);
  const [windowsAndApps, setWindowsAndApps] = useState(4);
  const [gameOrMainApp, setGameOrMainApp] = useState(10);
  const [browserAndChat, setBrowserAndChat] = useState(3);
  const [captureAndOtherTools, setCaptureAndOtherTools] = useState(2);
  const [localAiAndCreativeWork, setLocalAiAndCreativeWork] = useState(0);
  const [additionalWorkload, setAdditionalWorkload] = useState(1);

  const demand = useMemo(
    () => windowsAndApps + gameOrMainApp + browserAndChat + captureAndOtherTools + localAiAndCreativeWork + additionalWorkload,
    [windowsAndApps, gameOrMainApp, browserAndChat, captureAndOtherTools, localAiAndCreativeWork, additionalWorkload]
  );
  const usableRam = Math.max(0, installedRam - unavailableRam);
  const headroom = usableRam - demand;
  const resultType = headroom < 0 ? 'over' : headroom < 4 ? 'tight' : 'headroom';

  const updateNumber = (setter: (next: number) => void, value: string, min = 0, max = 128) => {
    const parsed = Number(value);
    setter(Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min);
  };

  return (
    <section className="memory-pressure-estimator" aria-labelledby="memory-pressure-estimator-title">
      <div className="mpe-heading">
        <span className="eyebrow">TWW MEMORY PLANNING TOOL</span>
        <h2 id="memory-pressure-estimator-title">Estimate your RAM workload budget</h2>
        <p>Enter a rough peak-session estimate to compare workload demand with physical memory available to Windows. This is a planning aid, not a scan or benchmark of your PC.</p>
      </div>

      <div className="mpe-capacity-row">
        <label htmlFor="mpe-installed-ram">Installed physical RAM
          <select id="mpe-installed-ram" value={installedRam} onChange={event => {
            const next = Number(event.target.value);
            setInstalledRam(capacityOptions.includes(next) ? next : 32);
            setUnavailableRam(current => Math.min(current, next));
          }}>
            {capacityOptions.map(value => <option key={value} value={value}>{value} GB</option>)}
          </select>
        </label>
        <label htmlFor="mpe-unavailable-ram">RAM reserved / unavailable to Windows (GB)
          <input id="mpe-unavailable-ram" type="number" min="0" max={installedRam} step="0.5" value={unavailableRam} onChange={event => updateNumber(setUnavailableRam, event.target.value, 0, installedRam)} />
          <small>Use a known fixed firmware reservation only. Do not enter the maximum shared-GPU figure as if it were permanently reserved.</small>
        </label>
      </div>

      <div className="mpe-fields">
        <label htmlFor="mpe-os">Windows and everyday apps (GB)
          <input id="mpe-os" type="number" min="0" max="64" step="0.5" value={windowsAndApps} onChange={event => updateNumber(setWindowsAndApps, event.target.value, 0, 64)} />
        </label>
        <label htmlFor="mpe-main-app">Game or primary application (GB)
          <input id="mpe-main-app" type="number" min="0" max="96" step="0.5" value={gameOrMainApp} onChange={event => updateNumber(setGameOrMainApp, event.target.value, 0, 96)} />
        </label>
        <label htmlFor="mpe-browser">Browser, Discord and chat (GB)
          <input id="mpe-browser" type="number" min="0" max="64" step="0.5" value={browserAndChat} onChange={event => updateNumber(setBrowserAndChat, event.target.value, 0, 64)} />
        </label>
        <label htmlFor="mpe-capture">Streaming, recording and tools (GB)
          <input id="mpe-capture" type="number" min="0" max="64" step="0.5" value={captureAndOtherTools} onChange={event => updateNumber(setCaptureAndOtherTools, event.target.value, 0, 64)} />
        </label>
        <label htmlFor="mpe-ai">Local AI or creative workload (GB)
          <input id="mpe-ai" type="number" min="0" max="96" step="0.5" value={localAiAndCreativeWork} onChange={event => updateNumber(setLocalAiAndCreativeWork, event.target.value, 0, 96)} />
        </label>
        <label htmlFor="mpe-extra">Other background workload (GB)
          <input id="mpe-extra" type="number" min="0" max="64" step="0.5" value={additionalWorkload} onChange={event => updateNumber(setAdditionalWorkload, event.target.value, 0, 64)} />
        </label>
      </div>

      <div className="mpe-result-summary" aria-live="polite" aria-atomic="true">
        <div className="mpe-metric"><span>Estimated workload</span><strong>{formatGb(demand)}</strong></div>
        <div className="mpe-metric"><span>Usable physical RAM budget</span><strong>{formatGb(usableRam)}</strong></div>
        <div className="mpe-metric"><span>Estimated headroom</span><strong>{headroom < 0 ? '−' + formatGb(headroom) : formatGb(headroom)}</strong></div>
      </div>

      <div className={'mpe-verdict mpe-verdict-' + resultType} aria-live="polite">
        <strong>{resultType === 'over' ? 'The estimate exceeds physical capacity' : resultType === 'tight' ? 'The estimate leaves a small buffer' : 'The estimate leaves some headroom'}</strong>
        <p>
          {resultType === 'over'
            ? 'Your entered workload estimate is ' + formatGb(headroom) + ' above the usable physical-memory budget. Revise the estimates, then compare them with measurements taken during the real workload before buying.'
            : resultType === 'tight'
              ? 'Your entered workload leaves less than 4 GB of estimated headroom. That may be workable for some sessions, but workload spikes and other processes can change the result. Measure before deciding.'
              : 'Your entered workload leaves at least 4 GB of estimated headroom. That estimate alone is not a reason to upgrade; confirm how the actual PC behaves during peak use.'}
        </p>
      </div>
      <p className="mpe-note">Important: this does not predict page-file activity or actual performance. The estimate can double-count overlapping usage or miss short spikes. For a real diagnostic, open Task Manager → Performance → Memory and compare In use, Available and Committed (current / limit) while reproducing the symptom. A commit charge above installed RAM does not, by itself, prove that the excess is actively paging to disk.</p>
      <p className="mpe-reset"><button type="button" onClick={() => {
        setInstalledRam(32);
        setUnavailableRam(0);
        setWindowsAndApps(4);
        setGameOrMainApp(10);
        setBrowserAndChat(3);
        setCaptureAndOtherTools(2);
        setLocalAiAndCreativeWork(0);
        setAdditionalWorkload(1);
      }}>Reset example values</button></p>
    </section>
  );
}
