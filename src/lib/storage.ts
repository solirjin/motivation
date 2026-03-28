const isClient = typeof window !== "undefined";

export const storage = {
  get(key: string): string | null {
    if (!isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    if (!isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore quota errors
    }
  },
  remove(key: string): void {
    if (!isClient) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
