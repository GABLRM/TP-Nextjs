"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { revalidateSponsoredProducts } from "@/app/actions/revalidate-sponsored";

export function SponsoredRefreshButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleRefresh() {
    startTransition(async () => {
      // 1. Invalide le Data Cache côté serveur (revalidateTag)
      await revalidateSponsoredProducts();
      // 2. Re-render le RSC tree côté client pour afficher les nouvelles données
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
      aria-label="Actualiser les produits sponsorisés"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isPending ? "animate-spin" : ""}
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </svg>
      {isPending ? "Actualisation…" : "Actualiser"}
    </button>
  );
}
