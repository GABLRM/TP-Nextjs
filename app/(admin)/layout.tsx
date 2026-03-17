import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900">
              <span className="text-[10px] font-bold text-white">TS</span>
            </div>
            <span className="text-sm font-semibold">TechShop Admin</span>
          </Link>
        </div>
        <nav className="p-4">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Gestion
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Produits
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-white px-8">
          <h1 className="text-sm font-semibold text-zinc-500">Administration</h1>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
