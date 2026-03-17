import { Product } from "./product.entity";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findBySlugs(slugs: string[]): Promise<Product[]>;
}
