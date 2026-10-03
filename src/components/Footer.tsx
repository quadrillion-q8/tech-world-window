import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div><Link className="footer-brand" to="/">TECH WORLD WINDOW</Link><p>Your Window Into Technology.</p><p className="muted">Technology news, practical fixes, real-world testing and useful tools — clearly explained.</p></div>
        <div className="footer-links"><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/editorial-policy">Editorial Policy</Link><Link to="/privacy-policy">Privacy</Link></div>
        <p className="copyright">© {new Date().getFullYear()} Tech World Window. Built for curious minds.</p>
      </div>
    </footer>
  );
}
