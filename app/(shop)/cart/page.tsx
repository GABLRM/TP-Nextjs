"use client";

import { useCart } from "@/app/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalCount, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Votre panier est vide</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajoutez des produits depuis le catalogue pour commencer.
          </p>
        </div>
        <Link href="/">
          <Button>Voir le catalogue</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">
        Panier{" "}
        <span className="text-base font-normal text-muted-foreground">
          ({totalCount} article{totalCount > 1 ? "s" : ""})
        </span>
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Liste des articles */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4"
            >
              {/* Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Infos */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold leading-snug hover:underline"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Supprimer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantité */}
                  <div className="flex items-center gap-2 rounded-lg border border-border px-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé commande */}
        <div className="h-fit rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="mb-4 font-semibold">Résumé</h2>

          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span className="line-clamp-1 text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span className="shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-border" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <Button className="mt-6 w-full" size="lg">
            Passer la commande
          </Button>

          <Link href="/" className="mt-2 block w-full">
            <Button variant="outline" className="w-full">Continuer les achats</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
