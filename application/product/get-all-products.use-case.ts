import { Product } from "@/domain/product/product.entity";
import { IProductRepository } from "@/domain/product/product.repository";

export class GetAllProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
