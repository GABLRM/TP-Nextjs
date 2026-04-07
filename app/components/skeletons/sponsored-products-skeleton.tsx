import { Skeleton } from "@/components/ui/skeleton";

function SponsoredCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SponsoredProductsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mt-16">
      <Skeleton className="mb-6 h-8 w-64" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <SponsoredCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
