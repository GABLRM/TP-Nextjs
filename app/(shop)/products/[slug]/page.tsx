import { GetAllProductsUseCase } from "@/application/product/get-all-products.use-case";
import { GetProductBySlugUseCase } from "@/application/product/get-product-by-slug.use-case";
import { GetSimilarProductsUseCase } from "@/application/product/get-similar-products.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { ProductDetail } from "@/app/components/product-detail";
import { SimilarProducts } from "@/app/components/similar-products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const repo = new PrismaProductRepository();
  const products = await new GetAllProductsUseCase(repo).execute();
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repo = new PrismaProductRepository();

  const product = await new GetProductBySlugUseCase(repo).execute(slug);
  if (!product) notFound();

  const similarProducts = await new GetSimilarProductsUseCase(repo).execute(
    product.similarProductSlugs
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <ProductDetail product={product} />
      <SimilarProducts products={similarProducts} />
    </main>
  );
}
