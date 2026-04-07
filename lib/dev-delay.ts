/**
 * Simule une latence réseau ou BDD lente.
 * N'a aucun effet en production.
 */
export function devDelay(ms: number): Promise<void> {
  if (process.env.NODE_ENV === "production") return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}
