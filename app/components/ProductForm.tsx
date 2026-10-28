import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import type {ProductFragment} from 'storefrontapi.generated';

const MAX_QUANTITY = 10;

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const [quantity, setQuantity] = useState(1);
  const available = Boolean(selectedVariant?.availableForSale);

  return (
    <div className="iv-pdp-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;
        const selectedValue = option.optionValues.find((v) => v.selected);

        return (
          <fieldset className="iv-option" key={option.name}>
            <legend className="iv-option-legend">
              {option.name}
              {selectedValue ? (
                <span className="iv-option-current">{selectedValue.name}</span>
              ) : null}
            </legend>
            <div className="iv-option-values">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;
                const className = `iv-option-value${
                  selected ? ' is-selected' : ''
                }${available ? '' : ' is-unavailable'}`;

                if (isDifferentProduct) {
                  // A combined listing child product lives at its own URL,
                  // so it is a real link (good for search engines)
                  return (
                    <Link
                      className={className}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      aria-current={selected ? 'true' : undefined}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                }

                // A variant of this product only changes the URL's search
                // params, so it is a button rather than a crawlable link
                return (
                  <button
                    type="button"
                    className={className}
                    key={option.name + name}
                    aria-pressed={selected}
                    disabled={!exists}
                    onClick={() => {
                      if (!selected) {
                        void navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  >
                    <ProductOptionSwatch swatch={swatch} name={name} />
                    {!available && exists ? (
                      <span className="iv-sr-only"> (sold out)</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      <div className="iv-pdp-buy">
        <div className="iv-qty" role="group" aria-label="Quantity">
          <button
            type="button"
            className="iv-qty-btn"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <MinusIcon />
          </button>
          <span className="iv-qty-value" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            className="iv-qty-btn"
            aria-label="Increase quantity"
            disabled={quantity >= MAX_QUANTITY}
            onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
          >
            <PlusIcon />
          </button>
        </div>
        <AddToCartButton
          disabled={!selectedVariant || !available}
          onClick={() => {
            open('cart');
          }}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity,
                    selectedVariant,
                  },
                ]
              : []
          }
        >
          {available ? 'Add to bag' : 'Sold out'}
        </AddToCartButton>
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return <span>{name}</span>;

  return (
    <span className="iv-swatch-wrap">
      <span
        className="iv-swatch"
        style={{backgroundColor: color || 'transparent'}}
        aria-hidden="true"
      >
        {!!image && <img src={image} alt="" />}
      </span>
      <span className="iv-sr-only">{name}</span>
    </span>
  );
}

export function MinusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M2 7h10" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M2 7h10M7 2v10" />
    </svg>
  );
}
