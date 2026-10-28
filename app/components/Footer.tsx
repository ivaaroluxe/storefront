import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="iv-footer">
      <div className="iv-container">
        <div className="iv-footer-top">
          <div className="iv-footer-brand">
            <img
              src="/images/ivaaro-logo-stacked-gold.png"
              alt="IVAARO"
              width={152}
              height={72}
            />
            <p>
              IVAARO is a premium lifestyle accessory brand inspired by vara, a
              Sanskrit word meaning a gift, a boon or a blessing. Beginning
              with pens, IVAARO brings thoughtful presentation and personal
              meaning to objects chosen for someone you love, or for yourself.
            </p>
          </div>
          <div className="iv-footer-cols">
            <nav className="iv-footer-col" aria-label="Shop">
              <span className="iv-footer-col-title">Shop</span>
              <NavLink prefetch="intent" to="/collections/all">
                The pen
              </NavLink>
              <NavLink prefetch="intent" to="/#gifting">
                Gifting
              </NavLink>
              <NavLink prefetch="intent" to="/search">
                Search
              </NavLink>
            </nav>
            <nav className="iv-footer-col" aria-label="Help">
              <span className="iv-footer-col-title">Help</span>
              <NavLink prefetch="intent" to="/account">
                Your account and orders
              </NavLink>
              <NavLink prefetch="intent" to="/pages/contact">
                Contact us
              </NavLink>
              <NavLink prefetch="intent" to="/our-story">
                Our story
              </NavLink>
            </nav>
            <Suspense fallback={<PolicyLinks />}>
              <Await resolve={footerPromise} errorElement={<PolicyLinks />}>
                {(footer) => (
                  <PolicyLinks
                    menu={footer?.menu}
                    primaryDomainUrl={header.shop.primaryDomain?.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="iv-footer-bottom">
          <span>© {year} IVAARO. All rights reserved.</span>
          <span className="iv-footer-tagline">IVAARO. For the days ahead.</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * Shows the "footer" menu from Shopify (Online Store › Navigation) when it
 * exists, otherwise links to the standard policy pages.
 */
function PolicyLinks({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu?: FooterQuery['menu'];
  primaryDomainUrl?: string;
  publicStoreDomain?: string;
}) {
  const items = (menu || FALLBACK_FOOTER_MENU).items;
  return (
    <nav className="iv-footer-col" aria-label="Policies">
      <span className="iv-footer-col-title">Policies</span>
      {items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          (publicStoreDomain && item.url.includes(publicStoreDomain)) ||
          (primaryDomainUrl && item.url.includes(primaryDomainUrl))
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink end key={item.id} prefetch="intent" to={url}>
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'ivaaro-fallback-footer',
  items: [
    {
      id: 'ivaaro-privacy',
      resourceId: null,
      tags: [],
      title: 'Privacy policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'ivaaro-refund',
      resourceId: null,
      tags: [],
      title: 'Refund policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'ivaaro-shipping',
      resourceId: null,
      tags: [],
      title: 'Shipping policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'ivaaro-terms',
      resourceId: null,
      tags: [],
      title: 'Terms of service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
