// Generated from the ivaaro-website static site (November 2026).
// Product names, prices and copy are the sample content from that site.
import type {CatalogCard, CatalogCategory, CatalogProduct} from './catalog';

export const CATEGORY_DATA: CatalogCategory[] = [
 {
  "handle": "fine-writing-instruments",
  "title": "Fine Writing Instruments",
  "kicker": "The Art of Writing",
  "intro": "Ballpoint, rollerball, fountain pen and mechanical pencil. Every IVAARO writing instrument pairs modern design with balanced weight and a precise, dependable line.",
  "more": "From slim everyday companions to numbered limited editions, each piece is finished in lacquer, palladium or gold, and made to be refilled, used and kept for years.",
  "heroImage": "/assets/images/fwi-hero-handwriting.jpg",
  "heroAlt": "Fountain pen resting on a handwritten page beside an inkwell",
  "noun": "Models",
  "pageSize": 14,
  "flags": [
   {
    "value": "new",
    "label": "New"
   },
   {
    "value": "limited",
    "label": "Limited Edition"
   }
  ],
  "facets": [
   {
    "name": "mode",
    "label": "Writing Mode",
    "open": true,
    "options": [
     {
      "value": "ballpoint",
      "label": "Ballpoint Pens"
     },
     {
      "value": "rollerball",
      "label": "Rollerball Pens"
     },
     {
      "value": "fountain",
      "label": "Fountain Pens"
     },
     {
      "value": "pencil",
      "label": "Mechanical Pencils"
     }
    ]
   },
   {
    "name": "collection",
    "label": "Collection",
    "open": true,
    "options": [
     {
      "value": "signature",
      "label": "Signature"
     },
     {
      "value": "meridian",
      "label": "Meridian"
     },
     {
      "value": "monogram",
      "label": "Monogram"
     },
     {
      "value": "voyager",
      "label": "Voyager"
     },
     {
      "value": "noir",
      "label": "Noir"
     },
     {
      "value": "atelier",
      "label": "Atelier"
     }
    ]
   },
   {
    "name": "finish",
    "label": "Finish",
    "open": false,
    "options": [
     {
      "value": "gold",
      "label": "Gold Finish"
     },
     {
      "value": "palladium",
      "label": "Palladium Finish"
     }
    ]
   },
   {
    "name": "type",
    "label": "Category",
    "open": false,
    "options": [
     {
      "value": "pens",
      "label": "Pens & Pencils"
     },
     {
      "value": "sets",
      "label": "Pen Sets"
     },
     {
      "value": "refills",
      "label": "Refills & Inks"
     }
    ]
   }
  ],
  "etiles": [
   {
    "after": [
     "meridian-rollerball-pen",
     "/assets/images/pens/meridian-rollerball-black.svg"
    ],
    "image": "/assets/images/fwi-inkwell-quill.jpg",
    "alt": "Glass inkwell with a silver lid beside a feather quill",
    "title": "Refills & Inks",
    "text": "Keep every piece writing, with refills, cartridges and bottled ink made for IVAARO instruments.",
    "cta": {
     "label": "Shop Refills & Inks",
     "quick": "type:refills"
    }
   },
   {
    "after": [
     "voyager-compact-ballpoint-pen",
     "/assets/images/pens/voyager-ballpoint-sand.svg"
    ],
    "image": "/assets/images/fwi-rollerball-tip.jpg",
    "alt": "Close-up of a black rollerball pen tip on a desk",
    "title": "Find Your Writing Mode",
    "text": "Ballpoint, rollerball, fountain pen or pencil: each writes differently. See which suits the way you write.",
    "cta": {
     "label": "Compare Writing Modes",
     "href": "#modes"
    }
   }
  ],
  "guide": {
   "id": "modes",
   "kicker": "Writing Modes",
   "title": "Find the Way You Write.",
   "items": [
    {
     "title": "Ballpoint",
     "text": "Quick-drying oil-based ink and a firm, clean line. The dependable everyday choice for notes and signatures.",
     "cta": {
      "label": "Shop Ballpoint Pens",
      "quick": "mode:ballpoint"
     }
    },
    {
     "title": "Rollerball",
     "text": "Smooth water-based ink that glides with little pressure, giving a richer line than a ballpoint.",
     "cta": {
      "label": "Shop Rollerball Pens",
      "quick": "mode:rollerball"
     }
    },
    {
     "title": "Fountain Pen",
     "text": "A nib that responds to your hand. Expressive, personal and refillable with bottled ink or cartridges.",
     "cta": {
      "label": "Shop Fountain Pens",
      "quick": "mode:fountain"
     }
    },
    {
     "title": "Mechanical Pencil",
     "text": "A fine 0.7 mm lead for sketching, drafting and notes you may want to revise.",
     "cta": {
      "label": "Shop Mechanical Pencils",
      "quick": "mode:pencil"
     }
    }
   ]
  }
 },
 {
  "handle": "leather-goods",
  "title": "Leather Goods",
  "kicker": "Everyday Elegance",
  "intro": "Wallets, card holders and small leather goods in full-grain calfskin, cut to carry only what matters and finished by hand at the edges.",
  "more": "Each piece is lined, edge-painted and stitched to soften and keep its shape over years of daily use, in colours chosen to sit beside any IVAARO writing instrument.",
  "heroImage": "/assets/images/bifold-wallet.jpg",
  "heroAlt": "Brown leather bifold wallet",
  "noun": "Models",
  "pageSize": 12,
  "flags": [
   {
    "value": "new",
    "label": "New"
   }
  ],
  "facets": [
   {
    "name": "type",
    "label": "Category",
    "open": true,
    "options": [
     {
      "value": "wallets",
      "label": "Wallets"
     },
     {
      "value": "cardholders",
      "label": "Card Holders"
     },
     {
      "value": "travel",
      "label": "Passport & Travel"
     },
     {
      "value": "belts",
      "label": "Belts"
     },
     {
      "value": "keys",
      "label": "Key Holders"
     }
    ]
   },
   {
    "name": "colour",
    "label": "Colour",
    "open": true,
    "options": [
     {
      "value": "black",
      "label": "Black"
     },
     {
      "value": "cognac",
      "label": "Cognac"
     },
     {
      "value": "tan",
      "label": "Tan"
     },
     {
      "value": "night",
      "label": "Night Blue"
     },
     {
      "value": "green",
      "label": "Forest Green"
     },
     {
      "value": "burgundy",
      "label": "Burgundy"
     }
    ]
   },
   {
    "name": "material",
    "label": "Leather",
    "open": false,
    "options": [
     {
      "value": "smooth",
      "label": "Smooth Calfskin"
     },
     {
      "value": "grained",
      "label": "Grained Calfskin"
     }
    ]
   }
  ],
  "etiles": [
   {
    "after": [
     "compact-zip-wallet",
     "/assets/images/products/compact-zip-wallet-black.svg"
    ],
    "image": "/assets/images/service-leather-care.jpg",
    "alt": "Leather wallet with thread and scissors",
    "title": "Care for Your Leather",
    "text": "A little conditioner twice a year and a dry cloth for rain keep full-grain leather supple for years.",
    "cta": {
     "label": "Read Care Notes",
     "href": "#guide"
    }
   },
   {
    "after": [
     "classic-card-holder",
     "/assets/images/products/classic-cardholder-green.svg"
    ],
    "image": "/assets/images/card-holder.jpg",
    "alt": "Brown leather card holder held in a hand",
    "title": "Carry Less",
    "text": "A slim card holder holds what you use every day and nothing you don't.",
    "cta": {
     "label": "Shop Card Holders",
     "quick": "type:cardholders"
    }
   }
  ],
  "guide": {
   "id": "guide",
   "kicker": "Leather Care & Choice",
   "title": "Find the Right Piece.",
   "items": [
    {
     "title": "Wallets",
     "text": "Bifold, zip and long wallets for cards, notes and coins, in smooth or grained calfskin.",
     "cta": {
      "label": "Shop Wallets",
      "quick": "type:wallets"
     }
    },
    {
     "title": "Card Holders",
     "text": "The slimmest way to carry. Four slots, a centre pocket and nothing extra.",
     "cta": {
      "label": "Shop Card Holders",
      "quick": "type:cardholders"
     }
    },
    {
     "title": "Belts",
     "text": "Classic and reversible belts in 35 mm calfskin with brass or palladium-finish buckles.",
     "cta": {
      "label": "Shop Belts",
      "quick": "type:belts"
     }
    },
    {
     "title": "Passport & Travel",
     "text": "Passport covers and travel wallets that keep documents, cards and boarding passes together.",
     "cta": {
      "label": "Shop Travel Leather",
      "quick": "type:travel"
     }
    }
   ]
  }
 },
 {
  "handle": "bags-travel",
  "title": "Bags & Travel",
  "kicker": "Designed for Life on the Move",
  "intro": "Briefcases, totes, backpacks and weekenders made for the commute, the meeting and the journey in between.",
  "more": "Structured where it counts and light where it matters, each bag has a padded laptop or document section, metal hardware and an interior built around what professionals actually carry.",
  "heroImage": "/assets/images/leather-satchel.jpg",
  "heroAlt": "Brown leather satchel",
  "noun": "Models",
  "pageSize": 12,
  "flags": [
   {
    "value": "new",
    "label": "New"
   }
  ],
  "facets": [
   {
    "name": "type",
    "label": "Category",
    "open": true,
    "options": [
     {
      "value": "briefcases",
      "label": "Briefcases & Folios"
     },
     {
      "value": "totes",
      "label": "Totes & Shoulder Bags"
     },
     {
      "value": "backpacks",
      "label": "Backpacks"
     },
     {
      "value": "weekenders",
      "label": "Weekenders"
     },
     {
      "value": "accessories",
      "label": "Travel Accessories"
     }
    ]
   },
   {
    "name": "material",
    "label": "Material",
    "open": true,
    "options": [
     {
      "value": "leather",
      "label": "Leather"
     },
     {
      "value": "canvas",
      "label": "Canvas"
     },
     {
      "value": "nylon",
      "label": "Nylon"
     }
    ]
   },
   {
    "name": "colour",
    "label": "Colour",
    "open": false,
    "options": [
     {
      "value": "black",
      "label": "Black"
     },
     {
      "value": "cognac",
      "label": "Cognac"
     },
     {
      "value": "tan",
      "label": "Tan"
     },
     {
      "value": "night",
      "label": "Night Blue"
     },
     {
      "value": "green",
      "label": "Forest Green"
     },
     {
      "value": "sand",
      "label": "Sand"
     }
    ]
   }
  ],
  "etiles": [
   {
    "after": [
     "heritage-satchel",
     "/assets/images/products/heritage-satchel-tan.svg"
    ],
    "image": "/assets/images/document-folio.jpg",
    "alt": "Dark blue leather briefcase",
    "title": "For the Working Day",
    "text": "Briefcases and folios with padded laptop sections and room for documents, chargers and a pen.",
    "cta": {
     "label": "Shop Briefcases",
     "quick": "type:briefcases"
    }
   },
   {
    "after": [
     "crossbody-pouch",
     "/assets/images/products/crossbody-pouch-night.svg"
    ],
    "image": "/assets/images/service-workshop.jpg",
    "alt": "Workshop with a sewing machine and hanging leather goods",
    "title": "Built to Travel",
    "text": "Reinforced handles, metal zips and lined interiors made for years of departures.",
    "cta": {
     "label": "How to Choose",
     "href": "#guide"
    }
   }
  ],
  "guide": {
   "id": "guide",
   "kicker": "Choosing a Bag",
   "title": "Bags for Every Journey.",
   "items": [
    {
     "title": "Briefcases",
     "text": "Structured shapes for laptops and documents, from slim folios to two-compartment cases.",
     "cta": {
      "label": "Shop Briefcases",
      "quick": "type:briefcases"
     }
    },
    {
     "title": "Totes",
     "text": "Open, easy shoulder bags for the commute, with a zip pocket for the essentials.",
     "cta": {
      "label": "Shop Totes",
      "quick": "type:totes"
     }
    },
    {
     "title": "Backpacks",
     "text": "Hands-free carry with a padded laptop sleeve and quick-access front pocket.",
     "cta": {
      "label": "Shop Backpacks",
      "quick": "type:backpacks"
     }
    },
    {
     "title": "Weekenders",
     "text": "Generous duffles sized for two or three days away, in leather or canvas.",
     "cta": {
      "label": "Shop Weekenders",
      "quick": "type:weekenders"
     }
    }
   ]
  }
 },
 {
  "handle": "desk-stationery",
  "title": "Desk & Stationery",
  "kicker": "Inspire Your Everyday",
  "intro": "Journals, notebooks and desk accessories that bring order and a little ceremony to the place where you work and write.",
  "more": "Ivory pages chosen for fountain-pen ink, leather covers that wear in rather than out, and brass pieces with the weight to stay where you put them.",
  "heroImage": "/assets/images/notebook-and-pen.jpg",
  "heroAlt": "Notebook with a pen resting on top",
  "noun": "Models",
  "pageSize": 12,
  "flags": [
   {
    "value": "new",
    "label": "New"
   }
  ],
  "facets": [
   {
    "name": "type",
    "label": "Category",
    "open": true,
    "options": [
     {
      "value": "notebooks",
      "label": "Notebooks & Journals"
     },
     {
      "value": "desk",
      "label": "Desk Accessories"
     },
     {
      "value": "paper",
      "label": "Paper & Cards"
     }
    ]
   },
   {
    "name": "material",
    "label": "Material",
    "open": true,
    "options": [
     {
      "value": "leather",
      "label": "Leather"
     },
     {
      "value": "paper",
      "label": "Paper"
     },
     {
      "value": "brass",
      "label": "Brass"
     }
    ]
   }
  ],
  "etiles": [
   {
    "after": [
     "correspondence-cards",
     "/assets/images/products/correspondence-cards.svg"
    ],
    "image": "/assets/images/atelier-journal.jpg",
    "alt": "Green notebook on a wooden table",
    "title": "The Atelier Journal",
    "text": "A refillable leather journal with ivory pages that take fountain-pen ink without bleeding through.",
    "cta": {
     "label": "Shop Journals",
     "quick": "type:notebooks"
    }
   },
   {
    "after": [
     "pocket-notebooks",
     "/assets/images/products/pocket-notebooks-kraft.svg"
    ],
    "image": "/assets/images/fountain-pen-noir.jpg",
    "alt": "Black and silver fountain pen",
    "title": "Write It Down",
    "text": "Pair your journal with a fountain pen or rollerball from our writing collection.",
    "cta": {
     "label": "Shop Writing Instruments",
     "href": "../fine-writing-instruments/"
    }
   }
  ],
  "guide": {
   "id": "guide",
   "kicker": "At Your Desk",
   "title": "Build Your Desk.",
   "items": [
    {
     "title": "Notebooks & Journals",
     "text": "Leather journals, planners and pocket notebooks with pages made for ink.",
     "cta": {
      "label": "Shop Notebooks",
      "quick": "type:notebooks"
     }
    },
    {
     "title": "Desk Accessories",
     "text": "Desk pads, trays and organisers that keep the essentials in reach.",
     "cta": {
      "label": "Shop Desk Accessories",
      "quick": "type:desk"
     }
    },
    {
     "title": "Paper & Cards",
     "text": "Correspondence cards, refills and bookmarks for the writing you keep.",
     "cta": {
      "label": "Shop Paper & Cards",
      "quick": "type:paper"
     }
    },
    {
     "title": "Brass Pieces",
     "text": "Paperweights, pen stands and letter openers with the weight to stay put.",
     "cta": {
      "label": "Shop Brass",
      "quick": "material:brass"
     }
    }
   ]
  }
 },
 {
  "handle": "lifestyle-accessories",
  "title": "Lifestyle Accessories",
  "kicker": "The Details Define You",
  "intro": "Cufflinks, tie bars, key rings and cases: the small finishing pieces that say the most about personal style.",
  "more": "Palladium and gold finishes match our writing instruments, and the leather pieces share the calfskin and stitching of our leather goods, so everything you carry belongs together.",
  "heroImage": "/assets/images/service-appointment.jpg",
  "heroAlt": "Leather wallet, belt and shoes laid out together",
  "noun": "Models",
  "pageSize": 12,
  "flags": [
   {
    "value": "new",
    "label": "New"
   }
  ],
  "facets": [
   {
    "name": "type",
    "label": "Category",
    "open": true,
    "options": [
     {
      "value": "cufflinks",
      "label": "Cufflinks"
     },
     {
      "value": "tie",
      "label": "Tie Bars & Pins"
     },
     {
      "value": "keyrings",
      "label": "Key Rings"
     },
     {
      "value": "cases",
      "label": "Cases & Rolls"
     },
     {
      "value": "tech",
      "label": "Tech Accessories"
     }
    ]
   },
   {
    "name": "finish",
    "label": "Finish",
    "open": true,
    "options": [
     {
      "value": "palladium",
      "label": "Palladium Finish"
     },
     {
      "value": "gold",
      "label": "Gold Finish"
     },
     {
      "value": "leather",
      "label": "Leather"
     }
    ]
   }
  ],
  "etiles": [
   {
    "after": [
     "watch-roll",
     "/assets/images/products/watch-roll-black.svg"
    ],
    "image": "/assets/images/service-workshop.jpg",
    "alt": "Workshop with a sewing machine and hanging leather goods",
    "title": "Finishing Touches",
    "text": "Cufflinks, tie bars and key rings in the same palladium and gold finishes as our pens.",
    "cta": {
     "label": "Shop Cufflinks",
     "quick": "type:cufflinks"
    }
   },
   {
    "after": [
     "earphone-case",
     "/assets/images/products/earphone-case-tan.svg"
    ],
    "image": "/assets/images/fountain-pen-black-gold.jpg",
    "alt": "Black and gold fountain pen",
    "title": "Pair with a Pen",
    "text": "A gold-finish tie bar beside a Signature fountain pen: details that belong together.",
    "cta": {
     "label": "Shop Writing Instruments",
     "href": "../fine-writing-instruments/"
    }
   }
  ],
  "guide": {
   "id": "guide",
   "kicker": "Small Details",
   "title": "The Finishing Touch.",
   "items": [
    {
     "title": "Cufflinks",
     "text": "Round cufflinks in palladium or gold finish, with onyx, mother-of-pearl or engraved faces.",
     "cta": {
      "label": "Shop Cufflinks",
      "quick": "type:cufflinks"
     }
    },
    {
     "title": "Tie Bars & Pins",
     "text": "Tie bars, lapel pins and collar stays for a sharp, considered collar.",
     "cta": {
      "label": "Shop Tie Bars",
      "quick": "type:tie"
     }
    },
    {
     "title": "Key Rings",
     "text": "Metal and leather key rings that sit neatly in a pocket or bag.",
     "cta": {
      "label": "Shop Key Rings",
      "quick": "type:keyrings"
     }
    },
    {
     "title": "Cases & Tech",
     "text": "Glasses cases, watch rolls and leather sleeves for everyday devices.",
     "cta": {
      "label": "Shop Cases",
      "quick": "type:cases"
     }
    }
   ]
  }
 },
 {
  "handle": "gifts-collections",
  "title": "Gifts & Collections",
  "kicker": "Make Every Moment Memorable",
  "intro": "Curated gift sets and thoughtfully selected pieces for birthdays, milestones, thank-yous and the people you work with.",
  "more": "Browse by price or by type, from a single card holder to a complete corporate gift box, and find something for every occasion and budget.",
  "heroImage": "/assets/images/gift-pen-wallet.jpg",
  "heroAlt": "A pen and a leather wallet on a table",
  "noun": "Models",
  "pageSize": 12,
  "flags": [
   {
    "value": "new",
    "label": "New"
   }
  ],
  "facets": [
   {
    "name": "band",
    "label": "Price",
    "open": true,
    "options": [
     {
      "value": "u10",
      "label": "Under ₹10,000"
     },
     {
      "value": "u25",
      "label": "₹10,000 – ₹25,000"
     },
     {
      "value": "u50",
      "label": "₹25,000 – ₹50,000"
     },
     {
      "value": "o50",
      "label": "Above ₹50,000"
     }
    ]
   },
   {
    "name": "type",
    "label": "Gift Type",
    "open": true,
    "options": [
     {
      "value": "sets",
      "label": "Gift Sets"
     },
     {
      "value": "writing",
      "label": "Writing Gifts"
     },
     {
      "value": "leather",
      "label": "Leather Gifts"
     },
     {
      "value": "accessories",
      "label": "Accessories"
     },
     {
      "value": "corporate",
      "label": "Corporate Gifts"
     },
     {
      "value": "cards",
      "label": "Gift Cards"
     }
    ]
   }
  ],
  "etiles": [
   {
    "after": [
     "executive-desk-set",
     "/assets/images/products/gift-desk-set.svg"
    ],
    "image": "/assets/images/signature-pen-nib.jpg",
    "alt": "Gold fountain pen with an engraved nib",
    "title": "Gifts That Write",
    "text": "A fine pen is a gift that is used every day. Explore writing gifts at every price.",
    "cta": {
     "label": "Shop Writing Gifts",
     "quick": "type:writing"
    }
   },
   {
    "after": [
     "heritage-bifold-wallet",
     "/assets/images/products/heritage-bifold-cognac.svg"
    ],
    "image": "/assets/images/service-appointment.jpg",
    "alt": "Leather wallet, belt and shoes laid out together",
    "title": "Gifting for Teams",
    "text": "Corporate gift boxes for clients, milestones and teams, built from our pens, journals and leather.",
    "cta": {
     "label": "Shop Corporate Gifts",
     "quick": "type:corporate"
    }
   }
  ],
  "guide": {
   "id": "guide",
   "kicker": "Gift Guide",
   "title": "Gifting Made Simple.",
   "items": [
    {
     "title": "Under ₹10,000",
     "text": "Card holders, journals, key rings and everyday pens: thoughtful and easy to give.",
     "cta": {
      "label": "Shop Under ₹10,000",
      "quick": "band:u10"
     }
    },
    {
     "title": "₹10,000 – ₹25,000",
     "text": "Gift sets, wallets and cufflinks for birthdays, promotions and thank-yous.",
     "cta": {
      "label": "Shop ₹10,000 – ₹25,000",
      "quick": "band:u25"
     }
    },
    {
     "title": "Special Occasions",
     "text": "Fountain pens, pen sets and weekenders for the milestones that deserve more.",
     "cta": {
      "label": "Shop Above ₹25,000",
      "quick": "band:u50,o50"
     }
    },
    {
     "title": "Corporate Gifts",
     "text": "Gift boxes for clients and teams, combining writing instruments and leather.",
     "cta": {
      "label": "Shop Corporate Gifts",
      "quick": "type:corporate"
     }
    }
   ]
  }
 }
];

