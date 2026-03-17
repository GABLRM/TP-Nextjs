const LOW_STOCK_THRESHOLD = 5;

export class Stock {
  private readonly quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }

  isAvailable(): boolean {
    return this.quantity > 0;
  }

  isLow(): boolean {
    return this.quantity > 0 && this.quantity <= LOW_STOCK_THRESHOLD;
  }

  isEmpty(): boolean {
    return this.quantity === 0;
  }
}
