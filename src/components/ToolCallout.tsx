import { Link } from 'react-router-dom';
import { articleToolLinks, toolByPath } from '../data/tools';

/** Points readers of a related article at the matching free tool. Renders nothing for other articles. */
export function ToolCallout({ slug }: { slug: string }) {
  const paths = articleToolLinks[slug];
  if (!paths?.length) return null;
  const items = paths.map(path => toolByPath.get(path)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  if (!items.length) return null;
  return <aside className="tool-callout" aria-label="Related free tool">
    <strong>Free tool for this problem</strong>
    {items.map(tool => <p key={tool.path}><Link className="text-link" to={tool.path}>{tool.title}</Link> {tool.menuDescription}</p>)}
  </aside>;
}
