import crypto from 'crypto';
import type { InquiryOffer } from '@/lib/inquiry-offers';

export type { InquiryOffer } from '@/lib/inquiry-offers';

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  websiteUrl: string;
  offer: InquiryOffer;
  context: string | null;
  source: string;
  consent: true;
  environment: string;
  status: 'submitted' | 'paid';
  createdAt: string;
  paidAt?: string;
  stripeSessionId?: string;
  stripePriceId?: string;
  amountTotal?: number;
  currency?: string;
  submissionNotifiedAt?: string;
  paymentNotifiedAt?: string;
}

const RECORD_TTL_SECONDS = 90 * 24 * 60 * 60;
const IDEMPOTENCY_TTL_SECONDS = 24 * 60 * 60;

function storageNamespace() {
  const value = process.env.INQUIRY_STORAGE_NAMESPACE
    ?? process.env.VERCEL_ENV
    ?? (process.env.NODE_ENV === 'production' ? 'production' : 'development');
  return value.toLowerCase().replace(/[^a-z0-9_-]/g, '-').slice(0, 40);
}

function storageKey(suffix: string) {
  return `scrutexity:${storageNamespace()}:${suffix}`;
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function command<T>(args: Array<string | number>): Promise<T> {
  const config = getUpstashConfig();
  if (!config) throw new Error('INQUIRY_STORAGE_NOT_CONFIGURED');

  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`INQUIRY_STORAGE_FAILED_${response.status}`);
  const payload = (await response.json()) as { result?: T; error?: string };
  if (payload.error) throw new Error('INQUIRY_STORAGE_COMMAND_FAILED');
  return payload.result as T;
}

export async function saveInquiry(
  input: Omit<InquiryRecord, 'id' | 'status' | 'createdAt' | 'environment'>,
  idempotencyKey: string,
): Promise<{ record: InquiryRecord; duplicate: boolean }> {
  const idempotencyRedisKey = storageKey(`inquiry-idempotency:${idempotencyKey}`);
  const id = crypto.randomUUID();
  const record: InquiryRecord = {
    ...input,
    id,
    environment: storageNamespace(),
    status: 'submitted',
    createdAt: new Date().toISOString(),
  };
  const recordKey = storageKey(`inquiry:${id}`);
  const indexKey = storageKey('inquiries');
  const script = `
    local existing = redis.call('GET', KEYS[1])
    if existing then return 'existing:' .. existing end
    redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[3])
    redis.call('SET', KEYS[2], ARGV[2], 'EX', ARGV[4])
    redis.call('LPUSH', KEYS[3], ARGV[1])
    redis.call('LTRIM', KEYS[3], 0, 999)
    redis.call('EXPIRE', KEYS[3], ARGV[4])
    return 'created:' .. ARGV[1]
  `;
  const result = await command<string>([
    'EVAL',
    script,
    3,
    idempotencyRedisKey,
    recordKey,
    indexKey,
    id,
    JSON.stringify(record),
    IDEMPOTENCY_TTL_SECONDS,
    RECORD_TTL_SECONDS,
  ]);

  if (result.startsWith('existing:')) {
    const existing = await getInquiry(result.slice('existing:'.length));
    if (!existing) throw new Error('INQUIRY_IDEMPOTENCY_CONFLICT');
    return { record: existing, duplicate: true };
  }
  return { record, duplicate: false };
}

export async function getInquiry(id: string): Promise<InquiryRecord | null> {
  const raw = await command<string | null>(['GET', storageKey(`inquiry:${id}`)]);
  if (!raw) return null;
  return JSON.parse(raw) as InquiryRecord;
}

export async function markInquiryPaid(input: {
  id: string;
  stripeSessionId: string;
  stripePriceId: string;
  amountTotal: number;
  currency: string;
}): Promise<{ record: InquiryRecord; changed: boolean }> {
  const script = `
    local raw = redis.call('GET', KEYS[1])
    if not raw then return redis.error_reply('INQUIRY_NOT_FOUND') end
    local record = cjson.decode(raw)
    if record.status == 'paid' then
      return cjson.encode({ changed = false, record = record })
    end
    record.status = 'paid'
    record.paidAt = ARGV[1]
    record.stripeSessionId = ARGV[2]
    record.stripePriceId = ARGV[3]
    record.amountTotal = tonumber(ARGV[4])
    record.currency = ARGV[5]
    redis.call('SET', KEYS[1], cjson.encode(record), 'EX', ARGV[6])
    return cjson.encode({ changed = true, record = record })
  `;
  const result = await command<string>([
    'EVAL',
    script,
    1,
    storageKey(`inquiry:${input.id}`),
    new Date().toISOString(),
    input.stripeSessionId,
    input.stripePriceId,
    input.amountTotal,
    input.currency,
    RECORD_TTL_SECONDS,
  ]);
  return JSON.parse(result) as { record: InquiryRecord; changed: boolean };
}

export async function claimInquiryNotification(id: string, kind: 'submission' | 'payment') {
  const result = await command<'OK' | null>([
    'SET',
    storageKey(`inquiry-notification:${kind}:${id}`),
    'claimed',
    'EX',
    RECORD_TTL_SECONDS,
    'NX',
  ]);
  return result === 'OK';
}

export async function releaseInquiryNotification(id: string, kind: 'submission' | 'payment') {
  await command(['DEL', storageKey(`inquiry-notification:${kind}:${id}`)]);
}

export async function markInquiryNotificationSent(id: string, kind: 'submission' | 'payment') {
  const field = kind === 'submission' ? 'submissionNotifiedAt' : 'paymentNotifiedAt';
  const script = `
    local raw = redis.call('GET', KEYS[1])
    if not raw then return redis.error_reply('INQUIRY_NOT_FOUND') end
    local record = cjson.decode(raw)
    record[ARGV[1]] = ARGV[2]
    redis.call('SET', KEYS[1], cjson.encode(record), 'EX', ARGV[3])
    return cjson.encode(record)
  `;
  const result = await command<string>([
    'EVAL',
    script,
    1,
    storageKey(`inquiry:${id}`),
    field,
    new Date().toISOString(),
    RECORD_TTL_SECONDS,
  ]);
  return JSON.parse(result) as InquiryRecord;
}
