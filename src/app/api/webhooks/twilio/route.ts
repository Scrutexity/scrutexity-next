import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Tier 1: Deterministic Regex Filters
function regexRedact(text: string): string {
  let redacted = text;
  // Standard Phone Format
  redacted = redacted.replace(/(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '[REDACTED_PHONE]');
  // Simple Email Regex
  redacted = redacted.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
  // DOB (Basic)
  redacted = redacted.replace(/\b(?:0?[1-9]|1[0-2])[\/.-](?:0?[1-9]|[12][0-9]|3[01])[\/.-](?:19|20)\d{2}\b/g, '[REDACTED_DOB]');
  return redacted;
}

// Tier 2: LLM Contextual Scrubbing
async function llmRedact(text: string): Promise<string> {
  // Fast fail threshold - if it's very short, maybe regex was enough, but we'll run it anyway
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a secure compliance middleware. Remove all protected health information (PHI) and personally identifiable information (PII) like names, specific medical conditions, treatment dates, or addresses from this message. Replace them with [REDACTED_PHI]. Retain only the operational marketing context. Output only the redacted text and nothing else.\n\nInput: ${text}`,
    });
    
    return response.text?.trim() || '[REDACTED_ERROR]';
  } catch (error) {
    console.error('Tier 2 Redaction Failed, falling back to strict regex:', error);
    return regexRedact(text); // Secure fallback
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const rawBody = formData.get('Body') as string;
    
    if (!rawBody) return NextResponse.json({ success: false, error: 'No body' }, { status: 400 });

    // Execute Hybrid Redaction Pipeline
    const baseCleaned = regexRedact(rawBody);
    const fullyRedacted = await llmRedact(baseCleaned);

    // TODO: Write to SQLite database securely (e.g. tracking missed calls/inquiries for Recovery)
    // Here we'll just log that it was successfully redacted and governed for SOC2 purposes.
    console.log(`[TWILIO INGRESS GOVERNED] Redacted Body: ${fullyRedacted}`);

    return NextResponse.json({ success: true, status: 'Governed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
