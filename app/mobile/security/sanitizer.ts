/**
 * Input sanitizer that protects against XSS, SQL injection, and other common attack vectors.
 *
 * @param data - The input data object containing key-value pairs to sanitize
 * @returns A new object with sanitized values
 */
export function sanitize<T extends Record<string, any>>(data: T): T {
  return Object.entries(data).reduce((acc: Record<string, any>, [key, value]) => {
    if (typeof value === 'string') {
      // no not remove spaces from passwords
      let sanitized = key == 'password' ? value : value.trim();

      // anti XSS
      sanitized = sanitizeHtml(sanitized);
      sanitized = sanitizeUrl(sanitized);

      // anti SQLi
      sanitized = sanitized
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/--/g, '\\--')
        .replace(/;/g, '\\;');

      acc[key] = sanitized;
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      acc[key] = sanitize(value);
    } else if (Array.isArray(value)) {
      // Sanitize arrays
      acc[key] = value.map((item) =>
        typeof item === 'string'
          ? sanitize({ temp: item }).temp
          : typeof item === 'object' && item !== null
          ? sanitize(item)
          : item,
      );
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, any>) as T;
}

/**
 * Sanitizes a URL to prevent JavaScript injection
 *
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if potentially malicious
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim();
  if (/^javascript:/i.test(trimmed)) return '';
  if (/^data:/i.test(trimmed) && /base64/i.test(trimmed)) return '';

  return trimmed;
}

function sanitizeHtml(input: string): string {
  if (!input) return '';

  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
