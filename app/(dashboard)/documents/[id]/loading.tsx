import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DocumentDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-16 h-16 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-80" />
            <Skeleton className="h-5 w-96" />
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
            <CardContent><Skeleton className="aspect-video w-full" /></CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <Skeleton className="h-5 w-24" /><Skeleton className="h-5 w-28 justify-self-end" />
                    <Skeleton className="h-5 w-16" /><Skeleton className="h-5 w-24 justify-self-end" />
                    <Skeleton className="h-5 w-20" /><Skeleton className="h-5 w-32 justify-self-end" />
                    <Skeleton className="h-5 w-24" /><Skeleton className="h-5 w-28 justify-self-end" />
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}