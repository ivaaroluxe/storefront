import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useId, useRef, useState} from 'react';
import {useFetcher, type FetcherWithComponents} from 'react-router';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

const NOTE_MAX = 300;

export function CartSummary({cart, layout}: CartSummaryProps) {
  const summaryId = useId();
  const discountsHeadingId = useId();
  const discountCodeInputId = useId();
  const giftCardHeadingId = useId();
  const giftCardInputId = useId();

  return (
    <div
      aria-labelledby={summaryId}
      className={`iv-summary iv-summary--${layout}`}
    >
      <h2 id={summaryId} className="iv-summary-title">
        {layout === 'page' ? 'Order summary' : 'Summary'}
      </h2>

      <CartNote note={cart?.note} />

      <details className="iv-summary-codes">
        <summary>Discount or gift card</summary>
        <CartDiscounts
          discountCodes={cart?.discountCodes}
          discountsHeadingId={discountsHeadingId}
          discountCodeInputId={discountCodeInputId}
        />
        <CartGiftCard
          giftCardCodes={cart?.appliedGiftCards}
          giftCardHeadingId={giftCardHeadingId}
          giftCardInputId={giftCardInputId}
        />
      </details>

      <dl className="iv-summary-row">
        <dt>Subtotal</dt>
        <dd>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '–'
          )}
        </dd>
      </dl>
      <p className="iv-summary-fine">
        Taxes and delivery are calculated at checkout.
      </p>

      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

/**
 * "What I wish for you…" — an optional personal message saved on the cart
 * as the order note, so it appears with the order in Shopify admin.
 */
