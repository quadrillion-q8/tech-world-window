import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';

export function NotFoundPage() {
  const location = useLocation();
  return (
    <section className="section static-page">
      <SEOEngine
        title="Page Not Found"
        description="The requested Tech World Window page could not be found."
        path={location.pathname}
        robots="noindex,follow"
      />
      <span className="eyebrow">404 · NOT FOUND</span>
      <h1>That page does not exist.</h1>
      <p>Use the homepage or one of the main sections to continue exploring Tech World Window.</p>
      <Link className="text-link" to="/">Return to the homepage →</Link>
    </section>
  );
}
