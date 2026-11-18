import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, redirect, useLoaderData, useNavigate} from 'react-router';
import type {Route} from './+types/$category.$handle';
import {
  Analytics,
  CartForm,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSelectedProductOptions,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
  type MappedProductOptions,
} from '@shopify/hydrogen';
import type {FetcherWithComponents} from 'react-router';
import {useAside} from '~/components/Aside';
import {
  formatINR,
  getCatalogProduct,
  getCategory,
  homeCategoryFor,
  swatchColour,
} from '~/lib/catalog';
import {
  buildCards,
  LISTING_QUERY,
  type ListingCard,
  type ShopifyListingProduct,
} from '~/lib/listing';
import {productExtras} from '~/lib/pdp';
import {PRODUCT_QUERY} from '~/lib/productQuery';
import {SITE} from '~/lib/site';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import pdpStyles from '~/styles/site/pdp.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: pdpStyles},
];

export const meta: Route.MetaFunction = ({data}) => {
  if (!data) return [{title: 'IVAARO'}];
  const {product, canonical} = data;
  return [
    {title: `${product.title} | IVAARO`},
    {
      name: 'description',
      content:
        product.seo?.description || product.description?.slice(0, 155) || '',
    },
    {tagName: 'link', rel: 'canonical', href: canonical},
  ];
};

export async function loader({context, params, request}: Route.LoaderArgs) {
  const {handle, category: catParam} = params;
  if (!handle) throw new Response(null, {status: 404});
  const {storefront} = context;
  const url = new URL(request.url);

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions: getSelectedProductOptions(request)},
  });
  if (!product?.id) throw new Response(null, {status: 404});
  redirectIfHandleIsLocalized(request, {handle, data: product});

  // Keep one address per product: /<its collection>/<handle>
  const homeCat = homeCategoryFor(product.handle, product.tags);
  if (homeCat && homeCat !== catParam) {
    throw redirect(`/${homeCat}/${product.handle}${url.search}`, 301);
  }

  // Links from the static site use ?finish=black; map them to Shopify options
  const firstOption = product.options[0];
  const legacy = url.searchParams.get('finish');
  if (legacy && firstOption && !url.searchParams.has(firstOption.name)) {
    const match = firstOption.optionValues.find((v) =>
      v.name.toLowerCase().startsWith(legacy.toLowerCase()),
    );
    url.searchParams.delete('finish');
    if (match) url.searchParams.set(firstOption.name, match.name);
    throw redirect(`${url.pathname}?${url.searchParams.toString()}`, 302);
  }

  // You May Also Like: the top pieces from the same collection
  const category = getCategory(homeCat);
  let related: ListingCard[] = [];
  if (category) {
    const listing = await storefront
      .query(LISTING_QUERY, {
        variables: {query: `tag:"cat:${category.handle}"`},
        cache: storefront.CacheShort(),
      })
      .catch(() => null);
    const cards = buildCards(
      category,
      (listing?.products?.nodes ?? []) as ShopifyListingProduct[],
    );
    const seen = new Set([product.handle]);
    related = cards
      .filter((c) => (seen.has(c.handle) ? false : (seen.add(c.handle), true)))
      .slice(0, 4);
  }

  return {
    product,
    homeCat,
    related,
    canonical: `/${homeCat ?? 'products'}/${product.handle}`,
  };
}

type LoadedProduct = Awaited<ReturnType<typeof loader>>['product'];
type Variant = NonNullable<LoadedProduct['selectedOrFirstAvailableVariant']>;

