import { GetProductBySlugUseCase } from "@/application/product/get-product-by-slug.use-case";
import { GetSimilarProductsUseCase } from "@/application/product/get-similar-products.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { devDelay } from "@/lib/dev-delay";
import { notFound } from "next/navigation";
import { SimilarProducts } from "./similar-products";

// Simule un moteur de recommandation lent (~2s)
const SIMULATED_DELAY_MS = 2000;

export async function SimilarProductsSection({ slug }: { slug: string }) {
  await devDelay(SIMULATED_DELAY_MS);

  const repo = new PrismaProductRepository();
  const product = await new GetProductBySlugUseCase(repo).execute(slug);
  if (!product) notFound();

  const similarProducts = await new GetSimilarProductsUseCase(repo).execute(
    product.similarProductSlugs
  );

  return <SimilarProducts products={similarProducts} />;
}
