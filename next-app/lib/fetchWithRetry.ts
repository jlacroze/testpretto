export async function fetchWithRetry<T>(
  url: string,
  retries = 3,
  delay = 1000
): Promise<T | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<T>;
    } catch (err) {
      console.warn(`Tentative ${i + 1} échouée:`, err);
      if (i === retries - 1) return null;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  return null;
}
