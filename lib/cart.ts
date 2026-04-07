import { prisma } from "./prisma";

export async function getCartWithItems(sessionId: string) {
  return prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: { product: true },
        orderBy: { id: "asc" },
      },
    },
  });
}
