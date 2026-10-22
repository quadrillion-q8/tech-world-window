import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ram-ssd-upgrade-planner.css';

type Concern = 'memory' | 'space' | 'drive-risk' | 'gaming' | 'unknown';
type Urgency = 'blocking' | 'flexible';
type Compatibility = 'confirmed' | 'unknown' | 'not-practical';

type Recommendation = {
  label: string;
  headline: string;
  explanation: string;
  steps: string[];
  links: { label: string; href: string }[];
  urgency: 'urgent' | 'measure' | 'optional';
};

function recommend(concern: Concern, urgency: Urgency, compatibility: Compatibility): Recommendation {
  if (concern === 'drive-risk') {
    return {
      label: 'Protect data first',
      headline: 'Back up and investigate the drive before price-shopping.',
      explanation: 'Read errors, repeated disconnects, a disappearing drive or serious health warnings are data-risk symptoms. They are not a good reason to run more benchmarks or wait for a retail price dip.',
      steps: [
        'Back up important files to a separate device or trusted destination, then verify that the backup opens.',
        'Avoid unnecessary writes and repeated stress tests while the fault is uncertain.',
        'Check the drive maker’s diagnostics and exact model compatibility; plan recovery or replacement based on the evidence.'
      ],
      links: [{ label: 'How to check SSD health', href: '/how-to-check-ssd-health-windows' }, { label: 'SSD nearly full: what changes', href: '/research/ssd-nearly-full-what-really-changes' }],
      urgency: 'urgent'
    };
  }

  if (concern === 'gaming') {
    return {
      label: 'Measure the bottleneck first',
      headline: 'Do not buy RAM or an SSD solely to increase FPS.',
      explanation: 'Gaming performance can be limited by the GPU, CPU, memory pressure, frame caps, shader compilation, thermals or storage. An upgrade helps only when it addresses the limiting factor.',
      steps: [
        'Capture frame times in a repeatable game scene and check GPU/CPU activity, temperatures and clocks.',
        'Look for evidence of memory pressure before choosing RAM; only consider storage if capacity, loading or asset-streaming evidence points that way.',
        'Change one variable at a time and compare the same scene rather than guessing from one benchmark screenshot.'
      ],
      links: [{ label: 'Frame-Time Analyzer', href: '/tools/frame-time-analyzer' }, { label: 'GPU at 100% usage while gaming', href: '/gpu-100-percent-usage-gaming' }],
      urgency: 'measure'
    };
  }

  if (concern === 'unknown') {
    return {
      label: 'Diagnose before purchasing',
      headline: 'Collect evidence before choosing the part.',
      explanation: '“My PC feels slow” does not identify RAM or storage as the cause. Buying a part before locating the limit can spend money without solving the symptom.',
      steps: [
        'Record what you were doing, when the slowdown starts, and whether it repeats.',
        'During the symptom, check Task Manager memory and the active disk process/throughput; also watch CPU, temperature and background activity.',
        'Use the focused guide that matches the measurement, then compare the same workload after any change.'
      ],
      links: [{ label: 'Does more RAM make Windows faster?', href: '/research/does-more-ram-make-windows-faster' }, { label: '100% disk usage but low MB/s', href: '/research/windows-100-percent-disk-usage-low-mbps' }, { label: 'Complete Windows troubleshooting guide', href: '/windows-troubleshooting-complete-guide' }],
      urgency: 'measure'
    };
  }

  if (compatibility === 'unknown') {
    return {
      label: 'Confirm the exact model first',
      headline: 'Do not order until the upgrade path is verified.',
      explanation: 'The same product family can have different RAM layouts or storage slots. Check the full model/SKU, supported capacity, memory generation, drive interface and physical length in the manufacturer’s documentation.',
      steps: [
        'Find the exact laptop model or motherboard revision.',
        'Read the official specification sheet or service manual and confirm supported RAM or SSD types.',
        'Compare total landed price, warranty and return terms for the exact compatible part.'
      ],
      links: [{ label: 'Laptop RAM and SSD upgradeability', href: '/gaming-laptop-upgradeable-ram-ssd' }, { label: 'NVMe SSD compatibility guide', href: '/laptop-nvme-ssd-upgrade-compatibility' }],
      urgency: 'measure'
    };
  }

  if (compatibility === 'not-practical' && concern === 'memory') {
    return {
      label: 'Check alternatives first',
      headline: 'The RAM may not be upgradeable in this device.',
      explanation: 'If memory is soldered or no supported upgrade exists, a module purchase will not help. First confirm the exact design, then reduce unnecessary background load or consider whether the workload justifies a different device.',
      steps: [
        'Verify soldered versus socketed memory from the exact model’s service manual.',
        'Measure which applications drive memory pressure and close or reconfigure nonessential workload where practical.',
        'If the workload still cannot fit and memory is not upgradeable, compare the cost of an appropriately configured replacement device against the work being blocked.'
      ],
      links: [{ label: 'Why 8GB RAM can feel limiting', href: '/why-8gb-ram-is-no-longer-enough-for-windows-11' }, { label: 'RAM Calculator', href: '/tools/ram-calculator' }],
      urgency: urgency === 'blocking' ? 'measure' : 'optional'
    };
  }

  if (concern === 'memory') {
    if (urgency === 'blocking') {
      return {
        label: 'Upgrade may be justified now',
        headline: 'If the pressure is repeatable and the part is compatible, solve the bottleneck.',
        explanation: 'When a measured memory-capacity limit repeatedly blocks work, waiting for a hypothetical price drop can have a real downtime cost. Buy only after confirming the supported configuration and a price you can justify.',
        steps: [
          'Record committed memory, paging and the workload that becomes unresponsive.',
          'Use the RAM Calculator as a starting estimate, not as proof of compatibility.',
          'Confirm capacity, DDR generation, module type, slots and warranty before purchase; retest the same workload after installing.'
        ],
        links: [{ label: 'RAM Calculator', href: '/tools/ram-calculator' }, { label: 'More RAM versus faster RAM', href: '/research/does-more-ram-make-windows-faster' }],
        urgency: 'urgent'
      };
    }
    return {
      label: 'Measure and monitor pricing',
      headline: 'You can probably compare prices before committing.',
      explanation: 'If memory pressure is present but not disrupting essential work, record the workload and track the same compatible kit rather than buying from urgency created by a headline.',
      steps: [
        'Repeat the memory measurement during the heaviest normal session.',
        'Confirm the supported upgrade and set a target price for the exact kit.',
        'Revisit the decision if slowdowns become persistent or the workload changes.'
      ],
      links: [{ label: 'RAM Calculator', href: '/tools/ram-calculator' }, { label: 'DDR4 vs DDR5', href: '/ddr4-vs-ddr5-ram-difference' }],
      urgency: 'optional'
    };
  }

  if (concern === 'space') {
    if (compatibility === 'not-practical') {
      return {
        label: 'Free space or use an alternative',
        headline: 'Check whether file moves can solve the problem before replacing the drive.',
        explanation: 'If the internal drive cannot be upgraded practically, remove or move files safely, check for a supported secondary/external-storage option, or obtain a model-specific service assessment.',
        steps: [
          'Find what uses the space and move/archive files you do not need on the system drive.',
          'Keep a verified backup; do not delete unfamiliar Windows or application folders to make a number look better.',
          'Confirm whether an external drive or documented secondary slot is suitable for your workload.'
        ],
        links: [{ label: 'Storage Calculator', href: '/tools/storage-calculator' }, { label: 'SSD nearly full: what changes', href: '/research/ssd-nearly-full-what-really-changes' }],
        urgency: urgency === 'blocking' ? 'measure' : 'optional'
      };
    }
    if (urgency === 'blocking') {
      return {
        label: 'A capacity upgrade may be justified',
        headline: 'If you have repeatedly run out of space, buy for capacity and compatibility.',
        explanation: 'A larger drive solves a real capacity shortage. It does not automatically make a healthy PC faster, so choose enough usable capacity for your workload and verify the exact slot and interface.',
        steps: [
          'Move nonessential files and estimate how much capacity you actually need.',
          'Confirm SATA/NVMe, M.2 length, slot occupancy and any heatsink or bracket requirements.',
          'Back up and verify the backup before migrating or replacing a Windows drive.'
        ],
        links: [{ label: 'Storage Calculator', href: '/tools/storage-calculator' }, { label: 'Laptop NVMe compatibility', href: '/laptop-nvme-ssd-upgrade-compatibility' }],
        urgency: 'urgent'
      };
    }
    return {
      label: 'Try safe capacity management first',
      headline: 'You can make space now and compare compatible drives without rushing.',
      explanation: 'If the drive is healthy and space pressure is manageable, archive large files and track an equivalent drive rather than assuming you need to buy immediately.',
      steps: [
        'Review Storage settings and identify large files, downloads or games that can be moved safely.',
        'Estimate your future library and work-file capacity with the Storage Calculator.',
        'Check the exact slot and compare like-for-like prices; do not treat a contract-price forecast as a retail quote.'
      ],
      links: [{ label: 'Storage Calculator', href: '/tools/storage-calculator' }, { label: 'How to check SSD health', href: '/how-to-check-ssd-health-windows' }],
      urgency: 'optional'
    };
  }

  return {
    label: 'Use the measurements to choose',
    headline: 'Do not let a price chart choose the component for you.',
    explanation: 'The correct next step depends on the confirmed limitation, the exact model and whether the purchase changes something important in your day-to-day workload.',
    steps: ['Measure the issue under repeatable conditions.', 'Confirm an appropriate, compatible part.', 'Compare local total cost and expected benefit before ordering.'],
    links: [{ label: 'RAM Calculator', href: '/tools/ram-calculator' }, { label: 'Storage Calculator', href: '/tools/storage-calculator' }],
    urgency: 'measure'
  };
}

