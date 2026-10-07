import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { SEOEngine, BreadcrumbStructuredData } from '../seo/SEOEngine';

const a = products.find(p => p.id === 'samsung-990-pro-4tb')!;
const b = products.find(p => p.id === 'crucial-t500-2tb')!;

export function ProductComparisonPage() {
  return <article className="article-page">
    <SEOEngine title="Samsung 990 PRO 4TB vs Crucial T500 2TB" description="Compare the Samsung 990 PRO 4TB and Crucial T500 2TB by interface, rated speed, endurance, capacity and use case." path="/compare/samsung-990-pro-vs-crucial-t500" type="article" />
    <BreadcrumbStructuredData items={[{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }, { name: 'Comparison', path: '/compare/samsung-990-pro-vs-crucial-t500' }]} />
    <div className="article-head"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/reviews">Reviews</Link></div><span className="eyebrow">SSD COMPARISON</span><h1>Samsung 990 PRO 4TB vs Crucial T500 2TB</h1><p className="article-dek">A specification-first comparison for buyers choosing between two high-performance PCIe 4.0 NVMe SSDs.</p></div>
    <div className="article-body section"><div className="table-wrap"><table className="article-table"><thead><tr><th>Specification</th><th>{a.brand} {a.model}</th><th>{b.brand} {b.model}</th></tr></thead><tbody>{['Interface','Form factor','Sequential read','Sequential write','Warranty / endurance'].map(label => { const av=a.specs.find(s=>s.label===label)?.value ?? '—'; const bv=b.specs.find(s=>s.label===label)?.value ?? '—'; return <tr key={label}><th scope="row">{label}</th><td>{av}</td><td>{bv}</td></tr>; })}</tbody></table></div>
      <section><h2>Which one makes more sense?</h2><p>The 990 PRO gives you a larger 4TB capacity and a 2,400 TBW rating on the 4TB model. The T500 2TB offers similar headline PCIe 4.0 sequential performance with a smaller capacity and 1,200 TBW rating.</p><p>Do not choose from sequential speed alone. Current price, capacity, thermal design, workload and your motherboard or laptop constraints can matter more than a small difference in quoted peak numbers.</p></section>
      <div className="editorial-note"><strong>Evidence note</strong><p>This comparison uses manufacturer specifications. TWW has not presented either product as independently benchmarked in this comparison.</p></div>
      <p><Link className="text-link" to="/best-ssds">See the SSD buying guide →</Link></p>
    </div>
  </article>;
}
