"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type CartItemWithProduct = {
  id: string;
  quantity: number;
  productId: string;
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageMain: string;
  };
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

async function updateCart(
  productId: string,
  action: "add" | "decrement" | "remove"
) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, action }),
  });
  const { count } = await res.json();
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count } }));
}

export function CartList({ items }: { items: CartItemWithProduct[] }) {
  const router = useRouter();

  async function handleAction(
    productId: string,
    action: "add" | "decrement" | "remove"
  ) {
    await updateCart(productId, action);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4"
        >
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
            <Image
              src={item.product.imageMain}
              alt={item.product.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/products/${item.product.slug}`}
                className="font-semibold leading-snug hover:underline"
              >
                {item.product.name}
              </Link>
              <button
                onClick={() => handleAction(item.productId, "remove")}
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
              <div className="flex items-center gap-2 rounded-lg border border-border px-1">
                <button
                  onClick={() => handleAction(item.productId, "decrement")}
                  className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="w-4 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleAction(item.productId, "add")}
                  className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              <span className="font-semibold">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
