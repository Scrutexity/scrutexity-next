const https = require('https');

const VERCEL_URL = 'https://scrutexity.com';

async function testLiveFlow() {
  console.log('1. Testing Live Funnel Scan API...');
  try {
    const res = await fetch(`${VERCEL_URL}/api/funnel/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl: 'https://acmeaesthetics.com' })
    });
    const text = await res.text();
    console.log(`Scan Response Status: ${res.status}`);
    
    if (res.ok) {
      const data = JSON.parse(text);
      console.log('Scan Token Received:', data.scanToken ? 'YES' : 'NO');
    } else {
      console.log('Scan Failed:', text);
    }
  } catch (err) {
    console.error('Error fetching scan:', err.message);
  }

  console.log('\n2. Testing Homepage for Counsel Advisory...');
  try {
    const res = await fetch(VERCEL_URL);
    const html = await res.text();
    const hasQuote = html.includes('The days of manual claim review are over');
    console.log(`Counsel Advisory Quote Visible in DOM: ${hasQuote ? 'YES' : 'NO'}`);
  } catch (err) {
    console.error('Error fetching homepage:', err.message);
  }
}

testLiveFlow();
