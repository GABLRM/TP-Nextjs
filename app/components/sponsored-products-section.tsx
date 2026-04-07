import { fetchSponsoredProducts } from "@/lib/mock-shop";
import { SponsoredProductGrid } from "./sponsored-product-grid";

export async function SponsoredProductsSection({
  count = 6,
}: {
  count?: number;
}) {
  const products = await fetchSponsoredProducts(count);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Produits sponsorisés</h2>
      <SponsoredProductGrid products={products} />
    </section>
  );
}
