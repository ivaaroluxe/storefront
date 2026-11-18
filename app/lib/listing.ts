/**
 * Builds the product cards for a collection page by merging the catalogue
 * (filter values, recommended order, copy) with live Shopify products
 * (price, availability, images).
 */
import {
  cardsFor,
  formatINR,
  getCatalogProduct,
  priceBand,
  productUrl,
  type CatalogCategory,
} from './catalog';

export type ShopifyListingProduct = {
  id: string;
  handle: string;
  title: string;
  tags: string[];
  productType: string;
  description: string;
  createdAt: string;
  options: Array<{name: string}>;
  featuredImage?: {url: string; altText?: string | null} | null;
  variants: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
      selectedOptions: Array<{name: string; value: string}>;
      price: {amount: string; currencyCode: string};
      image?: {url: string; altText?: string | null} | null;
    }>;
  };
};

export type ListingCard = {
  key: string;
  handle: string;
  title: string;
  spec: string;
  price: number;
  priceText: string;
  image: string;
  href: string;
  rank: number;
  isNew: boolean;
  limited: boolean;
  badge: string | null;
  available: boolean;
  facets: Record<string, string>;
  /** [handle, image] used to place editorial tiles */
  anchor: [string, string];
};

function firstOptionValue(
  v: ShopifyListingProduct['variants']['nodes'][number],
) {
  const o = v.selectedOptions[0];
  return o && o.value !== 'Default Title' ? o.value : null;
}

/** Filter values from tags such as "mode:fountain" or "colour:black" */
function facetsFromTags(tags: string[]) {
  const out: Record<string, string> = {};
  for (const tag of tags) {
    const m = tag.match(/^([a-z]+):(.+)$/);
    if (!m || m[1] === 'cat') continue;
    out[m[1]] = out[m[1]] ? `${out[m[1]]} ${m[2]}` : m[2];
  }
  return out;
}

export function buildCards(
  category: CatalogCategory,
  shopify: ShopifyListingProduct[],
): ListingCard[] {
  const byHandle = new Map(shopify.map((p) => [p.handle, p]));
  const cards: ListingCard[] = [];
  const isGifts = category.handle === 'gifts-collections';

  // 1. Cards designed for this page
  for (const c of cardsFor(category.handle)) {
    const product = getCatalogProduct(c.handle);
    const live = byHandle.get(c.handle);
    const variant = live?.variants.nodes.find((v) =>
      c.value ? firstOptionValue(v) === c.value : true,
    );
    const price = variant ? Number(variant.price.amount) : c.price;
    const facets = {...c.facets};
    if (isGifts) facets.band = priceBand(price);
    cards.push({
      key: `${c.handle}|${c.image}`,
      handle: c.handle,
      title: live?.title ?? c.title,
      spec: c.spec,
      price,
      priceText: formatINR(price),
      image: c.image,
      href: productUrl(c.handle, {
        cat: product?.homeCat,
        optionName: live?.options[0]?.name ?? product?.optionName,
        value: c.value,
      }),
      rank: c.rank,
      isNew: c.new,
      limited: c.limited,
      badge: c.badge,
      available: variant ? variant.availableForSale : true,
      facets,
      anchor: [c.handle, c.image],
    });
  }

  // 2. Products added in Shopify later and tagged for this page
  const designed = new Set(cardsFor(category.handle).map((c) => c.handle));
  let rank = 1000;
  for (const p of shopify) {
    if (designed.has(p.handle)) continue;
    const seen = new Set<string | null>();
    for (const v of p.variants.nodes) {
      const value = firstOptionValue(v);
      if (seen.has(value)) continue;
      seen.add(value);
      const price = Number(v.price.amount);
      const facets = facetsFromTags(p.tags);
      if (isGifts) facets.band = priceBand(price);
      const image = v.image?.url ?? p.featuredImage?.url ?? '';
      cards.push({
        key: `${p.handle}|${value ?? ''}`,
        handle: p.handle,
        title: p.title,
        spec: value ?? p.productType ?? '',
        price,
        priceText: formatINR(price),
        image,
        href: productUrl(p.handle, {
          tags: p.tags,
          optionName: p.options[0]?.name,
          value,
        }),
        rank: rank++,
        isNew: p.tags.includes('new'),
        limited: p.tags.includes('limited'),
        badge: p.tags.includes('limited')
          ? 'Limited Edition'
          : p.tags.includes('new')
            ? 'New'
            : null,
        available: v.availableForSale,
        facets,
        anchor: [p.handle, image],
      });
    }
  }

  return cards;
}

export type ListingState = {
  sort: 'rank' | 'asc' | 'desc' | 'new';
  filters: Record<string, string[]>;
};

export function matches(card: ListingCard, filters: ListingState['filters']) {
  for (const [group, values] of Object.entries(filters)) {
    if (!values.length) continue;
    if (group === 'flag') {
      for (const v of values) {
        if (v === 'new' && !card.isNew) return false;
        if (v === 'limited' && !card.limited) return false;
      }
      continue;
    }
    const have = (card.facets[group] || '').split(' ');
    if (!values.some((v) => have.includes(v))) return false;
  }
  return true;
}

export function sortCards(list: ListingCard[], sort: ListingState['sort']) {
  const out = [...list];
  out.sort((a, b) => {
    if (sort === 'asc') return a.price - b.price || a.rank - b.rank;
    if (sort === 'desc') return b.price - a.price || a.rank - b.rank;
    if (sort === 'new')
      return Number(b.isNew) - Number(a.isNew) || a.rank - b.rank;
    return a.rank - b.rank;
  });
  return out;
}

/** Products tagged for a collection, e.g. tag:"cat:leather-goods" */
export const LISTING_QUERY = `#graphql
  query CategoryListing(
    $query: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 250, query: $query) {
      nodes {
        id
        handle
        title
        tags
        productType
        description
        createdAt
        options {
          name
        }
        featuredImage {
          url
          altText
        }
        variants(first: 100) {
          nodes {
            id
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;
