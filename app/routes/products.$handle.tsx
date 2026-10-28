import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.product.title ?? 'Product'} | IVAARO`},
    {
      name: 'description',
      content:
        data?.product.seo?.description ||
        data?.product.description?.slice(0, 155) ||
        '',
    },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml, productType} = product;
  const images = product.images?.nodes ?? [];

  return (
    <div className="iv-pdp">
      <div className="iv-container">
        <nav className="iv-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/collections/all">The pen</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <div className="iv-pdp-grid">
          <ProductImage
            image={selectedVariant?.image}
            images={images}
            title={title}
          />
          <div className="iv-pdp-info">
            <p className="iv-eyebrow">{productType || 'IVAARO'}</p>
            <h1 className="iv-pdp-title">{title}</h1>
            <ProductPrice
              className="iv-pdp-price"
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
            />
            <p className="iv-pdp-tax">
              Taxes and delivery are calculated at checkout.
            </p>
            <div className="iv-rule" />
            <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            />
            <ul className="iv-pdp-assurances">
              <li>
                <BoxIcon />
                <span>Presented in the aubergine IVAARO box</span>
              </li>
              <li>
                <LeafIcon />
                <span>Add a personal message in your bag</span>
              </li>
              <li>
                <LockIcon />
                <span>Secure checkout with UPI, cards or netbanking</span>
              </li>
            </ul>
            <div className="iv-accordion">
              {descriptionHtml ? (
                <details open>
                  <summary>Description</summary>
                  <div
                    className="iv-rte"
                    dangerouslySetInnerHTML={{__html: descriptionHtml}}
                  />
                </details>
              ) : null}
              <details>
                <summary>In the box</summary>
                <div className="iv-rte">
                  <p>
                    The pen rests in a fitted ivory tray inside the aubergine
                    presentation box, with a light ivory satin sleeve and a
                    folded leaf carrying our story and space for your own words.
                  </p>
                </div>
              </details>
              <details>
                <summary>Care for what you carry</summary>
                <div className="iv-rte">
                  <ul>
                    <li>Carry the pen in its satin sleeve.</li>
                    <li>Clean gently with a soft, dry cloth.</li>
                    <li>Avoid prolonged moisture and abrasive cleaners.</li>
                    <li>Use a refill confirmed for this pen model.</li>
                  </ul>
                </div>
              </details>
              <details>
                <summary>Delivery and returns</summary>
                <div className="iv-rte">
                  <p>
                    Delivery options and charges are shown at checkout before
                    you pay. Read our{' '}
                    <Link to="/policies/shipping-policy">shipping policy</Link>{' '}
                    and <Link to="/policies/refund-policy">refund policy</Link>.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
      <section className="iv-pdp-wish" aria-label="A personal message">
        <div className="iv-container iv-pdp-wish-inner">
          <img
            src="/images/ivaaro-emblem-gold.png"
            alt=""
            width={44}
            height={42}
            loading="lazy"
          />
          <p className="iv-pdp-wish-title">What I wish for you…</p>
          <p>A few words today. Something to return to.</p>
        </div>
      </section>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

function BoxIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="4" y="11" width="24" height="17" />
      <path d="M2 7h28v4H2z" />
      <path d="M16 7v21" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6 4h14l6 6v18H6z" />
      <path d="M10 15h12M10 20h12M10 25h7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="7" y="14" width="18" height="14" />
      <path d="M11 14V10a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    productType
    images(first: 10) {
      nodes {
        __typename
        id
        url
        altText
        width
        height
      }
    }
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
