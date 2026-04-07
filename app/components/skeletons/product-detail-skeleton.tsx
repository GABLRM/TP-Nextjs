import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Galerie */}
      <div>
        <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
        <div className="mt-3 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>

      {/* Infos */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-5 w-48" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
