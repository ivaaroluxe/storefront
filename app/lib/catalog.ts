/**
 * The IVAARO catalogue as designed on the static site: the six collections
 * (page copy, filters, editorial tiles, guides) and every product card with
 * its filter data and recommended order.
 *
 * Shopify stays the source of truth for prices, images, stock and checkout.
 * This data adds what Shopify doesn't hold: the per-card filter values,
 * the "Recommended" order, the editorial tiles and the page copy.
 */
import {CARD_DATA, CATEGORY_DATA, PRODUCT_DATA} from './catalog.data';

export type Cta = {label: string; quick?: string; href?: string};

export type CatalogCategory = {
  handle: string;
  title: string;
  kicker: string;
  intro: string;
  more: string;
  heroImage: string;
  heroAlt: string;
  /** "Models" in "16 Models" */
  noun: string;
  pageSize: number;
  flags: Array<{value: string; label: string}>;
  facets: Array<{
    name: string;
    label: string;
    open: boolean;
    options: Array<{value: string; label: string}>;
  }>;
  etiles: Array<{
    /** [product handle, card image] of the card the tile follows */
    after: [string, string] | null;
    image: string;
    alt: string;
    title: string;
    text: string;
    cta: Cta | null;
  }>;
  guide: {
    id: string;
    kicker: string;
    title: string;
    items: Array<{title: string; text: string; cta: Cta | null}>;
  };
};

export type CatalogCard = {
  cat: string;
  rank: number;
  handle: string;
  /** The value of the product's first option for this card, or null */
  value: string | null;
  title: string;
  spec: string;
  price: number;
  image: string;
  new: boolean;
  limited: boolean;
  badge: string | null;
  facets: Record<string, string>;
};

export type CatalogVariant = {
  value: string | null;
  sku: string;
  price: number;
  image: string;
  spec: string;
  pdpSpec?: string;
  gallery?: Array<[string, string]>;
};

export type CatalogProduct = {
  handle: string;
  title: string;
  homeCat: string;
  cats: string[];
  optionName: string;
  variants: CatalogVariant[];
  nibs?: Array<[string, string]>;
  nibDefault?: string;
};

export const CATEGORIES: CatalogCategory[] = CATEGORY_DATA;

export const NAV = CATEGORIES.map(({handle, title}) => ({handle, title}));

export function getCategory(handle?: string | null) {
  return CATEGORIES.find((c) => c.handle === handle) ?? null;
}

export function cardsFor(cat: string) {
  return CARD_DATA.filter((c) => c.cat === cat);
}

export function getCatalogProduct(handle?: string | null) {
  return PRODUCT_DATA.find((p) => p.handle === handle) ?? null;
}

/** The collection a product lives under, used for its URL and breadcrumb */
export function homeCategoryFor(handle: string, tags: string[] = []) {
  const fromCatalog = getCatalogProduct(handle)?.homeCat;
  if (fromCatalog) return fromCatalog;
  const fromTag = tags
    .map((t) => t.match(/^cat:(.+)$/)?.[1])
    .find((h) => h && h !== 'gifts-collections' && getCategory(h));
  return (
    fromTag ?? tags.map((t) => t.match(/^cat:(.+)$/)?.[1]).find(Boolean) ?? null
  );
}

/** /fine-writing-instruments/signature-fountain-pen?Finish=Black+resin */
export function productUrl(
  handle: string,
  options: {
    cat?: string | null;
    optionName?: string;
    value?: string | null;
    tags?: string[];
  } = {},
) {
  const cat = options.cat ?? homeCategoryFor(handle, options.tags);
  const base = cat ? `/${cat}/${handle}` : `/products/${handle}`;
  if (!options.value || !options.optionName) return base;
  const params = new URLSearchParams({[options.optionName]: options.value});
  return `${base}?${params.toString()}`;
}

/** Gift price bands used by the Gifts & Collections filter */
export function priceBand(price: number) {
  if (price < 10000) return 'u10';
  if (price <= 25000) return 'u25';
  if (price <= 50000) return 'u50';
  return 'o50';
}

const SWATCHES: Array<[RegExp, string]> = [
  [/ivory/i, '#e6dcc7'],
  [/night|midnight/i, '#1f2a44'],
  [/burgundy/i, '#5c1f2b'],
  [/green/i, '#2f4a3a'],
  [/sand|canvas|linen|kraft/i, '#cdb991'],
  [/cognac/i, '#8a4b25'],
  [/tan/i, '#b07a46'],
  [/palladium|silver/i, '#c7c9cc'],
  [/gold|brass/i, '#c9ae78'],
  [/black|noir|onyx|resin/i, '#1d1f24'],
];

/** A swatch colour for an option value such as "Night blue lacquer" */
export function swatchColour(value?: string | null) {
  if (!value) return '#d9cdb9';
  return SWATCHES.find(([re]) => re.test(value))?.[1] ?? '#d9cdb9';
}

/** "₹46,000" in Indian digit grouping */
export function formatINR(amount: number | string) {
  const n = Number(amount);
  return `₹${n.toLocaleString('en-IN', {maximumFractionDigits: n % 1 ? 2 : 0})}`;
}
