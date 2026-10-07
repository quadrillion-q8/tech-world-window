import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';

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
    description: 'SSD testing and reviews focused on speed, thermals, endurance and real-world Windows use.',
    intro: 'This review hub is ready for product-specific pages. Product pages will only claim hands-on results when the product was actually tested; otherwise specifications and independent evidence will be clearly identified.',
    cards: [],
  },
  '/reviews/gpus': {
    title: 'GPU Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'Graphics-card reviews covering gaming performance, frame times, thermals and value.',
    intro: 'GPU reviews will prioritize measurable performance and frame-time behavior rather than headline FPS alone.', cards: [],
  },
  '/reviews/laptops': {
    title: 'Laptop Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'Laptop reviews focused on performance, thermals, battery behavior and upgradeability.',
    intro: 'Laptop reviews will emphasize ownership details that matter after the first week: cooling, sustained performance, storage, memory, display and repairability.', cards: [],
  },
  '/reviews/cpus': {
    title: 'CPU Reviews', eyebrow: 'HARDWARE REVIEWS',
    description: 'CPU reviews and comparisons for gaming, productivity, thermals and platform decisions.',
    intro: 'CPU coverage will distinguish manufacturer specifications from measured results and explain where each processor makes sense.', cards: [],
  },
};

export function CommercialHubPage() {
  const location = useLocation();
  const hub = hubs[location.pathname];
  if (!hub) return <section className="section static-page"><h1>Page not found</h1><Link to="/">Return home →</Link></section>;
  return <section className="section category-page commercial-hub">
    <SEOEngine title={hub.title} description={hub.description} path={location.pathname} />
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
