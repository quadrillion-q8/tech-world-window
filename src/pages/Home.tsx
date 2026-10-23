import { Link } from 'react-router-dom';
import { articles, categories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOEngine } from '../seo/SEOEngine';

// Each article appears once on the page: pillars first, then the latest
// articles that are not already shown above.
const pillarArticles = articles.filter(a => a.contentRole === 'pillar').slice(0, 4);
const shownIds = new Set(pillarArticles.map(a => a.id));
const latestArticles = articles
  .filter(a => !shownIds.has(a.id))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 6);

export function Home() {
  return (
    <div className="home-page">
      <SEOEngine
        title="Tech World Window: Windows, PC Gaming & Hardware Guides"
        description="Practical Windows troubleshooting, PC gaming performance guides, hardware analysis, buying advice and free PC tools — explained with evidence."
        path="/"
      />

      {/* 1. Hero: one message, two actions, one line of proof */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="home-eyebrow"><span className="home-eyebrow-dot" aria-hidden="true" /> WINDOWS <span aria-hidden="true">/</span> GAMING <span aria-hidden="true">/</span> HARDWARE</p>
            <h1>Technology problems, <em>explained and solved.</em></h1>
            <p>Practical Windows troubleshooting, PC gaming performance guides and hardware analysis, built around evidence and real-world testing.</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/guides">Explore practical guides <span>→</span></Link>
              <Link className="button button-secondary" to="/tools/pc-bottleneck-calculator">Try a free tool</Link>
            </div>
            <div className="hero-proof" aria-label="Our editorial approach"><span><b>01 / Diagnose</b>Symptom-first guidance</span><span><b>02 / Verify</b>Evidence-led explanations</span><span><b>03 / Disclose</b>Transparent testing limits</span></div>
          </div>
          <div className="hero-art" aria-label="Tech World Window technology illustration" role="img">
            <div className="orb orb-one" />
            <div className="chip"><img src="/tech-world-window-logo.webp" alt="Tech World Window logo" width="570" height="409" style={{ width: '82%', height: 'auto', objectFit: 'contain', borderRadius: '12px' }} /></div>
            <div className="orbit orbit-one" />
          </div>
        </div>
      </section>

      {/* 2. Categories: the single entry point to Windows / Gaming / Hardware */}
      <section id="topics" className="section section-featured home-topics">
        <div className="section-heading">
          <div><p className="home-section-kicker">EXPLORE TWW</p><h2>Find the right technology topic.</h2><p className="home-section-intro">Browse practical fixes, complete guides, hardware analysis, reviews and useful tools by category.</p></div>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className={`category-tile tww-card category-${index}`} to={`/${category.slug}`} key={category.slug}>
              <span className="category-tile-image-wrap" aria-hidden="true">
                <img
                  className="category-tile-image"
                  src={`${category.imageBase}-960.webp`}
                  srcSet={`${category.imageBase}-480.webp 480w, ${category.imageBase}-960.webp 960w`}
                  sizes="(max-width: 520px) calc(100vw - 2.5rem), (max-width: 800px) calc(50vw - 1.75rem), (max-width: 1240px) calc((100vw - 4rem) / 3), 380px"
                  alt=""
                  width="960"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div className="category-tile-content tww-card-content">
                <div className="category-tile-top"><span className="tile-arrow" aria-hidden="true">↗</span></div>
                <h3 className="category-tile-title tww-card-title">{category.name}</h3>
                <p className="category-tile-description tww-card-description">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Pillar guides: strongest topics, 4 cards */}
      <section className="section authority-section home-authorities">
        <div className="section-heading">
          <div><p className="home-section-kicker">TWW AUTHORITIES</p><h2>Deep guides for the problems people actually search.</h2><p className="home-section-intro">Connected, evidence-led guides for understanding the cause before changing settings or replacing hardware.</p></div>
          <Link className="text-link" to="/guides">Browse all guides →</Link>
        </div>
        <div className="article-grid">
          {pillarArticles.map(article => <ArticleCard key={article.id} article={article} featured />)}
        </div>
      </section>

      {/* 4. Latest: 6 cards, none repeated from above */}
      <section className="section latest-section home-latest">
        <div className="section-heading">
          <div><p className="home-section-kicker">LATEST EXPLAINERS</p><h2>Fresh technical answers.</h2></div>
          <a className="text-link" href="#topics">Browse by topic ↑</a>
        </div>
        <div className="article-grid">
          {latestArticles.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      {/* 5. Tools banner */}
      <section className="tool-banner home-tool-banner">
        <div>
          <p className="home-section-kicker">FROM THE WORKBENCH</p>
          <h2>Measure before you upgrade.</h2>
          <p>Analyze a frame-time capture, look up a blue-screen stop code, or plan PSU, RAM and storage headroom, then read the guide that explains what the result means.</p>
        </div>
        <Link className="button button-light" to="/tools">Explore all tools →</Link>
      </section>

      {/* 6. Author strip */}
      <section className="author-strip home-author-strip">
        <div className="author-avatar">IN</div>
        <div>
          <h2>Advice informed by real hardware work.</h2>
          <p>Imran Natiq is a hardware repair engineer focused on practical PC and laptop troubleshooting. TWW separates documented facts, measured results and informed guidance instead of presenting every claim as a test.</p>
        </div>
        <Link className="text-link" to="/authors/imran-natiq">Meet the author →</Link>
      </section>
    </div>
  );
}
