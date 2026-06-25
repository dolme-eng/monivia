let cachedToken: string | null = null;
let fetchPromise: Promise<string> | null = null;

export async function getCsrfToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  if (!fetchPromise) {
    fetchPromise = fetch('/api/csrf')
      .then((res) => res.json())
      .then((data: { csrfToken: string }) => {
        cachedToken = data.csrfToken;
        // Refresh before expiry (50 minutes)
        setTimeout(() => { cachedToken = null; fetchPromise = null; }, 50 * 60 * 1000);
        return cachedToken;
      })
      .catch(() => {
        fetchPromise = null;
        return '';
      });
  }

  return fetchPromise;
}
