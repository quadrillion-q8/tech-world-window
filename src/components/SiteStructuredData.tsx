import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom';
import { getRouteSchemas, safeJson } from '../seo/ssgSeo';

// Same route schema inventory for SSG and client navigation.
export function SiteStructuredData() {
  const { pathname } = useLocation();
  return <Head>{getRouteSchemas(pathname).map((schema, index) => <script key={index} type="application/ld+json">{safeJson(schema)}</script>)}</Head>;
}
