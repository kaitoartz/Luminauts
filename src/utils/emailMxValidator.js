/**
 * Server-side utility to validate the existence of email domain MX records.
 * Note: This module is intended for Node.js / backend server environments.
 */

/**
 * Checks if a domain has valid MX (Mail Exchange) records.
 * @param {string} email - The email address or domain to check.
 * @returns {Promise<boolean>} True if MX records are found, false otherwise.
 */
export async function checkMxRecords(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const domain = email.includes('@') ? email.split('@')[1] : email;

  try {
    // Dynamic import to prevent bundler compilation errors in frontend environments
    // and gracefully handle environments where 'dns' is not available.
    const dns = await import('dns');
    
    // First, try using modern promises API (preferred in Node.js)
    if (dns.promises && typeof dns.promises.resolveMx === 'function') {
      const records = await dns.promises.resolveMx(domain.trim());
      return records && records.length > 0;
    }
    
    // Fallback to callback API wrapped in a promise (older Node.js)
    if (typeof dns.resolveMx === 'function') {
      const records = await new Promise((resolve, reject) => {
        dns.resolveMx(domain.trim(), (err, addresses) => {
          if (err) reject(err);
          else resolve(addresses);
        });
      });
      return records && records.length > 0;
    }
    
    console.warn('DNS MX validation is only supported in Node.js/server environments.');
    return false;
  } catch (error) {
    // dns.resolveMx throws or returns error code if no MX records are found, or domain doesn't exist, or no connection
    return false;
  }
}
