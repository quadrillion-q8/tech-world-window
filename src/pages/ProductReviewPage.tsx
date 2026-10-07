import { Link, useLocation } from 'react-router-dom';
import { getProduct } from '../data/products';
import { SEOEngine, BreadcrumbStructuredData, ProductStructuredData } from '../seo/SEOEngine';
import { AffiliateLink } from '../components/AffiliateLink';

export function ProductReviewPage() {
  const location = useLocation();
  const product = getProduct(location.pathname.replace('/reviews/ssds/', '').replace(/\/$/, ''));
  if (!product) return <section className="section"><h1>Review not found</h1><Link to="/reviews/ssds">Back to SSD reviews</Link></section>;
  return <article className="article-page">
    <SEOEngine title={`${product.brand} ${product.model} Review`} description={`${product.brand} ${product.model}: specifications, strengths, limitations and who should consider it.`} path={location.pathname} type="article" />
    <ProductStructuredData product={{ name: `${product.brand} ${product.model}`, brand: product.brand, description: product.summary }} path={location.pathname} />
    <BreadcrumbStructuredData items={[{ name: 'Home', path: '/' }, { name: 'SSD Reviews', path: '/reviews/ssds' }, { name: `${product.brand} ${product.model}`, path: location.pathname }]} />
    <div className="article-head">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/reviews/ssds">SSD Reviews</Link></div>
      <span className="eyebrow">SSD REVIEW · SPECIFICATION PROFILE</span>
      <h1>{product.brand} {product.model} Review</h1>
      <p className="article-dek">{product.summary}</p>
      <div className="article-byline"><div><strong>Tech World Window Editorial Team</strong><span>Last verified {product.lastVerified}</span></div></div>
    </div>
    <div className="article-layout"><aside className="article-aside"><span className="eyebrow">REVIEW SECTIONS</span><ol><li><a href="#specifications">Specifications</a></li><li><a href="#strengths">Strengths</a></li><li><a href="#limitations">Limitations</a></li><li><a href="#who-should-buy">Who should buy</a></li></ol></aside>
      <div className="article-body">
        <div className="editorial-note"><strong>Testing status</strong><p>This is a specification-based product profile, not a TWW hands-on laboratory review. Manufacturer specifications are separated from measured results, and no benchmark result is presented as original testing.</p></div>
        <section id="specifications"><h2>Specifications</h2><div className="table-wrap"><table className="article-table"><thead><tr><th>Specification</th><th>Details</th></tr></thead><tbody>{product.specs.map(s => <tr key={s.label}><th scope="row">{s.label}</th><td>{s.value}</td></tr>)}</tbody></table></div></section>
        <section id="strengths"><h2>Strengths</h2><ul>{product.strengths.map(x => <li key={x}>{x}</li>)}</ul></section>
        <section id="limitations"><h2>Limitations and buying cautions</h2><ul>{product.limitations.map(x => <li key={x}>{x}</li>)}</ul></section>
        <section id="who-should-buy"><h2>Who should consider it?</h2><ul>{product.bestFor.map(x => <li key={x}>{x}</li>)}</ul></section>
        <div className="commercial-intro"><strong>Buying link</strong><p>Retail availability and pricing change. Once an approved affiliate destination is configured, it can be placed here without changing the editorial evaluation.</p>{product.affiliateUrl ? <AffiliateLink href={product.affiliateUrl} product={`${product.brand} ${product.model}`} merchant="Configured retailer">Check current availability →</AffiliateLink> : <span className="text-muted">Affiliate link not configured yet.</span>}</div>
        <section className="sources-section"><h2>Manufacturer sources</h2><ul>{product.sources.map(s => <li key={s.url}><a href={s.url} rel="noopener noreferrer">{s.label} ↗</a></li>)}</ul></section>
      </div>
    </div>
  </article>;
}
