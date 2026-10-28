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
    {title: 'Ivaaro | Luxury writing instruments'},
    {
      name: 'description',
      content:
        'Ivaaro writing instruments, presented in a plum gift box. For the days ahead.',
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
      <Gifting />
      <Promises />
      <Story />
    </div>
  );
}

function Hero() {
  return (
    <section className="iv-hero" aria-labelledby="iv-hero-title">
      <div className="iv-hero-copy">
        <span className="iv-hero-kicker">The Ivaaro collection</span>
        <h1 id="iv-hero-title">For the days ahead.</h1>
        <p className="iv-hero-lede">
          Writing instruments in black lacquer and gold, made to be given and
          kept for years.
        </p>
        <div className="iv-hero-actions">
          <Link
            to="/collections/all"
            prefetch="intent"
            className="iv-btn iv-btn--gold"
          >
            Discover the collection
          </Link>
          <a href="#gifting" className="iv-btn iv-btn--outline-light">
            Gift an Ivaaro
          </a>
        </div>
      </div>
      <div className="iv-hero-media">
        <img
          src="/images/packaging.jpg"
          alt="Ivaaro black and gold pen in a plum presentation box, with a velvet pouch and note card"
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
            <p className="iv-eyebrow">Writing instruments</p>
            <h2 id="iv-collection-title" className="iv-heading">
              The collection
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

function Gifting() {
  return (
    <section
      id="gifting"
      className="iv-gifting"
      aria-labelledby="iv-gifting-title"
    >
      <div className="iv-container iv-split">
        <div className="iv-split-media">
          <img
            src="/images/packaging.jpg"
            alt="Plum Ivaaro gift box, velvet pouch and note card"
            loading="lazy"
          />
        </div>
        <div className="iv-split-copy">
          <p className="iv-eyebrow">The art of gifting</p>
          <h2 id="iv-gifting-title" className="iv-heading">
            Presented to be remembered
          </h2>
          <p>
            Every Ivaaro pen arrives in a plum presentation box with a velvet
            pouch and a note card, ready to give.
          </p>
          <div className="iv-rule" />
          <Link
            to="/collections/all"
            prefetch="intent"
            className="iv-btn iv-btn--plum"
            style={{alignSelf: 'flex-start'}}
          >
            Shop gift sets
          </Link>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="iv-promises" aria-label="Why Ivaaro">
      <div className="iv-container iv-promise-grid">
        <div className="iv-promise">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#3A1C37"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="24" height="17" />
            <path d="M2 7h28v4H2z" />
            <path d="M16 7v21" />
          </svg>
          <h3>Gift-ready packaging</h3>
          <p>Presentation box, velvet pouch and card with every pen.</p>
        </div>
        <div className="iv-promise">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#3A1C37"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <rect x="7" y="14" width="18" height="14" />
            <path d="M11 14V10a5 5 0 0 1 10 0v4" />
          </svg>
          <h3>Secure checkout</h3>
          <p>Pay safely with UPI, cards or netbanking.</p>
        </div>
        <div className="iv-promise">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#3A1C37"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <path d="M2 9h18v14H2z" />
            <path d="M20 13h6l4 5v5H20" />
            <circle cx="8" cy="25" r="2.5" />
            <circle cx="25" cy="25" r="2.5" />
          </svg>
          <h3>Delivered to your door</h3>
          <p>Carefully packed and tracked from our hands to yours.</p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="iv-story" aria-labelledby="iv-story-title">
      <div className="iv-container iv-story-inner">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="#3A1C37"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="11" />
          <path d="M20 4v32M9 20h22" />
        </svg>
        <p className="iv-eyebrow">Our story</p>
        <h2 id="iv-story-title" className="iv-heading">
          Some words are worth writing by hand.
        </h2>
        <p>
          Ivaaro makes writing instruments for the moments that matter: the
          signature, the letter, the note you keep.
        </p>
        <Link to="/pages/about" prefetch="intent" className="iv-text-link">
          Read our story
        </Link>
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
