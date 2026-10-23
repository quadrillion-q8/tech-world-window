import { Link } from 'react-router-dom';
import type { Article } from '../data/articles';
import { ArticleThumbnail } from './ArticleThumbnail';

const publicationMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatPublicationDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthLabel = publicationMonths[month - 1];

  if (!monthLabel || day < 1 || day > 31) return value;
  return `${monthLabel} ${day}, ${match[1]}`;
}

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const date = formatPublicationDate(article.publishedAt);

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
        <div className="card-meta">
          <time dateTime={article.publishedAt}>{date}</time>
        </div>
      </div>
    </article>
  );
}
