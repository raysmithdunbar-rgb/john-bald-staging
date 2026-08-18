/**
 * Meta descriptions must land between roughly 70 and 165 characters: shorter and
 * Google substitutes its own text, longer and it truncates mid-sentence. Directory
 * summaries are written for the page, not the SERP, so they need clamping.
 */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,.;:—-]$/, '')}…`;
}
