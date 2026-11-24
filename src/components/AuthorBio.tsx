import { Link } from 'react-router-dom';
import type { Author } from '../data/authors';

export function AuthorBio({ author }: { author: Author }) {
  return <section className="section article-author-section" aria-label="About the author" data-author-bio={author.id}>
    <div className="article-author-card">
      <div className="author-avatar" aria-hidden="true">IN</div>
      <div className="article-author-copy">
        <span className="eyebrow">ABOUT THE AUTHOR</span>
        <h2>{author.name}</h2>
        <p><strong>{author.role}</strong></p>
        <p>{author.bio}</p>
        <div className="author-expertise">{author.expertise.map(item => <span key={item}>{item}</span>)}</div>
        <Link className="text-link" to={author.url}>View author profile and background →</Link>
      </div>
    </div>
  </section>;
}
