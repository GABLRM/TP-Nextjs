export class Price {
  private readonly amount: number;

  constructor(amount: number) {
    if (amount < 0) {
      throw new Error("Price amount cannot be negative");
    }
    this.amount = amount;
  }

  getAmount(): number {
    return this.amount;
  }

  format(): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(this.amount);
  }
}
