import { Link } from 'react-router-dom';
import type { Article } from '../data/articles';
import { ArticleThumbnail } from './ArticleThumbnail';

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const date = new Date(article.publishedAt + 'T12:00:00').toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className={featured ? 'article-card article-card-featured' : 'article-card'}>
      {/* The title link below is the accessible link; this one is a duplicate click target for the image. */}
      <Link to={'/' + article.slug} className="card-thumbnail-link" tabIndex={-1} aria-hidden="true">
        <ArticleThumbnail
          title={article.title}
          slug={article.slug}
          category={article.category}
          imageUrl={article.heroImage || (article as Article & { image?: string }).image}
        />
      </Link>
      <div className="article-card-content">
        <div className="card-topline">
          <span className="card-category">{article.category}</span>
          <span className="reading-time">{article.readingTime} min read</span>
        </div>
        <h3>
          <Link to={'/' + article.slug}>{article.title}</Link>
        </h3>
        <p className="card-dek">{article.dek}</p>
        <div className="card-meta">{date}</div>
      </div>
    </article>
  );
}
