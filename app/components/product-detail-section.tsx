import { GetProductBySlugUseCase } from "@/application/product/get-product-by-slug.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { devDelay } from "@/lib/dev-delay";
import { notFound } from "next/navigation";
import { ProductDetail } from "./product-detail";

// Simule une requête produit à ~800ms (ex: BDD distante)
const SIMULATED_DELAY_MS = 800;

export async function ProductDetailSection({ slug }: { slug: string }) {
  await devDelay(SIMULATED_DELAY_MS);

  const repo = new PrismaProductRepository();
  const product = await new GetProductBySlugUseCase(repo).execute(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