function CartNote({note}: {note?: string | null}) {
  const noteId = useId();
  const hintId = useId();
  const [length, setLength] = useState(note?.length ?? 0);

  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.NoteUpdate}>
      {(fetcher: FetcherWithComponents<any>) => {
        const saving = fetcher.state !== 'idle';
        const saved = !saving && fetcher.data && !fetcher.data.errors?.length;
        return (
          <div className="iv-note">
            <label htmlFor={noteId} className="iv-note-label">
              What I wish for you…
              <span className="iv-note-optional">Optional</span>
            </label>
            <textarea
              id={noteId}
              name="note"
              rows={3}
              maxLength={NOTE_MAX}
              defaultValue={note ?? ''}
              aria-describedby={hintId}
              placeholder="A few words for the person receiving this gift"
              onChange={(e) => setLength(e.currentTarget.value.length)}
              onBlur={(e) => {
                if ((e.currentTarget.value ?? '') !== (note ?? '')) {
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <div className="iv-note-foot">
              <span id={hintId}>
                {saving
                  ? 'Saving…'
                  : saved
                    ? 'Message saved with your order.'
                    : `${length}/${NOTE_MAX}`}
              </span>
              <button type="submit" className="iv-link-btn" disabled={saving}>
                Save message
              </button>
            </div>
          </div>
        );
      }}
    </CartForm>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="iv-checkout">
      <a
        href={checkoutUrl}
        target="_self"
        className="iv-btn iv-btn--gold iv-btn--block iv-btn--tall"
      >
        Checkout securely
      </a>
      <p className="iv-checkout-note">
        <svg
          width="14"
          height="14"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="7" y="14" width="18" height="14" />
          <path d="M11 14V10a5 5 0 0 1 10 0v4" />
        </svg>
        Secure checkout · UPI, cards and netbanking
      </p>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
  discountsHeadingId,
  discountCodeInputId,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
  discountsHeadingId: string;
  discountCodeInputId: string;
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <section aria-label="Discounts" className="iv-code-block">
      {/* Applied discount, with a remove option */}
      {codes.length ? (
        <UpdateDiscountForm>
          <div
            className="iv-code-applied"
            role="group"
            aria-labelledby={discountsHeadingId}
          >
            <span id={discountsHeadingId}>Discount</span>
            <code>{codes.join(', ')}</code>
            <button
              type="submit"
              className="iv-link-btn"
              aria-label="Remove discount"
            >
              Remove
            </button>
          </div>
        </UpdateDiscountForm>
      ) : null}

      {/* Input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="iv-code-row">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Discount code
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Discount code"
            autoComplete="off"
          />
          <button
            type="submit"
            className="iv-btn iv-btn--outline"
            aria-label="Apply discount code"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </section>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
  giftCardHeadingId,
  giftCardInputId,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
  giftCardHeadingId: string;
  giftCardInputId: string;
}) {
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const previousCardIdsRef = useRef<string[]>([]);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});
  const [removedCardIndex, setRemovedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      if (giftCardCodeInput.current !== null) {
        giftCardCodeInput.current.value = '';
      }
    }
  }, [giftCardAddFetcher.data]);

  useEffect(() => {
    const currentCardIds = giftCardCodes?.map((card) => card.id) || [];

    if (removedCardIndex !== null && giftCardCodes) {
      const focusTargetIndex = Math.min(
        removedCardIndex,
        giftCardCodes.length - 1,
      );
      const focusTargetCard = giftCardCodes[focusTargetIndex];
      const focusButton = focusTargetCard
        ? removeButtonRefs.current.get(focusTargetCard.id)
        : null;

      if (focusButton) {
        focusButton.focus();
      } else if (giftCardCodeInput.current) {
        giftCardCodeInput.current.focus();
      }

      setRemovedCardIndex(null);
    }

    previousCardIdsRef.current = currentCardIds;
  }, [giftCardCodes, removedCardIndex]);

  const handleRemoveClick = (cardId: string) => {
    const index = previousCardIdsRef.current.indexOf(cardId);
    if (index !== -1) {
      setRemovedCardIndex(index);
    }
  };

  return (
    <section aria-label="Gift cards" className="iv-code-block">
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl>
          <dt id={giftCardHeadingId} className="sr-only">
            Applied gift cards
          </dt>
          {giftCardCodes.map((giftCard) => (
            <dd key={giftCard.id} className="iv-code-applied">
              <RemoveGiftCardForm
                giftCardId={giftCard.id}
                lastCharacters={giftCard.lastCharacters}
                onRemoveClick={() => handleRemoveClick(giftCard.id)}
                buttonRef={(el: HTMLButtonElement | null) => {
                  if (el) {
                    removeButtonRefs.current.set(giftCard.id, el);
                  } else {
                    removeButtonRefs.current.delete(giftCard.id);
                  }
                }}
              >
                <span>Gift card</span>
                <code>•••• {giftCard.lastCharacters}</code>
                <Money data={giftCard.amountUsed} />
              </RemoveGiftCardForm>
            </dd>
          ))}
        </dl>
      )}

      <AddGiftCardForm fetcherKey="gift-card-add">
        <div className="iv-code-row">
          <label htmlFor={giftCardInputId} className="sr-only">
            Gift card code
          </label>
          <input
            id={giftCardInputId}
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            autoComplete="off"
            ref={giftCardCodeInput}
          />
          <button
            type="submit"
            className="iv-btn iv-btn--outline"
            disabled={giftCardAddFetcher.state !== 'idle'}
            aria-label="Apply gift card code"
          >
            Apply
          </button>
        </div>
      </AddGiftCardForm>
    </section>
  );
}

function AddGiftCardForm({
  fetcherKey,
  children,
}: {
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  lastCharacters,
  children,
  onRemoveClick,
  buttonRef,
}: {
  giftCardId: string;
  lastCharacters: string;
  children: React.ReactNode;
  onRemoveClick?: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
      <button
        type="submit"
        className="iv-link-btn"
        aria-label={`Remove gift card ending in ${lastCharacters}`}
        onClick={onRemoveClick}
        ref={buttonRef}
      >
        Remove
      </button>
    </CartForm>
  );
}
