/**
 * Validates a URL string for proper format and accessibility
 * @param urlString - The URL to validate
 * @returns boolean indicating if the URL is valid
 */
export const validateUrl = (urlString: string): boolean => {
  try {
    // Check if URL is valid
    const url = new URL(
      urlString.startsWith("http") ? urlString : `https://${urlString}`
    );

    // Check if URL has valid protocol
    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    // Check if URL has valid hostname
    if (!url.hostname || url.hostname.length < 3) {
      return false;
    }

    // Check if hostname has valid TLD
    const tldMatch = url.hostname.match(/\.[a-z]{2,}$/i);
    if (!tldMatch) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
