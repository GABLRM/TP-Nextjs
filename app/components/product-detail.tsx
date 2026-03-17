import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product, StockStatus } from "@/domain/product/product.entity";
import { ProductGallery } from "./product-gallery";

function StockBadge({ status }: { status: StockStatus }) {
  if (status === "in_stock") {
    return <Badge variant="secondary">En stock</Badge>;
  }
  if (status === "low_stock") {
    return (
      <Badge variant="outline" className="border-orange-400 text-orange-600">
        Stock limité
      </Badge>
    );
  }
  return <Badge variant="destructive">Rupture de stock</Badge>;
}

export function ProductDetail({ product }: { product: Product }) {
  const stockStatus = product.getStockStatus();

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <ProductGallery images={product.images.all()} productName={product.name} />

      <div className="flex flex-col gap-4">
        <Badge variant="outline" className="w-fit">
          {product.category}
        </Badge>

        <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-medium">{product.brand}</span>
          <span>·</span>
          <span>SKU: {product.sku}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold">{product.price.format()}</span>
          <StockBadge status={stockStatus} />
        </div>

        <Separator />

        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <Separator />

        <div>
          <h2 className="mb-3 font-semibold">Caractéristiques techniques</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-2 gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm"
              >
                <span className="font-medium text-muted-foreground">{key}</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
