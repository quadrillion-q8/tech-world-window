import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom';
import { buildSiteSchemaGraph } from '../seo/siteSchema';

export function SiteStructuredData() {
  const { pathname } = useLocation();
  const schema = buildSiteSchemaGraph(pathname === '/');
  return <Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>;
}
