import { Suspense } from "react";
import { GetAllProductsUseCase } from "@/application/product/get-all-products.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { ProductDetailSection } from "@/app/components/product-detail-section";
import { SimilarProductsSection } from "@/app/components/similar-products-section";
import { SponsoredProductsSection } from "@/app/components/sponsored-products-section";
import { ProductDetailSkeleton } from "@/app/components/skeletons/product-detail-skeleton";
import { SimilarProductsSkeleton } from "@/app/components/skeletons/similar-products-skeleton";
import { SponsoredProductsSkeleton } from "@/app/components/skeletons/sponsored-products-skeleton";

export async function generateStaticParams() {
  const repo = new PrismaProductRepository();
  const products = await new GetAllProductsUseCase(repo).execute();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Statique — mis en cache via "use cache" dans le composant */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailSection slug={slug} />
      </Suspense>

      {/* Dynamique — recalculé à chaque requête (Prisma, pas de cache) */}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProductsSection slug={slug} />
      </Suspense>

      {/* Dynamique — fetch externe avec revalidate (cache fetch) */}
      <Suspense fallback={<SponsoredProductsSkeleton count={4} />}>
        <SponsoredProductsSection count={4} />
      </Suspense>
    </main>
  );
}