export const CARD_DATA: CatalogCard[] = [
 {
  "cat": "fine-writing-instruments",
  "rank": 1,
  "handle": "signature-fountain-pen",
  "value": "Black resin",
  "title": "Signature Fountain Pen",
  "spec": "Black resin, 18K gold nib, gold finish",
  "price": 46000,
  "image": "/assets/images/pens/signature-fountain-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "fountain",
   "collection": "signature",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 2,
  "handle": "meridian-ballpoint-pen",
  "value": "Black lacquer",
  "title": "Meridian Ballpoint Pen",
  "spec": "Black lacquer, palladium finish",
  "price": 8900,
  "image": "/assets/images/pens/meridian-ballpoint-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "ballpoint",
   "collection": "meridian",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 3,
  "handle": "monogram-ballpoint-pen",
  "value": "Palladium finish",
  "title": "Monogram Ballpoint Pen",
  "spec": "Engraved metal, palladium finish",
  "price": 21000,
  "image": "/assets/images/pens/monogram-ballpoint-pall.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "mode": "ballpoint",
   "collection": "monogram",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 4,
  "handle": "meridian-ballpoint-pen",
  "value": "Night blue lacquer",
  "title": "Meridian Ballpoint Pen",
  "spec": "Night blue lacquer, palladium finish",
  "price": 8900,
  "image": "/assets/images/pens/meridian-ballpoint-night.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "ballpoint",
   "collection": "meridian",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 5,
  "handle": "signature-fountain-pen",
  "value": "Ivory lacquer",
  "title": "Signature Fountain Pen",
  "spec": "Ivory lacquer, 18K gold nib, gold finish",
  "price": 48000,
  "image": "/assets/images/pens/signature-fountain-ivory.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "mode": "fountain",
   "collection": "signature",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 6,
  "handle": "meridian-rollerball-pen",
  "value": null,
  "title": "Meridian Rollerball Pen",
  "spec": "Black lacquer, gold finish",
  "price": 10500,
  "image": "/assets/images/pens/meridian-rollerball-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "rollerball",
   "collection": "meridian",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 7,
  "handle": "atelier-fountain-pen",
  "value": null,
  "title": "Atelier Fountain Pen",
  "spec": "Limited edition of 250, night blue lacquer, 18K gold nib",
  "price": 125000,
  "image": "/assets/images/pens/atelier-fountain-limited.svg",
  "new": true,
  "limited": true,
  "badge": "Limited Edition",
  "facets": {
   "mode": "fountain",
   "collection": "atelier",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 8,
  "handle": "meridian-ballpoint-pen",
  "value": "Burgundy lacquer",
  "title": "Meridian Ballpoint Pen",
  "spec": "Burgundy lacquer, gold finish",
  "price": 9500,
  "image": "/assets/images/pens/meridian-ballpoint-burgundy.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "ballpoint",
   "collection": "meridian",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 9,
  "handle": "noir-fountain-pen",
  "value": null,
  "title": "Noir Fountain Pen",
  "spec": "Matte black lacquer, steel nib, palladium finish",
  "price": 18500,
  "image": "/assets/images/pens/noir-fountain-matte.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "fountain",
   "collection": "noir",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 10,
  "handle": "monogram-ballpoint-pen",
  "value": "Gold finish",
  "title": "Monogram Ballpoint Pen",
  "spec": "Engraved metal, gold finish",
  "price": 23500,
  "image": "/assets/images/pens/monogram-ballpoint-gold.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "ballpoint",
   "collection": "monogram",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 11,
  "handle": "voyager-compact-ballpoint-pen",
  "value": "Forest green lacquer",
  "title": "Voyager Compact Ballpoint Pen",
  "spec": "Forest green lacquer, palladium finish",
  "price": 7500,
  "image": "/assets/images/pens/voyager-ballpoint-green.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "mode": "ballpoint",
   "collection": "voyager",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 12,
  "handle": "signature-rollerball-pen",
  "value": null,
  "title": "Signature Rollerball Pen",
  "spec": "Black resin, gold finish",
  "price": 32000,
  "image": "/assets/images/pens/signature-rollerball-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "rollerball",
   "collection": "signature",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 13,
  "handle": "meridian-fountain-pen",
  "value": null,
  "title": "Meridian Fountain Pen",
  "spec": "Night blue lacquer, steel nib, palladium finish",
  "price": 14500,
  "image": "/assets/images/pens/meridian-fountain-night.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "fountain",
   "collection": "meridian",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 14,
  "handle": "monogram-rollerball-pen",
  "value": null,
  "title": "Monogram Rollerball Pen",
  "spec": "Engraved metal, palladium finish",
  "price": 24500,
  "image": "/assets/images/pens/monogram-rollerball-pall.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "rollerball",
   "collection": "monogram",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 15,
  "handle": "signature-pen-set",
  "value": null,
  "title": "Signature Pen Set",
  "spec": "Fountain and ballpoint pens in a cognac leather case",
  "price": 72000,
  "image": "/assets/images/pens/signature-pen-set.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "fountain ballpoint",
   "collection": "signature",
   "finish": "gold",
   "type": "sets"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 16,
  "handle": "voyager-compact-ballpoint-pen",
  "value": "Sand lacquer",
  "title": "Voyager Compact Ballpoint Pen",
  "spec": "Sand lacquer, gold finish",
  "price": 7500,
  "image": "/assets/images/pens/voyager-ballpoint-sand.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "ballpoint",
   "collection": "voyager",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 17,
  "handle": "meridian-mechanical-pencil",
  "value": null,
  "title": "Meridian Mechanical Pencil",
  "spec": "0.7 mm lead, black lacquer, palladium finish",
  "price": 7900,
  "image": "/assets/images/pens/meridian-pencil-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "pencil",
   "collection": "meridian",
   "finish": "palladium",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 18,
  "handle": "monogram-mechanical-pencil",
  "value": null,
  "title": "Monogram Mechanical Pencil",
  "spec": "0.7 mm lead, engraved metal, gold finish",
  "price": 19500,
  "image": "/assets/images/pens/monogram-pencil-gold.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "pencil",
   "collection": "monogram",
   "finish": "gold",
   "type": "pens"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 19,
  "handle": "fountain-pen-ink",
  "value": null,
  "title": "Fountain Pen Ink",
  "spec": "Night blue, 50 ml bottle",
  "price": 1800,
  "image": "/assets/images/pens/ink-bottle-night.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "",
   "collection": "",
   "finish": "",
   "type": "refills"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 20,
  "handle": "ink-cartridges",
  "value": null,
  "title": "Ink Cartridges",
  "spec": "Black ink, pack of 6",
  "price": 650,
  "image": "/assets/images/pens/ink-cartridges-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "",
   "collection": "",
   "finish": "",
   "type": "refills"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 21,
  "handle": "rollerball-refills",
  "value": null,
  "title": "Rollerball Refills",
  "spec": "Black ink, medium tip, pack of 2",
  "price": 950,
  "image": "/assets/images/pens/rollerball-refill-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "",
   "collection": "",
   "finish": "",
   "type": "refills"
  }
 },
 {
  "cat": "fine-writing-instruments",
  "rank": 22,
  "handle": "ballpoint-refill",
  "value": null,
  "title": "Ballpoint Refill",
  "spec": "Blue ink, medium tip",
  "price": 750,
  "image": "/assets/images/pens/ballpoint-refill-blue.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "mode": "",
   "collection": "",
   "finish": "",
   "type": "refills"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 1,
  "handle": "heritage-bifold-wallet",
  "value": "Cognac calfskin",
  "title": "Heritage Bifold Wallet",
  "spec": "Cognac calfskin, hand-stitched edges",
  "price": 14500,
  "image": "/assets/images/products/heritage-bifold-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "wallets",
   "colour": "cognac",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 2,
  "handle": "classic-card-holder",
  "value": "Tan full-grain calfskin",
  "title": "Classic Card Holder",
  "spec": "Tan full-grain calfskin, four card slots",
  "price": 7900,
  "image": "/assets/images/products/classic-cardholder-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cardholders",
   "colour": "tan",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 3,
  "handle": "travel-wallet",
  "value": null,
  "title": "Travel Wallet",
  "spec": "Night blue grained calfskin, passport and boarding pass",
  "price": 19500,
  "image": "/assets/images/products/travel-wallet-night.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "travel",
   "colour": "night",
   "material": "grained"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 4,
  "handle": "classic-belt",
  "value": null,
  "title": "Classic Belt",
  "spec": "Cognac calfskin, 35 mm, brass-finish buckle",
  "price": 14000,
  "image": "/assets/images/products/classic-belt-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "belts",
   "colour": "cognac",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 5,
  "handle": "classic-card-holder",
  "value": "Night blue calfskin",
  "title": "Classic Card Holder",
  "spec": "Night blue calfskin, four card slots",
  "price": 7900,
  "image": "/assets/images/products/classic-cardholder-night.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "cardholders",
   "colour": "night",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 6,
  "handle": "compact-zip-wallet",
  "value": null,
  "title": "Compact Zip Wallet",
  "spec": "Black grained calfskin, coin pocket",
  "price": 11500,
  "image": "/assets/images/products/compact-zip-wallet-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "wallets",
   "colour": "black",
   "material": "grained"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 7,
  "handle": "heritage-bifold-wallet",
  "value": "Black calfskin",
  "title": "Heritage Bifold Wallet",
  "spec": "Black calfskin, hand-stitched edges",
  "price": 14500,
  "image": "/assets/images/products/heritage-bifold-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "wallets",
   "colour": "black",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 8,
  "handle": "money-clip-card-holder",
  "value": null,
  "title": "Money Clip Card Holder",
  "spec": "Black calfskin, palladium-finish clip",
  "price": 9500,
  "image": "/assets/images/products/money-clip-cardholder.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "cardholders",
   "colour": "black",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 9,
  "handle": "passport-cover",
  "value": null,
  "title": "Passport Cover",
  "spec": "Cognac calfskin, two card slots",
  "price": 8500,
  "image": "/assets/images/products/passport-cover-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "travel",
   "colour": "cognac",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 10,
  "handle": "long-wallet",
  "value": null,
  "title": "Long Wallet",
  "spec": "Burgundy calfskin, twelve card slots",
  "price": 18000,
  "image": "/assets/images/products/long-wallet-burgundy.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "wallets",
   "colour": "burgundy",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 11,
  "handle": "reversible-belt",
  "value": null,
  "title": "Reversible Belt",
  "spec": "Black and cognac calfskin, palladium-finish buckle",
  "price": 16000,
  "image": "/assets/images/products/reversible-belt-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "belts",
   "colour": "black cognac",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 12,
  "handle": "classic-card-holder",
  "value": "Forest green calfskin",
  "title": "Classic Card Holder",
  "spec": "Forest green calfskin, four card slots",
  "price": 7900,
  "image": "/assets/images/products/classic-cardholder-green.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cardholders",
   "colour": "green",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 13,
  "handle": "key-holder",
  "value": null,
  "title": "Key Holder",
  "spec": "Black calfskin, six key hooks",
  "price": 6500,
  "image": "/assets/images/products/key-holder-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "keys",
   "colour": "black",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 14,
  "handle": "coin-purse",
  "value": null,
  "title": "Coin Purse",
  "spec": "Tan calfskin, brass-finish zip",
  "price": 5500,
  "image": "/assets/images/products/coin-purse-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "wallets",
   "colour": "tan",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 15,
  "handle": "slim-card-sleeve",
  "value": null,
  "title": "Slim Card Sleeve",
  "spec": "Burgundy calfskin, two card slots",
  "price": 5900,
  "image": "/assets/images/products/card-sleeve-burgundy.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cardholders",
   "colour": "burgundy",
   "material": "smooth"
  }
 },
 {
  "cat": "leather-goods",
  "rank": 16,
  "handle": "key-ring-fob",
  "value": null,
  "title": "Key Ring Fob",
  "spec": "Tan calfskin loop, brass-finish ring",
  "price": 3900,
  "image": "/assets/images/products/key-fob-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "keys",
   "colour": "tan",
   "material": "smooth"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 1,
  "handle": "voyage-document-folio",
  "value": null,
  "title": "Voyage Document Folio",
  "spec": "Midnight blue leather, detachable strap",
  "price": 32000,
  "image": "/assets/images/products/voyage-folio-night.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "briefcases",
   "colour": "night",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 2,
  "handle": "voyage-slim-briefcase",
  "value": null,
  "title": "Voyage Slim Briefcase",
  "spec": "Black calfskin, fits a 14-inch laptop",
  "price": 48000,
  "image": "/assets/images/products/voyage-slim-briefcase-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "briefcases",
   "colour": "black",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 3,
  "handle": "everyday-tote",
  "value": "Black grained calfskin",
  "title": "Everyday Tote",
  "spec": "Black grained calfskin, zip inner pocket",
  "price": 34000,
  "image": "/assets/images/products/everyday-tote-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "totes",
   "colour": "black",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 4,
  "handle": "city-backpack",
  "value": "Black grained calfskin",
  "title": "City Backpack",
  "spec": "Black grained calfskin, padded laptop sleeve",
  "price": 42000,
  "image": "/assets/images/products/city-backpack-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "backpacks",
   "colour": "black",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 5,
  "handle": "weekender-duffle",
  "value": "Cognac leather",
  "title": "Weekender Duffle",
  "spec": "Cognac leather, 45-litre capacity",
  "price": 62000,
  "image": "/assets/images/products/weekender-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "weekenders",
   "colour": "cognac",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 6,
  "handle": "heritage-satchel",
  "value": null,
  "title": "Heritage Satchel",
  "spec": "Tan leather, twin buckles, adjustable strap",
  "price": 38000,
  "image": "/assets/images/products/heritage-satchel-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "totes",
   "colour": "tan",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 7,
  "handle": "voyage-briefcase",
  "value": null,
  "title": "Voyage Briefcase",
  "spec": "Cognac calfskin, two compartments",
  "price": 52000,
  "image": "/assets/images/products/voyage-briefcase-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "briefcases",
   "colour": "cognac",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 8,
  "handle": "everyday-tote",
  "value": "Sand canvas with cognac leather trim",
  "title": "Everyday Tote",
  "spec": "Sand canvas with cognac leather trim",
  "price": 18500,
  "image": "/assets/images/products/everyday-tote-canvas.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "totes",
   "colour": "sand",
   "material": "canvas"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 9,
  "handle": "city-backpack",
  "value": "Night blue nylon with cognac leather trim",
  "title": "City Backpack",
  "spec": "Night blue nylon with cognac leather trim",
  "price": 24000,
  "image": "/assets/images/products/city-backpack-nylon.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "backpacks",
   "colour": "night",
   "material": "nylon"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 10,
  "handle": "messenger-bag",
  "value": null,
  "title": "Messenger Bag",
  "spec": "Black calfskin, magnetic flap",
  "price": 36000,
  "image": "/assets/images/products/messenger-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "briefcases",
   "colour": "black",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 11,
  "handle": "weekender-duffle",
  "value": "Forest green canvas with tan leather ends",
  "title": "Weekender Duffle",
  "spec": "Forest green canvas with tan leather ends",
  "price": 29000,
  "image": "/assets/images/products/weekender-canvas-green.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "weekenders",
   "colour": "green",
   "material": "canvas"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 12,
  "handle": "crossbody-pouch",
  "value": null,
  "title": "Crossbody Pouch",
  "spec": "Night blue grained calfskin",
  "price": 14000,
  "image": "/assets/images/products/crossbody-pouch-night.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "totes",
   "colour": "night",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 13,
  "handle": "laptop-sleeve",
  "value": null,
  "title": "Laptop Sleeve",
  "spec": "Black calfskin, zip closure, 14-inch",
  "price": 12500,
  "image": "/assets/images/products/laptop-sleeve-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "accessories",
   "colour": "black",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 14,
  "handle": "tech-pouch",
  "value": null,
  "title": "Tech Pouch",
  "spec": "Black grained calfskin, cable organiser",
  "price": 6900,
  "image": "/assets/images/products/tech-pouch-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "accessories",
   "colour": "black",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 15,
  "handle": "toiletry-case",
  "value": null,
  "title": "Toiletry Case",
  "spec": "Cognac leather, water-resistant lining",
  "price": 9500,
  "image": "/assets/images/products/toiletry-case-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "accessories",
   "colour": "cognac",
   "material": "leather"
  }
 },
 {
  "cat": "bags-travel",
  "rank": 16,
  "handle": "luggage-tag",
  "value": null,
  "title": "Luggage Tag",
  "spec": "Tan calfskin, brass-finish eyelet",
  "price": 2900,
  "image": "/assets/images/products/luggage-tag-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "accessories",
   "colour": "tan",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 1,
  "handle": "atelier-a5-journal",
  "value": "Forest green leather cover",
  "title": "Atelier A5 Journal",
  "spec": "Forest green leather cover, 192 ivory pages",
  "price": 4500,
  "image": "/assets/images/products/atelier-journal-green.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "notebooks",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 2,
  "handle": "leather-desk-pad",
  "value": null,
  "title": "Leather Desk Pad",
  "spec": "Black calfskin, 80 × 40 cm",
  "price": 16500,
  "image": "/assets/images/products/desk-pad-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "desk",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 3,
  "handle": "pen-and-journal-set",
  "value": null,
  "title": "Pen & Journal Set",
  "spec": "Rollerball pen with refillable A5 journal",
  "price": 22000,
  "image": "/assets/images/products/pen-journal-set.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "notebooks",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 4,
  "handle": "pen-stand",
  "value": null,
  "title": "Pen Stand",
  "spec": "Brass and marble base",
  "price": 7500,
  "image": "/assets/images/products/pen-stand-brass.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "desk",
   "material": "brass"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 5,
  "handle": "atelier-a5-journal",
  "value": "Black leather cover",
  "title": "Atelier A5 Journal",
  "spec": "Black leather cover, 192 ivory pages",
  "price": 4500,
  "image": "/assets/images/products/atelier-journal-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "notebooks",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 6,
  "handle": "correspondence-cards",
  "value": null,
  "title": "Correspondence Cards",
  "spec": "Set of 20 ivory cards with envelopes",
  "price": 2400,
  "image": "/assets/images/products/correspondence-cards.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "paper",
   "material": "paper"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 7,
  "handle": "pen-tray",
  "value": null,
  "title": "Pen Tray",
  "spec": "Cognac leather, holds up to four pens",
  "price": 5900,
  "image": "/assets/images/products/pen-tray-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "desk",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 8,
  "handle": "atelier-a5-journal",
  "value": "Cognac leather cover",
  "title": "Atelier A5 Journal",
  "spec": "Cognac leather cover, 192 ivory pages",
  "price": 4500,
  "image": "/assets/images/products/atelier-journal-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "notebooks",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 9,
  "handle": "desk-organiser",
  "value": null,
  "title": "Desk Organiser",
  "spec": "Cognac leather, three compartments",
  "price": 9800,
  "image": "/assets/images/products/desk-organiser-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "desk",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 10,
  "handle": "weekly-planner",
  "value": null,
  "title": "Weekly Planner",
  "spec": "Night blue linen cover, undated",
  "price": 3200,
  "image": "/assets/images/products/weekly-planner-linen.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "notebooks",
   "material": "paper"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 11,
  "handle": "letter-opener",
  "value": null,
  "title": "Letter Opener",
  "spec": "Solid brass",
  "price": 3900,
  "image": "/assets/images/products/letter-opener-brass.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "desk",
   "material": "brass"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 12,
  "handle": "pocket-notebooks",
  "value": null,
  "title": "Pocket Notebooks",
  "spec": "A6, set of three kraft covers",
  "price": 1500,
  "image": "/assets/images/products/pocket-notebooks-kraft.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "notebooks",
   "material": "paper"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 13,
  "handle": "document-tray",
  "value": null,
  "title": "Document Tray",
  "spec": "Tan leather, A4",
  "price": 8900,
  "image": "/assets/images/products/document-tray-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "desk",
   "material": "leather"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 14,
  "handle": "paperweight",
  "value": null,
  "title": "Paperweight",
  "spec": "Solid brass dome",
  "price": 4500,
  "image": "/assets/images/products/paperweight-brass.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "desk",
   "material": "brass"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 15,
  "handle": "a5-refill-pages",
  "value": null,
  "title": "A5 Refill Pages",
  "spec": "Ruled ivory paper, 192 pages",
  "price": 950,
  "image": "/assets/images/products/refill-pages-a5.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "paper",
   "material": "paper"
  }
 },
 {
  "cat": "desk-stationery",
  "rank": 16,
  "handle": "leather-bookmark",
  "value": null,
  "title": "Leather Bookmark",
  "spec": "Cognac calfskin, hand-stitched",
  "price": 1200,
  "image": "/assets/images/products/bookmark-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "paper",
   "material": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 1,
  "handle": "signature-cufflinks",
  "value": "Palladium finish",
  "title": "Signature Cufflinks",
  "spec": "Palladium finish, onyx",
  "price": 12500,
  "image": "/assets/images/products/signature-cufflinks-pall.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cufflinks",
   "finish": "palladium"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 2,
  "handle": "tie-bar",
  "value": "Palladium finish",
  "title": "Tie Bar",
  "spec": "Palladium finish, 55 mm",
  "price": 6500,
  "image": "/assets/images/products/tie-bar-pall.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "tie",
   "finish": "palladium"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 3,
  "handle": "key-ring",
  "value": "Palladium finish with black calfskin",
  "title": "Key Ring",
  "spec": "Palladium finish with black calfskin",
  "price": 4500,
  "image": "/assets/images/products/key-ring-leather-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "keyrings",
   "finish": "palladium leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 4,
  "handle": "glasses-case",
  "value": null,
  "title": "Glasses Case",
  "spec": "Cognac calfskin, soft lining",
  "price": 6800,
  "image": "/assets/images/products/glasses-case-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cases",
   "finish": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 5,
  "handle": "signature-cufflinks",
  "value": "Gold finish",
  "title": "Signature Cufflinks",
  "spec": "Gold finish, mother-of-pearl",
  "price": 14500,
  "image": "/assets/images/products/signature-cufflinks-gold.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cufflinks",
   "finish": "gold"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 6,
  "handle": "watch-roll",
  "value": null,
  "title": "Watch Roll",
  "spec": "Black calfskin, holds three watches",
  "price": 11500,
  "image": "/assets/images/products/watch-roll-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cases",
   "finish": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 7,
  "handle": "monogram-cufflinks",
  "value": null,
  "title": "Monogram Cufflinks",
  "spec": "Engraved palladium finish",
  "price": 11000,
  "image": "/assets/images/products/monogram-cufflinks-pall.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "cufflinks",
   "finish": "palladium"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 8,
  "handle": "phone-sleeve",
  "value": null,
  "title": "Phone Sleeve",
  "spec": "Black grained calfskin",
  "price": 6500,
  "image": "/assets/images/products/phone-sleeve-black.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "tech",
   "finish": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 9,
  "handle": "tie-bar",
  "value": "Gold finish",
  "title": "Tie Bar",
  "spec": "Gold finish, 55 mm",
  "price": 6900,
  "image": "/assets/images/products/tie-bar-gold.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "tie",
   "finish": "gold"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 10,
  "handle": "key-ring",
  "value": "Brushed brass tag",
  "title": "Key Ring",
  "spec": "Brushed brass tag",
  "price": 3900,
  "image": "/assets/images/products/key-ring-brass.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "keyrings",
   "finish": "gold"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 11,
  "handle": "valet-tray",
  "value": null,
  "title": "Valet Tray",
  "spec": "Cognac calfskin, for keys and cufflinks",
  "price": 7900,
  "image": "/assets/images/products/valet-tray-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cases",
   "finish": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 12,
  "handle": "earphone-case",
  "value": null,
  "title": "Earphone Case",
  "spec": "Tan calfskin, palladium-finish ring",
  "price": 4200,
  "image": "/assets/images/products/earphone-case-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "tech",
   "finish": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 13,
  "handle": "lapel-pin",
  "value": null,
  "title": "Lapel Pin",
  "spec": "Gold finish, IVAARO initial",
  "price": 4900,
  "image": "/assets/images/products/lapel-pin-gold.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "tie",
   "finish": "gold"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 14,
  "handle": "monogram-key-ring",
  "value": null,
  "title": "Monogram Key Ring",
  "spec": "Engraved palladium finish",
  "price": 5500,
  "image": "/assets/images/products/monogram-key-ring-pall.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "keyrings",
   "finish": "palladium"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 15,
  "handle": "cable-wraps",
  "value": null,
  "title": "Cable Wraps",
  "spec": "Cognac calfskin, set of three",
  "price": 1900,
  "image": "/assets/images/products/cable-wraps-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "tech",
   "finish": "leather"
  }
 },
 {
  "cat": "lifestyle-accessories",
  "rank": 16,
  "handle": "collar-stays",
  "value": null,
  "title": "Collar Stays",
  "spec": "Brass, set of four",
  "price": 2900,
  "image": "/assets/images/products/collar-stays-brass.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "tie",
   "finish": "gold"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 1,
  "handle": "signature-pen-set",
  "value": null,
  "title": "Signature Pen Set",
  "spec": "Fountain and ballpoint pens in a cognac leather case",
  "price": 72000,
  "image": "/assets/images/pens/signature-pen-set.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "sets writing",
   "band": "o50"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 2,
  "handle": "pen-and-card-holder-set",
  "value": null,
  "title": "Pen & Card Holder Set",
  "spec": "Meridian ballpoint pen with a tan card holder",
  "price": 15500,
  "image": "/assets/images/products/gift-pen-cardholder.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "sets",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 3,
  "handle": "pen-and-journal-set",
  "value": null,
  "title": "Pen & Journal Set",
  "spec": "Rollerball pen with refillable A5 journal",
  "price": 22000,
  "image": "/assets/images/products/pen-journal-set.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "sets writing",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 4,
  "handle": "corporate-gift-box",
  "value": null,
  "title": "Corporate Gift Box",
  "spec": "Ballpoint pen, journal and card holder",
  "price": 28000,
  "image": "/assets/images/products/gift-corporate-box.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "corporate sets",
   "band": "u50"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 5,
  "handle": "cufflinks-and-tie-bar-set",
  "value": null,
  "title": "Cufflinks & Tie Bar Set",
  "spec": "Palladium finish with onyx",
  "price": 17000,
  "image": "/assets/images/products/gift-cufflinks-tiebar.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "sets accessories",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 6,
  "handle": "executive-desk-set",
  "value": null,
  "title": "Executive Desk Set",
  "spec": "Pen stand, letter opener and paperweight",
  "price": 14500,
  "image": "/assets/images/products/gift-desk-set.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "sets corporate",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 7,
  "handle": "signature-fountain-pen",
  "value": "Black resin",
  "title": "Signature Fountain Pen",
  "spec": "Black resin, 18K gold nib, gold finish",
  "price": 46000,
  "image": "/assets/images/pens/signature-fountain-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "writing",
   "band": "u50"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 8,
  "handle": "travel-set",
  "value": null,
  "title": "Travel Set",
  "spec": "Passport cover, luggage tag and card holder",
  "price": 17500,
  "image": "/assets/images/products/gift-travel-set.svg",
  "new": true,
  "limited": false,
  "badge": "New",
  "facets": {
   "type": "sets leather",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 9,
  "handle": "card-holder-and-key-ring-set",
  "value": null,
  "title": "Card Holder & Key Ring Set",
  "spec": "Cognac calfskin with brass-finish ring",
  "price": 10500,
  "image": "/assets/images/products/gift-cardholder-keyring.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "sets leather",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 10,
  "handle": "ivaaro-gift-card",
  "value": null,
  "title": "IVAARO Gift Card",
  "spec": "Choose any value from ₹5,000",
  "price": 5000,
  "image": "/assets/images/products/gift-card.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "cards",
   "band": "u10"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 11,
  "handle": "meridian-ballpoint-pen",
  "value": "Black lacquer",
  "title": "Meridian Ballpoint Pen",
  "spec": "Black lacquer, palladium finish",
  "price": 8900,
  "image": "/assets/images/pens/meridian-ballpoint-black.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "writing",
   "band": "u10"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 12,
  "handle": "heritage-bifold-wallet",
  "value": "Cognac calfskin",
  "title": "Heritage Bifold Wallet",
  "spec": "Cognac calfskin, hand-stitched edges",
  "price": 14500,
  "image": "/assets/images/products/heritage-bifold-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "leather",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 13,
  "handle": "signature-cufflinks",
  "value": "Palladium finish",
  "title": "Signature Cufflinks",
  "spec": "Palladium finish, onyx",
  "price": 12500,
  "image": "/assets/images/products/signature-cufflinks-pall.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "accessories",
   "band": "u25"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 14,
  "handle": "atelier-a5-journal",
  "value": "Forest green leather cover",
  "title": "Atelier A5 Journal",
  "spec": "Forest green leather cover, 192 ivory pages",
  "price": 4500,
  "image": "/assets/images/products/atelier-journal-green.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "writing",
   "band": "u10"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 15,
  "handle": "classic-card-holder",
  "value": "Tan full-grain calfskin",
  "title": "Classic Card Holder",
  "spec": "Tan full-grain calfskin, four card slots",
  "price": 7900,
  "image": "/assets/images/products/classic-cardholder-tan.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "leather",
   "band": "u10"
  }
 },
 {
  "cat": "gifts-collections",
  "rank": 16,
  "handle": "weekender-duffle",
  "value": "Cognac leather",
  "title": "Weekender Duffle",
  "spec": "Cognac leather, 45-litre capacity",
  "price": 62000,
  "image": "/assets/images/products/weekender-cognac.svg",
  "new": false,
  "limited": false,
  "badge": null,
  "facets": {
   "type": "leather",
   "band": "o50"
  }
 }
];

