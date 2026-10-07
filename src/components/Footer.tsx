import { Link } from 'react-router-dom';
import { menuGroups } from '../data/graph';

export function Footer() {
  const groups = menuGroups.slice(0, 4);
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link className="footer-brand" to="/">TECH WORLD WINDOW</Link>
            <p>Your Window Into Technology.</p>
            <p className="muted">Technology news, practical fixes, real-world testing and useful tools — clearly explained.</p>
          </div>
          <div className="footer-columns">
            {groups.map(group => (
              <div key={group.label}>
                <strong>{group.label}</strong>
                {group.links.slice(0, 3).map(link => <Link key={link.href + link.label} to={link.href}>{link.label}</Link>)}
              </div>
            ))}
            <div>
              <strong>About</strong>
              <Link to="/about">About TWW</Link>
              <Link to="/editorial-policy">Editorial Policy</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy-policy">Privacy</Link>
              <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tech World Window. Built for curious minds.</span>
          <span>Clear · Practical · Evidence-led</span>
        </div>
      </div>
    </footer>
  );
}
