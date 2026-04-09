import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export type CategoryStat = {
  name: string;
  count: number;
  avgPrice: number;
  inStock: number;
};

export type CatalogStats = {
  totalProducts: number;
  categories: CategoryStat[];
  priceRange: { min: number; max: number; avg: number };
  totalStockValue: number;
  /** Durée réelle du calcul (ms) — figée dans le résultat caché */
  computeTimeMs: number;
};

/**
 * Calcul coûteux : agrégation catalogue + délai simulé (~500ms).
 * Représente une pipeline analytique, un scoring ML, ou une agrégation BDD lourde.
 */
async function computeCatalogStats(): Promise<CatalogStats> {
  const start = performance.now();

  // Simule un traitement long (scoring, agrégation, etc.)
  await new Promise((resolve) => setTimeout(resolve, 500));

  await prisma.$connect();
  const rows = await prisma.product.findMany();

  const prices = rows.map((p) => p.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: prices.reduce((s, p) => s + p, 0) / (prices.length || 1),
  };

  const totalStockValue = rows.reduce((s, p) => s + p.price * p.stock, 0);

  const catMap = new Map<string, { count: number; priceSum: number; inStock: number }>();
  for (const p of rows) {
    const c = catMap.get(p.category) ?? { count: 0, priceSum: 0, inStock: 0 };
    catMap.set(p.category, {
      count: c.count + 1,
      priceSum: c.priceSum + p.price,
      inStock: c.inStock + (p.stock > 0 ? 1 : 0),
    });
  }

  const categories: CategoryStat[] = Array.from(catMap.entries())
    .map(([name, { count, priceSum, inStock }]) => ({
      name,
      count,
      avgPrice: Math.round(priceSum / count),
      inStock,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const computeTimeMs = Math.round(performance.now() - start);
  console.log(`[catalog-stats] ⚙️  calcul terminé en ${computeTimeMs}ms`);

  return { totalProducts: rows.length, categories, priceRange, totalStockValue, computeTimeMs };
}

/** Version SANS cache — recalcule à chaque appel */
export { computeCatalogStats as computeCatalogStatsUncached };

/**
 * Version AVEC unstable_cache — mise en cache 60s, invalidable via revalidateTag.
 * Clé de cache : ["catalog-stats"] (pas d'arguments → une seule entrée).
 */
export const getCatalogStats = unstable_cache(
  computeCatalogStats,
  ["catalog-stats"],
  { revalidate: 60, tags: ["catalog-stats"] }
);
