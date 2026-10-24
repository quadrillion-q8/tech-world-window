import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuGroups } from '../data/graph';
import { SearchDialog } from './SearchDialog';

const HOVER_INTENT_DELAY_MS = 175;

function getMenuId(label: string) {
  return 'mega-menu-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const location = useLocation();
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const cancelHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const closeAll = () => {
    cancelHoverTimer();
    setOpen(false);
    setActiveMenu(null);
  };

  const scheduleOpen = (label: string) => {
    if (!window.matchMedia('(min-width: 1120px)').matches) return;
    cancelHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setActiveMenu(label);
      hoverTimerRef.current = null;
    }, HOVER_INTENT_DELAY_MS);
  };

  const scheduleClose = (label: string) => {
    if (!window.matchMedia('(min-width: 1120px)').matches) return;
    cancelHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      const group = headerRef.current?.querySelector<HTMLElement>(
        `[data-nav-group="${getMenuId(label)}"]`,
      );
      if (!group?.contains(document.activeElement)) {
        setActiveMenu(current => current === label ? null : current);
      }
      hoverTimerRef.current = null;
    }, HOVER_INTENT_DELAY_MS);
  };

  const focusMenuItem = (menuId: string, edge: 'first' | 'last') => {
    window.requestAnimationFrame(() => {
      const items = Array.from(
        document.getElementById(menuId)?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [],
      );
      const target = edge === 'last' ? items[items.length - 1] : items[0];
      target?.focus();
    });
  };

  const focusAdjacentTrigger = (menuId: string, direction: 'next' | 'previous') => {
    const triggers = Array.from(
      headerRef.current?.querySelectorAll<HTMLButtonElement>('[data-nav-trigger]') ?? [],
    );
    const currentIndex = triggers.findIndex(trigger => trigger.getAttribute('aria-controls') === menuId);
    if (currentIndex < 0 || triggers.length < 2) return;

    cancelHoverTimer();
    setActiveMenu(null);
    const offset = direction === 'next' ? 1 : -1;
    const nextIndex = (currentIndex + offset + triggers.length) % triggers.length;
    triggers[nextIndex]?.focus();
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    label: string,
    menuId: string,
  ) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      cancelHoverTimer();
      setActiveMenu(label);
      focusMenuItem(menuId, event.key === 'ArrowDown' ? 'first' : 'last');
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      focusAdjacentTrigger(menuId, event.key === 'ArrowRight' ? 'next' : 'previous');
    }
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && headerRef.current && !headerRef.current.contains(target)) {
        cancelHoverTimer();
        setOpen(false);
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (hoverTimerRef.current !== null) {
          window.clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = null;
        }
        setOpen(false);
        setActiveMenu(null);
        setSearchOpen(true);
        return;
      }
      if (event.key !== 'Escape') return;

      if (activeMenu) {
        const trigger = headerRef.current?.querySelector<HTMLButtonElement>(
          '[data-nav-trigger][aria-expanded="true"]',
        );
        const focusWasInActiveGroup = trigger?.closest('.nav-group')?.contains(document.activeElement) ?? false;
        cancelHoverTimer();
        setActiveMenu(null);

        if (trigger && focusWasInActiveGroup) trigger.focus();
        return;
      }

      if (open) {
        cancelHoverTimer();
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

  useEffect(() => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setOpen(false);
    setActiveMenu(null);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => () => {
    if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current);
  }, []);

  return (
    <>
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
          type="button"
          className="site-search-toggle"
          aria-label="Search Tech World Window"
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          title="Search the site (Ctrl+K or ⌘K)"
          onClick={() => {
            closeAll();
            setSearchOpen(true);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
        </button>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => {
            if (open) setActiveMenu(null);
            setOpen(current => !current);
          }}
          type="button"
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {menuGroups.map(group => {
            const menuId = getMenuId(group.label);
            const isOpen = activeMenu === group.label;
            const matchesCurrentPath = (href: string) =>
              location.pathname === href || location.pathname.startsWith(`${href}/`);
            const isCurrent = Boolean(
              (group.href && matchesCurrentPath(group.href)) ||
              group.links.some(link => matchesCurrentPath(link.href)),
            );

            return (
              <div
                className="nav-group"
                data-nav-group={menuId}
                key={group.label}
                onMouseEnter={() => scheduleOpen(group.label)}
                onMouseLeave={() => scheduleClose(group.label)}
                onBlur={event => {
                  const nextTarget = event.relatedTarget;
                  if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
                  if (!event.currentTarget.matches(':hover')) scheduleClose(group.label);
                }}
              >
                <button
                  id={`${menuId}-trigger`}
                  type="button"
                  className={isCurrent ? 'nav-trigger is-current' : 'nav-trigger'}
                  data-nav-trigger="true"
                  aria-controls={menuId}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Close ${group.label} menu` : `Open ${group.label} menu`}
                  onClick={() => {
                    cancelHoverTimer();
                    setActiveMenu(current => current === group.label ? null : group.label);
                  }}
                  onKeyDown={event => handleTriggerKeyDown(event, group.label, menuId)}
                >
                  {group.label}
                  <span className="nav-chevron" aria-hidden="true">⌄</span>
                </button>

                <div
                  id={menuId}
                  className={'mega-menu' + (isOpen ? ' is-open' : '')}
                  aria-labelledby={`${menuId}-trigger`}
                >
                  <div className="mega-intro">
                    <span className="eyebrow">EXPLORE {group.label.toUpperCase()}</span>
                    <strong>{group.description}</strong>
                    {group.href && (
                      <Link to={group.href} aria-current={location.pathname === group.href ? 'page' : undefined} onClick={closeAll}>
                        View {group.label} →
                      </Link>
                    )}
                  </div>
                  <div className="mega-links">
                    {group.links.map(link => (
                      <Link
                        key={link.href + link.label}
                        to={link.href}
                        aria-current={location.pathname === link.href ? 'page' : undefined}
                        onClick={closeAll}
                      >
                        <span className="mega-link-title">{link.label}</span>
                        {link.description && <small>{link.description}</small>}
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
    {searchOpen && <SearchDialog onClose={closeSearch} />}
    </>
  );
}
