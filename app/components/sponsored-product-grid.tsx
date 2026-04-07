import type { SponsoredProduct } from "@/lib/mock-shop";
import { SponsoredProductCard } from "./sponsored-product-card";

export function SponsoredProductGrid({
  products,
}: {
  products: SponsoredProduct[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <SponsoredProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
