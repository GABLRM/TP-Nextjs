import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { CartProvider } from "@/app/context/cart-context";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </CartProvider>
  );
}
