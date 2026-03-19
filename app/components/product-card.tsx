import { Badge } from "@/components/ui/badge";
import { Product, StockStatus } from "@/domain/product/product.entity";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

function StockIndicator({ status }: { status: StockStatus }) {
  if (status === "out_of_stock") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        Rupture
      </span>
    );
  }
  if (status === "low_stock") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-orange-500">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        Stock limité
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-emerald-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      En stock
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const stockStatus = product.getStockStatus();
  const isOutOfStock = stockStatus === "out_of_stock";

  return (
    <div className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-black/5">
      {/* Image — cliquable */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? "opacity-60 grayscale" : ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Category badge overlay */}
          <div className="absolute left-3 top-3">
            <Badge
              variant="secondary"
              className="bg-background/90 text-xs backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>
          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                Rupture de stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <p className="mb-0.5 text-xs font-medium text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="line-clamp-1 font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold">{product.price.format()}</span>
            <StockIndicator status={stockStatus} />
          </div>
        </Link>

        <div className="mt-3">
          <AddToCartButton
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price.getAmount()}
            image={product.images.main}
            disabled={isOutOfStock}
          />
        </div>
      </div>
    </div>
  );
}
