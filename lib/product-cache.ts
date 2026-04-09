import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { Product } from "@/domain/product/product.entity";
import { Price } from "@/domain/product/price.value-object";
import { Stock } from "@/domain/product/stock.value-object";
import { ProductImages } from "@/domain/product/product-images.value-object";

// unstable_cache sérialise en JSON → on ne peut cacher que des données primitives.
// On cache les lignes Prisma brutes et on reconstruit les entités EN DEHORS du cache.
const fetchAllProductsRaw = unstable_cache(
  async () => {
    console.log("[product-cache] CACHE MISS — requête Prisma");
    await prisma.$connect();
    return prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  },
  ["all-products"],
  { tags: ["products"] }
);

export async function getCachedProducts(): Promise<Product[]> {
  const rows = await fetchAllProductsRaw();
  return rows.map((raw) =>
    new Product({
      id: raw.id,
      slug: raw.slug,
      name: raw.name,
      brand: raw.brand,
      category: raw.category,
      description: raw.description,
      price: new Price(raw.price),
      stock: new Stock(raw.stock),
      sku: raw.sku,
      images: new ProductImages(
        raw.imageMain,
        JSON.parse(raw.imageGallery) as string[]
      ),
      specs: JSON.parse(raw.specs) as Record<string, string | number | boolean>,
      similarProductSlugs: JSON.parse(raw.similar) as string[],
    })
  );
}
