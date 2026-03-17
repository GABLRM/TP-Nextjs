import { Price } from "./price.value-object";
import { ProductImages } from "./product-images.value-object";
import { Stock } from "./stock.value-object";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export class Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly category: string;
  readonly description: string;
  readonly price: Price;
  readonly stock: Stock;
  readonly sku: string;
  readonly images: ProductImages;
  readonly specs: Record<string, string | number | boolean>;
  readonly similarProductSlugs: string[];

  constructor(params: {
    id: string;
    slug: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    price: Price;
    stock: Stock;
    sku: string;
    images: ProductImages;
    specs: Record<string, string | number | boolean>;
    similarProductSlugs: string[];
  }) {
    this.id = params.id;
    this.slug = params.slug;
    this.name = params.name;
    this.brand = params.brand;
    this.category = params.category;
    this.description = params.description;
    this.price = params.price;
    this.stock = params.stock;
    this.sku = params.sku;
    this.images = params.images;
    this.specs = params.specs;
    this.similarProductSlugs = params.similarProductSlugs;
  }

  getStockStatus(): StockStatus {
    if (this.stock.isEmpty()) return "out_of_stock";
    if (this.stock.isLow()) return "low_stock";
    return "in_stock";
  }
}
