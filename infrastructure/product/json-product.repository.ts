import { Price } from "@/domain/product/price.value-object";
import { Product } from "@/domain/product/product.entity";
import { ProductImages } from "@/domain/product/product-images.value-object";
import { IProductRepository } from "@/domain/product/product.repository";
import { Stock } from "@/domain/product/stock.value-object";
import productsData from "@/data/products.json";

type RawProduct = (typeof productsData)[number];

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
    images: new ProductImages(raw.images.main, raw.images.gallery),
    specs: raw.specs as unknown as Record<string, string | number | boolean>,
    similarProductSlugs: raw.similar,
  });
}

export class JsonProductRepository implements IProductRepository {
  private readonly products: Product[];

  constructor() {
    this.products = productsData.map(mapToEntity);
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.products.find((p) => p.slug === slug) ?? null;
  }

  async findBySlugs(slugs: string[]): Promise<Product[]> {
    return this.products.filter((p) => slugs.includes(p.slug));
  }
}
