import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routeGraph } from '../data/graph';
import { tools } from '../data/tools';

type SearchDocument = {
  href: string;
  title: string;
  description: string;
  section: string;
  keywords: string[];
};

type Props = {
  onClose: () => void;
};

const suggestions = [
  'Windows troubleshooting',
  'Game stutter',
  'BSOD error code',
  'SSD health',
];

function normalize(value: string): string {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function routeSection(kind: string): string {
  switch (kind) {
    case 'category':
      return 'Topic hub';
    case 'tools':
    case 'tool':
      return 'Free tools';
    case 'bsod-code':
      return 'Windows error codes';
    case 'product-review':
      return 'Reviews';
    case 'comparison':
      return 'Comparisons';
    case 'author':
      return 'Authors';
    default:
      return 'Tech World Window';
  }
}

function scoreDocument(document: SearchDocument, query: string, tokens: string[]): number {
  const title = normalize(document.title);
  const path = normalize(document.href);
  const description = normalize(document.description);
  const section = normalize(document.section);
  const keywords = normalize(document.keywords.join(' '));
  const haystack = [title, path, description, section, keywords].join(' ');

  if (!tokens.every(token => haystack.includes(token))) return -1;

  let score = 0;
  if (title === query) score += 120;
  else if (title.startsWith(query)) score += 85;
  else if (title.includes(query)) score += 65;

  if (tokens.every(token => title.includes(token))) score += 25;
  if (path.includes(query)) score += 25;
  if (section.includes(query)) score += 15;
  if (keywords.includes(query)) score += 12;
  if (description.includes(query)) score += 8;

  return score;
}

export function SearchDialog({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [articleDocuments, setArticleDocuments] = useState<SearchDocument[]>([]);
  const [articleIndexReady, setArticleIndexReady] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('../data/articles')
      .then(({ articles }) => {
        if (cancelled) return;
        setArticleDocuments(articles.map(article => ({
          href: '/' + article.slug,
          title: article.title,
          description: article.metaDescription || article.dek || article.excerpt,
          section: article.category,
          keywords: [article.category, article.subcategory || '', ...article.tags],
        })));
        setArticleIndexReady(true);
      })
      .catch(() => {
        if (!cancelled) setArticleIndexReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'input:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter(element => element.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeys);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeys);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  const documents = useMemo(() => {
    const toolDocuments: SearchDocument[] = tools.map(tool => ({
      href: tool.path,
      title: tool.title,
      description: tool.hubDescription,
      section: 'Free tools',
      keywords: [tool.group, tool.kindLabel, tool.status, tool.path],
    }));

    const routeDocuments: SearchDocument[] = routeGraph
      .filter(route => route.indexable && route.kind !== 'home' && route.kind !== 'article' && route.kind !== 'tool')
      .map(route => ({
        href: route.path,
        title: route.title,
        description: '',
        section: routeSection(route.kind),
        keywords: [route.path, route.kind],
      }));

    const byHref = new Map<string, SearchDocument>();
    for (const document of [...articleDocuments, ...toolDocuments, ...routeDocuments]) {
      if (!byHref.has(document.href)) byHref.set(document.href, document);
    }
    return Array.from(byHref.values());
  }, [articleDocuments]);

  const trimmedQuery = query.trim();
  const normalizedQuery = normalize(trimmedQuery);
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return documents
      .map(document => ({ document, score: scoreDocument(document, normalizedQuery, tokens) }))
      .filter(result => result.score >= 0)
      .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
      .slice(0, 8)
      .map(result => result.document);
  }, [documents, normalizedQuery, trimmedQuery]);

  const focusFirstResult = () => {
    dialogRef.current?.querySelector<HTMLAnchorElement>('.site-search-result')?.focus();
  };

  return (
    <div
      className="site-search-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="site-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-title"
        aria-describedby="site-search-help"
      >
        <div className="site-search-heading">
          <div>
            <span className="site-search-kicker">TECH WORLD WINDOW</span>
            <h2 id="site-search-title">Search the site</h2>
            <p id="site-search-help">Find troubleshooting guides, technical research, product reviews and free tools.</p>
          </div>
          <button type="button" className="site-search-close" onClick={onClose} aria-label="Close site search">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <label className="site-search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                focusFirstResult();
              }
            }}
            placeholder="Search symptoms, error codes, hardware or tools…"
            autoComplete="off"
            aria-label="Search Tech World Window"
          />
          <kbd>ESC</kbd>
        </label>

        {!trimmedQuery && (
          <div className="site-search-suggestions" aria-label="Suggested searches">
            <span>Try</span>
            {suggestions.map(suggestion => (
              <button
                type="button"
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  inputRef.current?.focus();
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="site-search-status" role="status" aria-live="polite">
          {!trimmedQuery
            ? 'Search article titles, symptoms, technical terms, error codes and tool names.'
            : results.length
              ? results.length + ' matching ' + (results.length === 1 ? 'page' : 'pages') + (results.length === 8 ? ' · refine your search for more specific results' : '')
              : articleIndexReady
                ? 'No matching pages found. Try a shorter phrase or a different technical term.'
                : 'Loading the complete article index…'}
        </div>

        {trimmedQuery && results.length > 0 && (
          <ul className="site-search-results" aria-label="Search results">
            {results.map(result => (
              <li key={result.href}>
                <Link className="site-search-result" to={result.href} onClick={onClose}>
                  <span className="site-search-result-topline">
                    <span className="site-search-result-title">{result.title}</span>
                    <span className="site-search-result-section">{result.section}</span>
                  </span>
                  {result.description && <span className="site-search-result-description">{result.description}</span>}
                  <span className="site-search-result-path">{result.href}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
