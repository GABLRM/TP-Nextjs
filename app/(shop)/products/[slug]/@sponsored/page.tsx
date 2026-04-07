import { SponsoredProductsSection } from "@/app/components/sponsored-products-section";

export const dynamic = "force-dynamic";

export default function SponsoredSlot() {
  return <SponsoredProductsSection count={4} />;
}
