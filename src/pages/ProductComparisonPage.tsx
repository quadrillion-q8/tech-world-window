import { Link, useLocation } from 'react-router-dom';
import { comparisons, getComparisonByPath } from '../data/comparisons';
import { FaqSection } from '../components/FaqSection';
import { productImage, productPath } from '../data/products';
import { SEOEngine, BreadcrumbStructuredData, FAQStructuredData } from '../seo/SEOEngine';

export function ProductComparisonPage() {
  const location = useLocation();
  const comparison = getComparisonByPath(location.pathname);
  if (!comparison) {
    return <section className="section static-page"><h1>Comparison not found</h1><Link to="/reviews">Return to the TWW review library →</Link></section>;
  }
  const { productA: a, productB: b } = comparison;
  const imgA = productImage(a);
  const imgB = productImage(b);
  const related = comparisons.filter(item => item.path !== comparison.path && (item.productA.category === a.category || item.a === comparison.a || item.b === comparison.a || item.a === comparison.b || item.b === comparison.b)).slice(0, 4);
  return <article className="article-page">
    <SEOEngine title={comparison.title} description={comparison.metaDescription} path={comparison.path} type="article" />
    <BreadcrumbStructuredData items={[{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }, { name: 'GPU Reviews', path: '/reviews/gpus' }, { name: 'Comparison', path: comparison.path }]} />
    {comparison.faq?.length ? <FAQStructuredData items={comparison.faq} /> : null}
    <div className="article-head">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/reviews">Reviews</Link></div>
      <span className="eyebrow">{comparison.eyebrow}</span>
      <h1>{comparison.title}</h1>
      <p className="article-dek">{comparison.dek}</p>
      {comparison.quickAnswer ? <section className="editorial-note quick-answer comparison-quick-answer" aria-label="Quick verdict"><strong>Quick verdict</strong><p>{comparison.quickAnswer}</p></section> : null}
      {comparison.workloadVerdicts?.length ? <section className="comparison-verdicts" aria-label="GPU winner by workload"><h2>Which GPU fits your workload?</h2><div className="article-grid comparison-verdict-grid">{comparison.workloadVerdicts.map(item => <article className="article-card tww-card" key={item.label}><span className="eyebrow">WORKLOAD</span><h3 className="tww-card-title">{item.label}</h3><strong>{item.winner}</strong><p className="tww-card-description">{item.reason}</p></article>)}</div></section> : null}
    </div>
    <div className="article-body section">
      {imgA && imgB && <div className="comparison-products">
        {[{ p: a, img: imgA }, { p: b, img: imgB }].map(({ p, img }) => <Link key={p.id} to={productPath(p)} className="comparison-product">
          <img src={img.srcSet.split(' ')[0]} srcSet={img.srcSet} sizes="(max-width: 700px) 92vw, 440px" alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
          <span>{p.brand} {p.model}</span>
        </Link>)}
      </div>}
      <section aria-label="Full graphics card specification comparison"><h2>RTX 5070 Ti vs RX 9070 XT: specification comparison</h2><div className="table-wrap"><table className="article-table"><thead><tr><th scope="col">Specification</th><th scope="col">{a.brand} {a.model}</th><th scope="col">{b.brand} {b.model}</th></tr></thead><tbody>
        {comparison.rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.a}</td><td>{row.b}</td></tr>)}
      </tbody></table></div><p className="product-source-note">Reference specifications are not a substitute for the exact add-in-board specification. TGP and TBP use different vendor definitions; launch prices are historical, not current retail quotations.</p></section>
      {comparison.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</section>)}
      {comparison.relatedLinks?.length ? <section className="related-review-guides"><h2>Useful tools and related GPU guides</h2><div className="article-grid">{comparison.relatedLinks.map(item => <article className="article-card tww-card" key={item.href}><h3 className="tww-card-title"><Link to={item.href}>{item.label}</Link></h3><p className="tww-card-description">{item.description}</p><Link className="text-link tww-card-cta" to={item.href}>Open resource →</Link></article>)}</div></section> : null}
      {comparison.faq && <FaqSection items={comparison.faq} />}
      {comparison.sources?.length ? <section className="comparison-sources"><h2>Sources and review methodology</h2><p>Specifications are from the manufacturers. FPS and power measurements are attributed to the publication that tested the cards. Software compatibility links are documentation, not TWW performance tests.</p><ul>{comparison.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section> : null}
      <div className="editorial-note"><strong>Evidence note</strong><p>{comparison.evidenceNote}</p></div>
      <p><Link className="text-link" to={productPath(a)}>{a.brand} {a.model} specifications and sources →</Link></p>
      <p><Link className="text-link" to={productPath(b)}>{b.brand} {b.model} specifications and sources →</Link></p>
      {comparison.guide && <p><Link className="text-link" to={comparison.guide.href}>{comparison.guide.label}</Link></p>}
      {related.length > 0 && <section className="related-comparisons"><h2>More comparisons</h2><ul>{related.map(item => <li key={item.path}><Link className="text-link" to={item.path}>{item.title}</Link></li>)}</ul></section>}
    </div>
  </article>;
}
