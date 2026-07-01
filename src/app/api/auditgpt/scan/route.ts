import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const claimSchema: Schema = {
  type: Type.ARRAY,
  description: 'A list of compliance claims found on the website.',
  items: {
    type: Type.OBJECT,
    properties: {
      claim: { type: Type.STRING, description: 'The exact quote or summarized claim from the website.' },
      type: { type: Type.STRING, description: 'Category of the claim (e.g. "Clinical Efficacy · Weight Loss").' },
      status: {
        type: Type.STRING,
        description: 'Status of the claim.',
        enum: ['Reviewed', 'Weakly Supported', 'Unsupported', 'Overstated', 'Insufficient Public Evidence'],
      },
      riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'], description: 'Regulatory risk level.' },
      sourceType: { type: Type.STRING, description: 'Where it was found (e.g. "Homepage Hero", "Service Page").' },
      whyItMatters: { type: Type.STRING, description: 'Why this is a risk for FDA, FTC, or HIPAA compliance.' },
      evidenceFound: { type: Type.STRING, description: 'What public evidence (if any) was found.' },
      evidenceGap: { type: Type.STRING, description: 'What evidence is missing to make this claim compliant.' },
      recommendedAction: { type: Type.STRING, description: 'Actionable fix for the operator.' },
      saferFraming: { type: Type.STRING, description: 'A revised, compliant version of the claim.' },
      requiredProof: { type: Type.STRING, description: 'What documentation is needed to verify the original claim.' },
    },
    required: [
      'claim', 'type', 'status', 'riskLevel', 'sourceType', 'whyItMatters', 
      'evidenceFound', 'evidenceGap', 'recommendedAction', 'saferFraming', 'requiredProof'
    ]
  }
};

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    // Attempt to fetch the HTML of the target URL
    let textContent = '';
    try {
      // In a production environment, you might use Puppeteer, Playwright, or a specialized scraping API.
      // For this DDaaS pilot, a standard fetch usually works for basic Medspa sites, though SPAs may fail.
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Scrutexity/1.0',
          'Accept': 'text/html'
        },
        // timeout is not natively supported in fetch, but this is a simple implementation
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      const html = await response.text();
      // Strip HTML tags naively to extract text content
      textContent = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();
    } catch (e) {
      console.error('Failed to scrape URL:', e);
      return NextResponse.json({ success: false, error: 'Failed to access the provided URL. Ensure it is public and accessible.' }, { status: 400 });
    }

    if (!textContent || textContent.length < 50) {
      return NextResponse.json({ success: false, error: 'Not enough text content found on the page to analyze.' }, { status: 400 });
    }

    // Truncate to reasonable limits to avoid excessive token usage
    const truncatedText = textContent.slice(0, 15000);

    const systemPrompt = `You are a strict FTC, FDA, and HIPAA compliance auditor for the medical aesthetics and private equity space.
Review the following extracted website text from a Medspa/clinic and identify up to 3 high-risk claims.
Focus on:
1. Guaranteed results (e.g., "100% cure", "permanent fat loss")
2. Off-label promises (e.g., specific weight loss guarantees for Ozempic/Semaglutide without noting diet/exercise)
3. "Painless" claims for invasive procedures
4. Unsubstantiated "Best in City" or "Award Winning" claims without citations.

If the site is perfectly compliant or you can't find specific medical claims, output 1-2 generic "Weakly Supported" claims based on the industry (e.g., vague "expert staff" claims). 
Always return a strict JSON array matching the required schema.`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [systemPrompt, `Target URL: ${url}\n\nWebsite Text:\n${truncatedText}`],
      config: {
        responseMimeType: 'application/json',
        responseSchema: claimSchema,
        temperature: 0.2, // Low temperature for deterministic compliance auditing
      }
    });

    const parsedClaims = JSON.parse(aiResponse.text || '[]');
    
    // Calculate a mock score based on risk levels
    let riskScore = 100;
    parsedClaims.forEach((c: any) => {
      if (c.riskLevel === 'High') riskScore -= 20;
      else if (c.riskLevel === 'Medium') riskScore -= 10;
      else if (c.riskLevel === 'Low') riskScore -= 5;
    });
    
    // Ensure score doesn't drop below 0
    riskScore = Math.max(0, riskScore);

    return NextResponse.json({ 
      success: true, 
      claims: parsedClaims,
      score: riskScore,
      targetUrl: url 
    });

  } catch (error) {
    console.error('AuditGPT scan failed:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
