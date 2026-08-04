import assert from 'node:assert/strict';

const values = new Map();
const lists = new Map();

function setValue(key, value) {
  values.set(String(key), String(value));
}

globalThis.fetch = async (_url, init) => {
  const args = JSON.parse(init.body);
  const name = String(args[0]).toUpperCase();
  let result = null;

  if (name === 'GET') result = values.get(String(args[1])) ?? null;
  if (name === 'SET') {
    const key = String(args[1]);
    if (args.map(String).includes('NX') && values.has(key)) result = null;
    else {
      setValue(key, args[2]);
      result = 'OK';
    }
  }
  if (name === 'DEL') result = values.delete(String(args[1])) ? 1 : 0;
  if (name === 'EVAL') {
    const keyCount = Number(args[2]);
    const keys = args.slice(3, 3 + keyCount).map(String);
    const argv = args.slice(3 + keyCount).map(String);
    const script = String(args[1]);

    if (script.includes("return 'created:'")) {
      const existing = values.get(keys[0]);
      if (existing) result = `existing:${existing}`;
      else {
        setValue(keys[0], argv[0]);
        setValue(keys[1], argv[1]);
        lists.set(keys[2], [argv[0], ...(lists.get(keys[2]) ?? [])].slice(0, 1000));
        result = `created:${argv[0]}`;
      }
    } else if (script.includes("record.status = 'paid'")) {
      const record = JSON.parse(values.get(keys[0]));
      if (record.status === 'paid') result = JSON.stringify({ changed: false, record });
      else {
        Object.assign(record, {
          status: 'paid',
          paidAt: argv[0],
          stripeSessionId: argv[1],
          stripePriceId: argv[2],
          amountTotal: Number(argv[3]),
          currency: argv[4],
        });
        setValue(keys[0], JSON.stringify(record));
        result = JSON.stringify({ changed: true, record });
      }
    } else if (script.includes('record[ARGV[1]]')) {
      const record = JSON.parse(values.get(keys[0]));
      record[argv[0]] = argv[1];
      setValue(keys[0], JSON.stringify(record));
      result = JSON.stringify(record);
    }
  }

  return new Response(JSON.stringify({ result }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

process.env.UPSTASH_REDIS_REST_URL = 'https://redis.invalid';
process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
process.env.VERCEL_ENV = 'preview';

const inquiries = await import('../src/lib/inquiries.ts');
const offers = await import('../src/lib/inquiry-offers.ts');
const payments = await import('../src/lib/claim-support-payment.ts');
const { Stripe } = await import('stripe');

const input = {
  name: 'Internal Test',
  email: 'owner@example.com',
  websiteUrl: 'https://example.com',
  offer: 'claim-support-review',
  context: 'Launch gate test',
  source: 'test',
  consent: true,
};
const first = await inquiries.saveInquiry(input, 'launch-gate-idempotency-001');
const duplicate = await inquiries.saveInquiry(input, 'launch-gate-idempotency-001');
assert.equal(first.duplicate, false);
assert.equal(duplicate.duplicate, true);
assert.equal(duplicate.record.id, first.record.id);
assert.equal(first.record.environment, 'preview');

assert.deepEqual(offers.INQUIRY_OFFER_VALUES, [
  'claim-support-review',
  'founders-audit',
  'agency-claim-qa',
  'agent-evidence-pack',
  'monitoring',
]);
assert.equal(offers.INQUIRY_OFFERS['claim-support-review'].scoped, false);
for (const offer of offers.INQUIRY_OFFER_VALUES.filter((value) => value !== 'claim-support-review')) {
  assert.equal(offers.INQUIRY_OFFERS[offer].scoped, true);
}

const agency = await inquiries.saveInquiry({
  ...input,
  offer: 'agency-claim-qa',
  source: 'agency-test',
}, 'launch-gate-agency-001');
assert.equal(agency.record.offer, 'agency-claim-qa');
assert.equal(offers.INQUIRY_OFFERS[agency.record.offer].submitLabel, 'Send Agency Claim QA inquiry');

const paid = await inquiries.markInquiryPaid({
  id: first.record.id,
  stripeSessionId: 'cs_test_internal',
  stripePriceId: 'price_test_internal',
  amountTotal: 9_900,
  currency: 'usd',
});
const repeatedPayment = await inquiries.markInquiryPaid({
  id: first.record.id,
  stripeSessionId: 'cs_test_internal',
  stripePriceId: 'price_test_internal',
  amountTotal: 9_900,
  currency: 'usd',
});
assert.equal(paid.changed, true);
assert.equal(repeatedPayment.changed, false);

assert.equal(await inquiries.claimInquiryNotification(first.record.id, 'payment'), true);
assert.equal(await inquiries.claimInquiryNotification(first.record.id, 'payment'), false);
await inquiries.releaseInquiryNotification(first.record.id, 'payment');
assert.equal(await inquiries.claimInquiryNotification(first.record.id, 'payment'), true);

const stripe = {
  checkout: {
    sessions: {
      listLineItems: async () => ({
        data: [{ price: { id: 'price_test_internal' }, quantity: 1 }],
      }),
    },
  },
};
const session = {
  id: 'cs_test_internal',
  mode: 'payment',
  payment_status: 'paid',
  amount_total: 9_900,
  currency: 'usd',
  metadata: { product: 'claim_support_review', inquiryId: first.record.id },
};
assert.equal((await payments.verifyClaimSupportSession(stripe, session, 'price_test_internal')).valid, true);
assert.equal((await payments.verifyClaimSupportSession(stripe, { ...session, amount_total: 9_800 }, 'price_test_internal')).valid, false);
assert.equal((await payments.verifyClaimSupportSession(stripe, session, 'price_other')).valid, false);
assert.equal((await payments.verifyClaimSupportSession(stripe, { ...session, payment_status: 'unpaid' }, 'price_test_internal')).valid, false);

const stripeClient = new Stripe('sk_test_launch_gate');
const webhookPayload = JSON.stringify({ id: 'evt_internal', type: 'checkout.session.completed' });
const webhookSecret = 'whsec_launch_gate_internal';
const validHeader = stripeClient.webhooks.generateTestHeaderString({
  payload: webhookPayload,
  secret: webhookSecret,
});
assert.equal(
  stripeClient.webhooks.constructEvent(webhookPayload, validHeader, webhookSecret).id,
  'evt_internal',
);
assert.throws(() => stripeClient.webhooks.constructEvent(webhookPayload, validHeader, 'whsec_wrong'));

console.log('launch-gate tests passed');
