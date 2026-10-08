import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { hubSeo } from '../data/hubs';

type HubConfig = {
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  cards: { title: string; description: string; href: string; label: string }[];
};

const hubs: Record<string, HubConfig> = {
  '/reviews': {
    title: 'Technology Reviews', eyebrow: 'REVIEWS',
    description: 'Evidence-led technology reviews, comparisons and buying advice from Tech World Window.',
    intro: 'We separate hands-on testing from specifications and manufacturer claims. As this section grows, each review will explain what was tested, how it was tested, what we found, and who should buy it.',
    cards: [
      { title: 'SSD Reviews', description: 'Storage performance, thermals, endurance and real-world Windows use.', href: '/reviews/ssds', label: 'Category' },
      { title: 'GPU Reviews', description: 'Gaming performance, frame-time behavior, thermals and value.', href: '/reviews/gpus', label: 'Category' },
      { title: 'Laptop Reviews', description: 'Performance, cooling, upgradeability, battery behavior and practical ownership.', href: '/reviews/laptops', label: 'Category' },
      { title: 'CPU Reviews', description: 'Platform performance, efficiency, thermals and gaming behavior.', href: '/reviews/cpus', label: 'Category' },
    ],
  },
  '/best': {
    title: 'Best Technology Picks', eyebrow: 'BUYING GUIDES',
    description: 'Practical technology buying guides built around use cases, compatibility, performance and value.',
    intro: 'Buying guides are designed for people who are ready to compare products. Recommendations will be based on documented criteria and clearly separated from affiliate relationships.',
    cards: [
      { title: 'Best SSDs', description: 'Find the right SSD for Windows, gaming, laptops and demanding workloads.', href: '/best-ssds', label: 'Guide' },
      { title: 'Best Gaming Laptops', description: 'Compare gaming laptops by performance, cooling, display and upgradeability.', href: '/best-gaming-laptops', label: 'Guide' },
      { title: 'Best Gaming Monitors', description: 'Refresh rate, response behavior, resolution and GPU matching.', href: '/best-gaming-monitors', label: 'Guide' },
      { title: 'Best RAM', description: 'Choose capacity, speed and platform compatibility without guesswork.', href: '/best-ram', label: 'Guide' },
    ],
  },
  '/reviews/ssds': {
    title: 'SSD Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'SSD coverage focused on specifications, thermals, endurance and real-world buying decisions.',
    intro: 'Product pages distinguish manufacturer specifications from TWW hands-on testing. Current SSD profiles are specification-based until TWW has independently tested the drive.',
    cards: [
      { title: 'Samsung 990 PRO 4TB', description: 'PCIe 4.0 SSD with 4TB capacity and a 2,400 TBW rating.', href: '/reviews/ssds/samsung-990-pro-4tb', label: 'SSD Profile' },
      { title: 'Crucial T500 2TB', description: 'PCIe 4.0 SSD with up to 7,400/7,000 MB/s rated sequential performance.', href: '/reviews/ssds/crucial-t500-2tb', label: 'SSD Profile' },
      { title: 'Samsung 990 PRO vs Crucial T500', description: 'Compare capacity, rated performance, endurance and use cases.', href: '/compare/samsung-990-pro-vs-crucial-t500', label: 'Comparison' },
      { title: 'Best SSDs for Gaming and Windows', description: 'How to choose capacity, interface, thermals, endurance and value.', href: '/best-ssds', label: 'Buying Guide' },
    ],
  },
  '/reviews/gpus': {
    title: 'GPU Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'Graphics-card reviews covering gaming performance, frame times, thermals and value.',
    intro: 'GPU reviews will prioritize measurable performance, frame-time behavior, thermals and power rather than headline FPS alone. Until hands-on testing is published, use the diagnostic guides below to understand GPU behavior.', cards: [
      { title: 'GPU at 100% Usage While Gaming', description: 'Learn when 100% GPU utilization is normal, useful evidence, or a sign that something else is wrong.', href: '/gpu-100-percent-usage-gaming', label: 'Guide' },
      { title: 'GPU Frame-Time Spikes', description: 'Diagnose uneven frame delivery instead of relying only on average FPS.', href: '/gpu-frame-time-spikes-causes-fix', label: 'Guide' },
      { title: 'GPU Overheating While Gaming', description: 'Separate normal GPU load from thermal throttling and cooling problems.', href: '/gpu-overheating-gaming-pc-causes-fix', label: 'Guide' },
      { title: 'PC Game Stuttering: Frame-Time Spikes', description: 'Use a symptom-first method to find the real source of stutter.', href: '/pc-game-stuttering-fix-frame-time', label: 'Pillar' },
    ],
  },
  '/reviews/laptops': {
    title: 'Laptop Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'Laptop reviews focused on performance, thermals, battery behavior and upgradeability.',
    intro: 'Laptop reviews will emphasize ownership details that matter after the first week: cooling, sustained performance, storage, memory, display and repairability. While the hands-on review library grows, these guides cover the decisions buyers can verify now.', cards: [
      { title: 'Best Gaming Laptops', description: 'A practical framework for comparing GPU, CPU, cooling, display, RAM and upgradeability.', href: '/best-gaming-laptops', label: 'Buying Guide' },
      { title: 'Can You Upgrade a Gaming Laptop?', description: 'Check RAM and SSD upgrade paths before buying or opening a laptop.', href: '/gaming-laptop-upgradeable-ram-ssd', label: 'Guide' },
      { title: 'Laptop NVMe SSD Upgrade', description: 'Check physical, interface and firmware compatibility before buying a replacement drive.', href: '/laptop-nvme-ssd-upgrade-compatibility', label: 'Guide' },
      { title: 'How Much RAM Do You Need?', description: 'Match memory capacity to gaming, multitasking and Windows workloads.', href: '/how-much-ram-do-you-need-gaming', label: 'Guide' },
    ],
  },
  '/reviews/cpus': {
    title: 'CPU Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'CPU reviews and comparisons for gaming, productivity, thermals and platform decisions.',
    intro: 'CPU coverage will distinguish manufacturer specifications from measured results and explain where each processor makes sense. Use the platform and performance guides below while the hands-on CPU test library is built.', cards: [
      { title: 'CPU Bottlenecks and Low FPS', description: 'Find out when the CPU is actually limiting game performance before changing hardware.', href: '/pc-game-low-fps-how-to-find-the-cause', label: 'Guide' },
      { title: 'Low FPS in PC Games', description: 'Find out whether the CPU, GPU, memory, thermals or software is limiting frame rate.', href: '/pc-game-low-fps-how-to-find-the-cause', label: 'Guide' },
      { title: 'PC Game Stuttering: Frame-Time Spikes', description: 'Separate CPU scheduling and frame-pacing problems from GPU limitations.', href: '/pc-game-stuttering-fix-frame-time', label: 'Pillar' },
      { title: 'Best RAM for Gaming PCs', description: 'Choose capacity and platform compatibility before chasing memory speed.', href: '/best-ram', label: 'Buying Guide' },
    ],
  },
};

export function CommercialHubPage() {
  const location = useLocation();
  const hub = hubs[location.pathname];
  if (!hub) return <section className="section static-page"><h1>Page not found</h1><Link to="/">Return home →</Link></section>;
  return <section className="section category-page commercial-hub">
    <SEOEngine title={hubSeo[location.pathname]?.title ?? hub.title} description={hubSeo[location.pathname]?.description ?? hub.description} path={location.pathname} />
    <div className="category-hero">
      <span className="eyebrow">{hub.eyebrow}</span>
      <h1>{hub.title}</h1>
      <p>{hub.description}</p>
    </div>
    <div className="commercial-intro"><strong>How we handle commercial content</strong><p>{hub.intro}</p><Link className="text-link" to="/affiliate-disclosure">Read our affiliate disclosure →</Link></div>
    {hub.cards.length > 0 && <div className="article-grid">{hub.cards.map(card => <article className="article-card" key={card.href}>
      <div className="card-topline"><span className="eyebrow">{card.label}</span></div>
      <h3>{card.title}</h3><p>{card.description}</p><Link className="text-link" to={card.href}>Explore →</Link>
    </article>)}</div>}
  </section>;
}
