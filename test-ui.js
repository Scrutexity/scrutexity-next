const { chromium } = require('playwright');
const fs = require('fs');

const transcripts = [
  {
    name: 'Transcript 1',
    text: `Patient: Hi, do you offer lip filler? I've never had it done before. My name is Sarah and my number is 555-0199.
Bot: We do — lip enhancement with hyaluronic acid fillers is one of our most requested treatments. Since you're new to filler, we'd start with a consultation to talk about your goals and make sure it's the right fit.
Patient: What kind of results will I get? Will it look natural?
Bot: Our licensed injectors specialize in natural-looking enhancement. The specific result depends on your anatomy and the product chosen, which is why the consultation is step one. Would you like me to find a time for you to come in?`
  },
  {
    name: 'Transcript 2',
    text: `Patient: I'm interested in the weight loss program. How much can I expect to lose?
Bot: Our medical weight loss program combines GLP-1 medications like Semaglutide with lifestyle coaching. Patients typically see a 15% reduction in body weight over 6-12 months, based on clinical studies of the medication.
Patient: Will it definitely work for me?
Bot: You're very likely to see real results. While individual outcomes vary based on adherence to the program, almost everyone who follows the protocol loses significant weight. I can schedule a consult with our provider to see if you qualify.`
  },
  {
    name: 'Transcript 3',
    text: `Patient: I want the laser hair removal but I'm worried about the pain. Is it completely painless? And is it 100% permanent forever?
Bot: I understand the concern! I'd be doing you a disservice to claim it's completely painless or 100% permanent. Most patients describe the sensation as a quick rubber band snap, and while it significantly reduces hair growth long-term, you may need occasional touch-ups over the years.
Patient: But you guarantee I'll see a big difference right?
Bot: We can't legally or medically guarantee specific results, but it is the gold standard for long-term hair reduction. We can do a test patch during your consultation if you'd like to see how it feels.`
  }
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (let i = 0; i < transcripts.length; i++) {
    const t = transcripts[i];
    console.log(`\n=== Running ${t.name} ===`);
    
    await page.goto('https://scrutexity.com/agent-audit');
    await page.waitForLoadState('networkidle');
    
    // Fill the textarea
    await page.fill('textarea', t.text);
    
    // Click submit
    await page.click('button:has-text("Audit Transcript")');
    
    // Wait for the result page to render or an error to appear
    try {
      await page.waitForSelector('text=Audit Receipt', { timeout: 15000 });
      console.log('Success: Receipt page loaded.');
      
      const content = await page.innerText('body');
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      
      // Save screenshot
      await page.screenshot({ path: `receipt-${i+1}.png`, fullPage: true });
      
      console.log(`Findings count from text:`, content.match(/Findings/i) ? 'Found findings text' : 'No findings text');
      
      // Look for the specific elements
      const metadata = await page.innerText('div'); // Grab all text and search
      if (metadata.includes('gemini-2.5-flash')) console.log('Metadata: gemini-2.5-flash found.');
      if (metadata.includes('[NAME]') || metadata.includes('[PHONE]')) console.log('PHI: Masked PHI found.');
      if (metadata.includes('Internal Server Error')) console.log('Error: Internal Server Error displayed on UI.');
      
      console.log(`Summary of ${t.name} body:\n` + lines.slice(0, 30).join('\n'));
      
    } catch (err) {
      console.log('Error or timeout waiting for receipt:', err.message);
      const content = await page.innerText('body');
      console.log('Page content:', content.slice(0, 500));
      await page.screenshot({ path: `error-${i+1}.png`, fullPage: true });
    }
  }
  
  await browser.close();
})();
