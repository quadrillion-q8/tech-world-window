import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../data/graph';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Tech World Window home" onClick={() => setOpen(false)}>
          <span className="brand-mark">TW</span>
          <span className="brand-copy"><strong>TECH WORLD WINDOW</strong><small>Your Window Into Technology</small></span>
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(v => !v)}>{open ? 'Close' : 'Menu'}</button>
        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navigation.map(item => <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
        </nav>
      </div>
    </header>
  );
}
