import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem, type CartLine} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

export type LineItemChildrenMap = {[parentId: string]: CartLine[]};
/** Returns a map of all line items and their children. */
function getLineItemChildrenMap(lines: CartLine[]): LineItemChildrenMap {
  const children: LineItemChildrenMap = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart drawer.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  if (!cartHasItems) {
    return <CartEmpty layout={layout} />;
  }

  return (
    <section
      className={`iv-cart iv-cart--${layout}`}
      aria-label={layout === 'page' ? 'Your bag' : 'Bag drawer'}
    >
      <div className="iv-cart-lines">
        <p id={`cart-lines-${layout}`} className="sr-only">
          Items in your bag
        </p>
        <ul aria-labelledby={`cart-lines-${layout}`}>
          {(cart?.lines?.nodes ?? []).map((line) => {
            // we do not render non-parent lines at the root of the cart
            if (
              'parentRelationship' in line &&
              line.parentRelationship?.parent
            ) {
              return null;
            }
            return (
              <CartLineItem
                key={line.id}
                line={line}
                layout={layout}
                childrenMap={childrenMap}
              />
            );
          })}
        </ul>
      </div>
      <CartSummary cart={cart} layout={layout} />
    </section>
  );
}

function CartEmpty({layout}: {layout: CartLayout}) {
  const {close} = useAside();
  return (
    <div className={`iv-cart-empty iv-cart-empty--${layout}`}>
      <img
        src="/images/ivaaro-emblem.png"
        alt=""
        width={48}
        height={46}
        loading="lazy"
      />
      <p className="iv-cart-empty-title">Your bag is empty.</p>
      <p>Something chosen with care, for someone you love or for yourself.</p>
      <Link
        to="/collections/all"
        onClick={close}
        prefetch="viewport"
        className="iv-btn iv-btn--plum"
      >
        Discover the pen
      </Link>
    </div>
  );
}