export const PRODUCT_DATA: CatalogProduct[] = [
 {
  "handle": "signature-fountain-pen",
  "title": "Signature Fountain Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments",
   "gifts-collections"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/signature-fountain-black.svg",
    "spec": "Black resin, 18K gold nib, gold finish",
    "price": 46000,
    "value": "Black resin",
    "sku": "IV-SG-FP01-BK",
    "pdpSpec": "Black precious resin barrel and cap",
    "gallery": [
     [
      "/assets/images/pens/signature-fountain-black.svg",
      "Signature Fountain Pen, black resin, three-quarter view"
     ],
     [
      "/assets/images/pdp/signature-fountain-black-profile.svg",
      "Side profile of the pen with the cap posted"
     ],
     [
      "/assets/images/pdp/signature-fountain-black-nib.svg",
      "Close-up of the 18K gold nib"
     ],
     [
      "/assets/images/pdp/signature-fountain-black-clip.svg",
      "Close-up of the cap, clip and gold ring"
     ],
     [
      "/assets/images/pdp/gift-box.svg",
      "The IVAARO gift box with brass ribbon"
     ]
    ]
   },
   {
    "image": "/assets/images/pens/signature-fountain-ivory.svg",
    "spec": "Ivory lacquer, 18K gold nib, gold finish",
    "price": 48000,
    "value": "Ivory lacquer",
    "sku": "IV-SG-FP01-IV",
    "pdpSpec": "Ivory lacquer barrel and cap",
    "gallery": [
     [
      "/assets/images/pens/signature-fountain-ivory.svg",
      "Signature Fountain Pen, ivory lacquer, three-quarter view"
     ],
     [
      "/assets/images/pdp/signature-fountain-ivory-profile.svg",
      "Side profile of the pen with the cap posted"
     ],
     [
      "/assets/images/pdp/signature-fountain-ivory-nib.svg",
      "Close-up of the 18K gold nib"
     ],
     [
      "/assets/images/pdp/signature-fountain-ivory-clip.svg",
      "Close-up of the cap, clip and gold ring"
     ],
     [
      "/assets/images/pdp/gift-box.svg",
      "The IVAARO gift box with brass ribbon"
     ]
    ]
   }
  ],
  "nibs": [
   [
    "F",
    "Fine"
   ],
   [
    "M",
    "Medium"
   ],
   [
    "B",
    "Broad"
   ]
  ],
  "nibDefault": "M"
 },
 {
  "handle": "meridian-ballpoint-pen",
  "title": "Meridian Ballpoint Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments",
   "gifts-collections"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/meridian-ballpoint-black.svg",
    "spec": "Black lacquer, palladium finish",
    "price": 8900,
    "value": "Black lacquer",
    "sku": "IV-MERIDIAN-BALLPOINT-BLACK"
   },
   {
    "image": "/assets/images/pens/meridian-ballpoint-night.svg",
    "spec": "Night blue lacquer, palladium finish",
    "price": 8900,
    "value": "Night blue lacquer",
    "sku": "IV-MERIDIAN-BALLPOINT-NIGHT"
   },
   {
    "image": "/assets/images/pens/meridian-ballpoint-burgundy.svg",
    "spec": "Burgundy lacquer, gold finish",
    "price": 9500,
    "value": "Burgundy lacquer",
    "sku": "IV-MERIDIAN-BALLPOINT-BURGUNDY"
   }
  ]
 },
 {
  "handle": "monogram-ballpoint-pen",
  "title": "Monogram Ballpoint Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/monogram-ballpoint-pall.svg",
    "spec": "Engraved metal, palladium finish",
    "price": 21000,
    "value": "Palladium finish",
    "sku": "IV-MONOGRAM-BALLPOINT-PALL"
   },
   {
    "image": "/assets/images/pens/monogram-ballpoint-gold.svg",
    "spec": "Engraved metal, gold finish",
    "price": 23500,
    "value": "Gold finish",
    "sku": "IV-MONOGRAM-BALLPOINT-GOLD"
   }
  ]
 },
 {
  "handle": "meridian-rollerball-pen",
  "title": "Meridian Rollerball Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/meridian-rollerball-black.svg",
    "spec": "Black lacquer, gold finish",
    "price": 10500,
    "value": null,
    "sku": "IV-MERIDIAN-ROLLERBALL-BLACK"
   }
  ]
 },
 {
  "handle": "atelier-fountain-pen",
  "title": "Atelier Fountain Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/atelier-fountain-limited.svg",
    "spec": "Limited edition of 250, night blue lacquer, 18K gold nib",
    "price": 125000,
    "value": null,
    "sku": "IV-ATELIER-FOUNTAIN-LIMITED"
   }
  ]
 },
 {
  "handle": "noir-fountain-pen",
  "title": "Noir Fountain Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/noir-fountain-matte.svg",
    "spec": "Matte black lacquer, steel nib, palladium finish",
    "price": 18500,
    "value": null,
    "sku": "IV-NOIR-FOUNTAIN-MATTE"
   }
  ]
 },
 {
  "handle": "voyager-compact-ballpoint-pen",
  "title": "Voyager Compact Ballpoint Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/voyager-ballpoint-green.svg",
    "spec": "Forest green lacquer, palladium finish",
    "price": 7500,
    "value": "Forest green lacquer",
    "sku": "IV-VOYAGER-BALLPOINT-GREEN"
   },
   {
    "image": "/assets/images/pens/voyager-ballpoint-sand.svg",
    "spec": "Sand lacquer, gold finish",
    "price": 7500,
    "value": "Sand lacquer",
    "sku": "IV-VOYAGER-BALLPOINT-SAND"
   }
  ]
 },
 {
  "handle": "signature-rollerball-pen",
  "title": "Signature Rollerball Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/signature-rollerball-black.svg",
    "spec": "Black resin, gold finish",
    "price": 32000,
    "value": null,
    "sku": "IV-SIGNATURE-ROLLERBALL-BLACK"
   }
  ]
 },
 {
  "handle": "meridian-fountain-pen",
  "title": "Meridian Fountain Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/meridian-fountain-night.svg",
    "spec": "Night blue lacquer, steel nib, palladium finish",
    "price": 14500,
    "value": null,
    "sku": "IV-MERIDIAN-FOUNTAIN-NIGHT"
   }
  ]
 },
 {
  "handle": "monogram-rollerball-pen",
  "title": "Monogram Rollerball Pen",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/monogram-rollerball-pall.svg",
    "spec": "Engraved metal, palladium finish",
    "price": 24500,
    "value": null,
    "sku": "IV-MONOGRAM-ROLLERBALL-PALL"
   }
  ]
 },
 {
  "handle": "signature-pen-set",
  "title": "Signature Pen Set",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments",
   "gifts-collections"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/signature-pen-set.svg",
    "spec": "Fountain and ballpoint pens in a cognac leather case",
    "price": 72000,
    "value": null,
    "sku": "IV-SIGNATURE-PEN-SET"
   }
  ]
 },
 {
  "handle": "meridian-mechanical-pencil",
  "title": "Meridian Mechanical Pencil",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/meridian-pencil-black.svg",
    "spec": "0.7 mm lead, black lacquer, palladium finish",
    "price": 7900,
    "value": null,
    "sku": "IV-MERIDIAN-PENCIL-BLACK"
   }
  ]
 },
 {
  "handle": "monogram-mechanical-pencil",
  "title": "Monogram Mechanical Pencil",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/monogram-pencil-gold.svg",
    "spec": "0.7 mm lead, engraved metal, gold finish",
    "price": 19500,
    "value": null,
    "sku": "IV-MONOGRAM-PENCIL-GOLD"
   }
  ]
 },
 {
  "handle": "fountain-pen-ink",
  "title": "Fountain Pen Ink",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/ink-bottle-night.svg",
    "spec": "Night blue, 50 ml bottle",
    "price": 1800,
    "value": null,
    "sku": "IV-INK-BOTTLE-NIGHT"
   }
  ]
 },
 {
  "handle": "ink-cartridges",
  "title": "Ink Cartridges",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/ink-cartridges-black.svg",
    "spec": "Black ink, pack of 6",
    "price": 650,
    "value": null,
    "sku": "IV-INK-CARTRIDGES-BLACK"
   }
  ]
 },
 {
  "handle": "rollerball-refills",
  "title": "Rollerball Refills",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/rollerball-refill-black.svg",
    "spec": "Black ink, medium tip, pack of 2",
    "price": 950,
    "value": null,
    "sku": "IV-ROLLERBALL-REFILL-BLACK"
   }
  ]
 },
 {
  "handle": "ballpoint-refill",
  "title": "Ballpoint Refill",
  "homeCat": "fine-writing-instruments",
  "cats": [
   "fine-writing-instruments"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/pens/ballpoint-refill-blue.svg",
    "spec": "Blue ink, medium tip",
    "price": 750,
    "value": null,
    "sku": "IV-BALLPOINT-REFILL-BLUE"
   }
  ]
 },
 {
  "handle": "heritage-bifold-wallet",
  "title": "Heritage Bifold Wallet",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods",
   "gifts-collections"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/heritage-bifold-cognac.svg",
    "spec": "Cognac calfskin, hand-stitched edges",
    "price": 14500,
    "value": "Cognac calfskin",
    "sku": "IV-HERITAGE-BIFOLD-COGNAC"
   },
   {
    "image": "/assets/images/products/heritage-bifold-black.svg",
    "spec": "Black calfskin, hand-stitched edges",
    "price": 14500,
    "value": "Black calfskin",
    "sku": "IV-HERITAGE-BIFOLD-BLACK"
   }
  ]
 },
 {
  "handle": "classic-card-holder",
  "title": "Classic Card Holder",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods",
   "gifts-collections"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/classic-cardholder-tan.svg",
    "spec": "Tan full-grain calfskin, four card slots",
    "price": 7900,
    "value": "Tan full-grain calfskin",
    "sku": "IV-CLASSIC-CARDHOLDER-TAN"
   },
   {
    "image": "/assets/images/products/classic-cardholder-night.svg",
    "spec": "Night blue calfskin, four card slots",
    "price": 7900,
    "value": "Night blue calfskin",
    "sku": "IV-CLASSIC-CARDHOLDER-NIGHT"
   },
   {
    "image": "/assets/images/products/classic-cardholder-green.svg",
    "spec": "Forest green calfskin, four card slots",
    "price": 7900,
    "value": "Forest green calfskin",
    "sku": "IV-CLASSIC-CARDHOLDER-GREEN"
   }
  ]
 },
 {
  "handle": "travel-wallet",
  "title": "Travel Wallet",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/travel-wallet-night.svg",
    "spec": "Night blue grained calfskin, passport and boarding pass",
    "price": 19500,
    "value": null,
    "sku": "IV-TRAVEL-WALLET-NIGHT"
   }
  ]
 },
 {
  "handle": "classic-belt",
  "title": "Classic Belt",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/classic-belt-cognac.svg",
    "spec": "Cognac calfskin, 35 mm, brass-finish buckle",
    "price": 14000,
    "value": null,
    "sku": "IV-CLASSIC-BELT-COGNAC"
   }
  ]
 },
 {
  "handle": "compact-zip-wallet",
  "title": "Compact Zip Wallet",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/compact-zip-wallet-black.svg",
    "spec": "Black grained calfskin, coin pocket",
    "price": 11500,
    "value": null,
    "sku": "IV-COMPACT-ZIP-WALLET-BLACK"
   }
  ]
 },
 {
  "handle": "money-clip-card-holder",
  "title": "Money Clip Card Holder",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/money-clip-cardholder.svg",
    "spec": "Black calfskin, palladium-finish clip",
    "price": 9500,
    "value": null,
    "sku": "IV-MONEY-CLIP-CARDHOLDER"
   }
  ]
 },
 {
  "handle": "passport-cover",
  "title": "Passport Cover",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/passport-cover-cognac.svg",
    "spec": "Cognac calfskin, two card slots",
    "price": 8500,
    "value": null,
    "sku": "IV-PASSPORT-COVER-COGNAC"
   }
  ]
 },
 {
  "handle": "long-wallet",
  "title": "Long Wallet",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/long-wallet-burgundy.svg",
    "spec": "Burgundy calfskin, twelve card slots",
    "price": 18000,
    "value": null,
    "sku": "IV-LONG-WALLET-BURGUNDY"
   }
  ]
 },
 {
  "handle": "reversible-belt",
  "title": "Reversible Belt",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/reversible-belt-black.svg",
    "spec": "Black and cognac calfskin, palladium-finish buckle",
    "price": 16000,
    "value": null,
    "sku": "IV-REVERSIBLE-BELT-BLACK"
   }
  ]
 },
 {
  "handle": "key-holder",
  "title": "Key Holder",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/key-holder-black.svg",
    "spec": "Black calfskin, six key hooks",
    "price": 6500,
    "value": null,
    "sku": "IV-KEY-HOLDER-BLACK"
   }
  ]
 },
 {
  "handle": "coin-purse",
  "title": "Coin Purse",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/coin-purse-tan.svg",
    "spec": "Tan calfskin, brass-finish zip",
    "price": 5500,
    "value": null,
    "sku": "IV-COIN-PURSE-TAN"
   }
  ]
 },
 {
  "handle": "slim-card-sleeve",
  "title": "Slim Card Sleeve",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/card-sleeve-burgundy.svg",
    "spec": "Burgundy calfskin, two card slots",
    "price": 5900,
    "value": null,
    "sku": "IV-CARD-SLEEVE-BURGUNDY"
   }
  ]
 },
 {
  "handle": "key-ring-fob",
  "title": "Key Ring Fob",
  "homeCat": "leather-goods",
  "cats": [
   "leather-goods"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/key-fob-tan.svg",
    "spec": "Tan calfskin loop, brass-finish ring",
    "price": 3900,
    "value": null,
    "sku": "IV-KEY-FOB-TAN"
   }
  ]
 },
 {
  "handle": "voyage-document-folio",
  "title": "Voyage Document Folio",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/voyage-folio-night.svg",
    "spec": "Midnight blue leather, detachable strap",
    "price": 32000,
    "value": null,
    "sku": "IV-VOYAGE-FOLIO-NIGHT"
   }
  ]
 },
 {
  "handle": "voyage-slim-briefcase",
  "title": "Voyage Slim Briefcase",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/voyage-slim-briefcase-black.svg",
    "spec": "Black calfskin, fits a 14-inch laptop",
    "price": 48000,
    "value": null,
    "sku": "IV-VOYAGE-SLIM-BRIEFCASE-BLACK"
   }
  ]
 },
 {
  "handle": "everyday-tote",
  "title": "Everyday Tote",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/everyday-tote-black.svg",
    "spec": "Black grained calfskin, zip inner pocket",
    "price": 34000,
    "value": "Black grained calfskin",
    "sku": "IV-EVERYDAY-TOTE-BLACK"
   },
   {
    "image": "/assets/images/products/everyday-tote-canvas.svg",
    "spec": "Sand canvas with cognac leather trim",
    "price": 18500,
    "value": "Sand canvas with cognac leather trim",
    "sku": "IV-EVERYDAY-TOTE-CANVAS"
   }
  ]
 },
 {
  "handle": "city-backpack",
  "title": "City Backpack",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/city-backpack-black.svg",
    "spec": "Black grained calfskin, padded laptop sleeve",
    "price": 42000,
    "value": "Black grained calfskin",
    "sku": "IV-CITY-BACKPACK-BLACK"
   },
   {
    "image": "/assets/images/products/city-backpack-nylon.svg",
    "spec": "Night blue nylon with cognac leather trim",
    "price": 24000,
    "value": "Night blue nylon with cognac leather trim",
    "sku": "IV-CITY-BACKPACK-NYLON"
   }
  ]
 },
 {
  "handle": "weekender-duffle",
  "title": "Weekender Duffle",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel",
   "gifts-collections"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/weekender-cognac.svg",
    "spec": "Cognac leather, 45-litre capacity",
    "price": 62000,
    "value": "Cognac leather",
    "sku": "IV-WEEKENDER-COGNAC"
   },
   {
    "image": "/assets/images/products/weekender-canvas-green.svg",
    "spec": "Forest green canvas with tan leather ends",
    "price": 29000,
    "value": "Forest green canvas with tan leather ends",
    "sku": "IV-WEEKENDER-CANVAS-GREEN"
   }
  ]
 },
 {
  "handle": "heritage-satchel",
  "title": "Heritage Satchel",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/heritage-satchel-tan.svg",
    "spec": "Tan leather, twin buckles, adjustable strap",
    "price": 38000,
    "value": null,
    "sku": "IV-HERITAGE-SATCHEL-TAN"
   }
  ]
 },
 {
  "handle": "voyage-briefcase",
  "title": "Voyage Briefcase",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/voyage-briefcase-cognac.svg",
    "spec": "Cognac calfskin, two compartments",
    "price": 52000,
    "value": null,
    "sku": "IV-VOYAGE-BRIEFCASE-COGNAC"
   }
  ]
 },
 {
  "handle": "messenger-bag",
  "title": "Messenger Bag",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/messenger-black.svg",
    "spec": "Black calfskin, magnetic flap",
    "price": 36000,
    "value": null,
    "sku": "IV-MESSENGER-BLACK"
   }
  ]
 },
 {
  "handle": "crossbody-pouch",
  "title": "Crossbody Pouch",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/crossbody-pouch-night.svg",
    "spec": "Night blue grained calfskin",
    "price": 14000,
    "value": null,
    "sku": "IV-CROSSBODY-POUCH-NIGHT"
   }
  ]
 },
 {
  "handle": "laptop-sleeve",
  "title": "Laptop Sleeve",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/laptop-sleeve-black.svg",
    "spec": "Black calfskin, zip closure, 14-inch",
    "price": 12500,
    "value": null,
    "sku": "IV-LAPTOP-SLEEVE-BLACK"
   }
  ]
 },
 {
  "handle": "tech-pouch",
  "title": "Tech Pouch",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/tech-pouch-black.svg",
    "spec": "Black grained calfskin, cable organiser",
    "price": 6900,
    "value": null,
    "sku": "IV-TECH-POUCH-BLACK"
   }
  ]
 },
 {
  "handle": "toiletry-case",
  "title": "Toiletry Case",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/toiletry-case-cognac.svg",
    "spec": "Cognac leather, water-resistant lining",
    "price": 9500,
    "value": null,
    "sku": "IV-TOILETRY-CASE-COGNAC"
   }
  ]
 },
 {
  "handle": "luggage-tag",
  "title": "Luggage Tag",
  "homeCat": "bags-travel",
  "cats": [
   "bags-travel"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/luggage-tag-tan.svg",
    "spec": "Tan calfskin, brass-finish eyelet",
    "price": 2900,
    "value": null,
    "sku": "IV-LUGGAGE-TAG-TAN"
   }
  ]
 },
 {
  "handle": "atelier-a5-journal",
  "title": "Atelier A5 Journal",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery",
   "gifts-collections"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/atelier-journal-green.svg",
    "spec": "Forest green leather cover, 192 ivory pages",
    "price": 4500,
    "value": "Forest green leather cover",
    "sku": "IV-ATELIER-JOURNAL-GREEN"
   },
   {
    "image": "/assets/images/products/atelier-journal-black.svg",
    "spec": "Black leather cover, 192 ivory pages",
    "price": 4500,
    "value": "Black leather cover",
    "sku": "IV-ATELIER-JOURNAL-BLACK"
   },
   {
    "image": "/assets/images/products/atelier-journal-cognac.svg",
    "spec": "Cognac leather cover, 192 ivory pages",
    "price": 4500,
    "value": "Cognac leather cover",
    "sku": "IV-ATELIER-JOURNAL-COGNAC"
   }
  ]
 },
 {
  "handle": "leather-desk-pad",
  "title": "Leather Desk Pad",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/desk-pad-black.svg",
    "spec": "Black calfskin, 80 × 40 cm",
    "price": 16500,
    "value": null,
    "sku": "IV-DESK-PAD-BLACK"
   }
  ]
 },
 {
  "handle": "pen-and-journal-set",
  "title": "Pen & Journal Set",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery",
   "gifts-collections"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/pen-journal-set.svg",
    "spec": "Rollerball pen with refillable A5 journal",
    "price": 22000,
    "value": null,
    "sku": "IV-PEN-JOURNAL-SET"
   }
  ]
 },
 {
  "handle": "pen-stand",
  "title": "Pen Stand",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/pen-stand-brass.svg",
    "spec": "Brass and marble base",
    "price": 7500,
    "value": null,
    "sku": "IV-PEN-STAND-BRASS"
   }
  ]
 },
 {
  "handle": "correspondence-cards",
  "title": "Correspondence Cards",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/correspondence-cards.svg",
    "spec": "Set of 20 ivory cards with envelopes",
    "price": 2400,
    "value": null,
    "sku": "IV-CORRESPONDENCE-CARDS"
   }
  ]
 },
 {
  "handle": "pen-tray",
  "title": "Pen Tray",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/pen-tray-cognac.svg",
    "spec": "Cognac leather, holds up to four pens",
    "price": 5900,
    "value": null,
    "sku": "IV-PEN-TRAY-COGNAC"
   }
  ]
 },
 {
  "handle": "desk-organiser",
  "title": "Desk Organiser",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/desk-organiser-cognac.svg",
    "spec": "Cognac leather, three compartments",
    "price": 9800,
    "value": null,
    "sku": "IV-DESK-ORGANISER-COGNAC"
   }
  ]
 },
 {
  "handle": "weekly-planner",
  "title": "Weekly Planner",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/weekly-planner-linen.svg",
    "spec": "Night blue linen cover, undated",
    "price": 3200,
    "value": null,
    "sku": "IV-WEEKLY-PLANNER-LINEN"
   }
  ]
 },
 {
  "handle": "letter-opener",
  "title": "Letter Opener",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/letter-opener-brass.svg",
    "spec": "Solid brass",
    "price": 3900,
    "value": null,
    "sku": "IV-LETTER-OPENER-BRASS"
   }
  ]
 },
 {
  "handle": "pocket-notebooks",
  "title": "Pocket Notebooks",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/pocket-notebooks-kraft.svg",
    "spec": "A6, set of three kraft covers",
    "price": 1500,
    "value": null,
    "sku": "IV-POCKET-NOTEBOOKS-KRAFT"
   }
  ]
 },
 {
  "handle": "document-tray",
  "title": "Document Tray",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/document-tray-tan.svg",
    "spec": "Tan leather, A4",
    "price": 8900,
    "value": null,
    "sku": "IV-DOCUMENT-TRAY-TAN"
   }
  ]
 },
 {
  "handle": "paperweight",
  "title": "Paperweight",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/paperweight-brass.svg",
    "spec": "Solid brass dome",
    "price": 4500,
    "value": null,
    "sku": "IV-PAPERWEIGHT-BRASS"
   }
  ]
 },
 {
  "handle": "a5-refill-pages",
  "title": "A5 Refill Pages",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/refill-pages-a5.svg",
    "spec": "Ruled ivory paper, 192 pages",
    "price": 950,
    "value": null,
    "sku": "IV-REFILL-PAGES-A5"
   }
  ]
 },
 {
  "handle": "leather-bookmark",
  "title": "Leather Bookmark",
  "homeCat": "desk-stationery",
  "cats": [
   "desk-stationery"
  ],
  "optionName": "Colour",
  "variants": [
   {
    "image": "/assets/images/products/bookmark-cognac.svg",
    "spec": "Cognac calfskin, hand-stitched",
    "price": 1200,
    "value": null,
    "sku": "IV-BOOKMARK-COGNAC"
   }
  ]
 },
 {
  "handle": "signature-cufflinks",
  "title": "Signature Cufflinks",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories",
   "gifts-collections"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/signature-cufflinks-pall.svg",
    "spec": "Palladium finish, onyx",
    "price": 12500,
    "value": "Palladium finish",
    "sku": "IV-SIGNATURE-CUFFLINKS-PALL"
   },
   {
    "image": "/assets/images/products/signature-cufflinks-gold.svg",
    "spec": "Gold finish, mother-of-pearl",
    "price": 14500,
    "value": "Gold finish",
    "sku": "IV-SIGNATURE-CUFFLINKS-GOLD"
   }
  ]
 },
 {
  "handle": "tie-bar",
  "title": "Tie Bar",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/tie-bar-pall.svg",
    "spec": "Palladium finish, 55 mm",
    "price": 6500,
    "value": "Palladium finish",
    "sku": "IV-TIE-BAR-PALL"
   },
   {
    "image": "/assets/images/products/tie-bar-gold.svg",
    "spec": "Gold finish, 55 mm",
    "price": 6900,
    "value": "Gold finish",
    "sku": "IV-TIE-BAR-GOLD"
   }
  ]
 },
 {
  "handle": "key-ring",
  "title": "Key Ring",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/key-ring-leather-black.svg",
    "spec": "Palladium finish with black calfskin",
    "price": 4500,
    "value": "Palladium finish with black calfskin",
    "sku": "IV-KEY-RING-LEATHER-BLACK"
   },
   {
    "image": "/assets/images/products/key-ring-brass.svg",
    "spec": "Brushed brass tag",
    "price": 3900,
    "value": "Brushed brass tag",
    "sku": "IV-KEY-RING-BRASS"
   }
  ]
 },
 {
  "handle": "glasses-case",
  "title": "Glasses Case",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/glasses-case-cognac.svg",
    "spec": "Cognac calfskin, soft lining",
    "price": 6800,
    "value": null,
    "sku": "IV-GLASSES-CASE-COGNAC"
   }
  ]
 },
 {
  "handle": "watch-roll",
  "title": "Watch Roll",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/watch-roll-black.svg",
    "spec": "Black calfskin, holds three watches",
    "price": 11500,
    "value": null,
    "sku": "IV-WATCH-ROLL-BLACK"
   }
  ]
 },
 {
  "handle": "monogram-cufflinks",
  "title": "Monogram Cufflinks",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/monogram-cufflinks-pall.svg",
    "spec": "Engraved palladium finish",
    "price": 11000,
    "value": null,
    "sku": "IV-MONOGRAM-CUFFLINKS-PALL"
   }
  ]
 },
 {
  "handle": "phone-sleeve",
  "title": "Phone Sleeve",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/phone-sleeve-black.svg",
    "spec": "Black grained calfskin",
    "price": 6500,
    "value": null,
    "sku": "IV-PHONE-SLEEVE-BLACK"
   }
  ]
 },
 {
  "handle": "valet-tray",
  "title": "Valet Tray",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/valet-tray-cognac.svg",
    "spec": "Cognac calfskin, for keys and cufflinks",
    "price": 7900,
    "value": null,
    "sku": "IV-VALET-TRAY-COGNAC"
   }
  ]
 },
 {
  "handle": "earphone-case",
  "title": "Earphone Case",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/earphone-case-tan.svg",
    "spec": "Tan calfskin, palladium-finish ring",
    "price": 4200,
    "value": null,
    "sku": "IV-EARPHONE-CASE-TAN"
   }
  ]
 },
 {
  "handle": "lapel-pin",
  "title": "Lapel Pin",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/lapel-pin-gold.svg",
    "spec": "Gold finish, IVAARO initial",
    "price": 4900,
    "value": null,
    "sku": "IV-LAPEL-PIN-GOLD"
   }
  ]
 },
 {
  "handle": "monogram-key-ring",
  "title": "Monogram Key Ring",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/monogram-key-ring-pall.svg",
    "spec": "Engraved palladium finish",
    "price": 5500,
    "value": null,
    "sku": "IV-MONOGRAM-KEY-RING-PALL"
   }
  ]
 },
 {
  "handle": "cable-wraps",
  "title": "Cable Wraps",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/cable-wraps-cognac.svg",
    "spec": "Cognac calfskin, set of three",
    "price": 1900,
    "value": null,
    "sku": "IV-CABLE-WRAPS-COGNAC"
   }
  ]
 },
 {
  "handle": "collar-stays",
  "title": "Collar Stays",
  "homeCat": "lifestyle-accessories",
  "cats": [
   "lifestyle-accessories"
  ],
  "optionName": "Finish",
  "variants": [
   {
    "image": "/assets/images/products/collar-stays-brass.svg",
    "spec": "Brass, set of four",
    "price": 2900,
    "value": null,
    "sku": "IV-COLLAR-STAYS-BRASS"
   }
  ]
 },
 {
  "handle": "pen-and-card-holder-set",
  "title": "Pen & Card Holder Set",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-pen-cardholder.svg",
    "spec": "Meridian ballpoint pen with a tan card holder",
    "price": 15500,
    "value": null,
    "sku": "IV-GIFT-PEN-CARDHOLDER"
   }
  ]
 },
 {
  "handle": "corporate-gift-box",
  "title": "Corporate Gift Box",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-corporate-box.svg",
    "spec": "Ballpoint pen, journal and card holder",
    "price": 28000,
    "value": null,
    "sku": "IV-GIFT-CORPORATE-BOX"
   }
  ]
 },
 {
  "handle": "cufflinks-and-tie-bar-set",
  "title": "Cufflinks & Tie Bar Set",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-cufflinks-tiebar.svg",
    "spec": "Palladium finish with onyx",
    "price": 17000,
    "value": null,
    "sku": "IV-GIFT-CUFFLINKS-TIEBAR"
   }
  ]
 },
 {
  "handle": "executive-desk-set",
  "title": "Executive Desk Set",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-desk-set.svg",
    "spec": "Pen stand, letter opener and paperweight",
    "price": 14500,
    "value": null,
    "sku": "IV-GIFT-DESK-SET"
   }
  ]
 },
 {
  "handle": "travel-set",
  "title": "Travel Set",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-travel-set.svg",
    "spec": "Passport cover, luggage tag and card holder",
    "price": 17500,
    "value": null,
    "sku": "IV-GIFT-TRAVEL-SET"
   }
  ]
 },
 {
  "handle": "card-holder-and-key-ring-set",
  "title": "Card Holder & Key Ring Set",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-cardholder-keyring.svg",
    "spec": "Cognac calfskin with brass-finish ring",
    "price": 10500,
    "value": null,
    "sku": "IV-GIFT-CARDHOLDER-KEYRING"
   }
  ]
 },
 {
  "handle": "ivaaro-gift-card",
  "title": "IVAARO Gift Card",
  "homeCat": "gifts-collections",
  "cats": [
   "gifts-collections"
  ],
  "optionName": "Style",
  "variants": [
   {
    "image": "/assets/images/products/gift-card.svg",
    "spec": "Choose any value from ₹5,000",
    "price": 5000,
    "value": null,
    "sku": "IV-GIFT-CARD"
   }
  ]
 }
];
