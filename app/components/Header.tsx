import {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {Await, Link, useAsyncValue, useLocation} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {NAV} from '~/lib/catalog';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

/**
 * Site header and slide-out menu, as on the IVAARO static site:
 * logo, the six collections and search, with account and bag added for
 * the Shopify store.
 */
export function Header({isLoggedIn, cart}: HeaderProps) {
  const {pathname} = useLocation();
  const {open} = useAside();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  const setMenu = useCallback((next: boolean) => {
    setMenuOpen(next);
    if (next) closeBtn.current?.focus({preventScroll: true});
    else openBtn.current?.focus({preventScroll: true});
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    // Keep the closed menu out of the tab order
    if (drawer.current) drawer.current.inert = !menuOpen;
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  // Escape closes the menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenu]);

  // Close the menu after navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const current = (handle: string) =>
    pathname === `/${handle}` || pathname.startsWith(`/${handle}/`);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="top">
        <div className="header-top">
          <div className="side">
            <button
              ref={openBtn}
              type="button"
              className="icon-btn burger"
              id="menuOpen"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="drawer"
              onClick={() => setMenu(true)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                aria-hidden="true"
              >
                <path d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </button>
          </div>
          <Link
            to="/"
            className="logo"
            aria-label="Ivaaro home"
            prefetch="intent"
          >
            IVAARO
          </Link>
          <div className="side right">
            <button
              type="button"
              className="icon-btn mobile-search"
              aria-label="Search"
              onClick={() => open('search')}
            >
              <SearchIcon />
            </button>
            <AccountLink isLoggedIn={isLoggedIn} />
            <CartToggle cart={cart} />
          </div>
        </div>
        <nav className="main-nav" aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li key={item.handle}>
                <Link
                  to={`/${item.handle}`}
                  prefetch="intent"
                  className={`nav-link${current(item.handle) ? ' is-current' : ''}`}
                  aria-current={current(item.handle) ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="nav-divider" aria-hidden="true" />
            <li>
              <button
                type="button"
                className="icon-btn"
                aria-label="Search"
                onClick={() => open('search')}
              >
                <SearchIcon />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Slide-out menu */}
      <div
        className="scrim"
        id="scrim"
        onClick={() => setMenu(false)}
        aria-hidden="true"
      />
      <aside
        className="drawer"
        id="drawer"
        aria-label="Site menu"
        ref={drawer}
        aria-hidden={!menuOpen}
      >
        <div className="panel root" id="panelRoot">
          <div className="panel-top">
            <button
              ref={closeBtn}
              type="button"
              className="icon-btn"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                aria-hidden="true"
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
              <span className="lbl">Close</span>
            </button>
          </div>
          <nav aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.handle}
                className="nav-big"
                to={`/${item.handle}`}
                prefetch="intent"
                aria-current={current(item.handle) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

function AccountLink({isLoggedIn}: Pick<HeaderProps, 'isLoggedIn'>) {
  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
  return (
    <Suspense
      fallback={
        <Link
          prefetch="intent"
          to="/account"
          className="icon-btn hide-sm"
          aria-label="Sign in"
        >
          {icon}
        </Link>
      }
    >
      <Await resolve={isLoggedIn} errorElement={null}>
        {(loggedIn) => (
          <Link
            prefetch="intent"
            to="/account"
            className="icon-btn hide-sm"
            aria-label={loggedIn ? 'Account' : 'Sign in'}
          >
            {icon}
          </Link>
        )}
      </Await>
    </Suspense>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="icon-btn bag-btn"
      aria-label={`Bag, ${count} ${count === 1 ? 'item' : 'items'}`}
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        aria-hidden="true"
      >
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 ? (
        <span className="iv-cart-count" aria-hidden="true">
          {count}
        </span>
      ) : null}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
