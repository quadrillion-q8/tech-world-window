import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';
import { tools } from '../data/tools';
import { bsodEntries, bsodPath, shortHex } from '../data/bsod';
import { galleryImages } from '../data/gallery';

type QuickJumpItem = {
  title: string;
  detail: string;
  path: string;
  keywords: string;
  searchText: string;
};

const pillarArticles = articles.filter(article => article.contentRole === 'pillar').slice(0, 4);
const shownIds = new Set(pillarArticles.map(article => article.id));
const latestArticles = articles
  .filter(article => !shownIds.has(article.id))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 6);

const quickJumpItems: QuickJumpItem[] = [
  ...articles.map(article => ({
    title: article.title,
    detail: article.dek,
    path: '/' + article.slug,
    keywords: article.tags.join(' ') + ' ' + article.category,
    searchText: (article.title + ' ' + article.dek + ' ' + article.tags.join(' ') + ' ' + article.category).toLowerCase(),
  })),
  ...tools.map(tool => ({
    title: tool.title,
    detail: tool.hubDescription,
    path: tool.path,
    keywords: tool.menuDescription,
    searchText: (tool.title + ' ' + tool.hubDescription + ' ' + tool.menuDescription).toLowerCase(),
  })),
  ...bsodEntries.map(entry => ({
    title: entry.name + ' (' + shortHex(entry.hex) + ')',
    detail: entry.summary,
    path: bsodPath(entry.slug),
    keywords: entry.category + ' blue screen stop code BSOD',
    searchText: (entry.name + ' ' + entry.hex + ' ' + shortHex(entry.hex) + ' ' + entry.summary + ' ' + entry.category + ' BSOD blue screen stop code').toLowerCase(),
  })),
];

const topicClusters = [
  {
    id: 'windows',
    number: '01',
    eyebrow: 'WINDOWS TROUBLESHOOTING & UPDATES',
    title: 'Solve Windows problems systematically.',
    description: 'Start with the symptom, check what changed, and follow safe diagnostics for Windows 11 and Windows 10.',
    hub: '/windows',
    hubLabel: 'Explore Windows troubleshooting and update guides',
    links: [
      { label: 'Complete Windows troubleshooting guide', href: '/windows-troubleshooting-complete-guide' },
      { label: 'Windows Patch Tuesday: what to check', href: '/windows-patch-tuesday' },
      { label: 'Windows 11 8GB RAM update explained', href: '/windows-11-8gb-ram-update-october-2026' },
      { label: 'Secure Boot certificate update guide', href: '/windows-secure-boot-certificate-update' },
    ],
  },
  {
    id: 'gaming',
    number: '02',
    eyebrow: 'PC GAMING PERFORMANCE & FRAME TIMES',
    title: 'Find the cause of poor game performance.',
    description: 'Go beyond average FPS with GPU-load interpretation, frame-time analysis, stutter diagnosis and repeatable checks.',
    hub: '/gaming',
    hubLabel: 'View all PC gaming performance guides',
    links: [
      { label: 'GPU at 100% usage while gaming', href: '/gpu-100-percent-usage-gaming' },
      { label: 'GPU frame-time spikes: causes and diagnosis', href: '/gpu-frame-time-spikes-causes-fix' },
      { label: 'RTX 5070 Ti vs RX 9070 XT: GPU comparison', href: '/compare/rtx-5070-ti-vs-rx-9070-xt' },
      { label: 'PC game stuttering and frame-time fixes', href: '/pc-game-stuttering-fix-frame-time' },
      { label: 'Low FPS: find the real bottleneck', href: '/pc-game-low-fps-how-to-find-the-cause' },
    ],
  },
  {
    id: 'hardware',
    number: '03',
    eyebrow: 'PC & LAPTOP HARDWARE DIAGNOSTICS',
    title: 'Understand the hardware before replacing it.',
    description: 'Check storage, memory, thermals and power delivery with practical diagnostic steps and clear limitations.',
    hub: '/hardware',
    hubLabel: 'Explore PC and laptop hardware diagnostics',
    links: [
      { label: 'NVMe SSD temperature: what is too high?', href: '/nvme-ssd-temperature-too-high' },
      { label: 'How to check SSD health in Windows', href: '/how-to-check-ssd-health-windows' },
      { label: 'How to test RAM for errors', href: '/how-to-check-ram-for-errors-windows' },
      { label: 'PC power-supply symptoms and safe tests', href: '/pc-power-supply-problems-symptoms' },
      { label: 'Compare RTX 5070 Ti vs RX 9070 XT', href: '/compare/rtx-5070-ti-vs-rx-9070-xt' },
    ],
  },
  {
    id: 'research',
    number: '04',
    eyebrow: 'RESEARCH & BUYING GUIDES',
    title: 'Make better-informed upgrade decisions.',
    description: 'Read the evidence, compare compatibility and separate published specifications from measured results.',
    hub: '/research',
    hubLabel: 'Read TWW research and buying guidance',
    links: [
      { label: 'Should you upgrade RAM or SSD now?', href: '/research/upgrade-ram-ssd-now-or-wait' },
      { label: 'Does more RAM make Windows faster?', href: '/research/does-more-ram-make-windows-faster' },
      { label: 'Browse technology reviews and product research', href: '/reviews' },
      { label: 'Explore practical technology buying guides', href: '/best' },
    ],
  },
];

