import { Price } from "@/domain/product/price.value-object";
import { Product } from "@/domain/product/product.entity";
import { ProductImages } from "@/domain/product/product-images.value-object";
import { IProductRepository } from "@/domain/product/product.repository";
import { Stock } from "@/domain/product/stock.value-object";
import { prisma } from "@/lib/prisma";

type RawProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  imageMain: string;
  imageGallery: string;
  specs: string;
  similar: string;
};

function mapToEntity(raw: RawProduct): Product {
  return new Product({
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    brand: raw.brand,
    category: raw.category,
    description: raw.description,
    price: new Price(raw.price),
    stock: new Stock(raw.stock),
    sku: raw.sku,
    images: new ProductImages(
      raw.imageMain,
      JSON.parse(raw.imageGallery) as string[]
    ),
    specs: JSON.parse(raw.specs) as Record<string, string | number | boolean>,
    similarProductSlugs: JSON.parse(raw.similar) as string[],
  });
}

export class PrismaProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    const rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map(mapToEntity);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const row = await prisma.product.findUnique({ where: { slug } });
    return row ? mapToEntity(row) : null;
  }

  async findBySlugs(slugs: string[]): Promise<Product[]> {
    const rows = await prisma.product.findMany({
      where: { slug: { in: slugs } },
    });
    return rows.map(mapToEntity);
  }
}
