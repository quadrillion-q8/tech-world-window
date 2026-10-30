import { Link, useLocation } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';
import { galleryImageUrl, galleryImages } from '../data/gallery';

const categoryGalleryVisuals: Record<string, { id: string; caption: string }> = {
  windows: {
    id: 'hp-all-in-one-bios-no-disks-connected-intel-rst-vmd-error',
    caption: 'A BIOS storage-detection screen captured during diagnosis; firmware checks can help explain some startup and drive-detection problems.',
  },
  gaming: {
    id: 'zotac-gaming-geforce-rtx-graphics-card-side-view',
    caption: 'A graphics card from the TWW repair bench. The photo illustrates hardware, not a benchmark or performance result.',
  },
  hardware: {
    id: 'hp-laptop-motherboard-heatsink-m2-ssd-closeup',
    caption: 'A close-up of an M.2 SSD and nearby cooling hardware inside a laptop.',
  },
  guides: {
    id: 'dell-vostro-laptop-open-chassis-motherboard-removed',
    caption: 'An opened laptop during component-level inspection; procedures vary by model.',
  },
};

const headlines: Record<string, string> = {
  news: 'Tech news with context.',
  windows: 'Fix Windows, step by step.',
  gaming: 'Fix PC gaming performance.',
  hardware: 'Understand your PC hardware.',
  guides: 'Practical tech guides for real problems.',
};

