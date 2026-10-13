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
  const isWindowsHub = categorySlug === 'windows';
  const matching = isGuidesHub ? articles.filter(a => a.contentRole === 'pillar' && a.category !== 'Reviews') : articles.filter(a => a.category.toLowerCase() === categorySlug && a.contentRole !== 'pillar');
  // Topic pages list focused fixes only; their pillar guide is linked once below the intro and listed on /guides.
  // Prefer the practical troubleshooting pillar (the guide people search for) over research write-ups, which are linked as a secondary deep-dive.
  const topicPillars = isGuidesHub ? [] : articles.filter(a => a.category.toLowerCase() === categorySlug && a.contentRole === 'pillar');
  const pillar = topicPillars.find(a => !a.slug.startsWith('research/')) ?? topicPillars[0];
  const researchPillar = pillar ? articles.find(a => a.slug.startsWith('research/') && a.id !== pillar.id && (a.relatedArticles ?? []).includes(pillar.id)) : undefined;
  if (!category) return <section className="section"><h1>Category not found</h1><Link to="/">Return home</Link></section>;
  return <section className="section category-page">
    <SEOEngine title={isWindowsHub ? 'Windows Troubleshooting & Windows 11 Fixes' : category.name} description={isWindowsHub ? 'Fix Windows 11 and Windows 10 problems with practical, step-by-step guides for startup failures, blue screens, slow performance, updates, Wi-Fi, DNS and drivers.' : category.description} path={`/${category.slug}`} />
    <div className={`category-hero${isWindowsHub ? ' windows-category-hero' : ''}`}><span className="eyebrow">{isWindowsHub ? 'WINDOWS HELP · WINDOWS 11 & WINDOWS 10' : `EXPLORE ${category.name.toUpperCase()}`}</span><h1>{headlines[category.slug] ?? `${category.name}, made useful.`}</h1><p>{isWindowsHub ? 'Find the symptom, run the safest useful check, and follow the evidence. Practical troubleshooting guides that help you fix Windows without jumping straight to resets or reinstallations.' : category.description}</p>{isWindowsHub && <div className="windows-hub-actions"><Link className="windows-hub-primary" to="/windows-troubleshooting-complete-guide">Start the complete troubleshooting guide <span aria-hidden="true">→</span></Link><Link className="windows-hub-secondary" to="/tools/windows-troubleshooting-assistant">Use the free troubleshooting assistant</Link></div>}</div>
    {isWindowsHub && <div className="windows-symptom-hub"><div className="windows-symptom-heading"><span className="eyebrow">START WITH YOUR SYMPTOM</span><h2>What is Windows doing?</h2><p>Choose the closest match to get a focused next step.</p></div><div className="windows-symptom-grid"><Link to="/windows-troubleshooting-complete-guide" className="windows-symptom-card"><span>01</span><strong>Windows will not start</strong><small>Boot loops, recovery screens and startup failures</small></Link><Link to="/windows-11-blue-screen-stop-code-how-to-read" className="windows-symptom-card"><span>02</span><strong>Blue screen or stop code</strong><small>Record the code and narrow down likely causes</small></Link><Link to="/windows-11-freezing-randomly-causes-fix" className="windows-symptom-card"><span>03</span><strong>Freezing or running slowly</strong><small>Separate memory, storage, drivers and heat</small></Link><Link to="/windows-11-wifi-connected-no-internet" className="windows-symptom-card"><span>04</span><strong>Connected but no internet</strong><small>Check network, router, DNS and adapter layers</small></Link><Link to="/windows-11-dns-not-working-how-to-fix" className="windows-symptom-card"><span>05</span><strong>DNS or network problems</strong><small>Identify name-resolution and adapter issues</small></Link><Link to="/windows/windows-update-stuck" className="windows-symptom-card"><span>06</span><strong>Windows Update is stuck</strong><small>Tell a slow update from a genuine failure</small></Link></div><div className="windows-hub-note"><strong>Still not sure?</strong><span>Use the <Link className="text-link" to="/tools/windows-troubleshooting-assistant">Windows Troubleshooting Assistant →</Link> to choose a safe first check.</span></div></div>}
    {pillar && <p className="category-pillar-link">Not sure where to start? <Link className="text-link" to={`/${pillar.slug}`}>Read the complete guide: {pillar.title} →</Link>{researchPillar && <> For the evidence behind it, see <Link className="text-link" to={`/${researchPillar.slug}`}>{researchPillar.title} →</Link></>}</p>}
    {matching.length ? <><h2 className="sr-only">{category.name} guides and articles</h2><div className="article-grid">{matching.map(article => <ArticleCard key={article.id} article={article} />)}</div></> : <div className="empty-state"><h2>More stories are being prepared.</h2><p>We publish when there is something useful to say—not just to fill a feed.</p><Link className="text-link" to="/">Read the latest available guides →</Link></div>}
    {isGuidesHub && <div className="category-topics"><h2>Looking for a specific fix?</h2><p>Each guide above links to focused articles. You can also browse them by topic.</p><div className="category-topic-links"><Link className="text-link" to="/windows">Windows fixes →</Link><Link className="text-link" to="/gaming">PC gaming performance →</Link><Link className="text-link" to="/hardware">Hardware and storage →</Link></div></div>}
  </section>;
}
