'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Caught by error.tsx boundary:", error)
  }, [error])
 
  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
            <div className="mx-auto w-16 h-16 mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Terjadi Kesalahan</CardTitle>
            <CardDescription className="text-lg">
                Maaf, terjadi kesalahan saat memuat halaman ini.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-6">
                Anda dapat mencoba memuat ulang halaman. Jika masalah berlanjut, silakan hubungi administrator.
            </p>
            <Button
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
                }
            >
                Coba Lagi
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}