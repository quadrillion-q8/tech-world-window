import { Link, useLocation } from 'react-router-dom';
import { getProductByPath, productImage, productCategorySlug, productMetaDescription, productPageTitle, type Product, type ProductCategory } from '../data/products';
import { SEOEngine, BreadcrumbStructuredData, ProductStructuredData } from '../seo/SEOEngine';
import { comparisonsForProduct } from '../data/comparisons';
import { AffiliateLink } from '../components/AffiliateLink';

const categoryNames: Record<ProductCategory, string> = {
  SSD: 'SSD Profiles',
  GPU: 'GPU Profiles',
  Laptop: 'Laptop Profiles',
  CPU: 'CPU Profiles',
};

function sourceGroups(product: Product) {
  return {
    manufacturer: product.sources.filter(source => source.kind === 'manufacturer'),
    independent: product.sources.filter(source => source.kind === 'independent-review'),
  };
}

export function ProductReviewPage() {
  const location = useLocation();
  const product = getProductByPath(location.pathname);

  if (!product) {
    return <section className="section static-page"><h1>Product profile not found</h1><p>This product may have moved or is not yet in the review library.</p><Link to="/reviews">Return to the TWW review library →</Link></section>;
  }

  const categoryPath = `/reviews/${productCategorySlug(product.category)}`;
  const categoryName = categoryNames[product.category];
  const groups = sourceGroups(product);
  const hasIndependentReview = groups.independent.length > 0;
  const pageTitle = productPageTitle(product);
  const description = productMetaDescription(product);
  const image = productImage(product);
  const compareLinks = comparisonsForProduct(product);

  return <article className="article-page product-review-page">
    <SEOEngine title={pageTitle} description={description} path={location.pathname} type="website" />
    <ProductStructuredData product={{ name: `${product.brand} ${product.model}`, brand: product.brand, description: product.summary }} path={location.pathname} />
    <BreadcrumbStructuredData items={[
      { name: 'Home', path: '/' },
      { name: 'Reviews & Product Research', path: '/reviews' },
      { name: categoryName, path: categoryPath },
      { name: `${product.brand} ${product.model}`, path: location.pathname },
    ]} />

    <div className="article-head">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/reviews">Reviews & Product Research</Link><span>/</span><Link to={categoryPath}>{categoryName}</Link></div>
      <span className="eyebrow">{product.category} · {product.status === 'hands-on-tested' ? 'TWW HANDS-ON REVIEW' : hasIndependentReview ? 'SPECIFICATION PROFILE · INDEPENDENT LAB REVIEW LINKED' : 'SPECIFICATION PROFILE'}</span>
      <h1>{product.brand} {product.model}</h1>
      <p className="article-dek">{product.summary}</p>
      <div className="article-byline">
        <div><strong>Tech World Window Editorial Team</strong><span>Specifications and source links checked {product.lastVerified}</span></div>
      </div>
    </div>

    {image && <figure className="product-hero-image">
      <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 960px) 100vw, 900px" alt={image.alt} width={image.width} height={image.height} fetchPriority="high" decoding="async" />
      <figcaption>{product.brand} {product.model}. Product image for identification; not a TWW test photo.</figcaption>
    </figure>}

    <div className="article-layout">
      <aside className="article-aside">
        <span className="eyebrow">ON THIS PAGE</span>
        <ol>
          <li><a href="#testing-status">Testing status</a></li>
          <li><a href="#specifications">Specifications</a></li>
          {hasIndependentReview && <li><a href="#independent-testing">Independent review evidence</a></li>}
          <li><a href="#strengths">Strengths</a></li>
          <li><a href="#limitations">Limitations</a></li>
          <li><a href="#who-should-consider">Who should consider it?</a></li>
          <li><a href="#sources">Sources</a></li>
        </ol>
      </aside>

      <div className="article-body">
        <section id="testing-status" className="product-testing-status">
          <h2>What this page is—and isn’t</h2>
          {product.status === 'hands-on-tested' ? (
            <p>This product has been tested by TWW. The test setup, methods, results and limitations should be documented in the relevant review sections.</p>
          ) : (
            <>
              <p><strong>This is not a TWW hands-on review.</strong> TWW has not physically tested or independently benchmarked this product. This page organizes the manufacturer’s specifications, practical buying considerations and links to published external testing where available.</p>
              {hasIndependentReview && <p>Any performance or usability conclusions attributed to an outside publication remain that publication’s findings. They are not presented as TWW measurements.</p>}
            </>
          )}
        </section>

        <section id="specifications">
          <h2>Specifications</h2>
          <div className="table-wrap"><table className="article-table"><thead><tr><th scope="col">Specification</th><th scope="col">Details</th></tr></thead><tbody>
            {product.specs.map(spec => <tr key={spec.label}><th scope="row">{spec.label}</th><td>{spec.value}</td></tr>)}
          </tbody></table></div>
          <p className="product-source-note">Specifications can vary by region, exact SKU, firmware, and manufacturer updates. Confirm the seller’s exact part number before purchase.</p>
        </section>

        {hasIndependentReview && <section id="independent-testing" className="product-independent-review">
          <h2>What independent testing reports</h2>
          <div className="editorial-note">
            <strong>Outside review summary—not TWW test results</strong>
            <p>{product.independentReviewSummary || 'Independent test coverage is linked below. Review findings apply to each publication’s stated test configuration and methodology.'}</p>
          </div>
          <ul className="product-source-links">
            {groups.independent.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}
          </ul>
          {product.configurationNote && <p><strong>Configuration note:</strong> {product.configurationNote}</p>}
        </section>}

        <section id="strengths">
          <h2>Potential strengths</h2>
          <ul>{product.strengths.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section id="limitations">
          <h2>Limitations and buying cautions</h2>
          <ul>{product.limitations.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section id="who-should-consider">
          <h2>Who should consider it?</h2>
          <ul>{product.bestFor.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <aside className="product-buying-note">
          <strong>Before you buy</strong>
          <p>Compare the exact SKU, local warranty, current retailer price, dimensions, power or cooling requirements and return policy. TWW has not configured a verified retailer link for this profile.</p>
          {product.affiliateUrl && <AffiliateLink href={product.affiliateUrl} product={`${product.brand} ${product.model}`} merchant="Configured retailer">Check current availability →</AffiliateLink>}
        </aside>

        <section id="sources" className="sources-section">
          <h2>Manufacturer specifications and documentation</h2>
          {groups.manufacturer.length ? <ul>{groups.manufacturer.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul> : <p>No manufacturer source has been added yet.</p>}
          {groups.independent.length > 0 && <><h3>Independent reviews</h3><ul>{groups.independent.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul></>}
        </section>
        {compareLinks.length > 0 && <section id="compare"><h2>Compare this product</h2><ul>{compareLinks.map(item => <li key={item.path}><Link to={item.path}>{item.title}</Link></li>)}</ul></section>}
        <p><Link className="text-link" to={categoryPath}>Explore more {product.category.toLowerCase()} product profiles →</Link></p>
        <p><Link className="text-link" to="/testing">How TWW handles testing and evidence →</Link></p>
      </div>
    </div>
  </article>;
}
