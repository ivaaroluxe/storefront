import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  RecommendedProductFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {CATEGORIES, assetImage, assetVideo} from '~/lib/categories';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'IVAARO — Premium Writing Instruments & Lifestyle Accessories'},
    {
      name: 'description',
      content:
        'IVAARO — premium writing instruments and lifestyle accessories. A contemporary lifestyle brand for professionals who appreciate thoughtful design, everyday functionality and refined details.',
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
      <VideoBanner
        tall
        video="hero-pen.mp4"
        kicker="The Signature Collection"
        title="The art of the written word"
        titleId="iv-hero-title"
        heading="h1"
        cta={{label: 'Discover', to: '#new'}}
        priority
      />

      <section className="iv-banner" aria-labelledby="iv-sig-title">
        <img
          src={assetImage('signature-pen-nib.jpg')}
          alt="Gold fountain pen with an engraved nib"
          loading="lazy"
        />
        <div className="iv-banner-content">
          <span className="iv-banner-kicker">Fine Writing Instruments</span>
          <h2 id="iv-sig-title">The Ivaaro Signature</h2>
          <Link
            to="/collections/fine-writing-instruments"
            prefetch="intent"
            className="iv-cta"
          >
            Discover the collection
          </Link>
        </div>
      </section>

      <LatestCreations products={data.featuredProducts} />

      <VideoBanner
        video="atelier-leather.mp4"
        kicker="Leather Goods"
        title="The Atelier Collection"
        titleId="iv-atelier-title"
        text="Full-grain leather, cut and stitched by hand — made to soften and deepen with every year of use."
        cta={{label: 'Discover', to: '/collections/leather-goods'}}
      />

      <Collections />
      <Services />
    </div>
  );
}

/**
 * Full-width film with a headline at the bottom. The film plays only while
 * on screen, can be paused, and stays still for visitors who prefer reduced
 * motion.
 */
function VideoBanner({
  video,
  kicker,
  title,
  titleId,
  text,
  cta,
  tall,
  heading = 'h2',
  priority,
}: {
  video: string;
  kicker: string;
  title: string;
  titleId: string;
  text?: string;
  cta: {label: string; to: string};
  tall?: boolean;
  heading?: 'h1' | 'h2';
  priority?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;
    v.muted = true;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) {
      userPaused.current = true;
      v.pause();
      return;
    }
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !userPaused.current) {
            v.play().catch(() => {});
          } else if (!entry.isIntersecting) {
            v.pause();
          }
        }
      },
      {threshold: 0.25},
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const Heading = heading;

  return (
    <section
      ref={sectionRef}
      className={`iv-banner${tall ? ' iv-banner--tall' : ''}`}
      aria-labelledby={titleId}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        aria-hidden="true"
      >
        <source src={assetVideo(video)} type="video/mp4" />
      </video>
      <div className="iv-banner-content">
        <span className="iv-banner-kicker">{kicker}</span>
        <Heading id={titleId}>{title}</Heading>
        {text ? <p>{text}</p> : null}
        {cta.to.startsWith('#') ? (
          <a href={cta.to} className="iv-cta">
            {cta.label}
          </a>
        ) : (
          <Link to={cta.to} prefetch="intent" className="iv-cta">
            {cta.label}
          </Link>
        )}
      </div>
      <button
        type="button"
        className="iv-vtoggle"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        {playing ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="3" y="2" width="3.5" height="12" />
            <rect x="9.5" y="2" width="3.5" height="12" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 2l10 6-10 6z" />
          </svg>
        )}
      </button>
    </section>
  );
}

