import { Link, useLocation } from 'react-router-dom';
import { routeGraph } from '../data/graph';
import { topicLinks, productTopicLinks } from '../data/topicLinks';

const byPath = new Map(routeGraph.filter(route => route.indexable).map(route => [route.path, route.title]));
export function ContextualLinks({ path, productCategory }: { path: string; productCategory?: string }) {
  const links = productCategory ? productTopicLinks[productCategory] : topicLinks[path];
  if (!links?.length) return null;
  return <nav className="article-next-steps" aria-label="Related guides and tools" data-contextual-links="true">
    <h2>Useful next steps</h2>
    <ul>{links.map(([target, reason]) => <li key={target}><Link to={target}><strong>{byPath.get(target) || target}</strong></Link><span>{reason}</span></li>)}</ul>
  </nav>;
}

export function ToolContextualLinks() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '');
  if (!path.startsWith('/tools/') || !topicLinks[path]) return null;
  return <div className="section"><ContextualLinks path={path} /></div>;
}
