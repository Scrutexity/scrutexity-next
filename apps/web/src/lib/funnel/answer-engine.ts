export interface AnswerEngine {
  query(domain: string): Promise<{ answer: string; model: string; discrepancies?: any[] }>;
}

export class PerplexityAdapter implements AnswerEngine {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY || '';
  }

  async query(domain: string) {
    if (!this.apiKey) {
      console.warn("PERPLEXITY_API_KEY not configured, falling back to empty answer.");
      return { answer: "AI answer could not be generated.", model: "unknown" };
    }

    const query = `What services does ${domain} offer? Is it FDA-approved for weight loss or GLP-1 treatments? What do patients say about it? Answer using public web sources only and avoid speculation.`;
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${this.apiKey}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'You are a factual research assistant. Answer based on public web sources only. If evidence is missing, say so.' },
          { role: 'user', content: query },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`Perplexity returned ${response.status}`);
      return { answer: "AI answer could not be generated.", model: "unknown" };
    }

    const json = await response.json();
    const answer = json?.choices?.[0]?.message?.content || "No answer found.";
    
    return { model: 'perplexity-sonar-pro', answer };
  }
}
