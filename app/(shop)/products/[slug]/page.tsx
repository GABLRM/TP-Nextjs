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

async function ProductPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailSection slug={slug} />
      </Suspense>

      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProductsSection slug={slug} />
      </Suspense>

      <Suspense fallback={<SponsoredProductsSkeleton count={4} />}>
        <SponsoredProductsSection count={4} />
      </Suspense>
    </main>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-10"><ProductDetailSkeleton /></div>}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
