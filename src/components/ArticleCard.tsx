import { Link } from 'react-router-dom';
import type { Article } from '../data/articles';

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={featured ? 'article-card article-card-featured' : 'article-card'}>
      <div className="card-topline"><span className="eyebrow">{article.category}</span><span className="reading-time">{article.readingTime} min read</span></div>
      <h3><Link to={`/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.dek}</p>
      <div className="card-meta">{new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })} · By Imran Natiq</div>
      <Link className="text-link" to={`/${article.slug}`}>Read the story <span aria-hidden="true">→</span></Link>
    </article>
  );
}
