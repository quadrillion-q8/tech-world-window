import { Link } from 'react-router-dom';
import type { Article } from '../data/articles';
import { ArticleThumbnail } from './ArticleThumbnail';

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={featured ? 'article-card article-card-featured' : 'article-card'}>
      <Link
        to={`/${article.slug}`}
        className="card-thumbnail-link"
        aria-label={article.title}
        style={{
          display: 'block',
          marginBottom: '1rem',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(148, 163, 184, 0.16)',
          backgroundColor: '#0f172a',
        }}
      >
        <ArticleThumbnail
          title={article.title}
          slug={article.slug}
          category={article.category}
          imageUrl={(article as { image?: string }).image}
        />
      </Link>
      <div className="card-topline">
        <span className="eyebrow">{article.category}</span>
        <span className="reading-time">{article.readingTime} min read</span>
      </div>
      <h3>
        <Link to={`/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.dek}</p>
      <div className="card-meta">
        {new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString('en', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}{' '}
        · By Imran Natiq
      </div>
      <Link className="text-link" to={`/${article.slug}`}>
        Read the story <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
