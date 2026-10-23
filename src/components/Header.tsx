import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menuGroups } from '../data/graph';

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const suppressFocusOpenRef = useRef(false);

  const closeAll = () => {
    setOpen(false);
    setActiveMenu(null);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && headerRef.current && !headerRef.current.contains(target)) {
        setOpen(false);
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (activeMenu) {
        const trigger = headerRef.current?.querySelector<HTMLAnchorElement>(
          '.nav-trigger[aria-expanded="true"]',
        );
        const focusWasInActiveGroup = trigger?.closest('.nav-group')?.contains(document.activeElement) ?? false;
        setActiveMenu(null);

        if (trigger && focusWasInActiveGroup && document.activeElement !== trigger) {
          // Restoring focus must not immediately reopen the disclosure.
          suppressFocusOpenRef.current = true;
          trigger.focus();
        }
        return;
      }

      if (open) {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu, open]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Tech World Window home" onClick={closeAll}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/tech-world-window-mark.webp" width="240" height="123" alt="" decoding="async" />
          </span>
          <span className="brand-copy">
            <strong className="brand-name">TECH WORLD WINDOW</strong>
            <small className="brand-tagline">Your Window Into Technology</small>
          </span>
        </Link>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => {
            if (open) setActiveMenu(null);
            setOpen(!open);
          }}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {menuGroups.map(group => {
            const menuId = 'mega-menu-' + group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <div
                className="nav-group"
                key={group.label}
                onMouseEnter={() => {
                  if (window.matchMedia('(min-width: 1041px)').matches) setActiveMenu(group.label);
                }}
                onMouseLeave={event => {
                  if (
                    window.matchMedia('(min-width: 1041px)').matches &&
                    !event.currentTarget.contains(document.activeElement)
                  ) {
                    setActiveMenu(current => current === group.label ? null : current);
                  }
                }}
                onBlur={event => {
                  const nextTarget = event.relatedTarget;
                  if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
                  if (!event.currentTarget.matches(':hover')) {
                    setActiveMenu(current => current === group.label ? null : current);
                  }
                }}
              >
                <NavLink
                  to={group.href || '#'}
                  className={({ isActive }) => isActive ? 'nav-trigger active' : 'nav-trigger'}
                  onClick={event => {
                    if (group.links.length) {
                      if (window.matchMedia('(max-width: 1040px)').matches) {
                        event.preventDefault();
                        setActiveMenu(current => current === group.label ? null : group.label);
                      } else {
                        closeAll();
                      }
                    }
                  }}
                  onFocus={() => {
                    if (suppressFocusOpenRef.current) {
                      suppressFocusOpenRef.current = false;
                      return;
                    }
                    if (window.matchMedia('(min-width: 1041px)').matches) setActiveMenu(group.label);
                  }}
                  aria-haspopup="true"
                  aria-controls={menuId}
                  aria-expanded={activeMenu === group.label}
                >
                  {group.label}<span className="nav-chevron" aria-hidden="true">⌄</span>
                </NavLink>
                <div id={menuId} className={'mega-menu' + (activeMenu === group.label ? ' is-open' : '')}>
                  <div className="mega-intro">
                    <span className="eyebrow">EXPLORE {group.label.toUpperCase()}</span>
                    <strong>{group.description}</strong>
                    {group.href && <Link to={group.href} onClick={closeAll}>View {group.label} →</Link>}
                  </div>
                  <div className="mega-links">
                    {group.links.map(link => (
                      <Link key={link.href + link.label} to={link.href} onClick={closeAll}>
                        <span className="mega-link-copy">
                          <strong>{link.label}</strong>
                          {link.description && <small>{link.description}</small>}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
