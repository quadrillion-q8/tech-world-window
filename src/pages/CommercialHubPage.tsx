import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { hubSeo } from '../data/hubs';
import { productImage, productPath, products, type Product, type ProductCategory } from '../data/products';

type HubCard = { title: string; description: string; href: string; label: string };
type HubConfig = {
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  cards: HubCard[];
};

const hubs: Record<string, HubConfig> = {
  '/reviews': {
    title: 'Technology Reviews & Product Research',
    eyebrow: 'REVIEWS & PRODUCT RESEARCH',
    description: 'Product-specific specifications, independent lab findings, comparisons and transparent buying notes.',
    intro: 'TWW currently publishes specification-based product profiles linked to external independent testing where available. These are not presented as TWW hands-on reviews. Original TWW test results will be labeled separately only when the hardware has actually been tested.',
    cards: [
      { title: 'SSD Profiles & Reviews', description: 'Capacity, interface, endurance, rated performance and independent review links.', href: '/reviews/ssds', label: 'Product category' },
      { title: 'GPU Profiles & Reviews', description: 'Graphics-card specifications, game-test coverage, thermals and value considerations.', href: '/reviews/gpus', label: 'Product category' },
      { title: 'Laptop Profiles & Reviews', description: 'Exact configurations, display, cooling, upgradeability, battery and independent tests.', href: '/reviews/laptops', label: 'Product category' },
      { title: 'CPU Profiles & Reviews', description: 'Core layout, platform compatibility, power and independent gaming/productivity testing.', href: '/reviews/cpus', label: 'Product category' },
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
    title: 'SSD Product Profiles & Reviews', eyebrow: 'SOLID-STATE STORAGE',
    description: 'SSD specifications, endurance ratings, compatibility notes and independently published performance testing.',
    intro: 'The current TWW SSD entries are specification profiles—not TWW laboratory reviews. Rated manufacturer speeds are labeled as specifications, while any outside measurements are attributed to the source that performed them.',
    cards: [
      { title: 'Samsung 990 PRO vs Crucial T500', description: 'Compare capacity, rated performance, endurance and use cases.', href: '/compare/samsung-990-pro-vs-crucial-t500', label: 'Specification comparison' },
      { title: 'Best SSDs for Gaming and Windows', description: 'Choose capacity, interface, thermals, endurance and value for the workload.', href: '/best-ssds', label: 'Buying guide' },
    ],
  },
  '/reviews/gpus': {
    title: 'GPU Product Profiles & Reviews', eyebrow: 'GRAPHICS CARDS',
    description: 'GPU specifications and links to independent graphics-card benchmarks, thermals, power and gaming tests.',
    intro: 'No TWW hands-on GPU benchmark has been published yet. The product pages below summarize specifications and clearly attribute outside lab findings, including review-unit and configuration limits where known.',
    cards: [
      { title: 'GPU at 100% Usage While Gaming', description: 'Learn when full GPU utilization is normal and when another bottleneck is more likely.', href: '/gpu-100-percent-usage-gaming', label: 'Troubleshooting guide' },
      { title: 'GPU Frame-Time Spikes', description: 'Diagnose uneven frame delivery instead of relying only on average FPS.', href: '/gpu-frame-time-spikes-causes-fix', label: 'Performance guide' },
      { title: 'GPU Overheating While Gaming', description: 'Separate normal load from thermal or power-limit behavior.', href: '/gpu-overheating-gaming-pc-causes-fix', label: 'Troubleshooting guide' },
      { title: 'PC Game Stuttering: Frame-Time Spikes', description: 'Use symptom patterns to narrow down the source of stutter.', href: '/pc-game-stuttering-fix-frame-time', label: 'Complete guide' },
    ],
  },
  '/reviews/laptops': {
    title: 'Laptop Product Profiles & Reviews', eyebrow: 'LAPTOPS',
    description: 'Exact laptop configurations, processor and GPU power limits, displays, thermals, upgradeability and published independent testing.',
    intro: 'Laptop reviews only make sense when the exact configuration is named. CPU, GPU, screen, memory, storage, power limits and firmware can change results, so TWW distinguishes each profile from the outside review unit it links to.',
    cards: [
      { title: 'Best Gaming Laptops', description: 'Compare the trade-offs between performance, cooling, portability, display and upgradeability.', href: '/best-gaming-laptops', label: 'Buying guide' },
      { title: 'Can You Upgrade a Gaming Laptop?', description: 'Check memory and SSD upgrade paths before purchasing or opening a machine.', href: '/gaming-laptop-upgradeable-ram-ssd', label: 'Compatibility guide' },
      { title: 'Laptop NVMe SSD Upgrade', description: 'Check physical, interface and firmware compatibility before buying a drive.', href: '/laptop-nvme-ssd-upgrade-compatibility', label: 'Compatibility guide' },
    ],
  },
  '/reviews/cpus': {
    title: 'CPU Product Profiles & Reviews', eyebrow: 'DESKTOP PROCESSORS',
    description: 'CPU platform specifications paired with independent gaming, productivity, power and thermal reviews.',
    intro: 'Core counts and boost clocks do not replace tests. TWW’s processor entries are specification profiles with links to independent results; there are no TWW-produced CPU benchmark numbers in this library yet.',
    cards: [
      { title: 'CPU Bottlenecks and Low FPS', description: 'Find out when the CPU is actually limiting game performance before changing hardware.', href: '/pc-game-low-fps-how-to-find-the-cause', label: 'Diagnostic guide' },
      { title: 'PC Game Stuttering: Frame-Time Spikes', description: 'Separate CPU scheduling and frame-pacing problems from GPU limitations.', href: '/pc-game-stuttering-fix-frame-time', label: 'Complete guide' },
      { title: 'Best RAM for Gaming PCs', description: 'Choose capacity and platform compatibility before chasing memory speed.', href: '/best-ram', label: 'Buying guide' },
    ],
  },
};

const categoryByPath: Record<string, ProductCategory | undefined> = {
  '/reviews/ssds': 'SSD',
  '/reviews/gpus': 'GPU',
  '/reviews/laptops': 'Laptop',
  '/reviews/cpus': 'CPU',
};

function ProfileCard({ product }: { product: Product }) {
  const externalCount = product.sources.filter(source => source.kind === 'independent-review').length;
  const image = productImage(product);
  return <article className="article-card product-profile-card" key={product.id}>
    <Link className="product-card-image" to={productPath(product)} tabIndex={-1} aria-hidden="true">
      <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 360px" alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
    </Link>
    <div className="card-topline">
      <span className="eyebrow">{externalCount ? 'SPEC PROFILE · EXTERNAL TESTS LINKED' : 'SPECIFICATION PROFILE'}</span>
      <span className="reading-time">{product.category}</span>
    </div>
    <h3><Link to={productPath(product)}>{product.brand} {product.model}</Link></h3>
    <p>{product.summary}</p>
    <div className="card-meta">{externalCount ? (externalCount + ' independent review source' + (externalCount === 1 ? '' : 's') + ' linked') : 'Manufacturer sources only; no TWW benchmark claim'}</div>
    <Link className="text-link" to={productPath(product)}>Read specifications & evidence →</Link>
  </article>;
}

function ProductShelf({ items, title }: { items: Product[]; title: string }) {
  if (!items.length) return null;
  return <section className="product-library-section">
    <div className="section-heading"><div><p className="eyebrow">PRODUCT-SPECIFIC COVERAGE</p><h2>{title}</h2></div></div>
    <div className="article-grid">{items.map(product => <ProfileCard key={product.id} product={product} />)}</div>
  </section>;
}

export function CommercialHubPage() {
  const location = useLocation();
  const hub = hubs[location.pathname];
  if (!hub) return <section className="section static-page"><h1>Page not found</h1><Link to="/">Return home →</Link></section>;

  const isReviewsPage = location.pathname.startsWith('/reviews');
  const isReviewIndex = location.pathname === '/reviews';
  const productCategory = categoryByPath[location.pathname];
  const categoryProducts = isReviewIndex ? products : productCategory ? products.filter(product => product.category === productCategory) : [];
  const heading = isReviewIndex ? 'Product profiles and independent reviews' : (categoryProducts.length + ' product profiles with source-backed evidence');

  return <section className="section category-page commercial-hub">
    <SEOEngine title={hubSeo[location.pathname]?.title ?? hub.title} description={hubSeo[location.pathname]?.description ?? hub.description} path={location.pathname} />
    <div className="category-hero">
      <span className="eyebrow">{hub.eyebrow}</span>
      <h1>{hub.title}</h1>
      <p>{hub.description}</p>
    </div>

    <aside className={'commercial-intro commercial-standards ' + (location.pathname === '/best' ? 'commercial-standards-buying' : 'commercial-standards-reviews') + (isReviewsPage ? ' review-integrity-notice' : '')} aria-label="Editorial standards">
      <span className="standards-mark" aria-hidden="true">{isReviewsPage ? 'i' : '✓'}</span>
      <div className="standards-copy">
        <span className="eyebrow">{location.pathname === '/best' ? 'OUR BUYING PRINCIPLES' : isReviewsPage ? 'TESTING TRANSPARENCY' : 'OUR EDITORIAL STANDARD'}</span>
        <strong>{location.pathname === '/best' ? 'Recommendations built around your needs.' : isReviewsPage ? 'External lab results are not TWW test results.' : 'Evidence first. Clear about what we tested.'}</strong>
        <p>{hub.intro}</p>
      </div>
      <Link className="standards-link" to={location.pathname === '/best' ? '/affiliate-disclosure' : '/testing'}>{location.pathname === '/best' ? 'Affiliate policy' : 'Testing methodology'} <span aria-hidden="true">↗</span></Link>
    </aside>

    {isReviewIndex && hub.cards.length > 0 && <div className="article-grid review-category-grid">{hub.cards.map(card => <article className="article-card" key={card.href}>
      <div className="card-topline"><span className="eyebrow">{card.label}</span></div>
      <h3><Link to={card.href}>{card.title}</Link></h3><p>{card.description}</p><Link className="text-link" to={card.href}>Explore category →</Link>
    </article>)}</div>}

    <ProductShelf items={categoryProducts} title={heading} />

    {hub.cards.length > 0 && !isReviewIndex && <section className="related-review-guides">
      <div className="section-heading"><div><p className="eyebrow">{isReviewsPage ? 'RELATED GUIDES' : 'MORE TO EXPLORE'}</p><h2>{isReviewsPage ? 'Useful diagnostics and buying guides' : 'Related guides and resources'}</h2></div></div>
      <div className="article-grid">{hub.cards.map(card => <article className="article-card" key={card.href + '-' + card.title}>
        <div className="card-topline"><span className="eyebrow">{card.label}</span></div>
        <h3><Link to={card.href}>{card.title}</Link></h3><p>{card.description}</p><Link className="text-link" to={card.href}>Explore →</Link>
      </article>)}</div>
    </section>}
  </section>;
}
