import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CATEGORIES} from '~/lib/categories';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({isLoggedIn, cart}: HeaderProps) {
  return (
    <header className="iv-hd">
      <div className="iv-hd-top">
        <div className="iv-hd-side">
          <HeaderMenuMobileToggle />
        </div>
        <NavLink
          prefetch="intent"
          to="/"
          end
          className="iv-hd-logo"
          aria-label="IVAARO home"
        >
          <img
            src="/images/ivaaro-logo-ink.png"
            alt="IVAARO"
            width={219}
            height={36}
          />
        </NavLink>
        <div className="iv-hd-side iv-hd-side--end">
          <span className="iv-hd-mobile-only">
            <SearchToggle />
          </span>
          <AccountLink isLoggedIn={isLoggedIn} />
          <CartToggle cart={cart} />
        </div>
      </div>
      <nav className="iv-hd-nav" aria-label="Collections">
        <ul>
          {CATEGORIES.map((category) => (
            <li key={category.handle}>
              <NavLink
                className="iv-hd-link"
                prefetch="intent"
                to={`/collections/${category.handle}`}
              >
                {category.title}
              </NavLink>
            </li>
          ))}
          <li className="iv-hd-divider" aria-hidden="true" />
          <li>
            <SearchToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

/**
 * The menu drawer on phones and tablets: the six collections in large
 * serif type, then the smaller links.
 */
export function HeaderMenu({
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  return (
    <nav
      className={`iv-drawer-nav iv-drawer-nav--${viewport}`}
      aria-label="Main"
    >
      {CATEGORIES.map((category) => (
        <NavLink
          key={category.handle}
          className="iv-drawer-big"
          onClick={close}
          prefetch="intent"
          to={`/collections/${category.handle}`}
        >
          {category.title}
        </NavLink>
      ))}
      <hr />
      <NavLink className="iv-drawer-small" onClick={close} to="/our-story">
        Our story
      </NavLink>
      <NavLink className="iv-drawer-small" onClick={close} to="/account">
        Your account
      </NavLink>
      <NavLink className="iv-drawer-small" onClick={close} to="/pages/contact">
        Contact us
      </NavLink>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      type="button"
      className="iv-icon-btn iv-hd-burger"
      onClick={() => open('mobile')}
      aria-label="Open menu"
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
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      type="button"
      className="iv-icon-btn"
      onClick={() => open('search')}
      aria-label="Search"
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
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
    </button>
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
        <NavLink
          prefetch="intent"
          to="/account"
          className="iv-icon-btn"
          aria-label="Sign in"
        >
          {icon}
        </NavLink>
      }
    >
      <Await resolve={isLoggedIn} errorElement={null}>
        {(loggedIn) => (
          <NavLink
            prefetch="intent"
            to="/account"
            className="iv-icon-btn"
            aria-label={loggedIn ? 'Account' : 'Sign in'}
          >
            {icon}
          </NavLink>
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
      className="iv-icon-btn"
      aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
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