export function RamSsdUpgradePlanner() {
  const [concern, setConcern] = useState<Concern>('unknown');
  const [urgency, setUrgency] = useState<Urgency>('flexible');
  const [compatibility, setCompatibility] = useState<Compatibility>('unknown');
  const result = recommend(concern, urgency, compatibility);

  return <section className="ram-ssd-planner" aria-labelledby="ram-ssd-planner-title">
    <div className="ram-ssd-planner-header">
      <span className="eyebrow">TWW UPGRADE DECISION AID</span>
      <h2 id="ram-ssd-planner-title">What should you do before buying?</h2>
      <p>Answer three quick questions for a next step based on the problem you are actually experiencing. This does not scan your PC, confirm compatibility or predict future prices.</p>
    </div>
    <div className="ram-ssd-planner-fields">
      <label htmlFor="ram-ssd-concern">What is the main issue?
        <select id="ram-ssd-concern" value={concern} onChange={event => setConcern(event.target.value as Concern)}>
          <option value="unknown">PC feels slow; I have not isolated the cause</option>
          <option value="memory">Multitasking slows down and memory looks pressured</option>
          <option value="space">The SSD is nearly full or lacks capacity</option>
          <option value="drive-risk">The SSD reports errors, disconnects or disappears</option>
          <option value="gaming">I want higher FPS or less stutter in games</option>
        </select>
      </label>
      <label htmlFor="ram-ssd-urgency">How urgent is the problem?
        <select id="ram-ssd-urgency" value={urgency} onChange={event => setUrgency(event.target.value as Urgency)}>
          <option value="flexible">The PC still works; I can compare options</option>
          <option value="blocking">It is blocking important work or risking data</option>
        </select>
      </label>
      <label htmlFor="ram-ssd-compatible">Have you confirmed that the part is upgradeable?
        <select id="ram-ssd-compatible" value={compatibility} onChange={event => setCompatibility(event.target.value as Compatibility)}>
          <option value="unknown">Not yet; I need to check the exact model</option>
          <option value="confirmed">Yes; official specs confirm the compatible upgrade</option>
          <option value="not-practical">No practical internal upgrade is available</option>
        </select>
      </label>
    </div>
    <div className={'ram-ssd-planner-result is-' + result.urgency} aria-live="polite" aria-atomic="true">
      <span className="ram-ssd-planner-label">{result.label}</span>
      <h3>{result.headline}</h3>
      <p>{result.explanation}</p>
      <ol>{result.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
      <nav aria-label="Recommended next tools and guides">
        {result.links.map(link => <Link to={link.href} key={link.href}>{link.label} →</Link>)}
      </nav>
    </div>
    <p className="ram-ssd-planner-disclaimer">This is a rule-based decision aid, not a hardware diagnostic, price forecast, medical/safety assessment, or compatibility lookup. Drive-error selections prioritize data protection.</p>
  </section>;
}
