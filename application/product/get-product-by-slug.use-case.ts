import { Product } from "@/domain/product/product.entity";
import { IProductRepository } from "@/domain/product/product.repository";

export class GetProductBySlugUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(slug: string): Promise<Product | null> {
    return this.repository.findBySlug(slug);
  }
}
