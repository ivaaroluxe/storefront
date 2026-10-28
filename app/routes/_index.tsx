import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  RecommendedProductFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'IVAARO | For the days ahead.'},
    {
      name: 'description',
      content:
        'IVAARO is a premium lifestyle accessory brand inspired by vara, a Sanskrit word meaning a gift, a boon or a blessing. Beginning with pens.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Products load after the page shell, so the page appears quickly
  return loadDeferredData(args);
}

/**
 * Load data for rendering content below the fold. If it's unavailable,
 * the page should still render, so errors are logged instead of thrown.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const featuredProducts = context.storefront
    .query(FEATURED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {featuredProducts};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="iv-home">
      <Hero />
      <Collection products={data.featuredProducts} />
      <ThePen />
      <Story />
      <Gifting />
      <Meaning />
      <Promises />
    </div>
  );
}

function Hero() {
  return (
    <section className="iv-hero" aria-labelledby="iv-hero-title">
      <div className="iv-hero-copy">
        <span className="iv-hero-kicker">Premium lifestyle accessories</span>
        <h1 id="iv-hero-title">For the days ahead.</h1>
        <p className="iv-hero-lede">
          A premium lifestyle accessory brand. Beginning with pens. Built to
          become personal.
        </p>
        <div className="iv-hero-actions">
          <Link
            to="/collections/all"
            prefetch="intent"
            className="iv-btn iv-btn--gold"
          >
            Discover the pen
          </Link>
          <Link
            to="/our-story"
            prefetch="intent"
            className="iv-btn iv-btn--outline-light"
          >
            Our story
          </Link>
        </div>
      </div>
      <div className="iv-hero-media">
        <img
          src="/images/presentation-box.jpg"
          alt="An IVAARO black and gold pen in its aubergine presentation box, with an ivory satin sleeve and a folded leaf"
          width={1271}
          height={981}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

function Collection({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="iv-collection" aria-labelledby="iv-collection-title">
      <div className="iv-container">
        <div className="iv-section-head">
          <div>
            <p className="iv-eyebrow">Beginning with pens</p>
            <h2 id="iv-collection-title" className="iv-heading">
              The first collection
            </h2>
          </div>
          <Link
            to="/collections/all"
            prefetch="intent"
            className="iv-text-link"
          >
            View all
          </Link>
        </div>
        <Suspense fallback={<ProductGridPlaceholder />}>
          <Await resolve={products} errorElement={<ProductGridPlaceholder />}>
            {(response) => {
              const nodes = response?.products.nodes ?? [];
              if (!nodes.length) return <ProductGridPlaceholder />;
              return (
                <div className="iv-product-grid">
                  {nodes.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  ))}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  loading,
}: {
  product: RecommendedProductFragment;
  loading: 'eager' | 'lazy';
}) {
  const image = product.featuredImage;
  return (
    <Link
      className="iv-product-card"
      to={`/products/${product.handle}`}
      prefetch="intent"
    >
      <div className="iv-product-media">
        {image ? (
          <Image
            data={image}
            alt={image.altText || product.title}
            aspectRatio="4/5"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            loading={loading}
          />
        ) : (
          <PenIcon />
        )}
      </div>
      <div className="iv-product-info">
        <span className="iv-product-title">{product.title}</span>
        <span className="iv-product-price">
          <Money data={product.priceRange.minVariantPrice} />
        </span>
      </div>
    </Link>
  );
}

/** Shown until products are added in Shopify */
function ProductGridPlaceholder() {
  return (
    <div className="iv-product-grid">
      {[0, 1, 2, 3].map((i) => (
        <div className="iv-product-card" key={i} aria-hidden="true">
          <div className="iv-product-media iv-product-placeholder">
            <PenIcon />
            Coming soon
          </div>
          <div className="iv-product-info">
            <span className="iv-product-title">&nbsp;</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PenIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M14 58L50 22l6 6-36 36-8 2 2-8z" />
      <path d="M44 28l6 6" />
    </svg>
  );
}

function ThePen() {
  return (
    <section className="iv-pen" aria-labelledby="iv-pen-title">
      <div className="iv-container">
        <div className="iv-pen-head">
          <p className="iv-eyebrow">The pen</p>
          <h2 id="iv-pen-title" className="iv-heading">
            A quieter signature
          </h2>
          <p>
            Glossy black and gold, marked only by a small emblem on the crown.
          </p>
        </div>
        <img
          className="iv-pen-strip"
          src="/images/pen-full.jpg"
          alt="The IVAARO pen: a glossy black barrel with gold clip, centre ring and cone"
          width={1501}
          height={188}
          loading="lazy"
        />
        <div className="iv-pen-details">
          <div className="iv-pen-detail">
            <h3>One deliberate mark</h3>
            <p>
              A small gold emblem on the crown. The barrel stays clean, with
              no name across it.
            </p>
          </div>
          <div className="iv-pen-detail">
            <h3>Black and gold</h3>
            <p>
              A glossy black barrel with a gold clip, centre ring and cone.
            </p>
          </div>
          <div className="iv-pen-detail">
            <h3>Care for what you carry</h3>
            <p>
              Keep it in its satin sleeve and clean it gently with a soft
              cloth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="iv-story" aria-labelledby="iv-story-title">
      <div className="iv-container iv-story-inner">
        <img
          className="iv-story-emblem"
          src="/images/ivaaro-emblem.png"
          alt=""
          width={56}
          height={54}
          loading="lazy"
        />
        <p className="iv-eyebrow">Our story</p>
        <h2 id="iv-story-title" className="iv-heading">
          Some things stay with us.
        </h2>
        <p>
          When we give something to someone we love, there is often more we
          want to say.
        </p>
        <div className="iv-quotes">
          <span>“I’m proud of you.”</span>
          <span>“I believe in you.”</span>
          <span>“Whatever comes next, I’m with you.”</span>
        </div>
        <p>
          IVAARO carries that feeling into something they can hold, use and
          keep: a quiet reminder of someone who cares, and everything they
          wished for them.
        </p>
        <Link to="/our-story" prefetch="intent" className="iv-text-link">
          Read our story
        </Link>
      </div>
    </section>
  );
}

function Gifting() {
  return (
    <section
      id="gifting"
      className="iv-gifting"
      aria-labelledby="iv-gifting-title"
    >
      <div className="iv-container iv-split">
        <div className="iv-split-media iv-leaf-media">
          <img
            src="/images/message-leaf.jpg"
            alt="The IVAARO folded leaf: the brand story on one side, and a page headed A wish for you, with space to write"
            width={632}
            height={328}
            loading="lazy"
          />
        </div>
        <div className="iv-split-copy">
          <p className="iv-eyebrow">For someone you love, or for yourself</p>
          <h2 id="iv-gifting-title" className="iv-heading">
            What I wish for you…
          </h2>
          <p>
            Inside the aubergine box, a folded leaf comes before the pen: our
            story on one side, and room for your own words on the other.
          </p>
          <p className="iv-leaf-note">
            A few words today. Something to return to.
          </p>
          <div className="iv-rule" />
          <Link
            to="/collections/all"
            prefetch="intent"
            className="iv-btn iv-btn--plum"
            style={{alignSelf: 'flex-start'}}
          >
            Choose a gift
          </Link>
        </div>
      </div>
    </section>
  );
}

function Meaning() {
  return (
    <section className="iv-meaning" aria-labelledby="iv-meaning-title">
      <div className="iv-container iv-split">
        <div className="iv-meaning-mark">
          <img
            src="/images/ivaaro-emblem-gold.png"
            alt="The IVAARO emblem: a circle opening upward, crossed by two lines"
            width={220}
            height={212}
            loading="lazy"
          />
        </div>
        <div className="iv-split-copy">
          <p className="iv-eyebrow">The meaning behind IVAARO</p>
          <h2 id="iv-meaning-title" className="iv-heading">
            A gift, a boon, a blessing
          </h2>
          <p>
            Our story takes inspiration from vara, a Sanskrit word whose
            meanings include a gift, a boon or a blessing. We read that idea as
            something chosen with care for another person, or for oneself.
          </p>
          <p>
            The emblem opens upward, leaving space for what comes next. Its
            intersecting lines give it a steady centre.
          </p>
          <p className="iv-fine-print">
            Vara is the inspiration for our story, not a literal translation of
            the name.
          </p>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="iv-promises" aria-label="Why IVAARO">
      <div className="iv-container iv-promise-grid">
        <div className="iv-promise">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#352332"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="24" height="17" />
            <path d="M2 7h28v4H2z" />
            <path d="M16 7v21" />
          </svg>
          <h3>The presentation box</h3>
          <p>Aubergine outside, ivory inside, with one centred gold mark.</p>
        </div>
        <div className="iv-promise">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#352332"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <path d="M6 4h14l6 6v18H6z" />
            <path d="M10 15h12M10 20h12M10 25h7" />
          </svg>
          <h3>Room for your words</h3>
          <p>A folded leaf with space for a personal message.</p>
        </div>
        <div className="iv-promise">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#352332"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <rect x="7" y="14" width="18" height="14" />
            <path d="M11 14V10a5 5 0 0 1 10 0v4" />
          </svg>
          <h3>Secure checkout</h3>
          <p>Pay safely with UPI, cards or netbanking.</p>
        </div>
      </div>
    </section>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
