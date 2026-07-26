/**
 * Utility to validate email formats and dynamically suggest corrections for common domain/TLD typos.
 */

// Popular valid email domains to compare against
const POPULAR_DOMAINS = [
  'gmail.com', 'gmail.co.uk', 'gmail.es',
  'yahoo.com', 'yahoo.es', 'yahoo.co.uk', 'yahoo.com.mx', 'yahoo.cl', 'yahoo.com.ar',
  'hotmail.com', 'hotmail.es', 'hotmail.co.uk',
  'outlook.com', 'outlook.es', 'outlook.co.uk',
  'icloud.com', 'aol.com', 'zoho.com', 'proton.me', 'protonmail.com',
  'live.com', 'live.es', 'msn.com', 'gmx.com', 'mail.com'
];

// Popular TLDs to check for typo corrections (e.g. .con -> .com)
const POPULAR_TLDS = ['com', 'net', 'org', 'edu', 'gov', 'co', 'io', 'es', 'mx', 'cl', 'ar', 'uk'];

/**
 * Calculates the Levenshtein distance between two strings.
 * Space complexity: O(min(N, M))
 */
function levenshteinDistance(s1, s2) {
  if (s1.length < s2.length) {
    return levenshteinDistance(s2, s1);
  }
  if (s2.length === 0) {
    return s1.length;
  }
  
  let prevRow = Array.from({ length: s2.length + 1 }, (_, i) => i);
  let currRow = new Array(s2.length + 1);
  
  for (let i = 1; i <= s1.length; i++) {
    currRow[0] = i;
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,      // deletion
        currRow[j - 1] + 1,  // insertion
        prevRow[j - 1] + cost // substitution
      );
    }
    prevRow = [...currRow];
  }
  return prevRow[s2.length];
}

/**
 * Attempts to fix a typo in the domain's TLD if it's not a known TLD.
 */
function fixTldTypo(domain) {
  const parts = domain.split('.');
  if (parts.length < 2) return null;
  
  const lastPart = parts[parts.length - 1];
  
  // If already a popular or valid common TLD, don't change it
  if (POPULAR_TLDS.includes(lastPart)) {
    return null;
  }
  
  let bestTld = null;
  let minDistance = Infinity;
  
  for (const tld of POPULAR_TLDS) {
    const dist = levenshteinDistance(lastPart, tld);
    if (dist === 1 && dist < minDistance) {
      minDistance = dist;
      bestTld = tld;
    }
  }
  
  if (bestTld) {
    parts[parts.length - 1] = bestTld;
    return parts.join('.');
  }
  
  return null;
}

/**
 * Validates the email address format according to a robust, RFC-5322 based check.
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmailSyntax(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // RFC 5322 compliant regex that supports alias (+), subdomains, and standard TLDs
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  
  // Length limits (RFC 5321 / RFC 5322)
  if (email.length > 254 || local.length > 64 || domain.length > 255) {
    return false;
  }
  
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  
  const lastPart = domainParts[domainParts.length - 1];
  if (lastPart.length < 2) return false;
  
  return true;
}

/**
 * Checks an email address for common typos and suggests a correction.
 * @param {string} email
 * @returns {string|null} The suggested email address or null if no suggestion.
 */
export function getEmailSuggestion(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return null;
  }
  const parts = email.split('@');
  if (parts.length !== 2) return null;

  const user = parts[0].trim();
  const domain = parts[1].toLowerCase().trim();

  // If already exactly a popular domain, no suggestion needed
  if (POPULAR_DOMAINS.includes(domain)) {
    return null;
  }

  let bestMatch = null;
  let minDistance = Infinity;

  // 1. Check if the entire domain is very close to a popular domain
  for (const popDomain of POPULAR_DOMAINS) {
    const dist = levenshteinDistance(domain, popDomain);
    const maxAllowedDist = popDomain.length <= 8 ? 1 : 2;
    
    if (dist <= maxAllowedDist && dist < minDistance) {
      minDistance = dist;
      bestMatch = popDomain;
    }
  }

  if (bestMatch) {
    return `${user}@${bestMatch}`;
  }

  // 2. If no popular domain match, check if we can fix a generic TLD typo (e.g. user@mycompany.con -> user@mycompany.com)
  const tldMatch = fixTldTypo(domain);
  if (tldMatch && tldMatch !== domain) {
    return `${user}@${tldMatch}`;
  }

  return null;
}
