import { fetchSponsoredProductByHandle } from "@/lib/mock-shop";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductGallery } from "@/app/components/product-gallery";

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default async function SponsoredProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await fetchSponsoredProductByHandle(handle);

  if (!product) notFound();

  const imageUrls = product.images.map((img) => img.url);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Galerie — réutilise le composant existant */}
        {imageUrls.length > 0 ? (
          <ProductGallery images={imageUrls} productName={product.title} />
        ) : (
          <div className="aspect-square rounded-xl bg-muted" />
        )}

        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-amber-500 text-white hover:bg-amber-500">
            Sponsorisé
          </Badge>

          {product.productType && (
            <Badge variant="outline" className="w-fit">
              {product.productType}
            </Badge>
          )}

          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          <p className="text-sm font-medium text-muted-foreground">
            {product.vendor}
          </p>

          <span className="text-4xl font-bold">
            {formatPrice(product.price.amount, product.price.currencyCode)}
          </span>

          <Separator />

          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}

          {/* Pas de AddToCartButton — produit sponsorisé externe */}
        </div>
      </div>
    </main>
  );
}
