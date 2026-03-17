import { Product } from "@/domain/product/product.entity";
import { IProductRepository } from "@/domain/product/product.repository";

export class GetSimilarProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(slugs: string[]): Promise<Product[]> {
    return this.repository.findBySlugs(slugs);
  }
}
