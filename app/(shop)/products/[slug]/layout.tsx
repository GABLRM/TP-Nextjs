export default function ProductLayout({
  children,
  similar,
  sponsored,
}: {
  children: React.ReactNode;
  similar: React.ReactNode;
  sponsored: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {children}
      {similar}
      {sponsored}
    </main>
  );
}
