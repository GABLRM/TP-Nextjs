import { Suspense } from "react";
import { GetProductBySlugUseCase } from "@/application/product/get-product-by-slug.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { updateProduct, triggerTestError, type ProductFormErrors } from "@/app/actions/product";
import { SubmitButton } from "@/app/components/submit-button";
import { notFound } from "next/navigation";
import Link from "next/link";
import { connection } from "next/server";

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50";
const errorClass = "mt-1 text-xs text-red-600";

function Field({ label, name, defaultValue, type = "text", error }: {
  label: string; name: string; defaultValue: string | number; type?: string; error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue}
        step={type === "number" ? "0.01" : undefined} className={inputClass} />
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

async function EditProductContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ errors?: string }>;
}) {
  await connection();
  const { slug } = await params;
  const { errors: rawErrors } = await searchParams;

  const repo = new PrismaProductRepository();
  const product = await new GetProductBySlugUseCase(repo).execute(slug);
  if (!product) notFound();

  const errors: ProductFormErrors | undefined = rawErrors
    ? (JSON.parse(decodeURIComponent(rawErrors)) as ProductFormErrors)
    : undefined;

  const boundAction = updateProduct.bind(null, product.id, product.slug);
  const boundTestError = triggerTestError.bind(null, product.slug);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Modifier un produit</h2>
          <p className="mt-0.5 text-sm text-zinc-500">{product.name}</p>
        </div>
        <Link href="/admin/products" className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
          ← Retour
        </Link>
      </div>

      {errors?._global && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors._global}
        </div>
      )}

      <form action={boundAction} className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom" name="name" defaultValue={product.name} error={errors?.name} />
          <Field label="Marque" name="brand" defaultValue={product.brand} error={errors?.brand} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie" name="category" defaultValue={product.category} error={errors?.category} />
          <Field label="SKU" name="sku" defaultValue={product.sku} error={errors?.sku} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Prix (€)" name="price" type="number" defaultValue={product.price.getAmount()} error={errors?.price} />
          <Field label="Stock" name="stock" type="number" defaultValue={product.stock.getQuantity()} error={errors?.stock} />
        </div>
        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-zinc-700">Description</label>
          <textarea id="description" name="description" rows={4} defaultValue={product.description} className={inputClass} />
          {errors?.description && <p className={errorClass}>{errors.description}</p>}
        </div>
        <Field label="Image principale (URL)" name="imageMain" defaultValue={product.images.all()[0] ?? ""} error={errors?.imageMain} />
        <div className="flex justify-end gap-3 border-t border-zinc-100 pt-4">
          <Link href="/admin/products" className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
            Annuler
          </Link>
          <SubmitButton label="Enregistrer" pendingLabel="Enregistrement..." />
        </div>
      </form>

      <form action={boundTestError} className="mt-4">
        <button
          type="submit"
          className="w-full rounded-lg border border-dashed border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
        >
          Simuler une erreur serveur
        </button>
      </form>
    </div>
  );
}

export default function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ errors?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-sm text-zinc-400">Chargement...</div>}>
      <EditProductContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