function LatestCreations({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="iv-section" id="new" aria-labelledby="iv-new-title">
      <div className="iv-wrap">
        <Suspense fallback={<CarouselShell title={<NewTitle />} empty />}>
          <Await
            resolve={products}
            errorElement={<CarouselShell title={<NewTitle />} empty />}
          >
            {(response) => {
              const nodes = response?.products.nodes ?? [];
              if (!nodes.length) {
                return <CarouselShell title={<NewTitle />} empty />;
              }
              return (
                <Carousel title={<NewTitle />}>
                  {nodes.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                  ))}
                </Carousel>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

function NewTitle() {
  return (
    <div>
      <span className="iv-kicker-dark">New</span>
      <h2 id="iv-new-title">Latest creations</h2>
    </div>
  );
}

/** Shown before products are added in Shopify */
function CarouselShell({title}: {title: React.ReactNode; empty: true}) {
  return (
    <>
      <div className="iv-sec-head">{title}</div>
      <div className="iv-new-empty">
        <p>New creations are on their way.</p>
        <Link to="/our-story" prefetch="intent" className="iv-cta">
          Read our story
        </Link>
      </div>
    </>
  );
}

function Carousel({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    atStart: true,
    atEnd: false,
    width: 25,
    left: 0,
  });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const width = Math.min(100, (track.clientWidth / track.scrollWidth) * 100);
    setState({
      atStart: track.scrollLeft <= 2,
      atEnd: track.scrollLeft >= max - 2,
      width,
      left: max > 0 ? (track.scrollLeft / max) * (100 - width) : 0,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const step = () => {
    const card = trackRef.current?.querySelector('.iv-card');
    return card ? card.getBoundingClientRect().width + 24 : 300;
  };
  const scroll = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({left: direction * step()});

  return (
    <>
      <div className="iv-sec-head">
        {title}
        <div className="iv-arrows">
          <button
            type="button"
            className="iv-arrow"
            aria-label="Previous products"
            disabled={state.atStart}
            onClick={() => scroll(-1)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="iv-arrow"
            aria-label="Next products"
            disabled={state.atEnd}
            onClick={() => scroll(1)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {/* The strip is focusable so keyboard users can scroll it with the
          arrow keys, as recommended for scrollable regions. */}
      <div
        ref={trackRef}
        className="iv-track"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        role="region"
        aria-label="New products, scroll horizontally"
        onScroll={update}
      >
        {children}
      </div>
      <div className="iv-progress" aria-hidden="true">
        <span style={{width: `${state.width}%`, left: `${state.left}%`}} />
      </div>
    </>
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
  const url = `/products/${product.handle}`;
  const spec =
    product.productType ||
    (product.description ? truncate(product.description, 70) : '');
  return (
    <article className="iv-card">
      <Link
        to={url}
        prefetch="intent"
        className="iv-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        {image ? (
          <Image
            data={image}
            alt=""
            aspectRatio="4/5"
            sizes="(min-width: 1100px) 25vw, (min-width: 860px) 33vw, (min-width: 600px) 50vw, 78vw"
            loading={loading}
          />
        ) : (
          <span className="iv-media-empty">
            <img
              src="/images/ivaaro-emblem.png"
              alt=""
              width={48}
              height={46}
            />
          </span>
        )}
      </Link>
      <Link to={url} prefetch="intent" className="iv-card-name">
        {product.title}
      </Link>
      {spec ? <span className="iv-card-spec">{spec}</span> : null}
      <span className="iv-card-price">
        <Money data={product.priceRange.minVariantPrice} />
      </span>
      <Link
        to={url}
        prefetch="intent"
        className="iv-cta"
        aria-label={`Discover ${product.title}`}
      >
        Discover
      </Link>
    </article>
  );
}

function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function Collections() {
  return (
    <section
      className="iv-cats"
      id="collections"
      aria-labelledby="iv-cats-title"
    >
      <div className="iv-wrap iv-cats-head">
        <span className="iv-kicker-dark">The Collections</span>
        <h2 id="iv-cats-title">
          Premium Writing Instruments &amp; Lifestyle Accessories
        </h2>
        <p className="iv-cats-intro">
          <em>
            IVAARO is a lifestyle brand for professionals, with premium writing
            instruments at its core.
          </em>
        </p>
        <p className="iv-cats-intro">
          Our collections bring together modern design, functionality and
          refined craftsmanship, offering thoughtfully designed products that
          complement personal and professional lifestyles.
        </p>
      </div>
      <div className="iv-tiles">
        {CATEGORIES.map((category) => {
          const url = `/collections/${category.handle}`;
          return (
            <article
              className="iv-tile"
              key={category.handle}
              id={`cat-${category.handle}`}
            >
              <Link
                to={url}
                prefetch="intent"
                className="iv-media"
                aria-label={category.title}
              >
                <img
                  src={assetImage(category.image)}
                  alt={category.alt}
                  loading="lazy"
                />
              </Link>
              <div className="iv-tile-copy">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link to={url} prefetch="intent" className="iv-cta">
                  Discover the collection
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      image: 'service-leather-care.jpg',
      alt: 'Leather wallet with thread and scissors',
      title: 'Our leather goods services',
      text: 'Hot-stamped initials, conditioning and repairs to keep your leather at its best.',
      cta: 'Find out more',
    },
    {
      image: 'service-workshop.jpg',
      alt: 'Workshop with a sewing machine and hanging leather goods',
      title: 'Our writing instrument services',
      text: 'Engraving, nib adjustment and full servicing by our workshop.',
      cta: 'Find out more',
    },
    {
      image: 'service-appointment.jpg',
      alt: 'Leather wallet, belt and shoes laid out together',
      title: 'Book an appointment',
      text: 'Meet an advisor in boutique or by video call to choose, try and personalise.',
      cta: 'Make an appointment',
    },
  ];
  return (
    <section
      className="iv-section iv-services"
      id="services"
      aria-labelledby="iv-svc-title"
    >
      <div className="iv-wrap">
        <div className="iv-sec-head">
          <div>
            <span className="iv-kicker-dark">Services</span>
            <h2 id="iv-svc-title">At your service</h2>
          </div>
        </div>
        <div className="iv-svc-grid">
          {services.map((service) => (
            <article className="iv-service" key={service.title}>
              <div className="iv-media">
                <img
                  src={assetImage(service.image)}
                  alt={service.alt}
                  loading="lazy"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link to="/pages/contact" prefetch="intent" className="iv-cta">
                {service.cta}
              </Link>
            </article>
          ))}
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
    productType
    description
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
    products(first: 12, sortKey: CREATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
