import { Suspense } from "react";
import { ProductDetailSection } from "@/app/components/product-detail-section";
import { ProductDetailSkeleton } from "@/app/components/skeletons/product-detail-skeleton";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailSection slug={slug} />
    </Suspense>
  );
}
