import { Link, useLocation } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';

const headlines: Record<string, string> = {
  news: 'Tech news with context.',
  windows: 'Fix Windows, step by step.',
  gaming: 'Fix PC gaming performance.',
  hardware: 'Understand your PC hardware.',
  guides: 'Start here: the complete guides.',
};

export function CategoryPage() {
  const location = useLocation();
  const categorySlug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const category = categories.find(c => c.slug === categorySlug);
  // /guides is the "start here" hub: only the troubleshooting pillar guides (buying guides live under /best). Topic categories (/windows, /gaming, /hardware) hold the focused fixes, so the two pages never list the same set.
  const isGuidesHub = categorySlug === 'guides';
  const matching = isGuidesHub ? articles.filter(a => a.contentRole === 'pillar' && a.category !== 'Reviews') : articles.filter(a => a.category.toLowerCase() === categorySlug && a.contentRole !== 'pillar');
  // Topic pages list focused fixes only; their pillar guide is linked once below the intro and listed on /guides.
  // Prefer the practical troubleshooting pillar (the guide people search for) over research write-ups, which are linked as a secondary deep-dive.
  const topicPillars = isGuidesHub ? [] : articles.filter(a => a.category.toLowerCase() === categorySlug && a.contentRole === 'pillar');
  const pillar = topicPillars.find(a => !a.slug.startsWith('research/')) ?? topicPillars[0];
  const researchPillar = pillar ? articles.find(a => a.slug.startsWith('research/') && a.id !== pillar.id && (a.relatedArticles ?? []).includes(pillar.id)) : undefined;
  if (!category) return <section className="section"><h1>Category not found</h1><Link to="/">Return home</Link></section>;
  return <section className="section category-page">
    <SEOEngine title={category.name} description={category.description} path={`/${category.slug}`} />
    <div className={`category-hero ${categorySlug === 'windows' ? 'windows-pillar-hero' : ''}`}><span className="eyebrow">EXPLORE {category.name.toUpperCase()}</span><h1>{headlines[category.slug] ?? `${category.name}, made useful.`}</h1><p>{category.description}</p>{categorySlug === 'windows' && <><div className="windows-hero-actions"><Link className="windows-primary-cta" to="/windows-troubleshooting-complete-guide">Start with the complete troubleshooting guide <span aria-hidden="true">→</span></Link><Link className="windows-secondary-cta" to="/tools/windows-troubleshooting-assistant">Find the right fix for my problem</Link></div><p className="windows-trust-note">Practical, symptom-first guidance for Windows 11 and Windows 10. Diagnose before you reset or reinstall.</p></>}</div>
    {categorySlug === 'windows' && <section className="windows-hub" aria-labelledby="windows-start-heading"><div className="windows-hub-heading"><span className="eyebrow">CHOOSE YOUR SYMPTOM</span><h2 id="windows-start-heading">What is Windows doing?</h2><p>Jump straight to the problem you are trying to solve. Start with the least disruptive checks and move to deeper repairs only when the evidence points there.</p></div><div className="windows-symptom-grid">
      <Link className="windows-symptom-card" to="/windows-11-wifi-connected-no-internet"><span className="windows-card-kicker">NETWORK</span><strong>Connected, but no internet</strong><span>Separate Wi-Fi, router, DNS and Windows faults.</span><span className="windows-card-link">Troubleshoot connection →</span></Link>
      <Link className="windows-symptom-card" to="/windows-11-wont-start-troubleshooting"><span className="windows-card-kicker">STARTUP</span><strong>Windows will not start</strong><span>Work through boot loops and recovery screens safely.</span><span className="windows-card-link">Diagnose startup →</span></Link>
      <Link className="windows-symptom-card" to="/windows-11-high-memory-usage-how-to-find-the-cause"><span className="windows-card-kicker">PERFORMANCE</span><strong>High memory usage</strong><span>Find what is using RAM before disabling services.</span><span className="windows-card-link">Find the cause →</span></Link>
      <Link className="windows-symptom-card" to="/windows-11-blue-screen-stop-code-how-to-read"><span className="windows-card-kicker">CRASHES</span><strong>Blue screen or stop code</strong><span>Record the code and narrow down likely causes.</span><span className="windows-card-link">Read the stop code →</span></Link>
      <Link className="windows-symptom-card" to="/windows-11-dns-not-working-how-to-fix"><span className="windows-card-kicker">DNS &amp; NETWORK</span><strong>Websites will not load</strong><span>Check name resolution before resetting the adapter.</span><span className="windows-card-link">Fix DNS issues →</span></Link>
      <Link className="windows-symptom-card" to="/windows-11-slow-startup-fix"><span className="windows-card-kicker">SLOW PC</span><strong>Windows starts too slowly</strong><span>Identify the delay instead of disabling everything.</span><span className="windows-card-link">Improve startup →</span></Link>
    </div><div className="windows-assistant-strip"><div><strong>Not sure which guide matches your symptoms?</strong><p>Use the free Windows Troubleshooting Assistant to choose a safer next step.</p></div><Link className="text-link" to="/tools/windows-troubleshooting-assistant">Open the free assistant →</Link></div></section>}
    {pillar && <p className="category-pillar-link">Not sure where to start? <Link className="text-link" to={`/${pillar.slug}`}>Read the complete guide: {pillar.title} →</Link>{researchPillar && <> For the evidence behind it, see <Link className="text-link" to={`/${researchPillar.slug}`}>{researchPillar.title} →</Link></>}</p>}
    {matching.length ? <><h2 className="sr-only">{category.name} guides and articles</h2><div className="article-grid">{matching.map(article => <ArticleCard key={article.id} article={article} />)}</div></> : <div className="empty-state"><h2>More stories are being prepared.</h2><p>We publish when there is something useful to say—not just to fill a feed.</p><Link className="text-link" to="/">Read the latest available guides →</Link></div>}
    {isGuidesHub && <div className="category-topics"><h2>Looking for a specific fix?</h2><p>Each guide above links to focused articles. You can also browse them by topic.</p><div className="category-topic-links"><Link className="text-link" to="/windows">Windows fixes →</Link><Link className="text-link" to="/gaming">PC gaming performance →</Link><Link className="text-link" to="/hardware">Hardware and storage →</Link></div></div>}
  </section>;
}
