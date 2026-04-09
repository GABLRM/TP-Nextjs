import { Product } from "@/domain/product/product.entity";
import { IProductRepository, ProductUpdateParams } from "@/domain/product/product.repository";

export class UpdateProductUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(id: string, params: ProductUpdateParams): Promise<Product> {
    return this.repository.update(id, params);
  }
}
