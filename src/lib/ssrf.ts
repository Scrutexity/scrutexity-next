// src/lib/ssrf.ts
// Single source of truth for outbound-URL safety on any server-side fetch of
// user-supplied URLs (scanner, /audit pipeline, report intake). Every scraper
// MUST route through fetchPublicPage() rather than calling fetch() directly.
//
// Guards: scheme allowlist, embedded credentials, non-standard ports,
// localhost/.local, literal private/reserved IPs (incl. IPv4-mapped IPv6),
// DNS resolution to a private address, redirect-to-internal (redirect:'error'),
// response size bound, content-type, and a request timeout.

import dns from 'node:dns/promises';
import net from 'node:net';

const MAX_RESPONSE_BYTES = 1_500_000;
const DEFAULT_TIMEOUT_MS = 12_000;

export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    if (a === 0) return true; // 0.0.0.0/8
    if (a === 10) return true; // private
    if (a === 127) return true; // loopback
    if (a === 169 && b === 254) return true; // link-local / cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true; // private
    if (a === 192 && b === 168) return true; // private
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a >= 224) return true; // multicast / reserved
    return false;
  }

  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase().split('%')[0];
    if (lower === '::' || lower === '::1') return true; // unspecified / loopback
    if (lower.startsWith('fe80:')) return true; // link-local
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // unique-local
    // IPv4-mapped (::ffff:a.b.c.d or ::ffff:aabb:ccdd) — extract and re-check as v4
    const mapped = lower.match(/^::ffff:(?:0:)?(?:(\d+\.\d+\.\d+\.\d+)|([0-9a-f]{1,4}):([0-9a-f]{1,4}))$/);
    if (mapped) {
      if (mapped[1]) return isPrivateIp(mapped[1]);
      const hi = parseInt(mapped[2], 16);
      const lo = parseInt(mapped[3], 16);
      const v4 = `${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`;
      return isPrivateIp(v4);
    }
    return false;
  }

  return true; // not a parseable IP → refuse
}

/**
 * Validate and canonicalize a user-supplied URL. Throws on anything unsafe.
 * Resolves DNS and rejects if any resolved address is private/reserved.
 */
export async function assertPublicHttpUrl(rawUrl: string): Promise<URL> {
  const trimmed = String(rawUrl ?? '').trim();
  const value = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(value);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only public HTTP and HTTPS URLs are supported.');
  }
  if (url.username || url.password) {
    throw new Error('URLs containing credentials are not supported.');
  }
  if (url.port && !['80', '443'].includes(url.port)) {
    throw new Error('Non-standard ports are not supported.');
  }
  const host = url.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) {
    throw new Error('Local network URLs are not supported.');
  }
  if (net.isIP(url.hostname) && isPrivateIp(url.hostname)) {
    throw new Error('Private or reserved network addresses are not supported.');
  }

  const addresses = await dns.lookup(url.hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error('Domain resolves to a private or reserved network address.');
  }

  return url;
}

async function readBoundedText(response: Response): Promise<string> {
  const declared = Number(response.headers.get('content-length') || 0);
  if (declared > MAX_RESPONSE_BYTES) throw new Error('Website response is too large.');
  if (!response.body) return '';

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let out = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw new Error('Website response is too large.');
    }
    out += decoder.decode(value, { stream: true });
  }
  return out + decoder.decode();
}

export interface FetchPublicPageResult {
  url: string;
  html: string;
}

/**
 * SSRF-safe fetch of an HTML page from a user-supplied URL.
 * Throws on validation failure, non-HTML response, oversize body, or timeout.
 */
export async function fetchPublicPage(
  rawUrl: string,
  opts: { timeoutMs?: number; userAgent?: string } = {},
): Promise<FetchPublicPageResult> {
  const target = await assertPublicHttpUrl(rawUrl);

  const response = await fetch(target, {
    redirect: 'error', // block redirect-to-internal after the DNS pre-check
    signal: AbortSignal.timeout(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    headers: {
      'User-Agent':
        opts.userAgent ??
        'Mozilla/5.0 (compatible; ScrutexityScanner/1.0; +https://scrutexity.com)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }
  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
    throw new Error('URL did not return an HTML document.');
  }

  const html = await readBoundedText(response);
  return { url: target.toString(), html };
}
