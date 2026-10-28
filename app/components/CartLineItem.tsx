import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout, LineItemChildrenMap} from '~/components/CartMain';
import {
  CartForm,
  Image,
  Money,
  type OptimisticCartLine,
} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {useAside} from './Aside';
import {MinusIcon, PlusIcon} from './ProductForm';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

const MAX_QUANTITY = 10;

/**
 * A single line item in the cart: image, title, options, price, and
 * controls to change the quantity or remove it. Child lines (for example
 * add-ons attached to a product) are listed underneath.
 */
export function CartLineItem({
  layout,
  line,
  childrenMap,
}: {
  layout: CartLayout;
  line: CartLine;
  childrenMap: LineItemChildrenMap;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;
  const options = selectedOptions.filter(
    (option) => option.value !== 'Default Title',
  );

  return (
    <li className={`iv-line${line.isOptimistic ? ' is-pending' : ''}`}>
      <div className="iv-line-inner">
        <Link
          className="iv-line-media"
          prefetch="intent"
          to={lineItemUrl}
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => layout === 'aside' && close()}
        >
          {image ? (
            <Image
              alt=""
              aspectRatio="4/5"
              data={image}
              width={layout === 'page' ? 120 : 88}
              loading="lazy"
            />
          ) : (
            <img
              src="/images/ivaaro-emblem.png"
              alt=""
              width={32}
              height={31}
            />
          )}
        </Link>

        <div className="iv-line-body">
          <div className="iv-line-top">
            <Link
              className="iv-line-title"
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => layout === 'aside' && close()}
            >
              {product.title}
            </Link>
            <span className="iv-line-price">
              {line?.cost?.totalAmount ? (
                <Money data={line.cost.totalAmount} />
              ) : null}
            </span>
          </div>
          {options.length ? (
            <ul className="iv-line-options">
              {options.map((option) => (
                <li key={option.name}>
                  {option.name}: {option.value}
                </li>
              ))}
            </ul>
          ) : title && title !== 'Default Title' ? (
            <p className="iv-line-options">{title}</p>
          ) : null}
          <CartLineQuantity line={line} />
        </div>
      </div>

      {lineItemChildren ? (
        <div>
          <p id={childrenLabelId} className="sr-only">
            Items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="iv-line-children">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Controls to change the quantity of a line. They are disabled while the
 * line is still being added and the server hasn't confirmed it yet.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="iv-line-actions">
      <div className="iv-qty iv-qty--small" role="group" aria-label="Quantity">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            className="iv-qty-btn"
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
          >
            <MinusIcon />
          </button>
        </CartLineUpdateButton>
        <span className="iv-qty-value" aria-live="polite">
          {quantity}
        </span>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            className="iv-qty-btn"
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={quantity >= MAX_QUANTITY || !!isOptimistic}
          >
            <PlusIcon />
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * Removes a line from the cart. Disabled while the line is still being
 * added and the server hasn't confirmed it yet.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button className="iv-link-btn" disabled={disabled} type="submit">
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * A unique key per update, so that quick repeated clicks on the same line
 * cancel each other and only the last one runs.
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
