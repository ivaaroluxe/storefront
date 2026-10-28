import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
  className = 'product-price',
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  className?: string;
}) {
  const onSale =
    price &&
    compareAtPrice &&
    Number(compareAtPrice.amount) > Number(price.amount);

  return (
    <div aria-label="Price" className={className} role="group">
      {price ? <Money data={price} /> : <span>&nbsp;</span>}
      {onSale ? (
        <s className="iv-price-compare">
          <span className="iv-sr-only">Was </span>
          <Money data={compareAtPrice} />
        </s>
      ) : null}
    </div>
  );
}
