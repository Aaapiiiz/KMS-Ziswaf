// app/(dashboard)/not-found.tsx

"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <SearchX className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">404 - Halaman Tidak Ditemukan</CardTitle>
          <CardDescription className="text-lg">
            Maaf, halaman atau sumber daya yang Anda cari tidak dapat ditemukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Ini mungkin karena tautan yang salah, halaman telah dipindahkan, atau tidak pernah ada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.back()} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
            <Button onClick={() => router.push('/dashboard')} variant="outline" className="flex-1">
              Ke Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}