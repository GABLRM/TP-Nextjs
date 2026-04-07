import { SimilarProductsSection } from "@/app/components/similar-products-section";

export const dynamic = "force-dynamic";

export default async function SimilarSlot({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SimilarProductsSection slug={slug} />;
}
