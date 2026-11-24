import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom';
import { buildSiteSchemaGraph } from '../seo/siteSchema';
import { useRouteSeo } from '../seo/routeSeo';

const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

export function SiteStructuredData() {
  const { pathname } = useLocation();
  const payload = useRouteSeo();
  if (!payload) return null;
  const schemas = [buildSiteSchemaGraph(pathname === '/'), ...payload.schemas];
  return <Head>{schemas.map((schema, index) => <script key={index} type="application/ld+json">{safeJson(schema)}</script>)}</Head>;
}
