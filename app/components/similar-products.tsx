import { Product } from "@/domain/product/product.entity";
import { ProductGrid } from "./product-grid";

export function SimilarProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Produits similaires</h2>
      <ProductGrid products={products} />
    </section>
  );
}
