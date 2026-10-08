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
  const pillar = isGuidesHub ? undefined : articles.find(a => a.category.toLowerCase() === categorySlug && a.contentRole === 'pillar');
  if (!category) return <section className="section"><h1>Category not found</h1><Link to="/">Return home</Link></section>;
  return <section className="section category-page">
    <SEOEngine title={category.name} description={category.description} path={`/${category.slug}`} />
    <div className="category-hero"><span className="eyebrow">EXPLORE {category.name.toUpperCase()}</span><h1>{headlines[category.slug] ?? `${category.name}, made useful.`}</h1><p>{category.description}</p></div>
    {pillar && <p className="category-pillar-link">Not sure where to start? <Link className="text-link" to={`/${pillar.slug}`}>Read the complete guide: {pillar.title} →</Link></p>}
    {matching.length ? <div className="article-grid">{matching.map(article => <ArticleCard key={article.id} article={article} />)}</div> : <div className="empty-state"><h2>More stories are being prepared.</h2><p>We publish when there is something useful to say—not just to fill a feed.</p><Link className="text-link" to="/">Read the latest available guides →</Link></div>}
    {isGuidesHub && <div className="category-topics"><h2>Looking for a specific fix?</h2><p>Each guide above links to focused articles. You can also browse them by topic.</p><div className="category-topic-links"><Link className="text-link" to="/windows">Windows fixes →</Link><Link className="text-link" to="/gaming">PC gaming performance →</Link><Link className="text-link" to="/hardware">Hardware and storage →</Link></div></div>}
  </section>;
}
