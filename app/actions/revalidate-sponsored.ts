"use server";

import { revalidateTag } from "next/cache";
// import { revalidatePath } from "next/cache"; // alternative par chemin

/**
 * Invalide le cache de tous les fetch taggés "sponsored-products".
 * La prochaine visite d'une page consommant ces données déclenchera un vrai fetch réseau.
 *
 * revalidateTag  → invalide par tag (ciblé, toutes les pages concernées)
 * revalidatePath → invalide par URL (utile pour une page spécifique)
 */
export async function revalidateSponsoredProducts() {
  // Invalidation ciblée : uniquement les fetches avec ce tag
  // Next.js 16 : 2e argument = profil de cache life (vide = expiration par défaut)
  revalidateTag("sponsored-products", {});

  // Alternative / complément : invalider par chemin
  // revalidatePath("/", "page");
  // revalidatePath("/products/[slug]", "page");
}
