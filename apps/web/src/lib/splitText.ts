/**
 * splitText.ts — Custom text splitting utility
 * 
 * Splits text content into individually animatable <span> elements
 * while preserving accessibility via aria attributes.
 */

export interface SplitResult {
  words: string[];
}

/**
 * Splits a plain text string into words.
 * Handles common HTML entities by leaving them as-is (React renders them).
 */
export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/**
 * Splits a plain text string into individual characters (preserving spaces as word boundaries).
 */
export function splitIntoChars(text: string): string[] {
  return text.split('').filter(Boolean);
}
