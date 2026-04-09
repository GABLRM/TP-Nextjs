"use server";

import { UpdateProductUseCase } from "@/application/product/update-product.use-case";
import { PrismaProductRepository } from "@/infrastructure/product/prisma-product.repository";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateProductSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  brand: z.string().min(1, "La marque est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().min(1, "La description est requise"),
  price: z.coerce.number().nonnegative("Le prix ne peut pas être négatif"),
  stock: z.coerce.number().int().nonnegative("Le stock ne peut pas être négatif"),
  sku: z.string().min(1, "Le SKU est requis"),
  imageMain: z.string().url("L'URL de l'image est invalide"),
});

export type ProductFormErrors = Partial<
  Record<keyof z.infer<typeof updateProductSchema>, string> & { _global: string }
>;

function redirectWithErrors(slug: string, errors: ProductFormErrors): never {
  const encoded = encodeURIComponent(JSON.stringify(errors));
  redirect(`/admin/products/${slug}?errors=${encoded}`);
}

// Signature compatible avec <form action={...}> après .bind(null, id, slug)
export async function updateProduct(
  productId: string,
  slug: string,
  formData: FormData
): Promise<void> {
  const parsed = updateProductSchema.safeParse({
    name: formData.get("name"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    sku: formData.get("sku"),
    imageMain: formData.get("imageMain"),
  });

  if (!parsed.success) {
    const errors: ProductFormErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ProductFormErrors;
      errors[field] = issue.message;
    }
    redirectWithErrors(slug, errors);
  }

  try {
    const repo = new PrismaProductRepository();
    await new UpdateProductUseCase(repo).execute(productId, parsed.data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Une erreur inattendue s'est produite.";
    redirectWithErrors(slug, { _global: message });
  }

  // Invalide le cache du détail produit (use cache)
  revalidateTag(`product-${slug}`, "hours");
  // Invalide le cache du catalogue home (unstable_cache)
  revalidateTag("products", "default");
  redirect("/admin/products");
}

export async function triggerTestError(slug: string): Promise<void> {
  redirectWithErrors(slug, {
    _global: "Erreur de test : la mise à jour a échoué (simulée).",
  });
}
