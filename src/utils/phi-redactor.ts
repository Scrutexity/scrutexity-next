export function redactPHI(text: string): string {
  if (!text) return text;

  let sanitized = text;

  // 1. Social Security Numbers (SSN)
  // Matches: 123-45-6789, 123 45 6789
  const ssnRegex = /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/g;
  sanitized = sanitized.replace(ssnRegex, '[REDACTED_SSN]');

  // 2. Phone Numbers
  // Matches: (123) 456-7890, 123-456-7890, +1 123 456 7890, etc.
  const phoneRegex = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g;
  sanitized = sanitized.replace(phoneRegex, '[REDACTED_PHONE]');

  // 3. Email Addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  sanitized = sanitized.replace(emailRegex, '[REDACTED_EMAIL]');

  // 4. Common names heuristic (Very basic for demo purposes)
  // In a real HIPAA BAA environment, this would use a robust NLP NER model.
  const nameContexts = [
    /((?:Name|Patient)\s*[:\-]?\s*)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g,
    /(I am|I'm|My name is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g
  ];

  for (const regex of nameContexts) {
    sanitized = sanitized.replace(regex, (match, context, name) => {
      // Don't redact common conversational words that might get caught
      const lower = name.toLowerCase();
      const ignoreList = ['sure', 'yes', 'no', 'hello', 'hi', 'looking', 'interested', 'glad'];
      if (ignoreList.includes(lower) || ignoreList.some(i => lower.startsWith(i))) {
        return match;
      }
      return `${context}[REDACTED_NAME]`;
    });
  }

  // 5. Birthdates (MM/DD/YYYY or similar)
  const dobRegex = /\b(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\b/g;
  sanitized = sanitized.replace(dobRegex, '[REDACTED_DOB]');

  return sanitized;
}
