import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import products from "../data/products.json";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        category: p.category,
        description: p.description,
        price: p.price,
        stock: p.stock,
        sku: p.sku,
        imageMain: p.images.main,
        imageGallery: JSON.stringify(p.images.gallery),
        specs: JSON.stringify(p.specs),
        similar: JSON.stringify(p.similar),
      },
    });
    console.log(`  ✓ ${p.name}`);
  }

  console.log(`\n✅ Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
