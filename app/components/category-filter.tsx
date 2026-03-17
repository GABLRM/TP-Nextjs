import Link from "next/link";

interface CategoryFilterProps {
  categories: string[];
  active?: string;
}

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          !active
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        }`}
      >
        Tous
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/?category=${encodeURIComponent(cat)}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            active === cat
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
