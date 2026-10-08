import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';
import { BSOD_BASE_PATH, bsodBySlug, bsodCategoryLabels, bsodPath, relatedBsodCodes, shortHex } from '../data/bsod';
import { bsodFaq, bsodSeo } from '../data/tools';
import { routeGraph } from '../data/graph';
import { FaqSection } from '../components/FaqSection';
import { NotFoundPage } from './NotFoundPage';

/** Renders `backtick` spans as <code> without dangerouslySetInnerHTML. */
function renderInline(text: string): ReactNode[] {
  return text.split('`').map((part, index) => (index % 2 === 1 ? <code key={index}>{part}</code> : part));
}

export function BsodCodePage() {
  const location = useLocation();
  const slug = location.pathname.replace(/\/$/, '').split('/').pop() || '';
  const entry = bsodBySlug.get(slug);
  if (!entry) return <NotFoundPage />;

  const seo = bsodSeo(entry);
  const siblings = relatedBsodCodes(entry);
  const guides = entry.related
    .map(path => routeGraph.find(route => route.path === path))
    .filter((route): route is NonNullable<typeof route> => Boolean(route));

  return <section className="section tool-page bsod-page bsod-code-page">
    <SEOEngine title={seo.title} description={seo.description} path={bsodPath(entry.slug)} />
    <div className="breadcrumbs">
      <Link to="/tools">Tools</Link><span>/</span><Link to={BSOD_BASE_PATH}>BSOD Error Code Lookup</Link>
    </div>
    <span className="eyebrow">{bsodCategoryLabels[entry.category]}</span>
    <h1>{entry.name} <span className="bsod-h1-hex">({entry.hex})</span></h1>
    <p className="page-intro">Stop code {entry.hex}, also written {shortHex(entry.hex)}. Here is what it means, what usually causes it, and the safest order to work through fixes on Windows 11 and Windows 10.</p>

    <div className="quick-answer"><strong>In short</strong><p>{entry.summary}</p></div>

    <div className="article-body bsod-body">
      <section>
        <h2>What {entry.name} means</h2>
        <p>{entry.meaning}</p>
      </section>

      <section>
        <h2>Common causes</h2>
        <ul>{entry.causes.map(cause => <li key={cause}>{cause}</li>)}</ul>
      </section>

      <section>
        <h2>How to fix {entry.name}</h2>
        <p>Work through these in order and test after each one. Stopping as soon as the crashes stop tells you which change mattered.</p>
        <ol className="article-steps bsod-steps">
          {entry.steps.map(item => <li key={item.title}><strong>{item.title}.</strong> {renderInline(item.detail)}</li>)}
        </ol>
      </section>

      <div className="editorial-note">
        <strong>When to stop and protect your data</strong>
        <p>{entry.escalate}</p>
      </div>

      <section>
        <h2>Not sure this is your code?</h2>
        <p>The stop code appears as text on the blue screen. If the PC restarted before you could read it, open Event Viewer, then Windows Logs, then System, and look for a BugCheck event with ID 1001. You can also <Link className="text-link" to={BSOD_BASE_PATH}>search all stop codes</Link>.</p>
      </section>

      {guides.length > 0 && <section>
        <h2>Related guides</h2>
        <ul>{guides.map(route => <li key={route.path}><Link className="text-link" to={route.path}>{route.title}</Link></li>)}</ul>
      </section>}

      {siblings.length > 0 && <section>
        <h2>Other {bsodCategoryLabels[entry.category].toLowerCase()}</h2>
        <ul>{siblings.map(item => <li key={item.slug}><Link className="text-link" to={bsodPath(item.slug)}>{item.name}</Link> ({shortHex(item.hex)})</li>)}</ul>
      </section>}
    </div>

    <FaqSection items={bsodFaq(entry)} />

    <div className="article-disclaimer">
      <strong>Use this guidance carefully</strong>
      <p>A stop code can have several causes, and these steps are general guidance rather than a diagnosis of your PC. If your data matters, back it up before repairs. If the problem continues, a hardware technician can test the parts.</p>
      <p className="editorial-links"><Link to="/testing">See our testing methodology</Link><span>·</span><Link to="/editorial-policy">Read our editorial policy</Link></p>
    </div>
  </section>;
}
