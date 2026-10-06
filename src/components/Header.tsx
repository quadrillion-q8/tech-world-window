import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menuGroups } from '../data/graph';

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const closeAll = () => {
    setOpen(false);
    setActiveMenu(null);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Tech World Window home" onClick={closeAll}>
          <span className="brand-mark" aria-hidden="true">TW</span>
          <span className="brand-copy"><strong>TECH WORLD WINDOW</strong><small>Your Window Into Technology</small></span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(v => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {menuGroups.map(group => (
            <div className="nav-group" key={group.label}>
              <NavLink
                to={group.href || '#'}
                className={({ isActive }) => isActive ? 'nav-trigger active' : 'nav-trigger'}
                onClick={(event) => {
                  if (group.links.length) {
                    if (window.matchMedia('(max-width: 900px)').matches) {
                      event.preventDefault();
                      setActiveMenu(activeMenu === group.label ? null : group.label);
                    } else {
                      closeAll();
                    }
                  }
                }}
                aria-haspopup="true"
                aria-expanded={activeMenu === group.label}
              >
                {group.label}<span className="nav-chevron" aria-hidden="true">⌄</span>
              </NavLink>
              <div className={`mega-menu ${activeMenu === group.label ? 'is-open' : ''}`}>
                <div className="mega-intro">
                  <span className="eyebrow">EXPLORE {group.label.toUpperCase()}</span>
                  <strong>{group.description}</strong>
                  {group.href && <Link to={group.href} onClick={closeAll}>View {group.label} →</Link>}
                </div>
                <div className="mega-links">
                  {group.links.map(link => (
                    <Link key={link.href + link.label} to={link.href} onClick={closeAll}>
                      <strong>{link.label}</strong>
                      {link.description && <small>{link.description}</small>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
