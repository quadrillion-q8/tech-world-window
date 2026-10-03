import { Link, useLocation } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';

export function CategoryPage() {
  const location = useLocation();
  const categorySlug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const category = categories.find(c => c.slug === categorySlug);
  const matching = articles.filter(a => a.category.toLowerCase() === categorySlug || (categorySlug === 'guides' && ['Windows', 'Hardware', 'Gaming'].includes(a.category)));
  if (!category) return <section className="section"><h1>Category not found</h1><Link to="/">Return home</Link></section>;
  return <section className="section category-page">
    <SEOEngine title={category.name} description={category.description} path={`/${category.slug}`} />
    <div className="category-hero"><span className="eyebrow">EXPLORE {category.name.toUpperCase()}</span><h1>{category.name}, made useful.</h1><p>{category.description}</p></div>
    {matching.length ? <div className="article-grid">{matching.map(article => <ArticleCard key={article.id} article={article} />)}</div> : <div className="empty-state"><h2>More stories are being prepared.</h2><p>We publish when there is something useful to say—not just to fill a feed.</p><Link className="text-link" to="/">Read the latest available guides →</Link></div>}
  </section>;
}
