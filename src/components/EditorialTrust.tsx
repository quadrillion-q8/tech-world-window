import { Link } from 'react-router-dom';

export function EditorialTrust({ kind }: { kind: 'article' | 'research' | 'product' | 'comparison' }) {
  const message = {
    article: 'This guide provides general technical guidance. A repair-bench photograph illustrates hardware context; it is not proof of a diagnosis or a controlled performance test. Check the relevant device and software documentation before applying changes.',
    research: 'Read the page-specific evidence note to distinguish a research question, test protocol or technical analysis from a measured result. No unpublished benchmark is implied.',
    product: 'A specification profile is not an independent TWW hands-on review. Check the exact SKU, manufacturer documentation and attributed outside test conditions before buying.',
    comparison: 'The comparison uses the stated specifications and cited evidence. Do not interpret a specification difference as a measured TWW performance result.',
  }[kind];
  return <aside className="article-disclaimer" aria-label="Editorial transparency" data-editorial-trust={kind}>
    <strong>Evidence, independence and corrections</strong>
    <p>{message}</p>
    <p className="editorial-links"><Link to="/testing">Testing methodology</Link><span aria-hidden="true"> · </span><Link to="/editorial-policy">Editorial standards</Link><span aria-hidden="true"> · </span><Link to="/contact">Report a correction</Link>{(kind === 'product' || kind === 'comparison') && <><span aria-hidden="true"> · </span><Link to="/affiliate-disclosure">Affiliate disclosure</Link></>}</p>
  </aside>;
}
