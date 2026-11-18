/**
 * Product page content that Shopify doesn't hold: the gallery and details
 * table for each product, plus care notes per collection.
 *
 * The Signature Fountain Pen uses the full content from the IVAARO static
 * site. Other products use sensible defaults built from the catalogue until
 * they get their own entry here.
 */
import {getCatalogProduct, getCategory, type CatalogProduct} from './catalog';
import {CARD_DATA} from './catalog.data';

export type DetailRow = [label: string, value: string];

type ProductExtras = {
  collectionLabel?: string;
  lede?: string;
  story?: string[];
  /** Rows of the details table. "{spec}" and "{ref}" follow the selection */
  details?: DetailRow[];
  care?: string;
  life?: {src: string; alt: string};
};

const EXTRAS: Record<string, ProductExtras> = {
  'signature-fountain-pen': {
    collectionLabel: 'Signature Collection',
    lede: 'Our flagship writing instrument. A generous barrel, a hand-finished 18K gold nib and gold-plated trims, balanced for long, unhurried writing.',
    story: [
      'The Signature Fountain Pen is where IVAARO began: a pen for the moments that deserve more than a signature in passing. The full-size barrel rests comfortably in the hand, and the cap posts securely for extra length and balance.',
      'Its 18K gold nib is finished and tested by hand, so it writes smoothly from the first stroke and softens to your hand over time. Choose a fine, medium or broad nib to suit the way you write.',
    ],
    details: [
      ['Collection', 'Signature'],
      ['Writing mode', 'Fountain pen'],
      ['Barrel and cap', '{spec}'],
      ['Nib', '18K solid gold, hand-finished; fine, medium or broad'],
      ['Trims', 'Gold-plated clip and rings'],
      ['Filling system', 'Ink cartridge or converter (both included)'],
      ['Length', '142 mm capped, 165 mm posted'],
      ['Weight', '32 g'],
      [
        'In the box',
        'IVAARO gift box, ink converter, two black ink cartridges, care guide',
      ],
      ['Reference', '{ref}'],
    ],
    care: 'Flush the nib with lukewarm water when you change ink colour, store the pen capped and upright, and wipe the barrel with a soft dry cloth. Our Client Care team can service your pen at any time.',
    life: {
      src: '/assets/images/signature-pen-nib.jpg',
      alt: 'A gold fountain pen nib writing on paper',
    },
  },
};

const CARE: Record<string, string> = {
  'fine-writing-instruments':
    'Store your pen capped, wipe the barrel with a soft dry cloth and replace refills before they run dry. Our Client Care team can service your pen at any time.',
  'leather-goods':
    'A little conditioner twice a year and a dry cloth for rain keep full-grain leather supple for years. Keep it away from direct heat and prolonged sunlight.',
  'bags-travel':
    'Empty and stuff your bag when it is not in use, and wipe the leather with a soft dry cloth. Condition leather twice a year to keep it supple.',
  'desk-stationery':
    'Wipe leather and brass with a soft dry cloth, and keep paper away from damp. Brass will develop a gentle patina over time.',
  'lifestyle-accessories':
    'Store each piece in its pouch and wipe it with a soft dry cloth after wear. Keep metal finishes away from perfume and moisture.',
  'gifts-collections':
    'Each piece in the set comes with its own care notes. Our Client Care team is happy to help with any question.',
};

const MODE_LABEL: Record<string, string> = {
  ballpoint: 'Ballpoint pen',
  rollerball: 'Rollerball pen',
  fountain: 'Fountain pen',
  pencil: 'Mechanical pencil',
};

/** Title-case a filter value such as "signature" */
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function productExtras(handle: string, homeCat: string | null) {
  const product = getCatalogProduct(handle);
  const category = getCategory(homeCat);
  const explicit = EXTRAS[handle] ?? {};

  // A card for this product carries its filter values (collection, mode ...)
  const facets = cardFacets(product);
  const line = facets.collection;

  const details: DetailRow[] = explicit.details ?? [
    ...(line ? [['Collection', titleCase(line)] as DetailRow] : []),
    ...(facets.mode && MODE_LABEL[facets.mode]
      ? [['Writing mode', MODE_LABEL[facets.mode]] as DetailRow]
      : []),
    ['Description', '{spec}'],
    ['Category', category?.title ?? 'IVAARO'],
    ['In the box', 'IVAARO gift box and care guide'],
    ['Reference', '{ref}'],
  ];

  return {
    collectionLabel:
      explicit.collectionLabel ??
      (line ? `${titleCase(line)} Collection` : (category?.title ?? 'IVAARO')),
    lede: explicit.lede,
    story: explicit.story,
    details,
    care:
      explicit.care ??
      CARE[homeCat ?? ''] ??
      'Wipe with a soft dry cloth. Our Client Care team can help with any care question.',
    life:
      explicit.life ??
      (category ? {src: category.heroImage, alt: category.heroAlt} : null),
    isWriting: homeCat === 'fine-writing-instruments',
  };
}

function cardFacets(product: CatalogProduct | null) {
  if (!product) return {} as Record<string, string>;
  return CARD_FACETS[product.handle] ?? {};
}

/** Filter values of each product's first card in its home collection */
const CARD_FACETS: Record<string, Record<string, string>> = {};
for (const c of CARD_DATA) {
  const p = getCatalogProduct(c.handle);
  if (p && c.cat === p.homeCat && !CARD_FACETS[c.handle]) {
    CARD_FACETS[c.handle] = c.facets;
  }
}
