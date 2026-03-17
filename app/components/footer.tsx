import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
                <span className="text-[10px] font-bold text-zinc-900">TS</span>
              </div>
              <span className="font-semibold text-white">TechShop</span>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed">
              Votre boutique tech de confiance. Qualité, service et innovation.
            </p>
          </div>

          {/* Links */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Catalogue
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Marques
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Promotions
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} TechShop. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
