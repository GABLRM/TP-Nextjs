import { fetchSponsoredProducts } from "@/lib/mock-shop";
import { SponsoredProductGrid } from "./sponsored-product-grid";
import { SponsoredRefreshButton } from "./sponsored-refresh-button";

export async function SponsoredProductsSection({
  count = 6,
}: {
  count?: number;
}) {
  const products = await fetchSponsoredProducts(count);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Produits sponsorisés</h2>
        <SponsoredRefreshButton />
      </div>
      <SponsoredProductGrid products={products} />
    </section>
  );
}
