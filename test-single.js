async function run() {
  const res = await fetch('https://scrutexity.com/api/auditgpt/transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript: "Patient: Hello\nBot: Hi, how can I help you?" })
  });
  console.log('Status:', res.status);
  console.log('Text:', await res.text());
}
run();
