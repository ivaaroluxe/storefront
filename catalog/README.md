# IVAARO catalogue import

`ivaaro-products.csv` holds every product from the IVAARO static site: 77 products and 99 variants, with prices, SKUs, tags and images. The images are in `images/`, and Shopify downloads them from this public repository during the import.

**Product names, prices and copy are the sample content from the static site.** Correct them before you launch.

## Import

1. In Shopify admin, go to **Products → Import**, choose `ivaaro-products.csv`, and import.
2. Select all products, choose **More actions → Include in sales channels**, and tick the **Hydrogen** storefront.

You don't need to create collections. Each collection page shows the products tagged `cat:<collection handle>`, for example `cat:leather-goods`.

## Tags the site reads

| Tag | Effect |
| --- | --- |
| `cat:fine-writing-instruments` (and the other five) | The product appears on that collection page. Its first non-gifts `cat:` tag decides its address. |
| `new`, `limited` | The New and Limited Edition badges and filters. |
| `mode:`, `collection:`, `finish:`, `type:`, `colour:`, `material:` | Filter values for products added after the import. Imported products use the filter values from `app/lib/catalog.data.ts`. |
