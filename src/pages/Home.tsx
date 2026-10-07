import { Link } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';

export function Home() {
  const featured = articles.filter(a => a.featured);
  return (
    <>
      <SEOEngine title="Tech World Window — Your Window Into Technology" description="Technology news, practical fixes, real-world testing and useful tools — clearly explained." path="/" />
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">TECHNOLOGY, MADE CLEAR</span>
            <h1>Your window into a world that <em>never stops changing.</em></h1>
            <p>Technology news, practical fixes, real-world testing and useful tools — clearly explained by people who work with the hardware.</p>
            <div className="hero-actions"><Link className="button button-primary" to="/guides">Explore practical guides <span>→</span></Link><Link className="button button-secondary" to="/tools/pc-bottleneck-calculator">Try a free tool</Link></div>
            <div className="hero-proof"><span><b>Practical</b> step-by-step help</span><span><b>Evidence-led</b> explanations</span><span><b>Human-first</b> technology</span></div>
          </div>
          <div className="hero-art" aria-label="Abstract technology illustration" role="img"><div className="orb orb-one" /><div className="orb orb-two" /><div className="chip"><span>TECH</span><strong>WORLD</strong><small>WINDOW</small><i>↗</i></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-label">TESTED · EXPLAINED · SOLVED</div></div>
        </div>
      </section>
      <section className="section section-featured">
        <div className="section-heading"><div><span className="eyebrow">START HERE</span><h2>Useful technology, without the noise.</h2></div><p>Clear answers for real devices, real problems, and smarter decisions.</p></div>
        <div className="category-grid">{categories.map((category, index) => <Link className={`category-tile category-${index}`} to={`/${category.slug}`} key={category.slug}><span className="category-number">0{index + 1}</span><h3>{category.name}</h3><p>{category.description}</p><span className="tile-arrow">↗</span></Link>)}</div>
      </section>
      <section className="section latest-section">
        <div className="section-heading"><div><span className="eyebrow">LATEST EXPLAINERS</span><h2>Make your next tech problem easier.</h2></div><Link className="text-link" to="/guides">Browse all guides →</Link></div>
        <div className="article-grid">{featured.map(article => <ArticleCard key={article.id} article={article} featured />)}{articles.filter(a => !a.featured).map(article => <ArticleCard key={article.id} article={article} />)}</div>
      </section>
      <section className="tool-banner"><div><span className="eyebrow">FREE TECH TOOLS</span><h2>Understand your PC before you upgrade.</h2><p>Use our free calculators to plan PC upgrades, storage, memory and power before you spend money.</p></div><Link className="button button-light" to="/tools/pc-bottleneck-calculator">Open the PC tool →</Link></section>
      <section className="author-strip"><div className="author-avatar">IN</div><div><span className="eyebrow">FROM THE WORKBENCH</span><h2>Advice informed by real hardware work.</h2><p>Imran Natiq is a hardware repair engineer focused on practical PC and laptop troubleshooting. Articles should show their evidence, limits, and sources—not just confident claims.</p></div><Link className="text-link" to="/authors/imran-natiq">Meet the author →</Link></section>
    </>
  );
}