export default function ProductPage() {
  const {product, homeCat, related} = useLoaderData<typeof loader>();
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  ) as Variant;
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const category = getCategory(homeCat);
  const extras = productExtras(product.handle, homeCat);
  const catalog = getCatalogProduct(product.handle);
  const firstValue = selectedVariant.selectedOptions[0]?.value;
  const catalogVariant =
    catalog?.variants.find((v) => v.value === firstValue) ??
    (catalog?.variants.length === 1 ? catalog.variants[0] : undefined);
  const spec =
    catalogVariant?.pdpSpec ?? catalogVariant?.spec ?? selectedVariant.title;
  const ref = selectedVariant.sku || catalogVariant?.sku || '';

  // Gallery: the designed gallery when there is one, else the product image
  // and the gift box; Shopify images for products added later
  const gallery: Array<[string, string]> = useMemo(() => {
    if (catalogVariant?.gallery?.length) return catalogVariant.gallery;
    if (catalogVariant) {
      return [
        [catalogVariant.image, `${product.title}, ${spec}`],
        [
          '/assets/images/pdp/gift-box.svg',
          'The IVAARO gift box with brass ribbon',
        ],
      ];
    }
    const imgs = product.images.nodes;
    const first = selectedVariant.image;
    const ordered = first
      ? [first, ...imgs.filter((i) => i.id !== first.id)]
      : imgs;
    return ordered.map(
      (i) => [i.url, i.altText || product.title] as [string, string],
    );
  }, [catalogVariant, product, selectedVariant.image, spec]);

  const paragraphs = useMemo(() => {
    const parts = (product.descriptionHtml || '')
      .split(/<\/p>/i)
      .map((p) => p.replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);
    return parts.length ? parts : [product.description].filter(Boolean);
  }, [product.descriptionHtml, product.description]);
  const lede = extras.lede ?? paragraphs[0] ?? spec;
  const story =
    extras.story ?? (paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs);

  return (
    <>
      <div className="wrap pdp">
        <Gallery gallery={gallery} life={extras.life} />
        <section className="buy" aria-labelledby="pTitle">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              {category ? (
                <li>
                  <Link to={`/${category.handle}`}>{category.title}</Link>
                </li>
              ) : null}
              <li aria-current="page">{product.title}</li>
            </ol>
          </nav>
          <p className="coll">{extras.collectionLabel}</p>
          <h1 id="pTitle">{product.title}</h1>
          <DetailsDrawerTrigger lede={lede} />
          <ul className="perks">
            <li>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" />
                <circle cx="6.5" cy="17.5" r="1.6" />
                <circle cx="17" cy="17.5" r="1.6" />
              </svg>
              Complimentary delivery across India
            </li>
            {extras.isWriting ? (
              <li>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  <path d="M4 20l1.2-4.6L16.8 3.8a1.6 1.6 0 0 1 2.3 0l1.1 1.1a1.6 1.6 0 0 1 0 2.3L8.6 18.8z" />
                  <path d="M14.6 6l3.4 3.4" />
                </svg>
                Engraving available
              </li>
            ) : (
              <li>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="9" width="17" height="11.5" />
                  <path d="M2.5 6h19v3h-19zM12 6v14.5" />
                </svg>
                Presented in the IVAARO gift box
              </li>
            )}
            <li>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M4 9h11a5 5 0 0 1 0 10H9" />
                <path d="M8 5L4 9l4 4" />
              </svg>
              Returns within 7 days
            </li>
            <li>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z" />
                <path d="M9 12l2.2 2.2L15.5 10" />
              </svg>
              2-year warranty
            </li>
          </ul>

          {productOptions.map((option, i) => (
            <OptionGroup key={option.name} option={option} pills={i > 0} />
          ))}

          <p className="price" id="price">
            {formatINR(selectedVariant.price.amount)}
            {selectedVariant.compareAtPrice &&
            Number(selectedVariant.compareAtPrice.amount) >
              Number(selectedVariant.price.amount) ? (
              <s className="was">
                <span className="sr-only">Was </span>
                {formatINR(selectedVariant.compareAtPrice.amount)}
              </s>
            ) : null}
          </p>
          <p className="tax">Inclusive of all taxes</p>
          <div className="buy-row">
            <AddToBag variant={selectedVariant} />
            <WishButton id={`${product.title}|${firstValue ?? ''}`} />
          </div>
          <Assist reference={ref} />
        </section>
      </div>

      <section className="svc" aria-label="Services">
        <div className="wrap">
          <article>
            <div className="media">
              <img
                src="/assets/images/pdp/gift-box.svg"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="copy">
              <h3>Gift Wrapping</h3>
              <p>
                Every piece arrives in our signature IVAARO box. Add a
                handwritten card when you order.
              </p>
              <Link to="/gifts-collections/" className="cta">
                Explore Gifts
              </Link>
            </div>
          </article>
          <article>
            <div className="media">
              <img
                src="/assets/images/signature-pen-nib.jpg"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="copy">
              <h3>Engraving</h3>
              <p>
                Make it personal with initials or a short message, engraved by
                hand on the cap.
              </p>
              <Link to="/faq/" className="cta">
                How It Works
              </Link>
            </div>
          </article>
          <article>
            <div className="media">
              <img
                src="/assets/images/service-workshop.jpg"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="copy">
              <h3>Delivery &amp; Returns</h3>
              <p>
                Complimentary insured delivery across India, with returns
                accepted within 7 days of delivery.
              </p>
              <Link to="/faq/" className="cta">
                View Details
              </Link>
            </div>
          </article>
        </div>
      </section>

      {related.length ? (
        <section className="wrap rel" aria-labelledby="relTitle">
          <h2 id="relTitle">You May Also Like</h2>
          <div className="pgrid">
            {related.map((c) => (
              <article className="pcard" key={c.key}>
                <Link
                  to={c.href}
                  className="pmedia"
                  tabIndex={-1}
                  aria-hidden="true"
                  prefetch="intent"
                >
                  <img
                    src={c.image}
                    alt=""
                    width={800}
                    height={800}
                    loading="lazy"
                  />
                </Link>
                <h3 className="pname">
                  <Link to={c.href} prefetch="intent">
                    {c.title}
                  </Link>
                </h3>
                <p className="pspec">{c.spec}</p>
                <p className="pprice">{c.priceText}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <DetailsDrawer
        title={product.title}
        story={story}
        rows={extras.details.map(([label, value]) => [
          label,
          value.replace('{spec}', spec).replace('{ref}', ref),
        ])}
        care={extras.care}
      />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant.id || '',
              variantTitle: selectedVariant.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

/* ---------- Gallery and lightbox ---------- */

function Gallery({
  gallery,
  life,
}: {
  gallery: Array<[string, string]>;
  life: {src: string; alt: string} | null;
}) {
  const galRef = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const lbCloseRef = useRef<HTMLButtonElement>(null);
  const count = gallery.length + (life ? 1 : 0);

  useEffect(() => {
    if (lb === null) return;
    document.body.style.overflow = 'hidden';
    lbCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft')
        setLb((i) =>
          i === null ? i : (i - 1 + gallery.length) % gallery.length,
        );
      if (e.key === 'ArrowRight')
        setLb((i) => (i === null ? i : (i + 1) % gallery.length));
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus();
    };
  }, [lb, gallery.length]);

  const open = (i: number, el: HTMLElement) => {
    if (!window.matchMedia('(min-width:1025px)').matches) return;
    openerRef.current = el;
    setLb(i);
  };

  return (
    <div>
      <div
        className="gal"
        id="gal"
        aria-label="Product images"
        ref={galRef}
        onScroll={() => {
          const g = galRef.current;
          if (g) setDot(Math.round(g.scrollLeft / g.clientWidth));
        }}
      >
        {gallery.map(([src, alt], i) => (
          // The figures open a lightbox on desktop, as on the static site
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <figure
            key={src}
            className={i === 0 ? 'wide' : ''}
            data-i={i}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-label={`Enlarge image ${i + 1}`}
            onClick={(e) => open(i, e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(i, e.currentTarget);
              }
            }}
          >
            <img
              src={src}
              alt={alt}
              width={800}
              height={800}
              loading={i === 0 ? 'eager' : 'lazy'}
              {...(i === 0 ? {fetchpriority: 'high'} : {})}
            />
          </figure>
        ))}
        {life ? (
          <figure className="life">
            <img src={life.src} alt={life.alt} loading="lazy" />
          </figure>
        ) : null}
      </div>
      <div className="gal-dots" aria-hidden="true">
        {Array.from({length: count}).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <i key={i} className={i === dot ? 'on' : ''} />
        ))}
      </div>
      <div
        className={`lb${lb !== null ? ' on' : ''}`}
        id="lb"
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        aria-hidden={lb === null}
      >
        {lb !== null ? (
          <img src={gallery[lb][0]} alt={gallery[lb][1]} />
        ) : (
          <img src="" alt="" />
        )}
        <button
          ref={lbCloseRef}
          type="button"
          className="icon-btn"
          aria-label="Close image viewer"
          onClick={() => setLb(null)}
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
        </button>
        <button
          type="button"
          className="nav prev"
          aria-label="Previous image"
          onClick={() =>
            setLb((i) =>
              i === null ? i : (i - 1 + gallery.length) % gallery.length,
            )
          }
        >
          &#8249;
        </button>
        <button
          type="button"
          className="nav next"
          aria-label="Next image"
          onClick={() =>
            setLb((i) => (i === null ? i : (i + 1) % gallery.length))
          }
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

/* ---------- Options ---------- */

/**
 * The first option (finish or colour) shows as colour swatches; further
 * options (such as nib size) show as small square buttons.
 */
function OptionGroup({
  option,
  pills,
}: {
  option: MappedProductOptions;
  pills: boolean;
}) {
  const navigate = useNavigate();
  const values = option.optionValues;
  const selected = values.find((v) => v.selected);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  if (values.length < 2) return null;

  const choose = (i: number) => {
    const v = values[i];
    if (!v.selected && v.exists) {
      void navigate(`?${v.variantUriQuery}`, {
        replace: true,
        preventScrollReset: true,
      });
    }
  };

  return (
    <fieldset className="opt-group">
      <legend>
        {option.name} <span>{selected?.name}</span>
      </legend>
      <div
        className={pills ? 'nibs' : 'swatches'}
        role="radiogroup"
        aria-label={option.name}
      >
        {values.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            className={pills ? 'nib' : 'sw'}
            role="radio"
            aria-checked={v.selected}
            aria-label={
              pills ? `${v.name} ${option.name.toLowerCase()}` : v.name
            }
            title={v.name}
            tabIndex={v.selected ? 0 : -1}
            disabled={!v.exists}
            onClick={() => choose(i)}
            onKeyDown={(e) => {
              const d =
                e.key === 'ArrowRight' || e.key === 'ArrowDown'
                  ? 1
                  : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
                    ? -1
                    : 0;
              if (!d) return;
              e.preventDefault();
              const n = (i + d + values.length) % values.length;
              choose(n);
              refs.current[n]?.focus();
            }}
          >
            {pills ? (
              v.name.charAt(0).toUpperCase()
            ) : (
              <i
                style={{background: v.swatch?.color || swatchColour(v.name)}}
              />
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- Buying ---------- */

function AddToBag({variant}: {variant: Variant}) {
  const {open} = useAside();
  const available = variant.availableForSale;
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [
          {merchandiseId: variant.id, quantity: 1, selectedVariant: variant},
        ],
      }}
    >
      {(fetcher: FetcherWithComponents<unknown>) => {
        const pending = fetcher.state !== 'idle';
        return (
          <button
            type="submit"
            className="btn-main"
            id="addToBag"
            disabled={!available || pending}
            aria-busy={pending}
            onClick={() => open('cart')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {!available ? 'Sold Out' : pending ? 'Adding…' : 'Add to Bag'}
          </button>
        );
      }}
    </CartForm>
  );
}

function WishButton({id}: {id: string}) {
  const [on, setOn] = useState(false);
  const read = () => {
    try {
      return JSON.parse(
        localStorage.getItem('ivaaro-wish') || '[]',
      ) as string[];
    } catch {
      return [];
    }
  };
  useEffect(() => {
    setOn(read().includes(id));
  }, [id]);
  return (
    <button
      type="button"
      className="btn-wish"
      id="wish"
      aria-pressed={on}
      aria-label={on ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={() => {
        const list = read();
        const i = list.indexOf(id);
        if (i > -1) list.splice(i, 1);
        else list.push(id);
        try {
          localStorage.setItem('ivaaro-wish', JSON.stringify(list));
        } catch {
          /* storage unavailable */
        }
        setOn(i === -1);
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
        <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />
      </svg>
    </button>
  );
}

function Assist({reference}: {reference: string}) {
  const [toast, setToast] = useState('');
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 4000);
    return () => window.clearTimeout(t);
  }, [toast]);
  return (
    <>
      <ul className="assist">
        <li>
          <a href={`tel:${SITE.phoneTel}`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M5 3.5h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.5 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" />
            </svg>
            For more information, call {SITE.phoneDisplay}
          </a>
        </li>
        <li>
          <Link to="/contact/">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <rect x="3.5" y="5" width="17" height="15.5" />
              <path d="M3.5 9.5h17M8 3v4M16 3v4M8.5 14l2.3 2.2 4.7-4.4" />
            </svg>
            Book an appointment
          </Link>
        </li>
        <li className="ref">
          <button
            type="button"
            id="share"
            onClick={() => {
              const u = window.location.href;
              if (navigator.share) {
                navigator
                  .share({title: document.title, url: u})
                  .catch(() => {});
                return;
              }
              (navigator.clipboard
                ? navigator.clipboard.writeText(u)
                : Promise.reject(new Error('no clipboard'))
              ).then(
                () => setToast('Link copied.'),
                () => setToast(u),
              );
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <circle cx="18" cy="5.5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="18.5" r="2.5" />
              <path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1" />
            </svg>
            Share
          </button>
          {reference ? <span id="ref">Ref. {reference}</span> : null}
        </li>
      </ul>
      <p className="toast" id="toast" aria-live="polite">
        {toast}
      </p>
    </>
  );
}

/* ---------- Details drawer ---------- */

const DETAILS_EVENT = 'ivaaro:details';

function DetailsDrawerTrigger({lede}: {lede: string}) {
  return (
    <p className="lede">
      {lede}{' '}
      <button
        type="button"
        className="linkbtn"
        aria-controls="details"
        onClick={(e) =>
          window.dispatchEvent(
            new CustomEvent(DETAILS_EVENT, {detail: e.currentTarget}),
          )
        }
      >
        Read more
      </button>
    </p>
  );
}

function DetailsDrawer({
  title,
  story,
  rows,
  care,
}: {
  title: string;
  story: string[];
  rows: Array<[string, string]>;
  care: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      opener.current = (e as CustomEvent<HTMLElement>).detail;
      setOpen(true);
    };
    window.addEventListener(DETAILS_EVENT, onOpen);
    return () => window.removeEventListener(DETAILS_EVENT, onOpen);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('d-open', open);
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('d-open');
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    opener.current?.focus();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="dscrim" onClick={close} />
      <aside
        className="ddrawer"
        id="details"
        aria-hidden={!open}
        aria-labelledby="dTitle"
        role="dialog"
        aria-modal="true"
      >
        <div className="dhead">
          <h2 id="dTitle">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            aria-label="Close details"
            onClick={close}
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
          </button>
        </div>
        {story.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h3>Details</h3>
        <table className="spec">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Care</h3>
        <p>{care}</p>
      </aside>
    </>
  );
}
