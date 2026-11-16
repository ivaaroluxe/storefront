import {NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

/**
 * Site footer. Only links to pages that exist are shown; add social links
 * here once the profiles are live.
 */
export function Footer(_props: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="iv-ft">
      <div className="iv-wrap">
        <div className="iv-ft-cols">
          <div className="iv-ft-col iv-ft-brand">
            <img
              src="/images/ivaaro-logo-ivory.png"
              alt="IVAARO"
              width={146}
              height={24}
              loading="lazy"
            />
            <p>
              Premium writing instruments and lifestyle accessories, chosen with
              care. For the days ahead.
            </p>
          </div>
          <nav className="iv-ft-col" aria-label="Client care">
            <h3>Client care</h3>
            <NavLink to="/pages/contact" prefetch="intent">
              Contact us
            </NavLink>
            <NavLink to="/account" prefetch="intent">
              Your account and orders
            </NavLink>
            <NavLink to="/policies/shipping-policy" prefetch="intent">
              Shipping
            </NavLink>
            <NavLink to="/policies/refund-policy" prefetch="intent">
              Returns and refunds
            </NavLink>
          </nav>
          <nav className="iv-ft-col" aria-label="Our company">
            <h3>Our company</h3>
            <NavLink to="/our-story" prefetch="intent">
              Our story
            </NavLink>
            <NavLink to="/collections" prefetch="intent">
              The collections
            </NavLink>
            <NavLink to="/search" prefetch="intent">
              Search
            </NavLink>
          </nav>
          <nav className="iv-ft-col" aria-label="Legal area">
            <h3>Legal area</h3>
            <NavLink to="/policies/terms-of-service" prefetch="intent">
              Terms of use
            </NavLink>
            <NavLink to="/policies/privacy-policy" prefetch="intent">
              Privacy policy
            </NavLink>
          </nav>
        </div>
        <div className="iv-ft-bottom">
          <span>
            © {year} IVAARO · Premium Writing Instruments &amp; Lifestyle
            Accessories
          </span>
          <span className="iv-ft-country">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
            </svg>
            India · ₹ INR
          </span>
        </div>
      </div>
    </footer>
  );
}
