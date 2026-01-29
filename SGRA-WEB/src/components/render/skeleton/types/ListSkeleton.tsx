import Skeleton from "../Skeleton";

export default function ListSkeleton() {
  return (
    <div className="mt-4 border border-neutral-200 rounded-lg overflow-hidden">
        
      <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-neutral-100 text-xs font-semibold">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="divide-y divide-neutral-200">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 gap-2 px-4 py-3 items-center"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
