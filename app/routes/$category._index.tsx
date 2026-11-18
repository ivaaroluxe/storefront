import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/$category._index';
import {getCategory, type CatalogCategory, type Cta} from '~/lib/catalog';
import {
  buildCards,
  matches,
  sortCards,
  type ListingCard,
  type ListingState,
  type ShopifyListingProduct,
  LISTING_QUERY,
} from '~/lib/listing';
import plpStyles from '~/styles/site/plp.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: plpStyles},
];

export const meta: Route.MetaFunction = ({data}) => {
  if (!data) return [{title: 'IVAARO'}];
  const {category} = data;
  return [
    {title: `${category.title} | IVAARO`},
    {name: 'description', content: category.intro},
  ];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const category = getCategory(params.category);
  if (!category) throw new Response('Not found', {status: 404});

  const result = await context.storefront
    .query(LISTING_QUERY, {
      variables: {query: `tag:"cat:${category.handle}"`},
      cache: context.storefront.CacheShort(),
    })
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  const shopify = (result?.products?.nodes ?? []) as ShopifyListingProduct[];
  return {category, cards: buildCards(category, shopify)};
}

const CLOSE_ICON = (
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
);
const CHEVRON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
  >
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export default function CollectionPage() {
  const {category, cards} = useLoaderData<typeof loader>();
  // Remount when switching collections so filters reset
  return <Listing key={category.handle} category={category} cards={cards} />;
}

