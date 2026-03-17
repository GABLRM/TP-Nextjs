import { GetAllProductsUseCase } from "@/application/product/get-all-products.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { StockStatus } from "@/domain/product/product.entity";
import Link from "next/link";

function StockCell({ status, qty }: { status: StockStatus; qty: number }) {
  if (status === "out_of_stock") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        Rupture
      </span>
    );
  }
  if (status === "low_stock") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        {qty} restants
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {qty} en stock
    </span>
  );
}

export default async function AdminProductsPage() {
  const repo = new PrismaProductRepository();
  const products = await new GetAllProductsUseCase(repo).execute();

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Produits</h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            {products.length} produits dans la base de données
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          ← Voir la boutique
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Produit
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Catégorie
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Marque
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                SKU
              </th>
              <th className="px-4 py-3 text-right font-semibold text-zinc-500">
                Prix
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.id}
                className={`border-b border-zinc-100 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-zinc-50/30"
                }`}
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-medium text-zinc-900 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-600">{product.category}</td>
                <td className="px-4 py-3 text-zinc-600">{product.brand}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {product.sku}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-zinc-900">
                  {product.price.format()}
                </td>
                <td className="px-4 py-3">
                  <StockCell
                    status={product.getStockStatus()}
                    qty={product.stock.getQuantity()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
