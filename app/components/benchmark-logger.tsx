import { getCatalogStats, computeCatalogStatsUncached } from "@/lib/catalog-stats";

export async function BenchmarkLogger() {
  const t1 = performance.now();
  await computeCatalogStatsUncached();
  const uncachedMs = Math.round(performance.now() - t1);

  const t2 = performance.now();
  await getCatalogStats();
  const cachedMs = Math.round(performance.now() - t2);

  console.log(
    `[unstable_cache] sans cache : ${uncachedMs}ms | avec cache : ${cachedMs}ms`
  );

  return null;
}
