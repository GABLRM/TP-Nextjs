"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/cart-context";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  disabled?: boolean;
};

export function AddToCartButton({ id, slug, name, price, image, disabled }: Props) {
  const { addItem } = useCart();

  return (
    <Button
      size="sm"
      className="w-full"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        addItem({ id, slug, name, price, image });
      }}
    >
      {disabled ? "Rupture de stock" : "Ajouter au panier"}
    </Button>
  );
}
