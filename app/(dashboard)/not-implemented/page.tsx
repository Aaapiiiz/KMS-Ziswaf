"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench } from "lucide-react";

export default function NotImplementedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Wrench className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Fitur dalam Pengembangan</CardTitle>
          <CardDescription className="text-lg">
            Halaman atau fitur yang Anda tuju saat ini sedang dalam tahap pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Kami bekerja keras untuk menyelesaikannya. Silakan periksa kembali nanti. Terima kasih atas kesabaran Anda!
          </p>
          <Button onClick={() => router.back()} className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Halaman Sebelumnya
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}