function Listing({
  category,
  cards,
}: {
  category: CatalogCategory;
  cards: ListingCard[];
}) {
  const PAGE = category.pageSize || 12;
  const [state, setState] = useState<ListingState>({sort: 'rank', filters: {}});
  const [limit, setLimit] = useState(PAGE);
  const [view, setView] = useState<'grid' | 'feed'>('grid');
  const [heroMore, setHeroMore] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [wished, setWished] = useState<Record<string, boolean>>({});
  const detailsRefs = useRef<Record<string, HTMLDetailsElement | null>>({});
  const barRef = useRef<HTMLDivElement>(null);
  const filterOpenRef = useRef<HTMLButtonElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const focusAfterLoad = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const labels = useMemo(() => {
    const out: Record<string, string> = {};
    category.flags.forEach((f) => (out[`flag:${f.value}`] = f.label));
    category.facets.forEach((g) =>
      g.options.forEach((o) => (out[`${g.name}:${o.value}`] = o.label)),
    );
    return out;
  }, [category]);

  const active = Object.values(state.filters).some((v) => v.length > 0);
  const list = useMemo(
    () =>
      sortCards(
        cards.filter((c) => matches(c, state.filters)),
        state.sort,
      ),
    [cards, state],
  );
  const editorial = !active && state.sort === 'rank';
  const n = list.length;
  const visible = Math.min(n, limit);
  const noun = category.noun || 'Models';
  const nounFor = (count: number) =>
    count === 1 ? noun.replace(/s$/, '') : noun;

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
        filterOpenRef.current?.focus({preventScroll: true});
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [panelOpen]);

  useEffect(() => {
    document.body.classList.toggle('filters-open', panelOpen);
    return () => document.body.classList.remove('filters-open');
  }, [panelOpen]);

  // After "Load more", move focus to the first newly shown product
  useEffect(() => {
    if (focusAfterLoad.current == null) return;
    const i = focusAfterLoad.current;
    focusAfterLoad.current = null;
    const target =
      gridRef.current?.querySelectorAll<HTMLElement>('.pcard .pname a')[i];
    target?.focus({preventScroll: true});
  }, [limit]);

  const toggle = (group: string, value: string) => {
    setState((s) => {
      const cur = s.filters[group] ?? [];
      const next = cur.includes(value)
        ? cur.filter((v) => v !== value)
        : [...cur, value];
      return {...s, filters: {...s.filters, [group]: next}};
    });
    setLimit(PAGE);
  };
  const clear = () => {
    setState((s) => ({...s, filters: {}}));
    setLimit(PAGE);
  };
  const quick = (spec: string) => {
    const [group, vals] = spec.split(':');
    setState((s) => ({...s, filters: {[group]: vals.split(',')}}));
    setLimit(PAGE);
    const d = detailsRefs.current[group];
    if (d) d.open = true;
    barRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'center',
    });
  };
  const setPanel = (open: boolean) => {
    setPanelOpen(open);
    if (open) panelCloseRef.current?.focus({preventScroll: true});
    else filterOpenRef.current?.focus({preventScroll: true});
  };

  // Lay out cards, with editorial tiles after their cards
  const items: Array<
    | {type: 'card'; card: ListingCard; hidden: boolean}
    | {type: 'tile'; tile: CatalogCategory['etiles'][number]; hidden: boolean}
  > = [];
  list.forEach((card, i) => {
    items.push({type: 'card', card, hidden: i >= limit});
    if (editorial) {
      category.etiles.forEach((tile) => {
        if (
          tile.after &&
          tile.after[0] === card.anchor[0] &&
          tile.after[1] === card.anchor[1]
        ) {
          items.push({type: 'tile', tile, hidden: i >= limit});
        }
      });
    }
  });
  if (editorial) {
    // Tiles whose card is missing still appear, at the end
    category.etiles.forEach((tile) => {
      if (!items.some((it) => it.type === 'tile' && it.tile === tile)) {
        items.push({type: 'tile', tile, hidden: n > limit});
      }
    });
  }

  const checkedChips = Object.entries(state.filters).flatMap(([g, vals]) =>
    vals.map((v) => ({group: g, value: v, label: labels[`${g}:${v}`] ?? v})),
  );

  return (
    <>
      <section className="plp-hero" aria-labelledby="plpTitle">
        <div className="media plp-hero-media">
          <img src={category.heroImage} alt={category.heroAlt} />
        </div>
        <div className="plp-hero-copy">
          <span className="kicker-dark">{category.kicker}</span>
          <h1 id="plpTitle">{category.title}</h1>
          <p>{category.intro}</p>
          <p id="heroMore" hidden={!heroMore}>
            {category.more}
          </p>
          <button
            type="button"
            className="readmore"
            aria-expanded={heroMore}
            aria-controls="heroMore"
            onClick={() => setHeroMore((o) => !o)}
          >
            {heroMore ? 'Read less' : 'Read more'}
          </button>
        </div>
      </section>

      <div className="wrap plp">
        <aside
          className="plp-side"
          id="filters"
          aria-label="Sort and filter"
        >
          <div className="fp-head">
            <h2>Filter &amp; Sort</h2>
            <button
              ref={panelCloseRef}
              className="icon-btn"
              type="button"
              aria-label="Close filters"
              onClick={() => setPanel(false)}
            >
              {CLOSE_ICON}
            </button>
          </div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-current="page">{category.title}</li>
            </ol>
          </nav>
          <fieldset className="block">
            <legend>Sort by</legend>
            {(
              [
                ['rank', 'Recommended'],
                ['asc', 'Price low to high'],
                ['desc', 'Price high to low'],
                ['new', 'Newest'],
              ] as const
            ).map(([value, label]) => (
              <label className="opt" key={value}>
                <input
                  type="radio"
                  name="sort"
                  value={value}
                  checked={state.sort === value}
                  onChange={() => {
                    setState((s) => ({...s, sort: value}));
                    setLimit(PAGE);
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          {category.flags.length ? (
            <fieldset className="block">
              <legend>Filter by</legend>
              {category.flags.map((f) => (
                <label className="opt" key={f.value}>
                  <input
                    type="checkbox"
                    name="flag"
                    value={f.value}
                    checked={(state.filters.flag ?? []).includes(f.value)}
                    onChange={() => toggle('flag', f.value)}
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </fieldset>
          ) : null}
          {category.facets.map((facet) => (
            <details
              className="facet"
              key={facet.name}
              open={facet.open}
              ref={(el) => {
                detailsRefs.current[facet.name] = el;
              }}
            >
              <summary>
                {facet.label}
                {CHEVRON}
              </summary>
              <fieldset>
                <legend className="sr-only">{facet.label}</legend>
                {facet.options.map((o) => (
                  <label className="opt" key={o.value}>
                    <input
                      type="checkbox"
                      name={facet.name}
                      value={o.value}
                      checked={(state.filters[facet.name] ?? []).includes(
                        o.value,
                      )}
                      onChange={() => toggle(facet.name, o.value)}
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </fieldset>
            </details>
          ))}
          <button
            type="button"
            className="clear-all"
            id="clearAll"
            hidden={!active}
            onClick={clear}
          >
            Clear all
          </button>
          <div className="fp-foot">
            <button
              type="button"
              className="btn-solid"
              id="applyBtn"
              onClick={() => setPanel(false)}
            >
              Show {n} {n === 1 ? 'result' : 'results'}
            </button>
          </div>
        </aside>

        <section className="plp-main" aria-labelledby="resultsTitle">
          <h2 className="sr-only" id="resultsTitle">
            Products
          </h2>
          <div className="plp-bar" ref={barRef}>
            <p className="count" id="count" aria-live="polite">
              {n} {nounFor(n)}
            </p>
            <div className="bar-right">
              <button
                ref={filterOpenRef}
                type="button"
                className="icon-btn filter-open"
                id="filterOpen"
                aria-controls="filters"
                aria-expanded={panelOpen}
                onClick={() => setPanel(true)}
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
                  <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
                  <circle cx="16" cy="7" r="2" />
                  <circle cx="8" cy="17" r="2" />
                </svg>
                <span className="lbl">Filter &amp; Sort</span>
              </button>
              <div className="views" role="group" aria-label="Layout">
                <button
                  type="button"
                  className="icon-btn view"
                  aria-pressed={view === 'grid'}
                  onClick={() => setView('grid')}
                >
                  <span className="lbl">Grid</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect width="6" height="6" />
                    <rect x="8" width="6" height="6" />
                    <rect y="8" width="6" height="6" />
                    <rect x="8" y="8" width="6" height="6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="icon-btn view"
                  aria-pressed={view === 'feed'}
                  onClick={() => setView('feed')}
                >
                  <span className="lbl">Feed</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <rect x=".5" y=".5" width="13" height="13" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="chips" id="chips">
            {checkedChips.map((chip) => (
              <button
                key={`${chip.group}:${chip.value}`}
                type="button"
                className="chip"
                aria-label={`Remove filter: ${chip.label}`}
                onClick={() => toggle(chip.group, chip.value)}
              >
                <span>{chip.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            ))}
          </div>
          <div
            className={`pgrid${view === 'feed' ? ' feed' : ''}`}
            id="grid"
            ref={gridRef}
          >
            {items.map((it, i) =>
              it.type === 'card' ? (
                <ProductCard
                  key={it.card.key}
                  card={it.card}
                  hidden={it.hidden}
                  eager={i < 4}
                  wished={Boolean(wished[it.card.key])}
                  onWish={() =>
                    setWished((w) => ({...w, [it.card.key]: !w[it.card.key]}))
                  }
                />
              ) : (
                <article
                  className="etile"
                  key={`tile-${it.tile.title}`}
                  hidden={it.hidden}
                >
                  <div className="media">
                    <img src={it.tile.image} alt={it.tile.alt} loading="lazy" />
                  </div>
                  <div className="etile-copy">
                    <h3>{it.tile.title}</h3>
                    <p>{it.tile.text}</p>
                    <CtaButton cta={it.tile.cta} onQuick={quick} />
                  </div>
                </article>
              ),
            )}
          </div>
          <div className="empty" id="empty" hidden={n > 0}>
            <p>No pieces match these filters.</p>
            <button type="button" className="cta" onClick={clear}>
              Clear all filters
            </button>
          </div>
          <div className="more" id="moreWrap" hidden={n === 0}>
            <p className="shown" id="shown">
              Showing {visible} of {n}
            </p>
            <div className="mbar" aria-hidden="true">
              <span style={{width: `${n ? (visible / n) * 100 : 0}%`}} />
            </div>
            <button
              type="button"
              className="btn-outline"
              hidden={visible >= n}
              onClick={() => {
                focusAfterLoad.current = limit;
                setLimit((l) => l + PAGE);
              }}
            >
              Load more
            </button>
          </div>
        </section>
      </div>

      <section
        className="modes"
        id={category.guide.id}
        aria-labelledby="guideTitle"
      >
        <div className="wrap">
          <div className="modes-head">
            <span className="kicker-dark">{category.guide.kicker}</span>
            <h2 id="guideTitle">{category.guide.title}</h2>
          </div>
          <div className="modes-grid">
            {category.guide.items.map((m) => (
              <div className="mode" key={m.title}>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <CtaButton cta={m.cta} onQuick={quick} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="fscrim" id="fscrim" onClick={() => setPanel(false)} />
    </>
  );
}

function CtaButton({
  cta,
  onQuick,
}: {
  cta: Cta | null;
  onQuick: (spec: string) => void;
}) {
  if (!cta) return null;
  if (cta.quick) {
    const spec = cta.quick;
    return (
      <button type="button" className="cta" onClick={() => onQuick(spec)}>
        {cta.label}
      </button>
    );
  }
  const href = cta.href ?? '#';
  return href.startsWith('/') ? (
    <Link to={href} className="cta">
      {cta.label}
    </Link>
  ) : (
    <a href={href} className="cta">
      {cta.label}
    </a>
  );
}

function ProductCard({
  card,
  hidden,
  eager,
  wished,
  onWish,
}: {
  card: ListingCard;
  hidden: boolean;
  eager: boolean;
  wished: boolean;
  onWish: () => void;
}) {
  return (
    <article className="pcard" hidden={hidden}>
      <Link
        to={card.href}
        className="pmedia"
        tabIndex={-1}
        aria-hidden="true"
        prefetch="intent"
      >
        <img
          src={card.image}
          alt=""
          width={800}
          height={800}
          loading={eager ? 'eager' : 'lazy'}
        />
      </Link>
      {card.badge ? <span className="badge">{card.badge}</span> : null}
      <button
        className="icon-btn wish"
        type="button"
        aria-pressed={wished}
        aria-label={`Save ${card.title} to wishlist`}
        onClick={onWish}
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
      <h3 className="pname">
        <Link to={card.href} prefetch="intent">
          {card.title}
        </Link>
      </h3>
      <p className="pspec">{card.spec}</p>
      <p className="pprice">
        {card.priceText}
        {!card.available ? <span className="sold"> · Sold out</span> : null}
      </p>
    </article>
  );
}
