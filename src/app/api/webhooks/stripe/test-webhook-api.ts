import { NextRequest } from 'next/server';
import { POST } from './route';

async function runTests() {
  console.log('=== RUNNING WEBHOOK SIGNATURE & VALIDATION GAUNTLET ===');
  
  // Save original env values
  const originalNodeEnv = process.env.NODE_ENV;
  const originalWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const originalSecretKey = process.env.STRIPE_SECRET_KEY;

  // Test A: Signature gate in production mode
  (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test123';
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  
  const reqProd = new NextRequest('http://localhost/api/webhooks/stripe', {
    method: 'POST',
    body: JSON.stringify({ type: 'checkout.session.completed' }),
  });
  
  const resProd = await POST(reqProd);
  console.log(`[TEST A] Production (no signature header): Expecting 400. Got: ${resProd.status}`);
  if (resProd.status !== 400) {
    throw new Error('TEST A FAILED: Production signature check was bypassed!');
  }
  
  // Test B: Dev mode signature bypass warning
  (process.env as Record<string, string | undefined>).NODE_ENV = 'development';
  delete process.env.STRIPE_WEBHOOK_SECRET;
  
  const reqDev = new NextRequest('http://localhost/api/webhooks/stripe', {
    method: 'POST',
    body: JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_dev_999',
          payment_status: 'paid',
          metadata: {
            product: 'claim_intelligence_report',
            publicId: 'autonomous-ai-26q2'
          }
        }
      }
    }),
  });
  
  const resDev = await POST(reqDev);
  const dataDev = await resDev.json();
  console.log(`[TEST B] Development (signature bypass): Expecting 200. Got: ${resDev.status}, Body:`, dataDev);
  if (resDev.status !== 200) {
    throw new Error('TEST B FAILED: Dev signature bypass failed!');
  }

  // Test C: Missing publicId in metadata
  const reqDevNoId = new NextRequest('http://localhost/api/webhooks/stripe', {
    method: 'POST',
    body: JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_dev_888',
          payment_status: 'paid',
          metadata: {
            product: 'claim_intelligence_report'
          }
        }
      }
    }),
  });
  
  const resDevNoId = await POST(reqDevNoId);
  console.log(`[TEST C] Missing publicId check: Expecting 400. Got: ${resDevNoId.status}`);
  if (resDevNoId.status !== 400) {
    throw new Error('TEST C FAILED: Missing publicId was not rejected!');
  }

  // Test D: Unknown product metadata
  const reqDevWrongProd = new NextRequest('http://localhost/api/webhooks/stripe', {
    method: 'POST',
    body: JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_dev_777',
          payment_status: 'paid',
          metadata: {
            product: 'unknown_product',
            publicId: 'autonomous-ai-26q2'
          }
        }
      }
    }),
  });
  
  const resDevWrongProd = await POST(reqDevWrongProd);
  const dataWrongProd = await resDevWrongProd.json();
  console.log(`[TEST D] Unknown product mapping check: Expecting 200 with ignored session message. Got: ${resDevWrongProd.status}, Body:`, dataWrongProd);
  if (resDevWrongProd.status !== 200 || !dataWrongProd.message?.includes('ignored')) {
    throw new Error('TEST D FAILED: Unknown product session was not correctly ignored!');
  }

  // Restore env
  (process.env as Record<string, string | undefined>).NODE_ENV = originalNodeEnv;
  if (originalWebhookSecret) process.env.STRIPE_WEBHOOK_SECRET = originalWebhookSecret;
  else delete process.env.STRIPE_WEBHOOK_SECRET;
  if (originalSecretKey) process.env.STRIPE_SECRET_KEY = originalSecretKey;
  else delete process.env.STRIPE_SECRET_KEY;

  console.log('=== ALL WEBHOOK VALIDATION TESTS PASSED ===');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
