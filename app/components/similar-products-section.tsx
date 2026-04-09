import { connection } from "next/server";
import { GetProductBySlugUseCase } from "@/application/product/get-product-by-slug.use-case";
import { GetSimilarProductsUseCase } from "@/application/product/get-similar-products.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { notFound } from "next/navigation";
import { SimilarProducts } from "./similar-products";

// Pas de "use cache" — recalculé côté serveur à chaque requête
export async function SimilarProductsSection({ slug }: { slug: string }) {
  await connection();
  const repo = new PrismaProductRepository();
  const product = await new GetProductBySlugUseCase(repo).execute(slug);
  if (!product) notFound();

  const similarProducts = await new GetSimilarProductsUseCase(repo).execute(
    product.similarProductSlugs
  );

  return <SimilarProducts products={similarProducts} />;
}
