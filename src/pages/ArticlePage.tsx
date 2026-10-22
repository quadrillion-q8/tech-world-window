import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles, articleWordCount, headingId, type ArticleTable, type TableCell } from '../data/articles';
import { authors } from '../data/authors';
import { SEOEngine, ArticleStructuredData, BreadcrumbStructuredData, FAQStructuredData, HowToStructuredData } from '../seo/SEOEngine';
import { ArticleCard } from '../components/ArticleCard';
import { ToolCallout } from '../components/ToolCallout';
import { getRelatedArticles, getResearchForArticle } from '../lib/contentRelationships';

/** Renders `backtick` spans as <code> without using dangerouslySetInnerHTML. */
function renderInline(text: string) {
  return text.split('`').map((part, index) => (index % 2 === 1 ? <code key={index}>{part}</code> : part));
}

function renderCell(cell: TableCell) {
  if (typeof cell === 'string') return renderInline(cell);
  if (cell.href.startsWith('#')) return <a href={cell.href}>{cell.text}</a>;
  return <Link to={cell.href}>{cell.text}</Link>;
}

function ArticleTableView({ table }: { table: ArticleTable }) {
  return <div className="table-wrap" tabIndex={0} role="region" aria-label={table.caption}>
    <table className="article-table">
      <caption>{table.caption}</caption>
      <thead><tr>{table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
      <tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0
        ? <th key={cellIndex} scope="row">{renderCell(cell)}</th>
        : <td key={cellIndex}>{renderCell(cell)}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

type GpuSymptom = 'smooth' | 'low-fps' | 'stutter' | 'desktop';
type GpuThermalPattern = 'stable' | 'rising-clock-drop' | 'unknown';
type GpuCheckResult = {
  title: string;
  body: string;
  actions: string[];
  href?: string;
  linkLabel?: string;
};

function GpuUsageQuickCheck() {
  const [symptom, setSymptom] = useState<GpuSymptom>('smooth');
  const [thermalPattern, setThermalPattern] = useState<GpuThermalPattern>('unknown');

  let result: GpuCheckResult;
  if (symptom === 'desktop') {
    result = {
      title: 'Identify the process before changing drivers',
      body: 'GPU activity outside a game can come from normal browser, video, recording or overlay work. The useful first step is to find which process and engine are active.',
      actions: [
        'Open Task Manager with Ctrl+Shift+Esc and sort Processes by GPU.',
        'Inspect GPU Engine where available, then close one known graphics-heavy app and check whether activity changes.',
        'If the reading still looks implausible, cross-check with your GPU vendor’s monitoring tool before assuming a hardware fault.'
      ]
    };
  } else if (thermalPattern === 'rising-clock-drop') {
    result = {
      title: 'Investigate temperature and clock behavior together',
      body: 'A rising temperature combined with falling clocks and worsening performance is more informative than high utilization alone. The relevant limits depend on the exact GPU and system.',
      actions: [
        'Repeat the same scene once and record temperature, clock speed and FPS at the point performance changes.',
        'Check fan behavior, unobstructed airflow and the system’s power mode; on a laptop, verify its supported AC adapter and performance profile.',
        'Compare the pattern with the exact GPU or system manufacturer’s guidance. Stop repeated stress testing if artifacts, driver resets or shutdowns appear.'
      ],
      href: '/gpu-overheating-gaming-pc-causes-fix',
      linkLabel: 'Read the GPU overheating diagnostic guide'
    };
  } else if (symptom === 'low-fps') {
    result = {
      title: 'Test whether graphics workload is limiting FPS',
      body: 'Near-100% utilization with lower-than-expected FPS can be normal for demanding settings, but it is not enough to diagnose a fault. Use a controlled comparison.',
      actions: [
        'Repeat the same game scene and lower only resolution, render scale or ray tracing one step.',
        'If FPS improves meaningfully, graphics workload is relevant; check temperature, clocks and frame times before changing hardware.',
        'If FPS barely changes, check frame caps, V-Sync, the busiest CPU thread, background tasks and memory pressure.'
      ],
      href: '/pc-game-low-fps-how-to-find-the-cause',
      linkLabel: 'Follow the low-FPS diagnostic guide'
    };
  } else if (symptom === 'stutter') {
    result = {
      title: 'Capture the hitch instead of guessing from average FPS',
      body: 'Stutter can occur with high or low GPU utilization. The useful evidence is what changed at the exact moment of the hitch.',
      actions: [
        'Capture frame times during a repeatable scene and note when the hitch occurs.',
        'Compare the same timestamp with GPU clocks, temperature, VRAM, CPU-thread activity and storage activity where available.',
        'Repeat without changing settings; if the hitch is mainly on first encounters with effects or areas, shader or asset preparation may be involved.'
      ],
      href: '/tools/frame-time-analyzer',
      linkLabel: 'Open the Frame-Time Analyzer'
    };
  } else {
    result = {
      title: 'High utilization with smooth, expected performance is usually normal',
      body: 'If the game reaches your target FPS, clocks behave normally for the workload, temperatures stay within manufacturer guidance and no stutter or artifacts appear, there is no reason to reduce utilization just to chase a lower number.',
      actions: [
        'Keep the same scene and settings for a repeatable comparison.',
        'Use a frame cap only if you want to reduce noise, heat, power use or latency—not because 100% utilization is inherently harmful.',
        'Revisit the diagnosis if FPS drops, clocks fall, unusual temperatures, artifacts or instability appear.'
      ]
    };
  }

  return <section className="gpu-usage-check" aria-labelledby="gpu-usage-check-title">
    <div className="gpu-usage-check-heading">
      <span className="eyebrow">TWW QUICK DIAGNOSTIC</span>
      <h2 id="gpu-usage-check-title">What should you check next?</h2>
      <p>Choose the closest symptom to get a sensible next test. This is a troubleshooting guide, not a hardware-fault verdict.</p>
    </div>
    <div className="gpu-usage-fields">
      <div className="gpu-usage-field">
        <label htmlFor="gpu-check-symptom">What are you experiencing?</label>
        <select id="gpu-check-symptom" value={symptom} onChange={event => setSymptom(event.target.value as GpuSymptom)}>
          <option value="smooth">Game is smooth and FPS is expected</option>
          <option value="low-fps">High GPU usage but low FPS</option>
          <option value="stutter">Stutter or sudden FPS drops</option>
          <option value="desktop">GPU stays busy on the desktop</option>
        </select>
      </div>
      <div className="gpu-usage-field">
        <label htmlFor="gpu-check-thermals">What happens to temperature and clocks?</label>
        <select id="gpu-check-thermals" value={thermalPattern} onChange={event => setThermalPattern(event.target.value as GpuThermalPattern)}>
          <option value="unknown">Not checked yet / readings unavailable</option>
          <option value="stable">No unusual rise or clock drop observed</option>
          <option value="rising-clock-drop">Temperature rises while core clock falls</option>
        </select>
      </div>
    </div>
    <div className="gpu-usage-result" aria-live="polite" aria-atomic="true">
      <span className="eyebrow">YOUR NEXT CHECK</span>
      <h3>{result.title}</h3>
      <p>{result.body}</p>
      <ol>{result.actions.map((action, index) => <li key={`${index}-${action}`}>{action}</li>)}</ol>
      {result.href && result.linkLabel ? <p className="gpu-usage-result-link"><Link to={result.href}>{result.linkLabel} →</Link></p> : null}
    </div>
    <p className="gpu-usage-check-note">Compare the same metric in the same monitoring tool. There is no universal temperature cutoff for every GPU model and system design.</p>
  </section>;
}

export function ArticlePage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const article = articles.find(a => a.slug === slug);
  if (!article) return <section className="section"><h1>Article not found</h1><Link to="/">Return home</Link></section>;

  const author = authors[article.authorId];
  const related = getRelatedArticles(article, articles, 4);
  const research = getResearchForArticle(article, articles, 2);

  const breadcrumbPath = article.category.toLowerCase() === 'guides' ? '/guides' : `/${article.category.toLowerCase()}`;

  return <article className="article-page">
    <SEOEngine
      title={article.seoTitle ?? article.title}
      description={article.metaDescription ?? article.dek}
      path={`/${article.slug}`}
      type="article"
      publishedAt={article.publishedAt}
      updatedAt={article.updatedAt}
      image={article.heroImage || '/og-default.png'}
    />
    <BreadcrumbStructuredData items={[
      { name: 'Home', path: '/' },
      { name: article.category, path: breadcrumbPath },
      { name: article.title, path: `/${article.slug}` },
    ]} />
    <ArticleStructuredData
      title={article.title}
      description={article.dek}
      path={`/${article.slug}`}
      publishedAt={article.publishedAt}
      updatedAt={article.updatedAt}
      authorName={author?.name || 'Tech World Window Editorial Team'}
      category={article.category}
      image={article.heroImage || '/og-default.png'}
      keywords={article.tags}
      wordCount={articleWordCount(article)}
      authorUrl={author?.url}
      authorJobTitle={author?.role}
    />
    {article.howTo?.steps.length ? <HowToStructuredData name={article.howTo.name} steps={article.howTo.steps} /> : null}
    {article.faq?.length ? <FAQStructuredData items={article.faq} /> : null}

    <div className={article.heroImage ? "article-top-grid has-hero" : "article-top-grid no-hero"}>
    <div className="article-head">
      <div className="breadcrumbs">
        <Link to="/">Home</Link><span>/</span><Link to={breadcrumbPath}>{article.category}</Link>
      </div>
      <span className="eyebrow">{article.category}{article.subcategory ? ` / ${article.subcategory}` : ''}</span>
      <h1>{article.title}</h1>
      <p className="article-dek">{article.dek}</p>
      <div className="article-byline">
        <Link className="author-avatar small" to={author?.url || '/authors/imran-natiq'} aria-label={`About ${author?.name || 'the author'}`}>IN</Link>
        <div>
          <Link className="author-byline-name" to={author?.url || '/authors/imran-natiq'}><strong>{author?.name || 'Editorial Team'}</strong></Link>
          <span>{author?.role || 'Editorial'} · Published {article.publishedAt}{article.updatedAt ? ` · Updated ${article.updatedAt}` : ''}</span>
        </div>
        <span className="reading-time">{article.readingTime} min read</span>
      </div>
      {article.appliesTo?.length ? <div className="applies-to"><strong>Applies to</strong>{article.appliesTo.map(item => <span key={item}>{item}</span>)}</div> : null}
      {article.tags.length > 0 && <div className="article-tags" aria-label="Article topics">{article.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
    </div>
    {article.heroImage ? <figure className="article-hero-media">
      <img src={article.heroImage} alt={article.title} width={1400} height={788} loading="eager" decoding="async" />
      <figcaption>Featured visual · {article.category}</figcaption>
    </figure> : null}
    </div>

    <div className="article-layout">
      <aside className="article-aside">
        <span className="eyebrow">IN THIS ARTICLE</span>
        <ol>{article.content.filter(section => section.heading && section.toc !== false).map(section => (
          <li key={section.heading}><a href={`#${headingId(section.heading!)}`}>{section.heading}</a></li>
        ))}</ol>
        {article.pillarPath && <div className="article-pillar article-pillar-rail"><span>PART OF THIS TOPIC</span><Link to={article.pillarPath}>Explore the {article.category} hub →</Link></div>}
      </aside>
      <div className="article-body">
        {article.slug === 'gpu-100-percent-usage-gaming' ? <GpuUsageQuickCheck /> : null}
        {article.content.map((section, index) => <section key={section.heading || index} id={section.heading ? headingId(section.heading) : undefined}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs.map((paragraph, i) => <p key={i}>{renderInline(paragraph)}</p>)}
          {section.image && <figure style={{ margin: '1.5rem 0' }}>
            <img src={section.image.src} alt={section.image.alt} loading="lazy" decoding="async" width={1400} height={1400} style={{ display: 'block', width: '100%', maxWidth: '760px', height: 'auto', borderRadius: '12px', margin: '0 auto' }} />
            <figcaption style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.82 }}>{section.image.caption}</figcaption>
          </figure>}
          {section.table && <ArticleTableView table={section.table} />}
          {section.codeBlocks?.map((code, i) => <pre className="article-code" key={`${section.heading || 'code'}-${i}`}><code>{code}</code></pre>)}
          {section.steps && <ol className="article-steps">{section.steps.map(step => <li key={step}>{renderInline(step)}</li>)}</ol>}
          {section.bullets && <ul>{section.bullets.map(b => <li key={b}>{renderInline(b)}</li>)}</ul>}
          {section.relatedLinks?.length ? <nav className="article-next-steps" aria-label={section.heading ? `Related guides: ${section.heading}` : 'Related diagnostic guides'}>
            <ul>{section.relatedLinks.map(link => <li key={link.href}>
              <Link to={link.href}><strong>{link.label}</strong></Link>
              <span>{link.description}</span>
            </li>)}</ul>
          </nav> : null}
        </section>)}

        {article.testing && <div className="editorial-note"><strong>Evidence note</strong><p>{renderInline(article.testing)}</p></div>}

        {article.searchIntent === 'commercial' && <div className="commercial-intro"><strong>Commercial-content note</strong><p>Some links on this page may be affiliate links. They can earn Tech World Window a commission at no extra cost to you. Commercial relationships do not determine our testing conclusions.</p><a className="text-link" href="/affiliate-disclosure">Read the full affiliate disclosure →</a></div>}

        {research.length > 0 && <section className="research-connection">
          <span className="eyebrow">TWW RESEARCH</span>
          <h2>See the evidence behind this topic</h2>
          <p>These TWW research pieces examine the measurements, mechanisms, or testing questions related to this guide. Research pages distinguish measured results from general technical guidance.</p>
          <ul>{research.map(item => <li key={item.id}><Link to={`/${item.slug}`}><strong>{item.title}</strong></Link><span>{item.excerpt}</span></li>)}</ul>
        </section>}

        {article.sources?.length ? <section className="sources-section">
          <h2>Sources & further reading</h2>
          <ul>{article.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
        </section> : null}

        {article.faq?.length ? <section className="faq-section"><h2>Frequently asked questions</h2>
          {article.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{renderInline(item.answer)}</p></details>)}
        </section> : null}

        <div className="article-disclaimer">
          <strong>How TWW approaches this guide</strong>
          <p>We distinguish documented facts, measured results, and informed guidance. If a claim depends on a specific device, software version, game, or test method, that context should be stated rather than implied.</p>
          <p className="editorial-links"><Link to="/authors/imran-natiq">Meet the author</Link><span>·</span><Link to="/testing">See our testing methodology</Link><span>·</span><Link to="/editorial-policy">Read our editorial policy</Link></p>
        </div>
      </div>
      <aside className="article-right-rail" aria-label="Article resources">
        <section className="rail-card topic-rail-card">
          <span className="rail-kicker">IN THIS TOPIC</span>
          <strong>{article.pillarPath ? `${article.category} hub` : `${article.category} stories`}</strong>
          <p>{article.subcategory || `News, guides and practical advice about ${article.category.toLowerCase()}.`}</p>
          <Link to={article.pillarPath || breadcrumbPath}>Explore this topic <span aria-hidden="true">→</span></Link>
        </section>
        <section className="quick-answer rail-quick-answer">
          <span className="rail-kicker"><span aria-hidden="true">●</span> QUICK ANSWER</span>
          <p>{article.excerpt}</p>
        </section>
        <ToolCallout slug={article.slug} />
        {related.length > 0 ? <section className="rail-related">
          <h2>Related articles</h2>
          <div className="rail-related-list">{related.slice(0, 3).map(item => (
            <Link className="rail-related-item" to={`/${item.slug}`} key={item.id}>
              <span className="rail-related-thumb">{item.heroImage ? <img src={item.heroImage} alt="" loading="lazy" decoding="async" /> : <span aria-hidden="true">TWW</span>}</span>
              <span className="rail-related-copy"><strong>{item.title}</strong><small>{item.dek}</small></span>
            </Link>
          ))}</div>
        </section> : null}
      </aside>
    </div>

    {author && <section className="section article-author-section">
      <div className="article-author-card">
        <div className="author-avatar">IN</div>
        <div className="article-author-copy">
          <span className="eyebrow">ABOUT THE AUTHOR</span>
          <h2>{author.name}</h2>
          <p><strong>{author.role}</strong></p>
          <p>{author.bio}</p>
          <div className="author-expertise">{author.expertise.map(item => <span key={item}>{item}</span>)}</div>
          <Link className="text-link" to={author.url}>View author profile and background →</Link>
        </div>
      </div>
    </section>}

    {related.length > 0 && <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">KEEP READING</span><h2>Related stories</h2></div></div><div className="article-grid">{related.map(item => <ArticleCard key={item.id} article={item} />)}</div></section>}
  </article>;
}
