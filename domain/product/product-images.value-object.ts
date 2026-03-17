export class ProductImages {
  readonly main: string;
  readonly gallery: string[];

  constructor(main: string, gallery: string[]) {
    this.main = main;
    this.gallery = gallery;
  }

  all(): string[] {
    return [this.main, ...this.gallery.filter((img) => img !== this.main)];
  }
}
