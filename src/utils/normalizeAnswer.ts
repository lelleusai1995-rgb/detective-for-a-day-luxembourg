// Password / answer matching that is forgiving: case-insensitive, trimmed,
// accent-insensitive, and space/punctuation tolerant.

export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFD")
    // strip diacritics (ë -> e, é -> e, ...)
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    // collapse anything that isn't a letter or digit
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * True if `input` matches the password or any accepted alias.
 */
export function matchesPassword(
  input: string,
  password: string,
  acceptedAnswers: string[] = [],
): boolean {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) return false;
  const candidates = [password, ...acceptedAnswers].map(normalizeAnswer);
  return candidates.includes(normalizedInput);
}
