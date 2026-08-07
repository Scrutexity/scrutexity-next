import type Stripe from 'stripe';

export const CLAIM_SUPPORT_AMOUNT_CENTS = 9_900;
export const CLAIM_SUPPORT_CURRENCY = 'usd';
export const CLAIM_SUPPORT_PRODUCT = 'claim_support_review';

export async function verifyClaimSupportSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  configuredPriceId: string,
) {
  if (
    session.mode !== 'payment'
    || session.payment_status !== 'paid'
    || session.amount_total !== CLAIM_SUPPORT_AMOUNT_CENTS
    || session.currency !== CLAIM_SUPPORT_CURRENCY
    || session.metadata?.product !== CLAIM_SUPPORT_PRODUCT
    || !session.metadata?.inquiryId
  ) {
    return { valid: false as const, reason: 'session_mismatch' };
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 2 });
  const lineItem = lineItems.data[0];
  if (
    lineItems.data.length !== 1
    || lineItem?.price?.id !== configuredPriceId
    || lineItem.quantity !== 1
  ) {
    return { valid: false as const, reason: 'line_item_mismatch' };
  }

  return {
    valid: true as const,
    inquiryId: session.metadata.inquiryId,
    priceId: configuredPriceId,
    amountTotal: session.amount_total,
    currency: session.currency,
  };
}
