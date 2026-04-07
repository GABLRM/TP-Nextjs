import { Suspense } from "react";
import { ProductDetailSection } from "@/app/components/product-detail-section";
import { SimilarProductsSection } from "@/app/components/similar-products-section";
import { SponsoredProductsSection } from "@/app/components/sponsored-products-section";
import { ProductDetailSkeleton } from "@/app/components/skeletons/product-detail-skeleton";
import { SimilarProductsSkeleton } from "@/app/components/skeletons/similar-products-skeleton";
import { SponsoredProductsSkeleton } from "@/app/components/skeletons/sponsored-products-skeleton";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Suspense 1 — fiche produit principale (~800ms) */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailSection slug={slug} />
      </Suspense>

      {/* Suspense 2 — produits similaires (~2000ms), indépendant */}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProductsSection slug={slug} />
      </Suspense>

      {/* Suspense 3 — produits sponsorisés (latence réseau réelle) */}
      <Suspense fallback={<SponsoredProductsSkeleton count={4} />}>
        <SponsoredProductsSection count={4} />
      </Suspense>
    </main>
  );
}
