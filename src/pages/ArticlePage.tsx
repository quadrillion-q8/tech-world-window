import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { authors } from '../data/authors';
import { SEOEngine, ArticleStructuredData, BreadcrumbStructuredData } from '../seo/SEOEngine';
import { ArticleCard } from '../components/ArticleCard';

export function ArticlePage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const article = articles.find(a => a.slug === slug);
  if (!article) return <section className="section"><h1>Article not found</h1><Link to="/">Return home</Link></section>;
  const author = authors[article.authorId];
  const related = (article.relatedArticles || []).map(id => articles.find(a => a.id === id)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  return <article className="article-page">
    <SEOEngine title={article.title} description={article.dek} path={`/${article.slug}`} type="article" publishedAt={article.publishedAt} updatedAt={article.updatedAt} />
    <BreadcrumbStructuredData items={[{ name: 'Home', path: '/' }, { name: article.category, path: `/${article.category.toLowerCase()}` }, { name: article.title, path: `/${article.slug}` }]} />
    <ArticleStructuredData title={article.title} description={article.dek} path={`/${article.slug}`} publishedAt={article.publishedAt} updatedAt={article.updatedAt} authorName={author?.name || 'Tech World Window Editorial Team'} />
    <div className="article-head"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to={`/${article.category.toLowerCase()}`}>{article.category}</Link></div><span className="eyebrow">{article.category}{article.subcategory ? ` / ${article.subcategory}` : ''}</span><h1>{article.title}</h1><p className="article-dek">{article.dek}</p><div className="article-byline"><div className="author-avatar small">IN</div><div><strong>{author?.name || 'Editorial Team'}</strong><span>{author?.role || 'Editorial'} · Published {article.publishedAt}{article.updatedAt ? ` · Updated ${article.updatedAt}` : ''}</span></div><span className="reading-time">{article.readingTime} min read</span></div></div>
    <div className="article-layout"><aside className="article-aside"><span className="eyebrow">IN THIS ARTICLE</span><ol>{article.content.filter(section => section.heading).map(section => <li key={section.heading}><a href={`#${section.heading!.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{section.heading}</a></li>)}</ol></aside><div className="article-body"><div className="quick-answer"><strong>Quick answer</strong><p>{article.excerpt}</p></div>{article.content.map((section, index) => <section key={section.heading || index} id={section.heading?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}><h2>{section.heading}</h2>{section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}{section.bullets && <ul>{section.bullets.map(b => <li key={b}>{b}</li>)}</ul>}</section>)}{article.testing && <div className="editorial-note"><strong>Evidence note</strong><p>{article.testing}</p></div>}{article.faq?.length ? <section className="faq-section"><h2>Frequently asked questions</h2>{article.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section> : null}<div className="article-disclaimer"><strong>Editorial standard</strong><p>Steps and recommendations should be checked against current official documentation before publication. This starter article is a foundation for editorial review, not a claim of laboratory testing.</p></div></div></div>
    {related.length > 0 && <section className="section"><h2>Related stories</h2><div className="article-grid">{related.map(item => <ArticleCard key={item.id} article={item} />)}</div></section>}
  </article>;
}
