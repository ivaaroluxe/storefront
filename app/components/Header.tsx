import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

/**
 * Text for the thin plum strip above the header.
 * Leave it empty ('') to hide the strip.
 */
const ANNOUNCEMENT = '';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <>
      {ANNOUNCEMENT ? (
        <div className="iv-announcement">{ANNOUNCEMENT}</div>
      ) : null}
      <header className="iv-header">
        <div className="iv-container iv-header-bar">
          <div className="iv-header-side">
            <HeaderMenuMobileToggle />
            <SearchToggle />
          </div>
          <NavLink
            prefetch="intent"
            to="/"
            end
            className="iv-logo"
            aria-label={`${shop.name} home`}
          >
            <img src="/images/ivaaro-logo.png" alt={shop.name} />
          </NavLink>
          <div className="iv-header-side iv-header-side--end">
            <AccountLink isLoggedIn={isLoggedIn} />
            <CartToggle cart={cart} />
          </div>
        </div>
        <div className="iv-container">
          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
        </div>
      </header>
    </>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  return (
    <nav
      className={`iv-nav iv-nav--${viewport}`}
      aria-label={viewport === 'desktop' ? 'Main' : 'Mobile'}
    >
      {viewport === 'mobile' && (
        <NavLink end onClick={close} prefetch="intent" to="/">
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      type="button"
      className="iv-icon-btn iv-mobile-toggle"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
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
        strokeWidth="1.5"
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
      strokeWidth="1.5"
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
        strokeWidth="1.5"
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

/**
 * Used only until a "main-menu" navigation is set up in Shopify
 * (Online Store › Navigation). Once that menu exists, its links show instead.
 */
const FALLBACK_HEADER_MENU = {
  id: 'ivaaro-fallback-menu',
  items: [
    {
      id: 'ivaaro-shop-all',
      resourceId: null,
      tags: [],
      title: 'Shop all',
      type: 'HTTP',
      url: '/collections/all',
      items: [],
    },
    {
      id: 'ivaaro-collections',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'ivaaro-story',
      resourceId: null,
      tags: [],
      title: 'Our story',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'ivaaro-contact',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'PAGE',
      url: '/pages/contact',
      items: [],
    },
  ],
};
