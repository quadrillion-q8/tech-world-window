import { Link } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';

const pillarArticles = articles.filter(a => a.contentRole === 'pillar').slice(0, 4);
const latestArticles = articles
  .filter(a => !pillarArticles.some(p => p.id === a.id))
  .slice(0, 8);
const windows = articles.filter(a => a.category === 'Windows').slice(0, 3);
const gaming = articles.filter(a => a.category === 'Gaming').slice(0, 3);
const hardware = articles.filter(a => a.category === 'Hardware').slice(0, 3);

export function Home() {
  return (
    <>
      <SEOEngine
        title="Tech World Window: Windows, PC Gaming & Hardware Guides"
        description="Practical Windows troubleshooting, PC gaming performance guides, hardware analysis, buying advice and free PC tools — explained with evidence."
        path="/"
      />
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">WINDOWS · GAMING · HARDWARE</span>
            <h1>Technology problems, <em>explained and solved.</em></h1>
            <p>Practical Windows troubleshooting, PC gaming performance guides, hardware analysis and useful tools — built around evidence, testing and real-world problems.</p>
            <div className="hero-actions"><Link className="button button-primary" to="/guides">Explore practical guides <span>→</span></Link><Link className="button button-secondary" to="/tools/pc-bottleneck-calculator">Try a free tool</Link></div>
            <div className="hero-proof"><span><b>Diagnostic</b> symptom-first guidance</span><span><b>Evidence-led</b> explanations</span><span><b>Transparent</b> testing & limits</span></div>
          </div>
          <div className="hero-art" aria-label="Tech World Window technology illustration" role="img"><div className="orb orb-one" /><div className="orb orb-two" /><div className="chip"><span>TECH</span><strong>WORLD</strong><small>WINDOW</small><i>↗</i></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-label">TESTED · EXPLAINED · SOLVED</div></div>
        </div>
      </section>

      <section className="section section-featured">
        <div className="section-heading"><div><span className="eyebrow">START HERE</span><h2>Three technology problems. One practical method.</h2></div><p>Start with the symptom, measure what is happening, isolate the cause, then choose the least destructive fix.</p></div>
        <div className="category-grid">{categories.map((category, index) => <Link className={`category-tile category-${index}`} to={`/${category.slug}`} key={category.slug}><span className="category-number">0{index + 1}</span><h3>{category.name}</h3><p>{category.description}</p><span className="tile-arrow">↗</span></Link>)}</div>
      </section>

      <section className="section authority-section">
        <div className="section-heading"><div><span className="eyebrow">TWW AUTHORITIES</span><h2>Deep guides for the problems people actually search.</h2></div><p>Our strongest topics are built as connected hubs rather than isolated articles.</p></div>
        <div className="article-grid">{pillarArticles.map(article => <ArticleCard key={article.id} article={article} featured />)}</div>
      </section>

      <section className="section topic-section">
        <div className="section-heading"><div><span className="eyebrow">WINDOWS</span><h2>Fix Windows systematically.</h2></div><Link className="text-link" to="/windows">Explore Windows →</Link></div>
        <div className="article-grid">{windows.map(article => <ArticleCard key={article.id} article={article} />)}</div>
      </section>

      <section className="section topic-section">
        <div className="section-heading"><div><span className="eyebrow">PC GAMING</span><h2>Frame time, FPS, thermals and crashes.</h2></div><Link className="text-link" to="/gaming">Explore Gaming →</Link></div>
        <div className="article-grid">{gaming.map(article => <ArticleCard key={article.id} article={article} />)}</div>
      </section>

      <section className="section topic-section">
        <div className="section-heading"><div><span className="eyebrow">HARDWARE</span><h2>Understand the hardware before you replace it.</h2></div><Link className="text-link" to="/hardware">Explore Hardware →</Link></div>
        <div className="article-grid">{hardware.map(article => <ArticleCard key={article.id} article={article} />)}</div>
      </section>

      <section className="section latest-section">
        <div className="section-heading"><div><span className="eyebrow">LATEST EXPLAINERS</span><h2>Fresh technical answers.</h2></div><Link className="text-link" to="/guides">Browse all guides →</Link></div>
        <div className="article-grid">{latestArticles.map(article => <ArticleCard key={article.id} article={article} />)}</div>
      </section>

      <section className="tool-banner"><div><span className="eyebrow">FREE TECH TOOLS</span><h2>Measure before you upgrade.</h2><p>Analyze a frame-time capture, look up a blue screen stop code, or plan PSU, RAM and storage headroom — then read the guide that explains what the result actually means.</p></div><Link className="button button-light" to="/tools">Explore all tools →</Link></section>

      <section className="author-strip"><div className="author-avatar">IN</div><div><span className="eyebrow">FROM THE WORKBENCH</span><h2>Advice informed by real hardware work.</h2><p>Imran Natiq is a hardware repair engineer focused on practical PC and laptop troubleshooting. TWW separates documented facts, measured results and informed guidance instead of presenting every claim as a test.</p></div><Link className="text-link" to="/authors/imran-natiq">Meet the author →</Link></section>
    </>
  );
}
