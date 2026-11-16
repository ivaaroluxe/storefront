/**
 * Photos and films are served from ivaaro.com.
 * To host them in Shopify instead, upload them to Shopify (Content › Files)
 * and replace this base URL with the Shopify file URLs.
 */
export const ASSETS = 'https://ivaaro.com/assets';

export const assetImage = (file: string) => `${ASSETS}/images/${file}`;
export const assetVideo = (file: string) => `${ASSETS}/videos/${file}`;

export type Category = {
  /** Shopify collection handle: the collection's URL is /collections/<handle> */
  handle: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

/**
 * The six IVAARO collections, shown in the header, the menu drawer and the
 * homepage. Each links to a Shopify collection with the same handle.
 */
export const CATEGORIES: Category[] = [
  {
    handle: 'fine-writing-instruments',
    title: 'Fine Writing Instruments',
    description:
      'Elegant design, precision and a superior writing experience — from everyday essentials to statement pieces.',
    image: 'fountain-pen-black-gold.jpg',
    alt: 'Black and gold fountain pen',
  },
  {
    handle: 'leather-goods',
    title: 'Leather Goods',
    description:
      'Refined leather essentials that bring sophistication and functionality to the modern professional’s everyday.',
    image: 'bifold-wallet.jpg',
    alt: 'Brown leather bifold wallet',
  },
  {
    handle: 'bags-travel',
    title: 'Bags & Travel',
    description:
      'Stylish, functional bags and travel accessories that move effortlessly between work, travel and everyday journeys.',
    image: 'leather-satchel.jpg',
    alt: 'Brown leather satchel',
  },
  {
    handle: 'desk-stationery',
    title: 'Desk & Stationery',
    description:
      'Thoughtfully designed stationery and desk accessories for an organised, productive and inspiring workspace.',
    image: 'notebook-and-pen.jpg',
    alt: 'Notebook with a pen resting on top',
  },
  {
    handle: 'lifestyle-accessories',
    title: 'Lifestyle Accessories',
    description:
      'Curated personal accessories that reflect individuality, confidence and contemporary style — the finishing touches.',
    image: 'lifestyle-ring-book.jpg',
    alt: 'Silver ring resting on a green leather-bound book',
  },
  {
    handle: 'gifts-collections',
    title: 'Gifts & Collections',
    description:
      'Curated gift sets and exclusive collections for personal milestones and professional achievements.',
    image: 'gift-pen-wallet.jpg',
    alt: 'A pen and a leather wallet on a table',
  },
];
