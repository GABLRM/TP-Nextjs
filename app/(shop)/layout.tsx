import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { Suspense } from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-16 w-full border-b border-border/40 bg-background/80" />}>
        <Navbar />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