const workbenchGalleryIds = new Set([
  'dell-vostro-laptop-motherboard-removed-fan-heatsink-chip-level-repair',
  'graphics-card-disassembled-heatsink-gpu-old-thermal-paste-and-dusty-fans',
  'samsung-16gb-ddr4-3200-laptop-ram-sodimm-upgrade',
]);
const workbenchGalleryImages = galleryImages.filter(image => workbenchGalleryIds.has(image.id));

function HomeQuickJump() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    return quickJumpItems
      .map((item, index) => {
        const score = item.title.toLowerCase().startsWith(normalizedQuery) ? 0
          : item.title.toLowerCase().includes(normalizedQuery) ? 1
          : item.searchText.includes(normalizedQuery) ? 2 : 3;
        return { item, index, score };
      })
      .filter(result => result.score < 3)
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, 6)
      .map(result => result.item);
  }, [normalizedQuery]);

  return (
    <div className="home-quick-jump">
      <label htmlFor="home-quick-jump-input">Find a symptom, error code, guide or tool</label>
      <input
        id="home-quick-jump-input"
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Try “GPU at 100%”, “BSOD”, “SSD health” or “Wi-Fi”…"
        autoComplete="off"
        aria-controls="home-quick-jump-results"
      />
      {normalizedQuery.length >= 2 && (
        <div className="home-quick-jump-results" id="home-quick-jump-results" aria-live="polite">
          {matches.length > 0 ? (
            <>
              <p className="home-quick-jump-count">{matches.length} matching guides and tools</p>
              <ul>
                {matches.map(item => (
                  <li key={item.path}>
                    <Link to={item.path} onClick={() => setQuery('')}>
                      <span>{item.title}</span>
                      <small>{item.detail}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="home-quick-jump-empty">No exact match yet. Try a shorter symptom, product name or Windows stop code.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function Home() {
  return (
    <div className="home-page">
      <SEOEngine
        title="Tech World Window: Windows, PC Gaming & Hardware Guides"
        description="Evidence-led Windows 11/10 troubleshooting, PC gaming frame-time diagnostics, hardware upgrade guidance and free interactive tools by repair engineer Imran Natiq."
        path="/"
      />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="home-eyebrow"><span className="home-eyebrow-dot" aria-hidden="true" /> WINDOWS <span aria-hidden="true">/</span> GAMING <span aria-hidden="true">/</span> HARDWARE</p>
            <h1>Technology problems, <em>explained and solved.</em></h1>
            <p>Practical Windows troubleshooting, PC gaming performance guides and hardware analysis, built around evidence, transparent methods and real-world repair experience.</p>
            <HomeQuickJump />
            <div className="hero-actions">
              <Link className="button button-primary" to="/guides">Explore practical guides <span>→</span></Link>
              <Link className="button button-secondary" to="/tools/pc-bottleneck-calculator">Try a free PC tool</Link>
            </div>
            <div className="hero-proof" aria-label="Our editorial approach">
              <span className="hero-proof-item">
                <b className="hero-proof-title">01 / Diagnose</b>
                <span className="hero-proof-description">Start with the symptom</span>
              </span>
              <span className="hero-proof-item">
                <b className="hero-proof-title">02 / Verify</b>
                <span className="hero-proof-description">Check the evidence</span>
              </span>
              <span className="hero-proof-item">
                <b className="hero-proof-title">03 / Disclose</b>
                <span className="hero-proof-description">Explain what was not tested</span>
              </span>
            </div>
          </div>
          <div className="hero-art" aria-label="Tech World Window technology illustration" role="img">
            <div className="orb orb-one" />
            <div className="chip"><img src="/tech-world-window-logo.webp" alt="Tech World Window logo" width="570" height="409" style={{ width: '82%', height: 'auto', objectFit: 'contain', borderRadius: '12px' }} /></div>
            <div className="orbit orbit-one" />
          </div>
        </div>
      </section>

      <section id="topics" className="section section-featured home-topics">
        <div className="section-heading">
          <div>
            <p className="home-section-kicker">EXPLORE TWW</p>
            <h2>Start with the technology problem you need to solve.</h2>
            <p className="home-section-intro">Four connected topic hubs lead into focused guides, diagnostic tools and supporting research. The full site navigation remains available above.</p>
          </div>
        </div>
        <div className="home-topic-cluster-grid">
          {topicClusters.map(cluster => (
            <article className={'home-topic-cluster home-topic-cluster-' + cluster.id} key={cluster.id}>
              <div className="home-topic-cluster-heading">
                <span className="home-topic-number">{cluster.number}</span>
                <p className="home-section-kicker">{cluster.eyebrow}</p>
              </div>
              <h3>{cluster.title}</h3>
              <p className="home-topic-description">{cluster.description}</p>
              <ul>
                {cluster.links.map(link => (
                  <li key={link.href}><Link to={link.href}>{link.label}</Link></li>
                ))}
              </ul>
              <Link className="home-cluster-hub-link" to={cluster.hub}>{cluster.hubLabel} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section authority-section home-authorities">
        <div className="section-heading">
          <div><p className="home-section-kicker">TWW AUTHORITIES</p><h2>Deep guides for the problems people actually search.</h2><p className="home-section-intro">Connected, evidence-led guides for understanding the cause before changing settings or replacing hardware.</p></div>
          <Link className="text-link" to="/guides">Browse all practical guides →</Link>
        </div>
        <div className="article-grid">
          {pillarArticles.map(article => <ArticleCard key={article.id} article={article} featured />)}
        </div>
      </section>

      <section className="section latest-section home-latest">
        <div className="section-heading">
          <div><p className="home-section-kicker">LATEST EXPLAINERS</p><h2>Fresh technical answers.</h2></div>
          <Link className="text-link" to="/news">Explore the latest technology news →</Link>
        </div>
        <div className="article-grid">
          {latestArticles.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="section home-workbench">
        <div className="section-heading">
          <div>
            <p className="home-section-kicker">FROM THE WORKBENCH</p>
            <h2>Measure, diagnose and plan before you change hardware.</h2>
            <p className="home-section-intro">Use the interactive tools for a first calculation or data check, then follow the linked guide to understand what the result can—and cannot—tell you.</p>
          </div>
          <Link className="text-link" to="/tools">Browse every free tool →</Link>
        </div>
        <div className="home-workbench-grid">
          <article className="home-workbench-card">
            <span className="home-workbench-label">01 / PERFORMANCE</span>
            <h3>PC Bottleneck Calculator: CPU vs GPU</h3>
            <p>Compare processor and graphics-card balance by resolution and workload. Treat the estimate as a starting point, not a benchmark.</p>
            <Link to="/tools/pc-bottleneck-calculator">Open the PC bottleneck calculator →</Link>
          </article>
          <article className="home-workbench-card">
            <span className="home-workbench-label">02 / FRAME DELIVERY</span>
            <h3>Frame-Time Stutter Analyzer</h3>
            <p>Inspect frame-time captures, 1% and 0.1% lows, pacing and detected stutter events with local browser analysis.</p>
            <Link to="/tools/frame-time-analyzer">Analyze a frame-time capture →</Link>
          </article>
          <article className="home-workbench-card">
            <span className="home-workbench-label">03 / WINDOWS DIAGNOSTICS</span>
            <h3>Windows BSOD & Error Code Lookup</h3>
            <p>Search stop codes by name or hexadecimal value, review likely causes and choose safe next checks.</p>
            <Link to="/tools/bsod-error-code-lookup">Look up a Windows blue-screen code →</Link>
          </article>
          <article className="home-workbench-card home-workbench-card-planners">
            <span className="home-workbench-label">04 / UPGRADE PLANNING</span>
            <h3>RAM, Storage & PSU Calculators</h3>
            <p>Check memory requirements, storage capacity and power-supply estimates with separate purpose-built calculators.</p>
            <div className="home-workbench-sub-links">
              <Link to="/tools/ram-calculator">RAM calculator</Link>
              <Link to="/tools/storage-calculator">SSD & HDD storage calculator</Link>
              <Link to="/tools/psu-wattage-calculator">PSU wattage calculator</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section home-bench-proof">
        <div className="section-heading">
          <div>
            <p className="home-section-kicker">REAL REPAIR-BENCH PHOTOS</p>
            <h2>Technical advice backed by visible hardware work.</h2>
            <p className="home-section-intro">Explore genuine repair-bench photographs of laptop internals, graphics-card cooling and memory upgrades—not stock illustrations.</p>
          </div>
          <Link className="text-link" to="/gallery">View the complete repair bench gallery →</Link>
        </div>
        <div className="home-bench-gallery-grid">
          {workbenchGalleryImages.map(image => (
            <Link className="home-bench-gallery-card" to="/gallery" key={image.id} aria-label={'View repair bench gallery: ' + image.title}>
              <img
                src={'/images/gallery/' + image.id + '.webp'}
                alt={image.title}
                width="1400"
                height="1400"
                loading="lazy"
                decoding="async"
              />
              <span>{image.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="author-strip home-author-strip">
        <div className="author-avatar" aria-hidden="true">IN</div>
        <div className="home-author-copy">
          <h2>Advice informed by real hardware work.</h2>
          <p>Imran Natiq is a hardware repair engineer focused on practical PC and laptop troubleshooting. TWW separates documented facts, measured results and informed guidance instead of presenting every claim as a test.</p>
          <div className="home-trust-links" aria-label="Editorial trust and evidence">
            <Link to="/gallery">Repair Bench Gallery</Link>
            <Link to="/testing">Testing Methodology</Link>
            <Link to="/editorial-policy">Editorial Policy</Link>
          </div>
        </div>
        <Link className="text-link" to="/authors/imran-natiq">Meet the author →</Link>
      </section>
    </div>
  );
}
