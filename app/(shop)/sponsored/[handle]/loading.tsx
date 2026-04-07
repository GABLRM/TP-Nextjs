import { ProductDetailSkeleton } from "@/app/components/skeletons/product-detail-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <ProductDetailSkeleton />
    </main>
  );
}
