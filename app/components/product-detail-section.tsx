import { cacheTag, cacheLife } from "next/cache";
import { GetProductBySlugUseCase } from "@/application/product/get-product-by-slug.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductDetail } from "./product-detail";

export async function ProductDetailSection({ slug }: { slug: string }) {
  "use cache";

  // Nécessaire pour Prisma dans un contexte "use cache" :
  // contrairement à fetch, Next.js n'instrumente pas automatiquement Prisma.
  await prisma.$connect();

  // Tag de cache ciblé par slug → revalidateTag(`product-${slug}`) pour invalider
  cacheTag(`product-${slug}`);
  // Durée de cache : 5 min stale, 1h revalidate, 1j expire
  cacheLife("hours");

  const repo = new PrismaProductRepository();
  const product = await new GetProductBySlugUseCase(repo).execute(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
