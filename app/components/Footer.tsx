/* eslint-disable jsx-a11y/anchor-is-valid --
   Sitemap, Find a boutique, Careers and the social links are placeholders
   on the IVAARO static site: replace href="#" with the real addresses. */
import {useState} from 'react';
import {Link} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {SITE, indianMobile, whatsappLink} from '~/lib/site';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

/** Site footer from the IVAARO static site, with the WhatsApp sign-up */
export function Footer(_props: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="subscribe">
        <div className="wrap">
          <div>
            <h2>Discover More from IVAARO.</h2>
            <p>
              Be the first to hear about new collections, product launches and
              stories from IVAARO, on WhatsApp.
            </p>
          </div>
          <WhatsAppSignup />
        </div>
      </div>
      <div className="wrap">
        <div className="cols">
          <div className="col">
            <h3>Client care</h3>
            <Link to="/contact/" prefetch="intent">
              Contact us
            </Link>
            <span>Call us: {SITE.phoneDisplay}</span>
            <Link to="/faq/" prefetch="intent">
              FAQ
            </Link>
            <a href="#">Sitemap</a>
          </div>
          <div className="col">
            <h3>Our company</h3>
            <a href="#">Find a boutique</a>
            <Link to="/discover-ivaaro/" prefetch="intent">
              Discover IVAARO
            </Link>
            <Link to="/our-commitments/" prefetch="intent">
              Our Commitments
            </Link>
            <a href="#">Careers</a>
          </div>
          <div className="col">
            <h3>Legal area</h3>
            <Link to="/terms-of-use/" prefetch="intent">
              Terms of use
            </Link>
            <Link to="/privacy-policy/" prefetch="intent">
              Privacy policy
            </Link>
            <Link to="/credits/" prefetch="intent">
              Credits
            </Link>
          </div>
          <div className="col">
            <h3>Follow us</h3>
            <div className="social">
              <a href="#" aria-label="Instagram">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r=".8" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
                  <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                  <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>
            © {year} IVAARO · Premium Writing Instruments &amp; Lifestyle
            Accessories. Sample site · Photography from Unsplash · Film from
            Pexels.
          </span>
          <button className="country" type="button">
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
            Change country · India
          </button>
        </div>
      </div>
    </footer>
  );
}

/** Opens WhatsApp with a ready-to-send message asking to join updates */
function WhatsAppSignup() {
  const [msg, setMsg] = useState('');
  return (
    <form
      id="newsForm"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem('phone') as HTMLInputElement;
        const d = indianMobile(input.value);
        if (!d) {
          setMsg('Please enter a valid 10-digit Indian mobile number.');
          input.focus();
          return;
        }
        const text = `Hello IVAARO, please add me to your WhatsApp updates on new collections and launches. My number: +91 ${d.slice(0, 5)} ${d.slice(5)}`;
        window.open(whatsappLink(text), '_blank', 'noopener');
        setMsg('WhatsApp is opening. Send the message to join our updates.');
        form.reset();
      }}
    >
      <label htmlFor="newsPhone" className="sr-only">
        WhatsApp number
      </label>
      <span className="cc" aria-hidden="true">
        +91
      </span>
      <input
        id="newsPhone"
        name="phone"
        type="tel"
        inputMode="numeric"
        placeholder="Your WhatsApp number"
        required
        autoComplete="tel-national"
        maxLength={17}
      />
      <button type="submit">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
        </svg>
        Join on WhatsApp
      </button>
      <p className="form-msg" id="formMsg" role="status" aria-live="polite">
        {msg}
      </p>
      <p className="wa-note">
        By joining, you agree to receive messages from IVAARO on WhatsApp. Reply
        STOP at any time to opt out. See our{' '}
        <Link to="/privacy-policy/">Privacy Policy</Link>.
      </p>
    </form>
  );
}
/* eslint-enable jsx-a11y/anchor-is-valid */
