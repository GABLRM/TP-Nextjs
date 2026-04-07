import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_id")?.value;

  if (!sessionId) {
    return NextResponse.json({ count: 0 });
  }

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  const count = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  return NextResponse.json({ count });
}

export async function POST(req: NextRequest) {
  const { productId, action } = (await req.json()) as {
    productId: string;
    action: "add" | "decrement" | "remove";
  };

  const cookieStore = await cookies();
  const existingSessionId = cookieStore.get("cart_id")?.value;
  const isNew = !existingSessionId;
  const sessionId = existingSessionId ?? crypto.randomUUID();

  const cart = await prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
  });

  if (action === "add") {
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity: 1 },
      update: { quantity: { increment: 1 } },
    });
  } else if (action === "decrement") {
    const item = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    if (item) {
      if (item.quantity <= 1) {
        await prisma.cartItem.delete({
          where: { cartId_productId: { cartId: cart.id, productId } },
        });
      } else {
        await prisma.cartItem.update({
          where: { cartId_productId: { cartId: cart.id, productId } },
          data: { quantity: { decrement: 1 } },
        });
      }
    }
  } else if (action === "remove") {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  }

  const updated = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: true },
  });

  const count = updated?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  const res = NextResponse.json({ count });

  if (isNew) {
    res.cookies.set("cart_id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return res;
}
