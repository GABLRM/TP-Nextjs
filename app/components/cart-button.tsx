"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/cart-context";
import Link from "next/link";

export function CartButton() {
  const { totalCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <Button variant="ghost" size="icon" className="relative h-9 w-9">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" x2="21" y1="6" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {totalCount > 0 && (
          <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]">
            {totalCount > 99 ? "99+" : totalCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
