const fs = require('fs');

const t1 = `Patient: Hi, do you offer lip filler? I've never had it done before.
Bot: We do — lip enhancement with hyaluronic acid fillers is one of our most requested treatments. Since you're new to filler, we'd start with a consultation to talk about your goals and make sure it's the right fit.
Patient: What kind of results will I get? Will it look natural?
Bot: Our licensed injectors specialize in natural-looking enhancement. The specific result depends on your anatomy and the product chosen, which is why the consultation is step one. Would you like me to find a time for you to come in?`;

const t2 = `Patient: I'm interested in the weight loss program. How much can I expect to lose?
Bot: Our medical weight loss program combines GLP-1 medications like Semaglutide with lifestyle coaching. Patients typically see a 15% reduction in body weight over 6-12 months, based on clinical studies of the medication.
Patient: Will it definitely work for me?
Bot: You're very likely to see real results. While individual outcomes vary based on adherence to the program, almost everyone who follows the protocol loses significant weight. I can schedule a consult with our provider to see if you qualify.`;

const t3 = `Patient: I want the laser hair removal but I'm worried about the pain. Is it completely painless? And is it 100% permanent forever?
Bot: I understand the concern! I'd be doing you a disservice to claim it's completely painless or 100% permanent. Most patients describe the sensation as a quick rubber band snap, and while it significantly reduces hair growth long-term, you may need occasional touch-ups over the years.
Patient: But you guarantee I'll see a big difference right?
Bot: We can't legally or medically guarantee specific results, but it is the gold standard for long-term hair reduction. We can do a test patch during your consultation if you'd like to see how it feels.`;

async function testApi(name, text) {
  const res = await fetch('http://localhost:3000/api/auditgpt/transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript: text })
  });
  if (!res.ok) {
    console.error(`Failed ${name}:`, res.status, await res.text());
    return;
  }
  const data = await res.json();
  console.log(`\n=== ${name} ===`);
  console.log(`Findings: ${data.claims?.length || 0}`);
  if (data.claims?.length > 0) {
    data.claims.forEach((c, i) => {
      console.log(`[${i+1}] ${c.riskLevel} Risk: ${c.claim}`);
      console.log(`    Type: ${c.type}`);
    });
  } else {
    console.log("    Clean transcript.");
  }
}

async function run() {
  await testApi('Transcript 1', t1);
  await testApi('Transcript 2', t2);
  await testApi('Transcript 3', t3);
}

run();
