import crypto from 'crypto';

export type InquiryOffer =
  | 'claim-support-review'
  | 'founders-audit'
  | 'agency-claim-qa'
  | 'agent-evidence-pack'
  | 'monitoring';

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  websiteUrl: string;
  offer: InquiryOffer;
  context: string | null;
  source: string;
  consent: true;
  status: 'submitted' | 'paid';
  createdAt: string;
  paidAt?: string;
  stripeSessionId?: string;
}

const RECORD_TTL_SECONDS = 90 * 24 * 60 * 60;
const IDEMPOTENCY_TTL_SECONDS = 24 * 60 * 60;
const INDEX_KEY = 'scrutexity:inquiries';

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
  input: Omit<InquiryRecord, 'id' | 'status' | 'createdAt'>,
  idempotencyKey: string,
): Promise<{ record: InquiryRecord; duplicate: boolean }> {
  const idempotencyRedisKey = `scrutexity:inquiry-idempotency:${idempotencyKey}`;
  const existingId = await command<string | null>(['GET', idempotencyRedisKey]);

  if (existingId) {
    const existing = await getInquiry(existingId);
    if (existing) return { record: existing, duplicate: true };
  }

  const id = crypto.randomUUID();
  const claimed = await command<'OK' | null>([
    'SET',
    idempotencyRedisKey,
    id,
    'EX',
    IDEMPOTENCY_TTL_SECONDS,
    'NX',
  ]);

  if (!claimed) {
    const winnerId = await command<string | null>(['GET', idempotencyRedisKey]);
    if (winnerId) {
      const winner = await getInquiry(winnerId);
      if (winner) return { record: winner, duplicate: true };
    }
    throw new Error('INQUIRY_IDEMPOTENCY_CONFLICT');
  }

  const record: InquiryRecord = {
    ...input,
    id,
    status: 'submitted',
    createdAt: new Date().toISOString(),
  };
  const recordKey = `scrutexity:inquiry:${id}`;

  await command(['SET', recordKey, JSON.stringify(record), 'EX', RECORD_TTL_SECONDS]);
  await command(['LPUSH', INDEX_KEY, id]);
  await command(['LTRIM', INDEX_KEY, 0, 999]);

  return { record, duplicate: false };
}

export async function getInquiry(id: string): Promise<InquiryRecord | null> {
  const raw = await command<string | null>(['GET', `scrutexity:inquiry:${id}`]);
  if (!raw) return null;
  return JSON.parse(raw) as InquiryRecord;
}

export async function markInquiryPaid(id: string, stripeSessionId: string) {
  const record = await getInquiry(id);
  if (!record) throw new Error('INQUIRY_NOT_FOUND');
  if (record.status === 'paid') return record;

  const updated: InquiryRecord = {
    ...record,
    status: 'paid',
    paidAt: new Date().toISOString(),
    stripeSessionId,
  };
  await command([
    'SET',
    `scrutexity:inquiry:${id}`,
    JSON.stringify(updated),
    'EX',
    RECORD_TTL_SECONDS,
  ]);
  return updated;
}
