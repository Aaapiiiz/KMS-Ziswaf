import { Skeleton } from "@/components/ui/skeleton"

export default function RecentDocumentsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex-1 space-y-4 p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* Table Header Skeleton */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b">
          <Skeleton className="col-span-5 h-4" />
          <Skeleton className="col-span-2 h-4" />
          <Skeleton className="col-span-2 h-4" />
          <Skeleton className="col-span-2 h-4" />
          <div className="col-span-1"></div>
        </div>

        {/* Documents Skeleton */}
        <div className="space-y-4">
          {[1, 2].map((group) => (
            <div key={group} className="space-y-1">
              <Skeleton className="h-4 w-32 px-4" />
              {[1, 2, 3].map((doc) => (
                <div key={doc} className="grid grid-cols-12 gap-4 px-4 py-2">
                  <div className="col-span-5 flex items-center space-x-3">
                    <Skeleton className="h-5 w-5" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="col-span-2">
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="col-span-2">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="col-span-1">
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
