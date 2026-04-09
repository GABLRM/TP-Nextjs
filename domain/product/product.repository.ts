import { Product } from "./product.entity";

export type ProductUpdateParams = {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  imageMain: string;
};

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findBySlugs(slugs: string[]): Promise<Product[]>;
  update(id: string, params: ProductUpdateParams): Promise<Product>;
}
