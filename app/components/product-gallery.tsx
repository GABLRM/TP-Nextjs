import { ProductImages } from "@/domain/product/product-images.value-object";
import Image from "next/image";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImages;
  productName: string;
}) {
  const allImages = images.all();

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={images.main}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-md bg-muted"
            >
              <Image
                src={img}
                alt={`${productName} - vue ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 25vw, 12vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
