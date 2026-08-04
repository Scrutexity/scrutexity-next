export function getDeterministicCandidates(transcript: string): string[] {
  const candidates: string[] = [];
  const text = transcript.toLowerCase();

  // 1. Guaranteed Results
  if (text.includes('100%') || text.includes('guarantee') || text.includes('permanent')) {
    candidates.push('guaranteed results (e.g., 100%, guarantee, permanent)');
  }

  // 2. Painless Claims
  if (text.includes('painless') || text.includes('completely safe') || text.includes('no risk')) {
    candidates.push('risk minimization (e.g., painless, completely safe, no risk)');
  }

  // 3. Cure Claims
  if (text.includes('cure') || text.includes('miracle')) {
    candidates.push('unapproved cures (e.g., cure, miracle)');
  }

  // 4. Prompt Injection Defense
  const injectionPatterns = [
    'ignore previous instructions',
    'system:',
    'mark as compliant',
    'disregard previous',
    'you are now a'
  ];
  
  if (injectionPatterns.some(pattern => text.includes(pattern))) {
    // We add a very specific string that the LLM will be instructed it CANNOT clear.
    candidates.push('[FATAL_INJECTION_ATTEMPT]: Transcript contains patterns attempting to override auditor instructions.');
  }

  return candidates;
}