export function CategoryPage() {
  const location = useLocation();
  const categorySlug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const category = categories.find(c => c.slug === categorySlug);
  // /guides is the full evergreen guide index: include pillar pages and focused cluster articles, while news and reviews stay in their own hubs.
  const isGuidesHub = categorySlug === 'guides';
  const isWindowsHub = categorySlug === 'windows';
  const categoryVisualConfig = categoryGalleryVisuals[categorySlug];
  const categoryVisual = categoryVisualConfig
    ? galleryImages.find(image => image.id === categoryVisualConfig.id)
    : undefined;
  const matching = isGuidesHub
    ? articles
      .filter(a => a.category !== 'News' && a.category !== 'Reviews')
      .sort((a, b) =>
        Number(b.contentRole === 'pillar') - Number(a.contentRole === 'pillar') ||
        Date.parse(b.updatedAt ?? b.publishedAt) - Date.parse(a.updatedAt ?? a.publishedAt)
      )
    : articles.filter(a => a.category.toLowerCase() === categorySlug && a.contentRole !== 'pillar');
  // Topic pages list focused fixes only; their pillar guide is linked once below the intro and listed on /guides.
  // Prefer the practical troubleshooting pillar (the guide people search for) over research write-ups, which are linked as a secondary deep-dive.
  const topicPillars = isGuidesHub ? [] : articles.filter(a => a.category.toLowerCase() === categorySlug && a.contentRole === 'pillar');
  const pillar = topicPillars.find(a => !a.slug.startsWith('research/')) ?? topicPillars[0];
  const researchPillar = pillar ? articles.find(a => a.slug.startsWith('research/') && a.id !== pillar.id && (a.relatedArticles ?? []).includes(pillar.id)) : undefined;
  if (!category) return <section className="section"><h1>Category not found</h1><Link to="/">Return home</Link></section>;
  return <section className="section category-page">
    <SEOEngine title={isWindowsHub ? 'Windows Troubleshooting & Windows 11 Fixes' : category.name} description={isWindowsHub ? 'Fix Windows 11 and Windows 10 problems with practical, step-by-step guides for startup failures, blue screens, slow performance, updates, Wi-Fi, DNS and drivers.' : category.description} path={`/${category.slug}`} />
    <div className={`category-hero${isWindowsHub ? " windows-category-hero" : ""}${categoryVisual ? " category-hero-has-image" : ""}`}>
      <div className="category-hero-copy">
        <span className="eyebrow">{isWindowsHub ? "WINDOWS HELP · WINDOWS 11 & WINDOWS 10" : `EXPLORE ${category.name.toUpperCase()}`}</span>
        <h1>{headlines[category.slug] ?? `${category.name}, made useful.`}</h1>
        <p>{isWindowsHub ? "Find the symptom, run the safest useful check, and follow the evidence. Practical troubleshooting guides that help you fix Windows without jumping straight to resets or reinstallations." : category.description}</p>
        {isWindowsHub && <div className="windows-hub-actions"><Link className="windows-hub-primary" to="/windows-troubleshooting-complete-guide">Start the complete troubleshooting guide <span aria-hidden="true">→</span></Link><Link className="windows-hub-secondary" to="/tools/windows-troubleshooting-assistant">Use the free troubleshooting assistant</Link></div>}
      </div>
      {categoryVisual && categoryVisualConfig ? <figure className="category-hero-photo">
        <img src={galleryImageUrl(categoryVisual.id)} alt={categoryVisual.title} width={1400} height={1400} loading="lazy" decoding="async" />
        <figcaption>{categoryVisualConfig.caption}</figcaption>
      </figure> : null}
    </div>
    {isWindowsHub && <div className="windows-symptom-hub"><div className="windows-symptom-heading"><span className="eyebrow">QUICK DIAGNOSIS</span><h2>What is going wrong?</h2><p>Pick the symptom that best matches your PC. Start with one focused check—no guesswork or unnecessary resets.</p></div><div className="windows-symptom-grid">
      <Link to="/windows-troubleshooting-complete-guide" className="windows-symptom-card"><span className="symptom-index">01</span><span className="symptom-copy"><strong>Startup & boot</strong><small>Won’t start, boot loops or recovery screens</small></span><span className="symptom-arrow" aria-hidden="true">↗</span></Link>
      <Link to="/windows-11-blue-screen-stop-code-how-to-read" className="windows-symptom-card"><span className="symptom-index">02</span><span className="symptom-copy"><strong>Blue screen (BSOD)</strong><small>Read the stop code and narrow the cause</small></span><span className="symptom-arrow" aria-hidden="true">↗</span></Link>
      <Link to="/windows-11-freezing-randomly-causes-fix" className="windows-symptom-card"><span className="symptom-index">03</span><span className="symptom-copy"><strong>Slow or frozen PC</strong><small>Check memory, storage, drivers and heat</small></span><span className="symptom-arrow" aria-hidden="true">↗</span></Link>
      <Link to="/windows-11-wifi-connected-no-internet" className="windows-symptom-card"><span className="symptom-index">04</span><span className="symptom-copy"><strong>Wi-Fi, no internet</strong><small>Trace the connection from PC to router</small></span><span className="symptom-arrow" aria-hidden="true">↗</span></Link>
      <Link to="/windows-11-dns-not-working-how-to-fix" className="windows-symptom-card"><span className="symptom-index">05</span><span className="symptom-copy"><strong>DNS or network error</strong><small>Check name resolution and adapter settings</small></span><span className="symptom-arrow" aria-hidden="true">↗</span></Link>
      <Link to="/windows/windows-update-stuck" className="windows-symptom-card"><span className="symptom-index">06</span><span className="symptom-copy"><strong>Windows Update</strong><small>Tell a slow update from a real failure</small></span><span className="symptom-arrow" aria-hidden="true">↗</span></Link>
    </div><div className="windows-hub-note"><span><strong>Not sure which fits?</strong> Answer a few questions in the free assistant.</span><Link className="windows-assistant-link" to="/tools/windows-troubleshooting-assistant">Find my next step <span aria-hidden="true">→</span></Link></div></div>}
    {(categorySlug === 'gaming' || categorySlug === 'hardware') && <p className="category-pillar-link">Choosing a graphics card? <Link className="text-link" to="/compare/rtx-5070-ti-vs-rx-9070-xt">Compare the RTX 5070 Ti and RX 9070 XT →</Link></p>}
    {pillar && <p className="category-pillar-link">Not sure where to start? <Link className="text-link" to={`/${pillar.slug}`}>Read the complete guide: {pillar.title} →</Link>{researchPillar && <> For the evidence behind it, see <Link className="text-link" to={`/${researchPillar.slug}`}>{researchPillar.title} →</Link></>}</p>}
    {matching.length ? <><h2 className="sr-only">{category.name} guides and articles</h2><div className="article-grid">{matching.map(article => <ArticleCard key={article.id} article={article} />)}</div></> : <div className="empty-state"><h2>More stories are being prepared.</h2><p>We publish when there is something useful to say—not just to fill a feed.</p><Link className="text-link" to="/">Read the latest available guides →</Link></div>}
    {isGuidesHub && <nav className="category-topics" aria-label="Browse troubleshooting topics"><div className="category-topics-copy"><span className="eyebrow">BROWSE BY TOPIC</span><h2>Need a more specific answer?</h2><p>Go straight to the part of your PC you need help with.</p></div><div className="category-topic-links"><Link to="/windows"><span>Windows</span><small>Startup, updates & errors</small><b aria-hidden="true">↗</b></Link><Link to="/gaming"><span>PC gaming</span><small>FPS, stutter & crashes</small><b aria-hidden="true">↗</b></Link><Link to="/hardware"><span>Hardware</span><small>RAM, storage & components</small><b aria-hidden="true">↗</b></Link></div></nav>}
  </section>;
}
