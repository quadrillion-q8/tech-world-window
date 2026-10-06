import { Link, useLocation } from 'react-router-dom';
import { articles, articleWordCount, headingId, type ArticleTable, type TableCell } from '../data/articles';
import { authors } from '../data/authors';
import { SEOEngine, ArticleStructuredData, BreadcrumbStructuredData, FAQStructuredData } from '../seo/SEOEngine';
import { ArticleCard } from '../components/ArticleCard';

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

export function ArticlePage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const article = articles.find(a => a.slug === slug);
  if (!article) return <section className="section"><h1>Article not found</h1><Link to="/">Return home</Link></section>;

  const author = authors[article.authorId];
  const related = (article.relatedArticles || [])
    .map(id => articles.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const breadcrumbPath = article.category.toLowerCase() === 'guides' ? '/guides' : `/${article.category.toLowerCase()}`;

  return <article className="article-page">
    <SEOEngine
      title={article.seoTitle ?? article.title}
      description={article.metaDescription ?? article.dek}
      path={`/${article.slug}`}
      type="article"
      publishedAt={article.publishedAt}
      updatedAt={article.updatedAt}
      image={article.heroImage}
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
      image={article.heroImage}
      keywords={article.tags}
      wordCount={articleWordCount(article)}
      authorUrl={author?.url}
      authorJobTitle={author?.role}
    />
    {article.faq?.length ? <FAQStructuredData items={article.faq} /> : null}

    <div className="article-head">
      <div className="breadcrumbs">
        <Link to="/">Home</Link><span>/</span><Link to={breadcrumbPath}>{article.category}</Link>
      </div>
      <span className="eyebrow">{article.category}{article.subcategory ? ` / ${article.subcategory}` : ''}</span>
      <h1>{article.title}</h1>
      <p className="article-dek">{article.dek}</p>
      <div className="article-byline">
        <Link className="author-avatar small" to={`/authors/${article.authorId.replace('imranNatiq', 'imran-natiq')}`} aria-label={`About ${author?.name || 'the author'}`}>IN</Link>
        <div><strong>{author?.name || 'Editorial Team'}</strong><span>{author?.role || 'Editorial'} · Published {article.publishedAt}{article.updatedAt ? ` · Updated ${article.updatedAt}` : ''}</span></div>
        <span className="reading-time">{article.readingTime} min read</span>
      </div>
      {article.appliesTo?.length ? <div className="applies-to"><strong>Applies to</strong>{article.appliesTo.map(item => <span key={item}>{item}</span>)}</div> : null}
      {article.tags.length > 0 && <div className="article-tags" aria-label="Article topics">{article.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
      {article.pillarPath && <div className="article-pillar"><span>PART OF THIS TOPIC</span><Link to={article.pillarPath}>Explore the {article.category} hub →</Link></div>}
    </div>

    <div className="article-layout">
      <aside className="article-aside">
        <span className="eyebrow">IN THIS ARTICLE</span>
        <ol>{article.content.filter(section => section.heading).map(section => (
          <li key={section.heading}><a href={`#${headingId(section.heading!)}`}>{section.heading}</a></li>
        ))}</ol>
      </aside>
      <div className="article-body">
        <div className="quick-answer"><strong>Quick answer</strong><p>{article.excerpt}</p></div>
        {article.content.map((section, index) => <section key={section.heading || index} id={section.heading ? headingId(section.heading) : undefined}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs.map((paragraph, i) => <p key={i}>{renderInline(paragraph)}</p>)}
          {section.table && <ArticleTableView table={section.table} />}
          {section.steps && <ol className="article-steps">{section.steps.map(step => <li key={step}>{renderInline(step)}</li>)}</ol>}
          {section.bullets && <ul>{section.bullets.map(b => <li key={b}>{renderInline(b)}</li>)}</ul>}
        </section>)}

        {article.testing && <div className="editorial-note"><strong>Evidence note</strong><p>{renderInline(article.testing)}</p></div>}

        {article.sources?.length ? <section className="sources-section">
          <h2>Sources & further reading</h2>
          <ul>{article.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
        </section> : null}

        {article.faq?.length ? <section className="faq-section"><h2>Frequently asked questions</h2>
          {article.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{renderInline(item.answer)}</p></details>)}
        </section> : null}

        <div className="article-disclaimer">
          <strong>Editorial standard</strong>
          <p>We distinguish documented facts, measured results, and informed guidance. If a claim depends on a specific device, software version, game, or test method, that context should be stated rather than implied.</p>
        </div>
      </div>
    </div>

    {related.length > 0 && <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">KEEP READING</span><h2>Related stories</h2></div></div><div className="article-grid">{related.map(item => <ArticleCard key={item.id} article={item} />)}</div></section>}
  </article>;
}
