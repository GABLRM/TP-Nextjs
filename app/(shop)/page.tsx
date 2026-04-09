import { Suspense } from "react";
import { CatalogSection } from "@/app/components/catalog-section";
import { SponsoredProductsSection } from "@/app/components/sponsored-products-section";
import { SponsoredProductsSkeleton } from "@/app/components/skeletons/sponsored-products-skeleton";
import { BenchmarkLogger } from "@/app/components/benchmark-logger";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Benchmark console — aucun rendu, non-bloquant */}
      <Suspense fallback={null}>
        <BenchmarkLogger />
      </Suspense>

      <Suspense fallback={null}>
        <CatalogSection searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SponsoredProductsSkeleton count={6} />}>
        <SponsoredProductsSection count={6} />
      </Suspense>
    </main>
  );
}
