import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { SponsoredProduct } from "@/lib/mock-shop";

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function SponsoredProductCard({
  product,
}: {
  product: SponsoredProduct;
}) {
  const mainImage = product.images[0];

  return (
    <div className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-black/5">
      <Link href={`/sponsored/${product.handle}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
          {mainImage && (
            <Image
              src={mainImage.url}
              alt={mainImage.altText ?? product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
          <div className="absolute left-3 top-3">
            <Badge className="bg-amber-500 text-white text-xs hover:bg-amber-500">
              Sponsorisé
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/sponsored/${product.handle}`} className="block">
          <p className="mb-0.5 text-xs font-medium text-muted-foreground">
            {product.vendor}
          </p>
          <h3 className="line-clamp-1 font-semibold leading-snug text-foreground">
            {product.title}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold">
              {formatPrice(product.price.amount, product.price.currencyCode)}
            </span>
            {product.productType && (
              <span className="text-xs text-muted-foreground">
                {product.productType}
              </span>
            )}
          </div>
        </Link>
        {/* Pas de AddToCartButton — produit sponsorisé externe */}
      </div>
    </div>
  );
}
