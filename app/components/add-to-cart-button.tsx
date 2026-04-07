"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  productId: string;
  disabled?: boolean;
};

export function AddToCartButton({ productId, disabled }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action: "add" }),
    });
    const { count } = await res.json();
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count } }));
    setLoading(false);
  }

  return (
    <Button
      size="sm"
      className="w-full"
      disabled={disabled || loading}
      onClick={(e) => {
        e.preventDefault();
        handleAdd();
      }}
    >
      {disabled ? "Rupture de stock" : loading ? "Ajout…" : "Ajouter au panier"}
    </Button>
  );
}
