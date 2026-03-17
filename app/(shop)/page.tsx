import { GetAllProductsUseCase } from "@/application/product/get-all-products.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { CategoryFilter } from "@/app/components/category-filter";
import { ProductGrid } from "@/app/components/product-grid";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const repo = new PrismaProductRepository();
  const allProducts = await new GetAllProductsUseCase(repo).execute();

  const categories = Array.from(
    new Set(allProducts.map((p) => p.category))
  ).sort();

  const filtered = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catalogue</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            {category ? ` dans "${category}"` : ""}
          </p>
        </div>
        <CategoryFilter categories={categories} active={category} />
      </div>

      <ProductGrid products={filtered} />
    </main>
  );
}
